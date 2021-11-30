<template>
	<view class="u-relative">
		<view class="bg"><image src="/static/image/user/bg.jpg" mode="aspectFill" class="img"></image></view>
		<view class="total">
			<text class="text">我的积分</text>
			<text class="number">{{point||0}}</text>
		</view>
		<view class="tit"></view>
		<view class="pointlist">
			<view class="point_item" v-for="(item,index) in list" :key="index">
				<view class="left">
					<view class="name">{{item.name}}</view>
					<view class="time">{{item.time}}</view>
				</view>
				<view class="number">{{item.number}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				point:0,
				list:[
					{
						name:"成功邀请1名好友",
						time:"2021-07-06 10:55:30",
						number:"+10"
					},
					{
						name:"成功邀请1名好友",
						time:"2021-07-06 10:55:30",
						number:"+10"
					}
				]
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
	.bg{
		width: 100%;
		height: 158rpx;
		position: absolute;
		top:0;
		left:0;
		z-index: -1;
		.img{
			width: 100%;
			height: 100%;
		}
	}
	.total{
		width: 100%;
		height: 158rpx;
		padding-left: 60rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.text{
			font-size: 24rpx;
			font-family: PingFang SC;
			color: rgba(255,255,255,0.8);
			margin-bottom: 8rpx;
		}
		.number{
			font-size: 48rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
		}
	}
	.tit{
		padding:28rpx 40rpx 24rpx 40rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #707070;
	}
	.pointlist{
		margin: 0 20rpx;
		background-color: #FFFFFF;
		.point_item{
			padding: 24rpx 40rpx 24rpx 0;
			margin-left: 40rpx;
			border-bottom: 2px solid #F7F8FA;
			display: flex;
			align-items: center;
			&:last-child{
				border:0;
			}
			.left{
				flex:1;
				display: flex;
				flex-direction: column;
				.name{
					font-size: 24rpx;
					color:#707070;
				}
				.time{
					padding-top: 12rpx;
					font-size: 20rpx;
					color:#707070;
				}
			}
			.number{
				font-size: 24rpx;
				color: #FA8677;
				font-weight: bold;
			}
		}
	}
</style>
