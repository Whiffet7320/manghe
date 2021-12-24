<template>
	<view>
		<view v-if="status==-1">
			<view class="form_group">
				<view class="title">真实姓名</view>
				<input type="text" v-model="real_name" placeholder="请如实填写" placeholder-style="color:#808080;" class="ipt" />
			</view>
			<view class="form_group">
				<view class="title">证件类型</view>
				<view class="gray">身份证</view>
			</view>
			<view class="form_group" @click="kshow=true">
				<view class="title">证件号码</view>
				<input type="text" v-model="cardNum" :disabled="true" placeholder="请输入你的身份证号码" placeholder-style="color:#808080;" class="ipt" />
			</view>
			<view class="form_group last">
				<view class="title">证件上传</view>
				<view class="upload">
					<view class="uimg" @click="uploadpic(0)" v-if="front_img==''">
						<view class="plus">+</view>
						<text class="text">身份证正面照片</text>
					</view>
					<view class="zimg" @click="uploadpic(0)" v-else>
						<image :src="front_imgs" mode="aspectFill" class="img"></image>
					</view>
					<view class="uimg" @click="uploadpic(1)" v-if="back_img==''">
						<view class="plus">+</view>
						<text class="text">身份证反面照片</text>
					</view>
					<view class="zimg" @click="uploadpic(1)" v-else>
						<image :src="back_imgs" mode="aspectFill" class="img"></image>
					</view>
				</view>
			</view>
			<view class="btnwrap">
				<button class="cubtn" @tap="onSubmit">提交审核</button>
			</view>
		</view>
		<view v-if="status==0">
			<view class="rzwrap">
				<image src="/static/image/icon_shenhe.png" mode="aspectFit" class="icon"></image>
				<text>等待审核中</text>
			</view>
		</view>
		<view class="rzwrap" v-if="status==1">
			<view class="rzcon">
				<image src="/static/image/icon_shenhe.png" mode="aspectFit" class="icon"></image>
				<text>您已通过认证</text>
			</view>
			<u-gap height="300"></u-gap>
			<view class="btn" @click="onBack">确定</view>
		</view>
		<u-keyboard ref="uKeyboard" mode="card" v-model="kshow" :random="true" @change="change" @backspace="backspace"></u-keyboard>
		<page-toast v-model="show" content="请耐心等待1-3个工作日" @confirm="confirm"></page-toast>
	</view>
</template>

<script>
	import config from "../../../api/url.js";
	import pageToast from "@/components/page-toast";
	export default{
		components:{
			pageToast
		},
		data(){
			return{
				status:-1,
				kshow:false,
				show:false,
				real_name:"",
				cardNum:"",
				front_img:"",
				front_imgs:"",
				back_img:"",
				back_imgs:""
			}
		},
		methods:{
			async getUserInfo() {
				await this.$api.userInfo().then(res => {
					if(res.code==200){
						let data = res.data.realname;
						if(data){
							this.status = data.status;
							this.real_name = data.real_name;
							this.cardNum = data.id_number;
							this.front_img = data.front_img;
							this.back_img = data.back_img;
							this.front_imgs = config.baseUrl+"/"+data.front_img;
							this.back_imgs = config.baseUrl+"/"+data.back_img;
						}
					}
				});
			},
			// 点击退格键
			backspace() {
				if(this.cardNum.length) this.cardNum = this.cardNum.substr(0, this.cardNum.length - 1);
			},
			// 键盘按键发生变化
			change(detail) {
				this.cardNum += detail;
			},
			uploadpic(index){
				this.$tool.uploadImageOne({url:"upload_pic",fileType:"idcard"},(res)=>{
					if(res.code==200){
						if(index==0){
							this.front_img = res.data.path;
							this.front_imgs = config.baseUrl+"/"+res.data.path;
						}else if(index==1){
							this.back_img = res.data.path;
							this.back_imgs = config.baseUrl+"/"+res.data.path;
						}
					}
				});
			},
			onSubmit(){
				if(this.real_name==""){
					this.$u.toast("请填写真实姓名");
					return;
				}
				if(this.cardNum==""){
					this.$u.toast("请输入你的身份证号码");
					return;
				}
				if(this.front_img==""){
					this.$u.toast("请上传身份证正面照片");
					return;
				}
				if(this.back_img==""){
					this.$u.toast("请上传身份证反面照片");
					return;
				}
				let data = {
					real_name:this.real_name,
					id_number:this.cardNum,
					front_img:this.front_img,
					back_img:this.back_img
				}
				this.$api.yzrealName(data).then((res)=>{
					if(res.code==200){
						this.show = true;
					}else{
						this.$u.toast(res.message);
					}
				})
			},
			confirm(){
				this.show = false;
				this.$store.commit("setResh",true);
				setTimeout(()=>{
					uni.navigateBack();
				},1500)
			},
			onBack(){
				uni.navigateBack();
			}
		},
		onLoad(){
			this.getUserInfo();
		}
	}
</script>

<style lang="scss" scoped>
	.rzwrap{
		width: 100%;
		padding:0 68rpx;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.rzcon{
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			color: #000;
			.icon{
				width: 358rpx;
				height: 252rpx;
				margin-bottom: 48rpx;
			}
		}
		.btn{
			width: 612rpx;
			height: 80rpx;
			line-height: 80rpx;
			background: #d61d1d;
			border-radius: 10rpx;
			font-size: 28rpx;
			color: #FFFFFF;
			text-align: center;
		}
	}
	
	.form_group{
		display: flex;
		align-items: center;
		margin: 0 30rpx;
		padding:32rpx 0 22rpx 0;
		border-bottom: 2rpx solid #f2f2f2;
		.title{
			width: 208rpx;
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			color: #000000;
		}
		.gray{
			color:#808080;
		}
		.ipt{
			flex:1;
			font-size: 28rpx;
			color: #000000;
		}
		&.last{
			align-items: flex-start;
			border-bottom: 0;
		}
	}
	.upload{
		flex:1;
		display: flex;
		flex-direction: column;
		.uimg{
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			width: 430rpx;
			height: 240rpx;
			border: 4rpx dashed #e6e6e6;
			margin-bottom: 40rpx;
			.plus{
				width: 60rpx;
				height: 140rpx;
				font-size: 100rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				color: #808080;
			}
			.text{
				font-size: 32rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				color: #808080;
			}
		}
		.zimg{
			width: 430rpx;
			height: 240rpx;
			margin-bottom: 40rpx;
			.img{
				width: 100%;
				height: 100%;
			}
		}
	}
	.btnwrap{
		margin-top: 60rpx;
		display: flex;
		justify-content: center;
		.cubtn{
			width: 612rpx;
			height: 80rpx;
			line-height: 80rpx;
			background: #d61d1d;
			border-radius: 10rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #ffffff;
			&.gray{
				background-color: #E0E1E2;
				color: #808080;
			}
		}
	}
</style>
