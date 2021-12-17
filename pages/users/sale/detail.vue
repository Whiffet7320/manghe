<template>
	<view class="saleDetail">
		<view class="steps">
			<view class="steps_item" :class="{'finish':index<step}" v-for="(item,index) in steps" :key="index">
				<view class="step_title" :class="{'active':index<=step}">{{item}}</view>
				<view class="step_circle_con">
					<view class="step_circle" :class="{'active':index<=step}"></view>
				</view>
				<view class="step_line"></view>
			</view>
		</view>
		<view class="pinfo" v-if="step==0||step==2 && orderInfo.cartInfo">
			<view class="tit">退款原因</view>
			<view class="proinfo" v-for="(item,index) in orderInfo.cartInfo" :key="index">
				<view class="left">
					<image :src="item.productInfo.image" mode="aspectFill" class="img"></image>
					<view class="num">+{{orderInfo.total_num}}</view>
				</view>
				<view class="desc">{{orderInfo.refund_reason_wap}}</view>
			</view>
		</view>
		<view class="jhpro" v-if="step==1">
			<view class="jtit">请寄回商品</view>
			<view class="tip">
                (请在<view class="time">6天23小时</view>内填写快递单号)
            </view>
			<view class="express_hd">
				<view class="hd">
					<view class="left">
						<text v-if="orderInfo.refund_express==''">需自己联系快递公司并填写快递单号</text>
						<text v-else>{{orderInfo.refund_express}}</text>
					</view>
					<view class="copy" @click="onCopy(orderInfo._status.refund_name + orderInfo._status.refund_phone + orderInfo._status.refund_address)">
						<image src="/static/image/user/icon_copy.png" mode="aspectFit" style="width: 22rpx;height:22rpx;margin-right:8rpx;"></image>
						<text>复制</text>
					</view>
				</view>
				<view class="bd" v-if="orderInfo._status.refund_name">
					<view class="top">退货地址：{{orderInfo._status.refund_name}} {{orderInfo._status.refund_phone}}</view>
					<view>{{orderInfo._status.refund_address}}</view>
				</view>
			</view>
			<view class="stit">填写快递单号</view>
			<view class="express_con">
				<input type="text" v-model="expressNum" class="inpt" placeholder="请填写退货快递单号" />
				<view class="right" @click="scanCode">
					<image src="/static/image/user/icon_photo.png" mode="aspectFit" style="width:41rpx;height:34rpx;margin-bottom:4rpx;"></image>
					<text>拍摄</text>
				</view>
			</view>
			<view class="stit" v-if="rshow">退货留言</view>
			<view class="comment_con" v-if="rshow">
				<view class="textarea">
					<textarea v-model="textarea" :auto-height="true" maxlength="100" placeholder="请详细填写您的退货留言" placeholder-style="color:#999" class="mtextarea"></textarea>
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
		</view>
		<view class="express" v-if="step==2">
			<text>快递单号</text>
			<text class="num">{{orderInfo.refund_express}}</text>
		</view>
		<view class="emptywrap" v-if="step==0">
			<view class="emptybox" v-if="status==0">
				<image src="/static/image/user/undraw_time.png" mode="aspectFit" class="icon"></image>
				<view class="title">
					<text>请耐心等待</text>
					<text>商家还未返回处理结果</text>
				</view>
			</view>
			<view class="emptybox" v-if="status==1">
				<image src="/static/image/user/undraw_cancel.png" mode="aspectFit" class="icon"></image>
				<view class="title">
					<text>商家拒绝了你的请求</text>
					<text>如有疑问请联系客服后再次申请</text>
				</view>
			</view>
		</view>
		<view class="emptywrap" v-if="step==3">
			<view class="emptybox">
				<image src="/static/image/user/undraw_shop.png" mode="aspectFit" style="width: 296rpx;height: 236rpx;"></image>
				<view class="title">
					<text>请耐心等待商家收货</text>
				</view>
			</view>
		</view>
		<view class="emptywrap" v-if="step==4">
			<view class="emptybox">
				<image src="/static/image/user/undraw_Balloons.png" mode="aspectFit" style="width:320rpx;height: 236rpx;"></image>
				<view class="title">
					<text>退款成功</text>
				</view>
			</view>
		</view>
		<u-gap height="120"></u-gap>
		<!-- <view class="footbar other safe-area-inset-bottom" v-if="step==0||step==2">
			<view class="subbtn">撤销申请</view>
		</view> -->
		<view class="footbar safe-area-inset-bottom" v-if="step==0 && status==1">
			<view class="subbtns" @click="ragainRefund">再次申请</view>
		</view>
		<view class="footbar other safe-area-inset-bottom" v-if="step==1">
			<view class="subbtns" @click="subRefund">提交</view>
			<!-- <view class="subbtn">撤销申请</view> -->
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				rshow:false,
				cartId:0,
				orderId:0,
				orderInfo:{},
				status:0,
				step:0,
				steps:["商家处理","寄回商品","商家收货","退款成功"],
				expressNum:"",
				textarea:"",
				imglist:[]
			}
		},
		methods:{
			scanCode(){
				uni.scanCode({
					success: (res) => {
						this.expressNum = res.result;
					}
				})
			},
			getOrderInfo() {
				this.$api.getRefundOrderDetail(this.orderId, this.cart_id).then(res => {
					if(res.status==200){
						this.orderInfo = res.data;
						this.getStatus(res.data.refund_type);
					}
				});
			},
			getStatus(status){
				switch(status){
					case 1:
						this.step = 1;
					break;
					case 3:
						this.step = 0;
						this.status = 1;
						this.rshow = true;
					break;
					case 4:
						this.step = 1;
					break;
					case 5:
						this.step = 2;
					break;
					case 6:
						this.step = 4;
					break;
				}
			},
			onCopy(str){
				if(str==""){
					return false;
				}
				uni.setClipboardData({
					data: str.toString(),
					success: () => {
						uni.showToast({
							title:"已复制到剪切板",
							icon:"none"
						})
					}
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
			ragainRefund(){
				this.$api.orderRefundVerify({
					refund_reason_wap_explain: this.textarea,
					refund_reason_wap_img: this.imglist.length?this.imglist.join(','):"",
					refund_type: 1,
					uni: this.orderId,
					cart_id: this.cartId,
					refund_num: this.orderInfo.total_num
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
			},
			subRefund(){
				this.$api.refundExpress({express_id: this.expressNum,id:this.orderInfo.id}).then(res => {
					uni.showToast({
						title:"操作成功",
						icon:"success"
					})
					setTimeout(()=>{
						uni.navigateBack();
					},1500)
				}).catch(err => {
					this.$u.toast(err);
				})
			}
		},
		onLoad(options){
			if(options.type){
				this.status = options.type;
			}
			if (options.cartId){
				this.cartId = options.cartId;
			}
			if(options.orderId){
				this.orderId = options.orderId;
			}
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
	@import "@/common/css/saleDetail.scss";
</style>