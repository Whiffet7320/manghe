<template>
	<view class="index">
		<view class="nav1">
			<view class="n1-l">
				<!-- 有稀有度 -->
				<template v-if="item.shop_degree != ''">
					<image v-if="item.shop_degree == 0" src="/static/img/zu4154.png" class="pic1" mode=""></image>
					<image v-if="item.shop_degree == 1" src="/static/img/zu4152.png" class="pic1" mode=""></image>
					<image v-if="item.shop_degree == 2" src="/static/img/zu4153.png" class="pic1" mode=""></image>
					<image v-if="item.shop_degree == 3" src="/static/img/zu4151.png" class="pic1" mode=""></image>
					<view v-if="item.shop_degree == 0" class="n1-txt">金色传说</view>
					<view v-if="item.shop_degree == 1" class="n1-txt">红色史诗</view>
					<view v-if="item.shop_degree == 2" class="n1-txt">紫色稀有</view>
					<view v-if="item.shop_degree == 3" class="n1-txt">蓝色普通</view>
					<image :src="item.shop_img" class="pic2" mode=""></image>
				</template>
				<!-- 无稀有度 -->
				<template v-else>
					<image :src="item.shop_img" class="noPic" mode=""></image>
				</template>
			</view>
			<view class="n1-r">
				<view class="n1-tit1">
					<view class="n1-txt1-1">物流状态：</view>
					<view class="n1-txt1-2">{{wuliuObj.status_name}}</view>
				</view>
				<view style="margin-top: 12rpx;" class="n1-tit1">
					<view class="n1-txt1-1">快递公司：</view>
					<view class="n1-txt1-2">{{wuliuObj.company}}</view>
				</view>
				<view style="margin-top: 12rpx;" class="n1-tit1">
					<view class="n1-txt1-1">快递单号：</view>
					<view class="n1-txt1-2">{{orderNum}}</view>
					<image @click="fuzhi" src="/static/img/lujin2852.png" class="n1-pic1" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 有物流信息 -->
		<view class="nav2">
			<view v-for="(item, index) in tracesData" :key="index">
				<trackNode :is-first="index===tracesData.length-1" :is-newest="index===0"
					:is-main-node="item.isMainNode" :node-data="item"></trackNode>
			</view>
		</view>
		<!-- 暂无物流信息 -->
		<!-- <view class="nav3">
			<image src="/static/img/zu1281.png" class="n3-pic1" mode=""></image>
			<view class="n3-txt">暂无物流信息</view>
		</view> -->
	</view>
</template>

<script>
	import trackNode from '../../components/etherealwheat-track/trackNode.vue';
	export default {
		components: {
			trackNode
		},
		onLoad(options) {
			console.log(options)
			this.order_id = options.order_id;
			this.item = JSON.parse(options.item)
			console.log(this.item)
		},
		onShow() {
			this.getData()
		},
		data() {
			return {
				item: {},
				wuliuObj: {},
				order_id: '',
				lever: 1,
				orderNum: '1020 9823 7865 5332 06',
				tracesData: []
			}
		},
		methods: {
			async getData() {
				const res = await this.$api.queryLogistics({
					order_id: this.order_id
				})
				if (res.status == 200) {
					this.wuliuObj = res.data;
					this.orderNum = this.wuliuObj.courier
					res.data.data.forEach(ele => {
						ele.createTime = ele.time;
						ele.acceptStation = ele.context
					})
					this.tracesData = res.data.data
				}
			},
			fuzhi() {
				uni.setClipboardData({
					data: this.orderNum,
				});
			},
		}
	}
</script>

<style>
	page {
		background: #f7f7f7;
	}
</style>
<style lang="scss" scoped>
	.index {}

	.nav1 {
		margin: 28rpx auto 0;
		padding: 30rpx 24rpx;
		width: 690rpx;
		background: #ffffff;
		border-radius: 24rpx;
		display: flex;
		align-items: center;

		.n1-l {
			width: 164rpx;
			height: 172rpx;
			position: relative;

			.pic1 {
				position: absolute;
				top: 0;
				left: 0;
				width: 164rpx;
				height: 172rpx;
			}

			.n1-txt {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				margin-top: 8rpx;
				height: 26rpx;
				font-size: 12rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #ffffff;
				letter-spacing: 0.72rpx;
			}

			.pic2 {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: 48rpx;
				width: 102rpx;
				height: 102rpx;
			}

			.noPic {
				width: 164rpx;
				height: 172rpx;
			}
		}

		.n1-r {
			margin-left: 22rpx;

			.n1-tit1 {
				display: flex;
				align-items: center;

				.n1-txt1-1 {
					font-size: 24rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #333333;
				}

				.n1-txt1-2 {
					font-size: 24rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					color: #333333;
				}

				.n1-pic1 {
					margin-left: 18rpx;
					width: 26rpx;
					height: 26rpx;
				}
			}
		}
	}

	.nav2 {
		margin: 20rpx auto 30rpx;
		padding: 20rpx 24rpx;
		width: 690rpx;
		background: #ffffff;
		border-radius: 24rpx;
	}

	.nav3 {
		margin: 20rpx auto 30rpx;
		width: 690rpx;
		height: 596rpx;
		background: #ffffff;
		border-radius: 24rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.n3-pic1 {
			width: 132rpx;
			height: 94rpx;
			opacity: 0.77;
		}

		.n3-txt {
			margin-top: 30rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: center;
			color: #666666;
		}
	}
</style>
