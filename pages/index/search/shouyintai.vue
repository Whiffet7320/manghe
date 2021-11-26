<template>
	<view class="index">
		<view class="nav1">
			<u-icon name="error-circle-fill" color="#BD9E81" size="40"></u-icon>
			<view class="txt">请确认订单信息无误后再提交并支付</view>
		</view>
		<view class="nav2">
			<view class="item">
				<view class="txt1">订单类型</view>
				<view class="txt1">商品订单</view>
			</view>
			<view class="item">
				<view class="txt1">订单编号</view>
				<view class="txt1">29047824561823552</view>
			</view>
			<view class="item">
				<view class="txt1">手术医生</view>
				<view class="txt1">李竞</view>
			</view>
			<view class="item">
				<view class="txt1">预约时间</view>
				<view class="txt1">2021-11-06 下午</view>
			</view>
		</view>
		<view class="nav3">
			<view class="txt1">预付金<text class="n4-txt">¥2000.00</text></view>
			<u-icon name="checkmark-circle-fill" color="#BD9E81" size="40"></u-icon>
		</view>
		<view class="footer">
			<view class="btn">专家会诊团预约</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
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

	.nav1 {
		width: 750rpx;
		height: 74rpx;
		background: #FFFBED;
		display: flex;
		align-items: center;
		padding: 0 44rpx;

		.txt {
			margin-left: 20rpx;
			font-size: 24rpx;
			font-weight: 500;
			line-height: 74rpx;
			color: #BD9E81;
		}
	}

	.nav2 {
		background: #FFFFFF;

		.item {
			height: 88rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 34rpx;

			.txt1 {
				font-size: 28rpx;
				font-weight: 400;
				color: #707070;
			}
		}
	}

	.nav3 {
		margin-top: 20rpx;
		height: 120rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 34rpx;

		.txt1 {
			font-size: 28rpx;
			font-weight: bold;
			color: #BD9E81;

			.n4-txt {
				margin-left: 22rpx;
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
