<template>
	<view class="index">
		<!-- <view class="nav1">
			<view class="tit1">
				<view class="txt1">货物状态</view>
				<view class="txt2" style="color: #d61d1d;">已签收</view>
			</view>
			<view class="tit1">
				<view class="txt1">物流公司</view>
				<view class="txt2">韵达快递</view>
			</view>
			<view class="tit1">
				<view class="txt1">货物状态</view>
				<view class="txt2">1264530264135</view>
				<view @click="copy" class="txt3">复制</view>
			</view>
		</view>
		<view class="nav2">
			<logistics :wlInfo="wlInfo"></logistics>
		</view> -->
		<logistics :wlInfo="wlInfo"></logistics>
	</view>
</template>

<script>
	import logistics from '@/components/xinyu-logistics/xinyu-logistics.vue'
	export default {
		components: {
			logistics
		},
		onLoad(option) {
			this.order_id = option.order_id;
			this.wlInfo.post_name = option.express_name;
			this.wlInfo.addr = option.address
			this.getData()
		},
		data() {
			return {
				order_id: '',
				wlInfo: {
					delivery_status: 1, //快递状态 1已签收 2配送中
					post_name: '', //快递名称
					logo: 'https://img1.baidu.com/it/u=4283675395,4246710405&fm=253&fmt=auto&app=120&f=PNG?w=256&h=256', //快递logo
					exp_phone: '暂无', //快递电话
					post_no: '', //快递单号
					addr: '', //收货地址
					//物流信息
					list: []
				}
			}
		},
		methods: {
			async getData() {
				const res = await this.$api.exress_detail({
					order_id: this.order_id
				})
				if (res.data.status == 200) {
					this.wlInfo.delivery_status = res.data.state == 3 ? 1 : 2;
					this.wlInfo.post_no = res.data.nu;
					res.data.data.forEach((ele, i) => {
						this.$set(this.wlInfo.list, i, {
							time: ele.time,
							timeArr: [ele.time],
							context: ele.context
						})
					})
				} else {
					this.wlInfo.delivery_status = 2;
					this.wlInfo.post_no = '暂无';
					this.wlInfo.list[0] = {
						time:'暂无',
						timeArr: ['暂无'],
						context:res.data.message
					}
				}

			},
			copy() {

			},
		}
	}
</script>

<style>
	page {
		background: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.index {
		position: relative;
	}

	.nav1 {
		padding: 0 30rpx;
		margin-top: 40rpx;

		.tit1 {
			margin-top: 20rpx;
			display: flex;
			align-items: center;

			.txt1 {
				font-size: 28rpx;
				font-weight: 700;
				color: #000000;
			}

			.txt2 {
				margin-left: 60rpx;
				font-size: 28rpx;
				font-weight: 700;
				color: #000000;
			}

			.txt3 {
				margin-left: 38rpx;
				width: 88rpx;
				height: 42rpx;
				background: rgba(#808080, 0.2);
				border-radius: 22rpx;
				font-size: 24rpx;
				font-weight: 500;
				text-align: center;
				line-height: 42rpx;
				color: #808080;
			}
		}
	}

	.nav2 {
		margin-left: 30rpx;
		position: fixed;
		bottom: 0;
		width: 690rpx;
		height: calc(100vh - 246rpx);
		background: #ffffff;
		border-radius: 16rpx;
		box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0, 0, 0, 0.16);
	}
</style>
