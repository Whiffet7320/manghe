<template>
	<view class="group-con">
		<view class="header">
			<view class="pictrue">
				<image :src="storeCombination.image" mode="aspectFill"></image>
				<text class="teamr">{{storeCombination.people}}人拼</text>
			</view>
			<view class="text">
				<view class="u-line-1">{{storeCombination.title}}</view>
				<view class="money">
					￥<text class="num">{{storeCombination.price}}</text>
				</view>
			</view>
		</view>
		<view class="wrapper">
			<view class="title" v-if="pinkBool === 0">
				<view class="line"></view>
				<view class="name">
					剩余
					<CountDown :is-day="false" :tip-text="' '" :day-text="' '" :hour-text="' : '" :minute-text="' : '" :second-text="' '" :datatime="pinkT.stop_time"></CountDown>
					结束
				</view>
				<view class="line"></view>
			</view>
			<view class="tips font-num" v-if="pinkBool === 1">恭喜您拼团成功</view>
			<view class="tips" v-else-if="pinkBool === -1">还差{{ count }}人，拼团失败</view>
			<view class="tips font-num" v-else-if="pinkBool === 0">拼团中，还差{{ count }}人拼团成功</view>
			<view class="list" :class="[pinkBool === 1 || pinkBool === -1 ? 'result' : '', iShidden ? 'on' : '']">
				<view class="pictrue"><image :src="pinkT.avatar" mode="aspectFill"></image></view>
				<view class="acea-row row-middle" v-if="pinkAll.length > 0">
					<view class="pictrue" v-for="(item, index) in pinkAll" :key="index"><image :src="item.avatar" mode="aspectFill"></image></view>
				</view>
				<view class="pictrue" v-for="index in count" :key="index">
					<image class="img-none" src="/static/image/vacancy.png"></image>
				</view>
			</view>
			<view v-if="(pinkBool === 1 || pinkBool === -1) && count > 9" class="lookAll" @click="lookAll">
				{{ iShidden ? '收起' : '查看全部' }}
				<span class="iconfont" :class="iShidden ? 'icon-xiangshang' : 'icon-xiangxia'"></span>
			</view>
			<view v-if="userBool === 1 && isOk == 0 && pinkBool === 0">
				<view class="teamBnt">
					<button class="item u-reset-button" open-type="share">邀请好友参团</button>
				</view>
			</view>
			<view class="teamBnt" v-else-if="userBool === 0 && pinkBool === 0 && count > 0" @click="goPay">我要参团</view>
			<view class="teamBnt" v-if="pinkBool === 1 || pinkBool === -1" @click="goDetail(storeCombination.id)">再次开团</view>
			<view class="cancel" @click="getCombinationRemove" v-if="pinkBool === 0 && userBool === 1 && pinkT.uid == userInfo.uid">取消开团</view>
			<view class="lookOrder" v-if="pinkBool === 1" @click="goOrder">查看订单信息</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import CountDown from '@/components/countDown';
	export default{
		components:{
			CountDown
		},
		data(){
			return{
				currentPinkOrder: '', //当前拼团订单
				isOk: 0, //判断拼团是否完成
				pinkBool: 0, //判断拼团是否成功|0=失败,1=成功
				userBool: 0, //判断当前用户是否在团内|0=未在,1=在
				pinkAll: [], //团员
				pinkT: [], //团长信息
				storeCombination: [], //拼团产品
				storeCombinationHost: [], //拼团推荐
				pinkId: 0,
				count: 0, //拼团剩余人数
				iShidden: false,
				attr: {
					cartAttr: false,
					productSelect: {
						image: '',
						store_name: '',
						price: '',
						quota: 0,
						unique: '',
						cart_num: 1,
						quota_show: 0,
						product_stock: 0,
						num: 0
					},
					productAttr: []
				},
				cart_num: '',
				userInfo: {},
				posters: false,
				weixinStatus: false,
				attrTxt: '请选择', //属性页面提示
				attrValue: '' //已选属性
			}
		},
		computed:{
			...mapState(["isLogin"])
		},
		watch: {
			isLogin: {
				handler: function(newV, oldV) {
					if (newV) {
						this.getCombinationPink();
					} else {
						uni.navigateTo({
							url:"/pages/login/index"
						})
					}
				},
				deep: true
			}
		},
		methods:{
			goPay() {
				var data = {};
				data.productId = this.storeCombination.product_id;
				data.cartNum = this.attr.productSelect.cart_num;
				data.uniqueId = this.attr.productSelect.unique;
				data.combinationId = this.storeCombination.id;
				data.new = 1;
				this.$api.cartAdd(data).then(res => {
					uni.navigateTo({
						url: '/pages/users/order/tijiaodingdan?new=1&cartId=' + res.data.cartId +'&pinkId=' + this.pinkId
					});
				}).catch(err => {
					this.$u.toast(err);
				});
			},
			goOrder() {
				uni.navigateTo({
					url: '/pages/users/order/Detail?order_id=' + this.currentPinkOrder
				});
			},
			//拼团详情
			goDetail(id) {
				this.pinkId = id;
				uni.navigateTo({
					url: '/pages/yanxuanshangcheng/dijiapintuan/dijiapintuan?id=' + id
				});
			},
			//默认选中属性；
			DefaultSelect() {
				let productAttr = this.attr.productAttr,
					value = [];
				for (var key in this.productValue) {
					if (this.productValue[key].quota > 0) {
						value = this.attr.productAttr.length ? key.split(',') : [];
						break;
					}
				}
				//sort();排序函数:数字-英文-汉字；
				let productSelect = this.productValue[value.join(',')];
				if (productSelect && productAttr.length) {
					this.attr.productSelect.quota = productSelect.quota;
					this.attr.productSelect.unique = productSelect.unique;
					this.attr.productSelect.cart_num = 1;
					this.attr.productSelect.product_stock = productSelect.product_stock;
					this.attr.productSelect.quota_show = productSelect.quota_show;
					this.attrValue = value.join(',');
				} else if (!productSelect && productAttr.length) {
					this.attr.productSelect.quota = 0;
					this.attr.productSelect.unique = "";
					this.attr.productSelect.cart_num = 0;
					this.attr.productSelect.product_stock = 0;
					this.attr.productSelect.quota_show = 0;
					this.attrValue = "";
				} else if (!productSelect && !productAttr.length) {
					this.attr.productSelect.quota = 0;
					this.attr.productSelect.unique = this.storeCombination.unique || '';
					this.attr.productSelect.cart_num = 1;
					this.attr.productSelect.product_stock = 0;
					this.attr.productSelect.quota_show = 0;
					this.attrValue = "";
				}
			},
			setProductSelect() {
				var attr = this.attr;
				attr.productSelect.image = this.storeCombination.image;
				attr.productSelect.store_name = this.storeCombination.title;
				attr.productSelect.price = this.storeCombination.price;
				attr.productSelect.quota = 0;
				attr.productSelect.quota_show = 0;
				attr.productSelect.product_stock = 0;
				attr.cartAttr = false;
			},
			//拼团信息
			getCombinationPink() {
				this.$api.combinationPink(this.pinkId).then(res => {
					this.storeCombinationHost = res.data.store_combination_host;
					res.data.pinkT.stop_time = parseInt(res.data.pinkT.stop_time);
					this.storeCombination = res.data.store_combination;
					this.attr.productSelect.num = res.data.store_combination.num;
					this.pinkT = res.data.pinkT;
					this.pinkAll = res.data.pinkAll;
					this.count = res.data.count;
					this.userBool = res.data.userBool;
					this.pinkBool = res.data.pinkBool;
					this.isOk = res.data.is_ok;
					this.currentPinkOrder = res.data.current_pink_order;
					this.userInfo = res.data.userInfo;
					this.attr.productAttr = res.data.store_combination.productAttr;
					this.productValue = res.data.store_combination.productValue;
					this.setProductSelect();
					if (this.attr.productAttr != 0) this.DefaultSelect();
					if (res.data.is_ok == 1 && res.data.userBool == 0) {
						this.$u.toast('你不是该团的成员');
						setTimeout(()=>{
							uni.navigateBack();
						},1500)
					}
				}).catch(err => {
					this.$u.toast(err);
					setTimeout(()=>{
						uni.navigateBack();
					},1500)
				});
			},
			//拼团取消
			getCombinationRemove() {
				this.$api.combinationRemove({
					id: this.pinkId,
					cid: this.storeCombination.id
				}).then(res => {
					this.$u.toast(res.msg);
					setTimeout(()=>{
						uni.navigateBack();
					},1500)
				}).catch(err => {
					this.$u.toast(err);
				});
			},
			lookAll() {
				this.iShidden = !this.iShidden;
			}
		},
		onLoad(options) {
			if (options.scene) {
				var value = this.$tool.getUrlParams(decodeURIComponent(options.scene));
				if (typeof value === 'object') {
					if (value.id) options.id = value.id;
					//记录推广人uid
					if (value.pid) getApp().globalData.spid = value.pid;
				}
			}
			if (options.id) {
				this.pinkId = options.id;
				this.getCombinationPink();
			}
		},
		onShareAppMessage() {
			return {
				title: '您的好友' + this.userInfo.nickname + '邀请您参团' + this.storeCombination.title,
				path: '/pages/users/order/combinationStatus?id=' + this.pinkId,
				imageUrl: this.storeCombination.image
			}
		}
	}
