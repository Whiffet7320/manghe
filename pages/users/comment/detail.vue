<template>
	<view class="detail">
		<view class="content">
			<view class="hd">
				<image v-if="info.image" :src="info.image" mode="aspectFill" class="img"></image>
				<view class="name">{{info.store_name}}</view>
			</view>
			<view class="ft">
				<view class="left">产品体验使用感受</view>
				<view class="zan" v-if="info.product_score==5">
					<u-icon name="thumb-up-fill" size="21" color="#BD9E81"></u-icon>
					<text class="text">满意</text>
				</view>
				<view class="zan" v-if="info.product_score==0">
					<u-icon name="thumb-down-fill" size="21" color="#BD9E81"></u-icon>
					<text class="text">不满意</text>
				</view>
			</view>
		</view>
		<view class="comment_con">
			<view class="tit">评论内容</view>
			<view class="comcontent">
				<view class="con">{{info.comment}}</view>
				<view class="imglist">
					<image :src="pitem" mode="aspectFill" class="img" v-for="(pitem,index) in info.pics" :key="index"></image>
				</view>
			</view>
			<view class="tip" v-if="show">已超过7天，无法修改评价</view>
		</view>
		<view class="delete" @click="onDelete">
			<image src="/static/image/user/icon_delete.png" mode="aspectFit" style="width: 28rpx;height: 30rpx;"></image>
			<text class="text">删除该评价</text>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default{
		data(){
			return{
				show:false
			}
		},
		computed: {
			...mapState({
				info:state=>state.proComentInfo
			})
		},
		methods:{
			onDelete(){
				uni.showModal({
					title: '删除评价',
					content: '确定删除该评价',
					confirmColor:"#BD9E81",
					success: (res)=> {
						if (res.confirm) {
							this.$api.myCommentDel(this.info.id).then(res => {
								if(res.status==200){
									uni.showToast({
										title: '删除成功',
										icon: 'success'
									})
									setTimeout(()=>{
										this.$store.commit("setResh",true);
										uni.navigateBack();
									},1500)
								}
							}).catch(err => {
								this.$u.toast(err);
							});
						} else if (res.cancel) {
							this.$u.toast('已取消');
						}
					}
				});
			}
		},
		onLoad(){
			let time = 604800000;
			let old = new Date(this.info.add_time.replace(/-/g, '/')).getTime();
			let now = new Date().getTime();
			let sum = Number(old) + time;
			if(Number(now)>Number(sum)){
				this.show = true;
			}else{
				this.show = false;
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
	.content{
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		.hd{
			margin-left: 40rpx;
			border-bottom: 2px solid #F7F8FA;
			padding: 32rpx 40rpx 48rpx 0;
			display: flex;
			.img{
				width: 94rpx;
				height: 94rpx;
				background-color: #eee;
			}
			.name{
				flex:1;
				padding-left: 20rpx;
				font-size: 24rpx;
				color: #BD9E81;
			}
		}
		.ft{
			padding: 28rpx 36rpx 28rpx 40rpx;
			display: flex;
			.left{
				flex:1;
				font-size: 28rpx;
				color:#707070;
			}
			.zan{
				width: 154rpx;
				height: 60rpx;
				background: #F2ECE6;
				border-radius: 10rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				color:#707070;
				.text{
					padding-left: 16rpx;
				}
			}
		}
	}
	.comment_con{
		background-color: #FFFFFF;
		.tit{
			padding: 28rpx 0 24rpx 0;
			text-align: center;
			font-size: 28rpx;
			color: #BD9E81;
		}
		.comcontent{
			margin-left: 40rpx;
			padding:0 36rpx 14rpx 0;
			.con{
				font-size: 24rpx;
				color: #707070;
				padding-bottom: 20rpx;
			}
			.imglist{
				display: flex;
				flex-wrap: wrap;
				.img{
					width: 150rpx;
					height: 150rpx;
					background-color: #eee;
					margin-right: 20rpx;
					margin-bottom: 14rpx;
				}
			}
		}
		.tip{
			margin-left: 40rpx;
			border-top: 2px solid #F7F8FA;
			padding: 28rpx 0;
			text-align: center;
			font-size: 24rpx;
			color: #707070;
		}
	}
	.delete{
		width: 100%;
		height: 74rpx;
		background: #F2ECE6;
		font-size: 24rpx;
		color: #BD9E81;
		display: flex;
		align-items: center;
		justify-content: center;
		.text{
			margin-left: 20rpx;
		}
	}
</style>