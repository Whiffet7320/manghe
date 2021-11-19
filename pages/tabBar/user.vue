<template>
	<view class="index">
		<view class="nav1">
			
			<view class="nav1-flex">
				<image class="pic" src="https://img2.baidu.com/it/u=1991026848,3099564169&fm=26&fmt=auto" mode="">
				</image>
				<view class="f-right">
					<view class="tit1">
						<view class="txt1">Jay Jone</view>
						<image src="/static/image/zu1528.png" class="f-r-pic1" mode=""></image>
					</view>
					<view class="tit2">
						<view class="item">
							<view class="txt1">2</view>
							<view class="txt2">关注医生</view>
						</view>
						<view class="shu"></view>
						<view class="item">
							<view class="txt1">2</view>
							<view class="txt2">我的评论</view>
						</view>
						<view class="shu"></view>
						<view class="item">
							<view class="txt1">2</view>
							<view class="txt2">我的收藏</view>
						</view>
					</view>
				</view>
			</view>
			
			
		</view>
		
		<view class="uc">
			<view class="uc-item">
				
				<view class="uc-item-title" >
					<view class="uc-item-title-text">我的订单</view>
					<image class="uc-item-title-icon" src="../../static/image/user/jiantou.png"></image>
				</view>
				
				<view class="uc-item-body">
					
					<view class="uc-item-body-item" @click='gotoOrder'>
						<image class="uc-item-body-item-icon" src="../../static/image/user/daifukuan.png"></image>
							
						<view class="uc-item-body-item-text">待付款</view>
					</view>
					
					<view class="uc-item-body-item">
						<image class="uc-item-body-item-icon" src="../../static/image/user/daifuweikuan.png"></image>
							
						<view class="uc-item-body-item-text">待付尾款</view>
					</view>
					
					<view class="uc-item-body-item">
						<image class="uc-item-body-item-icon" src="../../static/image/user/yiwancheng.png"></image>
							
						<view class="uc-item-body-item-text">已完成</view>
					</view>
					
					<view class="uc-item-body-item">
						<image class="uc-item-body-item-icon" src="../../static/image/user/yiguanbi.png"></image>
							
						<view class="uc-item-body-item-text">已关闭</view>
					</view>
					
				</view>
			

				
			</view>
			
			<view class="uc-item">
				<view class="uc-item-title">
					<view class="uc-item-title-text">其他功能</view>
					<image class="uc-item-title-icon" src="../../static/image/user/jiantou.png"></image>
				</view>
				
				<view class="uc-item-body">
					
					<view class="uc-item-body-item">
						<image class="uc-item-body-item-icon" src="../../static/image/user/dizhiguanli.png"></image>
							
						<view class="uc-item-body-item-text">地址管理</view>
					</view>
					
					<view class="uc-item-body-item">
						<image class="uc-item-body-item-icon" src="../../static/image/user/fenxiangma.png"></image>
							
						<view class="uc-item-body-item-text">分享码</view>
					</view>
					
					<view class="uc-item-body-item">
						<image class="uc-item-body-item-icon" src="../../static/image/user/wodeyuyue.png"></image>
							
						<view class="uc-item-body-item-text">我的预约</view>
					</view>
					
					<view class="uc-item-body-item">
						<image class="uc-item-body-item-icon" src="../../static/image/user/wodejifen.png"></image>
							
						<view class="uc-item-body-item-text">我的积分</view>
					</view>
					
					<view class="uc-item-body-item">
						<image class="uc-item-body-item-icon" src="../../static/image/user/jifendingdan.png"></image>
							
						<view class="uc-item-body-item-text">积分订单</view>
					</view>
					
					<view class="uc-item-body-item">
						<image class="uc-item-body-item-icon" src="../../static/image/user/wodetuandui.png"></image>
							
						<view class="uc-item-body-item-text">我的团队</view>
					</view>
					
					<view class="uc-item-body-item">
						
					</view>
					
					<view class="uc-item-body-item">
						
					</view>
					
				</view>
			
			
				
			</view>
			
			<view class="uc-item">
				
				<view class="uc-item-last">
					
					<view class="uc-item-last-item">
						<image class="uc-item-last-item-icon" src="../../static/image/user/dianhua.png"></image>
						
						<view class="uc-item-last-item-text">
							电话咨询
						</view>
					</view>

					<view class="uc-item-last-item">
						<image class="uc-item-last-item-icon" src="../../static/image/user/kefu.png"></image>
						
						<view class="uc-item-last-item-text">
							专属客服
						</view>
					</view>					
					
				</view>
			
			
				
			</view>
			
			<view class="form-button">
				<view>退出登录</view>
			</view>
			
		</view>
		
		
	</view>
