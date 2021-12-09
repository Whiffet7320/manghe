<template>
	<view class="index">
		<view class="nav1">
			<u-icon @click='toBack' name="arrow-left" color="#000000" size="40"></u-icon>
			<view class="myInp">
				<u-icon name="search" color="#C7C7C7" size="28"></u-icon>
				<u-input :clearable='false' v-model="searchVal" placeholder='搜索专家/项目/关键词'
					placeholder-style='color: #C7C7C7;' type="text" height="60rpx" @confirm='toSearchResult' />
			</view>
		</view>
		<view class="tit1">搜索发现</view>
		<view class="items1">
			<view class="item">小眼综合</view>
			<view class="item">胸部整形</view>
			<view class="item">面部抗衰</view>
			<view class="item">私密</view>
			<view class="item">肋骨鼻综合</view>
		</view>
		<view class="flex">
			<view class="tit1">历史搜索</view>
			<image src="/static/image/zu1527.png" class="f-pic" mode=""></image>
		</view>
		<view class="items1">
			<view class="item">小眼综合</view>
			<view class="item">私密</view>
			<view class="item">肋骨鼻综合</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:'',
				searchVal: '',
			}
		},
		onLoad(option) {
			this.type = option.type;
		},
		methods:{
			toBack(){
				uni.navigateBack({
					delta:1
				})
			},
			toSearchResult(){
				uni.navigateTo({
					url:`/pages/search/searchResult?keyword=${this.searchVal}&type=${this.type}`
				})
			},
		}
	}
</script>

<style>
	page {
		background: #ffffff;
	}
</style>
<style lang="scss" scoped>
	.index {}

	.nav1 {
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

	.tit1 {
		padding: 0 34rpx;
		margin-top: 44rpx;
		font-size: 28rpx;
		font-weight: 500;
		margin-bottom: 28rpx;
		color: #BD9E81;
	}

	.items1 {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		margin: 0 34rpx 0 14rpx;

		.item {
			margin-bottom: 16rpx;
			font-size: 24rpx;
			font-weight: 400;
			line-height: 60rpx;
			color: #707070;
			height: 60rpx;
			padding: 0 26rpx;
			background: #FAFAFA;
			border-radius: 10rpx;
			margin-right: 20rpx;
		}
	}
	.flex{
		padding-right: 34rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.f-pic{
			width: 30rpx;
			height: 28rpx;
		}
	}
</style>
