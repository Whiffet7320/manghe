<template>
	<view class="index">
		<u-toast ref="uToast" />
		<u-tabs-swiper bg-color="#ffffff" height='116' font-size="32" gutter="40" inactive-color="#000000"
			bar-height="10" bar-width="84" active-color="#4988FD" ref="uTabs" :list="list" :current="current"
			@change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		<swiper :style="[{height: height + 'px'}]" :current="swiperCurrent">
			<swiper-item @touchmove.stop class="swiper-item" v-for="(item, index) in list" :key="index">
				<scroll-view scroll-y='true' style="height: 90vh;">
					<view class="items">
						<!-- {{item.name}} -->
						<!-- 反馈问题 -->
						<template v-if="swiperCurrent == 0">
							<view class="item">
								<view class="nav1">
									<view class="tit1"><text class="red">*</text>反馈问题类型</view>
									<view class="btns">
										<view v-for="(item,index) in radioArr" @tap="changeRad(index+1)"
											:class="{'btn':true,'active':myRad == index+1}">{{item}}
										</view>
									</view>
									<view class="tit2">
										<u-input border height='200' v-model="textareaVal" type="textarea" />
									</view>
									<view class="tit3">截图或图片（选填）</view>
									<view class="tit4">
										<view class="imgItem" @click="chooseImg(1)">
											<image class="pic1" :src="img1" mode=""></image>
											<u-icon v-if='img1 == "" ' name="plus" color="#E6E6E6" size="36"></u-icon>
										</view>
										<view v-if="imgNum == 2 || imgNum == 3" class="imgItem" @click="chooseImg(2)">
											<image class="pic1" :src="img2" mode=""></image>
											<u-icon v-if='img2 == "" ' name="plus" color="#E6E6E6" size="36"></u-icon>
										</view>
										<view v-if="imgNum == 3" class="imgItem" @click="chooseImg(3)">
											<image class="pic1" :src="img3" mode=""></image>
											<u-icon v-if='img3 == "" ' name="plus" color="#E6E6E6" size="36"></u-icon>
										</view>
									</view>
								</view>
								<view class="nav2">
									<u-field :border-bottom='false' v-model="mobile" label="联系方式" placeholder="请填写手机号">
									</u-field>
								</view>
								<view @click="onSubmit" class="footerBtn">提交反馈</view>
							</view>
						</template>
						<!-- 我的反馈 -->
						<template v-if="swiperCurrent == 1">
							<view class="item" v-for="item in fkyjList" :key='item.id'>
								<view class="nav11">
									<view class="tit1">
										{{item.content}}
									</view>
									<image @click="seeImg(item.images,index)" class="pic" v-for="(ele,index) in item.images" :src="ele" mode=""></image>
									<view class="tit2">
										<view class="txt1">{{item.type_desc}}</view>
										<view class="txt1">{{item.created_at}}</view>
									</view>
									<view class="tit3">
										<view class="txt">平台暂未回复</view>
									</view>
								</view>
							</view>
						</template>
					</view>
				</scroll-view>

			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	export default {
		onShow() {
			this.tabsChange(this.current);
			this.getData();
		},
		data() {
			return {
				fkyjList: [],
				radioArr: [],
				textareaVal: '',
				myRad: '',
				img1: '',
				img2: '',
				img3: '',
				mobile: '',
				imgNum: 1,
				// 
				swiperCurrentIndex: 0,
				height: 800,
				list: [{
					name: '反馈问题'
				}, {
					name: '我的反馈'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			}
		},
		methods: {
			async getData() {
				const res = await this.$api.feedbacksTypes();
				console.log(res.data)
				this.radioArr = res.data;
				const res2 = await this.$api.feedbacks();
				console.log(res2.data)
				this.fkyjList = res2.data;
			},
			seeImg(images,i) {
				uni.previewImage({
					urls: images,
					current: i,
				});
			},
			async onSubmit() {
				// console.log(this.myRad - 1,this.mobile,[this.img1,this.img2,this.img3],this.textareaVal)
				var images = [this.img1, this.img2, this.img3];
				images.forEach(ele=>{
					if(!ele){
						images.pop()
					}
				})
				const res = await this.$api.addFeedbacks({
					type: this.myRad - 1,
					content: this.textareaVal,
					images: images,
					phone: this.mobile,
				})
				console.log(res.data)
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: '评论成功',
						callback: () => {
							this.getData()
							this.tabsChange(1);
						}
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
			changeRad(i) {
				this.myRad = i;
			},
			async chooseImg(i) {
				var img = await this.$OSSUpload('img');
				console.log(img)
				if (i == 1) {
					this.img1 = img;
					this.imgNum = 2;
				} else if (i == 2) {
					this.img2 = img;
					this.imgNum = 3;
				} else if (i == 3) {
					this.img3 = img;
				}
			},
			// tabs通知swiper切换
			tabsChange(index) {
				console.log(index);
				this.swiperCurrent = index;
				this.current = index;
				this.swiperCurrentIndex = index;
				// setTimeout(()=>{
				// 	this.getCurrentSwiperHeight('.items')
				// },200)
			},
			// getCurrentSwiperHeight(element) {
			// 	let query = uni.createSelectorQuery().in(this);
			// 	query.selectAll(element).boundingClientRect();
			// 	query.exec((res) => {
			// 		console.log(res, 'res', this.swiperCurrentIndex)
			// 		this.height = 50 + res[0][this.swiperCurrentIndex].height;
			// 	})
			// 	console.log(this.height)
			// },
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F3F5;
	}
</style>
<style scoped lang="scss">
	.index {}

	.items {
		.item {
			.nav1 {
				margin-top: 16rpx;
				width: 750rpx;
				height: 710rpx;
				background: #FFFFFF;
				padding: 22rpx 20rpx 0 20rpx;

				.tit1 {
					font-size: 32rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 42rpx;
					color: #000000;

					.red {
						color: #FF0000;
					}
				}

				.btns {
					display: flex;
					flex-wrap: wrap;
					margin-top: 20rpx;

					.btn {
						margin-right: 20rpx;
						margin-bottom: 20rpx;
						padding: 13rpx 18rpx;
						border: 2rpx solid #E6E6E6;
						border-radius: 6rpx;
						font-size: 24rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 32rpx;
						color: #000000;
					}

					.btn.active {
						background: #E9F0FD;
						border: 2rpx solid #4988FD;
						color: #4988FD;
					}
				}

				.tit2 {
					margin-top: 16rpx;
					background: #F5F5F5;
				}

				.tit3 {
					margin-top: 16rpx;
					font-size: 32rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 42rpx;
					color: #000000;
				}

				.tit4 {
					display: flex;

					.imgItem {
						position: relative;
						margin: 22rpx 16rpx 0 6rpx;
						width: 120rpx;
						height: 120rpx;
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
				display: flex;
				align-items: center;
				width: 750rpx;
				height: 116rpx;
				background: #FFFFFF;
				opacity: 1;
			}

			.footerBtn {
				margin: 68rpx 54rpx 0 64rpx;
				width: 642rpx;
				height: 96rpx;
				background: #4988FD;
				border-radius: 48rpx;
				font-size: 48rpx;
				font-family: SimHei;
				font-weight: 400;
				line-height: 96rpx;
				text-align: center;
				color: #FFFFFF;
			}

			.nav11 {
				margin-bottom: 20rpx;
				padding: 0rpx 20rpx 10rpx 20rpx;
				width: 750rpx;
				height: 380rpx;
				background: #FFFFFF;
				.pic{
					margin-top: 10rpx;
					margin-right: 10rpx;
					width: 100rpx;
					height: 100rpx;
				}
				.tit1 {
					// padding: 38rpx 0 32rpx 0;
					padding-top: 38rpx;
					font-size: 32rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 42rpx;
					color: #000000;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}

				.tit2 {
					border-top: 2rpx solid #E6E6E6;
					padding-top: 30rpx;
					margin-top: 10rpx;
					display: flex;
					justify-content: space-between;

					.txt1 {
						font-size: 20rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 28rpx;
						color: #999999;
					}
				}

				.tit3 {
					margin-top: 32rpx;
					width: 704rpx;
					height: 66rpx;
					background: #F5F5F5;
					padding: 0 16rpx;

					.txt {
						font-size: 20rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 66rpx;
						color: #999999;
					}
				}
			}


		}
	}
</style>
