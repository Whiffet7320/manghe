<template>
	<view class="index">
		<u-toast ref="uToast" />
		<!-- 有地址 -->
		<view v-if="addressObj" class="nav1" @click="toAddAddress">
			<view class="left">
				<view class="tit1">
					<view class="txt1">{{addressObj.real_name}}</view>
					<view class="txt2">{{addressObj.phone}}</view>
				</view>
				<view class="tit2">
					<view class="b1" v-if="addressInfo.is_default">默认</view>
					<view class="txt1">
						{{addressObj.province}}{{addressObj.province == addressObj.city ? '' : addressObj.city}}{{addressObj.district}}{{addressObj.detail}}
					</view>
				</view>
			</view>
			<u-icon name="arrow-right" color="#999999" size="26"></u-icon>
		</view>
		<!-- 无地址 -->
		<view v-else @click="toAddAddress" class="noAddress">{{addNum == 'fushu'?'选择默认地址':'添加收货地址'}}</view>
		<template v-if="isNew==0||isNew==1">
			<view class="nav2" v-for="(item,index) in cartInfo" :key='index'>
				<view class="nav2-1">
					<image :src="item.productInfo.image" class="pic" mode="aspectFill"></image>
					<view class="right">
						<view class="tit1">
							<view class="txt1">{{item.productInfo.store_name}}</view>
							<view class="txt2">X{{item.cart_num}}</view>
						</view>
						<view class="down">
							<view class="tit2">{{item.productInfo?item.productInfo.attrInfo.suk:""}}</view>
							<view class="tit3">¥ {{item.productInfo.price}}</view>
						</view>
					</view>
				</view>
				<view class="nav2-2">
					<view class="tit1">
						<view class="txt1">商品金额</view>
						<view class="txt2">¥ {{item.productInfo.price}}</view>
					</view>
					<view class="tit1">
						<view class="txt1">运费</view>
						<view class="txt2">¥ 0.00</view>
					</view>
					<view class="tit1">
						<view class="txt1">优惠券</view>
						<view class="txt2">- ¥ 0.00</view>
					</view>
					<view class="tit1">
						<view class="txt1">合计</view>
						<view class="txt2">
							¥{{parseFloat($tool.argMul(item.cart_num,item.productInfo.price)).toFixed(2)}}
						</view>
					</view>
				</view>
			</view>
		</template>
		<template v-if="isGWC=='no'">
			<view class="nav2" v-for="item in skuItem" :key='item.id'>
				<view class="nav2-1">
					<image :src="item.image" class="pic" mode="aspectFill"></image>
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
						<view class="txt2">- ¥ 0.00</view>
					</view>
					<view class="tit1">
						<view class="txt1">合计</view>
						<view class="txt2">¥ {{zongPrice}}</view>
					</view>
				</view>
			</view>
		</template>
		<template v-if="isJifenShop=='yes'">
			<view class="nav2" v-for="item in skuItem" :key='item.storeInfo.id'>
				<view class="nav2-1">
					<image :src="item.storeInfo.image" class="pic" mode="aspectFill"></image>
					<view class="right">
						<view class="tit1">
							<view class="txt1">{{item.storeInfo.title}}</view>
							<view class="txt2">X1</view>
						</view>
						<view class="down">
							<view class="tit2">{{item?item.storeInfo.unit_name:''}}</view>
							<view class="tit3">¥ {{item.storeInfo.price}}{{isJifenShop=='yes'?'积分':''}}</view>
						</view>
					</view>
				</view>
				<view class="nav2-2">
					<view class="tit1">
						<view class="txt1">商品金额</view>
						<view class="txt2">¥ {{item.storeInfo.price}}{{isJifenShop=='yes'?'积分':''}}</view>
					</view>
					<view class="tit1">
						<view class="txt1">运费</view>
						<view class="txt2">¥ 0.00</view>
					</view>
					<view class="tit1">
						<view class="txt1">优惠券</view>
						<view class="txt2">- ¥ 0.00</view>
					</view>
					<view class="tit1">
						<view class="txt1">合计</view>
						<view class="txt2">¥ {{item.storeInfo.price}}{{isJifenShop=='yes'?'积分':''}}</view>
					</view>
				</view>
			</view>
		</template>

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
				<view class="txt1">合计¥{{zongPrice||0}}{{isJifenShop=='yes'?'积分':''}}</view>
				<view class="txt2">(共{{isJifenShop == 'yes'? 1 : total}}件)</view>
			</view>
			<view class="btn" @click="toQuerenzhifu">立即支付</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				combinationId: 0,
				cartInfo:[],
				isNew:1,
				isJifenShop: null,
				uni: '',
				isAgain: 'no',
				addNum: '',
				InpNum: 0,
				addressObj: null,
				skuItem: null,
				buyNum: '',
				shopName: '',
				isGWC: null,
				cartId: '',
				mark: '',
				orderKey: '',
				zongPrice: '0',
				pay_postage: '',
				pinkId:0
			}
		},
		onLoad(options) {
			if(options.new){
				this.isNew = !options.new || options.new === '0' ? 0 : 1;
			}
			this.pinkId = options.pinkId ? parseInt(options.pinkId) : 0;
			if (options.skuItem) {
				this.skuItem = JSON.parse(options.skuItem);
				if (options.isJifenShop == 'yes') {
					this.isJifenShop = options.isJifenShop;
				} else {
					this.isGWC = options.isGWC;
					this.cartId = options.cartId;
				}
			}
			if (options.cartId) {
				this.cartId = options.cartId;
				this.isGWC = options.isGWC;
			}
			if (options.isAgain) {
				this.isAgain = options.isAgain;
			}
			if(options.uni){
				this.uni = options.uni;
			}
		},
		onShow() {
			this.getData();
		},
		computed:{
			total(){
				if(this.isNew==0||this.isNew==1){
					let sum = 0;
					this.cartInfo.forEach((item) => {
						sum += item.cart_num;
					})
					return sum;
				} else if (this.isGWC === "no") {
					let sum = 0;
					this.skuItem.forEach((item) => {
						sum += item.buyNum;
					})
					return sum;
				}
			}
		},
		methods: {
			/*
			 * 提取砍价和拼团id
			 */
			getBargainId() {
				let cartINfo = this.cartInfo;
				let BargainId = 0;
				let combinationId = 0;
				cartINfo.forEach(function(value, index, cartINfo) {
					combinationId = cartINfo[index].combination_id
				})
				this.combinationId = parseInt(combinationId);
			},
			async getData() {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				this.zongPrice2 = 0;
				const res = await this.$api.addressList()
				this.addressObj = res.data.filter(ele => {
					return ele.is_default == 1
				})[0]

				console.log(res.data.length)
				if (!this.addressObj && res.data.length > 0) {
					this.addressObj = null
					this.addNum = 'fushu'
				}
				console.log(this.addressObj)
				var cartId = '';
				if (this.isGWC == 'no') {
					cartId = this.cartId
				} else {
					cartId = this.cartId
				}
				if (this.isAgain == 'yes') {
					// 再次购买
					const res11 = await this.$api.orderAgain({
						uni: this.uni||this.cartId
					})
					cartId = res11.data.cateId
				}

				if (this.isJifenShop == 'yes') {
					const res2 = await this.$api.store_integralOrderConfirm({
						num: 1,
						unique: this.skuItem[0].productValue['默认'].unique
					})
					this.zongPrice = res2.data.total_price;
				} else {
					const res2 = await this.$api.orderConfirm({
						cartId: cartId,
						new: this.isNew
					})
					this.cartInfo = res2.data.cartInfo;
					this.orderKey = res2.data.orderKey;
					this.getBargainId();
					const res3 = await this.$api.orderComputed({
						addressId: this.addressObj.id,
						couponId:0,
						payType: 'weixin',
						useIntegral: 0
					}, this.orderKey)
					this.zongPrice = res3.data.result.total_price;
					this.pay_postage = res3.data.result.pay_postage;
				}
				uni.hideLoading();
			},
			changInp(e) {
				this.InpNum = e.length;
			},
			async toQuerenzhifu() {
				if (this.isJifenShop == 'yes') {
					const res2 = await this.$api.store_integralOrderCreate({
						addressId: this.addressObj.id,
						num: 1,
						mark: this.mark,
						unique: this.skuItem[0].productValue['默认'].unique
					})
					if (res2.status == 200) {
						uni.showToast({
							title:"支付成功",
							icon:"success"
						})
						setTimeout(()=>{
							uni.redirectTo({
								url:"/pages/users/integral/order"
							})
						},1500)
					}else{
						this.$refs.uToast.show({
							title: res2.msg,
							type: 'warning',
						})
					}
				} else {
					const res2 = await this.$api.orderCreate({
						addressId: this.addressObj.id,
						couponId: 0,
						payType: 'weixin',
						useIntegral: 0,
						mark: this.mark,
						from: 'routine',
					}, this.orderKey)
					if (res2.status == 200) {
						uni.redirectTo({
							url: `/pages/users/order/querendingdan?id=${res2.data.result.orderId}&price=${this.zongPrice}`
						})
						// uni.redirectTo({
						// 	url: `/pages/users/order/querendingdan?uni=${res2.data.result.orderId}&payObj=${encodeURIComponent(JSON.stringify(res2.data.result.jsConfig))}&price=${this.zongPrice}`
						// })
					}
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
			}
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
