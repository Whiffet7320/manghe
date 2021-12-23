<template>
	<view class="content">
		<view class="cell">
			<input type="password" v-model="pwd" class="ipt" maxlength="15" placeholder="以字母或数字符号组成的6-15位密码" placeholder-style="color:#808080;font-weight:500" />
		</view>
		<view class="cell">
			<input type="password" v-model="npwd" class="ipt" placeholder="再次输入密码" placeholder-style="color:#808080;font-weight:500" />
		</view>
		<view class="cell">
			<input type="number" v-model="phone" maxlength="11" class="ipt" placeholder="请输入你的手机号" placeholder-style="color:#808080;font-weight:500" />
		</view>
		<view class="cell">
			<input type="number" v-model="captch" class="ipt ipts" placeholder="请输入短信验证码" placeholder-style="color:#808080;font-weight:500" />
			<view class="light" v-if="isSend" @click="getVerifyCode">获取验证码</view>
			<view class="reset" v-else>{{verifyText}}</view>
		</view>
		<u-gap height="56"></u-gap>
		<view class="btn" @click="onSubmit">确定</view>
		<page-toast v-model="show" content="登录密码设置成功" @confirm="confirm"></page-toast>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	import pageToast from "@/components/page-toast";
	export default{
		components:{
			pageToast
		},
		data(){
			return{
				pwd:"",
				npwd:"",
				phone:"",
				captch:"",
				isSend:true,
				second: 0,
				clockTimer: null,
				show:false
			}
		},
		computed:{
			...mapState(['userInfo']),
			verifyText(){
				if (this.second < 10) {
					return '0' + this.second +'s后重新获取';
				} else {
					return this.second+'s后重新获取';
				}
			}
		},
		methods:{
			//获取验证码
			async getVerifyCode(){
				if (!this.$u.test.mobile(this.phone)) {
					this.$u.toast("请输入正确的手机号");
					return false;
				}
				if (this.second > 0) {
					return;
				}
				this.isSend = !this.isSend;
				this.second = 60;
				this.clockTimer = setInterval(()=> {
					this.second--;
					if (this.second == 0) {
						clearInterval(this.clockTimer);
						this.isSend = !this.isSend;
					}
				}, 1000)
				await this.$api.send_sms({mobile:this.phone,event:"updatepwd"}).then(res => {
					if(res.code==200){
						this.$u.toast(res.message);
					}else{
						this.$u.toast(res.message);
					}
				})
			},
			onSubmit(){
				if(!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/.test(this.pwd))){
					this.$u.toast("请输入6-16位数字加字母组合");
					return false;
				}
				if(this.npwd==""){
					this.$u.toast("请再次输入密码");
					return false;
				}
				if(this.npwd!==this.pwd){
					this.$u.toast("密码不一致，请重新输入");
					return false;
				}
				if(!this.$u.test.mobile(this.phone)) {
					this.$u.toast("请输入正确的手机号");
					return false;
				}
				if(this.captch==""){
					this.$u.toast("请输入短信验证码");
					return false;
				}
				let data = {
					mobile:this.phone,
					newpwd:this.pwd,
					repwd:this.npwd,
					captch:this.captch
				}
				this.$api.updatepwd(data).then((res)=>{
					if(res.code==200){
						this.userInfo.pwd = this.pwd;
						this.$store.commit("UpdateUserinfo",this.userInfo);
						this.show = true;
					}else{
						this.$u.toast(res.message);
					}
				})
			},
			confirm(){
				this.show = false;
				setTimeout(()=> {
					uni.navigateBack();
				},800);
			}
		},
		onLoad(options){
			if(options.type){
				uni.setNavigationBarTitle({
					title:"修改登陆密码"
				})
			}
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
		background-color: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.content{
		padding: 40rpx 30rpx;
		.cell{
			margin-bottom: 24rpx;
			display: flex;
			align-items: center;
			.ipt{
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				padding:0 24rpx;
				background: #ffffff;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				color: #000000;
				font-weight:700;
			}
			.ipts{
				width:440rpx;
				margin-right: 40rpx;
			}
			.light{
				width: 204rpx;
				height: 80rpx;
				line-height: 80rpx;
				background: #E0E1E2;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: center;
				color: #000000;
			}
			.reset{
				font-size: 24rpx;
				color: #D61D1D;
			}
		}
		.btn{
			margin:0 auto;
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			background: #d61d1d;
			border-radius: 12rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #ffffff;
		}
	}
</style>