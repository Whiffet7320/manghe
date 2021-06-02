<template>
	<view class="index">
		<u-toast ref="uToast" />
		<!-- 		<view class="top">
			<view class="tit1">
				商城APP
			</view>
		</view> -->
		<view class="nav">
			<view class="nav-title">购物车</view>
		</view>
		<!-- 不为空 -->
		<view class="container" v-if="list.length>0">
			<view class="items">
				<view class="item" v-for="item in list" :key="item.cartid">
					<image class="pic1" :src="item.img" mode=""></image>
					<view class="right">
						<view class="tit1">
							<view class="txt">{{item.title}}</view>
							<image @click="delShop(item)" class="pic" src="../../static/组34.png" mode=""></image>
						</view>
						<view class="tit111">
							<view class="tit2">￥{{item.price}}</view>
							<view class="tit2-1">{{ item.color }}</view>
							<view class="tit2-2">{{item.size}}</view>
						</view>

						<view class="tit3">
							<image @click="jianShop(item)" class="pic2" src="../../static/组162.png" mode=""></image>
							<view class="tit">{{item.goods_num}}</view>
							<image @click="addShop(item)" class="pic1" src="../../static/组163.png" mode=""></image>
							<image class="pic3" src="../../static/组74.png" mode=""></image>
							<image class="pic4" src="../../static/组73.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="noMore">没有更多啦~</view>
			</view>
		</view>

		<!-- 为空 -->
		<view class="kong-container" v-else>
			<view class="kong">
				<image src="../../static/组40.png" mode=""></image>
			</view>
			<view class="line"></view>
		</view>



		<view class="nav2">
			<view class="nav-title">猜你喜欢</view>
		</view>
		<view class="container2">
			<view class="items">
				<view class="item" v-for="item in cnxhList" :key="item.id">
					<image class="pic1" :src="item.img" mode=""></image>
					<view class="right">
						<view class="tit1">
							<view class="txt">{{item.title}}</view>
							<image v-if="isLike" @click="changeLike" class="pic" src="../../static/路径23.png" mode="">
							</image>
							<image v-else @click="changeLike" class="pic" src="../../static/路径24.png" mode=""></image>
						</view>
						<view class="tit2">￥{{item.price}}</view>
					</view>
				</view>
				<view class="noMore">没有更多啦~</view>
			</view>
		</view>

		<!-- 结算 -->
		<view class="footer">
			<view class="tit1">
				<view class="tit1-1">
					<view class="tit1-1-1">合计：</view>
					<view class="tit1-1-2">{{priceNum}}</view>
				</view>
				<view class="tit1-2">运费：{{yunPrice}}</view>
			</view>
			<view class="btns">
				<view class="tit2" @tap="toZjgm">直接购买</view>
				<view class="tit3" @tap="toMiandangoumai">免单购买</view>
			</view>

		</view>

		<!-- 免单购买 -->
		<u-popup class="mdgm" v-model="mdgmShow" mode="bottom" height="1065">
			<view class="container">
				<!-- <image src="../../static/Path.png" mode=""></image> -->
				<view class="tit1">免单购买协议</view>
				<view class="close" @tap="closeMdgm">
					<image src="../../static/组82.png" mode=""></image>
				</view>
				<view class="center">
					<view class="txt1">
						1.甲方在验收中，如果发现产品的品种、型号、规格、花色和质量不合规定，应一面妥为保管，一面在30天内向乙方提出书面异议;在托收承付期内，甲方有权拒付不符合合同规定部分的货款。甲方怠于通知或者自标的物收到之日起过两年内未通知乙方的，视为产品合乎规定
					</view>
					<view class="txt1">
						2.甲方因使用、保管、保养不善等造成产品质量下降的，不得提出异议。 </view>
					<view class="txt1">
						3.乙方在接到需方书面异议后，应在10天内负责处理，否则，即视为默认甲方提出的异议和处理意见。 </view>
					<view class="txt1">
						第六条　乙方的违约责任 </view>
					<view class="txt1">
						1.乙方不能交货的，应向甲方偿付不能交货部分货款的___%的违约金。 </view>
					<view class="txt1">
						2.乙方所交产品品种、型号、规格、质量不符合规定的，由乙方负责包换或包修，并承担修理、调换或退货而支付的实际费用。
					</view>
					<view class="txt1">
						4.乙方逾期交货的，应比照中国人民银行有关延期付款的规定，按逾期交货部分货款计算，向甲方偿付逾期交货的违约金，并承担甲方因此所受的损失费用。 </view>
					<view class="txt1">
						6.产品错发到货地点或接货人的，乙方除应负责运交合同规定的到货地点或接货人外，还应承担甲方因此多支付的一切实际费用和逾期交货的违约金。 </view>
					<view class="txt1">
						第七条　甲方的违约责任 </view>
					<view class="txt1">
						1.甲方中途退货，应向乙方偿付退货部分货款___%的违约金。 </view>
					<view class="txt2">
						4.甲方逾期付款的，应按中国人民银行有关延期付款的规定向乙方偿付逾期付款的违约金。 </view>

				</view>
			</view>
			<view class="footer">
				<u-checkbox-group class="tit">
					<u-checkbox v-model="checked"><text>我已阅读且了解并签约协议</text></u-checkbox>
				</u-checkbox-group>
				<view class="item" @click="miandanToZjgm">
					<view class="tit1">立即购买</view>
					<u-icon class="icon" name="arrow-right" size="20"></u-icon>
				</view>
			</view>
		</u-popup>
		<!-- 直接购买 -->
		<u-popup class="zjgm" v-model="zjgmShow" mode="bottom" height="716">
			<view class="container">
				<image src="../../static/Path1.png" mode=""></image>
				<view class="tit1">立即购买</view>
				<view class="close" @tap="closeZjgm">
					<image src="../../static/组82.png" mode=""></image>
				</view>
				<view class="bottom">
					<u-radio-group wrap v-model="value" @change="radioGroupChange">
						<u-radio name="wx">
							<view class="wx">
								<image class="dibu" src="../../static/矩形139.png" mode=""></image>
								<image class="wxpic" src="../../static/组137.png" mode=""></image>
								<view class="tit">微信支付</view>
							</view>
						</u-radio>
						<u-radio name="zfb">
							<view class="zfb">
								<image class="dibu" src="../../static/矩形139.png" mode=""></image>
								<image class="wxpic" src="../../static/路径287.png" mode=""></image>
								<view class="tit">支付宝支付</view>
							</view>
						</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="footer">
				<view class="tit">
					支付￥599.69
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		computed: {
		    ...mapState(["mdgmShow"]),
		  },
		data() {
			return {
				isLike: true,
				zjgmShow: false,
				// mdgmShow: false,
				checked: false,
				value: 'wx',
				openid: null,
				// 购物车列表
				list: [],
				// 猜你喜欢列表
				cnxhList: [],
				// 总金额
				priceNum: 0,
				// 总运费
				yunPrice: 0,
			}
		},
		onLoad(option) {
			this.openid = uni.getStorageSync('openid')
		},
		onShow() {
			this.getData();
		},
		methods: {
			async getData() {
				this.yunPrice = 0;
				this.priceNum = 0;
				const res = await this.$api.wx_cartlist(this.openid);
				console.log(res);
				if (res.list) {
					this.list = res.list;
					res.list.forEach(ele => {
						// this.priceNum
						this.yunPrice += ele.postage;
						this.priceNum += (ele.price) * ele.goods_num + ele.postage;
					})
				} else {
					this.list = []
				}
				const res2 = await this.$api.wx_goodslike(this.openid)
				console.log(res2)
				this.cnxhList = res2.list;
			},
			// 加数量
			async addShop(item) {
				var signstr = "openid=" + this.openid + "&cartid=" + item.cartid + "&num=" + 1 + "";
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.wx_editcartnum(this.openid,
					item.cartid,
					1,
					1,
					md
				)
				if (res.result == 1) {
					this.getData()
				}
			},
			// 减数量
			async jianShop(item) {
				var signstr = "openid=" + this.openid + "&cartid=" + item.cartid + "&num=" + 1 + "";
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.wx_editcartnum(this.openid,
					item.cartid,
					1,
					2,
					md
				)
				if (res.result == 1) {
					this.getData()
				}
			},
			// 删除购物车
			async delShop(item) {
				var signstr = "openid=" + this.openid + "&cartid=" + item.cartid + "";
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.wx_cartdel(this.openid, item.cartid, md)
				console.log(res)
				if (res.result == 1) {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success',
						duration: 1000
					})
					this.getData()
				}
			},
			changeLike() {
				this.isLike = !this.isLike
			},
			toMiandangoumai() {
				this.$store.commit('mdgmShow',true)
			},
			closeMdgm() {
				this.$store.commit('mdgmShow',false)
				// this.mdgmShow = false
			},
			// 直接购买
			async toZjgm() {
				var signstr = "openid=" + this.openid + "&order_type=" + 1 + "&buy_type=" + 2 +
					"&goods_id=" + 0 + "&color=" + '' + "&size=" + '' + "&num=" +
					0 + "";
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.order_submission(this.openid, 1, 2, 0, '', '', 0, md)
				console.log(res)
				if (res.result == 1) {
					
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success',
						url: '/pages/shangpinxiangqin/tijiaodingdan',
						params: {
							list: JSON.stringify(res.list),
							receiverlist: JSON.stringify(res.receiverlist),
							type: 'gwc',
							order_type: 1
						},
						duration: 500
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
			// 免单购买
			async miandanToZjgm() {
				console.log(this.checked)
				var signstr = "openid=" + this.openid + "&order_type=" + 2 + "&buy_type=" + 2 +
					"&goods_id=" + 0 + "&color=" + '' + "&size=" + '' + "&num=" +
					0 + "";
				console.log(signstr)
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.order_submission(this.openid, 2, 2, 0, '', '', 0, md)
				console.log(res)
				if (res.result == 1) {
					if (this.checked) {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'success',
							url: '/pages/shangpinxiangqin/tijiaodingdan',
							params: {
								list: JSON.stringify(res.list),
								receiverlist: JSON.stringify(res.receiverlist),
								type: 'mdgwc',
								order_type: 2,
							},
							duration: 500
						})
					} else {
						this.$refs.uToast.show({
							title: '请先勾选签约协议',
							type: 'warning',
						})
					}

				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
			closeZjgm() {
				this.zjgmShow = false
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
			},
		}
	}
