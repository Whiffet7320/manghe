import config from '../api/url.js';
export default{
	uploadImageOne(opt, successCallback, errorCallback) {
		let that = this;
		if (typeof opt === 'string') {
			let url = opt;
			opt = {};
			opt.url = url;
		}
		let count = opt.count || 1,
			sizeType = opt.sizeType || ['compressed'],
			sourceType = opt.sourceType || ['album', 'camera'],
			is_load = opt.is_load || true,
			uploadUrl = opt.url || '',
			inputName = opt.name || 'pics',
			fileType = opt.fileType || 'image';
		uni.chooseImage({
			count: count, //最多可以选择的图片总数  
			sizeType: sizeType, // 可以指定是原图还是压缩图，默认二者都有  
			sourceType: sourceType, // 可以指定来源是相册还是相机，默认二者都有  
			success:(res)=> {
				//启动上传等待中...  
				uni.showLoading({
					title: '图片上传中',
				});
				uni.uploadFile({
					url: config.baseUrl + '/api/' + uploadUrl,
					filePath: res.tempFilePaths[0],
					fileType: fileType,
					name: inputName,
					formData: {
						'filename': inputName
					},
					header: {
						"Content-Type": "multipart/form-data",
						"Authori-zation": 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res)=> {
						uni.hideLoading();
						if (res.statusCode == 403) {
							uni.showToast({
								title: res.data,
								icon:"none"
							})
						} else {
							let data = res.data ? JSON.parse(res.data) : {};
							if (data.status == 200) {
								successCallback && successCallback(data)
							} else {
								errorCallback && errorCallback(data);
								uni.showToast({
									title: data.msg,
									icon:"none"
								})
							}
						}
					},
					fail:(res)=> {
						uni.hideLoading();
						uni.showToast({
							title: '上传图片失败',
							icon:"none"
						})
					}
				})
			}
		})
	},
	//除法函数，用来得到精确的除法结果
	//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果
	//返回值：arg1除以arg2的精确结果
	argDiv(arg1, arg2) {
		arg1 = parseFloat(arg1);
		arg2 = parseFloat(arg2);
		var t1 = 0,
			t2 = 0,
			r1, r2;
		try {
			t1 = arg1.toString().split(".")[1].length;
		} catch (e) {}
		try {
			t2 = arg2.toString().split(".")[1].length;
		} catch (e) {}
		r1 = Number(arg1.toString().replace(".", ""));
		r2 = Number(arg2.toString().replace(".", ""));
		return this.argMul(r1 / r2, Math.pow(10, t2 - t1));
	},
	//加法函数，用来得到精确的加法结果
	//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
	//返回值：arg1加上arg2的精确结果
	argAdd(arg1, arg2) {
		arg2 = parseFloat(arg2);
		var r1, r2, m;
		try {
			r1 = arg1.toString().split(".")[1].length
		} catch (e) {
			r1 = 0
		}
		try {
			r2 = arg2.toString().split(".")[1].length
		} catch (e) {
			r2 = 0
		}
		m = Math.pow(100, Math.max(r1, r2));
		return (this.argMul(arg1, m) + this.argMul(arg2, m)) / m;
	},
	//减法函数，用来得到精确的减法结果
	//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
	//返回值：arg1减去arg2的精确结果
	argSub(arg1, arg2) {
		arg1 = parseFloat(arg1);
		arg2 = parseFloat(arg2);
		var r1, r2, m, n;
		try {
			r1 = arg1.toString().split(".")[1].length
		} catch (e) {
			r1 = 0
		}
		try {
			r2 = arg2.toString().split(".")[1].length
		} catch (e) {
			r2 = 0
		}
		m = Math.pow(10, Math.max(r1, r2));
		//动态控制精度长度
		n = (r1 >= r2) ? r1 : r2;
		return ((this.argMul(arg1, m) - this.argMul(arg2, m)) / m).toFixed(n);
	},
	//乘法函数，用来得到精确的乘法结果
	//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
	//返回值：arg1乘以arg2的精确结果
	argMul(arg1, arg2) {
		arg1 = parseFloat(arg1);
		arg2 = parseFloat(arg2);
		var m = 0,
			s1 = arg1.toString(),
			s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length
		} catch (e) {}
		try {
			m += s2.split(".")[1].length
		} catch (e) {}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
	},
	onCopy(str){
		if(str!=""){
			uni.setClipboardData({
				data: str.toString(),
				success: () => {
					uni.showToast({
						title:"已复制到剪切板",
						icon:"none"
					})
				}
			})
		}
	}
}