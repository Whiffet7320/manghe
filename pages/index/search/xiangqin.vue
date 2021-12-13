<template>
	<view class="index">
		<u-toast ref="uToast" />
		<u-navbar back-icon-size='30' title-size='24' :title="navTitle"></u-navbar>
		<view class="nav1">
			<u-swiper height='602' :list="bannerList"></u-swiper>
		</view>
		<view class="nav3">
			<image src="/static/image/zu1873.png" class="pic" mode=""></image>
			<view class="left">
				<view class="txt1">原价</view>
				<view class="txt2">¥<text class="big">{{obj.storeInfo.ot_price}}</text></view>
			</view>
			<view class="right">
				<view class="txt1">活动特价</view>
				<view class="txt2">¥<text class="big">{{obj.storeInfo.price}}</text></view>
			</view>
		</view>
		<view class="nav2">
			<view class="left">
				<view class="txt1">{{obj.storeInfo.store_name}}</view>
				<view class="txt2">肋骨鼻综合</view>
			</view>
			<view class="right">
				<image src="/static/image/zu1570.png" class="r-pic" mode=""></image>
				<view class="txt1">分享</view>
			</view>
		</view>
		<view class="nav4">
			<u-tabs-swiper bg-color="#F7F8FA" height='80' font-size="28" gutter="30" inactive-color="#707070"
				bar-height="4" bar-width="64" active-color="#BD9E81" ref="uTabs" :list="list" :current="current"
				@change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			<swiper :style="[{height: height + 'px'}]" :current="swiperCurrent">
				<swiper-item @touchmove.stop class="swiper-item" v-for="(item, index) in list" :key="index">
					<scroll-view scroll-y='true'>
						<view class="nav5Items">
							<!-- {{item.name}} -->
							<!-- 产品介绍 -->
							<template v-if="swiperCurrent == 0">
								<view class="i1">
									<u-parse :html="obj.storeInfo.description"></u-parse>
								</view>
							</template>
							<!-- 医生描述 -->
							<template v-if="swiperCurrent == 1">
								<view class="i2" style="width: 100%;">
									<image :src="obj.doctor_info.doctor_big_img" mode="widthFix" style="width: 100%;"></image>
								</view>
							</template>
							<!-- 产品评价 -->
							<template v-if="swiperCurrent == 2">
								<view class="i3">
									<view class="i3-nav1">
										<view class="tit1">
											<view class="tit1-1">
												<view class="txt1">产品评价</view>
												<view class="txt2">（好评度{{pingjiaObj.reply_chance}}%）</view>
											</view>
											<view class="tit1-2">共{{pingjiaObj.sum_count}}条评论</view>
										</view>
										<view class="tit2">
											<view class="item">
												<view class="txt1">有图</view>
												<view class="txt2">{{pingjiaObj.pics_count}}</view>
											</view>
											<view class="item" @click="getPinglunData">
												<u-icon name="thumb-up-fill" color="#BD9E81" size="22"></u-icon>
												<view class="txt2">{{pingjiaObj.good_count}}</view>
											</view>
											<view class="item bed">
												<u-icon name="thumb-down-fill" color="#D9D9D9" size="22"></u-icon>
												<view class="txt2">{{pingjiaObj.poor_count}}</view>
											</view>
										</view>
									</view>
									<view class="i3-items">
										<view class="i3-item" v-for="item in pinglunList">
											<image class="ava" :src="item.avatar" mode=""></image>
											<view class="right">
												<view class="tit1">
													<view class="txt1">{{item.nickname}}</view>
													<view class="txt2">{{item.add_time}}</view>
												</view>
												<view class="tit2">
													<u-icon name="thumb-up-fill" color="#BD9E81" size="22"></u-icon>
													<view class="txt2">赞了该商品</view>
												</view>
												<view class="tit3">{{item.comment}}</view>
												<view class="tit4">
													<image @click.stop="toSeeImg(i,item.pics)" class="picc"
														v-for="(pic,i) in item.pics" :src="pic" mode=""></image>
												</view>
											</view>
										</view>
									</view>
									<u-loadmore :status="status" />
								</view>
							</template>
						</view>
					</scroll-view>

				</swiper-item>
			</swiper>
		</view>

		<view class="footer1">
			<image src="/static/image/zu1840.png" class="kefu" mode=""></image>
			<view class="txt1">预付款 ¥{{obj.storeInfo.price}}</view>
			<view class="txt2">尾款 ¥{{obj.storeInfo.finish_pay_price}}面诊后支付</view>
		</view>
		<view class="footer2">
			<view class="item" @click="toHome">
				<image src="/static/tabBar/sy-active.png" class="pic" mode=""></image>
				<view class="txt">首页</view>
			</view>
			<view class="item item2" @click="toCollect">
				<image src="/static/image/lujin2228.png" class="pic2" mode=""></image>
				<view class="txt">收藏</view>
			</view>
			<view @click="toQuerendingdan" class="btn">立即购买</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["IndexshopPage", "IndexshopPageSize"]),
		},
		watch: {
			IndexshopPage: function(page) {
				console.log('ddpage')
				this.$store.commit("IndexshopPage", page);
				if (this.IndexshopPage != 1) {
					this.getPinglunData();
				}
			},
			current: function() {
				this.pinglunList = [];
				this.$store.commit("IndexshopPage", 1);
				this.getPinglunData()
				setTimeout(() => {
					this.getCurrentSwiperHeight('.nav5Items')
				}, 800)
			},
		},
		data() {
			return {
				pingjiaObj:{},
				pinglunList: [],
				id: '',
				obj: {},
				isOnShow: true,
				navTitle: '',
				bannerList: [],
				imgArr: ['https://img1.baidu.com/it/u=3303981320,1355171730&fm=26&fmt=auto',
					'https://img0.baidu.com/it/u=2394303781,1797253216&fm=26&fmt=auto',
					'https://img0.baidu.com/it/u=3941318376,4022646771&fm=26&fmt=auto'
				],
				//
				swiperCurrentIndex: 0,
				height: 0,
				list: [{
					name: '产品介绍'
				}, {
					name: '医生描述'
				}, {
					name: '产品评价'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 2, // tabs组件的current值，表示当前活动的tab选项
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
			this.getData()
			this.getPinglunData()
			this.pinglunList = [];
			this.$store.commit("IndexshopPage", 1);
			this.tabsChange(this.current);
		},
		mounted() {
			setTimeout(() => {
				this.getCurrentSwiperHeight('.nav5Items')
			}, 900)
		},
		onReachBottom() {
			this.$store.commit("IndexshopPage", this.IndexshopPage + 1);
		},
		methods: {
			async getPinglunData(type) {
				this.status = 'loading';
				setTimeout(async () => {
					const res = await this.$api.replyList({}, this.id)
					console.log(res.data)
					this.pingjiaObj = res.data.comment;
					if (res.data.list.length == 0) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
						this.pinglunList = this.pinglunList.concat(res.data.list)
					}
				}, 200)
				console.log(this.pinglunList)
			},
			async getData() {
				const res = await this.$api.detail(this.id)
				console.log(res)
				this.obj = res.data;
				this.obj.storeInfo.slider_image.forEach((ele, i) => {
					this.$set(this.bannerList, i, {
						image: ele
					})
				})
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
			async toQuerendingdan() {
				const res = await this.$api.cartAdd({
					productId: this.id,
					cartNum: 1,
					new: 1
				})
				console.log(res)
				if (res.status == 200) {
					const res2 = await this.$api.orderConfirm({
						cartId: res.data.cartId,
						new: 1,
					})
					if (res2.status == 200) {
						var obj = {
							...this.obj.doctor_info,
							yuprice:res2.data.cartInfo[0].sum_price,
							weiPrice:this.obj.storeInfo.finish_pay_price,
							store_name:res2.data.cartInfo[0].productInfo.store_name,
							orderKey:res2.data.orderKey,
						}
						uni.navigateTo({
							url: `/pages/index/search/querendingdan?obj=${encodeURIComponent(JSON.stringify(obj))}&cartId=${res.data.cartId}`
						})
					} else {
						this.$refs.uToast.show({
							title: res2.msg,
							type: 'warning',
						})
					}
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
			// tabs通知swiper切换
			tabsChange(index) {
				console.log(index);
				this.swiperCurrent = index;
				this.swiperCurrentIndex = index;
				this.current = index;
			},
			getCurrentSwiperHeight(element) {
				let query = uni.createSelectorQuery().in(this);
				query.selectAll(element).boundingClientRect();
				query.exec((res) => {
					this.height = res[0][this.swiperCurrentIndex].height;
				})
			},
			toHome(){
				uni.switchTab({
					url:"/pages/tabBar/index"
				})
			},
			toCollect(){
				this.$api.collectAdd(this.id).then((res)=>{
					if(res.status==200){
						this.$u.toast(res.msg);
					}
				}).catch((err)=>{
					this.$u.toast(err);
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
			margin-top: -16rpx;
			height: 150rpx;
			width: 100%;
		}

		.left {
			position: absolute;
			top: 20rpx;
			left: 0;
			width: 264rpx;

			.txt1 {
				font-size: 28rpx;
				font-weight: 500;
				color: #707070;
				text-align: center;
			}

			.txt2 {
				text-align: center;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 800;
				line-height: 56rpx;
				color: #707070;
				text-decoration: line-through;

				.big {
					font-size: 40rpx;
				}
			}
		}

		.right {
			position: absolute;
			top: 20rpx;
			right: 0;
			width: calc(750rpx - 280rpx);

			.txt1 {
				font-size: 28rpx;
				font-weight: 500;
				color: #ffffff;
				text-align: center;
			}

			.txt2 {
				text-align: center;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 800;
				line-height: 56rpx;
				color: #ffffff;

				.big {
					font-size: 40rpx;
				}
			}
		}
	}

	.nav2 {
		margin: 0 0 20rpx 0;
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
				width: 600rpx;
			}

			.txt2 {
				font-size: 24rpx;
				font-weight: 400;
				color: #707070;
			}
		}

		.right {
			display: flex;
			align-items: center;
			flex-direction: column;
			// justify-content: space-between;

			.r-pic {
				width: 42rpx;
				height: 42rpx;
			}

			.txt1 {
				margin-top: 14rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #707070;
			}
		}
	}

	.nav4 {
		margin-bottom: 240rpx;

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
				background: #FFFFFF;
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
</style>
