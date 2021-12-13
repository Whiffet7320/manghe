<template>
	<view class="index">
		<view class="nav1">
			<view class="nav1-flex">
				<image class="pic" :src="userInfo.avatar" mode="aspectFill" v-if="userInfo.avatar" @click="onSet"></image>
				<u-avatar size="184" @click="goLogin" v-else></u-avatar>
				<view class="f-right">
					<view class="tit1" v-if="userInfo.uid">
						<view class="txt1">{{userInfo.nickname}}</view>
						<view @click="onSet">
							<image src="/static/image/zu1528.png" class="f-r-pic1" mode="aspectFit"></image>
						</view>
					</view>
					<view @click="goLogin" v-if="!userInfo.uid">请登录/注册</view>
					<view class="tit2">
						<view class="item" @click="onFollow">
							<view class="txt1">{{userInfo.special_doctor_num||0}}</view>
							<view class="txt2">关注医生</view>
						</view>
						<view class="shu"></view>
						<view class="item" @click="onComment">
							<view class="txt1">{{userInfo.product_reply_num||0}}</view>
							<view class="txt2">我的评论</view>
						</view>
						<view class="shu"></view>
						<view class="item" @click="onCollect">
							<view class="txt1">{{userInfo.collect_count||0}}</view>
							<view class="txt2">我的收藏</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="uc">
			<view class="uc-item">
				<view class="uc-item-title" @click="gotoOrder('')">
					<view class="uc-item-title-text">我的订单</view>
					<image class="uc-item-title-icon" src="../../static/image/user/jiantou.png"></image>
				</view>
				<view class="uc-item-body">
					<view class="uc-item-body-item" @click='gotoOrder(1)'>
						<view class="pic">
							<image src="../../static/image/user/daifukuan.png" mode="aspectFit" style="width: 46rpx;height: 45rpx;"></image>
							<u-badge bgColor="#BD9E81" :count="userInfo.orderStatusNum.unpaid_count" :offset="[-12,-16]" v-if="userInfo.orderStatusNum"></u-badge>
						</view>
						<view class="uc-item-body-item-text">待付款</view>
					</view>
					<view class="uc-item-body-item" @click='gotoOrder(2)'>
						<view class="pic">
							<image src="../../static/image/user/daifuweikuan.png" mode="aspectFit" style="width: 46rpx;height: 45rpx;"></image>
							<u-badge bgColor="#BD9E81" :count="userInfo.weikuan_num" :offset="[-12,-16]" v-if="userInfo.weikuan_num"></u-badge>
						</view>
						<view class="uc-item-body-item-text">待付尾款</view>
					</view>
					<view class="uc-item-body-item" @click='gotoOrder(3)'>
						<view class="pic">
							<image src="../../static/image/user/yiwancheng.png" mode="aspectFit" style="width: 46rpx;height: 45rpx;"></image>
						</view>
						<view class="uc-item-body-item-text">已完成</view>
					</view>
					<view class="uc-item-body-item" @click='gotoOrder(4)'>
						<view class="pic">
							<image src="../../static/image/user/yiguanbi.png" mode="aspectFit" style="width: 46rpx;height: 46rpx;"></image>
						</view>
						<view class="uc-item-body-item-text">已关闭</view>
					</view>
				</view>
			</view>
			
			<view class="uc-item">
				<view class="uc-item-title">
					<view class="uc-item-title-text">其他功能</view>
					<image class="uc-item-title-icon" src="../../static/image/user/jiantou.png"></image>
				</view>
				
				<view class="uc-item-body">
					<view class="uc-item-body-item" @click="goAddress">
						<image src="../../static/image/user/dizhiguanli.png" mode="aspectFit" style="width:36rpx;height:38rpx;"></image>
						<view class="uc-item-body-item-text">地址管理</view>
					</view>
					
					<view class="uc-item-body-item" @click="onShare">
						<image src="../../static/image/user/fenxiangma.png" mode="aspectFit" style="width:37rpx;height:37rpx;"></image>
						<view class="uc-item-body-item-text">分享码</view>
					</view>
					
					<view class="uc-item-body-item" @click="onMeet">
						<image src="../../static/image/user/wodeyuyue.png" mode="aspectFit" style="width:34rpx;height:37rpx;"></image>
						<view class="uc-item-body-item-text">我的预约</view>
					</view>
					
					<view class="uc-item-body-item" @click="onPoint">
						<image src="../../static/image/user/wodejifen.png" mode="aspectFit" style="width:42rpx;height:37rpx;"></image>
						<view class="uc-item-body-item-text">我的积分</view>
					</view>
					
					<view class="uc-item-body-item" @click="onPointOrder">
						<image src="../../static/image/user/jifendingdan.png" mode="aspectFit" style="width:32rpx;height:37rpx;"></image>
						<view class="uc-item-body-item-text">积分订单</view>
					</view>
					
					<view class="uc-item-body-item" @click="onTeam">
						<image src="../../static/image/user/wodetuandui.png" mode="aspectFit" style="width:44rpx;height:37rpx;"></image>
						<view class="uc-item-body-item-text">我的团队</view>
					</view>
					
				</view>
			</view>
			
			<view class="uc-item">
				<view class="uc-item-last">
					<view class="uc-item-last-item" @click="onCall">
						<image src="../../static/image/user/dianhua.png" mode="aspectFit" style="width: 26rpx;height:34rpx;"></image>
						<view class="uc-item-last-item-text">
							电话咨询
						</view>
						<image class="icon" src="../../static/image/user/icon_right.png"></image>
					</view>
					<view class="uc-item-last-item">
						<button class="u-reset-button contactbtn" open-type="contact">
							<image src="../../static/image/user/kefu.png" mode="aspectFit" style="width: 30rpx;height:30rpx;"></image>
							<view class="uc-item-last-item-text">
								专属客服
							</view>
							<image class="icon" src="../../static/image/user/icon_right.png"></image>
						</button>
					</view>
				</view>
			</view>
			<view class="form-button" v-if="isLogin" @click="logout">退出登录</view>
			<u-gap height="80"></u-gap>
		</view>
		<u-action-sheet :list="calllist" v-model="phoneShow" :cancel-btn="true" @click="callClick"></u-action-sheet>
	</view>
