<template>
	<view class="comment_list">
		<view class="comment_item" v-for="(item,index) in list" :key="index">
			<view class="hd">
				<image :src="item.image" mode="aspectFill" class="img"></image>
				<view class="info">
					<view class="fnwrap">
						<view class="name">{{item.store_name}}</view>
						<view class="status">{{item.status|orderStatus}}</view>
					</view>
					<view class="price">￥ {{item.price}}</view>
					<view class="number">共{{item.number||1}}件</view>
				</view>
			</view>
			<view class="ft">
				<view class="combtn" @click="goDetail(item)">查看评价</view>
				<view class="combtn default" @click="goproDetail(item.product_id)">再来一单</view>
			</view>
		</view>
		<u-loadmore height="80rpx" font-size="20" :status="loadStatus" icon-type="flower" color="#707070" />
		<view v-if="list.length==0">
			<page-empty></page-empty>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import pageEmpty from "@/components/page-empty/page-empty";
	export default{
		components:{
			pageEmpty
		},
		data(){
			return{
				list:[],
				loadStatus: 'loadmore',
				currentPage: 1
			}
		},
		filters:{
			orderStatus(status){
				switch(status){
					case 0:
						return "已取消";
					break;
				}
			}
		},
		methods:{
			getlist(){
				let list = [];
				this.loadStatus = 'loading';
				this.$api.myCommentList({page:this.currentPage,limit:10}).then((res)=>{
					if(res.status==200){
						if (res.data.data.list.length == 0) {
							this.loadStatus = 'nomore';
						} else {
							if(this.currentPage==1 && res.data.data.list.length<=10){
								this.loadStatus = 'nomore';
							}else{
								this.loadStatus = 'loadmore';
							}
							this.currentPage++;
							this.list = this.list.concat(res.data.data.list);
						}
					}
				})
			},
			goDetail(val){
				this.$store.commit("setproComent",val);
				uni.navigateTo({
					url:"/pages/users/comment/detail?id="+val.id
				})
			},
			goproDetail(id){
				uni.navigateTo({
					url:"/pages/yanxuanshangcheng/rexiaoxiangqin/rexiaoxiangqin?id="+id
				})
			}
		},
		onLoad(){
			this.getlist();
		},
		onShow(){
			if(this.onResh){
				this.loadStatus = "loadmore";
				this.currentPage = 1;
				this.getlist();
			}
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
	.comment_list{
		.comment_item{
			width: 100%;
			background-color: #FFFFFF;
			margin-bottom: 20rpx;
			.hd{
				margin-left: 40rpx;
				border-bottom: 2px solid #F7F8FA;
				display: flex;
				padding: 28rpx 0;
				.img{
					width: 170rpx;
					height: 170rpx;
					background-color: #eee;
				}
				.info{
					flex:1;
					padding-left: 20rpx;
					padding-right: 40rpx;
					.fnwrap{
						height: 68rpx;
						display: flex;
						.name{
							flex:1;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #BD9E81;
							padding-right: 74rpx;
						}
						.status{
							font-size: 24rpx;
							color:#707070;
						}
					}
					.price{
						padding-top: 26rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 800;
						color: #FA8677;
					}
					.number{
						padding-top: 8rpx;
						font-size: 20rpx;
						font-family: PingFang SC;
						color: #707070;
					}
				}
			}
			.ft{
				padding:28rpx 40rpx;
				display: flex;
				justify-content: flex-end;
				.combtn{
					width: 178rpx;
					height: 60rpx;
					background: #FFFFFF;
					border: 2rpx solid #D9D9D9;
					border-radius: 44rpx;
					font-size: 28rpx;
					color:#707070;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-left: 20rpx;
					&.default{
						border-color:#BD9E81;
						color:#BD9E81;
					}
				}
			}
		}
	}
</style>