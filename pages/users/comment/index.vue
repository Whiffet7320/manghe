<template>
	<view class="comment_list">
		<view class="comment_item" v-for="(item,index) in list" :key="index">
			<view class="hd">
				<image :src="item.image" mode="aspectFill" class="img"></image>
				<view class="info">
					<view class="fnwrap">
						<view class="name">{{item.name}}</view>
						<view class="status">{{item.status|orderStatus}}</view>
					</view>
					<view class="price">¥ {{item.price}}</view>
					<view class="number">共{{item.number}}件</view>
				</view>
			</view>
			<view class="ft">
				<view class="combtn" @click="goDetail(item)">查看评价</view>
				<view class="combtn default">再来一单</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[
					{
						id:1,
						image:"",
						name:"微针一年（不限次数）",
						status:0,
						price:1180.00,
						number:1
					}
				]
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
			goDetail(val){
				uni.navigateTo({
					url:"/pages/users/comment/detail?id="+val.id
				})
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