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
		<view class="pinfo" v-if="step==0||step==2">
			<view class="tit">退款原因</view>
			<view class="proinfo">
				<view class="left">
					<image src="" mode="aspectFill" class="img"></image>
					<view class="num">+3</view>
				</view>
				<view class="desc">东西有使用痕迹不想要！</view>
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
						<text v-if="expressNum==''">需自己联系快递公司并填写快递单号</text>
						<text v-else>{{expressNum}}</text>
					</view>
					<view class="copy" @click="onCopy(expressNum)">
						<image src="/static/image/user/icon_copy.png" mode="aspectFit" style="width: 22rpx;height:22rpx;margin-right:8rpx;"></image>
						<text>复制</text>
					</view>
				</view>
				<view class="bd">
					<view class="top">退货地址：陈同和百科 15059687878</view>
					<view>浙江省温州市瓯海区牛山广场写字楼1栋2009室</view>
				</view>
			</view>
			<view class="stit">填写快递单号</view>
			<view class="express_con">
				<input type="text" v-model="expressNum" class="inpt" placeholder="请填写换货快递单号" />
				<view class="right">
					<image src="/static/image/user/icon_photo.png" mode="aspectFit" style="width:41rpx;height:34rpx;margin-bottom:4rpx;"></image>
					<text>拍摄</text>
				</view>
			</view>
			<view class="stit">换货留言</view>
			<view class="comment_con">
				<view class="textarea">
					<textarea v-model="textarea" :auto-height="true" maxlength="100" placeholder="请详细填写您的换货留言" placeholder-style="color:#999" class="mtextarea"></textarea>
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
			<text class="num">34667218423623716</text>
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
		<view class="emptywrap" v-if="step==2">
			<view class="emptybox">
				<image src="/static/image/user/undraw_shop.png" mode="aspectFit" style="width: 296rpx;height: 236rpx;"></image>
				<view class="title">
					<text>请耐心等待商家收货</text>
				</view>
			</view>
		</view>
		<view class="emptywrap" v-if="step==3">
			<view class="emptybox">
				<image src="/static/image/user/undraw_package.png" mode="aspectFit" style="width:282rpx;height:242rpx;"></image>
				<view class="title">
					<text>请耐心等待商品送达</text>
				</view>
			</view>
		</view>
		<view class="emptywrap" v-if="step==4">
			<view class="emptybox">
				<image src="/static/image/user/undraw_Balloons.png" mode="aspectFit" style="width:320rpx;height: 236rpx;"></image>
				<view class="title">
					<text>已收货</text>
				</view>
			</view>
		</view>
		<u-gap height="120"></u-gap>
		<view class="footbar other safe-area-inset-bottom" v-if="step==0||step==2">
			<view class="subbtn">撤销申请</view>
		</view>
		<view class="footbar safe-area-inset-bottom" v-if="step==0 && status==1">
			<view class="subbtns">再次申请</view>
		</view>
		<view class="footbar other safe-area-inset-bottom" v-if="step==1">
			<view class="subbtns">提交</view>
			<view class="subbtn">撤销申请</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				status:0,
				step:0,
				steps:["商家处理","寄回商品","商家收货","商家发货","买家收货"],
				expressNum:"",
				textarea:"",
				imglist:[]
			}
		},
		methods:{
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
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: res => {
						for (let i = 0; i < res.tempFilePaths.length; i++) {
							// 读取图片宽高
							uni.getImageInfo({
								src: res.tempFilePaths[i],
								success: image => {
									uni.showLoading({
										mask:true,
										title:"上传中..."
									})
									uni.hideLoading();
									this.imglist = this.imglist.concat(image.path);
								}
							});
						}
					}
				});
			},
		},
		onLoad(options){
			if(options.type){
				this.status = options.type;
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
	@import "@/common/css/saleDetail.scss";
</style>