<template>
	<view class="index">
		<!-- 		<view class="nav">
			<u-icon @click="goTo" name="arrow-left" size="30"></u-icon>
			<view class="nav-title">邀请好友</view>
		</view> -->
		<view class="container">
			<view class="nav1">
				<image class="pic1" src="../../static/组141@2x.png" mode=""></image>
				<view class="tit1">我累计获得的奖励</view>
				<view class="tit2">
					<view class="tit11">￥</view>
					<view class="tit22">45.00</view>
					<view class="tit33" @tap="toLijitixian">
						<view class="tit44">提现</view>
					</view>
				</view>
			</view>
			<view class="nav2" @tap="changeYqlj">
				<image class="pic1" src="../../static/蒙版组73@2x.png" mode=""></image>
				<view class="tit1">
					<image class="pic2" src="../../static/路径295.png" mode=""></image>
					<view class="tit">链接邀请</view>
				</view>
			</view>

			<view class="nav3">
				<image class="pic1" src="../../static/蒙版组72@2x.png" mode=""></image>
				<view class="tit1">
					<image class="pic2" src="../../static/组143.png" mode=""></image>
					<view class="tit" @tap="toYaoqinerweima">邀请二维码</view>
				</view>
			</view>

		</view>
		<view class="footer">
			<view class="tab">
				<view @tap="getActive('tab2')" :class="{ 'active': isActive, 'tab2':true }">通过二维码邀请</view>
				<view @tap="getActive('tab1')" :class="{ 'active': !isActive, 'tab1':true }">通过链接邀请</view>
			</view>
			<view class="box">
				<view class="items">
					<view class="item" v-for="item in 10" :key="item">
						<image class="pic" src="../../static/Group.png" mode=""></image>
						<view class="tit">
							<view class="tit1">JAYJONE</view>
							<view class="tit2">你已获得3元！奖励次日到账~</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 链接邀请 -->
		<u-popup class="ljyq" v-model="showLjyq" mode="center" border-radius="14" width="681rpx" height="364rpx">
			<view class="tit1">邀请链接</view>
			<view class="tit2">
				<view class="tit">{{yqlink}}</view>
			</view>
			<view class="tit3" @tap="copy">复制</view>
		</u-popup>


	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["yqhyPage", "yqhyPageSize"]),
		},
		watch: {
			yqhyPage: function(yqhyPage) {
				this.$store.commit("yqhyPage", yqhyPage);
				this.getData();
			},
		},
		data() {
			return {
				isActive: true,
				showLjyq: false,
				yqlink: 'DSJFGASKDZ41512',
				openid: null,
			}
		},
		async onShow() {
			this.openid = uni.getStorageSync('openid')
			this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$api.wx_usercommission(this.openid, this.yqhyPage, this.yqhyPageSize);
				console.log(res)
			},
			getActive(val) {
				if (val == 'tab1') {
					this.isActive = true;
				} else {
					this.isActive = false;
				}
			},
			goTo() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			toYaoqinerweima() {
				uni.navigateTo({
					url: '/pages/yaoqinghaoyou/yaoqinerweima'
				})
			},
			copy() {
				uni.setClipboardData({
					data: this.yqlink,
					success: function() {
						console.log('success');
					}
				})
			},
			changeYqlj() {
				this.showLjyq = true
			},
			toLijitixian() {
				uni.navigateTo({
					url: '/pages/yaoqinghaoyou/lijitixian'
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	// page{
	// 	width: 750rpx;
	// 	height: 1333rpx;
	// }
	.index {
		position: relative;
		// padding-top: 60rpx;
		height: 100%;
		width: 100%;
	}

	.nav {
		display: flex;
		align-items: center;
		height: 36rpx;
		// padding: 60rpx 50rpx 33rpx 46rpx;
		margin: 0rpx 50rpx 0rpx 46rpx;

		.nav-title {
			margin-left: 23rpx;
			opacity: 1;
			font-size: 36rpx;
			font-family: SourceHanSansCN-Regular;
			text-align: left;
			color: #121212;
			line-height: 71rpx;
		}
	}

	.container {
		margin: 33rpx 43rpx 0 43rpx;

		.nav1 {
			position: relative;
			width: 663rpx;
			height: 143rpx;
			opacity: 1;

			.pic1 {
				position: absolute;
				top: 0;
				left: 0;
				width: 663rpx;
				height: 143rpx;
				opacity: 1;
			}

			.tit1 {
				position: absolute;
				top: 34rpx;
				left: 45rpx;
				opacity: 1;
				font-size: 18rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #141313;
			}

			.tit2 {
				height: 67rpx;
				position: absolute;
				top: 51rpx;
				left: 261rpx;
				display: flex;
				align-items: center;

				.tit11 {
					opacity: 1;
					font-size: 22rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #af0000;
					transform: translateY(12rpx);
				}

				.tit22 {
					opacity: 1;
					font-size: 50rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #af0000;
				}

				.tit33 {
					margin-left: 85rpx;
					width: 143rpx;
					height: 40rpx;
					opacity: 1;
					background: #af0000;
					border: 2rpx solid #ffffff;
					border-radius: 22rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					.tit44 {
						opacity: 1;
						font-size: 18rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						color: #ffffff;
					}
				}
			}
		}

		.nav2 {
			position: relative;
			margin: 14rpx 0;
			width: 663rpx;
			height: 71rpx;
			opacity: 1;

			.pic1 {
				position: absolute;
				top: 0;
				margin: 0;
				width: 663rpx;
				height: 71rpx;
				opacity: 1;
			}

			.tit1 {
				position: relative;
				display: flex;
				height: 25rpx;
				align-items: center;

				.pic2 {
					position: absolute;
					top: 24rpx;
					left: 257rpx;
					width: 25rpx;
					height: 25rpx;
					opacity: 1;
				}

				.tit {
					position: absolute;
					top: 22rpx;
					left: 306rpx;
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					color: #9b9b9b;
					letter-spacing: 6rpx;
				}
			}
		}

		.nav3 {
			position: relative;
			width: 663rpx;
			height: 71rpx;
			opacity: 1;
			margin-bottom: 34rpx;

			.pic1 {
				position: absolute;
				top: 0;
				margin: 0;
				width: 663rpx;
				height: 71rpx;
				opacity: 1;
			}

			.tit1 {
				position: relative;
				display: flex;
				height: 25rpx;
				align-items: center;

				.pic2 {
					position: absolute;
					top: 24rpx;
					left: 257rpx;
					width: 25rpx;
					height: 24rpx;
					opacity: 1;
				}

				.tit {
					position: absolute;
					top: 22rpx;
					left: 306rpx;
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					color: #9b9b9b;
					letter-spacing: 6rpx;
				}
			}
		}


	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 857rpx;
		opacity: 1;

		.tab {
			height: 76rpx;
			display: flex;
			justify-content: space-around;

			.tab1 {
				height: 76rpx;
				line-height: 76rpx;
				opacity: 1;
				font-size: 25rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: left;
				color: #707070;
			}

			.tab1.active {
				border-bottom: 2rpx solid #ebbfcc;
				line-height: 76rpx;
				opacity: 1;
				font-size: 25rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #ebbfcc;
			}

			.tab2 {
				height: 76rpx;
				line-height: 76rpx;
				opacity: 1;
				font-size: 25rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #707070;
			}

			.tab2.active {
				border-bottom: 2rpx solid #ebbfcc;
				line-height: 76rpx;
				opacity: 1;
				font-size: 25rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #ebbfcc;
			}
		}

		.box {
			overflow: scroll;
			margin: 0rpx 38rpx;
			width: 674rpx;
			height: 743rpx;
			opacity: 1;
			border: 2rpx solid #dcdcdc;
			border-radius: 20rpx;

			.items {
				margin: 40rpx 26rpx 0 54rpx;

				.item {
					display: flex;
					align-items: center;
					height: 60rpx;
					margin-bottom: 60rpx;

					.pic {
						width: 60rpx;
						height: 60rpx;
						opacity: 1;
						margin-right: 18rpx;
					}

					.tit {
						.tit1 {
							opacity: 1;
							font-size: 22rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							color: #141313;
						}

						.tit2 {
							opacity: 1;
							font-size: 18rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							color: #707070;
						}
					}
				}
			}
		}

	}

	.ljyq {
		.tit1 {
			opacity: 1;
			font-size: 29rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Medium;
			font-weight: 500;
			text-align: center;
			margin: 46rpx 0;
			color: #4a4a4a;
			line-height: 36rpx;
		}

		.tit2 {
			width: 576rpx;
			height: 125rpx;
			opacity: 1;
			border: 2rpx solid #ddd;
			border-radius: 40rpx;
			margin: 0 auto;

			.tit {
				margin-top: 45rpx;
				opacity: 1;
				font-size: 22rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: center;
				color: #9b9b9b;
			}
		}

		.tit3 {
			opacity: 1;
			margin-top: 43rpx;
			font-size: 22rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: center;
			color: #ebbfcc;
		}
	}
</style>
