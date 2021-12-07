<template>
	<view class="index">
		<!-- 有地址 -->
		<view v-if="addressObj" class="nav1" @click="toAddAddress">
			<view class="left">
				<view class="tit1">
					<view class="txt1">{{addressObj.real_name}}</view>
					<view class="txt2">{{addressObj.phone}}</view>
				</view>
				<view class="tit2">
					<view class="b1">默认</view>
					<view class="txt1">
						{{addressObj.province}}{{addressObj.province == addressObj.city ? '' : addressObj.city}}{{addressObj.district}}{{addressObj.detail}}
					</view>
				</view>
			</view>
			<u-icon name="arrow-right" color="#999999" size="26"></u-icon>
		</view>
		<!-- 无地址 -->
		<view v-else @click="toAddAddress" class="noAddress">{{addNum == 'fushu'?'选择默认地址':'添加收货地址'}}</view>
		<view class="nav2" v-for="item in skuItem" :key='item.id'>
			<view class="nav2-1">
				<image :src="item.image" class="pic" mode="">
				</image>
				<view class="right">
					<view class="tit1">
						<view class="txt1">{{item.shopName}}</view>
						<view class="txt2">X{{item.buyNum}}</view>
					</view>
					<view class="down">
						<view class="tit2">{{item?item.suk:''}}</view>
						<view class="tit3">¥ {{item.price}}</view>
					</view>

				</view>
			</view>
			<view class="nav2-2">
				<view class="tit1">
					<view class="txt1">商品金额</view>
					<view class="txt2">¥ {{item.price}}</view>
				</view>
				<view class="tit1">
					<view class="txt1">运费</view>
					<view class="txt2">¥ {{pay_postage}}</view>
				</view>
				<view class="tit1">
					<view class="txt1">优惠券</view>
					<view class="txt2">- ¥0.00</view>
				</view>
				<view class="tit1">
					<view class="txt1">合计</view>
					<view class="txt2">¥ {{zongPrice}}</view>
				</view>
			</view>
		</view>
		<view class="nav3">
			<view class="tit1">
				<view class="txt1">留言</view>
				<view class="txt2">{{InpNum}}/100</view>
			</view>
			<u-input @input='changInp' v-model="mark" type="textarea" placeholder='(选填，可在此给商家留言)' maxlength='100'
				:clearable='false' :border="false" />
		</view>
		<view class="footer">
			<view class="left">
				<view class="txt1">合计¥{{zongPrice}}</view>
				<view class="txt2">(共1件)</view>
			</view>
			<view @click="toQuerenzhifu" class="btn">立即支付</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addNum:'',
				InpNum: 0,
				addressObj: null,
				skuItem: null,
				buyNum: '',
				shopName: '',
				isGWC: null,
				cartId: '',
				mark: '',
				orderKey: '',
				zongPrice: '',
				pay_postage: ''
			}
		},
		onLoad(options) {
			console.log(options)
			if (options.skuItem) {
				this.skuItem = JSON.parse(options.skuItem);
				console.log(this.skuItem)
				this.isGWC = options.isGWC;
				this.cartId = options.cartId;
			}
		},
		onShow() {
			this.getData()
		},
		methods: {
			async getData() {
				this.zongPrice2 = 0;
				const res = await this.$api.addressList()
				this.addressObj = res.data.filter(ele => {
					return ele.is_default == 1
				})[0]
				if(!this.addressObj && res.data.length>0){
					this.addNum = 'fushu'
				}
				console.log(this.addressObj)
				var cartId = '';
				if (this.isGWC == 'no') {
					cartId = this.cartId
				}
				const res2 = await this.$api.orderConfirm({
					cartId: cartId,
					new: this.isGWC == 'no' ? 1 : 0,
				})
				this.orderKey = res2.data.orderKey;
				const res3 = await this.$api.orderComputed({
					addressId: this.addressObj.id,
					payType: 'weixin',
					useIntegral: 0
				}, this.orderKey)
				console.log(res3,'aaaaa')
				this.zongPrice = res3.data.result.total_price;
				this.pay_postage = res3.data.result.pay_postage;
			},
			changInp(e) {
				console.log(e.length)
				this.InpNum = e.length;
			},
			async toQuerenzhifu() {
				const res2 = await this.$api.orderCreate({
					addressId: this.addressObj.id,
					couponId: '',
					payType: 'weixin',
					useIntegral: 0,
					mark: this.mark,
					from: 'routine',
				}, this.orderKey)
				console.log(res2)
				if (res2.status == 200) {
					uni.navigateTo({
						url: `/pages/users/order/querendingdan?uni=${res2.data.result.orderId}&payObj=${encodeURIComponent(JSON.stringify(res2.data.result.jsConfig))}&price=${this.zongPrice}`
					})
				}
			},
			toAddAddress() {
				if (this.addressObj || this.addNum == 'fushu') {
					uni.navigateTo({
						url: `/pages/users/address/index`
					})
				} else {
					uni.navigateTo({
						url: `/pages/users/address/xinjiandizhi`
					})
				}

			},
		}
	}
