<template>
	<view class="index">
		<view @click="toShouhuodizhi" class="nav1">
			<view class="tit3">
				<view class="txt3-1">默认</view>
				<view class="txt3-2">浙江省温州市瓯海区娄桥街道</view>
			</view>
			<view class="tit1">
				<view class="tit1-1">
					<image class="pic1" src="/static/img/zu1.png" mode=""></image>
					<view class="txt1">将军华府3栋asdasd 2单元</view>
				</view>
				<u-icon name="arrow-right" color="#707070" size="28"></u-icon>
			</view>
			<view class="tit2">李先生13365463322</view>
		</view>
		<view class="nav2">
			<image class="pic1" src="/static/img/1229310763000_mthumb.png" mode=""></image>
			<view class="nav2-right">
				<view class="tit1">栀久高级咖色大牌炸街西装套春秋高端盐系春秋高端盐系</view>
				<view class="tit2">桌脚:39x43cm ; 颜色:偏红 ; 材质:南海梨花</view>
				<view class="tit3" @click="toxuanzeyouhuiquan">
					<view class="left">
						<image class="pic1" src="/static/img/zu87.png" mode=""></image>
						<view class="txt1">优惠券</view>
						<view class="txt2">已选1张现金券</view>
					</view>
					<view class="right">
						<view class="txt1">-15.00</view>
						<u-icon name="arrow-right" color="#707070" size="20"></u-icon>
					</view>
				</view>
				<view class="tit4">
					<view class="txt4-1">￥646</view>
					<view class="txt4-2">x1</view>
				</view>
				<view class="tit5">
					<view class="txt5-1">订单备注</view>
					<u-input placeholder='选填，请商家协商一致' :clearable='false' v-model="beizhu" type="text" />
				</view>
				<view class="tit6">
					共一件，小计：￥<text class="red">646</text>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="f-1">
				共3件，<text class="black">总计</text><text class="blue">￥<text class="big">999</text></text>
			</view>
			<view class="f-2">余额支付</view>
			<view class="f-3">微信支付</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				beizhu: '',
			}
		},
		methods: {
			toShouhuodizhi() {
				uni.navigateTo({
					url: '/pages/wode/shouhuodizhi/shouhuodizhi'
				})
			},
			toxuanzeyouhuiquan() {
				uni.navigateTo({
					url: '/pages/index/dingdantijiao/xuanzeyouhuiquan?status=shangping'
				})
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
	.index {
		position: relative;
	}

	.nav1 {
		height: 154rpx;
		background: #FFFFFF;
		padding: 20rpx 20rpx 0rpx 20rpx;
		border-bottom: 2rpx solid #E6E6E6;

		.tit3 {
			display: flex;
			align-items: center;
			margin-bottom: 10rpx;

			.txt3-1 {
				width: 60rpx;
				height: 28rpx;
				background: #4988FD;
				border-radius: 14rpx;
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 28rpx;
				text-align: center;
				color: #FFFFFF;
			}

			.txt3-2 {
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 28rpx;
				color: #707070;
				margin-left: 26rpx;
			}
		}

		.tit1 {
			height: 34rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.tit1-1 {
				display: flex;
				align-items: center;
				margin-left: 28rpx;

				.pic1 {
					transform: translateX(-10rpx);
					width: 26rpx;
					height: 34rpx;
					margin-right: 32rpx;
				}

				.txt1 {
					font-size: 32rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 42rpx;
					color: #000000;
				}
			}

		}

		.tit2 {
			margin-top: 12rpx;
			margin-left: 86rpx;
			font-size: 24rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 32rpx;
			color: #999999;
		}

	}

	.nav2 {
		margin-top: 20rpx;
		width: 750rpx;
		height: 394rpx;
		background: #FFFFFF;
		display: flex;
		padding: 20rpx;

		.pic1 {
			width: 196rpx;
			height: 196rpx;
		}

		.nav2-right {
			width: 492rpx;
			margin-left: 20rpx;

			.tit1 {
				font-size: 24rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				line-height: 32rpx;
				color: #000000;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.tit2 {
				padding-left: 12rpx;
				margin-top: 22rpx;
				width: 420rpx;
				height: 32rpx;
				background: #F0F0F0;
				font-size: 20rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				line-height: 28rpx;
				color: #989898;
			}

			.tit3 {
				margin-top: 20rpx;
				height: 34rpx;
				background: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					display: flex;
					align-items: center;

					.pic1 {
						width: 34rpx;
						height: 34rpx;
					}

					.txt1 {
						margin-left: 12rpx;
						margin-right: 22rpx;
						font-size: 24rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 32rpx;
						color: #000000;
					}

					.txt2 {
						text-align: center;
						width: 178rpx;
						height: 32rpx;
						background: #FFFFFF;
						border: 2rpx solid #FF6F00;
						font-size: 24rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 30rpx;
						color: #FF6F00;
					}
				}

				.right {
					display: flex;
					align-items: center;

					.txt1 {
						margin-right: 16rpx;
						font-size: 24rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 32rpx;
						color: #FF6F00;
					}
				}
			}

			.tit4 {
				margin-top: 32rpx;
				display: flex;
				align-items: center;

				.txt4-1 {
					font-size: 24rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					line-height: 32rpx;
					color: #000000;
				}

				.txt4-2 {
					margin-left: 44rpx;
					font-size: 24rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					line-height: 32rpx;
					color: #999999;
				}
			}

			.tit5 {
				display: flex;
				align-items: center;
				.txt5-1{
					font-size: 24rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					line-height: 32rpx;
					color: #000000;
					margin-right: 20rpx;
				}
				/deep/ .u-input{
					width: 366rpx;
				}
				/deep/ .u-input__input{
					font-size: 24rpx;
				}
			}
			.tit6{
				font-size: 24rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				line-height: 42rpx;
				color: #999999;
				.red{
					font-size: 32rpx;
					color: #D7373F;
					font-weight: 600;
				}
			}
		}
	}
	.footer{
		position: fixed;
		display: flex;
		bottom: 0;
		width: 750rpx;
		height: 120rpx;
		background: #FFFFFF;
		.f-1{
			flex: 1;
			margin-left: 32rpx;
			font-size: 24rpx;
			font-family: SimHei;
			font-weight: 400;
			line-height: 120rpx;
			color: #999999;
			.black{
				font-size: 32rpx;
				color: #000000;
			}
			.blue{
				font-size: 24rpx;
				color: #2680EB;
			}
			.big{
				font-size: 36rpx;
				color: #2680EB;
			}
		}
		.f-2{
			width: 196rpx;
			height: 120rpx;
			background: #F29423;
			font-size: 36rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 120rpx;
			text-align: center;
			color: #FFFFFF;
		}
		.f-3{
			width: 196rpx;
			height: 120rpx;
			background: #2680EB;
			font-size: 36rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 120rpx;
			text-align: center;
			color: #FFFFFF;
		}
	}
</style>
