<template>
	<view class="index">
		<view class="nav1">
			<image @click="toBack" src="/static/img/zu947.png" class="fimg" mode=""></image>
			<image :src="item.shop_img"
				class="n1-pic" mode=""></image>
		</view>
		<view class="nav2">
			<view class="n2-tit1" v-if="type == 2">
				{{price}}
				<image src="/static/img/tu1001.png" class="picc" mode=""></image>
			</view>
			<view class="n2-tit1" v-if="type == 1">
				{{price}}
				<image src="/static/img/tu1001.png" class="picc" mode=""></image>
				<view class="txxx">补差价：<text class="sp">1000</text><image src="/static/img/tu1001.png" class="picc" mode=""></image></view>
			</view>
			<view class="n2-tit2">{{item.shop_name}}</view>
		</view>
		<view class="nav3">
			<view class="n3-tit1">
				<view class="heng"></view>
				<view class="n3-txt1">商品详情</view>
				<view class="heng"></view>
				<u-parse :html="content"></u-parse>
			</view>
		</view>
		<view class="footer">
			<view v-if="type == 2" @click="popShow1 = true" class="btn">立即购买</view>
			<view v-if="type == 1" @click="popShow1 = true" class="btn">立即置换</view>
		</view>
		<!-- 确认收货 -->
		<u-popup v-model="popShow1" mode='bottom' border-radius="28" height="476rpx">
			<view class="pop1">
				<view class="p1-tit1">
					<image
						:src="item.shop_img"
						class="pic1" mode=""></image>
					<view class="p1-txt1">
						<view class="top">{{item.shop_name}}</view>
						<view class="down">
							{{shop_price_after}}
							<image src="/static/img/tu1001.png" class="picc" mode=""></image>
						</view>
					</view>
				</view>
				<view class="heng"></view>
				<view class="p1-tit2">
					<view class="p1-txt2-1">数量</view>
					<view class="p1-txt2-2">
						<u-icon @click='jian' name="minus-circle" color="#02b3b6" size="34"></u-icon>
						<view class="num">{{num}}</view>
						<u-icon @click='num++' name="plus-circle-fill" color="#02b3b6" size="34"></u-icon>
					</view>
				</view>
				<view class="pop-footer">
					<view v-if="type == 2" @click="toPay" class="btn">立即购买</view>
					<view v-if="type == 1" @click="toZh" class="btn">立即置换</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popShow1: false,
				num:1,
				type:'',
				id:'',
				item:{},
				content:'',
				price:'',
				shop_price_after:'',
				shop_rotation:'',
			}
		},
		onLoad(option) {
			this.type = option.type;
			this.id = option.id;
			this.item = JSON.parse(option.item)
			console.log(this.item)
		},
		onShow() {
			this.getData()
		},
		methods:{
			async getData(){
				const res = await this.$api.getShopInfo({
					shop_id:this.id
				})
				this.content = res.data.shop_detail;
				this.price = res.data.shop_price;
				this.shop_price_after = res.data.shop_price_after;
				this.shop_rotation = res.data.shop_rotation
			},
			jian(){
				if(this.num == 1){
					return
				}else{
					this.num --
				}
			},
			toPay(){
				var price = Number(this.num) * Number(this.shop_price_after)
				uni.navigateTo({
					url:`/pages/order/tijiaodingdan?type=1&num=${this.num}&shop_id=${this.id}&price=${price}&shopObj=${JSON.stringify(this.item)}`
				})
			},
			toZh(){
				var price = Number(this.num) * Number(this.shop_price_after)
				uni.navigateTo({
					url:`/pages/order/tijiaodingdan?type=2&num=${this.num}&shop_id=${this.id}&price=${price}&shopObj=${JSON.stringify(this.item)}`
				})
			},
			toBack(){
				uni.navigateBack({
					delta:1
				})
			},
		}
	}
</script>

<style>
	page {
		background: #f7f7f7;
	}
</style>
<style scoped lang="scss">
	.index {
		position: relative;
	}
	
	.nav1 {
		width: 750rpx;
		height: 588rpx;
		position: relative;
		.fimg{
			position: absolute;
			z-index: 2;
			width: 40rpx;
			height: 40rpx;
			top: 34rpx;
			left: 30rpx;
		}
		.n1-pic {
			width: 750rpx;
			height: 588rpx;
		}
	}

	.nav2 {
		position: relative;
		z-index: 1;
		width: 690rpx;
		background: #ffffff;
		border-radius: 20rpx;
		box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0, 0, 0, 0.06);
		margin: -76rpx auto 0;
		padding: 28rpx 22rpx;

		.n2-tit1 {
			display: flex;
			align-items: center;
			font-family: PingFang SC, PingFang SC-Heavy;
			font-weight: 800;
			text-align: left;
			color: #f90000;
			font-size: 40rpx;

			.picc {
				width: 54rpx;
				height: 54rpx;
			}
			.txxx{
				margin-left: 10rpx;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				color: #333333;
				.sp{
					font-size: 28rpx;
					font-family: PingFang SC, PingFang SC-Heavy;
					font-weight: 800;
					text-align: left;
					color: #f90000;
				}
				.picc{
					transform: translateY(8rpx);
					width: 40rpx;
					height: 40rpx;
				}
			}
		}

		.n2-tit2 {
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			color: #333333;
			margin-top: 12rpx;
		}
	}

	.nav3 {
		margin: 24rpx auto;
		padding: 0 24rpx 32rpx 24rpx;
		width: 690rpx;
		// height: 894rpx;
		background: #ffffff;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.n3-tit1 {
			margin-top: 32rpx;
			display: flex;
			align-items: center;

			.heng {
				width: 168rpx;
				height: 2rpx;
				background: rgba(112, 112, 112, 0.48);
			}

			.n3-txt1 {
				font-size: 32rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				color: #333333;
				margin: 0 20rpx;
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

	.pop1 {
		padding: 30rpx;

		.p1-tit1 {
			display: flex;
			align-items: center;

			.pic1 {
				width: 204rpx;
				height: 180rpx;
				border-radius: 16rpx;
			}

			.p1-txt1 {
				margin-left: 28rpx;
				width: 450rpx;

				.top {
					font-size: 28rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #333333;
					letter-spacing: 0;
					overflow: hidden;
					display: -webkit-box;
					text-overflow: ellipsis;
					-webkit-line-clamp: 2;
					/*要显示的行数*/
					-webkit-box-orient: vertical;
				}

				.down {
					margin-top: 12rpx;
					display: flex;
					align-items: center;
					font-family: PingFang SC, PingFang SC-Heavy;
					font-weight: 800;
					text-align: left;
					color: #f90000;
					font-size: 40rpx;

					.picc {
						width: 54rpx;
						height: 54rpx;
					}
				}
			}

		}
		.heng{
			height: 2rpx;
			background: #d6d6d6;
			margin-top: 26rpx;
		}
		.p1-tit2{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 26rpx;
			.p1-txt2-1{
				font-size: 32rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #333333;
			}
			.p1-txt2-2{
				display: flex;
				align-items: center;
				.num{
					margin: -2rpx 16rpx 0;
					font-size: 30rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					color: #333333;
				}
			}
		}
		.pop-footer {
			position: fixed;
			bottom: 0;
			left: 0;
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
	}
</style>
