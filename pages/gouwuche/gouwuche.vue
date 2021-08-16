<template>
	<view class="index">
		<view class="content">
			<u-toast ref="uToast" />
			<u-navbar :is-back='false' title="购物车" :title-bold='true' title-color="#ffffff"
				:background="{ background: '#282828' }">
				<view class="slot-wrap" @tap="qianbujinkong">全部清空</view>
			</u-navbar>
			<!-- 不为空 -->
			<view class="container" v-if="list.length>0">
				<view class="items">
					<view class="item" v-for="(item,i) in list" :key="i">
						<view v-if="item.sku_info.size" @click="onRadioBtn(item,i)"
							:class="{'myradio':true,'active':myRadio[i].radio}">
							<view class="radio_c"></view>
						</view>
						<view v-else class="myradio no">
							<view class="radio_c"></view>
						</view>
						<u-icon @click="delShop(item,i)" class="myIcon" name="trash-fill"></u-icon>
						<view class="nav2">
							<image class="pic1" :src="item.pic_arr[0].img" mode=""></image>
							<view class="tit">
								<view class="tit1">{{item.product_info.title}}</view>
								<view class="tit2" v-if="item.sku_info.size">
									<view class="tit2-1">{{item.sku_info.size}} ×{{item.stock}}</view>
									<view class="tit2-2">￥{{item.sku_info.price * item.stock}}</view>
								</view>
								<view class="tit2" v-else>
									<view class="tit2-1">{{item.sku_info}}</view>
								</view>
								<view class="tit3">
									<view @click="jianShop(item,i)" class="tit3-1">-</view>
									<view class="tit3-num">{{item.stock}}</view>
									<view @click="jiaShop(item,i)" class="tit3-1">+</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="itemem"></view>
			</view>

			<!-- 为空 -->
			<view class="kong-container" v-else>
				<view class="kong">
					<image src="/static/image/zu40.png" mode=""></image>
				</view>
				<view class="line"></view>
			</view>



			<!-- 			<view class="nav2">
				<view class="nav-title">猜你喜欢</view>
			</view>
			<view class="container2">
				<view class="items">
					<view class="item" v-for="item in cnxhList" :key="item.id">
						<image @click="toxiangqin(item)" class="pic1" :src="item.img" mode=""></image>
						<view class="right">
							<view class="tit1">
								<view class="txt">{{item.title}}</view>
							</view>
							<view class="tit2">￥{{item.price}}</view>
						</view>
					</view>
					<view class="noMore">没有更多啦~</view>
				</view>
			</view> -->

			<!-- 结算 -->
			<view class="footer">
				<view class="tit1">
					<view @click="onallRadioBtn" :class="{'allmyradio':true,'active':allRadio}">
						<view class="radio_c"></view>
						<view class="radiotit">全选</view>
					</view>
					<view class="tit1-1">
						<view class="tit1-1-1">合计：</view>
						<view class="tit1-1-2">{{priceNum}}</view>
					</view>
				</view>

				<view class="btns" @tap="toZjgm">
					<view class="tit2">结算({{myRadioNum}})</view>
				</view>

			</view>

			<!-- 直接购买跳转至登录 -->
			<u-popup class='zhidl' z-index="99999" v-model="newzjgmshow" mode="center" border-radius="14">
				<view class="zhidl2">
					<view class="tit1">您还未登录，是否去登录？</view>
					<view class="btns">
						<u-button size="mini" type="success" @click='qd'>去登录</u-button>
						<u-button size="mini" @click='qxqd'>取消</u-button>
					</view>
				</view>
			</u-popup>
		</view>

	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["mdgmShow"]),
		},
		data() {
			return {
				shopArr: null,
				myRadio: [],
				myRadioNum: 0,
				allRadio: false, //全选
				isLike: true,
				zjgmShow: false,
				// mdgmShow: false,
				checked: false,
				value: 'wx',
				openid: null,
				// 购物车列表
				list: [],
				// 总金额
				priceNum: 0,
				// 总运费
				yunPrice: 0,
				// 跳转至登录
				newzjgmshow: false,
			}
		},
		watch: {
			myRadio: {
				handler: function() {
					console.log(this.myRadio, 1111)
					this.priceNum = 0;
					this.myRadioNum = 0;
					this.myRadio.forEach(ele => {
						if (ele && !ele.sku_info.price) {
							this.priceNum = 0;
						} else if (ele && ele.radio) {
							this.myRadioNum++;
							this.priceNum += ele.stock * ele.sku_info.price;
						}
					})
					console.log(this.myRadioNum, this.myRadio.length)
					this.allRadio = this.myRadioNum == this.myRadio.length ? true : false;
				},
				deep: true,
			},
		},
		onLoad(option) {
			// this.openid = uni.getStorageSync('openid')
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
		onShow() {
			if (this.list.length != 0) {
				if (uni.getStorageSync('shopArr')) {
					this.shopArr = JSON.parse(uni.getStorageSync('shopArr'));
				}
			}
			if (this.shopArr) {
				this.shopArr.forEach((ele, i) => {
					this.$set(this.myRadio, i, ele)
				})
			}
			this.getData();
		},
		methods: {
			async getData() {
				const res = await this.$api.cartIndex()
				console.log(res)
				if (res.code == 200) {
					res.data.data.forEach((ele, i) => {
						ele.pic_arr.forEach(item => {
							if (item.path.slice(0, 1) == ".") {
								item.path = item.path.substr(1);
							}
							item.img = item.domain + item.path;
						})
					})
					this.list = res.data.data;
					if (this.list.length == 0) {
						this.priceNum = 0;
						this.myRadio = []
					}
				} else {
					this.$refs.uToast.show({
						title: res.message,
						type: 'warning',
						duration: 1000
					})
				}

			},
			// 全部清空购物车
			async qianbujinkong() {
				const res = await this.$api.cartDel_all_cart();
				console.log(res);
				this.myRadio.forEach((ele, i) => {
					this.$set(this.myRadio, i, '')
				})
				this.getData();
			},
			onRadioBtn(item, i) {
				if (this.myRadio[i] && this.myRadio[i].radio) {
					item.radio = false;
					this.$set(this.myRadio, i, '')
				} else {
					item.radio = true;
					this.$set(this.myRadio, i, item)
				}
			},
			// 全选
			onallRadioBtn() {
				if (this.allRadio) {
					this.list.forEach((ele, i) => {
						ele.radio = false;
						this.$set(this.myRadio, i, '');
					})
					this.allRadio = false;
				} else {
					this.list.forEach((ele, i) => {
						ele.radio = true;
						this.$set(this.myRadio, i, ele);
					})
					this.allRadio = true;
				}
			},
			// 结算 
			toZjgm() {
				console.log(this.myRadio[0])
				if (!this.myRadio[0] || !this.myRadio[0].sku_info.price) {
					this.$refs.uToast.show({
						title: "请选择商品",
						type: 'warning',
						duration: 1000
					})
				} else {
					uni.setStorageSync('shopArr', JSON.stringify(this.myRadio));
					uni.navigateTo({
						url: `/pages/index/shangpinxiangqin/lijigoumai?shopArr=${JSON.stringify(this.myRadio)}`
					})
				}

			},
			async jianShop(item, i) {
				const stock = item.stock - 1;
				const res = await this.$api.cartChange_cart_num({
					cart_id: item.cart_id,
					number: stock
				})
				console.log(res)
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: res.message,
						type: 'success',
						duration: 1000
					})
					item.stock--
					this.myRadio[i].stock = item.stock
				} else {
					this.$refs.uToast.show({
						title: res.message,
						type: 'warning',
						duration: 1000
					})
				}
			},
			async jiaShop(item, i) {
				const stock = item.stock + 1
				const res = await this.$api.cartChange_cart_num({
					cart_id: item.cart_id,
					number: stock
				})
				console.log(res)
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: res.message,
						type: 'success',
						duration: 1000
					})
					item.stock++;
					this.myRadio[i].stock = item.stock
				} else {
					this.$refs.uToast.show({
						title: res.message,
						type: 'warning',
						duration: 1000
					})
				}
			},
			async delShop(item, i) {
				const res = await this.$api.del_cart_product(item.cart_id);
				console.log(res)
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: res.message,
						type: 'success',
						duration: 1000
					})
					this.getData()
					this.$set(this.myRadio, i, null)
				} else {
					this.$refs.uToast.show({
						title: res.message,
						type: 'warning',
						duration: 1000
					})
				}
			},
		},
	}
