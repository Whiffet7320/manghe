<template>
	<view class="index">
		<u-toast ref="uToast"></u-toast>
		<image src="/static/image/zu1840.png" class="kefu" mode=""></image>
		<view class="nav1">
			<u-swiper height='602' :list="bannerList"></u-swiper>
		</view>
		<view class="nav2">
			<view class="tit1">
				<view class="txt1">250ml 雅漾补水喷雾赠一</view>
				<view class="txt2">销量 201</view>
			</view>
			<view class="tit2">
				<view class="txt1">¥9.90</view>
				<view class="txt2">¥89.90</view>
			</view>
		</view>
		<view class="nav3">
			<view class="tit1">
				<view class="txt1">
					<view class="txt1-1">选择</view>
					<view class="txt1-2">选择颜色分类/套餐类型</view>
				</view>
				<u-icon name="arrow-right" color="#707070" size="24"></u-icon>
			</view>
			<view class="tit2">
				<view class="items" @click="skuShow = true">
					<image v-for="item in imgArr" :src="item" class="i-pic" mode=""></image>
					<view class="i-txt">1种类型可选</view>
				</view>
			</view>
		</view>
		<view class="nav4">
			<view class="title">
				<view class="shu"></view>
				<view class="t-txt">修复专区</view>
			</view>
		</view>
		<view class="footer">
			<view class="left">
				<image src="/static/tabBar/sy-active.png" class="pic" mode=""></image>
				<view class="txt">首页</view>
			</view>
			<view class="right">
				<view class="b1" @click="addGwc">加入购物车</view>
				<view class="b2">立即抢购</view>
			</view>
		</view>
		<!-- 选择SKU -->
		<u-popup v-model="skuShow" z-index='100' mode="bottom" height='900' closeable border-radius='10'>
			<view class="skuPop">
				<view class="p-nav1">
					<image class="pic1" src="https://img2.baidu.com/it/u=4006635947,2132087516&fm=26&fmt=auto" mode="">
					</image>
					<view class="right">
						<view class="tit1">
							<view class="txt1">¥9.90</view>
							<view class="txt2">¥89.90</view>
						</view>
						<view class="tit2">库存9982件</view>
						<view class="tit3">250ml 雅漾补水喷雾赠一</view>
					</view>
				</view>
				<view class="p-nav2">规格</view>
				<view class="p-nav3">
					<view v-for="(item,i) in 6" @click="changSku(i)" :class="{'p-item':true,'active':skuIndex == i}">
						250ml 雅漾补水喷</view>
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
						<view class="b2">立即抢购</view>
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
				skuNum: 1,
				skuIndex: 0,
				gwcShow: false,
				skuShow: false,
				bannerList: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				imgArr: ['https://img2.baidu.com/it/u=4006635947,2132087516&fm=26&fmt=auto',
					'https://img1.baidu.com/it/u=3303981320,1355171730&fm=26&fmt=auto',
					'https://img0.baidu.com/it/u=2394303781,1797253216&fm=26&fmt=auto',
					'https://img0.baidu.com/it/u=3941318376,4022646771&fm=26&fmt=auto',
					'https://img2.baidu.com/it/u=4006635947,2132087516&fm=26&fmt=auto',
					'https://img1.baidu.com/it/u=3303981320,1355171730&fm=26&fmt=auto',
					'https://img0.baidu.com/it/u=2394303781,1797253216&fm=26&fmt=auto',
					'https://img0.baidu.com/it/u=3941318376,4022646771&fm=26&fmt=auto'
				]
			}
		},
		methods: {
			addGwc(){
				this.skuShow = false;
				this.gwcShow = true;
			},
			changSku(i) {
				this.skuIndex = i;
			},
			jia() {
				this.skuNum++
			},
			jian() {
				if (this.skuNum == 1) {
					this.$refs.uToast.show({
						title: '数量不能少于一件',
						type: 'warning',
						duration:1000
					})
				}else{
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

	.nav1 {}

	.nav2 {
		background: #FFFFFF;
		padding: 20rpx 40rpx;

		.tit1 {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.txt1 {
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

	.skuPop {
		position: relative;
		padding: 0 40rpx;
		position: fixed;
		z-index: 999;
		width: 100%;
		height: 900rpx;

		.p-nav1 {
			display: flex;

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
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			margin-top: 28rpx;
			height: 262rpx;
			overflow: auto;

			.p-item {
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
	.gwcPop{
		display: flex;
		flex-direction: column;
		align-items: center;
		.txt1{
			margin-top: 52rpx;
			font-size: 36rpx;
			font-weight: bold;
			color: #000000;
		}
		.txt2{
			margin-top: 40rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #000000;
		}
		.btn{
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
