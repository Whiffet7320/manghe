<template>
	<view class="index">
		<view class="container">
			<u-toast ref="uToast" />
			<u-tabs-swiper bg-color="#f8f8f8" font-size="25" gutter="40" inactive-color="#000000" bar-height="6"
				bar-width="40" active-color="#EBBFCC" ref="uTabs" :list="list" :current="current" @change="tabsChange"
				:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			<swiper :style="[{height: height + 'px'}]" :current="swiperCurrent">
				<swiper-item @touchmove.stop class="swiper-item" v-for="(item, index) in list" :key="index">
					<scroll-view @scrolltolower="lower" scroll-y='true' style="height: 90vh;">
						<view class="items">
							<!-- {{item.name}} -->
							<!-- 全部订单 -->
							<view v-if="swiperCurrentIndex==0">
								<view class="item" v-for="item in allList" :key="item.order_id">
									<view class="nav1">
										<view class="tit1">订单编号：{{item.order_no}}</view>
										<view class="tit2">{{item.orders_status}}</view>
									</view>
									<view class="nav2" v-for="(ele,i) in item.goods" :key="i">
										<image class="pic1" :src="ele.goods_pic" mode=""></image>
										<view class="title">
											<view class="tit1">
												<view class="tit1-1">{{ele.goods_title}}</view>
												<view class="tit1-2">数量：{{ele.goods_num}}</view>
												<view class="tit1-3">实付款：￥{{item.pay_money}}</view>
											</view>
											<view class="tit2" v-if="item.orders_status=='待付款'" @click="deldd(item)">
												取消订单
											</view>
											<view class="tit3" v-if="item.orders_status!='待付款'" @click="miandan(ele)">
												免单列表
											</view>
										</view>

									</view>
									<view class="nav3">
										<view class="tit1">下单时间：{{item.createtime}}</view>
										<view class="tit2" v-if="item.orders_status=='待付款'" @tap="lijigoumai(item)">立即支付
										</view>
									</view>
								</view>
							</view>
							<!-- 待付款 -->
							<view v-if="swiperCurrentIndex==1">
								<view class="item" v-for="item in dfkList" :key="item.order_id">
									<view class="nav1">
										<view class="tit1">订单编号：{{item.order_no}}</view>
										<view class="tit2">{{item.orders_status}}</view>
									</view>
									<view class="nav2" v-for="(ele,i) in item.goods" :key="i">
										<image class="pic1" :src="ele.goods_pic" mode=""></image>
										<view class="title">
											<view class="tit1">
												<view class="tit1-1">{{ele.goods_title}}</view>
												<view class="tit1-2">数量：{{ele.goods_num}}</view>
												<view class="tit1-3">实付款：￥{{item.pay_money}}</view>
											</view>
											<view class="tit2" @click="deldd(item)">
												取消订单
											</view>
										</view>

									</view>
									<view class="nav3">
										<view class="tit1">下单时间：{{item.createtime}}</view>
										<view class="tit2" @tap="lijigoumai(item)">立即支付</view>
									</view>
								</view>
							</view>
							<!-- 代发货 -->
							<view v-if="swiperCurrentIndex==2">
								<view class="item md" v-for="item in dfhList" :key="item.order_id">
									<view class="nav1">
										<view class="tit1">订单编号：{{item.order_no}}</view>
										<view class="tit2" style="color: #9BDF96;">{{item.orders_status}}</view>
									</view>
									<view class="nav2" v-for="(ele,i) in item.goods" :key="i">
										<image class="pic1" :src="ele.goods_pic" mode=""></image>
										<view class="title">
											<view class="tit1">
												<view class="tit1-1">{{ele.goods_title}}</view>
												<view class="tit1-2">数量：{{ele.goods_num}}</view>
												<view class="tit1-3">实付款：￥{{item.pay_money}}</view>
											</view>
											<view class="tit2-2">
												<view class="tit2" @tap="toShenqinshouhou(item)">
													申请售后
												</view>
												<view class="tit3" v-if="item.orders_status!='待付款'"
													@click="miandan(ele)">
													免单列表
												</view>
											</view>
										</view>

									</view>
									<view class="nav3">
										<view class="tit1">下单时间：{{item.createtime}}</view>
									</view>
								</view>
							</view>
							<!-- 待收货 -->
							<view v-if="swiperCurrentIndex==3">
								<view class="item md" v-for="item in dshList" :key="item.order_id">
									<view class="nav1">
										<view class="tit1">订单编号：{{item.order_no}}</view>
										<view class="tit2" style="color: #EBBFCC;">{{item.orders_status}}</view>
									</view>
									<view class="nav2" v-for="(ele,i) in item.goods" :key="i">
										<image class="pic1" :src="ele.goods_pic" mode=""></image>
										<view class="title">
											<view class="tit1">
												<view class="tit1-1">{{ele.goods_title}}</view>
												<view class="tit1-2">数量：{{ele.goods_num}}</view>
												<view class="tit1-3">实付款：￥{{item.pay_money}}</view>
											</view>
											<view class="tit2-2">
												<view class="tit2" @tap="toShenqinshouhou(item)">
													申请售后
												</view>
												<view class="tit3" v-if="item.orders_status!='待付款'"
													@click="miandan(ele)">
													免单列表
												</view>
											</view>

										</view>

									</view>
									<view class="nav3">
										<view class="tit1">下单时间：{{item.createtime}}</view>
										<view class="tit2" style="background: #EBBFCC;" @tap="toPingjia">去评价</view>
										<view class="tit2" style="background: #EBBFCC;" @tap="lijigoumai">确认收货</view>
									</view>
								</view>
							</view>
							<!-- 已完成 -->
							<view v-if="swiperCurrentIndex==4">
								<view class="item md" v-for="item in ywcList" :key="item.order_id">
									<view class="nav1">
										<view class="tit1">订单编号：{{item.order_no}}</view>
										<view class="tit2" style="color: #EBBFCC;">{{item.orders_status}}</view>
									</view>
									<view class="nav2" v-for="(ele,i) in item.goods" :key="i">
										<image class="pic1" :src="ele.goods_pic" mode=""></image>
										<view class="title">
											<view class="tit1">
												<view class="tit1-1">{{ele.goods_title}}</view>
												<view class="tit1-2">数量：{{ele.goods_num}}</view>
												<view class="tit1-3">实付款：￥{{item.pay_money}}</view>
											</view>
											<view class="tit2-2">
												<view class="tit2" @tap="toShenqinshouhou(item)">
													申请售后
												</view>
												<view class="tit3" v-if="item.orders_status!='待付款'"
													@click="miandan(ele)">
													免单列表
												</view>
											</view>
										</view>

									</view>
									<view class="nav3">
										<view class="tit1">下单时间：{{item.createtime}}</view>
										<view class="tit2" style="background: #EBBFCC;" @tap="toPingjia(item)">去评价
										</view>
										<view class="tit2" style="background: #EBBFCC;" @tap="shouhuo(item)">确认收货</view>
									</view>
								</view>
							</view>

							<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />

						</view>
					</scroll-view>

				</swiper-item>
			</swiper>
		</view>
		<!-- 直接购买 -->
		<u-popup class="zjgm" v-model="zjgmShow" mode="bottom" height="716">
			<view class="container">
				<image src="../../static/Path1.png" mode=""></image>
				<view class="tit1">立即购买</view>
				<view class="close" @tap="closeZjgm">
					<image src="../../static/组82.png" mode=""></image>
				</view>
				<view class="bottom">
					<u-radio-group wrap v-model="pay_type">
						<u-radio name=1>
							<view class="wx">
								<image class="dibu" src="../../static/矩形139.png" mode=""></image>
								<image class="wxpic" src="../../static/组137.png" mode=""></image>
								<view class="tit">微信支付</view>
							</view>
						</u-radio>
						<u-radio name=2>
							<view class="zfb">
								<image class="dibu" src="../../static/矩形139.png" mode=""></image>
								<image class="wxpic" src="../../static/路径287.png" mode=""></image>
								<view class="tit">支付宝支付</view>
							</view>
						</u-radio>
						<u-radio name=3>
							<view class="zfb">
								<image class="dibu" src="/static/矩形139.png" mode=""></image>
								<u-icon class="wxpic" color="#EBBFCC" size="46" name="red-packet-fill"></u-icon>
								<!-- <image class="wxpic" src="/static/路径287.png" mode=""></image> -->
								<view class="tit">余额支付</view>
							</view>
						</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="footer" @click="pay">
				<view class="tit">
					支付￥{{pay_money}}
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["ddPage", "ddPageSize"]),
		},
		watch: {
			ddPage: function(page) {
				console.log('ddpage')
				this.$store.commit("ddPage", page);
				if (this.ddPage != 1) {
					this.getData();
				}
			},
		},
		onLoad(option) {
			this.openid = uni.getStorageSync('openid')
			this.orders_status = option.orders_status
			this.current = +option.orders_status + 1;
			// console.log(this.current)
		},
		data() {
			return {
				pay_money: 0,
				order_id: '',
				openid: '',
				orders_status: -1,
				// 是否免单
				is_free: 0,
				mylist: [],
				// 全部订单
				allList: [],
				// 待付款
				dfkList: [],
				// 待发货
				dfhList: [],
				// 待收货
				dshList: [],
				// 已完成
				ywcList: [],
				pay_type: 1,
				zjgmShow: false,
				isH5: false,
				swiperCurrentIndex: 0,
				height: 0,
				list: [{
					name: '全部订单'
				}, {
					name: '待付款'
				}, {
					name: '待发货'
				}, {
					name: '待收货'
				}, {
					name: '已完成'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: null, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				// 加载
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '上拉加载更多',
					loading: '正在加载...',
					nomore: '没有了更多了'
				}
			}
		},
		onShow() {
			this.tabsChange(this.current)
			this.$store.commit("ddPage", 1);
			this.allList = [];
			this.dfkList = [];
			this.dfhList = [];
			this.dshList = [];
			this.ywcList = [];
		},
		// mounted() {
		// 	this.getCurrentSwiperHeight('.items')
		// },
		// onReachBottom() {
		// 	this.$store.commit("ddPage", this.ddPage + 1);
		// },
		methods: {
			async getData() {
				console.log(1111111)
				this.status = 'loading';
				const res = await this.$api.wx_userorder(this.openid, this.is_free, this.ddPage, this
					.ddPageSize, this
					.orders_status);
				// this.mylist = res.list;
				console.log(res)
				if (res.result == 1) {
					setTimeout(() => {
						if (!res.list) {
							this.status = 'nomore'
						} else {
							this.status = 'loadmore';
							if (this.orders_status == -1) {
								this.allList = this.allList.concat(res.list)
							} else if (this.orders_status == 0) {
								this.dfkList = this.dfkList.concat(res.list)
							} else if (this.orders_status == 1) {
								this.dfhList = this.dfhList.concat(res.list)
							} else if (this.orders_status == 2) {
								this.dshList = this.dshList.concat(res.list)
							} else if (this.orders_status == 3) {
								this.ywcList = this.ywcList.concat(res.list)
							}
							console.log(this.allList)
						}
						if (res.list) {
							if (res.list.length < this.ddPageSize) {
								this.status = 'nomore'
							}
						}

					}, 200)
				}
				setTimeout(() => {
					this.getCurrentSwiperHeight('.items');
				}, 500)
			},
			lower() {
				this.$store.commit("ddPage", this.ddPage + 1);
			},
			// 取消支付
			async deldd(item) {
				this.allList = [];
				this.dfkList = [];
				this.dfhList = [];
				this.dshList = [];
				this.ywcList = [];
				this.pay_money = item.pay_money;
				this.order_id = item.order_id;
				var signstr = "openid=" + this.openid + "&order_id=" + this.order_id + "";
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.wx_orderscancel(this.openid, this.order_id, md)
				console.log(res)
				if (res.result == 1) {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success',
						duration: 500
					})
					this.$store.commit('ddPage', 1)
					this.getData()
				}
			},
			// 支付
			async pay() {
				var signstr = "openid=" + this.openid + "&order_id=" + this.order_id + "&pay_type=" + this.pay_type +
					"";
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.wx_orderspay(this.openid, this.order_id, this.pay_type, md);
				console.log(res)
				if (res.result == 1) {
					if (this.pay_type == 3) {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'success',
							duration: 1000
						})
						this.zjgmShow = false;
						this.tabsChange(this.current)
					} else if (this.pay_type == 1) {
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: res.payment.timestamp.toString(),
							nonceStr: res.payment.nonceStr,
							package: res.payment.package,
							signType: 'MD5',
							paySign: res.payment.paySign,
							success: function(res) {
								console.log('success:' + JSON.stringify(res));
							},
							fail: function(err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
					}
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
			goTo() {
				uni.switchTab({
					url: '/pages/wode/wode'
				})
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.allList = [];
				this.dfkList = [];
				this.dfhList = [];
				this.dshList = [];
				this.ywcList = [];
				this.swiperCurrent = index;
				this.current = index;
				this.swiperCurrentIndex = index;
				console.log('tabsChange')
				this.orders_status = index - 1;
				this.$store.commit('ddPage', 1)
				this.getData()
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			// animationfinish(e) {
			// 	console.log('animationfinish')
			// 	let current = e.detail.current;
			// 	this.$refs.uTabs.setFinishCurrent(current);
			// 	this.swiperCurrent = current;
			// 	this.current = current;
			// 	// this.getData()
			// },
			// changeSwiper(e) {
			// 	this.allList = [];
			// 	this.dfkList = [];
			// 	this.dfhList = [];
			// 	this.dshList = [];
			// 	this.ywcList = [];
			// 	this.$store.commit('ddPage',1)
			// 	console.log('changeSwiper')
			// 	console.log(e.detail.current);
			// 	this.swiperCurrentIndex = e.detail.current;
			// 	// this.getData()

			// },
			getCurrentSwiperHeight(element) {
				let query = uni.createSelectorQuery().in(this);
				query.selectAll(element).boundingClientRect();
				query.exec((res) => {
					console.log(res)
					this.height = 50 + res[0][this.swiperCurrentIndex].height;
				})
			},
			lijigoumai(item) {
				this.pay_money = item.pay_money;
				this.order_id = item.order_id;
				this.zjgmShow = true;

			},
			closeZjgm() {
				this.zjgmShow = false
			},
			// 免单列表
			async miandan(ele){
				console.log(ele)
				const res = await this.$api.wx_freeordersubmit(this.openid,ele.sub_orderid)
				console.log(res)
				if (res.result == 1) {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success',
						url:'/pages/miandan/miandan',
						params:{
							sub_orderid:ele.sub_orderid,
						},
						duration:500
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
			// 售后
			toShenqinshouhou(item) {
				uni.navigateTo({
					url: `/shenqinshouhou/pages/shenqinshouhou?order_id=${item.order_id}`
				})
			},
			// 评价
			toPingjia(item) {
				uni.navigateTo({
					url: `/shenqinshouhou/pages/pingjia?order_id=${item.order_id}`
				})
			},
			// 收货
			async shouhuo(item) {
				var signstr = "openid=" + this.openid + "&order_id=" + item.order_id + "";
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.wx_orderconfirmreceipt(this.openid, item.order_id, md)
				console.log(res)
				if (res.result == 1) {
					console.log()
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success',
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			}
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
		.item.md{
			.title{
				display: flex;
				justify-content: space-between;
				.tit2-2{
					.tit2{
						margin-top: 20rpx;
						margin-bottom: 10rpx;
					}
				}
			}
		}
		.items {
			margin: 26rpx 22rpx;

			.item {
				width: 708rpx;
				// height: 362rpx;
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
						color: #000000;
					}

					.tit2 {
						opacity: 1;
						font-size: 22rpx;
						font-family: PingFang SC, PingFang SC-Bold;
						font-weight: 700;
						color: #94c5e6;
					}

				}

				.nav2 {
					margin: 38rpx 0;
					display: flex;
					align-items: center;
					// justify-content: space-between;

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

						.tit3 {
							width: 116rpx;
							height: 36rpx;
							opacity: 1;
							background: #ffffff;
							border: 2rpx solid #EBBFCC;
							border-radius: 20rpx;
							font-size: 18rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							text-align: center;
							color: #EBBFCC;
						}
					}

				}

				.nav3 {
					margin: 0 auto;
					height: 84rpx;
					border-bottom: 2rpx solid #eeeeee;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.tit1 {
						opacity: 1;
						font-size: 18rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						color: #000000;
					}

					.tit2 {
						width: 160rpx;
						height: 50rpx;
						background: #94c5e6;
						border-radius: 25rpx;
						opacity: 1;
						font-size: 18rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						text-align: center;
						color: #ffffff;
						line-height: 50rpx;
					}
				}

			}
		}
	}

	.zjgm {
		.container {
			position: absolute;
			width: 750rpx;
			height: 716rpx;
			opacity: 1;

			image {
				width: 100%;
				height: 100%;
			}

			.tit1 {
				position: absolute;
				top: 63rpx;
				left: 50%;
				transform: translateX(-50%);
				opacity: 1;
				font-size: 29rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Medium;
				font-weight: 500;
				text-align: center;
				color: #4a4a4a;
				line-height: 36rpx;
				font-weight: 800;
			}

			.close {
				position: absolute;
				top: 37rpx;
				right: 64rpx;
				width: 31rpx;
				height: 31rpx;
				opacity: 1;
			}

			.bottom {
				position: absolute;
				top: 150rpx;
				left: 50%;
				transform: translateX(-50%);
				width: 659rpx;
				opacity: 1;
				display: flex;
				align-items: center;

				.wx {
					position: relative;
					width: 621rpx;
					height: 125rpx;
					opacity: 1;

					.ditu {
						width: 100%;
						height: 200rpx;
					}

					.wxpic {
						position: absolute;
						top: 40rpx;
						left: 34rpx;
						width: 43rpx;
						height: 43rpx;
						opacity: 1;
					}

					.tit {
						position: absolute;
						top: 45rpx;
						left: 96rpx;
						opacity: 1;
						font-size: 22rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						text-align: left;
						color: #141313;
					}
				}

				.zfb {
					position: relative;
					width: 621rpx;
					height: 125rpx;
					opacity: 1;

					.ditu {
						width: 100%;
						height: 200rpx;
					}

					.wxpic {
						position: absolute;
						top: 40rpx;
						left: 34rpx;
						width: 43rpx;
						height: 43rpx;
						opacity: 1;
					}

					.tit {
						position: absolute;
						top: 45rpx;
						left: 96rpx;
						opacity: 1;
						font-size: 22rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						text-align: left;
						color: #141313;
					}
				}
			}
		}

		.footer {
			position: fixed;
			bottom: 0;
			background: #ebbfcc;
			width: 750rpx;
			height: 80rpx;
			opacity: 1;
			display: flex;
			justify-content: center;
			align-items: center;

			.tit {
				opacity: 1;
				font-size: 25rpx;
				font-family: SourceHanSansCN-Regular;
				text-align: center;
				color: #ffffff;
				line-height: 36rpx;
			}
		}
	}
</style>
