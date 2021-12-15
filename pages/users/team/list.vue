<template>
	<view class="u-relative">
		<view class="bg"><image src="/static/image/user/bg.jpg" mode="aspectFill" class="img"></image></view>
		<view class="total">
			<text class="text">{{title}}人数</text>
			<text class="number" v-if="type==0">{{total||0}}</text>
			<text class="number" v-if="type==1">{{totalLevel||0}}</text>
		</view>
		<view class="ulist">
			<view class="uitem" v-for="(item,index) in list" :key="index">
				<image :src="item.avatar" mode="aspectFill" class="img"></image>
				<view class="info">
					<view class="name u-line-1">{{item.nickname}}</view>
					<view class="time">{{item.time}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				title:"直推",
				type:0,
				total:0,
				totalLevel:0,
				list:[],
				loadStatus: 'loadmore',
				currentPage: 1
			}
		},
		methods:{
			setTitle(type){
				if(type==0){
					uni.setNavigationBarTitle({
						title:"我的直推"
					})
				}else if(type==1){
					this.title = "合伙";
					uni.setNavigationBarTitle({
						title:"我的合伙人"
					})
				}
			},
			getlist(){
				this.$api.spreadPeople({grade:this.type,page:this.currentPage,limit:10}).then((res)=>{
					if(res.status==200){
						this.total = res.data.count;
						this.totalLevel = res.data.totalLevel;
						if (res.data.list.length == 0) {
							this.loadStatus = 'nomore';
						} else {
							if(this.currentPage==1 && res.data.list.length<=10){
								this.loadStatus = 'nomore';
							}else{
								this.loadStatus = 'loadmore';
							}
							this.currentPage++;
							this.list = this.list.concat(res.data.list);
						}
					}
				});
			}
		},
		onLoad(options){
			if(options.type){
				this.type = options.type;
				this.setTitle(options.type);
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
	.bg{
		width: 100%;
		height: 202rpx;
		position: absolute;
		top:0;
		left:0;
		z-index: -1;
		.img{
			width: 100%;
			height: 100%;
		}
	}
	.total{
		width: 100%;
		height: 202rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
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
	.ulist{
		padding:0 20rpx;
		.uitem{
			background-color: #FFFFFF;
			padding: 24rpx 30rpx;
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			.img{
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				background-color: #eee;
			}
			.info{
				padding-left: 24rpx;
				flex:1;
				display: flex;
				flex-direction: column;
				.name{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #707070;
				}
				.time{
					padding-top: 10rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					color: #707070;
				}
			}
		}
	}
</style>