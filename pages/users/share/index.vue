<template>
	<view class="spreadwrap">
		<image src="/static/image/user/shabg.jpg" class="bg"></image>
		<u-gap height="718"></u-gap>
		<view class="ewm">
			<image v-if="info" :src="info.poster" mode="aspectFit"></image>
		</view>
		<view class="sharecon">
			<image src="/static/image/user/shabg2.png" class="sbg"></image>
			<view class="tit">我的邀请码</view>
			<view class="code">{{code}}</view>
			<view class="stit">邀请成为用户</view>
		</view>
		<u-gap height="70"></u-gap>
		<view class="btn">分享图片</view>
		<u-gap height="70"></u-gap>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				code:"0020",
				info:{}
			}
		},
		methods:{
			getBanner(){
				this.$api.spreadBanner(1).then((res)=>{
					console.log(res)
					this.info = res.data[0];
				})
			}
		},
		onLoad(){
			this.getBanner();
		}
	}
</script>

<style>
	page{
		background: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.spreadwrap{
		position: relative;
	}
	.bg{
		width: 100%;
		height: 876rpx;
		position: absolute;
		top:0;
		left:0;
		z-index: -1;
	}
	.ewm{
		width: 276rpx;
		height: 276rpx;
		border: 2rpx #BD9E81 solid;
		background-color: #FFFFFF;
		padding: 20rpx;
		position: absolute;
		top:542rpx;
		left:50%;
		transform: translateX(-50%);
		z-index: 30;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.sharecon{
		width: 672rpx;
		height: 366rpx;
		margin:0 auto;
		position: relative;
		z-index: 20;
		text-align: center;
		.sbg{
			width: 100%;
			height: 100%;
			position: absolute;
			top:0;
			left:0;
			z-index: -2;
		}
		.tit{
			font-size: 24rpx;
			color: #707070;
			padding:132rpx 0 8rpx 0;
		}
		.code{
			font-size: 48rpx;
			color: #BD9E81;
			font-weight: bold;
			position: relative;
			&::before{
				content:"";
				position: absolute;
				left:50%;
				bottom: -20rpx;
				transform: translateX(-50%);
				width: 20rpx;
				height: 2rpx;
				background-color:#BD9E81;
			}
		}
		.stit{
			padding-top: 38rpx;
			font-size: 20rpx;
			color: #707070;
		}
	}
	.btn{
		margin:0 auto;
		width: 522rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #BD9E81;
		border-radius: 10rpx;
		text-align: center;
		font-size: 28rpx;
		color: #FFFFFF;
	}
</style>
