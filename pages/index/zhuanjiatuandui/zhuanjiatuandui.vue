<template>
	<view class="index">
		<view class="nav1">
			<!-- <view class="icon" @click="toBack">
				<u-icon name="arrow-left" color="#000000" size="34"></u-icon>
			</view> -->
			<view class="position-icon">
				<view @click="collect">
					<!-- 未收藏 -->
					<!-- <u-icon name="star" color="#000000" size="48"></u-icon> -->
					<!-- 已收藏 -->
					<u-icon name="star-fill" color="#000000" size="48"></u-icon>
				</view>
				<button class="btnshare u-reset-button" open-type="share">
					<u-icon name="zhuanfa" style='margin-left: 40rpx;' color="#000000" size="50"></u-icon>
				</button>
			</view>
			<view class="nav1-flex">
				<image class="pic" :src="obj.doctor_img" mode=""></image>
				<view class="f-right">
					<view class="txt1">{{obj.doctor_name}}</view>
					<view class="f-bottom">
						<view class="txt2">{{obj.doctor_titles}}</view>
						<view class="txt2">——{{obj.doctor_sub_titles}}</view>
					</view>
				</view>
			</view>
			<view class="tit1">
				<view class="titBtn" @click="contentShow=!contentShow">
					<view class="txt1">详情</view>
					<u-icon v-if="!contentShow" name="arrow-down" color="#000000" size="26"></u-icon>
					<u-icon v-else name="arrow-up" color="#000000" size="26"></u-icon>
				</view>
				<view class="content" v-if="contentShow">{{obj.doctor_content}}</view>
			</view>
		</view>
		<view class="nav2">
			<u-tabs-swiper bg-color="#F7F8FA" height='84' font-size="32" gutter="30" inactive-color="#707070"
				bar-height="4" bar-width="64" active-color="#BD9E81" ref="uTabs" :list="list" :current="current"
				@change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			<swiper :style="[{height: height + 'px'}]" :current="swiperCurrent">
				<swiper-item @touchmove.stop class="swiper-item" v-for="(item, index) in list" :key="index">
					<scroll-view scroll-y='true'>
						<view class="nav5Items">
							<!-- {{item.name}} -->
							<!-- 主页 -->
							<template v-if="swiperCurrent == 0">
								<view class="i1">
									<u-parse :html="obj.doctor_big_img"></u-parse>
								</view>
							</template>
							<!-- 案例 -->
							<template v-if="swiperCurrent == 1">
								<view class="i2">
									<u-parse :html="obj.doctor_anli"></u-parse>
								</view>
							</template>
							<!-- 评价 -->
							<template v-if="swiperCurrent == 2">
								<view class="i3">
									<view class="i3-nav1">
										<view class="tit1">
											<view class="tit1-1">
												<view class="txt1">评价</view>
												<view class="txt2">（好评度93%）</view>
											</view>
											<view class="tit1-2">共62条评论</view>
										</view>
										<view class="tit2">
											<view class="item">
												<view class="txt1">有图</view>
												<view class="txt2">43</view>
											</view>
											<view class="item">
												<u-icon name="thumb-up-fill" color="#BD9E81" size="22"></u-icon>
												<view class="txt2">43</view>
											</view>
											<view class="item bed">
												<u-icon name="thumb-down-fill" color="#D9D9D9" size="22"></u-icon>
												<view class="txt2">3</view>
											</view>
										</view>
									</view>
									<view class="i3-items">
										<view class="i3-item" v-for="item in 6">
											<image class="ava"
												src="https://img2.baidu.com/it/u=2329181912,1120533725&fm=26&fmt=auto"
												mode=""></image>
											<view class="right">
												<view class="tit1">
													<view class="txt1">狂野女孩</view>
													<view class="txt2">2021.10.24</view>
												</view>
												<view class="tit2">
													<u-icon name="thumb-up-fill" color="#BD9E81" size="22"></u-icon>
													<view class="txt2">赞了该商品</view>
												</view>
												<view class="tit3">哇塞，做出的效果远远大于我的期待值，真的做的超级自然，远看近看都很耐看。</view>
												<view class="tit4">
													<image @click.stop="toSeeImg(i,imgArr)" class="picc"
														v-for="(item,i) in imgArr" :src="item" mode=""></image>
												</view>
											</view>
										</view>
									</view>

								</view>
							</template>
						</view>
					</scroll-view>

				</swiper-item>
			</swiper>
		</view>
		<view class="fixedBtns">
			<button open-type="contact" bindcontact="handleContact" class="btn1">
				<image src="/static/image/zu1574.png" class="b-pic" mode=""></image>
				<view class="b-txt">在线咨询</view>
			</button>
			<button open-type="contact" bindcontact="handleContact" class="btn1 btn2">
				<image src="/static/image/zu1575.png" class="b-pic" mode=""></image>
				<view class="b-txt">挂号预约</view>
			</button>
			<button open-type="contact" bindcontact="handleContact" class="btn1 btn2">
				<image src="/static/image/lujin2236.png" class="b-pic" mode=""></image>
				<view class="b-txt">专家面诊</view>
			</button>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				obj: {},
				id: 0,
				isOnShow: true,
				contentShow: false,
				imgArr: ['https://img1.baidu.com/it/u=3303981320,1355171730&fm=26&fmt=auto',
					'https://img0.baidu.com/it/u=2394303781,1797253216&fm=26&fmt=auto',
					'https://img0.baidu.com/it/u=3941318376,4022646771&fm=26&fmt=auto'
				],
				//
				swiperCurrentIndex: 0,
				height: 0,
				list: [{
					name: '主页'
				}, {
					name: '案例'
				}, {
					name: '评价'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			}
		},
		computed:{
			...mapState({
				info: state => state.info
			})
		},
		onLoad(options){
			if(options.id){
				this.id = options.id;
			}
			if (options.obj) {
				this.obj = JSON.parse(decodeURIComponent(options.obj))
				console.log(this.obj)
			}
		},
		onShow() {
			if (!this.isOnShow) {
				return;
			}
			this.tabsChange(this.current);
		},
		mounted() {
			this.getCurrentSwiperHeight('.nav5Items')
		},
		methods: {
			collect() {
				this.$api.collectDoctor(this.id).then((res) => {
					if (res.status == 200) {
						this.$u.toast("收藏成功");
					}
				})
			},
			handleContact(e) {
				console.log(e.detail.path)
				console.log(e.detail.query)
			},
			toBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			toSeeImg(i, imgArr) {
				this.isOnShow = false;
				uni.previewImage({
					current: i,
					urls: imgArr,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) +
								'张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			// tabs通知swiper切换
			tabsChange(index) {
				console.log(index);
				this.swiperCurrent = index;
				this.current = index;
				this.swiperCurrentIndex = index;
				setTimeout(() => {
					this.getCurrentSwiperHeight('.nav5Items')
				}, 200)
			},
			getCurrentSwiperHeight(element) {
				let query = uni.createSelectorQuery().in(this);
				query.selectAll(element).boundingClientRect();
				query.exec((res) => {
					this.height = res[0][this.swiperCurrentIndex].height;
				})
			},
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				console.log(res.target)
			}
			return {
				title: '医美',
				path: '/pages/index/zhuanjiatuandui/zhuanjiatuandui?id=' + this.id
			}
		}
	}
