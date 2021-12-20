<template>
	<view class="index">
		<image src="/static/image/zu3029.png" class="bacImg" mode=""></image>
		<u-navbar :title-bold='true' :background='background' :border-bottom='false' title-color='#ffffff' title='注册'
			title-size='34'>
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
				<view class="txt1">点击获取</view>
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
				<view class="txt1">账号密码登陆</view>
				<view @click="isYzmLogin=true" class="txt2">验证码登陆></view>
			</view>
			<view class="inp1">
				<u-input v-model="phone" type="text" :clearable='false' placeholder='请输入用户名/手机号' />
			</view>
			<view class="inp2-1">
				<u-input v-model="password" type="password" :clearable='false' placeholder='请输入登陆密码' />
			</view>
			<view class="jzmm">
				<u-checkbox-group>
					<u-checkbox size='26' active-color='#bbbbbb' v-model="checked" :disabled="false">记住密码</u-checkbox>
				</u-checkbox-group>
				<view class="txt">忘记密码?</view>
			</view>
		</template>

		<view class="btn">立即登录</view>
		<view class="tit5">
			<view @click="isGX = true" v-if="!isGX" class="quan"></view>
			<u-icon @click="isGX = false" name="checkmark-circle" v-else color="#ffffff" size="26"></u-icon>
			<view @click="isGX = !isGX" class="txt">登录即同意《螃蟹商城用户协议》和《隐私条款》</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					'background': 'transparent'
				},
				custom1: {
					'background': '#ffffff'
				},
				phone: '',
				yzm: '',
				yqm:'',
				password:'',
				isGX: false,
				isYzmLogin: true,
				checked:false,
			}
		},
		methods: {

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
	.inp2-1{
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
			width: 400rpx;
			border-radius: 10rpx;
			background: #FFFFFF;
			padding: 0 20rpx;
		}

		.txt1 {
			margin-left: 40rpx;
			font-size: 24rpx;
			font-weight: 700;
			color: #ffffff;
		}
	}
	.jzmm{
		position: absolute;
		width: 556rpx;
		top: 888rpx;
		margin: 0 160rpx;
		display: flex;
		align-items: center;
		/deep/ .u-checkbox__label{
			font-size: 24rpx;
			color: #FFFFFF;
		}
		.txt{
			margin-left: 174rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #ffffff;
			text-decoration: underline;
		}
	}
	.inp3.inp2box {
		top: 850rpx;

		.inp2 {
			width: 322rpx;
		}
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
