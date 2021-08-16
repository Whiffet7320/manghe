<template>
	<view class="index">
		<image class="pic1" src="/static/img/pic1.png" mode=""></image>
		<view class="items">
			<view class="item" @click="toJinjilianxiren">
				<image class="pic1" src="/static/img/jjlxr.png" mode=""></image>
				<view class="txt">
					<view class="txt1">紧急联系人</view>
					<view class="txt2">未设置</view>
				</view>
				<u-icon name="arrow-right" color="#989898" size="28"></u-icon>
			</view>
			<view class="item" @click="toAnquanbaozhang">
				<image class="pic1" src="/static/img/zu12.png" mode=""></image>
				<view class="txt">
					<view class="txt1">安全保障</view>
				</view>
				<u-icon name="arrow-right" color="#989898" size="28"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			toJinjilianxiren(){
				uni.navigateTo({
					url:'/pages/wode/anquanzhongxin/jinjilianxiren'
				})
			},
			toAnquanbaozhang(){
				uni.navigateTo({
					url:'/pages/wode/anquanzhongxin/anquanbaozhang'
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #EBEBEB;
	}
</style>
<style lang="scss" scoped>
	.index {}

	.pic1 {
		width: 750rpx;
		height: 420rpx;
	}

	.items {
		margin: 20rpx;
		width: 710rpx;
		height: 156rpx;
		background: #FFFFFF;
		border-radius: 6rpx;
		.item {
			height: 76rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 42rpx;
		
			.pic1 {
				width: 41rpx;
				height: 38rpx;
			}
		
			.pic2 {
				margin: 0 2rpx;
				width: 37rpx;
				height: 39rpx;
			}
		
			.pic3 {
				width: 41rpx;
				height: 47rpx;
			}
		
			.pic4 {
				width: 41rpx;
				height: 41rpx;
			}
		
			.txt {
				margin: 0 46rpx 0 28rpx;
				width: 552rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
		
				.txt1 {
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #000000;
					opacity: 1;
				}
		
				.txt2 {
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #FF6D00;
					opacity: 1
				}
			}
		}
	}
</style>
