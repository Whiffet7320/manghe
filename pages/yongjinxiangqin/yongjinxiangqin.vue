<template>
	<view class="index">
		<!-- 		<view class="nav">
			<u-icon @click="goTo" name="arrow-left" size="30"></u-icon>
			<view class="nav-title">佣金详情</view>
		</view> -->
		<view class="container">
			<view class="items">
				<view class="item">
					<image class="pic1" src="/static/矩形157@2x.png" mode=""></image>
					<image class="pic2" src="/static/Group.png" mode=""></image>
					<view class="tit1">JAYJONE</view>
					<view class="tit2">通过链接邀请·你已获得3元！</view>
					<view class="tit3">+3元</view>
				</view>
				<view class="item">
					<image class="pic1" src="../../static/矩形157@2x.png" mode=""></image>
					<image class="pic2" src="../../static/Group.png" mode=""></image>
					<view class="tit1">JAYJONE</view>
					<view class="tit2">通过链接邀请·你已获得3元！</view>
					<view class="tit3">+3元</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["yjPage", "yqhyPage"]),
		},
		watch: {
			yjPage: function(yjPage) {
				this.$store.commit("yjPage", yjPage);
				this.getData();
			},
		},
		data() {
			return {
				openid: '',

			}
		},
		async onShow() {
			this.openid = uni.getStorageSync('openid')
			this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$api.wx_usercommissionmore(this.openid,this.yjPage,this.yqhyPage);
				console.log(res)
			},
		}
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
		.items {
			margin-top: 34rpx;

			.item {
				position: relative;
				margin: 7rpx 38rpx;
				width: 674rpx;
				height: 120rpx;
				opacity: 1;

				.pic1 {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}

				.pic2 {
					position: absolute;
					top: 29rpx;
					left: 51rpx;
					width: 60rpx;
					height: 60rpx;
					opacity: 1;
					background: #141313;
					border-radius: 50%;
				}

				.tit1 {
					position: absolute;
					top: 30rpx;
					left: 129rpx;
					opacity: 1;
					font-size: 22rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					color: #141313;
				}

				.tit2 {
					position: absolute;
					top: 62rpx;
					left: 129rpx;
					opacity: 1;
					font-size: 18rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					color: #707070;
				}

				.tit3 {
					position: absolute;
					top: 51rpx;
					left: 576rpx;
					opacity: 1;
					font-size: 22rpx;
					font-family: PingFang SC, PingFang SC-Heavy;
					font-weight: 800;
					color: #af0000;
				}
			}
		}
	}
</style>
