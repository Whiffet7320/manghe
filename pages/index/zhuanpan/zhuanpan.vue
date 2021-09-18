<template>
	<view class="index">
		<u-modal v-model="modalShow" :content="modalContent"></u-modal>
		<view @click="toWodejiangping" class="btn1">我的奖品</view>
		<view class="zhuanpan">
			<image @click="startCallBack" class="pic" src="/static/img/zu20.png" mode=""></image>
			<view @click="startCallBack" class="txt1">抽奖</view>
			<view @click="startCallBack" class="txt2">还有{{timeNum}}次</view>
			<LuckyWheel ref="luckyWheel" width="600rpx" height="600rpx" :blocks="blocks" :prizes="prizes"
				:buttons="buttons" :defaultStyle="defaultStyle" @start="startCallBack" @end="endCallBack" />
		</view>
		<button open-type="share" class="btn2">邀请好友额外抽奖</button>
		<!-- <view @click="yaoqing" class="btn2">邀请好友额外抽奖</view> -->
		<view class="nav1">
			<view class="item" v-for="(item,i) in jiangpingList">
				<view class="txt1">{{i+1 == 1?'一':i+1==2?'二':i+1==3?'三':'四'}}等奖</view>
				<image class="pic1" :src="item.image" mode=""></image>
				<view class="txt2">{{item.name}}</view>
			</view>
		</view>
		<view class="nav2">
			<view class="txt1">活动细则</view>
			<view class="txt2">在本页面分享一次可额外获得一次抽奖</view>
			<view class="txt2">在未选择师傅之前，以及师傅服务完成之后，用户上门 地址和联系电话将做隐私保护，师傅无法查看</view>
		</view>
	</view>
</template>

<script>
	import LuckyWheel from 'uni-luck-draw/lucky-wheel'
	export default {
		components: {
			LuckyWheel
		},
		data() {
			return {
				modalShow: false,
				modalContent: '',
				resultIndex: '',
				timeNum: 0,
				jiangpingList: [],
				resultId: '',
				blocks: [{
						padding: '10rpx',
						background: '#F18E54'
					},
					{
						padding: '18rpx',
						background: '#C91919'
					}
				],
				prizes: [],
				buttons: [{
						radius: '4rpx',
						background: '#FFD792',
					},
					// { radius: '41rpx', background: '#f6c66f', pointer: true },
					{
						radius: '35rpx',
						background: '#D93822',
						fonts: [{
							text: '开始\n抽奖',
							fontSize: '18rpx',
							top: -18
						}]
					}
				],
				defaultStyle: {
					fontColor: '#d64737',
					fontSize: '14rpx'
				},
			}
		},
		onShow() {
			this.getData()
		},
		// 用户点击右上角分享转发
		onShareAppMessage: async function() {
			var title = '分销商城app'; //data，return 数据title
			return {
				title: title || '',
				path: `/pages/index/index?scene=0_${uni.getStorageSync('user_id')}`,
			}
		},
		//用户点击右上角分享朋友圈
		onShareTimeline:async function() {
			var title = '分销商城app'; //data，return 数据title
			return {
				title: title || '',
				path: `/pages/index/index?scene=0_${uni.getStorageSync('user_id')}`,
			}
		},
		methods: {
			async getData() {
				const res = await this.$api.turntableItems()
				console.log(res)
				this.jiangpingList = res.data.slice(0, 4)
				this.prizes = res.data;
				this.prizes.forEach((ele, i) => {
					ele.title = ele.name;
					ele.background = (i % 2 == 0) ? '#FFA836' : '#FFF7CF';
					ele.fonts = [{
						text: ele.name,
						top: '15%',
						fontSize: '26rpx'
					}];
					ele.imgs = [{
						src: ele.image,
						width: '100rpx',
						height: '100rpx',
						top: '70rpx',
					}]
				});
			},
			// 点击抽奖按钮触发回调
			async startCallBack() {
				// 先开始旋转
				const res2 = await this.$api.turntableTurn();
				this.resultId = res2.data.result_id;
				this.$refs.luckyWheel.play()
				setTimeout(() => {
					// 3s后得到中奖索引
					let resultIndex;
					this.prizes.forEach((ele, i) => {
						if (ele.id == this.resultId) {
							this.resultIndex = i
						}
					})
					console.log(this.resultIndex)
					// 缓慢停止游戏
					this.$refs.luckyWheel.stop(this.resultIndex)
				}, 2000)
			},
			// 抽奖结束触发回调
			endCallBack(prize) {
				// 奖品详情
				console.log(this.resultIndex, 'cyy')
				if (this.resultIndex+1 == this.prizes.length) {
					this.modalContent = '很遗憾，您这次没有抽中奖品！'
				} else {
					this.modalContent =
						`恭喜您抽中${this.resultIndex+1 == 1?'一':this.resultIndex+1==2?'二':this.resultIndex+1==3?'三':'四'}等奖！奖品:${prize.name}!`
				}
				this.modalShow = true;

			},
			toWodejiangping() {
				uni.navigateTo({
					url: '/pages/index/zhuanpan/wodejiangping'
				})
			},
		}
	}