</script>

<style>
	page {
		background: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.index {
		position: relative;
	}

	.noAddress {
		width: 750rpx;
		height: 88rpx;
		background: #BD9E81;
		font-size: 28rpx;
		font-weight: bold;
		line-height: 88rpx;
		color: #FFFFFF;
		text-align: center;
	}

	.nav1 {
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 40rpx;

		.left {
			.tit1 {
				display: flex;
				align-items: center;

				.txt1 {
					font-size: 24rpx;
					font-weight: bold;
					color: #707070;
				}

				.txt2 {
					margin-left: 20rpx;
					font-size: 24rpx;
					font-weight: bold;
					color: #707070;
				}
			}

			.tit2 {
				margin-top: 12rpx;
				display: flex;

				.b1 {
					margin-top: 4rpx;
					margin-right: 6rpx;
					height: 24rpx;
					width: 48rpx;
					font-size: 18rpx;
					background: #BD9E81;
					line-height: 24rpx;
					text-align: center;
					color: #FFFFFF;
					border-radius: 4rpx;
				}

				.txt1 {
					width: 560rpx;
					font-size: 24rpx;
					font-weight: 400;
					line-height: 34rpx;
					color: #707070;
				}
			}
		}
	}

	.nav2 {
		background: #FFFFFF;
		padding: 28rpx 0 28rpx 40rpx;
		margin-top: 20rpx;

		.nav2-1 {
			display: flex;
			padding-right: 28rpx;
			padding-bottom: 28rpx;
			border-bottom: 2rpx solid #EFEFEF;

			.pic {
				height: 170rpx;
				width: 170rpx;
				border-radius: 8rpx;
			}

			.right {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				width: 480rpx;
				margin-left: 20rpx;
				height: 170rpx;

				.tit1 {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.txt1 {
						width: 410rpx;
						font-size: 28rpx;
						font-weight: 500;
						color: #BD9E81;
						word-break: break-all;
						text-overflow: ellipsis;
						overflow: hidden;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.txt2 {
						font-size: 24rpx;
						font-weight: 400;
						color: #999999;
					}
				}

				.down {
					.tit2 {
						font-size: 24rpx;
						font-weight: 400;
						color: #707070;
					}

					.tit3 {
						margin-top: 8rpx;
						font-size: 28rpx;
						font-weight: 800;
						color: #FA8677;
					}
				}
			}
		}

		.nav2-2 {
			padding-right: 40rpx;
			margin-top: 24rpx;

			.tit1 {
				margin-top: 30rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.txt1 {
					font-size: 24rpx;
					font-weight: 400;
					color: #707070;
				}

				.txt2 {
					font-size: 24rpx;
					font-weight: 500;
					color: #707070;
				}
			}
		}
	}

	.nav3 {
		margin-bottom: 160rpx;
		margin-top: 20rpx;
		height: 288rpx;
		background: #FFFFFF;
		padding: 40rpx;

		.tit1 {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.txt1 {
				font-size: 28rpx;
				font-weight: 500;
				color: #BD9E81;
			}

			.txt2 {
				font-size: 24rpx;
				font-weight: 400;
				color: #707070;
			}
		}

		/deep/ .u-input {
			margin-top: 10rpx;

			.u-input__textarea {
				font-size: 24rpx;
			}
		}
	}

	.footer {
		position: fixed;
		display: flex;
		justify-content: space-between;
		padding: 10rpx 40rpx 0 40rpx;
		bottom: 0;
		width: 100%;
		height: 140rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 8rpx 28rpx rgba(166, 179, 194, 0.3);

		.left {
			height: 84rpx;
			display: flex;
			align-items: center;

			.txt1 {
				font-size: 24rpx;
				font-weight: bold;
				color: #BD9E81;
			}

			.txt2 {
				margin-left: 20rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #707070;
			}
		}

		.btn {
			width: 320rpx;
			height: 84rpx;
			background: #BD9E81;
			border-radius: 44rpx;
			font-size: 28rpx;
			font-weight: bold;
			line-height: 84rpx;
			text-align: center;
			color: #FFFFFF;
		}
	}
</style>
