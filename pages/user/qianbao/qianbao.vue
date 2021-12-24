<template>
	<view class="index">
		<view class="nav1">
			<image src="/static/image/zu3038.png" class="pic1" mode=""></image>
			<view class="tit1">
				<view class="txt1">余额(元)</view>
				<view class="txt2">{{nowPrice}}</view>
				<view class="btns">
					<view class="btn1" @click="tojifen">
						<image src="/static/image/lujin2776.png" class="picc1" mode=""></image>
						<view class="txt1-1">我的积分</view>
					</view>
					<view class="btn1 btn2" @click="tochongzhi">
						<image src="/static/image/lujin2820.png" class="picc1" mode=""></image>
						<view class="txt1-1">去充值</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mynav">
			<u-navbar :title-bold='true' :border-bottom='false' back-icon-color='#ffffff' :background='background'
				title-color='#ffffff' title="我的钱包" title-size='34'></u-navbar>
		</view>
		<view class="nav2">
			<view class="tit1">
				<view class="box"></view>
				<view class="txt">全部记录</view>
			</view>
			<view class="items">
				<view class="item" v-for="item in list" :key='item.id'>
					<view class="titt1">
						<view class="txt1">{{item.title}}</view>
						<view class="txt2" v-if="item.pm">+{{item.number}}</view>
						<view class="txt2" v-else>-{{item.number}}</view>
					</view>
					<view class="titt2">
						<view class="txt1">{{item.mark}}</view>
						<view class="txt2">{{item.add_time}}</view>
					</view>
				</view>
				<u-loadmore :status="status" font-size="24" />
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	export default {
		data() {
			return {
				list:[],
				nowPrice:'',
				// 加载
				reload: false,
				current_page: 1,
				last_page: 1,
				status: 'loadmore'
			}
		},
		methods:{
			loadData(){
				this.status = 'loading';
				setTimeout(() => {
					this.$api.walletlist({
						page: this.current_page,
						limit: 10
					}).then((res)=>{
						if(res.code==200){
							uni.stopPullDownRefresh();
							this.list = this.reload ? res.data.data : this.list.concat(res.data.data);
							this.current_page = res.data.current_page; //当前页码
							this.last_page = res.data.last_page; //总页码
							this.status = res.data.total == 0 ? 'nomore' : 'more';
						}
					})
				}, 200)
			},
			tojifen(){
				uni.navigateTo({
					url:'/pages/user/jifen/wodejifen'
				})
			},
			tochongzhi(){
				uni.navigateTo({
					url:`/pages/user/qianbao/chongzhi?nowPrice=${this.nowPrice}`
				})
			},
		},
		onLoad(options) {
			if(options.now_money){
				this.nowPrice = options.now_money;
			}
			this.loadData();
		},
		onPullDownRefresh() {
			this.current_page = 1;
			this.reload = true;
			this.loadData();
		},
		onReachBottom() {
			//判断是否最后一页
			if (this.current_page >= this.last_page) {
				this.status = 'nomore';
			} else {
				this.reload = false;
				this.current_page = this.current_page + 1; //页码+1
				this.status = 'loading';
				this.loadData();
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
		height: 100rpx !important;
	}

	.nav1 {
		height: 640rpx;
		position: relative;

		.pic1 {
			position: absolute;
			left: 0;
			top: 0;
			height: 500rpx;
			width: 100%;
		}

		.tit1 {
			position: absolute;
			left: 30rpx;
			top: 230rpx;
			width: 690rpx;
			height: 390rpx;
			background: rgba(#ffffff, 0.96);
			border-radius: 16rpx;
			box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(35, 1, 1, 0.11);

			.txt1 {
				margin-top: 62rpx;
				font-size: 40rpx;
				font-weight: 700;
				text-align: center;
				color: #000000;
			}

			.txt2 {
				margin-top: 32rpx;
				font-size: 60rpx;
				font-weight: 700;
				color: #000000;
				text-align: center;
			}
			

			.btns {
				position: absolute;
				bottom: 0;
				left: 0;
				padding: 20rpx 0;
				width: 690rpx;
				height: 108rpx;
				background: rgba(#3d0101, 0.05);
				border-radius: 16rpx;
				box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0, 0, 0, 0.16);
				display: flex;
				align-items: center;

				.btn1 {
					border-right: 2rpx solid #808080;
					height: 68rpx;
					width: 49%;
					display: flex;
					align-items: center;
					justify-content: center;

					.picc1 {
						width: 36rpx;
						height: 40rpx;
					}

					.txt1-1 {
						margin-left: 18rpx;
						font-size: 32rpx;
						font-weight: 700;
						color: #000000;
					}
				}

				.btn2 {
					border-right: 0rpx solid #808080;
				}
			}
		}
	}

	.mynav {
		height: 0;
	}

	.nav2 {
		margin-top: 30rpx;
		padding: 0 30rpx;

		.tit1 {
			display: flex;
			align-items: center;

			.box {
				width: 8rpx;
				height: 32rpx;
				background: linear-gradient(180deg, #d61d1d, #530a0a);
			}

			.txt {
				margin-left: 8rpx;
				font-size: 28rpx;
				font-weight: 700;
				color: #808080;
			}
		}

		.items {
			margin-top: 28rpx;

			.item {
				margin-bottom: 24rpx;
				padding: 0 32rpx;
				width: 690rpx;
				height: 146rpx;
				background: #ffffff;
				box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.12);

				.titt1 {
					padding-top: 28rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.txt1 {
						font-size: 32rpx;
						font-weight: 700;
						color: #000000;
					}

					.txt2 {
						font-size: 32rpx;
						font-weight: 700;
						color: #d61d1d;
					}
				}

				.titt2 {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 12rpx;

					.txt1 {
						font-size: 24rpx;
						font-weight: 500;
						color: #000000;
					}

					.txt2 {
						font-size: 20rpx;
						font-weight: 500;
						color: #808080;
					}
				}
			}
		}
	}
</style>
