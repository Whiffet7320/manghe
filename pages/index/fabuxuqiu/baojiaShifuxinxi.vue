<template>
	<view class="index">
		<view class="tit1">多个师傅正在为您报价</view>
		<view class="tit2">
			距报价截止还剩：<text class="yellow">1天23小时55分钟</text>
		</view>
		<view class="tit3">
			<u-tabs-swiper bg-color="#F2F3F5" height='80' font-size="28" gutter="40" inactive-color="#707070"
				bar-height="6" bar-width="114" active-color="#4988FD" ref="uTabs" :list="list" :current="current"
				@change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			<swiper :style="[{height: height + 'px'}]" :current="swiperCurrent">
				<swiper-item @touchmove.stop class="swiper-item" v-for="(item, index) in list" :key="index">
					<scroll-view scroll-y='true' style="height: 90vh;">
						<view class="items">
							<!-- {{item.name}} -->
							<!-- 师傅信息 -->
							<template v-if="swiperCurrent == 0">
								<view class="tit1-1">需求很急？试试联系周边师傅来报价</view>
								<view class="item" v-for="item in 2">
									<view class="item-1">
										<image class="pic1" src="/static/img/1229310763000_mthumb.png" mode=""></image>
										<view class="left">
											<view class="txt1">
												<view class="txt1-1">程师傅</view>
												<u-icon name="arrow-right" color="#707070" size="20"></u-icon>
											</view>
											<view class="txt2">
												<image class="pic1" src="/static/img/zu62.png" mode=""></image>
												<view class="txt2-1">平台认证</view>
												<u-icon name="arrow-right" color="#17A54F" size="20"></u-icon>
											</view>
											<view class="txt3">
												<view class="txt3-1">服务40次</view>
												<view class="shu"></view>
												<view class="txt3-1">好评率100%</view>
											</view>
											<image class="pic2" src="/static/img/zu61.png" mode=""></image>
										</view>
									</view>
									<view class="item-2">
										<view class="item-2-1">
											<image class="pic1" src="/static/img/zu16.png" mode=""></image>
											<view class="txt11-1">空跑费29元/次</view>
										</view>
										<view class="item-2-1">
											<image class="pic2" src="/static/img/weixiu.png" mode=""></image>
											<view class="txt11-1">保修一个月</view>
										</view>
										<view class="item-2-1">
											<image class="pic3" src="/static/img/zu44.png" mode=""></image>
											<view class="txt11-1">不满意重新服务</view>
										</view>
									</view>
								</view>
							</template>
							<!-- 订单信息 -->
							<template v-if="swiperCurrent == 1">
								<view class="tit1-1">需求很急？试试联系周边师傅来报价</view>
								<view class="box1-1">
									<view class="tit11">
										<view class="txt11">沙发安装</view>
										<image class="pic11" src="/static/img/20110309231034811.png" mode=""></image>
									</view>
									<view class="tit22">
										<view class="txt11">物品类型（必填）</view>
										<view class="txt22">皮沙发1个</view>
									</view>
									<view class="tit33">
										<view class="txt11">需求说明</view>
										<view class="txt22">请填写尺寸、体积、dsa 重量等信息</view>
									</view>
								</view>
								<view class="box1-2">
									<view class="tit11">基本信息</view>
									<view class="tit22">
										<view class="tit22-1">
											<view class="txt1">订单编号</view>
											<view class="txt2">
												<view class="txt2-1">2C07222052609</view>
												<view class="shu"></view>
												<view class="txt2-2">复制</view>
											</view>
										</view>
									</view>
									<view class="tit33">
										<view class="txt1">下单时间</view>
										<view class="txt2">2021-07-22 14:39</view>
									</view>
									<view class="tit33">
										<view class="txt1">期望上门时间</view>
										<view class="txt2">2021-07-26 20:00-22:00</view>
									</view>
									<view class="tit44">
										<view class="tit1">服务地址</view>
										<view class="tit2">
											<view class="txt1">浙江省温州市瓯海区</view>
											<view class="txt1">兴海路将军华府3栋2单元</view>
										</view>
									</view>
									<view class="tit33">
										<view class="txt1">服务地址</view>
										<view class="txt2">李先生 1336456321</view>
									</view>
								</view>
							</template>
						</view>
					</scroll-view>

				</swiper-item>
			</swiper>
		</view>
		<view class="footer">
			<view class="nav1">
				<image class="pic1" src="/static/img/zu5.png" mode=""></image>
				<view class="txt1">客服</view>
			</view>
			<view @click="quxiaoDingdan" class="nav2">取消订单</view>
		</view>
	</view>
</template>

