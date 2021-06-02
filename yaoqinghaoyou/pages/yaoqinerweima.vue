<template>
	<view class="index">
		<image class="index-pic" src="../img/蒙版组116@2x.png" mode=""></image>
		<view class="nav">
			<u-icon @click="goTo" color="#ffffff" name="arrow-left" size="30"></u-icon>
			<view class="nav-title">邀请好友</view>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			goTo(){
				uni.navigateTo({
					url:'/yaoqinghaoyou/pages/yaoqinghaoyou'
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.index {
		position: relative;
		padding-top: 60rpx;
		height: 100%;
		width: 100%;
	}
	.index-pic{
		position: absolute;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 1334rpx;
		opacity: 1;
	}
	.nav {
		position: absolute;
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
			color: #FFFFFF;
			line-height: 71rpx;
		}
	}
</style>
