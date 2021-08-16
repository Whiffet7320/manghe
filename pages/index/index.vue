<template>
	<view class="index">
		<u-picker v-model="nav1Show" mode="time"></u-picker>
		<view class="nav1">
			<view @click="changeCity" class="txt1">温州市</view>
			<u-icon name="arrow-down" color="#000000" size="20"></u-icon>
			<view class="shu"></view>
			<u-icon name="search" color="#999999" size="26"></u-icon>
			<u-input class='search' v-model="keyword" type="text" placeholder="搜索您需要的服务" />
		</view>
		<!-- 轮播 -->
		<u-swiper height='542' :list="bannerList"></u-swiper>
		<view class="nav2">
			<view class="tit1">
				<view class="txt1-1">
					<view class="txt1-1-1">18万+</view>
					<view class="txt1-1-2">专业入驻师傅</view>
				</view>
				<view class="txt1-1">
					<view class="txt1-1-1">18万+</view>
					<view class="txt1-1-2">累计服务订单</view>
				</view>
				<view class="txt1-1">
					<view class="txt1-1-1">99%</view>
					<view class="txt1-1-2">服务好评率</view>
				</view>
			</view>
			<view class="tit2">
				<!-- <u-notice-bar mode="vertical" type="primary" :list="tzlist"></u-notice-bar> -->
				<image class="pic2-1" src="../../static/img/laba.png" mode=""></image>
				<view :style="{
						animationDuration: animationDuration,
						animationPlayState: animationPlayState,
					}" class="txt2-1">用户150****7056<text class="color">【桌椅安装】</text>下单成功</view>
			</view>
			<view class="tit3">
				<view class="item">
					<image class="pic" src="../../static/img/zu33.png" mode=""></image>
					<view class="txt">热门服务</view>
				</view>
				<view class="item">
					<image class="pic" src="../../static/img/zu34.png" mode=""></image>
					<view class="txt">家具安装</view>
				</view>
				<view class="item">
					<image class="pic" src="../../static/img/zu35.png" mode=""></image>
					<view class="txt">家电安装</view>
				</view>
				<view @click="toRushangcheng" class="item">
					<image class="pic" src="../../static/img/zu51.png" mode=""></image>
					<view class="txt">如商城</view>
				</view>
			</view>
			<view class="tit3 two">
				<view class="item">
					<image class="pic" src="../../static/img/zu36.png" mode=""></image>
					<view class="txt">其他安装</view>
				</view>
				<view class="item">
					<image class="pic" src="../../static/img/zu37.png" mode=""></image>
					<view class="txt">日常保洁</view>
				</view>
				<view @click="toZhuanpan" class="item">
					<image class="pic" src="../../static/img/zu54.png" mode=""></image>
					<view class="txt">抽奖转盘</view>
				</view>
				<view class="item">
					<image class="pic" src="../../static/img/zu38.png" mode=""></image>
					<view class="txt">全部服务</view>
				</view>
			</view>
			<view class="tit4">
				<view class="kk1">
					<view class="box1">
						<view class="box1-1">先领券再下单</view>
						<image class="pic" src="../../static/image/mcz12.png" mode=""></image>
					</view>
					<view class="kk2">
						<view class="box2">
							<view class="box2-1">空调续命季</view>
							<image class="pic" src="../../static/image/mcz12.png" mode=""></image>
						</view>
						<view class="box3">
							<view class="box3-1">组合特惠</view>
							<image class="pic" src="../../static/image/mcz12.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="tit5">
				<!-- 横向 -->
				<scroll-view class="scroll-view" scroll-x style="width: 100%;white-space:nowrap;">
					<image @click="toXiangqin(item.id)" v-for="item in 6" class="pic1"
						src="../../static/image/mcz12.png" mode="">
					</image>
				</scroll-view>
			</view>
			<view class="tit6">
				<view class="box1">
					<image class="pic" src="../../static/image/mcz12.png" mode=""></image>
					<view class="txt1">
						<image class="pic2" src="../../static/img/zu41.png" mode=""></image>
						<view class="txt1-1">热门好服务</view>
						<u-icon name="arrow-right" color="#000000" size="20"></u-icon>
					</view>
					<view class="txt2">质保期长，坏了重新修</view>
				</view>
				<view class="box2">
					<view class="items">
						<view class="item" v-for="item in 6">
							<image class="pic" src="../../static/img/213951li4p44khrhgyx44z.png" mode=""></image>
							<view class="txt">床体安装</view>
						</view>
					</view>
				</view>
			</view>
			<view class="tit6">
				<view class="box1">
					<image class="pic" src="../../static/image/mcz12.png" mode=""></image>
					<view class="txt1">
						<image class="pic2" src="../../static/img/zu40.png" mode=""></image>
						<view class="txt1-1">维修手艺好</view>
						<u-icon name="arrow-right" color="#000000" size="20"></u-icon>
					</view>
					<view class="txt2">质保期长，坏了重新修</view>
				</view>
				<view class="box2">
					<view class="items">
						<view class="item" v-for="item in 6">
							<image class="pic" src="../../static/img/213951li4p44khrhgyx44z.png" mode=""></image>
							<view class="txt">床体安装</view>
						</view>
					</view>
				</view>
			</view>
			<view class="tit6">
				<view class="box1">
					<image class="pic" src="../../static/image/mcz12.png" mode=""></image>
					<view class="txt1">
						<image class="pic2" src="../../static/img/zu39.png" mode=""></image>
						<view class="txt1-1">省心一口价</view>
						<u-icon name="arrow-right" color="#000000" size="20"></u-icon>
					</view>
					<view class="txt2">明码标价，上门不加价</view>
				</view>
				<view class="box2">
					<view class="items">
						<view class="item" v-for="item in 6">
							<image class="pic" src="../../static/img/213951li4p44khrhgyx44z.png" mode=""></image>
							<view class="txt">床体安装</view>
						</view>
					</view>
				</view>
			</view>
			<view class="tit7">
				<view class="tit7-1">
					<image class="pic1" src="../../static/img/01a72d578376ae0000018c1b3705a1.png" mode=""></image>
					<view class="tit7-1-1"><text class="txt">空调加氟多少钱？别被骗了还不知道</text></view>
				</view>
				<view v-for="item in 4" class="item">
					<view class="txt1">你家洗过热水器吗？我不建议你 洗！</view>
					<image class="pic1" src="../../static/img/20110309231034811.png" mode=""></image>
				</view>
			</view>

		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				nav1Show: false,
				keyword: '',
				bannerList: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				tzlist: [
					'寒雨连江夜入吴',
					'平明送客楚山孤',
					'洛阳亲友如相问',
					'一片冰心在玉壶'
				],
				animationDuration: '10s', // 动画执行时间
				animationPlayState: 'paused', // 动画的开始和结束执行
			}
		},
		methods: {
			changeCity() {
				this.nav1Show = true;
			},
			toZhuanpan(){
				uni.navigateTo({
					url:'/pages/index/zhuanpan/zhuanpan'
				})
			},
			toRushangcheng(){
				uni.navigateTo({
					url:'/pages/index/rushangcheng/rushangcheng'
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
		position: absolute;
		top: 2rpx;
		z-index: 1;
		left: 50%;
		transform: translateX(-50%);
		width: 710rpx;
		height: 76rpx;
		background: #FFFFFF;
		opacity: 1;
		border-radius: 16rpx;
		display: flex;
		align-items: center;

		.txt1 {
			margin: 0 16rpx;
			font-size: 28rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 38rpx;
			color: #000000;
			opacity: 1;
		}

		.shu {
			margin-left: 20rpx;
			margin-right: 94rpx;
			width: 0px;
			height: 20rpx;
			border: 1rpx solid #999999;
			opacity: 1;
		}

		.search {
			margin-left: 28rpx;
		}
	}

	.nav2 {
		transform: translateY(-37rpx);
		width: 750rpx;
		height: 2456rpx;
		background: linear-gradient(180deg, #FFFFFF 0%, #EFEFEF 100%);
		opacity: 1;
		border-radius: 60rpx 60rpx 0px 0px;

		.tit1 {
			display: flex;
			align-items: center;
			margin: 0 78rpx;
			justify-content: space-between;

			.txt1-1 {
				margin-top: 36rpx;
				display: flex;
				flex-direction: column;
				align-items: center;

				.txt1-1-1 {
					font-size: 48rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 64rpx;
					color: #4988FD;
					opacity: 1;
				}

				.txt1-1-2 {
					margin-top: 6rpx;
					font-size: 28rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 38rpx;
					color: #999999;
					opacity: 1;
				}
			}
		}

		.tit2 {
			margin: 24rpx 72rpx 0 72rpx;
			width: 600rpx;
			height: 60rpx;
			background: #E9F0FD;
			opacity: 1;
			border-radius: 30rpx;
			display: flex;
			align-items: center;

			.pic2-1 {
				margin-left: 34rpx;
				width: 36rpx;
				height: 24rpx;
			}

			.txt2-1 {
				margin-left: 28rpx;
				margin-right: 34rpx;
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 28rpx;
				color: #000000;
				opacity: 1;

				.color {
					color: #FF5700;
				}
			}
		}

		.tit3 {
			display: flex;
			flex-wrap: wrap;
			padding: 44rpx 82rpx 0 82rpx;
			justify-content: space-between;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;

				.pic {
					width: 104rpx;
					height: 104rpx;
					opacity: 1;
				}

				.txt {
					margin-top: 20rpx;
					font-size: 20rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 28rpx;
					color: #707070;
					opacity: 1;
				}
			}
		}

		.tit3.two {
			padding: 30rpx 82rpx 58rpx 82rpx;
		}

		.tit4 {
			margin: 0 20rpx;

			.kk1 {
				display: flex;
				justify-content: space-between;

				.box1 {
					position: relative;
					width: 344rpx;
					height: 344rpx;
					background: #E9F0FD;
					opacity: 1;
					border-radius: 16rpx;

					.box1-1 {
						position: absolute;
						z-index: 1;
						width: 162rpx;
						height: 38rpx;
						background: #5694FF;
						opacity: 1;
						border-radius: 16rpx 0px 16rpx 0px;
						font-size: 20rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 38rpx;
						color: #FFFFFF;
						opacity: 1;
						text-align: center;
					}

					.pic {
						width: 100%;
						height: 100%;
					}
				}

				.kk2 {
					justify-content: space-between;
					display: flex;
					flex-direction: column;

					.box2 {
						position: relative;
						width: 344rpx;
						height: 162rpx;
						background: #E9F0FD;
						opacity: 1;
						border-radius: 16rpx;

						.box2-1 {
							position: absolute;
							z-index: 2;
							width: 146rpx;
							height: 38rpx;
							background: #8256FF;
							opacity: 1;
							border-radius: 16rpx 0px 16rpx 0px;
							font-size: 20rpx;
							font-family: Segoe UI;
							font-weight: 400;
							line-height: 38rpx;
							text-align: center;
							color: #FFFFFF;
							opacity: 1;
						}

						.pic {
							width: 100%;
							height: 100%;
						}
					}

					.box3 {
						position: relative;
						width: 344rpx;
						height: 162rpx;
						background: #E9F0FD;
						opacity: 1;
						border-radius: 16rpx;

						.box3-1 {
							position: absolute;
							z-index: 2;
							width: 146rpx;
							height: 38rpx;
							background: #FF8D8D;
							opacity: 1;
							border-radius: 16rpx 0px 16rpx 0px;
							font-size: 20rpx;
							font-family: Segoe UI;
							font-weight: 400;
							line-height: 28rpx;
							color: #FFFFFF;
							opacity: 1;
							text-align: center;
						}

						.pic {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}

		.tit5 {
			margin: 54rpx 20rpx 22rpx 20rpx;

			.pic1 {
				width: 468rpx;
				height: 162rpx;
				border-radius: 16rpx;
				margin-right: 20rpx;
			}
		}

		.tit6 {
			.box1 {
				width: 750rpx;
				height: 186rpx;
				opacity: 1;
				position: relative;

				.pic {
					position: absolute;
					z-index: -1;
					width: 100%;
					height: 100%;
				}

				.txt1 {
					display: flex;
					align-items: center;
					padding-top: 30rpx;

					.pic2 {
						margin-left: 32rpx;
						margin-right: 22rpx;
						width: 38rpx;
						height: 38rpx;
					}

					.txt1-1 {
						font-size: 32rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 42rpx;
						color: #000000;
						opacity: 1;
						margin-right: 30rpx;
					}
				}

				.txt2 {
					margin-left: 92rpx;
					font-size: 28rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 38rpx;
					color: #000000;
					opacity: 1;
				}
			}

			.box2 {
				margin: 0 20rpx;
				transform: translateY(-30rpx);
				width: 710rpx;
				height: 358rpx;
				background: #FFFFFF;
				opacity: 1;
				border-radius: 16rpx;

				.items {
					padding: 18rpx 48rpx;
					display: flex;
					flex-wrap: wrap;

					.item {
						// flex: 0 0 33.3%;
						display: flex;
						flex-direction: column;
						align-items: center;
						margin-bottom: 7rpx;

						&:nth-child(2),
						&:nth-child(5) {
							margin: 0 120rpx;
						}

						.pic {
							width: 125rpx;
							height: 125rpx;
							opacity: 1;
						}

						.txt {
							margin-top: 6rpx;
							font-size: 20rpx;
							font-family: Segoe UI;
							font-weight: 400;
							line-height: 28rpx;
							color: #000000;
							opacity: 1;
						}
					}
				}
			}

		}

		.tit7 {
			background-color: #fff;
			margin: 0 20rpx 100rpx 20rpx;

			.tit7-1 {
				width: 710rpx;
				height: 215rpx;
				opacity: 1;
				border-radius: 16rpx;
				position: relative;

				.pic1 {
					width: 100%;
					height: 100%;
				}

				.tit7-1-1 {
					position: absolute;
					bottom: 0;
					width: 710rpx;
					height: 50rpx;
					padding: 0 48rpx;
					background: rgba($color: #000000, $alpha: 0.2);
					.txt {
						font-size: 24rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 32rpx;
						color: #FFFFFF;
						opacity: 1;
						line-height: 50rpx;
					}
				}
			}
			.item{
				height: 156rpx;
				display: flex;
				justify-content: space-between;
				padding: 20rpx 36rpx 14rpx 24rpx;
				.txt1{
					width: 336rpx;
					height: 64rpx;
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #000000;
					opacity: 1;
				}
				.pic1{
					width: 186rpx;
					height: 116rpx;
					opacity: 1;
				}
			}
		
		}
	}
</style>
