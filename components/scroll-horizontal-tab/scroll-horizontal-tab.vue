<!-- 横向滑动的tab 列表 -->
<template>
	<view>
		<scroll-view class="scroll-h" :scroll-x="true" :show-scrollbar="false"
			:style="{ borderColor: tabViewBorderColor }">
			<view v-for="(tab, index) in tabBars" :key="tab.id" :class="tabIndex == index ? 'uni-tab-item-active' : ''"
				class="uni-tab-item" :data-current="index" @click="onTabTap">
				<text class="uni-tab-item-title" :class="tabIndex == index ? 'uni-tab-item-title-active' : ''"
					:style="[tabIndex == index ? { color: tabItemTitleActiveColor, borderColor: tabItemTitleActiveBorderColor } : { color: tabItemTitleColor }]">
					{{ tab.name }}
				</text>
			</view>
		</scroll-view>
	</view>
</template>
<script>
	export default {
		name: 'scrollHorizontalTab',
		props: {
			// tab列表
			tabBars: {
				type: Array,
				require: true
			},

			// 默认选中的tab 下标
			tabIndexInit: {
				type: Number,
				default: 0
			},

			// tabItem标题文字默认颜色
			tabItemTitleColor: {
				type: String,
				default: '#707070'
			},
			// tabItem标题文字默认底边颜色
			tabViewBorderColor: {
				type: String,
				default: '#eaeaea'
			},

			// tabItem标题选中文字颜色
			tabItemTitleActiveColor: {
				type: String,
				default: '#ffffff'
			},

			// tabItem标题选中文字底边颜色
			tabItemTitleActiveBorderColor: {
				type: String,
				default: '#DD2638'
			}
		},
		data() {
			return {
				tabIndex: this.tabIndexInit
			};
		},
		methods: {
			onTabTap(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				if (this.tabIndex != index) {
					this.tabIndex = index;
					this.$emit('onTabTap', this.tabBars[index]);
				}
			}
		}
	};
</script>

<style>
	/* 隐藏滚动条，但依旧具备可以滚动的功能 */
	scroll-view ::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}

	.scroll-h {
		background: #f7f7f7;
		padding-top: 34rpx;
		/* line-height: 101rpx; */
		height: 101rpx;
		display: flex;
		flex-direction: row;
		white-space: nowrap;
		border-color: #dddddd;
		border-bottom-style: solid;
		border-bottom-width: 1rpx;
	}

	.uni-tab-item {
		/* width: 200upx; */
		position: relative;
		display: inline-block;
		flex-wrap: nowrap;
		margin: 0 14rpx 0 32rpx;
		text-align: center;
		padding: 0 20rpx;
		height: 40rpx;
	}

	
	.uni-tab-item-active {
		
		height: 40rpx;
		opacity: 1;
		background: #dd2638;
		border-radius: 20rpx;
		text-align: center;
	}

	.uni-tab-item-title {
		color: #555;
		font-size: 24rpx;
		width: 200upx;
		/* border-bottom: 2rpx solid #eaeaea; */
		/* 		padding-left: 30upx;
		padding-right: 30upx;
		padding-bottom: 15upx; */
	}

	.uni-tab-item-title-active {
		text-align: center;
		color: #ffffff;
		font-size: 24rpx;
		/* 		border-color: #DD2638;
		border-bottom-style: solid; */
		/* font-weight: bold; */
		border-bottom-width: 2rpx;
	}
</style>
