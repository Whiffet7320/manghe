<template>
	<view class="index">
		<view class="tit1">请输入螃蟹商城的支付密码，可用于银行卡提现</view>
		<u-message-input :focus="true" :breathe="true" :maxlength='6' :dot-fill="true" @finish="finish" width="64" inactive-color="#B7B7B7" active-color="#d61d1d"></u-message-input>
		<view @click="onSubmit" class="btn">确定</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				password:'',
				money:'',
				user_bank_id:'',
			}
		},
		onLoad(options) {
			this.user_bank_id = options.user_bank_id;
			this.getUserInfo()
		},
		methods:{
			finish(e){
				console.log(e)
				this.password = e;
			},
			async onSubmit(){
				console.log(this.password)
				const res = await this.$api.withdraw({
					user_bank_id:this.user_bank_id,
					money:this.money,
					pay_password:this.password
				})
				this.$u.toast(res.message);
				if(res.code == 200){
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1000)
				}
			},
			async getUserInfo() {
				await this.$api.userInfo().then(res => {
					if(res.code==200){
						this.money = res.data.integral;
					}else{
						uni.navigateTo({
							url:"/pages/login/login"
						})
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #f7f8fa;
	}
</style>
<style lang="scss" scoped>
	.index {}
	.tit1{
		margin-top: 40rpx;
		margin-bottom: 28rpx;
		text-align: center;
		font-size: 24rpx;
		font-weight: 700;
		color: #000000;
	}
	.btn{
		margin-top: 100rpx;
		margin-left: 30rpx;
		width: 690rpx;
		height: 80rpx;
		background: #d61d1d;
		border-radius: 12rpx;
		font-size: 28rpx;
		font-weight: 700;
		text-align: center;
		line-height: 80rpx;
		color: #fafafc;
	}
</style>
