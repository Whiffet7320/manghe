<template>
	<view class="index">
		<view class="fixbtn">
			<view @click="tofenxiang" class="float1">
				<image src="/static/image/lujin2107.png" class="pic" mode=""></image>
				<view class="txt">分享</view>
			</view>
			<view @click="toJifenguize" class="float1 float2">
				<image src="/static/image/lujin2108.png" class="pic" mode=""></image>
				<view class="txt">规则</view>
			</view>
		</view>
		<u-navbar :title-bold='true' title-color='#000000' :is-back="false" title="首页" title-size='34'>
			<view class="slot-wrap" @click="goUser">
				<image src="/static/image/lujin2106.png" class="top-pic" mode=""></image>
			</view>
		</u-navbar>
		<view class="nav1">
			<image src="/static/image/lujin7894.png" class="pic1" mode=""></image>
			<view class="tit1">
				<view class="txt1">蟹蟹有你</view>
				<view class="txt2">奖励送不停</view>
			</view>
			<image src="/static/image/lujin2.png" class="pic2" mode=""></image>
		</view>
		<view class="nav2">
			<image src="/static/image/lujin14561.png" class="pic1" mode="aspectFit"></image>
			<view class="notice">
				<image src="/static/image/icon_notice.png" mode="aspectFit" class="icon"></image>
				<swiper class="list" :autoplay="true" :vertical="true" :circular="true" :interval="3000" :display-multiple-items="2" v-if="list.length>2">
					<swiper-item class="nitem" v-for="(item,index) in list" :key="index">
						<text class="tit">{{item.name}}</text>
						<text class="time">{{item.time}}</text>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="nav3" @click="toQuerendingdan">
			<image src="/static/image/zu2998.png" class="pic1" mode=""></image>
			<image src="/static/image/zu1998.png" class="pic2" mode=""></image>
			<view class="tit1">{{obj.name}}</view>
			<view class="tit2">
				<view class="txt1">
					￥<text class="big">{{obj.price}}</text>元/只
				</view>
				<view class="txt2">母蟹{{obj.unit}}两</view>
			</view>
			<view class="tit3">立即购买</view>
		</view>
		<view class="nav4">温馨提示：请按实际需求购买</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						name:"450378用户充值500元",
						time:"10分钟前"
					},
					{
						name:"7610312用户购买了6只大闸蟹",
						time:"10分钟前"
					},
					{
						name:"350378用户充值500元",
						time:"3分钟前"
					},
					{
						name:"7610312用户购买了10只大闸蟹",
						time:"5分钟前"
					}
				],
				obj:{},
			}
		},
		onShow() {
			this.getData()
		},
		methods: {
			async getData(){
				const res = await this.$api.product()
				console.log(res)
				this.obj = res.data;
			},
			toLogin(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			toJifenguize(){
				uni.navigateTo({
					url:'/pages/index/jifenguize'
				})
			},
			tofenxiang(){
				uni.navigateTo({
					url:'/pages/index/fenxiang'
				})
			},
			goUser(){
				uni.navigateTo({
					url:"/pages/tabBar/user"
				})
			},
			toQuerendingdan(){
				this.$store.commit("setProinfo",this.obj);
				uni.navigateTo({
					url:'/pages/order/querendingdan'
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #ffffff;
	}
</style>
<style lang="scss" scoped>
	.index {
		position: relative;
	}
	.fixbtn{
		position: fixed;
		bottom: 442rpx;
		right: 0;
		z-index: 100;
	}
	.float1{
		z-index: 99;
		background-image: url(../../static/image/juxin12.png);
		background-size: 100% 100%;
		width: 126rpx;
		height: 48rpx;
		margin-bottom: 46rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.pic{
			width: 30rpx;
			height: 28rpx;
		}
		.txt{
			margin: 8rpx;
			font-size: 28rpx;
			font-weight: 500;
			color: #ffffff;
		}
	}
	.float2{
		margin-bottom: 0;
		.pic{
			width: 26rpx;
			height: 32rpx;
		}
	}
	.top-pic {
		margin-left: 62rpx;
		width: 34rpx;
		height: 38rpx;
	}

	.nav1 {
		margin-top: 44rpx;
		display: flex;
		align-items: center;
		flex-direction: column;

		.pic1 {
			width: 302rpx;
			height: 226rpx;
		}

		.tit1 {
			margin-top: 50rpx;
			width: 402rpx;
			height: 68rpx;
			background: #d61d1d;
			border-radius: 12rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.txt1 {
				font-size: 36rpx;
				font-weight: 500;
				color: #ffffff;
			}

			.txt2 {
				margin-left: 22rpx;
				width: 204rpx;
				height: 58rpx;
				background: #fffefe;
				border-radius: 12rpx;
				font-size: 36rpx;
				font-weight: 500;
				text-align: center;
				color: #d61d1d;
				line-height: 58rpx;
			}
		}

		.pic2 {
			margin-top: 34rpx;
			width: 492rpx;
			height: 352rpx;
		}
	}

	.nav2 {
		position: relative;
		margin:0 40rpx;
		height: 212rpx;
		.pic1 {
			width: 668rpx;
			height: 212rpx;
			position: absolute;
			top:0;
			left:0;
			z-index: 2;
		}
		.notice{
			position: absolute;
			top: 25px;
			left: 15px;
			z-index: 50;
			width: 634rpx;
			height: 150rpx;
			overflow: hidden;
			display: flex;
			.icon{
				width: 36rpx;
				height: 34rpx;
				margin-top: 30rpx;
				margin-left: 30rpx;
				margin-right: 19rpx;
			}
			.list{
				flex:1;
				display: flex;
				flex-wrap: wrap;
				padding-top: 30rpx;
				height: 90rpx;
				overflow: hidden;
				.nitem{
					display: flex;
					align-items: center;
					width: 100%;
					height: 34rpx !important;
					padding-bottom: 14rpx;
					.tit{
						flex:1;
						font-size: 24rpx;
						font-family: PingFang SC, PingFang SC-Bold;
						font-weight: 700;
						color: #d61d1d;
					}
					.time{
						font-size: 24rpx;
						font-family: PingFang SC, PingFang SC-Medium;
						font-weight: 500;
						color: #d61d1d;
						padding-right: 22rpx;
					}
				}
			}
		}
	}

	.nav3 {
		margin-top: 26rpx;
		position: relative;
		height: 334rpx;
		.pic1 {
			position: absolute;
			left: 40rpx;
			top: 0;
			width: 668rpx;
			height: 334rpx;
		}

		.pic2 {
			position: absolute;
			left: 42rpx;
			top: 12rpx;
			width: 286rpx;
			height: 286rpx;
		}

		.tit1 {
			position: absolute;
			left: 386rpx;
			top: 80rpx;
			font-size: 40rpx;
			font-weight: 700;
			color: #ffffff;
		}

		.tit2 {
			display: flex;
			align-items: center;
			left: 386rpx;
			position: absolute;
			top: 136rpx;

			.txt1 {
				color: #ffffff;
				font-size: 32rpx;

				.big {
					font-size: 36rpx;
					font-weight: 700;
				}
			}
			.txt2{
				margin-left: 30rpx;
				font-size: 24rpx;
				font-weight: 500;
				color: #ffffff;
			}
		}
		.tit3{
			left: 386rpx;
			position: absolute;
			top: 198rpx;
			width: 170rpx;
			height: 56rpx;
			background: #ffffff;
			border-radius: 16rpx;
			font-size: 32rpx;
			font-weight: 700;
			text-align: center;
			color: #d91900;
			line-height: 56rpx;
		}
	}
	.nav4{
		font-size: 20rpx;
		font-weight: 500;
		text-align: center;
		color: #d61d1d;
		padding-bottom: 60rpx;
	}
</style>
