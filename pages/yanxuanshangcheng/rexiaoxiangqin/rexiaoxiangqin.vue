<template>
	<view class="index">
		<u-toast ref="uToast"></u-toast>
		<image src="/static/image/zu1840.png" class="kefu" mode=""></image>
		<view class="nav1">
			<u-swiper height='602' :list="bannerList" border-radius="0"></u-swiper>
		</view>
		<view class="nav2">
			<view class="tit1">
				<view class="txt1">{{obj.storeInfo.store_name||""}}</view>
				<view class="txt2">销量 {{obj.storeInfo.sales||0}}</view>
			</view>
			<view class="tit2">
				<view class="txt1">¥{{obj.storeInfo.price||0}}</view>
				<view class="txt2">¥{{obj.storeInfo.ot_price||0}}</view>
			</view>
		</view>
		<view class="nav3" @click="skuShow = true">
			<view class="tit1">
				<view class="txt1">
					<view class="txt1-1">选择</view>
					<view class="txt1-2">选择颜色分类/套餐类型</view>
				</view>
				<u-icon name="arrow-right" color="#707070" size="24"></u-icon>
			</view>
			<view class="tit2">
				<view class="items">
					<image v-for="(item,index) in skuArr" :key="index" :src="item.image" class="i-pic" mode=""></image>
					<view class="i-txt">{{skuArr.length}}种类型可选</view>
				</view>
			</view>
		</view>
		<view class="nav4">
			<view class="title">
				<view class="shu"></view>
				<view class="t-txt">修复专区</view>
			</view>
			<u-parse :html="obj.storeInfo.description"></u-parse>
		</view>
		<view class="footer">
			<view class="left" @click="toShouye">
				<image src="/static/tabBar/sy-active.png" class="pic" mode=""></image>
				<view class="txt">首页</view>
			</view>
			<view class="right">
				<view class="b1" @click="clickGwc">加入购物车</view>
				<view class="b2" @click="clickGwc">立即抢购</view>
			</view>
		</view>
		<!-- 选择SKU -->
		<u-popup v-model="skuShow" z-index='100' mode="bottom" height='900' closeable border-radius='10'>
			<view class="skuPop">
				<view class="p-nav1">
					<image class="pic1" :src="skuImg" mode=""></image>
					<view class="right">
						<view class="tit1">
							<view class="txt1">¥{{skuItem.price}}</view>
							<view class="txt2">¥{{skuItem.ot_price}}</view>
						</view>
						<view class="tit2">库存{{skuItem.stock}}件</view>
						<view class="tit3">{{skuItem.suk}}</view>
					</view>
				</view>
				<view class="p-nav2">规格</view>
				<view class="p-nav3">
					<view v-for="(item,i) in obj.productAttr" :key='item.id'>
						<view class="p-tit">{{item.attr_name}}:</view>
						<view v-for="(item2,i2) in item.attr_value" :key='i2' @click="changSku(item2,i,i2)"
							:class="{'p-item':true,'active':item2.check}">
							{{item2.attr}}
						</view>
					</view>
				</view>
				<view class="p-nav4">
					<view class="left">购买数量</view>
					<view class="right">
						<image @click="jian" src="/static/image/zu1458.png" class="pic" mode=""></image>
						<view class="txt">{{skuNum}}</view>
						<image @click="jia" src="/static/image/zu1459.png" class="pic" mode=""></image>
					</view>
				</view>
				<view class="p-nav5">
					<view class="btns">
						<view class="b1" @click="addGwc">加入购物车</view>
						<view class="b2" @click="toTijiaodingdan">立即抢购</view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 加入购物车 -->
		<u-popup v-model="gwcShow" z-index='9' mode="center" height='360' width="360" border-radius='10'>
			<view class="gwcPop">
				<view class="txt1">提示</view>
				<view class="txt2">已成功加入购物车</view>
				<view @click="gwcShow=false" class="btn">确定</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				skuItem: '',
				id: '',
				obj: {},
				skuNum: 1,
				skuIndex: 0,
				gwcShow: false,
				skuShow: false,
				bannerList: [],
				skuArr: [],
				skuImg: '',
				skuArr2: [],
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.getData();
		},
		methods: {
			async getData() {
				this.imgArr = [];
				const res = await this.$api.detail(this.id)
				console.log(res)
				this.obj = res.data;
				this.obj.storeInfo.slider_image.forEach((ele, i) => {
					this.$set(this.bannerList, i, {})
					this.$set(this.bannerList[i], 'image', ele)
				})
				this.obj.productAttr.forEach(() => {
					this.skuArr2.push('')
				})
				for (let key in this.obj.productValue) {
					this.skuArr.push(this.obj.productValue[key])
				}
				this.obj.productAttr.forEach((ele,i)=>{
					this.changSku(ele.attr_value[0], i, 0)
				})
			},
			toShouye(){
				uni.switchTab({
					url:'/pages/tabBar/index'
				})
			},
			clickGwc() {
				this.skuShow = true;
			},
			async addGwc() {
				const res = await this.$api.cartAdd({
					productId: this.id,
					cartNum: this.skuNum,
					uniqueId: this.skuItem.unique
				})
				console.log(res)
				this.skuShow = false;
				this.gwcShow = true;
			},
			async toTijiaodingdan() {
				const res = await this.$api.cartAdd({
					productId: this.id,
					cartNum: this.skuNum,
					uniqueId: this.skuItem.unique,
					new: 1
				})
				console.log(res)
				this.skuItem.shopName = this.obj.storeInfo.store_name;
				this.skuItem.buyNum = this.skuNum;
				this.skuItem.cartId = res.data.cartId;
				uni.navigateTo({
					url: `/pages/users/order/tijiaodingdan?skuItem=${JSON.stringify([this.skuItem])}&isGWC=no&cartId=${res.data.cartId}`
				})
			},
			changSku(item2, i, i2) {
				this.obj.productAttr[i].attr_value.forEach(ele2 => {
					ele2.check = false;
				})
				item2.check = true;
				var flag = false;
				var skuArr2Txt = '';
				this.$set(this.skuArr2, i, item2.attr)
				console.log(this.skuArr2)
				this.skuArr2.forEach((ele, i) => {
					if (ele == '') {
						flag = true;
						return
					} else {
						if (i == 0) {
							skuArr2Txt += `${ele}`
						} else {
							skuArr2Txt += `,${ele}`
						}
						flag = false;
						console.log(skuArr2Txt)
					}
				})
				if (!flag) {
					this.skuArr.forEach(ele => {
						if (ele.suk == skuArr2Txt) {
							this.skuItem = ele;
							this.skuImg = ele.image;
						}
					})
				}
			},
			jia() {
				this.skuNum++
			},
			jian() {
				if (this.skuNum == 1) {
					this.$refs.uToast.show({
						title: '数量不能少于一件',
						type: 'warning',
						duration: 1000
					})
				} else {
					this.skuNum--
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

	.kefu {
		z-index: 99;
		position: fixed;
		width: 172rpx;
		height: 172rpx;
		bottom: 150rpx;
		right: 10rpx;
	}

	.nav2 {
		background: #FFFFFF;
		padding: 20rpx 40rpx;

		.tit1 {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.txt1 {
				width: 584rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: #BD9E81;
			}

			.txt2 {
				font-size: 24rpx;
				font-weight: 400;
				color: #707070;
			}
		}

		.tit2 {
			margin-top: 12rpx;
			display: flex;
			align-items: center;

			.txt1 {
				font-size: 44rpx;
				font-weight: 800;
				color: #FA8677;
			}

			.txt2 {
				margin-left: 20rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #707070;
				text-decoration: line-through;
			}
		}
	}

	.nav3 {
		margin-top: 20rpx;
		padding: 28rpx 40rpx 8rpx 40rpx;
		background: #FFFFFF;

		.tit1 {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.txt1 {
				display: flex;
				align-items: center;

				.txt1-1 {
					font-size: 24rpx;
					font-weight: 400;
					color: #707070;
				}

				.txt1-2 {
					margin-left: 24rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #707070;
				}
			}
		}

		.tit2 {
			margin-left: 72rpx;
			margin-top: 16rpx;

			.items {
				display: flex;
				align-items: center;
				flex-wrap: wrap;

				.i-pic {
					width: 56rpx;
					height: 56rpx;
					margin-right: 20rpx;
					border-radius: 4rpx;
					margin-bottom: 20rpx;
				}

				.i-txt {
					margin-bottom: 20rpx;
					padding: 0 20rpx;
					height: 56rpx;
					background: #F7F8FA;
					font-size: 24rpx;
					text-align: center;
					font-weight: 400;
					line-height: 56rpx;
					color: #707070;
				}
			}
		}
	}

	.nav4 {
		margin-top: 20rpx;
		background: #FFFFFF;
		padding: 24rpx 0;

		.title {
			display: flex;
			align-items: center;

			.shu {
				margin-left: 24rpx;
				margin-right: 20rpx;
				width: 6rpx;
				height: 28rpx;
				background: #BD9E81;
			}

			.t-txt {
				font-size: 28rpx;
				font-weight: bold;
				color: #BD9E81;
			}
		}

		.content {
			width: 100%;
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 140rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 8rpx 28rpx rgba(166, 179, 194, 0.3);
		display: flex;
		padding: 0 46rpx;
		justify-content: space-between;

		.left {
			margin-top: 14rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.pic {
				width: 50rpx;
				height: 50rpx;
				margin-bottom: 2rpx;
			}

			.txt {
				font-size: 24rpx;
				font-weight: 400;
				color: #BD9E81;
			}
		}

		.right {
			margin-top: 18rpx;
			display: flex;
			align-items: center;
			height: 80rpx;

			.b1 {
				width: 276rpx;
				height: 80rpx;
				background: #707070;
				border-radius: 42rpx 0rpx 0rpx 42rpx;
				text-align: center;
				line-height: 80rpx;
				font-size: 28rpx;
				font-weight: bold;
				color: #FFFFFF;
			}

			.b2 {
				width: 278rpx;
				height: 80rpx;
				background: #BD9E81;
				border-radius: 0rpx 42rpx 42rpx 0rpx;
				text-align: center;
				line-height: 80rpx;
				font-size: 28rpx;
				font-weight: bold;
				color: #FFFFFF;
			}
		}
	}

	/deep/ .u-drawer-content {
		overflow: initial !important;
	}

	/deep/ .u-close {
		position: fixed !important;
		z-index: 99999 !important;
	}

	.skuPop {
		position: relative;
		padding: 0 40rpx;
		position: fixed;
		z-index: 999;
		width: 100%;
		height: 900rpx;

		.p-nav1 {
			display: flex;
			width: 628rpx;

			.pic1 {
				width: 182rpx;
				height: 182rpx;
				border-radius: 10rpx;
				// margin-top: -20rpx;
				transform: translateY(-20rpx);
				z-index: 99999;
			}

			.right {
				margin-top: 24rpx;
				margin-left: 36rpx;

				.tit1 {
					display: flex;
					align-items: center;

					.txt1 {
						font-size: 40rpx;
						font-weight: bold;
						color: #FA8677;
					}

					.txt2 {
						margin-left: 28rpx;
						margin-top: 8rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #707070;
						text-decoration: line-through;
					}
				}

				.tit2 {
					margin-top: 10rpx;
					font-size: 20rpx;
					font-weight: 400;
					color: #707070
				}

				.tit3 {
					margin-top: 10rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #BD9E81;
				}
			}

		}

		.p-nav2 {
			margin-top: 36rpx;
			font-size: 28rpx;
			font-weight: 500;
			color: #BD9E81;
		}

		.p-nav3 {
			// display: flex;
			align-items: center;
			flex-wrap: wrap;
			margin-top: 28rpx;
			height: 262rpx;
			overflow: auto;

			.p-tit {
				margin-bottom: 16rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #BD9E81;
			}

			.p-item {
				display: inline-block;
				height: 70rpx;
				background: #F8F8F8;
				border: 2rpx solid #FAFBFF;
				border-radius: 44rpx;
				font-size: 24rpx;
				font-weight: 400;
				line-height: 70rpx;
				padding: 0 32rpx;
				margin-right: 10rpx;
				color: #828282;
				margin-bottom: 20rpx;
			}

			.p-item.active {
				color: #BD9E81;
				background: #FCFAF9;
				border: 2rpx solid #BD9E81;
			}
		}

		.p-nav4 {
			margin-top: 70rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.left {
				font-size: 28rpx;
				font-weight: 500;
				color: #BD9E81;
			}

			.right {
				display: flex;
				align-items: center;

				.pic {
					width: 50rpx;
					height: 50rpx;
				}

				.txt {
					margin: 0 20rpx;
					font-size: 28rpx;
					font-weight: bold;
					color: #707070;
				}
			}
		}

		.p-nav5 {
			transform: translateX(-40rpx);
			position: fixed;
			bottom: 0;
			width: 750rpx;
			height: 140rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 8rpx 28rpx rgba(166, 179, 194, 0.3);
			display: flex;
			padding: 0 46rpx;

			.btns {
				margin-top: 18rpx;
				display: flex;
				align-items: center;
				height: 80rpx;

				.b1 {
					width: 334rpx;
					height: 80rpx;
					background: #707070;
					border-radius: 42rpx 0rpx 0rpx 42rpx;
					text-align: center;
					line-height: 80rpx;
					font-size: 28rpx;
					font-weight: bold;
					color: #FFFFFF;
				}

				.b2 {
					width: 334rpx;
					height: 80rpx;
					background: #BD9E81;
					border-radius: 0rpx 42rpx 42rpx 0rpx;
					text-align: center;
					line-height: 80rpx;
					font-size: 28rpx;
					font-weight: bold;
					color: #FFFFFF;
				}
			}
		}
	}

	.gwcPop {
		display: flex;
		flex-direction: column;
		align-items: center;

		.txt1 {
			margin-top: 52rpx;
			font-size: 36rpx;
			font-weight: bold;
			color: #000000;
		}

		.txt2 {
			margin-top: 40rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #000000;
		}

		.btn {
			margin-top: 48rpx;
			width: 240rpx;
			height: 80rpx;
			background: #BD9E81;
			border-radius: 44rpx;
			font-size: 28rpx;
			font-weight: 500;
			line-height: 80rpx;
			color: #FFFFFF;
			text-align: center;
		}
	}
</style>
