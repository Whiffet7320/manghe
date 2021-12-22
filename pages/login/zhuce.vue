<template>
	<view class="index">
		<u-toast ref="uToast"></u-toast>
		<image src="/static/image/zu3029.png" class="bacImg" mode=""></image>
		<u-navbar :title-bold='true' :background='background' :border-bottom='false' title-color='#ffffff'
			:title='navtitle' title-size='34'>
		</u-navbar>
		<template v-if='isYzmLogin'>
			<view class="tit1">
				<view class="txt1">短信快捷登录</view>
				<view @click="isYzmLogin=false" class="txt2">账号密码登录></view>
			</view>
			<view class="inp1">
				<u-input v-model="phone" type="text" :clearable='false' placeholder='请输入手机号' />
			</view>
			<view class="inp2box">
				<view class="inp2">
					<u-input v-model="yzm" type="text" :clearable='false' placeholder='请输入验证码' />
				</view>
				<view @click='getCode' class="txt1">{{tips}}</view>
			</view>
			<view class="inp2box inp3">
				<view class="inp2">
					<u-input v-model="yqm" type="text" :clearable='false' placeholder='请输入推荐人邀请码' />
				</view>
				<view class="txt1">*非必填项</view>
			</view>
		</template>
		<template v-else>
			<view class="tit1">
				<view v-if="isZhuce && !isWangji" class="txt1">账号注册</view>
				<view v-if="isWangji && !isZhuce" class="txt1">忘记密码</view>
				<view v-if='!isWangji && !isZhuce' class="txt1">账号密码登陆</view>
				<view @click="isYzmLogin=true" class="txt2">验证码登陆></view>
			</view>
			<view class="inp1">
				<u-input v-model="phone" type="text" :clearable='false' placeholder='请输入用户名/手机号' />
			</view>
			<view class="inp2-1">
				<u-input v-model="password" type="password" :clearable='false' placeholder='请输入登陆密码' />
			</view>
			<view class="inp2-1" v-if="isWangji && !isZhuce" style="top: 850rpx;">
				<u-input v-model="againPassword" type="password" :clearable='false' placeholder='请再次确认您输入的密码' />
			</view>
			<view v-if="isWangji && !isZhuce" class="inp2box box3" style="top: 950rpx;">
				<view class="inp2">
					<u-input v-model="yzm" type="text" :clearable='false' placeholder='请输入验证码' />
				</view>
				<view @click='getCode' class="txt1">{{tips}}</view>
			</view>
			<view v-if="isZhuce" class="inp2box box3">
				<view class="inp2">
					<u-input v-model="yzm" type="text" :clearable='false' placeholder='请输入验证码' />
				</view>
				<view @click='getCode' class="txt1">{{tips}}</view>
			</view>
			<view :class="{'jzmm':true,'isZhuce':isZhuce}">
				<view v-if="isZhuce && !isWangji" @click="denglu" style="margin-left: 150rpx;" class="txt11">立即去登陆
				</view>
				<view v-if="isWangji && !isZhuce" @click="denglu" style="transform:translate(150rpx,156rpx);"
					class="txt11">立即去登陆</view>
				<view v-if="!isWangji && !isZhuce" @click="zhuce" class="txt11">注册新账号</view>
				<view class="txt" @click="wangjimima" v-if="!isWangji && !isZhuce">忘记密码?</view>
			</view>
		</template>
		<view v-if="isYzmLogin" @click="onSubmit" style="margin-top: 20rpx;" class="btn">立即登录</view>
		<view @click="onSubmit" v-else style="margin-top: 70rpx;" class="btn">
			{{isZhuce && !isWangji?'注册': !isWangji && !isZhuce ? '立即登录' : '修改密码'}}
		</view>
		<view class="tit5" v-if="isYzmLogin || !isWangji && !isZhuce">
			<view @click="isGX = true" v-if="!isGX" class="quan"></view>
			<u-icon @click="isGX = false" name="checkmark-circle" v-else color="#ffffff" size="26"></u-icon>
			<view @click="isGX = !isGX" class="txt">登录即同意《螃蟹商城用户协议》和《隐私条款》</view>
		</view>
		<u-verification-code seconds="60" ref="uCode" @change="codeChange">
		</u-verification-code>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tips: '',
				navtitle: '登录',
				background: {
					'background': 'transparent'
				},
				custom1: {
					'background': '#ffffff'
				},
				phone: '',
				yzm: '',
				yqm: '',
				password: '',
				againPassword: '',
				isGX: false,
				isYzmLogin: true,
				checked: false,
				isZhuce: false,
				isWangji: false,
			}
		},
		methods: {
			async onSubmit() {
				if (this.isYzmLogin) {
					if (!this.isGX) {
						this.$u.toast('请先勾选用户协议和隐私条款');
						return;
					}
					const res = await this.$api.captch_login({
						account: this.phone,
						captch: this.yzm
					})
					console.log(res)
					if (res.code == 200) {
						this.$u.toast('登录成功');
						uni.setStorageSync("token", res.data.token);
						uni.navigateTo({
							url: '/pages/tabBar/user'
						})
					} else {
						this.$u.toast(res.message);
					}
				} else {
					if (this.isZhuce && !this.isWangji) {
						// 注册
						const res = await this.$api.register({
							account: this.phone,
							password: this.password,
							repassword: this.password,
							captch: this.yzm
						})
						console.log(res)
						if (res.code == 200) {
							this.$u.toast('注册成功');
							this.isWangji = false;
							this.isZhuce = false;
						} else {
							this.$u.toast(res.message);
						}
					} else if (!this.isWangji && !this.isZhuce) {
						if (!this.isGX) {
							this.$u.toast('请先勾选用户协议和隐私条款');
							return;
						}
						const res = await this.$api.login({
							account: this.phone,
							password: this.password,
						})
						console.log(res)
						if (res.code == 200) {
							this.$u.toast('登录成功');
							uni.setStorageSync("token", res.data.token);
							uni.navigateTo({
								url: '/pages/tabBar/user'
							})
						} else {
							this.$u.toast(res.message);
						}
					}else if(this.isWangji && !this.isZhuce){
						const res = await this.$api.forgetpwd({
							account: this.phone,
							password: this.password,
							repassword: this.againPassword,
							captch: this.yzm
						})
						console.log(res)
						if (res.code == 200) {
							this.$u.toast('修改密码成功');
							this.isWangji = false;
							this.isZhuce = false;
						} else {
							this.$u.toast(res.message);
						}
					}


				}

			},
			zhuce() {
				this.navtitle = '注册';
				this.isZhuce = true;
				this.yzm = '';
			},
			denglu() {
				this.navtitle = '登录';
				this.isZhuce = false;
				this.isWangji = false;
				this.yzm = '';
			},
			wangjimima() {
				this.navtitle = '登录';
				this.isWangji = true;
				this.isZhuce = false;
				this.yzm = '';
			},
			codeChange(text) {
				this.tips = text;
			},
			async getCode() {
				console.log(1)
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					const res = await this.$api.send_sms({
						mobile: this.phone,
						event: this.isZhuce && !this.isWangji ? 'register' : this.isWangji && !this.isZhuce ?
							'forgetpwd' : 'login'
					})
					if (res.code == 200) {
						uni.hideLoading();
						this.$u.toast('验证码已发送');
						this.$refs.uCode.start();
					} else {
						this.$u.toast(res.message);
					}

				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		position: relative;
	}

	.bacImg {
		position: absolute;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 100vh;
	}

	.tit1 {
		margin: 0 98rpx;
		width: 556rpx;
		position: absolute;
		top: 542rpx;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.txt1 {
			font-size: 32rpx;
			font-weight: 700;
			color: #ffffff;
		}

		.txt2 {
			font-size: 28rpx;
			font-weight: 500;
			color: #ffffff;
		}
	}

	.inp1 {
		position: absolute;
		width: 556rpx;
		top: 646rpx;
		margin: 0 94rpx;
		border-radius: 10rpx;
		background: #FFFFFF;
		padding: 0 20rpx;
	}

	.inp2-1 {
		position: absolute;
		width: 556rpx;
		top: 748rpx;
		margin: 0 94rpx;
		border-radius: 10rpx;
		background: #FFFFFF;
		padding: 0 20rpx;
	}

	.inp2box {
		position: absolute;
		width: 556rpx;
		top: 748rpx;
		margin: 0 94rpx;
		display: flex;
		align-items: center;

		.inp2 {
			width: 360rpx;
			border-radius: 10rpx;
			background: #FFFFFF;
			padding: 0 20rpx;
		}

		.txt1 {
			margin-left: 34rpx;
			font-size: 24rpx;
			font-weight: 700;
			color: #ffffff;
		}
	}

	.jzmm {
		position: absolute;
		width: 556rpx;
		top: 888rpx;
		margin: 0 160rpx;
		display: flex;
		align-items: center;

		/deep/ .u-checkbox__label {
			font-size: 24rpx;
			color: #FFFFFF;
		}

		.txt11 {
			font-size: 24rpx;
			font-weight: 500;
			color: #ffffff;
		}

		.txt {
			margin-left: 174rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #ffffff;
			text-decoration: underline;
		}
	}

	.jzmm.isZhuce {
		top: 960rpx;
	}

	.inp3.inp2box {
		top: 850rpx;

		.inp2 {
			width: 322rpx;
		}
	}

	.box3 {
		top: 850rpx;
	}

	.btn {
		position: absolute;
		width: 556rpx;
		top: 1040rpx;
		left: 208rpx;
		width: 336rpx;
		height: 66rpx;
		background: #ffffff;
		border-radius: 34rpx;
		font-size: 24rpx;
		font-weight: 700;
		text-align: center;
		line-height: 66rpx;
		color: #000000;
	}

	.tit5 {
		position: absolute;
		top: 1346rpx;
		left: 138rpx;
		display: flex;
		align-items: center;

		.quan {
			width: 24rpx;
			height: 24rpx;
			border: 2rpx solid #ffffff;
			border-radius: 50%;
		}

		.txt {
			margin-left: 12rpx;
			font-size: 22rpx;
			font-weight: 400;
			color: #ffffff;
		}
	}
</style>
