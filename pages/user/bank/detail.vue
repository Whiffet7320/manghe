<template>
	<view>
		<view class="form_group">
			<view class="title">开户银行</view>
			<view class="picker" @click="pshow = true">
				<view class="name" v-if="current > -1">{{bankList[current].bankName}}</view>
				<view class="gray" v-else>请选择开户行</view>
			</view>
			<image src="/static/image/arrow_right.png" mode="aspectFit" style="width: 20rpx;height: 35rpx;"></image>
		</view>
		<view class="form_group">
			<view class="title">银行卡号</view>
			<input type="number" v-model="bankData.cardCode" maxlength="19" placeholder="请填写你的卡号" placeholder-style="color:#808080;" class="ipt" />
		</view>
		<view class="form_group">
			<view class="title">姓名</view>
			<input type="text" v-model="bankData.username" placeholder="请输入你的姓名" placeholder-style="color:#808080;" class="ipt" />
		</view>
		<view class="btnwrap">
			<button class="cubtn" @tap="onSubmit">绑定银行卡</button>
		</view>
		<page-toast v-model="show" @confirm="confirm"></page-toast>
		<u-popup mode="bottom" v-model="pshow" border-radius="16">
			<view class="modcontent" v-if="bankList.length">
				<view class="hd" @click="pshow=false">关闭</view>
				<scroll-view scroll-y="true" style="height: 300rpx;">
					<view class="pitem" :class="{'active':current==index}" v-for="(item,index) in bankList" :key="index" @click="bankChange(index)">
						<image :src="`https://apimg.alipay.com/combo.png?d=cashier&t=${item.bankCode}_s`" mode="aspectFit" class="img"></image>
						<text class="name">{{item.bankName}}</text>
						<u-icon name="checkmark-circle-fill" color="#D61D1D" size="20" v-if="current==index"></u-icon>
						<view class="icon" v-else></view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import pageToast from "@/components/page-toast";
	export default{
		components:{
			pageToast
		},
		data() {
			return {
				show:false,
				pshow:false,
				current:-1,
				bankData: {
					bankCode:"",
					cardCode:"",
					bankName:"",
					username:'',
				},
				bankList: [
					{bankCode: 'ICBC', bankName: '工商银行'},
					{bankCode: 'ABC', bankName: '农业银行'},
					{bankCode: 'PSBC', bankName: '邮储银行'},
					{bankCode: 'CCB', bankName: '建设银行'},
					{bankCode: 'CMB', bankName: '招商银行'},
					{bankCode: 'BOC', bankName: '中国银行'},
					{bankCode: 'COMM', bankName: '交通银行'},
					{bankCode: 'SPDB', bankName: '浦发银行'},
					{bankCode: 'GDB', bankName: '广发银行'},
					{bankCode: 'CMBC', bankName: '民生银行'},
					{bankCode: 'PAB', bankName: '平安银行'},
					{bankCode: 'CEB', bankName: '光大银行'},
					{bankCode: 'CIB', bankName: '兴业银行'},
					{bankCode: 'CITIC', bankName: '中信银行'}
				]
			}
		},
		methods: {
			onSubmit(){
				let data = this.bankData;
				if(!data.bankCode){
					this.$u.toast('请选择开户行');
					return;
				}
				if(!data.cardCode){
					this.$u.toast('请填写你的卡号');
					return;
				}
				if(!data.username){
					this.$u.toast('请填写姓名');
					return;
				}
				let datas = {
					bank_number:data.cardCode,
					bank_name:data.bankName,
					bank_code:data.bankCode,
					username:data.username
				}
				this.$api.bindBank(datas).then((res)=>{
					if(res.code==200){
						this.show = true;
					}else{
						this.$u.toast(res.message);
					}
				})
			},
			confirm(){
				this.show = false;
				uni.navigateBack();
			},
			bankChange(index) {
				this.current = index;
				this.bankData.bankCode = this.bankList[index].bankCode;
				this.bankData.bankName = this.bankList[index].bankName;
				this.pshow = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form_group{
		display: flex;
		align-items: center;
		margin: 0 30rpx;
		height: 100rpx;
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
	}
	.picker{
		flex:1;
		.name{
			font-size: 28rpx;
			color: #000000;
		}
	}
	.btnwrap{
		margin-top: 100rpx;
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
		}
	}
	.modcontent{
		padding:32rpx 36rpx;
		.hd{
			font-size: 24rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			color: #808080;
			margin-bottom: 17rpx;
		}
		.pitem{
			width: 96%;
			height: 72rpx;
			display: flex;
			align-items: center;
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			color: #000000;
			&.active{
				font-weight: bold;
			}
			.img{
				width: 36rpx;
				height: 36rpx;
				flex-shrink: 0;
			}
			.name{
				flex:1;
				padding-left: 26rpx;
			}
			.icon{
				width: 20rpx;
				height: 20rpx;
				border: 2rpx solid #808080;
				border-radius: 50%;
			}
		}
	}

</style>