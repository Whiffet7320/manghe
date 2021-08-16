<template>
	<view class="index">
		<!-- 联系客服 -->
		<u-action-sheet @click="kefuClick" :list="kefuList" v-model="kefuShow"></u-action-sheet>
		<view class="nav1">
			<view class="tit1">
				<image class="pic1" v-if='!user' src="../../static/img/1229310763000_mthumb.png" mode=""></image>
				<image class="pic1" v-else :src="user.user_info.avatar" mode=""></image>
				<view class="tit1-1" v-if="user">
					<view class="txt1">{{user.user_info.nick_name}}</view>
					<view class="txt2">133****1212</view>
				</view>
				<view class="tit1-2" @click="toLogin" v-else>请先登录</view>
			</view>
		</view>
		<view class="nav2">
			<view @click="toyouhuiquan" class="item1">
				<image class="pic1" src="../../static/img/yhq.png" mode=""></image>
				<view class="txt1">优惠券</view>
			</view>
			<view class="shu"></view>
			<view @click="toshouhuodizhi" class="item1">
				<image class="pic2" src="../../static/img/zu1.png" mode=""></image>
				<view class="txt1">我的地址</view>
			</view>
		</view>
		<view class="nav3">
			<view class="item" @click="toQianbao">
				<image class="pic1" src="../../static/img/qb.png" mode=""></image>
				<view class="txt">
					<view class="txt1">钱包</view>
					<view class="txt2">99.99</view>
				</view>
				<u-icon name="arrow-right" color="#989898" size="28"></u-icon>
			</view>
			<view class="item" @click="toJifen">
				<image class="pic2" src="../../static/img/jf.png" mode=""></image>
				<view class="txt">
					<view class="txt1">我的积分</view>
					<view class="txt2">99.99</view>
				</view>
				<u-icon name="arrow-right" color="#989898" size="28"></u-icon>
			</view>
			<view class="item" @click="toAnquanzhongxin">
				<image class="pic3" src="../../static/img/zu4.png" mode=""></image>
				<view class="txt">
					<view class="txt1">安全中心</view>
					<view class="txt2"></view>
				</view>
				<u-icon name="arrow-right" color="#989898" size="28"></u-icon>
			</view>
			<view class="item" @click="toYijianfankui">
				<image class="pic4" src="../../static/img/zu7.png" mode=""></image>
				<view class="txt">
					<view class="txt1">意见反馈</view>
					<view class="txt2"></view>
				</view>
				<u-icon name="arrow-right" color="#989898" size="28"></u-icon>
			</view>
			<view class="item" @click="lianxikefu">
				<image class="pic4" src="../../static/img/zu5.png" mode=""></image>
				<view class="txt">
					<view class="txt1">联系客服</view>
					<view class="txt2"></view>
				</view>
				<u-icon name="arrow-right" color="#989898" size="28"></u-icon>
			</view>
			<view class="item" @click="toShezhi">
				<image class="pic4" src="../../static/img/sz.png" mode=""></image>
				<view class="txt">
					<view class="txt1">设置</view>
					<view class="txt2"></view>
				</view>
				<u-icon name="arrow-right" color="#989898" size="28"></u-icon>
			</view>
		</view>
		<view class="nav4">
			<view class="item">
				<image class="pic1" src="../../static/img/weixiu.png" mode=""></image>
				<view class="txt">
					<view class="txt1">我是师傅</view>
					<view class="txt2">查看入驻信息</view>
				</view>
				<u-icon name="arrow-right" color="#989898" size="28"></u-icon>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: null,
				kefuList: [{
					text: '电话客服',
				}, {
					text: '在线客服',
				}],
				kefuShow: false,
			}
		},
		onShow(){
			if(uni.getStorageSync('myUser')){
				this.user = uni.getStorageSync('myUser');
			}
			console.log(this.user,1111)
		},
		methods: {
			toLogin() {
				uni.navigateTo({
					url: '/pages/wode/weixinshouquan/weixinshouquan'
				})
			},
			toyouhuiquan() {
				uni.navigateTo({
					url: '/pages/wode/youhuiquan/youhuiquan'
				})
			},
			toshouhuodizhi() {
				uni.navigateTo({
					url: '/pages/wode/shouhuodizhi/shouhuodizhi'
				})
			},
			toQianbao() {
				uni.navigateTo({
					url: '/pages/wode/qianbao/qianbao'
				})
			},
			toJifen() {
				uni.navigateTo({
					url: '/pages/wode/jifen/jifen'
				})
			},
			toAnquanzhongxin() {
				uni.navigateTo({
					url: '/pages/wode/anquanzhongxin/anquanzhongxin'
				})
			},
			toYijianfankui() {
				uni.navigateTo({
					url: '/pages/wode/yijianfankui/yijianfankui'
				})
			},
			lianxikefu() {
				this.kefuShow = true;
			},
			kefuClick(index) {
				console.log(`点击了第${index + 1}项，内容为：${this.kefuList[index].text}`)
			},
			toShezhi(){
				uni.navigateTo({
					url: '/pages/wode/shezhi/shezhi'
				})
			},
		},
		// 用户点击右上角分享转发
		onShareAppMessage: async function() {
			const res = await this.$api.userShare({
				way: 2,
				product_id: this.product_id
			});
			// console.log(res)

			var title = '分销商城app'; //data，return 数据title
			return {
				title: title || '',
				path: `/pages/index/index?scene=0_${res.share_userid}`,
			}
		},
		//用户点击右上角分享朋友圈
		onShareTimeline: async function() {
			const res = await this.$api.userShare({
				way: 2,
				product_id: this.product_id
			});
			var title = '分销商城app'; //data，return 数据title
			return {
				title: title || '',
				path: `/pages/index/index?scene=0_${res.share_userid}`,
			}
		},
	}
