<template>
	<view class="index">
		<view class="nav1">个人信息仅用于发布需求，隐私信息完全保密</view>
		<view class="form">
			<u-form :label-style='labStyle' :model="form" ref="uForm">
				<u-form-item label="服务地址">
					<u-input :clearable='false' v-model="form.address" placeholder='点击选择服务地址' />
					<image @tap="chooseAddress" class="pic1" src="../../../static/img/zu1.png" mode=""></image>
				</u-form-item>
				<u-form-item label="门牌号">
					<u-input v-model="form.address2" placeholder='请输入详细地址，如8栋5单元18a' />
				</u-form-item>
				<u-form-item label="联系人">
					<u-input v-model="form.name" placeholder='请输入姓名'/>
				</u-form-item>
				<u-form-item label="性别">
					<view @tap="changeSex(1)" :class="{'myRadBox':true,'active':form.sex == 1}">先生</view>
					<view @tap="changeSex(2)" :class="{'myRadBox':true,'active':form.sex == 2}">女士</view>
				</u-form-item>
				<u-form-item label="手机号码">
					<u-input v-model="form.phone" placeholder='请输入手机号'/>
				</u-form-item>
				<u-form-item label="设为默认地址">
					<u-switch slot="right" v-model="form.moren"></u-switch>
				</u-form-item>
			</u-form>
		</view>
		<view @tap='onSubmit' class="btn">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					address: '',
					address2: '',
					name: '',
					sex:'',
					phone:'',
					moren:"",
				},
				labStyle:{
					marginLeft:'46rpx',
					width:'200rpx',
					fontSize:"24rpx",
				}
			}
		},
		methods:{
			chooseAddress(){
				const that = this;
				uni.chooseLocation({
				    success: function (res) {
				        // console.log('位置名称：' + res.name);
				        console.log('详细地址：' + res.address);
						that.form.address = res.address
				    }
				});
			},
			changeSex(val){
				this.form.sex = val;
			},
			onSubmit(){
				console.log(this.form)
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
	/deep/ .u-form-item--right__content__slot{
		display: flex;
		align-items: center;
	}
	/deep/ .u-form-item--right{
		margin: 0 46rpx 0 116rpx;
	}
	/deep/ .u-input__input{
		width: 456rpx;
		font-size: 24rpx !important;
	}
	.index {}

	.nav1 {
		width: 750rpx;
		height: 76rpx;
		background: #FFDFC7;
		opacity: 1;
		font-size: 32rpx;
		font-family: Segoe UI;
		font-weight: 400;
		line-height: 76rpx;
		text-align: center;
		color: #FF1717;
	}
	.form{
		background: #ffffff;
		.pic1{
			margin-left: 8rpx;
			width: 40rpx;
			height: 51rpx;
		}
		.myRadBox{
						margin-right: 20rpx;
			width: 104rpx;
			height: 56rpx;
			border: 2rpx solid #E6E6E6;
			opacity: 1;
			font-size: 28rpx;
			font-family: SimHei;
			font-weight: 400;
			line-height: 52rpx;
			text-align: center;
			color: #707070;
		}
		.myRadBox.active{
			width: 104rpx;
			height: 56rpx;
			background: #E9F0FD;
			border: 2rpx solid #4988FD;
			opacity: 1;
			font-size: 28rpx;
			font-family: SimHei;
			font-weight: 400;
			line-height: 52rpx;
			text-align: center;
			color: #4988FD;
		}
	}
	.btn{
		margin: 90rpx 54rpx 0 54rpx; 
		width: 642rpx;
		height: 96rpx;
		background: #4988FD;
		opacity: 1;
		border-radius: 48rpx;
		font-size: 48rpx;
		font-family: SimHei;
		font-weight: 400;
		line-height: 96rpx;
		text-align: center;
		color: #FFFFFF;
		opacity: 1;
	}
</style>
