<template>
	<view class="index">
		<image class="pic1" :src="shopObj.main_img" mode=""></image>
		<view class="container">
			<template v-if="shopObj.type == 2">
				<view class="tit1">{{shopObj.name}}</view>
				<view class="tit2">{{shopObj.sub_title}}</view>
				<view class="tit3">
					<view class="txt1">￥<text class="big">{{shopObj.price}}</text></view>
					<view class="txt2">已售出<text class="blue">31230</text>件</view>
				</view>
				<view class="tit4">商品描述</view>
				<view class="tit5">
					该服务该服务将采用报价模式：在您发布订单后，多个师傅将给 出服报价，您需要选择其中一位师傅。支付师傅的报价金额。
				</view>
			</template>
			<template v-if="shopObj.type == 1">
				<view class="page2-nav1">
					<view class="page2-left">报价</view>
					<view class="page2-right">
						<view class="tit1">{{shopObj.name}}</view>
						<view class="tit2">{{shopObj.sub_title}}</view>
						<view class="tit3">
							<view class="txt2">已服务<text class="blue">{{serve_count}}</text>件</view>
						</view>
					</view>
				</view>
				<view class="page2-nav2">
					<view class="tit1-1">服务保障</view>
					<view class="tit1-2">未服务全额退款/30分钟内愉悦/准时上门服务</view>
				</view>

				<view class="page2-nav3">报价模式</view>
				<view class="page2-nav4">
					<view class="tit4-1">“</view>
					<view class="tit4-2">
						该服务该服务将采用报价模式：在您发布订单后，多个师傅将给 出服报价，您需要选择其中一位师傅。支付师傅的报价金额。
					</view>
					<view class="tit4-3">”</view>
				</view>
				<view class="page2-nav5">下单流程</view>
				<image class="page2-pic1" src="/static/img/zu86.png" mode=""></image>
				<view class="page2-nav6">
					<view class="txt1 txt">发布需求</view>
					<view class="txt2 txt">师傅报价</view>
					<view class="txt3 txt">选择师傅</view>
					<view class="txt4 txt">上门服务</view>
					<view class="txt5 txt">验收评价</view>
				</view>
			</template>
			<template v-if="shopObj.type == 0">
				<view class="tit1">{{shopObj.name}}</view>
				<view class="tit2">{{shopObj.sub_title}}</view>
				<view class="tit3">
					<view class="txt1">￥<text class="big">{{shopObj.price}}</text></view>
					<view class="txt2">已服务<text class="blue">{{serve_count}}</text>件</view>
				</view>
				<view class="page2-nav2">
					<view class="tit1-1">服务保障</view>
					<view class="tit1-2">未服务全额退款/30分钟内愉悦/准时上门服务</view>
				</view>
				<view class="tit4">服务描述</view>
				<view class="tit5">
					该服务该服务将采用报价模式：在您发布订单后，多个师傅将给 出服报价，您需要选择其中一位师傅。支付师傅的报价金额。
				</view>
			</template>

			<view class="heng"></view>
			<view class="tit6">
				<view class="txt1 active">详情</view>
				<view @click="scrollPingjia" class="txt1">评价</view>
			</view>
			<image :src="shopObj.detail_img" class="piccc" mode=""></image>
			<view class="tit7">
				<view class="txt1">用户评价</view>
				<view @click="toPingjia" class="txt2">查看全部<u-icon name="arrow-right" color="#707070" size="28"></u-icon>
				</view>
			</view>
			<!-- <view class="pingjiaBtns">
				<view class="btn" v-for="item in 3">服务态度很好（9999）</view>
			</view> -->
			<view class="pingjiaItem">
				<view class="item" v-for="item in comment">
					<image class="pic1-1" :src="item.user_info.avatar" mode=""></image>
					<view class="left">
						<view class="tit1">
							<view class="tit1-1">
								<view class="txt1">{{item.user_info.nick_name}}</view>
								<view class="txt2">{{item.comment[0].created_at}}</view>
							</view>
							<view class="tit1-2">
								<u-rate disabled active-color="#1677FF" size='20' gutter="6" :count="pingjiaCount"
									v-model="item.comment[0].rate"></u-rate>
							</view>
						</view>
						<view class="tit2">{{item.comment[0].content}}</view>
						<view class="imgs">
							<image v-for="(ele,i) in item.comment[0].images" :key='i' @click="seeImg(item.comment[0].images,i)" class="img-pic" :src="ele"
								mode=""></image>
						</view>
					</view>
				</view>
			</view>
		
		</view>
		<!-- 底部 -->
		<view class="footer">
			<template v-if="shopObj.type == 0">
				<view class="nav1">
					<image class="pic1" src="/static/img/zu5.png" mode=""></image>
					<view class="txt1">客服</view>
				</view>
				<view class="nav2">去下单</view>
			</template>
			<template v-if="shopObj.type == 1">
				<view class="nav1">
					<image class="pic1" src="/static/img/zu5.png" mode=""></image>
					<view class="txt1">客服</view>
				</view>
				<view @click="toFabu" class="nav2">去报价</view>
			</template>
			<template v-if="shopObj.type == 2">
				<view class="nav1">
					<image class="pic1" src="/static/img/zu106.png" mode=""></image>
					<view class="txt1">客服</view>
				</view>
				<view class="nav3 nav1">
					<image class="pic1" src="/static/img/zu118.png" mode=""></image>
					<view class="txt1">购物车</view>
				</view>
				<view @click="toFabu" class="nav2">去下单</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				optionId: '',
				pageStatus: 2,
				pingjiaCount: 5,
				pingjiaFenshu: 4,
				imgList: [
					'https://img0.baidu.com/it/u=3012991178,3807188312&fm=26&fmt=auto&gp=0.jpg',
					'https://img1.baidu.com/it/u=334528594,4172277976&fm=26&fmt=auto&gp=0.jpg',
					'https://img0.baidu.com/it/u=3278254877,1490168144&fm=26&fmt=auto&gp=0.jpg',
				],
				pingjiaBtnsTop: 0,
				comment: [], //评论列表
				serve_count: 0, //服务次数
				shopObj: {},
			}
		},
		onShow() {
			this.$u.getRect(".pingjiaBtns").then(res => {
				this.pingjiaBtnsTop = res.top - 50;
			})
		},
		onLoad(option) {
			this.optionId = option.id;
			this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$api.items(this.optionId)
				console.log(res)
				this.comment = res.data.comment;
				this.comment.forEach(ele=>{
					ele.comment[0].images.forEach(ele2=>{
						if(!ele2){
							ele.comment[0].images.pop()
						}
					})
				})
				this.serve_count = res.data.serve_count;
				this.shopObj = res.data.item;
			},
			toPingjia(){
				uni.navigateTo({
					url:`/pages/index/shangpinxiangqin/pingjialiebiao?id=${this.optionId}`
				})
			},
			// 浏览评论图片
			seeImg(images,i) {
				uni.previewImage({
					urls: images,
					current: i
				})
			},
			// 点击评论页面滚动
			scrollPingjia() {
				uni.pageScrollTo({
					scrollTop: this.pingjiaBtnsTop
				})
			},
			toFabu() {
				// uni.navigateTo({
				// 	url: `/pages/index/fabuxuqiu/xiadan?item_id=${this.optionId}&bgImg=${this.shopObj.main_img}&bgName=${this.shopObj.name}`
				// })
				this.$u.route('/pages/index/fabuxuqiu/xiadan', {
					item_id: this.optionId,
					bgName:this.shopObj.name,
					bgImg:this.shopObj.main_img,
				});
			},
		},
		//用户点击右上角分享转发
		onShareAppMessage: async function() {
			const res = await this.$api.userShare({
				way: 2,
				product_id: this.product_id
			});
			console.log(res)

			var title = '分销商城app'; //data，return 数据title
			return {
				title: title || '',
				path: `/pages/index/shangpinxiangqin/shangpinxiangqin?scene=0_${res.data.p_user_id}`,
			}
		},
		//用户点击右上角分享朋友圈
		onShareTimeline: async function() {
			const res = await this.$api.userShare({
				way: 2,
				product_id: this.product_id
			});
			console.log(res)
			var title = '分销商城app'; //data，return 数据title
			return {
				title: title || '',
				path: `/pages/index/shangpinxiangqin/shangpinxiangqin?scene=0_${res.data.p_user_id}`,
			}
		},
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}
</style>
<style scoped lang="scss">
	.piccc{
		width: 100%;
	}
	.index {
		position: relative;
	}

	.pic1 {
		width: 750rpx;
		height: 588rpx;
	}

	.container {
		padding: 0 36rpx;
		margin-bottom: 186rpx;

		.tit1 {
			margin-top: 30rpx;
			font-size: 32rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 42rpx;
			color: #000000;
		}

		.tit2 {
			margin-top: 30rpx;
			font-size: 24rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 32rpx;
			color: #000000;
		}

		.tit3 {
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.txt1 {
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 28rpx;
				color: #4988FD;

				.big {
					font-size: 48rpx;
					font-weight: 600;
				}
			}

			.txt2 {
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 28rpx;
				color: #000000;

				.blue {
					color: #4988FD;
				}
			}
		}

		.tit4 {
			margin-top: 44rpx;
			font-size: 32rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 42rpx;
			color: #000000;
		}

		.tit5 {
			margin-top: 8rpx;
			font-size: 24rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 32rpx;
			color: #999999;
		}

		// 报价
		.page2-nav1 {
			display: flex;
			align-items: flex-start;

			.page2-left {
				width: 104rpx;
				height: 36rpx;
				background: #FFAA00;
				border-radius: 26rpx;
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 36rpx;
				text-align: center;
				color: #FFFFFF;
			}

			.page2-right {
				transform: translateY(-4rpx);
				width: 542rpx;
				margin-left: 22rpx;

				.tit1 {
					margin-top: 0;
				}

				.tit2 {
					margin-top: 12rpx;
				}

				.tit3 {
					margin-top: 36rpx;
				}
			}
		}

		.page2-nav2 {
			margin-top: 40rpx;
			width: 670rpx;
			height: 52rpx;
			border: 2rpx solid #B6CFFE;
			border-radius: 26rpx;
			padding: 0 24rpx;
			display: flex;
			align-items: center;

			.tit1-1 {
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				color: #000000;
			}

			.tit1-2 {
				margin-left: 22rpx;
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				color: #999999;
			}
		}

		.page2-nav3 {
			margin-top: 46rpx;
			margin-bottom: 16rpx;
			font-size: 32rpx;
			font-family: Segoe UI;
			font-weight: bold;
			line-height: 42rpx;
			color: #000000;
		}

		.page2-nav4 {
			height: 170rpx;

			.tit4-1 {
				font-size: 116rpx;
				font-family: SimHei;
				font-weight: 400;
				color: #E6E6E6;
				transform: translate(-62rpx, -20rpx);
			}

			.tit4-2 {
				transform: translateY(-90rpx);
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 32rpx;
				color: #999999;
			}

			.tit4-3 {
				font-size: 116rpx;
				font-family: SimHei;
				font-weight: 400;
				color: #E6E6E6;
				transform: translate(620rpx, -90rpx);
			}
		}

		.page2-nav5 {
			margin-bottom: 16rpx;
			font-size: 32rpx;
			font-family: Segoe UI;
			font-weight: bold;
			line-height: 42rpx;
			color: #000000;
		}

		.page2-pic1 {
			margin-left: 12rpx;
			width: 648rpx;
			height: 62rpx;
		}

		.page2-nav6 {
			margin-top: 10rpx;
			display: flex;
			justify-content: space-between;

			.txt {
				font-size: 24rpx;
				font-family: SimHei;
				font-weight: 400;
				line-height: 32rpx;
				color: #707070;
			}

			.txt1 {
				transform: translateX(-6rpx);
			}

			.txt2 {
				transform: translateX(-10rpx);
			}

			.txt4 {
				transform: translateX(16rpx);
			}

			.txt5 {
				transform: translateX(8rpx);
			}
		}

		.heng {
			margin-top: 30rpx;
			height: 2rpx;
			width: 100%;
			background: #707070;
		}

		.tit6 {
			margin: 20rpx 40rpx 38rpx 40rpx;
			display: flex;
			justify-content: space-around;

			.txt1 {
				font-size: 32rpx;
				font-family: SimHei;
				font-weight: 400;
				line-height: 42rpx;
				color: #707070;
				padding-bottom: 6rpx;
			}

			.txt1.active {
				color: #4D8BFD;
				border-bottom: 6rpx solid #4D8BFD;
			}
		}

		.tit7 {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 24rpx;

			.txt1 {
				font-size: 32rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 42rpx;
				color: #707070;
			}

			.txt2 {
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 28rpx;
				color: #707070;
			}
		}

		.pingjiaBtns {
			margin-bottom: 16rpx;

			.btn {
				padding: 12rpx 22rpx;
				display: inline-block;
				background: #E4ECFD;
				border-radius: 36rpx;
				font-size: 20rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				line-height: 28rpx;
				color: #000000;
				margin-bottom: 20rpx;
				margin-right: 20rpx;
			}
		}

		.pingjiaItem {
			.item {
				margin-bottom: 20rpx;
				width: 668rpx;
				height: 298rpx;
				background: #F5F5F5;
				opacity: 1;
				border-radius: 6rpx;
				padding: 30rpx 44rpx;
				display: flex;
				justify-content: space-between;

				.pic1-1 {
					width: 80rpx;
					height: 80rpx;
					background: #FFFFFF;
					border-radius: 50%;
				}

				.left {
					width: 465rpx;
					display: flex;
					flex-direction: column;

					.tit1 {
						margin-top: 0;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.tit1-1 {
							.txt1 {
								font-size: 28rpx;
								font-family: Microsoft YaHei;
								font-weight: 300;
								line-height: 38rpx;
								color: #000000;
							}

							.txt2 {
								font-size: 20rpx;
								font-family: Microsoft YaHei;
								font-weight: 300;
								line-height: 28rpx;
								color: #000000;
							}
						}

						.tit1-2 {}
					}

					.tit2 {
						margin-top: 14rpx;
						font-size: 28rpx;
						font-family: Microsoft YaHei;
						font-weight: 300;
						line-height: 38rpx;
						color: #000000;
					}

					.imgs {
						margin-top: 24rpx;
						display: flex;

						.img-pic {
							width: 96rpx;
							height: 96rpx;
							margin-right: 10rpx;
						}
					}
				}
			}
		}

	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 186rpx;
		background: #ffffff;
		border-top: 2rpx solid #E6E6E6;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 36rpx;
		.nav3.nav1{
			position: absolute;
			left: 112rpx;
			.pic1{
				width: 72rpx;
				height: 72rpx;
				transform: translateY(6rpx);
			}
		}
		.nav1 {
			width: 72rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.pic1 {
				width: 72rpx;
				height: 72rpx;
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
			width: 304rpx;
			height: 96rpx;
			background: #1677FF;
			opacity: 1;
			border-radius: 48rpx;
			font-size: 48rpx;
			font-family: SimHei;
			font-weight: 400;
			line-height: 96rpx;
			text-align: center;
			color: #FFFFFF;
		}

		.page2-nav1 {
			margin-left: 18rpx;
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
	}
</style>
