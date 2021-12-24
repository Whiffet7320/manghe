<template>
	<view class="index">
		<view class="nav1">
			<image src="/static/image/zu3037.png" class="pic1" mode=""></image>
			<view class="tit1">
				<image src="/static/image/zu3030.png" class="pic1-1" mode=""></image>
				<view class="txt1">总积分</view>
			</view>
			<view class="tit2">{{zongJifen}}</view>
			<view class="boxs">
				<view class="left" @click="toGuize">
					<view class="lt">
						<view class="l-txt1">积分规则</view>
						<view class="l-txt2">小积分 大用途</view>
					</view>
					<image src="/static/image/zu2971.png" class="b-pic1" mode=""></image>
				</view>
				<view class="left" @click="toTixian">
					<view class="lt">
						<view class="l-txt1">去提现</view>
						<view class="l-txt2">积分当现金用</view>
					</view>
					<image src="/static/image/zu3006.png" class="b-pic1" mode=""></image>
				</view>
			</view>
		</view>
		<view class="mynav">
			<u-navbar :title-bold='true' :border-bottom='false' back-icon-color='#ffffff' :background='background' title-color='#ffffff' title="我的积分" title-size='34'></u-navbar>
		</view>
		<view class="nav2">
			<view class="tit1">
				<view @click="changeIndex(-1)" :class="{'txt1':true,'active':index==-1}">全部</view>
				<view @click="changeIndex(1)" :class="{'txt1':true,'active':index==1}">收入</view>
				<view @click="changeIndex(0)" :class="{'txt1':true,'active':index==0}">支出</view>
			</view>
			<view class="items">
				<scroll-view class="list-scroll-content" scroll-y='true' enable-back-to-top @scrolltolower="loadMore">
					<view class="item" v-for="item in list" :key='item.id'>
						<view class="left">
							<view class="tit1-1">{{item.mark}}</view>
							<view class="tit2-1">{{item.add_time}}</view>
						</view>
						<view class="right" v-if="item.pm">+{{item.number}}</view>
						<view class="right gray" v-else>-{{item.number}}</view>
					</view>
					<page-empty v-show="isEmpty"></page-empty>
					<u-loadmore v-show="list.length" height="80rpx" :status="status" font-size="24" />
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	import pageEmpty from "@/components/page-empty";
	export default {
		components:{
			pageEmpty
		},
		data() {
			return {
				isEmpty: false,
				list:[],
				zongJifen:'',
				background: {
					'background': 'transparent'
				},
				index: -1,
				// 加载
				current_page: 1,
				last_page: 1,
				status: 'loadmore'
			}
		},
		methods: {
			loadData(){
				this.status = 'loading';
				setTimeout(() => {
					this.$api.integral_list({
						page: this.current_page,
						limit: 10,
						status: this.index
					}).then((res)=>{
						if(res.code==200){
							uni.stopPullDownRefresh();
							this.list = this.list.concat(res.data.data);
							this.isEmpty = !this.list.length;
							this.last_page = res.data.last_page;
							this.status = this.current_page < res.data.last_page ? 'loadmore' : 'nomore';
						}
					})
				}, 200)
			},
			loadMore(){
				if (this.current_page < this.last_page) {
					this.current_page += 1;
					this.loadData();
				}
			},
			changeIndex(i) {
				this.index = i;
				this.list = [];
				this.current_page = 1;
				this.last_page = 1;
				this.loadData();
			},
			toGuize(){
				uni.navigateTo({
					url:'/pages/index/jifenguize'
				})
			},
			toTixian(){
				uni.navigateTo({
					url:'/pages/user/tixian/tixian'
				})
			}
		},
		onLoad(options) {
			if(options.zongjifen){
				this.zongJifen = options.zongjifen;
			}
			this.loadData();
		},
		onPullDownRefresh() {
			this.list = [];
			this.current_page = 1;
			this.last_page = 1;
			this.loadData();
		}
	}
</script>

<style lang="scss">
	page {
		background: #f7f8fa;
	}
</style>
<style lang="scss" scoped>
	
	.index {
		position: relative;
	}

	.nav1 {
		position: relative;
		height: 580rpx;

		.pic1 {
			position: absolute;
			left: 0;
			top: 0;
			height: 506rpx;
			width: 100vw;
		}

		.tit1 {
			position: absolute;
			top: 220rpx;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			align-items: center;

			.pic1-1 {
				width: 40rpx;
				height: 42rpx;
			}

			.txt1 {
				margin-left: 12rpx;
				font-size: 28rpx;
				font-weight: 700;
				color: #ffffff;
			}
		}

		.tit2 {
			position: absolute;
			top: 276rpx;
			left: 50%;
			transform: translateX(-50%);
			font-size: 64rpx;
			font-weight: 700;
			color: #ffffff;
		}

		.boxs {
			position: absolute;
			top: 406rpx;
			left: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100vw;
			padding: 0 30rpx;

			.left {
				width: 324rpx;
				height: 174rpx;
				background: #ffffff;
				border-radius: 16rpx;
				box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0, 0, 0, 0.16);
				display: flex;
				align-items: center;
				justify-content: center;

				.lt {
					display: flex;
					flex-direction: column;
					align-items: center;

					.l-txt1 {
						font-size: 32rpx;
						font-weight: 700;
						color: #000000;
					}

					.l-txt2 {
						margin-top: 14rpx;
						font-size: 24rpx;
						font-weight: 500;
						color: #000000;
					}
				}

				.b-pic1 {
					margin-left: 28rpx;
					width: 100rpx;
					height: 100rpx;
				}
			}
		}
	}

	.mynav {
		height: 0;
	}

	.nav2 {
		position: fixed;
		bottom: 0;
		left: 30rpx;
		border-radius: 16rpx;
		box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0, 0, 0, 0.16);
		background: #FFFFFF;
		height: calc(100vh - 612rpx);
		width: calc(100vw - 60rpx);
		padding: 0 24rpx;

		.tit1 {
			margin-top: 24rpx;
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.txt1 {
				font-size: 32rpx;
				font-weight: 500;
				color: #000000;
			}

			.active {
				position: relative;
				font-size: 32rpx;
				font-weight: 700;
				color: #d61d1d;
			}

			.active::after {
				content: '';
				position: absolute;
				bottom: 2rpx;
				left: 50%;
				transform: translate(-50%,10rpx);
				width: 40rpx;
				height: 2rpx;
				background: #D61D1D;
			}
		}

		.items {
			margin-top: 20rpx;
			height: calc(100% - 86rpx);
			.list-scroll-content{
				height: 100%;
			}
			.item {
				border-bottom: 2rpx solid #f2f2f2;
				height: 136rpx;
				padding: 0 24rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					.tit1-1 {
						font-size: 28rpx;
						font-weight: 700;
						color: #000000;
					}

					.tit2-1 {
						margin-top: 12rpx;
						font-size: 24rpx;
						font-weight: 500;
						color: #808080;
					}
				}

				.right {
					font-size: 32rpx;
					font-weight: 700;
					color: #d61d1d;
					&.gray{
						color: #000;
					}
				}
			}
		}
	}
</style>
