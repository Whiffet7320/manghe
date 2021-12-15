<template>
	<view>
		<view class="address_info" v-if="orderInfo.shipping_type === 1">
			<view class="hd">
				<text>{{orderInfo.real_name}}</text>
				<text class="phone">{{orderInfo.user_phone}}</text>
			</view>
			<view class="detail">
				<view class="mo">默认</view>
				<view>{{orderInfo.user_address}}</view>
			</view>
			<image src="/static/image/user/arrow_right.png" mode="aspectFit" class="icon"></image>
		</view>
		<view v-for="(pitem,index) in split" :key="pitem.id">
			<view class="order" v-for="(item,index) in pitem.cartInfo" :key="index">
				<image :src='item.productInfo.attrInfo.image' v-if="item.productInfo.attrInfo" mode="aspectFill" class="img"></image>
				<image :src='item.productInfo.image' mode="aspectFill" class="img" v-else></image>
				<view class="info">
					<view class="hd">
						<view class="name u-line-2">{{item.productInfo.store_name}}</view>
						<view class="num">x {{item.cart_num}}</view>
					</view>
					<view class="price">￥{{item.productInfo.ot_price||item.productInfo.product_price}}</view>
					<view class="sprice">￥{{item.productInfo.price}}</view>
				</view>
			</view>
		</view>
		<view class="order" v-for="(item,index) in cartInfo" :key="index">
			<image :src='item.productInfo.attrInfo.image' v-if="item.productInfo.attrInfo" mode="aspectFill" class="img"></image>
			<image :src='item.productInfo.image' mode="aspectFill" class="img" v-else></image>
			<view class="info">
				<view class="hd">
					<view class="name u-line-2">{{item.productInfo.store_name}}</view>
					<view class="num">x {{item.cart_num}}</view>
				</view>
				<view class="price">￥{{item.productInfo.ot_price||item.productInfo.product_price}}</view>
				<view class="sprice">￥{{item.productInfo.price}}</view>
			</view>
		</view>
		<view class="porder">
			<view class="oitem">
				<view class="label">商品总价</view>
				<text>￥{{(parseFloat(orderInfo.total_price)+parseFloat(orderInfo.vip_true_price)).toFixed(2)}}</text>
			</view>
			<view class="oitem" v-if="orderInfo.pay_postage > 0">
				<view class="label">运费</view>
				<text>￥{{parseFloat(orderInfo.pay_postage).toFixed(2)}}</text>
			</view>
			<view class="oitem" v-if='orderInfo.coupon_id'>
				<view class="label">优惠券</view>
				<text>-￥{{parseFloat(orderInfo.coupon_price).toFixed(2)}}</text>
			</view>
			<view class="oitem">
				<view class="label">实付款</view>
				<text>￥{{parseFloat(orderInfo.pay_price).toFixed(2)}}</text>
			</view>
		</view>
		<view class="sorder">
			<view class="desc">订单编号：{{orderInfo.order_id}}<view class="copy" @click="$tool.onCopy(orderInfo.order_id)">复制</view></view>
			<view class="desc">创建时间：{{(orderInfo.add_time_y || '') +' '+(orderInfo.add_time_h || 0)}}</view>
			<view class="desc">支付时间：{{orderInfo._pay_time}}</view>
			<view class="desc">支付状态：{{orderInfo.paid?"已支付":"未支付"}}</view>
			<view class="desc">支付方式：{{orderInfo._status._payType}}</view>
			<view class="desc" v-if="orderInfo.mark">买家留言：{{orderInfo.mark}}</view>
			<view class="desc" v-if="orderInfo.remark">商家备注：{{orderInfo.remark}}</view>
		</view>
		<view class="sorder" v-if='orderInfo.delivery_type=="express"'>
			<view class="desc">配送方式：发货</view>
			<view class="desc">快递公司：{{orderInfo.delivery_name || ''}}</view>
			<view class="desc">快递号：{{orderInfo.delivery_id || ''}}</view>
		</view>
		<view class="service">
			<button class="u-reset-button contactbtn" open-type="contact">
				<image src="/static/image/user/kefu.png" mode="aspectFit" style="width: 30rpx;height:30rpx;"></image>
				<text class="text">联系客服</text>
			</button>
		</view>
		<u-gap height="120"></u-gap>
		<view class="footbar safe-area-inset-bottom">
			<view class="subbtn gray" v-if="status.type == 0 || status.type == 9" @tap="cancelOrder">取消订单</view>
			<view class="subbtn" v-if="status.type==0" @tap="goPay(orderInfo)">去支付</view>
			<view class="subbtn" v-if="status.class_status==5" @tap='goOrderConfirm'>再次购买</view>
			<view class="subbtn" v-if="status.class_status==1" @tap='goJoinPink'>查看拼团</view>
			<view class="subbtn" v-if="status.class_status==3 && !split.length" @click='confirmOrder'>确认收货</view>
			<view class="subbtn" v-if="status.type==4 && !split.length ||status.type==-2" @tap='delOrder'>删除订单</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				order_id: '',
				cartInfo: [], //购物车产品
				split: [], //分单商品
				orderInfo: {
					system_store: {},
					_status: {}
				}, //订单详情
				status: {}, //订单底部按钮状态
			}
		},
		methods:{
			getOrderInfo() {
				uni.showLoading({
					title: "正在加载中"
				});
				this.$api.getOrderDetail(this.order_id).then(res => {
					if(res.status==200){
						let _type = res.data._status._type;
						this.orderInfo = res.data;
						this.cartInfo = res.data.cartInfo;
						this.split = res.data.split;
						this.getOrderStatus();
					}
					uni.hideLoading();
				}).catch(err => {
					uni.hideLoading();
					this.$u.toast(err)
				});
			},
			getOrderStatus() {
				let orderInfo = this.orderInfo || {},
					_status = orderInfo._status || {_type: 0},
					status = {};
				let type = parseInt(_status._type),
					delivery_type = orderInfo.delivery_type,
					combination_id = orderInfo.combination_id ? parseInt(orderInfo.combination_id) : 0;
				status = {
					type: type == 9 ? -9 : type,
					class_status: 0
				};
				if (type == 1 && combination_id > 0) status.class_status = 1; //查看拼团
				if (type == 2 && delivery_type == 'express') status.class_status = 2; //查看物流
				if (type == 2) status.class_status = 3; //确认收货
				if (type == 4 || type == 0) status.class_status = 4; //删除订单
				if (!combination_id && (type == 3 || type == 4)) status.class_status = 5; //再次购买
				this.status = status;
			},
			cancelOrder(){
				this.$api.orderCancel(this.orderInfo.order_id).then(res => {
					if(res.status==200){
						this.$u.toast(res.msg);
						this.getOrderInfo();
					}else{
						this.$u.toast(res.msg);
					}
				}).catch(err => {
					this.$u.toast(err);
				});
			},
			goPay(val){
				uni.navigateTo({
					url: `/pages/users/order/querendingdan?id=${val.order_id}&price=${val.pay_price}`
				})
			},
			goJoinPink() {
				uni.navigateTo({
					url: '/pages/users/order/combinationStatus?id=' + this.orderInfo.pink_id
				});
			},
			goOrderConfirm() {
				this.$api.orderAgain(this.orderInfo.order_id).then(res => {
					return uni.navigateTo({
						url: '/pages/users/order/tijiaodingdan?new=1&cartId=' + res.data.cateId
					});
				}).catch(err => {
					this.$u.toast(err);
				})
			},
			confirmOrder(){
				uni.showModal({
				    title: '温馨提示',
				    content: '为保障权益，请收到货确认无误后，再确认收货',
					confirmColor:"#BD9E81",
				    success:(res)=> {
				        if (res.confirm) {
							uni.showLoading({
								title: '请稍后'
							});
							this.$api.orderTake({uni: this.orderInfo.order_id}).then((res)=>{
								if(res.status==200){
									uni.hideLoading();
									this.$u.toast(res.msg);
									setTimeout(()=>{
										this.$store.commit("setResh",true);
										uni.navigateBack();
									},1500)
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
			delOrder(){
				uni.showModal({
					title: '删除订单',
					content: '确定删除该订单',
					confirmColor:"#BD9E81",
					success: (res)=> {
						if (res.confirm) {
							this.$api.orderDel(this.orderInfo.order_id).then(res => {
								if (this.status.type == -2) {
									uni.showToast({
										title: '删除成功',
										icon: 'success'
									})
									setTimeout(()=>{
										this.$store.commit("setResh",true);
										uni.navigateBack();
									},1500)
								} else {
									uni.showToast({
										title: '删除成功',
										icon: 'success'
									})
									setTimeout(()=>{
										this.$store.commit("setResh",true);
										uni.navigateBack();
									},1500)
								}
							}).catch(err => {
								this.$u.toast(err);
							});
						} else if (res.cancel) {
							this.$u.toast('已取消');
						}
					}
				});
			}
		},
		onLoad(options) {
			if (options.order_id) {
				this.order_id = options.order_id;
			}
		},
		onShow() {
			this.getOrderInfo();
		}
	}
</script>

<style>
	page{
		background-color: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.address_info{
		background-color: #FFFFFF;
		padding:30rpx 40rpx;
		font-size: 24rpx;
		color: #707070;
		position: relative;
		.hd{
			display: flex;
			font-weight: bold;
			padding-bottom: 12rpx;
			.phone{
				padding-left: 20rpx;
			}
		}
		.detail{
			display: flex;
			align-items: center;
			.mo{
				padding:0 8rpx;
				border-radius: 8rpx;
				font-size: 22rpx;
				color: #FFFFFF;
				background-color: #BD9E81;
				margin-right: 6rpx;
			}
		}
		.icon{
			width: 10rpx;
			height: 18rpx;
			position: absolute;
			right:40rpx;
			top:60rpx;
		}
	}
	.order{
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 28rpx 40rpx;
		display: flex;
		.img{
			width: 170rpx;
			height: 170rpx;
			background-color: #eee;
			flex-shrink: 0;
		}
		.info{
			flex:1;
			padding-left: 20rpx;
			.hd{
				display: flex;
				height: 68rpx;
				.name{
					flex:1;
					padding-right: 20rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #BD9E81;
				}
				.num{
					font-size: 24rpx;
					font-family: PingFang SC;
					color: #707070;
				}
			}
			.price{
				margin-top: 20rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				color: #707070;
				text-decoration: line-through;
			}
			.sprice{
				margin-top: 8rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 800;
				color: #707070;
			}
		}
	}
	.porder{
		margin-top: 4rpx;
		background-color: #FFFFFF;
		padding:0 40rpx 28rpx 40rpx;
		.oitem{
			padding-top: 28rpx;
			display: flex;
			font-size: 24rpx;
			font-family: PingFang SC;
			color: #707070;
			.label{
				flex:1;
			}
		}
	}
	.sorder{
		margin-top: 4rpx;
		background-color: #FFFFFF;
		padding:28rpx 40rpx 0;
		font-size: 24rpx;
		color: #707070;
		.desc{
			display: flex;
			padding-bottom: 20rpx;
			.copy{
				padding-left: 20rpx;
				color: #BD9E81;
			}
		}
	}
	.service{
		background-color: #FFFFFF;
		margin:88rpx 40rpx 0 40rpx;
		height: 82rpx;
		border-radius: 10rpx;
		button{
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #707070;
		}
		.text{
			margin-left: 16rpx;
		}
	}
	.footbar{
		position: fixed;
		bottom: 0;
		left:0;
		right: 0;
		z-index: 50;
		width: 100%;
		height: 110rpx;
		background-color: #FFFFFF;
		box-shadow: 0 8rpx 28rpx rgba(166, 179, 194, 0.3);
		padding:0 30rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.subbtn{
			margin-left: 20rpx;
			width: 152rpx;
			height: 60rpx;
			line-height: 60rpx;
			background: #BD9E81;
			border:2rpx #BD9E81 solid;
			border-radius:10rpx;
			text-align: center;
			font-size: 24rpx;
			color: #FFFFFF;
			&.gray{
				background: #FFFFFF;
				border:2rpx #666666 solid;
				color: #707070;
			}
		}
	}
</style>