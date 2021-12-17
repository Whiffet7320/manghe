<template>
	<view>
		<view class="newsDetail">
			<view class="title">{{articleInfo.title}}</view>
			<view class="list">
				<view class="label">发布时间：{{articleInfo.add_time}}</view>
				<view class="label">浏览量：{{articleInfo.visit}}</view>
			</view>
			<view class="conters">
				<u-parse :html="content" :lazy-load="true" :tag-style="tagStyle"></u-parse>
			</view>
			<view class="picTxt" v-if="store_info.id" @click="goPro(store_info.id)">
				<view class="pictrue">
					<image :src="store_info.image" mode="aspectFill"></image>
				</view>
				<view class="text">
					<view class="name u-line-1">{{store_info.store_name}}</view>
					<view class="money">
						￥<text class="num">{{store_info.price}}</text>
					</view>
					<view class="y_money">￥{{store_info.ot_price}}</view>
				</view>
				<view class="label"><text class="span">查看商品</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				articleInfo: [],
				store_info: {},
				content:'',
				tagStyle: {
					img: 'width:100%;'
				}
			}
		},
		methods: {
			 getArticleOne(){
			    this.$api.getArticleDetails(this.id).then(res=>{
					uni.setNavigationBarTitle({
						title:res.data.title.substring(0,7)
					});
					this.articleInfo = res.data;
					this.store_info = res.data.store_info ? res.data.store_info : {};
					this.content = res.data.content;
			    });
			},
			goPro(id){
				uni.navigateTo({
					url:"/pages/yanxuanshangcheng/rexiaoxiangqin/rexiaoxiangqin?id="+id
				})
			}
		},
		onLoad(options) {
		    if (options.id){
				this.id = options.id;
		    }else{
				uni.navigateBack({delta: 1 });
		    }
		},
		onShow(){
			this.getArticleOne();
		}
	}
</script>

<style lang="scss" scoped>
	.newsDetail{
		.title {
			padding: 0 30rpx;
			font-size: 34rpx;
			color: #282828;
			font-weight: bold;
			margin: 45rpx 0 23rpx 0;
			line-height: 1.5;
		}
		.list {
			margin: 0 30rpx;
			padding-bottom: 25rpx;
			display: flex;
			align-items: center;
			.label {
				margin-right: 27rpx;
				font-size: 24rpx;
				color: #999;
			}
		}
		.conters {
			padding: 0 30rpx;
			font-size: 32rpx;
			color: #707070;
			line-height: 1.7;
		}
		.picTxt {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 690rpx;
			height: 200rpx;
			border-radius: 20rpx;
			border: 1px solid #e1e1e1;
			position: relative;
			margin: 30rpx;
			.pictrue {
				width: 200rpx;
				height: 200rpx;
				image {
					width: 100%;
					height: 100%;
					border-radius: 20rpx 0 0 20rpx;
					display: block;
				}
			}
			.text {
				width: 460rpx;
				.name {
					font-size: 30rpx;
					color: #282828;
				}
				.money {
					font-size: 24rpx;
					margin-top: 40rpx;
					color: #fc0000;
					.num {
						font-size: 36rpx;
					}
				}
				.y_money {
					font-size: 26rpx;
					color: #999;
					text-decoration: line-through;
				}
			}
			.label {
				position: absolute;
				background-color: #303131;
				width: 160rpx;
				height: 50rpx;
				right: -7rpx;
				border-radius: 25rpx 0 6rpx 25rpx;
				text-align: center;
				line-height: 50rpx;
				bottom: 24rpx;
				.span {
					background-image: linear-gradient(to right, #fff71e 0%, #f9b513 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
				&::after {
					content: " ";
					position: absolute;
					width: 0;
					height: 0;
					border-bottom: 8rpx solid #303131;
					border-right: 8rpx solid transparent;
					top: -7rpx;
					right: 0;
				}
			}
		}
		.bnt {
			background-color: #4CD964;
			color: #fff;
			font-size: 30rpx;
			width: 690rpx;
			height: 90rpx;
			border-radius: 45rpx;
			margin: 48rpx auto;
			text-align: center;
			line-height: 90rpx;
		}
	}
</style>
