<template>
	<view class="index">
		<view class="container">
			<u-parse :html="content"></u-parse>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				content:''
			}
		},
		async onShow() {
			const res = await this.$api.guide_content()
			console.log(res)
			this.content = res.content
		},
	}
</script>

<style scoped lang="scss">
	.index{
		
	}
	.container{
		
	}
</style>