</template>

<script>
	export default {
		onShow() {

		},
		data() {
			return {

			}
		},
		methods: {
			//呼叫
			CallPhone(value) {
				uni.makePhoneCall({
					phoneNumber: value,
					success: (res) => {
						console.log(res)
					}
				})
			},
			gotoOrder(){
				console.log(1111)
				uni.navigateTo({
					url:"/pages/users/order"
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background: #f7f8fa;
	}
</style>
<style lang="scss" scoped>
	.form-button{
		width: 522rpx;
		height: 80rpx;
		background: #BD9E81;
		opacity: 1;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 88rpx auto 0 auto;
		color: #FFFFFF;

		
	}
	.uc{
		display: flex;
		flex-direction: column;
		margin:0 24rpx;
		margin-top: -28rpx;
		
		.uc-item:not(:first-child){
			margin-top: 28rpx;
		}
		.uc-item{
			color:#BD9E81;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			.uc-item-title{
				margin-top:28rpx;
				margin-left: 28rpx;
				margin-right: 28rpx;
				display: flex;
				justify-content: space-between;
				.uc-item-title-icon{
					width: 12rpx;
					height: 24rpx;
				}

			}
			
			.uc-item-body{
				display: flex;
				justify-content: space-around;

				margin-bottom:28rpx;
				flex-wrap:wrap;
				.uc-item-body-item{
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 25%;
					margin-top:28rpx;
					.uc-item-body-item-icon{
						width: 46rpx;
						height: 46rpx;
					}
				}
			}
			
			.uc-item-last-item{
				height: 96rpx;
				display: flex;
				align-items: center;
				
				.uc-item-last-item-icon{
					width: 26rpx;
					height: 34rpx;
					margin-left: 42rpx;
				}
				.uc-item-last-item-text{
					margin-left: 18rpx;
				}
			}
		}
	}

	.nav1 {
		width: 750rpx;
		height: 298rpx;
		background: linear-gradient(316deg, #F6A309 0%, #F8B607 22%, #FFD438 42%, #F9C706 51%, #F8CA20 80%, #FECF05 100%);
		padding: 0 36rpx;
		.nav1-flex {
			padding-top: 40rpx;
			display: flex;
			align-items: center;
			.pic {
				width: 184rpx;
				height: 184rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
			.f-right{
				height: 184rpx;
				display: flex;
				flex: 1;
				flex-direction: column;
				.tit1{
					display: flex;
					align-items: center;
					justify-content: space-between;
					.txt1{
						font-size: 36rpx;
						font-weight: bold;
						line-height: 50rpx;
						color: #122106;
					}
					.f-r-pic1{
						width: 40rpx;
						height: 40rpx;
					}
				}
				.tit2{
					margin-top: 38rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.shu{
						width: 0rpx;
						height: 56rpx;
						border: 2rpx solid #FFFFFF;
						opacity: 0.2;
					}
					.item{
						display: flex;
						flex-direction: column;
						align-items: center;
						height: 96rpx;
						.txt1{
							font-size: 32rpx;
							font-weight: 800;
							line-height: 44rpx;
							color: #122106;
						}
						.txt2{
							margin-top: 12rpx;
							font-size: 28rpx;
							font-weight: 500;
							line-height: 40rpx;
							color: #122106;
						}
					}
				}
			}
		}

	}
</style>
