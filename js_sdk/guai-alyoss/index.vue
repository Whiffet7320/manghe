<template>
	<view>
		<button @tap="chooseVideo()">视频上传</button>
		<button @tap="img()">图片上传</button>
	</view>
</template>
<script>
var timetamp = new Date().getTime();
var uploadFileSize = 1024 * 1024 * 100; // 上传文件的大小限制100m
var osshost = '';  //阿里云对象储存地址
function random_string(len) {
	len = len || 32;
	var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
	var maxPos = chars.length;
	var pwd = '';
	for (let i = 0; i < len; i++) {
		pwd += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}
export default {
	data() {
		return {
			videoSrc: '',
			Imgsrc: '',
			showVideo: false,
			formData: {
				original: 0,
				type: 1,
				detail: '',
				tags: '',
				images: [],
				video: ''
			}
		};
	},
	methods: {
		chooseVideo() {
			var self = this;
			uni.chooseVideo({
				count: 1,
				sourceType: ['camera', 'album'],
				success: function(res) {
					let videoSrc = res.tempFilePath;
					if (res.size > uploadFileSize) {
						uni.showToast({
							title: '文件大小超过系统上传限制：' + uploadFileSize,
							icon: 'none',
							duration: 1000
						});
						return;
					}
					let fileName = self.getFileName(videoSrc);
					self.fileUpload('video',videoSrc,fileName);
				},
				fail: () => {
					uni.showToast({
						title: '取消选择视频',
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//图片上传
		img() {
			var self = this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册选择
				success: function(res) {
					let Imgsrc = res.tempFilePaths[0];
					let fileName = self.getFileName(Imgsrc); // 自定义上传后的文件名称
					self.fileUpload('video',Imgsrc,fileName);
				}
			});
		},
		// 文件上传
		fileUpload(type, path, stroeAs) {
			let self = this;
			uni.showLoading({
				title: '文件上传中'
			});
			var requestTask = uni.request({
				url: '', //请求后台签名地址。
				complete: res => {
					var data = res.data.data;
					uni.uploadFile({
						url: data.host,  //后台给的阿里云存储给的上传地址
						filePath: path,  
						fileType: type,
						name: 'file',
						formData: {
							key: stroeAs,  //文件名
							policy: data.policy,  //后台获取超时时间
							OSSAccessKeyId: data.accessid, //后台获取临时ID
							success_action_status: '200', //让服务端返回200,不然，默认会返回204
							signature: data.signature //后台获取签名
						},
						success: res => {
							console.log(res);
							// console.log('uploadImage success, res is:', res);
							uni.hideLoading();
							uni.showToast({
								title: '上传成功',
								icon: 'success',
								duration: 1000
							});
							if (type === 'image') {
								self.imageList = self.imageList.concat(path);
								self.formData.images.push(osshost + '/' + stroeAs);
							}
							if (type === 'video') {
								self.showVideo = true;
								self.formData.video = osshost + '/' + stroeAs;
							}
						},
						fail: err => {
							uni.hideLoading();
							uni.showModal({
								content: err.errMsg,
								showCancel: false
							});
						}
					});
				}
			});
		},
		_getSuffix(filename) {
			let pos = filename.lastIndexOf('.');
			let suffix = '';
			if (pos != -1) {
				suffix = filename.substring(pos);
			}
			return suffix;
		},
		getFileName(filename) {
			return (
				'user_dir/' +
				new Date().getTime() +
				Math.random()
					.toString(36)
					.substring(3, 20) +
				this._getSuffix(filename)
			);
		}
	}
};
</script>
