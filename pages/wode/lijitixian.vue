<template>
	<view class="index">
		<u-toast ref="uToast" />
		<!-- 		<view class="nav">
			<u-icon @click="goTo" name="arrow-left" size="30"></u-icon>
			<view class="nav-title">立即提现</view>
			<view class="nav-right" @tap="toLishijilu">历史记录</view>
		</view> -->
		<u-navbar title="立即提现">
			<view class="slot-wrap" @tap="toLishijilu">历史记录</view>
		</u-navbar>
		<view class="container">
			<image src="../../static/Path1.png" mode=""></image>
			<view class="bottom">
				<u-radio-group wrap v-model="value" @change="radioGroupChange">
					<u-radio name=1>
						<view class="wx">
							<image class="dibu" src="../../static/矩形139.png" mode=""></image>
							<image class="wxpic" src="../../static/组137.png" mode=""></image>
							<view class="tit">微信</view>
						</view>
					</u-radio>
					<u-radio name=2>
						<view class="zfb">
							<image class="dibu" src="../../static/矩形139.png" mode=""></image>
							<image class="wxpic" src="../../static/路径287.png" mode=""></image>
							<view class="tit">支付宝</view>
						</view>
					</u-radio>
					<u-radio name=3>
						<view class="zfb">
							<image class="dibu" src="../../static/矩形139.png" mode=""></image>
							<image class="wxpic" src="../../static/路径287.png" mode=""></image>
							<view class="tit">银行卡</view>
						</view>
					</u-radio>
				</u-radio-group>
			</view>
		</view>
		<view class="bottom-f">
			<view class="top">
				<view class="user">
					<u-form label-width=120 :model="form" ref="uForm">
						<u-form-item label="姓名">
							<u-input v-model="form.realname" placeholder='请输入姓名' />
						</u-form-item>
						<u-form-item label="账号">
							<u-input v-model="form.account" placeholder='请输入账号' />
						</u-form-item>
						<u-form-item v-if="value == 3" label="开户行">
							<u-input v-model="form.bankname" placeholder='请输入开户行' />
						</u-form-item>
					</u-form>
				</view>
				<view class="tit1">提现金额</view>
				<view class="tit2">
					<view class="tit2-1">￥</view>
					<u-input placeholder="请输入金额" height="80" v-model="money" />
				</view>

				<view class="tit3">
					<view class="tit3-1">当前余额{{withdrawal_money}}元，</view>
					<view class="tit3-2" @tap="arrTX">全部提现</view>
				</view>
			</view>
			<view class="footer" @click="tixian">
				<view class="tit">
					提现至{{txName}}
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				openid: "",
				value: 1,
				money: '',
				withdrawal_money: 0,
				txName: '微信',
				form: {
					realname: '',
					account: '',
					bankname: ''
				},
			}
		},
		onLoad(option) {
			this.withdrawal_money = option.withdrawal_money
		},
		onShow() {
			this.openid = uni.getStorageSync('openid')
		},
		methods: {
			// 提现
			async tixian() {
				var signstr = "openid=" + this.openid + "&withdrawal_type=" + this.value + "&realname=" + this.form
					.realname +
					"&account=" + this.form.account + "&bankname=" + this.form.bankname + "&money=" + this.money + "";
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.wx_withdrawal(this.openid, this.value, this.form.realname, this.form
					.account, this.form.bankname, this.money, md)
				console.log(res)
				if (res.result == 1) {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success',
						url: '/pages/wode/wode',
						duration: 1000,
						isTab: true,
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}

			},
			goTo() {
				uni.switchTab({
					url: '/pages/wode/wode'
				})
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				if (e == 1) {
					this.txName = '微信';
				} else if (e == 2) {
					this.txName = '支付宝';
				} else if (e == 3) {
					this.txName = '银行卡';
				}
			},
			arrTX() {
				this.money = this.withdrawal_money
			},
			toLishijilu() {
				uni.navigateTo({
					url: '/pages/wode/lishijilu'
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.slot-wrap {
		position: absolute;
		right: 16rpx;
		opacity: 1;
		font-size: 22rpx;
		font-family: PingFang SC, PingFang SC-Regular;
		font-weight: 400;
		text-align: left;
		color: #141313;
	}

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

		.nav-right {
			margin-left: 379rpx;
			opacity: 1;
			font-size: 22rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			color: #141313;
		}
	}

	.container {
		position: absolute;
		width: 750rpx;
		height: 716rpx;
		opacity: 1;

		image {
			width: 100%;
			height: 100%;
		}


		.bottom {
			position: absolute;
			top: 27rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 659rpx;
			opacity: 1;
			display: flex;
			align-items: center;

			.wx {
				position: relative;
				width: 621rpx;
				height: 125rpx;
				opacity: 1;

				.ditu {
					width: 100%;
					height: 200rpx;
				}

				.wxpic {
					position: absolute;
					top: 40rpx;
					left: 34rpx;
					width: 43rpx;
					height: 43rpx;
					opacity: 1;
				}

				.tit {
					position: absolute;
					top: 45rpx;
					left: 96rpx;
					opacity: 1;
					font-size: 22rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					text-align: left;
					color: #141313;
				}
			}

			.zfb {
				position: relative;
				width: 621rpx;
				height: 125rpx;
				opacity: 1;

				.ditu {
					width: 100%;
					height: 200rpx;
				}

				.wxpic {
					position: absolute;
					top: 40rpx;
					left: 34rpx;
					width: 43rpx;
					height: 43rpx;
					opacity: 1;
				}

				.tit {
					position: absolute;
					top: 45rpx;
					left: 96rpx;
					opacity: 1;
					font-size: 22rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					text-align: left;
					color: #141313;
				}
			}
		}
	}

	.bottom-f {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 768rpx;
		border-top: 2rpx solid #ddd;

		.top {
			margin: 20rpx 49rpx 0 49rpx;
			height: 200rpx;

			.user {
				margin-bottom: 30rpx;
			}

			// border: 2rpx solid red;
			.tit1 {
				opacity: 1;
				font-size: 22rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #141313;
			}

			.tit2 {
				margin-top: 18rpx;
				display: flex;

				.tit2-1 {
					opacity: 1;
					font-size: 58rpx;
					font-family: PingFang SC, PingFang SC-Heavy;
					font-weight: 800;
					color: #141313;
					margin-right: 10rpx;
				}
			}

			.tit3 {
				display: flex;
				margin-top: 43rpx;

				.tit3-1 {
					opacity: 1;
					font-size: 18rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					color: #b1b1b1;
				}

				.tit3-2 {
					opacity: 1;
					font-size: 18rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					color: #EBBFCC;
				}
			}
		}

		.footer {
			position: fixed;
			bottom: 0;
			background: #ebbfcc;
			width: 750rpx;
			height: 80rpx;
			opacity: 1;
			display: flex;
			justify-content: center;
			align-items: center;

			.tit {
				opacity: 1;
				font-size: 25rpx;
				font-family: SourceHanSansCN-Regular;
				text-align: center;
				color: #ffffff;
				line-height: 36rpx;
			}
		}
	}
</style>
