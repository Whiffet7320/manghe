<template>
	<view class="index">
		<view class="nav1">
			<image class="pic1" src="/static/img/1229310763000_mthumb.png" mode=""></image>
			<view class="tit1">李师傅</view>
			<view class="tit2">
				<view class="box1">
					<view class="txt1">0<text class="small">次</text></view>
					<view class="txt2">已服务</view>
				</view>
				<view class="shu"></view>
				<view class="box1">
					<view class="txt1">100<text class="small">%</text></view>
					<view class="txt2">好评率</view>
				</view>
			</view>
		</view>
		<view class="nav2">
			<u-tabs-swiper bg-color="#F2F3F5" height='80' font-size="28" gutter="40" inactive-color="#707070"
				bar-height="6" bar-width="64" active-color="#4988FD" ref="uTabs" :list="list" :current="current"
				@change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			<swiper :style="[{height: height + 'px'}]" :current="swiperCurrent">
				<swiper-item @touchmove.stop  class="swiper-item" v-for="(item, index) in list" :key="index">
					<scroll-view  scroll-y='true' style="height:43vh">
						<view class="items">
							<!-- {{item.name}} -->
							<!-- 服务承诺 -->
							<template v-if="swiperCurrent == 0">
								<view class="boxx">
									<view class="tit1">基本服务承诺</view>
									<view class="item">
										<view class="tit2">
											<image class="pic1" src="/static/img/tuikuanshouhou.png" mode=""></image>
											<view class="txt1">未服务退全额</view>
										</view>
										<view class="tit3">师傅未上门服务前，支持全额退款，退款将于0-3个工作日 内到账</view>
									</view>
									<view class="item">
										<view class="tit2">
											<image class="pic1" src="/static/img/yuyue.png" mode=""></image>
											<view class="txt1">30分钟内预约</view>
										</view>
										<view class="tit3">用户选择师傅并支付完成后，师傅将会在30分钟内预约用户 上门服务的时间</view>
									</view>
									<view class="item">
										<view class="tit2">
											<image class="pic1" src="/static/img/zu16.png" mode=""></image>
											<view class="txt1">准时上门服务</view>
										</view>
										<view class="tit3">师傅按照预约时间，准时上门服务</view>
									</view>
								</view>
								<view class="boxx">
									<view class="tit1">师傅服务承诺</view>
									<view class="item">
										<view class="tit2">
											<image class="pic1" src="/static/img/zu53.png" mode=""></image>
											<view class="txt1">空跑费29元/次</view>
										</view>
										<view class="tit3">师傅上门后，若您取消订单，将收空跑费29元/次</view>
									</view>
									<view class="item">
										<view class="tit2">
											<image class="pic1" src="/static/img/baoxiu.png" mode=""></image>
											<view class="txt1">保修三个月</view>
										</view>
										<view class="tit3">服务玩成后三个月内，如商品出现无法正常使用，非产品问 题，师傅提供免费上门检修服务</view>
									</view>
									<view class="item">
										<view class="tit2">
											<image class="pic1" src="/static/img/zu541.png" mode=""></image>
											<view class="txt1">不满意重新服务 </view>
										</view>
										<view class="tit3">师傅按照预约时间，准时上门服务</view>
									</view>
								</view>
								<view @click="chooseShifu" class="btn">选择师傅</view>
							</template>
							<!-- 认证信息 -->
							<template v-if="swiperCurrent == 1">
								<view class="nav11">
									<image class="pic1" src="/static/img/zu56.png" mode=""></image>
									<view class="tit11">
										<view class="txt1">实名认证</view>
										<view class="txt2">已提供有效的身份证明</view>
									</view>
									<view class="tit22">
										<u-icon name="checkmark-circle-fill" color="#24BC29" size="32"></u-icon>
										<view class="txt1">已认证</view>
									</view>
								</view>
								<view class="nav11">
									<image class="pic2" src="/static/img/renlianshibie.png" mode=""></image>
									<view class="tit11">
										<view class="txt1">实名认证</view>
										<view class="txt2">已提供有效的身份证明</view>
									</view>
									<view class="tit22">
										<u-icon name="checkmark-circle-fill" color="#24BC29" size="32"></u-icon>
										<view class="txt1">已认证</view>
									</view>
								</view>
								<view @click="chooseShifu" class="btn btn2">选择师傅</view>
							</template>
						</view>
					</scroll-view>

				</swiper-item>
			</swiper>
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
				swiperCurrentIndex: 0,
				height: 0,
				list: [{
					name: '服务承诺'
				}, {
					name: '认证信息'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			}
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				console.log(index);
				this.swiperCurrent = index;
				this.current = index;
				this.swiperCurrentIndex = index;
				setTimeout(() => {
					this.getCurrentSwiperHeight('.items')
				}, 300)
			},
			getCurrentSwiperHeight(element) {
				let query = uni.createSelectorQuery().in(this);
				query.selectAll(element).boundingClientRect();
				query.exec((res) => {
					console.log(res, 'res', this.swiperCurrentIndex)
					this.height = 50 + res[0][this.swiperCurrentIndex].height;
				})
			},
			chooseShifu(){
				uni.navigateTo({
					url:'/pages/index/dingdantijiao/dingdantijiao'
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
		position: relative;
		width: 750rpx;
		height: 480rpx;
		background: #4988FD;

		.pic1 {
			position: absolute;
			top: 172rpx;
			left: 30rpx;
			width: 116rpx;
			height: 116rpx;
			background: #FFFFFF;
			border-radius: 50%;
		}

		.tit1 {
			position: absolute;
			top: 180rpx;
			left: 180rpx;
			font-size: 32rpx;
			font-family: Segoe UI;
			font-weight: bold;
			line-height: 42rpx;
			color: #FFFFFF;
		}

		.tit2 {
			position: absolute;
			top: 346rpx;
			left: 30rpx;
			width: 690rpx;
			height: 176rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.box1 {
				width: 346rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.txt1 {
					font-size: 48rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 28rpx;
					color: #000000;

					.small {
						font-size: 20rpx;
					}
				}

				.txt2 {
					margin-top: 22rpx;
					font-size: 20rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 28rpx;
					color: #999999;
				}
			}

			.shu {
				height: 102rpx;
				border: 2rpx solid #E6E6E6;
			}
		}
	}

	.nav2 {
		margin-top: 86rpx;

		/deep/ .u-tabs-scorll-flex {
			margin: 0 100rpx;
		}

		.items {
			.boxx {
				margin-top: 26rpx;
				margin-left: 30rpx;
				padding: 0 34rpx;
				width: 690rpx;
				height: 470rpx;
				background: #FFFFFF;
				border-radius: 6rpx;

				.tit1 {
					height: 82rpx;
					font-size: 28rpx;
					font-family: Segoe UI;
					font-weight: bold;
					line-height: 84rpx;
					color: #000000;
					border-bottom: 2rpx solid #E6E6E6;
				}

				.tit2 {
					display: flex;
					align-items: center;
					margin-top: 24rpx;

					.pic1 {
						width: 32rpx;
						height: 32rpx;
					}

					.txt1 {
						margin-left: 26rpx;
						font-size: 28rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 38rpx;
						color: #000000;
					}
				}

				.tit3 {
					margin-top: 8rpx;
					width: 510rpx;
					margin-left: 58rpx;
					font-size: 20rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 28rpx;
					color: #707070;
				}
			}

			.btn {
				margin-top: 54rpx;
				margin-left: 54rpx;
				width: 642rpx;
				height: 96rpx;
				background: #1677FF;
				border-radius: 48rpx;
				font-size: 48rpx;
				font-family: SimHei;
				font-weight: 400;
				line-height: 96rpx;
				text-align: center;
				color: #FFFFFF;
			}
			.btn.btn2{
				margin-top: 216rpx;
			}

			// 
			.nav11 {
				width: 690rpx;
				height: 96rpx;
				background: #FFFFFF;
				border-radius: 6rpx;
				margin-top: 20rpx;
				margin-left: 30rpx;
				display: flex;
				align-items: center;
				padding: 0 32rpx;

				.pic1 {
					width: 60rpx;
					height: 44rpx;
				}

				.pic2 {
					width: 60rpx;
					height: 56rpx;
				}

				.tit11 {
					flex: 1;
					margin-left: 16rpx;

					.txt1 {
						font-size: 28rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 38rpx;
						color: #000000;
					}

					.txt2 {
						font-size: 20rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 38rpx;
						color: #707070;
					}
				}

				.tit22 {
					display: flex;
					align-items: center;

					.txt1 {
						margin-left: 22rpx;
						font-size: 20rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 28rpx;
						color: #24BC29;
					}
				}
			}
		}
	}
</style>
