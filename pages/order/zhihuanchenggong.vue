<template>
	<view class="index">
		<view class="nav1">
			<u-icon name="checkmark-circle-fill" color="#02b3b6" size="98"></u-icon>
			<view class="n1-txt1">商品置换成功</view>
			<view class="n1-txt2">您可以在收纳盒查询订单详情或跟踪物流信息</view>
		</view>
		<view @click="toDD" class="nav2">查看订单</view>
		<view @click="toHome" class="nav3">返回首页</view>
	</view>
</template>

<script>
	export default {
		methods:{
			toDD(){
				uni.navigateTo({
					url:'/pages/user/shounahe/shounahe'
				})
			},
			toHome(){
				uni.navigateTo({
					url:'/pages/tabBar/index'
				})
			},
		}
	}
</script>

<style>
	page {
		background: #f7f7f7;
	}
</style>
<style scoped lang="scss">
	.index {
		position: relative;
	}
	.nav1{
		width: 690rpx;
		height: 312rpx;
		background: #ffffff;
		border-radius: 24rpx;
		margin: 28rpx auto 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 44rpx;
		.n1-txt1{
			margin-top: 38rpx;
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			color: #333333;
		}
		.n1-txt2{
			margin-top: 8rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			color: #999999;
		}
	}
	.nav2{
		width: 572rpx;
		height: 76rpx;
		background: #02b3b6;
		border-radius: 38rpx;
		box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(2,179,182,0.12); 
		font-size: 32rpx;
		font-family: PingFang SC, PingFang SC-Bold;
		font-weight: 700;
		text-align: center;
		line-height: 76rpx;
		margin: 72rpx auto 24rpx;
		color: #ffffff;
	}
	.nav3{
		width: 572rpx;
		height: 76rpx;
		border: 2rpx solid #02b3b6;
		border-radius: 40rpx;
		font-size: 32rpx;
		font-family: PingFang SC, PingFang SC-Bold;
		font-weight: 700;
		text-align: center;
		line-height: 76rpx;
		color: #02b3b6;
		margin: 0 auto;
	}

</style>
