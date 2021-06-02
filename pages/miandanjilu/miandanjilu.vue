<template>
	<view class="index">
		<!-- 		<view class="nav">
			<u-icon @click="goTo" name="arrow-left" size="30"></u-icon>
			<view class="nav-title">免单记录</view>
			<image src="../../static/组12.png" class="pic" mode=""></image>
		</view> -->
		<view class="container">
			<view class="items">
				<view class="item" v-for="(item,i) in list" :key='i'>
					<view class="nav1">
						<view class="tit1">{{item.pay_time}}</view>
						<!-- <image class="pic1" src="../../static/组34.png" mode=""></image> -->
					</view>
					<view class="nav2">
						<image class="pic1" :src="item.goods_pic" mode=""></image>
						<view class="tit">
							<view class="tit1">{{item.goods_title}}</view>
							<view class="tit2">
								<view class="tit1">￥{{item.pay_money}}</view>
								<view class="tit2">×{{item.goods_num}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["mdPage", "mdPageSize"]),
		},
		watch: {
			mdPage: function(page) {
				this.$store.commit("mdPage", page);
				if(this.mdPage != 1){
					this.getData();
				}
			},
		},
		data() {
			return {
				openid: '',
				list:[],
				total:null,
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
		async onShow() {
			this.openid = uni.getStorageSync('openid');
			this.getData()
			this.$store.commit("mdPage", 1);
			this.list = []
		},
		onReachBottom() {
			this.$store.commit("mdPage", this.mdPage + 1);
		},
		methods: {
			async getData() {
				this.status = 'loading';
				setTimeout(async () => {
					const res = await this.$api.wx_freeorderrecord(this.openid, this.mdPage, this
						.mdPageSize);
					console.log(res)
					this.total = res.total;
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
				}, 200)

			},
			goTo() {
				uni.switchTab({
					url: "/pages/index/index"
				})
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
		display: flex;
		align-items: center;
		height: 36rpx;
		margin: 0rpx 50rpx 0 46rpx;

		.nav-title {
			margin-left: 23rpx;
			opacity: 1;
			font-size: 36rpx;
			font-family: SourceHanSansCN-Regular;
			text-align: left;
			color: #121212;
			line-height: 71rpx;
		}

		.pic {
			margin-left: 391rpx;
			width: 34rpx;
			height: 34rpx;
			opacity: 1;
		}
	}

	.container {
		.items {
			.item {
				margin: 0 49rpx;

				.nav1 {
					margin-top: 42rpx;
					padding-bottom: 18rpx;
					border-bottom: 2rpx solid #ececec;
					display: flex;
					justify-content: space-between;

					.tit1 {
						opacity: 1;
						font-size: 18rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						text-align: left;
						color: #9b9b9b;
						letter-spacing: 1rpx;
					}

					.pic1 {
						width: 22rpx;
						height: 25rpx;
						opacity: 1;
					}
				}

				.nav2 {
					display: flex;
					margin-top: 22rpx;
					height: 163rpx;

					.pic1 {
						width: 228rpx;
						height: 163rpx;
						opacity: 1;
					}

					.tit {
						width: 430rpx;

						.tit1 {
							opacity: 1;
							font-size: 25rpx;
							font-family: PingFang SC, PingFang SC-Bold;
							font-weight: 700;
							text-align: left;
							color: #121314;
							letter-spacing: 2rpx;
						}

						.tit2 {
							margin-top: 13rpx;
							height: 36rpx;
							display: flex;
							align-items: center;
							justify-content: space-between;

							.tit1 {
								opacity: 1;
								font-size: 25rpx;
								font-family: PingFang SC, PingFang SC-Bold;
								font-weight: 700;
								text-align: left;
								color: #ebbfcc;
								letter-spacing: 2rpx;
							}

							.tit2 {
								opacity: 1;
								font-size: 25rpx;
								font-family: PingFang SC, PingFang SC-Bold;
								font-weight: 700;
								text-align: right;
								color: #121314;
								letter-spacing: 2rpx;
							}
						}
					}

				}


			}
		}
	}
</style>
