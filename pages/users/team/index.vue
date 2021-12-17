<template>
	<view class="u-relative">
		<view class="bg"><image src="/static/image/user/bg.jpg" mode="aspectFit" class="img"></image></view>
		<view class="teamcon">
			<view class="total">
				<text class="text">团队总人数</text>
				<text class="number">{{total||0}}</text>
			</view>
			<view class="total">
				<text class="text">今日新增</text>
				<text class="number">{{count||0}}</text>
			</view>
		</view>
		<view class="team_menu">
			<view class="item" @click="goDetail(0)">
				<image src="/static/image/user/icon_user.png" mode="aspectFit" style="width: 38rpx;height: 33rpx;"></image>
				<text class="text">我的直推</text>
				<image src="/static/image/user/icon_right.png" mode="aspectFit" class="icon"></image>
			</view>
			<view class="item" @click="goDetail(1)">
				<image src="/static/image/user/icon_hh.png" mode="aspectFit" style="width: 38rpx;height: 27rpx;"></image>
				<text class="text">合伙人</text>
				<image src="/static/image/user/icon_right.png" mode="aspectFit" class="icon"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				total:0,
				count:0
			}
		},
		methods:{
			getNum(){
				this.$api.spreadPeopleCount().then((res)=>{
					if(res.status==200){
						this.total = res.data.children_count;
						this.count = res.data.todayadd_count;
					}
				})
			},
			goDetail(val){
				uni.navigateTo({
					url:"/pages/users/team/list?type="+val
				})
			}
		},
		onShow(){
			this.getNum();
		}
	}
</script>

<style>
	page{
		background: #F7F8FA;
	}
</style>
<style lang="scss">
	.bg{
		width: 100%;
		height: 182rpx;
		position: absolute;
		top:0;
		left:0;
		z-index: -1;
		.img{
			width: 100%;
			height: 100%;
		}
	}
	.teamcon{
		width: 100%;
		height: 182rpx;
		display: flex;
		align-items: center;
		.total{
			flex:1;
			display: flex;
			flex-direction: column;
			align-items: center;
			.text{
				font-size: 24rpx;
				font-family: PingFang SC;
				color: rgba(255,255,255,0.8);
				margin-bottom: 8rpx;
			}
			.number{
				font-size: 48rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
			}
		}
	}
	.team_menu{
		margin-top: 20rpx;
		background-color: #FFFFFF;
		.item{
			padding: 30rpx 40rpx 30rpx 0;
			margin-left: 42rpx;
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #707070;
			border-bottom: 2px solid #F9F9F9;
			&:last-child{
				border:0;
			}
			.text{
				padding-left: 22rpx;
				flex:1;
			}
			.icon{
				width: 13rpx;
				height: 24rpx;
			}
		}
	}
</style>