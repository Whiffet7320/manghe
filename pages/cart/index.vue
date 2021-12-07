<template>
	<view class="container">
		<u-navbar :title="'购物车('+cartCount+')'" back-icon-color="#000000" title-color="#000000" :background="{backgroundColor:'#FECF05'}" :border-bottom="false"></u-navbar>
		<view class="emptybox" v-if="cartList.valid.length == 0">
			<image src="/static/image/user/undraw.png" mode="aspectFit" class="icon"></image>
			<view class="text">购物车空空如也～</view>
			<view class="btn">去挑选</view>
		</view>
		<view class="alldelete" @click="unsetCart" v-if="isAllSelect">
			<image src="/static/image/user/icon_delete.png" mode="aspectFit" class="icon"></image>
			<text>全部清空</text>
		</view>
		<view class="cartlist" v-if="cartList.valid.length > 0">
			<u-checkbox-group @change="checkboxChange">
			<view class="cart_item" v-for="(item,index) in cartList.valid" :key="index">
				<view class="check">
					<u-checkbox v-model="item.checked" :name="item.id" shape="circle" :disabled="true" v-if="item.status==0"></u-checkbox>
					<u-checkbox v-model="item.checked" :name="item.id" shape="circle" active-color="#BD9E81" v-if="item.status==1"></u-checkbox>
				</view>
				<image v-if="item.productInfo.attrInfo" :src='item.productInfo.attrInfo.image' mode="aspectFill" class="img"></image>
				<image v-else :src='item.productInfo.image' mode="aspectFill" class="img"></image>
				<view class="info">
					<view class="hd">
						<view class="name u-line-2" :class="{'none':item.status==0}">{{item.productInfo.store_name}}</view>
						<view class="delete" @click="subDel(item.id,index)">
							<image src="/static/image/zu1527.png" mode="aspectFit" style="width: 29rpx;height:31rpx"></image>
						</view>
					</view>
					<view class="status" v-if="item.status==0">商品已经下架啦～要不瞧瞧别的～</view>
					<view class="ft" v-if="item.status==1">
						<view class="price">￥{{item.truePrice}}</view>
						<view class="numberbox" v-if="item.attrStatus">
							<view class="reduce" :class="item.numSub ? 'on' : ''" @click.stop='subCart(index)'>
								<image src="/static/image/user/jian.png" mode="aspectFit" style="width: 40rpx;height:40rpx;"></image>
							</view>
							<view class='num'>{{item.cart_num}}</view>
							<view class="plus" :class="item.numAdd ? 'on' : ''" @click.stop='addCart(index)'>
								<image src="/static/image/user/jia.png" mode="aspectFit" style="width: 40rpx;height:40rpx;"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			</u-checkbox-group>
		</view>
		<view class="likewrap"v-if="hotlist.length">
			<view class="tit">
				<image src="/static/image/user/icon_like.png" mode="aspectFit" style="width: 35rpx;height:29rpx;margin-right: 20rpx;"></image>
				<text>推荐商品</text>
			</view>
			<view class="likelist">
				<view class="like_item" v-for="(item,index) in hotlist" :key="index">
					<image :src="item.image" mode="aspectFill" class="img"></image>
					<view class="name">{{item.title}}</view>
					<view class="price">￥{{item.price}}</view>
				</view>
			</view>
		</view>
		<u-gap height="112"></u-gap>
		<view class="footbar" v-if="cartList.valid.length > 0">
			<view class="footbar_bar">
				<view class="allck">
					<u-checkbox-group width="42rpx" @change="checkboxAllChange">
						<u-checkbox v-model="isAllSelect" shape="circle" active-color="#BD9E81"/>
					</u-checkbox-group>
					<text class="text">全选</text>
				</view>
				<view class="bar_text">
					<text>合计：</text>
					<text class="price">¥{{selectCountPrice}}</text>
				</view>
				<view class="bar_btn" @click="subOrder">{{isAllSelect?"批量结算":"去结算"}}({{selectValue.length}})</view>
			</view>
		</view>
		<Dialog v-if="show" @close="onClose">
			<view class="modcontent">确定将购物车全部清空吗</view>
		</Dialog>
	</view>
</template>

