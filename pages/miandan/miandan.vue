<template>
	<view class="index">
		<view class="banner">
			<image src="../../static/hongbaobanner.png" class="nav-banner"></image>
			<image @click="toBack" src="../../static/路径18.png" class="fanhui"></image>
		</view>
		<view class="center">
			<image src="../../static/矩形147.png" class="juxin"></image>
			<image src="../../static/Group.png" class="pic"></image>
			<text class="tit1">周州粥发出的红包</text>
			<text class="tit2">恭喜发财，大吉大利</text>
			<text class="tit3">0.04元</text>
			<text class="tit4">已存入余额，可直接提现></text>
		</view>
		<view class="footer">
			<view class="tit11">领取5/5个</view>
			<view class="items">
				<view class="item" v-for="(item,i) in list">
					<view class="item-left">
						<view class="pic">
							<image :src="item.facepic" mode=""></image>
						</view>
						<view class="tit">
							<view class="tit1">
								{{item.nickname}}
							</view>
							<view class="tit2">
								{{item.pay_time}}
							</view>
						</view>
					</view>
					<view class="item-right">
						<view class="tit3">
							{{item.free_money}}元
						</view>
						<view class="mian">
							<image v-if="item.free_money != 0" src="/static/免.png"></image>
						</view>
					</view>

				</view>
				<view class="item">

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.openid = uni.getStorageSync('openid')
			this.sub_orderid = option.sub_orderid;
		},
		async onShow() {
			const res = await this.$api.wx_freeorder(this.openid, this.sub_orderid)
			console.log(res)
			this.list = res.list
		},
		data() {
			return {
				sub_orderid: null,
				openid: null,
				list: [], //免单列表
			}
		},
		// created() {
		// 	console.log(uni.upx2px(750 / 414) + 'px')
		// },
		methods: {
			toBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.index {
		.banner {
			width: calc(1.82 * 414rpx);
			height: calc(1.82 * 172rpx);
			opacity: 1;
			position: relative;

			.nav-banner {
				width: 100%;
				height: 100%;
				position: absolute;
			}

			.fanhui {
				height: calc(1.82 * 18rpx);
				width: calc(1.82 * 11rpx);
				margin-top: calc(1.82 * 48rpx);
				margin-left: calc(1.82 * 27rpx);
				opacity: 1;
			}
		}

		.center {
			position: relative;
			margin-top: calc(-1.82 * 33rpx);

			.juxin {
				left: 50%;
				transform: translateX(-50%);
				// margin-top: calc(-1.82 * 33rpx);
				position: absolute;
				top: 0;
				width: calc(1.82 * 380rpx);
				height: calc(1.82 * 233rpx);
				opacity: 1;
			}

			.pic {
				position: absolute;
				top: calc(1.82 * 22rpx);
				left: calc(1.82 * 193rpx);
				width: calc(1.82 * 29rpx);
				height: calc(1.82 * 29rpx);
				opacity: 1;
			}

			.tit1 {
				position: absolute;
				top: calc(1.82 * 61rpx);
				left: 50%;
				transform: translateX(-50%);
				opacity: 1;
				font-size: calc(1.82 * 19rpx);
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: left;
				color: #121314;
				line-height: calc(1.82 * 42rpx);
				letter-spacing: 3.64rpx;
			}

			.tit2 {
				position: absolute;
				top: calc(1.82 * 101rpx);
				left: 50%;
				transform: translateX(-50%);
				opacity: 1;
				font-size: calc(1.82 *10rpx);
				font-family: SourceHanSansCN-Regular;
				color: #9b9b9b;
				line-height: calc(1.82 * 17rpx);
				letter-spacing: 0rpx;
			}

			.tit3 {
				position: absolute;
				top: calc(1.82 * 127rpx);
				left: 50%;
				transform: translateX(-50%);
				opacity: 1;
				font-size: calc(1.82 * 42rpx);
				font-family: SourceHanSansCN-Regular;
				text-align: center;
				color: #af0000;
				line-height: calc(1.82 * 36rpx);
				letter-spacing: 0rpx;
			}

			.tit4 {
				position: absolute;
				top: calc(1.82 * 179rpx);
				left: 50%;
				transform: translateX(-50%);
				opacity: 1;
				font-size: calc(1.82 *10rpx);
				font-family: SourceHanSansCN-Regular;
				text-align: center;
				color: #af0000;
				line-height: calc(1.82 *17rpx);
				letter-spacing: 0rpx;
			}
		}

		.footer {
			margin-left: 50%;
			transform: translateX(-50%);
			margin-top: calc(1.82 * 233rpx);
			// border: 2rpx solid red;
			width: calc(1.82 * 374rpx);
			height: calc(1.82 * 458rpx);
			opacity: 1;
			background: #ffffff;
			border-radius: calc(1.82 * 20rpx);
			box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);
			display: inline-block; //解决margin塌陷

			.tit11 {
				opacity: 1;
				margin-top: calc(1.82 * 15rpx);
				margin-left: calc(1.82 * 23rpx);
				font-size: calc(1.82 *10rpx);
				font-family: SourceHanSansCN-Regular;
				color: #9b9b9b;
				line-height: calc(1.82 *17rpx);
				letter-spacing: 0rpx;
			}

			.items {
				margin-top: 19rpx;

				.item {
					margin: 0 42rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 96rpx;

					.item-left {
						display: flex;

						.pic {
							width: 60rpx;
							height: 60rpx;
							opacity: 1;

							image {
								height: 100%;
								width: 100%;
							}
						}

						.tit {
							display: flex;
							flex-direction: column;
							// justify-content: center;
							// align-items: center;
							margin-left: 18rpx;

							.tit1 {
								font-size: 18rpx;
								font-family: SourceHanSansCN-Regular;
								color: #000000;
								line-height: 31rpx;
								letter-spacing: 0rpx;
							}

							.tit2 {
								width: 200rpx;
								font-size: 18rpx;
								font-family: SourceHanSansCN-Regular;
								color: #9b9b9b;
								line-height: 31rpx;
								letter-spacing: 0rpx;
							}
						}
					}

					.item-right {
						display: flex;
						.tit3 {
							opacity: 1;
							font-size: 18rpx;
							font-family: SourceHanSansCN-Regular;
							text-align: right;
							color: #000000;
							line-height: 31rpx;
							letter-spacing: 0rpx;
						}

						.mian {
							width: 98rpx;
							height: 98rpx;
							opacity: 1;

							image {
								width: 100%;
								height: 100%;
							}
						}
					}


				}
			}
		}
	}
</style>
