<template>
	<view class="index">
		<view class="nav1">积分获取使用规则</view>
		<view class="float1">USE RULES</view>
		<view class="nav2">
			<view class="txt1">{{txt1}}</view>
			<view class="tit2">
				<view class="fk"></view>
				<view class="txt2-1">邀请好友注册，好友下单(充值或购买即可获得相对应的积分),积分在每天0点到24点为界限；</view>
			</view>
			<view class="tit2 tit3">
				<view class="fk"></view>
				<view class="txt2-1">积分奖励分为五级：一级推荐(积分奖励等于充值购买金额的百分八);二级推荐(积分奖励等于充值购买金额的百分五);三级推荐(积分奖励等于充值购买金额的百分二);</view>
			</view>
			<view class="txt1 txt3">{{txt2}}</view>
			<view class="tit2">
				<view class="fk"></view>
				<view class="txt2-1">购买99元一箱蟹。每天分红收益6.6，收益20天总收益132元购买越多收益越多。1积分等于1元。提现早上9点到晚上9点。满10元提现提现手续费1%，提现秒到。</view>
			</view>
			<view class="txt4">
				*注：积分结算时间为每天0点~24点；推荐的好友需通过推荐人的邀请码、发送的链接，才可建立推荐关系；如若发现不正当手段获得积分，螃蟹商城有权取消该奖励；若有疑问请咨询客服；
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				txt1:'>邀请好友赚积分<',
				txt2:'>充值购买得积分<',
			}
		},
	}
</script>

<style lang="scss">
	page {
		background: #f9edd1;
	}
</style>
<style lang="scss" scoped>
	.index{
	}
	.nav1{
		margin-left: 144rpx;
		margin-top: 40rpx;
		width: 460rpx;
		height: 136rpx;
		border: 2rpx solid #91876d;
		font-size: 44rpx;
		font-weight: 700;
		text-align: center;
		line-height: 136rpx;
		color: #312200;
	}
	.float1{
		margin-left: 274rpx;
		margin-top: -22rpx;
		background: #f9edd1;
		text-align: center;
		width: 200rpx;
		height: 44rpx;
	}
	.nav2{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-left: 48rpx;
		margin-top: 40rpx;
		background-image: url(../../static/image/zu2984.png);
		background-size: 100% 100%;
		width: 652rpx;
		height: 1094rpx;
		.txt1{
			font-size: 32rpx;
			font-weight: 700;
			text-align: center;
			color: #d61d1d;
			padding-top: 92rpx;
		}
		.tit2{
			display: flex;
			margin-top: 32rpx;
			.fk{
				margin-top: 10rpx;
				width: 18rpx;
				height: 18rpx;
				background: #5d430a;
				transform: rotate(45deg);
				margin-right: 22rpx;
			}
			.txt2-1{
				width: 458rpx;
				font-size: 24rpx;
				font-weight: 500;
				color: #312200;
				line-height: 40rpx;
			}
		}
		.tit2.tit3{
			margin-top: 28rpx;
		}
		.txt3.txt1{
			padding-top: 36rpx;
		}
		.txt4{
			margin-top: 60rpx;
			width: 502rpx;
			font-size: 20rpx;
			font-weight: 700;
			color: #d61d1d;
			line-height: 32rpx;
		}
	}
</style>
