import axios from 'axios';
import Vue from 'vue'
// import router from '../router.js';
import urls from './url.js';
const vue = new Vue()
let myPost = axios.create({
	baseURL: urls.baseUrl,
	method: 'post',
	// timeout: 1000,
})
let myGet = axios.create({
	baseURL: urls.baseUrl,
	method: 'get',
	// timeout: 1000,
})
let myDelete = axios.create({
	baseURL: urls.baseUrl,
	method: 'delete',
	// timeout: 1000,
})
axios.defaults.adapter = function(config) { //自己定义个适配器，用来适配uniapp的语法
	return new Promise((resolve, reject) => {
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};

				settle(resolve, reject, response);
			}
		})
	})
}

myPost.interceptors.request.use(config => {
	if (uni.getStorageSync('token')) {
		config.headers = {
			'Accept':'application/json',
			// 'token':  uni.getStorageSync('token'),
			// 'Access-Control-Allow-Origin': '*',
			// "access-control-allow-credentials": "true"
		}
		// config.headers.token = uni.getStorageSync('token');
	}
	console.log(config)
	return config;
}, error => {
	console.log(error);
	return Promise.reject();
})
myGet.interceptors.request.use(config => {
	if (uni.getStorageSync('token')) {
		config.headers = {
			'Accept':'application/json',
			// 'token': sessionStorage.token,
			// 'Access-Control-Allow-Origin': '*',
			// "access-control-allow-credentials": "true"
		}
		config.headers.token = uni.getStorageSync('token');
	}
	return config;
}, error => {
	console.log(error);
	return Promise.reject();
})
myPost.interceptors.response.use(response => {
	// console.log(response)
	if (response.status === 200) {
		return response.data
	}
	// if (response.status === 200 && response.data.code == '200') {
	//     vue.$message({
	//         message: response.data.msg,
	//         type: "success",
	//     });
	//     return response.data;
	// }
	else {
		vue.$message.error(response.data.info);
		Promise.reject();
	}
}, error => {
	//错误跳转
	console.log(error)
	if (error.response.status === 500) {
		console.log(vue)
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	} else if (error.response.status === 401) {
		sessionStorage.setItem("isLogin", false);
		console.log(sessionStorage.getItem("isLogin"));
		// router.push({ path: "/" })
		// router.go(0)
		return Promise.reject();
	} else if (error.response.status === 404) {
		vue.$alert('页面不存在', '404错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else if (error.response.status === 402) {
		vue.$alert('请求次数限制', '402错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else {
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	}
})
myGet.interceptors.response.use(response => {
	if (response.status === 200) {
		return response.data
	}
	// if (response.status === 200 && response.data.code == '200') {
	//     vue.$message({
	//         message: response.data.msg,
	//         type: "success",
	//     });
	//     return response.data;
	// }
	else {
		vue.$message.error(response.data.info);
		Promise.reject();
	}
}, error => {
	//错误跳转
	console.log(error);
	if (error.response.status === 500) {
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	} else if (error.response.status === 401) {
		sessionStorage.setItem("isLogin", false);
		console.log(sessionStorage.getItem("isLogin"));
		// router.push({ path: "/" })
		// router.go(0)
		return Promise.reject();
	} else if (error.response.status === 404) {
		vue.$alert('页面不存在', '404错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else if (error.response.status === 402) {
		vue.$alert('请求次数限制', '402错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else {
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	}
})

export default {
	loginWechat(obj) {
		return myPost({
			url: urls.loginWechat,
			data: {
				...obj
			},
		})
	},
}
