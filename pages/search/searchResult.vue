<template>
	<view class="index">
		<view class="nav1">
			<u-icon @click='toBack' name="arrow-left" color="#000000" size="40"></u-icon>
			<view class="myInp">
				<u-icon name="search" color="#C7C7C7" size="28"></u-icon>
				<u-input v-model="searchVal" placeholder='搜索专家/项目/关键词' placeholder-style='color: #C7C7C7;' type="text"
					height="60rpx" />
			</view>
		</view>
		<view class="nav2">
			<view class="item" @click="changeRad(1)">
				<view :class='{"txt":true,"active":RadIndex==1}'>综合</view>
				<image class="pic" v-if="RadIndex == 1" src="/static/image/zu1564.png" mode=""></image>
				<image class="pic" v-else src="/static/image/zu1567.png" mode=""></image>
			</view>
			<view class="item" @click="changeRad(2)">
				<view :class='{"txt":true,"active":RadIndex==2}'>价格</view>
				<image class="pic" v-if="RadIndex == 2" src="/static/image/zu1564.png" mode=""></image>
				<image class="pic" v-else src="/static/image/zu1567.png" mode=""></image>
			</view>
			<view class="item" @click="changeRad(3)">
				<view :class='{"txt":true,"active":RadIndex==3}'>销量</view>
				<image class="pic" v-if="RadIndex == 3" src="/static/image/zu1564.png" mode=""></image>
				<image class="pic" v-else src="/static/image/zu1567.png" mode=""></image>
			</view>
		</view>
		<view class="nav3">
			<view class="item" v-for="item in 10" @click="toSousuoXiangqin">
				<image src="/static/image/mcz192.png" class="pic" mode=""></image>
				<view class="right">
					<view class="txt1">肋骨鼻综合(活动特价)</view>
					<view class="txt2">肋骨鼻综合</view>
					<view class="txt3">¥3600.00<text class="small">¥4800.00</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchVal: '',
				RadIndex: 1,
			}
		},
		methods: {
			changeRad(val) {
				this.RadIndex = val;
			},
			toBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			toSousuoXiangqin(){
				uni.navigateTo({
					url:'/pages/index/search/xiangqin?title=肋骨鼻综合(活动特价)'
				})
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
		padding-bottom: 18rpx;
		display: flex;
		align-items: center;
		margin-top: 96rpx;
		padding-left: 30rpx;

		.myInp {
			margin-left: 8rpx;
			padding: 0 24rpx;
			width: 436rpx;
			height: 64rpx;
			background: rgba(189, 158, 129, 0.05);
			border: 2rpx solid #BD9E81;
			display: flex;
			align-items: center;
			border-radius: 30rpx;

			/deep/ .u-input {
				margin-left: 14rpx;
				width: 340rpx !important;

				.u-input__input {
					font-size: 24rpx;
					font-weight: 400;
					line-height: 60rpx;
				}
			}
		}
	}

	.nav2 {
		display: flex;
		align-items: center;
		justify-content: space-around;
		.item {
			height: 80rpx;
			display: flex;
			align-items: center;

			.txt {
				font-size: 24rpx;
				font-weight: bold;
				color: #707070;
			}
			.txt.active{
				color: #BD9E81;
			}

			.pic {
				margin-left: 14rpx;
				height: 18rpx;
				width: 12rpx;
			}
		}
	}
	.nav3{
		.item{
			display: flex;
			background: #FFFFFF;
			padding: 24rpx 36rpx;
			margin-bottom: 20rpx;
			.pic{
				width: 140rpx;
				height: 140rpx;
				margin-right: 24rpx;
			}
			.right{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.txt1{
					font-size: 32rpx;
					font-weight: 500;
					color: #BD9E81;
				}
				.txt2{
					font-size: 24rpx;
					font-weight: 400;
					color: #707070;
				}
				.txt3{
					font-size: 32rpx;
					font-weight: bold;
					color: #FA8677;
					.small{
						font-size: 24rpx;
						font-weight: 400;
						color: #707070;
						text-decoration:line-through;
					}
				}
			}
		}
	}
</style>
