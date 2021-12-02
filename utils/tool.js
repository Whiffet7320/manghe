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
}