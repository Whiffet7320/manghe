<template>
	<view class="index">
		<view class="nav1">
			<view @click="chooseYouhuiquan(i)" class="item" :key='i' v-for="(item,i) in 3">
				<image v-if="youhuiquanIndex == i" class="picc" src="/static/img/zu90.png" mode=""></image>
				<image class="pic1" src="/static/img/zu22.png" mode=""></image>
				<view class="txt1">现金券</view>
				<view class="txt2">
					<view class="txt2-1">￥<text class="big">20</text></view>
					<view class="txt2-2">满280元可用</view>
				</view>
				<view class="txt3">20元通用券</view>
				<view class="txt4">2021.07.06-2021.08.06</view>
				<view class="txt5">全站通用</view>
				<view class="txt6">可转赠</view>
				<view class="xuxian"></view>
				<view class="txt7">
					<image class="pic1" src="/static/img/zhuanfa.png" mode=""></image>
					<view class="txt7-1">转赠好友</view>
				</view>
				<view class="shixian"></view>
				<view class="txt8">全国通用</view>
			</view>
		</view>
		<view @click="goBack" class="btn">确定</view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			// 如果是商城订单status就等于shangping
			this.status = option.status;
		},
		data() {
			return {
				youhuiquanIndex: -1,
				status: null,
			}
		},
		methods: {
			chooseYouhuiquan(i) {
				this.youhuiquanIndex = i
			},
			goBack() {
				if (this.status == 'shangping') {
					uni.navigateBack();
				} else {
					uni.navigateTo({
						url: '/pages/index/dingdantijiao/dingdantijiao'
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F3F5;
	}
</style>
<style scoped lang="scss">
	.nav1 {
		margin-top: 22rpx;
		margin-bottom: 120rpx;

		.item {
			margin: 0 20rpx 16rpx 20rpx;
			position: relative;
			width: 710rpx;
			height: 240rpx;

			.picc {
				position: absolute;
				z-index: 2;
				width: 710rpx;
				height: 240rpx;
			}

			.pic1 {
				position: absolute;
				width: 710rpx;
				height: 240rpx;
			}

			.txt1 {
				position: absolute;
				left: 16rpx;
				top: 4rpx;
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 28rpx;
				color: #FFFFFF;
				opacity: 1;
			}

			.txt2 {
				position: absolute;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 226rpx;
				height: 178rpx;

				.txt2-1 {
					height: 88rpx;
					font-size: 22rpx;
					font-family: Microsoft Himalaya;
					font-weight: 400;
					// line-height: 144rpx;
					color: #FFFFFF;
					opacity: 1;

					.big {
						font-size: 120rpx;
					}
				}

				.txt2-2 {
					font-size: 20rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 28rpx;
					color: #FFFFFF;
					opacity: 1;
				}
			}

			.txt3 {
				position: absolute;
				top: 14rpx;
				left: 250rpx;
				font-size: 28rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 38rpx;
				color: #000000;
				opacity: 1;
			}

			.txt4 {
				position: absolute;
				top: 66rpx;
				left: 250rpx;
				font-size: 28rpx;
				font-family: Microsoft Himalaya;
				font-weight: 400;
				line-height: 34rpx;
				color: #707070;
				opacity: 1;
			}

			.txt5 {
				position: absolute;
				top: 96rpx;
				left: 250rpx;
				font-size: 22rpx;
				font-family: Microsoft Himalaya;
				font-weight: 400;
				line-height: 26rpx;
				color: #707070;
				opacity: 1;
			}

			.txt6 {
				transform: rotate(45deg);
				position: absolute;
				top: 16rpx;
				right: 6rpx;
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 28rpx;
				color: #FFFFFF;
				opacity: 1;
			}

			.xuxian {
				position: absolute;
				top: 140rpx;
				right: 22rpx;
				width: 436rpx;
				height: 0px;
				border: 1rpx dashed #E6E6E6;
				opacity: 1;
			}

			.txt7 {
				position: absolute;
				top: 146rpx;
				left: 250rpx;
				display: flex;
				align-items: center;
				height: 30rpx;

				.pic1 {
					width: 28rpx;
					height: 28rpx;
				}

				.txt7-1 {
					margin-left: 34rpx;
					font-size: 20rpx;
					font-family: Microsoft Himalaya;
					font-weight: 400;
					color: #707070;
					opacity: 1;
				}
			}

			.shixian {
				position: absolute;
				top: 178rpx;
				right: 0rpx;
				width: 478rpx;
				height: 0px;
				border: 1px solid #E6E6E6;
				opacity: 1;
			}

			.txt8 {
				position: absolute;
				top: 198rpx;
				left: 16rpx;
				font-size: 22rpx;
				font-family: Microsoft Himalaya;
				font-weight: 400;
				line-height: 26rpx;
				color: #707070;
				opacity: 1;
			}
		}
	}

	.btn {
		position: fixed;
		bottom: 0;
		text-align: center;
		font-size: 48rpx;
		font-family: Segoe UI;
		font-weight: 400;
		line-height: 104rpx;
		color: #FFFFFF;
		width: 750rpx;
		height: 104rpx;
		background: #4988FD;
	}
</style>
