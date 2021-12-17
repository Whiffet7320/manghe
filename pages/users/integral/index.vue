<template>
	<view class="u-relative">
		<view class="bg"><image src="/static/image/user/bg.jpg" mode="aspectFill" class="img"></image></view>
		<view class="total">
			<text class="text">我的积分</text>
			<text class="number">{{userInfo.integral||0}}</text>
		</view>
		<view class="tit"></view>
		<view class="pointlist">
			<view class="point_item" v-for="(item,index) in list" :key="index">
				<view class="left">
					<view class="name">{{item.mark}}</view>
					<view class="time">{{item.item.add_time}}</view>
				</view>
				<view class="number" v-if="item.pm">+{{item.number}}</view>
				<view class="number gray" v-else>-{{item.number}}</view>
			</view>
		</view>
		<u-loadmore height="80rpx" font-size="20" :status="loadStatus" icon-type="flower" color="#707070" />
	</view>
</template>

<script>
	import {mapState} from "vuex";
	export default{
		data(){
			return{
				userInfo:{},
				list:[],
				loadStatus: 'loadmore',
				currentPage: 1,
				loadText: {
					loadmore: '上拉加载更多',
					loading: '正在加载...',
					nomore: '没有更多了'
				},
			}
		},
		methods:{
			getUserInfo(){
				this.$api.getUserInfo().then((res)=>{
					if(res.status==200){
						this.userInfo = res.data;
					}
				})
			},
			getIntegralList(){
				this.$api.integralList({page:this.currentPage,limit:10}).then((res)=>{
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
			this.getUserInfo();
			this.getIntegralList();
		},
		onReachBottom() {
			this.getIntegralList();
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
	.bg{
		width: 100%;
		height: 158rpx;
		position: absolute;
		top:0;
		left:0;
		z-index: -1;
		.img{
			width: 100%;
			height: 100%;
		}
	}
	.total{
		width: 100%;
		height: 158rpx;
		padding-left: 60rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.text{
			font-size: 24rpx;
			font-family: PingFang SC;
			color: rgba(255,255,255,0.8);
			margin-bottom: 8rpx;
		}
		.number{
			font-size: 48rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
		}
	}
	.tit{
		padding:28rpx 40rpx 24rpx 40rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #707070;
	}
	.pointlist{
		margin: 0 20rpx;
		background-color: #FFFFFF;
		.point_item{
			padding: 24rpx 40rpx 24rpx 0;
			margin-left: 40rpx;
			border-bottom: 2px solid #F7F8FA;
			display: flex;
			align-items: center;
			&:last-child{
				border:0;
			}
			.left{
				flex:1;
				display: flex;
				flex-direction: column;
				.name{
					font-size: 24rpx;
					color:#707070;
				}
				.time{
					padding-top: 12rpx;
					font-size: 20rpx;
					color:#707070;
				}
			}
			.number{
				font-size: 24rpx;
				color: #FA8677;
				font-weight: bold;
				.gray{
					color: #707070;
					font-weight: normal;
				}
			}
		}
	}
</style>
