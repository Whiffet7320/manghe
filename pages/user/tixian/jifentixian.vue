<template>
	<view class="index">
		<view class="nav1">
			<u-icon name="volume-fill" color="#D61D1D" size="28"></u-icon>
			<view class="txt1">温馨提示：积分与提现金额是1:1的；</view>
		</view>
		<view class="content">
			<view class="stit">提现到当前银行卡</view>
			<view class="list">
				<view class="bank_item" @click="changeI(item)" v-for="(item,index) in list" :key="index">
					<image :src="'https://apimg.alipay.com/combo.png?d=cashier&t='+item.bank_code+'_s'" mode="aspectFit"
						class="img"></image>
					<view class="info">
						<view class="name">{{item.bank_name}}</view>
						<view class="code">
							<text class="omit">****</text>
							<text class="omit">****</text>
							<text class="omit">****</text>
							<text>{{item.bank_number.substr(item.bank_number.length - 4, item.bank_number.length)}}</text>
						</view>
					</view>
					<view class="moren" v-if="item.default==1"></view>
					<view class="del" @click.stop="onDelete(item.id,index)">删除</view>
				</view>
			</view>
			<view class="add" @click="goAdd">
				<image src="/static/image/user/icon_add.png" mode="aspectFit" class="img"></image>
				<text>添加银行卡</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				list: []
			}
		},
		onShow() {
			this.getlist();
		},
		methods: {
			changeI(item) {
				// this.index = i;
				uni.navigateTo({
					url: `/pages/user/tixian/zhifumima?user_bank_id=${item.id}`
				})
			},
			getlist() {
				this.$api.userBanklist().then((res) => {
					if (res.code == 200) {
						this.list = res.data;
					}
				})
			},
			onDelete(id, index) {
				uni.showModal({
					title: "提示",
					content: "确定是否删除？",
					confirmColor: "#D61D1D",
					success: (res) => {
						if (res.confirm) {
							this.$api.delBank(id).then((res) => {
								if (res.code == 200) {
									this.$u.toast(res.message);
									this.list.splice(index, 1);
								} else {
									this.$u.toast(res.message);
								}
							})
						}
					}
				})
			},
			goAdd() {
				uni.navigateTo({
					url: "/pages/user/bank/detail"
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f7f8fa;
	}
</style>
<style lang="scss" scoped>
	.index {}

	.nav1 {
		margin-top: 20rpx;
		margin-left: 30rpx;
		display: flex;
		align-items: center;
		width: 690rpx;
		height: 66rpx;
		background: #ffdede;
		border-radius: 32rpx;
		padding: 0 40rpx;

		.txt1 {
			margin-left: 18rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #808080;
		}
	}
	.content{
		padding: 46rpx 30rpx;
	}
	.stit {
		font-size: 28rpx;
		font-family: PingFang SC, PingFang SC-Bold;
		font-weight: 700;
		color: #808080;
		margin-bottom: 28rpx;
	}

	.list {
		.bank_item {
			position: relative;
			background-color: #FFFFFF;
			width: 100%;
			height: 218rpx;
			background: #ffffff;
			border-radius: 16rpx;
			margin-bottom: 40rpx;
			padding: 40rpx 0 0 24rpx;
			display: flex;

			.img {
				width: 66rpx;
				height: 66rpx;
			}

			.info {
				flex: 1;
				padding-left: 32rpx;

				.name {
					font-size: 36rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #000000;
					margin-bottom: 40rpx;
				}

				.code {
					font-size: 28rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					color: #000000;

					.omit {
						margin-right: 30rpx;
					}
				}
			}

			.moren {
				position: absolute;
				top: 0;
				right: 0;
				z-index: 20;
				width: 82rpx;
				height: 72rpx;
				background: url('../../../static/image/user/moren.png') no-repeat;
				background-size: 100% 100%;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				color: #ffffff;
			}

			.del {
				position: absolute;
				top: 92rpx;
				right: 40rpx;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				color: #808080;
			}
		}
	}

	.add {
		width: 100%;
		height: 96rpx;
		line-height: 96rpx;
		background: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-family: PingFang SC, PingFang SC-Medium;
		font-weight: 500;
		color: #000000;

		.img {
			width: 23rpx;
			height: 23rpx;
			margin-right: 16rpx;
		}
	}
</style>
