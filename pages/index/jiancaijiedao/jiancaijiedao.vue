<template>
	<view class="index">
		<view class="item" v-for="item in list" :key='item.id'>
			<image class="pic1" @click="toTiaozhuan(item)" :src="item.image" mode="widthFix">
			</image>
			<view class="txt">{{item.name}}</view>
		</view>

	</view>
</template>

<script>
	export default {
		onShow() {
			this.getData()
		},
		data() {
			return {
				id: "",
				list: [],
			}
		},
		methods: {
			async getData() {
				const res = await this.$api.goodsStreet();
				console.log(res.data)
				this.list = res.data;
			},
			toTiaozhuan(item) {
				console.log(item)
				if (typeof item == 'number') {
					console.log(this.bannerTop[item])
					item = this.bannerTop[item];
				}
				if (item.jump_type == 0) {
					// 网页
					uni.navigateTo({
						url: `/pages/index/h5/h5?url=${item.jump}`
					})
				} else if (item.jump_type == 1) {
					// 分类
					console.log(this, item.jump)
					this.$store.commit('fl', item.jump)
					uni.switchTab({
						url: '/pages/fenlei/fenlei'
					});
				} else if (item.jump_type == 2) {
					// 如商城
					uni.navigateTo({
						url: '/pages/index/rushangcheng/rushangcheng'
					})
				} else if (item.jump_type == 3) {
					// 转盘
					uni.navigateTo({
						url: '/pages/index/zhuanpan/zhuanpan'
					})
				} else if (item.jump_type == 4) {
					// 商品
					uni.navigateTo({
						url: `/pages/index/shangpinxiangqin/shangpinxiangqin?id=${item.id}`
					})
				} else if (item.jump_type == 5) {
					// 建材街道
					uni.navigateTo({
						url: `/pages/index/jiancaijiedao/jiancaijiedao?id=${item.id}`
					})
				} else if (item.jump_type == 6) {
					// 商品分类
					uni.navigateTo({
						url: `/pages/index/rushangcheng/rushangcheng?id=${item.jump}`
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	// page {
	// 	background: #F2F3F5;
	// }
</style>
<style scoped lang="scss">
	.index {}

	.item {
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.pic1 {
		// transform: rotate(90deg);
		width: 100%;
		margin: 0;
		padding: 0;
	}

	.txt {
		width: 804rpx;
		position: absolute;
		top: 360rpx;
		transform: rotate(90deg);
		text-align: center;
		left: 134rpx;
		color: #FFFFFF;
		font-size: 60rpx;
		letter-spacing: 8rpx;
	}
</style>
