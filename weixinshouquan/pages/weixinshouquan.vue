<template>
	<view class="index">
		<view class="container">
			<image class="pic" src="/static/251.png" mode=""></image>
			<view class="tit">使用微信授权登录后才允许操作哦～</view>
		</view>
		<!-- 		<button open-type='getUserInfo' withCredentials="true" lang="zh_CN" @getuserinfo="login" class="btn">
			点击授权
		</button> -->
		<button @click="login" class="btn">
			点击授权
		</button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: null,
			}
		},
		methods: {
			login() {
				const that = this;
				uni.getUserProfile({
					desc: '登录',
					success: function(infoRes) {
						uni.login({
							provider: 'weixin',
							success: async function(loginRes) {
								var code = loginRes.code;
								console.log(code)
								try {
									const res = await that.$api.wx_login(
										code,
										infoRes.rawData,
										infoRes.iv,
										infoRes.signature,
										infoRes.encryptedData
									)
									console.log(res, '授权')
									if (res.result == 1) {
										uni.setStorage({
											key: 'user',
											data: {
												nickname: res.nickname,
												avatarUrl: res.avatarUrl
											},
										})
										uni.setStorage({
											key: 'openid',
											data: res.openid,
											success() {
												that.$refs.uToast.show({
													title: res.msg,
													type: 'success',
													url: '/pages/wode/wode',
													isTab: true
												})
												// uni.switchTab({
												// 	url:'/pages/wode/wode'
												// })
											}
										})
									} else {
										that.$refs.uToast.show({
											title: res.msg,
											type: 'error',
										})
									}
								} catch (err) {
									console.log(err, 'err')
								}

								// const res = await that.$api.wx_login(
								// 	code,
								// 	infoRes.rawData,
								// 	infoRes.iv,
								// 	infoRes.signature,
								// 	infoRes.encryptedData
								// )
								// if (res.result == 1) {
								// 	uni.setStorage({
								// 		key: 'user',
								// 		data: {
								// 			nickname: res.nickname,
								// 			avatarUrl: res.avatarUrl
								// 		},
								// 	})
								// 	uni.setStorage({
								// 		key: 'openid',
								// 		data: res.openid,
								// 		success() {
								// 			that.$refs.uToast.show({
								// 				title: res.msg,
								// 				type: 'success',
								// 				url: '/pages/wode/wode',
								// 				isTab: true
								// 			})
								// 			// uni.switchTab({
								// 			// 	url:'/pages/wode/wode'
								// 			// })
								// 		}
								// 	})
								// } else {
								// 	that.$refs.uToast.show({
								// 		title: res.msg,
								// 		type: 'error',
								// 	})
								// }
							}
						})
					}
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	page {
		background: #f8f8f8;
	}

	.index {}

	.container {
		width: 750rpx;
		height: 458rpx;
		opacity: 1;
		background: #ffffff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.pic {
			width: 120rpx;
			height: 120rpx;
			opacity: 1;
		}

		.tit {
			margin-top: 40rpx;
			opacity: 1;
			font-size: 18rpx;
			font-family: SourceHanSansCN-Regular;
			text-align: left;
			color: #000000;
		}
	}

	.btn {
		margin: 63rpx auto;
		width: 428rpx;
		height: 80rpx;
		opacity: 1;
		background: #ebbfcc;
		border-radius: 18rpx;
		font-size: 22rpx;
		font-family: PingFang SC, PingFang SC-Bold;
		font-weight: 700;
		text-align: center;
		line-height: 80rpx;
		color: #ffffff;
	}
</style>
