<template>
	<view class="index">
		<!-- <view class="nav">
			<u-icon @click="goTo" name="arrow-left" size="40"></u-icon>
			<text class="nav-title">男装专区</text>
			<image src="../../static/组12.png" class="pic" mode=""></image>
		</view> -->
		<view class="nav-footer">
			<view class="tit1">综合</view>
			<image src="../../static/组14.png" class="pic1" mode=""></image>
			<view class="tit2"></view>
			<image src="../../static/组13.png" class="pic2" mode=""></image>
			<view class="tit3"></view>
			<view class="tit4" @tap="changeShow">筛选</view>
		</view>
		<view class="items">
			<template v-if="total!=0">
				<view @click="toXiangqin(item.id)" class="item" v-for="(item,i) in list" :key="i">
					<image class="item-pic" :src="item.pic[0].name" mode=""></image>
					<view class="tit">
						{{item.title}}
					</view>
					<view class="tit-footer">
						<view class="price">￥{{item.price}}</view>
						<image class="pic1" src="../../static/组15.png" mode=""></image>
					</view>
				</view>
			</template>
			<!-- 			<view v-else>
				没有更多了~~~
			</view> -->
		</view>
		<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
		<view class="popup">
			<u-popup v-model="show" width="476rpx" mode="right">
				<view class="items">
					<view class="item" v-if="service.length>0">
						<view class="tit">服务</view>
						<view class="btns">
							<button @click="onSearchBtn1(item)" v-for="item in service" :key='item.id'
								:class="{'btn':true,'active':item.id == fuwu}" type="default">{{item.title}}</button>
						</view>
					</view>
					<view class="item">
						<view class="tit">分类</view>
						<view class="btns">
							<button @click="onSearchBtn2(item)" v-for="item in classifylist" :key='item.id'
								:class="{'btn':true,'active':item.id == fenlei}" type="default">{{item.title}}</button>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
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
		onReachBottom() {
			this.$store.commit("page", this.page + 1);
		},
		onShow() {
			this.getData()
			this.$store.commit("page", 1);
			this.list = []
		},
		data() {
			return {
				show: false,
				list: [],
				total: null,
				option: null,
				// 分类
				classifylist: [],
				classify_id: '',
				fenlei: '',
				// 服务
				service: [],
				serviceObj: null,
				fuwu: '',
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
		async onLoad(option) {
			this.option = option
			console.log(option)
			// this.getData()
			const res2 = await this.$api.wx_search()
			console.log(res2)
			if (option.keyword) {
				this.service = res2.service;
				wx.setNavigationBarTitle({
					title: '商品列表'
				})
			} else {
				wx.setNavigationBarTitle({
					title: option.navTitle
				})
			}
			this.classifylist = res2.classifylist;
		},
		methods: {
			async getData() {
				if (this.serviceObj) {
					this.status = 'loading';
					setTimeout(async () => {
						const res = await this.$api.wx_goodslist({
							...this.option,
							classify_id: this.classify_id,
							page: this.page,
							pagesize: this.pageSize,
							...this.serviceObj,
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
								console.log(this.list)
								this.list = this.list.concat(res.list)
							}
							// this.list = res.list;
							this.total = res.total;
							// this.show = false
						}
					}, 200)
				} else {
					this.status = 'loading';
					setTimeout(async () => {
						const res = await this.$api.wx_goodslist({
							...this.option,
							classify_id: this.classify_id,
							page: this.page,
							pagesize: this.pageSize,
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
								console.log(this.list, 'list')
								this.list = this.list.concat(res.list)
							}
							this.total = res.total;
							// this.show = false
						}
					}, 200)
				}

			},
			toXiangqin(id) {
				uni.navigateTo({
					url: `/pages/shangpinxiangqin/shangpinxiangqin?id=${id}`
				})
			},
			goTo() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			changeShow() {
				this.show = true
			},
			// 服务
			onSearchBtn1(item) {
				console.log(item)
				if (item.id == this.fuwu) {
					this.serviceObj = {
						is_zone: 0,
						is_brand: 0,
						is_new: 0,
						is_hot: 0
					}
					this.fuwu = ''
				} else {
					if (item.id == 4) {
						this.serviceObj = {
							is_zone: 1,
							is_brand: 0,
							is_new: 0,
							is_hot: 0
						}
						this.fuwu = item.id
					} else if (item.id == 3) {
						this.serviceObj = {
							is_zone: 0,
							is_brand: 1,
							is_new: 0,
							is_hot: 0
						}
						this.fuwu = item.id
					} else if (item.id == 2) {
						this.serviceObj = {
							is_zone: 0,
							is_brand: 0,
							is_new: 1,
							is_hot: 0
						}
						this.fuwu = item.id
					} else if (item.id == 1) {
						this.serviceObj = {
							is_zone: 0,
							is_brand: 0,
							is_new: 0,
							is_hot: 1
						}
						this.fuwu = item.id
					}
				}
				console.log(this.serviceObj)
				this.getData()
			},
			// 分类
			onSearchBtn2(item) {
				if (item.id == this.fenlei) {
					this.fenlei = ''
					this.classify_id = '';
				} else {
					this.fenlei = item.id;
					this.classify_id = item.id;
				}
				this.getData()
			},
		}
	}
</script>

<style scoped lang="scss">
	.index {
		// padding-top: 60rpx;
		height: 100%;
		width: 100%;
	}

	.nav {
		margin-left: calc(1.82 * 28rpx);

		.nav-title {
			opacity: 1;
			font-size: calc(1.82 * 20rpx);
			font-family: SourceHanSansCN-Regular;
			text-align: left;
			color: #121212;
		}

		.pic {
			margin-left: 391rpx;
			width: 34rpx;
			height: 34rpx;
			opacity: 1;
		}
	}

	.nav-footer {
		margin-top: 28rpx;
		height: 74rpx;
		width: 100%;
		border: 2rpx solid #e8e8e8;
		display: flex;
		align-items: center;

		.tit1 {
			margin-left: 90rpx;
			opacity: 1;
			font-size: 33rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: left;
			color: #9b9b9b;
			letter-spacing: 2rpx;
		}

		.pic1 {
			margin: 0 32rpx 0 226rpx;
			width: 33rpx;
			height: 31rpx;
			opacity: 1;
		}

		.tit2 {
			width: 2rpx;
			height: 47rpx;
			opacity: 1;
			background: #d8d8d8;
		}

		.pic2 {
			margin: 0 48rpx 0 32rpx;
			width: 33rpx;
			height: 33rpx;
			opacity: 1;
		}

		.tit3 {
			width: 2rpx;
			height: 74rpx;
			opacity: 1;
			background: #d8d8d8;
		}

		.tit4 {
			margin-left: 64rpx;
			opacity: 1;
			font-size: 27rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: left;
			color: #121314;
			letter-spacing: 1rpx;
		}
	}

	.items {
		margin: 86rpx 33rpx 0 33rpx;
		width: calc(100% - 65rpx);
		// border: 2rpx solid red;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.item {
			width: calc(1.82 * 172rpx);
			margin-bottom: calc(1.82 * 20rpx);

			.item-pic {
				width: 328rpx;
				height: 420rpx;
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
					font-size: 36rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					text-align: left;
					color: #ebbfcc;
					line-height: 76rpx;
				}

				.pic1 {
					width: 24rpx;
					height: 34rpx;
					opacity: 1;
					margin-left: 156rpx;
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

	.popup {
		.items {
			.item {
				.tit {
					opacity: 1;
					font-size: 34rpx;
					font-family: SourceHanSansCN-Regular;
					text-align: left;
					color: #121212;
					line-height: 53rpx;
				}

				.btns {
					margin: 28rpx 0 0 0;
					padding: 0;
					width: 476rpx;
					display: flex;
					flex-wrap: wrap;

					.btn {
						margin: 0 10rpx 14rpx 0;
						width: 208rpx;
						height: 58rpx;
						background: #f0f0f0;
						font-size: 22rpx;
						font-family: SourceHanSansCN-Regular;
					}

					.btn.active {
						margin: 0 10rpx 14rpx 0;
						width: 208rpx;
						height: 58rpx;
						background: #ffffff;
						font-size: 22rpx;
						font-family: SourceHanSansCN-Regular;
						border: 2rpx solid #EBBFCC;
						color: #EBBFCC;
					}
				}

			}
		}
	}
</style>
