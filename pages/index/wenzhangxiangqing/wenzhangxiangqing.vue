<template>
	<view class="index">
		<u-parse :html="content"></u-parse>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				content:"",
				id:'',
			}
		},
		onLoad(option) {
			this.id = option.id;
		},
		onShow() {
			this.getData()
		},
		methods:{
			async getData(){
				const res = await this.$api.article(this.id)
				console.log(res.data)
				this.content = res.data.content;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.index{
		padding: 20rpx;
	}
</style>
