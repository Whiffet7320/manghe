<template>
	<view>
		<view class="scribelist">
			<view class="scribe_item" v-for="(item,index) in list" :key="index">
				<view class="time">
					<image src="/static/image/user/icon_time.png" mode="aspectFit" class="icon"></image>
					<text>预约时间：{{item.appointment_time}}</text>
				</view>
				<view class="tip">注：尾款 ￥{{item.finish_pay_price}}需要在{{item.appointment_time}}面诊后支付</view>
				<view class="bd" v-for="(pitem,pindex) in item.cartInfo" :key="pindex">
					<image :src="pitem.productInfo.image" mode="aspectFill" class="img"></image>
					<view class="info">
						<view class="name">{{pitem.productInfo.store_name}}</view>
						<view class="attr">预约时间：{{item.appointment_time}}</view>
						<view class="attr">预约医生：{{pitem.productInfo.doctor_name}}</view>
						<view class="fnwrap">
							<view class="price">预付款 ￥{{pitem.productInfo.price}}</view>
							<view class="sprice">尾款 ￥{{pitem.productInfo.finish_pay_price}}</view>
						</view>
					</view>
				</view>
				<view class="ft">
					<view class="no">
						<text>订单编号：{{item.order_id}}</text>
						<view class="light" @click.stop="$tool.onCopy(item.order_id)">复制</view>
					</view>
					<view class="btn" v-if="item.finish_pay_status==1">已面诊</view>
				</view>
			</view>
		</view>
		<u-loadmore height="80rpx" font-size="20" :status="loadStatus" icon-type="flower" color="#707070" />
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[],
				loadStatus: 'loadmore',
				currentPage: 1
			}
		},
		methods:{
			getlist(){
				let list = [];
				this.loadStatus = 'loading';
				this.$api.myAppointmentlist({page:this.currentPage,limit:10}).then((res)=>{
					if(res.status==200){
						if (res.data.length == 0) {
							this.loadStatus = 'nomore';
						} else {
							if(this.currentPage==1 && res.data.length<=10){
								this.loadStatus = 'nomore';
							}else{
								this.loadStatus = 'loadmore';
							}
							this.currentPage++;
							this.list = this.list.concat(res.data);
						}
					}
				})
			}
		},
		onLoad(){
			this.getlist();
		},
		onReachBottom() {
			this.getlist();
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		}
	}
</script>

<style>
	page{
		background: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.scribelist{
		.scribe_item{
			background-color: #FFFFFF;
			margin-bottom: 20rpx;
			.time{
				padding-left: 40rpx;
				height: 88rpx;
				display: flex;
				align-items: center;
				font-size: 24rpx;
				color: #707070;
				.icon{
					padding-right: 16rpx;
					width: 24rpx;
					height: 24rpx;
				}
			}
			.tip{
				text-align: center;
				font-size: 20rpx;
				color: #BD9E81;
				font-weight: bold;
				background-color: #F2ECE6;
				padding: 14rpx 0;
			}
			.bd{
				margin-left: 40rpx;
				padding:28rpx 40rpx 34rpx 0;
				border-bottom: 2rpx #F7F8FA solid;
				display: flex;
				.img{
					width: 186rpx;
					height: 186rpx;
					background-color: #eee;
				}
				.info{
					flex:1;
					padding-left: 24rpx;
					.name{
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 700;
						color: #707070;
						padding-bottom: 12rpx;
					}
					.attr{
						font-size: 24rpx;
						font-family: PingFang SC;
						color: #707070;
					}
					.fnwrap{
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding-top: 30rpx;
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
			.ft{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-left: 40rpx;
				padding:20rpx 40rpx 20rpx 0;
				.no{
					font-size: 24rpx;
					color: #707070;
					display: flex;
					align-items: center;
					.light{
						font-size: 24rpx;
						color: #BD9E81;
						padding-left: 20rpx;
					}
				}
				.btn{
					width: 152rpx;
					height: 56rpx;
					line-height: 56rpx;
					text-align: center;
					font-size: 24rpx;
					color: #FFFFFF;
					background-color: #BD9E81;
					border-radius: 10rpx;
				}
			}
		}
	}
</style>