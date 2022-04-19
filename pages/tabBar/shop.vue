<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="nav11">
			<view class="nav1">
				<view v-for="(item,i) in fenleiList" :key='item.id' @click="changeIndex(i,item.id)"
					:class="{'txt':true,'active':nowIndex==i}">{{item.name}}</view>
				<!-- <view @click="changeIndex(2)" :class="{'txt':true,'active':nowIndex==2}">虚拟</view>
				<view @click="changeIndex(3)" :class="{'txt':true,'active':nowIndex==3}">餐厨</view>
				<view @click="changeIndex(4)" :class="{'txt':true,'active':nowIndex==4}">配件</view>
				<view @click="changeIndex(5)" :class="{'txt':true,'active':nowIndex==5}">服装</view>
				<view @click="changeIndex(6)" :class="{'txt':true,'active':nowIndex==6}">洗护</view> -->
			</view>
		</view>
		<view class="nav2">
			<view @click="toXq(item)" class="item" v-for="item in list" :key='item.shop_id'>
				<image :src="item.shop_img" class="n2-pic1" mode=""></image>
				<view class="n2-txt1">{{item.shop_name}}</view>
				<!-- 兑换 -->
				<view class="n2-txt2" v-if="type == 2">
					<view class="txttt1">价格：</view>
					<view class="txttt2">
						{{item.shop_price}}
						<image src="/static/img/tu1001.png" class="picc" mode=""></image>
					</view>
				</view>
				<!-- 置换 -->
				<template v-if="type == 1">
					<view class="n2-txt2">
						<view class="txttt1">补差价：</view>
						<view class="txttt2">
							{{item.shop_price_after}}
							<image src="/static/img/tu1001.png" class="picc" mode=""></image>
						</view>
					</view>
					<view class="n2-txt3">
						<view class="txttt1">原价：</view>
						<view class="txttt2">
							{{item.shop_price}}
							<image src="/static/img/tu1001.png" class="picc" mode=""></image>
						</view>
					</view>
				</template>

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
			...mapState(["dingdanPage"]),
		},
		data() {
			return {
				list: [],
				nowIndex: 0,
				type: '',
				fenleiList: [],
				shop_type: '',
				order: [],
				sum: '',
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
		onLoad(option) {
			this.type = option.type
			if (this.type == 2) {
				uni.setNavigationBarTitle({
					title: '兑换商城'
				})
			} else if (this.type == 1) {
				uni.setNavigationBarTitle({
					title: '置换商城'
				})
				this.order = option.order;
				this.sum = option.sum;
			}
		},
		onShow() {
			this.getFenlei()
			this.status = 'loading';
			setTimeout(() => {
				this.list = []
				this.$store.commit('dingdanPage', 1)
				this.getData()
			}, 1000)

		},
		onReachBottom() {
			this.$store.commit("dingdanPage", this.dingdanPage + 1);
			this.getData()
		},
		methods: {
			async getFenlei() {
				const res2 = await this.$api.getMallTop();
				this.fenleiList = res2.data
				this.shop_type = this.fenleiList[0].id
				console.log(this.shop_type)
			},
			async getData() {
				this.status = 'loading';
				const res = await this.$api.getShopBySubstitution({
					order: this.order,
					sum: this.sum,
					shop_type: this.shop_type,
					pagesize: 10,
					pagenum: this.dingdanPage,
				})
				console.log(res)
				if (res.status == 200) {
					if (res.data.data.length < 10) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
					}
					this.list = this.list.concat(res.data.data)
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
					this.list = []
				}

			},
			changeIndex(i, id) {
				this.nowIndex = i;
				this.shop_type = id;
				this.list = []
				this.$store.commit('dingdanPage', 1)
				this.getData()
			},
			toXq(item) {
				uni.navigateTo({
					url: `/pages/shop/shangpinxiangqin?type=${this.type}&id=${item.shop_id}&item=${JSON.stringify(item)}&order_id=${this.order}`
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #f7f7f7;
	}
</style>
<style lang="scss" scoped>
	/deep/ .u-load-more-wrap {
		padding: 20rpx 0;
		width: 100%;
	}

	.index {
		position: relative;
	}

	.nav11 {
		position: fixed;
		z-index: 2;
		width: 100vw;
		height: 110rpx;
		background: #f7f7f7;
	}

	.nav1 {
		// display: flex;
		width: 100vw;
		overflow-x: scroll;
		align-items: center;
		padding: 32rpx 30rpx;
		white-space: nowrap;
		// justify-content: space-between;

		.txt {
			display: inline-block;
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			color: #575656;
			margin-right: 56rpx;
		}

		.txt.active {
			font-size: 36rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			color: #333333;
			position: relative;
		}

		.txt.active:after {
			content: '';
			width: 36rpx;
			height: 6rpx;
			background: #02b3b6;
			border-radius: 4rpx;
			position: absolute;
			bottom: -10rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.nav2 {
		margin: 0 30rpx;
		padding-top: 130rpx;
		display: flex;
		flex-wrap: wrap;

		.item {
			width: 328rpx;
			// height: 412rpx;
			padding-bottom: 16rpx;
			background: #ffffff;
			border-radius: 20rpx;
			box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0, 0, 0, 0.06);
			margin-bottom: 28rpx;

			&:nth-child(2n) {
				margin-left: 34rpx;
			}

			.n2-pic1 {
				width: 328rpx;
				height: 254rpx;
				border-radius: 20rpx 20rpx 0rpx 0rpx;
			}

			.n2-txt1 {
				height: 76rpx;
				margin: 0rpx 24rpx 0 24rpx;
				letter-spacing: 0;
				overflow: hidden;
				display: -webkit-box;
				text-overflow: ellipsis;
				-webkit-line-clamp: 2;
				/*要显示的行数*/
				-webkit-box-orient: vertical;
				font-size: 28rpx;
			}

			.n2-txt2 {
				margin-left: 24rpx;
				margin-top: 12rpx;
				display: flex;
				align-items: center;

				.txttt1 {
					font-size: 24rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #333333;
				}

				.txttt2 {
					display: flex;
					align-items: center;
					font-size: 32rpx;
					font-family: PingFang SC, PingFang SC-Heavy;
					font-weight: 800;
					text-align: left;
					color: #f90000;

					.picc {
						width: 42rpx;
						height: 42rpx;
					}
				}
			}

			.n2-txt3 {
				margin-left: 24rpx;
				display: flex;
				align-items: center;
				text-decoration: line-through;
				color: #9A9A9A;

				.txttt1 {
					font-size: 24rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #9A9A9A;
				}

				.txttt2 {
					display: flex;
					align-items: center;
					font-size: 24rpx;
					font-family: PingFang SC, PingFang SC-Heavy;
					font-weight: 800;
					text-align: left;
					color: #9A9A9A;

					.picc {
						width: 42rpx;
						height: 42rpx;
					}
				}
			}
		}
	}
</style>
