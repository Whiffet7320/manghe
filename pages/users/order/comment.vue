<template>
	<view class="detail">
		<view class="content">
			<view class="hd">
				<view class="pinfo" v-for="(item,index) in comentInfo" :key="index">
					<image :src="item.productInfo.image" mode="aspectFill" class="img"></image>
					<view class="name">{{item.productInfo.store_name}}</view>
				</view>
			</view>
			<view class="ft">
				<view class="left">产品体验使用感受</view>
				<view class="zan" :class="{'default':isZan}" @click="onZan(5)">
					<u-icon name="thumb-up-fill" size="21" color="#BD9E81" v-if="isZan"></u-icon>
					<u-icon name="thumb-up-fill" size="21" color="#999999" v-else></u-icon>
					<text class="text">满意</text>
				</view>
				<view class="zan" :class="{'default':!isZan}" @click="onZan(0)">
					<u-icon name="thumb-down-fill" size="21" color="#BD9E81" v-if="!isZan"></u-icon>
					<u-icon name="thumb-down-fill" size="21" color="#999999" v-else></u-icon>
					<text class="text">不满意</text>
				</view>
			</view>
		</view>
		<view class="comment_con">
			<view class="tit">评价（选填）</view>
			<view class="textarea">
				<textarea v-model="textarea" :auto-height="true" maxlength="100" placeholder="请输入" placeholder-style="color:#999" class="mtextarea"></textarea>
			</view>
			<view class="upic">
				<view class="imglist">
					<view class="vimg" v-for="(item,index) in pics" :key="index" @tap="viewImage(index)">
						<image :src="item" mode="aspectFill" class="img"></image>
						<view class="iclose" @tap.stop="DelPic(index)">
							<image src="/static/image/user/icon_close.png" mode="aspectFit" style="width: 27rpx;height: 36rpx;"></image>
						</view>
					</view>
					<view class="upload" v-if="pics.length < 3" @tap="uploadpic">
						<image src="/static/image/user/upload.png" mode="aspectFit" class="icon"></image>
					</view>
				</view>
				<view class="text">{{textarea.length}}/100</view>
			</view>
		</view>
		<u-gap height="120"></u-gap>
		<view class="footbar safe-area-inset-bottom">
			<view class="subbtn" @click="onSubmit">提交</view>
		</view>
		<canvas canvas-id="canvas" v-if="canvasStatus" :style="{width: canvasWidth + 'px', height: canvasHeight + 'px',position: 'absolute',left:'-100000px',top:'-100000px'}"></canvas>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default{
		data(){
			return{
				orderId: '',
				isZan:true,
				score:5,
				textarea:"",
				pics:[]
			}
		},
		computed: {
			...mapState(["comentInfo"])
		},
		methods:{
			onZan(val){
				this.isZan = !this.isZan;
				this.score = val;
			},
			viewImage(index){
				uni.previewImage({
					urls:this.pics,
					current:index
				})
			},
			DelPic(index) {
				this.pics.splice(index, 1);
			},
			uploadpic() {
				this.canvasStatus = true;
				this.$tool.uploadImageChange('upload/image', (res)=> {
					this.pics = this.pics.concat(res.data.url);
				}, (res) => {
					this.canvasStatus = false;
				}, (res) => {
					this.canvasWidth = res.w;
					this.canvasHeight = res.h;
				});
			},
			onSubmit(){
				if (!this.textarea){
					this.$u.toast('请填写你对宝贝的心得！');
					return;
				}
				let data = {
					unique:this.comentInfo[0].unique,
					comment:this.textarea,
					pics:this.pics,
					product_score:this.score
				}
				uni.showLoading({
					title: "正在发布评论……"
				});
				this.$api.orderComment(data).then((res)=>{
					uni.hideLoading();
					uni.showToast({
						title: '感谢您的评价',
						icon:"success"
					})
					setTimeout(e => {
						this.$store.commit("setResh",true);
						uni.navigateBack();
					}, 1500)
				})
			}
		},
		onLoad(options) {
			console.log(this.comentInfo)
			if (!options.id){
				this.$u.toast("缺少参数");
				uni.navigateBack();
				return;
			}
			this.orderId = options.id;
		}
	}
</script>
<style>
	page{
		background: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.content{
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		.hd{
			margin-left: 40rpx;
			border-bottom: 2px solid #F7F8FA;
			padding: 32rpx 40rpx 48rpx 0;
			.pinfo{
				display: flex;
			}
			.img{
				width: 94rpx;
				height: 94rpx;
				background-color: #eee;
			}
			.name{
				flex:1;
				padding-left: 20rpx;
				font-size: 24rpx;
				color: #BD9E81;
			}
		}
		.ft{
			padding: 28rpx 36rpx 28rpx 40rpx;
			display: flex;
			.left{
				flex:1;
				font-size: 28rpx;
				color:#BD9E81;
			}
			.zan{
				width: 154rpx;
				height: 60rpx;
				background: #F7F8FA;
				color:#999999;
				border-radius: 10rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				margin-left: 20rpx;
				.text{
					padding-left: 16rpx;
				}
				&.default{
					background: #F2ECE6;
					color:#707070;
				}
			}
		}
	}
	.comment_con{
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 40rpx;
		.tit{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #BD9E81;
			margin-bottom: 20rpx;
		}
		.textarea{
			width: 100%;
			min-height: 196rpx;
			.mtextarea{
				width: 100%;
				font-size: 28rpx;
				color: #707070;
			}
		}
		.upic{
			display: flex;
			justify-content: space-between;
			.imglist{
				display: flex;
				flex-wrap: wrap;
				.vimg{
					width: 120rpx;
					height: 120rpx;
					border-radius: 20rpx;
					margin-right: 20rpx;
					position: relative;
					.img{
						width: 100%;
						height: 100%;
					}
					.iclose{
						position: absolute;
						top:-18rpx;
						right:-10rpx;
						z-index: 20;
					}
				}
				.upload{
					width: 120rpx;
					height: 120rpx;
					.icon{
						width: 120rpx;
						height: 120rpx;
					}
				}
			}
			.text{
				font-size: 24rpx;
				color: #999999;
				display: flex;
				align-items: flex-end;
			}
		}
	}
	.footbar{
		position: fixed;
		bottom: 0;
		left:0;
		right: 0;
		z-index: 50;
		width: 100%;
		height: 110rpx;
		background-color: #FFFFFF;
		box-shadow: 0 8rpx 28rpx rgba(166, 179, 194, 0.3);
		padding:0 34rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.subbtn{
			width: 100%;
			height: 84rpx;
			line-height: 84rpx;
			background: #BD9E81;
			border-radius: 44rpx;
			text-align: center;
			font-size: 28rpx;
			color: #FFFFFF;
			font-weight: bold;
		}
	}
</style>