</script>

<style lang="scss">
	page {
		background: #F2F3F5;
	}
</style>
<style scoped lang="scss">
	.index {}

	.nav1 {
		width: 750rpx;
		height: 436rpx;
		background: #4988FD;
		opacity: 1;

		.tit1 {
			padding: 0 30rpx;
			display: flex;

			.pic1 {
				margin-top: 128rpx;
				width: 144rpx;
				height: 144rpx;
				background: #FFFFFF;
				border-radius: 50%;
				opacity: 1;
			}

			.tit1-1 {
				display: flex;
				flex-direction: column;
				margin-top: 124rpx;
				margin-left: 44rpx;

				.txt1 {
					font-size: 32rpx;
					font-family: Segoe UI;
					font-weight: bold;
					line-height: 42rpx;
					color: #FFFFFF;
					opacity: 1;
				}

				.txt2 {
					margin-top: 14rpx;
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #FFFFFF;
					opacity: 1;
				}
			}

			.tit1-2 {
				margin-top: 152rpx;
				margin-left: 54rpx;
				width: 338rpx;
				height: 96rpx;
				background: #3D6FCC;
				opacity: 1;
				border-radius: 48rpx;
				font-size: 40rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 54rpx;
				color: #FFFFFF;
				text-align: center;
				line-height: 96rpx;
			}
		}
	}

	.nav2 {
		margin: -134rpx 30rpx 20rpx 30rpx;
		width: 690rpx;
		height: 176rpx;
		background: #FFFFFF;
		opacity: 1;
		border-radius: 16rpx;
		display: flex;

		.item1 {
			width: 346rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.pic1 {
				margin-top: 36rpx;
				margin-bottom: 18rpx;
				width: 63rpx;
				height: 63rpx;
			}

			.txt1 {
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 28rpx;
				color: #000000;
				opacity: 1;
			}

			.pic2 {
				margin-top: 40rpx;
				margin-bottom: 12rpx;
				width: 52rpx;
				height: 66rpx;
			}
		}

		.shu {
			margin-top: 40rpx;
			width: 0px;
			height: 102rpx;
			border: 2rpx solid #E6E6E6;
			opacity: 1;
		}
	}

	.nav3 {
		width: 690rpx;
		height: 456rpx;
		background: #FFFFFF;
		opacity: 1;
		border-radius: 16rpx;
		margin: 0 30rpx;

		.item {
			height: 76rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 42rpx;

			.pic1 {
				width: 41rpx;
				height: 38rpx;
			}

			.pic2 {
				margin: 0 2rpx;
				width: 37rpx;
				height: 39rpx;
			}

			.pic3 {
				width: 41rpx;
				height: 47rpx;
			}

			.pic4 {
				width: 41rpx;
				height: 41rpx;
			}

			.txt {
				margin: 0 46rpx 0 28rpx;
				width: 552rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.txt1 {
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #000000;
					opacity: 1;
				}

				.txt2 {
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #000000;
					opacity: 1
				}
			}
		}


	}

	.nav4 {
		margin: 20rpx 30rpx 34rpx 30rpx;
		width: 690rpx;
		height: 78rpx;
		background: #FFFFFF;
		opacity: 1;
		border-radius: 16rpx;

		.item {
			height: 76rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 42rpx;

			.pic1 {
				width: 41rpx;
				height: 38rpx;
			}

			.txt {
				margin: 0 46rpx 0 28rpx;
				width: 552rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.txt1 {
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #000000;
					opacity: 1;
				}

				.txt2 {
					font-size: 20rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 28rpx;
					color: #999999;
					opacity: 1;
				}
			}
		}
	}
</style>
