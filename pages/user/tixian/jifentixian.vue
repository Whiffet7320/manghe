<template>
	<view class="index">
		<view class="nav1">
			<u-icon name="volume-fill" color="#D61D1D" size="28"></u-icon>
			<view class="txt1">温馨提示：积分与提现金额是1:1的；</view>
		</view>
		<view class="nav2">提现到当前银行卡</view>
		<view class="items">
			<view class="item" @click="changeI(i)" v-for="(item,i) in 6">
				<image v-if="index == i" src="/static/image/zu3008.png" class="float" mode=""></image>
				<view class="left">
					<view class="top">
						<image src="/static/Group.png" class="pic1" mode=""></image>
						<view class="t-txt1">建设银行</view>
					</view>
					<view class="down">**** **** **** 6789</view>
				</view>
				<view class="right">删除</view>
			</view>
		</view>
		<view class="btn">
			<u-icon name="plus-circle" color="#808080" size="30"></u-icon>
			<view class="txt">添加银行卡</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index : 0,
			}
		},
		methods:{
			changeI(i){
				this.index = i;
				uni.navigateTo({
					url:'/pages/user/tixian/zhifumima'
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

	.nav2 {
		margin: 30rpx 34rpx 28rpx 34rpx;
		font-size: 28rpx;
		font-weight: 700;
		color: #808080;
		line-height: 40rpx;
	}

	.items {
		padding: 0 30rpx;

		.item {
			margin-bottom: 20rpx;
			position: relative;
			width: 690rpx;
			height: 218rpx;
			background: #ffffff;
			border-radius: 16rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 40rpx 0 24rpx;
			.float{
				position: absolute;
				top: 0;
				right: 0;
				width: 82rpx;
				height: 72rpx;
			}
			.left {
				display: flex;
				flex-direction: column;

				.top {
					display: flex;
					align-items: center;
					.pic1 {
						width: 64rpx;
						height: 66rpx;
					}
					.t-txt1{
						margin-left: 32rpx;
						font-size: 36rpx;
						font-weight: 700;
						color: #000000;
						line-height: 40rpx;
					}
				}

				.down {
					margin-top: 40rpx;
					margin-left: 96rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #000000;
					line-height: 40rpx;
				}
			}
			.right{
				font-size: 24rpx;
				font-weight: 500;
				color: #808080;
				line-height: 40rpx;
			}

		}
	}
	.btn{
		margin: 40rpx 32rpx;
		width: 690rpx;
		height: 96rpx;
		background: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		.txt{
			margin-left: 16rpx;
			font-size: 28rpx;
			font-weight: 500;
			color: #000000;
			line-height: 96rpx;
		}
	}

</style>