</template>

<script>
	import {mapGetters} from "vuex";
	export default {
		data() {
			return {
				userInfo:{},
				phoneShow:false,
				calllist:[
					{
						subText:"",
						color: '#A8A8A8',
						fontSize: 24
					},
					{
						text:'呼叫'
					}
				],
				phone:""
			}
		},
		computed: {
			...mapGetters(['isLogin'])
		},
		methods: {
			goLogin(){
				uni.navigateTo({
					url:"/pages/login/index"
				})
			},
			jump(url){
				if(!this.isLogin){
					uni.navigateTo({
						url:"/pages/login/index"
					})
					return;
				}
				uni.navigateTo({
					url:url
				})
			},
			onSet(){
				this.jump("/pages/users/info/index");
			},
			onFollow(){
				this.jump("/pages/users/follow/index");
			},
			onComment(){
				this.jump("/pages/users/comment/index");
			},
			onCollect(){
				this.jump("/pages/users/collect/index");
			},
			onTeam(){
				this.jump("/pages/users/team/index");
			},
			onShare(){
				uni.navigateTo({
					url:`/pages/users/share/index?code=${this.userInfo.spread_code}`
				})
			},
			onMeet(){
				this.jump("/pages/users/subscribe/index");
			},
			onPoint(){
				this.jump("/pages/users/integral/index");
			},
			onPointOrder(){
				this.jump("/pages/users/integral/order");
			},
			onCall(){
				if(this.userInfo.phone==""){
					this.$u.toast("暂未绑定手机号");
					return false;
				}
				this.phoneShow = !this.phoneShow;
				this.calllist[0].subText = this.userInfo.phone;
			},
			callClick(index){
				if(index==1){
					this.CallPhone(this.userInfo.phone);
					this.phoneShow = !this.phoneShow;
				}
			},
			//呼叫
			CallPhone(value) {
				uni.makePhoneCall({
					phoneNumber: value,
					success: (res) => {
						console.log(res)
					}
				})
			},
			gotoOrder(index){
				this.jump("/pages/users/order/list?type="+index);
			},
			goAddress(){
				this.jump("/pages/users/address/index");
			},
			logout(){
				uni.clearStorageSync();
				uni.reLaunch({
					url:"/pages/tabBar/index"
				})
			},
			getUserInfo() {
				this.$api.getUserInfo().then(res => {
					if(res.status==200){
						this.userInfo = res.data;
						this.$store.commit("UpdateUserinfo",res.data);
						this.$store.commit('SetUid', res.data.uid);
					}
				});
			}
		},
		onShow(){
			this.getUserInfo();
		}
	}
