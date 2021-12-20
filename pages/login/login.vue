<template>
	<view class="index">
		<image src="/static/image/zu3029.png" class="bacImg" mode=""></image>
		<u-navbar :title-bold='true' title-color='#000000' :is-back="false" title-size='34'>
			<view class="slot-wrap">
				<image src="/static/image/lujin2814.png" class="top-pic" mode=""></image>
			</view>
		</u-navbar>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				background: {
					'background': 'transparent'
				},
			}
		},
	}
</script>

<style lang="scss" scoped>
	.index {
		position: relative;
	}
	.bacImg{
		position: absolute;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 100vh;
	}
	.home{
		position: absolute;
		top: 0;
		left: 0;
		width: 34rpx;
		height: 34rpx;
	}
</style>
