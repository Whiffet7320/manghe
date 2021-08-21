<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="nav1">
			<u-checkbox-group shape="circle" @change="checkboxGroupChange">
				<u-checkbox @change="checkedAll" v-model="Allchecked" :name="quanxuan">全选</u-checkbox>
			</u-checkbox-group>
			<view v-if="editFlag" @click="editFlag=false" class="txt">编辑</view>
			<view v-else @click="editFlag=true" class="txt">完成</view>
		</view>
		<!-- 不为空 -->
		<view class="container">
			<view class="items">
				<view class="item" v-for="(item,i) in shopList" :key='i'>
					<u-checkbox shape="circle" @change="changeRadio" v-model='item.checked' :name="item.a">
					</u-checkbox>
					<image class="pic1" src="/static/img/1229310763000_mthumb.png" mode=""></image>
					<view class="tit1">
						<view class="txt1">
							栀久高级咖色大牌炸街西装套 春秋高端盐系韩版通sdaas盐系韩版通
						</view>
						<view class="txt2">
							<view class="txt2-1">￥<text class="big">{{item.price}}</text></view>
							<view class="txt2-2">
								<image @click="jianShop(item)" class="pic2" src="/static/img/zu121.png" mode=""></image>
								<view class="shopNum">{{item.shopNum}}</view>
								<image @click="jiaShop(item)" class="pic2" src="/static/img/zu122.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="editFlag" @click="toTijiaodingdan" class="footer">
			<view class="tit1">总计 ￥<text class="big">{{AllShopPrice}}</text></view>
			<view class="tit2">结算({{checkNum}})</view>
		</view>
		<view v-else @click="onDelShop" class="footer del">删除</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				editFlag:true,
				Allchecked: false,
				shopList: [{
					a: 1,
					checked: false,
					shopNum:1,
					price:99,
				}, {
					a: 2,
					checked: true,
					shopNum:1,
					price:1,
				}],
				checkNum: 0,
				checkList:[],
				AllShopPrice:0,
			}
		},
		watch: {
			shopList: {
				handler() {
					this.checkNum = 0;
					this.checkList = [];
					this.AllShopPrice = 0;
					this.shopList.forEach(ele => {
						if (ele.checked) {
							this.checkList.push(ele)
							this.checkNum++
							this.AllShopPrice += ele.price * ele.shopNum;
						}
					})
				},
				deep: true,
				immediate: true,
			}
		},
		methods: {
			toTijiaodingdan() {
				uni.navigateTo({
					url:"/pages/index/dingdantijiao/shangchengTijiaodingdan"
				})
			},
			onDelShop(){
				
			},
			jianShop(item) {
				if (item.shopNum == 1) {
					this.$refs.uToast.show({
						title: '数量不得少于一件',
						type: 'warning',
					})
				} else {
					item.shopNum--;
				}
			},
			jiaShop(item) {
				item.shopNum++;
			},
			// 全选
			checkedAll() {
				this.shopList.map(ele => {
					ele.checked = true ? this.Allchecked == false : true;
				})
			},
			changeRadio() {
				// const checkList = this.shopList.filter(ele => {
				// 	return ele.checked == true
				// })
				// console.log(checkList)
			},
			checkboxGroupChange() {},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F0F0F0;
	}
</style>
<style scoped lang="scss">
	.index {
		position: relative;
	}

	.nav1 {
		width: 750rpx;
		height: 76rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx 0 44rpx;

		.txt {
			font-size: 30rpx;
			font-family: SimHei;
			font-weight: 400;
			line-height: 42rpx;
			color: #4D8BFD;
		}
	}

	.container {
		.items {
			margin-top: 20rpx;

			.item {
				margin-bottom: 6rpx;
				padding: 0 24rpx;
				margin-left: 20rpx;
				display: flex;
				align-items: center;
				width: 710rpx;
				height: 232rpx;
				background: #FFFFFF;
				opacity: 1;
				border-radius: 24rpx;

				.pic1 {
					margin-left: -10rpx;
					width: 196rpx;
					height: 196rpx;
				}

				.tit1 {
					margin-left: 22rpx;
					display: flex;
					height: 208rpx;
					width: 386rpx;
					flex-direction: column;
					justify-content: space-between;

					.txt1 {
						font-size: 28rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						line-height: 38rpx;
						color: #000000;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.txt2 {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.txt2-1 {
							font-size: 24rpx;
							font-family: SimHei;
							font-weight: 400;
							line-height: 64rpx;
							color: #4D8BFD;

							.big {
								font-size: 48rpx;
							}
						}

						.txt2-2 {
							display: flex;
							align-items: center;

							.pic2 {
								height: 28rpx;
								width: 32rpx;
							}

							.shopNum {
								margin: 0 12rpx;
								font-size: 32rpx;
								font-family: SimHei;
								font-weight: 400;
								line-height: 42rpx;
								color: #4D8BFD;
							}
						}
					}
				}
			}
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 120rpx;
		background: #ffffff;
		display: flex;
		align-items: center;
		.tit1{
			flex: 1;
			margin-left: 36rpx;
			font-family: SimHei;
			font-weight: 400;
			line-height: 64rpx;
			color: #000000;
			font-size: 28rpx;
			.big{
				font-size: 48rpx;
			}
		}
		.tit2{
			width: 264rpx;
			height: 120rpx;
			background: #2680EB;
			font-size: 48rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 120rpx;
			color: #FFFFFF;
			text-align: center;
		}
	}
	.footer.del{
		background: #D7373F;
		font-size: 48rpx;
		font-family: Segoe UI;
		font-weight: 400;
		line-height: 120rpx;
		text-align: center;
		color: #FFFFFF;
	}
</style>
