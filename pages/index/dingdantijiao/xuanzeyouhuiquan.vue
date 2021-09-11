<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view v-if="noYhq" class="noYhq">
			您还未拥有优惠券哦~
		</view>
		<view class="nav1">
			<view @click="chooseYouhuiquan(i,item)" class="item" :key='item.id' v-for="(item,i) in List">
				<image v-if="youhuiquanIndex == i" class="picc" src="/static/img/zu90.png" mode=""></image>
				<image class="pic1" src="/static/img/zu22.png" mode=""></image>
				<view class="txt1">现金券</view>
				<view class="txt2">
					<view class="txt2-1">￥<text class="big">{{item.discount}}</text></view>
					<view class="txt2-2">满{{item.limit}}元可用</view>
				</view>
				<view class="txt3">{{item.discount}}元通用券</view>
				<view class="txt4">{{item.created_at}}-{{item.expiration_time}}</view>
				<view class="txt5">全站通用</view>
				<view class="txt6">可转赠</view>
				<view class="xuxian"></view>
				<view class="txt7">
					<image class="pic1" src="/static/img/zhuanfa.png" mode=""></image>
					<view class="txt7-1">转赠好友</view>
				</view>
				<view class="shixian"></view>
				<view class="txt8">全国通用</view>
			</view>
		</view>
		<view @click="goBack" class="btn">确定</view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			// 如果是商城订单status就等于shangping
			this.status = option.status;
			this.id = option.id;
			this.price = option.price
		},
		data() {
			return {
				youhuiquanIndex: -1,
				status: null,
				List: [],
				yhqObj: null,
				id: '',
				price: '',
				noYhq:false,
			}
		},
		onShow() {
			this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$api.coupons();
				this.List = res.data.data;
				console.log(res.data.total)
				if(res.data.total == 0){
					this.noYhq = true;
				}
			},
			chooseYouhuiquan(i, item) {
				this.youhuiquanIndex = i
				this.yhqObj = item;
			},
			goBack() {
				if (this.status == 'shangping') {
					// let pages = getCurrentPages();
					// let prevPage = pages[pages.length - 2];
					// prevPage.$vm.otherFun(this.yhqObj);
					// uni.navigateBack()
					this.$refs.uToast.show({
						title: '已选择优惠券',
						type: 'success',
						duration: 600,
						params: {
							...this.yhqObj
						},
						back: true,
					})
				} else {
					if (Number(this.price) <= Number(this.yhqObj.limit)) {
						this.$refs.uToast.show({
							title: '未达优惠券满减金额',
							type: 'warning',
							duration: 1000,
						})
					} else {
						this.$refs.uToast.show({
							title: '已选择优惠券',
							type: 'success',
							url: '/pages/index/dingdantijiao/dingdantijiao',
							duration: 600,
							params: {
								...this.yhqObj,
								coupon_id: this.yhqObj.id,
								id: this.id,
							},
						})
					}

				}
				s
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F3F5;
	}
</style>
<style scoped lang="scss">
	.noYhq{
		font-size: 30rpx;
		text-align: center;
		padding-top: 20rpx;
	}
	.nav1 {
		margin-top: 22rpx;
		margin-bottom: 120rpx;

		.item {
			margin: 0 20rpx 16rpx 20rpx;
			position: relative;
			width: 710rpx;
			height: 240rpx;

			.picc {
				position: absolute;
				z-index: 2;
				width: 710rpx;
				height: 240rpx;
			}

			.pic1 {
				position: absolute;
				width: 710rpx;
				height: 240rpx;
			}

			.txt1 {
				position: absolute;
				left: 16rpx;
				top: 4rpx;
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 28rpx;
				color: #FFFFFF;
				opacity: 1;
			}

			.txt2 {
				position: absolute;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 226rpx;
				height: 178rpx;

				.txt2-1 {
					height: 88rpx;
					font-size: 22rpx;
					font-family: Microsoft Himalaya;
					font-weight: 400;
					// line-height: 144rpx;
					color: #FFFFFF;
					opacity: 1;

					.big {
						font-size: 120rpx;
					}
				}

				.txt2-2 {
					font-size: 20rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 28rpx;
					color: #FFFFFF;
					opacity: 1;
				}
			}

			.txt3 {
				position: absolute;
				top: 14rpx;
				left: 250rpx;
				font-size: 28rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 38rpx;
				color: #000000;
				opacity: 1;
			}

			.txt4 {
				position: absolute;
				top: 66rpx;
				left: 250rpx;
				font-size: 28rpx;
				font-family: Microsoft Himalaya;
				font-weight: 400;
				line-height: 34rpx;
				color: #707070;
				opacity: 1;
			}

			.txt5 {
				position: absolute;
				top: 96rpx;
				left: 250rpx;
				font-size: 22rpx;
				font-family: Microsoft Himalaya;
				font-weight: 400;
				line-height: 26rpx;
				color: #707070;
				opacity: 1;
			}

			.txt6 {
				transform: rotate(45deg);
				position: absolute;
				top: 16rpx;
				right: 6rpx;
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 28rpx;
				color: #FFFFFF;
				opacity: 1;
			}

			.xuxian {
				position: absolute;
				top: 140rpx;
				right: 22rpx;
				width: 436rpx;
				height: 0px;
				border: 1rpx dashed #E6E6E6;
				opacity: 1;
			}

			.txt7 {
				position: absolute;
				top: 146rpx;
				left: 250rpx;
				display: flex;
				align-items: center;
				height: 30rpx;

				.pic1 {
					width: 28rpx;
					height: 28rpx;
				}

				.txt7-1 {
					margin-left: 34rpx;
					font-size: 20rpx;
					font-family: Microsoft Himalaya;
					font-weight: 400;
					color: #707070;
					opacity: 1;
				}
			}

			.shixian {
				position: absolute;
				top: 178rpx;
				right: 0rpx;
				width: 478rpx;
				height: 0px;
				border: 1px solid #E6E6E6;
				opacity: 1;
			}

			.txt8 {
				position: absolute;
				top: 198rpx;
				left: 16rpx;
				font-size: 22rpx;
				font-family: Microsoft Himalaya;
				font-weight: 400;
				line-height: 26rpx;
				color: #707070;
				opacity: 1;
			}
		}
	}

	.btn {
		position: fixed;
		bottom: 0;
		text-align: center;
		font-size: 48rpx;
		font-family: Segoe UI;
		font-weight: 400;
		line-height: 104rpx;
		color: #FFFFFF;
		width: 750rpx;
		height: 104rpx;
		background: #4988FD;
	}
</style>
