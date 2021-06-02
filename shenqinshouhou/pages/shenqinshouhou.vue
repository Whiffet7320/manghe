<template>
	<view class="index">
		<view class="container">
			<u-toast ref="uToast" />
			<view class="items">
				<view class="item">
					<view class="nav1" v-for="(ele,index) in list.goods" :key='index'>
						<image class="pic1" :src="ele.goods_pic" mode=""></image>
						<view class="tit1">
							<view class="tit1-1">{{ele.goods_title}}</view>
							<view class="tit1-2">数量：{{ele.goods_num}}</view>
							<view class="tit1-3">实付款：￥{{ele.goods_postage+ele.goods_price}}</view>
						</view>
					</view>
					<view class="nav2">
						<view class="tit1">售后类型</view>
						<view class="tit2">
							<view @tap=clickActive(0) :class="{'tit2-1':true,'active':isActive}">退换商品</view>
							<view @tap=clickActive(1) :class="{'tit2-2':true,'active':!isActive}">只退款不退货</view>
						</view>
					</view>
					<view v-if="!isActive" class="nav3">
						<view class="tit1">
							<view class="tit1-1">退款金额</view>
							<view class="tit1-2">（可修改，最多￥45，含发货邮费￥0.00）</view>
						</view>
						<view class="tit2">
							<view class="tit1-1">￥</view>
							<u-input placeholder="请输入金额" height="80" v-model="price" />
						</view>
					</view>
					<view class="nav4">
						<view class="tit1">售后原因</view>
						<u-input v-model="value" type="textarea" border height=265 auto-height />
					</view>
				</view>
			</view>
		</view>
		<view class="footer" @tap="toTijiaoshouhou">提交售后申请</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				openid: null,
				order_id: null, //商品id
				list: [],
				price: 0,
				value: 'cyy',
				isActive: true,
			}
		},
		onLoad(option) {
			this.openid = uni.getStorageSync('openid')
			this.order_id = option.order_id;
		},
		onShow() {
			this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$api.wx_orderspostsaleview(this.openid, this.order_id)
				console.log(res)
				this.list = res.list;
			},
			clickActive(index) {
				if (index == 0) {
					this.isActive = true
				} else if (index == 1) {
					this.isActive = false
				}
			},
			async toTijiaoshouhou() {
				console.log(this.isActive)
				var postsale_types = this.isActive == true ? 1 : 2;
				var signstr = "openid=" + this.openid + "&order_id=" + this.order_id + "&postsale_types=" +
					postsale_types +
					"&postsale_refundmoney=" + this.price + "&postsale_remark=" + this.value + "";
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.wx_orderspostsale(this.openid, this.order_id, postsale_types, this.price,
					this.value, md);
				console.log(res)
				if (res.result == 1) {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success',
						duration: 500,
						url: "/shenqinshouhou/pages/tijiaoshenqing",
						params: {
							order_id:this.order_id
						}
					})
					this.getData()
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
				// uni.navigateTo({
				// 	url: "/shenqinshouhou/pages/tijiaoshenqing"
				// })
			},
		}
	}
</script>

<style scoped lang="scss">
	.index {
		position: relative;
	}

	.container {
		margin-top: 30rpx;

		.items {
			margin: 26rpx 22rpx;

			.item {
				width: 708rpx;
				opacity: 1;
				background: #ffffff;
				border-radius: 18rpx;
				// padding: 0 28rpx;

				.nav1 {
					padding: 0 28rpx;
					margin: 38rpx 0;
					display: flex;
					align-items: center;

					// justify-content: space-between;
					.pic1 {
						width: 127rpx;
						height: 127rpx;
						opacity: 1;
					}

					.tit1 {
						.tit1-1 {
							opacity: 1;
							font-size: 25rpx;
							font-family: PingFang SC, PingFang SC-Bold;
							font-weight: 700;
							color: #141313;
						}

						.tit1-2 {
							margin-top: 18rpx;
							opacity: 1;
							font-size: 18rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							color: #b1b1b1;
						}

						.tit1-3 {
							margin-top: 4rpx;
							opacity: 1;
							font-size: 18rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							text-align: left;
							color: #b1b1b1;
						}

						.tit2 {
							// margin-left: 107rpx;
							width: 116rpx;
							height: 36rpx;
							opacity: 1;
							background: #ffffff;
							border: 2rpx solid #b1b1b1;
							border-radius: 20rpx;
							font-size: 18rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							text-align: center;
							color: #b1b1b1;
						}
					}

				}

				.nav2 {
					.tit1 {
						padding: 0 28rpx;
						opacity: 1;
						font-size: 34rpx;
						font-family: SourceHanSansCN-Medium;
						color: #121314;
						letter-spacing: 0rpx
					}

					.tit2 {
						margin-top: 22rpx;
						width: 708rpx;
						height: 118rpx;
						opacity: 1;
						background: #ffffff;
						border-radius: 18rpx;
						box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);
						display: flex;
						align-items: center;

						.tit2-1 {
							margin-left: 29rpx;
							margin-right: 18rpx;
							width: 167rpx;
							height: 58rpx;
							opacity: 1;
							background: #ffffff;
							border: 2rpx solid #9b9b9b;
							border-radius: 20rpx;
							font-size: 22rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							text-align: center;
							line-height: 58rpx;
							color: #9b9b9b;
						}

						.tit2-1.active {
							color: #ebbfcc;
							border: 2rpx solid #ebbfcc;
						}

						.tit2-2 {
							width: 179rpx;
							height: 58rpx;
							opacity: 1;
							background: #ffffff;
							border: 2rpx solid #9b9b9b;
							border-radius: 20rpx;
							font-size: 22rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							text-align: center;
							line-height: 58rpx;
							color: #9b9b9b;
						}

						.tit2-2.active {
							color: #ebbfcc;
							border: 2rpx solid #ebbfcc;
						}
					}
				}

				.nav3 {
					margin: 36rpx 0;

					.tit1 {
						display: flex;

						.tit1-1 {
							padding: 0 28rpx;
							opacity: 1;
							font-size: 34rpx;
							font-family: SourceHanSansCN-Medium;
							color: #121314;
							letter-spacing: 0rpx;
							margin-bottom: 22rpx
						}

						.tit1-2 {
							margin-left: 18rpx;
							margin-top: 12rpx;
							opacity: 1;
							font-size: 18rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							color: #9b9b9b;
						}
					}

					.tit2 {
						width: 708rpx;
						height: 132rpx;
						opacity: 1;
						background: #ffffff;
						border-radius: 18rpx;
						box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);
						display: flex;
						align-items: center;

						.tit1-1 {
							margin-left: 29rpx;
							opacity: 1;
							font-size: 22rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							color: #af0000;
						}
					}
				}

				.nav4 {
					margin: 36rpx 0;

					.tit1 {
						padding: 0 28rpx;
						opacity: 1;
						font-size: 34rpx;
						font-family: SourceHanSansCN-Medium;
						text-align: left;
						color: #121314;
						line-height: 53rpx;
						letter-spacing: 0rpx;
						margin-bottom: 22rpx
					}
				}

			}
		}
	}

	.footer {
		position: fixed;
		bottom: 0rpx;
		width: 750rpx;
		height: 80rpx;
		opacity: 1;
		background: #ebbfcc;
		box-shadow: 0rpx -2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);
		font-size: 25rpx;
		font-family: SourceHanSansCN-Regular;
		text-align: center;
		color: #ffffff;
		line-height: 80rpx;
	}
</style>
