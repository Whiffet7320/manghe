<template>
	<view class="index">
		<view class="nav">
			<image src="../../static/vv.png" mode=""></image>
			<u-icon @tap="goTo" class="icon" name="arrow-left" size="40"></u-icon>
		</view>
		<view class="container">
			<image src="../../static/Path1.png" mode=""></image>
			<view class="tit1">立即购买</view>
			<view class="close">
				<image src="../../static/组82.png" mode=""></image>
			</view>
			<view class="bottom">
				<u-radio-group wrap v-model="value" @change="radioGroupChange">
					<u-radio name="wx">
						<view class="wx">
							<image class="dibu" src="../../static/矩形139.png" mode=""></image>
							<image class="wxpic" src="../../static/组137.png" mode=""></image>
							<view class="tit">微信支付</view>
						</view>
					</u-radio>
					<u-radio name="zfb">
						<view class="zfb">
							<image class="dibu" src="../../static/矩形139.png" mode=""></image>
							<image class="wxpic" src="../../static/路径287.png" mode=""></image>
							<view class="tit">支付宝支付</view>
						</view>
					</u-radio>
				</u-radio-group>
			</view>
		</view>
		<view class="footer">
			<view class="tit">
				支付￥599.69
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 'wx',
			};
		},
		methods: {
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
			}
		}
	};
</script>

<style scoped lang="scss">
	.index {
		position: relative;
	}

	.nav {
		position: relative;

		image {
			width: 748rpx;
			height: 618rpx;
			opacity: 1;
		}

		.icon {
			position: absolute;
			top: 87rpx;
			left: 47rpx;
		}
	}

	.container {
		position: absolute;
		top: 618rpx;
		width: 750rpx;
		height: 716rpx;
		opacity: 1;

		image {
			width: 100%;
			height: 100%;
		}

		.tit1 {
			position: absolute;
			top: 63rpx;
			left: 50%;
			transform: translateX(-50%);
			opacity: 1;
			font-size: 29rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Medium;
			font-weight: 500;
			text-align: center;
			color: #4a4a4a;
			line-height: 36rpx;
			font-weight: 800;
		}

		.close {
			position: absolute;
			top: 37rpx;
			right: 64rpx;
			width: 31rpx;
			height: 31rpx;
			opacity: 1;
		}

		.bottom {
			position: absolute;
			top: 150rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 659rpx;
			opacity: 1;
			display: flex;
			align-items: center;

			.wx {
				position: relative;
				width: 621rpx;
				height: 125rpx;
				opacity: 1;

				.ditu {
					width: 100%;
					height: 200rpx;
				}

				.wxpic {
					position: absolute;
					top: 40rpx;
					left: 34rpx;
					width: 43rpx;
					height: 43rpx;
					opacity: 1;
				}

				.tit {
					position: absolute;
					top: 45rpx;
					left: 96rpx;
					opacity: 1;
					font-size: 22rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					text-align: left;
					color: #141313;
				}
			}

			.zfb {
				position: relative;
				width: 621rpx;
				height: 125rpx;
				opacity: 1;

				.ditu {
					width: 100%;
					height: 200rpx;
				}

				.wxpic {
					position: absolute;
					top: 40rpx;
					left: 34rpx;
					width: 43rpx;
					height: 43rpx;
					opacity: 1;
				}

				.tit {
					position: absolute;
					top: 45rpx;
					left: 96rpx;
					opacity: 1;
					font-size: 22rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					text-align: left;
					color: #141313;
				}
			}
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		background: #ebbfcc;
		width: 750rpx;
		height: 80rpx;
		opacity: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		.tit{
			opacity: 1;
			font-size: 25rpx;
			font-family: SourceHanSansCN-Regular;
			text-align: center;
			color: #ffffff;
			line-height: 36rpx;
		}
	}
</style>
