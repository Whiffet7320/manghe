<template>
	<view class="index">
		<view class="nav" v-if="isH5">
			<u-icon @click="goTo" name="arrow-left" size="30"></u-icon>
			<view class="nav-title">交易记录</view>
		</view>
		<view class="container">
			<u-tabs-swiper bg-color="#f8f8f8" font-size="25" gutter="140" inactive-color="#000000" bar-height="6"
				bar-width="40" active-color="#EBBFCC" ref="uTabs" :list="list" :current="current" @change="tabsChange"
				:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			<swiper :style="[{height: height + 'px'}]" :current="swiperCurrent">
				<swiper-item @touchmove.stop class="swiper-item" v-for="(items, index) in list" :key="index">
					<scroll-view @scrolltolower="lower" scroll-y='true' style="height: 90vh;">
						<view class="items">
							<view v-if="items.name=='1月'">
								<view class="item" v-for="(item,i) in yiList" :key='i'>
									<view class="nav1">
										<view class="tit1">交易时间：{{item.pay_time}}</view>
										<view class="tit2">-￥{{item.pay_money}}</view>
										<view class="tit3">余额：{{item.user_balance}}</view>
									</view>
									<view class="nav2" v-for="(ele,index) in item.goods" :key='index'>
										<image class="pic1" :src="ele.goods_pic" mode=""></image>
										<view class="title">
											<view class="tit1">
												<view class="tit1-1">{{ele.goods_title}}</view>
												<view class="tit1-2">数量：{{ele.goods_num}}</view>
												<view class="tit1-3">实付款：￥{{ele.goods_price + ele.goods_postage}}</view>
											</view>
											<!-- 											<view class="tit2">
												联系客服
											</view> -->
											<button open-type="contact" bindcontact="handleContact" class="tit2 kf">
												<view class="tit">联系客服</view>
											</button>
										</view>
									</view>
								</view>
							</view>
							<view v-if="items.name=='2月'">
								<view class="item" v-for="(item,i) in erList" :key='i'>
									<view class="nav1">
										<view class="tit1">交易时间：{{item.pay_time}}</view>
										<view class="tit2">-￥{{item.pay_money}}</view>
										<view class="tit3">余额：{{item.user_balance}}</view>
									</view>
									<view class="nav2" v-for="(ele,index) in item.goods" :key='index'>
										<image class="pic1" :src="ele.goods_pic" mode=""></image>
										<view class="title">
											<view class="tit1">
												<view class="tit1-1">{{ele.goods_title}}</view>
												<view class="tit1-2">数量：{{ele.goods_num}}</view>
												<view class="tit1-3">实付款：￥{{ele.goods_price + ele.goods_postage}}</view>
											</view>
											<view class="tit2">
												联系客服
											</view>
										</view>
									</view>
								</view>
							</view>
							<view v-if="items.name=='3月'">
								<view class="item" v-for="(item,i) in sanList" :key='i'>
									<view class="nav1">
										<view class="tit1">交易时间：{{item.pay_time}}</view>
										<view class="tit2">-￥{{item.pay_money}}</view>
										<view class="tit3">余额：{{item.user_balance}}</view>
									</view>
									<view class="nav2" v-for="(ele,index) in item.goods" :key='index'>
										<image class="pic1" :src="ele.goods_pic" mode=""></image>
										<view class="title">
											<view class="tit1">
												<view class="tit1-1">{{ele.goods_title}}</view>
												<view class="tit1-2">数量：{{ele.goods_num}}</view>
												<view class="tit1-3">实付款：￥{{ele.goods_price + ele.goods_postage}}</view>
											</view>
											<view class="tit2">
												联系客服
											</view>
										</view>
									</view>
								</view>
							</view>
							<view v-if="items.name=='4月'">
								<view class="item" v-for="(item,i) in siList" :key='i'>
									<view class="nav1">
										<view class="tit1">交易时间：{{item.pay_time}}</view>
										<view class="tit2">-￥{{item.pay_money}}</view>
										<view class="tit3">余额：{{item.user_balance}}</view>
									</view>
									<view class="nav2" v-for="(ele,index) in item.goods" :key='index'>
										<image class="pic1" :src="ele.goods_pic" mode=""></image>
										<view class="title">
											<view class="tit1">
												<view class="tit1-1">{{ele.goods_title}}</view>
												<view class="tit1-2">数量：{{ele.goods_num}}</view>
												<view class="tit1-3">实付款：￥{{ele.goods_price + ele.goods_postage}}</view>
											</view>
											<view class="tit2">
												联系客服
											</view>
										</view>
									</view>
								</view>
							</view>
							<view v-if="items.name=='5月'">
								<view class="item" v-for="(item,i) in wuList" :key='i'>
									<view class="nav1">
										<view class="tit1">交易时间：{{item.pay_time}}</view>
										<view class="tit2">-￥{{item.pay_money}}</view>
										<view class="tit3">余额：{{item.user_balance}}</view>
									</view>
									<view class="nav2" v-for="(ele,index) in item.goods" :key='index'>
										<image class="pic1" :src="ele.goods_pic" mode=""></image>
										<view class="title">
											<view class="tit1">
												<view class="tit1-1">{{ele.goods_title}}</view>
												<view class="tit1-2">数量：{{ele.goods_num}}</view>
												<view class="tit1-3">实付款：￥{{ele.goods_price + ele.goods_postage}}</view>
											</view>
											<view class="tit2">
												联系客服
											</view>
										</view>
									</view>
								</view>
							</view>
							<view v-if="items.name=='6月'">
								<view class="item" v-for="(item,i) in liuList" :key='i'>
									<view class="nav1">
										<view class="tit1">交易时间：{{item.pay_time}}</view>
										<view class="tit2">-￥{{item.pay_money}}</view>
										<view class="tit3">余额：{{item.user_balance}}</view>
									</view>
									<view class="nav2" v-for="(ele,index) in item.goods" :key='index'>
										<image class="pic1" :src="ele.goods_pic" mode=""></image>
										<view class="title">
											<view class="tit1">
												<view class="tit1-1">{{ele.goods_title}}</view>
												<view class="tit1-2">数量：{{ele.goods_num}}</view>
												<view class="tit1-3">实付款：￥{{ele.goods_price + ele.goods_postage}}</view>
											</view>
											<button open-type="contact" bindcontact="handleContact" class="tit2 kf">
												<view class="tit">联系客服</view>
											</button>
										</view>
									</view>
								</view>
							</view>
							<view v-if="items.name=='7月'">
								<view class="item" v-for="(item,i) in qiList" :key='i'>
									<view class="nav1">
										<view class="tit1">交易时间：{{item.pay_time}}</view>
										<view class="tit2">-￥{{item.pay_money}}</view>
										<view class="tit3">余额：{{item.user_balance}}</view>
									</view>
									<view class="nav2" v-for="(ele,index) in item.goods" :key='index'>
										<image class="pic1" :src="ele.goods_pic" mode=""></image>
										<view class="title">
											<view class="tit1">
												<view class="tit1-1">{{ele.goods_title}}</view>
												<view class="tit1-2">数量：{{ele.goods_num}}</view>
												<view class="tit1-3">实付款：￥{{ele.goods_price + ele.goods_postage}}</view>
											</view>
											<view class="tit2">
												联系客服
											</view>
										</view>
									</view>
								</view>
							</view>
							<view v-if="items.name=='8月'">
								<view class="item" v-for="(item,i) in baList" :key='i'>
									<view class="nav1">
										<view class="tit1">交易时间：{{item.pay_time}}</view>
										<view class="tit2">-￥{{item.pay_money}}</view>
										<view class="tit3">余额：{{item.user_balance}}</view>
									</view>
									<view class="nav2" v-for="(ele,index) in item.goods" :key='index'>
										<image class="pic1" :src="ele.goods_pic" mode=""></image>
										<view class="title">
											<view class="tit1">
												<view class="tit1-1">{{ele.goods_title}}</view>
												<view class="tit1-2">数量：{{ele.goods_num}}</view>
												<view class="tit1-3">实付款：￥{{ele.goods_price + ele.goods_postage}}</view>
											</view>
											<view class="tit2">
												联系客服
											</view>
										</view>
									</view>
								</view>
							</view>
							<view v-if="items.name=='9月'">
								<view class="item" v-for="(item,i) in jiuList" :key='i'>
									<view class="nav1">
										<view class="tit1">交易时间：{{item.pay_time}}</view>
										<view class="tit2">-￥{{item.pay_money}}</view>
										<view class="tit3">余额：{{item.user_balance}}</view>
									</view>
									<view class="nav2" v-for="(ele,index) in item.goods" :key='index'>
										<image class="pic1" :src="ele.goods_pic" mode=""></image>
										<view class="title">
											<view class="tit1">
												<view class="tit1-1">{{ele.goods_title}}</view>
												<view class="tit1-2">数量：{{ele.goods_num}}</view>
												<view class="tit1-3">实付款：￥{{ele.goods_price + ele.goods_postage}}</view>
											</view>
											<view class="tit2">
												联系客服
											</view>
										</view>
									</view>
								</view>
							</view>
							<view v-if="items.name=='10月'">
								<view class="item" v-for="(item,i) in shiList" :key='i'>
									<view class="nav1">
										<view class="tit1">交易时间：{{item.pay_time}}</view>
										<view class="tit2">-￥{{item.pay_money}}</view>
										<view class="tit3">余额：{{item.user_balance}}</view>
									</view>
									<view class="nav2" v-for="(ele,index) in item.goods" :key='index'>
										<image class="pic1" :src="ele.goods_pic" mode=""></image>
										<view class="title">
											<view class="tit1">
												<view class="tit1-1">{{ele.goods_title}}</view>
												<view class="tit1-2">数量：{{ele.goods_num}}</view>
												<view class="tit1-3">实付款：￥{{ele.goods_price + ele.goods_postage}}</view>
											</view>
											<view class="tit2">
												联系客服
											</view>
										</view>
									</view>
								</view>
							</view>
							<view v-if="items.name=='11月'">
								<view class="item" v-for="(item,i) in shiyiList" :key='i'>
									<view class="nav1">
										<view class="tit1">交易时间：{{item.pay_time}}</view>
										<view class="tit2">-￥{{item.pay_money}}</view>
										<view class="tit3">余额：{{item.user_balance}}</view>
									</view>
									<view class="nav2" v-for="(ele,index) in item.goods" :key='index'>
										<image class="pic1" :src="ele.goods_pic" mode=""></image>
										<view class="title">
											<view class="tit1">
												<view class="tit1-1">{{ele.goods_title}}</view>
												<view class="tit1-2">数量：{{ele.goods_num}}</view>
												<view class="tit1-3">实付款：￥{{ele.goods_price + ele.goods_postage}}</view>
											</view>
											<view class="tit2">
												联系客服
											</view>
										</view>
									</view>
								</view>
							</view>
							<view v-if="items.name=='12月'">
								<view class="item" v-for="(item,i) in shierList" :key='i'>
									<view class="nav1">
										<view class="tit1">交易时间：{{item.pay_time}}</view>
										<view class="tit2">-￥{{item.pay_money}}</view>
										<view class="tit3">余额：{{item.user_balance}}</view>
									</view>
									<view class="nav2" v-for="(ele,index) in item.goods" :key='index'>
										<image class="pic1" :src="ele.goods_pic" mode=""></image>
										<view class="title">
											<view class="tit1">
												<view class="tit1-1">{{ele.goods_title}}</view>
												<view class="tit1-2">数量：{{ele.goods_num}}</view>
												<view class="tit1-3">实付款：￥{{ele.goods_price + ele.goods_postage}}</view>
											</view>
											<view class="tit2">
												联系客服
											</view>
										</view>
									</view>
								</view>
							</view>
							<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />

						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>

	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["yyjlPage", "yyjlPageSize"]),
		},
		watch: {
			yyjlPage: function(yyjlPage) {
				console.log('zhixl')
				this.$store.commit("yyjlPage", yyjlPage);
				if (this.yyjlPage != 1) {
					this.getData();
				}
			},
		},
		data() {
			return {
				openid: '',
				jyjlList: [],
				isH5: false,
				swiperCurrentIndex: 1,
				height: 0,
				list: [{
					name: '1月'
				}, {
					name: '2月'
				}, {
					name: '3月'
				}, {
					name: '4月'
				}, {
					name: '5月'
				}, {
					name: '6月'
				}, {
					name: '7月'
				}, {
					name: '8月'
				}, {
					name: '9月'
				}, {
					name: '10月'
				}, {
					name: '11月'
				}, {
					name: '12月'
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
				yiList: [],
				erList: [],
				sanList: [],
				siList: [],
				wuList: [],
				liuList: [],
				qiList: [],
				baList: [],
				jiuList: [],
				shiList: [],
				shiyiList: [],
				shierList: [],
				height: null,
				lowFlag: false,
			};
		},
		mounted() {
			this.getCurrentSwiperHeight('.items')
		},
		onShow() {
			this.openid = uni.getStorageSync('openid');
			this.getData()
			this.$store.commit("yyjlPage", 1);
			this.yiList = [];
			this.erList = [];
			this.sanList = [];
			this.siList = [];
			this.wuList = [];
			this.liuList = [];
			this.qiList = [];
			this.baList = [];
			this.jiuList = [];
			this.shiList = [];
			this.shiyiList = [];
			this.shierList = [];
		},
		// onReachBottom() {
		// 	console.log('bottom')
		// 	this.$store.commit("yyjlPage", this.yyjlPage + 1);
		// },
		methods: {
			async getData() {
				this.status = 'loading';
				const res = await this.$api.wx_userconsume(this.openid, this.yyjlPage, this.yyjlPageSize)
				this.jyjlList = res.list;
				if (res.result == 1) {
					setTimeout(() => {
						if (!res.list) {
							this.status = 'nomore'
						} else {
							this.status = 'loadmore';
							this.jyjlList.forEach(ele => {
								ele.year = ele.pay_time.split(' ')[0].slice(5, 7);
								if (ele.year.slice(0, 1) == 0) {
									ele.year = ele.year.slice(1, 2)
								}
								this.list.forEach(item => {
									if (item.name.indexOf(ele.year) != -1) {
										console.log(ele.year)
										if (ele.year == 1) {
											this.yiList = this.yiList.concat(ele);
										} else if (ele.year == 2) {
											this.erList = this.erList.concat(ele);
										} else if (ele.year == 2) {
											this.erList = this.erList.concat(ele);
										} else if (ele.year == 3) {
											this.sanList = this.sanList.concat(ele);
										} else if (ele.year == 4) {
											this.siList = this.siList.concat(ele);
										} else if (ele.year == 5) {
											this.wuList = this.wuList.concat(ele);
										} else if (ele.year == 6) {
											this.liuList = this.liuList.concat(ele);
										} else if (ele.year == 7) {
											this.qiList = this.qiList.concat(ele);
										} else if (ele.year == 8) {
											this.baList = this.baList.concat(ele);
										} else if (ele.year == 9) {
											this.jiuList = this.jiuList.concat(ele);
										} else if (ele.year == 10) {
											this.shiList = this.shiList.concat(ele);
										} else if (ele.year == 11) {
											this.shiyiList = this.shiyiList.concat(ele);
										} else if (ele.year == 12) {
											this.shierList = this.shierList.concat(ele);
										}
									}
								})
							})

						}

						console.log(this.liuList)
					}, 200)
				}
				setTimeout(() => {
					this.getCurrentSwiperHeight('.items');
				}, 500)
			},
			lower() {
				console.log('bottom', this.yyjlPage, this.height)
				this.$store.commit("yyjlPage", this.yyjlPage + 1);
			},
			goTo() {
				uni.switchTab({
					url: '/pages/wode/wode'
				})
			},
			handleContact(e) {
				console.log(e.detail.path)
				console.log(e.detail.query)
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.yiList = [];
				this.erList = [];
				this.sanList = [];
				this.siList = [];
				this.wuList = [];
				this.liuList = [];
				this.qiList = [];
				this.baList = [];
				this.jiuList = [];
				this.shiList = [];
				this.shiyiList = [];
				this.shierList = [];
				this.swiperCurrent = index;
				this.current = index;
				this.swiperCurrentIndex = index;
				console.log('tabsChange')
				this.$store.commit('yyjlPage', 1)
				this.getData()
				// this.
			},
			getCurrentSwiperHeight(element) {
				let query = uni.createSelectorQuery().in(this);
				query.selectAll(element).boundingClientRect();
				query.exec((res) => {
					this.height = 20 + res[0][this.swiperCurrentIndex].height;
				})
			},
		},
	}
</script>

<style scoped lang="scss">
	page {
		width: 750rpx;
		height: 1333rpx;
		opacity: 1;
		background: #f8f8f8;
	}

	.index {
		position: relative;
		// padding-top: 60rpx;
		height: 100%;
		width: 100%;
	}

	.nav {
		// position: fixed;
		// top: 60rpx;
		// left: 0;
		display: flex;
		align-items: center;
		height: 36rpx;
		// padding: 60rpx 50rpx 33rpx 46rpx;
		margin: 0rpx 50rpx 0rpx 46rpx;

		.nav-title {
			margin-left: 23rpx;
			opacity: 1;
			font-size: 36rpx;
			font-family: SourceHanSansCN-Regular;
			text-align: left;
			color: #121212;
		}
	}

	.container {
		margin-top: 30rpx;

		.mySwiper {
			// border: 2rpx solid red;
			height: 2128rpx;
			// overflow-y: scroll;
		}

		.items {
			margin: 26rpx 22rpx;

			.item {
				width: 708rpx;
				height: 277rpx;
				opacity: 1;
				background: #ffffff;
				border-radius: 18rpx;
				padding: 0 28rpx;

				.nav1 {
					margin: 0 auto;
					height: 74rpx;
					border-bottom: 2rpx solid #eeeeee;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.tit1 {
						opacity: 1;
						font-size: 18rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						text-align: left;
						color: #000000;
					}

					.tit2 {
						opacity: 1;
						font-size: 22rpx;
						font-family: PingFang SC, PingFang SC-Bold;
						font-weight: 700;
						text-align: left;
						color: #af0000;
					}

					.tit3 {
						opacity: 1;
						font-size: 22rpx;
						font-family: PingFang SC, PingFang SC-Bold;
						font-weight: 700;
						text-align: right;
						color: #000000;
					}
				}

				.nav2 {
					margin: 38rpx 0;
					display: flex;
					align-items: center;

					.pic1 {
						width: 127rpx;
						height: 127rpx;
						opacity: 1;
					}

					.title {
						display: flex;
						flex: 1;
						align-items: center;
						justify-content: space-between;

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
						}

						.tit2 {
							margin-left: 83rpx;
							background: #94C5E6;
							width: 159rpx;
							height: 51rpx;
							opacity: 1;
							border-radius: 28rpx;
							font-size: 18rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							text-align: center;
							line-height: 51rpx;
							color: #ffffff;
						}

						.tit2.kf {
							margin: 0;
							padding: 0;
						}

						.tit2.kf::after {
							border: none;
						}
					}
				}

			}
		}
	}
</style>
