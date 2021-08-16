<template>
	<view class="index">
		<view class="box1">
			<view class="tit1">搜索结果如下：</view>
			<view class="nav2">
				<view @click="toxiangqin(item)" class="box" v-for="(item,i) in shopList" :key='i'>
					<image class="pic1" :src="item.pic_arr[0].img" mode="">
					</image>
					<view class="title">{{item.title}}</view>
					<view class="nav1">
						<view class="nav1-1">￥{{item.sku_arr[0].price}}</view>
						<!-- <view class="nav1-2">销量100</view> -->
					</view>
				</view>
			</view>
			<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
		</view>
		<view class="tit2">猜你喜欢：</view>
		<view class="nav2">
			<view @click="toxiangqin(item)" class="box" v-for="(item,i) in cnxhList" :key='i'>
				<image class="pic1" :src="item.pic_arr[0].img" mode="">
				</image>
				<view class="title">{{item.title}}</view>
				<view class="nav1">
					<view class="nav1-1">￥{{item.sku_arr[0].price}}</view>
					<!-- <view class="nav1-2">销量100</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["sousuopage", "sousuopageSize"]),
		},
		watch: {
			sousuopage: function(page) {
				console.log('ddpage')
				this.$store.commit("sousuopage", page);
				if (this.sousuopage != 1) {
					this.getData();
				}
			},
		},
		onReachBottom() {
			this.$store.commit("sousuopage", this.sousuopage + 1);
		},
		data() {
			return {
				shopList: [],
				cnxhList:[],
				keyword: '',
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
		onLoad(option) {
			this.keyword = option.keyword;
		},
		async onShow() {
			this.shopList = [];
			this.getData()
			this.$store.commit("sousuopage", 1);
			// 猜你喜欢
			const res = await this.$api.indexRandom_product();
			console.log(res)
			this.cnxhList = res.data;
			this.cnxhList.forEach(ele=>{
				ele.pic_arr.forEach(item => {
					if (item.path.slice(0, 1) == ".") {
						item.path = item.path.substr(1);
					}
					item.img = item.domain + item.path;
				})
			})
		},
		methods: {
			async getData() {
				// 搜索后的商品列表
				this.status = 'loading';
				setTimeout(async () => {
					const res2 = await this.$api.indexProduct_list({
						// category_id: this.category_id,
						page: this.sousuopage,
						limit: this.sousuopageSize,
						keyword: this.keyword,
					})
					console.log(res2)
					res2.data.data.forEach(ele => {
						ele.pic_arr.forEach(item => {
							if (item.path.slice(0, 1) == ".") {
								item.path = item.path.substr(1);
							}
							item.img = item.domain + item.path;
						})
					})
					if (res2.data.data.length == 0) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
						console.log(this.shopList)
						this.shopList = this.shopList.concat(res2.data.data)
					}
				}, 200)
			},
		}
	}
</script>

<style scoped lang="scss">
	page {
		background: #f7f7f7;
	}

	.index {}

	.box1 {
		background: #ffffff;
		box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.10);

		.tit1 {
			margin: 44rpx 0 30rpx 34rpx;
			opacity: 1;
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: left;
			color: #000000;
			letter-spacing: -1rpx;
		}


	}

	.tit2 {
		margin: 48rpx 0 30rpx 34rpx;
		font-size: 28rpx;
		font-family: PingFang SC, PingFang SC-Bold;
		font-weight: 700;
		text-align: left;
		color: #000000;
		letter-spacing: -1rpx;
	}

	.nav2 {

		// margin: 0 0rpx;
		.box {
			display: inline-block;
			width: 330rpx;
			margin-left: 24rpx;

			.pic1 {
				width: 330rpx;
				height: 286rpx;
				opacity: 1;
				margin-left: 13rpx;
				margin-bottom: 16rpx;
			}

			.title {
				margin-left: 13rpx;
				padding: 0;
				width: 100%;
				opacity: 1;
				font-size: 22rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #121314;
				line-height: 27rpx;
				letter-spacing: 1rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.nav1 {
				display: flex;
				justify-content: space-between;

				.nav1-1 {
					margin-left: 13rpx;
					// width: 100%;
					opacity: 1;
					font-size: 31rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #af0000;
					line-height: 92rpx;
				}

				.nav1-2 {
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					text-align: right;
					color: #c7c7c7;
				}
			}

		}

		.scroll-view.y {
			display: flex;
			justify-content: space-around;
		}

	}
	/deep/ .u-load-more-wrap{
		padding-bottom: 20rpx;
	}
</style>