<script>
	import {mapGetters} from "vuex";
	import Dialog from "@/components/dialog/dialog.vue";
	export default{
		components:{
			Dialog
		},
		data(){
			return{
				show:false,
				cartCount: 0,
				cartList: {
					valid: [],
					invalid: []
				},
				isAllSelect: false, //全选
				selectValue: [], //选中的数据
				selectCountPrice: 0.00,
				attr: {
					cartAttr: false,
					productAttr: [],
					productSelect: {}
				},
				productValue: [], //系统属性
				attrValue: '', //已选属性
				cartId: 0,
				product_id: 0,
				hotlist:[]
			}
		},
		methods:{
			getCartlist(){
				this.$api.cartlist().then((res)=>{
					let cartList = res.data;
					let validList = cartList.valid;
					if (validList.length > 0) {
						this.cartCount = validList.length;
						for (let index in validList) {
							validList[index].checked = false;
						}
					}
					this.cartList.valid = validList;
				})
			},
			ChangeCartNum(changeValue) {
				//changeValue:是否 加|减
				//获取当前变动属性
				let productSelect = this.productValue[this.attrValue];
				//如果没有属性,赋值给商品默认库存
				if (productSelect === undefined && !this.attr.productAttr.length)
					productSelect = this.attr.productSelect;
				//无属性值即库存为0；不存在加减；
				if (productSelect === undefined) return;
				let stock = productSelect.stock || 0;
				let num = this.attr.productSelect;
				if (changeValue) {
					num.cart_num++;
					if (num.cart_num > stock) {
						this.$set(this.attr.productSelect, "cart_num", stock ? stock : 1);
						this.$set(this, "cart_num", stock ? stock : 1);
					}
				} else {
					num.cart_num--;
					if (num.cart_num < 1) {
						this.$set(this.attr.productSelect, "cart_num", 1);
						this.$set(this, "cart_num", 1);
					}
				}
			},
			subCart(index) {
				let status = false;
				let item = this.cartList.valid[index];
				item.cart_num = Number(item.cart_num) - 1;
				if (item.cart_num < 1) status = true;
				if (item.cart_num <= 1) {
					item.cart_num = 1;
					item.numSub = true;
				} else {
					item.numSub = false;
					item.numAdd = false;
				}
				if (false == status) {
					this.$api.changeCartNum({id:item.id,number:item.cart_num}).then((res)=>{
						if(res.status==200){
							this.cartList.valid[index] = item;
							this.switchSelect();
						}
					})
				}
			},
			addCart(index) {
				let item = this.cartList.valid[index];
				item.cart_num = Number(item.cart_num) + 1;
				let productInfo = item.productInfo;
				if (productInfo.hasOwnProperty('attrInfo') && item.cart_num >= item.productInfo.attrInfo.stock) {
					item.cart_num = item.productInfo.attrInfo.stock;
					item.numAdd = true;
					item.numSub = false;
				} else {
					item.numAdd = false;
					item.numSub = false;
				}
				this.$api.changeCartNum({id:item.id,number:item.cart_num}).then((res)=>{
					if(res.status==200){
						this.cartList.valid[index] = item;
						this.switchSelect();
					}
				})
			},
			subDel(id,index){
				let selectValue = this.selectValue;
				if (selectValue.length > 0){
					this.$api.cartDel(id).then(res => {
						if(res.status==200){
							uni.showToast({
								title:"删除成功",
								icon:"none"
							})
							this.cartList.valid.splice(index,1);
						}
					});
				}else{
					uni.showToast({
						title:"请选择产品",
						icon:"none"
					})
				}
			},
			subOrder(){
				let narry = [];
				let val = this.cartList.valid.filter(item=>item.checked);
				if(val.length){
					val.forEach(item=>{
						narry.push(item);
					})
				}
				let selectValue = this.selectValue;
				if (selectValue.length > 0) {
					let skuItem = narry;
					uni.navigateTo({
						url: `/pages/users/order/tijiaodingdan?skuItem=${JSON.stringify(skuItem)}&cartId=${selectValue.join(',')}&isGWC=yes`
					});
				} else {
					uni.showToast({
						title:"请选择产品",
						icon:"none"
					})
				}
			},
			checkboxAllChange(event) {
				let value = event;
				if (value.length>0) {
					this.setAllSelectValue(1);
				} else {
					this.setAllSelectValue(0);
				}
			},
			setAllSelectValue(status) {
				let selectValue = [];
				let valid = this.cartList.valid;
				if (valid.length > 0) {
					let newValid = valid.map(item => {
						if (status) {
							if (item.attrStatus) {
								item.checked = true;
								selectValue.push(item.id);
							} else {
								item.checked = false;
							}
							this.isAllSelect = true;
						} else {
							item.checked = false;
							this.isAllSelect = false;
						}
						return item;
					});
					this.cartList.valid = newValid;
					this.selectValue = selectValue;
					this.switchSelect();
				}
			},
			checkboxChange(val) {
				let value = val;
				let valid = this.cartList.valid;
				let arr1 = [];
				let arr2 = [];
				let arr3 = [];
				let newValid = valid.map(item => {
					if (this.inArray(item.id, value)) {
						if (item.attrStatus) {
							item.checked = true;
							arr1.push(item);
						} else {
							item.checked = false;
						}
					} else {
						item.checked = false;
						arr2.push(item);
					}
					return item;
				});
				arr3 = arr2.filter(item => !item.attrStatus);
				console.log(newValid)
				this.isAllSelect = newValid.length === arr1.length + arr3.length;
				this.selectValue = value;
				this.switchSelect();
			},
			inArray(search, array) {
				for (let i in array) {
					if (array[i] == search) {
						return true;
					}
				}
				return false;
			},
			switchSelect() {
				let validList = this.cartList.valid;
				let selectValue = this.selectValue;
				let selectCountPrice = 0.00;
				if (selectValue.length < 1) {
					this.selectCountPrice = selectCountPrice;
				} else {
					for (let index in validList) {
						if (this.inArray(validList[index].id, selectValue)) {
							selectCountPrice = this.$tool.argAdd(selectCountPrice, this.$tool.argMul(validList[index].cart_num, validList[index].truePrice))
						}
					}
					this.selectCountPrice = selectCountPrice;
				}
			},
			unsetCart(){
				this.show = !this.show;
			},
			onClose(val){
				if(val==="confirm"){
					this.$api.cartDel(this.selectValue).then(res => {
						uni.showToast({
							title:"删除成功",
							icon:"none"
						})
						this.getCartlist();
					}).catch(err => {
						console.log(err)
					});
				}
				this.show = !this.show;
			}
		},
		onShow(){
			this.getCartlist();
		}
	}
