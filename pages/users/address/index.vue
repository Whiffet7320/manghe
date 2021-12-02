<template>
	<view class="address_wrap">
		<uni-swipe-action v-if="list.length">
			<uni-swipe-action-item v-for="(item,index) in list" :key="item.id">
				<view class="address_item" @click="useAddress(item)">
					<view class="hd">
						<view class="top">
							<text class="name">{{item.real_name}}</text>
							<text class="phone">{{item.phone}}</text>
							<text class="tag" v-show="item.is_default === 1">默认</text>
						</view>
						<view class="detail">
							{{item.province}}{{item.city}}{{item.area}}{{item.detail}}
						</view>
					</view>
					<view class="ft" @click.stop="onCheck(index)">
						<view class="check">
							<image src="/static/image/user/icon_checked.png" mode="aspectFit" style="width: 32rpx;height: 32rpx;margin-right: 20rpx;" v-if="item.is_default === 1"></image>
							<view class="icon" v-else></view>
						</view>
						<text>设置为默认地址</text>
					</view>
				</view>
				<template v-slot:right>
					<view class="slot-button-wrap">
						<view class="slot-button confirm" @click="bindClick('edit',index,item.id)">
							<image src="/static/image/user/icon_edits.png" mode="aspectFit" style="width: 30rpx;height: 31rpx;"></image>
							<text class="slot-button-text">编辑</text>
						</view>
						<view class="slot-button cancel" @click="bindClick('del',index,item.id)">
							<image src="/static/image/user/icon_deletes.png" mode="aspectFit" style="width: 35rpx;height: 34rpx;"></image>
							<text class="slot-button-text">删除</text>
						</view>
					</view>
				</template>
			</uni-swipe-action-item>
		</uni-swipe-action>
		<view class="emptybox u-flex-col u-row-center" v-else>
			<u-empty text="暂无收货地址" color="#999999" icon-size="364" src="/static/images/common/no_data.png"></u-empty>
		</view>
		<u-gap height="120"></u-gap>
		<view class="ftbtn safe-area-inset-bottom">
			<button class="u-reset-button btn_primary" @click="useAddress()">添加收货地址</button>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default{
		data(){
			return{
				checked:false,
				list:[
					{
						real_name:"周一二",
						phone:"150****5757",
						province:"浙江省",
						city:"温州市",
						area:"永嘉县",
						detail:"梧田街道哼哈大厦1d1001室",
						is_default:1
					},
					{
						real_name:"周一二",
						phone:"150****5757",
						province:"浙江省",
						city:"温州市",
						area:"永嘉县",
						detail:"梧田街道哼哈大厦1d1001室",
						is_default:0
					}
				],
				from:""
			}
		},
		methods:{
			onCheck(index){
				this.list[index].is_default = 1;
			},
			getUaddress(){
				this.$http.getAddress().then((res)=>{
					this.list = res.data.data;
				})
			},
			bindClick(e,index,id){
				this.$http.delAddress(id).then((res)=>{
					this.$u.toast("删除成功");
					this.list.splice(index,1);
				})
			},
			useAddress(item){
				if(item){
					uni.setStorageSync("Select_Address",{addressData:JSON.stringify(item)});
					this.from = uni.getStorageSync("oback");
					if(this.from=="order"){
						uni.removeStorageSync("oback");
					}
					uni.navigateBack();
				}else{
					this.$u.route("pages/users/address/xinjiandizhi");
				}
			}
		},
		onLoad(option) {
			
		}
	}
</script>
<style>
	page{
		background: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.address_wrap{
		.address_item{
			padding:32rpx 40rpx;
			background: #FFFFFF;
			border: 2rpx solid #F4F4F4;
			border-radius: 0rpx 20rpx 20rpx 0rpx;
			height: 252rpx;
			margin-bottom: 20rpx;
			.hd{
				.top{
					display: flex;
					align-items: center;
					margin-bottom: 20rpx;
					font-size: 28rpx;
					color:#707070;
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
						background: #BD9E81;
						border-radius: 4rpx;
						font-size: 16rpx;
						color:#ffffff;
					}
				}
				.detail{
					font-size: 24rpx;
					color:#707070;
					height: 62rpx;
					position: relative;
					overflow: hidden;
					&::before{
						content:"";
						width: 660rpx;
						height: 2rpx;
						background-color: #F9F9F9;
						position: absolute;
						left:42rpx;
						bottom: 0;
						box-sizing: border-box;
					}
				}
			}
			.ft{
				display: flex;
				align-items: center;
				padding-top: 30rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #707070;
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
		.slot-button-wrap{
			display: flex;
			padding-right: 24rpx;
		}
		.slot-button{
			width:124rpx;
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
			&.confirm{
				color: #FFFFFF;
				background: #BD9E81;
			}
			&.cancel{
				background: #E4E4E4;
				color: #6F6F6F;
			}
		}
		.emptybox{
			height: calc(100vh - 140rpx);
		}
	}
	.ftbtn{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 50;
		width: 100%;
		height: 110rpx;
		padding: 10rpx 30rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 16rpx 56rpx rgba(166, 179, 194, 0.3);
		.btn_primary{
			width: 100%;
			height: 84rpx;
			line-height: 84rpx;
			background: #BD9E81;
			border-radius: 44rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			text-align: center;
		}
	}
</style>
