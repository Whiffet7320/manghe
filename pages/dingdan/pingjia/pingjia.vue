<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="nav1">
			<view class="tit1">
				<image class="pic1" :src="sfimg" mode=""></image>
				<view class="txt1">{{name}}师傅</view>
				<u-rate :disabled='!isFlag' active-color="#1677FF" size='30' gutter="16" v-model="rateVal">
				</u-rate>
				<view class="txt2">{{rateVal}}.0</view>
			</view>
			<view class="tit2">
				<u-input :disabled='!isFlag' v-model="txtValue" :clearable='false' type="textarea" :border="true" height="160" />
			</view>
			<view class="tit3">
				<view v-for="(item,i) in imgArr" :key='i' class="imgItem" @click="chooseImg(i)">
					<image class="pic1" :src="item" mode=""></image>
					<u-icon v-if='item == "" ' name="plus" color="#E6E6E6" size="36"></u-icon>
				</view>
			</view>
		</view>
		<view v-if="isFlag" @click="onSubmit" class="btn">确认发布</view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.id = option.id;
			this.name = option.name;
			this.sfimg = option.img;
			if (!this.name) {
				this.getData()
				this.isFlag = false;
			}
		},
		data() {
			return {
				isFlag: true,
				id: '',
				name: '',
				sfimg: '',
				rateVal: 0,
				txtValue: '',
				imgArr: [''],
				imgArrNum: 0,
			}
		},
		methods: {
			async getData() {
				const res = await this.$api.orderIdCommentXq(this.id);
				console.log(res)
				this.sfimg = res.data.craftsman_info.avatar;
				this.name = res.data.craftsman_info.nick_name;
				this.txtValue = res.data.comment.content;
				this.rateVal = res.data.comment.rate;
				if (!res.data.comment.images[res.data.comment.images.length - 1]) {
					res.data.comment.images.pop()
				}
				this.imgArr = res.data.comment.images;
			},
			async onSubmit() {
				const res = await this.$api.orderIdComment({
					rate: this.rateVal,
					content: this.txtValue,
					images: this.imgArr,
				}, this.id)
				console.log(this.rateVal, this.txtValue, this.imgArr)
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: '评论成功',
						type: 'success',
						url: '/pages/dingdan/dingdan',
						isTab: true,
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
			async chooseImg(i) {
				if (this.isFlag) {
					const that = this;
					var img = await this.$OSSUpload('img');
					this.$set(this.imgArr, i, img)
					if (!this.imgArr[i + 1] && this.imgArr.length != 6) {
						this.$set(this.imgArr, i + 1, '');
						this.imgArrNum = this.imgArr.length - 1;
					} else {
						this.imgArrNum = 6;
					}
				} else {
					// 浏览图片
					uni.previewImage({
						urls: this.imgArr,
						current:i,
					});
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

			.txt2 {
				margin-left: 40rpx;
				font-size: 28rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 38rpx;
				color: #000000;
			}
		}

		.tit2 {
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

	.btn {
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
