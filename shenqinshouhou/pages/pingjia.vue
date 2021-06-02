<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="top">您宝贵的评价是我们进步的第一步。</view>
		<view class="container">
			<!-- <view class="tit1">还可以还不错，值得回购！会让朋友一起买的！</view> -->
			<u-input v-model="value" type="textarea" border height=415 />
		</view>
		<view class="footer" @tap="toTijiaoshouhou">提交评价</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				openid: '',
				order_id: '',
				value: '还可以还不错，值得回购！会让朋友一起买的！'
			}
		},
		onLoad(option) {
			this.openid = uni.getStorageSync('openid');
			this.order_id = option.order_id
		},
		methods: {
			async toTijiaoshouhou() {
				var signstr = "openid=" + this.openid + "&order_id=" + this.order_id + "&comment=" + this.value + "";
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.wx_orderscomment(this.openid, this.order_id, this.value, md)
				if (res.result == 1) {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success',
						duration: 500,
						back :true
						// url: `/wodeQuanbudingdan/pages/quanbudingdan?orders_status=3`,
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	page {
		background: #f8f8f8;
	}

	.index {
		position: relative;
	}

	.top {
		margin-left: 60rpx;
		margin-top: 36rpx;
		opacity: 1;
		font-size: 18rpx;
		font-family: PingFang SC, PingFang SC-Regular;
		font-weight: 400;
		color: #ff9d00;
	}

	.container {
		width: 658rpx;
		opacity: 1;
		background: #FFFFFF;
		margin: 0 auto;
		margin-top: 22rpx;

		.tit1 {}
	}

	.footer {
		position: fixed;
		bottom: 0rpx;
		width: 750rpx;
		height: 80rpx;
		opacity: 1;
		background: #ebbfcc;
		box-shadow: 0rpx -2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);
		font-size: 25rpx;
		font-family: SourceHanSansCN-Regular;
		text-align: center;
		color: #ffffff;
		line-height: 80rpx;
	}
</style>