</script>

<style lang="scss">
	page {
		background: #f7f8fa;
	}
</style>
<style lang="scss" scoped>
	.form-button{
		width: 522rpx;
		height: 80rpx;
		background: #BD9E81;
		opacity: 1;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 88rpx auto 0 auto;
		color: #FFFFFF;
	}
	.uc{
		display: flex;
		flex-direction: column;
		margin:0 24rpx;
		.uc-item{
			background-color: #FFFFFF;
			border-radius: 10rpx;
			margin-top: 26rpx;
			&:first-child{
				margin-top: -26rpx;
			}
			.uc-item-title{
				padding:28rpx;
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color:#BD9E81;
				.uc-item-title-icon{
					width: 13rpx;
					height: 23rpx;
				}
			}
			
			.uc-item-body{
				display: flex;
				flex-wrap:wrap;
				.uc-item-body-item{
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 25%;
					margin-bottom:28rpx;
					.pic{
						position: relative;
					}
					.uc-item-body-item-text{
						margin-top: 12rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #707070;
					}
				}
			}
			
			.uc-item-last-item{
				padding:0 40rpx 0 0;
				margin-left: 42rpx;
				border-bottom: 2rpx #F9F9F9 solid;
				height: 96rpx;
				display: flex;
				align-items: center;
				&:last-child{
					border:0;
				}
				
				.uc-item-last-item-icon{
					width: 26rpx;
					height: 34rpx;
				}
				.uc-item-last-item-text{
					padding-left: 18rpx;
					flex:1;
				}
				.icon{
					width: 13rpx;
					height: 24rpx;
				}
				.contactbtn{
					width: 100%;
					display: flex;
					align-items: center;
					text-align: left;
				}
			}
		}
	}
	.nav1 {
		width: 750rpx;
		height: 298rpx;
		background: linear-gradient(316deg, #F6A309 0%, #F8B607 22%, #FFD438 42%, #F9C706 51%, #F8CA20 80%, #FECF05 100%);
		padding: 0 36rpx;
		.nav1-flex {
			padding-top: 40rpx;
			display: flex;
			align-items: center;
			.pic {
				width: 184rpx;
				height: 184rpx;
				border-radius: 50%;
				margin-right: 20rpx;
				background-color: #eee;
			}
			.f-right{
				height: 184rpx;
				display: flex;
				flex: 1;
				flex-direction: column;
				.tit1{
					display: flex;
					align-items: center;
					justify-content: space-between;
					.txt1{
						font-size: 36rpx;
						font-weight: bold;
						line-height: 50rpx;
						color: #122106;
					}
					.f-r-pic1{
						width: 40rpx;
						height: 40rpx;
					}
				}
				.tit2{
					margin-top: 38rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.shu{
						width: 0rpx;
						height: 56rpx;
						border: 2rpx solid #FFFFFF;
						opacity: 0.2;
					}
					.item{
						display: flex;
						flex-direction: column;
						align-items: center;
						height: 96rpx;
						.txt1{
							font-size: 32rpx;
							font-weight: 800;
							line-height: 44rpx;
							color: #122106;
						}
						.txt2{
							margin-top: 12rpx;
							font-size: 28rpx;
							font-weight: 500;
							line-height: 40rpx;
							color: #122106;
						}
					}
				}
			}
		}
	}
</style>