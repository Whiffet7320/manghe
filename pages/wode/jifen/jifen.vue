<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="nav1">
			<image class="pic1" src="/static/img/1229310763000_mthumb.png" mode=""></image>
			<view class="tit1">我的积分</view>
			<view class="tit2"><text class="big">{{score}}</text></view>
			<view @click="toDuihuan" class="tit3">兑换</view>
		</view>
		<scroll-view @scrolltolower="lower" scroll-y='true' style="height: 62vh;">
			<view class="nav2">
				<view class="tit1">积分明细</view>
				<view class="items">
					<view class="item" v-for="item in list">
						<view class="txt1">
							<view class="txt1-1">订单收益</view>
							<view class="txt1-2">{{item.created_at}}</view>
						</view>
						<view class="txt2">
							<view class="txt2-1"></view>
							<view class="txt2-2">{{item.is_in == '0' ? '-' : '+'}}{{item.value}}</view>
						</view>
					</view>
					<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["jifenbiaoPage", "jifenbiaoPageSize"]),
		},
		watch: {
			jifenbiaoPage: function(page) {
				console.log('ddpage')
				this.$store.commit("jifenbiaoPage", page);
				if (this.jifenbiaoPage != 1) {
					this.getData();
				}
			},
		},
		data() {
			return {
				score: 0,
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
			this.score = option.score;
		},
		onShow() {
			this.list = [];
			this.$store.commit("jifenbiaoPage", 1);
			this.getData();
		},
		methods: {
			async getData() {
				const res2 = await this.$api.user()
				console.log(res2)
				this.score = res2.data.score;
				this.status = 'loading';
				setTimeout(async () => {
					const res = await this.$api.scoreRecords({
						page: this.jifenbiaoPage,
						limit: this.jifenbiaoPageSize,
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
			lower() {
				this.$store.commit("jifenbiaoPage", this.jifenbiaoPage + 1);
			},
			async toDuihuan() {
				const res = await this.$api.scoreToMoney();
				console.log(res.data);
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: `成功兑换${res.data.money}元`,
						type: 'success',
						callback:()=>{
							this.list = [];
							this.$store.commit("jifenbiaoPage", 1);
							this.getData()
						},
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
				// uni.navigateTo({
				// 	url: '/pages/wode/qianbao/tixian'
				// })
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
		height: 754rpx;
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
			height: 677rpx;
			overflow-y: scroll;

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
