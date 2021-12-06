<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="nav1">
			<view class="tit1">支付剩余时间 04:59</view>
			<view class="tit2">￥<text class="big">{{price}}</text></view>
			<view class="tit3">严选商城消费</view>
		</view>
		<view class="nav2">
			<view class="item">
				<view class="left">
					<u-icon name="weixin-circle-fill" color="#00C486" size="46"></u-icon>
				<view class="txt">微信支付</view>
				</view>
				<u-icon name="checkmark-circle-fill" color="#BD9E81" size="40"></u-icon>
			</view>
		</view>
		<view class="footer">
			<view @click="pay" class="btn">确认支付</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				a:null,
				payObj:null,
				price:0,
			}
		},
		onLoad(options) {
			this.uni = options.uni;
			this.payObj = JSON.parse(decodeURIComponent(options.payObj)) ;
			this.price = options.price;
			console.log(this.payObj)
		},
		methods:{
			async pay(){
				// const res = await this.$api.orderPay({
				// 	uni:this.uni,
				// 	from:'routine',
				// })
				// console.log(res)
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: this.payObj.timestamp,
					nonceStr: this.payObj.nonceStr,
					package: this.payObj.package,
					signType: this.payObj.signType,
					paySign: this.payObj.paySign,
					success: function(res) {
						this.$refs.uToast.show({
							title: '支付成功',
							type: 'success',
							url: '/pages/users/order/order',
						})
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
					}
				});
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
	.index {
		position: relative;
	}
	.nav1{
		margin-top: 80rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.tit1 {
			font-size: 28rpx;
			font-weight: 400;
			color: #2E2E2E;
		}
		.tit2{
			margin-top: 18rpx;
			margin-bottom: 16rpx;
			font-size: 36rpx;
			font-weight: bold;
			color: #2E2E2E;
			.big{
				font-size: 52rpx;
			}
		}
		.tit3{
			font-size: 24rpx;
			font-weight: 400;
			color: #9C9C9C;
		}
	}
	.nav2{
		margin-top: 80rpx;
		padding: 0 30rpx;
		.item{
			padding: 0 44rpx;
			background: #FFFFFF;
			width: 690rpx;
			height: 104rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left{
				display: flex;
				align-items: center;
				.txt{
					margin-left: 20rpx;
				}
			}
		}
	}
	.footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 140rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 8rpx 28rpx rgba(166, 179, 194, 0.3);
		.btn{
			width: 682rpx;
			height: 84rpx;
			background: #BD9E81;
			border-radius: 44rpx;
			margin-top: 10rpx;
			margin-left: 34rpx;
			font-size: 28rpx;
			font-weight: bold;
			line-height: 84rpx;
			color: #FFFFFF;
			text-align: center;
		}
	}
</style>
