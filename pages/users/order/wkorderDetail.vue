<template>
	<view>
		<view class="tip">已到店面诊，定金不予退还，可根据个人意愿联系客服改为其他项目</view>
		<view class="address_info">
			<view class="hd">
				<text>周一二</text>
				<text class="phone">15059585958</text>
			</view>
			<view class="detail">
				<view class="mo">默认</view>
				<view>浙江省温州市永嘉县梧田街道哼哈大厦1d1001室</view>
			</view>
			<image src="/static/image/user/arrow_right.png" mode="aspectFit" class="icon"></image>
		</view>
		<view class="order">
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
		<view class="sorder">
			<view class="desc">订单编号：JHS123456123456<view class="copy">复制</view></view>
			<view class="desc">创建时间：2021-09-24 20:00</view>
			<view class="desc">预付款支付时间：2021-09-24 20:00</view>
			<view class="desc">面诊时间：2021-09-24 15:30</view>
		</view>
		<view class="service">
			<button class="u-reset-button contactbtn" open-type="contact">
				<image src="/static/image/user/kefu.png" mode="aspectFit" style="width: 30rpx;height:30rpx;"></image>
				<text class="text">联系客服</text>
			</button>
		</view>
		<u-gap height="120"></u-gap>
		<view class="footbar safe-area-inset-bottom">
			<view class="subbtn">去支付</view>
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
	.tip{
		background-color: #F2ECE6;
		text-align: center;
		padding: 14rpx;
		font-size: 20rpx;
		color: #BD9E81;
	}
	.address_info{
		background-color: #FFFFFF;
		padding:30rpx 40rpx;
		font-size: 24rpx;
		color: #707070;
		position: relative;
		.hd{
			display: flex;
			font-weight: bold;
			padding-bottom: 12rpx;
			.phone{
				padding-left: 20rpx;
			}
		}
		.detail{
			display: flex;
			align-items: center;
			.mo{
				padding:0 8rpx;
				border-radius: 8rpx;
				font-size: 22rpx;
				color: #FFFFFF;
				background-color: #BD9E81;
				margin-right: 6rpx;
			}
		}
		.icon{
			width: 10rpx;
			height: 18rpx;
			position: absolute;
			right:40rpx;
			top:60rpx;
		}
	}
	.order{
		margin-top: 20rpx;
		padding:28rpx 40rpx;
		background-color: #FFFFFF;
		display: flex;
		.img{
			width: 170rpx;
			height: 170rpx;
			background-color: #eee;
		}
		.info{
			flex:1;
			padding-left: 40rpx;
			.name{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #707070;
				padding-bottom: 10rpx;
			}
			.attr{
				font-size: 24rpx;
				font-family: PingFang SC;
				color: #707070;
				padding-top: 10rpx;
			}
			.fnwrap{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-top: 10rpx;
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
	.sorder{
		background-color: #FFFFFF;
		padding:28rpx 40rpx 0;
		font-size: 24rpx;
		color: #707070;
		.desc{
			display: flex;
			padding-bottom: 20rpx;
			.copy{
				padding-left: 20rpx;
				color: #BD9E81;
			}
		}
	}
	.service{
		background-color: #FFFFFF;
		margin:88rpx 40rpx 0 40rpx;
		height: 82rpx;
		border-radius: 10rpx;
		button{
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #707070;
		}
		.text{
			margin-left: 16rpx;
		}
	}
	.footbar{
		position: fixed;
		bottom: 0;
		left:0;
		right: 0;
		z-index: 50;
		width: 100%;
		height: 110rpx;
		background-color: #FFFFFF;
		box-shadow: 0 8rpx 28rpx rgba(166, 179, 194, 0.3);
		padding:0 30rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.subbtn{
			width: 152rpx;
			height: 60rpx;
			line-height: 60rpx;
			background: #BD9E81;
			border-radius:10rpx;
			text-align: center;
			font-size: 24rpx;
			color: #FFFFFF;
		}
	}
</style>