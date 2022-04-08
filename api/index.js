import axios from 'axios';
import Vue from 'vue';
import urls from './url.js';
import md5 from '../static/md5.min.js'
const vue = new Vue()
let myPost = axios.create({
	baseURL: urls.baseUrl,
	method: 'post',
	// timeout: 1000,
})
let myUploadImg = axios.create({
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
let myPut = axios.create({
	baseURL: urls.baseUrl,
	method: 'put',
	// timeout: 1000,
})
let dzpMyPost = axios.create({
	baseURL: urls.dzpBaseUrl,
	method: 'post',
	// timeout: 1000,
})
let dzpMyGet = axios.create({
	baseURL: urls.dzpBaseUrl,
	method: 'get',
	// timeout: 1000,
})
let dzpMyDelete = axios.create({
	baseURL: urls.dzpBaseUrl,
	method: 'delete',
	// timeout: 1000,
})
let dzpMyPut = axios.create({
	baseURL: urls.dzpBaseUrl,
	method: 'put',
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
myPut.interceptors.request.use(config => {
	if (uni.getStorageSync('token')) {
		config.headers = {
			'Accept': 'application/json',
			'Authorization': `Bearer ${uni.getStorageSync('token')}`
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
myDelete.interceptors.request.use(config => {
	if (uni.getStorageSync('token')) {
		config.headers = {
			'Accept': 'application/json',
			'Authorization': `Bearer ${uni.getStorageSync('token')}`
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
myPost.interceptors.request.use(config => {
	if (uni.getStorageSync('token')) {
		config.headers = {
			'Accept': 'application/json',
			'Authorization': `Bearer ${uni.getStorageSync('token')}`
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
myUploadImg.interceptors.request.use(config => {
	if (uni.getStorageSync('token')) {
		config.headers = {
			"Content-Type": "multipart/form-data;charse=UTF-8",
			'Authorization': `Bearer ${uni.getStorageSync('token')}`,
		}
		// config.headers.token = uni.getStorageSync('token');
	}
	console.log(config)
	return config;
}, error => {
	console.log(error);
	return Promise.reject();
})
myDelete.interceptors.response.use(response => {
	// console.log(response)
	if (response.status === 200) {
		if (response.data.code == 401) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		} else {
			return response.data
		}
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
myUploadImg.interceptors.response.use(response => {
	// console.log(response)
	if (response.status === 200) {
		if (response.data.code == 401) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		} else {
			return response.data
		}
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
myGet.interceptors.request.use(config => {
	if (uni.getStorageSync('token')) {
		config.headers = {
			'Accept': 'application/json',
			// 'token': sessionStorage.token,
			'Authorization': `Bearer ${uni.getStorageSync('token')}`,
			'Access-Control-Allow-Origin': '*',
			"access-control-allow-credentials": "true"
		}
		config.headers.token = uni.getStorageSync('token');
	}
	return config;
}, error => {
	console.log(error);
	return Promise.reject();
})
myPut.interceptors.response.use(response => {
	// console.log(response)
	if (response.status === 200) {
		if (response.data.code == 401) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		} else {
			return response.data
		}
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
myPost.interceptors.response.use(response => {
	// console.log(response)
	if (response.status === 200) {
		if (response.data.code == 410001) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		} else {
			return response.data
		}
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
	} else if (error.response.status === 410001) {
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
		if (response.data.code == 410001) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		} else {
			return response.data
		}
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
	} else if (error.response.status === 410001) {
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

dzpMyPut.interceptors.request.use(config => {
	if (uni.getStorageSync('token')) {
		config.headers = {
			'Accept': 'application/json',
			'Authorization': `Bearer ${uni.getStorageSync('token')}`
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
dzpMyPost.interceptors.request.use(config => {
	if (uni.getStorageSync('token')) {
		config.headers = {
			'Accept': 'application/json',
			'Authorization': `Bearer ${uni.getStorageSync('token')}`
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
dzpMyGet.interceptors.request.use(config => {
	if (uni.getStorageSync('token')) {
		config.headers = {
			'Accept': 'application/json',
			// 'token': sessionStorage.token,
			'Authorization': `Bearer ${uni.getStorageSync('token')}`,
			'Access-Control-Allow-Origin': '*',
			"access-control-allow-credentials": "true"
		}
		config.headers.token = uni.getStorageSync('token');
	}
	return config;
}, error => {
	console.log(error);
	return Promise.reject();
})
dzpMyPut.interceptors.response.use(response => {
	// console.log(response)
	if (response.status === 200) {
		if (response.data.code == 401) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		} else {
			return response.data
		}
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
dzpMyPost.interceptors.response.use(response => {
	// console.log(response)
	if (response.status === 200) {
		if (response.data.code == 401) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		} else {
			return response.data
		}
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
dzpMyGet.interceptors.response.use(response => {
	if (response.status === 200) {
		if (response.data.code == 401) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		} else {
			return response.data
		}
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
	doLogin(obj) {
		return myPost({
			url: urls.doLogin,
			params: {
				...obj
			}
		})
	},
	getAddressList(obj) {
		var timestamp = new Date().getTime();
		return myPost({
			url: urls.getAddressList,
			params: {
				...obj,
				// user_id:uni.getStorageSync('userId'),
				user_id: 470320,
				sign: md5(`BlindBox${timestamp}`).toUpperCase(),
				timestamp,
			}
		})
	},
	updateAddress(obj) {
		var timestamp = new Date().getTime();
		return myPost({
			url: urls.updateAddress,
			params: {
				...obj,
				user_id:uni.getStorageSync('userId'),
				sign: md5(`BlindBox${timestamp}`).toUpperCase(),
				timestamp,
			}
		})
	},
	deleteAddress(obj){
		var timestamp = new Date().getTime();
		return myPost({
			url: urls.deleteAddress,
			params: {
				...obj,
				user_id:uni.getStorageSync('userId'),
				sign: md5(`BlindBox${timestamp}`).toUpperCase(),
				timestamp,
			}
		})
	},
	getOrderList(obj){
		var timestamp = new Date().getTime();
		return myPost({
			url: urls.getOrderList,
			params: {
				...obj,
				user_id:uni.getStorageSync('userId'),
				sign: md5(`BlindBox${timestamp}`).toUpperCase(),
				timestamp,
			}
		})
	},
	getFreeBox(obj){
		var timestamp = new Date().getTime();
		return myPost({
			url: urls.getFreeBox,
			params: {
				...obj,
				user_id:uni.getStorageSync('userId'),
				sign: md5(`BlindBox${timestamp}`).toUpperCase(),
				timestamp,
			}
		})
	},
	getAllBoxShop(obj){
		var timestamp = new Date().getTime();
		return myPost({
			url: urls.getAllBoxShop,
			params: {
				...obj,
				user_id:uni.getStorageSync('userId'),
				sign: md5(`BlindBox${timestamp}`).toUpperCase(),
				timestamp,
			}
		})
	},
	getBoxPrice(obj){
		var timestamp = new Date().getTime();
		return myPost({
			url: urls.getBoxPrice,
			params: {
				...obj,
				user_id:uni.getStorageSync('userId'),
				sign: md5(`BlindBox${timestamp}`).toUpperCase(),
				timestamp,
			}
		})
	},
	buyBox(obj){
		var timestamp = new Date().getTime();
		return myPost({
			url: urls.buyBox,
			params: {
				...obj,
				user_id:uni.getStorageSync('userId'),
				sign: md5(`BlindBox${timestamp}`).toUpperCase(),
				timestamp,
			}
		})
	},
	getShopBySubstitution(obj){
		var timestamp = new Date().getTime();
		return myPost({
			url: urls.getShopBySubstitution,
			params: {
				...obj,
				user_id:uni.getStorageSync('userId'),
				sign: md5(`BlindBox${timestamp}`).toUpperCase(),
				timestamp,
			}
		})
	},
	getShopInfo(obj){
		var timestamp = new Date().getTime();
		return myPost({
			url: urls.getShopInfo,
			params: {
				...obj,
				user_id:uni.getStorageSync('userId'),
				sign: md5(`BlindBox${timestamp}`).toUpperCase(),
				timestamp,
			}
		})
	},
	substitutionOrder(obj){
		var timestamp = new Date().getTime();
		return myPost({
			url: urls.substitutionOrder,
			params: {
				...obj,
				user_id:uni.getStorageSync('userId'),
				sign: md5(`BlindBox${timestamp}`).toUpperCase(),
				timestamp,
			}
		})
	},
	getMallTop(obj){
		var timestamp = new Date().getTime();
		return myPost({
			url: urls.getMallTop,
			params: {
				...obj,
				user_id:uni.getStorageSync('userId'),
				sign: md5(`BlindBox${timestamp}`).toUpperCase(),
				timestamp,
			}
		})
	},
	changeOrderToPick(obj){
		var timestamp = new Date().getTime();
		return myPost({
			url: urls.changeOrderToPick,
			params: {
				...obj,
				user_id:uni.getStorageSync('userId'),
				sign: md5(`BlindBox${timestamp}`).toUpperCase(),
				timestamp,
			}
		})
	},
	getHomeMessage(obj){
		var timestamp = new Date().getTime();
		return myPost({
			url: urls.getHomeMessage,
			params: {
				...obj,
				user_id:uni.getStorageSync('userId'),
				sign: md5(`BlindBox${timestamp}`).toUpperCase(),
				timestamp,
			}
		})
	},
	changeOrderToDecompose(obj){
		var timestamp = new Date().getTime();
		return myPost({
			url: urls.changeOrderToDecompose,
			params: {
				...obj,
				user_id:uni.getStorageSync('userId'),
				sign: md5(`BlindBox${timestamp}`).toUpperCase(),
				timestamp,
			}
		})
	},
	completeOrder(obj){
		var timestamp = new Date().getTime();
		return myPost({
			url: urls.completeOrder,
			params: {
				...obj,
				user_id:uni.getStorageSync('userId'),
				sign: md5(`BlindBox${timestamp}`).toUpperCase(),
				timestamp,
			}
		})
	},
	getSystemInfo(obj){
		var timestamp = new Date().getTime();
		return myPost({
			url: urls.getSystemInfo,
			params: {
				...obj,
				user_id:uni.getStorageSync('userId'),
				sign: md5(`BlindBox${timestamp}`).toUpperCase(),
				timestamp,
			}
		})
	},
	queryLogistics(obj){
		var timestamp = new Date().getTime();
		return myPost({
			url: urls.queryLogistics,
			params: {
				...obj,
				user_id:uni.getStorageSync('userId'),
				sign: md5(`BlindBox${timestamp}`).toUpperCase(),
				timestamp,
			}
		})
	},
	getCardInfoByOrder(obj){
		var timestamp = new Date().getTime();
		return myPost({
			url: urls.getCardInfoByOrder,
			params: {
				...obj,
				user_id:uni.getStorageSync('userId'),
				sign: md5(`BlindBox${timestamp}`).toUpperCase(),
				timestamp,
			}
		})
	},
	upload_pic(file, type) {
		return new Promise(async (resolve, reject) => {
			uni.uploadFile({
				url: `${urls.baseUrl}${urls.upload_pic}`,
				filePath: file.path,
				header: {
					"Content-Type": "multipart/form-data;charse=UTF-8",
					'Authorization': `Bearer ${uni.getStorageSync('token')}`,
				},
				name: 'image',
				formData: {
					token: uni.getStorageSync('token'),
					type,
				},
				success: (res) => {
					if (JSON.parse(res.data).code == 401) {
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}
					return resolve(JSON.parse(res.data))
				}
			})
		})
	},
}
