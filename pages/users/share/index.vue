<template>
	<view class="spreadwrap">
		<image src="/static/image/user/shabg.jpg" class="bg"></image>
		<u-gap height="718"></u-gap>
		<view class="ewm">
			<image :src="xcxImg" mode="aspectFit"></image>
		</view>
		<view class="sharecon">
			<image src="/static/image/user/shabg2.png" class="sbg"></image>
			<view class="tit">我的邀请码</view>
			<view class="code">{{code}}</view>
			<view class="stit">邀请成为用户</view>
		</view>
		<u-gap height="70"></u-gap>
		<view class="btn" @click="show = true">分享图片</view>
		<u-gap height="70"></u-gap>
		<!-- 弹框 -->
		<u-popup v-model="show" mode="center" border-radius="14" width="600" height="1000">
			<view @longpress="logoTime" style="width: 600rpx;height: 1000rpx;">
				<image :src="arr[1].poster" class="popImg" mode=""></image>
			</view>
		</u-popup>
		<!-- 操作菜单 -->
		<u-action-sheet @click='czClick' :list="czlist" v-model="czShow"></u-action-sheet>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	export default {
		data() {
			return {
				czShow:false,
				czlist: [{
					text: '保存到相册',
				}],
				show: false,
				code: "",
				arr: [],
				xcxImg: '',
			}
		},
		computed:{
			...mapState(["userInfo"])
		},
		methods: {
			async getBanner() {
				const res = await this.$api.spreadBanner(1)
				console.log(res)
				this.arr = res.data;
			},
			async getData() {
				const res = await this.$api.userRoutine_code()
				console.log(res)
				this.xcxImg = res.data.url;
			},
			czClick(i) {
				if(i==0){
					uni.downloadFile({
					    url: this.arr[1].poster,
					    success: (res) => {
					        if (res.statusCode === 200) {
					            console.log(res.tempFilePath);
								let url = res.tempFilePath;
								uni.getSetting({
									success(cres) {
										if (!cres.authSetting['scope.writePhotosAlbum']) {
											uni.authorize({
												scope: 'scope.writePhotosAlbum',
												success() {
													uni.showLoading({
														title: '保存中...',
														mask: true
													});
													uni.saveImageToPhotosAlbum({
														filePath: url,
														success: (ress) => {
															uni.hideLoading();
															uni.showToast({
																icon: 'none',
																title: '保存成功'
															})
														},
														fail: err => {
															console.log(err)
															uni.hideLoading();
															uni.showToast({
																icon: 'none',
																title: '保存失败'
															})
														}
													})
												}
											});
										} else {
											uni.showLoading({
												title: '保存中...',
												mask: true
											});
											uni.saveImageToPhotosAlbum({
												filePath: url,
												success: (ress) => {
													uni.hideLoading();
													uni.showToast({
														icon: 'none',
														title: '保存成功'
													})
												},
												fail: err => {
													console.log(err)
													uni.hideLoading();
													uni.showToast({
														icon: 'none',
														title: '保存失败'
													})
												}
											})
										}
									}
								})
					        }
					    },
						fail: (err)=> {
							uni.showToast({
								icon: 'none',
								title: err
							})
						}
					});
				}
			},
			logoTime() {
				this.czShow = true;
			},
		},
		onLoad(option) {
			this.code = option.code;
			this.getBanner();
			this.getData()
		},
		onShareAppMessage() {
			return {
				title: this.userInfo.nickname + '-分销海报',
				imageUrl: this.arr[1].poster,
				path: '/pages/tabBar/index?spread=' + this.userInfo.uid
			};
		}
	}
</script>

<style>
	page {
		background: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.popImg {
		width: 100%;
		height: 100%;
	}

	.spreadwrap {
		position: relative;
	}

	.bg {
		width: 100%;
		height: 876rpx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.ewm {
		width: 276rpx;
		height: 276rpx;
		border: 2rpx #BD9E81 solid;
		background-color: #FFFFFF;
		padding: 20rpx;
		position: absolute;
		top: 542rpx;
		left: 50%;
		transform: translateX(-50%);
		z-index: 30;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.sharecon {
		width: 672rpx;
		height: 366rpx;
		margin: 0 auto;
		position: relative;
		z-index: 20;
		text-align: center;

		.sbg {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -2;
		}

		.tit {
			font-size: 24rpx;
			color: #707070;
			padding: 132rpx 0 8rpx 0;
		}

		.code {
			font-size: 48rpx;
			color: #BD9E81;
			font-weight: bold;
			position: relative;

			&::before {
				content: "";
				position: absolute;
				left: 50%;
				bottom: -20rpx;
				transform: translateX(-50%);
				width: 20rpx;
				height: 2rpx;
				background-color: #BD9E81;
			}
		}

		.stit {
			padding-top: 38rpx;
			font-size: 20rpx;
			color: #707070;
		}
	}

	.btn {
		margin: 0 auto;
		width: 522rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #BD9E81;
		border-radius: 10rpx;
		text-align: center;
		font-size: 28rpx;
		color: #FFFFFF;
	}
</style>
