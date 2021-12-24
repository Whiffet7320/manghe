<template>
	<view class="index">
		<view v-if="isShezhi == 'no'">
			<view class="tit1">{{!isTwo?'请设置螃蟹商城的支付密码，建议与银行卡密码不同':'请再次输入密码'}}</view>
			<u-message-input v-if='!isTwo' :focus="true" :breathe="true" :maxlength='6' :dot-fill="true" @finish="finish" active-color="#D61D1D"></u-message-input>
			<u-message-input v-else :focus="true" :breathe="true" :maxlength='6' :dot-fill="true" @finish="finish2" active-color="#D61D1D"></u-message-input>
		</view>
		<view v-else>
			<view class="tit1">{{!isTwo && !isThree?'请输入旧密码': isTwo && !isThree ? '请输入新密码' : '请再次输入密码'}}</view>
			<u-message-input v-if='!isTwo && !isThree' :focus="true" :breathe="true" :maxlength='6' :dot-fill="true" @finish="finish" active-color="#D61D1D"></u-message-input>
			<u-message-input v-if='isTwo && !isThree' :focus="true" :breathe="true" :maxlength='6' :dot-fill="true" @finish="finish2" active-color="#D61D1D"></u-message-input>
			<u-message-input v-if='isTwo && isThree' :focus="true" :breathe="true" :maxlength='6' :dot-fill="true" @finish="finish3" active-color="#D61D1D"></u-message-input>
		</view>
		<view @click="onSubmit" class="btn">确定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				password: '',
				password2: '',
				isTwo: false,
				isShezhi: null,
				isThree:false,
				password3:'',
			}
		},
		onLoad(option) {
			this.isShezhi = option.isShezhi
		},
		methods: {
			finish(e) {
				this.password = e;
				this.isTwo = true;
				this.isThree = false;
			},
			finish2(e) {
				this.password2 = e;
				this.isThree = true;
			},
			finish3(e) {
				this.password3 = e;
			},
			async onSubmit() {
				const res = await this.$api.set_pay_password({
					pay_password: this.password3,
					re_pay_password: this.password2,
					oldpay_password: this.password,
				})
				if (res.code == 200) {
					this.$u.toast('设置成功');
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1000)
				} else {
					this.$u.toast(res.message);
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f7f8fa;
	}
</style>
<style lang="scss" scoped>
	.tit1 {
		margin-top: 40rpx;
		margin-bottom: 28rpx;
		text-align: center;
		font-size: 24rpx;
		font-weight: 700;
		color: #000000;
	}

	.btn {
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
