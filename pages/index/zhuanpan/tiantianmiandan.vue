<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view :class="{'nav1':true}">
			<!-- 未完成 -->
			<!-- 免单 -->
			<template v-if="obj.type == 3 && obj.status == 0">
				<view class="txt1">
					距离{{obj.count_money}}元<text class="yellow">{{obj.shopname}}</text>免单仅差
				</view>
				<view class="txt2">
					<text class="yellow2">{{obj.money}}</text>元
				</view>
				<view class="tit3">
					<image src="/static/img/zu2555.png" class="tit3-pic" mode=""></image>
				</view>
			</template>
			<!-- 现金 -->
			<template v-if="obj.type == 2 && obj.status == 0">
				<view class="txt1">
					距离提现<text class="yellow">{{obj.count_money}}</text>元现金仅差
				</view>
				<view class="txt2">
					<text class="yellow2">{{obj.money}}</text>元
				</view>
				<view class="tit3">
					<image src="/static/img/zu2555.png" class="tit3-pic" mode=""></image>
				</view>
			</template>
			<!-- 已完成 -->
			<template v-if="obj.status == 1 || obj.status == 2">
				<!-- 免单 -->
				<view class="flex" v-if="obj.type == 3">
					<view>
						<view class="txt1-y txt1">
							恭喜您
						</view>
						<view class="txt2-y txt2">
							已获得{{obj.count_money}}元<text class="yellow2">{{obj.shopname}}</text>
						</view>
					</view>
					<view class="btn-y">
						<view class="child" v-if="obj.status == 1" @click="pop2show=true">填写地址</view>
						<view class="child" v-else>已填写地址</view>
					</view>
				</view>

				<!-- 现金 -->
				<view class="flex" v-if="obj.type == 2">
					<view>
						<view class="txt1-y txt1">
							恭喜您
						</view>
						<view class="txt2-y txt2">
							已获得<text class="yellow2">{{obj.count_money}}</text>元现金
						</view>
					</view>
					<view class="btn-y">
						<view class="child">已存入钱包</view>
					</view>
				</view>
				<view class="tit3">
					<image src="/static/img/zu2556.png" class="tit3-pic" mode=""></image>
				</view>
			</template>
			<!-- 九宫格 -->
			<view class="tit4">
				<LuckyGrid v-if="luckyFlag" ref="LuckDraw" width="536rpx" height="536rpx" :prizes="prizes"
					:buttons="buttons" :blocks="blocks" :default-config="defaultConfig" :default-style="defaultStyle"
					:active-style="activeStyle" @start="startCallBack" @end="endCallBack" />
			</view>

		</view>
		<button open-type="share" class="btn">
			<view class="btn-child">
				<view class="btn-txt1">邀请好友增加抽奖次数</view>
				<view class="btn-txt2">{{nowDJSTime}}后过期</view>
			</view>
		</button>
		<view class="footer">
			<view class="foot-txt1" @click="seeChoujiangjilu">抽奖记录</view>
			<view class="shu"></view>
			<view class="foot-txt1" @click="seeYaoqingjilu">邀请记录</view>
		</view>
		<!-- 抽中现金 -->
		<u-popup v-model="pop1show" mode='center' border-radius='22' width='522rpx' height='470rpx'>
			<view class="pop1">
				<view class="pop1-txt1">{{obj.type == 3? '距离免单又近了一步！' : '距离提现又近了一步！'}}</view>
				<image src="/static/img/qianqian.png" class="pop1-pic" mode=""></image>
				<view class="pop1-txt2">+{{czPrice}}</view>
				<view class="pop1-btn" @click="pop1show = false">
					<view class="child">继续加速提现</view>
				</view>
			</view>
		</u-popup>

		<!-- 填写地址 -->
		<u-popup closeable v-model="pop2show" mode='center' border-radius='22' width='654rpx' height='538rpx'>
			<view class="pop2">
				<view class="pop2-txt1">填写收货信息</view>
				<u-field :clearable='false' v-model="addressForm.sj_name" label="姓名" placeholder="请填写姓名">
				</u-field>
				<u-field :clearable='false' v-model="addressForm.sj_phone" label="手机号码" placeholder="请填写手机号码">
				</u-field>
				<u-field :clearable='false' v-model="addressForm.address" label="收货地区" placeholder="请填写收货地区">
				</u-field>
				<u-field :clearable='false' v-model="addressForm.xiangxi" label="详细地址" placeholder="请填写详细地址">
				</u-field>
				<view class="pop2-btns">
					<view class="btn1">取消</view>
					<view @click="bcAddress" class="btn2">确认填写</view>
				</view>
			</view>
		</u-popup>
		<!-- 抽奖记录 -->
		<u-popup closeable v-model="pop3show" mode='center' border-radius='22' width='654rpx'>
			<view class="pop3">
				<view class="pop3-txt1">抽奖记录</view>
				<view class="flex">
					<view class="left">
						<view class="txt1">获得内容</view>
						<view class="txt2" v-for="(item,i) in cjList" :key='i'>{{item.money}}元</view>
					</view>
					<view class="right">
						<view class="txt1">抽奖时间</view>
						<view class="txt2" v-for="(item,i) in cjList" :key='i'>{{item.ctime}}</view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 邀请记录 -->
		<u-popup closeable v-model="pop4show" mode='center' border-radius='22' width='654rpx'>
			<view class="pop3">
				<view class="pop3-txt1">邀请记录</view>
				<view class="flex">
					<view class="left">
						<view class="txt1">邀请好友</view>
						<view class="txt2" v-for="item in yqList">{{item.phone}}</view>
					</view>
					<view class="right">
						<view class="txt1">邀请时间</view>
						<view class="txt2" v-for="item in yqList">{{item.ctime}}</view>
					</view>
				</view>

			</view>
		</u-popup>
		<!-- 抽奖次数为零 -->
		<u-modal v-model="mod1show" :content="mod1content"></u-modal>
	</view>
