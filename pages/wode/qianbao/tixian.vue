<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="form">
			<u-form :label-style='labStyle' :model="form" ref="uForm">
				<u-form-item label="持卡人">
					<u-input v-model="form.name" />
				</u-form-item>
				<u-form-item label="银行名称">
					<u-input v-model="form.bank_name" />
				</u-form-item>
				<u-form-item label="银行卡号">
					<u-input v-model="form.card_num" />
				</u-form-item>
				<u-form-item label="开户行名称">
					<u-input v-model="form.open_card_name" />
				</u-form-item>
				<u-form-item label="开户行地址">
					<u-input v-model="form.open_card_address" />
				</u-form-item>
			</u-form>
		</view>
		<view class="nav1">
			<view class="tit1">
				<view class="txt1">￥</view>
				<u-input height='108' v-model="form.money" type="text" />
			</view>
			<view class="tit2">
				<view class="txt1">可用余额￥{{numMoney}}</view>
				<view @click="qbTixian" class="txt2">全部提现</view>
			</view>
		</view>
		<view @click="onSubmit" class="btn">确认提现</view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.numMoney = option.money;
		},
		data() {
			return {
				numMoney:'',
				form: {
					name: '',
					bank_name: '',
					card_num: '',
					open_card_name:'',
					open_card_address:'',
					money:'',
				},
				labStyle:{
					marginLeft:'46rpx',
					width:'200rpx',
					fontSize:"24rpx",
				},
			}
		},
		methods:{
			async onSubmit(){
				const res = await this.$api.withdraw({
					...this.form
				})
				console.log(res)
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: '已提交申请',
						type: 'success',
						back:true,
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
			qbTixian(){
				this.form.money = this.numMoney;
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #EBEBEB;
	}
</style>
<style scoped lang="scss">
	.index {}
	.form{
		margin-top: 20rpx;
		background: #ffffff;
		/deep/ .u-form-item--right{
			margin: 0 46rpx 0 110rpx;
		}
		/deep/ .u-input__input{
			width: 456rpx;
			font-size: 24rpx !important;
		}
	}
	.nav1{
		/deep/ .u-input__input{
			font-size: 48rpx;
		}
		margin-top: 22rpx;
		width: 748rpx;
		height: 204rpx;
		background: #FFFFFF;
		.tit1{
			padding: 0 28rpx;
			height: 108rpx;
			border-bottom: 1px solid #E6E6E6;
			display: flex;
			align-items: flex-end;
			.txt1{
				transform: translateY(-26rpx);
				font-size: 24rpx;
				font-family: Microsoft YaHei;
				font-weight: bold;
				line-height: 32rpx;
				color: #000000;
				margin-right: 30rpx;
			}
		}
		.tit2{
			padding: 0 28rpx;
			height: 96rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.txt1{
				font-size: 24rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				line-height: 32rpx;
				color: #999999;
			}
			.txt2{
				font-size: 24rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				line-height: 32rpx;
				color: #4988FD;
			}
		}
	}
	.btn{
		margin-top: 174rpx;
		margin-left: 54rpx;
		width: 642rpx;
		height: 96rpx;
		background: #4988FD;
		border-radius: 48rpx;
		font-size: 48rpx;
		font-family: SimHei;
		font-weight: 400;
		line-height: 96rpx;
		text-align: center;
		color: #FFFFFF;
	}

</style>
