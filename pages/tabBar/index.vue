<template>
	<view class="index">
		<view @click="tofenxiang" class="float1">
			<image src="/static/image/lujin2107.png" class="pic" mode=""></image>
			<view class="txt">分享</view>
		</view>
		<view @click="toJifenguize" class="float1 float2">
			<image src="/static/image/lujin2108.png" class="pic" mode=""></image>
			<view class="txt">规则</view>
		</view>
		<u-navbar :title-bold='true' title-color='#000000' :is-back="false" title="首页" title-size='34'>
			<view class="slot-wrap">
				<image @click="toLogin" src="/static/image/lujin2106.png" class="top-pic" mode=""></image>
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
			<image src="/static/image/lujin14561.png" class="pic1" mode=""></image>
			<!-- 			<view class="box">
				<u-notice-bar type="none" mode='vertical' :is-circular="false" :list="list"></u-notice-bar>
			</view> -->

		</view>
		<view class="nav3" @click="toQuerendingdan">
			<image src="/static/image/zu2998.png" class="pic1" mode=""></image>
			<image src="/static/image/zu1998.png" class="pic2" mode=""></image>
			<view class="tit1">阳澄湖大闸蟹</view>
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
					'寒雨连江夜入吴',
					'平明送客楚山孤',
					'洛阳亲友如相问',
					'一片冰心在玉壶'
				],
				obj:{},
			}
		},
		onShow() {
			this.getData()
		},
		mounted() {

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
			toQuerendingdan(){
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
	.float1{
		z-index: 99;
		background-image: url(../../static/image/juxin12.png);
		background-size: 100% 100%;
		width: 126rpx;
		height: 48rpx;
		position: fixed;
		top: 1032rpx;
		right: 0;
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
	.float2.float1{
		top: 1128rpx;
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
		.pic1 {
			margin-left: 42rpx;
			width: 668rpx;
			height: 212rpx;
		}

		.box {
			width: 400rpx;
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
	}

</style>
