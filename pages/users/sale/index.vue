<template>
	<view class="salewrap">
		<view class="prowrap">
			<view class="tit">售后商品</view>
			<view class="proinfo">
				<image src="" mode="aspectFill" class="img"></image>
				<view class="info">
					<view class="hd">
						<view class="name u-line-2">250ml 雅漾补水喷雾赠一</view>
						<text class="num">X1</text>
					</view>
					<view class="sprice">¥89.90</view>
					<view class="price">¥9.90</view>
				</view>
			</view>
		</view>
		<view class="servlist">
			<view class="tit">选择服务类型</view>
			<view class="servitem" @click="onTk">
				<image src="/static/image/user/icon_money.png" mode="aspectFit" class="icon"></image>
				<view class="content">
					<view class="title">我要退款（无需退货）</view>
					<view class="desc">没收到货，或与客服协商同意不用退货只退款</view>
				</view>
				<image src="/static/image/user/arrow_right.png" mode="aspectFit" class="icon_right"></image>
			</view>
			<view class="servitem" @click="onThk">
				<image src="/static/image/user/icon_tk.png" mode="aspectFit" class="icon"></image>
				<view class="content">
					<view class="title">我要退货退款</view>
					<view class="desc">已收到货，需要退还收到的货物</view>
				</view>
				<image src="/static/image/user/arrow_right.png" mode="aspectFit" class="icon_right"></image>
			</view>
			<view class="servitem" @click="onTh">
				<image src="/static/image/user/icon_huan.png" mode="aspectFit" class="icon"></image>
				<view class="content">
					<view class="title">换货</view>
					<view class="desc">商品存在质量问题，联系客服协商换货</view>
				</view>
				<image src="/static/image/user/arrow_right.png" mode="aspectFit" class="icon_right"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{}
		},
		methods:{
			onTk(){
				uni.navigateTo({
					url:"/pages/users/sale/refund"
				})
			},
			onThk(){
				uni.navigateTo({
					url:"/pages/users/sale/refundPro"
				})
			},
			onTh(){
				uni.navigateTo({
					url:"/pages/users/sale/exchange"
				})
			}
		}
	}
</script>

<style>
	page{
		background: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.servlist{
		margin-top: 20rpx;
		background-color: #FFFFFF;
		padding:40rpx 40rpx 0 40rpx;
		.tit{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #707070;
			padding-bottom: 20rpx;
		}
		.servitem{
			display: flex;
			align-items: center;
			padding-bottom: 40rpx;
			.icon{
				width: 42rpx;
				height: 38rpx;
			}
			.icon_right{
				width: 10rpx;
				height: 18rpx;
			}
			.content{
				flex:1;
				padding-left: 20rpx;
				display: flex;
				flex-direction: column;
				.title{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #707070;
					margin-bottom: 8rpx;
				}
				.desc{
					font-size: 24rpx;
					font-family: PingFang SC;
					color: #707070;
				}
			}
		}
	}
</style>