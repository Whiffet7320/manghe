<template>
	<view class="index">
		<view class="nav1">
			<view class="tit1">
				<view class="txt1">浙江省</view>
				<u-icon name="arrow-down" color="#000000" size="20"></u-icon>
				<view class="myInp">
					<u-icon name="search" color="#000000" size="28"></u-icon>
					<u-input v-model="searchVal" input-align='center' placeholder='搜索专家/项目/关键词'
						placeholder-style='color: #122106;' type="text" height="60rpx" />
				</view>
			</view>
			<view class="tit2">
				<view class="hot">
					<view class="txt1-1">热搜榜</view>
					<image src="/static/Group.png" class="pic" mode=""></image>
				</view>
				<view class="txt2">肋骨鼻综合</view>
				<view class="txt2">小眼综合</view>
				<view class="txt2">胸部整形</view>
				<view class="txt2">面部抗衰</view>
			</view>
			<view class="tit3">
				<u-swiper height='320rpx' :list="list"></u-swiper>
			</view>
		</view>
		<view class="nav2">
			<view class="items">
				<view class="item">
					<image src="/static/img/nav-fl-active.png" class="pic-item" mode=""></image>
					<view class="txt-item">眼部整形</view>
				</view>
				<view class="item">
					<image src="/static/img/nav-fl-active.png" class="pic-item" mode=""></image>
					<view class="txt-item">胸部整形</view>
				</view>
				<view class="item">
					<image src="/static/img/nav-fl-active.png" class="pic-item" mode=""></image>
					<view class="txt-item">鼻部整修</view>
				</view>
				<view class="item">
					<image src="/static/img/nav-fl-active.png" class="pic-item" mode=""></image>
					<view class="txt-item">玻尿酸</view>
				</view>
				<view class="item">
					<image src="/static/img/nav-fl-active.png" class="pic-item" mode=""></image>
					<view class="txt-item">瘦脸针</view>
				</view>
			</view>
			<view class="items items2">
				<view class="item">
					<image src="/static/img/nav-fl-active.png" class="pic-item" mode=""></image>
					<view class="txt-item">医学美肤</view>
				</view>
				<view class="item">
					<image src="/static/img/nav-fl-active.png" class="pic-item" mode=""></image>
					<view class="txt-item">脂肪填充</view>
				</view>
				<view class="item">
					<image src="/static/img/nav-fl-active.png" class="pic-item" mode=""></image>
					<view class="txt-item">半永久妆</view>
				</view>
				<view class="item">
					<image src="/static/img/nav-fl-active.png" class="pic-item" mode=""></image>
					<view class="txt-item">激光脱毛</view>
				</view>
				<view class="item">
					<image src="/static/img/nav-fl-active.png" class="pic-item" mode=""></image>
					<view class="txt-item">美丽咨询</view>
				</view>
			</view>
			<view class="nav2-1">
				<image src="/static/image/zu1501.png" class="pic3-1" mode=""></image>
				<view class="tit3-1">进口玻尿酸限时8.5折～赶紧加购吧～！</view>
			</view>
		</view>
		<view class="nav3">
			<view class="title">
				<view class="shu"></view>
				<view class="t-txt">修复专区</view>
			</view>
			<view class="items">
				<view class="item">
					<image src="/static/tabBar/sy-active.png" class="pic" mode=""></image>
					<view class="txt">鼻修复</view>
				</view>
				<view class="item">
					<image src="/static/tabBar/sy-active.png" class="pic" mode=""></image>
					<view class="txt">眼修复</view>
				</view>
				<view class="item">
					<image src="/static/tabBar/sy-active.png" class="pic" mode=""></image>
					<view class="txt">胸修复</view>
				</view>
				<view class="item">
					<image src="/static/tabBar/sy-active.png" class="pic" mode=""></image>
					<view class="txt">其他修复</view>
				</view>
			</view>
		</view>
		<view class="nav3 nav4">
			<view class="title">
				<view class="shu"></view>
				<view class="t-txt">专家团队</view>
			</view>
			<scroll-view class="scroll-view" scroll-x style="width: 100%;white-space:nowrap;">
				<view class="itemss">
					<view class="item">
						<image src="/static/tabBar/sy-active.png" class="pic" mode=""></image>
						<view class="right">
							<view class="txt1">
								巴扎嘿<text class="small">院长</text>
							</view>
							<view class="txt2">· 美容主治医生</view>
							<view class="txt2">· 医美湘军医生 集团创始人</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchVal: '',
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
			}
		},
		onShow() {

		},
		methods: {

		}
	}
