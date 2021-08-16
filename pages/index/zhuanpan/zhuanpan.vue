<template>
	<view class="index">
		<view class="btn1">我的奖品</view>
		<view class="zhuanpan">
			<image @click="startCallBack" class="pic" src="/static/img/zu20.png" mode=""></image>
			<view @click="startCallBack" class="txt1">抽奖</view>
			<view @click="startCallBack" class="txt2">还有8次</view>
			<LuckyWheel ref="luckyWheel" width="600rpx" height="600rpx" :blocks="blocks" :prizes="prizes"
				:buttons="buttons" :defaultStyle="defaultStyle" @start="startCallBack" @end="endCallBack" />
		</view>
		<view class="btn2">邀请好友额外抽奖</view>
		<view class="nav1">
			<view class="item" v-for="item in 4">
				<view class="txt1">一等奖</view>
				<image class="pic1" src="/static/img/zu13.png" mode=""></image>
				<view class="txt2">HUAWEI</view>
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
				blocks: [{
						padding: '10rpx',
						background: '#F18E54'
					},
					{
						padding: '18rpx',
						background: '#C91919'
					}
				],
				prizes: [{
						title: '1元红包',
						background: '#FFA836',
						fonts: [{
							text: '1元红包',
							top: '18%',
							fontSize:'30rpx'
						}],
						imgs: [{
							src: '/static/img/hongbao.png',
							width: '109rpx',
							height: '109rpx',
							top: '70rpx',
						}]
					},
					{
						title: '100元红包',
						background: '#FFF7CF',
						fonts: [{
							text: '100元红包',
							top: '18%',
							fontSize:'30rpx'
						}],
						imgs: [{
							src: '/static/img/hongbao.png',
							width: '109rpx',
							height: '109rpx',
							top: '70rpx',
						}]
					},
					{
						title: '0.5元红包',
						background: '#FFA836',
						fonts: [{
							text: '0.5元红包',
							top: '18%',
							fontSize:'30rpx'
						}],
						imgs: [{
							src: '/static/img/hongbao.png',
							width: '109rpx',
							height: '109rpx',
							top: '70rpx',
						}]
					},
					{
						title: '2元红包',
						background: '#FFF7CF',
						fonts: [{
							text: '2元红包',
							top: '18%',
							fontSize:'30rpx'
						}],
						imgs: [{
							src: '/static/img/hongbao.png',
							width: '109rpx',
							height: '109rpx',
							top: '70rpx',
						}]
					},
					{
						title: '10元红包',
						background: '#FFA836',
						fonts: [{
							text: '10元红包',
							top: '18%',
							fontSize:'30rpx'
						}],
						imgs: [{
							src: '/static/img/hongbao.png',
							width: '109rpx',
							height: '109rpx',
							top: '70rpx',
						}]
					},
					{
						title: '50元红包',
						background: '#FFF7CF',
						fonts: [{
							text: '50元红包',
							top: '18%',
							fontSize:'30rpx'
						}],
						imgs: [{
							src: '/static/img/hongbao.png',
							width: '109rpx',
							height: '109rpx',
							top: '70rpx',
						}]
					},
				],
				buttons: [{
						radius: '4rpx',
						background: '#FFD792'
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
		methods: {
			// 点击抽奖按钮触发回调
			startCallBack() {
				// 先开始旋转
				this.$refs.luckyWheel.play()
				// 使用定时器来模拟请求接口
				setTimeout(() => {
					// 3s后得到中奖索引
					let index = Math.random() * 6 >> 0
					// 缓慢停止游戏
					this.$refs.luckyWheel.stop(index)
				}, 3000)
			},
			// 抽奖结束触发回调
			endCallBack(prize) {
				// 奖品详情
				console.log(prize)
			}
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
	.index{
		position: relative;
	}
	.btn1{
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
	.btn2{
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
	.nav1{
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
		.item{
			padding: 12rpx 0rpx;
			height: 100%;
			display: flex;
			width: 25%;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			.txt1{
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 32rpx;
				color: #C91919;
			}
			.pic1{
				height: 84rpx;
				width: 84rpx;
			}
			.txt2{
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 28rpx;
				color: #C91919;
			}
		}
	}
	.nav2{
		position: absolute;
		top: 1050rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 480rpx;
		.txt1{
			font-size: 24rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 32rpx;
			color: #FFFFFF;
			text-align: center;
			margin-bottom: 8rpx;
		}
		.txt2{
			font-size: 20rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 30rpx;
			color: #FFFFFF;
		}
	}
	.zhuanpan{
		position: absolute;
		top: 44rpx;
		left: 50%;
		transform: translateX(-50%);
		.pic{
			width: 160rpx;
			height: 160rpx;
			position: absolute;
			z-index: 2;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
		}
		.txt1{
			position: absolute;
			z-index: 3;
			left: 50%;
			transform: translate(-50%,-50%);
			top: 46%;
			font-size: 40rpx;
			font-family: Segoe UI;
			font-weight: bold;
			line-height: 54rpx;
			color: #FFD792;
		}
		.txt2{
			position: absolute;
			z-index: 3;
			left: 50%;
			transform: translate(-50%,-50%);
			top: 54%;
			font-size: 24rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 32rpx;
			color: #FFD792;
		}
	}
</style>
