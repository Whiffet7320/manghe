<template>
	<view class="index">
		<scroll-view @scrolltolower="lower" scroll-y='true' style="height: 92vh;">
			<view class="nav2">
				<view class="items">
					<view class="item" v-for="item in list" :key='item.id'>
						<view class="txt1">
							<view class="txt1-1">+{{item.money}}</view>
							<view class="txt1-2">{{item.created_at}}</view>
						</view>
						<view class="txt2">
							<view class="txt2-1">提现至{{item.bank_name}}</view>
							<view v-if="item.status == 0" class="txt2-2">等待审核</view>
							<view v-if="item.status == 1" class="txt2-2 blue">提现成功</view>
							<view v-if="item.status == 2" class="txt2-2 red">申请未通过</view>
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
			this.list = [];
			this.$store.commit("jinqianjiluPage", 1);
			this.getData();
		},
		methods: {
			async getData() {
				this.status = 'loading';
				setTimeout(async () => {
					const res = await this.$api.withdrawList({
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
					url: `/pages/wode/qianbao/tixian?money=${this.money}`
				})
			},
			toJilu() {
				uni.navigateTo({
					url: `/pages/wode/qianbao/tixian?money=${this.money}`
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
						color: #FF0000;
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
						color: #F29423 ;
						opacity: 1;
					}
					.txt2-2.blue{
						color: #4988FD;
					}
					.txt2-2.red{
						color: #FF0000;
					}
				}
			}
		}
	}
	
</style>
