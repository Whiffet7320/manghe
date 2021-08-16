<template>
	<view class="index">
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
						<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
		
					</view>
				</scroll-view>
		
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				swiperCurrentIndex: 0,
				height: 0,
				list: [{
					name: '反馈问题'
				}, {
					name: '我的反馈'
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
		methods:{
			// tabs通知swiper切换
			tabsChange(index) {
				console.log(index);
				this.swiperCurrent = index;
				this.current = index;
				this.swiperCurrentIndex = index;
				this.getCurrentSwiperHeight('.items')
			},
			getCurrentSwiperHeight(element) {
				let query = uni.createSelectorQuery().in(this);
				query.selectAll(element).boundingClientRect();
				query.exec((res) => {
					console.log(res, 'res', this.swiperCurrentIndex)
					this.height = 50 + res[0][this.swiperCurrentIndex].height;
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F3F5;
	}
</style>
<style scoped lang="scss">
</style>
