<template>
	<view class="index">
		<!-- 		<view class="nav">
			<u-icon @click="goTo" name="arrow-left" size="30"></u-icon>
			<text class="nav-title">好物上新</text>
			<image src="../../static/组12.png" class="pic" mode=""></image>
		</view> -->
		<view class="nav-1">
			<view class="nav-item">
				<view>综合</view>
				<image src="/static/路径181.png" mode=""></image>
				<view>价格升序</view>
				<image src="/static/路径181.png" mode=""></image>
				<view>价格降序</view>
				<image src="/static/路径181.png" mode=""></image>
			</view>
		</view>
		<view class="items">
			<view @tap="goToShangpinxiangqin(item.id)" class="item" v-for="item in list" :key="item.id">
				<image class="item-pic" :src="item.pic[0].name" mode=""></image>
				<view class="tit">
					{{item.title}}
				</view>
				<view class="tit-footer">
					<view class="price">￥{{item.price}}</view>
					<image class="pic1" src="/static/组15.png" mode=""></image>
					<image class="pic2" src="/static/组48.png" mode=""></image>
				</view>
			</view>
		</view>
		<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["page", "pageSize"]),
		},
		watch: {
			page: function(page) {
				console.log(123456)
				this.$store.commit("page", page);
				if (this.page != 1) {
					this.getData();
				}
			},
		},
		data() {
			return {
				list: [],
				total: null,
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
		onReachBottom() {
			this.$store.commit("page", this.page + 1);
		},
		onShow() {
			this.getData()
			this.$store.commit("page", 1);
			this.list = []
		},
		methods: {
			async getData() {
				this.status = 'loading';
				setTimeout(async () => {
					const res = await this.$api.wx_goodslist({
						page: this.page,
						pagesize: this.pageSize,
						keyword: '',
						is_new: 0,
						is_hot: 0,
						is_brand: 0,
						is_zone: 0
					})
					console.log(res)
					if (res.result == 1) {
						if (res.total == 0) {
							this.list = []
						}
						if (!res.list) {
							this.status = 'nomore'
						} else {
							this.status = 'loadmore';
							this.list = this.list.concat(res.list)
						}
						this.total = res.total;
					}
				}, 200)

			},
			goTo() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			goToShangpinxiangqin(id) {
				uni.navigateTo({
					url: `/pages/shangpinxiangqin/shangpinxiangqin?id=${id}`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.index {
		position: relative;
		padding-top: 60rpx;
		height: 100%;
		width: 100%;
	}

	.nav {
		margin: 0rpx 50rpx 0rpx 46rpx;

		.nav-title {
			opacity: 1;
			font-size: 36rpx;
			font-family: SourceHanSansCN-Regular;
			color: #121212;
			margin-left: 23rpx;
		}

		.pic {
			margin-left: 391rpx;
			width: 34rpx;
			height: 34rpx;
			opacity: 1;
		}
	}

	.nav-1 {
		margin-left: calc(1.82 * 214rpx);

		.nav-item {
			display: flex;
			align-items: center;

			// justify-content: space-around;
			view {
				opacity: 1;
				font-size: calc(1.82 * 11rpx);
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: left;
				color: #9b9b9b;
				letter-spacing: calc(1.82 * 1rpx);
			}

			image {
				margin: 0 calc(1.82 * 12rpx) 0 calc(1.82 * 7rpx);
				width: calc(1.82 * 4rpx);
				height: calc(1.82 * 6rpx);
				opacity: 1;
			}
		}
	}

	.items {
		margin: calc(1.82 * 11rpx) calc(1.82 * 29rpx) 0 calc(1.82 * 29rpx);
		width: calc(100% - calc(1.82 * 2 * 29rpx));
		// border: 2rpx solid red;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.item {
			width: calc(1.82 * 172rpx);
			margin-bottom: calc(1.82 * 20rpx);

			.item-pic {
				width: calc(1.82 * 172rpx);
				height: calc(1.82 * 172rpx);
				opacity: 1;
			}

			.tit {
				font-size: calc(1.82 * 12rpx);
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: calc(1.82 * 400);
				text-align: left;
				color: #121314;
				line-height: calc(1.82 * 15rpx);
				letter-spacing: calc(1.82 * 1rpx);
			}

			.tit-footer {
				display: flex;
				margin-top: calc(1.82 * 8rpx);
				align-items: center;

				.price {
					opacity: 1;
					font-size: calc(1.82 * 17rpx);
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: calc(1.82 * 700);
					text-align: left;
					color: #af0000;
				}

				.pic1 {
					width: calc(1.82 * 12rpx);
					height: calc(1.82 * 17rpx);
					opacity: 1;
					margin-left: calc(1.82 * 59rpx);
				}

				.pic2 {
					width: calc(1.82 * 16rpx);
					height: calc(1.82 * 17rpx);
					opacity: 1;
					margin-left: calc(1.82 * 23rpx);
				}
			}
		}
	}
</style>
