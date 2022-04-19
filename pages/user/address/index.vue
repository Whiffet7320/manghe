<template>
	<view class="index">
		<u-toast ref="uToast" />
		<!-- 无地址 -->
		<view class="nav1" v-if="list.length == 0">
			<image src="/static/img/zu1281.png" class="n1-pic" mode=""></image>
			<view class="n1-txt">暂无收货地址，请添加</view>
		</view>
		<!-- 有地址 -->
		<view class="items" v-else>
			<view class="item" @click="choossAddress(item)" v-for="(item,i) in list" :key='item.address_id'>
				<view class="tit1">
					<view class="txt1-1" style="margin-right: 48rpx;">{{item.address_person}}</view>
					<view class="txt1-1">{{item.address_phone}}</view>
				</view>
				<view class="tit2">{{item.address_area}}{{item.address_detail}}</view>
				<view class="heng"></view>
				<view class="tit3">
					<view class="left" @click.stop="changeMoren(item.address_id,i)">
						<view :class="{'icon':true,'active':item.address_def}">
							<view class="dian" v-if="item.address_def"></view>
						</view>
						<view class="txt3-1 txtt">设为默认</view>
					</view>
					<view class="right">
						<view @click.stop="toXiugaiAddress(item)" class="txt3-2 txtt">编辑</view>
						<view @click.stop="delAddress(item.address_id,i)" class="txt3-3 txtt">删除</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
		</view>
		<view class="footer">
			<view @click="toAddress" class="btn">添加收货地址</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["dingdanPage", "dingdanPageSize"]),
		},
		data() {
			return {
				nowIndex: 1,
				userId: '',
				list: [],
				needBack: '',
				// 加载
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '上拉加载更多',
					loading: '正在加载...',
					nomore: '没有了更多了'
				},
			}
		},
		onShow() {
			this.list = [];
			this.userId = uni.getStorageSync('userId')
			this.getData()
		},
		onLoad(options) {
			this.needBack = options.needBack;
		},
		methods: {
			async getData() {
				this.status = 'loading';
				const res = await this.$api.getAddressList({
					// user_id:this.userId
					user_id: 470320,
					timestamp: new Date().getTime(),
					sign: this.$md5(`BlindBox${new Date().getTime()}`)
				})
				console.log(res)
				if (res.data.length < 10) {
					this.status = 'nomore'
				} else {
					this.status = 'loadmore';
				}
				this.list = this.list.concat(res.data)
			},
			choossAddress(item) {
				if (this.needBack == 'yes') {
					var obj = {
						nowItem: item,
						noGetData: 'yes'
					}
					var pages = getCurrentPages();
					var prevPage = pages[pages.length - 2];
					prevPage.$vm.otherFun(obj)
					uni.navigateBack()
					// uni.redirectTo({
					// 	url:`/pages/order/tijiaodingdan?nowItem=${JSON.stringify(item)}&noGetData=yes`
					// })
				}
			},
			async changeMoren(id, i) {
				this.nowIndex = i
				const res = await this.$api.updateAddress({
					address_def: true,
					address_id: id,
				})
				console.log(res)
				if (res.status == 200) {
					this.$refs.uToast.show({
						title: res.msg,
					})
					this.list.forEach(ele => {
						this.$set(ele, 'address_def', false)
					})
					this.$set(this.list[i], 'address_def', true)
					var obj = {
						nowItem: {},
						noGetData: 'no'
					}
					var pages = getCurrentPages();
					var prevPage = pages[pages.length - 2];
					prevPage.$vm.otherFun(obj)
				}
			},
			toAddress() {
				uni.navigateTo({
					url: '/pages/user/address/tianjiadizhi'
				})
			},
			toXiugaiAddress(item) {
				uni.navigateTo({
					url: `/pages/user/address/tianjiadizhi?address=${JSON.stringify(item)}`
				})
			},
			async delAddress(id, i) {
				const res = await this.$api.deleteAddress({
					address_id: id
				})
				this.$refs.uToast.show({
					title: res.msg,
					duration: 1000,
					callback: () => {
						if (res.status == 200) {
							this.list.splice(i, 1)
							if(this.list.length == 0){
								
							}
						}
					}
				})
			},
		}
	}
</script>
<style lang="scss">
	page {
		background: #f8f8f8;
	}
</style>
<style lang="scss" scoped>
	/deep/ .u-load-more-wrap {
		padding: 16rpx 0;
	}

	.index {}

	.nav1 {
		display: flex;
		flex-direction: column;
		align-items: center;

		.n1-pic {
			margin-top: 550rpx;
			width: 132rpx;
			height: 94rpx;
			opacity: 0.47
		}

		.n1-txt {
			margin-top: 30rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: center;
			color: #666666;
		}
	}

	.items {
		margin-top: 28rpx;

		.item {
			padding: 26rpx 34rpx;
			margin: 0 auto 24rpx;
			width: 690rpx;
			background: #ffffff;
			border-radius: 20rpx;

			.tit1 {
				display: flex;
				align-items: center;

				.txt1-1 {
					font-size: 32rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #333333;
				}
			}

			.tit2 {
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				margin-top: 10rpx;
				color: #666666;
			}

			.heng {
				margin-top: 28rpx;
				width: 630rpx;
				height: 2rpx;
				background: #dcdcdc;
			}

			.tit3 {
				margin-top: 22rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.txtt {
					margin-left: 12rpx;
					font-size: 24rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					color: #999999;
				}

				.left {
					display: flex;
					align-items: center;

					.icon {
						width: 22rpx;
						height: 22rpx;
						border: 2rpx solid #b8b8b8;
						border-radius: 50%;
					}

					.icon.active {
						border: 2rpx solid #02b3b6;
						display: flex;
						justify-content: center;
						align-items: center;

						.dian {
							width: 10rpx;
							height: 10rpx;
							background: #02b3b6;
							border-radius: 50%;
						}
					}

					.txt3-1 {
						margin-left: 12rpx;
					}
				}

				.right {
					display: flex;
					align-items: center;

					.txt3-3 {
						margin-left: 28rpx;
					}
				}
			}
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 140rpx;
		background: #ffffff;
		box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(51, 51, 51, 0.04);

		.btn {
			width: 690rpx;
			height: 76rpx;
			background: #02b3b6;
			border-radius: 38rpx;
			box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(2, 179, 182, 0.12);
			margin-top: 12rpx;
			margin-left: 30rpx;
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			line-height: 76rpx;
			color: #ffffff;
		}
	}
</style>
