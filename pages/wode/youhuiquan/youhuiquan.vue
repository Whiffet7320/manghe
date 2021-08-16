<template>
	<view class="index">
		<view class="container">
			<u-toast ref="uToast" />
			<u-tabs-swiper bg-color="#ffffff" font-size="25" gutter="40" inactive-color="#000000" bar-height="6"
				bar-width="40" active-color="#4988FD" ref="uTabs" :list="list" :current="current" @change="tabsChange"
				:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			<swiper :style="[{height: height + 'px'}]" :current="swiperCurrent">
				<swiper-item @touchmove.stop class="swiper-item" v-for="(item, index) in list" :key="index">
					<scroll-view @scrolltolower="lower" scroll-y='true' style="height: 90vh;">
						<view class="items">
							<!-- {{item.name}} -->
							<!-- 未使用 -->
							<template v-if="swiperCurrent == 0">
								<view class="item" v-for="item in 3">
									<image class="pic1" src="../../../static/img/zu22.png" mode=""></image>
									<view class="txt1">现金券</view>
									<view class="txt2">
										<view class="txt2-1">￥<text class="big">20</text></view>
										<view class="txt2-2">满280元可用</view>
									</view>
									<view class="txt3">20元通用券</view>
									<view class="txt4">2021.07.06-2021.08.06</view>
									<view class="txt5">全站通用</view>
									<view class="txt6">可转赠</view>
									<view class="xuxian"></view>
									<view class="txt7">
										<image class="pic1" src="../../../static/img/zhuanfa.png" mode=""></image>
										<view class="txt7-1">转赠好友</view>
									</view>
									<view class="shixian"></view>
									<view class="txt8">全国通用</view>
								</view>
							</template>
							<!-- 已使用 -->
							<template v-if="swiperCurrent == 1">
								<view class="item" v-for="item in 8">
									<image class="pic1" src="../../../static/img/zu24.png" mode=""></image>
									<view class="txt1">现金券</view>
									<view class="txt2">
										<view class="txt2-1">￥<text class="big">20</text></view>
										<view class="txt2-2">满280元可用</view>
									</view>
									<view class="txt3">20元通用券</view>
									<view class="txt4">2021.07.06-2021.08.06</view>
									<view class="txt5">全站通用</view>
									<view class="txt6">已使用</view>
									<view class="xuxian"></view>
									<view class="txt7">
										<image class="pic1" src="../../../static/img/zhuanfa.png" mode=""></image>
										<view class="txt7-1">转赠好友</view>
									</view>
									<view class="shixian"></view>
									<view class="txt8">全国通用</view>
								</view>
							</template>
							<!-- 已过期 -->
							<template v-if="swiperCurrent == 2">
								<view class="item" v-for="item in 4">
									<image class="pic1" src="../../../static/img/zu24.png" mode=""></image>
									<view class="txt1">现金券</view>
									<view class="txt2">
										<view class="txt2-1">￥<text class="big">20</text></view>
										<view class="txt2-2">满280元可用</view>
									</view>
									<view class="txt3">20元通用券</view>
									<view class="txt4">2021.07.06-2021.08.06</view>
									<view class="txt5">全站通用</view>
									<view class="txt6">已过期</view>
									<view class="xuxian"></view>
									<view class="txt7">
										<image class="pic1" src="../../../static/img/zhuanfa.png" mode=""></image>
										<view class="txt7-1">转赠好友</view>
									</view>
									<view class="shixian"></view>
									<view class="txt8">全国通用</view>
								</view>
							</template>
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
			...mapState(["youhuiquanPage", "youhuiquanPageSize"]),
		},
		watch: {
			youhuiquanPage: function(page) {
				console.log('ddpage')
				this.$store.commit("youhuiquanPage", page);
				if (this.youhuiquanPage != 1) {
					this.getData();
				}
			},
		},
		onLoad(option) {
			this.orders_status = option.orders_status
			this.current = +option.orders_status + 1;
			console.log(this.current)
		},
		data() {
			return {
				zhifuId: null,
				total_price: 0,
				zffangshiId: 1,
				pay_money: 0,
				openid: '',
				orders_status: -1,
				// 是否免单
				is_free: 0,
				mylist: [],
				pay_type: 1,
				zjgmShow: false,
				isH5: false,
				swiperCurrentIndex: 0,
				height: 0,
				list: [{
					name: '未使用(0)'
				}, {
					name: '已使用(0)'
				}, {
					name: '已过期(10)'
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
			this.$store.commit("youhuiquanPage", 1);
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
		// 	this.$store.commit("youhuiquanPage", this.youhuiquanPage + 1);
		// },
		methods: {
			async getData() {
				console.log(1111111)
				this.status = 'loading';
				console.log(this.orders_status, 'order')
				const res = await this.$api.orderIndex({
					page: this.youhuiquanPage,
					limit: this
						.youhuiquanPageSize,
					order_status: this
						.orders_status
				});
				// this.mylist = res.list;
				console.log(res)
				if (res.code == 200) {
					setTimeout(() => {
						if (!res.data.data) {
							this.status = 'nomore'
						} else {
							this.status = 'loadmore';
							if (this.orders_status == -1) {
								this.allList = this.allList.concat(res.data.data)
							} else if (this.orders_status == 1) {
								this.dfkList = this.dfkList.concat(res.data.data)
							} else if (this.orders_status == 2) {
								this.dfhList = this.dfhList.concat(res.data.data)
							} else if (this.orders_status == 3) {
								this.dshList = this.dshList.concat(res.data.data)
							} else if (this.orders_status == 4) {
								this.ywcList = this.ywcList.concat(res.data.data)
							}
							console.log(this.allList)
						}
						if (res.data.data) {
							if (res.data.data.length < this.youhuiquanPageSize) {
								this.status = 'nomore'
							}
						}

					}, 200)
				}
				setTimeout(() => {
					this.getCurrentSwiperHeight('.items');
				}, 500)
			},
			// 时间戳转日期
			formatDate(now) {
				var now = new Date(now);
				var year = now.getFullYear(); //取得4位数的年份
				var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
				var date = now.getDate(); //返回日期月份中的天数（1到31）
				var hour = now.getHours(); //返回日期中的小时数（0到23）
				var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
				var second = now.getSeconds(); //返回日期中的秒数（0到59）
				return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
			},
			// 点击图片跳转至购物车
			toxiangqin(item) {
				console.log(item)
				uni.navigateTo({
					url: `/pages/shangpinxiangqin/shangpinxiangqin?id=${item.goods_id}`
				})
			},
			zffangshi(i) {
				this.zffangshiId = i
			},
			lower() {
				this.$store.commit("youhuiquanPage", this.youhuiquanPage + 1);
			},
			// 提交售后
			toTijiaoshouhou(item) {
				uni.navigateTo({
					url: `/shenqinshouhou/pages/tijiaoshenqing?order_id=${item.order_id}`
				})
			},
			// 取消支付
			async deldd(item) {
				console.log(item)
				this.allList = [];
				this.dfkList = [];
				this.dfhList = [];
				this.dshList = [];
				this.ywcList = [];
				const res = await this.$api.orderCancel_order(item.id)
				console.log(res)
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: res.message,
						type: 'success',
						duration: 500
					})
					this.$store.commit('youhuiquanPage', 1)
					this.getData()
				}
			},
			goTo() {
				uni.switchTab({
					url: '/pages/wode/wode'
				})
			},
			// tabs通知swiper切换
			tabsChange(index) {
				console.log(index);
				if (index == 1) {
					this.orders_status = 1
				} else if (index == 2) {
					this.orders_status = 2
				} else if (index == 3) {
					this.orders_status = 3
				} else if (index == 4) {
					this.orders_status = 4
				} else if (index == 0) {
					this.orders_status = -1
				}
				this.allList = [];
				this.dfkList = [];
				this.dfhList = [];
				this.dshList = [];
				this.ywcList = [];
				this.swiperCurrent = index;
				this.current = index;
				this.swiperCurrentIndex = index;
				console.log('tabsChange')
				this.$store.commit('youhuiquanPage', 1)
				this.getData()
			},
			getCurrentSwiperHeight(element) {
				let query = uni.createSelectorQuery().in(this);
				query.selectAll(element).boundingClientRect();
				query.exec((res) => {
					console.log(res, 'res', this.swiperCurrentIndex)
					this.height = 50 + res[0][this.swiperCurrentIndex].height;
				})
			},
			async pay() {
				const that = this;
				const res = await this.$api.orderPay2order({
					order_id: this.zhifuId,
					pay_way: this.zffangshiId == 1 ? 'wechat' : 'balance',
					mini: 1,
				})
				if (res.code == 200) {
					if (this.zffangshiId == 1) {
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: res.data.timeStamp.toString(),
							nonceStr: res.data.nonceStr,
							package: res.data.package,
							signType: res.data.signType,
							paySign: res.data.paySign,
							success: function(res) {
								that.zfcgShow = true;
								this.getData()
								that.zjgmShow = false;
								console.log('success:' + JSON.stringify(res));
							},
							fail: function(err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
					} else {
						that.zfcgShow = true;
						this.getData()
						that.zjgmShow = false;
					}
				} else {
					this.$refs.uToast.show({
						title: res.message,
						type: 'warning',
						duration: 1000
					})
					that.zjgmShow = false;
				}
			},
			async lijigoumai(ele, id) {
				this.zjgmShow = true
				this.total_price = 0;
				ele.forEach(item => {
					this.total_price += Number(item.total_price);
				})
				this.zhifuId = id
			},
			zaixiayidan(ele, id) {
				uni.navigateTo({
					url: `/pages/index/shangpinxiangqin/lijigoumai?ddshopArr=${JSON.stringify(ele)}&orderId=${id}`
				})
			},
			// 免单列表
			async miandan(ele) {
				console.log(ele)
				const res = await this.$api.wx_freeordersubmit(this.openid, ele.sub_orderid)
				console.log(res)
				if (res.result == 1) {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success',
						url: '/pages/miandan/miandan',
						params: {
							sub_orderid: ele.sub_orderid,
						},
						duration: 500
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
				if (item.is_examine == -1) {
					uni.navigateTo({
						url: `/shenqinshouhou/pages/shenqinshouhou?order_id=${item.order_id}`
					})
				} else {
					uni.navigateTo({
						url: `/shenqinshouhou/pages/tijiaoshenqing?order_id=${item.order_id}`
					})
				}

			},
			// 评价
			toPingjia(item, ele) {
				console.log(item, ele)
				uni.navigateTo({
					url: `/pages/wode/wodeQuanbudingdan/pingjia?order_id=${item.id}&product_id=${ele.product_id}`
				})
			},
			// 收货
			async shouhuo(item) {
				console.log(item)
				const res = await this.$api.orderConfirm_deliver(item.id)
				console.log(res)
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: res.message,
						type: 'success',
					})
					this.allList = [];
					this.dfkList = [];
					this.dfhList = [];
					this.dshList = [];
					this.ywcList = [];
					this.getData()
				} else {
					this.$refs.uToast.show({
						title: res.message,
						type: 'warning',
					})
				}
			}
		},
	}
