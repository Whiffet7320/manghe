<template>
	<view>
		<view class="swiper">
			<image :src="$tool.imgUrl(userInfo.avatar)" mode="aspectFill" class="img" v-if="userInfo.uid"></image>
			<u-navbar v-if="scrollTop>100" title="我的" :title-bold="true" back-icon-color="#ffffff" title-color="#ffffff" :background="{backgroundColor: '#562c2c'}" :border-bottom="false"></u-navbar>
			<u-navbar v-else title="我的" :title-bold="true" back-icon-color="#ffffff" title-color="#ffffff" :background="{backgroundColor: 'transparent'}" :border-bottom="false"></u-navbar>
			<view class="bg"></view>
			<view class="info">
				<view class="uinfo" v-if="userInfo.uid" @click="goInfo">
					<view class="avatar user" v-if="userInfo.avatar==''">
						<image src="/static/image/user/user.png" mode="aspectFill" class="avatars"></image>
					</view>
					<image :src="$tool.imgUrl(userInfo.avatar)" mode="aspectFill" class="avatar" v-else></image>
					<view class="name">{{userInfo.nickname||''}}</view>
				</view>
				<view class="uinfo" @click="goLogin" v-else>
					<view class="avatar user">
						<image src="/static/image/user/user.png" mode="aspectFill" class="avatars"></image>
					</view>
					<view class="name">点击登录/注册</view>
				</view>
				<view class="code" v-if="userInfo.invite_code">
					<text>邀请码：{{userInfo.invite_code==''||userInfo.invite_code==null?'00000000':userInfo.invite_code}}</text>
					<view class="btn" @click="$tool.onCopy(userInfo.invite_code)">复制</view>
				</view>
				<view class="set" @click="jump('/pages/user/set/index')">
					<image src="/static/image/icon_set.png" mode="aspectFill" class="icon"></image>
				</view>
			</view>
		</view>
		<view class="jfcode" @click="jump(`/pages/user/jifen/wodejifen?zongjifen=${userInfo.integral}`)">
			<image src="/static/image/jfbg.png" mode="aspectFit" class="img"></image>
			<view class="text">
				<view class="name">小积分 大智慧</view>
				<view class="link">
					<text>点击查看我的积分</text>
					<image src="/static/image/arrow_right2.png" mode="aspectFit" class="icon"></image>
				</view>
			</view>
		</view>
		<view class="menulist">
			<view class="menu_item" @click="jump('/pages/user/order/order')">
				<image src="/static/image/user/m1.png" mode="aspectFit" class="icon"></image>
				<view class="name">我的订单</view>
				<view class="subtit"></view>
				<image src="/static/image/arrow_right.png" mode="aspectFit" class="arrow"></image>
			</view>
			<view class="menu_item" @click="jump('/pages/user/certificate/index')">
				<image src="/static/image/user/m2.png" mode="aspectFit" class="icon"></image>
				<view class="name">实名认证</view>
				<view class="subtit">{{userInfo.realname==null||userInfo.realname==''?'未实名':userInfo.realname.status==0?'待审核':'已认证'}}</view>
				<image src="/static/image/arrow_right.png" mode="aspectFit" class="arrow"></image>
			</view>
			<view class="menu_item" @click="jump(`/pages/user/qianbao/qianbao?now_money=${userInfo.now_money}&integral=${userInfo.integral}`)">
				<image src="/static/image/user/m3.png" mode="aspectFit" class="icon"></image>
				<view class="name">钱包</view>
				<view class="subtit"></view>
				<image src="/static/image/arrow_right.png" mode="aspectFit" class="arrow"></image>
			</view>
			<view class="menu_item" v-if="userInfo.is_bind_bank>0" @click="jump('/pages/user/bank/index')">
				<image src="/static/image/user/m4.png" mode="aspectFit" class="icon"></image>
				<view class="name">银行卡</view>
				<view class="subtit">{{userInfo.is_bind_bank>0?'':'点击去绑定'}}</view>
				<image src="/static/image/arrow_right.png" mode="aspectFit" class="arrow"></image>
			</view>
			<view class="menu_item" v-else @click="jump('/pages/user/bank/detail')">
				<image src="/static/image/user/m4.png" mode="aspectFit" class="icon"></image>
				<view class="name">绑定银行卡</view>
				<view class="subtit">点击去绑定</view>
				<image src="/static/image/arrow_right.png" mode="aspectFit" class="arrow"></image>
			</view>
			<view class="menu_item" @click="jump('/pages/user/address/index')">
				<image src="/static/image/user/m5.png" mode="aspectFit" class="icon"></image>
				<view class="name">收货地址</view>
				<view class="subtit"></view>
				<image src="/static/image/arrow_right.png" mode="aspectFit" class="arrow"></image>
			</view>
			<view class="menu_item" @click="show=true">
				<image src="/static/image/user/m6.png" mode="aspectFit" class="icon"></image>
				<view class="name">联系客服</view>
				<view class="subtit"></view>
				<image src="/static/image/arrow_right.png" mode="aspectFit" class="arrow"></image>
			</view>
			<view class="menu_item" @click="jump('/pages/user/privacy/index')">
				<image src="/static/image/user/m7.png" mode="aspectFit" class="icon"></image>
				<view class="name">隐私条款</view>
				<view class="subtit"></view>
				<image src="/static/image/arrow_right.png" mode="aspectFit" class="arrow"></image>
			</view>
			<view class="menu_item" @click="jump('/pages/user/agreement/index')">
				<image src="/static/image/user/m7.png" mode="aspectFit" class="icon"></image>
				<view class="name">用户协议</view>
				<view class="subtit"></view>
				<image src="/static/image/arrow_right.png" mode="aspectFit" class="arrow"></image>
			</view>
		</view>
		<view class="logout" v-if="isLogin" @click="lshow=true">退出登录</view>
		<page-modal v-model="show" :content="tel" width="466" confirm-text="立即拨打" @confirm="confirm"></page-modal>
		<page-modal v-model="lshow" content="是否确定退出登录？" width="466" confirm-text="确定" @confirm="confirm2"></page-modal>
	</view>
