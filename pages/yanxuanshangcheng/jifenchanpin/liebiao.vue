<template>
	<view class="index">
		<view class="nav1">
			<view class="item" @click="changeRad(1)">
				<view :class='{"txt":true,"active":RadIndex==1}'>综合</view>
				<image class="pic" v-if="RadIndex == 1" src="/static/image/zu1564.png" mode=""></image>
				<image class="pic" v-else src="/static/image/zu1567.png" mode=""></image>
			</view>
			<view class="item" @click="changeRad(2)">
				<view :class='{"txt":true,"active":RadIndex==2}'>价格</view>
				<image class="pic" v-if="RadIndex == 2" src="/static/image/zu1564.png" mode=""></image>
				<image class="pic" v-else src="/static/image/zu1567.png" mode=""></image>
			</view>
		</view>
		<view class="nav2">
			<view class="item" v-for="item in 6">
				<image class="pic" src="https://img2.baidu.com/it/u=4006635947,2132087516&fm=26&fmt=auto" mode="">
				</image>
				<view class="right">
					<view class="up">
						<view class="txt1">SOO行李箱男万向轮拉杆箱耐磨抗摔26英的武器大全完全单位签订无情的寸A330旅行箱密码箱女商务</view>
						<view class="txt2">规格：20寸</view>
					</view>
					<view class="down">
						<view class="d-left">
							<image class="d-pic" src="/static/image/zu1577.png" mode=""></image>
							<view class="d-txt">520积分</view>
						</view>
						<view @click="toDuihuan" class="d-right">立即兑换</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				RadIndex: 1,
			}
		},
		methods: {
			changeRad(val) {
				this.RadIndex = val;
			},
			toDuihuan(){
				uni.navigateTo({
					url:'/pages/yanxuanshangcheng/jifenchanpin/chanpin'
				})
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
	.index {}

	.nav1 {
		padding: 0 90rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;

		.item {
			height: 80rpx;
			display: flex;
			align-items: center;

			.txt {
				font-size: 24rpx;
				font-weight: bold;
				color: #707070;
			}

			.txt.active {
				color: #BD9E81;
			}

			.pic {
				margin-left: 14rpx;
				height: 18rpx;
				width: 12rpx;
			}
		}
	}

	.nav2 {
		.item {
			width: 750rpx;
			height: 226rpx;
			background: #FFFFFF;
			display: flex;
			align-items: center;
			padding: 0 40rpx 0 36rpx;
			margin-bottom: 20rpx;
			.pic {
				width: 186rpx;
				height: 186rpx;
				border-radius: 8rpx;
			}

			.right {
				margin-left: 20rpx;
				width: 468rpx;
				height: 186rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.up {
					.txt1 {
						font-size: 28rpx;
						font-weight: 500;
						line-height: 40rpx;
						color: #BD9E81;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.txt2 {
						margin-top: 8rpx;
						font-size: 20rpx;
						font-weight: 400;
						line-height: 28rpx;
						color: #707070;
					}
				}

				.down {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.d-left {
						display: flex;
						align-items: center;
						.d-pic {
							width: 32rpx;
							height: 32rpx;
						}
						.d-txt {
							margin-left: 6rpx;
							font-size: 32rpx;
							font-weight: bold;
							color: #FA8677;
						}
					}
					.d-right{
						width: 160rpx;
						height: 60rpx;
						background: #CAB19A;
						border-radius: 40rpx;
						font-size: 28rpx;
						font-weight: bold;
						line-height: 60rpx;
						text-align: center;
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>
