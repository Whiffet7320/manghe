<template>
	<view class="index">
		<view class="nav1">
			<u-icon @click='toBack' name="arrow-left" color="#000000" size="40"></u-icon>
			<view class="myInp">
				<u-icon name="search" color="#C7C7C7" size="28"></u-icon>
				<u-input v-model="searchVal" placeholder='搜索专家/项目/关键词'
					placeholder-style='color: #C7C7C7;' type="text" height="60rpx" />
			</view>
		</view>
		<view class="nav2">
			<view class="item">
				<view class="txt">综合</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchVal: '',
			}
		},
		methods:{
			toBack(){
				uni.navigateBack({
					delta:1
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

</style>