</script>

<style>
	page {
		background: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.index {
		position: relative;
	}

	.nav1 {
		width: 750rpx;
		// height: 494rpx;
		// padding: 114rpx 40rpx 30rpx 40rpx;
		padding: 40rpx 40rpx 30rpx 40rpx;
		background: #FECF05;
		position: relative;

		// .icon {
		// 	padding-top: 114rpx;
		// }

		.position-icon {
			position: absolute;
			// top: 202rpx;
			top:40rpx;
			right: 46rpx;
			display: flex;
			align-items: center;
		}

		.nav1-flex {
			// margin-top: 74rpx;
			display: flex;
			align-items: center;

			.pic {
				width: 176rpx;
				height: 176rpx;
				border-radius: 50%;
				margin-right: 32rpx;
			}

			.f-right {
				height: 176rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.txt1 {
					margin-top: 30rpx;
					font-size: 36rpx;
					font-weight: bold;
					color: #122106;
				}

				.f-bottom {
					.txt2 {
						font-size: 28rpx;
						font-weight: bold;
						line-height: 40rpx;
						color: #122106;
					}
				}
			}
		}

		.tit1 {
			margin-left: 204rpx;
			margin-top: 28rpx;

			.titBtn {
				display: flex;
				align-items: center;
				width: 102rpx;
				height: 36rpx;
				justify-content: center;
				background: #F1C505;
				border-radius: 4rpx;

				.txt1 {
					font-size: 24rpx;
					font-weight: 400;
					margin-right: 8rpx;
				}
			}

			.content {
				margin-top: 32rpx;
				font-size: 24rpx;
				font-weight: 400;
				line-height: 34rpx;
				color: #122106;
			}


		}
	}

	.nav2 {
		/deep/ .u-tabs {
			padding: 0 80rpx;
		}

		margin-bottom: 240rpx;

		.swiper-item {
			// background: #FFFFFF;
		}

		.nav5Items {
			// padding: 8rpx 24rpx 20rpx 24rpx;
			// background: #FFFFFF;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.i1 {}

			.i2 {}

			.i3 {
				width: 100%;

				.i3-nav1 {
					background: #FFFFFF;
					padding: 24rpx;

					.tit1 {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.tit1-1 {
							display: flex;
							align-items: center;

							.txt1 {
								font-size: 32rpx;
								font-weight: 500;
								color: #BD9E81;
							}

							.txt2 {
								font-size: 24rpx;
								font-weight: 400;
								color: #707070;
							}
						}

						.tit1-2 {
							font-size: 24rpx;
							font-weight: 400;
							color: #707070;
						}
					}

					.tit2 {
						margin-top: 32rpx;
						display: flex;
						align-items: center;

						.item {
							border-radius: 10rpx;
							display: flex;
							align-items: center;
							padding: 12rpx 20rpx;
							background: #F2ECE6;
							margin-right: 20rpx;

							.txt1 {
								font-size: 24rpx;
								font-weight: bold;
								color: #707070;
							}

							.txt2 {
								margin-left: 12rpx;
								font-size: 24rpx;
								font-weight: bold;
								color: #707070;
							}
						}

						.item.bed {
							background: #FAFAFA;
						}
					}
				}

				.i3-items {
					background: #FFFFFF;
					margin-top: 20rpx;

					.i3-item {
						border-bottom: 2rpx solid #F7F8FA;
						display: flex;
						padding: 24rpx;

						.ava {
							height: 94rpx;
							width: 94rpx;
							border-radius: 50%;
						}

						.right {
							margin-left: 20rpx;
							width: calc(100% - 94rpx - 20rpx);

							.tit1 {
								display: flex;
								align-items: center;
								justify-content: space-between;

								.txt1 {
									font-size: 24rpx;
									font-weight: 500;
									color: #BD9E81;
								}

								.txt2 {
									font-size: 20rpx;
									font-weight: 400;
									color: #707070;
								}
							}

							.tit2 {
								display: flex;
								align-items: center;

								.txt2 {
									margin-top: 4rpx;
									margin-left: 8rpx;
									font-size: 20rpx;
									font-weight: 400;
									color: #707070;
								}
							}

							.tit3 {
								margin-top: 10rpx;
								font-size: 24rpx;
								font-weight: 400;
								color: #707070;
							}

							.tit4 {
								margin-top: 20rpx;

								.picc {
									border-radius: 8rpx;
									margin-right: 16rpx;
									width: 150rpx;
									height: 150rpx;
								}
							}
						}
					}
				}

			}
		}
	}

	.fixedBtns {
		position: fixed;
		right: 40rpx;
		bottom: 100rpx;

		.btn1::after {
			border: none;
		}

		.btn1 {
			width: 168rpx;
			height: 92rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 12rpx rgba(0, 0, 0, 0.16);
			opacity: 1;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.b-pic {
				width: 44rpx;
				height: 44rpx;
			}

			.b-txt {
				margin-left: 8rpx;
				width: 48rpx;
				font-size: 24rpx;
				font-weight: 500;
				line-height: 28rpx;
				color: #707070;
			}
		}

		.btn2.btn1 {
			&:nth-child(2) {
				margin: 20rpx 0;
			}

			background: #BD9E81;

			.b-txt {
				color: #FFFFFF;
			}
		}
	}
</style>
