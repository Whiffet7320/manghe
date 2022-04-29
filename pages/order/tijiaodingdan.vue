<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="nav1" @click="toJump('/pages/user/address/index','needBack=yes')">
			<!-- 无地址 -->
			<view v-if="!nowAddress || !nowAddress.address_phone" class="n1-txt1">请选择收货地址</view>
			<!-- 有地址 -->
			<view v-else class="n1-txt2">
				<view class="txt2-1">
					<view class="txt2-1-1">{{nowAddress.address_person}}</view>
					<view class="txt2-1-1">{{nowAddress.address_phone}}</view>
				</view>
				<view class="txt2-2">{{nowAddress.address_area}}{{nowAddress.address_detail}}</view>
			</view>
			<u-icon name="arrow-right" color="#585858" size="32"></u-icon>
		</view>
		<view class="nav2">
			<view class="n2-tit1">
				<view v-if="isTiqu" :class="{'n2t1-l':true,'bbx1':shopObj.shop_degree == 0,'bbx2':shopObj.shop_degree == 1,'bbx3':shopObj.shop_degree == 2,'bbx4':shopObj.shop_degree == 3}">
					<view v-if="shopObj.shop_degree == 0" class="n7i-txt1">金色传说</view>
					<view v-if="shopObj.shop_degree == 1" class="n7i-txt1">红色史诗</view>
					<view v-if="shopObj.shop_degree == 2" class="n7i-txt1">紫色稀有</view>
					<view v-if="shopObj.shop_degree == 3" class="n7i-txt1">蓝色普通</view>
					<image :src="shopObj.shop_img" class="n2t1-imgg" mode=""></image>
				</view>
				<image v-else :src="shopObj.shop_img" class="n2t1-img" mode=""></image>
				<view class="n2t1-r">
					<view class="b1">中奖商品</view>
					<view class="b2">{{shopObj.shop_name}}</view>
				</view>
			</view>
			<view class="heng"></view>
			<view class="n2-tit2">
				<view class="n2t2-l">支付方式</view>
				<view v-if="isTiqu == 1" class="n2t2-r">奖品提取</view>
				<view v-if="type == 2" class="n2t2-r">商品置换</view>
				<view v-if="type == 1" class="n2t2-r">商品购买</view>
			</view>
			<view class="n2-tit2">
				<view class="n2t2-l">运费</view>
				<view class="n2t2-r">免运费</view>
			</view>
			<view class="n2-tit2">
				<view class="n2t2-l">合计</view>
				<view v-if="isTiqu" class="n2t2-r">0</view>
				<view v-else class="n2t2-r">{{price}}</view>
			</view>
		</view>
		<view class="footer">
			<view @click="toBuy" class="btn" v-if='type == 1'>立即购买</view>
			<view @click="popShow1 = true" class="btn" v-if='type == 2'>立即置换</view>
			<view v-if="isTiqu" @click="tiquSubmit" class="btn">确定提取</view>
		</view>
		<!-- 确认置换 -->
		<u-popup v-model="popShow1" mode='center' border-radius="28" width="640rpx" height="304rpx">
			<view class="pop1">
				<view class="p3-txt1">置换所得商品将进入发货阶段 请确定是否置换？</view>
				<view class="p3-btns">
					<view class="btn1" @click="popShow1 = false">取消</view>
					<view class="btn2" @click="toZhihuan">确定</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: '',
				popShow1: false,
				num: '',
				shop_id: '',
				nowAddress: {},
				sum: '',
				price: '',
				shopObj: {},
				isTiqu: null,
				nowGetData: '',
				order: '',
			}
		},
		onLoad(options) {
			console.log(options)
			this.type = options.type;
			this.num = options.num;
			this.shop_id = options.shop_id;
			this.sum = options.sum;
			this.price = options.price;
			this.order = options.order_id;
			if (options.shopObj) {
				this.shopObj = JSON.parse(options.shopObj)
			}
			if (options.isTiqu) {
				this.isTiqu = options.isTiqu;
			}
			console.log(this.shopObj)
		},
		onShow() {
			this.getData()
		},
		methods: {
			otherFun(obj) {
				console.log(obj)
				this.nowAddress = obj.nowItem;
				this.nowGetData = obj.noGetData;
			},
			async getData() {
				console.log(this.nowGetData)
				if (this.nowGetData == 'yes') {
					return;
				}
				const res = await this.$api.getAddressList()
				this.nowAddress = res.data.filter(ele => {
					return ele.address_def
				})[0]
				console.log(this.nowAddress)
			},
			async toBuy() {
				if (!this.nowAddress) {
					this.$refs.uToast.show({
						title: `请先选择收货地址`,
						duration: 1000,
					})
				}
				const res = await this.$api.substitutionOrder({
					num: this.num,
					shop_id: this.shop_id,
					address_id: this.nowAddress.address_id,
					order: this.order
				})
				this.$refs.uToast.show({
					title: res.msg,
					duration: 1000,
					callback: () => {
						if (res.status == 200) {
							uni.reLaunch({
								url: '/pages/order/goumaichenggong'
							})
						}
					},
				})
			},
			async toZhihuan() {
				if (!this.nowAddress) {
					this.$refs.uToast.show({
						title: `请先选择收货地址`,
						duration: 1000,
					})
				}
				const res = await this.$api.substitutionOrder({
					address_id: this.nowAddress.address_id,
					order_id: this.shopObj.order_id,
					shop_id: this.shop_id,
					num: this.num,
					order: this.order,
				})
				this.$refs.uToast.show({
					title: res.msg,
					duration: 1000,
					callback: () => {
						if (res.status == 200) {
							uni.reLaunch({
								url: '/pages/order/zhihuanchenggong'
							})
						}
					},
				})
			},
			async tiquSubmit() {
				if (!this.nowAddress) {
					this.$refs.uToast.show({
						title: `请先选择收货地址`,
						duration: 1000,
					})
				}
				const res = await this.$api.changeOrderToPick({
					address_id: this.nowAddress.address_id,
					order_id: this.shopObj.order_id,
					order: this.order,
				})
				this.$refs.uToast.show({
					title: res.msg,
					duration: 1000,
					callback: () => {
						if (res.status == 200) {
							uni.reLaunch({
								url: '/pages/order/tiquchenggong'
							})
						}
					},
				})
			},
			toJump(url, params) {
				uni.navigateTo({
					url: `${url}?${params}`
				})
			},
		},
	}
