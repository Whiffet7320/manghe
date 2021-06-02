<template>
	<view class="index">
		<view class="top">
			<view class="tit1">
				商城APP
			</view>
			<view class="tit2">
				红包群(5)
			</view>
		</view>
		<view class="center">
			<view class="item">
				<view class="top-tit">
					15:09
				</view>
				<view class="container">
					<view class="user1">
						<image class="pic" src="../../static/Group.png"></image>
						<image @click="goTo" class="hb" src="../../static/组57.png"></image>
					</view>
				</view>
			</view>
			<view class="footer">
				<image class="hbIcon" src="../../static/组54.png" mode=""></image>
				<view class="tit">
					你领取了XXX的
					<text>红包</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
goTo(){
	uni.navigateTo({
		url:'/pages/miandan/miandan'
	})
},
		}
	}
</script>

<style scoped lang="scss">
	.index {
		.top {
			width: calc(1.82 * 414rpx);
			height: calc(1.82 * 64rpx);
			opacity: 1;
			background: #d82423;
			display: flex;
			flex-direction: column;
			align-items: center;

			.tit1 {
				margin-top: calc(1.82 * 5rpx);
				opacity: 1;
				font-size: calc(1.82 * 10rpx);
				font-family: YouSheBiaoTiHei, YouSheBiaoTiHei-Regular;
				font-weight: calc(1.82 * 400);
				text-align: center;
				color: #ffffff;
			}

			.tit2 {
				margin-top: calc(1.82 * 10rpx);
				opacity: 1;
				font-size: 36rpx;
				font-family: SourceHanSansCN-Regular;
				text-align: center;
				color: #ffffff;
				line-height: 31rpx;
				letter-spacing: 0rpx;
			}
		}

		.center {
			margin-top: 31rpx;
			border: 2rpx solid red;

			.item {
				.top-tit {
					opacity: 1;
					font-size: 20rpx;
					font-family: SourceHanSansCN-Regular;
					text-align: center;
					color: #9b9b9b;
					line-height: 31rpx;
					letter-spacing: 0rpx;
				}

				.container {
					// display: flex;
					.user1 {
						display: flex;
						align-items: center;
						.pic{
							width: 92rpx;
							height: 92rpx;
							opacity: 1;
							margin: 0 9rpx 0 49rpx;
						}
						.hb{
							width: 478rpx;
							height: 138rpx;
							opacity: 1;
						}
					}
				}
			}
			.footer{
				margin-left: 50%;
				transform: translateX(-50%);
				margin-top: 30rpx;
				width: 288rpx;
				height: 45rpx;
				opacity: 1;
				border: 2rpx solid blue;
				display: flex;
				align-items: center;
				.hbIcon{
					width: 24rpx;
					height: 24rpx;
					opacity: 1;
					margin: 0 19rpx 0 36rpx;
				}
				.tit{
					font-size: 20rpx;
					font-family: SourceHanSansCN-Regular;
					text-align: center;
					color: #9b9b9b;
					line-height: 31rpx;
					letter-spacing: 0rpx;
					text{
						color: #D82423;
					}
				}
			}
			
		}
	}
</style>
