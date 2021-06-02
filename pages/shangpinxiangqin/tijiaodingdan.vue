<template>
	<view class="index">
		<!-- 		<view class="nav">
			<u-icon @click="goTo" name="arrow-left" size="30"></u-icon>
			<view class="nav-title">免单记录</view>
			<image src="../../static/组12.png" class="pic" mode=""></image>
		</view> -->
		<view class="container">
			<view class="items">
				<view class="item" v-for="item in list" :key='item.goods_id'>
					<view class="nav2">
						<image class="pic1" :src="item.img" mode=""></image>
						<view class="tit">
							<view class="tit1">{{item.title}}</view>
							<view class="tit2">
								<view class="tit1">￥{{item.price}}</view>
								<view class="tit2">×{{item.goods_num}} {{item.color}} {{item.size}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="items2">
				<view class="item">
					<image class="pic1" src="/static/组252@2x.png" mode=""></image>
					<view class="nav1">
						<view class="tit">
							<view class="tit1"></view>
							<view class="tit2">收件信息</view>
							<!-- <view class="tit3">{{item.is_default == 1?'默认地址' : ''}}</view> -->
						</view>
						<!-- <u-icon @click="delAddress" name="trash-fill"></u-icon> -->
					</view>
					<view class="nav2">
						<view class="box1">
							<view class="box1-1">
								<view class="tit1">收货人：{{receiverlist.realname}}</view>
								<view class="tit2">联系方式：{{receiverlist.mobile}}</view>
							</view>
							<view class="box1-2">收货地址：{{receiverlist.city}}{{receiverlist.address}}</view>
						</view>
						<view class="box2" @click="toXiugaixinxi()">
							<u-icon name="arrow-right" color="#ebbfcc" size="28"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="zjgm">
			<view class="container">
				<image src="../../static/Path1.png" mode=""></image>
				<!-- <view class="tit1">立即购买</view> -->
				<view class="bottom">
					<u-radio-group wrap v-model="zjgmValue" @change="radioGroupChange">
						<u-radio name=1>
							<view class="wx">
								<image class="dibu" src="/static/矩形139.png" mode=""></image>
								<image class="wxpic" src="/static/组137.png" mode=""></image>
								<view class="tit">微信支付</view>
							</view>
						</u-radio>
						<u-radio name=2>
							<view class="zfb">
								<image class="dibu" src="/static/矩形139.png" mode=""></image>
								<image class="wxpic" src="/static/路径287.png" mode=""></image>
								<view class="tit">支付宝支付</view>
							</view>
						</u-radio>
						<u-radio name=3>
							<view class="zfb">
								<image class="dibu" src="/static/矩形139.png" mode=""></image>
								<u-icon class="wxpic" color="#EBBFCC" size="46" name="red-packet-fill"></u-icon>
								<!-- <image class="wxpic" src="/static/路径287.png" mode=""></image> -->
								<view class="tit">余额支付</view>
							</view>
						</u-radio>
					</u-radio-group>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="nav1">
				<view class="tit1">合计</view>
				<view class="tit2">￥{{priceNum}}</view>
			</view>
			<view class="nav2" @click="pay">提交订单</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				openid: null,
				list: [],
				receiverlist: [],
				goods_id: '',
				colorValue: '',
				sizeValue: '',
				num: 0,
				// 合计
				priceNum: 0,
				// 商品总金额
				shopPrice: 0,
				// 支付方式
				zjgmValue: 1,
				// 是否免单
				order_type: null,
				recommend_userid:0,//推荐用户ID
			}
		},
		onLoad(option) {
			console.log(option)
			this.order_type = option.order_type
			this.openid = uni.getStorageSync('openid');
			this.list = JSON.parse(option.list);
			this.receiverlist = JSON.parse(option.receiverlist);
			console.log(this.list, this.receiverlist)
			this.priceNum = 0;
			this.shopPrice = 0;
			this.list.forEach(ele => {
				this.priceNum += ele.goods_num * ele.price + ele.postage
				this.shopPrice += ele.goods_num * ele.price
			})
			if (option.type == 'gwc') {
				uni.setStorageSync('type', 'gwc')
			} else if (option.type == 'xq') {
				uni.setStorageSync('type', 'xq')
				this.goods_id = this.list[0].goods_id;
				this.colorValue = this.list[0].color;
				this.sizeValue = this.list[0].size;
				this.num = this.list[0].goods_num;
			} else if (option.type == 'mdxq') {
				uni.setStorageSync('type', 'mdxq')
				this.goods_id = this.list[0].goods_id;
				this.colorValue = this.list[0].color;
				this.sizeValue = this.list[0].size;
				this.num = this.list[0].goods_num;
			} else if (option.type == 'mdgwc') {
				uni.setStorageSync('type', 'mdgwc')
			}
		},
		async onShow() {
			this.recommend_userid = uni.getStorageSync('scene')
			console.log(this.recommend_userid,1111)
			if (uni.getStorageSync('type') == 'gwc') {
				var signstr = "openid=" + this.openid + "&order_type=" + 1 + "&buy_type=" + 2 +
					"&goods_id=" + 0 + "&color=" + '' + "&size=" + '' + "&num=" +
					0 + "";
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.order_submission(this.openid, 1, 2, 0, '', '', 0, md)
				console.log(res)
				if (res.result == 1) {
					this.list = res.list;
					this.receiverlist = res.receiverlist;
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			} else if (uni.getStorageSync('type') == 'xq') {
				var signstr = "openid=" + this.openid + "&order_type=" + 1 + "&buy_type=" + 1 +
					"&goods_id=" + this.goods_id + "&color=" + this.colorValue + "&size=" + this.sizeValue + "&num=" +
					this.num + "";
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.order_submission(this.openid, 1, 1, this.goods_id, this.colorValue, this
					.sizeValue, this.num, md)
				console.log(res)
				if (res.result == 1) {
					this.list = res.list;
					this.receiverlist = res.receiverlist;
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			} else if (uni.getStorageSync('type') == 'mdgwc') {
				var signstr = "openid=" + this.openid + "&order_type=" + 2 + "&buy_type=" + 2 +
					"&goods_id=" + 0 + "&color=" + '' + "&size=" + '' + "&num=" +
					0 + "";
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.order_submission(this.openid, 2, 2, 0, '', '', 0, md)
				console.log(res)
				if (res.result == 1) {
					this.list = res.list;
					this.receiverlist = res.receiverlist;
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			} else if (uni.getStorageSync('type') == 'mdxq') {
				var signstr = "openid=" + this.openid + "&order_type=" + 2 + "&buy_type=" + 1 +
					"&goods_id=" + this.goods_id + "&color=" + this.colorValue + "&size=" + this.sizeValue + "&num=" +
					this.num + "";
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.order_submission(this.openid, 2, 1, this.goods_id, this.colorValue, this
					.sizeValue, this.num, md)
				console.log(res)
				if (res.result == 1) {
					this.list = res.list;
					this.receiverlist = res.receiverlist;
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			}
		},
		methods: {
			goTo() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
			},
			toXiugaixinxi() {
				uni.navigateTo({
					url: '/shouhuoxinxi/pages/shouhuoxinxi?'
				})
			},
			// 支付
			async pay() {
				console.log(uni.getStorageSync('type'))
				if (uni.getStorageSync('type') == 'gwc') {
					var signstr = "openid=" + this.openid + "&recommend_userid=" + this.recommend_userid + "&order_type=" +
						this.order_type + "&buy_type=" + 2 +
						"&goods_json=" + JSON.stringify(this.list) + "&address_id=" + this.receiverlist.id +
						"&pay_money=" + this
						.priceNum.toFixed(2) +
						"&goods_money=" + this.shopPrice.toFixed(2) + "&totalpostage=" + (this.priceNum - this
							.shopPrice).toFixed(2) +
						"&pay_type=" + this.zjgmValue + "";
					console.log(signstr)
					const md51 = this.$md5(signstr);
					const md52 = md51 + this.$apikey;
					const md = this.$md5(md52).toUpperCase()
					const res = await this.$api.wx_payment(this.openid, this.order_type, 2, this.list, this
						.receiverlist.id, this.priceNum, this.shopPrice, this.priceNum - this.shopPrice, this
						.zjgmValue, md,this.recommend_userid)
					console.log(res, 'gwc')
					if (res.result == 1) {
						if (this.zjgmValue == 3) {
							this.$refs.uToast.show({
								title: res.msg,
								type: 'success',
								back: true,
								duration: 1000
							})
						} else if (this.zjgmValue == 1) {
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: res.payment.timestamp.toString(),
								nonceStr: res.payment.nonceStr,
								package: res.payment.package,
								signType: 'MD5',
								paySign: res.payment.paySign,
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
							});
						}
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'warning',
							duration: 1000
						})
					}
				} else if (uni.getStorageSync('type') == 'xq') {
					var signstr = "openid=" + this.openid + "&recommend_userid=" + this.recommend_userid + "&order_type=" + this.order_type + "&buy_type=" + 1 +
						"&goods_json=" + JSON.stringify(this.list) + "&address_id=" + this.receiverlist.id +
						"&pay_money=" + this
						.priceNum.toFixed(2) +
						"&goods_money=" + this.shopPrice.toFixed(2) + "&totalpostage=" + (this.priceNum - this
							.shopPrice).toFixed(2) +
						"&pay_type=" + this.zjgmValue + "";
					console.log(signstr)
					const md51 = this.$md5(signstr);
					const md52 = md51 + this.$apikey;
					const md = this.$md5(md52).toUpperCase()
					const res = await this.$api.wx_payment(this.openid, this.order_type, 1, this.list, this
						.receiverlist.id, this.priceNum, this.shopPrice, this.priceNum - this.shopPrice, this
						.zjgmValue, md,this.recommend_userid)
					console.log(res, 'xq')
					if (res.result == 1) {
						if (this.zjgmValue == 3) {
							this.$refs.uToast.show({
								title: res.msg,
								type: 'success',
								duration: 1000
							})
						} else if (this.zjgmValue == 1) {
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: res.payment.timestamp.toString(),
								nonceStr: res.payment.nonceStr,
								package: res.payment.package,
								signType: 'MD5',
								paySign: res.payment.paySign,
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
							});
						}

					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'warning',
							duration: 1000
						})
					}
				} else if (uni.getStorageSync('type') == 'mdxq') {
					var signstr = "openid=" + this.openid + "&recommend_userid=" + this.recommend_userid + "&order_type=" + this.order_type + "&buy_type=" + 1 +
						"&goods_json=" + JSON.stringify(this.list) + "&address_id=" + this.receiverlist.id +
						"&pay_money=" + this
						.priceNum.toFixed(2) +
						"&goods_money=" + this.shopPrice.toFixed(2) + "&totalpostage=" + (this.priceNum - this
							.shopPrice).toFixed(2) +
						"&pay_type=" + this.zjgmValue + "";
					console.log(signstr)
					const md51 = this.$md5(signstr);
					const md52 = md51 + this.$apikey;
					const md = this.$md5(md52).toUpperCase()
					const res = await this.$api.wx_payment(this.openid, this.order_type, 1, this.list, this
						.receiverlist.id, this.priceNum, this.shopPrice, this.priceNum - this.shopPrice, this
						.zjgmValue, md,this.recommend_userid)
					console.log(res, 'mdxq')
					if (res.result == 1) {
						if (this.zjgmValue == 3) {
							this.$refs.uToast.show({
								title: res.msg,
								type: 'success',
								duration: 1000
							})
						} else if (this.zjgmValue == 1) {
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: res.payment.timestamp.toString(),
								nonceStr: res.payment.nonceStr,
								package: res.payment.package,
								signType: 'MD5',
								paySign: res.payment.paySign,
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
							});
						}
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'warning',
							duration: 1000
						})
					}
				} else if (uni.getStorageSync('type') == 'mdgwc') {
					var signstr = "openid=" + this.openid + "&recommend_userid=" + this.recommend_userid + "&order_type=" + this.order_type + "&buy_type=" + 2 +
						"&goods_json=" + JSON.stringify(this.list) + "&address_id=" + this.receiverlist.id +
						"&pay_money=" + this
						.priceNum.toFixed(2) +
						"&goods_money=" + this.shopPrice.toFixed(2) + "&totalpostage=" + (this.priceNum - this
							.shopPrice).toFixed(2) +
						"&pay_type=" + this.zjgmValue + "";
					console.log(signstr)
					const md51 = this.$md5(signstr);
					const md52 = md51 + this.$apikey;
					const md = this.$md5(md52).toUpperCase()
					const res = await this.$api.wx_payment(this.openid, this.order_type, 2, this.list, this
						.receiverlist.id, this.priceNum, this.shopPrice, this.priceNum - this.shopPrice, this
						.zjgmValue, md,this.recommend_userid)
					console.log(res, 'mdgwc')
					if (res.result == 1) {
						if (this.zjgmValue == 3) {
							this.$store.commit('mdgmShow', false)
							this.$refs.uToast.show({
								title: res.msg,
								type: 'success',
								url: '/pages/gouwuche/gouwuche',
								isTab: true,
								duration: 1000
							})
						} else if (this.zjgmValue == 1) {
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: res.payment.timestamp.toString(),
								nonceStr: res.payment.nonceStr,
								package: res.payment.package,
								signType: 'MD5',
								paySign: res.payment.paySign,
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
							});
						}
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'warning',
							duration: 1000
						})
					}
				}

			},
		}
	}
