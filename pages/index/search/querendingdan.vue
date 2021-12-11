<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="nav1">
			<image class="pic" v-if="obj" :src="obj.doctor_img" mode=""></image>
			<view class="right">
				<view class="txt1">主治医生：{{obj.doctor_name}}</view>
				<view class="bottom">
					<view class="txt2">已选择：{{obj.store_name}}</view>
					<view class="txt3">预付款：¥{{obj.yuprice}}</view>
				</view>
			</view>
		</view>
		<view class="nav2">
			<view class="item">
				<view class="txt1">手术医生</view>
				<view class="txt1">{{obj.doctor_name}}</view>
			</view>
			<view class="item">
				<view class="txt1">预约时间</view>
				<view class="i-right" @click="changTime">
					<view class="txt2">{{startTime != '' ? startTime : '选择时间'}}</view>
					<u-icon name="arrow-right" color="#707070" size="24"></u-icon>
				</view>
			</view>
			<view class="item">
				<view class="txt1">备注</view>
				<u-input v-model="beizhu" placeholder='选填' :clearable='false' input-align='right' type="text" />
			</view>
		</view>
		<view class="nav3">
			<view class="title">
				<view class="shu"></view>
				<view class="t-txt">如何支付尾款：</view>
			</view>
			<view class="txt1">1、在线支付预付款后，面诊之后在【我的订单】-【未消费订单】里面申请支付尾款</view>
			<view class="txt2">2、审核通过后，到院消费，验证订单后可以使用。</view>
		</view>
		<view class="nav3 nav4">
			<view class="title">
				<view class="shu"></view>
				<view class="t-txt">购买须知：</view>
			</view>
			<view class="txt1">1、成功支付预约金后，在线咨询客服及时预约面诊时间</view>
			<view class="txt2">2、该预约金到店面诊后一概不予退还，可根据个人意愿改为其他项目</view>
			<view class="txt2">2、该预约金到店面诊后一概不予退还，可根据个人意愿改为其他项目</view>
			<view class="txt2">3、面诊后需在我的-待付尾款中支付余下的尾款</view>
			<view class="txt2">4、若您还有其他疑问，可在线咨询客服或电话咨询********** 感谢您信赖XXXXX，祝您变美旅途愉快！</view>
		</view>
		<view class="footer1">
			<!-- <image src="/static/image/zu1840.png" class="kefu" mode=""></image> -->
			<view class="txt1">预付款 ¥{{obj.yuprice}}</view>
			<view class="txt2">尾款 ¥{{obj.weiPrice}}面诊后支付</view>
		</view>
		<view class="footer2">
			<view class="item">
				<image src="/static/tabBar/sy-active.png" class="pic" mode=""></image>
				<view class="txt">首页</view>
			</view>
			<view class="item item2">
				<image src="/static/image/lujin2228.png" class="pic2" mode=""></image>
				<view class="txt">收藏</view>
			</view>
			<view @click="toShouyintai" class="btn">立即购买</view>
		</view>
		<!-- 选择时间 -->
		<u-picker @confirm='confirmTime' mode="multiSelector" v-model="timeShow" :default-selector='[0, 1]'
			:range="multiSelector"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj: {},
				beizhu: '',
				timeShow: false,
				multiSelector: [
					[],
					[]
				],
				startTime: '',
				endTime: '',
			}
		},
		onLoad(option) {
			if (option.obj) {
				this.obj = JSON.parse(decodeURIComponent(option.obj));
				console.log(this.obj)
			}
		},
		onShow() {
			this.multiSelector = [
				[],
				[]
			]
			this.day1 = this.getDay(0);
			this.day2 = this.getDay(1);
			this.day3 = this.getDay(2);
			this.multiSelector[0].push(`${this.getDay(0)}(今天)`)
			this.multiSelector[0].push(`${this.getDay(1)}(明天)`)
			this.multiSelector[0].push(`${this.getDay(2)}(后天)`)
			this.multiSelector[1].push(`上午`)
			this.multiSelector[1].push(`下午`)
			this.multiSelector[1].push(`晚上`)
		},
		methods: {
			async toShouyintai() {
				const res = await this.$api.orderCreate({
					addressId: 0,
					couponId: '',
					payType: 'weixin',
					useIntegral: 0,
					from: 'routine',
					appointment_time: this.startTime,
					mark: this.beizhu,
					shipping_type:0
				},this.obj.orderKey)
				console.log(res)
				if (res.status == 200) {
					var obj = {
						doctor_name:this.obj.doctor_name,
						time:this.startTime,
						yuPrice:this.obj.yuprice,
						...res.data.result,
					}
					uni.navigateTo({
						url: `/pages/index/search/shouyintai?obj=${encodeURIComponent(JSON.stringify(obj))}`
					})
				}else{
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}


			},
			changTime() {
				this.timeShow = true;
			},
			confirmTime(e) {
				this.startTime =
					`${this.multiSelector[0][e[0]].substring(0, this.multiSelector[0][e[0]].length - 4)} ${this.multiSelector[1][e[1]].substring(0,5)}`;
				this.endTime =
					`${this.multiSelector[0][e[0]].substring(0, this.multiSelector[0][e[0]].length - 4)} ${this.multiSelector[1][e[1]].substring(6,this.multiSelector[1][e[1]].length)}:00`;
				this.showTimeVal = `${this.multiSelector[0][e[0]]} ${this.multiSelector[1][e[1]]}`
				console.log(this.startTime, this.endTime);
			},
			getDay(day) {
				var today = new Date();
				var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
				today.setTime(targetday_milliseconds); //注意，这行是关键代码
				var tYear = today.getFullYear();
				var tMonth = today.getMonth();
				var tDate = today.getDate();
				tMonth = this.doHandleMonth(tMonth + 1);
				tDate = this.doHandleMonth(tDate);
				return tYear + "-" + tMonth + "-" + tDate;
			},
			doHandleMonth(month) {
				var m = month;
				if (month.toString().length == 1) {
					m = "0" + month;
				}
				return m;
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
	.index {}

	.nav1 {
		background: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 28rpx 34rpx;

		.pic {
			height: 164rpx;
			width: 164rpx;
		}

		.right {
			height: 164rpx;
			margin-left: 24rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.txt1 {
				font-size: 28rpx;
				font-weight: 500;
				color: #BD9E81;
			}

			.bottom {
				.txt2 {
					font-size: 28rpx;
					font-weight: 400;
					color: #707070;
				}

				.txt3 {
					font-size: 28rpx;
					font-weight: 400;
					color: #707070;
					margin-top: 8rpx;
				}
			}
		}
	}

	.nav2 {
		background: #FFFFFF;

		.item {
			/deep/ .u-input {
				width: 480rpx;
			}

			height: 94rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 34rpx;

			.txt1 {
				font-size: 28rpx;
				font-weight: 400;
				line-height: 94rpx;
				color: #707070;
			}

			.i-right {
				display: flex;
				align-items: center;

				.txt2 {
					font-size: 28rpx;
					font-weight: 400;
					line-height: 94rpx;
					color: #707070;
					margin-right: 24rpx;
				}
			}
		}
	}

	.nav3 {
		margin-top: 20rpx;
		width: 750rpx;
		background: #FFFFFF;
		padding: 28rpx 34rpx;

		.title {
			display: flex;
			align-items: center;

			.shu {
				// margin-left: 24rpx;
				margin-right: 20rpx;
				width: 6rpx;
				height: 28rpx;
				background: #BD9E81;
			}

			.t-txt {
				font-size: 28rpx;
				font-weight: bold;
				color: #BD9E81;
			}
		}

		.txt1 {
			margin-top: 18rpx;
			font-size: 28rpx;
			font-weight: 400;
			line-height: 40rpx;
			color: #707070;
		}

		.txt2 {
			font-size: 28rpx;
			font-weight: 400;
			line-height: 40rpx;
			color: #707070;
		}
	}

	.nav4.nav3 {
		margin-bottom: 240rpx;
	}

	.footer1 {
		position: fixed;
		bottom: 140rpx;
		width: 100%;
		height: 88rpx;
		background: #F2ECE6;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.kefu {
			position: absolute;
			bottom: 14rpx;
			right: 8rpx;
			width: 172rpx;
			height: 172rpx;
		}

		.txt1 {
			font-size: 24rpx;
			font-family: PingFang SC;
			line-height: 34rpx;
			color: #BD9E81;
		}

		.txt2 {
			font-size: 24rpx;
			font-family: PingFang SC;
			line-height: 34rpx;
			color: #BD9E81;
		}
	}

	.footer2 {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 140rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 8rpx 28rpx rgba(166, 179, 194, 0.3);
		display: flex;
		padding: 0 50rpx;

		.item {
			margin-top: 12rpx;
			height: 80rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;

			.pic {
				width: 50rpx;
				height: 50rpx;
			}

			.txt {
				font-size: 24rpx;
				font-weight: 400;
				color: #707070;
			}

			.pic2 {
				margin-top: 4rpx;
				width: 40rpx;
				height: 40rpx;
			}
		}

		.item2 {
			margin-left: 76rpx;
		}

		.btn {
			border-radius: 40rpx;
			margin-left: 70rpx;
			margin-top: 12rpx;
			width: 406rpx;
			height: 80rpx;
			font-size: 28rpx;
			font-weight: bold;
			line-height: 80rpx;
			text-align: center;
			color: #FFFFFF;
			background: #BD9E81;
		}
	}
</style>
