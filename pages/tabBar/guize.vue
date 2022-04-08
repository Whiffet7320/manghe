<template>
	<view class="index">
		<view class="nav1">
			<view class="tit1">玩法说明</view>
			<view class="tit2">1、不同箱子内商品价值不同，相应的箱子价格也不同，你可以根据个人喜好进行选购。箱子价格以用户购买时页面展示的金额为准，用户购买箱子，根据平台提供的支付方式进行支付。</view>
			<view class="tit3">
				<image src="/static/img/zu4149.png" class="t3-pic1" mode=""></image>
				<image src="/static/img/mcz29.png" class="t3-pic1" mode=""></image>
			</view>
			<view class="tit2">2、您进行选购箱子并完成支付后，即可在线开箱，开箱结果为随机结果，您有机率获得箱子内任意一款商品。</view>
			<view class="tit3">
				<image src="/static/img/mcz31.png" class="t3-pic1" mode=""></image>
				<image src="/static/img/mcz32.png" class="t3-pic1" mode=""></image>
			</view>
			<view class="tit2">3、您可至【收纳盒】中查看您的开箱商品及开箱订单，并操作开箱商品发货、置换、拆解。</view>
			<view class="tit3">
				<image src="/static/img/zu4150.png" class="t3-pic1" mode=""></image>
				<image src="/static/img/mcz20.png" class="t3-pic1" mode=""></image>
			</view>
			<view class="tit4">注意事项</view>
			<view class="tit5">1、开箱所得商品均不支持7天无理由退换货，请您谨慎下单。</view>
			<view class="tit5">2、用户良好的体验感和满意度是“开箱啦”致力追求的，考虑到各类“箱子”产品随机实时开出您所得商品，多次打开同一系列“箱子”可能使您收到多款重复的商品，为避免商品闲置、资源浪费和拥护您的利益，“开箱啦”设置了置换和分解功能。</view>
			<view class="tit5">3、您可将收纳盒的商品择一或者多进行置换(仅支持“一换一”或者“多换一”),系统将通过想对固定的算法，根据您在仓库中选择兑换商品的价值进行测算并为您匹配价值相当及价值高于测算价值的商品供您自行选择。能够置换的商品以平台展示为准，您可根据平台提供的商品进行选择。</view>
			<view class="tit5">4、为保证您在进行商品置换时有更多的可选性，系统在为您匹配价值相当的可选商品供您付费兑换时，商品价值为相对相当，即选择的仓库商品价值和匹配商品的价值并非绝对一致，而是存在一定的上下浮动，浮动比例原则上不高于30%。您在进行置换时，即对此表示认可且无异于。</view>
			<view class="tit5">5、在收纳盒中选择需要分解的商品，可进行多个商品分解，确定分解后将摧毁该商品，同时可获得该商品的分解所得聚豆，聚豆可用于在兑换商城进行兑换商品，不可提现。一经分解，不可撤销，请谨慎操作。</view>
			<view class="tit5"> 6、平台不支持您以不喜欢商品或商品重复出现为由提出的取消订单或退款等申请，若您以此为由拒收商品，将视为您主动放弃该商品。</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
	}
</script>

<style lang="scss">
	page {
		background: #f7f7f7;
	}
</style>
<style lang="scss" scoped>
	.index{
		
	}
	.nav1{
		width: 690rpx;
		background: #ffffff;
		border-radius: 24rpx;
		margin: 28rpx auto;
		padding: 32rpx 24rpx;
		.tit1{
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			color: #333333;
		}
		.tit2{
			margin-top: 16rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			color: #333333;
		}
		.tit3{
			margin-top: 16rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.t3-pic1{
				width: 306rpx;
				height: 594rpx;
			}
		}
		.tit4{
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			color: #333333;
			margin-top: 44rpx;
			margin-bottom: 16rpx;
		}
		.tit5{
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			color: #333333;
		}
	}
</style>
