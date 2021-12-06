<template>
	<view class="index">
		<view class="nav1">温馨提示：修复手术因人而异，为了让您选择更合适的专家，请点击预约专家会诊团面诊</view>
		<!-- <view class="nav2">
			<u-parse :html="content"></u-parse>
		</view> -->
		<view class="nav2">
			<image :src="bigImg" mode=""></image>
		</view>
		<view class="footer">
			<view class="btn">专家会诊团预约</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bigImg:'',
			}
		},
		onLoad(options) {
			console.log(options)
			this.bigImg = options.bigImg;
			uni.setNavigationBarTitle({
				title: options.index
			})
		},
		methods: {

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
		width: 750rpx;
		padding: 12rpx 24rpx;
		height: 88rpx;
		background: #FFFBED;
		font-size: 24rpx;
		font-weight: 500;
		line-height: 34rpx;
		color: #BD9E81;
	}
	.nav2{
		
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
