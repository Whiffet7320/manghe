<template>
	<view class="index">
		<web-view v-if="url"  :src="url"></web-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				url:"",
			}
		},
		onLoad(option) {
			this.url = option.url;
			console.log(this.url)
		},
	}
</script>

<style>
</style>
