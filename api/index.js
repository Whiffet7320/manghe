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
	// if (sessionStorage.getItem("token")) {
	// config.headers.token = sessionStorage.token;
	// config.data = {
	//     pageNum: 1,
	//     pageSize: 1,
	// };
	// config.headers = {
	//     // 'token': sessionStorage.token,
	//     'Access-Control-Allow-Origin': '*',
	//     "access-control-allow-credentials": "true"
	// }
	// }
	// console.log(config)
	return config;
}, error => {
	console.log(error);
	return Promise.reject();
})
myGet.interceptors.request.use(config => {
	// if (sessionStorage.getItem("token")) {
	// config.headers = {
	// 	// 'token': sessionStorage.token,
	// 	'Access-Control-Allow-Origin': '*',
	// 	"access-control-allow-credentials": "true"
	// }
	// config.headers.token = sessionStorage.token;
	// }
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
	login(obj) {
		return myPost({
			url: urls.login,
			params: {
				...obj
			},
			// 要在这里写 headers,从sessionStorage中拿,并给headers设置token
			// headers: {
			//     'token': sessionStorage.getItem("token")
			// },
		})
	},
	wx_login(code, rawData, iv, signature, encryptedData) {
		return myPost({
			url: urls.wx_login,
			data: {
				code,
				rawData,
				iv,
				signature,
				encryptedData
			},
		})
	},
	wx_userinfo(openid) {
		return myPost({
			url: urls.wx_userinfo,
			data: {
				openid
			},
		})
	},
	wx_index() {
		return myPost({
			url: urls.wx_index,
		})
	},
	wx_goodsview(id,openid) {
		return myPost({
			url: urls.wx_goodsview,
			data: {
				id,
				openid,
			},
		})
	},
	wx_goodslist(obj) {
		return myPost({
			url: urls.wx_goodslist,
			data: {
				...obj
			},
		})
	},
	wx_search() {
		return myPost({
			url: urls.wx_search,
		})
	},
	wx_cartlist(openid) {
		return myPost({
			url: urls.wx_cartlist,
			data: {
				openid
			},
		})
	},
	wx_editcartnum(openid, cartid, num, cal_type, sign) {
		return myPost({
			url: urls.wx_editcartnum,
			data: {
				openid,
				cartid,
				num,
				cal_type,
				sign
			},
		})
	},
	wx_addcart(openid, color, size, goods_id, num, sign) {
		return myPost({
			url: urls.wx_addcart,
			data: {
				openid,
				color,
				size,
				goods_id,
				num,
				sign
			},
		})
	},
	wx_cartdel(openid, cartid, sign) {
		return myPost({
			url: urls.wx_cartdel,
			data: {
				openid,
				cartid,
				sign
			},
		})
	},
	wx_goodslike(openid) {
		return myPost({
			url: urls.wx_goodslike,
			data: {
				openid,
			},
		})
	},
	billagreement_view() {
		return myPost({
			url: urls.billagreement_view,
		})
	},
	wx_userreceiver(openid) {
		return myPost({
			url: urls.wx_userreceiver,
			data: {
				openid,
			},
		})
	},
	wx_adduserreceiver(openid, realname, mobile, city, address, is_default, sign) {
		return myPost({
			url: urls.wx_adduserreceiver,
			data: {
				openid,
				realname,
				mobile,
				city,
				address,
				is_default,
				sign
			},
		})
	},
	wx_edituserreceiver(openid, id, realname, mobile, city, address, is_default, sign) {
		return myPost({
			url: urls.wx_edituserreceiver,
			data: {
				openid,
				id,
				realname,
				mobile,
				city,
				address,
				is_default,
				sign
			},
		})
	},
	wx_deluserreceiver(openid, id, sign) {
		return myPost({
			url: urls.wx_deluserreceiver,
			data: {
				openid,
				id,
				sign
			},
		})
	},
	order_submission(openid, order_type, buy_type, goods_id, color, size, num, sign) {
		return myPost({
			url: urls.order_submission,
			data: {
				openid,
				order_type,
				buy_type,
				goods_id,
				color,
				size,
				num,
				sign
			},
		})
	},
	wx_payment(openid, order_type, buy_type, goods_json, address_id, pay_money, goods_money, totalpostage, pay_type,
		sign, recommend_userid) {
		return myPost({
			url: urls.wx_payment,
			data: {
				openid,
				order_type,
				buy_type,
				goods_json,
				address_id,
				pay_money,
				goods_money,
				totalpostage,
				pay_type,
				sign,
				recommend_userid
			},
		})
	},
	wx_userorder(openid, is_free, page, pagesize, orders_status) {
		return myPost({
			url: urls.wx_userorder,
			data: {
				openid,
				is_free,
				page,
				pagesize,
				orders_status
			},
		})
	},
	wx_orderspay(openid, order_id, pay_type, sign) {
		return myPost({
			url: urls.wx_orderspay,
			data: {
				openid,
				order_id,
				pay_type,
				sign
			},
		})
	},
	wx_orderscancel(openid, order_id, sign) {
		return myPost({
			url: urls.wx_orderscancel,
			data: {
				openid,
				order_id,
				sign
			},
		})
	},
	wx_orderspostsaleview(openid, order_id) {
		return myPost({
			url: urls.wx_orderspostsaleview,
			data: {
				openid,
				order_id,
			},
		})
	},
	wx_orderspostsale(openid, order_id, postsale_types, postsale_refundmoney, postsale_remark, sign) {
		return myPost({
			url: urls.wx_orderspostsale,
			data: {
				openid,
				order_id,
				postsale_types,
				postsale_refundmoney,
				postsale_remark,
				sign
			},
		})
	},
	wx_orderspostsalecancel(openid, order_id, sign) {
		return myPost({
			url: urls.wx_orderspostsalecancel,
			data: {
				openid,
				order_id,
				sign
			},
		})
	},
	wx_orderspostsalesubview(openid, order_id) {
		return myPost({
			url: urls.wx_orderspostsalesubview,
			data: {
				openid,
				order_id,
			},
		})
	},
	wx_orderscomment(openid, order_id, comment, sign) {
		return myPost({
			url: urls.wx_orderscomment,
			data: {
				openid,
				order_id,
				comment,
				sign
			},
		})
	},
	wx_orderconfirmreceipt(openid, order_id, sign) {
		return myPost({
			url: urls.wx_orderconfirmreceipt,
			data: {
				openid,
				order_id,
				sign
			},
		})
	},
	wx_goodscomment(goods_id) {
		return myPost({
			url: urls.wx_goodscomment,
			data: {
				goods_id
			},
		})
	},
	guide_content() {
		return myPost({
			url: urls.guide_content,
		})
	},
	wx_freeordersubmit(openid, sub_orderid) {
		return myPost({
			url: urls.wx_freeordersubmit,
			data: {
				openid,
				sub_orderid
			},
		})
	},
	wx_freeorder(openid, sub_orderid) {
		return myPost({
			url: urls.wx_freeorder,
			data: {
				openid,
				sub_orderid
			},
		})
	},
	wx_freeorderrecord(openid, page, pagesize) {
		return myPost({
			url: urls.wx_freeorderrecord,
			data: {
				openid,
				page,
				pagesize
			},
		})
	},
	wx_shareqr(openid, goods_id, sign) {
		return myPost({
			url: urls.wx_shareqr,
			data: {
				openid,
				goods_id,
				sign
			},
		})
	},
	wx_usercommission(openid, page, pagesize) {
		return myPost({
			url: urls.wx_usercommission,
			data: {
				openid,
				page,
				pagesize
			},
		})
	},
	wx_usercommissionmore(openid, page, pagesize) {
		return myPost({
			url: urls.wx_usercommissionmore,
			data: {
				openid,
				page,
				pagesize
			},
		})
	},
	wx_userconsume(openid, page, pagesize) {
		return myPost({
			url: urls.wx_userconsume,
			data: {
				openid,
				page,
				pagesize
			},
		})
	},
	wx_addcollect(openid, goods_id, sign) {
		return myPost({
			url: urls.wx_addcollect,
			data: {
				openid,
				goods_id,
				sign
			},
		})
	},
	wx_mycollectdel(openid, goods_id, sign) {
		return myPost({
			url: urls.wx_mycollectdel,
			data: {
				openid,
				goods_id,
				sign
			},
		})
	},
	wx_withdrawal(openid, withdrawal_type, realname, account, bankname, money, sign) {
		return myPost({
			url: urls.wx_withdrawal,
			data: {
				openid,
				withdrawal_type,
				realname,
				account,
				bankname,
				money,
				sign
			},
		})
	},
	wx_mywithdrawal(openid, page, pagesize) {
		return myPost({
			url: urls.wx_mywithdrawal,
			data: {
				openid,
				page,
				pagesize
			},
		})
	},
	wx_mycollect(openid, page, pagesize) {
		return myPost({
			url: urls.wx_mycollect,
			data: {
				openid,
				page,
				pagesize
			},
		})
	},
}
