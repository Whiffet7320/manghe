<template>
	<view class="index">
		<u-toast ref="uToast" />
		<u-modal @confirm='outLogin' :show-cancel-button='true' :mask-close-able='true' v-model="clockShow" :content="clockContent"></u-modal>
		<view class="nav1">
			<view class="item">
				<image class="pic2" src="../../../static/img/shuben.png" mode=""></image>
				<view class="txt">
					<view class="txt1">关于如师傅</view>
					<view class="txt2"></view>
				</view>
				<u-icon name="arrow-right" color="#989898" size="28"></u-icon>
			</view>
			<view class="item">
				<image class="pic1" src="../../../static/img/fwxy.png" mode=""></image>
				<view class="txt">
					<view class="txt1">服务协议</view>
					<view class="txt2"></view>
				</view>
				<u-icon name="arrow-right" color="#989898" size="28"></u-icon>
			</view>
		</view>
		<view class="nav1">
			<view class="item">
				<image class="pic1" src="../../../static/img/shanchu.png" mode=""></image>
				<view class="txt">
					<view class="txt1">清除缓存</view>
					<view class="txt2"></view>
				</view>
				<u-icon name="arrow-right" color="#989898" size="28"></u-icon>
			</view>
			<view class="item">
				<image class="pic1" src="../../../static/img/huojian.png" mode=""></image>
				<view class="txt">
					<view class="txt1">当前版本</view>
					<view class="txt2">v2.8.5</view>
				</view>
				<u-icon name="arrow-right" color="#989898" size="28"></u-icon>
			</view>
		</view>
		<view @click="clockShow = true" class="btn">退出登录</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				clockShow:false,
				clockContent:'确定要退出登录吗'
			}
		},
		methods:{
			outLogin(){
				const that = this;
				console.log('outlogin')
				uni.setStorageSync('myUser', '')
				uni.setStorageSync('token', '')
				uni.setStorage({
					key: 'token',
					data: '',
					success() {
						that.$refs.uToast
							.show({
								title: '已退出登录',
								type: 'success',
								back: true,
							})
					}
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

	.nav1 {
		margin-top: 20rpx;
		width: 750rpx;
		height: 176rpx;
		background: #FFFFFF;
		opacity: 1;

		.item {
			&:nth-child(1) {
				border-bottom: 2rpx solid #E6E6E6;
				;
			}

			height: 90rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 42rpx;

			.pic1 {
				width: 41rpx;
				height: 38rpx;
			}

			.pic2 {
				width: 41rpx;
				height: 28rpx;
			}

			.txt {
				margin: 0 46rpx 0 28rpx;
				width: 552rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.txt1 {
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #000000;
					opacity: 1;
				}

				.txt2 {
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #FF6D00;
					font-weight: 400;
					opacity: 1
				}
			}
		}
	}
	.btn{
		margin: 40rpx 64rpx 0 64rpx;
		width: 622rpx;
		height: 76rpx;
		background: #FFFFFF;
		border-radius: 48rpx;
		font-size: 32rpx;
		font-family: Segoe UI;
		font-weight: 400;
		line-height: 76rpx;
		text-align: center;
		color: #000000;
	}

</style>
