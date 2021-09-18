<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="tit1">多个师傅正在为您报价</view>
		<view class="tit2">
			距报价截止还剩：<text class="yellow">1天23小时55分钟</text>
		</view>
		<view class="tit3">
			<view class="shifu-item" v-for="item in list">
				<view class="sf-tit1">
					<view class="sf-txt1">
						<view class="sf-txt1-1">{{item.created_at}}</view>
						<view class="sf-txt1-2">报价金额</view>
					</view>
					<view class="sf-txt2">￥<text class="big">{{item.price}}</text></view>
				</view>
				<view class="sf-tit2">
					<view class="sf-tit2-1">
						<view class="sf-txt1">可用券</view>
						<view v-if="item.maxYhqNum > 0" class="sf-txt2">-{{item.maxYhqNum}}</view>
						<view v-else class="sf-txt2">暂无</view>
					</view>
				</view>
				<view class="sf-tit3">
					<image @click="toShifuxiangqin(item)" v-if="item.user_info.avatar" class="pic1"
						:src="item.user_info.avatar" mode=""></image>
					<image v-else class="pic1" src="/static/img/1229310763000_mthumb.png" mode=""></image>
					<view @click="toShifuxiangqin(item)" class="sf-right">
						<view class="sf-txt1">
							<view class="txt1-1">{{item.user_info.nick_name}}</view>
							<u-icon name="arrow-right" color="#707070" size="24"></u-icon>
						</view>
						<view class="sf-txt2">
							<view class="txt2-1">服务{{item.craftsman_info.service_count}}次</view>
							<view class="shu"></view>
							<view v-if="!item.craftsman_info.good_rep" class="txt2-1">暂无</view>
							<view v-else class="txt2-1">好评率{{item.craftsman_info.good_rep}}%</view>
						</view>
					</view>
					<image @click="callPhone(item)" class="pic2" src="/static/img/zu61.png" mode=""></image>
				</view>
				<view class="sf-tit4">
					<view class="item-2-1">
						<image class="pic1" src="/static/img/zu16.png" mode=""></image>
						<view class="txt11-1">空跑费29元/次</view>
					</view>
					<view class="item-2-1">
						<image class="pic2" src="/static/img/weixiu.png" mode=""></image>
						<view class="txt11-1">保修一个月</view>
					</view>
					<view class="item-2-1">
						<image class="pic3" src="/static/img/zu44.png" mode=""></image>
						<view class="txt11-1">不满意重新服务</view>
					</view>
				</view>
				<view class="heng"></view>
				<view @click="xuanzeshifu(item.id)" class="sf-tit5">选择师傅</view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.id = option.id
		},
		onShow() {
			this.getData()
		},
		data() {
			return {
				id: '',
				list: [],
			}
		},
		methods: {
			async getData() {
				const res = await this.$api.getDemandQuotesListXq(this.id);
				console.log(res);
				this.list = res.data.quotes;
				const res2 = await this.$api.coupons({
					type: 0,
					limit: 100,
					page: 1
				})
				let filterCouponsList = [];
				this.list.forEach(ele => {
					var filterCoupons = res2.data.data.filter(ele2 => {
						return Number(ele.price) >= ele2.limit
					})
					filterCouponsList.push(filterCoupons)
				})
				console.log(filterCouponsList);
				filterCouponsList.forEach(ele3 => {
					const maxYhqNum = Math.max.apply(Math, ele3.map(function(ele) {
						return ele.discount
					}))
					this.list.forEach(ele => {
						this.$set(ele, 'maxYhqNum', maxYhqNum)
					})
				})
				console.log(this.list);

			},
			callPhone(item) {
				console.log(item.user.phone)
				uni.makePhoneCall({
					phoneNumber: item.user.phone
				});
			},
			toShifuxiangqin(item) {
				uni.navigateTo({
					url: `/pages/index/fabuxuqiu/shifuxiangqin?item2=${JSON.stringify(item)}`
				})
			},
			async xuanzeshifu(id) {
				const res = await this.$api.selectDemandQuotes({
					id: this.id,
					quote_id: id,
				})
				console.log(res)
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: '选择成功',
						type: 'success',
						back: true,
						// url: '/pages/dingdan/dingdan',
						// isTab: true,
					})
				}
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
	.index {
		position: relative;
	}

	.tit1 {
		margin-top: 50rpx;
		text-align: center;
		font-size: 32rpx;
		font-family: Segoe UI;
		font-weight: 400;
		line-height: 42rpx;
		color: #000000;
	}

	.tit2 {
		text-align: center;
		margin-top: 36rpx;
		font-size: 24rpx;
		font-family: Segoe UI;
		font-weight: 400;
		line-height: 32rpx;
		color: #000000;

		.yellow {
			color: #FF6600;
		}
	}

	.tit3 {
		margin-top: 100rpx;

		/deep/ .u-tabs-scorll-flex {
			margin: 0 100rpx;
		}

		.shifu-item {
			margin: 36rpx 20rpx 20rpx 20rpx;
			padding: 0 30rpx 0 36rpx;
			width: 710rpx;
			height: 432rpx;
			background: #FFFFFF;
			border-radius: 16rpx;

			.sf-tit1 {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-top: 14rpx;

				.sf-txt1 {
					display: flex;
					flex-direction: column;

					.sf-txt1-1 {
						font-size: 20rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 28rpx;
						color: #999999;
					}

					.sf-txt1-2 {
						font-size: 28rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 38rpx;
						color: #000000;
					}
				}

				.sf-txt2 {
					font-size: 20rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 64rpx;
					color: #FF0000;

					.big {
						font-size: 48rpx;
					}
				}
			}

			.sf-tit2 {
				display: flex;
				flex-direction: row-reverse;

				.sf-tit2-1 {
					width: 132rpx;
					height: 34rpx;
					border: 2rpx solid #4D8BFD;
					border-radius: 6rpx;
					display: flex;

					.sf-txt1 {
						width: 68rpx;
						font-size: 20rpx;
						text-align: center;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 30rpx;
						color: #4D8BFD;
						background: #E9F0FD;
						border-radius: 6rpx 0px 0px 6rpx;
					}

					.sf-txt2 {
						width: 68rpx;
						font-size: 20rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 30rpx;
						color: #4D8BFD;
						text-align: center;
					}
				}

			}

			.sf-tit3 {
				display: flex;
				position: relative;

				.pic2 {
					position: absolute;
					width: 50rpx;
					height: 50rpx;
					right: 0;
					bottom: 0rpx;
					transform: translateY(34rpx);
				}

				.pic1 {
					width: 76rpx;
					height: 76rpx;
					background: #FFFFFF;
					border-radius: 50%;
					margin-right: 28rpx;
				}

				.sf-right {
					.sf-txt1 {
						height: 38rpx;
						display: flex;
						align-items: center;

						.txt1-1 {
							margin-right: 20rpx;
							line-height: 38rpx;
							font-size: 28rpx;
							font-family: Segoe UI;
							font-weight: 400;
							color: #707070;
						}
					}

					.sf-txt2 {
						margin-top: 10rpx;
						display: flex;
						align-items: center;

						.txt2-1 {
							font-size: 20rpx;
							font-family: Segoe UI;
							font-weight: 400;
							line-height: 28rpx;
							color: #999999;
						}

						.shu {
							height: 26rpx;
							margin: 0 16rpx;
							border: 2rpx solid #999999;
						}
					}
				}

			}

			.sf-tit4 {
				margin-top: 64rpx;
				display: flex;
				align-items: center;

				.item-2-1 {
					padding: 0 12rpx;
					height: 40rpx;
					background: #E9F0FD;
					border-radius: 10rpx;
					display: flex;
					align-items: center;
					margin-right: 20rpx;

					.pic1 {
						width: 31rpx;
						height: 31rpx;
					}

					.pic2 {
						width: 27rpx;
						height: 27rpx;
					}

					.pic3 {
						height: 18rpx;
						width: 25rpx;
					}

					.txt11-1 {
						margin-left: 14rpx;
						font-size: 20rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 28rpx;
						color: #000000;
					}
				}
			}

			.heng {
				margin-top: 34rpx;
				transform: translateX(-34rpx);
				width: 710rpx;
				border: 2rpx solid #E6E6E6;
			}

			.sf-tit5 {
				font-size: 32rpx;
				font-family: Segoe UI;
				font-weight: bold;
				line-height: 90rpx;
				text-align: center;
				color: #4D8BFD;
			}
		}

	}
</style>
