<template>
	<view>
		<u-popup mode="center" border-radius="16" v-model="value" width="360rpx" height="360rpx" class="modpop">
			<view class="popcon">
				<view class="txt1">提示</view>
				<view class="txt2">{{content}}</view>
				<view class="btn" @click="confirm">确定</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default{
		props: {
			// 是否显示Modal
			value: {
				type: Boolean,
				default: false
			},
			content:{
				type:String,
				default:"保存成功"
			}
		},
		data(){
			return{
				loading: false
			}
		},
		watch: {
			// 如果是异步关闭时，外部修改v-model的值为false时，重置内部的loading状态
			// 避免下次打开的时候，状态混乱
			value(n) {
				if (n === true) this.loading = false;
			}
		},
		methods:{
			confirm(){
				this.$emit('confirm');
				setTimeout(() => {
					this.loading = false;
				}, 300);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.modpop{
		box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(0,0,0,0.10);
		.popcon{
			display: flex;
			flex-direction: column;
			align-items: center;
			.txt1{
				padding-top: 56rpx;
				font-size: 36rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #000000;
			}
			.txt2{
				padding: 40rpx 20rpx;
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				text-align: center;
				color: #000000;
			}
			.btn{
				margin-top: 20rpx;
				width: 240rpx;
				height: 80rpx;
				line-height: 80rpx;
				background: #d61d1d;
				border-radius: 40rpx;
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: center;
				color: #ffffff;
			}
		}
	}
</style>
