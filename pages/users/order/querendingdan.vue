<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="nav1">
			<view class="tit1">支付剩余时间 0{{sdjTime}}</view>
			<view class="tit2">￥<text class="big">{{price}}</text></view>
			<view class="tit3">严选商城消费</view>
		</view>
		<view class="nav2">
			<view class="item">
				<view class="left">
					<u-icon name="weixin-circle-fill" color="#00C486" size="46"></u-icon>
					<view class="txt">微信支付</view>
				</view>
				<u-icon name="checkmark-circle-fill" color="#BD9E81" size="40"></u-icon>
			</view>
		</view>
		<view class="footer">
			<view @click="pay" class="btn">确认支付</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				wid:0,
				paytype:"yue",//weixin
				a: null,
				payObj: null,
				price: 0,
				sdjTime: 0,
			}
		},
		onLoad(options) {
			if(options.wid){
				this.wid = options.wid;
			}
			if(options.id){
				this.id = options.id;
			}
			if(options.uni){
				this.uni = options.uni;
			}
			if(options.payObj&&options.payObj!=='undefined'){
				this.payObj = JSON.parse(decodeURIComponent(options.payObj));
			}
			if(options.price){
				this.price = options.price;
			}
			console.log(this.payObj)
			var date = new Date();
			var min = date.getMinutes();
			date.setMinutes(min + 5);
			var y = date.getFullYear();
			var m = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);
			var d = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate();
			var h = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()
			var f = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
			var s = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds()
			var formatdate = `${y}-${m}-${d} ${h}:${f}:${s}`;
			console.log(formatdate)
			this.TimeDown('timer', formatdate)
		},
		methods: {
			TimeDown(id, endDateStr) {
				//结束时间
				var endDate = new Date(endDateStr);
				//当前时间
				var nowDate = new Date();
				//相差的总秒数
				var totalSeconds = parseInt((endDate - nowDate) / 1000);
				//天数
				var days = Math.floor(totalSeconds / (60 * 60 * 24));
				//取模（余数）
				var modulo = totalSeconds % (60 * 60 * 24);
				//小时数
				var hours = Math.floor(modulo / (60 * 60));
				modulo = modulo % (60 * 60);
				//分钟
				var minutes = Math.floor(modulo / 60);
				//秒
				var seconds = modulo % 60;
				if (minutes < 0 && seconds < 0) {
					this.sdjTime = "0:00"
				} else {
					this.sdjTime = minutes + ":" + seconds;
				}
				//延迟一秒执行自己
				setTimeout(() => {
					this.TimeDown(id, endDateStr);
				}, 1000)
			},
			async pay() {
				if(this.wid!==0){
					this.$api.orderWaitpay(this.wid).then((res)=>{
						if(res.status==200){
							let jsConfig = res.data.result.jsConfig;
							this.goPay(jsConfig);
						}
					})
				}else{
					this.$api.orderPay({
						uni: this.id,
						paytype: this.paytype,
						from: 'routine'
					}).then((res)=>{
						if (res.status == 200) {
							let jsConfig = res.data.result.jsConfig;
							this.goPay(jsConfig);
						}
					})
				}
			},
			goPay(jsConfig){
				switch (this.paytype) {
					case 'yue':
						uni.hideLoading();
						uni.showToast({
							title:"支付成功",
							icon:"success"
						})
						setTimeout(()=>{
							uni.redirectTo({
								url:"/pages/users/order/list"
							})
						},1500)
					break;
					case 'weixin':
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: jsConfig.timestamp,
							nonceStr: jsConfig.nonceStr,
							package: jsConfig.package,
							signType: jsConfig.signType,
							paySign: jsConfig.paySign,
							success: (res)=> {
								uni.hideLoading();
								uni.showToast({
									title:"支付成功",
									icon:"success"
								})
								setTimeout(()=>{
									uni.redirectTo({
										url:"/pages/users/order/list"
									})
								},1500)
							},
							fail: (err)=> {
								uni.hideLoading();
								console.log('fail:' + JSON.stringify(err));
								this.$u.toast("取消支付");
							},
							complete: (e)=> {
								uni.hideLoading();
								if (e.errMsg == 'requestPayment:cancel'){
									this.$u.toast("取消支付");
								}
							}
						});
					break;
				}
			}
		}
	}
</script>

<style>
	page {
		background: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.index {
		position: relative;
	}

	.nav1 {
		margin-top: 80rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.tit1 {
			font-size: 28rpx;
			font-weight: 400;
			color: #2E2E2E;
		}

		.tit2 {
			margin-top: 18rpx;
			margin-bottom: 16rpx;
			font-size: 36rpx;
			font-weight: bold;
			color: #2E2E2E;

			.big {
				font-size: 52rpx;
			}
		}

		.tit3 {
			font-size: 24rpx;
			font-weight: 400;
			color: #9C9C9C;
		}
	}

	.nav2 {
		margin-top: 80rpx;
		padding: 0 30rpx;

		.item {
			padding: 0 44rpx;
			background: #FFFFFF;
			width: 690rpx;
			height: 104rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.txt {
					margin-left: 20rpx;
				}
			}
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 140rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 8rpx 28rpx rgba(166, 179, 194, 0.3);

		.btn {
			width: 682rpx;
			height: 84rpx;
			background: #BD9E81;
			border-radius: 44rpx;
			margin-top: 10rpx;
			margin-left: 34rpx;
			font-size: 28rpx;
			font-weight: bold;
			line-height: 84rpx;
			color: #FFFFFF;
			text-align: center;
		}
	}
</style>
