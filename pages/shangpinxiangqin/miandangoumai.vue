<template>
	<view class="index">
		<view class="nav">
			<image src="../../static/vv.png" mode=""></image>
			<u-icon @tap="goTo" class="icon" name="arrow-left" size="40"></u-icon>
		</view>
		<view class="container">
			<image src="../../static/Path.png" mode=""></image>
			<view class="tit1">免单购买协议</view>
			<view class="close">
				<image src="../../static/组82.png" mode=""></image>
			</view>
			<view class="center">
				<view class="txt1">
					1.甲方在验收中，如果发现产品的品种、型号、规格、花色和质量不合规定，应一面妥为保管，一面在30天内向乙方提出书面异议;在托收承付期内，甲方有权拒付不符合合同规定部分的货款。甲方怠于通知或者自标的物收到之日起过两年内未通知乙方的，视为产品合乎规定
				</view>
				<view class="txt1">
					2.甲方因使用、保管、保养不善等造成产品质量下降的，不得提出异议。 </view>
				<view class="txt1">
					3.乙方在接到需方书面异议后，应在10天内负责处理，否则，即视为默认甲方提出的异议和处理意见。 </view>
				<view class="txt1">
					第六条　乙方的违约责任 </view>
				<view class="txt1">
					1.乙方不能交货的，应向甲方偿付不能交货部分货款的___%的违约金。 </view>
				<view class="txt1">
					2.乙方所交产品品种、型号、规格、质量不符合规定的，由乙方负责包换或包修，并承担修理、调换或退货而支付的实际费用。
				</view>
				<view class="txt1">
					4.乙方逾期交货的，应比照中国人民银行有关延期付款的规定，按逾期交货部分货款计算，向甲方偿付逾期交货的违约金，并承担甲方因此所受的损失费用。 </view>
				<view class="txt1">
					6.产品错发到货地点或接货人的，乙方除应负责运交合同规定的到货地点或接货人外，还应承担甲方因此多支付的一切实际费用和逾期交货的违约金。 </view>
				<view class="txt1">
					第七条　甲方的违约责任 </view>
				<view class="txt1">
					1.甲方中途退货，应向乙方偿付退货部分货款___%的违约金。 </view>
				<view class="txt2">
					4.甲方逾期付款的，应按中国人民银行有关延期付款的规定向乙方偿付逾期付款的违约金。 </view>

			</view>
		</view>
		<view class="footer">
			<u-checkbox-group class="tit">
				<u-checkbox v-model="checked"><text>我已阅读且了解并签约协议</text></u-checkbox>
			</u-checkbox-group>
			<view class="item">
				<view class="tit1">立即购买</view>
				<u-icon class="icon" name="arrow-right" size="20"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: true
			}
		},
		methods:{
			goTo(){
				uni.navigateTo({
					url:"/pages/shangpinxiangqin/shangpinxiangqin"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.index {
		position: relative;
	}

	.nav {
		position: relative;

		image {
			width: 748rpx;
			height: 618rpx;
			opacity: 1;
		}

		.icon {
			position: absolute;
			top: 87rpx;
			left: 47rpx;
		}
	}

	.container {
		position: absolute;
		top: 268rpx;
		width: 750rpx;
		height: 1065rpx;
		opacity: 1;

		image {
			width: 100%;
			height: 100%;
		}

		.tit1 {
			position: absolute;
			top: 49rpx;
			left: 50%;
			transform: translateX(-50%);
			opacity: 1;
			font-size: 29rpx;
			font-family: Source Han Sans CN, Source Han Sans CN-Medium;
			font-weight: 500;
			text-align: center;
			color: #4a4a4a;
			line-height: 36rpx;
			font-weight: 800;
		}

		.close {
			position: absolute;
			top: 37rpx;
			right: 64rpx;
			width: 31rpx;
			height: 31rpx;
			opacity: 1;
		}

		.center {
			position: absolute;
			top: 114rpx;
			left: 50%;
			transform: translateX(-50%);
			// border: 2rpx solid red;
			width: 639rpx;
			margin: 0 auto;

			.txt1 {
				margin-bottom: 50rpx;
				opacity: 1;
				font-size: 18rpx;
				font-family: SourceHanSansCN-Regular;
				text-align: left;
				color: #4a4a4a;
				line-height: 36rpx;
			}

			.txt2 {
				margin-bottom: 110rpx;
				opacity: 1;
				font-size: 18rpx;
				font-family: SourceHanSansCN-Regular;
				text-align: left;
				color: #4a4a4a;
				line-height: 36rpx;
			}
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 80rpx;
		opacity: 1;
		background: #ffffff;
		border-top: 2rpx solid #ddd;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.tit {
			margin-left: 36rpx;

			text {
				margin-left: 18rpx;
				opacity: 1;
				font-size: 20rpx;
				font-family: SourceHanSansCN-Regular;
				text-align: left;
				color: #9b9b9b;
				line-height: 36rpx;
			}
		}

		.item {
			width: 223rpx;
			height: 80rpx;
			opacity: 1;
			background: #eee;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 20rpx;
			font-family: SourceHanSansCN-Regular;
			text-align: right;
			color: #9b9b9b;
			line-height: 36rpx;

			.tit1 {
				margin-right: 16rpx;
			}
		}
	}
</style>
