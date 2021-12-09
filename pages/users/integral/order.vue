<template>
	<view>
		<view class="navbar">
			<view class="navbar_item" :class="{'on':current==0}" @click="tabChange(0)">
				<text class="text">全部</text>
			</view>
			<view class="navbar_item" :class="{'on':current==1}" @click="tabChange(1)">
				<text class="text">待付款</text>
				<u-badge type="error" count="2" :offset="[10,20]" class="badge"></u-badge>
			</view>
			<view class="navbar_item" :class="{'on':current==2}" @click="tabChange(2)"><text class="text">已完成</text></view>
			<view class="navbar_item" :class="{'on':current==3}" @click="tabChange(3)"><text class="text">已关闭</text></view>
		</view>
		<u-gap height="88"></u-gap>
		<view class="orderlist">
			<view class="order_item">
				<view class="hd">
					<view class="left">下单时间：2021-09-24 20:00</view>
					<view class="right">待支付</view>
				</view>
				<view class="bd">
					<image src="" mode="aspectFill" class="img"></image>
					<view class="info">
						<view class="top">
							<view class="name">250ml 雅漾补水喷雾赠一</view>
							<view class="num">X1</view>
						</view>
						<view class="attr">250ml</view>
						<view class="ft">
							<view class="left">20积分</view>
							<view class="right">20积分+¥10运费</view>
						</view>
					</view>
				</view>
				<view class="foot">
					<view class="no">
						<text>订单编号:JHS123456123456</text>
						<view class="light">复制</view>
					</view>
					<view class="toolbtn">
						<view class="combtn">取消订单</view>
						<view class="combtn on">去支付</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				current:0
			}
		},
		methods:{
			tabChange(index){
				this.current = index;
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
	.navbar{
		width: 100%;
		height: 80rpx;
		background-color: #FFFFFF;
		margin-top:2rpx;
		display: flex;
		align-items: center;
		position: fixed;
		top:0;
		left:0;
		z-index: 50;
		.navbar_item{
			flex:1;
			font-size: 28rpx;
			color: #707070;
			text-align: center;
			height: 100%;
			position: relative;
			.badge{
				background-color: #FA8677;
			}
			.text{
				display: inline-block;
				line-height: 80rpx;
			}
			&.on{
				.text{
					border-bottom: 2rpx #BD9E81 solid;
					color:#BD9E81;
				}
			}
		}
	}
	.orderlist{
		.order_item{
			background-color: #FFFFFF;
			margin-top: 20rpx;
			.hd{
				height: 90rpx;
				margin-left: 40rpx;
				padding-right: 40rpx;
				border-bottom: 2rpx #F7F8FA solid;
				display: flex;
				align-items: center;
				.left{
					flex:1;
					font-size: 24rpx;
					color: #707070;
				}
				.right{
					font-size: 24rpx;
					color: #BD9E81;
				}
			}
			.bd{
				margin-left: 40rpx;
				border-bottom: 2rpx #F7F8FA solid;
				display: flex;
				padding:28rpx 40rpx 34rpx 0;
				.img{
					width: 186rpx;
					height: 186rpx;
					background-color: #eee;
				}
				.info{
					flex:1;
					padding-left: 24rpx;
					font-size: 24rpx;
					color: #707070;
					display: flex;
					flex-direction: column;
					.top{
						display: flex;
						justify-content: space-between;
						.name{
							width: 334rpx;
							height: 68rpx;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #707070;
						}
					}
					.attr{
						padding-top: 42rpx;
						padding-bottom: 8rpx;
					}
					.ft{
						display: flex;
						align-items: center;
						.left{
							flex:1;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #707070;
						}
						.right{
							font-size: 28rpx;
							color: #FA8677;
						}
					}
				}
			}
			.foot{
				display: flex;
				flex-direction: column;
				margin-left: 40rpx;
				padding:28rpx 40rpx 30rpx 0;
				border-top: 2rpx #F7F8FA solid;
				.no{
					font-size: 24rpx;
					color: #707070;
					display: flex;
					align-items: center;
					padding-bottom: 26rpx;
					.light{
						font-size: 24rpx;
						color: #BD9E81;
						padding-left: 20rpx;
					}
				}
				.toolbtn{
					display: flex;
					justify-content: flex-end;
					.combtn{
						width: 152rpx;
						height: 56rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 24rpx;
						color: #707070;
						border:2rpx #B2B2B2 solid;
						border-radius: 10rpx;
						margin-left: 20rpx;
						&.on{
							border-color:#BD9E81;
							background-color: #BD9E81;
							color: #FFFFFF;
						}
					}
				}
			}
		}
	}
</style>
