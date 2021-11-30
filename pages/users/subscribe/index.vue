<template>
	<view>
		<view class="scribelist">
			<view class="scribe_item">
				<view class="time">
					<image src="/static/image/user/icon_time.png" mode="aspectFit" class="icon"></image>
					<text>预约时间：2021-09-24 20:00</text>
				</view>
				<view class="tip">注：尾款 ¥1600.00需要在2021-11-06 上午面诊后支付</view>
				<view class="bd">
					<image src="" mode="aspectFill" class="img"></image>
					<view class="info">
						<view class="name">肋骨鼻综合</view>
						<view class="attr">预约时间：2021-11-06 下午</view>
						<view class="attr">预约医生：李竞</view>
						<view class="fnwrap">
							<view class="price">预付款 ¥2000.00</view>
							<view class="sprice">尾款 ¥1600.00</view>
						</view>
					</view>
				</view>
				<view class="ft">
					<view class="no">
						<text>订单编号:JHS123456123456</text>
						<view class="light">复制</view>
					</view>
					<view class="btn">已面诊</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{}
		}
	}
</script>

<style>
	page{
		background: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.scribelist{
		.scribe_item{
			background-color: #FFFFFF;
			.time{
				padding-left: 40rpx;
				height: 88rpx;
				display: flex;
				align-items: center;
				font-size: 24rpx;
				color: #707070;
				.icon{
					padding-right: 16rpx;
					width: 24rpx;
					height: 24rpx;
				}
			}
			.tip{
				text-align: center;
				font-size: 20rpx;
				color: #BD9E81;
				font-weight: bold;
				background-color: #F2ECE6;
				padding: 14rpx 0;
			}
			.bd{
				margin-left: 40rpx;
				padding:28rpx 40rpx 34rpx 0;
				border-bottom: 2rpx #F7F8FA solid;
				display: flex;
				.img{
					width: 186rpx;
					height: 186rpx;
					background-color: #eee;
				}
				.info{
					flex:1;
					padding-left: 24rpx;
					.name{
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #707070;
						padding-bottom: 12rpx;
					}
					.attr{
						font-size: 24rpx;
						font-family: PingFang SC;
						color: #707070;
					}
					.fnwrap{
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding-top: 30rpx;
						.price{
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #707070;
						}
						.sprice{
							font-size: 24rpx;
							color: #FA8677;
							font-family: PingFang SC;
						}
					}
				}
			}
			.ft{
				display: flex;
				align-items: center;
				margin-left: 40rpx;
				padding:20rpx 40rpx 20rpx 0;
				.no{
					flex:1;
					font-size: 24rpx;
					color: #707070;
					display: flex;
					align-items: center;
					.light{
						font-size: 24rpx;
						color: #BD9E81;
						padding-left: 20rpx;
					}
				}
				.btn{
					width: 152rpx;
					height: 56rpx;
					line-height: 56rpx;
					text-align: center;
					font-size: 24rpx;
					color: #FFFFFF;
					background-color: #BD9E81;
					border-radius: 10rpx;
				}
			}
		}
	}
</style>