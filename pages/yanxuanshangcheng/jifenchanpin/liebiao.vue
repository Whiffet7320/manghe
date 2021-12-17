<template>
	<view class="index">
		<view class="nav1">
			<view class="item" @click="changeRad(1)">
				<view :class='{"txt":true,"active":RadIndex==1}'>综合</view>
				<image class="pic" v-if="RadIndexs == 1" src="/static/image/zu1564.png" mode=""></image>
				<image class="pic" v-if="RadIndexs == 2" src="/static/image/zu1567.png" mode=""></image>
			</view>
			<view class="item" @click="changeRad(2)">
				<view :class='{"txt":true,"active":RadIndex==2}'>价格</view>
				<image class="pic" v-if="RadIndexss == 1" src="/static/image/zu1564.png" mode=""></image>
				<image class="pic" v-if="RadIndexss == 2" src="/static/image/zu1567.png" mode=""></image>
			</view>
		</view>
		<view class="nav2">
			<view class="item" v-for="item in shopList" :key='item.id'>
				<image class="pic" :src="item.image" mode=""></image>
				<view class="right">
					<view class="up">
						<view class="txt1">{{item.title}}</view>
						<view class="txt2" v-if="item.productAttr">规格：{{item.productAttr[0].attr_values[0]}}</view>
					</view>
					<view class="down">
						<view class="d-left">
							<image class="d-pic" src="/static/image/zu1577.png" mode=""></image>
							<view class="d-txt">{{item.price}}积分</view>
						</view>
						<view @click="toDuihuan(item)" class="d-right">立即兑换</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" font-size="22" />
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["jifenShopPage", "jifenShopPageSize"]),
		},
		watch: {
			jifenShopPage: function(page) {
				console.log('ddpage')
				this.$store.commit("jifenShopPage", page);
				if (this.jifenShopPage != 1) {
					this.getShopData();
				}
			},
		},
		data() {
			return {
				order:"id desc",
				RadIndex: 1,
				RadIndexs:1,
				RadIndexss:1,
				iscle:false,
				iscles:false,
				shopList:[],
				// 加载
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '上拉加载更多',
					loading: '正在加载...',
					nomore: '没有了更多了'
				},
			}
		},
		onLoad() {
			this.shopList = [];
			this.$store.commit("jifenShopPage", 1);
			this.getData()
		},
		onReachBottom() {
			this.$store.commit("jifenShopPage", this.jifenShopPage + 1);
		},
		methods: {
			async getData() {
				this.status = 'loading';
				setTimeout(async () => {
					const res = await this.$api.store_integralList({
						order:this.order,
						page:this.jifenShopPage,
						limit:this.jifenShopPageSize
					})
					if (res.data.length == 0) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
						this.shopList = this.shopList.concat(res.data)
					}
				}, 200)
			},
			changeRad(val) {
				this.RadIndex = val;
				if(val==1){
					this.iscle = !this.iscle;
					this.RadIndexs = this.iscle?1:2;
					this.order = this.iscle?"id asc":"id desc";
				}else if(val==2){
					this.iscles = !this.iscles;
					this.RadIndexss = this.iscles?1:2;
					this.order = this.iscles?"price desc":"price asc";
				}
				this.shopList = [];
				this.getData();
			},
			toDuihuan(item) {
				uni.navigateTo({
					url: `/pages/yanxuanshangcheng/jifenchanpin/chanpin?id=${item.id}`
				})
			}
		}
	}
</script>

<style>
	page {
		background: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	/deep/ .u-load-more-wrap {
		width: 686rpx;
		height: 100rpx !important;
	}
	.index {}

	.nav1 {
		padding: 0 90rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;

		.item {
			height: 80rpx;
			display: flex;
			align-items: center;

			.txt {
				font-size: 24rpx;
				font-weight: bold;
				color: #707070;
			}

			.txt.active {
				color: #BD9E81;
			}

			.pic {
				margin-left: 14rpx;
				height: 18rpx;
				width: 12rpx;
			}
		}
	}

	.nav2 {
		.item {
			width: 750rpx;
			height: 226rpx;
			background: #FFFFFF;
			display: flex;
			align-items: center;
			padding: 0 40rpx 0 36rpx;
			margin-bottom: 20rpx;

			.pic {
				width: 186rpx;
				height: 186rpx;
				border-radius: 8rpx;
			}

			.right {
				margin-left: 20rpx;
				width: 468rpx;
				height: 186rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.up {
					.txt1 {
						font-size: 28rpx;
						font-weight: 500;
						line-height: 40rpx;
						color: #BD9E81;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.txt2 {
						margin-top: 8rpx;
						font-size: 20rpx;
						font-weight: 400;
						line-height: 28rpx;
						color: #707070;
					}
				}

				.down {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.d-left {
						display: flex;
						align-items: center;

						.d-pic {
							width: 32rpx;
							height: 32rpx;
						}

						.d-txt {
							margin-left: 6rpx;
							font-size: 32rpx;
							font-weight: bold;
							color: #FA8677;
						}
					}

					.d-right {
						width: 160rpx;
						height: 60rpx;
						background: #CAB19A;
						border-radius: 40rpx;
						font-size: 28rpx;
						font-weight: bold;
						line-height: 60rpx;
						text-align: center;
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>
