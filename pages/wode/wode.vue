<template>
	<view class="index">
		<view class="nav1">
			<view class="tit">我的</view>
			<image class="pic" src="/static/ic_setttings.png" mode=""></image>
		</view>
		<view class="nav2">
			<image v-if="user.facepic" class="pic" :src="user.facepic" mode=""></image>
			<image v-else class="pic" src="/static/Group.png" mode=""></image>
			<view v-if="user.nickname" class="tit" @tap="toLogin">{{user.nickname}}</view>
			<view v-else class="tit" @tap="toLogin">登录/注册</view>
		</view>
		<view class="nav3">
			<view class="btn1" @tap="toJiaoyijilu">
				<image class="pic" src="/static/蒙版组25@2x.png" mode=""></image>
				<view class="tit1">余额</view>
				<view class="tit2">{{user.money}}</view>
			</view>
			<view class="btn2" @tap="toYongjinxiangqin">
				<image class="pic" src="/static/蒙版组26@2x.png" mode=""></image>
				<view class="tit1">佣金</view>
				<view class="tit2">{{user.commission_money}}</view>
			</view>
		</view>
		<view class="nav4">
			<!-- <image class="pic1" src="/static/组244@2x.png" mode=""></image> -->
			<view class="tit">
				<view class="tit1">可提现</view>
				<view class="tit2">￥{{user.withdrawal_money}}</view>
			</view>
			<view class="btn" @tap="toLjitixian">
				<view class="tit3">立即提现</view>
			</view>
		</view>
		<view class="nav5">
			<view class="tit1">我的订单</view>
			<view class="items">
				<view class="item" @tap="toQuanbudingdan(-1)">
					<image class="pic" src="/static/组173.png" mode=""></image>
					<view class="tit">全部订单</view>
				</view>
				<view class="item" @tap="toQuanbudingdan(0)">
					<image class="pic" src="/static/组46.png" mode=""></image>
					<view class="tit">待付款</view>
				</view>
				<view class="item" @tap="toQuanbudingdan(1)">
					<image class="pic" src="/static/路径158.png" mode=""></image>
					<view class="tit">待发货</view>
				</view>
				<view class="item2" @tap="toQuanbudingdan(2)">
					<image class="pic" src="/static/组47.png" mode=""></image>
					<view class="tit">待收货</view>
				</view>
			</view>
		</view>

		<view class="nav5">
			<view class="tit1">常用功能</view>
			<view class="items">
				<view class="item" @click="toshoucang">
					<image class="pic" src="/static/路径180.png" mode=""></image>
					<view class="tit">我的收藏</view>
				</view>
				<button open-type="contact" bindcontact="handleContact" class="item kf">
					<image class="pic" src="/static/路径162.png" mode=""></image>
					<view class="tit">联系客服</view>
				</button>
				<view class="item" @click="toxinshouzhinan">
					<image class="pic" src="/static/ic_notification.png" mode=""></image>
					<view class="tit">新手指南</view>
				</view>
				<view class="item" @click="toShouhuo">
					<image class="pic" src="/static/shouhuo.png" mode=""></image>
					<view class="tit">收货信息</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: null,
				avatarUrl: null,
				openid: null,
				user: null,
			}
		},
		onShow() {
			this.openid = uni.getStorageSync('openid')
			this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$api.wx_userinfo(this.openid)
				console.log(res, 11)
				this.user = {
					...res
				}
			},
			toShouhuo() {
				uni.navigateTo({
					url: '/shouhuoxinxi/pages/shouhuoxinxi'
				})
			},
			toLjitixian() {
				uni.navigateTo({
					url: `/pages/wode/lijitixian?withdrawal_money=${this.user.withdrawal_money}`
				})
			},
			toJiaoyijilu() {
				uni.navigateTo({
					url: '/pages/jiaoyijilu/jiaoyijilu'
				})
			},
			toYongjinxiangqin() {
				uni.navigateTo({
					url: '/pages/yongjinxiangqin/yongjinxiangqin'
				})
			},
			toQuanbudingdan(i) {
				uni.navigateTo({
					url: `/wodeQuanbudingdan/pages/quanbudingdan?orders_status=${i}`
				})
			},
			toKefu() {
				uni.navigateTo({
					url: "lianxikefu"
				})
			},
			handleContact(e) {
				console.log(e.detail.path)
				console.log(e.detail.query)
			},
			toxinshouzhinan() {
				uni.navigateTo({
					url: "/pages/wode/xinshouzhinan"
				})
			},
			toshoucang(){
				uni.navigateTo({
					url: "/pages/wode/shoucang"
				})
			},
			toLogin() {
				uni.navigateTo({
					url: '/weixinshouquan/pages/weixinshouquan'
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.index {}

	.nav1 {
		display: flex;
		margin: 103rpx 49rpx 45rpx 49rpx;
		justify-content: space-between;

		.tit {
			width: 91rpx;
			height: 45rpx;
			opacity: 1;
			font-size: 45rpx;
			font-family: SourceHanSansCN-Regular;
			color: #121212;
		}

		.pic {
			width: 47rpx;
			height: 47rpx;
			opacity: 1;
		}
	}

	.nav2 {
		display: flex;
		align-items: center;
		margin: 0 49rpx 36rpx 49rpx;

		.pic {
			width: 92rpx;
			height: 92rpx;
			opacity: 1;
		}

		.tit {
			margin-left: 25rpx;
			opacity: 1;
			font-size: 27rpx;
			font-family: SourceHanSansCN-Medium;
			text-align: left;
			color: #121314;
			letter-spacing: 0rpx;
		}
	}

	.nav3 {
		display: flex;

		.btn1 {
			// border: 2rpx solid red;
			width: 342rpx;
			height: 121rpx;
			opacity: 1;
			position: relative;
			margin: 0 22rpx;

			.pic {
				position: absolute;
				top: 0;
				left: 0;
				width: 342rpx;
				height: 121rpx;
				opacity: 1;
			}

			.tit1 {
				position: absolute;
				top: 27rpx;
				left: 136rpx;
				width: 94rpx;
				opacity: 1;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				letter-spacing: 20rpx;
				color: #2e2e2e;
			}

			.tit2 {
				position: absolute;
				top: 68rpx;
				left: 50%;
				transform: translateX(-50%);
				opacity: 1;
				font-size: 18rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: center;
				color: #ebbfcc
			}
		}

		.btn2 {
			position: relative;
			width: 342rpx;
			height: 121rpx;
			opacity: 1;
			background: #ebbfcc;
			border-radius: 18rpx;

			.pic {
				position: absolute;
				top: 0;
				left: 0;
				width: 342rpx;
				height: 121rpx;
				opacity: 1;
			}

			.tit1 {
				position: absolute;
				top: 27rpx;
				left: 136rpx;
				width: 94rpx;
				opacity: 1;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				letter-spacing: 20rpx;
				color: #FFFFFF;
			}

			.tit2 {
				position: absolute;
				top: 68rpx;
				left: 50%;
				transform: translateX(-50%);
				opacity: 1;
				font-size: 18rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: center;
				color: #ffffff
			}
		}

	}

	.nav4 {
		// position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 4rpx 22rpx 7rpx 22rpx;
		width: 707rpx;
		height: 92rpx;
		opacity: 1;
		background: #ffffff;
		border-radius: 18rpx;
		box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);

		// .pic1{
		// 	position: absolute;
		// 	top: 0;
		// 	left: 0;
		// 	width: 717rpx;
		// 	height: 103rpx;
		// 	opacity: 1;
		// }
		.tit {
			display: flex;
			align-items: center;

			.tit1 {
				opacity: 1;
				font-size: 18rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				color: #ebbfcc;
				margin-top: 6rpx;
				margin-left: 67rpx;
			}

			.tit2 {
				opacity: 1;
				font-size: 32rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				color: #ebbfcc;
			}
		}


		.btn {
			margin-right: 51rpx;
			width: 161rpx;
			height: 58rpx;
			opacity: 1;
			border: 2rpx solid #ebbfcc;
			border-radius: 25rpx;

			.tit3 {
				margin-top: 10rpx;
				opacity: 1;
				font-size: 22rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #ebbfcc;
			}
		}

	}

	.nav5 {
		width: 710rpx;
		height: 241rpx;
		opacity: 1;
		background: #ffffff;
		box-shadow: 0rpx 5rpx 11rpx 0rpx rgba(0, 0, 0, 0.16);
		margin: 18rpx 22rpx;
		overflow: hidden;

		.tit1 {
			margin: 27rpx 0 53rpx 40rpx;
			opacity: 1;
			font-size: 34rpx;
			font-family: SourceHanSansCN-Medium;
			text-align: left;
			color: #121314;
			letter-spacing: 0rpx;
		}

		.items {
			display: flex;
			margin: 0 72rpx;
			justify-content: space-around;
			.item.kf{
				margin: 0;
				padding: 0;
				background-color: #fff;
			}
			.item.kf::after{
			   border: none;
			}
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;

				// width: 100rpx;
				.pic {
					width: 34rpx;
					height: 38rpx;
					opacity: 1;
				}

				.tit {
					opacity: 1;
					margin-top: 17rpx;
					font-size: 22rpx;
					font-family: SourceHanSansCN-Regular;
					text-align: right;
					color: #121212;
					line-height: 33rpx;
				}
			}

			.item2 {
				display: flex;
				flex-direction: column;
				align-items: center;

				// width: 100rpx;
				.pic {
					width: 51rpx;
					height: 36rpx;
					opacity: 1;
				}

				.tit {
					opacity: 1;
					margin-top: 17rpx;
					font-size: 22rpx;
					font-family: SourceHanSansCN-Regular;
					text-align: right;
					color: #121212;
					line-height: 33rpx;
				}
			}
		}
	}
</style>
