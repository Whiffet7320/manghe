<script>
	export default {
		globalData: {
			spid: 0,
			code: 0
		},
		onLaunch(option) {
			if (option.query.hasOwnProperty('scene')) {
				switch (option.scene) {
					//扫描小程序码
					case 1047:
						let val = this.$tool.getUrlParams(decodeURIComponent(option.query.scene));
						this.globalData.code = val.pid === undefined ? val : val.pid;
						break;
						//长按图片识别小程序码
					case 1048:
						this.globalData.code = option.query.scene;
						break;
						//手机相册选取小程序码
					case 1049:
						this.globalData.code = option.query.scene;
						break;
						//直接进入小程序
					case 1001:
						this.globalData.spid = option.query.scene;
						break;
				}
			}
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
			});
			updateManager.onUpdateReady(function() {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success: function(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});
			});
			updateManager.onUpdateFailed(function() {
				uni.showToast({
					title:"新版本下载失败",
					icon:"none"
				})
			});
		},
		onShow: function(route) {
			console.log(route, 'onShow')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	page{
		font-family: PingFang SC;
	}
</style>
