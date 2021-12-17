<template>
	<view class="salewrap">
		<view class="prowrap" v-if="orderInfo.cartInfo">
			<view class="tit">退款商品</view>
			<view class="proinfo" v-for="(item,index) in orderInfo.cartInfo" :key="index">
				<image :src="item.productInfo.image" mode="aspectFill" class="img"></image>
				<view class="info">
					<view class="hd">
						<view class="name u-line-2">{{item.productInfo.store_name}}</view>
						<text class="num">x{{item.cart_num}}</text>
					</view>
					<view v-if="item.productInfo.attrInfo">
						<view class="sprice">￥{{item.productInfo.attrInfo.ot_price}}</view>
						<view class="price">￥{{item.productInfo.attrInfo.price}}</view>
					</view>
					<view v-else>
						<view class="sprice">￥{{item.productInfo.ot_price}}</view>
						<view class="price">￥{{item.productInfo.price}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="subtit">退款信息</view>
		<view class="tkinfo">
			<view class="tkitem">
				<view class="label">退款原因</view>
				<view class="right" @click="show=true">
					<view class="stit gray" v-if="reason==''">请选择</view>
					<view class="stit" v-else>{{reason}}</view>
					<image src="/static/image/user/arrow_right.png" mode="aspectFit" class="icon_right"></image>
				</view>
			</view>
		</view>
		<view class="comment_con">
			<view class="tit2">换货说明</view>
			<view class="textarea">
				<textarea v-model="textarea" :auto-height="true" maxlength="100" placeholder="请填写换货说明，100字以内" placeholder-style="color:#999" class="mtextarea"></textarea>
			</view>
			<view class="upic">
				<view class="uleft">
					<view class="imglist">
						<view class="vimg" v-for="(item,index) in imglist" :key="index" @tap="viewImage(index)">
							<image :src="item" mode="aspectFill" class="img"></image>
							<view class="iclose" @tap.stop="delImg(index)">
								<image src="/static/image/user/icon_close.png" mode="aspectFit" style="width: 27rpx;height: 36rpx;"></image>
							</view>
						</view>
						<view class="upload" v-if="imglist.length < 3" @tap="chooseImage">
							<image src="/static/image/user/upload.png" mode="aspectFit" class="icon"></image>
						</view>
					</view>
				</view>
				<view class="text">{{textarea.length}}/100</view>
			</view>
		</view>
		<u-popup v-model="show" mode="bottom" height="646" border-radius="10" :closeable="false">
			<view class="modal">
				<view class="hd">
					<view class="title">
						<view>退款原因</view>
						<view class="desc">请选择原因</view>
					</view>
					<view class="close" @click.stop="show=false">
						<image src="/static/image/user/icon_close2.png" mode="aspectFit" class="icon"></image>
					</view>
				</view>
				<view class="rlist">
					<scroll-view scroll-y="true" style="height:340rpx;">
						<view class="radio" v-for="(item,index) in refundArray" :key="index" @click="reasonChange(item)">
							<image src="/static/image/user/icon_checked.png" mode="aspectFit" class="icon" v-if="sreason==item"></image>
							<view class="ick" v-else></view>
							<text>{{item}}</text>
						</view>
					</scroll-view>
				</view>
				<view class="btn" @click.stop="onSub">确定</view>
			</view>
		</u-popup>
		<u-gap height="104"></u-gap>
		<view class="ftbar safe-area-inset-bottom">
			<view class="subbtn" @click="subRefund">提交</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				cartId:0,
				orderId:0,
				orderInfo:{},
				show:false,
				reason:"",
				textarea:"",
				imglist:[],
				refundArray:["买错/多买","不想要了","其他原因"],
				sreason:"买错/多买"
			}
		},
		methods:{
			getOrderInfo() {
				this.$api.getRefundOrderDetail(this.orderId, this.cart_id).then(res => {
					if(res.status==200){
						this.orderInfo = res.data;
						this.refund_num = res.data.total_num;
					}
				});
			},
			getRefundReason(){
				this.$api.ordeRefundReason().then(res => {
					this.refundArray = res.data;
				})
			},
			viewImage(index) {
				uni.previewImage({
					urls: this.imglist,
					current: index
				});
			},
			delImg(index) {
				this.imglist.splice(index, 1);
			},
			chooseImage(){
				this.$tool.uploadImageOne('upload/image',(res)=> {
					this.imglist = this.imglist.concat(res.data.url);
				});
			},
			reasonChange(e){
				this.sreason = e;
			},
			onSub(){
				this.show = !this.show;
				this.reason = this.sreason;
			},
			subRefund(){
				if (this.reason==""){
					this.$u.toast("请选择退货原因");
					return false;
				}
				this.$api.orderRefundVerify({
					text: this.reason || '',
					refund_reason_wap_explain: this.textarea,
					refund_reason_wap_img: this.imglist.length?this.imglist.join(','):"",
					refund_type: 1,
					uni: this.orderId,
					cart_id: this.cartId,
					refund_num: this.refund_num
				}).then(res => {
					uni.showToast({
						title:"申请成功",
						icon:"success"
					})
					setTimeout(()=> {
						uni.reLaunch({
							url: "/pages/users/order/list"
						})
					}, 1500);
				}).catch(err => {
					this.$u.toast(err);
				})
			}
		},
		onLoad(options){
			if (options.cartId){
				this.cartId = options.cartId;
			}
			if(options.orderId){
				this.orderId = options.orderId;
			}
			this.getRefundReason();
			this.getOrderInfo();
		}
	}
</script>

<style>
	page{
		background: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
@import "@/common/css/sale.scss";
</style>