</script>

<style scoped lang="scss">
	.index {
		// padding-top: 60rpx;
		height: 100%;
		width: 100%;
		position: relative;
	}

	.nav {
		display: flex;
		align-items: center;
		height: 36rpx;
		margin: 0rpx 50rpx 0 46rpx;

		.nav-title {
			margin-left: 23rpx;
			opacity: 1;
			font-size: 36rpx;
			font-family: SourceHanSansCN-Regular;
			text-align: left;
			color: #121212;
			line-height: 71rpx;
		}

		.pic {
			margin-left: 391rpx;
			width: 34rpx;
			height: 34rpx;
			opacity: 1;
		}
	}

	.container {
		.items {
			.item {
				margin: 0 auto;
				width: 703rpx;
				height: 196rpx;
				opacity: 1;
				background: #ffffff;
				border-radius: 18rpx;
				box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);

				.nav2 {
					display: flex;
					margin-top: 22rpx;
					height: 163rpx;

					.pic1 {
						margin-top: 12rpx;
						margin-left: 13rpx;
						width: 228rpx;
						height: 163rpx;
						opacity: 1;
					}

					.tit {
						margin-top: 12rpx;
						width: 430rpx;

						.tit1 {
							opacity: 1;
							font-size: 22rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							color: #000000;
						}

						.tit2 {
							margin-top: 13rpx;
							height: 36rpx;

							.tit1 {
								opacity: 1;
								font-size: 22rpx;
								font-family: PingFang SC, PingFang SC-Regular;
								font-weight: 400;
								color: #fd4e1f;
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

		.items2 {
			.item {
				margin: 36rpx auto;
				position: relative;
				width: 714rpx;
				height: 214rpx;

				.pic1 {
					position: absolute;
					top: 0;
					left: 0;
					width: 714rpx;
					height: 214rpx;
					opacity: 1;
				}

				.nav1 {
					position: absolute;
					top: 27rpx;
					left: 10rpx;
					display: flex;
					width: 90%;
					align-items: center;
					justify-content: space-between;

					.tit {
						display: flex;

						.tit1 {
							width: 9rpx;
							height: 31rpx;
							opacity: 1;
							background: #ebbfcc;
						}

						.tit2 {
							margin-left: 18rpx;
							opacity: 1;
							font-size: 25rpx;
							font-family: PingFang SC, PingFang SC-Bold;
							font-weight: 700;
							text-align: left;
							color: #000000;
						}

						.tit3 {
							margin-left: 18rpx;
							opacity: 1;
							font-size: 25rpx;
							font-family: PingFang SC, PingFang SC-Bold;
							font-weight: 700;
							text-align: left;
							color: #ebbfcc;
						}
					}


				}

				.nav2 {
					position: relative;

					.box1 {
						position: absolute;
						top: 94rpx;
						left: 56rpx;

						.box1-1 {
							display: flex;

							.tit1 {
								opacity: 1;
								font-size: 22rpx;
								font-family: PingFang SC, PingFang SC-Regular;
								font-weight: 400;
								color: #000000;
							}

							.tit2 {
								margin-left: 54rpx;
								opacity: 1;
								font-size: 22rpx;
								font-family: PingFang SC, PingFang SC-Regular;
								font-weight: 400;
								color: #000000;
							}
						}

						.box1-2 {
							margin-top: 13rpx;
							opacity: 1;
							font-size: 22rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							color: #000000;
						}
					}

					.box2 {
						position: absolute;
						top: 120rpx;
						right: 57rpx;
					}
				}


			}
		}
	}

	.zjgm {
		.container {
			position: absolute;
			width: 750rpx;
			height: 400rpx;
			opacity: 1;

			image {
				width: 100%;
				height: 100%;
			}

			.tit1 {
				position: absolute;
				top: 63rpx;
				left: 50%;
				transform: translateX(-50%);
				opacity: 1;
				font-size: 29rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Medium;
				font-weight: 500;
				text-align: center;
				color: #4a4a4a;
				line-height: 36rpx;
				font-weight: 800;
			}

			.close {
				position: absolute;
				top: 37rpx;
				right: 64rpx;
				width: 31rpx;
				height: 31rpx;
				opacity: 1;
			}

			.bottom {
				position: absolute;
				top: 0rpx;
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

	.footer {
		position: fixed;
		bottom: 0;
		display: flex;
		width: 750rpx;
		height: 80rpx;
		opacity: 1;
		background: #ffffff;
		box-shadow: 0rpx -2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);

		.nav1 {
			display: flex;
			align-items: center;
			height: 80rpx;
			width: 245rpx;
			justify-content: center;

			.tit1 {
				opacity: 1;
				font-size: 18rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #000000;
			}

			.tit2 {
				opacity: 1;
				font-size: 22rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				color: #fd4e1f;
			}
		}

		.nav2 {
			width: 505rpx;
			height: 80rpx;
			opacity: 1;
			background: #ebbfcc;
			font-size: 22rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			line-height: 80rpx;
			color: #ffffff;
		}
	}
</style>
