<template>
	<view class="index">
		<view class="shifu-item" v-if="status == 2 && obj.selected_quote">
			<view class="sf-tit1">
				<view class="sf-txt1">
					<view class="sf-txt1-1">{{obj.created_at}}</view>
					<view class="sf-txt1-2">支付金额</view>
				</view>
				<view class="sf-txt2">￥<text class="big">{{obj.selected_quote.price}}</text></view>
			</view>
			<view class="sf-tit3">
				<image @click="toShifuxiangqin(obj)" v-if="obj.selected_quote.user_info.avatar" class="pic1" :src="obj.selected_quote.user_info.avatar" mode=""></image>
				<image v-else class="pic1" src="/static/img/1229310763000_mthumb.png" mode=""></image>
				<view @click="toShifuxiangqin(obj)" class="sf-right">
					<view class="sf-txt1">
						<view class="txt1-1">{{obj.selected_quote.user_info.nick_name}}</view>
						<u-icon name="arrow-right" color="#707070" size="24"></u-icon>
					</view>
					<view class="sf-txt2">
						<view class="txt2-1">服务{{obj.selected_quote.craftsman_info.service_count}}次</view>
						<view class="shu"></view>
						<view v-if="obj.selected_quote.craftsman_info.good_rep" class="txt2-1">好评率{{obj.selected_quote.craftsman_info.good_rep}}%</view>
						<view v-else class="txt2-1">暂无</view>
					</view>
				</view>
				<image @click="callPhone(obj)" class="pic2" src="/static/img/zu61.png" mode=""></image>
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
		</view>
		<view :class="{'box1-1':true,'myheight':status == 1}">
			<view v-if="status == 1" class="sf-tit1">
				<view class="sf-txt1">
					<view class="sf-txt1-1">{{obj.created_at}}</view>
					<view class="sf-txt1-2">支付金额</view>
				</view>
				<view class="sf-txt2">￥<text class="big">{{obj.selected_quote.price}}</text></view>
			</view>
			<view class="tit11">
				<view class="txt11">{{obj.item.name}}</view>
				<image class="pic11" :src="obj.images[0]" mode=""></image>
			</view>
<!-- 			<view class="tit22">
				<view class="txt11">物品类型（必填）</view>
				<view class="txt22">皮沙发1个</view>
			</view> -->
			<view class="tit33">
				<view class="txt11">需求说明</view>
				<view v-if="obj.intro" class="txt22">{{obj.intro}}</view>
				<view v-else class="txt22">暂无</view>
			</view>
		</view>
		<view class="box1-2">
			<view class="tit11">基本信息</view>
			<view class="tit22">
				<view class="tit22-1">
					<view class="txt1">订单编号</view>
					<view class="txt2">
						<view class="txt2-1">2C07222052609</view>
						<view class="shu"></view>
						<view @click="fuzhi(obj.order_num)" class="txt2-2">复制</view>
					</view>
				</view>
			</view>
			<view class="tit33">
				<view class="txt1">下单时间</view>
				<view class="txt2">{{obj.created_at}}</view>
			</view>
			<view class="tit33">
				<view class="txt1">期望上门时间</view>
				<view class="txt2">{{qwTime}}</view>
			</view>
			<view class="tit44">
				<view class="tit1">服务地址</view>
				<view class="tit2">
					<view class="txt1">{{obj.address.address}}</view>
					<view class="txt1">{{obj.address.sub_address}}{{obj.address.detail_address}}</view>
				</view>
			</view>
			<view class="tit33">
				<view class="txt1">服务客户</view>
				<view class="txt2">{{obj.address.name}} {{obj.address.phone}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:null,
				id:'',
				obj:null,
				qwTime:'',
			}
		},
		onLoad(option){
			console.log(option)
			this.status = option.status;
			this.id = option.id;
		},
		onShow() {
			this.getData()
		},
		methods: {
			async getData(){
				const res = await this.$api.getDemandQuotesListXq(this.id);
				console.log(res)
				this.obj = res.data;
				this.qwTime = `${this.obj.expect_start_date.slice(0, 10)} ${this.obj.expect_start_date.slice(11, 16)}-${this.obj.expect_end_date.slice(11, 16)}`
			},
			fuzhi(e) {
				uni.setClipboardData({
					data: e,
				});
			},
			callPhone(item) {
				uni.makePhoneCall({
				    phoneNumber: item.selected_quote.user.phone
				});
			},
			toShifuxiangqin(item) {
				console.log(JSON.stringify(item))
				uni.navigateTo({
					url: `/pages/index/fabuxuqiu/shifuxiangqin?item=${JSON.stringify(item)}`
				})
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
	.index {}

	.shifu-item {
		margin: 36rpx 20rpx 20rpx 28rpx;
		padding: 0 30rpx 0 36rpx;
		width: 692rpx;
		height: 334rpx;
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
			margin-top: 40rpx;

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
	.box1-1.myheight{
		height: 410rpx;
	}
	.box1-1 {
		margin-top: 20rpx;
		margin-left: 28rpx;
		padding: 0 40rpx;
		width: 692rpx;
		height: 334rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		.sf-tit1 {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-top: 14rpx;
			padding-bottom: 10rpx;
			border-bottom: 2rpx solid #E6E6E6;
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
		
	
		.tit11 {
			padding-top: 16rpx;
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
	
			.txt11 {
				font-size: 32rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 42rpx;
				color: #000000;
			}
	
			.pic11 {
				width: 116rpx;
				height: 116rpx;
			}
		}
	
		.tit22 {
			margin-top: 14rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
	
			.txt11 {
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 32rpx;
				color: #999999;
			}
	
			.txt22 {
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 32rpx;
				color: #000000;
			}
		}
	
		.tit33 {
			margin-top: 22rpx;
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
	
			.txt11 {
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 32rpx;
				color: #999999;
			}
	
			.txt22 {
				text-align: right;
				width: 340rpx;
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 32rpx;
				color: #000000;
			}
		}
	}
	
	.box1-2 {
		width: 692rpx;
		height: 340rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		margin: 20rpx 28rpx 0 28rpx;
		padding: 0 40rpx;
	
		.tit11 {
			padding-top: 16rpx;
			font-size: 32rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 42rpx;
			color: #000000;
		}
	
		.tit22 {
			display: flex;
			align-items: center;
	
			.tit22-1 {
				margin-top: 20rpx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
	
				.txt1 {
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #999999
				}
	
				.txt2 {
					display: flex;
					align-items: center;
	
					.txt2-1 {
						font-size: 24rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 32rpx;
						color: #000000;
					}
	
					.shu {
						height: 16rpx;
						border: 2rpx solid #E6E6E6;
						margin: 0 10rpx 0 20rpx;
					}
	
					.txt2-2 {
						font-size: 24rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 32rpx;
						color: #4988FD;
					}
				}
			}
		}
	
		.tit33 {
			margin-top: 10rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
	
			.txt1 {
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 32rpx;
				color: #999999;
			}
	
			.txt2 {
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 32rpx;
				color: #000000;
			}
		}
	
		.tit44 {
			margin-top: 10rpx;
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
	
			.tit1 {
				margin-top: 0;
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 32rpx;
				color: #999999;
			}
	
			.tit2 {
				margin-top: 0;
				display: flex;
				flex-direction: column;
				align-items: flex-end;
	
				.txt1 {
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #000000;
				}
			}
		}
	}
		
</style>
