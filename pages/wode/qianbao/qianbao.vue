<template>
	<view class="index">
		<view class="nav1">
			<image class="pic1" src="../../../static/img/1229310763000_mthumb.png" mode=""></image>
			<view class="tit1">我的余额</view>
			<view class="tit2">￥<text class="big">{{money}}</text></view>
			<view @click="toTixian" class="tit3">发起提现</view>
		</view>
		<!-- <view class="nav2"> -->
			<scroll-view @scrolltolower="lower" scroll-y='true' style="height: 62vh;">		
			<view class="nav2">
				<view class="tit1">收益明细</view>
				<view class="items">
					<view class="item" v-for="item in list" :key='item.id'>
						<view class="txt1">
							<view class="txt1-1">订单收益</view>
							<view class="txt1-2">{{item.created_at}}</view>
						</view>
						<view class="txt2">
							<view class="txt2-1">订单:31264564313313</view>
							<view class="txt2-2">+{{item.value}}</view>
						</view>
					</view>
					<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
				</view>
						</view>
			</scroll-view>
<!-- 		</view> -->
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["jinqianjiluPage", "jinqianjiluPageSize"]),
		},
		watch: {
			jinqianjiluPage: function(page) {
				console.log('ddpage')
				this.$store.commit("jinqianjiluPage", page);
				if (this.jinqianjiluPage != 1) {
					this.getData();
				}
			},
		},
		data() {
			return {
				money: 0,
				list: [],
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
			this.money = option.money;
		},
		onShow() {
			this.$store.commit("jinqianjiluPage", 1);
			this.getData();
		},
		methods: {
			async getData() {
				this.status = 'loading';
				setTimeout(async () => {
					const res = await this.$api.moneyRecord({
						page: this.jinqianjiluPage,
						limit: this.jinqianjiluPageSize,
					})
					console.log(res)
					if (res.data.data.length == 0) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
						console.log(this.list)
						this.list = this.list.concat(res.data.data)
					}
				}, 200)
				console.log(this.list)
			},
			toTixian() {
				uni.navigateTo({
					url: '/pages/wode/qianbao/tixian'
				})
			},
			lower() {
				this.$store.commit("jinqianjiluPage", this.jinqianjiluPage + 1);
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #EBEBEB;
	}
</style>
<style scoped lang="scss">
	.index {}
	/deep/ .u-load-more-wrap{
		height: 80rpx !important;
	}

	.nav1 {
		height: 436rpx;
		width: 750rpx;
		background: #4988FD;
		opacity: 1;
		display: flex;
		flex-direction: column;
		align-items: center;

		.pic1 {
			margin-top: 20rpx;
			width: 144rpx;
			height: 144rpx;
			background: #FFFFFF;
			border-radius: 50%;
			opacity: 1;
		}

		.tit1 {
			margin-top: 32rpx;
			font-size: 24rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 32rpx;
			color: #FFFFFF;
			opacity: 1;
		}

		.tit2 {
			margin-top: 10rpx;
			width: 204rpx;
			font-size: 24rpx;
			font-family: SimHei;
			font-weight: 400;
			color: #FFFFFF;
			opacity: 1;

			.big {
				font-size: 72rpx;
			}
		}

		.tit3 {
			margin-top: 20rpx;
			width: 176rpx;
			height: 56rpx;
			background: #FFFFFF;
			opacity: 1;
			border-radius: 28rpx;
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			line-height: 56rpx;
			color: #4988FD;
			text-align: center;
		}
	}

	.nav2 {
		margin: 20rpx 20rpx 0 20rpx;
		width: 710rpx;
		// height: 60vh;
		background: #FFFFFF;
		opacity: 1;
		border-radius: 16rpx;
		padding: 0 26rpx;

		.tit1 {
			height: 78rpx;
			line-height: 78rpx;
			font-size: 32rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #000000;
			opacity: 1;
			// border-bottom: 1px solid #E6E6E6;;
		}

		.items {
			// height: 52vh;
			// overflow-y: scroll;

			.item {
				border-top: 1px solid #E6E6E6;

				.txt1 {
					margin-top: 16rpx;
					display: flex;
					justify-content: space-between;

					.txt1-1 {
						font-size: 24rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						line-height: 32rpx;
						color: #000000;
						opacity: 1;
					}

					.txt1-2 {
						font-size: 20rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						line-height: 28rpx;
						color: #707070;
						opacity: 1;
					}
				}

				.txt2 {
					margin-top: 18rpx;
					margin-bottom: 24rpx;
					display: flex;
					justify-content: space-between;

					.txt2-1 {
						font-size: 24rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						line-height: 32rpx;
						color: #707070;
						opacity: 1;
					}

					.txt2-2 {
						font-size: 24rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						line-height: 32rpx;
						color: #FF0000;
						opacity: 1;
					}
				}
			}
		}
	}
</style>
