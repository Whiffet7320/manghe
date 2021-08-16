<template>
	<view class="index">
		<view class="nav1">
			<view @click="fenleiShow" class="txt1">全部分类</view>
			<view @click="changeJiage" class="txt2">价格</view>
			<image v-if="jiageStatus == 0" class="pic1" src="/static/img/zu68.png" mode=""></image>
			<image v-else class="pic1" src="/static/img/zu69.png" mode=""></image>
			<view class="txt3">推荐</view>
		</view>
		<view v-if="isShow" :style="{'height':height}" class="nav1-1">
			<view class="btns">
				<view @click="changeBtnRadio(item,i)" :class="{'btn':true,'active':i == nowItem}" v-for="(item,i) in 6"
					:key='i'>沙发</view>
			</view>
		</view>
		<!--  -->
		<view class="nav2">
			<view @click="toXiangqin" class="item" v-for="item in 7">
				<image class="pic1" src="/static/img/20110309231034811.png" mode=""></image>
				<view class="txt1">SK-II神仙水75ml精华护 肤品套装化妆品神仙水75ml精华护 肤品套装化妆品礼盒五</view>
				<view class="txt2">
					<view class="txt2-1">
						￥<text class="big">480.00</text>
					</view>
					<view class="txt2-2">销售量4399</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height: '',
				isShow: false,
				jiageStatus: 0,
				nowItem: '',
			}
		},
		methods: {
			fenleiShow() {
				this.isShow = !this.isShow;
				this.getCurrentSwiperHeight()
				console.log(this.height)
			},
			changeJiage() {
				if (this.jiageStatus == 0) {
					this.jiageStatus = 1
				} else {
					this.jiageStatus = 0
				}
			},
			changeBtnRadio(item, i) {
				console.log(item, i)
				this.nowItem = i;
			},
			toXiangqin(){
				uni.navigateTo({
					url:'/pages/index/shangpinxiangqin/shangpinxiangqin'
				})
			},
			getCurrentSwiperHeight(element) {
				// let query = uni.createSelectorQuery().in(this);
				// query.selectAll(element).boundingClientRect();
				// query.exec((res) => {
				// 	console.log(res, 'res')
				// 	this.height = 50 + res[0][0].height;
				// })
				this.$u.getRect('.nav1-1').then(res => {
					console.log(res);
					this.height = res.height
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #EBEBEB;
	}
</style>
<style scoped lang="scss">
	.index {}

	.nav1 {
		width: 750rpx;
		height: 76rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;

		.txt1 {
			font-size: 28rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 76rpx;
			margin-left: 22rpx;
			color: #000000;
		}

		.txt2 {
			margin-left: 86rpx;
			font-size: 28rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 76rpx;
			color: #000000;
		}

		.pic1 {
			height: 18rpx;
			width: 18rpx;
			margin: 0 14rpx 0 8rpx;
		}

		.txt3 {
			margin-left: 20rpx;
			font-size: 28rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 76rpx;
			color: #000000;
		}
	}

	.nav1-1 {
		background: #FFFFFF;
		transition: all 1s;
		position: absolute;
		z-index: 2;

		.btns {
			padding: 24rpx 22rpx 18rpx 0rpx;

			.btn {
				margin-left: 22rpx;
				margin-bottom: 20rpx;
				display: inline-block;
				padding: 6rpx 32rpx;
				background: #F0F0F0;
				border-radius: 30rpx;
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 32rpx;
				color: #000000;
			}

			.btn.active {
				background: #5694FF;
				color: #FFFFFF;
			}
		}
	}

	.nav2 {
		margin-top: 20rpx;
		padding: 0 24rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.item {
			margin-bottom: 20rpx;
			height: 520rpx;
			width: 340rpx;
			background: #FFFFFF;
			border-radius: 16rpx;

			.pic1 {
				border-radius: 16rpx 16rpx 0px 0px;
				width: 340rpx;
				height: 340rpx;
			}

			.txt1 {
				margin: 10rpx 20rpx 26rpx 20rpx;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				line-height: 38rpx;
				color: #000000;
			}

			.txt2 {
				margin: 0 12rpx;
				display: flex;
				justify-content: space-between;
				align-items: flex-end;

				.txt2-1 {
					font-size: 24rpx;
					font-family: SimHei;
					font-weight: 400;
					line-height: 54rpx;
					color: #5694FF;

					.big {
						font-size: 40rpx;
					}
				}

				.txt2-2 {
					transform: translateY(-14rpx);
					width: 120rpx;
					height: 32rpx;
					font-size: 24rpx;
					font-family: SimHei;
					font-weight: 400;
					line-height: 32rpx;
					color: #989898;
				}
			}
		}
	}
</style>
