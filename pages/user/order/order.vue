<template>
	<view class="olist">
		<view class="navbar">
			<u-tabs-swiper bg-color="#f7f8fa" height='60' font-size="32" inactive-color="#000000" bar-height="2"
				bar-width="80" active-color="#D61D1D" ref="uTabs" :list="list" :current="tabCurrentIndex"
				@change="tabClick" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper style="height: calc(100% - 110rpx)" :current="tabCurrentIndex" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(item, index) in list" :key="index">
				<scroll-view class="list-scroll-content" scroll-y='true' @scrolltolower="myReachBottom">
					<page-empty text="没有找到任何订单" v-if="loaded === true && orderList.length === 0" />
					<view class="nav5Items">
						<view class="item" v-for="(order, okey) in orderList" :key="okey" @click="goDetail(order)">
							<image :src="proInfo.img" class="pic1" mode="" v-if="proInfo.img"></image>
							<view class="right">
								<view class="tit1">
									<view class="txt1">{{proInfo.name}}
										<u-icon style='margin-left: 20rpx;' name="arrow-right" color="#808080"
											size="28"></u-icon>
									</view>
									<view class="txt2" v-if="order.paid==0">待付款</view>
									<view class="txt2" v-else-if="order.status==0">待发货</view>
									<view class="txt2" v-else-if="order.status==1">待收货</view>
									<view class="txt2" v-else-if="order.status==2">订单已完成</view>
								</view>
								<view class="tit2">
									<view class="txt1">规格：<text style="margin-left: 4rpx;">母蟹{{proInfo.unit}}两</text>
									</view>
									<view class="txt2">x{{order.total_num}}</view>
								</view>
								<view class="tit3">
									<view class="txt1">下单时间：{{order.add_time}}</view>
								</view>
								<view class="tit3">
									<view class="txt2">实付<text style="font-weight: 700;">￥{{order.pay_price}}</text>
									</view>
								</view>
								<view class="btns" v-if="order.paid==0">
									<view class="btn2" @click.stop="lijiPay(order)">立即支付</view>
									<view class="btn1" style="margin-left: 20rpx;" @click.stop="onDel(order.id,index)">
										删除订单</view>
								</view>
								<view class="btns" v-else-if="order.status==0">
									<view class="btn2" @click.stop="pshow=true">提醒发货</view>
								</view>
								<view class="btns" v-else-if="order.status==1">
									<view class="btn2" @click.stop="confirmOrder(order.id)">确认收货</view>
									<view class="btn1" style="margin-left: 20rpx;" @click.stop="toWuliu(order)">查看物流
									</view>
								</view>
								<view class="btns" v-else-if="order.status==2">
									<view class="btn2" @click.stop="goShop">再来一单</view>
									<view class="btn1" style="margin-left: 20rpx;" @click.stop="toWuliu(order)">查看物流
									</view>
									<view class="btn1" @click.stop="onDel(order.id,index)">删除订单</view>
								</view>
							</view>
						</view>
						<u-loadmore :status="status" font-size="24" />
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<page-toast v-model="pshow" title="提醒发货成功" content="卖家会第一时间发货" @confirm="pconfirm"></page-toast>
		<page-modal v-model="show" width="466" title="确认删除订单？" confirm-text="确认删除" @confirm="confirm">
			<view class="mcont">删除之后数据无法恢复</view>
		</page-modal>
		<page-modal v-model="cshow" width="466" title="确定收到货了？" confirm-text="确认收货" @confirm="confirm2">
			<view class="mcont">保障权益商品无误再收货</view>
		</page-modal>
		<!-- 弹出层 -->
		<u-popup v-model="popshow" mode='bottom' border-radius='24' height='708' closeable>
			<view class="pop">
				<view class="tit1">
					<view class="txt1">支付方式</view>
				</view>
				<view class="item1" @click="changePay(1)">
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
				<view class="item1" style="border-top: 2rpx solid #f2f2f2;border-bottom: 2rpx solid #f2f2f2;"
					@click="changePay(2)">
					<view class="t1">
						<view class="left">
							<image src="/static/image/zu3030.png" class="pic1 p2" mode=""></image>
							<view class="txt1-1">积分抵扣</view>
						</view>
						<image v-if="payIndex == 2" src="/static/image/lujin1937.png" class="quan2"></image>
						<view v-else class="quan"></view>
					</view>
					<view class="t2">当前积分为{{userInfo.integral||0}}分</view>
				</view>
				<view class="item1" @click="changePay(3)">
					<view class="t1">
						<view class="left">
							<image src="/static/image/lujin2820.png" class="pic1 p3" mode=""></image>
							<view class="txt1-1">余额抵扣</view>
						</view>
						<image v-if="payIndex == 3" src="/static/image/lujin1937.png" class="quan2"></image>
						<view v-else class="quan"></view>
					</view>
					<view class="t2">当前余额为{{userInfo.now_money||0.00}}元</view>
				</view>
				<view class="btn-footer" @click="onSubmit">确认</view>
			</view>
		</u-popup>
		<!-- 输入支付密码 -->
		<u-popup v-model="show3" mode='center' border-radius='24' height='286' width='454'>
			<view class="pop3">
				<view class="pop3-txt">请输入支付密码</view>
				<u-message-input width='50' :focus="true" :value='password' :breathe="true" :maxlength='6'
					:dot-fill="true" @finish="finish" active-color="#D61D1D"></u-message-input>
				<view class="pop3-btn" @click="payOnsubmit">确认</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import pageEmpty from "@/components/page-empty";
	import pageToast from "@/components/page-toast";
	import pageModal from "@/components/page-modal";
	export default {
		components: {
			pageEmpty,
			pageToast,
			pageModal
		},
		data() {
			return {
				show3: false,
				userInfo: null,
				payOrder: {},
				popshow: false,
				payIndex: 1,
				paytype: 'weixin',
				id: 0,
				index: 0,
				show: false,
				pshow: false,
				cshow: false,
				proInfo: {},
				orderList: [],
				tabCurrentIndex: 0,
				list: [{
						name: '全部订单',
						state: -1
					},
					{
						name: '待发货',
						state: 0
					},
					{
						name: '待收货',
						state: 1
					},
					{
						name: '已完成',
						state: 2
					}
				],
				password: '',
				type: -1, // tabs组件的current值，表示当前活动的tab选项
				// 加载
				status: 'loadmore',
				loadText: {
					loadmore: '上拉加载更多',
					loading: '正在加载...',
					nomore: '没有了更多了'
				},
				iconType: 'flower',
				current_page: 1,
			}
		},
		watch: {
			tabCurrentIndex: function() {
				this.orderList = [];
				this.current_page = 1;
				this.loadData()
				// setTimeout(() => {
				// 	this.getCurrentSwiperHeight('.nav5Items')
				// }, 800)
			},
		},
		onShow() {
			this.orderList = [];
			this.current_page = 1;
			this.getUserInfo()
			this.getProinfo();
			this.loadData();
		},
		methods: {
			async getUserInfo() {
				await this.$api.userInfo().then(res => {
					if (res.code == 200) {
						this.userInfo = res.data;
						this.$store.commit("UpdateUserinfo", res.data);
						this.$store.commit('SetUid', res.data.uid);
					} else {
						uni.navigateTo({
							url: "/pages/login/login"
						})
					}
				});
			},
			finish(e) {
				this.password = e;
			},
			myReachBottom() {
				this.current_page++;
				this.loadData()
			},
			async getProinfo() {
				await this.$api.product().then((res) => {
					if (res.code == 200) {
						this.proInfo = res.data;
					}
				})
			},
			lijiPay(order) {
				this.popshow = true;
				this.payOrder = order;
			},
			payOnsubmit() {
				let data = {
					order_id: this.payOrder.id,
					type: this.paytype,
					pay_pwd:this.password
				}
				this.$api.wait_pay(data).then((res) => {
					if (res.code == 200) {
						this.show3 = false;
						this.popshow = false;
						this.goPay(res.data);
					} else {
						this.$u.toast(res.message);
					}
				})
			},
			changePay(index) {
				this.payIndex = index;
				if (index == 1) {
					this.paytype = "weixin";
				} else if (index == 2) {
					this.paytype = "integral";
				} else if (index == 3) {
					this.paytype = "yue";
				}
			},
			async loadData() {
				this.status = 'loading';
				setTimeout(async () => {
					const res = await this.$api.orderList({
						page: this.current_page,
						limit: 10,
						status: this.type
					})
					console.log(res.data.data.length)
					if (this.current_page >= res.data.last_page) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
					}
					this.orderList = this.orderList.concat(res.data.data);
				}, 200)
				console.log(this.orderList)
			},
			onSubmit() {
				if (this.paytype == 'weixin') {
					let data = {
						order_id: this.payOrder.id,
						type: this.paytype,
					}
					this.$api.wait_pay(data).then((res) => {
						if (res.code == 200) {
							this.popshow = false;
							this.goPay(res.data);
						} else {
							this.$u.toast(res.message);
						}
					})
				} else if (this.paytype == 'integral') {
					if (!this.userInfo.pay_pwd) {
						this.$u.toast('未设置支付密码，请先设置支付密码');
					} else {
						if (Number(this.userInfo.integral) < parseFloat(this.payOrder.pay_price)) {
							this.$u.toast('积分不足');
							return
						}
						this.password = ''
						this.show3 = true;
					}

				} else if (this.paytype == 'yue') {
					if (!this.userInfo.pay_pwd) {
						this.$u.toast('未设置支付密码，请先设置支付密码');
					} else {
						if (Number(this.userInfo.now_money) < parseFloat(this.payOrder.pay_price)) {
							this.$u.toast('余额不足');
							return
						}
						this.password = ''
						this.show3 = true;
					}

				}
			},
			goPay(jsConfig) {
				uni.showLoading({
					title: "支付中..."
				})
				switch (this.payIndex) {
					case 1:
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: jsConfig.timeStamp.toString(),
							nonceStr: jsConfig.nonceStr,
							package: jsConfig.package,
							signType: jsConfig.signType,
							paySign: jsConfig.paySign,
							success: (res) => {
								uni.hideLoading();
								this.show2 = true;
								setTimeout(() => {
									uni.redirectTo({
										url: "/pages/user/order/order"
									})
								}, 1500)
							},
							fail: (err) => {
								uni.hideLoading();
								console.log('fail:' + JSON.stringify(err));
								this.$u.toast("支付失败");
							},
							complete: (e) => {
								uni.hideLoading();
								if (e.errMsg == 'requestPayment:cancel') {
									this.$u.toast("取消支付");
								}
							}
						});
						break;
					case 2:
						uni.hideLoading();
						this.show2 = true;
						setTimeout(() => {
							uni.redirectTo({
								url: "/pages/user/order/order"
							})
						}, 1500)
						break;
					case 3:
						uni.hideLoading();
						this.show2 = true;
						setTimeout(() => {
							uni.redirectTo({
								url: "/pages/user/order/order"
							})
						}, 1500)
						break;
				}
			},
			goDetail(val) {
				this.$store.commit("setProinfo", this.proInfo);
				this.$store.commit("setOrderInfo", val);
				uni.navigateTo({
					url: "/pages/user/order/detail?id=" + val.id
				})
			},
			toWuliu(order) {
				var address =
					`${order.addressinfo.province}${order.addressinfo.city}${order.addressinfo.district}${order.addressinfo.detail}`
				uni.navigateTo({
					url: `/pages/user/order/wuliu?order_id=${order.id}&express_name=${order.express_name}&address=${address}`
				})
			},
			onDel(id, index) {
				this.id = id;
				this.index = index;
				this.show = true;
			},
			confirm() {
				this.$api.delOrder(this.id).then((res) => {
					if (res.code == 200) {
						this.$u.toast("删除成功");
						this.orderList.splice(this.index, 1);
					} else {
						this.$u.toast(res.message);
					}
				})
			},
			//提醒发货
			pconfirm() {
				this.pshow = !this.pshow;
			},
			confirmOrder(id) {
				this.cshow = true;
				this.id = id;
			},
			confirm2() {
				this.$api.confirmOrder(this.id).then((res) => {
					if (res.code == 200) {
						this.cshow = false;
						this.$u.toast(res.message);
						this.orderList = [];
						this.current_page = 1;
						this.loadData();
					} else {
						this.cshow = false;
						this.$u.toast(res.message);
					}
				})
			},
			goShop() {
				this.$store.commit("setProinfo", this.proInfo);
				uni.navigateTo({
					url: '/pages/order/querendingdan'
				})
			},
			// tabs通知swiper切换
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
				this.type = this.list[this.tabCurrentIndex].state;
				this.current_page = 1;
				// this.orderList = [];
				// this.loadData();
			},
			changeTab(e) {
				console.log('changeTab')
				this.tabCurrentIndex = e.target.current;
				this.type = this.list[this.tabCurrentIndex].state;
				this.current_page = 1;
				// this.orderList = [];
				// this.loadData();
			},
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			getCurrentSwiperHeight(element) {
				let query = uni.createSelectorQuery().in(this);
				query.selectAll(element).boundingClientRect();
				query.exec((res) => {
					this.height = res[0][this.swiperCurrentIndex].height;
				})
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
	/deep/ .u-load-more-wrap {
		width: 686rpx;
		height: 100rpx !important;
		transform: translateY(-20rpx);
	}

	.olist {
		height: 100vh;
	}

	.list-scroll-content {
		height: 100%;
	}

	.navbar {
		padding: 40rpx 0 24rpx 0;
	}

	.mcont {
		padding: 24rpx 24rpx 30rpx 24rpx;
		font-size: 32rpx;
		font-family: PingFang SC, PingFang SC-Bold;
		font-weight: 700;
		text-align: center;
		color: #141414;
	}

	.nav5Items {
		padding: 0 30rpx;

		.item {
			margin-bottom: 20rpx;
			width: 690rpx;
			height: 278rpx;
			background: #ffffff;
			border-radius: 12rpx;
			box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(0, 0, 0, 0.16);
			display: flex;
			align-items: center;
			padding: 0 28rpx 0 16rpx;

			.pic1 {
				width: 248rpx;
				height: 248rpx;
			}

			.right {
				// margin-top: 18rpx;
				margin-left: 18rpx;

				.tit1 {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.txt1 {
						font-size: 32rpx;
						font-weight: 700;
						color: #0f0f0f;
					}

					.txt2 {
						font-size: 24rpx;
						font-weight: 500;
						color: #808080;
					}
				}

				.tit2 {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 12rpx;

					.txt1 {
						font-size: 24rpx;
						font-weight: 500;
						color: #808080;
					}

					.txt2 {
						font-size: 24rpx;
						font-weight: 500;
						color: #808080;
					}
				}

				.tit3 {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 10rpx;

					.txt1 {
						font-size: 20rpx;
						font-weight: 500;
						color: #808080;
					}

					.txt2 {
						font-size: 20rpx;
						font-weight: 500;
						color: #000000;
					}
				}

				.btns {
					width: 380rpx;
					margin-top: 10rpx;
					display: flex;
					flex-direction: row-reverse;
					align-items: center;

					.btn1 {
						width: 112rpx;
						height: 44rpx;
						border: 2rpx solid #f2f2f2;
						border-radius: 8rpx;
						font-size: 20rpx;
						font-weight: 500;
						text-align: center;
						line-height: 40rpx;
						color: #000000;
					}

					.btn2 {
						margin-left: 20rpx;
						width: 112rpx;
						height: 44rpx;
						border: 2rpx solid #d61d1d;
						border-radius: 8rpx;
						font-size: 20rpx;
						font-weight: 500;
						text-align: center;
						line-height: 40rpx;
						color: #d61d1d;
					}
				}
			}
		}
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

					.p2.pic1 {
						height: 42rpx;
					}

					.p3.pic1 {
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

				.quan {
					width: 26rpx;
					height: 26rpx;
					border: 2rpx solid #808080;
					border-radius: 50%;
				}

				.quan2 {
					width: 26rpx;
					height: 26rpx;
				}

			}

			.t2 {
				margin-left: 74rpx;
				margin-top: 16rpx;
				font-size: 24rpx;
				font-weight: 500;
				color: #000000;
			}

		}

		.btn-footer {
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

	.pop3 {
		display: flex;
		flex-direction: column;
		align-items: center;

		.pop3-txt {
			margin-top: 40rpx;
			margin-bottom: 28rpx;
			text-align: center;
			font-size: 24rpx;
			font-weight: 700;
			color: #000000;
		}

		.pop3-btn {
			width: 276rpx;
			height: 60rpx;
			background: #d61d1d;
			border-radius: 8rpx;
			font-size: 28rpx;
			font-weight: 700;
			text-align: center;
			line-height: 60rpx;
			color: #ffffff;
			margin-top: 16rpx;
		}
	}
</style>
