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
		components: { logistics },
		data() {
			return {
				wlInfo: {
				    delivery_status: 1, //快递状态 1已签收 2配送中
				    post_name: '韵达快递', //快递名称
				    logo: 'https://cdn.kuaidi100.com/images/all/56/yunda.png', //快递logo
				    exp_phone: '95546', //快递电话
				    post_no: '4304678557725', //快递单号
				    addr: '江西省南昌市青云谱区', //收货地址
				    //物流信息
				    list: [{
				            "time": "2020-04-12 13:00:57",
				            "timeArr": ['2020-04-12 13:00:57'],
				            "context": "江西南昌青云谱区 快件已被 丰巢智能柜 代签收。",
				            "location": ""
				        },
				        {
				            "time": "2020-04-12 12:58:53",
				            "timeArr": ['2020-04-12 12:58:53'],
				            "context": "江西南昌青云谱区 进行派件扫描；派送业务员：张三；联系电话：88888888888",
				            "location": ""
				        },
				        {
				            "time": "2020-04-11 15:45:44",
				            "timeArr": ['2020-04-11', '15:45:44'],
				            "context": "江西南昌分拨中心 从站点发出，本次转运目的地：江西南昌青云谱区",
				            "location": ""
				        },
				        {
				            "time": "2020-04-11 15:08:45",
				            "timeArr": ['2020-04-11', '15:08:45'],
				            "context": "江西南昌分拨中心 在分拨中心进行卸车扫描",
				            "location": ""
				        },
				        {
				            "time": "2020-04-10 17:42:41",
				            "timeArr": ['2020-04-10', '17:42:41'],
				            "context": "浙江义乌分拨中心 进行装车扫描，发往：江西南昌分拨中心",
				            "location": ""
				        },
				        {
				            "time": "2020-04-10 17:39:38",
				            "timeArr": ['2020-04-10', '17:39:38'],
				            "context": "浙江义乌分拨中心 在分拨中心进行称重扫描",
				            "location": ""
				        },
				        {
				            "time": "2020-04-10 16:02:46",
				            "timeArr": ['2020-04-10', '16:02:46'],
				            "context": "浙江义乌城西公司 进行下级地点扫描，发往：江西南昌地区包",
				            "location": ""
				        },
				        {
				            "time": "2020-04-10 15:48:42",
				            "timeArr": ['2020-04-10', '15:48:42'],
				            "context": "浙江义乌城西公司城西营销部 进行揽件扫描",
				            "location": ""
				        }
				    ]
				}
			}
		},
		methods: {
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
