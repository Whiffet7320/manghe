<template>
	<view class="index">
		<view class="nav1">
			<view class="nav1-flex">
				<image class="pic" src="https://img2.baidu.com/it/u=1991026848,3099564169&fm=26&fmt=auto" mode="">
				</image>
				<view class="f-right">
					<view class="tit1">
						<view class="txt1">Jay Jone</view>
						<image src="/static/image/zu1528.png" class="f-r-pic1" mode=""></image>
					</view>
					<view class="tit2">
						<view class="item">
							<view class="txt1">2</view>
							<view class="txt2">关注医生</view>
						</view>
						<view class="shu"></view>
						<view class="item">
							<view class="txt1">2</view>
							<view class="txt2">我的评论</view>
						</view>
						<view class="shu"></view>
						<view class="item">
							<view class="txt1">2</view>
							<view class="txt2">我的收藏</view>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		onShow() {

		},
		data() {
			return {

			}
		},
		methods: {
			//呼叫
			CallPhone(value) {
				uni.makePhoneCall({
					phoneNumber: value,
					success: (res) => {
						console.log(res)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background: #f7f8fa;
	}
</style>
<style lang="scss" scoped>
	.index {}

	.nav1 {
		width: 750rpx;
		height: 298rpx;
		background: linear-gradient(316deg, #F6A309 0%, #F8B607 22%, #FFD438 42%, #F9C706 51%, #F8CA20 80%, #FECF05 100%);
		padding: 0 36rpx;
		.nav1-flex {
			padding-top: 40rpx;
			display: flex;
			align-items: center;
			.pic {
				width: 184rpx;
				height: 184rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
			.f-right{
				height: 184rpx;
				display: flex;
				flex: 1;
				flex-direction: column;
				.tit1{
					display: flex;
					align-items: center;
					justify-content: space-between;
					.txt1{
						font-size: 36rpx;
						font-weight: bold;
						line-height: 50rpx;
						color: #122106;
					}
					.f-r-pic1{
						width: 40rpx;
						height: 40rpx;
					}
				}
				.tit2{
					margin-top: 38rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.shu{
						width: 0rpx;
						height: 56rpx;
						border: 2rpx solid #FFFFFF;
						opacity: 0.2;
					}
					.item{
						display: flex;
						flex-direction: column;
						align-items: center;
						height: 96rpx;
						.txt1{
							font-size: 32rpx;
							font-weight: 800;
							line-height: 44rpx;
							color: #122106;
						}
						.txt2{
							margin-top: 12rpx;
							font-size: 28rpx;
							font-weight: 500;
							line-height: 40rpx;
							color: #122106;
						}
					}
				}
			}
		}

	}
</style>