</script>

<style scoped lang="scss">
	.slot-wrap {
		opacity: 1;
		font-size: 20rpx;
		font-family: PingFang SC, PingFang SC-Regular;
		font-weight: 400;
		text-align: left;
		color: #ffffff;
		letter-spacing: 0rpx;
		margin-left: 34rpx;
	}

	.content {}

	.zhidl {
		.zhidl2 {
			padding: 40rpx;

			.tit1 {
				margin-bottom: 16rpx;
			}

			.btns {
				display: flex;
				justify-content: space-around;
			}
		}
	}

	.index {
		position: relative;
	}


	.container {
		.itemem{
			height: 106rpx;
		}
		.items {
			// margin-bottom: 106rpx;
			.item {
				position: relative;
				margin: 0 auto;
				width: 706rpx;
				height: 188rpx;
				opacity: 1;
				background: #ffffff;
				border-radius: 20rpx;
				box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);

				.myradio {
					position: absolute;
					left: 22rpx;
					top: 50%;
					transform: translate(0, -50%);
					width: 28rpx;
					height: 28rpx;
					opacity: 1;
					background: #ffffff;
					border: 2rpx solid #eaeaea;
					border-radius: 50%;
				}

				.myradio.no {
					.radio_c {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						width: 16rpx;
						height: 16rpx;
						border-radius: 50%;
						background: #bbbbbb;
					}
				}

				.myradio.active {
					position: absolute;
					left: 22rpx;
					top: 50%;
					transform: translate(0, -50%);
					width: 28rpx;
					height: 28rpx;
					opacity: 1;
					background: #ffffff;
					border: 2rpx solid #DD2638;
					border-radius: 50%;

					.radio_c {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						width: 16rpx;
						height: 16rpx;
						border-radius: 50%;
						background: #DD2638;
					}
				}

				.myIcon {
					position: absolute;
					top: 32rpx;
					right: 40rpx;
				}

				.nav2 {
					display: flex;
					margin-top: 24rpx;
					height: 163rpx;

					.pic1 {
						margin-top: 24rpx;
						margin-left: 24rpx;
						width: 140rpx;
						height: 140rpx;
						opacity: 1;
					}

					.tit {
						margin-left: 20rpx;
						margin-top: 24rpx;
						width: 492rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.tit1 {
							width: 410rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							opacity: 1;
							font-size: 24rpx;
							font-family: PingFang SC, PingFang SC-Medium;
							font-weight: 500;
							color: #000000;
						}

						.tit2 {
							margin-top: 13rpx;
							height: 36rpx;
							display: flex;
							align-items: center;
							justify-content: space-between;

							.tit2-2 {
								opacity: 1;
								font-size: 24rpx;
								font-family: PingFang SC, PingFang SC-Medium;
								font-weight: 500;
								color: #dd2638;
							}

							.tit2-1 {
								opacity: 1;
								font-size: 20rpx;
								font-family: PingFang SC, PingFang SC-Medium;
								font-weight: 500;
								color: #6f7070;
							}
						}

						.tit3 {
							display: flex;
							align-items: center;

							.tit3-1 {
								width: 20rpx;
								height: 44rpx;
								opacity: 1;
								font-size: 32rpx;
								font-family: PingFang SC, PingFang SC-Medium;
								font-weight: 500;
								text-align: left;
								color: #c7c7c7;
							}

							.tit3-num {
								margin: 0 18rpx;
								opacity: 1;
								font-size: 24rpx;
								font-family: PingFang SC, PingFang SC-Bold;
								font-weight: 700;
								text-align: left;
								color: #ffcc02;
							}
						}
					}

				}
			}
		}
	}

	.nav2 {
		margin: 36rpx 49rpx 51rpx 49rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.nav-title {
			opacity: 1;
			font-size: 45rpx;
			font-family: SourceHanSansCN-Regular;
			text-align: left;
			color: #121212;
			line-height: 71rpx;
		}

		.pic {
			margin-left: 391rpx;
			width: 34rpx;
			height: 34rpx;
			opacity: 1;
		}
	}

	.container2 {
		margin: 0 49rpx 29rpx 49rpx;

		.items {
			border-bottom: 2rpx solid #af0000;

			.item {
				display: flex;
				margin-bottom: 28rpx;

				.pic1 {
					width: 228rpx;
					height: 163rpx;
					opacity: 1;
				}

				.right {
					width: calc(100% - 98rpx);

					.tit1 {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.txt {
							opacity: 1;
							font-size: 25rpx;
							font-family: PingFang SC, PingFang SC-Bold;
							font-weight: 700;
							text-align: left;
							color: #121314;
							letter-spacing: 2rpx;
						}

						.pic {
							width: 22rpx;
							height: 25rpx;
							opacity: 1;
						}
					}

					.tit2 {
						margin-top: 16rpx;
						opacity: 1;
						font-size: 25rpx;
						font-family: PingFang SC, PingFang SC-Bold;
						font-weight: 700;
						text-align: left;
						color: #ebbfcc;
						letter-spacing: 2rpx;
					}

					.tit3 {
						display: flex;
						align-items: center;
						height: 36rpx;
						margin-top: 46rpx;

						.pic1 {
							width: 22rpx;
							height: 22rpx;
							opacity: 1;
						}

						.pic2 {
							width: 22rpx;
							height: 22rpx;
							opacity: 1;
						}

						.tit {
							margin: 0 27rpx;
							opacity: 1;
							font-size: 25rpx;
							font-family: PingFang SC, PingFang SC-Bold;
							font-weight: 700;
							text-align: right;
							color: #121314;
							letter-spacing: 2rpx;
						}

						.pic3 {
							margin-left: 199rpx;
							width: 22rpx;
							height: 31rpx;
							opacity: 1;
						}

						.pic4 {
							margin-left: 41rpx;
							width: 29rpx;
							height: 31rpx;
							opacity: 1;
						}
					}
				}
			}

			.noMore {
				width: 144rpx;
				height: 24rpx;
				margin-bottom: 37rpx;
				opacity: 1;
				margin-left: 50%;
				transform: translateX(-50%);
				font-size: 16rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: left;
				color: #9b9b9b;
				letter-spacing: 1rpx;
			}
		}
	}

	.kong-container {
		.kong {
			margin: 257rpx 252rpx 144rpx 255rpx;

			image {
				width: 243rpx;
				height: 228rpx;
				opacity: 1;
			}

		}

		.line {
			margin-left: 48rpx;
			width: 701rpx;
			height: 2rpx;
			opacity: 0.1;
			background: #af0000;
		}
	}

	.footer {
		position: fixed;
		bottom: 0rpx;
		width: 750rpx;
		height: 80rpx;
		opacity: 1;
		background: #ffffff;
		box-shadow: 0rpx -6rpx 6rpx 0rpx rgba(0, 0, 0, 0.05);
		display: flex;

		.tit1 {
			width: 478rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			position: relative;

			.allmyradio {
				display: flex;
				position: absolute;
				left: 36rpx;
				top: 50%;
				transform: translate(0, -50%);
				width: 28rpx;
				height: 28rpx;
				opacity: 1;
				background: #ffffff;
				border: 2rpx solid #eaeaea;
				border-radius: 50%;

				.radio_c {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 16rpx;
					height: 16rpx;
					border-radius: 50%;
					background: #FFFFFF;
				}

				.radiotit {
					position: absolute;
					top: 50%;
					left: 44rpx;
					transform: translate(0, -50%);
					width: 60rpx;
					height: 28rpx;
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					text-align: left;
					color: #141313;
				}
			}

			.allmyradio.active {
				display: flex;
				position: absolute;
				left: 36rpx;
				top: 50%;
				transform: translate(0, -50%);
				width: 28rpx;
				height: 28rpx;
				opacity: 1;
				background: #ffffff;
				border: 2rpx solid #DD2638;
				border-radius: 50%;

				.radio_c {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 16rpx;
					height: 16rpx;
					border-radius: 50%;
					background: #DD2638;
				}
			}

			.tit1-1 {
				margin-left: 314rpx;
				height: 80rpx;
				display: flex;
				align-items: center;

				.tit1-1-1 {
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					text-align: right;
					color: #141313;
				}

				.tit1-1-2 {
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					text-align: right;
					color: #DD2638;
				}
			}
		}


		.btns {
			display: flex;
			width: 272rpx;

			.tit2 {
				// margin-left: 41rpx;
				width: 100%;
				height: 80rpx;
				opacity: 1;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				background: #DD2638;
				color: #ffffff;
				line-height: 80rpx;
			}
		}

	}

	.mdgm {
		.container {
			margin: 0;
			position: absolute;
			width: 750rpx;
			height: 1065rpx;
			opacity: 1;

			image {
				width: 100%;
				height: 100%;
			}

			.tit1 {
				position: absolute;
				top: 49rpx;
				left: 50%;
				transform: translateX(-50%);
				opacity: 1;
				font-size: 29rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Medium;
				font-weight: 500;
				text-align: center;
				color: #4a4a4a;
				line-height: 36rpx;
				font-weight: 800;
			}

			.close {
				position: absolute;
				top: 37rpx;
				right: 64rpx;
				width: 31rpx;
				height: 31rpx;
				opacity: 1;
			}

			.center {
				position: absolute;
				top: 114rpx;
				left: 50%;
				transform: translateX(-50%);
				// border: 2rpx solid red;
				width: 639rpx;
				margin: 0 auto;

				.txt1 {
					margin-bottom: 50rpx;
					opacity: 1;
					font-size: 18rpx;
					font-family: SourceHanSansCN-Regular;
					text-align: left;
					color: #4a4a4a;
					line-height: 36rpx;
				}

				.txt2 {
					margin-bottom: 110rpx;
					opacity: 1;
					font-size: 18rpx;
					font-family: SourceHanSansCN-Regular;
					text-align: left;
					color: #4a4a4a;
					line-height: 36rpx;
				}
			}
		}

		.footer {
			position: fixed;
			bottom: 0px;
			width: 750rpx;
			height: 80rpx;
			opacity: 1;
			background: #ffffff;
			border-top: 2rpx solid #ddd;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.tit {
				margin-left: 36rpx;

				text {
					margin-left: 18rpx;
					opacity: 1;
					font-size: 20rpx;
					font-family: SourceHanSansCN-Regular;
					text-align: left;
					color: #9b9b9b;
					line-height: 36rpx;
				}
			}

			.item {
				width: 223rpx;
				height: 80rpx;
				opacity: 1;
				background: #eee;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 20rpx;
				font-family: SourceHanSansCN-Regular;
				text-align: right;
				color: #9b9b9b;
				line-height: 36rpx;

				.tit1 {
					margin-right: 16rpx;
				}
			}
		}
	}

	.zjgm {
		.container {
			margin: 0;
			position: absolute;
			width: 750rpx;
			height: 716rpx;
			opacity: 1;

			image {
				width: 100%;
				height: 100%;
			}

			.tit1 {
				position: absolute;
				top: 63rpx;
				left: 50%;
				transform: translateX(-50%);
				opacity: 1;
				font-size: 29rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Medium;
				font-weight: 500;
				text-align: center;
				color: #4a4a4a;
				line-height: 36rpx;
				font-weight: 800;
			}

			.close {
				position: absolute;
				top: 37rpx;
				right: 64rpx;
				width: 31rpx;
				height: 31rpx;
				opacity: 1;
			}

			.bottom {
				position: absolute;
				top: 150rpx;
				left: 50%;
				transform: translateX(-50%);
				width: 659rpx;
				opacity: 1;
				display: flex;
				align-items: center;

				.wx {
					position: relative;
					width: 621rpx;
					height: 125rpx;
					opacity: 1;

					.ditu {
						width: 100%;
						height: 200rpx;
					}

					.wxpic {
						position: absolute;
						top: 40rpx;
						left: 34rpx;
						width: 43rpx;
						height: 43rpx;
						opacity: 1;
					}

					.tit {
						position: absolute;
						top: 45rpx;
						left: 96rpx;
						opacity: 1;
						font-size: 22rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						text-align: left;
						color: #141313;
					}
				}

				.zfb {
					position: relative;
					width: 621rpx;
					height: 125rpx;
					opacity: 1;

					.ditu {
						width: 100%;
						height: 200rpx;
					}

					.wxpic {
						position: absolute;
						top: 40rpx;
						left: 34rpx;
						width: 43rpx;
						height: 43rpx;
						opacity: 1;
					}

					.tit {
						position: absolute;
						top: 45rpx;
						left: 96rpx;
						opacity: 1;
						font-size: 22rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						text-align: left;
						color: #141313;
					}
				}
			}
		}

		.footer {
			position: fixed;
			bottom: 0;
			background: #ebbfcc;
			width: 750rpx;
			height: 80rpx;
			opacity: 1;
			display: flex;
			justify-content: center;
			align-items: center;

			.tit {
				opacity: 1;
				font-size: 25rpx;
				font-family: SourceHanSansCN-Regular;
				text-align: center;
				color: #ffffff;
				line-height: 36rpx;
			}
		}
	}

	/deep/ .u-tabbar__content__circle__border {
		display: none !important;
	}
</style>
