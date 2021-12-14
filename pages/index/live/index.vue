<template>
	<view>
		<view class="live-wrapper-b">
			<view class="live-item-b" v-for="(item,index) in list" :key="index" @click="goLive(item.room_id)">
				<view class="img-box">
					<view class="label bgblue" v-if="item.live_status == 102">
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
					<image :src="item.share_img" mode="aspectFill"></image>
				</view>
				<view class="info">
					<view class="title u-line-1">{{item.name}}</view>
					<view class="people">
						<image :src="item.anchor_img" mode="aspectFill"></image>
						<text>{{item.anchor_name}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="empty-txt" v-if="!isScroll">到底了~</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				isScroll: true,
				list: [
					{
						live_status:102,
						show_time:"10:00",
						share_img:"https://m.360buyimg.com/mobilecms/s160x160_jfs/t1/187972/3/8012/191418/60c5a1a8E3292f715/eddf00d3628c1e5b.jpg!q70.dpg",
						name:"双十二",
						anchor_img:"https://m.360buyimg.com/mobilecms/s160x160_jfs/t1/187972/3/8012/191418/60c5a1a8E3292f715/eddf00d3628c1e5b.jpg!q70.dpg",
						anchor_name:"小美"
					},
					{
						live_status:103,
						show_time:"10:00",
						share_img:"https://m.360buyimg.com/mobilecms/s160x160_jfs/t1/187972/3/8012/191418/60c5a1a8E3292f715/eddf00d3628c1e5b.jpg!q70.dpg",
						name:"双十二",
						anchor_img:"https://m.360buyimg.com/mobilecms/s160x160_jfs/t1/187972/3/8012/191418/60c5a1a8E3292f715/eddf00d3628c1e5b.jpg!q70.dpg",
						anchor_name:"小美"
					},
					{
						live_status:101,
						show_time:"10:00",
						share_img:"https://m.360buyimg.com/mobilecms/s160x160_jfs/t1/187972/3/8012/191418/60c5a1a8E3292f715/eddf00d3628c1e5b.jpg!q70.dpg",
						name:"双十二",
						anchor_img:"https://m.360buyimg.com/mobilecms/s160x160_jfs/t1/187972/3/8012/191418/60c5a1a8E3292f715/eddf00d3628c1e5b.jpg!q70.dpg",
						anchor_name:"小美"
					}
				]
			}
		},
		methods: {
			getLiveList() {
				if (!this.isScroll) return
				this.$api.getLiveList({page:this.page,limit:10}).then(res => {
					this.isScroll = res.data.length >= this.limit;
					this.page++;
					this.liveList = this.liveList.concat(res.data);
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
			// this.getLiveList();
		},
		onReachBottom() {
			this.getLiveList()
		}
	}
</script>

<style lang="scss">
	.live-wrapper {
		position: relative;
		width: 100%;
		overflow: hidden;
		border-radius: 16rpx;

		image {
			width: 100%;
			height: 400rpx;
		}

		.live-top {
			z-index: 20;
			position: absolute;
			left: 0;
			top: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			width: 180rpx;
			height: 54rpx;
			border-radius: 0rpx 0px 18rpx 0px;

			image {
				width: 30rpx;
				height: 30rpx;
				margin-right: 10rpx;
				/* #ifdef H5 */
				display: block;
				/* #endif */
			}
		}

		.live-title {
			position: absolute;
			left: 0;
			bottom: 6rpx;
			width: 100%;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			font-size: 30rpx;
			color: #fff;
			background: rgba(0, 0, 0, 0.35);
		}

		&.mores {
			width: 100%;

			.item {
				position: relative;
				width: 320rpx;
				display: inline-block;
				border-radius: 16rpx;
				overflow: hidden;
				margin-right: 20rpx;

				image {
					width: 320rpx;
					height: 180rpx;
					border-radius: 16rpx;
				}

				.live-title {
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					font-size: 22rpx;
				}

				.live-top {
					width: 120rpx;
					height: 36rpx;
					font-size: 22rpx;

					image {
						width: 20rpx;
						height: 20rpx;
					}
				}
			}
		}
	}

	.live-wrapper-a {
		padding: 0rpx 20rpx 0;

		.live-item-a {
			display: flex;
			background: #fff;
			margin-bottom: 20rpx;
			border-radius: 16rpx;
			overflow: hidden;

			&:last-child {
				margin-bottom: 0;
			}

			.img-box {
				position: relative;
				width: 340rpx;
				height: 270rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.info {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: 15rpx 20rpx;

				.title {
					font-size: 30rpx;
					color: #333;
				}

				.people {
					display: flex;
					align-items: center;
					color: #999;
					font-size: 24rpx;
					margin-top: 10rpx;

					image {
						width: 32rpx;
						height: 32rpx;
						border-radius: 50%;
						margin-right: 10rpx;
					}
				}

				.goods-wrapper {
					display: flex;

					.goods-item {
						position: relative;
						width: 96rpx;
						height: 96rpx;
						margin-right: 20rpx;
						overflow: hidden;
						border-radius: 16rpx;

						&:last-child {
							margin-right: 0;
						}

						image {
							width: 100%;
							height: 100%;
							border-radius: 16rpx;
						}

						.bg {
							position: absolute;
							left: 0;
							top: 0;
							width: 100%;
							height: 100%;
							border-radius: 16rpx;
							background: rgba(0, 0, 0, 0.3);
						}

						text {
							position: absolute;
							left: 0;
							bottom: 0;
							width: 100%;
							height: 60rpx;
							line-height: 70rpx;
							color: #fff;
							background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%);
						}

						.num {
							display: flex;
							align-items: center;
							justify-content: center;
							position: absolute;
							left: 0;
							top: 0;
							width: 100%;
							height: 100%;
							background: rgba(0, 0, 0, 0.3);
							color: #fff;
							font-size: 28rpx;
						}
					}
				}

				.empty-goods {
					width: 96rpx;
					height: 96rpx;
					border-radius: 6rpx;
					background-color: #B2B2B2;
					color: #fff;
					font-size: 20rpx;
					text-align: center;
					line-height: 96rpx;
				}
			}
		}

		&.live-wrapper-c {
			.live-item-a {
				display: flex;
				flex-direction: column;

				.img-box {
					width: 100%;
					border-radius: 8px 8px 0 0;
				}

				.info {
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-direction: initial;

					.left {
						width: 69%;
					}

					.goods-wrapper {
						flex: 1;
					}
				}
			}
		}
	}

	.live-wrapper-b {
		padding: 20rpx 20rpx 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.live-item-b {
			width: 345rpx;
			background-color: #fff;
			border-radius: 16rpx;
			overflow: hidden;
			margin-bottom: 20rpx;
			overflow: hidden;

			.img-box {
				position: relative;

				image {
					width: 100%;
					height: 274rpx;
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

				.people {
					display: flex;
					margin-top: 10rpx;
					color: #999;

					image {
						width: 36rpx;
						height: 36rpx;
						border-radius: 50%;
						margin-right: 10rpx;
					}
				}
			}
		}
	}

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

	.bgblue {
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
			background: linear-gradient(270deg, #2FA1F5 0%, #0076FF 100%);
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

			.iconfont {
				font-size: 26rpx;
				margin-top: 8rpx;
			}
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
