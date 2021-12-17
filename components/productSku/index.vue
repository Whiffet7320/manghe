<template>
	<view>
		<view class="product-window" :class="(attr.cartAttr === true ? 'on' : '') + ' ' + (iSbnt?'join':'') + ' ' + (iScart?'joinCart':'')">
			<view class="textpic">
				<view class="pictrue" @click="showImg()">
					<image :src="attr.productSelect.image" mode="aspectFill"></image>
				</view>
				<view class="text">
					<view class="money">
						<text class="num">￥{{ attr.productSelect.price }}</text>
						<text class="snum" v-if="attr.productSelect.ot_price">￥{{attr.productSelect.ot_price}}</text>
						<text class='vip-money'	v-if="is_vip>0 && attr.productSelect.vip_price">￥{{attr.productSelect.vip_price}}</text>
						<view class="vipImg" v-if="is_vip>0 && attr.productSelect.vip_price">
							<image src="/static/image/svip.gif"></image>
						</view>
					</view>
					<view class="stock" v-if='isShow'>库存: {{ attr.productSelect.stock }}</view>
					<view class='stock' v-if="limitNum">{{type ? '库存' : "限量"}}: {{attr.productSelect.quota}}</view>
					<view class="title u-line-1">{{ attr.productSelect.store_name }}</view>
				</view>
				<view class="iclose" @click="closeAttr">
					<image src="/static/image/icon_close.png" mode="aspectFit" style="width: 28rpx;height: 28rpx;"></image>
				</view>
			</view>
			<view class="rollTop">
				<view class="productWinList">
					<view class="item" v-for="(item, indexw) in attr.productAttr" :key="indexw">
						<view class="title">{{ item.attr_name }}</view>
						<view class="listn">
							<view class="itemn" :class="item.index === itemn.attr ? 'on' : ''" v-for="(itemn, indexn) in item.attr_value" @click="tapAttr(indexw, indexn)" :key="indexn">
								{{ itemn.attr }}
							</view>
						</view>
					</view>
				</view>
				<view class="cart">
					<view class="title">购买数量</view>
					<view class="carnum">
						<view class="item reduce" :class="attr.productSelect.cart_num <= 1 ? 'on' : ''" v-if="attr.productSelect.cart_num <= 1">
							<image src="/static/image/zu1458.png" mode="aspectFit" style="width: 50rpx;height:50rpx;"></image>
						</view>
						<view class="item reduce" :class="attr.productSelect.cart_num <= 1 ? 'on' : ''" @click="CartNumDes" v-else>
							<image src="/static/image/zu1458.png" mode="aspectFit" style="width: 50rpx;height:50rpx;"></image>
						</view>
						<view class='item num'>
							<input type="number" v-model="attr.productSelect.cart_num" data-name="productSelect.cart_num" @input="bindCode(attr.productSelect.cart_num)"></input>
						</view>
						<view v-if="iSplus" class="item plus" :class="attr.productSelect.cart_num >= attr.productSelect.stock? 'on': ''" @click="CartNumAdd">
							<image src="/static/image/zu1459.png" mode="aspectFit" style="width: 50rpx;height:50rpx;"></image>
						</view>
						<view v-else class='item plus'
							:class='(attr.productSelect.cart_num >= attr.productSelect.quota) || (attr.productSelect.cart_num >= attr.productSelect.product_stock) || (attr.productSelect.cart_num >= attr.productSelect.num) || (type=="seckill" && attr.productSelect.cart_num >= attr.productSelect.once_num)? "on":""'
							@click='CartNumAdd'><image src="/static/image/zu1459.png" mode="aspectFit" style="width: 50rpx;height:50rpx;"></image></view>
					</view>
				</view>
			</view>
			<view class="joinBnt" v-if="iSbnt && attr.productSelect.product_stock>0 &&attr.productSelect.quota>0" @click="goCat">我要参团</view>
			<view class="joinBnt on" v-else-if="(iSbnt && attr.productSelect.quota<=0)||(iSbnt &&attr.productSelect.product_stock<=0)">已售罄</view>
			<view class="joinBnt" v-if="iScart && attr.productSelect.stock" @click="goCat">确定</view>
			<view class="joinBnt on" v-else-if="iScart && !attr.productSelect.stock">已售罄</view>
		</view>
		<view class="mask" @touchmove.prevent :hidden="attr.cartAttr === false" @click="closeAttr"></view>
	</view>
</template>

