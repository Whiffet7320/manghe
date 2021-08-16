<template>
	<view class="index">
		<view class="container">
			<view class="navitem nav1">
				<image class="pic1" src="/static/image/lujin308.png" mode=""></image>
				<view class="tit1">收 货 人</view>
				<u-input placeholder="请填写收货人姓名" v-model="name" type="text" :border="false" height="40" />
			</view>
			<view class="navitem nav2">
				<image class="pic1" src="/static/image/lujin309.png" mode=""></image>
				<view class="tit1">联系方式</view>
				<u-input placeholder="请填写收货人联系方式" v-model="number" type="text" :border="false" height="40" />
			</view>
			<view class="navitem nav3">
				<image class="pic1" src="/static/image/lujin310.png" mode=""></image>
				<view class="tit1">所在城市</view>
				<u-input @click="showPCA" disabled placeholder="请填写收货人所在城市" v-model="cityInp" type="text"
					:border="false" height="40" />
			</view>
			<view class="navitem nav4">
				<image class="pic1" src="/static/image/lujin311.png" mode=""></image>
				<view class="tit1">详细地址</view>
				<u-input placeholder="请填写收货人详细地址" v-model="address" type="text" :border="false" height="40" />
			</view>
			<view class="navitem nav5">
				<image class="pic1" src="/static/image/lujin311.png" mode=""></image>
				<view class="tit1">设置为默认地址</view>
				<u-switch v-model="is_default"></u-switch>
			</view>
		</view>
		<view class="btn" @tap='submit'>保存地址</view>
		<!-- 保存成功 -->
		<u-popup class='bccgShow' z-index="99999" v-model="bccgShow" mode="center" border-radius="34">
			<view class="bccgShow2">
				<view class="tit1">保存成功</view>
				<image class="pic1" src="/static/image/zu338.png" mode=""></image>
				<view class="btn1" size="mini" @click='zfcgqd'>确定</view>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
		<pcaPicker ref="pcaPicker" @confirm="getPCA"></pcaPicker>
	</view>
</template>

<script>
	import pcaPicker from '@/components/pcaPicker/pcaPicker.vue'
	export default {
		components: {
			pcaPicker
		},
		data() {
			return {
				name: '',
				number: '',
				cityInp: '',
				province: '',
				city: '',
				area: '',
				address: '',
				is_default: '',
				openid: null,
				option: null,
				id: '',
				bccgShow: false,
			}
		},
		onLoad(option) {
			console.log(option)
			this.option = option
		},
		onShow() {
			this.openid = uni.getStorageSync('openid')
			if (this.option.name) {
				this.id = this.option.id;
				this.name = this.option.name;
				this.number = this.option.number;
				this.province = this.option.province;
				this.city = this.option.city;
				this.area = this.option.area;
				this.address = this.option.address;
				this.cityInp = this.province + this.city + this.area;
				this.is_default = this.option.is_default == 1 ? true : false;
			}
		},
		methods: {
			async submit() {
				console.log(this.province)
				if (this.option.name) {
					// 修改
					const res = await this.$api.addressEdit({
						province: this.province,
						city: this.city,
						area: this.area,
						address: this.address,
						name: this.name,
						number: this.number,
						is_default: this.is_default == true ? 1 : 0,
						address_id: this.id,
					})
					console.log(res)
					if (res.code == 200) {
						this.$refs.uToast.show({
							title: res.message,
							type: 'success',
							duration: 1000,
							back: true
						})
					} else {
						this.$refs.uToast.show({
							title: res.message,
							type: 'warning',
							duration: 1000,
						})
					}
				} else {
					const res = await this.$api.addressAdd({
						province: this.province,
						city: this.city,
						area: this.area,
						address: this.address,
						name: this.name,
						number: this.number,
						is_default: this.is_default == true ? 1 : 0
					})
					console.log(res)
					if (res.code == 200) {
						this.$refs.uToast.show({
							title: res.message,
							type: 'success',
							duration: 1000,
							back: true
						})
					} else {
						this.$refs.uToast.show({
							title: res.message,
							type: 'warning',
							duration: 1000,
						})
					}
				}

				// if (this.option.realname) {
				// 	// 修改
				// 	this.is_default = this.is_default == true ? 1 : 0;
				// 	console.log(this.realname, this.mobile, this.city, this.address, this.is_default)
				// 	var signstr = "realname=" + this.realname + "&mobile=" + this.mobile + "&city=" + this.city +
				// 		"&address=" + this.address + "&openid=" + this.openid + "&is_default=" + this.is_default +
				// 		"&id=" + this.id + "";
				// 	const md51 = this.$md5(signstr);
				// 	const md52 = md51 + this.$apikey;
				// 	const md = this.$md5(md52).toUpperCase()
				// 	const res = await this.$api.wx_edituserreceiver(this.openid, this.id, this.realname, this.mobile,
				// 		this
				// 		.city,
				// 		this
				// 		.address, this.is_default, md)
				// 	console.log(res)
				// 	if (res.result == 1) {
				// 		this.$refs.uToast.show({
				// 			title: res.msg,
				// 			type: 'success',
				// 			// url: 'shouhuoxinxi/pages/shouhuoxinxi?page=1',
				// 			duration: 1000,
				// 			back: true
				// 		})
				// 	} else {
				// 		this.$refs.uToast.show({
				// 			title: res.msg,
				// 			type: 'warning',
				// 			duration: 1000,
				// 		})
				// 	}
				// } else {
				// 	// 添加
				// 	this.is_default = this.is_default == true ? 1 : 0;
				// 	var signstr = "realname=" + this.realname + "&mobile=" + this.mobile + "&city=" + this.city +
				// 		"&address=" + this.address + "&openid=" + this.openid + "&is_default=" + this.is_default + "";
				// 	const md51 = this.$md5(signstr);
				// 	const md52 = md51 + this.$apikey;
				// 	const md = this.$md5(md52).toUpperCase()
				// 	const res = await this.$api.wx_adduserreceiver(this.openid, this.realname, this.mobile, this.city,
				// 		this
				// 		.address, this.is_default, md)
				// 	console.log(res)
				// 	if (res.result == 1) {
				// 		this.$refs.uToast.show({
				// 			title: res.msg,
				// 			type: 'success',
				// 			// url: 'shouhuoxinxi/pages/shouhuoxinxi?page=1',
				// 			duration: 1000,
				// 			back: true
				// 		})
				// 	} else {
				// 		this.$refs.uToast.show({
				// 			title: res.msg,
				// 			type: 'warning',
				// 			duration: 1000,
				// 		})
				// 	}
				// }
			},
			zfcgqd() {
				this.bccgShow = false
			},
			showPCA(e) {
				this.$refs.pcaPicker.show();
			},
			getPCA(e) {
				this.cityInp = e[0] + ' ' + e[1] + ' ' + e[2];
				this.province = e[0];
				this.city = e[1];
				this.area = e[2];
			}
		}
	}
