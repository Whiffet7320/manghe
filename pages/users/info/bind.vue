<template>
	<view>
		<view class="celllist">
			<view class="cell">
				<view class="left">手机号</view>
				<view class="right">
					<input type="text" v-model="phone" class="ipt" placeholder="请输入" />
				</view>
			</view>
			<view class="cell">
				<view class="left">验证码</view>
				<view class="right">
					<input type="text" v-model="code" class="ipt" placeholder="请输入" />
					<view class="light" v-if="isSend" @click="getVerifyCode">发送验证码</view>
					<view v-else>{{verifyText}}</view>
				</view>
			</view>
		</view>
		<view class="btn" @click="onSubmit" v-if="disabled">绑定</view>
		<view class="btn disabled" v-else>绑定</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				isSend:true,
				phone:"",
				code:"",
				second: 0,
				clockTimer: null
			}
		},
		computed:{
			verifyText(){
				if (this.second < 10) {
					return '重新发送('+'0' + this.second +'s)';
				} else {
					return '重新发送('+ this.second +'s)';
				}
			},
			disabled(){
				if(this.phone==""&&this.code==""){
					return false;
				}else{
					return true;
				}
			}
		},
		methods:{
			//获取验证码
			getVerifyCode(){
				if (this.second > 0) {
					return;
				}
				this.isSend = !this.isSend;
				this.second = 60;
				this.clockTimer = setInterval(()=> {
					this.second--;
					if (this.second == 0) {
						clearInterval(this.clockTimer);
					}
				}, 1000)
			},
			onSubmit(){}
		},
		onUnload() {
			clearInterval(this.clockTimer);
			this.clockTimer = null;
			this.second = 0;
		},
		onHide(){
			clearInterval(this.clockTimer);
			this.clockTimer = null;
			this.second = 0;
		}
	}
</script>
<style>
	page{
		background: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.celllist{
		background: #FFFFFF;
		.cell{
			display: flex;
			align-items: center;
			margin-left: 40rpx;
			padding:40rpx 40rpx 40rpx 0;
			border-bottom: 2rpx solid #F9F9F9;
			font-size: 28rpx;
			font-family: PingFang SC;
			color: #707070;
			&:last-child{
				border:0;
			}
			.left{
				font-weight: 500;
				flex:1;
			}
			.right{
				display: flex;
				align-items: center;
				font-size: 28rpx;
				font-family: PingFang SC;
				color: #707070;
				.light{
					border-left: 2px solid #F7F8FA;
					margin-left: 20rpx;
					padding-left: 38rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #BD9E81;
				}
				.ipt{
					font-size: 28rpx;
					font-family: PingFang SC;
					color: #707070;
					text-align: right;
				}
			}
		}
	}
	.btn{
		margin:0 auto;
		margin-top: 90rpx;
		width: 522rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #BD9E81;
		border-radius: 10rpx;
		text-align: center;
		font-size: 28rpx;
		font-family: PingFang SC;
		color: #FFFFFF;
		&.disabled{
			background-color: #F5F5F5;
			font-weight: bold;
			color: #CCCCCC;
		}
	}
</style>
