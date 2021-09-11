<template>
	<view class="index">
		<view class="nav1">
			<view class="tit1">物品图片（必填）</view>
			<view class="tit2">请上传真实、完整、清晰的物品图片（{{imgArrNum}}/6）</view>
			<view class="tit3">
				<view v-for="(item,i) in imgArr" :key='i' class="imgItem" @click="chooseImg(i)">
					<image class="pic1" :src="item" mode=""></image>
					<u-icon v-if='item == "" ' name="plus" color="#E6E6E6" size="36"></u-icon>
				</view>
			</view>
		</view>
		<view class="nav2">
			<view class="tit1">需求说明（选填）</view>
			<view class="tit2">
				<u-input maxlength='150' v-model="textarea1"
					placeholder='请填写尺寸、体积、重量等信息，方便师傅带齐工具，并为您 准确提供准确报价（您上传的照片非常重要哦~）' type="textarea" border
					:height='218' />
				<view class="txt2">{{textarea1Length}}/150</view>
			</view>
		</view>
		<view class="nav3">
			<view class="tit1"></view>
			<view class="tit2">{{voiceTime}}</view>
			<u-icon @tap="playVoice" name="play-right-fill" color="#1677FF" size="36"></u-icon>
			<view @tap="delVoice" class="tit3">删除</view>
			<view v-if="audioStatus == 'playing'" class="tit4" @tap="startRecord">
				<image class="pic1" src="/static/img/zu30.png" mode=""></image>
				<view class="txt1">点击录音</view>
			</view>
			<view v-else class="tit4 tit5" @tap="endRecord">
				<image class="pic1" src="/static/img/zu30.png" mode=""></image>
				<view class="txt1">点击暂停</view>
			</view>
		</view>
		<view @click="onSubmit" class="nav4">确认</view>
	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	export default {
		data() {
			return {
				item_id:'',
				imgArr: [''],
				textarea1: '',
				imgArrNum: 0,
				textarea1Length: 0,
				voicePath: '',
				audioStatus: 'playing',
				voiceTime: '00"00"00',
				bgImg:'',
				bgName:'',
			}
		},
		onLoad(option) {
			console.log(option)
			let that = this;
			this.item_id = option.item_id;
			this.bgImg = option.bgImg;
			this.bgName = option.bgName;
			recorderManager.onStop(async function(res) {
				console.log(res)
				// await that.$OSSUpload('voice',res.tempFilePath)
				that.voicePath = await that.$OSSUpload('voice',res.tempFilePath)
				console.log(that.millisToMinutesAndSeconds(res.duration))
				that.voiceTime = `00"${that.millisToMinutesAndSeconds(res.duration)}`;
			});
		},
		watch: {
			textarea1() {
				this.textarea1Length = this.textarea1.length;
			},
		},
		methods: {
			onSubmit() {
				// console.log(this.imgArr, this.textarea1, this.voicePath,this.item_id)
				// uni.navigateTo({
				// 	url: `/pages/index/fabuxuqiu/fabuxuqiu`
				// })
				this.$u.route('/pages/index/fabuxuqiu/fabuxuqiu', {
					item_id: this.item_id,
					intro:this.textarea1,
					images:JSON.stringify(this.imgArr),
					voice_msg:this.voicePath,
					bgImg:this.bgImg,
					bgName:this.bgName,
				});
			},
			millisToMinutesAndSeconds(millis) {
				var minutes = Math.floor(millis / 60000);
				var seconds = ((millis % 60000) / 1000).toFixed(0);
				return `${(minutes < 10 ? '0' : '')}${minutes}"${(seconds < 10 ? '0' : '')}${seconds}`;
			},
			delVoice() {
				this.voicePath = '';
				this.voiceTime = '00"00"00';
			},
			startRecord() {
				console.log('dasnidas')
				recorderManager.start();
				this.audioStatus = 'stop'
			},
			endRecord() {
				recorderManager.stop();
				this.audioStatus = 'playing';
			},
			playVoice() {
				console.log('播放录音');
				if (this.voicePath != '') {
					innerAudioContext.src = this.voicePath;
					innerAudioContext.play();
				}
			},
			async chooseImg(i) {
				var img = await this.$OSSUpload('img')
				console.log(img)
				this.$set(this.imgArr, i, img)
				if (!this.imgArr[i + 1] && this.imgArr.length != 6) {
					this.$set(this.imgArr, i + 1, '');
					this.imgArrNum = this.imgArr.length - 1;
				} else {
					this.imgArrNum = 6;
				}
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
	.index {}

	.nav1 {
		margin-top: 20rpx;
		width: 750rpx;
		background: #FFFFFF;
		padding: 0 22rpx;

		.tit1 {
			padding-top: 28rpx;
			font-size: 32rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 42rpx;
			color: #000000;
		}

		.tit2 {
			margin: 20rpx 0;
			font-size: 24rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 32rpx;
			color: #707070;
		}

		.tit3 {
			display: flex;
			flex-wrap: wrap;

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

	.nav2 {
		margin-top: 20rpx;
		width: 750rpx;
		height: 358rpx;
		background: #FFFFFF;
		padding: 0 22rpx;

		.tit1 {
			padding-top: 28rpx;
			font-size: 32rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 42rpx;
			color: #000000;
		}

		.tit2 {
			margin-top: 20rpx;
			font-size: 24rpx;

			/deep/ .u-input__textarea {
				font-size: 24rpx;
			}

			.txt2 {
				transform: translate(20rpx, -50rpx);
			}
		}
	}

	.nav3 {
		margin-top: 20rpx;
		width: 750rpx;
		height: 116rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;

		.tit1 {
			margin-left: 50rpx;
			width: 20rpx;
			height: 20rpx;
			background: #D7373F;
			border-radius: 50%;
		}

		.tit2 {
			margin-right: 72rpx;
			margin-left: 26rpx;
			font-size: 32rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 42rpx;
			color: #000000;
		}

		.tit3 {
			font-size: 24rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 32rpx;
			color: #000000;
			margin-left: 72rpx;
		}

		.tit4 {
			margin-left: 72rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 196rpx;
			height: 56rpx;
			background: #4988FD;
			border-radius: 28rpx;

			.pic1 {
				width: 20rpx;
				height: 20rpx;
			}

			.txt1 {
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				color: #FFFFFF;
				margin-left: 8rpx;
			}
		}

		.tit5 {
			background: #D7373F;
		}
	}

	.nav4 {
		margin: 192rpx 54rpx 0 54rpx;
		width: 642rpx;
		height: 96rpx;
		background: #1677FF;
		border-radius: 48rpx;
		font-size: 48rpx;
		font-family: SimHei;
		font-weight: 400;
		line-height: 96rpx;
		text-align: center;
		color: #FFFFFF;
	}
</style>
