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
								<view class="item" v-for="item in dataList" :key='item.id'>
									<image class="pic1" src="/static/img/zu22.png" mode=""></image>
									<view class="txt1">现金券</view>
									<view class="txt2">
										<view class="txt2-1">￥<text class="big">{{item.discount}}</text></view>
										<view class="txt2-2">满{{item.limit}}元可用</view>
									</view>
									<view class="txt3">{{item.discount}}元通用券</view>
									<view class="txt4">{{item.created_at}}-{{item.expiration_time}}</view>
									<view class="txt5">全站通用</view>
									<view class="txt6">可转赠</view>
									<view class="xuxian"></view>
									<view class="txt7">
										<image class="pic1" src="/static/img/zhuanfa.png" mode=""></image>
										<view class="txt7-1">转赠好友</view>
									</view>
									<view class="shixian"></view>
									<view class="txt8">全国通用</view>
								</view>
							</template>
							<!-- 已使用 -->
							<template v-if="swiperCurrent == 1">
								<view class="item" v-for="item in dataList" :key='item.id'>
									<image class="pic1" src="/static/img/zu24.png" mode=""></image>
									<view class="txt1">现金券</view>
									<view class="txt2">
										<view class="txt2-1">￥<text class="big">{{item.discount}}</text></view>
										<view class="txt2-2">满{{item.limit}}元可用</view>
									</view>
									<view class="txt3">{{item.discount}}元通用券</view>
									<view class="txt4">{{item.created_at}}-{{item.expiration_time}}</view>
									<view class="txt5">全站通用</view>
									<view class="txt6">已使用</view>
									<view class="xuxian"></view>
									<view class="txt7">
										<image class="pic1" src="/static/img/zhuanfa.png" mode=""></image>
										<view class="txt7-1">转赠好友</view>
									</view>
									<view class="shixian"></view>
									<view class="txt8">全国通用</view>
								</view>
							</template>
							<!-- 已过期 -->
							<template v-if="swiperCurrent == 2">
								<view class="item" v-for="item in dataList" :key='item.id'>
									<image class="pic1" src="/static/img/zu24.png" mode=""></image>
									<view class="txt1">现金券</view>
									<view class="txt2">
										<view class="txt2-1">￥<text class="big">{{item.discount}}</text></view>
										<view class="txt2-2">满{{item.limit}}元可用</view>
									</view>
									<view class="txt3">{{item.discount}}元通用券</view>
									<view class="txt4">{{item.created_at}}-{{item.expiration_time}}</view>
									<view class="txt5">全站通用</view>
									<view class="txt6">已过期</view>
									<view class="xuxian"></view>
									<view class="txt7">
										<image class="pic1" src="/static/img/zhuanfa.png" mode=""></image>
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
		data() {
			return {
				swiperCurrentIndex: 0,
				height: 0,
				// type:0,
				dataList:[],
				// dataList2:[],
				// dataList3:[],
				list: [{
					name: '未使用'
				}, {
					name: '已使用'
				}, {
					name: '已过期'
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
				}
			}
		},
		onShow() {
			this.tabsChange(this.current)
			this.$store.commit("youhuiquanPage", 1);
			// this.getData();
		},
		mounted() {
			this.getCurrentSwiperHeight('.items')
		},
		// onReachBottom() {
		// 	this.$store.commit("youhuiquanPage", this.youhuiquanPage + 1);
		// },
		methods:{
			async getData(){
				this.status = 'loading';
				setTimeout(async () => {
					const res = await this.$api.coupons({
						page: this.youhuiquanPage,
						limit: this.youhuiquanPageSize,
						type: this.current,
					})
					console.log(res)
					this.total = res.data.total;
					if (res.data.data.length == 0) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
						this.dataList = this.dataList.concat(res.data.data)
						// if(this.current == 0){
						// 	this.dataList1 = this.dataList1.concat(res.data.data)
						// }else if(this.current == 1){
						// 	this.dataList2 = this.dataList2.concat(res.data.data)
						// }else if(this.current == 2){
						// 	this.dataList3 = this.dataList3.concat(res.data.data)
						// }
					}
				}, 200)
			},
			lower() {
				this.$store.commit("youhuiquanPage", this.youhuiquanPage + 1);
			},
			// tabs通知swiper切换
			tabsChange(index) {
				console.log(index);
				this.swiperCurrent = index;
				this.current = index;
				this.swiperCurrentIndex = index;
				this.dataList = [];
				this.$store.commit("youhuiquanPage", 1);
				this.getData();
				setTimeout(()=>{
					this.getCurrentSwiperHeight('.items')
				},800)
			},
			getCurrentSwiperHeight(element) {
				let query = uni.createSelectorQuery().in(this);
				query.selectAll(element).boundingClientRect();
				query.exec((res) => {
					this.height = 50 + res[0][this.swiperCurrentIndex].height;
				})
			},
		}
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
					font-weight: 400;
					// line-height: 144rpx;
					color: #FFFFFF;
					opacity: 1;

					.big {
						font-size: 64rpx;
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
				top: 56rpx;
				left: 250rpx;
				font-size: 18rpx;
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
				font-weight: 400;
				line-height: 26rpx;
				color: #707070;
				opacity: 1;
			}
			.txt6{
				transform: rotate(45deg);
				position: absolute;
				top: 18rpx;
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
