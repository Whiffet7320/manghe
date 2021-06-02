<template>
	<view class="index">
		<view class="items">
			<view class="item">
				<!-- 右边 -->
				<view class="time">2021-04-29 14:24</view>
				<view class="user">
					<view class="tit">
						<view class="talk">
							<view class="tit1">待付款在哪</view>
						</view>
						<image class="pic2" src="../../static/Group.png" mode=""></image>
					</view>
				</view>
				<!-- 左边 -->
				<view class="time">2021-04-29 14:24</view>
				<view class="kefu">
					<view class="tit">
						<image class="pic2" src="../../static/Group.png" mode=""></image>
						<view class="talk">
							<view class="tit1">待付款在9999999哪</view>
						</view>
					</view>
				</view>
				<!-- 右边 -->
				<view class="time">2021-04-29 14:24</view>
				<view class="user">
					<view class="tit">
						<view class="talk">
							<view class="tit1">待付款在哪</view>
						</view>
						<image class="pic2" src="../../static/Group.png" mode=""></image>
					</view>
				</view>
				<!-- 右边 -->
				<view class="time">2021-04-29 14:24</view>
				<view class="user">
					<view class="tit">
						<view class="talk">
							<view class="tit1">待付款在哪</view>
						</view>
						<image class="pic2" src="../../static/Group.png" mode=""></image>
					</view>
				</view>
				<!-- 左边 -->
				<view class="time">2021-04-29 14:24</view>
				<view class="kefu">
					<view class="tit">
						<image class="pic2" src="../../static/Group.png" mode=""></image>
						<view class="talk">
							<view class="tit1">待付款在9999999哪</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<image @tap="chooseImage" class="pic1" src="/static/组127.png" mode=""></image>
			<u-input class="inp" v-model="value" custom-style="{'width':'514rpx'}" type="text" border height="60" />
			<image class="pic2" src="../../static/路径353.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:'cyy'
			}
		},
		methods:{
			chooseImage(){
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    success: function (res) {
				        console.log(JSON.stringify(res.tempFilePaths));
				    }
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		background: #f7f7f7;
	}

	.index {
		position: relative;
	}

	.items {
		.item {
			margin: 27rpx;

			.time {
				opacity: 1;
				font-size: 18rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: center;
				color: #999999;
				letter-spacing: 0rpx;
			}

			.user {
				height: 70rpx;
				margin-top: 38rpx;
				margin-bottom: 17rpx;
				.tit {
					float: right;
					display: flex;

					// align-items: center;
					.talk::after {
						content: "";
						border: 18rpx solid #ffffff00;
						border-right: 18rpx solid #EBBFCC;
						position: absolute;
						top: 22rpx;
						right: -30rpx;
						transform: rotateY(180deg);
					}

					.talk {
						position: relative;
						display: flex;
						align-items: center;
						background-color: #EBBFCC;
						padding: 20rpx 22rpx;
						// display: inline-block;
						border-radius: 10px;
						// margin: 0px 15px 10px 10px;
						border: 1px solid #e3e3e3;
						margin-right: 15rpx;
						max-width: 290px;
						// float: right;
						-webkit-word-break: break-all;
						-moz-word-break: break-all;
						-ms-word-break: break-all;
						-o-word-break: break-all;
						word-break: break-all;

						.tit1 {
							opacity: 1;
							font-size: 22rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							text-align: right;
							color: #ffffff;
							letter-spacing: -1rpx;
						}
					}

					.pic2 {
						width: 63rpx;
						height: 63rpx;
						opacity: 1;
					}
				}
			}

			.kefu {
				height: 70rpx;
				margin-top: 38rpx;
				margin-bottom: 17rpx;
				.tit {
					float: left;
					display: flex;

					// align-items: center;
					.talk::after {
						content: "";
						border: 8px solid #ffffff00;
						border-right: 8px solid #e3e3e3;
						position: absolute;
						top: 22rpx;
						left: -16px;
					}

					.talk {
						position: relative;
						display: flex;
						align-items: center;
						background-color: #fff;
						padding: 20rpx 22rpx;
						display: inline-block;
						border-radius: 10px;
						margin-left: 10px;
						border: 1px solid #e3e3e3;
						max-width: 290px;
						-webkit-word-break: break-all;
						-moz-word-break: break-all;
						-ms-word-break: break-all;
						-o-word-break: break-all;
						word-break: break-all;

						.pic1 {
							position: absolute;
							top: 0;
							right: 0;
							width: 159rpx;
							height: 69rpx;
							opacity: 1;
						}

						.tit1 {
							opacity: 1;
							font-size: 22rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							text-align: left;
							color: #000000;
							letter-spacing: -1rpx;
						}
					}

					.pic2 {
						width: 63rpx;
						height: 63rpx;
						opacity: 1;
					}
				}
			}



		}
	}
	.footer{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 750rpx;
		height: 140rpx;
		opacity: 1;
		background: rgba(255,255,255,0.93);
		backdrop-filter: blur(54rpx);
		display: flex;
		align-items: center;
		padding: 0 56rpx;
		.pic1{
			width: 38rpx;
			height: 34rpx;
			opacity: 1;
			margin-right: 34rpx;
		}
		.inp{
			width: 514rpx;
		}
		.pic2{
			margin-left: 34rpx;
			width: 34rpx;
			height: 34rpx;
			opacity: 1;
		}
	}


</style>
