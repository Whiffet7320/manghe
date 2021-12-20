<template>
	<view class="index">
		<view class="nav1">
			<image src="/static/image/zu3029.png" class="pic1" mode=""></image>
			<view class="tit1">
				<image src="/static/image/zu3030.png" class="pic1-1" mode=""></image>
				<view class="txt1">总积分</view>
			</view>
			<view class="tit2">12590</view>
			<view class="btn">
				<image src="/static/image/zu3007.png" class="pic-btn" mode=""></image>
				<view class="txt-btn">全部提现</view>
			</view>
		</view>
		<view class="mynav">
			<u-navbar :title-bold='true' :border-bottom='false' back-icon-color='#ffffff' :background='background'
				title-color='#ffffff' title="去提现" title-size='34'></u-navbar>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
	}
</script>

<style lang="scss">
	page {
		background: #f7f8fa;
	}
</style>
<style lang="scss" scoped>
	.index {
		position: relative;
	}
	.nav1 {
		position: relative;
		height: 580rpx;
	
		.pic1 {
			position: absolute;
			left: 0;
			top: 0;
			height: 506rpx;
			width: 100vw;
		}
	
		.tit1 {
			position: absolute;
			top: 220rpx;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			align-items: center;
	
			.pic1-1 {
				width: 40rpx;
				height: 42rpx;
			}
	
			.txt1 {
				margin-left: 12rpx;
				font-size: 28rpx;
				font-weight: 700;
				color: #ffffff;
			}
		}
	
		.tit2 {
			position: absolute;
			top: 276rpx;
			left: 50%;
			transform: translateX(-50%);
			font-size: 64rpx;
			font-weight: 700;
			color: #ffffff;
		}
		.btn{
			position: absolute;
			top: 372rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 360rpx;
			height: 108rpx;
			.pic-btn{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
			.txt-btn{
				position: absolute;
				width: 192rpx;
				top: 34rpx;
				left: 50%;
				transform: translateX(-50%);
				font-size: 48rpx;
				font-weight: 500;
				text-align: center;
				line-height: 108rpx;
				color: #ffffff;
				line-height: 32rpx;
			}
		}
		
	}
	
	.mynav {
		height: 0;
	}
</style>