</script>

<style scoped lang="scss">
	.index {
		position: relative;
	}

	.nav {
		margin: 82rpx 49rpx 51rpx 49rpx;
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

	.container {
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

					.tit111 {
						display: flex;
						align-items: center;

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

						.tit2-1 {
							margin-top: 16rpx;
							margin-left: 20rpx;
							opacity: 1;
							font-size: 25rpx;
							font-family: PingFang SC, PingFang SC-Bold;
							font-weight: 700;
							text-align: left;
							letter-spacing: 2rpx;
						}

						.tit2-2 {
							margin-top: 16rpx;
							margin-left: 20rpx;
							opacity: 1;
							font-size: 25rpx;
							font-family: PingFang SC, PingFang SC-Bold;
							font-weight: 700;
							text-align: left;
							letter-spacing: 2rpx;
						}
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
		height: 136rpx;
		opacity: 1;
		background: #ffffff;
		padding: 27rpx 43rpx 29rpx 36rpx;
		display: flex;
		justify-content: space-between;

		.tit1 {
			.tit1-1 {
				display: flex;

				.tit1-1-1 {
					opacity: 1;
					font-size: 27rpx;
					font-family: SourceHanSansCN-Regular;
					color: #121314;
				}

				.tit1-1-2 {
					opacity: 1;
					font-size: 27rpx;
					font-family: SourceHanSansCN-Regular;
					color: #EBBFCC;
				}
			}

			.tit1-2 {
				margin-top: 18rpx;
				opacity: 1;
				font-size: 24rpx;
				font-family: SourceHanSansCN-Regular;
				color: #9b9b9b;
			}
		}

		.btns {
			display: flex;

			.tit2 {
				// margin-left: 41rpx;
				width: 223rpx;
				height: 80rpx;
				opacity: 1;
				background: #f6f6f6;
				line-height: 80rpx;
				text-align: center;
				font-size: 25rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				color: #707070;
				letter-spacing: 2rpx;
			}

			.tit3 {
				width: 223rpx;
				height: 80rpx;
				opacity: 1;
				background: #ebbfcc;
				line-height: 80rpx;
				text-align: center;
				font-size: 25rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				color: #FFFFFF;
				letter-spacing: 2rpx;
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
			bottom: 0;
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
</style>
