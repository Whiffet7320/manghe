<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="nav1" v-if="option.type != 2">
			<image class="pic1" :src="obj.selected_quote.user_info.avatar" mode=""></image>
			<view class="tit1">
				<view class="txt1">{{obj.selected_quote.user_info.nick_name}}</view>
				<view class="txt2">
					<view class="txt2-1">服务{{obj.selected_quote.craftsman_info.service_count}}次</view>
					<view class="shu"></view>
					<view v-if="obj.selected_quote.craftsman_info.good_rep" class="txt2-1">
						好评率{{obj.selected_quote.craftsman_info.good_rep}}%</view>
					<view v-else class="txt2-1">暂无</view>
				</view>
			</view>
		</view>
		<view class="nav2" v-if="option.type != 2">
			<view class="tit1">
				<view class="txt1">{{obj.item.name}}</view>
				<image class="pic1" :src="obj.images[0]" mode=""></image>
			</view>
			<view class="tit2">
				<view class="txt1">师傅报价</view>
				<view class="txt2">￥{{obj.selected_quote.price}}</view>
			</view>
		</view>
		<view class="nav3" @click="toxuanzeyouhuiquan">
			<view class="left">
				<image class="pic1" src="/static/img/zu87.png" mode=""></image>
				<view class="txt1">优惠券</view>
				<view v-if="option.discount" class="txt2">已选1张现金券</view>
				<view v-else class="txt2">您还未选优惠券</view>
			</view>
			<view class="right">
				<view v-if="option.discount" class="txt1">-{{option.discount}}</view>
				<!-- <view v-else class="txt1">-15.00</view> -->
				<u-icon name="arrow-right" color="#707070" size="20"></u-icon>
			</view>
		</view>
		<view class="nav4">
			<view class="item" @click="changeMyRadio('wx')">
				<view class="tit1">
					<u-icon name="weixin-circle-fill" color="#41B035" size="24"></u-icon>
					<view class="txt1">微信支付</view>
				</view>
				<view v-if="isMyRadio == 'wx'" class="tit2">
					<view class="tit2-1"></view>
				</view>
				<view v-else class="tit3"></view>
			</view>
			<view class="item" @click="changeMyRadio('yue')">
				<view class="tit1">
					<u-icon name="rmb-circle-fill" color="#FF6F00" size="24"></u-icon>
					<view class="txt1">余额支付</view>
				</view>
				<view v-if="isMyRadio == 'yue'" class="tit2">
					<view class="tit2-1"></view>
				</view>
				<view v-else class="tit3"></view>
			</view>
		</view>

		<view class="footer">
			<view class="right">
				<view class="tit1">
					￥{{Number(obj.selected_quote.price)-yhqPrice}}<text v-if="option.discount"
						class="small">（优惠券抵扣{{option.discount}}元）</text>
				</view>
			</view>
			<view @click="pay" class="left">去支付</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isMyRadio: 'wx',
				id: '',
				obj: null,
				option: null,
				yhqPrice: 0,
			}
		},
		onLoad(option) {
			console.log(option)
			this.id = option.id;
			this.option = option;
			this.getData();
			if (option.discount) {
				this.yhqPrice = Number(option.discount);
			}
		},
		// otherFun(object) {
		// 	console.log(object)
		// },
		methods: {
			async pay() {
				if (this.option == 2) {
					const res = await this.$api.goodsOrder({
						item_id: this.id,
						address: JSON.parse(this.option.address),
						pay_type: this.isMyRadio == 'wx' ? 1 : 0,
						coupon_id: this.option.coupon_id
					})
					console.log(res)
					if (res.code == 200) {
						this.$refs.uToast.show({
							title: '支付成功',
							type: 'success',
							back: true,
						})
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'warning',
						})
					}
				} else {
					const res = await this.$api.order({
						demand_quote_id: this.id,
						pay_type: this.isMyRadio == 'wx' ? 1 : 0,
						coupon_id: this.option.coupon_id
					})
					console.log(res)
					if (res.code == 200) {
						this.$refs.uToast.show({
							title: '支付成功',
							type: 'success',
							back: true,
						})
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'warning',
						})
					}
				}

			},
			async getData() {
				if (this.option.type != 2) {
					const res = await this.$api.demandQuotesIdPreOrder(this.id);
					console.log(res)
					this.obj = res.data;
				}

				const res2 = await this.$api.coupons();
				console.log(res2)

			},
			changeMyRadio(val) {
				this.isMyRadio = val;
			},
			toxuanzeyouhuiquan() {
				uni.navigateTo({
					url: `/pages/index/dingdantijiao/xuanzeyouhuiquan?id=${this.id}&price=${this.obj.selected_quote.price}`
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F3F5;
	}
</style>
<style scoped lang="scss">
	.index {
		position: relative;
	}

	.nav1 {
		width: 750rpx;
		height: 126rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;

		.pic1 {
			margin-left: 48rpx;
			margin-right: 28rpx;
			width: 100rpx;
			height: 100rpx;
			background: #FFFFFF;
			border-radius: 50%;
		}

		.tit1 {
			display: flex;
			flex-direction: column;

			.txt1 {
				font-size: 32rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 42rpx;
				color: #000000;
			}

			.txt2 {
				margin-top: 12rpx;
				display: flex;
				align-items: center;

				.txt2-1 {
					font-size: 20rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 28rpx;
					color: #999999;
				}

				.shu {
					margin: 0 16rpx;
					height: 16rpx;
					border: 2rpx solid #999999;
				}
			}
		}
	}

	.nav2 {
		margin-top: 20rpx;
		width: 750rpx;
		height: 188rpx;
		background: #FFFFFF;
		padding: 0 46rpx 0 38rpx;

		.tit1 {
			padding-top: 6rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.txt1 {
				font-size: 32rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 42rpx;
				color: #000000;
			}

			.pic1 {
				width: 115rpx;
				height: 115rpx;
			}
		}

		.tit2 {
			margin-top: 8rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.txt1 {
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 32rpx;
				color: #000000;
			}

			.txt2 {
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 32rpx;
				color: #FF6F00;
			}
		}

		.tit3 {
			margin-top: 16rpx;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.left {
				width: 660rpx;

				.tit1 {
					.txt1 {
						font-size: 24rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 32rpx;
						color: #000000;

						.blue {
							color: #1677FF;
						}
					}

					.txt2 {
						font-size: 24rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 32rpx;
						color: #FF6F00;
					}
				}

				.tit2 {
					.txt1 {
						font-size: 20rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 28rpx;
						color: #000000;
					}
				}
			}

			.right {
				position: absolute;
				right: -26rpx;
			}
		}
	}

	.nav3 {
		margin-top: 20rpx;
		width: 750rpx;
		height: 66rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 22rpx 0 38rpx;

		.left {
			display: flex;
			align-items: center;

			.pic1 {
				width: 34rpx;
				height: 34rpx;
			}

			.txt1 {
				margin-left: 12rpx;
				margin-right: 22rpx;
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 32rpx;
				color: #000000;
			}

			.txt2 {
				text-align: center;
				width: 178rpx;
				height: 32rpx;
				background: #FFFFFF;
				border: 2rpx solid #FF6F00;
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 30rpx;
				color: #FF6F00;
			}
		}

		.right {
			display: flex;
			align-items: center;

			.txt1 {
				margin-right: 16rpx;
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 32rpx;
				color: #FF6F00;
			}
		}
	}

	.nav4 {
		margin-top: 20rpx;
		background: #FFFFFF;

		.item {
			padding: 0 24rpx 0 44rpx;
			height: 66rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.tit1 {
				height: 66rpx;
				display: flex;
				align-items: center;

				.txt1 {
					margin-left: 18rpx;
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #000000;
				}
			}

			.tit2 {
				width: 22rpx;
				height: 22rpx;
				border: 2rpx solid #4988FD;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;

				.tit2-1 {
					width: 14rpx;
					height: 14rpx;
					background: #4988FD;
					border-radius: 50%;
				}
			}

			.tit3 {
				width: 22rpx;
				height: 22rpx;
				border: 2rpx solid #707070;
				border-radius: 50%;
			}
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 104rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.right {
			.tit1 {
				margin-left: 38rpx;
				font-size: 48rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				line-height: 32rpx;
				color: #FF6F00;
				font-weight: 600;

				.small {
					font-weight: 400;
					font-size: 24rpx;
				}
			}
		}

		.left {
			width: 236rpx;
			height: 104rpx;
			background: #4988FD;
			border-radius: 24rpx 0px 0px 0px;
			font-size: 48rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 104rpx;
			color: #FFFFFF;
			text-align: center;
		}
	}
</style>
