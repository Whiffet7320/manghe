<template>
	<view>
		<view class="collect_list">
			<view class="collect_item" v-for="(item,index) in list" :key="index" @click="goDetail(item)">
				<image :src="item.image" mode="aspectFill" class="img"></image>
				<view class="left">
					<view class="name">{{item.store_name}}</view>
					<view class="sname"></view>
					<view class="ft">
						<view class="price">¥{{item.ot_price||0}}</view>
						<view class="sprice">¥{{item.price||0}}</view>
					</view>
				</view>
				<view class="right" @click.stop="onCancel(item,index)">
					<image src="/static/image/user/icon_follow.png" mode="aspectFit" class="icon"></image>
				</view>
			</view>
		</view>
		<u-loadmore v-if="!empty" height="80rpx" font-size="20" :status="loadStatus" icon-type="flower" color="#707070" />
		<Dialog v-if="show" @close="onClose">
			<view class="modcontent">确定取消收藏“{{name}}”吗</view>
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
				empty:false,
				name:"",
				id:0,
				cindex:0,
				show:false,
				list:[],
				loadStatus: 'loadmore',
				currentPage: 1
			}
		},
		methods:{
			getlist(){
				let list = [];
				this.loadStatus = 'loading';
				this.$api.userCollect({page:this.currentPage,limit:10}).then((res)=>{
					if(res.status==200){
						if (res.data.length == 0) {
							this.loadStatus = 'nomore';
						} else {
							if(this.currentPage==1 && res.data.length<=10){
								this.loadStatus = 'nomore';
							}else{
								this.loadStatus = 'loadmore';
							}
							this.currentPage++;
							this.list = this.list.concat(res.data);
						}
					}
				}).catch((err)=>{
					this.$u.toast(err);
				})
			},
			onCancel(val,index){
				this.show = !this.show;
				this.id = val.product_id;
				this.cindex = index;
				this.name = val.store_name;
			},
			onClose(val){
				if(val==="confirm"){
					this.$api.collectDel(this.id).then((res)=>{
						if(res.status==200){
							this.$u.toast("取消成功");
							this.list.splice(this.cindex,1);
						}else{
							this.$u.toast(res.msg);
						}
					}).catch((err)=>{
						this.$u.toast(err);
					})
				}
				this.show = !this.show;
			},
			goDetail(val){
				uni.navigateTo({
					url:`/pages/index/search/xiangqin?title=${val.store_name}&id=${val.product_id}`
				})
			}
		},
		onLoad(){
			this.getlist();
		},
		onReachBottom() {
			this.getlist();
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
	.collect_list{
		.collect_item{
			padding: 24rpx 36rpx;
			background-color: #FFFFFF;
			margin-bottom: 20rpx;
			display: flex;
			.img{
				width: 140rpx;
				height: 140rpx;
				background-color: #eee;
				border-radius: 20rpx;
			}
			.left{
				flex:1;
				padding-left: 24rpx;
				display: flex;
				flex-direction: column;
				.name{
					font-size: 32rpx;
					color: #707070;
				}
				.sname{
					padding:10rpx 0 8rpx 0;
					font-size: 24rpx;
					color: #707070;
					height: 34rpx;
				}
				.ft{
					display: flex;
					align-items: center;
				}
				.price{
					font-size: 32rpx;
					color: #FA8677;
					font-weight: bold;
				}
				.sprice{
					padding-left: 20rpx;
					text-decoration: line-through;
					font-size: 24rpx;
					color: #707070;
				}
			}
			.right{
				.icon{
					width: 45rpx;
					height: 44rpx;
				}
			}
		}
	}
</style>