<script>
	export default {
		props: {
			attr: {
				type: Object,
				default: () => {}
			},
			limitNum: {
				type: Number,
				value: 0
			},
			isShow: {
				type: Number,
				value: 0
			},
			iSbnt: {
				type: Number,
				value: 0
			},
			iSplus: {
				type: Number,
				value: 0
			},
			iScart: {
				type: Number,
				value: 0
			},
			is_vip: {
				type: Number,
				value: 0
			},
			type: {
				type: String,
				default: ''
			},
		},
		data() {
			return {};
		},
		mounted() {},
		methods: {
			getpreviewImage() {
				uni.previewImage({
					urls: this.attr.productSelect.image.split(','),
					current: this.attr.productSelect.image
				});
			},
			goCat() {
				this.$emit('goCat');
			},
			/**
			 * 购物车手动输入数量
			 * 
			 */
			bindCode(e) {
				this.$emit('iptCartNum', this.attr.productSelect.cart_num);
			},
			closeAttr() {
				this.$emit('myevent');
			},
			CartNumDes() {
				this.$emit('ChangeCartNum', false);
			},
			CartNumAdd() {
				this.$emit('ChangeCartNum', true);
			},
			tapAttr(indexw, indexn) {
				this.$emit("attrVal", {
					indexw: indexw,
					indexn: indexn
				});
				this.$set(this.attr.productAttr[indexw], 'index', this.attr.productAttr[indexw].attr_values[indexn]);
				let value = this.getCheckedValue().join(",");
				this.$emit("ChangeAttr", value);
			},
			//获取被选中属性；
			getCheckedValue() {
				let productAttr = this.attr.productAttr;
				let value = [];
				for (let i = 0; i < productAttr.length; i++) {
					for (let j = 0; j < productAttr[i].attr_values.length; j++) {
						if (productAttr[i].index === productAttr[i].attr_values[j]) {
							value.push(productAttr[i].attr_values[j]);
						}
					}
				}
				return value;
			},
			showImg() {
				this.$emit('getImg');
			},
		}
	}
</script>

<style scoped lang="scss">
	.vip-money {
		color: #282828;
		font-size: 28rpx;
		font-weight: 700;
		margin-left: 6rpx;
	}

	.vipImg {
		width: 68rpx;
		height: 27rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.product-window {
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		background-color: #fff;
		z-index: 100;
		border-radius: 16rpx 16rpx 0 0;
		transform: translate3d(0, 100%, 0);
		transition: all .3s cubic-bezier(.25, .5, .5, .9);
		padding-bottom: 140rpx;
		padding-bottom: calc(140rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		padding-bottom: calc(140rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
	}

	.product-window.on {
		transform: translate3d(0, 0, 0);
	}

	.product-window.join {
		padding-bottom: 30rpx;
	}

	.product-window.joinCart {
		padding-bottom: 30rpx;
		z-index: 10000;
	}

	.product-window{
		.textpic {
			padding:30rpx 144rpx 0 44rpx;
			position: relative;
			display: flex;
			justify-content: space-between;
			.pictrue {
				width: 180rpx;
				height: 180rpx;
				position: absolute;
				top:-20rpx;
				left:44rpx;
				image {
					width: 100%;
					height: 100%;
					border-radius: 20rpx;
					background-color: #eee;
				}
			}
			.text{
				flex: 1;
				padding-left: 216rpx;
				.title {
					font-size: 24rpx;
					color: #BD9E81;
				}
				.money {
					display: flex;
					align-items: center;
					.num {
						font-size: 40rpx;
						color: #FA8677;
						margin-right: 28rpx;
					}
					.snum{
						color: #707070;
						font-size: 24rpx;
						text-decoration: line-through;
					}
				}
				.stock {
					padding: 10rpx 0;
					font-size: 20rpx;
					color: #707070;
				}
			}
			.iclose {
				position: absolute;
				right: 44rpx;
				top: 30rpx;
			}
		}
		.rollTop {
			max-height: 500rpx;
			overflow: auto;
			margin-top: 36rpx;
		}
		.productWinList{
			.item{
				margin-top: 36rpx;
				.title {
					font-size: 28rpx;
					color: #BD9E81;
					padding: 0 44rpx;
				}
				.listn {
					padding: 0 44rpx 0 16rpx;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					.itemn {
						border: 1px solid #F2F2F2;
						font-size: 24rpx;
						color: #282828;
						padding: 18rpx 32rpx;
						border-radius: 44rpx;
						margin: 20rpx 0 0 14rpx;
						background-color: #F2F2F2;
						&.on {
							color: #BD9E81;
							background: #FCFAF9;
							border-color: #BD9E81;
						}
						&.limit {
							color: #999;
							text-decoration: line-through;
						}
					}
				}
			}
		}
		.cart {
			margin-top: 36rpx;
			padding: 0 44rpx 70rpx 44rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.title {
				font-size: 28rpx;
				color: #BD9E81;
			}
			.carnum {
				height: 54rpx;
				margin-top: 24rpx;
				display: flex;
				align-items: center;
				.num {
					// background: rgba(242, 242, 242, 1);
					width: 84rpx;
					color: #282828;
					font-size: 28rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					input{
						text-align: center;
					}
				}
				.reduce.on {
					opacity: 0.5;
				}
				.plus.on {
					opacity: 0.5;
				}
			}
		}
		.joinBnt {
			font-size: 30rpx;
			width: 620rpx;
			height: 86rpx;
			border-radius: 50rpx;
			text-align: center;
			line-height: 86rpx;
			color: #fff;
			margin: 21rpx auto 0 auto;
			background-color: #BD9E81;
			.on {
				background-color: #bbb;
				color: #fff;
			}
		}
	}
</style>
