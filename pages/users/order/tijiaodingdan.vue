<template>
	<view class="index">
		<!-- 有地址 -->
		<view class="nav1" @click="toAddAddress">
			<view class="left">
				<view class="tit1">
					<view class="txt1">周一二</view>
					<view class="txt2">15059585958</view>
				</view>
				<view class="tit2">
					<view class="b1">默认</view>
					<view class="txt1">浙江省温州市永嘉县梧田街道哼哈大的亲吻你的我的武器带我去厦1d1001室</view>
				</view>
			</view>
			<u-icon name="arrow-right" color="#999999" size="26"></u-icon>
		</view>
		<!-- 无地址 -->
		<view @click="toAddAddress" class="noAddress">添加收货地址</view>
		<view class="nav2" v-for="item in 2">
			<view class="nav2-1">
				<image src="https://img2.baidu.com/it/u=4006635947,2132087516&fm=26&fmt=auto" class="pic" mode="">
				</image>
				<view class="right">
					<view class="tit1">
						<view class="txt1">250ml 雅漾补水喷漾补水喷漾补水漾补水喷漾补水喷雾赠一</view>
						<view class="txt2">X1</view>
					</view>
					<view class="down">
						<view class="tit2">¥89.90</view>
						<view class="tit3">¥ 9.90</view>
					</view>

				</view>
			</view>
			<view class="nav2-2">
				<view class="tit1">
					<view class="txt1">商品金额</view>
					<view class="txt2">¥ 9.90</view>
				</view>
				<view class="tit1">
					<view class="txt1">运费</view>
					<view class="txt2">¥ 0.00</view>
				</view>
				<view class="tit1">
					<view class="txt1">优惠券</view>
					<view class="txt2">- ¥0.00</view>
				</view>
				<view class="tit1">
					<view class="txt1">合计</view>
					<view class="txt2">¥ 9.90</view>
				</view>
			</view>
		</view>
		<view class="nav3">
			<view class="tit1">
				<view class="txt1">留言</view>
				<view class="txt2">{{InpNum}}/100</view>
			</view>
			<u-input @input='changInp' v-model="value" type="textarea" placeholder='(选填，可在此给商家留言)' maxlength='100' :clearable='false' :border="false" />
		</view>
		<view class="footer">
			<view class="left">
				<view class="txt1">合计¥9.90</view>
				<view class="txt2">(共1件)</view>
			</view>
			<view @click="toQuerenzhifu" class="btn">立即支付</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				value:'',
				InpNum:0,
			}
		},
		methods:{
			changInp(e){
				console.log(e.length)
				this.InpNum = e.length;
			},
			toQuerenzhifu(){
				uni.navigateTo({
					url:'/pages/users/order/querendingdan'
				})
			},
			toAddAddress(){
				uni.navigateTo({
					url:'/pages/users/address/xinjiandizhi'
				})
			},
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
	.noAddress{
		width: 375px;
		height: 44px;
		background: #BD9E81;
		font-size: 14px;
		font-weight: bold;
		line-height: 44px;
		color: #FFFFFF;
		text-align: center;
	}
	.nav1 {
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 40rpx;

		.left {
			.tit1 {
				display: flex;
				align-items: center;

				.txt1 {
					font-size: 24rpx;
					font-weight: bold;
					color: #707070;
				}

				.txt2 {
					margin-left: 20rpx;
					font-size: 24rpx;
					font-weight: bold;
					color: #707070;
				}
			}

			.tit2 {
				margin-top: 12rpx;
				display: flex;

				.b1 {
					margin-top: 4rpx;
					margin-right: 6rpx;
					height: 24rpx;
					width: 48rpx;
					font-size: 18rpx;
					background: #BD9E81;
					line-height: 24rpx;
					text-align: center;
					color: #FFFFFF;
					border-radius: 4rpx;
				}

				.txt1 {
					width: 560rpx;
					font-size: 24rpx;
					font-weight: 400;
					line-height: 34rpx;
					color: #707070;
				}
			}
		}
	}

	.nav2 {
		background: #FFFFFF;
		padding: 28rpx 0 28rpx 40rpx;
		margin-top: 20rpx;

		.nav2-1 {
			display: flex;
			padding-right: 28rpx;
			padding-bottom: 28rpx;
			border-bottom: 2rpx solid #EFEFEF;

			.pic {
				height: 170rpx;
				width: 170rpx;
				border-radius: 8rpx;
			}

			.right {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				width: 480rpx;
				margin-left: 20rpx;
				height: 170rpx;

				.tit1 {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.txt1 {
						width: 410rpx;
						font-size: 28rpx;
						font-weight: 500;
						color: #BD9E81;
						word-break: break-all;
						text-overflow: ellipsis;
						overflow: hidden;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.txt2 {
						font-size: 24rpx;
						font-weight: 400;
						color: #999999;
					}
				}
				.down{
					.tit2{
						font-size: 24rpx;
						font-weight: 400;
						color: #707070;
					}
					.tit3{
						margin-top: 8rpx;
						font-size: 28rpx;
						font-weight: 800;
						color: #FA8677;
					}
				}
			}
		}
		.nav2-2{
			padding-right: 40rpx;
			margin-top: 24rpx;
			.tit1{
				margin-top: 30rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.txt1{
					font-size: 24rpx;
					font-weight: 400;
					color: #707070;
				}
				.txt2{
					font-size: 24rpx;
					font-weight: 500;
					color: #707070;
				}
			}
		}
	}
	.nav3{
		margin-bottom: 160rpx;
		margin-top: 20rpx;
		height: 288rpx;
		background: #FFFFFF;
		padding: 40rpx;
		.tit1{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.txt1{
				font-size: 28rpx;
				font-weight: 500;
				color: #BD9E81;
			}
			.txt2{
				font-size: 24rpx;
				font-weight: 400;
				color: #707070;
			}
		}
		/deep/ .u-input{
			margin-top: 10rpx;
			.u-input__textarea{
				font-size: 24rpx;
			}
		}
	}
	.footer {
		position: fixed;
		display: flex;
		justify-content: space-between;
		padding: 10rpx 40rpx 0 40rpx;
		bottom: 0;
		width: 100%;
		height: 140rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 8rpx 28rpx rgba(166, 179, 194, 0.3);

		.left{
			height: 84rpx;
			display: flex;
			align-items: center;
			.txt1{
				font-size: 24rpx;
				font-weight: bold;
				color: #BD9E81;
			}
			.txt2{
				margin-left: 20rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #707070;
			}
		}
		.btn{
			width: 320rpx;
			height: 84rpx;
			background: #BD9E81;
			border-radius: 44rpx;
			font-size: 28rpx;
			font-weight: bold;
			line-height: 84rpx;
			text-align: center;
			color: #FFFFFF;
		}
	}
</style>
