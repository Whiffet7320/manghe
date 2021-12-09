<template>
	<view class="index">
		<view class="nav1">
			<u-swiper height='602' :list="bannerList"></u-swiper>
		</view>
		<view class="nav3">
			<view class="pic2">
				<image src="/static/image/lujin1409.png" class="picc" mode=""></image>
				<view class="txt">{{obj.storeInfo.people}}人团</view>
			</view>
			<image src="/static/image/zu1890.png" class="pic" mode=""></image>
			<view class="left">
				<view class="txt1">距结束还剩</view>
				<view class="time1">
					<view class="t1">{{d}}</view>
					<view class="t2">天</view>
					<view class="t1">{{h}}</view>
					<view class="t3">:</view>
					<view class="t1">{{m}}</view>
					<view class="t3">:</view>
					<view class="t1">{{s}}</view>
				</view>
			</view>
			<view class="right">
				<view class="txt1">¥{{obj.storeInfo.price}}</view>
				<view class="txt2">¥ {{obj.storeInfo.product_price}}</view>
			</view>
		</view>
		<view class="nav2">
			<view class="left">
				<view class="txt1">{{obj.storeInfo.title}}</view>
				<view class="txt2">{{obj.storeInfo.num}}{{obj.storeInfo.unit_name}}</view>
			</view>
		</view>
		<view class="nav4">
			<u-tabs-swiper bg-color="#ffffff" height='80' font-size="28" gutter="30" inactive-color="#707070"
				bar-height="4" bar-width="84" active-color="#BD9E81" ref="uTabs" :list="list" :current="current"
				@change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			<swiper :style="[{height: height + 'px'}]" :current="swiperCurrent" @animationfinish="animationfinish">
				<swiper-item @touchmove.stop class="swiper-item" v-for="(item, index) in list" :key="index">
					<scroll-view scroll-y='true'>
						<view class="nav5Items">
							<!-- {{item.name}} -->
							<!-- 医生描述 -->
							<template v-if="swiperCurrent == 0">
								<view class="i1">
									<u-parse :html="obj.storeInfo.description"></u-parse>
								</view>
							</template>
							<!-- 产品评价 -->
							<template v-if="swiperCurrent == 1">
								<view class="i3">
									<view class="i3-nav1">
										<view class="tit1">
											<view class="tit1-1">
												<view class="txt1">产品评价</view>
												<view class="txt2">（好评度93%）</view>
											</view>
											<view class="tit1-2">共62条评论</view>
										</view>
										<view class="tit2">
											<view class="item">
												<view class="txt1">有图</view>
												<view class="txt2">43</view>
											</view>
											<view class="item">
												<u-icon name="thumb-up-fill" color="#BD9E81" size="22"></u-icon>
												<view class="txt2">43</view>
											</view>
											<view class="item bed">
												<u-icon name="thumb-down-fill" color="#D9D9D9" size="22"></u-icon>
												<view class="txt2">3</view>
											</view>
										</view>
									</view>
									<view class="i3-items">
										<view class="i3-item" v-for="item in 6">
											<image class="ava"
												src="https://img2.baidu.com/it/u=2329181912,1120533725&fm=26&fmt=auto"
												mode=""></image>
											<view class="right">
												<view class="tit1">
													<view class="txt1">狂野女孩</view>
													<view class="txt2">2021.10.24</view>
												</view>
												<view class="tit2">
													<u-icon name="thumb-up-fill" color="#BD9E81" size="22"></u-icon>
													<view class="txt2">赞了该商品</view>
												</view>
												<view class="tit3">哇塞，做出的效果远远大于我的期待值，真的做的超级自然，远看近看都很耐看。</view>
												<view class="tit4">
													<image @click.stop="toSeeImg(i,imgArr)" class="picc"
														v-for="(item,i) in imgArr" :src="item" mode=""></image>
												</view>
											</view>
											
										</view>
										<u-loadmore :status="status" />
									</view>

								</view>
							</template>
						</view>
					</scroll-view>

				</swiper-item>
			</swiper>
		</view>

		<!-- <view class="footer1">
			<image src="/static/image/zu1840.png" class="kefu" mode=""></image>
			<view class="txt1">预付款 ¥2000</view>
			<view class="txt2">尾款 ¥1600面诊后支付</view>
		</view> -->
		<!-- <view class="footer2">
			<view class="item">
				<image src="/static/tabBar/sy-active.png" class="pic" mode=""></image>
				<view class="txt">首页</view>
			</view>
			<view class="item item2">
				<image src="/static/image/lujin2228.png" class="pic2" mode=""></image>
				<view class="txt">收藏</view>
			</view>
			<view @click="toShouyintai" class="btn">立即购买</view>
		</view> -->
		<view class="footer">
			<view class="btn">我要开团</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["pinlunPage", "pinlunPageSize"]),
		},
		watch: {
			pinlunPage: function(page) {
				console.log('ddpage')
				this.$store.commit("pinlunPage", page);
				if (this.pinlunPage != 1) {
					this.getPinlunData();
				}
			},
		},
		data() {
			return {
				pinlunList:[],
				obj: {},
				d:'0',
				h:'00',
				m:'00',
				s:'00',
				isOnShow: true,
				navTitle: '',
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
				imgArr: ['https://img1.baidu.com/it/u=3303981320,1355171730&fm=26&fmt=auto',
					'https://img0.baidu.com/it/u=2394303781,1797253216&fm=26&fmt=auto',
					'https://img0.baidu.com/it/u=3941318376,4022646771&fm=26&fmt=auto'
				],
				//
				swiperCurrentIndex: 0,
				height: 0,
				list: [{
					name: '医生描述'
				}, {
					name: '买家评价'
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
		onLoad(option) {
			console.log(option)
			this.navTitle = option.title;
			this.id = option.id
		},
		onShow() {
			if (!this.isOnShow) {
				return;
			}
			this.getData2()
			this.pinlunList = [];
			this.$store.commit("pinlunPage", 1);
			this.tabsChange(this.current);
		},
		mounted() {
			this.getCurrentSwiperHeight('.nav5Items')
		},
		onReachBottom() {
			this.$store.commit("pinlunPage", this.pinlunPage + 1);
		},
		methods: {
			async getData2() {
				this.bannerList = [];
				const res = await this.$api.combinationDetail(this.id)
				console.log(res)
				this.obj = res.data;
				this.obj.storeInfo.images.forEach(ele => {
					this.bannerList.push({
						image: ele
					})
				})
				this.mygetdate(this.obj.storeInfo.stop_time)
				
			},
			async getPinlunData(){
				this.status = 'loading';
				setTimeout(async () => {
					const res = await this.$api.replyList({
						page: this.pinlunPage,
						limit: this.pinlunPageSize,
					},this.id)
					console.log(res.data)
					if (res.data.length == 0) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
						this.shopList = this.shopList.concat(res.data)
					}
				}, 200)
				console.log(this.shopList)
			},
			mygetdate(startSellTime) {
				var date = new Date();
				var now = date.getTime();
				var endTime = new Date(startSellTime*1000); // 结束时间
				var end = endTime.getTime();
				var lefttime = end - now;
				var d, h, m, s;
				if (lefttime > 0) {
					
					h = Math.floor(Math.floor(lefttime / 1000 / 60 / 60 / 24) * 24 + (lefttime / 1000 / 60 / 60 % 24))	
					d = Math.floor(h / 24);
					h = d % 24;
					m = Math.floor(lefttime / 1000 / 60 % 60)
					s = Math.floor(lefttime / 1000 % 60)
					if (s < 10) {
						s = '0' + s
					}
					if (m < 10) {
						m = '0' + m
					}
					if (h < 10) {
						h = '0' + h
					}
				} else {
					this.d = '0';
					this.h = '00';
					this.m = '00';
					this.s = '00';
					// 清除定时器
					clearTimeout(timer)
				}
				// console.log(d + '天' +h + '时' + m + '分' + s + '秒后开始')
				this.d = d;
				this.h = h;
				this.m = m;
				this.s = s;
				var timer = setTimeout(() => {
					this.mygetdate(startSellTime)
				}, 1000);
			},
			toSeeImg(i, imgArr) {
				this.isOnShow = false;
				uni.previewImage({
					current: i,
					urls: imgArr,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) +
								'张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			toShouyintai() {
				uni.navigateTo({
					url: '/pages/index/search/querendingdan'
				})
				// uni.navigateTo({
				// 	url:'/pages/index/search/shouyintai'
				// })
			},
			// tabs通知swiper切换
			tabsChange(index) {
				console.log(index);
				this.swiperCurrent = index;
				this.current = index;
				this.swiperCurrentIndex = index;
				if(index == 1){
					this.getPinlunData()
				}
				setTimeout(() => {
					this.getCurrentSwiperHeight('.nav5Items')
				}, 500)
			},
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				this.tabsChange(this.current)
			},
			getCurrentSwiperHeight(element) {
				let query = uni.createSelectorQuery().in(this);
				query.selectAll(element).boundingClientRect();
				query.exec((res) => {
					this.height = res[0][this.swiperCurrentIndex].height;
				})
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
	/deep/ .u-load-more-wrap {
		width: 686rpx;
		height: 100rpx !important;
	}
	.index {
		position: relative;
	}

	.nav1 {}

	.nav3 {
		position: relative;
		height: 150rpx;

		.pic {
			position: absolute;
			top: 0;
			left: 0;
			// margin-top: -16rpx;
			height: 150rpx;
			width: 100%;
		}

		.pic2 {
			z-index: 9;
			width: 132rpx;
			height: 80rpx;
			position: absolute;
			right: 24rpx;
			bottom: 114rpx;

			.picc {
				position: absolute;
				top: 0;
				left: 0;
				width: 132rpx;
				height: 80rpx;
			}

			.txt {
				position: absolute;
				top: 0;
				left: 0;
				width: 142rpx;
				height: 80rpx;
				font-size: 24rpx;
				font-weight: bold;
				line-height: 80rpx;
				text-align: center;
				color: #BD9E81;
			}
		}

		.left {
			position: absolute;
			top: 30rpx;
			left: 0;
			width: calc(750rpx - 358rpx);

			.txt1 {
				font-size: 28rpx;
				font-weight: 500;
				color: #707070;
				text-align: center;
			}

			.time1 {
				margin-top: 8rpx;
				justify-content: center;
				display: flex;
				align-items: center;

				.t1 {
					width: 44rpx;
					height: 42rpx;
					background: #BD9E81;
					border-radius: 10rpx;
					font-size: 22rpx;
					font-weight: bold;
					line-height: 42rpx;
					text-align: center;
					color: #FFFFFF;
				}

				.t2 {
					margin: 0 10rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #707070;
				}

				.t3 {
					margin: 0 12rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #707070;
					line-height: 42rpx;
				}
			}

			// .txt2 {
			// 	text-align: center;
			// 	font-size: 30rpx;
			// 	font-family: PingFang SC;
			// 	font-weight: 800;
			// 	line-height: 56rpx;
			// 	color: #707070;

			// 	.big {
			// 		font-size: 40rpx;
			// 	}
			// }
		}

		.right {
			position: absolute;
			top: 30rpx;
			right: 0;
			width: 360rpx;

			.txt1 {
				font-size: 40rpx;
				font-weight: 800;
				line-height: 56rpx;
				color: #FFFFFF;
				text-align: center;
			}

			.txt2 {
				text-decoration: line-through;
				text-align: center;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 34rpx;
				color: #ffffff;

				.big {
					font-size: 40rpx;
				}
			}
		}
	}

	.nav2 {
		margin: 20rpx 0 20rpx 0;
		display: flex;
		justify-content: space-between;
		background: #FFFFFF;
		padding: 28rpx 40rpx;

		.left {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.txt1 {
				font-size: 32rpx;
				font-weight: 500;
				color: #BD9E81;
			}

			.txt2 {
				margin-top: 8rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #707070;
			}
		}

		.right {
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: space-between;

			.r-pic {
				width: 42rpx;
				height: 42rpx;
			}

			.txt1 {
				margin-top: 8rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #707070;
			}
		}
	}

	.nav4 {
		margin-bottom: 140rpx;

		// margin-bottom: 240rpx;
		/deep/ .u-tabs-scroll-box {
			padding: 0 60rpx;

			.u-scroll-bar {
				margin-left: 60rpx;
			}
		}

		.swiper-item {
			// background: #FFFFFF;
		}

		.nav5Items {
			// padding: 8rpx 24rpx 20rpx 24rpx;
			// background: #FFFFFF;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.i1 {}

			.i2 {}

			.i3 {
				width: 100%;

				.i3-nav1 {
					background: #FFFFFF;
					padding: 24rpx;

					.tit1 {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.tit1-1 {
							display: flex;
							align-items: center;

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

						.tit1-2 {
							font-size: 24rpx;
							font-weight: 400;
							color: #707070;
						}
					}

					.tit2 {
						margin-top: 32rpx;
						display: flex;
						align-items: center;

						.item {
							border-radius: 10rpx;
							display: flex;
							align-items: center;
							padding: 12rpx 20rpx;
							background: #F2ECE6;
							margin-right: 20rpx;

							.txt1 {
								font-size: 24rpx;
								font-weight: bold;
								color: #707070;
							}

							.txt2 {
								margin-left: 12rpx;
								font-size: 24rpx;
								font-weight: bold;
								color: #707070;
							}
						}

						.item.bed {
							background: #FAFAFA;
						}
					}
				}

				.i3-items {
					background: #FFFFFF;
					margin-top: 20rpx;

					.i3-item {
						border-bottom: 2rpx solid #F7F8FA;
						display: flex;
						padding: 24rpx;

						.ava {
							height: 94rpx;
							width: 94rpx;
							border-radius: 50%;
						}

						.right {
							margin-left: 20rpx;
							width: calc(100% - 94rpx - 20rpx);

							.tit1 {
								display: flex;
								align-items: center;
								justify-content: space-between;

								.txt1 {
									font-size: 24rpx;
									font-weight: 500;
									color: #BD9E81;
								}

								.txt2 {
									font-size: 20rpx;
									font-weight: 400;
									color: #707070;
								}
							}

							.tit2 {
								display: flex;
								align-items: center;

								.txt2 {
									margin-top: 4rpx;
									margin-left: 8rpx;
									font-size: 20rpx;
									font-weight: 400;
									color: #707070;
								}
							}

							.tit3 {
								margin-top: 10rpx;
								font-size: 24rpx;
								font-weight: 400;
								color: #707070;
							}

							.tit4 {
								margin-top: 20rpx;

								.picc {
									border-radius: 8rpx;
									margin-right: 16rpx;
									width: 150rpx;
									height: 150rpx;
								}
							}
						}
					}
				}

			}
		}
	}

	.footer1 {
		position: fixed;
		bottom: 140rpx;
		width: 100%;
		height: 88rpx;
		background: #F2ECE6;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.kefu {
			position: absolute;
			bottom: 14rpx;
			right: 8rpx;
			width: 172rpx;
			height: 172rpx;
		}

		.txt1 {
			font-size: 24rpx;
			font-family: PingFang SC;
			line-height: 34rpx;
			color: #BD9E81;
		}

		.txt2 {
			font-size: 24rpx;
			font-family: PingFang SC;
			line-height: 34rpx;
			color: #BD9E81;
		}
	}

	.footer2 {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 140rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 8rpx 28rpx rgba(166, 179, 194, 0.3);
		display: flex;
		padding: 0 50rpx;

		.item {
			margin-top: 12rpx;
			height: 80rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;

			.pic {
				width: 50rpx;
				height: 50rpx;
			}

			.txt {
				font-size: 24rpx;
				font-weight: 400;
				color: #707070;
			}

			.pic2 {
				margin-top: 4rpx;
				width: 40rpx;
				height: 40rpx;
			}
		}

		.item2 {
			margin-left: 76rpx;
		}

		.btn {
			border-radius: 40rpx;
			margin-left: 70rpx;
			margin-top: 12rpx;
			width: 406rpx;
			height: 80rpx;
			font-size: 28rpx;
			font-weight: bold;
			line-height: 80rpx;
			text-align: center;
			color: #FFFFFF;
			background: #BD9E81;
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 140rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 8rpx 28rpx rgba(166, 179, 194, 0.3);

		.btn {
			width: 682rpx;
			height: 84rpx;
			background: #BD9E81;
			border-radius: 44rpx;
			margin-top: 10rpx;
			margin-left: 34rpx;
			font-size: 28rpx;
			font-weight: bold;
			line-height: 84rpx;
			color: #FFFFFF;
			text-align: center;
		}
	}
</style>