</script>


<style lang="scss">
	page {
		width: 750rpx;
		background: linear-gradient(180deg, #C91919 0%, #D5183F 100%);
	}
</style>
<style scoped lang="scss">
	.index {
		position: relative;
	}

	.btn1 {
		cursor: pointer;
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		width: 146rpx;
		height: 56rpx;
		background: linear-gradient(180deg, #FFA939 0%, #FFD3A0 100%);
		border-radius: 28rpx;
		font-size: 24rpx;
		font-family: Segoe UI;
		font-weight: bold;
		line-height: 56rpx;
		color: #C91919;
		text-align: center;
	}

	.btn2 {
		position: absolute;
		top: 680rpx;
		left: 50%;
		transform: translateX(-50%);
		font-size: 32rpx;
		font-family: Segoe UI;
		font-weight: bold;
		line-height: 86rpx;
		text-align: center;
		color: #C91919;
		width: 456rpx;
		height: 96rpx;
		border: 6rpx solid #FFA836;
		background: linear-gradient(180deg, #FF9B17 0%, #FFCC00 100%);
		border-radius: 48rpx;
	}

	.nav1 {
		position: absolute;
		top: 830rpx;
		width: 710rpx;
		height: 194rpx;
		border-radius: 20rpx;
		left: 50%;
		display: flex;
		padding: 0 30rpx;
		transform: translateX(-50%);
		background: linear-gradient(360deg, #FFA836 0%, #FFD5A5 100%);

		.item {
			padding: 12rpx 0rpx;
			height: 100%;
			display: flex;
			width: 25%;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;

			.txt1 {
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 32rpx;
				color: #C91919;
			}

			.pic1 {
				height: 84rpx;
				width: 84rpx;
			}

			.txt2 {
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 28rpx;
				color: #C91919;
			}
		}
	}

	.nav2 {
		position: absolute;
		top: 1050rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 480rpx;

		.txt1 {
			font-size: 24rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 32rpx;
			color: #FFFFFF;
			text-align: center;
			margin-bottom: 8rpx;
		}

		.txt2 {
			font-size: 20rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 30rpx;
			color: #FFFFFF;
		}
	}

	.zhuanpan {
		position: absolute;
		top: 44rpx;
		left: 50%;
		transform: translateX(-50%);

		.pic {
			width: 160rpx;
			height: 160rpx;
			position: absolute;
			z-index: 2;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.txt1 {
			position: absolute;
			z-index: 3;
			left: 50%;
			transform: translate(-50%, -50%);
			top: 46%;
			font-size: 40rpx;
			font-family: Segoe UI;
			font-weight: bold;
			line-height: 54rpx;
			color: #FFD792;
		}

		.txt2 {
			position: absolute;
			z-index: 3;
			left: 50%;
			transform: translate(-50%, -50%);
			top: 54%;
			font-size: 24rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 32rpx;
			color: #FFD792;
		}
	}
</style>