<script>
	export default {
		onShow() {
			this.tabsChange(0)
		},
		data() {
			return {
				//
				swiperCurrentIndex: 0,
				height: 800,
				list: [{
					name: '师傅信息'
				}, {
					name: '订单信息'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: null, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			}
		},
		methods: {
			quxiaoDingdan() {
				uni.navigateTo({
					url: '/pages/index/shangpinxiangqin/shangpinxiangqin'
				})
			},
			// tabs通知swiper切换
			tabsChange(index) {
				console.log(index);
				this.swiperCurrent = index;
				this.current = index;
				this.swiperCurrentIndex = index;
				// setTimeout(()=>{
				// 	this.getCurrentSwiperHeight('.items')
				// },200)
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

	.tit1 {
		margin-top: 50rpx;
		text-align: center;
		font-size: 32rpx;
		font-family: Segoe UI;
		font-weight: 400;
		line-height: 42rpx;
		color: #000000;
	}

	.tit2 {
		text-align: center;
		margin-top: 36rpx;
		font-size: 24rpx;
		font-family: Segoe UI;
		font-weight: 400;
		line-height: 32rpx;
		color: #000000;

		.yellow {
			color: #FF6600;
		}
	}

	.tit3 {
		margin-top: 100rpx;

		/deep/ .u-tabs-scorll-flex {
			margin: 0 100rpx;
		}

		.tit1-1 {
			text-align: center;
			margin-top: 20rpx;
			font-size: 28rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 38rpx;
			color: #707070;
		}

		.item {
			margin-top: 22rpx;
			margin-left: 20rpx;
			width: 710rpx;
			height: 228rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			padding: 0 38rpx;

			.item-1 {
				padding-top: 22rpx;
				display: flex;
				align-items: flex-start;
				justify-content: space-between;

				.pic1 {
					width: 76rpx;
					height: 76rpx;
					border-radius: 50%;
				}

				.left {
					width: 528rpx;
					position: relative;

					.txt1 {
						display: flex;
						align-items: center;

						.txt1-1 {
							margin-right: 20rpx;
							font-size: 28rpx;
							font-family: Segoe UI;
							font-weight: 400;
							line-height: 38rpx;
							color: #707070;
						}
					}

					.txt2 {
						margin-top: 8rpx;
						display: flex;
						align-items: center;

						.pic1 {
							width: 28rpx;
							height: 28rpx;
						}

						.txt2-1 {
							margin-left: 10rpx;
							margin-right: 12rpx;
							font-size: 20rpx;
							font-family: Segoe UI;
							font-weight: 400;
							line-height: 28rpx;
							color: #17A54F;
						}
					}

					.txt3 {
						margin-top: 8rpx;
						display: flex;
						align-items: center;

						.txt3-1 {
							font-size: 20rpx;
							font-family: Segoe UI;
							font-weight: 400;
							line-height: 28rpx;
							color: #999999;
						}

						.shu {
							height: 22rpx;
							margin: 0 16rpx;
							border: 2rpx solid #999999;
						}
					}

					.pic2 {
						position: absolute;
						width: 50rpx;
						height: 50rpx;
						right: 0;
						bottom: 0;
					}
				}
			}

			.item-2 {
				margin-top: 42rpx;
				display: flex;
				align-items: center;

				.item-2-1 {
					padding: 0 12rpx;
					height: 40rpx;
					background: #E9F0FD;
					border-radius: 10rpx;
					display: flex;
					align-items: center;
					margin-right: 20rpx;

					.pic1 {
						width: 31rpx;
						height: 31rpx;
					}

					.pic2 {
						width: 27rpx;
						height: 27rpx;
					}

					.pic3 {
						height: 18rpx;
						width: 25rpx;
					}

					.txt11-1 {
						margin-left: 14rpx;
						font-size: 20rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 28rpx;
						color: #000000;
					}
				}
			}

		}

		.box1-1 {
			margin-top: 20rpx;
			margin-left: 28rpx;
			padding: 0 40rpx;
			width: 692rpx;
			height: 310rpx;
			background: #FFFFFF;
			border-radius: 16rpx;

			.tit11 {
				padding-top: 16rpx;
				display: flex;
				align-items: flex-start;
				justify-content: space-between;

				.txt11 {
					font-size: 32rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 42rpx;
					color: #000000;
				}

				.pic11 {
					width: 116rpx;
					height: 116rpx;
				}
			}

			.tit22 {
				margin-top: 14rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.txt11 {
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #999999;
				}

				.txt22 {
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #000000;
				}
			}

			.tit33 {
				margin-top: 22rpx;
				display: flex;
				align-items: flex-start;
				justify-content: space-between;

				.txt11 {
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #999999;
				}

				.txt22 {
					width: 340rpx;
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #000000;
				}
			}
		}
		.box1-2{
			width: 692rpx;
			height: 340rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			margin: 20rpx 28rpx 0 28rpx;
			padding: 0 40rpx;
			.tit11{
				padding-top: 16rpx;
				font-size: 32rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 42rpx;
				color: #000000;
			}
			.tit22{
				display: flex;
				align-items: center;
				.tit22-1{
					margin-top: 20rpx;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.txt1{
						font-size: 24rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 32rpx;
						color: #999999
					}
					.txt2{
						display: flex;
						align-items: center;
						.txt2-1{
							font-size: 24rpx;
							font-family: Segoe UI;
							font-weight: 400;
							line-height: 32rpx;
							color: #000000;
						}
						.shu{
							height: 16rpx;
							border: 2rpx solid #E6E6E6;
							margin: 0 10rpx 0 20rpx;
						}
						.txt2-2{
							font-size: 24rpx;
							font-family: Segoe UI;
							font-weight: 400;
							line-height: 32rpx;
							color: #4988FD;
						}
					}
				}
			}
			.tit33{
				margin-top: 10rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.txt1{
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #999999;
				}
				.txt2{
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #000000;
				}
			}
			.tit44{
				margin-top: 10rpx;
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				.tit1{
					margin-top: 0;
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #999999;
				}
				.tit2{
					margin-top: 0;
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					.txt1{
						font-size: 24rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 32rpx;
						color: #000000;
					}
				}
			}
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 136rpx;
		background: #FFFFFF;
		border-top: 2rpx solid #E6E6E6;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 44rpx;

		.nav1 {
			width: 52rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.pic1 {
				width: 52rpx;
				height: 52rpx;
			}

			.txt1 {
				margin-top: 10rpx;
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 28rpx;
				color: #000000;
			}
		}

		.nav2 {
			width: 216rpx;
			height: 76rpx;
			background: #FFFFFF;
			border: 2rpx solid #707070;
			border-radius: 38rpx;
			font-size: 28rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 76rpx;
			text-align: center;
			color: #707070;
		}
	}
</style>
