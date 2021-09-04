<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="items">
			<view class="item" v-for="(item,index) in list" :key='index'>
				<u-radio-group class='myRad' v-model="rad1" @change="radioGroupChange(item)">
					<u-radio :name='index'></u-radio>
				</u-radio-group>
				<view class="content">
					<view class="tit1">
						<view v-if="item.is_default" class="tit1-1">默认</view>
						<view class="tit1-2">{{item.sub_address}}</view>
						<view class="tit1-3">{{item.detail_address}}</view>
					</view>
					<view class="tit2">{{item.address}}</view>
					<view class="tit3">{{item.name}}（{{item.gender == 1 ? '先生' : '女士'}}）{{item.phone}}</view>
				</view>
				<image @click="editXinjiandizhi(item)" class="pic1" src="/static/img/bianji.png" mode=""></image>
			</view>
		</view>
		<view class="footer">
			<view @click="toXinjiandizhi" class="btn">添加新地址</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: '',
				rad1: null,
				list: [],
			}
		},
		onLoad(option) {
			console.log(option)
			this.page = option.page;
		},
		onShow() {
			this.getData();
		},
		methods: {
			async getData() {
				const res = await this.$api.address()
				console.log(res)
				this.list = res.data;
				// this.list.forEach((ele, i) => {
				// 	if (ele.is_default) {
				// 		this.rad1 = i;
				// 	}
				// })
			},
			radioGroupChange(item) {
				console.log(item)
				if (this.page == 'fabuxuqiu') {
					this.$store.commit('nowAddress',item)
					uni.navigateBack();
				}
			},
			toXinjiandizhi() {
				uni.navigateTo({
					url: '/pages/wode/shouhuodizhi/xinzengdizhi'
				})
			},
			editXinjiandizhi(item) {
				console.log(item)
				uni.navigateTo({
					url: `/pages/wode/shouhuodizhi/xinzengdizhi?id=${item.id}`
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F3F5;
	}
</style>
<style scoped lang="scss">
	.index {}

	.items {
		margin-top: 20rpx;

		.item {
			padding: 0 22rpx;
			width: 750rpx;
			height: 176rpx;
			background: #FFFFFF;
			opacity: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.myRad {}

			.content {
				width: 648rpx;
				display: flex;
				flex-direction: column;

				.tit1 {
					display: flex;

					.tit1-1 {
						margin-right: 20rpx;
						width: 56rpx;
						height: 28rpx;
						background: #E6EFFF;
						border: 2rpx solid #4988FD;
						opacity: 1;
						font-size: 20rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 24rpx;
						color: #4988FD;
						text-align: center;
					}

					.tit1-2 {
						font-size: 28rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 32rpx;
						color: #000000;
						opacity: 1;
					}

					.tit1-3 {
						margin-left: 20rpx;
						font-size: 24rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 32rpx;
						color: #000000;
						opacity: 1;
					}
				}

				.tit2 {
					font-size: 28rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 38rpx;
					color: #000000;
					opacity: 1;
				}

				.tit3 {
					font-size: 28rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 38rpx;
					color: #999999;
					opacity: 1;
				}
			}

			.pic1 {
				width: 29rpx;
				height: 29rpx;
			}
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 176rpx;
		background: #FFFFFF;
		opacity: 1;
		display: flex;
		align-items: center;
		justify-content: center;

		.btn {
			width: 622rpx;
			height: 96rpx;
			background: #4988FD;
			opacity: 1;
			border-radius: 6rpx;
			font-size: 48rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 96rpx;
			text-align: center;
			color: #FFFFFF;
		}
	}
</style>
