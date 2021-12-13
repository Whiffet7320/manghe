<template>
	<view>
		<u-toast ref="uToast" />
		<view class="navbar">
			<view class="navbar_item" :class="{'on':current==-1}" @click="tabChange(-1)">
				<text class="text">全部</text>
				<u-badge type="error" :count="numObj.statusAll" :offset="[10,20]" class="badge"></u-badge>
			</view>
			<view class="navbar_item" :class="{'on':current==1}" @click="tabChange(1)">
				<text class="text">待发货</text>
				<u-badge type="error" :count="numObj.unshipped" :offset="[10,20]" class="badge"></u-badge>
			</view>
			<view class="navbar_item" :class="{'on':current==2}" @click="tabChange(2)"><text class="text">待收货</text>
			<u-badge type="error" :count="numObj.untake" :offset="[10,20]" class="badge"></u-badge>
			</view>
			<view class="navbar_item" :class="{'on':current==3}" @click="tabChange(3)"><text class="text">已完成</text>
			<u-badge type="error" :count="numObj.complete" :offset="[10,20]" class="badge"></u-badge>
			</view>
		</view>
		<u-gap height="88"></u-gap>
		<view class="orderlist">
			<view class="order_item" v-for="item in orderList">
				<view class="hd">
					<view class="left">下单时间：{{item.add_time}}</view>
					<view class="right">{{item.status_name == '未发货' ? '待发货' : item.status_name}}</view>
				</view>
				<view class="bd">
					<image :src="item.image" mode="aspectFill" class="img"></image>
					<view class="info">
						<view class="top">
							<view class="name">{{item.store_name}}</view>
							<view class="num">X1</view>
						</view>
						<view class="attr">{{item.suk}}</view>
						<view class="ft">
							<view class="left">{{item.total_price}}积分</view>
							<view class="right">{{item.total_price}}积分</view>
						</view>
					</view>
				</view>
				<view class="foot">
					<view class="no">
						<text>订单编号:{{item.order_id}}</text>
						<view @click="fuzhi(item.order_id)" class="light">复制</view>
					</view>
					<view class="toolbtn" v-if="item.status_name == '待收货'">
						<!-- <view class="combtn">取消订单</view> -->
						<view @click="shouhuo(item)" class="combtn on">确认收货</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" />
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["dingdanPage", "dingdanPageSize"]),
		},
		watch: {
			dingdanPage: function(page) {
				console.log('ddpage')
				this.$store.commit("dingdanPage", page);
				if (this.dingdanPage != 1) {
					this.getData();
				}
			},
		},
		data() {
			return {
				numObj:{},
				orderList: [],
				current: -1,
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
		onShow() {
			this.orderList = [];
			this.$store.commit("dingdanPage", 1);
			this.getData()
			this.getNum()
		},
		onReachBottom() {
			this.$store.commit("dingdanPage", this.dingdanPage + 1);
		},
		methods: {
			async getNum(){
				const res = await this.$api.store_integralOrderCount_num()
				console.log(res)
				this.numObj = res.data;
			},
			async getData() {
				this.status = 'loading';
				setTimeout(async () => {
					const res = await this.$api.store_integralOrderList({
						page: this.dingdanPage,
						limit: this.dingdanPageSize,
						status: this.current
					})
					console.log(res.data)
					if (res.data.length == 0) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
						this.orderList = this.orderList.concat(res.data)
					}
					this.orderList.forEach(ele => {
						if (ele.stop_time) {
							this.mygetdate(ele.stop_time, ele)
						}
					})
				}, 200)
				console.log(this.orderList)
			},
			async shouhuo(item) {
				const res = await this.$api.store_integralOrderTake({
					order_id:item.order_id
				})
				if (res.status == 200) {
					this.$refs.uToast.show({
						title: '收货成功',
						type: 'success',
						callback:()=>{
							this.orderList = [];
							this.$store.commit("dingdanPage", 1);
							this.getData()
						}
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
			fuzhi(e) {
				uni.setClipboardData({
					data: e,
				});
			},
			tabChange(index) {
				this.orderList = [];
				this.$store.commit("dingdanPage", 1);
				this.current = index;
				this.getData()
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
		height: 100rpx !important;
	}

	.navbar {
		width: 100%;
		height: 80rpx;
		background-color: #FFFFFF;
		margin-top: 2rpx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 50;

		.navbar_item {
			flex: 1;
			font-size: 28rpx;
			color: #707070;
			text-align: center;
			height: 100%;
			position: relative;

			.badge {
				background-color: #FA8677;
			}

			.text {
				display: inline-block;
				line-height: 80rpx;
			}

			&.on {
				.text {
					border-bottom: 2rpx #BD9E81 solid;
					color: #BD9E81;
				}
			}
		}
	}

	.orderlist {
		.order_item {
			background-color: #FFFFFF;
			margin-top: 20rpx;

			.hd {
				height: 90rpx;
				margin-left: 40rpx;
				padding-right: 40rpx;
				border-bottom: 2rpx #F7F8FA solid;
				display: flex;
				align-items: center;

				.left {
					flex: 1;
					font-size: 24rpx;
					color: #707070;
				}

				.right {
					font-size: 24rpx;
					color: #BD9E81;
				}
			}

			.bd {
				margin-left: 40rpx;
				border-bottom: 2rpx #F7F8FA solid;
				display: flex;
				padding: 28rpx 40rpx 34rpx 0;

				.img {
					width: 186rpx;
					height: 186rpx;
					background-color: #eee;
				}

				.info {
					flex: 1;
					padding-left: 24rpx;
					font-size: 24rpx;
					color: #707070;
					display: flex;
					flex-direction: column;

					.top {
						display: flex;
						justify-content: space-between;

						.name {
							width: 334rpx;
							height: 68rpx;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #707070;
						}
					}

					.attr {
						padding-top: 42rpx;
						padding-bottom: 8rpx;
					}

					.ft {
						display: flex;
						align-items: center;

						.left {
							flex: 1;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #707070;
						}

						.right {
							font-size: 28rpx;
							color: #FA8677;
						}
					}
				}
			}

			.foot {
				display: flex;
				flex-direction: column;
				margin-left: 40rpx;
				padding: 28rpx 40rpx 30rpx 0;
				border-top: 2rpx #F7F8FA solid;

				.no {
					font-size: 24rpx;
					color: #707070;
					display: flex;
					align-items: center;
					padding-bottom: 26rpx;

					.light {
						font-size: 24rpx;
						color: #BD9E81;
						padding-left: 20rpx;
					}
				}

				.toolbtn {
					display: flex;
					justify-content: flex-end;

					.combtn {
						width: 152rpx;
						height: 56rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 24rpx;
						color: #707070;
						border: 2rpx #B2B2B2 solid;
						border-radius: 10rpx;
						margin-left: 20rpx;

						&.on {
							border-color: #BD9E81;
							background-color: #BD9E81;
							color: #FFFFFF;
						}
					}
				}
			}
		}
	}
</style>
