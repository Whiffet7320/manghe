<template>
	<view class="express_wrap">
		<view class="hd">
			<view class="number">订单编号:{{code}}</view>
			<view class="icopy" @click="onCopy(code)">复制</view>
		</view>
		<view class="content">
			<view class="item finish">
				<view class="dot"></view>
				<view class="right">
					<view class="text">退款成功</view>
					<text class="time">2021-5-26 12:45:20</text>
				</view>
			</view>
			<view class="item">
				<view class="dot"></view>
				<view class="right">
					<view class="text">[退款处理中]请耐心等待</view>
					<text class="time">2021-5-26 12:45:20</text>
				</view>
			</view>
			<view class="item">
				<view class="dot"></view>
				<view class="right">
					<view class="text">退款申请已接受</view>
					<text class="time"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				code:"JHS123456123456"
			}
		},
		methods:{
			onCopy(str){
				uni.setClipboardData({
					data: str.toString(),
					success: () => {
						uni.showToast({
							title:"已复制到剪切板",
							icon:"none"
						})
					}
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
	.express_wrap{
		padding:20rpx 36rpx;
		.hd{
			width: 100%;
			height: 82rpx;
			background: #BD9E81;
			border-radius: 10rpx 10rpx 0 0;
			padding: 0 24rpx;
			font-size: 24rpx;
			color:#ffffff;
			font-weight: bold;
			display: flex;
			align-items: center;
			.number{
				flex:1;
			}
		}
		.content{
			background: #ffffff;
			border-radius: 0 0 10rpx 10rpx;
			padding: 28rpx 24rpx;
			.item{
				display: flex;
				padding-bottom: 50rpx;
				position: relative;
				&::before {
					content: '';
				    position: absolute;
				    left: 4rpx;
				    top: 22rpx;
					width: 2rpx;
					height: 100%;
					background:#ebebeb;
				}
				.dot{
					width: 10rpx;
					height: 10rpx;
					background: #cccccc;
					border-radius: 6rpx;
					margin-top: 12rpx;
				}
				.text{
					font-size: 24rpx;
					color:#707070;
					margin-bottom: 8rpx;
				}
				.time{
					font-size: 20rpx;
					color: #cccccc;
				}
				.right{
					padding-left: 32rpx;
					display: flex;
					flex-direction: column;
				}
				&.finish{
					.dot{
						background: #BD9E81;
					}
					.text{
						color: #BD9E81;
					}
				}
				&:last-child{
					padding-bottom: 0;
					&::before{
						content:none;
					}
				}
			}
		}
	}
</style>