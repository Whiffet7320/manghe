<template>
	<view class="index">
		<!-- 		<view class="nav">
			<u-icon @click="goTo" name="arrow-left" size="30"></u-icon>
			<view class="nav-title">历史记录</view>
		</view> -->
		<view class="container">
			<!-- 			<view>
				<u-steps direction="column" :list="numList" :current="current"></u-steps>
			</view> -->
			<evan-steps :active="current">
				<evan-step v-for="item in numList" :key="item"
					:title="'提现至'+item.withdrawal_typename+' '+item.money+'元'" :description="item.createtime">
					<template v-slot:icon>
						<image v-if="item.isTrue" class="evan-step-show__show" src="/static/椭圆22.png"></image>
						<!-- <image v-else class="evan-step-show__show" src="/static"></image> -->
						<evan-icons v-else type="telegram" size="10" color="#ccc"></evan-icons>
					</template>
				</evan-step>
			</evan-steps>
			<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import EvanSteps from '@/components/evan-steps/evan-steps.vue'
	import EvanStep from '@/components/evan-steps/evan-step.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import EvanIcons from '@/components/evan-icons/evan-icons.vue'
	export default {
		computed: {
			...mapState(["txjlPage", "txjlPageSize"]),
		},
		watch: {
			txjlPage: function(page) {
				console.log(2222)
				this.$store.commit("txjlPage", page);
				if (this.txjlPage != 1) {
					this.getData();
				}
			},
		},
		data() {
			return {
				openid: '',
				current: 0,
				numList: [{
					name: '提现至微信',
					time: "2021年03月26日 12:52:36",
					isTrue: true
				}, {
					name: '提现至支付宝',
					time: '2021年03月26日 07:52:36',
					isTrue: false
				}],
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
			this.numList = [];
			this.openid = uni.getStorageSync('openid');
			this.$store.commit("txjlPage", 1);
			this.getData()
		},
		onReachBottom() {
			this.$store.commit("txjlPage", this.txjlPage + 1);
		},
		methods: {
			async getData() {
				console.log(11111)
				this.status = 'loading';
				const res = await this.$api.wx_mywithdrawal(this.openid, this.txjlPage, this.txjlPageSize);
				console.log(res)
				setTimeout(() => {
					if (!res.list) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
						this.numList = this.numList.concat(res.list);
						console.log(this.numList)
					}
					if (res.list) {
						if (res.list.length < this.ddPageSize) {
							this.status = 'nomore'
						}
					}
				}, 200)
			},
			goTo() {
				uni.navigateTo({
					url: '/pages/wode/lijitixian'
				})
			},
		},
		components: {
			EvanSteps,
			EvanStep,
			UniIcons,
			EvanIcons
		},
	}
</script>

<style scoped lang="scss">
	.index {
		position: relative;
		// padding-top: 60rpx;
		height: 100%;
		width: 100%;
	}

	.nav {
		display: flex;
		align-items: center;
		height: 36rpx;
		// padding: 60rpx 50rpx 33rpx 46rpx;
		margin: 0rpx 50rpx 0rpx 46rpx;

		.nav-title {
			margin-left: 23rpx;
			opacity: 1;
			font-size: 36rpx;
			font-family: SourceHanSansCN-Regular;
			text-align: left;
			color: #121212;
			line-height: 71rpx;
		}
	}

	.container {
		margin: 53rpx 51rpx;
	}

	.evan-step-show {
		&__title {
			padding: 20rpx 0;

			&__item {
				font-size: 32rpx;
				color: #333;
				font-weight: bold;
			}
		}

		&__show {
			width: 18rpx;
			height: 18rpx;
			display: block;
		}
	}
</style>