</script>

<style scoped lang="scss">
	.index {
		position: relative;

		.container {
			width: 703rpx;
			height: 82rpx;
			margin: 0 auto;

			.navitem {
				height: 31rpx;
				display: flex;
				align-items: center;
				margin-top: 18rpx;
				width: 703rpx;
				height: 82rpx;
				opacity: 1;
				background: #ffffff;
				border-radius: 18rpx;
				box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);

				.pic1 {
					width: 22rpx;
					height: 20rpx;
					opacity: 1;
					margin-left: 38rpx;
				}

				.tit1 {
					margin: 0 27rpx 0 15rpx;
					opacity: 1;
					font-size: 22rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #000000;
					letter-spacing: 2rpx;
				}
			}

			.nav1 {
				.pic1 {
					width: 22rpx;
					height: 20rpx;
					opacity: 1;
					margin-left: 38rpx;
				}
			}

			.nav2 {
				.pic1 {
					width: 18rpx;
					height: 24rpx;
					opacity: 1;
					margin-left: 38rpx;
				}

				.tit1 {
					margin-left: 20rpx;
				}
			}
		}

		.btn {
			position: fixed;
			left: 0rpx;
			bottom: 80rpx;
			width: 750rpx;
			height: 80rpx;
			opacity: 1;
			background: rgb(221, 38, 56);
			border-radius: 18rpx;
			font-size: 22rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #ffffff;
			line-height: 80rpx;
		}
	}

	.bccgShow {
		.bccgShow2 {
			width: 480rpx;
			height: 338rpx;
			opacity: 1;
			position: relative;

			.tit1 {
				margin-top: 30rpx;
				margin-bottom: 22rpx;
				opacity: 1;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: center;
				color: #000000;
			}

			.pic1 {
				display: block;
				margin: 0 auto;
				width: 158rpx;
				height: 154rpx;
				opacity: 1;
			}

			.btn1 {
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: left;
				color: #dd2638;
				letter-spacing: 2rpx;
				position: absolute;
				bottom: 0;
				height: 100rpx;
				width: 100%;
				line-height: 100rpx;
				text-align: center;
			}
		}
	}
</style>
