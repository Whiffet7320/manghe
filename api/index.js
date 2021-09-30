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
let myPut = axios.create({
	baseURL: urls.baseUrl,
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
				url: '/pages/wode/weixinshouquan/weixinshouquan'
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
		if (response.data.code == 401) {
			uni.navigateTo({
				url: '/pages/wode/weixinshouquan/weixinshouquan'
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
myGet.interceptors.response.use(response => {
	if (response.status === 200) {
		if (response.data.code == 401) {
			uni.navigateTo({
				url: '/pages/wode/weixinshouquan/weixinshouquan'
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
	loginWechat(obj) {
		return myPost({
			url: urls.loginWechat,
			data: {
				...obj
			},
		})
	},
	categories(obj) {
		return myGet({
			url: urls.categories,
			params:{
				...obj
			}
		})
	},
	cities() {
		return myGet({
			url: urls.cities,
		})
	},
	home() {
		return myGet({
			url: urls.home,
		})
	},
	items(id) {
		return myGet({
			url: `${urls.items}/${id}`,
		})
	},
	uploadToken() {
		return myGet({
			url: urls.uploadToken,
		})
	},
	demandQuotes(obj) {
		return myPost({
			url: urls.demandQuotes,
			data:{
				...obj
			}
		})
	},
	address() {
		return myGet({
			url: urls.address,
		})
	},
	addressAdd(obj) {
		return myPost({
			url: urls.addressAdd,
			data: {
				...obj
			},
		})
	},
	addressEdit(obj) {
		return myPut({
			url: `${urls.addressEdit}/${obj.id}`,
			data: {
				...obj
			},
		})
	},
	addressXq(id) {
		return myGet({
			url: `${urls.addressXq}/${id}`,
		})
	},
	config() {
		return myGet({
			url: urls.config,
		})
	},
	userInfo(obj) {
		return myPut({
			url: urls.userInfo,
			data: {
				...obj
			},
		})
	},
	getDemandQuotes(id) {
		return myGet({
			url: `${urls.getDemandQuotes}/${id}`,
		})
	},
	getDemandQuotesList(obj) {
		return myGet({
			url: urls.getDemandQuotesList,
			params:{
				...obj
			}
		})
	},
	getDemandQuotesListXq(id) {
		return myGet({
			url: `${urls.getDemandQuotesListXq}/${id}`
		})
	},
	selectDemandQuotes(obj) {
		return myPut({
			url: `${urls.selectDemandQuotes}/${obj.id}/select`,
			data:{
				quote_id:obj.quote_id
			}
		})
	},
	demandQuotesIdPreOrder(id) {
		return myGet({
			url: `${urls.demandQuotesIdPreOrder}/${id}/pre-order`
		})
	},
	order(obj) {
		return myPost({
			url: urls.order,
			data: {
				...obj
			},
		})
	},
	coupons(obj) {
		return myGet({
			url: urls.coupons,
			params:{
				...obj
			}
		})
	},
	pay(obj) {
		return myPost({
			url: urls.pay,
			data: {
				...obj
			},
		})
	},
	user() {
		return myGet({
			url: urls.user
		})
	},
	moneyRecord(obj) {
		return myGet({
			url: urls.moneyRecord,
			params:{
				...obj
			}
		})
	},
	demandQuotesIidCancel(obj) {
		return myPost({
			url: `${urls.demandQuotesIidCancel}/${obj.id}/cancel`,
			data:{
				...obj
			}
		})
	},
	orderIdComment(obj,id) {
		return myPost({
			url: `${urls.orderIdComment}/${id}/comment`,
			data:{
				...obj
			}
		})
	},
	orderIdCommentXq(id) {
		return myGet({
			url: `${urls.orderIdCommentXq}/${id}/comment`
		})
	},
	feedbacksTypes() {
		return myGet({
			url: urls.feedbacksTypes
		})
	},
	addFeedbacks(obj) {
		return myPost({
			url: urls.feedbacks,
			data:{
				...obj
			}
		})
	},
	feedbacks() {
		return myGet({
			url: urls.feedbacks
		})
	},
	itemsItemIdComments(obj,id) {
		return myGet({
			url: `${urls.itemsItemIdComments}/${id}/comments`,
			params:{
				...obj
			}
		})
	},
	withdraw(obj) {
		return myPost({
			url: urls.withdraw,
			data:{
				...obj
			}
		})
	},
	withdrawList(obj) {
		return myGet({
			url: urls.withdraw,
			params:{
				...obj
			}
		})
	},
	scoreRecords(obj) {
		return myGet({
			url: urls.scoreRecords,
			params:{
				...obj
			}
		})
	},
	scoreToMoney() {
		return myPost({
			url: urls.scoreToMoney,
		})
	},
	turntableItems() {
		return myGet({
			url: urls.turntableItems
		})
	},
	turntableTurn() {
		return myGet({
			url: urls.turntableTurn
		})
	},
	awards(obj) {
		return myGet({
			url: urls.awards,
			params:{
				...obj
			}
		})
	},
	duihuanAwards(id) {
		return myPut({
			url: `${urls.awards}/${id}/use`,
		})
	},
	itemsList(obj) {
		return myGet({
			url: urls.itemsList,
			params:{
				...obj
			}
		})
	},
	goodsOrder(obj) {
		return myPost({
			url: urls.goodsOrder,
			data:{
				...obj
			}
		})
	},
	goodsOrderList(obj) {
		return myGet({
			url: urls.goodsOrder,
			params:{
				...obj
			}
		})
	},
	goodsOrderPay(obj) {
		return myPost({
			url: urls.goodsOrderPay,
			data:{
				...obj
			}
		})
	},
	goodsOrderId(id) {
		return myGet({
			url: `${urls.goodsOrder}/${id}`,
		})
	},
	article(id) {
		return myGet({
			url: `${urls.article}/${id}`,
		})
	},
	goodsOrderShouhuo(id) {
		return myPut({
			url: `${urls.goodsOrderShouhuo}/${id}/take-delivery`,
		})
	},
	goodsStreet() {
		return myGet({
			url: urls.goodsStreet,
		})
	},
	activity() {
		return myGet({
			url: urls.activity,
		})
	},
}
