<script>
	export default {
		globalData: {
			spid: 0,
			code: 0,
			isLogin: false,
			userInfo: {},
			globalData: false
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
</style>
