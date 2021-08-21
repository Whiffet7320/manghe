<template>
	<view class="index">
		<view class="nav1">
			<view class="tit1">
				<image class="pic1" src="/static/img/1229310763000_mthumb.png" mode=""></image>
				<view class="txt1">李师傅</view>
				<u-rate active-color="#1677FF" size='30' gutter="16" v-model="rateVal">
				</u-rate>
				<view class="txt2">{{rateVal}}.0</view>
			</view>
			<view class="tit2">
				<u-input v-model="txtValue" :clearable='false' type="textarea" :border="true" height="160" />
			</view>
			<view class="tit3">
				<view v-for="(item,i) in imgArr" :key='i' class="imgItem" @click="chooseImg(i)">
					<image class="pic1" :src="item" mode=""></image>
					<u-icon v-if='item == "" ' name="plus" color="#E6E6E6" size="36"></u-icon>
				</view>
			</view>
		</view>
		<view @click="onSubmit" class="btn">确认发布</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rateVal: 0,
				txtValue:'',
				imgArr: [''],
			}
		},
		methods:{
			onSubmit(){
				console.log(this.rateVal,this.txtValue,this.imgArr)
			},
			chooseImg(i) {
				const that = this;
				uni.chooseImage({
					count: 1,
					success: function(res) {
						const img = JSON.stringify(res.tempFilePaths[0])
						const newImg = img.substring(1, img.length - 1);
						that.$set(that.imgArr, i, newImg)
						if (!that.imgArr[i + 1] && that.imgArr.length != 6) {
							that.$set(that.imgArr, i + 1, '');
							that.imgArrNum = that.imgArr.length - 1;
						} else {
							that.imgArrNum = 6;
						}
						uni.getFileSystemManager().readFile({
							filePath: newImg, //选择图片返回的相对路径
							encoding: "base64", //这个是很重要的
							success: async res => { //成功的回调
								//返回base64格式
								// console.log(res.data)
							}
						})
					}
				});
			},
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
		margin-top: 20rpx;
		width: 750rpx;
		// height: 524rpx;
		background: #FFFFFF;
		opacity: 1;
		padding: 20rpx;

		.tit1 {
			display: flex;
			align-items: center;

			.pic1 {
				width: 76rpx;
				height: 76rpx;
				background: #FFFFFF;
				border-radius: 50%;
				opacity: 1;
			}

			.txt1 {
				margin-left: 20rpx;
				margin-right: 40rpx;
				font-size: 32rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 42rpx;
				color: #000000;
			}
			.txt2{
				margin-left: 40rpx;
				font-size: 28rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 38rpx;
				color: #000000;
			}
		}
		.tit2{
			margin-top: 20rpx;
		}
		.tit3 {
			display: flex;
			flex-wrap: wrap;
			margin-top: 30rpx;
			.imgItem {
				position: relative;
				margin: 0rpx 16rpx 20rpx 0rpx;
				width: 160rpx;
				height: 160rpx;
				background: #FFFFFF;
				border: 2rpx dashed #E6E6E6;
				opacity: 1;
				display: flex;
				justify-content: center;
				align-items: center;
		
				.pic1 {
					width: 100%;
					height: 100%;
					position: absolute;
				}
			}
		}
			
	}
	.btn{
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 116rpx;
		background: #1677FF;
		font-size: 48rpx;
		font-family: Segoe UI;
		font-weight: 400;
		line-height: 116rpx;
		text-align: center;
		color: #FFFFFF;
	}
</style>
