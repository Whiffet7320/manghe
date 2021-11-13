<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="nav1">
			<view class="txt1">
				已抽中<text class="yellow">工具免单</text>
			</view>
			<view class="txt1">
				请选择以下<text class="yellow">任意一款商品</text>吧
			</view>
		</view>
		<view class="items">
			<view class="item" v-for="item in list" :key='item.id'>
				<view @click="seeXiangqin(item)" class="left">
					<image class="i-pic1" :src="item.img" mode=""></image>
					<view class="txt1">商品详情</view>
				</view>
				<view class="right">
					<view>
						<view class="txt1">{{item.title}}</view>
						<view class="txt2">{{item.jieshao}}</view>
					</view>
					<view class="right-bottom">
						<view class="txtrb">¥{{item.money}}</view>
						<view @click="miandan(item)" class="btnrb">点击免单</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 弹出层 -->
		<u-popup closeable v-model="popShow" width="654rpx" mode='center' border-radius="20">
			<view class="pop">
				<view class="txt1">商品详情</view>
				<view class="pop-nav1">
					<view class="left">
						<image class="picc" :src="xqObj.img" mode=""></image>
					</view>
					<view class="right">
						<view class="popr-nav1">{{xqObj.title}}</view>
						<view class="popr-nav2">¥{{xqObj.money}}</view>
					</view>
				</view>
				<view class="txt2">{{xqObj.jieshao}}</view>
				<view @click="miandan(xqObj)" class="btnn">点击免单</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popShow: false,
				lid: '',
				id: '',
				list: [],
				llid: '',
				xqObj: {},
			}
		},
		onLoad(option) {
			console.log(option)
			this.id = option.id;
			this.lid = option.lid;
			this.getData();
		},
		methods: {
			async getData() {
				const res = await this.$api.choujiangMianDanShopList({
					id: this.id,
					lid: this.lid
				})
				console.log(res)
				this.list = res.data.data;
				this.llid = res.data.lid;
			},
			seeXiangqin(item) {
				this.xqObj = item;
				this.popShow = true;
			},
			async miandan(item) {
				const res = await this.$api.choujiangCheckShop({
					sid: item.id,
					lid: this.llid
				})
				console.log(res)
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success',
						url: '/pages/index/zhuanpan/zhuanpan',
						params: {
							id: this.lid,
						}
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
		}
	}
</script>

<style>
	page {
		width: 750rpx;
		background: #ffeedf;
	}
</style>
<style lang="scss" scoped>
	.index {}

	.nav1 {
		background-image: url(/static/img/zu622.png);
		background-size: 100% 100%;
		margin-top: 24rpx;
		margin-left: 30rpx;
		width: 690rpx;
		height: 296rpx;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.txt1 {
			line-height: 44rpx;
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			color: #ffffff;

			.yellow {
				color: #FFF194;
			}
		}
	}

	.items {
		margin: 0rpx 30rpx 20rpx 30rpx;

		.item {
			width: 690rpx;
			height: 248rpx;
			background: #ffffff;
			border-radius: 20rpx;
			margin-top: 20rpx;
			display: flex;
			align-items: center;

			.left {
				position: relative;
				margin-left: 24rpx;
				width: 200rpx;
				height: 200rpx;
				background: rgba(0, 0, 0, 0.00);
				border: 1rpx solid #fa4a4a;
				border-radius: 10rpx;
				overflow: hidden;

				.i-pic1 {
					border-radius: 10rpx;
					width: 196rpx;
					height: 196rpx;
				}

				.txt1 {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 200rpx;
					height: 46rpx;
					background: #fa4a4a;
					border-radius: 0rpx 0rpx 10rpx 10rpx;
					font-size: 24rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					text-align: center;
					color: #ffffff;
					line-height: 44rpx;
				}
			}

			.right {
				height: 200rpx;
				width: 426rpx;
				margin-left: 16rpx;
				margin-right: 24rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.txt1 {
					font-size: 28rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #333333;
					line-height: 44rpx;
				}

				.txt2 {
					font-size: 24rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					color: #999999;
					line-height: 44rpx;
				}

				.right-bottom {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.txtrb {
						font-size: 32rpx;
						font-family: PingFang SC, PingFang SC-Bold;
						font-weight: 700;
						color: #fa4a4a;
						line-height: 44rpx;
					}

					.btnrb {
						width: 172rpx;
						height: 62rpx;
						background: linear-gradient(180deg, #ff7474, #f51111);
						border: 2rpx solid #f62020;
						border-radius: 34rpx;
						font-size: 24rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						text-align: center;
						color: #ffffff;
						line-height: 62rpx;
					}
				}
			}
		}
	}

	.pop {
		padding: 0 50rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.txt1 {
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #333333;
			line-height: 44rpx;
			margin-top: 40rpx;
		}

		.pop-nav1 {
			margin-top: 40rpx;
			width: 554rpx;
			height: 228rpx;
			background: rgba(250, 74, 74, 0.05);
			border-radius: 10rpx;
			display: flex;
			align-items: center;

			.left {
				margin-left: 12rpx;

				.picc {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.right {
				margin-left: 16rpx;
				height: 200rpx;
				width: 310rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.popr-nav1 {
					font-size: 28rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #333333;
					line-height: 44rpx;
				}

				.popr-nav2 {
					font-size: 32rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #fa4a4a;
					line-height: 44rpx;
				}
			}
		}

		.txt2 {
			margin-top: 30rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			color: #333333;
			line-height: 44rpx;
		}

		.btnn {
			margin-top: 30rpx;
			width: 172rpx;
			height: 62rpx;
			background: linear-gradient(180deg, #ff7474, #f51111);
			border: 2rpx solid #f62020;
			border-radius: 34rpx;
			font-size: 24rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: center;
			color: #ffffff;
			line-height: 62rpx;
			margin-bottom: 40rpx;
		}
	}
</style>
