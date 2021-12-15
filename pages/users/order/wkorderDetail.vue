<template>
	<view>
		<view class="tip">已到店面诊，定金不予退还，可根据个人意愿联系客服改为其他项目</view>
		<view class="address_info">
			<view class="hd">
				<text>{{orderInfo.real_name}}</text>
				<text class="phone">{{orderInfo.user_phone}}</text>
			</view>
			<view class="detail" v-if="orderInfo.user_address!=''">
				<view class="mo">默认</view>
				<view>{{orderInfo.user_address}}</view>
			</view>
			<image src="/static/image/user/arrow_right.png" mode="aspectFit" class="icon"></image>
		</view>
		<view class="order" v-for="(item,index) in cartInfo" :key="index">
			<image :src='item.productInfo.attrInfo.image' v-if="item.productInfo.attrInfo" mode="aspectFill" class="img"></image>
			<image :src='item.productInfo.image' mode="aspectFill" class="img" v-else></image>
			<view class="info">
				<view class="name">{{item.productInfo.store_name}}</view>
				<view class="attr">预约时间：{{wkorder.appointment_time||""}}</view>
				<view class="attr">预约医生：{{item.productInfo.doctor_name||""}}</view>
				<view class="fnwrap">
					<view class="price">预付款 ￥{{item.productInfo.price}}</view>
					<view class="sprice">尾款 ￥{{item.productInfo.finish_pay_price}}</view>
				</view>
			</view>
		</view>
		<view class="sorder">
			<view class="desc">订单编号：{{orderInfo.finish_pay_order_num}}<view class="copy" @click="$tool.onCopy(orderInfo.finish_pay_order_num)">复制</view></view>
			<view class="desc">创建时间：{{(orderInfo.add_time_y || '') +' '+(orderInfo.add_time_h || 0)}}</view>
			<view class="desc">预付款支付时间：{{orderInfo._pay_time}}</view>
			<view class="desc" v-if="orderInfo.finish_pay_time!=null">面诊时间：{{$u.timeFormat(orderInfo.finish_pay_time, 'yyyy-mm-dd hh:MM:ss')}}</view>
			<view class="desc" v-if="orderInfo.mark">备注：{{orderInfo.mark}}</view>
		</view>
		<view class="service">
			<button class="u-reset-button contactbtn" open-type="contact">
				<image src="/static/image/user/kefu.png" mode="aspectFit" style="width: 30rpx;height:30rpx;"></image>
				<text class="text">联系客服</text>
			</button>
		</view>
		<u-gap height="120"></u-gap>
		<view class="footbar safe-area-inset-bottom">
			<!-- <view class="subbtn gray" v-if="status.type == 0 || orderInfo.finish_pay_status==0" @tap="cancelOrder">取消订单</view> -->
			<view class="btn1 gray" v-if="order._status._type == 3" @click.stop="goOrderComment(orderInfo)">去评论</view>
			<view class="subbtn" v-if="orderInfo.finish_pay_status==0" @click.stop="goPay(orderInfo)">去支付</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	export default{
		data(){
			return{
				order_id: '',
				cartInfo: [],
				orderInfo: {}
			}
		},
		computed:{
			...mapState(["wkorder"])
		},
		methods:{
			getOrderInfo() {
				uni.showLoading({
					title: "正在加载中"
				});
				this.$api.getOrderDetail(this.order_id).then(res => {
					if(res.status==200){
						this.orderInfo = res.data;
						this.cartInfo = this.wkorder.cartInfo;
					}
					uni.hideLoading();
				}).catch(err => {
					uni.hideLoading();
					this.$u.toast(err)
				});
			},
			goPay(item) {
				if(item.finish_pay_order_num!=="" && item.finish_pay_order_num!==null){
					uni.navigateTo({
						url: `/pages/users/order/querendingdan?wid=${item.finish_pay_order_num}&price=${item.pay_price}`
					})
				}
			},
			goOrderComment(val){
				this.$store.commit("setComent",val.cartInfo);
				uni.navigateTo({
					url:"/pages/users/order/comment?id="+val.id
				})
			}
		},
		onLoad(options){
			if(options.order_id){
				this.order_id = options.order_id;
			}
			if(options.type){
				uni.setNavigationBarTitle({
					title:"等待买家支付尾款"
				})
			}else{
				uni.setNavigationBarTitle({
					title:"订单详情"
				})
			}
		},
		onShow(){
			this.getOrderInfo();
		}
	}
</script>

<style>
	page{
		background: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.tip{
		background-color: #F2ECE6;
		text-align: center;
		padding: 14rpx;
		font-size: 20rpx;
		color: #BD9E81;
	}
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
		margin-top: 20rpx;
		padding:28rpx 40rpx;
		background-color: #FFFFFF;
		display: flex;
		.img{
			width: 170rpx;
			height: 170rpx;
			background-color: #eee;
		}
		.info{
			flex:1;
			padding-left: 40rpx;
			.name{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #707070;
				padding-bottom: 10rpx;
			}
			.attr{
				font-size: 24rpx;
				font-family: PingFang SC;
				color: #707070;
				padding-top: 10rpx;
			}
			.fnwrap{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-top: 10rpx;
				.price{
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #707070;
				}
				.sprice{
					font-size: 24rpx;
					color: #FA8677;
					font-family: PingFang SC;
				}
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