<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="nav1">
			<u-form :model="form" ref="uForm">
				<u-form-item label-width='160' label="联系人">
					<u-input v-model="form.address_person" placeholder='输入姓名' />
				</u-form-item>
				<u-form-item label-width='160' label="联系电话">
					<u-input v-model="form.address_phone" placeholder='输入手机号码' />
				</u-form-item>
				<u-form-item label-width='160' label="所在区域">
					<u-input @click='show = true' v-model="form.address_area" type="select" placeholder='选择所在区域' />
					<u-picker @confirm='changeCity' mode="region" v-model="show"></u-picker>
				</u-form-item>
				<u-form-item label-width='160' label="详细地址">
					<u-input v-model="form.address_detail" placeholder='输入小区门牌号' />
				</u-form-item>
				<u-form-item label-width='260' label="设为默认收货地址">
					<u-switch slot="right" size='40' v-model="form.address_def"></u-switch>
				</u-form-item>
			</u-form>
		</view>
		<view class="footer">
			<view class="btn" @click="onSubmit">保存</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					address_person: '',
					address_phone: '',
					address_detail: '',
					address_area: '',
					address_def: false,
				},
				show: false,
				edit: false
			}
		},
		onLoad(options) {
			console.log(options)
			if (options.address) {
				this.edit = true;
				this.form = {
					...JSON.parse(options.address)
				}
			}
		},
		methods: {
			changeCity(e) {
				console.log(e)
				this.form.address_area = `${e.province.label} ${e.city.label} ${e.area.label}`
			},
			async onSubmit() {
				for (let key in this.form) {
					if (this.form[key] == '' && key != 'address_def') {
						console.log(key)
						this.$refs.uToast.show({
							title: '请填写正确的信息',
						})
						return
					} else {
						if (key == 'address_phone') {
							var reg = /^1[3-9]\d{9}$/
							if (!reg.test(this.form[key])) {
								this.$refs.uToast.show({
									title: '请填写正确手机号',
								})
								return
							}
						}
					}
				}
				if (!this.edit) {
					const res = await this.$api.updateAddress({
						...this.form,
					})
					this.$refs.uToast.show({
						title: res.msg,
						callback: () => {
							if (res.status == 200) {
								uni.navigateBack({
									delta: 1
								})
							}
						}
					})
				} else {
					const res = await this.$api.updateAddress({
						...this.form,
						address_id: this.form.address_id
					})
					this.$refs.uToast.show({
						title: res.msg,
						callback: () => {
							if (res.status == 200) {
								uni.navigateBack({
									delta: 1
								})
							}
						}
					})

				}

			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #f8f8f8;
	}
</style>
<style lang="scss" scoped>
	.index {
		position: relative;
	}

	.nav1 {
		width: 690rpx;
		height: 488rpx;
		background: #ffffff;
		border-radius: 20rpx;
		margin: 28rpx auto 0;
		padding: 32rpx;

		/deep/ .u-form-item {
			padding: 8rpx 0;
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 140rpx;
		background: #ffffff;
		box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(51, 51, 51, 0.04);

		.btn {
			width: 690rpx;
			height: 76rpx;
			background: #02b3b6;
			border-radius: 38rpx;
			box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(2, 179, 182, 0.12);
			margin-top: 12rpx;
			margin-left: 30rpx;
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			line-height: 76rpx;
			color: #ffffff;
		}
	}
</style>
