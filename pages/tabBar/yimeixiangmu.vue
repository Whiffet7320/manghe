<template>
	<view class="category_wrap">
		<view class="menu_wrap">
			<scroll-view scroll-y scroll-with-animation class="tab_view menu_scroll_view" :scroll-top="scrollTop">
				<view v-for="(item,index) in tabbar" :key="index" class="tab_item"
					:class="[current == index ? 'tab_item_active' : '']" @tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.cate_name}}</text>
				</view>
			</scroll-view>
			<block v-for="(item,index) in tabbar" :key="index">
				<scroll-view class="rightbox" scroll-y v-if="current==index">
					<view class="pageview">
						<image :src="item.big_pic" mode="aspectFit" class="banner" v-if="item.big_pic"></image>
						<view class="list">
							<view class="thumb_item" v-for="(item1, index1) in item.children" :key="index1">
								<view class="thumb_box" @click="toSearchResult(item1.id)">
									<image class="image" :src="item1.big_pic" mode="aspectFill"></image>
									<view class="name u-line-1">{{item1.cate_name}}</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</block>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	export default {
		data() {
			return {
				tabIndex:'',
				tabbar:[],
				scrollTop: 0,
				current: 0,
				menuHeight: 0,
				menuItemHeight: 0,
				list:[]
			}
		},
		computed: {
			...mapState(["from"]),
		},
		onShow() {
			this.getData();
		},
		methods: {
			async getData(){
				const res = await this.$api.category();
				if(res.status==200){
					this.tabbar = res.data;
					this.tabbar.forEach((ele,i)=>{
						if(ele.id == this.from){
							this.swichMenu(i)
						}
					})
				}
			},
			toSearchResult(id){
				uni.navigateTo({
					url:`/pages/search/searchResult?sid=${id}`
				})
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if (index == this.current) return;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu_scroll_view', 'menuHeight');
					await this.getElRect('tab_item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.category_wrap{
		width: 100%;
		height: calc(100vh);
		display: flex;
		flex-direction: column;
	}
	.menu_wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
		background-color: #FFFFFF;
		.tab_view {
			width: 170rpx;
			height: 100%;
		}
		.tab_item {
			height: 122rpx;
			background: #FFFFFF;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			font-family: PingFang SC;
			font-size: 24rpx;
			color: #707070;
			font-weight: 400;
			line-height: 1;
		}
		.tab_item_active {
			position: relative;
			color: #BD9E81;
			font-weight: 600;
			background: #fcfaf9;
		}
		.tab_item_active::before {
			content: "";
			position: absolute;
			border-left: 8rpx solid #BD9E81;
			height: 122rpx;
			left: 0;
			top: 0;
		}
	}
	.rightbox{
		background-color: #F4F5F7;
		.pageview{
			padding:20rpx 24rpx;
			.banner{
				width: 100%;
				height: 180rpx;
				background-color: #eee;
			}
			.list {
				display: flex;
				flex-wrap: wrap;
				.thumb_item {
					width: 50%;
					box-sizing: border-box;
					&:nth-child(even) {
						padding-left: 20rpx;
					}
				}
				.thumb_box {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					margin-top: 20rpx;
					background: #FFFFFF;
					box-shadow: 0rpx 12rpx 40rpx rgba(0, 0, 0, 0.05);
					border-radius: 8rpx;
					.image{
						width: 100%;
						height: 256rpx;
					}
					.name{
						width: 100%;
						height: 88rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 28rpx;
						font-family: PingFang SC;
						color: #707070;
					}
				}
			}
		}
	}
</style>
