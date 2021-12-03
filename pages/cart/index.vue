<template>
	<view class="container">
		<u-navbar :title="'购物车('+total+')'" bg-color="#FECF05" :safeAreaInsetTop="true" :fixed="true" :placeholder="true"></u-navbar>
		<view class="emptybox" v-if="total==0">
			<image src="/static/image/user/undraw.png" mode="aspectFit" class="icon"></image>
			<view class="text">购物车空空如也～</view>
			<view class="btn">去挑选</view>
		</view>
		<view class="alldelete" v-if="adelShow">
			<image src="/static/images/icon_delete.png" mode="aspectFit" class="icon"></image>
			<text>全部清空</text>
		</view>
		<view class="cartlist">
			<view class="cart_item" v-for="(item,index) in list" :key="index">
				<view class="check">
					<u-checkbox v-model="item.checked" shape="circle" size="16" :disabled="true" inactiveColor="#DEDEDE" v-if="item.status==0"></u-checkbox>
					<u-checkbox v-model="item.checked" shape="circle" size="16" inactiveColor="#DEDEDE" activeColor="#BD9E81" v-if="item.status==1"></u-checkbox>
				</view>
				<image :src="item.image" mode="aspectFill" class="img"></image>
				<view class="info">
					<view class="hd">
						<view class="name u-line-2" :class="{'none':item.status==0}">{{item.title}}</view>
						<view class="delete">
							<image src="/static/image/zu1527.png" mode="aspectFit" style="width: 29rpx;height:31rpx"></image>
						</view>
					</view>
					<view class="status" v-if="item.status==0">商品已经下架啦～要不瞧瞧别的～</view>
					<view class="ft" v-if="item.status==1">
						<view class="price">￥{{item.price}}</view>
						<view class="numberbox"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="likewrap">
			<view class="tit">
				<image src="/static/image/user/icon_like.png" mode="aspectFit" style="width: 35rpx;height:29rpx;margin-right: 20rpx;"></image>
				<text>推荐商品</text>
			</view>
			<view class="likelist">
				<view class="like_item" v-for="(item,index) in likelist" :key="index">
					<image :src="item.image" mode="aspectFill" class="img"></image>
					<view class="name">{{item.title}}</view>
					<view class="price">￥{{item.price}}</view>
				</view>
			</view>
		</view>
		<u-gap height="112"></u-gap>
		<view class="footbar">
			<view class="footbar_bar">
				<view class="allck">
					<u-checkbox v-model="Allchecked" shape="circle" activeColor="#BD9E81"></u-checkbox>
					<text class="text">全选</text>
				</view>
				<view class="bar_text">
					<text>合计：</text>
					<text class="price">¥{{totalPrice}}</text>
				</view>
				<view class="bar_btn">去结算({{total}})</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				adelShow:false,
				total:0,
				Allchecked:false,
				totalPrice:0.00,
				list:[],
				likelist:[]
			}
		},
		methods:{
			getCartlist(){
				this.$api.cartlist().then((res)=>{
					console.log(res)
				})
			}
		},
		onShow(){
			this.getCartlist();
		}
	}
</script>

<style lang="scss" scoped>
	.alldelete{
		width: 100%;
		height: 74rpx;
		background: #FCFAF9;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #BD9E81;
		opacity: 1;
		.icon{
			width: 28rpx;
			height: 30rpx;
			margin-right: 20rpx;
		}
	}
	.cartlist{
		background-color: #F7F8FA;
		.cart_item{
			background-color: #FFFFFF;
			margin-bottom: 20rpx;
			padding: 24rpx 34rpx 24rpx 40rpx;
			display: flex;
			align-items: center;
			flex-direction: row;
			&:last-child{
				margin-bottom: 0;
			}
			.check{
				margin-right: 32rpx;
			}
			.img{
				width: 160rpx;
				height: 160rpx;
				background-color: #eee;
				border-radius: 40rpx;
			}
			.info{
				padding-left: 24rpx;
				.hd{
					display: flex;
					flex-direction: row;
				}
				.name{
					padding-right: 56rpx;
					height: 76rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 40rpx;
					color: #BD9E81;
					&.none{
						color: #707070;
					}
				}
				.ft{
					margin-top: 40rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					.price{
						flex:1;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						line-height: 40rpx;
						color: #FA8677;
					}
				}
				.status{
					margin-top: 40rpx;
					padding:0 24rpx;
					height: 44rpx;
					background: #FCFAF9;
					border-radius: 10rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 44rpx;
					color: #BD9E81;
				}
			}
		}
	}
	.emptybox{
		width: 100%;
		height: 572rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		.icon{
			margin-top: 96rpx;
			width: 228rpx;
			height: 172rpx;
		}
		.text{
			margin-top: 16rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			color: #707070;
		}
		.btn{
			margin-top: 74rpx;
			width: 278rpx;
			height: 60rpx;
			background: #BD9E81;
			border-radius: 10rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			line-height: 60rpx;
			color: #FFFFFF;
			text-align: center;
		}
	}
	.likewrap{
		background-color: #FFFFFF;
		.tit{
			width: 100%;
			height: 120rpx;
			background-color: #F7F8FA;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: row;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #BD9E81;
		}
		.likelist{
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			padding:40rpx 26rpx;
			.like_item{
				width: 50%;
				padding-left: 14rpx;
				box-sizing: border-box;
				margin-bottom: 20rpx;
				display: flex;
				flex-direction: column;
				.img{
					width: 334rpx;
					height: 334rpx;
					background-color: #eee;
					border-radius: 20rpx;
				}
				.name{
					padding:16rpx 0 12rpx 0;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #BD9E81;
				}
				.price{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FA8677;
				}
			}
		}
	}
	.footbar{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0 8rpx 28rpx rgba(166, 179, 194, 0.3);
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		user-select: none;
		.footbar_bar{
			height: 112rpx;
			padding:0 40rpx;
			display: flex;
			align-items: center;
			flex-direction: row;
			justify-content: flex-end;
		}
		.allck{
			display: flex;
			align-items: center;
			flex-direction: row;
			.text{
				font-size: 24rpx;
				color: #707070;
			}
		}
		.bar_text{
			flex:1;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			flex-direction: row;
			font-size: 24rpx;
			color: #707070;
			font-family: PingFang SC;
			padding-right: 24rpx;
			.price{
				font-size: 32rpx;
				color: #FA8677;
				font-weight: bold;
			}
		}
		.bar_btn{
			width: 278rpx;
			height: 80rpx;
			background: #BD9E81;
			border-radius: 40rpx;
			text-align: center;
			line-height: 80rpx;
			font-size: 28rpx;
			color:#FFFFFF;
		}
	}
</style>
