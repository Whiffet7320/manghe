<template>
	<view>
		<view class="follow_list">
			<view class="follow_item" v-for="(item,index) in list" :key="index" @click="goDetail(item)">
				<image :src="item.avatar" mode="aspectFill" class="avatar"></image>
				<view class="name">{{item.name}}</view>
				<view class="right" @click.stop="onCancel(item,index)">
					<image src="/static/image/user/icon_follow.png" mode="aspectFit" class="icon"></image>
					<text>取消关注</text>
				</view>
			</view>
		</view>
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
				name:"",
				id:0,
				cindex:0,
				show:false,
				list:[
					{
						avatar:"",
						name:"王力宏"
					},
					{
						avatar:"",
						name:"王力宏2"
					}
				]
			}
		},
		methods:{
			onCancel(val,index){
				this.show = !this.show;
				this.id = val.id;
				this.cindex = index;
				this.name = val.name;
			},
			onClose(val){
				if(val==="confirm"){
					this.$u.toast("取消成功");
					this.list.splice(this.cindex,1);
				}
				this.show = !this.show;
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
