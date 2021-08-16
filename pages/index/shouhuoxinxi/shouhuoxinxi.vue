<template>
	<view class="index">
		<view class="items">
			<view class="item" v-for="(item,i) in list" :key="item.address_id">
				<image class="pic1" src="/static/zu252@2x.png" mode=""></image>
				<view class="nav1">
					<view class="tit">
						<view class="tit1"></view>
						<view class="tit2">地址{{i+1}}</view>
						<view class="tit3">{{item.is_default == 1?'默认地址' : ''}}</view>
					</view>
					<u-icon @click="delAddress(item)" name="trash-fill"></u-icon>
				</view>
				<view class="nav2">
					<view class="box1">
						<view class="box1-1">
							<view class="tit1">收货人：{{item.name}}</view>
							<view class="tit2">联系方式：{{item.number}}</view>
						</view>
						<view class="box1-2">收货地址：{{item.province+''+item.city+''+item.area}}{{item.address}}</view>
					</view>
					<view class="box2" @click="toXiugaixinxi(item)">
						<u-icon name="arrow-right" color="#ebbfcc" size="28"></u-icon>
					</view>
				</view>
			</view>
		</view>

		<view class="btn" @tap="toXinjian">新建收货信息</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				openid: null,
				list: [],
				// 判断跳转至哪个页面
				page:null,
			}
		},
		onLoad(option) {
			console.log(option)
			if(option.page){
				this.page = option.page
			}
		},
		onShow() {
			this.openid = uni.getStorageSync('openid')
			this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$api.wx_userreceiver(this.openid);
				console.log(res)
				this.list = res.data;
			},
			toXinjian() {
				uni.navigateTo({
					url: "./xinjian"
				})
			},
			toXiugaixinxi(item) {
				uni.navigateTo({
					url: `/pages/index/shouhuoxinxi/xinjian?name=${item.name}&number=${item.number}&province=${item.province}&city=${item.city}&area=${item.area}&address=${item.address}&is_default=${item.is_default}&id=${item.address_id}`
				})
			},
			async delAddress(item) {
				var signstr = "openid=" + this.openid + "&id=" + item.id + "";
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.wx_deluserreceiver(this.openid, item.id, md);
				if (res.result == 1) {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success',
						duration: 1000,
					})
					this.getData()
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
						duration: 1000,
					})
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	page {
		background: #f7f7f7;
	}

	.index {
		position: relative;
	}

	.items {
		margin-bottom: 200rpx;

		.item {
			margin: 36rpx auto;
			position: relative;
			width: 714rpx;
			height: 214rpx;

			.pic1 {
				position: absolute;
				top: 0;
				left: 0;
				width: 714rpx;
				height: 214rpx;
				opacity: 1;
			}

			.nav1 {
				position: absolute;
				top: 27rpx;
				left: 10rpx;
				display: flex;
				width: 90%;
				align-items: center;
				justify-content: space-between;

				.tit {
					display: flex;

					.tit1 {
						width: 9rpx;
						height: 31rpx;
						opacity: 1;
						background: #ebbfcc;
					}

					.tit2 {
						margin-left: 18rpx;
						opacity: 1;
						font-size: 25rpx;
						font-family: PingFang SC, PingFang SC-Bold;
						font-weight: 700;
						text-align: left;
						color: #000000;
					}

					.tit3 {
						margin-left: 18rpx;
						opacity: 1;
						font-size: 25rpx;
						font-family: PingFang SC, PingFang SC-Bold;
						font-weight: 700;
						text-align: left;
						color: #ebbfcc;
					}
				}


			}

			.nav2 {
				position: relative;

				.box1 {
					position: absolute;
					top: 94rpx;
					left: 56rpx;

					.box1-1 {
						display: flex;

						.tit1 {
							opacity: 1;
							font-size: 22rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							color: #000000;
						}

						.tit2 {
							margin-left: 54rpx;
							opacity: 1;
							font-size: 22rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							color: #000000;
						}
					}

					.box1-2 {
						margin-top: 13rpx;
						opacity: 1;
						font-size: 22rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						color: #000000;
					}
				}

				.box2 {
					position: absolute;
					top: 120rpx;
					right: 57rpx;
				}
			}


		}
	}

	.btn {
		position: fixed;
		left: 76rpx;
		bottom: 80rpx;
		width: 598rpx;
		height: 80rpx;
		opacity: 1;
		background: #ebbfcc;
		border-radius: 18rpx;
		font-size: 22rpx;
		font-family: PingFang SC, PingFang SC-Bold;
		font-weight: 700;
		text-align: center;
		color: #ffffff;
		line-height: 80rpx;
	}
</style>
