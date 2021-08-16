<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="items">
			<view class="item" v-for="(item,index) in 4" :key='index'>
				<u-radio-group class='myRad' v-model="rad1" @change="radioGroupChange">
					<u-radio :name='index'></u-radio>
				</u-radio-group>
				<view class="content">
					<view class="tit1">
						<view v-if="rad1==item" class="tit1-1">默认</view>
						<view class="tit1-2">将军华府</view>
						<view class="tit1-3">3栋2单元</view>
					</view>
					<view class="tit2">浙江省温州市瓯海区兴海路</view>
					<view class="tit3">李先生（先生）13364562323</view>
				</view>
				<image @click="editXinjiandizhi(item)" class="pic1" src="../../../static/img/bianji.png" mode=""></image>
			</view>
		</view>
		<view class="footer">
			<view @click="toXinjiandizhi" class="btn">添加新地址</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rad1:'1'
			}
		},
		methods:{
			radioGroupChange(e){
				console.log(e)
			},
			toXinjiandizhi(){
				uni.navigateTo({
					url:'/pages/wode/shouhuodizhi/xinzengdizhi'
				})
			},
			editXinjiandizhi(item){
				console.log(item)
				// uni.navigateTo({
				// 	url:`/pages/wode/shouhuodizhi/xinzengdizhi?address=1&name=uniapp`
				// })
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

	.items {
		margin-top: 20rpx;

		.item {
			padding: 0 22rpx;
			width: 750rpx;
			height: 176rpx;
			background: #FFFFFF;
			opacity: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.myRad{
				
			}
			.content{
				width: 648rpx;
				display: flex;
				flex-direction: column;
				.tit1{
					display: flex;
					.tit1-1{
						margin-right: 20rpx;
						width: 56rpx;
						height: 28rpx;
						background: #E6EFFF;
						border: 2rpx solid #4988FD;
						opacity: 1;
						font-size: 20rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 24rpx;
						color: #4988FD;
						text-align: center;
					}
					.tit1-2{
						font-size: 28rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 32rpx;
						color: #000000;
						opacity: 1;
					}
					.tit1-3{
						margin-left: 20rpx;
						font-size: 24rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 32rpx;
						color: #000000;
						opacity: 1;
					}
				}
				.tit2{
					font-size: 28rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 38rpx;
					color: #000000;
					opacity: 1;
				}
				.tit3{
					font-size: 28rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 38rpx;
					color: #999999;
					opacity: 1;
				}
			}
			.pic1{
				width: 29rpx;
				height: 29rpx;
			}
		}
	}
	.footer{
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 176rpx;
		background: #FFFFFF;
		opacity: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		.btn{
			width: 622rpx;
			height: 96rpx;
			background: #4988FD;
			opacity: 1;
			border-radius: 6rpx;
			font-size: 48rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 96rpx;
			text-align: center;
			color: #FFFFFF;
		}
	}
</style>
