<template>
	<view class="index">
<!-- 		<view class="nav">
			<u-icon @click="goTo" name="arrow-left" size="30"></u-icon>
			<view class="nav-title">提现</view>
		</view> -->
		<view class="container">
			<image src="../../static/Path1.png" mode=""></image>
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
		<view class="bottom-f">
			<view class="top">
				<view class="tit1">提现金额</view>
				<view class="tit2">
					<view class="tit2-1">￥</view>
				<u-input placeholder="请输入金额" height="80" v-model="price" />
				</view>
				
				<view class="tit3">
					<view class="tit3-1">当前余额{{yue}}元，</view>
					<view class="tit3-2" @tap="arrTX">全部提现</view>
				</view>
			</view>
			<view class="footer">
				<view class="tit">
					提现至{{txName}}
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 'wx',
				price:'',
				yue:'45.00',
				txName:'微信'
			}
		},
		methods: {
			goTo(){
				uni.navigateTo({
					url:'/pages/yaoqinghaoyou/yaoqinghaoyou'
				})
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				if(e == 'wx'){
					this.txName = '微信';
				}else if(e == 'zfb'){
					this.txName = '支付宝';
				}
			},
			arrTX(){
				this.price = this.yue
			},
		}
	}
</script>

<style scoped lang="scss">
	.index {
		position: relative;
		// padding-top: 60rpx;
		height: 100%;
		width: 100%;
	}

	.nav {
		display: flex;
		align-items: center;
		height: 36rpx;
		// padding: 60rpx 50rpx 33rpx 46rpx;
		margin: 0rpx 50rpx 0rpx 46rpx;

		.nav-title {
			margin-left: 23rpx;
			opacity: 1;
			font-size: 36rpx;
			font-family: SourceHanSansCN-Regular;
			text-align: left;
			color: #121212;
			line-height: 71rpx;
		}
	}

	.container {
		position: absolute;
		width: 750rpx;
		height: 716rpx;
		opacity: 1;

		image {
			width: 100%;
			height: 100%;
		}


		.bottom {
			position: absolute;
			top: 27rpx;
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

	.bottom-f {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 918rpx;
		border-top: 2rpx solid #ddd;
		.top{
			margin: 43rpx 49rpx 0 49rpx;
			height: 200rpx;
			// border: 2rpx solid red;
			.tit1{
				opacity: 1;
				font-size: 22rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #141313;
			}
			.tit2{
				margin-top: 18rpx;
				display: flex;
				.tit2-1{
					opacity: 1;
				font-size: 58rpx;
				font-family: PingFang SC, PingFang SC-Heavy;
				font-weight: 800;
				color: #141313;
				margin-right: 10rpx;
				}
			}
			.tit3{
				display: flex;
				margin-top: 43rpx;
				.tit3-1{
					opacity: 1;
					font-size: 18rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					color: #b1b1b1;
				}
				.tit3-2{
					opacity: 1;
					font-size: 18rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					color: #EBBFCC;
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

			.tit {
				opacity: 1;
				font-size: 25rpx;
				font-family: SourceHanSansCN-Regular;
				text-align: center;
				color: #ffffff;
				line-height: 36rpx;
			}
		}
	}
</style>