</script>

<style>
	page {
		background: #F7F8FA;
		;
	}
</style>
<style lang="scss" scoped>
	.index {}

	.nav1 {
		width: 750rpx;
		height: 298rpx;
		background: linear-gradient(316deg, #F6A309 0%, #F8B607 22%, #FFD438 42%, #F9C706 51%, #F8CA20 80%, #FECF05 100%);
		padding: 0 36rpx;

		.tit1 {
			padding-top: 32rpx;
			display: flex;
			align-items: center;

			.txt1 {
				font-size: 28rpx;
				font-weight: 500;
				line-height: 40rpx;
				color: #122106;
				margin-right: 14rpx;
			}

			.myInp {
				margin-left: 60rpx;
				padding: 0 24rpx;
				width: 494rpx;
				height: 60rpx;
				background: rgba(255, 255, 255, 0.2);
				border-radius: 50rpx;
				display: flex;
				align-items: center;

				/deep/ .u-input {
					width: 400rpx !important;

					.u-input__input {
						font-size: 24rpx;
						font-weight: 400;
						line-height: 60rpx;
						color: #122106 !important;
					}
				}
			}
		}

		.tit2 {
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			padding: 0 10rpx;
			justify-content: space-between;

			.hot {
				display: flex;
				align-items: center;

				.txt1-1 {
					font-size: 24rpx;
					font-weight: bold;
					line-height: 34rpx;
					color: #122106;
				}

				.pic {
					margin-left: 8rpx;
					width: 20rpx;
					height: 20rpx;
				}
			}

			.txt2 {
				font-size: 24rpx;
				font-weight: 400;
				line-height: 34rpx;
				color: #122106;
			}
		}

		.tit3 {
			margin-top: 34rpx;
		}

	}

	.nav2 {
		background: #FFFFFF;
		margin-top: 232rpx;
		padding: 0 38rpx;

		.items {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.item {
				width: 20%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.pic-item {
					width: 76rpx;
					height: 76rpx;
				}

				.txt-item {
					margin-top: 20rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #BD9E81;
				}
			}
		}

		.items2.items {
			margin-top: 40rpx;
		}

		.nav2-1 {
			margin-top: 40rpx;
			padding-bottom: 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.pic3-1 {
				width: 28rpx;
				height: 28rpx;
				transform: translateX(16rpx);
				margin-right: 16rpx;
			}

			.tit3-1 {
				padding-left: 24rpx;
				width: 612rpx;
				height: 60rpx;
				background: #fff2ee;
				border-radius: 30rpx;
				font-size: 24rpx;
				font-weight: 500;
				color: #FF7C5E;
				line-height: 60rpx;
			}
		}
	}

	.nav3 {
		margin-top: 20rpx;
		width: 750rpx;
		background: #FFFFFF;
		padding: 28rpx 0;

		.title {
			display: flex;
			align-items: center;

			.shu {
				margin-left: 24rpx;
				margin-right: 20rpx;
				width: 6rpx;
				height: 28rpx;
				background: #BD9E81;
			}

			.t-txt {
				font-size: 28rpx;
				font-weight: bold;
				color: #BD9E81;
			}
		}

		.items {
			padding: 0 40rpx;
			margin-top: 36rpx;
			display: flex;
			align-items: center;

			.item {
				width: 25%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.pic {
					width: 150rpx;
					height: 150rpx;
					background: #FECF05;
					border-radius: 10rpx;
				}

				.txt {
					margin-top: 12rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #BD9E81;
				}
			}
		}
	}

	.nav4.nav3 {
		.itemss {
			display: flex;
			align-items: center;

			.item {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				.pic {
					height: 284rpx;
					width: 196rpx;
				}
				.right{
					width: 192rpx;
					margin-left: 20rpx;
					.txt1{
						margin-bottom: 16rpx;
						font-size: 32rpx;
						font-weight: bold;
						color: #BD9E81;
						.small{
							margin-left: 12rpx;
							font-weight: 500;
							font-size: 24rpx;
						}
					}
					.txt2{
						margin-top: 10rpx;
						font-size: 28rpx;
						font-weight: 500;
						color: #707071;
						word-wrap: break-word;
						word-break: break-all;
					}
				}
			}

		}
	}
</style>
