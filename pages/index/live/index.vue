<template>
	<view>
		<view class="live_wrap">
			<view class="live_item" v-for="(item,index) in list" :key="index" @click="goLive(item.room_id)">
				<view class="imgbox">
					<view class="label bggreen" v-if="item.live_status == 102">
						<view class="txt">预告</view>
						<view class="msg">{{item.show_time}}</view>
					</view>
					<view class="label bggary" v-if="item.live_status==103">
						<image src="/static/image/live-02.png" mode="" style="width: 20rpx; height: 20rpx;"></image>
						<text>回放</text>
					</view>
					<view class="label bgred" v-if="item.live_status==101">
						<image src="/static/image/live-01.gif" mode="" style="width: 28rpx; height: 28rpx;"></image>
						<text>进行中</text>
					</view>
					<image :src="item.share_img" mode="aspectFill" class="pic"></image>
					<view class="user">
						<image :src="item.anchor_img" mode="aspectFill" class="avatar"></image>
						<text>{{item.anchor_name}}</text>
					</view>
				</view>
				<view class="info">
					<view class="title u-line-1">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="empty-txt" v-if="!isScroll">没有更多了~</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				isScroll: true,
				list: []
			}
		},
		methods: {
			getLiveList() {
				if (!this.isScroll) return
				this.$api.getLiveList({page:this.page,limit:10}).then(res => {
					this.isScroll = res.data.length >= this.limit;
					this.page++;
					this.list = this.list.concat(res.data);
				}).catch(err => {
					this.$u.toast(err);
				});
			},
			goLive(id){
				uni.navigateTo({
					url:'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id='+id
				})
			}
		},
		onShow() {
			this.getLiveList();
		},
		onReachBottom() {
			this.getLiveList()
		}
	}
</script>

<style>
	page{
		background-color: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.live_wrap{
		padding: 20rpx 20rpx 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.live_item {
			width: 345rpx;
			background-color: #fff;
			border-radius: 16rpx;
			overflow: hidden;
			margin-bottom: 20rpx;
			.imgbox {
				position: relative;
				.label {
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					left: 20rpx;
					top: 20rpx;
					border-radius: 22rpx 0px 22rpx 22rpx;
					font-size: 24rpx;
					color: #fff;
					image {
						margin-right: 10rpx;
					}
					text {
						font-size: 22rpx;
					}
				}
				.pic {
					width: 100%;
					height: 274rpx;
				}
				.user {
					display: flex;
					align-items: center;
					padding: 0 20rpx;
					height: 80rpx;
					color: #fff;
					font-size: 24rpx;
					position:absolute;
					bottom: 0;
					left:0;
					right:0;
					z-index: 50;
					.avatar {
						width: 32rpx;
						height: 32rpx;
						border-radius: 50%;
						margin-right: 10rpx;
					}
				}
			}
			.info {
				display: flex;
				flex-direction: column;
				padding: 20rpx;
				.title {
					font-size: 30rpx;
					color: #333;
				}
			}
		}
	}

	.bgred {
		width: 132rpx;
		height: 38rpx;
		background: linear-gradient(270deg, #F5742F 0%, #FF1717 100%)
	}

	.bggary {
		width: 108rpx;
		height: 38rpx;
		background: linear-gradient(270deg, #999999 0%, #666666 100%)
	}

	.bggreen {
		width: 220rpx;
		height: 38rpx;
		background: rgba(0, 0, 0, 0.36);
		overflow: hidden;
		.txt {
			position: relative;
			left: -5rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 38px;
			height: 100%;
			text-align: center;
			background: #06ae56;
		}
	}

	.title-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		font-size: 32rpx;

		.more {
			display: flex;
			align-items: center;
			justify-content: center;

			font-size: 26rpx;
			color: #666;
		}
	}

	.empty-txt {
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		font-size: 24rpx;
		color: #999;
	}
</style>
