<template>
	<view class="index">
		<view class="nav1">
			<image src="/static/image/fenxiang.png" class="pic1" mode=""></image>
			<view class="tit1">
				<image src="/static/image/zu11998.png" class="pic1-1" mode=""></image>
				<view class="txt1">推荐好友领福利</view>
			</view>
			<view class="tit2">
				<view class="txt1">您的邀请码为</view>
				<view class="txt2">47356086</view>
				<view class="txt3">好友也可在注册时直接填写邀请码</view>
			</view>
			<view class="tit3">
				<view class="txt1">①通过下方邀请按钮分享</view>
				<view class="txt1 txt2">②点击右上角分享邀请链接，朋友通过链接注册</view>
				<view class="txt1 txt2">③分享您的专属邀请码，朋友扫码注册获得奖励</view>
			</view>
			<view class="tit4">立即邀请</view>
		</view>
		<view class="mynav">
			<u-navbar v-if='!isFlag' :title-bold='true' :border-bottom='false' back-icon-color='#ffffff'
				:background='background' title-color='#ffffff' title="分享" title-size='34'></u-navbar>
			<u-navbar v-else :title-bold='true' :border-bottom='false' :background='background2' title-color='#ffffff'
				title="分享" title-size='34'></u-navbar>
		</view>
		<view class="nav2">
			<view class="txt1">我的邀请</view>
			<view class="item2">
				<view class="left">
					<view class="txt1-1">成功邀请(人)</view>
					<view class="txt2-1">12</view>
				</view>
				<view class="shu"></view>
				<view class="right left">
					<view class="txt1-1">邀请所获得的积分</view>
					<view class="txt2-1">45870</view>
				</view>
			</view>
		</view>
		<view class="nav3">
			<view class="txt1">推荐规则</view>
			<view class="txt2">
				1.邀请好友注册，好友下单(充值或购买即可获得相对应的积分),积分在每天0点到24点为界限；
			</view>
			<view class="txt2">
				2.积分奖励分为五级：一级推荐(积分奖励等于充值购买金额的百分五);二级推荐(积分奖励等于充值购买金额的百分三);三级推荐(积分奖励等于充值购买金额的百分二);四级推荐(积分奖励等于充值购买金额的百分之一);五级推荐或以下（积分奖励等于充值购买金额的百分之零点五);
			</view>
			<view class="txt2">
				3.推荐的好友需通过推荐人的邀请码、发送的链接，才可建立推荐关系；
			</view>
			<view class="txt2">
				4.如若发现恶意注册或非正常推荐好友获得积分，螃蟹商城有权取消该奖励；
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					'background': 'transparent'
				},
				background2: {
					'background': '#D61D1D'
				},
				isFlag: false,
			}
		},
		onPageScroll(e) {
			if (e.scrollTop >= 100) {
				this.isFlag = true;
			}else{
				this.isFlag = false;
			}
		},
	}
</script>

<style lang="scss">
	page {
		background: #f7f8fa;
	}
</style>
<style lang="scss" scoped>
	.index {}

	.nav1 {
		position: relative;
		width: 750rpx;
		height: 1276rpx;

		.pic1 {
			position: absolute;
			top: 0;
			left: 0;
			width: 750rpx;
			height: 1276rpx;
		}

		.tit1 {
			position: absolute;
			top: 526rpx;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			align-items: center;

			.pic1-1 {
				width: 66rpx;
				height: 68rpx;
			}

			.txt1 {
				font-size: 48rpx;
				font-weight: 700;
				color: #000000;
				width: 336rpx;
			}
		}

		.tit2 {
			position: absolute;
			top: 624rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 480rpx;
			height: 228rpx;
			background: #ffffff;
			border-radius: 16rpx;
			box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(80, 69, 10, 0.37);

			.txt1 {
				font-size: 28rpx;
				font-weight: 700;
				text-align: center;
				color: #000000;
				margin-top: 34rpx;
				font-family: PingFang SC, PingFang SC-Bold;
			}

			.txt2 {
				text-align: center;
				font-size: 44rpx;
				font-weight: 700;
				color: #d61d1d;
				margin-top: 12rpx;
			}

			.txt3 {
				margin-top: 16rpx;
				font-size: 24rpx;
				font-weight: 700;
				text-align: center;
				color: #808080;
				font-family: PingFang SC, PingFang SC-Bold;
			}
		}

		.tit3 {
			position: absolute;
			top: 894rpx;
			left: 124rpx;

			.txt1 {
				font-size: 24rpx;
				font-weight: 700;
				color: #000000;
			}

			.txt2 {
				margin-top: 12rpx;
			}
		}

		.tit4 {
			position: absolute;
			top: 1078rpx;
			left: 228rpx;
			width: 296rpx;
			height: 80rpx;
			background: #d61d1d;
			border-radius: 40rpx;
			font-size: 28rpx;
			font-weight: 700;
			text-align: center;
			line-height: 80rpx;
			color: #ffffff;
		}
	}

	.mynav {
		height: 0;
	}

	.nav2 {
		height: 284rpx;
		background: #FFFFFF;

		.txt1 {
			font-size: 28rpx;
			font-weight: 700;
			text-align: center;
			color: #000000;
			padding-top: 48rpx;
		}

		.item2 {
			display: flex;
			align-items: center;
			margin-top: 48rpx;

			.left {
				width: 50%;
				padding: 0 58rpx;
				display: flex;
				flex-direction: column;
				align-items: center;

				.txt1-1 {
					font-size: 24rpx;
					font-weight: 700;
					color: #808080;
				}

				.txt2-1 {
					margin-top: 16rpx;
					font-size: 36rpx;
					font-weight: 700;
					color: #000000;
				}
			}

			.right {
				.txt2-1 {
					color: #d61d1d;
				}
			}

			.shu {
				width: 2rpx;
				height: 72rpx;
				border: 2rpx solid #f2f2f2;
			}
		}
	}

	.nav3 {
		margin-top: 20rpx;
		width: 750rpx;
		height: 668rpx;
		background: #ffffff;
		padding: 0 30rpx;

		.txt1 {
			padding-top: 28rpx;
			font-size: 28rpx;
			font-weight: 700;
			text-align: center;
			color: #000000;
		}

		.txt2 {
			margin-top: 22rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #808080;
			line-height: 40rpx;
		}
	}
</style>
