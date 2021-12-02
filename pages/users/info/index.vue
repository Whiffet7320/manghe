<template>
	<view class="container">
		<view class="cellwrap">
			<text>头像</text>
			<view class="avatar">
				<image :src="userInfo.avatar" mode="aspectFit" class="icon"></image>
				<view class="photo" v-if="pshow" @click='uploadpic'>
					<image src="/static/image/user/ico_photo.png" mode="aspectFit" class="imgs"></image>
				</view>
			</view>
		</view>
		<view class="celllist">
			<view class="cell">
				<view class="left">昵称</view>
				<view class="right" v-if="show">{{userInfo.nickname}}</view>
				<view class="right" v-if="edshow">
					<input type="text" v-model="userInfo.nickname" class="ipt" placeholder="请输入昵称" />
				</view>
			</view>
			<view class="cell">
				<view class="left">手机号</view>
				<view class="right">
					<view class="light" v-if="!userInfo.phone" @click="bindPhone">去绑定</view>
					<view class="u-flex" v-else>{{userInfo.phone}}<view class="light change" @click="hbindPhone">换绑</view></view>
				</view>
			</view>
			<view class="cell">
				<view class="left">性别</view>
				<view class="right" v-if="show">{{sex}}</view>
				<view class="right" @click="sexShow=true" v-if="edshow">
					<text>{{sex==""?"请选择":sex}}</text>
					<image src="/static/image/user/arrow_right.png" mode="aspectFit" class="icon"></image>
				</view>
			</view>
			<view class="cell">
				<view class="left">生日</view>
				<view class="right" v-if="show">{{birthday}}</view>
				<view class="right" @click="birShow=true" v-if="edshow">
					<text>{{birthday==''?"请选择":birthday}}</text>
					<image src="/static/image/user/arrow_right.png" mode="aspectFit" class="icon"></image>
				</view>
			</view>
		</view>
		<view class="btn" v-if="show" @click="onEdit">编辑</view>
		<view class="btn" v-if="edshow" @click="onSubmit">保存</view>
		<u-action-sheet :list="sexlist" v-model="sexShow" :cancel-btn="true" @click="sexChange"></u-action-sheet>
		<u-picker v-model="birShow" mode="time" confirm-color="#BD9E81" @confirm="birChange"></u-picker>
	</view>
</template>

<script>
	import {mapGetters} from "vuex";
	export default{
		data(){
			return{
				userInfo: {},
				show:true,
				edshow:false,
				sexShow:false,
				birShow:false,
				pshow:false,
				sex:"",
				birthday:"",
				curbir:0,
				sexlist:[
					{
						text:"男",
						color:"#707070",
						fontSize:28
					},
					{
						text:"女",
						color:"#707070",
						fontSize:28
					}
				]
			}
		},
		computed:{
			...mapGetters(['isLogin'])
		},
		watch:{
			isLogin:{
				handler(newV,oldV){
					if(newV){
						this.getUserInfo();
					}
				},
				deep:true
			}
		},
		methods:{
			bindPhone(){
				uni.navigateTo({
					url:"/pages/users/info/bind"
				})
			},
			hbindPhone(){
				uni.navigateTo({
					url:"/pages/users/info/hbind"
				})
			},
			sexChange(index){
				this.sex = this.sexlist[index].text;
			},
			birChange(val){
				let data = val.year+"-"+val.month+"-"+val.day;
				this.birthday = data;
			},
			onEdit(){
				this.show = false;
				this.edshow = true;
				this.pshow = true;
			},
			getUserInfo(){
				this.$api.getUserInfo().then(res => {
					if(res.status==200){
						this.userInfo = res.data;
						this.sex = res.data.sex==1?"男":res.data.sex==2?"女":"";
						this.birthday = res.data.birthday==0?"":this.$u.timeFormat(res.data.birthday*1000, 'yyyy-mm-dd');
					}
				});
			},
			uploadpic() {
				this.$tool.uploadImageOne('upload/image',(res)=>{
					if(res.status==200){
						this.userInfo.avatar = res.data.url;
						this.pshow = false;
					}
				});
			},
			onSubmit(){
				if (!this.userInfo.nickname){
					this.$u.toast("用户姓名不能为空");
					return
				}
				let userInfo = {
					nickName:this.userInfo.nickname,
					avatar:this.userInfo.avatar,
					sex:this.sex=="男"?1:this.sex=="女"?2:0,
					birthday:Math.round(new Date(this.birthday) / 1000)
				}
				this.$api.userEdit({userInfo:userInfo}).then(res => {
					this.$u.toast(res.msg);
					setTimeout(()=> {
						uni.navigateBack();
					}, 1500);
				}).catch(msg => {
					this.$u.toast(msg || '保存失败，您并没有修改');
					setTimeout(()=> {
						uni.navigateBack();
					}, 1500);
				});
			}
		},
		onLoad(){
			if(this.isLogin){
				this.getUserInfo();
			}
		}
	}
</script>
<style>
	page{
		background: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.cellwrap{
		width: 100%;
		height: 140rpx;
		padding:0 40rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #707070;
		.avatar{
			width: 100rpx;
			height: 100rpx;
			position: relative;
			.icon{
				width: 100%;
				height: 100%;
				background-color: #eee;
				border-radius: 20rpx;
			}
			.photo{
				position: absolute;
				top:0;
				left:0;
				z-index: 20;
				.imgs{
					width: 100rpx;
					height: 100rpx;
				}
			}
		}
	}
	.celllist{
		margin-top: 20rpx;
		background: #FFFFFF;
		.cell{
			display: flex;
			align-items: center;
			margin-left: 40rpx;
			padding:40rpx 40rpx 40rpx 0;
			border-bottom: 2rpx solid #F9F9F9;
			font-size: 28rpx;
			font-family: PingFang SC;
			color: #707070;
			&:last-child{
				border:0;
			}
			.left{
				font-weight: 500;
				flex:1;
			}
			.right{
				display: flex;
				align-items: center;
				.light{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #BD9E81;
				}
				.change{
					margin-left: 20rpx;
				}
				.ipt{
					font-size: 28rpx;
					font-family: PingFang SC;
					color: #707070;
					text-align: right;
				}
				.icon{
					width: 10rpx;
					height: 18rpx;
					margin-left: 26rpx;
				}
			}
		}
	}
	.btn{
		margin:0 auto;
		margin-top: 88rpx;
		width: 522rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #BD9E81;
		border-radius: 10rpx;
		text-align: center;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
</style>
