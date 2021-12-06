<template>
	<view class="detail">
		<view class="content">
			<view class="hd">
				<image src="" mode="aspectFill" class="img"></image>
				<view class="name">250ml 雅漾补水喷雾赠一</view>
			</view>
			<view class="ft">
				<view class="left">产品体验使用感受</view>
				<view class="zan">
					<u-icon name="thumb-up-fill" size="21" color="#BD9E81"></u-icon>
					<text class="text">满意</text>
				</view>
				<view class="zan default">
					<u-icon name="thumb-down-fill" size="21" color="#999999"></u-icon>
					<text class="text">不满意</text>
				</view>
			</view>
		</view>
		<view class="comment_con">
			<view class="tit">评价（选填）</view>
			<view class="textarea">
				<textarea v-model="textarea" :auto-height="true" maxlength="100" placeholder="请输入" placeholder-style="color:#999" class="mtextarea"></textarea>
			</view>
			<view class="upic">
				<view class="upload">
					<image src="/static/image/user/upload.png" mode="aspectFit" class="icon"></image>
				</view>
				<view class="text">{{textarea.length}}/100</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				textarea:""
			}
		}
	}
</script>
<style>
	page{
		background: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.content{
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		.hd{
			margin-left: 40rpx;
			border-bottom: 2px solid #F7F8FA;
			padding: 32rpx 40rpx 48rpx 0;
			display: flex;
			.img{
				width: 94rpx;
				height: 94rpx;
				background-color: #eee;
			}
			.name{
				flex:1;
				padding-left: 20rpx;
				font-size: 24rpx;
				color: #BD9E81;
			}
		}
		.ft{
			padding: 28rpx 36rpx 28rpx 40rpx;
			display: flex;
			.left{
				flex:1;
				font-size: 28rpx;
				color:#BD9E81;
			}
			.zan{
				width: 154rpx;
				height: 60rpx;
				background: #F2ECE6;
				border-radius: 10rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				color:#707070;
				margin-left: 20rpx;
				.text{
					padding-left: 16rpx;
				}
				&.default{
					background: #F7F8FA;
					color:#999999;
				}
			}
		}
	}
	.comment_con{
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 40rpx;
		.tit{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #BD9E81;
			margin-bottom: 20rpx;
		}
		.textarea{
			width: 100%;
			min-height: 196rpx;
			.mtextarea{
				font-size: 28rpx;
				color: #707070;
			}
		}
		.upic{
			display: flex;
			justify-content: space-between;
			.upload{
				width: 120rpx;
				height: 120rpx;
				.icon{
					width: 120rpx;
					height: 120rpx;
				}
			}
			.text{
				font-size: 24rpx;
				color: #999999;
				display: flex;
				align-items: flex-end;
			}
		}
	}
</style>