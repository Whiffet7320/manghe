<template>
	<view class="index">
		<view class="nav1">
			<image class="pic1" src="../../../static/img/1229310763000_mthumb.png" mode=""></image>
			<view class="tit1">我的余额</view>
			<view class="tit2">￥<text class="big">99.00</text></view>
			<view @click="toTixian" class="tit3">发起提现</view>
		</view>
		<view class="nav2">
			<view class="tit1">收益明细</view>
			<view class="items">
				<view class="item" v-for="item in 6">
					<view class="txt1">
						<view class="txt1-1">订单收益</view>
						<view class="txt1-2">2021.07.08 12:45:56</view>
					</view>
					<view class="txt2">
						<view class="txt2-1">订单:31264564313313</view>
						<view class="txt2-2">+180</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			toTixian() {
				uni.navigateTo({
					url: '/pages/wode/qianbao/tixian'
				})
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
			width: 204rpx;
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