</script>

<style>
	page{
		background-color: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.generate-posters {
		width: 100%;
		height: 170rpx;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 300;
		transform: translate3d(0, 100%, 0);
		transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
		border-top: 1rpx solid #eee;
		&.on {
			transform: translate3d(0, 0, 0);
		}
		.item {
			flex: 1;
			text-align: center;
			font-size: 30rpx;
		}
	}

	/*开团*/
	.group-con{
		.header {
			width: 100%;
			height: 186rpx;
			background-color: #fff;
			padding: 0 30rpx;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.pictrue {
				width: 140rpx;
				height: 140rpx;
				background-color: #eee;
				position: relative;
				image {
					width: 100%;
					height: 100%;
					border-radius: 6rpx;
				}
				.teamr {
					position: absolute;
					top: 28rpx;
					left: -5rpx;
					min-width: 100rpx;
					height: 36rpx;
					line-height: 36rpx;
					text-align: center;
					border-radius: 0 18rpx 18rpx 0;
					font-size: 20rpx;
					color: #fff;
					background-color: #BD9E81;
				}
			}
			.text {
				width: 540rpx;
				font-size: 30rpx;
				color: #BD9E81;
				.money {
					font-size: 24rpx;
					color: #FA8677;
					font-weight: bold;
					margin-top: 15rpx;
					.num {
						font-size: 32rpx;
					}
				}
			}
		}
		.wrapper {
			background-color: #fff;
			margin-top: 20rpx;
			padding: 2rpx 0 35rpx 0;
			.title {
				margin-top: 30rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.line {
					width: 136rpx;
					height: 1px;
					background-color: #ddd;
				}
				.name {
					margin: 0 45rpx;
					font-size: 28rpx;
					color: #282828;
					display: flex;
					align-items: center;
					justify-content: center;
					/deep/.time {
						margin: 0 14rpx;
						.styleAll {
							text-align: center;
							border-radius: 3rpx;
							font-size: 28rpx;
							font-weight: bold;
							display: inline-block;
							vertical-align: middle;
							padding: 2rpx 5rpx;
							color: #fc4141;
						}
						.timeTxt {
							color: #fc4141;
						}
					}
				}
			}
			.tips {
				font-size: 30rpx;
				font-weight: bold;
				text-align: center;
				margin-top: 30rpx;
				color: #999;
				&.font-num{
					color: #fc0000;
				}
			}
			.list {
				padding: 0 30rpx;
				margin-top: 45rpx;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				&.result {
					max-height: 240rpx;
					overflow: hidden;
					&.on {
						max-height: 2000rpx;
					}
				}
				.pictrue {
					width: 94rpx;
					height: 94rpx;
					margin: 0 0 29rpx 35rpx;
					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
						border:2rpx #BD9E81 solid;
						&.img-none {
							border: none;
						}
					}
				}
			}
			.lookAll {
				font-size: 24rpx;
				color: #282828;
				padding-top: 10rpx;
			}
			.teamBnt {
				font-size: 30rpx;
				width: 620rpx;
				height: 86rpx;
				border-radius: 50rpx;
				text-align: center;
				line-height: 86rpx;
				color: #fff;
				margin: 21rpx auto 0 auto;
				background-color: #BD9E81;
			}
			.cancel,.lookOrder {
				text-align: center;
				font-size: 24rpx;
				color: #282828;
				padding-top: 30rpx;
			}
		}
		.group-recommend {
			background-color: #fff;
			margin-top: 25rpx;
			.title {
				padding-right: 30rpx;
				margin-left: 30rpx;
				height: 85rpx;
				border-bottom: 1px solid #eee;
				font-size: 28rpx;
				color: #282828;
				.more {
					color: #808080;
					.iconfont {
						margin-left: 13rpx;
						font-size: 28rpx;
					}
				}
			}
			.list {
				margin-top: 30rpx;
				.item {
					width: 210rpx;
					margin: 0 0 25rpx 30rpx;
					.pictrue {
						width: 100%;
						height: 210rpx;
						position: relative;
						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
						.team {
							position: absolute;
							top: 28rpx;
							left: -5rpx;
							min-width: 100rpx;
							height: 36rpx;
							line-height: 36rpx;
							text-align: center;
							border-radius: 0 18rpx 18rpx 0;
							font-size: 20rpx;
							color: #fff;
							// background-image: linear-gradient(to right, #fb5445 0%, #e93323 100%);
						}
					}
					.name {
						font-size: 28rpx;
						color: #333;
						margin-top: 0.18rem;
					}
					.money {
						font-weight: bold;
						font-size: 28rpx;
					}
				}
			}
		}
	}
	.share-box {
		z-index: 1000;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;

		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
