<template>
	<view class="index">
		<view class="container">
			<view class="navitem nav1">
				<image class="pic1" src="/static/路径308.png" mode=""></image>
				<view class="tit1">收 货 人</view>
				<u-input placeholder="请填写收货人姓名" v-model="realname" type="text" :border="false" height="40" />
			</view>
			<view class="navitem nav2">
				<image class="pic1" src="/static/路径309.png" mode=""></image>
				<view class="tit1">联系方式</view>
				<u-input placeholder="请填写收货人联系方式" v-model="mobile" type="text" :border="false" height="40" />
			</view>
			<view class="navitem nav3">
				<image class="pic1" src="/static/路径310.png" mode=""></image>
				<view class="tit1">所在城市</view>
				<u-input @click="showPCA" disabled placeholder="请填写收货人所在城市" v-model="city" type="text" :border="false"
					height="40" />
			</view>
			<view class="navitem nav4">
				<image class="pic1" src="/static/路径311.png" mode=""></image>
				<view class="tit1">详细地址</view>
				<u-input placeholder="请填写收货人详细地址" v-model="address" type="text" :border="false" height="40" />
			</view>
			<view class="navitem nav5">
				<image class="pic1" src="/static/路径311.png" mode=""></image>
				<view class="tit1">设置为默认地址</view>
				<u-switch v-model="is_default"></u-switch>
			</view>
		</view>
		<view class="btn" @tap='submit'>确定</view>
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
				realname: '',
				mobile: '',
				city: '',
				address: '',
				is_default: '',
				openid: null,
				option: null,
				id:'',
			}
		},
		onLoad(option) {
			console.log(option)
			this.option = option
		},
		onShow() {
			this.openid = uni.getStorageSync('openid')
			if (this.option.realname) {
				this.id = this.option.id;
				this.realname = this.option.realname;
				this.mobile = this.option.mobile;
				this.city = this.option.city;
				this.address = this.option.address;
				this.is_default = this.option.is_default == 1 ? true : false;
			}
		},
		methods: {
			async submit() {
				console.log(this.option.realname)
				if (this.option.realname) {
					// 修改
					this.is_default = this.is_default == true ? 1 : 0;
					console.log(this.realname, this.mobile, this.city, this.address, this.is_default)
					var signstr = "realname=" + this.realname + "&mobile=" + this.mobile + "&city=" + this.city +
						"&address=" + this.address + "&openid=" + this.openid + "&is_default=" + this.is_default +
						"&id=" + this.id + "";
					const md51 = this.$md5(signstr);
					const md52 = md51 + this.$apikey;
					const md = this.$md5(md52).toUpperCase()
					const res = await this.$api.wx_edituserreceiver(this.openid, this.id, this.realname, this.mobile, this
						.city,
						this
						.address, this.is_default, md)
					console.log(res)
					if (res.result == 1) {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'success',
							// url: 'shouhuoxinxi/pages/shouhuoxinxi?page=1',
							duration: 1000,
							back:true
						})
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'warning',
							duration: 1000,
						})
					}
				} else {
					// 添加
					this.is_default = this.is_default == true ? 1 : 0;
					var signstr = "realname=" + this.realname + "&mobile=" + this.mobile + "&city=" + this.city +
						"&address=" + this.address + "&openid=" + this.openid + "&is_default=" + this.is_default + "";
					const md51 = this.$md5(signstr);
					const md52 = md51 + this.$apikey;
					const md = this.$md5(md52).toUpperCase()
					const res = await this.$api.wx_adduserreceiver(this.openid, this.realname, this.mobile, this.city,
						this
						.address, this.is_default, md)
					console.log(res)
					if (res.result == 1) {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'success',
							// url: 'shouhuoxinxi/pages/shouhuoxinxi?page=1',
							duration: 1000,
							back:true
						})
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'warning',
							duration: 1000,
						})
					}
				}
			},
			showPCA(e) {
				this.$refs.pcaPicker.show();
			},
			getPCA(e) {
				this.city = e
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
			left: 76rpx;
			bottom: 80rpx;
			width: 598rpx;
			height: 80rpx;
			opacity: 1;
			background: #ebbfcc;
			border-radius: 18rpx;
			font-size: 22rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #ffffff;
			line-height: 80rpx;
		}
	}
</style>
