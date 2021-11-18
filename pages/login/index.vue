<template>
	<view class="wechat_login">
		<view class="img">
			<image src="/static/images/wechat_login.png" mode="widthFix"></image>
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
				btnShow:true,
				iv:'',
				phoneData:'',
			}
		},
		methods: {
			async getPhoneNumber(e) {
				// uni.login({
				// 	provider: 'weixin',
				// 	success:async (loginres)=> {
				// 		var code = loginres.code;
				// 		const res = await this.$api.phone({
				// 			code,
				// 			iv:e.detail.iv,
				// 			encryptedData:e.detail.encryptedData
				// 		})
				// 		console.log(res)
				// 	}
				// })
				console.log(e)
				console.log(e.detail.iv)
				console.log(e.detail.encryptedData);
				this.iv = e.detail.iv;
				this.phoneData = e.detail.encryptedData
				this.btnShow = false;
			},
			getUserProfile() {
				let infoRes = "";
				if (uni.getUserProfile) {
					uni.getUserProfile({
						desc: '登录',
						success: (res) => {
							infoRes = res;
							uni.login({
								provider: 'weixin',
								success: (loginres) => {
									let data = {
										code: loginres.code,
										userinfo: infoRes.userInfo,
										iv:this.iv,
										encryptedData:this.phoneData,
									}
									this.$api.loginWechat(data).then((res) => {
										if (res.code == 200) {
											let expressTime = this.$u.timeFormat(new Date()
												.getTime(), 'yyyy-mm-dd');
											this.$store.commit("setUserinfo", {
												info: infoRes.userInfo,
												time: expressTime
											});
											uni.setStorageSync("token", res.data.token);
											uni.navigateBack({
												delta: 1
											})
											// if (uni.getStorage('loginTime') == 'one') {
											// 	uni.navigateBack({
											// 		delta: 1
											// 	})
											// } else {
											// 	uni.setStorageSync("loginTime", 'one');
											// 	uni.switchTab({
											// 		url: "/pages/tabBar/user"
											// 	})
											// }
										} else {
											this.$u.toast(res.msg);
										}
									})
								}
							});
						},
						fail: (err) => {
							console.log(err);
							this.$u.toast("取消授权");
						}
					})
				} else {
					this.$u.toast("取消授权");
				}
			},
			cancelAuth() {
				uni.switchTab({
					url: "/pages/tabBar/index"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wechat_login {
		padding: 72rpx 116rpx;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.img {
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				width: 452rpx;
				height: 450rpx;
			}
		}

		.btn-wrapper {
			margin-top: 86rpx;
			width: 100%;
			display: flex;
			flex-direction: column;

			.btn {
				width: 100%;
				height: 64rpx;
				line-height: 64rpx;
				margin-bottom: 40rpx;
				border-radius: 32rpx;
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