</script>

<style lang="scss">
	page{
		background: #F2F3F5;
	}
</style>
<style scoped lang="scss">
	.index {}

	.container {}

	.items {
		margin-top: 36rpx;

		.item {
			margin: 0 20rpx 16rpx 20rpx;
			position: relative;
			width: 710rpx;
			height: 240rpx;

			.pic1 {
				position: absolute;
				width: 710rpx;
				height: 240rpx;
			}

			.txt1 {
				position: absolute;
				left: 16rpx;
				top: 4rpx;
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 28rpx;
				color: #FFFFFF;
				opacity: 1;
			}

			.txt2 {
				position: absolute;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 226rpx;
				height: 178rpx;
				.txt2-1 {
					height: 88rpx;
					font-size: 22rpx;
					font-family: Microsoft Himalaya;
					font-weight: 400;
					// line-height: 144rpx;
					color: #FFFFFF;
					opacity: 1;

					.big {
						font-size: 120rpx;
					}
				}

				.txt2-2 {
					font-size: 20rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 28rpx;
					color: #FFFFFF;
					opacity: 1;
				}
			}
			.txt3{
				position: absolute;
				top: 14rpx;
				left: 250rpx;
				font-size: 28rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 38rpx;
				color: #000000;
				opacity: 1;
			}
			.txt4{
				position: absolute;
				top: 66rpx;
				left: 250rpx;
				font-size: 28rpx;
				font-family: Microsoft Himalaya;
				font-weight: 400;
				line-height: 34rpx;
				color: #707070;
				opacity: 1;
			}
			.txt5{
				position: absolute;
				top: 96rpx;
				left: 250rpx;
				font-size: 22rpx;
				font-family: Microsoft Himalaya;
				font-weight: 400;
				line-height: 26rpx;
				color: #707070;
				opacity: 1;
			}
			.txt6{
				transform: rotate(45deg);
				position: absolute;
				top: 16rpx;
				right: 6rpx;
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 28rpx;
				color: #FFFFFF;
				opacity: 1;
			}
			.xuxian{
				position: absolute;
				top: 140rpx;
				right: 22rpx;
				width: 436rpx;
				height: 0px;
				border: 1rpx dashed #E6E6E6;
				opacity: 1;
			}
			.txt7{
				position: absolute;
				top: 146rpx;
				left: 250rpx;
				display: flex;
				align-items: center;
				height: 30rpx;
				.pic1{
					width: 28rpx;
					height: 28rpx;
				}
				.txt7-1{
					margin-left: 34rpx;
					font-size: 20rpx;
					font-family: Microsoft Himalaya;
					font-weight: 400;
					color: #707070;
					opacity: 1;
				}
			}
			.shixian{
				position: absolute;
				top: 178rpx;
				right: 0rpx;
				width: 478rpx;
				height: 0px;
				border: 1px solid #E6E6E6;
				opacity: 1;
			}
			.txt8{
				position: absolute;
				top: 198rpx;
				left: 16rpx;
				font-size: 22rpx;
				font-family: Microsoft Himalaya;
				font-weight: 400;
				line-height: 26rpx;
				color: #707070;
				opacity: 1;
			}
		}
	}
</style>
