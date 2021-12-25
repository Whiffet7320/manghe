<template>
	<view class="index">
		<view class="nav1">
			<image src="/static/image/zu3038.png" class="pic1" mode=""></image>
			<view class="tit1">
				<view class="txt1">总资产(元)</view>
				<view class="txt2">{{nowPrice}}</view>
			</view>
		</view>
		<view class="mynav">
			<u-navbar :title-bold='true' :border-bottom='false' back-icon-color='#ffffff' :background='background'
				title-color='#ffffff' title="在线充值" title-size='34'></u-navbar>
		</view>
		<view class="nav2">
			<view class="tit1">
				<view class="box"></view>
				<view class="txt">自定义金额（100元起充）</view>
			</view>
			<view class="items">
				<view @click="changeIndex(1,0.01)" :class="{'item':true,'active':index == 1}">100元</view>
				<view @click="changeIndex(2,300)" :class="{'item':true,'active':index == 2}">300元</view>
				<view @click="changeIndex(3,500)" :class="{'item':true,'active':index == 3}">500元</view>
			</view>
			<view class="items">
				<view @click="changeIndex(4,1000)" :class="{'item':true,'active':index == 4}">1000元</view>
				<view @click="changeIndex(5,3000)" :class="{'item':true,'active':index == 5}">3000元</view>
				<view @click="changeIndex(6,4000)" :class="{'item':true,'active':index == 6}">4000元</view>
			</view>
		</view>
		<view class="nav3">
			<view class="tit1">
				<view class="box"></view>
				<view class="txt">选择充值方式</view>
			</view>
			<view class="tit2">
				<view class="left">
					<u-icon name="weixin-fill" color="#09BB07" size="32"></u-icon>
					<view class="l-txt">微信支付</view>
				</view>
				<u-icon name="checkmark-circle-fill" color="#D61D1D" size="32"></u-icon>
			</view>
			<view @click="onSubmit" class="btn">立即充值</view>
			<view class="tit3">
				<text style="font-weight: 700;">*注：</text>积分等于充值金额的1/15，充值金额所得的积分第二天到账，详情请查看积分明细；若有疑问请联系客服；
			</view>
		</view>
		<!-- 支付成功 -->
		<u-popup v-model="show2" mode='center' border-radius='24' height='256' width='424'>
			<view class="pop2">
				<u-icon name="checkmark-circle-fill" color="#ff0000" size="50"></u-icon>
				<view class="p2-tit1">充值成功</view>
				<view class="p2-tit2">购买相对应的积分将在明日到账</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 1,
				show2: false,
				nowPrice: '',
				price: '100',
			}
		},
		onLoad(options) {
			if(options.nowPrice){
				this.nowPrice = options.nowPrice;
			}
		},
		methods: {
			changeIndex(i, price) {
				this.index = i;
				this.price = price;
			},
			async onSubmit() {
				const res = await this.$api.recharge({
					money: this.price
				})
				if (res.code == 200) {
					var jsConfig = res.data
					uni.requestPayment({
						provider: 'wxpay',
						timeStamp: jsConfig.timeStamp.toString(),
						nonceStr: jsConfig.nonceStr,
						package: jsConfig.package,
						signType: jsConfig.signType,
						paySign: jsConfig.paySign,
						success: (res) => {
							this.show2 = true;
							setTimeout(() => {
								uni.navigateBack();
							}, 1500)
						},
						fail: (err) => {
							console.log('fail:' + JSON.stringify(err));
							this.$u.toast("支付失败");
						},
						complete: (e) => {
							if (e.errMsg == 'requestPayment:cancel') {
								this.$u.toast("取消支付");
							}
						}
					});
				}else{
					this.$u.toast(res.message);
				}
			},
		}
	}
</script>

<style>
	page {
		background: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.index {}

	.nav1 {
		height: 522rpx;
		position: relative;

		.pic1 {
			position: absolute;
			left: 0;
			top: 0;
			height: 500rpx;
			width: 100%;
		}

		.tit1 {
			position: absolute;
			left: 30rpx;
			top: 230rpx;
			width: 690rpx;
			height: 292rpx;
			background: rgba(#ffffff, 0.96);
			border-radius: 16rpx;
			box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(35, 1, 1, 0.11);

			.txt1 {
				margin-top: 62rpx;
				font-size: 40rpx;
				font-weight: 700;
				text-align: center;
				color: #000000;
			}

			.txt2 {
				margin-top: 32rpx;
				font-size: 60rpx;
				font-weight: 700;
				color: #000000;
				text-align: center;
			}

		}
	}

	.mynav {
		height: 0;
	}

	.nav2 {
		margin-top: 30rpx;
		padding: 0 30rpx;

		.tit1 {
			display: flex;
			align-items: center;

			.box {
				width: 8rpx;
				height: 32rpx;
				background: linear-gradient(180deg, #d61d1d, #530a0a);
			}

			.txt {
				margin-left: 8rpx;
				font-size: 28rpx;
				font-weight: 700;
				color: #808080;
			}
		}

		.items {
			padding: 0 18rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.item {
				margin-top: 32rpx;
				width: 178rpx;
				height: 100rpx;
				border: 2rpx solid #E0E1E2;
				background: #F7F8FA;
				font-size: 32rpx;
				font-weight: 700;
				text-align: center;
				line-height: 100rpx;
				color: #000000;
			}

			.active {
				width: 178rpx;
				height: 100rpx;
				background: #fff1f1;
				border: 2rpx solid #b47474;
			}
		}
	}

	.nav3 {
		margin-top: 48rpx;
		padding: 0 30rpx;

		.tit1 {
			display: flex;
			align-items: center;

			.box {
				width: 8rpx;
				height: 32rpx;
				background: linear-gradient(180deg, #d61d1d, #530a0a);
			}

			.txt {
				margin-left: 8rpx;
				font-size: 28rpx;
				font-weight: 700;
				color: #808080;
			}
		}

		.tit2 {
			padding-right: 12rpx;
			margin-top: 26rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;
				margin-left: 10rpx;

				.l-txt {
					margin-left: 16rpx;
					font-size: 28rpx;
					font-weight: 700;
					color: #000000;
				}
			}
		}

		.btn {
			margin-top: 60rpx;
			margin-left: 40rpx;
			width: 612rpx;
			height: 80rpx;
			background: #d61d1d;
			border-radius: 10rpx;
			font-size: 28rpx;
			font-weight: 700;
			text-align: center;
			line-height: 80rpx;
			color: #ffffff;
		}

		.tit3 {
			margin-left: 8rpx;
			width: 676rpx;
			margin-top: 54rpx;
			font-size: 20rpx;
			font-weight: 500;
			color: #d61d1d;
			line-height: 32rpx;
		}
	}

	.pop2 {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 30rpx;

		.p2-tit1 {
			margin-top: 32rpx;
			font-size: 32rpx;
			font-weight: 700;
			color: #000000;
		}

		.p2-tit2 {
			margin-top: 16rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #000000;
		}
	}
</style>
