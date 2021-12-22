<template>
	<view class="index">
		<view class="list">
			<uni-swipe-action>
				<uni-swipe-action-item class="uitem" v-for="(item,index) in list" :key="index">
					<view class="item" @click="toEdit(item)">
						<view class="hd">
							<view class="top">
								<text class="name">{{item.real_name}}</text>
								<text class="phone">{{item.phone.substr(0,3)+'****'+item.phone.substr(7)}}</text>
								<text class="tag" v-show="item.is_default === 1">默认</text>
							</view>
							<view class="detail">{{item.detail}}</view>
						</view>
						<view class="ft" @click.stop="Default(item)">
							<view class="check">
								<image src="/static/image/user/icon_checked.png" mode="aspectFit" style="width: 32rpx;height: 32rpx;margin-right: 20rpx;" v-if="item.is_default === 1"></image>
								<view class="icon" v-else></view>
							</view>
							<text>设置为默认地址</text>
						</view>
					</view>
					<template v-slot:right>
						<view class="slot-button-wrap">
							<view class="slot-button cancel" @click="bindClick('del',index,item.id)">
								<image src="/static/image/user/icon_deletes.png" mode="aspectFit" style="width: 35rpx;height: 34rpx;"></image>
								<text class="slot-button-text">删除</text>
							</view>
						</view>
					</template>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
		<view class="emptybox" v-if="list.length==0">
			<u-gap height="260"></u-gap>
			<image src="/static/image/user/empty.png" mode="aspectFit" class="img"></image>
			<text class="text">暂无收货地址</text>
			<view class="btn">去新建</view>
		</view>
		<view class="goAdds" @click="goAdd" v-if="list.length!=0">新建地址</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						real_name:"玛德撒",
						phone:"15057575757",
						detail:"浙江省温州市龙湾区滨海五道交叉路",
						is_default:1
					}
				]
			}
		},
		onShow() {
			// this.getlist()
		},
		methods: {
			toEdit(item){
				this.$store.commit("setAddress",item);
				uni.navigateTo({
					url:`/pages/users/address/detail?id=${item.id}`
				})
			},
			//获取地址信息
			async getlist(){
				const res = await this.$api.address();
				console.log(res)
				this.list = res.data;
			},
			//新建地址
			goAdd(){
				uni.navigateTo({
					url:'/pages/users/address/detail'
				})
			},
			//设置默认地址
			async Default(item){
				const res = await this.$api.upDateAddress({
					is_default: 1
				},item.id)
				if(res.code == 200){
					this.ddrelist()
				}
			},
			bindClick(e,index,id){
				if(e=="del"){
					this.$api.delAddress({id:id}).then((res)=>{
						if(res.status==200){
							this.$u.toast("删除成功");
							this.list.splice(index,1);
						}else{
							this.$u.toast(res.msg);
						}
					})
				}
			},
		}
	}
</script>
<style lang="scss">
	page{
		background-color: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.list{
		width: 100%;
		position: relative;
		overflow: hidden;
		padding: 20rpx 24rpx 20rpx 44rpx;
		.item{
			padding:32rpx 0;
			background: #FFFFFF;
			border: 2rpx solid #F4F4F4;
			border-radius: 20rpx;
			height: 252rpx;
			margin-bottom: 20rpx;
			.hd{
				margin-left: 40rpx;
				border-bottom: 2rpx #F9F9F9 solid;
				padding-right: 40rpx;
				.top{
					display: flex;
					align-items: center;
					margin-bottom: 20rpx;
					font-size: 28rpx;
					color:#000;
					.name{
						margin-right: 28rpx;
					}
					.phone{
						flex:1;
					}
					.tag{
						width: 58rpx;
						height: 28rpx;
						line-height: 28rpx;
						text-align: center;
						background: #D61D1D;
						border-radius: 14rpx;
						font-size: 16rpx;
						color:#ffffff;
					}
				}
				.detail{
					font-size: 24rpx;
					color:#000;
					height: 62rpx;
				}
			}
			.ft{
				padding: 30rpx 40rpx 0 40rpx;
				display: flex;
				align-items: center;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #000;
				.check{
					display: flex;
					align-items: center;
					.icon{
						width: 32rpx;
						height: 32rpx;
						margin-right: 20rpx;
						background-color: #F7F8FA;
						border-radius: 50%;
					}
				}
			}
		}
	}
	.slot-button-wrap{
		display: flex;
		padding-right: 24rpx;
	}
	.slot-button{
		width:142rpx;
		height: 252rpx;
		font-size: 24rpx;
		border-radius: 20rpx;
		margin-left: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		.slot-button-text{
			margin-top: 20rpx;
		}
		&.cancel{
			background: #D61D1D;
			color: #fff;
		}
	}
	.emptybox{
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		.img{
			width: 212rpx;
			height: 183rpx;
		}
		.text{
			font-size: 24rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			color: #bababa;
			margin-top: 30rpx;
			margin-bottom: 48rpx;
		}
		.btn{
			width: 152rpx;
			height: 50rpx;
			line-height: 50rpx;
			background: #d61d1d;
			border-radius: 26rpx;
			font-size: 24rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #f7f8fa;
		}
	}
	.goAdds{
		width: 612rpx;
		height: 80rpx;
		margin: 136rpx auto 0;
		background: #D61D1D;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: 700;
		color: #ffffff;
	}
</style>
