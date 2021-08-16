<template>
	<view class="index">
		<view class="nav1">
			<u-icon v-if='searchVal ==""' class='icon' name="search" color="#999999" size="32"></u-icon>
			<u-input placeholder="搜索服务" :clearable='false' :custom-style='inputStyle' input-align='center'
				v-model="searchVal" type="text" />
		</view>
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item,index) in tabbar" :key="index" class="u-tab-item"
					:class="[current==index ? 'u-tab-item-active' : '']" :data-current="index"
					@tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.name}}</text>
				</view>
			</scroll-view>
			<block v-for="(item,index) in tabbar" :key="index">
				<scroll-view scroll-y class="right-box" v-if="current==index">
					<view v-if="item.myStatus == 1" class="page-view">
						<view class="class-item">
							<view class="item-title">
								<text>{{item.name}}</text>
							</view>
							<view class="item-container">
								<view class="thumb-box" v-for="(item1, index1) in item.foods" :key="index1">
									<image class="item-menu-image" :src="item1.icon" mode=""></image>
									<!-- <image class="item-menu-image" src="../../static/img/dengzi.png" mode=""></image> -->
									<view class="item-menu-name">{{item1.name}}</view>
								</view>
							</view>
						</view>
					</view>
					<view v-else class="page-view">
						<view class="class-item">
							<view class="item-title2">
								<text>{{item.name}}</text>
							</view>
							<view class="item-container">
								<view class="thumb-box2" v-for="(item1, index1) in item.foods" :key="index1">
									<image class="item-menu-image2" :src="item1.icon" mode=""></image>
									<!-- <image class="item-menu-image" src="../../static/img/dengzi.png" mode=""></image> -->
									<view class="box-right">
										<view class="txt1">{{item1.name}}</view>
										<view class="txt2">已服务8012次</view>
										<view class="txt3">￥118起</view>
									</view>
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
	export default {
		data() {
			return {
				searchVal: '',
				inputStyle: {
					background: '#ffffff',
					borderRadius: '46rpx',
					height: '65rpx',
					margin: '0 20rpx',
				},
				//
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				tabbar: [{
						"name": "热门推荐",
						'myStatus':1,
						"foods": [{
								"name": "A床体安装",
								"key": "A床体安装",
								"icon": "../../static/img/dengzi.png",
								"cat": 10
							},
							{
								"name": "床体安装",
								"key": "床体安装",
								"icon": "../../static/img/dengzi.png",
								"cat": 10
							},
							{
								"name": "床体安装",
								"key": "床体安装",
								"icon": "../../static/img/dengzi.png",
								"cat": 10
							},
							{
								"name": "床体安装",
								"key": "床体安装",
								"icon": "../../static/img/dengzi.png",
								"cat": 10
							},

						]
					},
					{
						"name": "美食",
						'myStatus':1,
						"foods": [{
								"name": "火锅",
								"key": "火锅",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/1.jpg",
								"cat": 6
							},
							{
								"name": "糕点饼干",
								"key": "糕点饼干",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/2.jpg",
								"cat": 6
							},
							{
								"name": "坚果果干",
								"key": "坚果果干",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/3.jpg",
								"cat": 6
							},
							{
								"name": "酒类",
								"key": "酒类",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/4.jpg",
								"cat": 6
							},
							{
								"name": "辣条",
								"key": "辣条",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/5.jpg",
								"cat": 6
							},
							{
								"name": "大礼包",
								"key": "大礼包",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/6.jpg",
								"cat": 6
							},
							{
								"name": "精品茗茶",
								"key": "茶",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/7.jpg",
								"cat": 6
							},
							{
								"name": "休闲食品",
								"key": "休闲食品",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/8.jpg",
								"cat": 6
							},
							{
								"name": "糖果巧克力",
								"key": "糖果巧克力",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/9.jpg",
								"cat": 6
							},
							{
								"name": "方便速食",
								"key": "方便速食",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/10.jpg",
								"cat": 6
							},
							{
								"name": "营养代餐",
								"key": "营养代餐",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/11.jpg",
								"cat": 6
							},
							{
								"name": "粮油副食",
								"key": "粮油",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/12.jpg",
								"cat": 6
							},
							{
								"name": "生鲜水果",
								"key": "水果",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/13.jpg",
								"cat": 6
							},
							{
								"name": "饮品",
								"key": "饮品",
								"icon": "https://cdn.uviewui.com/uview/common/classify/2/14.jpg",
								"cat": 6
							}
						]
					},
					{
						"name": "日常保洁",
						'myStatus':2,
						"foods": [{
								"name": "A床体安装",
								"key": "A床体安装",
								"icon": "../../static/img/dengzi.png",
								"cat": 10
							},
							{
								"name": "床体安装",
								"key": "床体安装",
								"icon": "../../static/img/dengzi.png",
								"cat": 10
							},
							{
								"name": "床体安装",
								"key": "床体安装",
								"icon": "../../static/img/dengzi.png",
								"cat": 10
							},
							{
								"name": "床体安装",
								"key": "床体安装",
								"icon": "../../static/img/dengzi.png",
								"cat": 10
							},{
								"name": "床体安装",
								"key": "床体安装",
								"icon": "../../static/img/dengzi.png",
								"cat": 10
							},
							{
								"name": "床体安装",
								"key": "床体安装",
								"icon": "../../static/img/dengzi.png",
								"cat": 10
							},

						]
					},
				]
			}
		},
		methods: {
			getImg() {
				return Math.floor(Math.random() * 35);
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if (index == this.current) return;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
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

<style lang="scss">
	page {
		background: #F2F3F5;
	}
</style>
<style scoped lang="scss">
	.index {}

	.nav1 {
		position: relative;
		margin-top: 28rpx;
		margin-bottom: 20rpx;

		.icon {
			position: absolute;
			z-index: 2;
			top: 50%;
			left: 252rpx;
			transform: translateY(-50%);
		}
	}

	// 
	.u-wrap {
		height: calc(100vh);
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 30rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
		font-family: Segoe UI;
	}

	.u-tab-item-active {
		position: relative;
		color: #4D8BFD;
		font-size: 32rpx;
		font-weight: 600;
		font-family: Segoe UI;
		// background: #fff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		// background-color: rgb(250, 250, 250);
		width: 546rpx;
		// height: 928rpx;
		height: calc(100vh - 140rpx);
		margin-right: 24rpx;
		border-radius: 16rpx;
		// margin-bottom: 38rpx;
		background-color: #fff;
	}

	.page-view {
		// padding: 16rpx;
	}

	.class-item {
		background-color: #fff;
		padding: 0 30rpx;
		border-radius: 8rpx;
	}

	.item-title {
		padding-top: 26rpx;
		font-size: 26rpx;
		font-weight: bold;
		margin-bottom: 42rpx;
		margin-left: 14rpx;
	}
	.item-title2{
		padding-top: 26rpx;
		font-size: 26rpx;
		font-weight: bold;
		margin-bottom: 42rpx;
		color: #666666;
	}

	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
	}

	.item-container {
		display: flex;
		flex-wrap: wrap;
		// justify-content: space-between;
	}

	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		// margin-top: 20rpx;
		margin-bottom: 42rpx;
	}
	.thumb-box2{
		width: 100%;
		display: flex;
		margin-bottom: 22rpx;
		.item-menu-image2 {
			width: 184rpx;
			height: 184rpx;
		}
		.box-right{
			display: flex;
			flex-direction: column;
			margin-left: 12rpx;
			justify-content: space-between;
			.txt1{
				font-size: 28rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 38rpx;
				color: #000000;
			}
			.txt2{
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 28rpx;
				color: #666666;
			}
			.txt3{
				font-size: 28rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 38rpx;
				color: #4D8BFD;
			}
		}
	}

	.item-menu-image {
		width: 125rpx;
		height: 125rpx;
		margin-bottom: 6rpx;
	}
</style>
