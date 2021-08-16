<template>
	<view class="index">
		<view class="container">
			<view class="input">
				<u-input input-align='center' placeholder='请输入关键词/商品名称进行搜索'
					placeholder-style='color: #707071;font-size: 20rpx;text-align: center;' v-model="searchVal"
					type="text" @confirm='onSearch' :custom-style="customStyle" />
			</view>
			<view class="tit1">热搜词</view>
			<view class="tit2">
				<view class="btnItems">
					<text @click="clickSearch(item.search_key)" class="item" v-for="item in btnList" :key="item.id">{{item.search_key}}</text>
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
				customStyle: {
					borderRadius: '30rpx',
					boxShadow: '0 6rpx 16rpx 2rpx rgba(0,0,0,0.26)',
				},
				btnList:[],
			}
		},
		onShow() {
			this.getData()
		},
		methods:{
			async getData(){
				const res = await this.$api.indexSearch_history();
				this.btnList = res.data
			},
			onSearch(){
				uni.navigateTo({
					url:`/pages/index/sousuo/sousuoshangping?keyword=${this.searchVal}`
				})
			},
			clickSearch(val){
				this.searchVal = val;
				this.onSearch()
			},
		}
	}
</script>

<style scoped lang="scss">
	// .index{
	// 	border-radius: 10rpx;
	// 	background: red;
	// 	box-shadow: 0 0 5rpx 10rpx rgba(0,0,0,0.16)
	// }
	.container{
		margin: 0 34rpx;
	}
	.input{
		margin: 10rpx auto;
	}
	.tit1{
		margin-top: 30rpx;
		opacity: 1;
		font-size: 24rpx;
		font-family: PingFang SC, PingFang SC-Bold;
		font-weight: 700;
		text-align: left;
		color: #000000;
		letter-spacing: 0rpx;
	}
	.tit2{
		.btnItems{
			margin-top: 24rpx;
			.item{
				margin-right: 20rpx;
				display: inline-block;
				padding: 10rpx 28rpx;
				opacity: 1;
				background: #ffffff;
				border-radius: 24rpx;
				box-shadow: 0rpx 0rpx 2rpx 0rpx rgba(0,0,0,0.16); 
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: left;
				color: #707071;
			}
		}
	}
</style>
