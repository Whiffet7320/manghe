<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="nav1">PICC承保，人生财产，双重保障，下单无忧</view>
		<view @click="toShouhuodizhi" class="nav2">
			<view class="tit3">
				<view v-if="address.is_default" class="txt3-1">默认</view>
				<view v-else class="txt3-1 mor"></view>
				<view class="txt3-2">{{address.address}}</view>
			</view>
			<view class="tit1">
				<view class="tit1-1">
					<image class="pic1" src="/static/img/zu1.png" mode=""></image>
					<view class="txt1">{{address.sub_address}} {{address.detail_address}}</view>
				</view>
				<u-icon name="arrow-right" color="#707070" size="28"></u-icon>
			</view>
			<view class="tit2">{{address.name}} {{address.phone}}</view>
		</view>
		<view class="nav3">
			<view class="tit3-1">
				<image class="pic1" src="/static/img/zu351.png" mode=""></image>
				<view class="txt1">期待上门时间</view>
			</view>
			<view class="tit3-2">
				<view v-if="startTime == ''" @click="changTime" class="txt1">请选择</view>
				<view v-else @click="changTime" class="txt1">{{showTimeVal}}</view>
			</view>
		</view>
		<view class="nav4">
			<view class="tit1">
				<view class="txt1">{{option.bgName}}</view>
				<image class="pic1" :src="option.bgImg" mode=""></image>
			</view>
			<!-- <view class="tit2">
				<view class="txt1">物品类型（必填）</view>
				<view class="txt2">皮沙发1个</view>
			</view> -->
			<view class="tit3 tit2">
				<view class="txt1">需求说明</view>
				<view v-if="option.intro == ''" class="txt2">请填写尺寸、体积、重量等信息</view>
				<view v-else class="txt2">{{option.intro}}</view>
			</view>
		</view>
		<view class="nav5">
			<u-checkbox-group active-color='#24BC29' size=28 @change="radioGroupChange">
				<u-checkbox label-size=20 name="rad1" v-model="myRad">
					我已阅读并同意 <text class="blue">《万师傅服务协议》《隐私政策》</text>
				</u-checkbox>
			</u-checkbox-group>
		</view>
		<view @click="toBaojia" class="nav6">发布需求</view>
		<!-- <u-picker @confirm='onTime' :params="timeParams" v-model="timeShow" mode="time"></u-picker> -->
		<u-picker @confirm='confirmTime' mode="multiSelector" v-model="timeShow" :default-selector='[0, 1]'
			:range="multiSelector"></u-picker>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["nowAddress"]),
		},
		data() {
			return {
				option: null,
				address: {},
				timeShow: false,
				timeParams: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
				},
				myRad: '',
				multiSelector: [
					[],
					[]
				],
				day1: '',
				day2: '',
				day3: '',
				serviceStartTime: '',
				serviceEndTime: '',
				serviceTimeInterval: '',
				startTime: '',
				endTime: '',
				showTimeVal: "",
			}
		},
		onShow() {
			console.log(this.nowAddress)
			this.getData()
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
		},
		onLoad(option) {
			console.log(option)
			option.images = JSON.parse(option.images);
			if (option.images[option.images.length - 1] == '') {
				option.images.pop();
			}
			this.option = option;
			console.log(this.option)
		},
		methods: {
			async getData() {
				if (this.nowAddress) {
					this.address = this.nowAddress
				} else {
					const res = await this.$api.address();
					console.log(res)
					this.address = res.data.filter(ele => {
						return ele.is_default;
					})[0]
				}
				const res2 = await this.$api.config();
				console.log(res2)
				res2.data.forEach(ele => {
					if (ele.key == "serviceStartTime") {
						this.serviceStartTime = Number(ele.value);
					} else if (ele.key == "serviceEndTime") {
						this.serviceEndTime = Number(ele.value);
					} else if (ele.key == "serviceTimeInterval") {
						this.serviceTimeInterval = Number(ele.value);
					}
				})
				for (let i = this.serviceStartTime; i < this.serviceEndTime; i = i + 2) {
					console.log(`${i}:00-${i+2}:00`)
					this.multiSelector[1].push(`${i}:00-${i+2}:00`)
				}
				console.log(this.address)
			},
			confirmTime(e) {
				this.startTime =
					`${this.multiSelector[0][e[0]].substring(0, this.multiSelector[0][e[0]].length - 4)} ${this.multiSelector[1][e[1]].substring(0,5)}:00`;
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
			async toBaojia() {
				if (this.showTimeVal == '') {
					this.$refs.uToast.show({
						title: '请选择上门时间',
						type: 'warning',
					})
				} else {
					const myObj = {
						...this.option
					}
					delete myObj.bgImg;
					delete myObj.bgName;
					const res = await this.$api.demandQuotes({
						...myObj,
						expect_start_date: this.startTime,
						expect_end_date: this.endTime,
						address: this.address
					})
					console.log(res)
					if (res.code == 200) {
						this.$refs.uToast.show({
							title: '发布成功',
							type: 'success',
							url:'/pages/dingdan/dingdan',
							isTab:true,
						})
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'warning',
						})
					}
				}
			},
			radioGroupChange() {
				console.log(this.myRad)
			},
			changTime() {
				this.timeShow = true;
			},
			onTime(val) {
				console.log(val)
				this.time = `${val.year}-${val.month}-${val.day}-${val.hour}-${val.minute}`
			},
			toShouhuodizhi() {
				uni.navigateTo({
					url: '/pages/wode/shouhuodizhi/shouhuodizhi?page=fabuxuqiu'
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F0F0F0;
	}
</style>
<style scoped lang="scss">
	.index {}

	.nav1 {
		padding: 0 42rpx;
		width: 750rpx;
		height: 36rpx;
		background: #FFF3EB;
		font-size: 24rpx;
		font-family: Segoe UI;
		font-weight: 400;
		line-height: 36rpx;
		color: #FF8B8B;
	}

	.nav2 {
		height: 154rpx;
		background: #FFFFFF;
		padding: 20rpx 20rpx 0rpx 20rpx;
		border-bottom: 2rpx solid #E6E6E6;

		.tit3 {
			display: flex;
			align-items: center;
			margin-bottom: 10rpx;

			.txt3-1 {
				width: 60rpx;
				height: 28rpx;
				background: #4988FD;
				border-radius: 14rpx;
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 28rpx;
				text-align: center;
				color: #FFFFFF;
			}

			.txt3-1.mor {
				width: 60rpx;
				height: 28rpx;
				background: #ffffff;
			}

			.txt3-2 {
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 28rpx;
				color: #707070;
				margin-left: 26rpx;
			}
		}

		.tit1 {
			height: 34rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.tit1-1 {
				display: flex;
				align-items: center;
				margin-left: 28rpx;

				.pic1 {
					transform: translateX(-10rpx);
					width: 26rpx;
					height: 34rpx;
					margin-right: 32rpx;
				}

				.txt1 {
					font-size: 32rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 42rpx;
					color: #000000;
				}
			}

		}

		.tit2 {
			margin-top: 12rpx;
			margin-left: 86rpx;
			font-size: 24rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 32rpx;
			color: #999999;
		}

	}

	.nav3 {
		padding: 0 20rpx 0 48rpx;
		height: 126rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.tit3-1 {
			display: flex;
			align-items: center;

			.pic1 {
				width: 30rpx;
				height: 30rpx;
			}

			.txt1 {
				margin-left: 28rpx;
				font-size: 32rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 42rpx;
				color: #000000;
			}
		}

		.tit3-2 {
			margin-right: 10rpx;

			.txt1 {
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 32rpx;
				color: #707070;
			}
		}

	}

	.nav4 {
		margin-top: 20rpx;
		width: 750rpx;
		height: 280rpx;
		background: #FFFFFF;
		opacity: 1;
		padding: 0 26rpx 0 38rpx;

		.tit1 {
			padding-top: 6rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.txt1 {
				font-size: 32rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 42rpx;
				color: #000000;
			}

			.pic1 {
				width: 112rpx;
				height: 112rpx;
			}
		}

		.tit2 {
			margin-top: 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.txt1 {
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 32rpx;
				color: #999999;
			}

			.txt2 {
				width: 400rpx;
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 32rpx;
				color: #000000;
				text-align: right;
			}
		}

		.tit3 {
			margin-top: 22rpx;
		}
	}

	.nav5 {
		margin-top: 384rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20rpx;
		font-family: Segoe UI;
		font-weight: 400;
		line-height: 28rpx;
		color: #A1A1A1;

		.blue {
			color: #4988FD;
		}
	}

	.nav6 {
		margin-top: 44rpx;
		margin-left: 54rpx;
		width: 642rpx;
		height: 96rpx;
		background: #1677FF;
		border-radius: 48rpx;
		font-size: 48rpx;
		font-family: SimHei;
		font-weight: 400;
		line-height: 96rpx;
		text-align: center;
		color: #FFFFFF;
	}
</style>
