<template>
	<view class="shop">
		<view class="top">
			<u-toast ref="uToast" />
			<u-input class="shop-search" placeholder="搜一搜" placeholder-style="color: #000000" input-align="center"
				height="60" border-color="#ebbfcc" v-model="searchVal" type="text"  />
			<image @click="onSearch" class="search-icon" src="../../static/search.png" mode=""></image>
		</view>
		<view class="banner">
			<u-swiper :list="swiperList"></u-swiper>
		</view>
		<view class="items">
			<view class="item" @tap="toNewGood">
				<view class="item-cir">
					<view class="circle">
						<image src="../../static/活动专区.png" mode=""></image>
					</view>
				</view>
				<view class="circle-title">
					好物上新
				</view>
			</view>
			<view class="item" @tap="toMiandanjilu">
				<view class="item-cir">
					<view class="circle">
						<image src="../../static/新手指南.png" mode=""></image>
					</view>
				</view>
				<view class="circle-title">
					免单记录
				</view>
			</view>
			<view class="item" @tap="toYaoqinhaoyou">
				<view class="item-cir">
					<view class="circle">
						<image src="../../static/公告.png" mode=""></image>
					</view>
				</view>
				<view class="circle-title">
					邀请好友
				</view>
			</view>
		</view>
		<view class="hots-arr">
			<view class="hot-list" @tap="toZhuanqu(item)" v-for="item in bannerlist" :key="item.title">
				<view class="hots">
					<image class="hotImg" :src="item.img" mode=""></image>
					<view class="bigT">{{item.title}}</view>
					<view class="smallT">{{item.sub_title}}</view>
				</view>
			</view>
			<!-- <view class="hot-list">
				<view class="hots">
					<view class="bigT">热卖榜单</view>
					<view class="smallT">TOP精选单品</view>
				</view>
			</view>
			<view class="hot-list">
				<view class="hots">
					<view class="bigT">热卖榜单</view>
					<view class="smallT">TOP精选单品</view>
				</view>
			</view>
			<view class="hot-list">
				<view class="hots">
					<view class="bigT">热卖榜单</view>
					<view class="smallT">TOP精选单品</view>
				</view>
			</view> -->
		</view>
		<view class="container">
			<view class="nav1">
				<view class="tit1">
					<view class="tit1-1"></view>
					<view class="tit1-2">大牌推荐</view>
				</view>
				<view class="tit2">
					<view class="tit2-1">更多</view>
					<u-icon name="arrow-right" color="#9b9b9b" size="20"></u-icon>
				</view>
			</view>
			<view class="nav2">
				<scroll-view class="scroll-view" scroll-x @scroll="scroll" style="width: 100%;white-space:nowrap;">
					<image @click="toXiangqin(item.id)" v-for="(item,i) in list" class="pic1" :src="item.img" mode="">
					</image>
				</scroll-view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchVal: '',
				bannerList: [
					'../../static/hongbaobanner.png',
					'../../static/img@2x.png'
				],
				swiperList: [],
				bannerlist: [],
				list: [],
			}
		},
		onLoad() {

		},
		created() {
			this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$api.wx_index()
				console.log(res)
				this.swiperList = [res.swiperList.first_pic, res.swiperList.second_pic, res.swiperList.third_pic]
				this.bannerlist = res.bannerlist;
				this.list = res.list;
			},
			onSearch() {
				if (this.searchVal != '') {
					uni.navigateTo({
						url: `/pages/nanzhuanzhuanqu/nanzhuanzhuanqu?keyword=${this.searchVal}`
					})
				} else {
					this.$refs.uToast.show({
						title: '请输入关键词再搜索',
						type: 'warning',
						duration:1000,
					})
				}

			},
			scroll: function(e) {
				// console.log(e)
				// this.old.scrollTop = e.detail.scrollTop
			},
			toNewGood() {
				console.log(123)
				uni.navigateTo({
					url: '/pages/index/newGoodThings'
				})
			},
			toZhuanqu(item) {
				console.log(item)
				if (item.id == 1) {
					uni.navigateTo({
						url: `/pages/nanzhuanzhuanqu/nanzhuanzhuanqu?is_hot=1&navTitle=热卖榜单`
					})
				} else if (item.id == 2) {
					uni.navigateTo({
						url: '/pages/nanzhuanzhuanqu/nanzhuanzhuanqu?is_new=1&navTitle=新品上新'
					})
				} else if (item.id == 3) {
					uni.navigateTo({
						url: '/pages/nanzhuanzhuanqu/nanzhuanzhuanqu?is_brand=1&navTitle=国际大牌'
					})
				} else if (item.id == 4) {
					uni.navigateTo({
						url: '/pages/nanzhuanzhuanqu/nanzhuanzhuanqu?is_zone=1&navTitle=男装专区'
					})
				}
				// uni.navigateTo({
				// 	url: '/pages/nanzhuanzhuanqu/nanzhuanzhuanqu'
				// })
			},
			toMiandanjilu() {
				uni.navigateTo({
					url: '/pages/miandanjilu/miandanjilu'
				})
			},
			toYaoqinhaoyou() {
				uni.navigateTo({
					// url:'/pages/yaoqinghaoyou/yaoqinghaoyou'
					url: '/yaoqinghaoyou/pages/yaoqinghaoyou'
				})
			},
			toXiangqin(id) {
				uni.navigateTo({
					url: `/pages/shangpinxiangqin/shangpinxiangqin?id=${id}`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.top {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 49rpx;

		.shop-search {
			width: 658rpx;
			height: 60rpx;
			opacity: 1;
			border: 2rpx solid #ebbfcc;
			border-radius: 30rpx;
		}

		.search-icon {
			width: 34rpx;
			height: 34rpx;
			opacity: 1;
			margin-left: 28rpx;
		}
	}

	.banner {
		margin: 0 auto;
		margin-top: 26rpx;
		width: 720rpx;
		height: 250rpx;
		opacity: 1;
		background: rgba(0, 0, 0, 0.00);

		image {
			height: 100%;
			width: 100%;
		}
	}

	.items {
		margin-top: 26rpx;
		display: flex;
		justify-content: space-around;

		.item {
			opacity: 1;

			.item-cir {
				width: 120rpx;
				height: 120rpx;
				border: 2rpx solid #ebbfcc;
				border-radius: 60rpx;
			}

			.circle {
				margin: 8rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 102rpx;
				height: 102rpx;
				border-radius: 51rpx;
				background-color: #ebbfcc;

				image {
					width: 52rpx;
					height: 52rpx;
					opacity: 1;
				}
			}

			.circle-title {
				margin-top: 16rpx;
				opacity: 1;
				font-size: 20rpx;
				font-family: SourceHanSansCN-Regular;
				text-align: center;
				color: #333333;
				line-height: 30rpx;
			}
		}
	}

	.hots-arr {
		// margin: 0 22rpx 0 22rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;

		.hot-list {
			overflow: hidden;
			margin-top: 30rpx;
			width: 354rpx;
			height: 236rpx;
			opacity: 1;
			// background: url(../../static/img.png) no-repeat;
			background-size: 100% 100%;
			position: relative;

			.hots {
				margin-top: 36rpx;
				margin-left: 36rpx;

				.hotImg {
					position: absolute;
					top: 0;
					left: 0;
					width: 354rpx;
					height: 236rpx;
				}

				.bigT {
					position: absolute;
					top: 33rpx;
					left: 33rpx;
					width: 128rpx;
					heiFght: 32rpx;
					opacity: 1;
					font-size: 32rpx;
					color: #ff0300;
					line-height: 48rpx;
					font-weight: bold;
				}

				.smallT {
					position: absolute;
					top: 80rpx;
					left: 33rpx;
					width: 144rpx;
					height: 24rpx;
					opacity: 1;
					font-size: 24rpx;
					text-align: left;
					color: #9b9b9b;
					line-height: 36rpx;
				}
			}
		}
	}

	.container {
		.nav1 {
			margin: 27rpx 54rpx;
			display: flex;
			justify-content: space-between;

			.tit1 {
				display: flex;
				align-items: center;

				.tit1-1 {
					width: 4rpx;
					height: 22rpx;
					opacity: 1;
					background: #121212;
				}

				.tit1-2 {
					margin-left: 8rpx;
					opacity: 1;
					font-size: 24rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					text-align: left;
					color: #121314;
				}
			}

			.tit2 {
				display: flex;
				align-items: center;

				.tit2-1 {
					opacity: 1;
					font-size: 18rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					color: #9b9b9b;
					margin-right: 12rpx;
				}
			}
		}

		.nav2 {
			margin: 14rpx 37rpx;

			.pic1 {
				width: 246rpx;
				height: 259rpx;
				opacity: 1;
				margin-left: 13rpx;
			}

		}

	}
</style>
