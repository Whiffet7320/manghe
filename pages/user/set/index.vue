<template>
	<view>
		<view class="cellbox">
			<view class="cellitem">
				<view class="name">我的头像</view>
				<view class="pic" @click="uploadpic">
					<image :src="$tool.imgUrl(userInfo.avatar)" mode="aspectFill" class="avatar"></image>
				</view>
				<image src="/static/image/arrow_right.png" mode="aspectFit" class="icon"></image>
			</view>
			<view class="cellitem" @click="goUname">
				<view class="name">我的昵称</view>
				<view class="desc">{{userInfo.nickname}}</view>
				<image src="/static/image/arrow_right.png" mode="aspectFit" class="icon"></image>
			</view>
			<!-- <view class="cellitem" @click="goPwd">
				<view class="name">登陆密码</view>
				<view class="desc">{{userInfo.pwd==''?'设置登陆密码':"修改登陆密码"}}</view>
				<image src="/static/image/arrow_right.png" mode="aspectFit" class="icon"></image>
			</view> -->
			<view class="cellitem" @click="toZhifumima">
				<view class="name">支付密码</view>
				<view class="desc">{{myUserInfo.pay_pwd ? '已设置支付密码':'设置支付密码'}}</view>
				<image src="/static/image/arrow_right.png" mode="aspectFit" class="icon"></image>
			</view>
			<view class="cellitem" @click="clearfileSize">
				<view class="name">清理缓存</view>
				<view class="desc">{{fileSizeString}}</view>
				<image src="/static/image/arrow_right.png" mode="aspectFit" class="icon"></image>
			</view>
		</view>
		<u-popup v-model="show" mode="center" border-radius="16" width="466rpx" height="238rpx">
			<view class="modcon">
				<u-icon name="checkmark-circle" color="#D61D1D" size="62"></u-icon>
				<text class="text">你已成功清理{{fileSizeString}}内存</text>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	export default {
		data() {
			return {
				avatar: "",
				fileSizeString: "0B",
				show: false,
				myUserInfo: null
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods:{
			uploadpic(){
				this.$tool.uploadImageOne("upload_pic",(res)=>{
					if(res.code==200){
						let avatar = res.data.path;
						this.$api.updateUserInfo({avatar:avatar}).then((res)=>{
							if(res.code==200){
								this.userInfo.avatar = res.data.path;
								this.$store.commit("UpdateUserinfo",this.userInfo);
								this.$u.toast("上传成功");
							}else{
								this.$u.toast(res.message);
							}
						})
					}else{
						this.$u.toast(res.message);
					}
				});
			},
			goUname(){
				uni.navigateTo({
					url:"/pages/user/set/uname"
				})
			},
			goPwd(){
				if(this.userInfo.pwd==''){
					uni.navigateTo({
						url:"/pages/user/set/pwd"
					})
				}else{
					uni.navigateTo({
						url:"/pages/user/set/pwd?type=1"
					})
				}
			},
			goPaywd(){
				uni.navigateTo({
					url:"/pages/user/tixian/zhifumima"
				})
			},
			clearfileSize() {
				uni.clearStorageSync();
				this.$store.commit('Login',  {token: null});
				this.show = true;
				setTimeout(() => {
					this.show = false;
					this.fileSizeString = "0B";
				}, 800)
			},
			toZhifumima(){
				uni.navigateTo({
					url: `/pages/user/set/zhifumima?isShezhi=${this.myUserInfo.pay_pwd?'yes':'no'}`
				})
			}
		},
		onLoad() {
			this.fileSizeString = uni.getStorageInfoSync().currentSize + "Kb";
		},
		async onShow(){
			const res = await this.$api.userInfo()
			this.myUserInfo = res.data;
		}
	}
</script>

<style lang="scss" scoped>
	.cellbox {
		.cellitem {
			display: flex;
			align-items: center;
			border-bottom: 2rpx solid #f2f2f2;
			margin: 0 30rpx;
			padding: 32rpx 0 22rpx 0;

			&:last-child {
				border-bottom: 0;
			}
			.pic{
				flex:1;
				display: flex;
				justify-content: flex-end;
				width: 100rpx;
				height: 100rpx;
				.avatar{
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}
			}

			.name {
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				color: #000000;
			}

			.desc {
				flex: 1;
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: right;
				color: #808080;
			}

			.icon {
				width: 20rpx;
				height: 35rpx;
				margin-left: 26rpx;
			}
		}
	}

	.modcon {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;

		.text {
			margin-top: 32rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			color: #000000;
		}
	}
</style>
