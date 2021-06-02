<template>
	<view class="index">
		<view class="container">
			<view class="items">
				<view class="item" v-for="(item,i) in list" :key='i'>
					<view class="left">
						<image class="pic" :src="item.facepic" mode=""></image>
					</view>
					<view class="right">
						<view class="nav1">
							<view class="tit1">{{item.nickname}}</view>
							<view class="tit2">2021-04-30</view>
						</view>
						<view class="nav2">{{item.comment}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				goods_id:null,
				list:[]
			}
		},
		onLoad(option) {
			this.goods_id = option.goods_id;
		},
		async onShow() {
			const res = await this.$api.wx_goodscomment(this.goods_id)
			console.log(res)
			this.list = res.list
		},
		
	}
</script>

<style scoped lang="scss">
	page{
		background: #ffffff;
	}
	.index{}
	.container{
		.items{
			.item{
				display: flex;
				margin: 10rpx 49rpx;
				.left{
					margin-right: 20rpx;
					.pic{
						width: 72rpx;
						height: 72rpx;
						opacity: 1;
						background: #ececec;
						border-radius: 50%;
					}
				}
				.right{
					display: flex;
					flex-direction: column;
					flex: 1;
					.nav1{
						display: flex;
						justify-content: space-between;
						.tit1{
							opacity: 1;
							font-size: 22rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							color: #000000;
						}
						.tit2{
							opacity: 1;
							font-size: 18rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							color: #707070;
						}
					}
					.nav2{
						margin: 16rpx 0rpx 21rpx 0rpx ;
						opacity: 1;
						font-size: 18rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						text-align: left;
						color: #000000;
					}
					border-bottom: 2rpx solid #ececec;
				}
			}
		}
	}
</style>