</script>

<style>
	page {
		background: #f7f7f7;
	}
</style>
<style scoped lang="scss">
	.index {
		position: relative;
	}

	.nav1 {
		width: 690rpx;
		min-height: 132rpx;
		background: #ffffff;
		border-radius: 24rpx;
		transform: translateY(24rpx);
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 24rpx;

		.n1-txt1 {
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #333333;
		}

		.n1-txt2 {
			width: 90%;

			.txt2-1 {
				display: flex;
				align-items: center;

				.txt2-1-1 {
					font-size: 32rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #333333;
				}

				.txt2-1-2 {
					margin-left: 22rpx;
					font-size: 32rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #333333;
				}
			}

			.txt2-2 {
				margin-top: 8rpx;
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #666666;
			}
		}
	}

	.nav2 {
		margin: 48rpx 30rpx 0;
		border-radius: 24rpx;
		background: #ffffff;
		padding: 32rpx 24rpx 14rpx 24rpx;

		.n2-tit1 {
			display: flex;
			.n2t1-l.bbx1 {
				background-image: url('../../static/img/zu4154.png');
			}
			
			.n2t1-l.bbx2 {
				background-image: url('../../static/img/zu4152.png');
			}
			
			.n2t1-l.bbx3 {
				background-image: url('../../static/img/zu4153.png');
			}
			
			.n2t1-l.bbx4 {
				background-image: url('../../static/img/zu4151.png');
			}
			.n2t1-l {
				// background-image: url(../../static/img/zu4078.png);
				background-size: 100% 100%;
				width: 180rpx;
				height: 172rpx;
				margin-right: 28rpx;

				.n7i-txt1 {
					padding-top: 8rpx;
					font-size: 12rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					text-align: center;
					color: #ffffff;
					letter-spacing: 0.72rpx;
				}

				.n2t1-imgg {
					display: block;
					margin: 10rpx auto 0;
					width: 110rpx;
					height: 110rpx;
				}
			}

			.n2t1-img {
				border-radius: 12rpx;
				width: 180rpx;
				height: 180rpx;
				margin-right: 28rpx;
			}

			.n2t1-r {
				width: 440rpx;

				.b1 {
					margin-top: 16rpx;
					width: 108rpx;
					height: 36rpx;
					border: 2rpx solid #02b3b6;
					border-radius: 6rpx;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					text-align: center;
					color: #02b3b6;
					line-height: 32rpx;
				}

				.b2 {
					margin-top: 10rpx;
					font-size: 32rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #333333;
					overflow: hidden;
					display: -webkit-box;
					text-overflow: ellipsis;
					-webkit-line-clamp: 2;
					/*要显示的行数*/
					-webkit-box-orient: vertical;
				}
			}
		}

		.heng {
			margin-top: 32rpx;
			width: 642rpx;
			height: 2rpx;
			background: #e4e4e4;
			margin-bottom: 32rpx;
		}

		.n2-tit2 {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 22rpx;

			.n2t2-l {
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				color: #333333;
			}

			.n2t2-r {
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				color: #585858;
			}
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 140rpx;
		background: #ffffff;
		box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(51, 51, 51, 0.04);

		.btn {
			width: 690rpx;
			height: 76rpx;
			background: #02b3b6;
			border-radius: 38rpx;
			box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(2, 179, 182, 0.12);
			margin-top: 12rpx;
			margin-left: 30rpx;
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			line-height: 76rpx;
			color: #ffffff;
		}
	}

	.pop1 {
		display: flex;
		flex-direction: column;
		align-items: center;

		.p3-txt1 {
			width: 416rpx;
			margin-top: 56rpx;
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			color: #666666;
			text-align: center;
		}

		.p3-btns {
			margin-top: 48rpx;
			width: 500rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.btn1 {
				width: 208rpx;
				height: 64rpx;
				border: 2rpx solid #02b3b6;
				border-radius: 34rpx;
				font-size: 36rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: center;
				line-height: 60rpx;
				color: #02b3b6;
			}

			.btn2 {
				width: 208rpx;
				height: 64rpx;
				background: #02b3b6;
				border-radius: 32rpx;
				box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(2, 179, 182, 0.18);
				font-size: 36rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #ffffff;
				line-height: 64rpx;
			}
		}
	}
</style>
