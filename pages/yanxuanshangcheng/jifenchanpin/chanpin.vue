<template>
	<view class="index">
		<view class="nav1">
			<u-swiper height='602' :list="bannerList"></u-swiper>
		</view>
		<view class="nav2">
			<view class="tit1">
				<view class="left">
					<image src="/static/image/zu1577.png" class="pic1" mode=""></image>
					<view class="txt1">{{obj.storeInfo.price||0}}积分</view>
				</view>
				<view class="right" v-if="obj.productAttr">规格：{{obj.productAttr[0].attr_values[0]}}</view>
			</view>
			<view class="tit2">{{obj.storeInfo.title||""}}</view>
		</view>
		<view class="nav3">
			<view class="tit1">商品详情</view>
			<u-parse :html="obj.storeInfo.description"></u-parse>
		</view>
		<view class="footer">
			<view @click="toTijiaodingdan" class="btn">立即兑换</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj:{},
				id:0,
				isOnShow: true,
				bannerList: [],
			}
		},
		onLoad(options) {
			if(options.id){
				this.id = options.id;
			}
		},
		onShow() {
			if (!this.isOnShow) {
				return;
			}
			this.getData()
		},
		methods: {
			async getData(){
				this.bannerList = [];
				const res = await this.$api.store_integralDetail(this.id);
				if(res.status==200){
					this.obj = res.data;
					this.obj.storeInfo.images.forEach(ele=>{
						this.bannerList.push({
							image:ele
						})
					})
				}
			},
			toSeeImg(i, imgArr) {
				this.isOnShow = false;
				uni.previewImage({
					current: i,
					urls: imgArr,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) +
								'张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			toTijiaodingdan(){
				uni.navigateTo({
					url:`/pages/users/order/tijiaodingdan?skuItem=${JSON.stringify([this.obj])}&isJifenShop=yes`
				})
			},
			toShouyintai() {
				uni.navigateTo({
					url: '/pages/index/search/querendingdan'
				})
				// uni.navigateTo({
				// 	url:'/pages/index/search/shouyintai'
				// })
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
	.index {
		position: relative;
	}

	.nav1 {}
	.nav2{
		width: 726rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		margin: 18rpx 12rpx;
		padding: 28rpx 26rpx;
		.tit1{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left{
				display: flex;
				align-items: center;
				.pic1{
					width: 32rpx;
					height: 32rpx;
					margin-right: 12rpx;
				}
				.txt1{
					font-size: 40rpx;
					font-weight: bold;
					color: #FA8677;
				}
			}
			.right{
				font-size: 24rpx;
				font-weight: 400;
				color: #707070;
			}
		}
		.tit2{
			margin-top: 32rpx;
			font-size: 30rpx;
			font-weight: 500;
			line-height: 42rpx;
			color: #BD9E81;
		}
	}
	.nav3{
		margin-left: 12rpx;
		width: 726rpx;
		background: #FFFFFF;
		padding: 28rpx 26rpx;
		border-radius: 10rpx;
		.tit1{
			margin-bottom: 16rpx;
			font-size: 28rpx;
			font-weight: 500;
			color: #BD9E81;
		}
	}
	.footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 140rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 8rpx 28rpx rgba(166, 179, 194, 0.3);
		.btn{
			width: 682rpx;
			height: 84rpx;
			background: #BD9E81;
			border-radius: 44rpx;
			margin-top: 10rpx;
			margin-left: 34rpx;
			font-size: 28rpx;
			font-weight: bold;
			line-height: 84rpx;
			color: #FFFFFF;
			text-align: center;
		}
	}
</style>
