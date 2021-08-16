<template>
	<view class="index">
		<image class="pic1" src="../../../static/img/1229310763000_mthumb.png" mode=""></image>
		<view class="nav1">
			<view class="tit1">HI ~ 请登录</view>
			<view @click="login" class="btn">
				<u-icon name="weixin-fill" color="#ffffff" size="40"></u-icon>
				<view class="txt1">微信授权登录</view>
			</view>
		</view>
		<!-- 		<button @click="login" class="btn">
			点击授权
		</button> -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: null,
				recommend_userid: null,
				goods_id: null,
			}
		},
		onLoad(option) {
			console.log(option)
			this.goods_id = option.goods_id;
			this.recommend_userid = option.recommend_userid
		},
		methods: {
			login() {
				const that = this;
				uni.getUserProfile({
					desc: '登录',
					success: function(infoRes) {
						console.log(infoRes)
						uni.login({
							provider: 'weixin',
							success: async function(loginRes) {
								var code = loginRes.code;
								try {
									const res = await that.$api.loginWechat({
										code: code,
										user_info: infoRes.userInfo,
									})
									console.log(res, '授权')
									if (res.code == 200) {
										uni.setStorageSync('myUser',res.data.user)
										uni.setStorage({
											key: 'token',
											data: res.data.token_info.access_token,
											success() {
												that.$refs.uToast
													.show({
														title: res
															.msg,
														type: 'success',
														back: true,
													})
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
							}
						})
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #4988FD;
	}
</style>
<style scoped lang="scss">
	.index {
		position: relative;
	}

	.pic1 {
		position: absolute;
		z-index: 3;
		top: 176rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 176rpx;
		height: 176rpx;
		background: #FFFFFF;
		border-radius: 50%;
		opacity: 1;
	}

	.nav1 {
		position: absolute;
		z-index: 2;
		top: 266rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 576rpx;
		height: 760rpx;
		background: #FFFFFF;
		opacity: 1;
		border-radius: 16rpx;

		.tit1 {
			margin-top: 152rpx;
			text-align: center;
			font-size: 40rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 54rpx;
			color: #000000;
			opacity: 1;
		}

		.btn {
			display: flex;
			width: 496rpx;
			height: 88rpx;
			background: #24BC29;
			opacity: 1;
			border-radius: 16rpx;
			padding-left: 120rpx;

			.txt1 {
				font-size: 28rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 88rpx;
				margin-left: 44rpx;
				color: #FFFFFF;
				opacity: 1;
			}
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
