<script>
	export default {
		globalData: {
			spid: 0,
			code: 0
		},
		onLaunch: function(route) {
			console.log(route, 'onLaunch')
		},
		onShow: function(route) {
			console.log(route, 'onShow')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	page{
		font-family: PingFang SC;
	}
</style>
