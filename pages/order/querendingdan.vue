<template>
	<view class="index">
		<view class="nav1">
			<view class="left">
				<u-icon name="map-fill" color="#D61D1D" size="44"></u-icon>
				<view class="tit">浙江省温州市龙湾区滨海五道交叉路区滨海五道交叉路</view>
			</view>
			<view class="right">
				<u-icon name="arrow-right" color="#D61D1D" size="28"></u-icon>
			</view>
		</view>
		<view class="nav2">
			<view class="left">
				<image src="/static/image/zu1998.png" class="pic1" mode=""></image>
			</view>
			<view class="right">
				<view class="tit1">
					<view class="txt1-1">阳澄湖大闸蟹</view>
					<view class="txt1-2">￥99.00</view>
				</view>
				<view class="tit2">
					<view class="txt2-1">规格：<text style="margin-left: 4rpx;">母蟹5两</text></view>
					<view class="txt2-2">X1</view>
				</view>
				<view class="tit3">
					<view class="tit3-1">不可退款退货</view>
					<view class="tit3-1" style="margin-left: 24rpx;">限购50只/天</view>
				</view>
				<view class="tit4">
					<view class='txt1'>购买数量：</view>
					<view class="right4">
						<view @click="jian" class="jian">-</view>
						<view class="txt">{{num}}</view>
						<view @click="jia" class="jian">+</view>
					</view>
				</view>
			</view>
		</view>
		<view class="nav3">
			<view class="item">
				<view class="txt1">实际付款金额</view>
				<view class="txt2">99.00元</view>
			</view>
			<view class="item">
				<view class="txt1">邮费</view>
				<view class="txt2">0.00元</view>
			</view>
			<view class="item2">
				<u-input v-model="value" :clearable='false' type="textarea" :border="false"
					placeholder='选填：给卖家留言（45字以内）' />
			</view>
			<view class="item3">
				<view class="txt">付款后，我们尽快安排给您发货</view>
			</view>
		</view>
		<view @click="show = true" class="footer">提交订单</view>
		<!-- 弹出层 -->
		<u-popup v-model="show" mode='bottom' border-radius='24' height='708' closeable>
			<view class="pop">
				<view class="tit1">
					<view class="txt1">支付方式</view>
				</view>
				<view class="item1" @click="payIndex = 1">
					<view class="t1">
						<view class="left">
							<image src="/static/image/lujin1936.png" class="pic1" mode=""></image>
							<view class="txt1-1">微信支付</view>
							<view class="box1">推荐</view>
						</view>
						<image v-if="payIndex == 1" src="/static/image/lujin1937.png" class="quan2"></image>
						<view v-else class="quan"></view>
					</view>
					<view class="t2">亿万用户的选择，更快更安全</view>
				</view>
				<view class="item1" style="border-top: 2rpx solid #f2f2f2;border-bottom: 2rpx solid #f2f2f2;" @click="payIndex = 2">
					<view class="t1">
						<view class="left">
							<image src="/static/image/zu3030.png" class="pic1 p2" mode=""></image>
							<view class="txt1-1">积分抵扣</view>
						</view>
						<image v-if="payIndex == 2" src="/static/image/lujin1937.png" class="quan2"></image>
						<view v-else class="quan"></view>
					</view>
					<view class="t2">当前积分为0分</view>
				</view>
				<view class="item1" @click="payIndex = 3">
					<view class="t1">
						<view class="left">
							<image src="/static/image/lujin2820.png" class="pic1 p3" mode=""></image>
							<view class="txt1-1">余额抵扣</view>
						</view>
						<image v-if="payIndex == 3" src="/static/image/lujin1937.png" class="quan2"></image>
						<view v-else class="quan"></view>
					</view>
					<view class="t2">当前余额为0元</view>
				</view>
				<view class="btn-footer">确认</view>
			</view>
		</u-popup>
		<!-- 支付成功 -->
		<u-popup v-model="show2" mode='center' border-radius='24' height='256' width='424'>
			<view class="pop2">
				<u-icon name="checkmark-circle-fill" color="#ff0000" size="50"></u-icon>
				<view class="p2-tit1">支付成功</view>
				<view class="p2-tit2">购买相对应的积分将在明日到账</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: 1,
				value: '',
				show: false,
				payIndex:1,
				show2:true,
			}
		},
		methods: {
			jian() {
				if (this.num > 1) {
					this.num--
				}
			},
			jia() {
				this.num++
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #f7f8fa;
	}
</style>
<style lang="scss" scoped>
	.index {
		position: relative;
	}

	.nav1 {
		padding: 0 32rpx;
		margin-top: 30rpx;
		margin-left: 30rpx;
		width: 690rpx;
		height: 80rpx;
		background: #ffffff;
		box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.16);
		display: flex;
		align-items: center;
		justify-content: space-between;

		.left {
			display: flex;
			align-items: center;

			.tit {
				width: 516rpx;
				font-size: 28rpx;
				font-weight: 700;
				color: #000000;
				margin-left: 20rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

		.right {}
	}

	.nav2 {
		margin-top: 24rpx;
		margin-left: 30rpx;
		width: 690rpx;
		height: 276rpx;
		background: #ffffff;
		box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.16);
		display: flex;
		align-items: center;
		padding: 0 16rpx;

		.left {
			.pic1 {
				width: 248rpx;
				height: 248rpx;
			}
		}

		.right {
			width: 350rpx;
			margin-left: 44rpx;

			.tit1 {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.txt1-1 {
					font-size: 32rpx;
					font-weight: 700;
					color: #0f0f0f;
				}

				.txt1-2 {
					font-size: 28rpx;
					font-weight: 700;
					color: #000000;
				}
			}

			.tit2 {
				margin-top: 12rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.txt2-1 {
					font-size: 24rpx;
					font-weight: 500;
					color: #0f0f0f;
				}

				.txt2-2 {
					font-size: 20rpx;
					font-weight: 700;
					color: #808080;
				}
			}

			.tit3 {
				margin-top: 22rpx;
				display: flex;
				align-items: center;

				.tit3-1 {
					font-size: 20rpx;
					font-weight: 500;
					color: #d61d1d;
					width: 128rpx;
					height: 24rpx;
					background: #ffdbdb;
					border-radius: 4rpx;
					text-align: center;
					line-height: 24rpx;
				}
			}

			.tit4 {
				margin-top: 32rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.txt1 {
					width: 140rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #000000;
				}

				.right4 {
					display: flex;
					align-items: center;

					.jian {
						border: 2rpx solid #f2f2f2;
						height: 50rpx;
						width: 50rpx;
						font-size: 32rpx;
						font-weight: 500;
						text-align: center;
						color: #808080;
					}

					.txt {
						height: 50rpx;
						border-bottom: 2rpx solid #f2f2f2;
						border-top: 2rpx solid #f2f2f2;
						width: 60rpx;
						font-size: 32rpx;
						font-weight: 700;
						text-align: center;
						color: #000000;
					}
				}
			}
		}
	}

	.nav3 {
		width: 690rpx;
		margin-top: 20rpx;
		margin-left: 30rpx;
		background: #ffffff;
		box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.16);

		.item {
			height: 90rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 24rpx;
			border-bottom: 2rpx solid #f2f2f2;

			.txt1 {
				font-size: 28rpx;
				font-weight: 700;
				color: #000000;
			}

			.txt2 {
				font-size: 28rpx;
				font-weight: 700;
				color: #d61d1d;
			}
		}

		.item2 {
			border-top: 2rpx solid #f2f2f2;
			padding: 16rpx 24rpx;

			.txt {
				line-height: 84rpx;
				font-size: 20rpx;
				font-weight: 500;
				color: #808080;
			}
		}

		.item3 {
			height: 78rpx;
			border-top: 2rpx solid #f2f2f2;
			padding: 0 24rpx;

			.txt {
				font-size: 20rpx;
				font-weight: 700;
				color: #d61d1d;
				line-height: 78rpx;
			}
		}
	}

	.footer {
		position: fixed;
		bottom: 86rpx;
		left: 30rpx;
		width: 690rpx;
		height: 80rpx;
		background: #d61d1d;
		border-radius: 12rpx;
		font-size: 28rpx;
		font-weight: 700;
		text-align: center;
		line-height: 80rpx;
		color: #fafafc;
	}

	.pop {
		.tit1 {
			margin-top: 28rpx;

			.txt1 {
				margin-left: 24rpx;
				font-size: 28rpx;
				font-weight: 700;
				color: #000000;
			}
		}

		.item1 {
			padding: 0 68rpx;
			height: 152rpx;
			.t1 {
				padding-top: 32rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					display: flex;
					align-items: center;

					.pic1 {
						width: 42rpx;
						height: 38rpx;
					}
					.p2.pic1{
						height: 42rpx;
					}
					.p3.pic1{
						height: 42rpx;
					}

					.txt1-1 {
						margin-left: 32rpx;
						font-size: 28rpx;
						font-weight: 700;
						color: #000000;
					}

					.box1 {
						margin-left: 60rpx;
						width: 56rpx;
						height: 32rpx;
						border: 2rpx solid #ff0000;
						border-radius: 4rpx;
						font-size: 20rpx;
						font-weight: 500;
						text-align: center;
						line-height: 30rpx;
						color: #ff0000;
					}
				}
				.quan{
					width: 26rpx;
					height: 26rpx;
					border: 2rpx solid #808080;
					border-radius: 50%;
				}
				.quan2{
					width: 26rpx;
					height: 26rpx;
				}

			}
			.t2{
				margin-left: 74rpx;
				margin-top: 16rpx;
				font-size: 24rpx;
				font-weight: 500;
				color: #000000;
			}
		
		}
		.btn-footer{
			width: 276rpx;
			height: 60rpx;
			background: #d61d1d;
			border-radius: 8rpx;
			font-size: 28rpx;
			font-weight: 700;
			text-align: center;
			line-height: 60rpx;
			color: #ffffff;
			margin-left: 238rpx;
			margin-top: 16rpx;
		}
	}
	.pop2{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 30rpx;
		.p2-tit1{
			margin-top: 32rpx;
			font-size: 32rpx;
			font-weight: 700;
			color: #000000;
		}
		.p2-tit2{
			margin-top: 16rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #000000;
		}
	}
</style>
