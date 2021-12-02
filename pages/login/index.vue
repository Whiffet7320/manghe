<template>
	<view class="wechat_login">
		<view class="img">
			<image src="/static/image/wechat_login.png" mode="widthFix"></image>
		</view>
		<view class="btn-wrapper">
			<button v-if="btnShow" class="u-reset-button btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
				<view class="txt1">手机号授权</view>
			</button>
			<button v-else class="u-reset-button btn" @tap="getUserProfile">微信授权登录</button>
			<view class="cancel" @click="cancelAuth">取消授权</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				infoRes:"",
				btnShow:false,
				iv:'',
				phoneData:'',
			}
		},
		methods: {
			async getPhoneNumber(e) {
				this.iv = e.detail.iv;
				this.phoneData = e.detail.encryptedData
				this.btnShow = false;
			},
			getUserProfile() {
				uni.showLoading({
					title: '正在登录中'
				});
				let infoRes = "";
				if (uni.getUserProfile) {
					uni.getUserProfile({
						desc: '登录',
						success: (res) => {
							infoRes = res;
							let userInfo = res.userInfo;
							userInfo.spread_spid = getApp().globalData.spid; //获取推广人ID
							userInfo.spread_code = getApp().globalData.code; //获取推广人分享二维码ID
							uni.login({
								provider: 'weixin',
								success: (loginres) => {
									userInfo.code = loginres.code;
									this.$api.silenceAuth({
										code:loginres.code,
										spread_code: getApp().spread_code,
										spread_spid: getApp().spread_spid
									}).then(res => {
										uni.hideLoading();
										if (res.data.token !== undefined && res.data.token) {
											uni.hideLoading();
											let time = res.data.expires_time - Math.round(new Date() / 1000);
											this.$store.commit('Login', {token: res.data.token,time: time});
											uni.setStorageSync("token", res.data.token);
											this.getUserInfo();
										}
									}).catch(err => {
										uni.hideLoading();
										console.log(err)
									});
								}
							});
						},
						fail: (err) => {
							console.log(err);
							uni.hideLoading();
							this.$u.toast("取消授权");
						}
					})
				} else {
					uni.hideLoading();
					this.$u.toast("取消授权");
				}
			},
			getUserInfo() {
				this.$api.getUserInfo().then(res => {
					if(res.status==200){
						this.userInfo = res.data;
						this.$store.commit('SetUid', res.data.uid);
						this.$store.commit('UpdateUserinfo', res.data);
						this.$u.toast("登录成功");
						uni.navigateBack({
							delta: 1
						})
					}
				});
			},
			cancelAuth() {
				uni.switchTab({
					url: "/pages/tabBar/index"
				})
			}
		},
		onLoad(options) {
			// if(!this.$store.getters.isLogin){
			// 	uni.login({
			// 		provider: 'weixin',
			// 		success: (res) => {
			// 			this.$api.silenceAuth({
			// 				code:res.code,
			// 				spread_code: getApp().spread_code,
			// 				spread_spid: getApp().spread_spid
			// 			}).then(res => {
			// 				if (res.data && res.data.token !== undefined) {
			// 					uni.hideLoading();
			// 					let time = res.data.expires_time - Math.round(new Date() / 1000);
			// 					this.$store.commit('Login', {token: res.data.token,time: time});
			// 					uni.setStorageSync("token", res.data.token);
			// 					this.$store.commit('SetUid', res.data.userInfo.uid);
			// 					this.$store.commit('UpdateUserinfo', res.data.userInfo);
			// 					uni.navigateBack({
			// 						delta:1
			// 					})
			// 				} else {
			// 					uni.hideLoading();
			// 					uni.navigateTo({
			// 						url: '/pages/login/index'
			// 					})
			// 				}
			// 			}).catch(err => {
			// 				uni.hideLoading();
			// 				console.log(err)
			// 			});
			// 		}
			// 	})
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.wechat_login {
		padding: 72rpx 34rpx;
		height:100vh;
		.img {
			display: flex;
			align-items: center;
			justify-content: center;
			width:100%;
			image {
				width: 100%;
			}
		}

		.btn-wrapper {
			margin-top: 86rpx;
			width: 100%;
			display: flex;
			flex-direction: column;

			.btn {
				width: 100%;
				height: 86rpx;
				line-height: 86rpx;
				margin-bottom: 40rpx;
				border-radius: 43rpx;
				font-size: 28rpx;
				color: #fff;
				background: #07c160;
			}

			.cancel {
				width: 100%;
				color: #C4C4C4;
				text-align: center;
			}
		}
	}
</style>
