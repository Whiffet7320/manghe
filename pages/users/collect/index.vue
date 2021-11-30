<template>
	<view>
		<view class="collect_list">
			<view class="collect_item" v-for="(item,index) in list" :key="index" @click="goDetail(item)">
				<image :src="item.image" mode="aspectFill" class="img"></image>
				<view class="left">
					<view class="name">{{item.name}}</view>
					<view class="sname">{{item.desc}}</view>
					<view class="ft">
						<view class="price">¥{{item.price}}</view>
						<view class="sprice">¥{{item.sprice}}</view>
					</view>
				</view>
				<view class="right" @click.stop="onCancel(item,index)">
					<image src="/static/image/user/icon_follow.png" mode="aspectFit" class="icon"></image>
				</view>
			</view>
		</view>
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
				name:"",
				id:0,
				cindex:0,
				show:false,
				list:[
					{
						image:"",
						name:"肋骨鼻综合",
						desc:"肋骨鼻综合",
						price:3600.00,
						sprice:1800.00
					},
					{
						image:"",
						name:"肋骨鼻综合",
						desc:"肋骨鼻综合",
						price:3600.00,
						sprice:1800.00
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
			},
			goDetail(val){}
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