</script>

<style lang="scss" scoped>
	.alldelete{
		width: 100%;
		height: 74rpx;
		background: #FCFAF9;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #BD9E81;
		opacity: 1;
		.icon{
			width: 28rpx;
			height: 30rpx;
			margin-right: 20rpx;
		}
	}
	.cartlist{
		background-color: #F7F8FA;
		.cart_item{
			background-color: #FFFFFF;
			margin-bottom: 20rpx;
			padding: 24rpx 34rpx 24rpx 40rpx;
			display: flex;
			align-items: center;
			flex-direction: row;
			&:last-child{
				margin-bottom: 0;
			}
			.check{
				flex-shrink: 0;
			}
			.img{
				flex-shrink: 0;
				width: 160rpx;
				height: 160rpx;
				background-color: #eee;
				border-radius: 20rpx;
			}
			.info{
				padding-left: 24rpx;
				.hd{
					display: flex;
					flex-direction: row;
				}
				.name{
					padding-right: 56rpx;
					height: 76rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 40rpx;
					color: #BD9E81;
					&.none{
						color: #707070;
					}
				}
				.ft{
					margin-top: 40rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					.price{
						flex:1;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						line-height: 40rpx;
						color: #FA8677;
					}
					.numberbox{
						height: 44rpx;
						display: flex;
						justify-content: flex-end;
						.num{
							padding:0 24rpx;
							font-size: 26rpx;
							color: #707070;
							line-height: 44rpx;
						}
						.reduce{
							&.on{
								opacity: 0.5;
							}
						}
						.plus{
							&.on{
								opacity: 0.5;
							}
						}
					}
				}
				.status{
					margin-top: 40rpx;
					padding:0 24rpx;
					height: 44rpx;
					background: #FCFAF9;
					border-radius: 10rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 44rpx;
					color: #BD9E81;
				}
			}
		}
	}
	.emptybox{
		width: 100%;
		height: 572rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		.icon{
			margin-top: 96rpx;
			width: 228rpx;
			height: 172rpx;
		}
		.text{
			margin-top: 16rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			color: #707070;
		}
		.btn{
			margin-top: 74rpx;
			width: 278rpx;
			height: 60rpx;
			background: #BD9E81;
			border-radius: 10rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			line-height: 60rpx;
			color: #FFFFFF;
			text-align: center;
		}
	}
	.likewrap{
		background-color: #FFFFFF;
		.tit{
			width: 100%;
			height: 120rpx;
			background-color: #F7F8FA;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: row;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #BD9E81;
		}
		.likelist{
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			padding:40rpx 26rpx;
			.like_item{
				width: 50%;
				padding-left: 14rpx;
				box-sizing: border-box;
				margin-bottom: 20rpx;
				display: flex;
				flex-direction: column;
				.img{
					width: 334rpx;
					height: 334rpx;
					background-color: #eee;
					border-radius: 20rpx;
				}
				.name{
					padding:16rpx 0 12rpx 0;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #BD9E81;
				}
				.price{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FA8677;
				}
			}
		}
	}
	.footbar{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0 8rpx 28rpx rgba(166, 179, 194, 0.3);
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		user-select: none;
		.footbar_bar{
			height: 112rpx;
			padding:0 40rpx;
			display: flex;
			align-items: center;
			flex-direction: row;
			justify-content: flex-end;
		}
		.allck{
			display: flex;
			align-items: center;
			flex-direction: row;
			.text{
				font-size: 24rpx;
				color: #707070;
			}
		}
		.bar_text{
			flex:1;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			flex-direction: row;
			font-size: 24rpx;
			color: #707070;
			font-family: PingFang SC;
			padding-right: 24rpx;
			.price{
				font-size: 32rpx;
				color: #FA8677;
				font-weight: bold;
			}
		}
		.bar_btn{
			width: 278rpx;
			height: 80rpx;
			background: #BD9E81;
			border-radius: 40rpx;
			text-align: center;
			line-height: 80rpx;
			font-size: 28rpx;
			color:#FFFFFF;
		}
	}
	.modcontent{
		font-size: 28rpx;
		color: #707070;
	}
</style>