</template>

<script>
	import LuckyGrid from 'uni-luck-draw/lucky-grid' // 九宫格
	export default {
		components: {
			LuckyGrid,
		},
		watch: {
			luckyNum: function() {
				console.log(this.luckyNum, 123165)
			},
			pop1show: function() {
				this.pop1show == true ? this.luckyFlag = false : this.luckyFlag = true;
			},
			pop2show: function() {
				this.pop2show == true ? this.luckyFlag = false : this.luckyFlag = true;
			},
			pop3show: function() {
				this.pop3show == true ? this.luckyFlag = false : this.luckyFlag = true;
			},
			pop4show: function() {
				this.pop4show == true ? this.luckyFlag = false : this.luckyFlag = true;
				console.log(this.pop4show, 1111)
			},
			mod1show: function() {
				this.mod1show == true ? this.luckyFlag = false : this.luckyFlag = true;
			}
		},
		onLoad(options) {
			console.log(options)
			this.lid = options.lid;
		},
		onShow() {
			this.getData();
		},
		data() {
			return {
				resultIndex: "",
				endTime: '',
				obj: {},
				lid: '',
				luckyFlag: true,
				mod1content: '',
				mod1show: false,
				czPrice: '',
				nowDJSTime: '',
				addressForm: {
					sj_name: '',
					sj_phone: '',
					address: '',
					xiangxi: '',
				},
				pop1show: false,
				pop2show: false,
				pop3show: false,
				pop4show: false,
				// 转盘
				luckyNum: 0,
				prizes: [],
				blocks: [{
					padding: '16rpx',
					background: '#fff194',
					borderRadius: 20
				}, ],
				defaultConfig: {
					gutter: 5,
				},
				defaultStyle: {
					borderRadius: 15,
					fontColor: '#DF424B',
					fontSize: '14px',
					textAlign: 'center',
					background: '#fff',
				},
				activeStyle: {
					background: 'linear-gradient(270deg, #FFDCB8, #FDC689)',
					shadow: ''
				},
				// 
				yqList: [],
				cjList: [],
			}
		},
		computed: {
			buttons() {
				return [{
					x: 1,
					y: 1,
					background: 'background: linear-gradient(180deg,#ff5151, #f50707);',
					fonts: [{
						text: `抽奖`,
						fontColor: '#fff',
						top: '40rpx',
						fontSize: '36rpx'
					}, {
						text: `剩余${this.luckyNum}次`,
						fontColor: '#fff',
						top: '96rpx',
						fontSize: '24rpx'
					}, ],
				}]
			}
		},
		mounted() {
			this.getPrizeList()
			var s = setInterval(() => {
				var dates = this.countTime(this.endTime, "go");
				if (dates <= 0) {
					clearInterval(s)
				}
			}, 1000)
		},
		// 用户点击右上角分享转发
		onShareAppMessage: async function() {
			var title = '帮我助力吧！'; //data，return 数据title
			return {
				title: title || '',
				path: `/pages/index/zhuanpan/zhuanpan?scene=${this.lid}_0`,
			}
		},
		//用户点击右上角分享朋友圈
		onShareTimeline: async function() {
			var title = '帮我助力吧！'; //data，return 数据title
			return {
				title: title || '',
				path: `/pages/index/zhuanpan/zhuanpan?scene=${this.lid}_0`,
			}
		},
		methods: {
			async getData() {
				const res = await this.$api.choujiangTreeTurntable({
					lid: this.lid,
				})
				console.log(res)
				this.luckyNum = res.data.cishu;
				this.obj = res.data;
				this.endTime = this.obj.end_time;
			},
			async getList() {
				const res = await this.$api.choujiangInvite_log({
					lid: this.lid,
				})
				console.log(res);
				if (res.code == 200) {
					this.yqList = res.data;
					this.pop4show = true;
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
			async getList2() {
				const res = await this.$api.choujiangPrize_log({
					lid: this.lid,
				})
				console.log(res);
				if (res.code == 200) {
					this.cjList = res.data;
					this.pop3show = true;
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
			async bcAddress() {
				const res = await this.$api.choujiangAddress({
					...this.addressForm,
					lid: this.lid
				})
				console.log(res)
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success',
						callback: () => {
							this.getData()
							this.pop2show = false;
						}
					})
				}
			},
			getPrizeList() {
				// 模拟接口请求奖品列表
				setTimeout(() => {
					const data = [{
							name: '0.2元',
							img: require('@/static/img/qianqian.png')
						},
						{
							name: '0.01元',
							img: require('@/static/img/qianqian.png')
						},
						{
							name: '0.1元',
							img: require('@/static/img/qianqian.png')
						},
						{
							name: '0.01元',
							img: require('@/static/img/qianqian.png')
						},
						{
							name: '0.1元',
							img: require('@/static/img/qianqian.png')
						},
						{
							name: '0.01元',
							img: require('@/static/img/qianqian.png')
						},
						{
							name: '0.1元',
							img: require('@/static/img/qianqian.png')
						},
						{
							name: '0.01元',
							img: require('@/static/img/qianqian.png')
						}
					]
					const prizes = []
					let axis = [
						[0, 0],
						[1, 0],
						[2, 0],
						[2, 1],
						[2, 2],
						[1, 2],
						[0, 2],
						[0, 1]
					]
					for (let i = 0; i < 8; i++) {
						let item = data[i]
						prizes.push({
							index: i,
							x: axis[i][0],
							y: axis[i][1],
							fonts: [{
								text: item.name,
								top: '102rpx',
								fontSize: '28rpx',
								fontWeight: '700',
								fontColor: '#FF983E'
							}],
							imgs: [{
								src: item.img,
								width: '76rpx',
								height: '76rpx',
								top: '26rpx',
							}]
						})
					}
					this.prizes = prizes
				}, 0)
			},
			async startCallBack() {
				const res = await this.$api.choujiangDaYeLaiWan({
					lid: this.lid,
				})
				console.log(res)
				if (res.code == 200) {
					this.$refs.LuckDraw.play();
					setTimeout(() => {
						this.prizes.forEach((ele, i) => {
							console.log(res.data.money.toString(), ele.fonts[0].text)
							if (ele.fonts[0].text.indexOf(res.data.money.toString()) > -1) {
								console.log(i)
								this.resultIndex = i;
							}
						})
						this.$refs.LuckDraw.stop(this.resultIndex)
					}, 2000)
				} else {
					this.mod1content = res.msg;
					this.mod1show = true;
				}
				if (!this.luckyNum) {
					this.mod1show = true;
					return;
				}
			},
			endCallBack(prize) {
				this.pop1show = true;
				this.czPrice = prize.fonts[0].text
				this.getData()
			},
			// 
			seeChoujiangjilu() {
				this.getList2();
			},
			seeYaoqingjilu() {
				this.getList();
			},
			countTime(time, id) {
				var date = new Date();
				var now = date.getTime();
				// var endDate = new Date(time); //设置截止时间
				// var end = endDate.getTime();
				var end = time * 1000;
				var leftTime = end - now; //时间差                              
				var d, h, m, s, ms;
				if (leftTime >= 0) {
					d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
					h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
					m = Math.floor(leftTime / 1000 / 60 % 60);
					s = Math.floor(leftTime / 1000 % 60);
					ms = Math.floor(leftTime % 1000);
					if (ms < 100) {
						ms = "0" + ms;
					}
					if (s < 10) {
						s = "0" + s;
					}
					if (m < 10) {
						m = "0" + m;
					}
					if (h < 10) {
						h = "0" + h;
					}
					//将倒计时赋值到div中
					console.log(d + "天" + h + "时" + m + "分" + s + "秒" + ms + "毫秒")
					this.nowDJSTime = h + ":" + m + ":" + s + "秒"
				} else {
					console.log('已截止')
				}
				//递归每秒调用countTime方法，显示动态时间效果
				return leftTime
			}
		}
	}
</script>

<style>
	page {
		width: 750rpx;
		background: #ffeedf;
		background-image: url(https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1634524629085.png);
		background-size: 100% 100%;
	}
</style>
<style lang="scss" scoped>
	.index {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.nav1 {
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		margin-top: 36rpx;
		// margin-left: 40rpx;
		width: 670rpx;
		height: calc(338rpx + 36rpx + 700rpx);
		background-image: url(https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1634524670196.png);
		background-size: 100% 100%;

		.txt1 {
			padding-top: 44rpx;
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #ffffff;
			line-height: 44rpx;

			.yellow {
				color: #FFF194;
			}
		}

		.flex {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.btn-y {
				transform: translateY(20rpx);
				margin-right: 48rpx;
				width: 194rpx;
				height: 80rpx;
				background: linear-gradient(0deg, #ffb34b, #fbf8c5);
				border-radius: 40rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				.child {
					width: 170rpx;
					height: 64rpx;
					background: linear-gradient(180deg, #ffb34b, #fbf8c5);
					border-radius: 32rpx;
					font-size: 24rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					text-align: center;
					color: #e51a1a;
					line-height: 64rpx;
				}
			}
		}

		.txt1-y {
			text-align: left;
			margin-left: 52rpx;
		}

		.txt2-y {
			text-align: left;
			margin-left: 52rpx;
			font-size: 32rpx !important;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: left;
			color: #ffffff;
			line-height: 44rpx;
		}

		.txt2 {
			margin-top: 10rpx;
			font-size: 54rpx;
			font-family: PingFang SC, PingFang SC-Heavy;
			font-weight: 800;
			text-align: center;
			color: #ffffff;
			line-height: 44rpx;

			.yellow2 {
				color: #FFED77;
			}
		}

		.tit3 {
			margin-top: 28rpx;
			margin-left: 66rpx;
			width: 538rpx;
			height: 86rpx;
			background: #f84a4a;
			border-radius: 44rpx;
			box-shadow: 0rpx 20rpx 30rpx 0rpx rgba(213, 9, 0, 0.10);

			.tit3-pic {
				margin-left: 48rpx;
				width: 440rpx;
				height: 80rpx;
			}
		}

		.tit4 {
			margin-top: 184rpx;
			margin-left: 70rpx;
		}

	}

	.btn {
		// margin-top: 50rpx;

		background-color: transparent;
		outline: none;
		margin-top: -20rpx;
		// margin-left: 160rpx;
		width: 428rpx;
		height: 106rpx;
		background: #ffdcdc;
		border: 4rpx solid #ffffff;
		border-radius: 58rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.btn-child {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			width: 404rpx;
			height: 82rpx;
			background: linear-gradient(180deg, #ff7474, #f51111);
			border-radius: 42rpx;

			.btn-txt1 {
				transform: translateY(10rpx);
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #ffffff;
			}

			.btn-txt2 {
				transform: translateY(-16rpx);
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: center;
				color: #ffffff;
			}

		}
	}

	.footer {
		display: flex;
		align-items: center;
		margin-top: 30rpx;

		.foot-txt1 {
			font-size: 24rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			color: #8f0000;
			line-height: 44rpx;
		}

		.shu {
			margin: 0 20rpx;
			width: 2rpx;
			height: 22rpx;
			border: 1rpx solid #8f0000;
		}
	}

	.pop1 {
		width: 522rpx;
		height: 470rpx;
		background: linear-gradient(180deg, #ff4b4b, #f23636);
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.pop1-txt1 {
			padding-top: 48rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #ffed77;
			line-height: 44rpx;
		}

		.pop1-pic {
			margin-top: 58rpx;
			width: 76rpx;
			height: 76rpx;
		}

		.pop1-txt2 {
			margin-top: 8rpx;
			font-size: 48rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #fff5b5;
			line-height: 44rpx;
		}

		.pop1-btn {
			margin-top: 54rpx;
			width: 250rpx;
			height: 80rpx;
			background: linear-gradient(0deg, #ffb34b, #fbf8c5);
			border-radius: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.child {
				width: 226rpx;
				height: 64rpx;
				background: linear-gradient(180deg, #ffb34b, #fbf8c5);
				border-radius: 32rpx;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #e51a1a;
				line-height: 64rpx;
			}
		}
	}

	.pop2 {
		width: 654rpx;
		height: 538rpx;
		background: #ffffff;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.pop2-txt1 {
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #333333;
			line-height: 44rpx;
			margin-top: 40rpx;
			margin-bottom: 20rpx;
		}

		/deep/ .u-field__input-wrap {
			font-size: 24rpx;
		}

		/deep/ .u-field {
			border: none;
			padding: 14rpx 28rpx;
			width: 80% !important;
			font-size: 24rpx;

			.uni-input-placeholder {
				font-size: 24rpx;
			}
		}

		.pop2-btns {
			margin-top: 20rpx;
			display: flex;
			align-items: center;

			.btn1 {
				width: 172rpx;
				height: 62rpx;
				background: #ffffff;
				border: 1rpx solid #999999;
				border-radius: 33rpx;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: center;
				color: #707070;
				line-height: 62rpx;
			}

			.btn2 {
				width: 172rpx;
				height: 62rpx;
				background: linear-gradient(180deg, #ff7474, #f51111);
				border: 2rpx solid #f62020;
				border-radius: 34rpx;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: center;
				color: #ffffff;
				line-height: 62rpx;
				margin-left: 20rpx;
			}
		}
	}

	.pop3 {
		width: 654rpx;
		background: #ffffff;
		border-radius: 20rpx;
		padding: 0 44rpx;

		.pop3-txt1 {
			margin-top: 30rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #333333;
			line-height: 44rpx;
		}

		.flex {
			margin-top: 36rpx;
			display: flex;
			align-items: center;
			padding-bottom: 30rpx;
		}

		.left {
			width: 200rpx;

			.txt1 {
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #999999;
				margin-bottom: 20rpx;
			}

			.txt2 {
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #333333;
				margin-bottom: 20rpx;
			}
		}

		.right {
			width: 300rpx;

			.txt1 {
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #999999;
				margin-bottom: 20rpx;
			}

			.txt2 {
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #333333;
				margin-bottom: 20rpx;
			}
		}
	}
</style>
