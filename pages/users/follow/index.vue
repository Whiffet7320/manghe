<template>
	<view>
		<view class="follow_list">
			<view class="follow_item" v-for="(item,index) in list" :key="index" @click="goDetail(item.doctor_id)">
				<image :src="item.doctor_info.doctor_img" mode="aspectFill" class="avatar"></image>
				<view class="name">{{item.doctor_info.doctor_name}}</view>
				<view class="right" @click.stop="onCancel(item,index)">
					<image src="/static/image/user/icon_follow.png" mode="aspectFit" class="icon"></image>
					<text>取消关注</text>
				</view>
			</view>
		</view>
		<u-loadmore v-show="!isEmpty" height="80rpx" font-size="20" :status="loadStatus" icon-type="flower" color="#707070" />
		<Dialog v-if="show" @close="onClose">
			<view class="modcontent">确定取消关注“{{name}}”吗</view>
		</Dialog>
	</view>
</template>

<script>
	import Dialog from "@/components/dialog/dialog.vue";
	export default{
		components:{
			Dialog
		},
		data(){
			return{
				isEmpty: false,
				name:"",
				id:0,
				cindex:0,
				show:false,
				list:[],
				reload: true,
				loadStatus: 'loadmore',
				currentPage: 1,
				lastPage: 1
			}
		},
		methods:{
			getlist(){
				let list = [];
				this.loadStatus = 'loading';
				this.$api.collectDoctorlist({page:this.currentPage,limit:10}).then((res)=>{
					if(res.status==200){
						list = res.data;
						this.list = [...this.list, ...list];
						this.isEmpty = !this.list.length;
						this.lastPage = res.data.last_page;
						this.loadStatus = this.currentPage < res.data.last_page ? 'loadmore' : 'nomore';
					}
				})
			},
			onCancel(val,index){
				this.show = !this.show;
				this.id = val.doctor_id;
				this.cindex = index;
				this.name = val.doctor_info.doctor_name;
			},
			onClose(val){
				if(val==="confirm"){
					this.$api.collectDoctor(this.id).then((res)=>{
						if(res.status==200){
							this.$u.toast("取消成功");
							this.list.splice(this.cindex,1);
						}else{
							this.$u.toast(res.message);
						}
					})
				}
				this.show = !this.show;
			},
			goDetail(id){
				uni.navigateTo({
					url:"/pages/index/zhuanjiatuandui/zhuanjiatuandui?id="+id
				})
			}
		},
		onLoad() {
			this.getlist();
		},
		onReachBottom() {
			if (this.currentPage < this.lastPage) {
				this.currentPage += 1;
				this.getlist();
			}
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		}
	}
</script>
<style>
	page{
		background: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.follow_list{
		.follow_item{
			width: 100%;
			background-color: #FFFFFF;
			padding:28rpx 30rpx;
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			.avatar{
				width: 112rpx;
				height: 112rpx;
				border-radius: 50%;
				background-color: #eee;
			}
			.name{
				flex:1;
				padding-left: 24rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #BD9E81;
			}
			.right{
				display: flex;
				align-items: center;
				flex-direction: column;
				font-size: 20rpx;
				font-family: PingFang SC;
				color: #707070;
				.icon{
					width: 45rpx;
					height: 44rpx;
					margin-bottom: 8rpx;
				}
			}
		}
	}
	.modcontent{
		font-size: 28rpx;
		font-family: PingFang SC;
		color: #000000;
	}
</style>
