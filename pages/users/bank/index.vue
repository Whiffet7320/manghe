<template>
	<view class="content">
		<view class="stit">银行卡</view>
		<view class="list">
			<view class="bank_item" v-for="(item,index) in list" :key="index">
				<image src="" mode="aspectFit" class="img"></image>
				<view class="info">
					<view class="name">{{item.name}}</view>
					<view class="code">
						<text class="omit">****</text>
						<text class="omit">****</text>
						<text class="omit">****</text>
						<text>{{item.code.substr(item.code.length - 4, item.code.length)}}</text>
					</view>
				</view>
				<view class="moren" v-if="item.default==1"></view>
				<view class="del" @click="onDelete(item.id,index)">删除</view>
			</view>
		</view>
		<view class="add" @click="goAdd">
			<image src="/static/image/user/icon_add.png" mode="aspectFit" class="img"></image>
			<text>添加银行卡</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[
					{
						name:"建设银行",
						code:"1234567891011112888",
						default:1
					},
					{
						name:"建设银行",
						code:"1234567891011112888",
						default:0
					}
				]
			}
		},
		methods:{
			onDelete(id,index){
				uni.showModal({
					title:"提示",
					content:"确定是否删除？",
					confirmColor:"#D61D1D",
					success: (res) => {
						if(res.confirm){
							this.list.splice(index,1);
						}
					}
				})
			},
			goAdd(){
				uni.navigateTo({
					url:"/pages/users/bank/detail"
				})
			}
		}
	}
</script>
<style>
	page{
		background-color: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.content{
		padding: 46rpx 30rpx;
		.stit{
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			color: #808080;
			margin-bottom: 28rpx;
		}
		.list{
			.bank_item{
				position: relative;
				background-color: #FFFFFF;
				width: 100%;
				height: 218rpx;
				background: #ffffff;
				border-radius: 16rpx;
				margin-bottom: 40rpx;
				padding:40rpx 0 0 24rpx;
				display: flex;
				.img{
					width: 66rpx;
					height: 66rpx;
				}
				.info{
					flex:1;
					padding-left: 32rpx;
					.name{
						font-size: 36rpx;
						font-family: PingFang SC, PingFang SC-Bold;
						font-weight: 700;
						color: #000000;
						margin-bottom: 40rpx;
					}
					.code{
						font-size: 28rpx;
						font-family: PingFang SC, PingFang SC-Medium;
						color: #000000;
						.omit {
							margin-right: 30rpx;
						}
					}
				}
				.moren{
					position: absolute;
					top:0;
					right:0;
					z-index: 20;
					width: 82rpx;
					height: 72rpx;
					background: url('../../../static/image/user/moren.png') no-repeat;
					background-size: 100% 100%;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					color: #ffffff;
				}
				.del{
					position: absolute;
					top:92rpx;
					right:40rpx;
					font-size: 24rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					color: #808080;
				}
			}
		}
		.add{
			width: 100%;
			height: 96rpx;
			line-height: 96rpx;
			background: #ffffff;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			color: #000000;
			.img{
				width: 23rpx;
				height: 23rpx;
				margin-right: 16rpx;
			}
		}
	}
</style>
