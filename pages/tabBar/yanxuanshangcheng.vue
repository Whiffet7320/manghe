<template>
	<view class="index">
		<view @click="goCart">
			<image src="/static/image/zu1842.png" class="fixed-icon" mode=""></image>
		</view>
		<image src="/static/image/zu1525.png" class="fixed-icon2" mode=""></image>
		<view class="nav1">
			<view class="tit1">
				<view class="myInp" @click="toSearch">
					<u-icon @click="toSearch" name="search" color="#000000" size="28"></u-icon>
					<u-input @click="toSearch" :clearable='false' v-model="searchVal" input-align='center'
						placeholder='搜索专家/项目/关键词' placeholder-style='color: #122106;' type="text" height="60rpx" />
				</view>
			</view>
			<view class="tit3">
				<u-swiper height='252' :list="bannerList"></u-swiper>
			</view>
		</view>
		<view class="nav2">
			<view class="items">
				<view class="item">
					<image src="/static/image/tu01.png" class="pic-item" mode=""></image>
					<view class="txt-item">美容护肤</view>
				</view>
				<view class="item">
					<image src="/static/image/tu02.png" class="pic-item" mode=""></image>
					<view class="txt-item">光电美肤</view>
				</view>
				<view class="item">
					<image src="/static/image/tu03.png" class="pic-item" mode=""></image>
					<view class="txt-item">注射美肤</view>
				</view>
				<view class="item">
					<image src="/static/image/tu04.png" class="pic-item" mode=""></image>
					<view class="txt-item">个护清洁</view>
				</view>
			</view>
			<view class="items items2">
				<view class="item">
					<image src="/static/image/tu05.png" class="pic-item" mode=""></image>
					<view class="txt-item">彩妆</view>
				</view>
				<view class="item">
					<image src="/static/image/tu06.png" class="pic-item" mode=""></image>
					<view class="txt-item">香水</view>
				</view>
				<view class="item">
					<image src="/static/image/tu07.png" class="pic-item" mode=""></image>
					<view class="txt-item">轻奢</view>
				</view>
				<view class="item">
					<image src="/static/image/tu08.png" class="pic-item" mode=""></image>
					<view class="txt-item">其他</view>
				</view>
			</view>
			<!-- <view class="nav2-1">
				<image src="/static/image/zu1501.png" class="pic3-1" mode=""></image>
				<view class="tit3-1">进口玻尿酸限时8.5折～赶紧加购吧～！</view>
			</view> -->
		</view>
		<view class="nav3 nav4">
			<view class="title">
				<view class="t-txt">热门推荐</view>
			</view>
			<scroll-view class="scroll-view" scroll-x style="width: 100%;white-space:nowrap;">
				<view class="itemss">
					<view class="item" @click="toJifenchanpin">
						<image src="/static/image/mcz23.png" class="pic" mode=""></image>
						<view class="txt1">积分兑换</view>
						<view class="txt2">星品限时1086积分</view>
						<view class="btn">点击进入 >></view>
					</view>
					<view class="item2" @click="toZhuanjiatuandui">
						<view class="txt1">每日特惠</view>
						<view class="i2-items2">
							<view class="i2-item" v-for="item in imgArr">
								<image :src="item" class="item2-pic" mode=""></image>
								<view class="btn">¥19.80</view>
							</view>
						</view>

					</view>
					<view class="item item3" @click="toDijiapintuan">
						<image src="/static/image/zu1897.png" class="pic" mode=""></image>
						<view class="txt1">低价拼团</view>
						<view class="txt2">专属拼团价</view>
						<view class="i2-items2">
							<view class="i2-item" v-for="item in imgArr">
								<image :src="item" class="item2-pic" mode=""></image>
								<view class="btns">¥19.80</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="nav5">
			<u-tabs-swiper bg-color="#F7F8FA" height='96' font-size="28" gutter="30" inactive-color="#707070"
				bar-height="4" bar-width="64" active-color="#BD9E81" ref="uTabs" :list="list" :current="current"
				@change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			<swiper :style="[{height: height + 'px'}]" :current="swiperCurrent" :vertical='false'
				@transition="transition" @animationfinish="animationfinish">
				<!-- @touchmove.stop -->
				<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
					<scroll-view scroll-y='true'>
						<view class="nav5Items">
							<!-- {{item.name}} -->
							<!-- 热销 -->
							<template v-if="swiperCurrent == 0">
								<view class="item" @click="toRexiaoxiangqin(item.id)" v-for="item in shopList"
									:key='item.id'>
									<image :src="item.image" class="pic" mode=""></image>
									<view class="right">
										<view class="up">
											<view class="txt1">{{item.store_name}}</view>
											<view class="txt2">美容护肤｜水之谜积雪草舒缓面膜</view>
										</view>
										<view class="down">
											<view class="d-t1">¥{{item.price}}</view>
											<image src="/static/image/zu1521.png" class="d-pic" mode=""></image>
										</view>
									</view>
								</view>

							</template>
							<!-- 推荐 -->
							<template v-if="swiperCurrent == 1">
								123
							</template>
							<!-- 口碑 -->
							<template v-if="swiperCurrent == 2">
								456
							</template>
							<!-- 精选 -->
							<template v-if="swiperCurrent == 3">
								789
							</template>
							<u-loadmore v-if='swiperCurrent == index' :status="status" />
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	export default {
		computed: {
			...mapState(["shopPage", "shopPageSize"]),
		},
		watch: {
			shopPage: function(page) {
				console.log('ddpage')
				this.$store.commit("shopPage", page);
				if (this.shopPage != 1) {
					this.getData();
				}
			},
		},
		data() {
			return {
				shopList: [],
				searchVal: '',
				bannerList: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
					}
				],
				imgArr: ['https://img0.baidu.com/it/u=2394303781,1797253216&fm=26&fmt=auto',
					'https://img0.baidu.com/it/u=3941318376,4022646771&fm=26&fmt=auto'
				],
				//
				swiperCurrentIndex: 0,
				height: 0,
				list: [{
					name: '热销'
				}, {
					name: '推荐'
				}, {
					name: '口碑'
				}, {
					name: '精选'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				// 加载
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '上拉加载更多',
					loading: '正在加载...',
					nomore: '没有了更多了'
				},
			}
		},
		onLoad(options) {
			this.shopList = [];
			this.$store.commit("shopPage", 1);
			// this.getData();
			// this.tabsChange(this.current);
		},
		onReachBottom() {
			this.$store.commit("shopPage", this.shopPage + 1);
		},
		onShow() {
			this.tabsChange(this.current);
		},
		mounted() {
			this.getCurrentSwiperHeight('.nav5Items')
		},
		methods: {
			async getData() {
				this.status = 'loading';
				setTimeout(async () => {
					const res = await this.$api.products({
						page: this.shopPage,
						limit: this.shopPageSize,
					})
					res.data = res.data.filter(ele => {
						return ele.spec_type == 1
					})
					if (res.data.length == 0) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
						this.shopList = this.shopList.concat(res.data)
					}
				}, 200)
				console.log(this.shopList)
			},
			toRexiaoxiangqin(id) {
				uni.navigateTo({
					url: `/pages/yanxuanshangcheng/rexiaoxiangqin/rexiaoxiangqin?id=${id}`
				})
			},
			toJifenchanpin() {
				uni.navigateTo({
					url: '/pages/yanxuanshangcheng/jifenchanpin/liebiao'
				})
			},
			toDijiapintuan() {
				uni.navigateTo({
					url: '/pages/yanxuanshangcheng/dijiapintuan/dijiapintuan'
				})
			},
			toZhuanjiatuandui() {
				uni.navigateTo({
					url: '/pages/index/zhuanjiatuandui/zhuanjiatuandui'
				})
			},
			toXiufu(i) {
				uni.navigateTo({
					url: `/pages/index/xiufu/xiufu?index=${i}`
				})
			},
			toSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			// tabs通知swiper切换
			tabsChange(index) {
				console.log(index);
				this.swiperCurrent = index;
				this.current = index;
				this.swiperCurrentIndex = index;
				this.shopList = [];
				this.$store.commit("shopPage", 1);
				this.getData()
				setTimeout(() => {
					this.getCurrentSwiperHeight('.nav5Items')
				}, 500)
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			getCurrentSwiperHeight(element) {
				let query = uni.createSelectorQuery().in(this);
				query.selectAll(element).boundingClientRect();
				query.exec((res) => {
					this.height = res[0][this.swiperCurrentIndex].height;
				})
			},
			goCart(){
				uni.navigateTo({
					url:"/pages/cart/index"
				})
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
	/deep/ .u-load-more-wrap {
		width: 686rpx;
		height: 100rpx !important;
	}

	.index {}

	.fixed-icon {
		z-index: 99;
		position: fixed;
		width: 172rpx;
		height: 172rpx;
		bottom: 10rpx;
		right: 10rpx;
	}

	.fixed-icon2 {
		z-index: 99;
		position: absolute;
		width: 60rpx;
		height: 60rpx;
		right: 24rpx;
		top: 22rpx;
	}

	.nav1 {
		background: url(../../static/image/juxin.png) no-repeat;
		background-size: 100% 100%;
		width: 750rpx;
		height: 300rpx;
		background-color: #FFFFFF;
		// background: linear-gradient(316deg, #F6A309 0%, #F8B607 22%, #FFD438 42%, #F9C706 51%, #F8CA20 80%, #FECF05 100%);
		padding: 0 24rpx;

		.tit1 {
			padding-top: 20rpx;
			display: flex;
			align-items: center;

			.txt1 {
				font-size: 28rpx;
				font-weight: 500;
				line-height: 40rpx;
				color: #122106;
				margin-right: 14rpx;
			}

			.myInp {
				padding: 0 24rpx;
				width: 622rpx;
				height: 60rpx;
				background: rgba(255, 255, 255, 0.2);
				border-radius: 50rpx;
				display: flex;
				align-items: center;

				/deep/ .u-input {
					width: 540rpx !important;

					.u-input__input {
						font-size: 24rpx;
						font-weight: 400;
						line-height: 60rpx;
						color: #122106 !important;
					}
				}
			}
		}

		.tit3 {
			margin-top: 24rpx;
		}

	}

	.nav2 {
		background: #FFFFFF;
		padding: 108rpx 38rpx 0 38rpx;

		.items {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.item {
				width: 20%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.pic-item {
					width: 76rpx;
					height: 76rpx;
				}

				.txt-item {
					margin-top: 32rpx;
					font-size: 28rpx;
					font-weight: 500;
					line-height: 40rpx;
					color: #BD9E81;
				}
			}
		}

		.items2.items {
			margin-top: 40rpx;
			padding-bottom: 40rpx;
		}

		.nav2-1 {
			margin-top: 40rpx;
			padding-bottom: 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.pic3-1 {
				width: 28rpx;
				height: 28rpx;
				transform: translateX(16rpx);
				margin-right: 16rpx;
			}

			.tit3-1 {
				padding-left: 24rpx;
				width: 612rpx;
				height: 60rpx;
				background: #fff2ee;
				border-radius: 30rpx;
				font-size: 24rpx;
				font-weight: 500;
				color: #FF7C5E;
				line-height: 60rpx;
			}
		}
	}

	.nav3 {
		margin-top: 20rpx;
		width: 750rpx;
		background: #FFFFFF;
		padding: 28rpx 0;

		.title {
			display: flex;
			align-items: center;

			.shu {
				margin-left: 32rpx;
				margin-right: 20rpx;
				width: 6rpx;
				height: 28rpx;
				background: #BD9E81;
			}

			.t-txt {
				margin-left: 24rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: #BD9E81;
			}
		}

		.items {
			padding: 0 40rpx;
			margin-top: 36rpx;
			display: flex;
			align-items: center;

			.item {
				width: 25%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.pic {
					width: 150rpx;
					height: 150rpx;
					border-radius: 10rpx;
				}

				.txt {
					margin-top: 12rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #BD9E81;
				}
			}
		}
	}

	.nav4.nav3 {

		.scroll-view {
			height: 272rpx;
		}

		.itemss {
			margin-top: 36rpx;
			display: flex;
			align-items: center;

			.item {
				position: relative;
				margin-left: 24rpx;
				display: flex;
				flex-wrap: nowrap;
				align-items: center;
				flex-shrink: 0;
				height: 224rpx;
				width: 318rpx;

				&:last-child {
					width: 342rpx;
				}

				.pic {
					position: absolute;
					top: 0;
					left: 0;
					height: 224rpx;
					width: 318rpx;
				}

				.txt1 {
					position: absolute;
					top: 16rpx;
					left: 20rpx;
					font-size: 32rpx;
					font-weight: bold;
					color: #FFFFFF;
				}

				.txt2 {
					position: absolute;
					top: 64rpx;
					left: 20rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #FFFFFF;
				}

				.btn {
					position: absolute;
					top: 170rpx;
					left: 20rpx;
					width: 140rpx;
					height: 36rpx;
					background: #FFFFFF;
					border-radius: 40rpx;
					font-size: 20rpx;
					font-weight: 800;
					line-height: 36rpx;
					text-align: center;
					color: #C365DB;
				}
			}

			.item2 {
				padding: 0 28rpx;
				margin-left: 24rpx;
				width: 318rpx;
				height: 226rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 6rpx rgba(0, 0, 0, 0.06);
				border-radius: 10rpx;

				.txt1 {
					margin-bottom: 10rpx;
					margin-top: 16rpx;
					font-size: 28rpx;
					font-weight: bold;
					color: #BD9E81;
				}

				.i2-items2 {
					display: flex;
					align-items: center;

					.i2-item {
						&:nth-child(1) {
							margin-right: 22rpx;
						}

						.item2-pic {
							width: 120rpx;
							height: 100rpx;
							border-radius: 8rpx;
						}

						.btn {
							margin-top: 10rpx;
							width: 120rpx;
							height: 30rpx;
							background: rgba(250, 134, 119, 0.1);
							border-radius: 40rpx;
							font-size: 24rpx;
							font-weight: bold;
							line-height: 30rpx;
							text-align: center;
							color: #FA8677;
						}

					}

				}


			}

			.item3.item {
				width: 336rpx;
				height: 242rpx;
				margin-left: 18rpx;

				.pic {
					width: 336rpx;
					height: 242rpx;
				}

				.txt1 {
					position: absolute;
					top: 24rpx;
					left: 36rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 40rpx;
					color: #FFFFFF;
				}

				.txt2 {
					position: absolute;
					top: 32rpx;
					left: 156rpx;
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 28rpx;
					color: #FFFFFF;
				}

				.i2-items2 {
					position: relative;
					left: 36rpx;
					top: 20rpx;
					display: flex;
					align-items: center;

					.i2-item {
						&:nth-child(1) {
							margin-right: 22rpx;
						}

						.item2-pic {
							width: 120rpx;
							height: 100rpx;
							border-radius: 8rpx;
						}

						.btns {
							margin-top: 10rpx;
							width: 120rpx;
							height: 30rpx;
							background: #FFFFFF;
							border-radius: 40rpx;
							font-size: 24rpx;
							font-weight: bold;
							line-height: 30rpx;
							text-align: center;
							color: #FA8677;
						}

					}

				}
			}
		}

		.picc {
			width: 702rpx;
			height: 8rpx;
			margin-left: 26rpx;
			margin-bottom: 20rpx;
		}

		.picc2 {
			margin-left: 26rpx;
			width: 702rpx;
			height: 220rpx;
		}
	}

	.nav5 {
		.swiper-item {
			height: 100%;
			background: #FFFFFF;
		}

		.nav5Items {
			padding: 8rpx 0rpx 20rpx 32rpx;
			background: #FFFFFF;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.item {
				padding-right: 38rpx;
				height: 268rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				border-bottom: 2rpx solid #F7F8FA;

				.pic {
					width: 212rpx;
					height: 212rpx;
				}

				.right {
					width: 452rpx;
					margin-left: 20rpx;
					height: 212rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.up {
						.txt1 {
							font-size: 32rpx;
							font-weight: 500;
							color: #BD9E81;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}

						.txt2 {
							margin-top: 10rpx;
							font-size: 24rpx;
							font-weight: 400;
							color: #707070;
						}
					}

					.down {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.d-t1 {
							font-size: 32rpx;
							font-weight: bold;
							line-height: 44rpx;
							color: #FA8677;
						}

						.d-pic {
							width: 40rpx;
							height: 40rpx;
						}
					}
				}
			}
		}
	}
</style>
