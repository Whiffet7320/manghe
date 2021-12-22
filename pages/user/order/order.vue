<template>
	<view class="index">
		<u-toast ref="uToast" />
		<u-tabs-swiper gutter='80' bg-color="#f7f8fa" height='80' font-size="28" inactive-color="#000000" bar-height="4"
			bar-width="64" active-color="#D61D1D" ref="uTabs" :list="list" :current="current" @change="tabsChange"
			:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		<swiper :style="[{height: height + 'px'}]" :current="swiperCurrent" @animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
				<scroll-view scroll-y='true'>
					<view class="nav5Items">
						<!-- <view v-for="item in orderList" :key='item.id'>
							
						</view> -->
						<!-- 已完成 -->
						<view class="item">
							<image src="/static/image/zu1998.png" class="pic1" mode=""></image>
							<view class="right">
								<view class="tit1">
									<view class="txt1">阳澄湖大闸蟹<u-icon style='margin-left: 20rpx;' name="arrow-right" color="#808080" size="28"></u-icon></view>
									
									<view class="txt2">订单已完成</view>
								</view>
								<view class="tit2">
									<view class="txt1">规格：<text style="margin-left: 4rpx;">母蟹5两</text></view>
									<view class="txt2">x1</view>
								</view>
								<view class="tit3">
									<view class="txt1">下单时间：2021-12-06</view>
									<view class="txt2">实付<text style="font-weight: 700;">￥50.00</text></view>
								</view>
								<view class="btns">
									<view class="btn2">再来一单</view>
									<view class="btn1" @click="toWuliu" style="margin-left: 20rpx;">查看物流</view>
									<view class="btn1">删除订单</view>
								</view>
							</view>
						</view>
						<!-- 待收货 -->
						<view class="item">
							<image src="/static/image/zu1998.png" class="pic1" mode=""></image>
							<view class="right">
								<view class="tit1">
									<view class="txt1">阳澄湖大闸蟹<u-icon style='margin-left: 20rpx;' name="arrow-right" color="#808080" size="28"></u-icon></view>
									
									<view class="txt2">待收货</view>
								</view>
								<view class="tit2">
									<view class="txt1">规格：<text style="margin-left: 4rpx;">母蟹5两</text></view>
									<view class="txt2">x1</view>
								</view>
								<view class="tit3">
									<view class="txt1">下单时间：2021-12-06</view>
									<view class="txt2">实付<text style="font-weight: 700;">￥50.00</text></view>
								</view>
								<view class="btns">
									<view class="btn2">确认收货</view>
									<view class="btn1" style="margin-left: 20rpx;">查看物流</view>
								</view>
							</view>
						</view>
						<!-- 待发货 -->
						<view class="item">
							<image src="/static/image/zu1998.png" class="pic1" mode=""></image>
							<view class="right">
								<view class="tit1">
									<view class="txt1">阳澄湖大闸蟹<u-icon style='margin-left: 20rpx;' name="arrow-right" color="#808080" size="28"></u-icon></view>
									<view class="txt2">待发货</view>
								</view>
								<view class="tit2">
									<view class="txt1">规格：<text style="margin-left: 4rpx;">母蟹5两</text></view>
									<view class="txt2">x1</view>
								</view>
								<view class="tit3">
									<view class="txt1">下单时间：2021-12-06</view>
									<view class="txt2">实付<text style="font-weight: 700;">￥50.00</text></view>
								</view>
								<view class="btns">
									<view class="btn2">提醒发货</view>
								</view>
							</view>
						</view>
						<u-loadmore v-if='swiperCurrent == index' :status="status" />
					</view>
				</scroll-view>

			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["dingdanPage", "dingdanPageSize"]),
		},
		watch: {
			dingdanPage: function(page) {
				console.log('ddpage')
				this.$store.commit("dingdanPage", page);
				if (this.dingdanPage != 1) {
					this.getData();
				}
			},
			// current:function(){
			// 	this.orderList = [];
			// 	this.$store.commit("dingdanPage", 1);
			// 	this.getData()
			// 	setTimeout(() => {
			// 		this.getCurrentSwiperHeight('.nav5Items')
			// 	}, 900)
			// },
		},
		data() {
			return {
				orderList: [],
				swiperCurrentIndex: 0,
				height: 0,
				list: [{
					name: '全部订单'
				}, {
					name: '待发货'
				}, {
					name: '待收货'
				}, {
					name: '已完成'
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
		onShow() {
			// this.getData()
			this.orderList = [];
			this.$store.commit("dingdanPage", 1);
			// this.tabsChange(this.current);
		},
		onReachBottom() {
			this.$store.commit("dingdanPage", this.dingdanPage + 1);
		},
		mounted() {
			setTimeout(() => {
				this.getCurrentSwiperHeight('.nav5Items')
			}, 900)
		},
		methods: {
			async getData() {
				this.status = 'loading';
				setTimeout(async () => {
					const res = await this.$api.orderList({
						page: this.dingdanPage,
						limit: this.dingdanPageSize,
						type: this.current == 0 ? '' : this.current == 1 ? '0' : this.current ==
							3 ? '4' : ''
					})
					console.log(res.data)
					if (res.data.length == 0) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
						this.orderList = this.orderList.concat(res.data)
					}
					this.orderList.forEach(ele => {
						if (ele.stop_time) {
							this.mygetdate(ele.stop_time, ele)
						}
					})
				}, 200)
				console.log(this.orderList)
			},
			toWuliu(){
				uni.navigateTo({
					url:'/pages/user/order/wuliu'
				})
			},
			// tabs通知swiper切换
			tabsChange(index) {
				console.log(index);
				this.swiperCurrent = index;
				this.swiperCurrentIndex = index;
				this.current = index;
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

	.index {}

	/deep/ .u-scroll-view {
		padding: 14rpx 30rpx 0 30rpx;
		height: 112rpx;
	}

	.nav5Items {
		padding: 0 30rpx;

		.item {
			margin-bottom: 20rpx;
			width: 690rpx;
			height: 278rpx;
			background: #ffffff;
			border-radius: 12rpx;
			box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(0, 0, 0, 0.16);
			display: flex;
			align-items: center;
			padding: 0 28rpx 0 16rpx;
			.pic1 {
				width: 248rpx;
				height: 248rpx;
			}

			.right {
				margin-top: 18rpx;
				margin-left: 18rpx;
				.tit1 {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.txt1 {
						font-size: 32rpx;
						font-weight: 700;
						color: #0f0f0f;
					}

					.txt2 {
						font-size: 24rpx;
						font-weight: 500;
						color: #808080;
					}
				}
				.tit2{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 12rpx;
					.txt1{
						font-size: 24rpx;
						font-weight: 500;
						color: #808080;
					}
					.txt2{
						font-size: 24rpx;
						font-weight: 500;
						color: #808080;
					}
				}
				.tit3{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 10rpx;
					.txt1{
						font-size: 20rpx;
						font-weight: 500;
						color: #808080;
					}
					.txt2{
						font-size: 20rpx;
						font-weight: 500;
						color: #000000;
					}
				}
				.btns{
					width: 380rpx;
					margin-top: 34rpx;
					display: flex;
					flex-direction: row-reverse;
					align-items: center;
					.btn1{
						width: 112rpx;
						height: 44rpx;
						border: 2rpx solid #f2f2f2;
						border-radius: 8rpx;
						font-size: 20rpx;
						font-weight: 500;
						text-align: center;
						line-height: 40rpx;
						color: #000000;
					}
					.btn2{
						margin-left: 20rpx;
						width: 112rpx;
						height: 44rpx;
						border: 2rpx solid #d61d1d;
						border-radius: 8rpx;
						font-size: 20rpx;
						font-weight: 500;
						text-align: center;
						line-height: 40rpx;
						color: #d61d1d;
					}
				}
			}
		}
	}
</style>
