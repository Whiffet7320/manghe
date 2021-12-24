<template>
	<view class="index">
		<image src="/static/image/zu3029.png" class="bacImg" mode=""></image>
		<u-navbar :title-bold='true' :background='background' :border-bottom='false' title-color='#000000' :is-back="false" title-size='34'>
			<view class="slot-wrap">
				<image @click="toShouye" src="/static/image/lujin2814.png" class="home" mode=""></image>
			</view>
		</u-navbar>
		<image src="/static/image/zu2711.png" class="pic1" mode=""></image>
		<view class="txt1">Welcome</view>
		<button class="btn1" @tap="getUserProfile">微信用户一键登录</button>
		<view @click="tozhuce" class="txt2">密码/验证码登录</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				background: {
					'background': 'transparent'
				},
				infoRes:"",
				btnShow:false,
				iv:'',
				phoneData:'',
			}
		},
		methods:{
			tozhuce(){
				uni.navigateTo({
					url:'/pages/login/zhuce'
				})
			},
			toShouye(){
				uni.navigateTo({
					url:'/pages/tabBar/index'
				})
			},
			getUserProfile() {
				uni.showLoading({
					title: '正在登录中'
				});
				let infoRes = "";
				if (uni.getUserProfile) {
					uni.getUserProfile({
						desc: '登录',
						success: (res) => {
							infoRes = res;
							let userInfo = res.userInfo;
							userInfo.spread_spid = getApp().globalData.spid; //获取推广人ID
							userInfo.spread_code = getApp().globalData.code; //获取推广人分享二维码ID
							uni.login({
								provider: 'weixin',
								success: (loginres) => {
									this.$api.loginWechat({
										code:loginres.code,
										userinfo:userInfo,
										invite_code: uni.getStorage('scencLid') ? uni.getStorage('scencLid') : '',
									}).then(res => {
										uni.hideLoading();
										if (res.data.token !== undefined && res.data.token) {
											uni.hideLoading();
											this.$store.commit('Login', {token: res.data.token});
											uni.setStorageSync("token", res.data.token);
											this.$u.toast("登录成功");
											setTimeout(()=>{
												uni.navigateBack({
													delta: 1
												})
											},1500)
										}
									}).catch(err => {
										uni.hideLoading();
										console.log(err)
									});
								}
							});
						},
						fail: (err) => {
							console.log(err);
							uni.hideLoading();
							this.$u.toast("取消授权");
						}
					})
				} else {
					uni.hideLoading();
					this.$u.toast("取消授权");
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		position: relative;
	}
	.bacImg{
		position: absolute;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 100vh;
	}
	.home{
		margin-left: 48rpx;
		width: 34rpx;
		height: 34rpx;
	}
	.pic1{
		position: absolute;
		top: 474rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 112rpx;
		height: 112rpx;
	}
	.txt1{
		position: absolute;
		top: 598rpx;
		left: 50%;
		transform: translateX(-50%);
		font-size: 64rpx;
		font-weight: 500;
		color: #ffffff;
	}
	.btn1{
		position: absolute;
		top: 802rpx;
		border-radius: 16rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 530rpx;
		height: 84rpx;
		background: #ffffff;
		font-size: 28rpx;
		font-weight: 600;
		text-align: center;
		line-height: 84rpx;
		color: #000000;
	}
	.txt2{
		position: absolute;
		top: 914rpx;
		border-radius: 16rpx;
		left: 50%;
		transform: translateX(-50%);
		font-size: 28rpx;
		font-family: PingFang SC, PingFang SC-Medium;
		font-weight: 500;
		color: #ffffff;
	}
</style>
