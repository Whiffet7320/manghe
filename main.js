import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import api from 'api/index.js';
import md5 from 'static/md5.min.js'
import store from './store';
import OSS from 'ali-oss';
import {
	Base64
} from 'js-base64/base64.js';
import crypto from 'crypto-js';

Vue.use(uView);

// 阿里云上传oss图片
function ossUpload(val, tempFilePath = '') {
	return new Promise(async (resolve, reject) => {
		const that = this;
		const date = new Date();
		date.setHours(date.getHours() + 1);
		const policyText = {
			expiration: date.toISOString(), // 设置policy过期时间。
			conditions: [
				// 限制上传大小。
				["content-length-range", 0, 1024 * 1024 * 1024],
			],
		};
		let tiemr = new Date();
		let address = tiemr.getFullYear() + '' + (tiemr.getMonth() + 1) + '' + tiemr
			.getDate();
		const policy = Base64.encode(JSON.stringify(policyText));
		const res1 = await that.$api.uploadToken();
		const signature = crypto.enc.Base64.stringify(crypto.HmacSHA1(
			policy, res1.data.accessKeySecret));
		if (val == 'img') {
			// 上传图片
			uni.chooseImage({
				count: 1,
				success: async function(res) {
					var imageSrc = res.tempFilePaths[0];
					let str = res.tempFilePaths[0].substr(res.tempFilePaths[0].lastIndexOf(
						'.'));
					let nameStr = address + tiemr.getTime() + str;
					uni.uploadFile({
						url: `https://${res1.data.bucket}.${res1.data.url}`, //输入你的bucketname.endpoint
						filePath: imageSrc,
						name: 'file',
						formData: {
							key: nameStr,
							policy: policy, // 输入你获取的的policy
							OSSAccessKeyId: res1.data.accessKeyId, // 输入你的AccessKeyId
							signature: signature, // 输入你获取的的signature
							'x-oss-security-token': res1.data.stsToken
						},
						success: res => {
							if (res.statusCode == '204') {
								return resolve(
									`https://${res1.data.bucket}.${res1.data.url}/${nameStr}`
								)
							} else {
								console.log(res);
							}
						}
					})
				}
			});

		} else if (val == 'voice') {
			// 上传音频
			let str = tempFilePath.substr(tempFilePath.lastIndexOf(
				'.'));
			let nameStr = address + tiemr.getTime() + str;
			uni.uploadFile({
				url: `https://${res1.data.bucket}.${res1.data.url}`, //输入你的bucketname.endpoint
				filePath: tempFilePath,
				name: 'file',
				formData: {
					key: nameStr,
					policy: policy, // 输入你获取的的policy
					OSSAccessKeyId: res1.data.accessKeyId, // 输入你的AccessKeyId
					signature: signature, // 输入你获取的的signature
					'x-oss-security-token': res1.data.stsToken
				},
				success: res => {
					if (res.statusCode == '204') {
						return resolve(
							`https://${res1.data.bucket}.${res1.data.url}/${nameStr}`)
					} else {
						console.log(res);
					}
				}
			})
		}

	})

}

Vue.prototype.$OSSUpload = ossUpload;
Vue.prototype.$Base64 = Base64;
Vue.config.productionTip = false
Vue.prototype.$OSS = md5
Vue.prototype.$apikey = "2AA881310EF08E68659107D9D70D40A1";
Vue.prototype.$api = api
Vue.prototype.$md5 = md5
App.mpType = 'app'

const app = new Vue({
	...App,
	store,
})
app.$mount()