</template>

<script>
	import {mapGetters,mapState} from "vuex";
	import pageModal from "@/components/page-modal";
	export default{
		components:{
			pageModal
		},
		data(){
			return{
				lshow:false,
				show:false,
				userInfo:{},
				code:"",
				scrollTop:0,
				tel:""
			}
		},
		computed: {
			...mapGetters(['isLogin']),
			...mapState(['onResh'])
		},
		methods:{
			getInfo(){
				this.$api.product().then(res => {
					if(res.code==200){
						this.tel = res.data.kefu_phone;
					}
				});
			},
			async getUserInfo() {
				await this.$api.userInfo().then(res => {
					if(res.code==200){
						this.userInfo = res.data;
						this.$store.commit("UpdateUserinfo",res.data);
						this.$store.commit('SetUid', res.data.uid);
					}else{
						uni.navigateTo({
							url:"/pages/login/login"
						})
					}
				});
			},
			goLogin(){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			},
			jump(url){
				if(!this.isLogin){
					uni.navigateTo({
						url:"/pages/login/login"
					})
					return;
				}
				uni.navigateTo({
					url:url
				})
			},
			goInfo(){
				uni.navigateTo({
					url:"/pages/user/set/index"
				})
			},
			confirm(){
				if(this.tel==""){
					this.$u.toast("暂未绑定电话号码");
					return false;
				}
				uni.makePhoneCall({
					phoneNumber: this.tel,
					success: (res) => {
						console.log(res)
					}
				})
			},
			confirm2(){
				uni.clearStorageSync();
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}
		},
		onLoad(){
			this.getInfo();
		},
		onShow(){
			if(this.isLogin){
				this.getUserInfo();
			}
			if(this.onResh){
				this.getUserInfo();
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
	}
</script>
<style>
	page{
		background-color: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.swiper{
		width: 100%;
		height: 560rpx;
		position: relative;
		.img{
			width: 100%;
			height: 100%;
			position: absolute;
			top:0;
			left:0;
			z-index: 20;
		}
		.bg{
			width: 100%;
			height: 100%;
			background: rgba(38,2,2,0.82);
			position: absolute;
			top:0;
			left:0;
			z-index: 30;
		}
		.info{
			position: relative;
			z-index: 40;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			.uinfo{
				display: flex;
				align-items: center;
				flex-direction: column;
			}
			.avatar{
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				margin-top: 40rpx;
			}
			.user{
				background-color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
				.avatars{
					width: 100rpx;
					height: 100rpx;
				}
			}
			.name{
				font-size: 36rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				color: #f7f8fa;
				padding: 34rpx 0 16rpx 0;
			}
			.code{
				display: flex;
				align-items: center;
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				color: #f7f8fa;
				.btn{
					margin-left: 36rpx;
					width: 88rpx;
					height: 42rpx;
					line-height: 42rpx;
					background: #d61d1d;
					border-radius: 8rpx;
					text-align: center;
				}
			}
			.set{
				position: absolute;
				top:50rpx;
				right:40rpx;
				.icon{
					width: 43rpx;
					height: 40rpx;
				}
			}
		}
	}
	.jfcode{
		padding:20rpx 30rpx 0;
		position: relative;
		.img{
			width: 688rpx;
			height: 218rpx;
		}
		.text{
			position: absolute;
			top:72rpx;
			right:96rpx;
			.name{
				font-size: 44rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				color: #d61d1d;
				margin-bottom: 8rpx;
			}
			.link{
				display: flex;
				align-items: center;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				color: #d61d1d;
				justify-content: center;
				.icon{
					margin-left: 16rpx;
					width: 13rpx;
					height: 23rpx;
				}
			}
		}
	}
	.menulist{
		padding: 0 30rpx;
		.menu_item{
			display: flex;
			align-items: center;
			width: 100%;
			height: 100rpx;
			border-bottom: 2rpx #f2f2f2 solid;
			.icon{
				width: 60rpx;
				height: 60rpx;
			}
			.name{
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				color: #010101;
				padding-left: 20rpx;
			}
			.subtit{
				flex:1;
				text-align: right;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				color: #808080;
			}
			.arrow{
				margin-left: 19rpx;
				width: 20rpx;
				height: 35rpx;
			}
		}
	}
	.logout{
		margin:50rpx auto;
		width: 248rpx;
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		background: #d61d1d;
		border-radius: 8rpx;
		font-size: 28rpx;
		font-family: PingFang SC, PingFang SC-Bold;
		font-weight: 700;
		color: #ffffff;
	}
</style>
