<template>
	<view class="content">
		<input type="text" v-model="uname" class="ipt" placeholder="请输入用户昵称" placeholder-style="color:#808080;" />
		<view class="btn" @click="onSubmit">保存</view>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	export default{
		data(){
			return{
				uname:""
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		methods:{
			onSubmit(){
				if(this.$u.trim(this.uname)==""){
					this.$u.toast("请输入用户昵称");
					return false;
				}
				this.$api.updateUserInfo({nickname:this.uname}).then((res)=>{
					if(res.code==200){
						this.userInfo.nickname = this.uname;
						this.$store.commit("UpdateUserinfo",this.userInfo);
						this.$u.toast("设置成功");
						setTimeout(()=>{
							uni.navigateBack();
						},1500);
					}else{
						this.$u.toast(res.message);
					}
				})
			}
		}
	}
</script>
<style>
	page{
		background-color: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.content{
		padding: 20rpx 30rpx;
		.ipt{
			flex:1;
			height: 80rpx;
			line-height: 80rpx;
			padding:0 24rpx;
			background: #ffffff;
			font-size: 24rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			color: #000000;
		}
		.btn{
			margin:80rpx auto 0;
			width: 248rpx;
			height: 72rpx;
			line-height: 72rpx;
			background: #d61d1d;
			border-radius: 36rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #ffffff;
		}
	}
</style>
