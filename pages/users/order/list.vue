<template>
	<view class="orderlist">
		<u-tabs-swiper gutter='80' bg-color="#ffffff" height='80' font-size="28" inactive-color="#707070" bar-height="4"
			bar-width="64" active-color="#BD9E81" ref="uTabs" :list="navList" :current="tabCurrentIndex" @change="tabsChange"
			:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		<swiper :current="tabCurrentIndex" style="height: calc(100% - 80rpx)" duration="300" @change="changeTab">
			<swiper-item class="swiper-item" v-for="(item, index) in navList" :key="index">
				<scroll-view class="list_scroll" scroll-y @scrolltolower="loadData">
					<view class="order_item" v-for="(order, okey) in orderList" :key="order.id" @click="goDetail(order)">
						<view class="item">
							<view class="tit1">
								<view class="left" v-if="order._status._type == 0&&order.stop_time">
									<view class="txt1-1">剩余支付时间：</view>
									<view class="txt1-2">
										<view class="kuang">{{order.timeObj.h}}</view>
										<view class="txt1-2-1">：</view>
										<view class="kuang">{{order.timeObj.m}}</view>
										<view class="txt1-2-1">：</view>
										<view class="kuang">{{order.timeObj.s}}</view>
									</view>
								</view>
								<view class="left" v-else>
									<text class="time">下单时间：{{order._add_time}}</text>
								</view>
								<view class="right">
									<text v-if="order.finish_pay_status==1 && order._status._type != 3">已完成</text>
									<text v-else-if="order.finish_pay_status==1 && order._status._type == 3">待评价</text>
									<text v-else>{{order._status._title}}</text>
									<!-- <text v-if="order._status._type == -1||order._status._type == -2">{{order._status._title}}</text>
									<text v-else-if="order._status._type == 0">待付款</text>
									<text v-else-if="order.combination_id != 0 && order._status._type == 1">拼团中</text>
									<text v-else-if="order._status._type == 6 && order.shipping_type == 0">待付尾款</text>
									<text v-else-if="order._status._type == 1 && order.shipping_type == 1">待发货</text>
									<text v-else-if="order._status._type == 2 && order.shipping_type == 1">待收货</text>
									<text v-else-if="order._status._type == 3 && order.shipping_type == 1">待评价</text>
									<text v-else-if="order._status._type == 4 && order.shipping_type == 1">已完成</text> -->
								</view>
							</view>
							<view v-for="item2 in order.cartInfo" :key='item2.id'>
								<view class="tip" v-if="Number(order.finish_pay_price)>0 && order.finish_pay_status==0">注：尾款 ￥{{item2.productInfo.finish_pay_price}}需要在{{order.appointment_time}}面诊后支付</view>
								<view class="tit2">
									<image class="pic" :src="item2.productInfo.image" mode="aspectFill"></image>
									<view class="box1 dfwk" v-if="Number(order.finish_pay_price)>0 && order.finish_pay_status>=0">
										<view class="tit2-1">
											<view class="txt1">{{item2.productInfo.store_name}}</view>
										</view>
										<view class="tit2-1-1">预约时间：{{order.appointment_time}}</view>
										<view class="tit2-1-2">预约医生：{{item2.productInfo.doctor_name}}</view>
										<view class="down">
											<view class="tit2-1-2-1">预付款 ￥{{item2.productInfo.price}}</view>
											<view class="tit2-1-2-2 red">尾款 ￥{{item2.productInfo.finish_pay_price}}</view>
										</view>
									</view>
									<view class="box1" v-else>
										<view class="tit2-1">
											<view class="txt1">{{item2.productInfo.store_name}}</view>
											<view class="txt2">x{{item2.cart_num}}</view>
										</view>
										<view class="down">
											<view class="tit2-2">{{item2.productInfo.attrInfo.suk}}</view>
											<view class="tit2-3" v-if="item2.productInfo.attrInfo">￥{{ item2.productInfo.attrInfo.price }}</view>
											<view class="tit2-3" v-else>￥{{ item2.productInfo.price }}</view>
										</view>
									</view>
								</view>
							</view>
							<view class="tit3">
								<view class="box1" v-if="Number(order.finish_pay_price)>0 && order.finish_pay_status>=0">
									<view class="txt1">订单编号：{{order.finish_pay_order_num}}</view>
									<view class="txt2" @click.stop="$tool.onCopy(order.finish_pay_order_num)">复制</view>
								</view>
								<view class="box1" v-else>
									<view class="txt1">订单编号：{{order.order_id}}</view>
									<view class="txt2" @click.stop="$tool.onCopy(order.order_id)">复制</view>
								</view>
								<view class="btns">
									<view class="b-left" v-if="order.combination_id != 0 && order._status._type == 1">
										<view class="txt1">等待开团</view>
										<view class="pics">
											<image class="img" :src="userInfo.avatar" mode="aspectFill"></image>
										</view>
										<view class="more">...</view>
									</view>
									<view class="b-right">
										<view class="btn1" v-if="order._status._type == 0 || order._status._type == 9" @click.stop="cancelOrder(okey, order.order_id)">取消订单</view>
										<view class="btn2" v-if="order._status._type == 0 || order._status._type == 6" @click.stop="goPay(order)">去支付</view>
										<view class="btn2" v-else-if="order._status._type == 2" @click.stop="confirmOrder(order.order_id)">确认收货</view>
										<view class="btn1" v-else-if="order._status._type == 3" @click.stop="goOrderComment(order)">去评论</view>
										<view class="btn1" v-else-if="order._status._type == 4" @click.stop="goOrderReturn(order.order_id)">申请售后</view>
										<view class="btn2" v-if="order.combination_id < 1 && order._status._type == 4" @click.stop="toBuyagain(order)">再次购买</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<u-loadmore height="80rpx" font-size="20" :status="loadStatus" icon-type="flower" color="#707070" />
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default{
		data(){
			return{
				tabCurrentIndex: 0,
				navList: [
					{
						state: "",
						name: '全部'
					},{
						state: "0",
						name: '待付款'
					},{
						state: "8",
						name: '待付尾款'
					},{
						state: "1",
						name: '待发货'
					},{
						state: "2",
						name: '待收货'
					},{
						state: "3",
						name: '待评价'
					},{
						state: "4",
						name: '已完成'
					},{
						state: "-4",
						name: '已关闭'
					}
				],
				orderList:[],
				current_page:1,
				// 加载
				loadStatus: 'loadmore',
				loadText: {
					loadmore: '上拉加载更多',
					loading: '正在加载...',
					nomore: '没有更多了'
				},
			}
		},
		computed: {
			...mapState(['userInfo','onResh'])
		},
		onLoad(options) {
			if (!options.type) {
				options.type = "";
			}
			if (options.type !== "") {
				this.tabCurrentIndex = + parseInt(options.type);
			}
			this.getUserInfo();
			this.loadData();
		},
		onShow(){
			if(this.onResh){
				this.loadStatus = "loadmore";
				this.current_page = 1;
				this.getUserInfo();
				this.loadData();
			}
		},
		methods:{
			getUserInfo(){
				this.$api.getUserInfo().then(res => {
					if(res.status==200){
						this.navList[2].count = res.data.weikuan_num;
					}
				});
			},
			//获取订单列表
			loadData(source) {
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let state = navItem.state;
				
				//判断是否最后一页
				if (this.loadStatus == 'nomore') {
					return;
				}
				//tab切换只有第一次需要加载数据
				if (source === 'tabChange' && navItem.loaded === true) {
					return;
				}
				//防止重复加载
				if (this.loadStatus === 'loading') {
					return;
				}
				this.loadStatus = 'loading';
				// 获取列表
				this.$api.orderList({type: state,page: this.current_page,limit:10}).then((res)=>{
					if(res.status==200){
						if (res.data.length == 0) {
							this.loadStatus = 'nomore';
						} else {
							if(this.current_page==1 && res.data.length<=10){
								this.loadStatus = 'nomore';
							}else{
								this.loadStatus = 'loadmore';
							}
							this.current_page++;
							this.orderList = this.orderList.concat(res.data);
						}
						this.orderList.forEach(ele => {
							if (ele.stop_time) {
								this.mygetdate(ele.stop_time,ele)
							}
						})
						//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
						this.$set(navItem, 'loaded', true);
					}
				});
			},
			cancelOrder(index, order_id){
				if (!order_id){
					this.$u.toast('缺少订单号无法取消订单');
					return;
				}
				this.$api.orderCancel(order_id).then(res => {
					this.$u.toast(res.msg);
					this.orderList.splice(index, 1);
					this.getOrderData();
				}).catch(err => {
					this.$u.toast(err);
				});
			},
			confirmOrder(id){
				uni.showModal({
				    title: '温馨提示',
				    content: '为保障权益，请收到货确认无误后，再确认收货',
					confirmColor:"#BD9E81",
				    success:(res)=> {
				        if (res.confirm) {
							uni.showLoading({
								title: '请稍后'
							});
							this.$api.orderTake({uni: id}).then((res)=>{
								if(res.status==200){
									uni.hideLoading();
									this.$u.toast(res.msg);
									this.loadData();
								}else{
									uni.hideLoading();
									this.$u.toast(res.msg);
								}
							}).catch(err=>{
								uni.hideLoading();
							})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			goOrderComment(val){
				this.$store.commit("setComent",val.cartInfo);
				uni.navigateTo({
					url:"/pages/users/order/comment?id="+val.id
				})
			},
			goPay(item) {
				if(item.finish_pay_order_num!=="" && item.finish_pay_order_num!==null){
					uni.navigateTo({
						url: `/pages/users/order/querendingdan?wid=${item.finish_pay_order_num}&price=${item.pay_price}`
					})
				}else{
					uni.navigateTo({
						url: `/pages/users/order/querendingdan?id=${item.order_id}&price=${item.pay_price}`
					})
				}
			},
			toBuyagain(item) {
				if (item.cartInfo.length > 1) {
					var myId;
					item.cartInfo.forEach(ele => {
						myId += ele.id
					})
					uni.navigateTo({
						url: `/pages/users/order/tijiaodingdan?cartId=${item.order_id}&new=1&isAgain=yes`
					})
				} else {
					var skuItem = item.cartInfo[0].productInfo;
					skuItem.shopName = skuItem.store_name;
					skuItem.buyNum = item.cartInfo[0].cart_num;
					uni.navigateTo({
						url: `/pages/users/order/tijiaodingdan?cartId=${item.order_id}&new=1&isAgain=yes`
					})
				}
			},
			goDetail(val){
				if(Number(val.finish_pay_price)>0 && val.finish_pay_status>=0){
					this.$store.commit("setwkorder",val);
					if(val.finish_pay_status==1){
						uni.navigateTo({
							url:"/pages/users/order/wkorderDetail?order_id="+val.order_id
						})
					}else{
						uni.navigateTo({
							url:"/pages/users/order/wkorderDetail?order_id="+val.order_id+"&type=1"
						})
					}
				}else{
					uni.navigateTo({
						url:"/pages/users/order/Detail?order_id="+val.order_id
					})
				}
			},
			goOrderReturn(id){
				uni.navigateTo({
					url:"/pages/users/sale/index?orderId="+id
				})
			},
			//swiper 切换
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
				this.loadData('tabChange');
			},
			tabsChange(index) {
				this.orderList = [];
				this.current_page = 1;
				this.loadStatus = 'loadmore';
				this.$set(this.navList[index], 'loaded', false);
				this.tabCurrentIndex = index;
				this.loadData();
			},
			mygetdate(startSellTime,ele) {
				var date = new Date();
				var now = date.getTime();
				var endTime = new Date(startSellTime * 1000); // 结束时间
				var end = endTime.getTime();
				var lefttime = end - now;
				var d, h, m, s;
				if (lefttime > 0) {
					h = Math.floor(Math.floor(lefttime / 1000 / 60 / 60 / 24) * 24 + (lefttime / 1000 / 60 / 60 % 24))
					d = Math.floor(h / 24);
					h = d % 24;
					m = Math.floor(lefttime / 1000 / 60 % 60)
					s = Math.floor(lefttime / 1000 % 60)
					if (s < 10) {
						s = '0' + s
					}
					if (m < 10) {
						m = '0' + m
					}
					if (h < 10) {
						h = '0' + h
					}
				} else {
					this.h = '00';
					this.m = '00';
					this.s = '00';
					this.$set(ele, 'timeObj', {
						h: '00',
						m: '00',
						s: '00',
					})
					clearTimeout(timer)
				}
				var timer = setTimeout(() => {
					this.mygetdate(startSellTime,ele)
				}, 1000);
				this.$set(ele, 'timeObj', {d,h,m,s});
			},
		}
	}
</script>

<style>
	page {
		background: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.orderlist{
		height: 100vh;
		.list_scroll{
			height: 100%;
		}
	}
	.order_item {
		margin-top: 20rpx;
		.item {
			margin-bottom: 20rpx;
			background: #FFFFFF;
			padding: 0 40rpx 28rpx 40rpx;

			.tit1 {
				height: 90rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 2rpx solid #F7F8FA;

				.left {
					display: flex;
					align-items: center;
					.time{
						font-size: 24rpx;
						font-weight: 400;
						color: #707070;
					}
					.sign{
						font-size: 24rpx;
						padding: 0 7rpx;
						height: 36rpx;
						margin-right: 15rpx;
						color: #fc0000;
						border:2rpx #fc0000 solid;
					}

					.txt1-1 {
						font-size: 24rpx;
						font-weight: 400;
						color: #707070;
					}

					.txt1-2 {
						display: flex;
						align-items: center;

						.kuang {
							width: 44rpx;
							height: 42rpx;
							background: #FA8677;
							border-radius: 10rpx;
							font-size: 22rpx;
							font-weight: bold;
							line-height: 42rpx;
							text-align: center;
							color: #FFFFFF;
						}

						.txt1-2-1 {
							margin-left: 12rpx;
							font-size: 24rpx;
							font-weight: 400;
							color: #000000;
						}
					}
				}

				.right {
					font-size: 24rpx;
					font-weight: 500;
					color: #BD9E81;
				}
			}
			.tip{
				margin-left: -40rpx;
				margin-right: -40rpx;
				padding:14rpx 0;
				background-color: #F2ECE6;
				text-align: center;
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #BD9E81;
			}

			.tit2 {
				border-bottom: 2rpx solid #F7F8FA;
				padding: 28rpx 0;
				display: flex;
				align-items: center;

				.pic {
					width: 186rpx;
					height: 186rpx;
					background: #FFFFFF;
					border-radius: 10rpx;
				}

				.box1 {
					margin-left: 24rpx;
					width: 460rpx;
					height: 186rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.tit2-1 {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.txt1 {
							font-size: 28rpx;
							font-weight: 500;
							color: #BD9E81;
							width: 406rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}

						.txt2 {
							font-size: 24rpx;
							font-weight: 400;
							color: #707070;
						}
					}

					.tit2-1-1 {
						margin-top: 12rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #707070;
					}

					.tit2-1-2 {
						margin-top: 6rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #707070;
					}

					.down {
						.tit2-2 {
							font-size: 24rpx;
							font-weight: 400;
							color: #707070;
						}

						.tit2-3 {
							margin-top: 8rpx;
							font-size: 28rpx;
							font-weight: bold;
							color: #707070;
						}
					}
				}
				.dfwk {
					.down{
						margin-top: 6rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
										
						.tit2-1-2-1 {
							font-size: 24rpx;
							color: #707070;
							font-weight: 500;
						}
										
						.tit2-1-2-2 {
							font-size: 24rpx;
							font-weight: 500;
							color: #707070;
						}
										
						.tit2-1-2-2.red {
							color: #FA8677;
						}
					}
				}
			}

			.tit3 {
				.box1 {
					margin-top: 28rpx;
					display: flex;

					.txt1 {
						font-size: 24rpx;
						font-weight: 400;
						line-height: 34rpx;
						color: #707070;
					}

					.txt2 {
						margin-left: 20rpx;
						font-size: 24rpx;
						font-weight: 500;
						color: #BD9E81;
					}
				}

				.btns {
					display: flex;
					align-items: center;
					justify-content:flex-end;
					.b-left {
						margin-top: 28rpx;
						flex:1;
						display: flex;
						align-items: center;
						.txt1 {
							font-size: 20rpx;
							font-weight: 400;
							color: #707070;
						}
						.pics {
							margin-left: 20rpx;
							display: flex;
							align-items: center;
							.img{
								width: 34rpx;
								height: 34rpx;
								border-radius: 50%;
								background-color: #eee;
							}
						}
						.more{
							margin-left: 20rpx;
							width: 34rpx;
							height: 34rpx;
							background: #F7F8FA;
							border-radius: 50%;
							font-size: 24rpx;
							font-family: PingFang SC;
							color: #333333;
							display: flex;
							justify-content: center;
							line-height: 22rpx;
						}
					}
					.b-right{
						display: flex;
					}

					.btn1 {
						margin-top: 28rpx;
						height: 56rpx;
						width: 152rpx;
						border: 2rpx solid #666666;
						border-radius: 10rpx;
						ackground: #ffffff;
						font-size: 24rpx;
						font-weight: 400;
						line-height: 52rpx;
						text-align: center;
						color: #707070;
					}

					.btn3.btn1 {
						margin-right: 20rpx;
					}

					.btn2 {
						margin-top: 28rpx;
						margin-left: 20rpx;
						height: 56rpx;
						width: 152rpx;
						border-radius: 10rpx;
						background: #BD9E81;
						font-size: 24rpx;
						font-weight: 400;
						line-height: 56rpx;
						text-align: center;
						color: #FFFFFF;
					}
				}
			}
		}

		.item.dfwk {
			.tit1 {
				.left {
					font-size: 24rpx;
					font-weight: 400;
					color: #707070;
				}
			}

			.tit-z {
				transform: translateX(-40rpx);
				width: 750rpx;
				height: 56rpx;
				background: #F2ECE6;
				font-size: 20rpx;
				font-weight: bold;
				line-height: 56rpx;
				text-align: center;
				color: #BD9E81;
			}

			.down {
				.tit2-3-1 {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.tit2-3-1-1 {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						line-height: 40rpx;
						color: #707070;
					}

					.tit2-3-1-1.red {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						line-height: 40rpx;
						color: #FA8677;
					}
				}
			}

			.down.dfwk {
				margin-top: 6rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.tit2-1-2-1 {
					font-size: 24rpx;
					color: #707070;
					font-weight: 500;
				}

				.tit2-1-2-2 {
					font-size: 24rpx;
					font-weight: 500;
					color: #707070;
				}

				.tit2-1-2-2.red {
					color: #FA8677;
				}

			}
		}

		.item.dfwk.ptz {
			.btns {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;

				.b-left {
					display: flex;
					align-items: center;

					.txt1 {
						font-size: 20rpx;
						font-weight: 400;
						color: #707070;
					}

					.imgss {
						margin-left: 20rpx;
						display: flex;
						align-items: center;

						.imggg {
							width: 34rpx;
							height: 34rpx;
							border-radius: 50%;
						}
					}
				}
			}
		}
	}
</style>
