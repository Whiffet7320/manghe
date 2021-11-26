<template>
	<view>
		<view class="oc-bar">
			<view class="oc-bar-text">全部</view>
			<view class="oc-bar-text">待付款</view>
			<view class="oc-bar-text">待付尾款</view>
			<view class="oc-bar-text">已完成</view>
			<view class="oc-bar-text">已关闭</view>
		</view>
		
		<view class="oc-body">
			<view class="oc-body-item">
				
				<view class="oc-body-item-top">
					<view style="display: flex;">剩余支付时间：
						<view class="oc-body-item-top-num">21</view>
						<view class="oc-body-item-top-maohao">:</view>
						<view class="oc-body-item-top-num">15</view>
						<view class="oc-body-item-top-maohao">:</view>
						<view class="oc-body-item-top-num">08</view>
					</view>
					<view >待付款</view>
				</view>
				
				<view class="oc-body-item-center">
					
					<image class="oc-body-item-center-left" src="../../static/image/mcz192.png"></image>
						
					
					<view class="oc-body-item-center-right">
						<view class="oc-body-item-center-right-top">
							<view>250ml 雅漾补水喷雾赠一</view>
							<view>x1</view>
						</view>
						
						<view class="oc-body-item-center-right-bottom">
							<view>250ml</view>
							<view>9.9</view>
						</view>
						
					</view>
					
				</view>
				<view class="oc-body-item-bottom">
					
					<view class="oc-body-item-bottom-num">订单号:jskaljdklajskljd</view>
					<view class="oc-body-item-bottom-fuzhi">复制</view>
					
				</view>
				
				<view class="oc-body-item-button">
					<view class="confirm-button">去支付</view>
					<view class="cancel-button">取消订单</view>
				</view>
				
			</view>
		
			<view class="oc-body-item">
				
				<view class="oc-body-item-top">
					<view style="display: flex;">剩余支付时间：
						<view class="oc-body-item-top-num">21</view>
						<view class="oc-body-item-top-maohao">:</view>
						<view class="oc-body-item-top-num">15</view>
						<view class="oc-body-item-top-maohao">:</view>
						<view class="oc-body-item-top-num">08</view>
					</view>
					<view >待付款</view>
				</view>
				
				<view class="oc-body-item-center">
					
					<image class="oc-body-item-center-left" src="../../static/image/mcz192.png"></image>
						
					
					<view class="oc-body-item-center-right">
						<view class="oc-body-item-center-right-top">
							<view>250ml 雅漾补水喷雾赠一</view>
							<view>x1</view>
						</view>
						
						<view class="oc-body-item-center-right-bottom">
							<view>250ml</view>
							<view>9.9</view>
						</view>
						
					</view>
					
				</view>
				<view class="oc-body-item-bottom">
					
					<view class="oc-body-item-bottom-num">订单号:jskaljdklajskljd</view>
					<view class="oc-body-item-bottom-fuzhi">复制</view>
					
				</view>
				
				<view class="oc-body-item-button">
					<view class="confirm-button">去支付</view>
					<view class="cancel-button">取消订单</view>
				</view>
				
			</view>
					
		</view>
	</view>
</template>

<script>
</script>
<style>
	page {
		background: #F7F8FA;

		color:#707070
	}
</style>
<style lang="scss" scoped>
	.oc-bar{
		height: 80rpx;
		display: flex;
		justify-content: space-around;
		background-color: #FFFFFF;
		.oc-bar-text{
			margin:28rpx 0
		}
	}
	.oc-body{
		
		
		
		.oc-body-item{
			margin-top: 25rpx;
			background-color: #FFFFFF;
			padding-left: 24rpx;
			padding-right: 24rpx;
			.oc-body-item-top{
				display: flex;
				justify-content: space-between;
				border-bottom: 2rpx solid #F7F8FA;
				padding: 28rpx 0;
				align-items: center;
				
				.oc-body-item-top-num{
					width: 42rpx;
					height: 42rpx;
					background-color:#E48879;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 10rpx;
					color:#FFFFFF
					
				}
				.oc-body-item-top-maohao{
					width: 42rpx;
					height: 42rpx;
					background-color:#FFFFFF;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				
			}
			
			.oc-body-item-center{
				padding: 28rpx 0;
				display: flex;
				border-bottom: 2rpx solid #F7F8FA;
				.oc-body-item-center-left{
					width: 186rpx;
					height: 186rpx;
				}
				.oc-body-item-center-right{
					margin-left: 24rpx;
					width: 530rpx;
					height:186rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					
					.oc-body-item-center-right-top{
						display: flex;
						justify-content: space-between;
						
					}
					
				}
			}
			
			.oc-body-item-bottom{
				display: flex;
				padding: 28rpx 0;
				.oc-body-item-bottom-fuzhi{
					color:#BD9E81;
					margin-left:20rpx
				}
			}
			
			.oc-body-item-button{
				display: flex;
				padding-bottom: 28rpx;
				flex-direction:row-reverse;
				
				.cancel-button{
					width: 152rpx;
					height: 56rpx;
					border: 4rpx solid #F7F8FA;
					border-radius: 10rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					
				}
				.confirm-button{
					width: 152rpx;
					height: 56rpx;
					background-color: #BD9E81;
					margin-left: 20rpx;
					border-radius: 10rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #FFFFFF;
				}
			}
			
			
		}
	}
</style>
