<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="nav">
			<u-swiper class="banner" height="618" :list="pic"></u-swiper>
			<u-icon @tap="goTo" class="icon" name="arrow-left" size="40"></u-icon>
		</view>
		<view class="nav2">
			<view class="items">
				<view class="item">
					<image @click="qxshoucang" v-if="collect_status == 1" class="pic1" src="/static/路径180.png" mode="">
					</image>
					<image @click="shoucang" v-if="collect_status == 0" class="pic1" src="/static/路径23.png" mode="">
					</image>
					<view class="tit">收藏</view>
				</view>
				<view class="shu"></view>
				<view class="item" @click="addShopCar">
					<image class="pic2" src="/static/组65.png" mode=""></image>
					<view class="tit">加入购物车</view>
				</view>
				<view class="shu"></view>
				<view class="item" @click="fenxiang">
					<image class="pic3" src="/static/ic_share.png" mode=""></image>
					<view class="tit">分享</view>
				</view>
			</view>
		</view>
		<view class="nav3">
			<view class="tit">
				{{title}}
			</view>
			<view class="price">
				￥{{price}}
			</view>
		</view>
		<view class="nav4">
			<view class="items">
				<view class="item">
					<view class="dian"></view>
					<view class="tit">库存：{{stock}}</view>
				</view>
				<view class="item">
					<view class="dian"></view>
					<view v-if="postage==0" class="tit">邮费：包邮</view>
					<view v-else class="tit">邮费：{{postage}}元</view>
				</view>
				<view class="item">
					<view class="dian"></view>
					<view class="tit">分类：{{classify}}</view>
				</view>
			</view>
		</view>
		<view class="nav5">
			<view class="items">
				<view class="item" @click="changeColorShow">
					<view class="tit">颜色 {{colorValue}}</view>
					<u-icon name="arrow-down" color="#4a4a4a" size="30"></u-icon>
				</view>
				<view class="item" @tap="changeSizeShow">
					<view class="tit">尺寸 {{sizeValue}}</view>
					<u-icon name="arrow-down" color="#4a4a4a" size="30"></u-icon>
				</view>
				<view class="item">
					<view class="tit2">数量</view>
					<!-- <u-icon name="arrow-down" color="#4a4a4a" size="30"></u-icon> -->
					<u-input v-model="num" placeholder="" clearable=false type="text" border />
				</view>
			</view>
		</view>
		<u-select @confirm="sizeConfirm" v-model="sizeShow" :list="size"></u-select>
		<u-select @confirm="colorConfirm" v-model="colorShow" :list="color"></u-select>
		<view class="nav6">
			<view class="tit1">物流</view>
			<view class="tit2">预计7-10个工作日内送达</view>
		</view>
		<view class="nav7" @click="toPingjia">
			<view class="tit1">产品评价</view>
			<u-icon name="arrow-right" color="#4a4a4a" size="30"></u-icon>
		</view>
		<view class="nav8">
			<view class="tit1">产品详情</view>
		</view>
		<view class="container">
			<!-- <image src="../../static/vv.png" mode=""></image> -->
			<u-parse :html="content"></u-parse>
		</view>
		<view class="footer">
			<view class="left">
				<view class="tit">总价：</view>
				<view class="price">￥{{priceNum}}</view>
			</view>
			<view class="right">
				<view class="item1" @tap="toZjgm">直接购买</view>
				<view @tap="toMiandangoumai" class="item2">免单购买</view>
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
					<u-parse :html="mdContent"></u-parse>
					<!-- <view class="txt1">
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
						4.甲方逾期付款的，应按中国人民银行有关延期付款的规定向乙方偿付逾期付款的违约金。 </view> -->
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
		<!-- 分享 -->
		<u-popup v-model="fenxiangShow" mode="center" border-radius="14">
			<image class="fxImg" :src="fenxiangImgSrc" mode=""></image>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				openid: '',
				goods_id: '',
				zjgmShow: false,
				mdgmShow: false,
				fenxiangShow: false,
				fenxiangImgSrc: '',
				checked: false,
				// 轮播图
				pic: [],
				// 顔色
				colorShow: false,
				color: [],
				colorValue: '',
				// 尺寸
				sizeShow: false,
				size: [],
				sizeValue: '',
				value: 'wx',
				// 产品详情
				content: '',
				// 邮费
				postage: '',
				// 价格
				price: '',
				// 库存
				stock: 0,
				// 标题
				title: '',
				// 分类
				classify: '',
				mdContent: '',
				// 数量
				num: 1,
				// 总价
				priceNum: 0,
				// 收藏
				collect_status: null,
			}
		},
		watch: {
			num(num) {
				console.log(this.price, this.postage)
				this.priceNum = num * this.price + this.postage;
			}
		},
		async onLoad(option) {
			this.openid = uni.getStorageSync('openid')
			this.goods_id = option.id;
			if (option.scene) {
				const arr = option.scene.split('_')
				uni.setStorageSync('scene', arr[1])
			} else {
				uni.setStorageSync('scene', 0)
			}
			this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$api.wx_goodsview(this.goods_id,this.openid)
				console.log(res)
				this.priceNum = this.num * res.price + res.postage;
				res.size.forEach(ele => {
					this.size.push({
						value: ele.name,
						label: ele.name
					})
				});
				res.color.forEach(ele => {
					this.color.push({
						value: ele.name,
						label: ele.name
					})
				})
				res.pic.forEach(ele => {
					if (ele.name != "") {
						this.pic.push(ele.name)
					}
				})
				this.collect_status = res.collect_status;
				this.content = res.content;
				this.postage = res.postage;
				this.price = res.price;
				this.stock = res.stock;
				this.title = res.title;
				this.classify = res.classify
			},
			// 收藏
			async shoucang() {
				var signstr = "openid=" + this.openid + "&goods_id=" + this.goods_id + "";
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.wx_addcollect(this.openid, this.goods_id, md)
				console.log(res);
				if (res.result == 1) {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success',
					})
					this.getData()
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
			// 取消收藏
			async qxshoucang() {
				var signstr = "openid=" + this.openid + "&goods_id=" + this.goods_id + "";
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.wx_mycollectdel(this.openid, this.goods_id, md)
				console.log(res);
				if (res.result == 1) {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success',
					})
					this.getData()
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
			async fenxiang() {
				this.fenxiangShow = true;
				var signstr = "openid=" + this.openid + "&goods_id=" + this.goods_id + "";
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.wx_shareqr(this.openid, this.goods_id, md)
				console.log(res)
				this.fenxiangImgSrc = res.picbase64;
			},
			// 加入购物车
			async addShopCar() {
				var signstr = "color=" + this.colorValue + "&size=" + this.sizeValue + "&goods_id=" + this.goods_id +
					"&openid=" + this.openid + "&num=" + this.num + "";
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.wx_addcart(this.openid, this.colorValue, this.sizeValue, this.goods_id,
					this.num, md)
				console.log(res)
				if (res.result == 1) {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success',
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
			goTo() {
				// uni.navigateTo({
				// 	url: "/pages/index/newGoodThings"
				// })
				uni.navigateBack({
					delta: 1
				});
			},
			toPingjia() {
				uni.navigateTo({
					url: `/pages/shangpinxiangqin/chanpinpingjia?goods_id=${this.goods_id}`
				})
			},
			async toMiandangoumai() {
				this.mdgmShow = true
				const res = await this.$api.billagreement_view()
				console.log(res)
				this.mdContent = res.content;
			},
			closeMdgm() {
				this.mdgmShow = false
			},
			// 直接购买
			async toZjgm() {
				// this.zjgmShow = true
				var signstr = "openid=" + this.openid + "&order_type=" + 1 + "&buy_type=" + 1 +
					"&goods_id=" + this.goods_id + "&color=" + this.colorValue + "&size=" + this.sizeValue + "&num=" +
					this.num + "";
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.order_submission(this.openid, 1, 1, this.goods_id, this.colorValue, this
					.sizeValue, this.num, md)
				console.log(res)
				if (res.result == 1) {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success',
						url: '/pages/shangpinxiangqin/tijiaodingdan',
						params: {
							list: JSON.stringify(res.list),
							receiverlist: JSON.stringify(res.receiverlist),
							type: 'xq',
							order_type: 1,
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
				var signstr = "openid=" + this.openid + "&order_type=" + 2 + "&buy_type=" + 1 +
					"&goods_id=" + this.goods_id + "&color=" + this.colorValue + "&size=" + this.sizeValue + "&num=" +
					this.num + "";
				console.log(signstr)
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.order_submission(this.openid, 2, 1, this.goods_id, this.colorValue, this
					.sizeValue, this.num, md)
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
								type: 'mdxq',
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
			// 尺寸
			sizeConfirm(e) {
				this.sizeValue = e[0].value
			},
			changeSizeShow() {
				this.sizeShow = true;
			},
			// 顔色
			colorConfirm(e) {
				this.colorValue = e[0].value
			},
			changeColorShow() {
				this.colorShow = true;
			},
		}
	}
</script>

<style scoped lang="scss">
	.nav {
		position: relative;

		.banner {
			width: 748rpx;
			height: 618rpx;
			opacity: 1;
		}

		.icon {
			position: fixed;
			top: 87rpx;
			left: 47rpx;
		}
	}

	.nav2 {
		height: 130rpx;
		width: calc(100 - 100rpx);
		border-bottom: 2rpx solid #e8e8e8;
		margin: 0 50rpx;

		.items {
			height: 100%;
			display: flex;
			justify-content: space-around;

			.shu {
				margin-top: 21rpx;
				width: 2rpx;
				height: 63rpx;
				opacity: 1;
				background: #e8e8e8;
			}

			.item {
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.pic1 {
					width: 34rpx;
					height: 34rpx;
					opacity: 1;
				}

				.pic2 {
					width: 28rpx;
					height: 40rpx;
					opacity: 1;
				}

				.pic3 {
					width: 28rpx;
					height: 35rpx;
					opacity: 1;
				}

				.tit {
					margin-top: 17rpx;
					opacity: 1;
					font-size: 24rpx;
					font-family: SourceHanSansCN-Regular;
					text-align: right;
					color: #4a4a4a;
					line-height: 36rpx;
				}
			}
		}
	}

	.nav3 {
		height: 118rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.tit {
			margin-left: 49rpx;
			width: 388rpx;
			height: 63rpx;
			opacity: 1;
			font-size: 27rpx;
			font-family: SourceHanSansCN-Medium;
			text-align: left;
			color: #121314;
			line-height: 36rpx;
			font-weight: 800;
		}

		.price {
			margin-left: 114rpx;
			width: 150rpx;
			height: 36rpx;
			opacity: 1;
			font-size: 36rpx;
			font-family: SourceHanSansCN-Medium;
			text-align: left;
			color: #ebbfcc;
			// line-height: 109rpx;
		}
	}

	.nav4 {
		margin-left: 50%;
		transform: translateX(-50%);
		width: 652rpx;
		height: 51rpx;
		opacity: 1;
		background: #f6f6f6;

		.items {
			margin: 0 54rpx;
			display: flex;
			justify-content: space-between;
			height: 100%;

			.item {
				display: flex;
				align-items: center;

				.dian {
					width: 7rpx;
					height: 7rpx;
					opacity: 1;
					background: #4a4a4a
				}

				.tit {
					margin-left: 9rpx;
					opacity: 1;
					font-size: 24rpx;
					font-family: SourceHanSansCN-Regular;
					text-align: left;
					color: #121212;
					line-height: 36rpx;
				}
			}
		}
	}

	.nav5 {
		height: 130rpx;
		width: 100%;
		border-bottom: 2rpx solid #e8e8e8;

		.items {
			height: 100%;
			display: flex;

			.item {
				margin: 0 33rpx;
				display: flex;
				align-items: center;
				width: 49%;
				height: 100%;
				justify-content: space-between;

				.tit {
					// margin-right: 226rpx;
					opacity: 1;
					font-size: 27rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					text-align: left;
					color: #9b9b9b;
					letter-spacing: 1rpx;
				}

				.tit2 {
					width: 180rpx;
					// margin-right: 20rpx;
					opacity: 1;
					font-size: 27rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					text-align: left;
					color: #9b9b9b;
					letter-spacing: 1rpx;
				}
			}
		}
	}

	.nav6 {
		margin-left: 49rpx;
		border-bottom: 2rpx solid #e8e8e8;
		height: 100rpx;
		display: flex;
		align-items: center;

		.tit1,
		.tit2 {
			opacity: 1;
			font-size: 27rpx;
			font-family: SourceHanSansCN-Regular;
			text-align: left;
			color: #121314;
			line-height: 76rpx;
			letter-spacing: 2rpx;
		}

		.tit2 {
			margin-left: 274rpx;
		}
	}

	.nav7 {
		margin-left: 49rpx;
		border-bottom: 2rpx solid #e8e8e8;
		height: 100rpx;
		display: flex;
		align-items: center;

		.tit1 {
			margin-right: 533rpx;
			opacity: 1;
			font-size: 27rpx;
			font-family: SourceHanSansCN-Regular;
			text-align: left;
			color: #121314;
			line-height: 76rpx;
			letter-spacing: 2rpx;
		}
	}

	.nav8 {
		margin-left: 49rpx;
		border-bottom: 2rpx solid #e8e8e8;
		height: 100rpx;
		display: flex;
		align-items: center;

		.tit1 {
			opacity: 1;
			font-size: 27rpx;
			font-family: SourceHanSansCN-Regular;
			text-align: left;
			color: #121314;
			line-height: 76rpx;
			letter-spacing: 2rpx;
		}
	}

	.container {
		width: 748rpx;
		height: 770rpx;
		opacity: 1;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 80rpx;
		opacity: 1;
		background: #ffffff;
		display: flex;
		justify-content: space-between;

		.left {
			display: flex;
			height: 100%;
			align-items: center;

			.tit {
				margin-left: 25rpx;
				opacity: 1;
				font-size: 22rpx;
				font-family: SourceHanSansCN-Medium;
				text-align: left;
				color: #000000;
				line-height: 109rpx;
				font-weight: 800;
			}

			.price {
				font-size: 28rpx;
				color: #ebbfcc;
				;
			}
		}

		.right {
			display: flex;
			align-items: center;
			height: 80rpx;

			.item1 {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 223rpx;
				height: 80rpx;
				opacity: 1;
				background: #f6f6f6;
				font-size: 25rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #707070;
				line-height: 34rpx;
				letter-spacing: 2rpx;
			}

			.item2 {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 223rpx;
				height: 80rpx;
				opacity: 1;
				background: #ebbfcc;
				font-size: 25rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Regular;
				font-weight: 400;
				text-align: center;
				color: #ffffff;
				line-height: 34rpx;
				letter-spacing: 2rpx;
			}
		}
	}

	.mdgm {
		.container {
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

	.fxImg {
		width: 414rpx;
		height: 736rpx;
	}
</style>
