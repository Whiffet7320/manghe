<template>
	<view class="index">
		<view class="nav1">
			<image src="/static/image/zu3033.png" class="pic1" mode=""></image>
			<view class="tit1">
				<image src="/static/image/zu3030.png" class="pic1-1" mode=""></image>
				<view class="txt1">总积分</view>
			</view>
			<view class="tit2">12590</view>
			<view class="btn" @click="toJifentixian">
				<image src="/static/image/zu3007.png" class="pic-btn" mode=""></image>
				<view class="txt-btn">全部提现</view>
			</view>
		</view>
		<view class="mynav">
			<u-navbar :title-bold='true' :border-bottom='false' back-icon-color='#ffffff' :background='background'
				title-color='#ffffff' title="去提现" title-size='34'></u-navbar>
		</view>
		<view class="nav2">
			<view class="tit1">
				<view class="left">
					<view class="box"></view>
					<view class="txt1">提现记录</view>
				</view>
				<view class="txt2">已经提现2500积分</view>
			</view>
			<view class="items">
				<view :class="{'item':true,'active':i%2!=0}" v-for="(item,i) in 6">
					<view class="i-txt1 i1">2021-06-30</view>
					<view class="i-txt1">提现成功</view>
					<view class="i-txt1">500积分</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			toJifentixian(){
				uni.navigateTo({
					url:'/pages/user/tixian/jifentixian'
				})
			},
		}
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
		height: 482rpx;
	
		.pic1 {
			position: absolute;
			left: 0;
			top: 0;
			height: 482rpx;
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
	.nav2{
		margin-top: 64rpx;
		padding: 0 30rpx;
		.tit1{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left{
				display: flex;
				align-items: center;
				.box{
					width: 8rpx;
					height: 32rpx;
					background: linear-gradient(180deg,#d61d1d, #530a0a);
				}
				.txt1{
					margin-left: 8rpx;
					font-size: 28rpx;
					font-weight: 700;
					color: #808080;
				}
			}
			.txt2{
				font-size: 20rpx;
				font-weight: 500;
				color: #000000;
			}
		}
		.items{
			margin-top: 14rpx;
			.item{
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 82rpx;
				background: #f2f2f2;
				padding: 0 16rpx;
				.i-txt1{
					font-size: 24rpx;
					font-weight: 700;
					color: #808080;
					line-height: 32rpx;
				}
				.i1{
					width: 160rpx
				}
			}
		}
		.item.active{
			background: #ffffff;
		}
	}
</style>
