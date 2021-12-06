<template>
	<view class="salewrap">
		<view class="prowrap">
			<view class="tit">退款商品</view>
			<view class="proinfo">
				<image src="" mode="aspectFill" class="img"></image>
				<view class="info">
					<view class="hd">
						<view class="name u-line-2">250ml 雅漾补水喷雾赠一</view>
						<text class="num">X1</text>
					</view>
					<view class="sprice">¥89.90</view>
					<view class="price">¥9.90</view>
				</view>
			</view>
		</view>
		<view class="subtit">退款信息</view>
		<view class="tkinfo">
			<view class="tkitem">
				<view class="label">货物状态</view>
				<view class="right">
					<view class="radio_group">
						<view class="radio" v-for="(item,index) in rlist" :key="index" @click="radioChange(item)">
							<image src="/static/image/user/icon_checked.png" mode="aspectFit" class="icon" v-if="value==item"></image>
							<view class="ick" v-else></view>
							<text>{{item}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="tkitem">
				<view class="label">退款原因</view>
				<view class="right" @click="show=true">
					<view class="stit gray" v-if="reason==''">请选择</view>
					<view class="stit" v-else>{{reason}}</view>
					<image src="/static/image/user/arrow_right.png" mode="aspectFit" class="icon_right"></image>
				</view>
			</view>
			<view class="tkitem">
				<view class="label">
					<view>退款金额</view>
					<view class="desc">可修改，最多 ¥9.90，含发货邮费 ¥0.00</view>
				</view>
				<view class="price">
					<input type="digit" v-model="price" class="ipt" />
				</view>
			</view>
		</view>
		<view class="comment_con">
			<view class="tit2">详细原因（选填）</view>
			<view class="textarea">
				<textarea v-model="textarea" :auto-height="true" maxlength="100" placeholder="请输入" placeholder-style="color:#999" class="mtextarea"></textarea>
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
					<view class="radio" v-for="(item,index) in reasonlist" :key="index" @click="reasonChange(item)">
						<image src="/static/image/user/icon_checked.png" mode="aspectFit" class="icon" v-if="sreason==item"></image>
						<view class="ick" v-else></view>
						<text>{{item}}</text>
					</view>
				</view>
				<view class="btn" @click.stop="onSub">确定</view>
			</view>
		</u-popup>
		<u-gap height="104"></u-gap>
		<view class="ftbar safe-area-inset-bottom">
			<view class="subbtn">提交</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				show:false,
				value:"已收货",
				rlist:["已收货","未收货"],
				reason:"",
				price:"￥7.86",
				textarea:"",
				imglist:[],
				reasonlist:["买错/多买","不想要了","其他原因"],
				sreason:"买错/多买"
			}
		},
		methods:{
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
			radioChange(e){
				this.value = e;
			},
			reasonChange(e){
				this.sreason = e;
			},
			onSub(){
				this.show = !this.show;
				this.reason = this.sreason;
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
@import "@/common/css/sale.scss";
</style>
