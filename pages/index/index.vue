<template>
	<view class="index">
		<u-modal v-model="modelshow" @confirm='qieHuan' show-cancel-button :content="modelContent"></u-modal>
		<u-select v-model="nav1Show" mode="mutil-column-auto" @confirm='changeCity2' :list="cityList"></u-select>
		<view class="nav1">
			<view @click="changeCity" class="txt1">{{myCity}}</view>
			<u-icon name="arrow-down" color="#000000" size="20"></u-icon>
			<view class="shu"></view>
			<u-icon name="search" color="#999999" size="26"></u-icon>
			<u-input class='search' v-model="keyword" type="text" placeholder="搜索您需要的服务" />
		</view>
		<!-- 轮播 -->
		<u-swiper height='542' :list="bannerTop"></u-swiper>
		<view class="nav2">
			<view class="tit1">
				<view class="txt1-1">
					<view class="txt1-1-1">{{craftsman_count}}+</view>
					<view class="txt1-1-2">专业入驻师傅</view>
				</view>
				<view class="txt1-1">
					<view class="txt1-1-1">{{order_count}}+</view>
					<view class="txt1-1-2">累计服务订单</view>
				</view>
				<view class="txt1-1">
					<view class="txt1-1-1">{{good_reputation}}%</view>
					<view class="txt1-1-2">服务好评率</view>
				</view>
			</view>
			<view class="tit2">
				<!-- <u-notice-bar mode="vertical" type="primary" :list="tzlist"></u-notice-bar> -->
				<image class="pic2-1" src="../../static/img/laba.png" mode=""></image>
				<view :style="{
						animationDuration: animationDuration,
						animationPlayState: animationPlayState,
					}" class="txt2-1">用户150****7056<text class="color">【桌椅安装】</text>下单成功</view>
			</view>
			<view class="tit3">
				<view @click="toRemenfuwu" class="item">
					<image class="pic" src="../../static/img/zu33.png" mode=""></image>
					<view class="txt">热门服务</view>
				</view>
				<view @click="toJiajuanzhuang" class="item">
					<image class="pic" src="../../static/img/zu34.png" mode=""></image>
					<view class="txt">家具安装</view>
				</view>
				<view @click="toJiadiananzhuang" class="item">
					<image class="pic" src="../../static/img/zu35.png" mode=""></image>
					<view class="txt">家电安装</view>
				</view>
				<view @click="toRushangcheng" class="item">
					<image class="pic" src="../../static/img/zu51.png" mode=""></image>
					<view class="txt">如商城</view>
				</view>
			</view>
			<view class="tit3 two">
				<view class="item">
					<image class="pic" src="../../static/img/zu36.png" mode=""></image>
					<view class="txt">其他安装</view>
				</view>
				<view class="item">
					<image class="pic" src="../../static/img/zu37.png" mode=""></image>
					<view class="txt">日常保洁</view>
				</view>
				<view @click="toZhuanpan" class="item">
					<image class="pic" src="../../static/img/zu54.png" mode=""></image>
					<view class="txt">抽奖转盘</view>
				</view>
				<view class="item">
					<image class="pic" src="../../static/img/zu38.png" mode=""></image>
					<view class="txt">全部服务</view>
				</view>
			</view>
			<view class="tit4">
				<view class="kk1">
					<view class="box1">
						<view class="box1-1">{{banner1[0].tag}}</view>
						<image class="pic" :src="banner1[0].image" mode=""></image>
					</view>
					<view class="kk2">
						<view class="box2">
							<view class="box2-1">{{banner1[1].tag}}</view>
							<image class="pic" :src="banner1[1].image" mode=""></image>
						</view>
						<view class="box3">
							<view class="box3-1">{{banner1[2].tag}}</view>
							<image class="pic" :src="banner1[2].image" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="tit5">
				<!-- 横向 -->
				<scroll-view class="scroll-view" scroll-x style="width: 100%;white-space:nowrap;">
					<image @click="toXiangqin(item.id)" v-for="item in banner2" :key='item.id' class="pic1"
						:src="item.image" mode="">
					</image>
				</scroll-view>
			</view>
			<view class="tit6">
				<view class="box1">
					<image class="pic" :src="homeList1.bg_img" mode=""></image>
					<view class="txt1">
						<image class="pic2" src="../../static/img/zu41.png" mode=""></image>
						<view class="txt1-1">热门好服务</view>
						<u-icon name="arrow-right" color="#000000" size="20"></u-icon>
					</view>
					<view class="txt2">质保期长，坏了重新修</view>
				</view>
				<view class="box2">
					<view class="items">
						<view class="item" @click="toXiangqin(item)" v-for="item in homeList1.items" :key='item.id'>
							<image class="pic" :src="item.main_img" mode=""></image>
							<view class="txt">{{item.name}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="tit6">
				<view class="box1">
					<image class="pic" :src="homeList2.bg_img" mode=""></image>
					<view class="txt1">
						<image class="pic2" src="../../static/img/zu40.png" mode=""></image>
						<view class="txt1-1">维修手艺好</view>
						<u-icon name="arrow-right" color="#000000" size="20"></u-icon>
					</view>
					<view class="txt2">质保期长，坏了重新修</view>
				</view>
				<view class="box2">
					<view class="items">
						<view class="item" @click="toXiangqin(item)" v-for="item in homeList2.items" :key='item.id'>
							<image class="pic" :src="item.main_img" mode=""></image>
							<view class="txt">{{item.name}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="tit6">
				<view class="box1">
					<image class="pic" :src="homeList3.bg_img" mode=""></image>
					<view class="txt1">
						<image class="pic2" src="../../static/img/zu39.png" mode=""></image>
						<view class="txt1-1">省心一口价</view>
						<u-icon name="arrow-right" color="#000000" size="20"></u-icon>
					</view>
					<view class="txt2">明码标价，上门不加价</view>
				</view>
				<view class="box2">
					<view class="items">
						<view class="item" @click="toXiangqin(item)" v-for="item in homeList3.items" :key='item.id'>
							<image class="pic" :src="item.main_img" mode=""></image>
							<view class="txt">{{item.name}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="tit7">
				<view class="tit7-1">
					<image class="pic1" :src="articlesFirst.img" mode=""></image>
					<view class="tit7-1-1"><text class="txt">{{articlesFirst.name}}</text></view>
				</view>
				<view v-for="item in articles" :key='item.id' class="item">
					<view class="txt1">{{item.name}}</view>
					<image class="pic1" :src="item.img" mode=""></image>
				</view>
			</view>

		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				modelshow:false,
				modelContent:'',
				cityList: [], //城市列表
				nav1Show: false,
				keyword: '',
				bannerTop: [],
				banner1: [],
				banner2: [],
				homeList1: {},
				homeList2: {},
				homeList3: {},
				articles: [],
				articlesFirst: {},
				craftsman_count: 0,
				order_count: 0,
				good_reputation: 0,
				tzlist: [
					'寒雨连江夜入吴',
					'平明送客楚山孤',
					'洛阳亲友如相问',
					'一片冰心在玉壶'
				],
				animationDuration: '10s', // 动画执行时间
				animationPlayState: 'paused', // 动画的开始和结束执行
				addressObj: null,
				province: '',
				city: '',
				myCity:'选择城市',
				area_id: '',
				isqieHuan:false,
			}
		},
		onLoad() {
			this.getAddress()
			setTimeout(() => {
				this.getData()
			}, 300)
		},
		methods: {
			async getData() {
				const res2 = await this.$api.home()
				console.log(res2);
				this.craftsman_count = res2.data.craftsman_count;
				this.order_count = res2.data.order_count;
				this.good_reputation = res2.data.good_reputation;
				this.bannerTop = res2.data.banner_top;
				this.banner1 = res2.data.banner_1.slice(0, 3);
				this.banner2 = res2.data.banner_2;
				this.homeList1 = res2.data.homeList_1;
				this.homeList1.items = this.homeList1.items.slice(0, 6);
				this.homeList2 = res2.data.homeList_2;
				this.homeList2.items = this.homeList2.items.slice(0, 6);
				this.homeList3 = res2.data.homeList_3;
				this.homeList3.items = this.homeList3.items.slice(0, 6);
				this.articles = res2.data.articles.slice(1);
				this.articlesFirst = res2.data.articles.slice(0, 1)[0];
				const res = await this.$api.cities()
				const myAddress = res.data.filter(ele => {
					return ele.name == this.province
				})
				const myCity = myAddress[0].children.filter(ele => {
					return ele.name == this.city
				})
				this.area_id = myCity[0].id;
				this.cityList = res.data;
				let keymap = {
					name: "label",
					id: 'value'
				}
				this.cityList.forEach(ele => {
					Object.keys(ele).map(keys => {
						let newKey = keymap[keys]
						if (newKey) {
							ele[newKey] = ele[keys]
							delete ele[keys]
						}
						if (ele.children && ele.children.length > 0) {
							ele.children.forEach(item => {
								let newKey2 = keymap[keys]
								if (newKey2) {
									item[newKey2] = item[keys]
									delete item[keys]
								}
							})
						}
					})
				})
				console.log(this.area_id)
				if(this.isqieHuan){
					this.myCity = this.city;
					this.setUser();
				}
			},
			async setUser() {
				await this.$api.userInfo({
					area_id: this.area_id
				})
			},
			getAddress() {
				const that = this;
				uni.getLocation({
					success(res) {
						console.log(res, 'res')
						let params = {
							key: '52ad0cb98f8b948f42ab9293c027877e',
							// location: `${120.63768},${28.00708}`
							location: `${res.longitude},${res.latitude}`
						}
						uni.request({
							url: 'https://restapi.amap.com/v3/geocode/regeo',
							data: params,
							success(ress) {
								// console.log(ress.data.regeocode.addressComponent)
								that.addressObj = ress.data.regeocode.addressComponent;
								that.province = that.addressObj.province;
								that.city = that.addressObj.city;
								that.modelContent = `您当前定位在${that.city},是否切换城市`
								if(that.city != that.myCity){
									that.modelshow = true;
								}
							}
						})
					}
				})
			},
			async qieHuan(){
				this.isqieHuan = true;
				this.myCity = this.city;
				this.setUser();
			},
			toXiangqin(item) {
				uni.navigateTo({
					url: `/pages/index/shangpinxiangqin/shangpinxiangqin?id=${item.id}`
				})
			},
			changeCity() {
				this.nav1Show = true;
			},
			changeCity2(e) {
				console.log(e)
				this.area_id = e[1].value;
				this.myCity = e[1].label;
				this.setUser();
			},
			toZhuanpan() {
				uni.navigateTo({
					url: '/pages/index/zhuanpan/zhuanpan'
				})
			},
			toRushangcheng() {
				uni.navigateTo({
					url: '/pages/index/rushangcheng/rushangcheng'
				})
			},
			toRemenfuwu() {
				this.$store.commit('fl', 1)
				uni.switchTab({
					url: '/pages/fenlei/fenlei'
				});
			},
			toJiajuanzhuang() {
				this.$store.commit('fl', 2)
				uni.switchTab({
					url: '/pages/fenlei/fenlei'
				});
			},
			toJiadiananzhuang() {
				this.$store.commit('fl', 3)
				uni.switchTab({
					url: '/pages/fenlei/fenlei'
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F3F5;
	}
</style>

<style scoped lang="scss">
	.index {
		position: relative;
	}

	.nav1 {
		position: absolute;
		top: 2rpx;
		z-index: 1;
		left: 50%;
		transform: translateX(-50%);
		width: 710rpx;
		height: 76rpx;
		background: #FFFFFF;
		opacity: 1;
		border-radius: 16rpx;
		display: flex;
		align-items: center;

		.txt1 {
			margin: 0 16rpx;
			font-size: 28rpx;
			font-family: Segoe UI;
			font-weight: 400;
			line-height: 38rpx;
			color: #000000;
			opacity: 1;
		}

		.shu {
			margin-left: 20rpx;
			margin-right: 94rpx;
			width: 0px;
			height: 20rpx;
			border: 1rpx solid #999999;
			opacity: 1;
		}

		.search {
			margin-left: 28rpx;
		}
	}

	.nav2 {
		transform: translateY(-37rpx);
		width: 750rpx;
		height: 2456rpx;
		background: linear-gradient(180deg, #FFFFFF 0%, #EFEFEF 100%);
		opacity: 1;
		border-radius: 60rpx 60rpx 0px 0px;

		.tit1 {
			display: flex;
			align-items: center;
			margin: 0 78rpx;
			justify-content: space-between;

			.txt1-1 {
				margin-top: 36rpx;
				display: flex;
				flex-direction: column;
				align-items: center;

				.txt1-1-1 {
					font-size: 48rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 64rpx;
					color: #4988FD;
					opacity: 1;
				}

				.txt1-1-2 {
					margin-top: 6rpx;
					font-size: 28rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 38rpx;
					color: #999999;
					opacity: 1;
				}
			}
		}

		.tit2 {
			margin: 24rpx 72rpx 0 72rpx;
			width: 600rpx;
			height: 60rpx;
			background: #E9F0FD;
			opacity: 1;
			border-radius: 30rpx;
			display: flex;
			align-items: center;

			.pic2-1 {
				margin-left: 34rpx;
				width: 36rpx;
				height: 24rpx;
			}

			.txt2-1 {
				margin-left: 28rpx;
				margin-right: 34rpx;
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 28rpx;
				color: #000000;
				opacity: 1;

				.color {
					color: #FF5700;
				}
			}
		}

		.tit3 {
			display: flex;
			flex-wrap: wrap;
			padding: 44rpx 82rpx 0 82rpx;
			justify-content: space-between;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;

				.pic {
					width: 104rpx;
					height: 104rpx;
					opacity: 1;
				}

				.txt {
					margin-top: 20rpx;
					font-size: 20rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 28rpx;
					color: #707070;
					opacity: 1;
				}
			}
		}

		.tit3.two {
			padding: 30rpx 82rpx 58rpx 82rpx;
		}

		.tit4 {
			margin: 0 20rpx;

			.kk1 {
				display: flex;
				justify-content: space-between;

				.box1 {
					position: relative;
					width: 344rpx;
					height: 344rpx;
					background: #E9F0FD;
					opacity: 1;
					border-radius: 16rpx;

					.box1-1 {
						position: absolute;
						z-index: 1;
						width: 162rpx;
						height: 38rpx;
						background: #5694FF;
						opacity: 1;
						border-radius: 16rpx 0px 16rpx 0px;
						font-size: 20rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 38rpx;
						color: #FFFFFF;
						opacity: 1;
						text-align: center;
					}

					.pic {
						width: 100%;
						height: 100%;
					}
				}

				.kk2 {
					justify-content: space-between;
					display: flex;
					flex-direction: column;

					.box2 {
						position: relative;
						width: 344rpx;
						height: 162rpx;
						background: #E9F0FD;
						opacity: 1;
						border-radius: 16rpx;

						.box2-1 {
							position: absolute;
							z-index: 2;
							width: 146rpx;
							height: 38rpx;
							background: #8256FF;
							opacity: 1;
							border-radius: 16rpx 0px 16rpx 0px;
							font-size: 20rpx;
							font-family: Segoe UI;
							font-weight: 400;
							line-height: 38rpx;
							text-align: center;
							color: #FFFFFF;
							opacity: 1;
						}

						.pic {
							width: 100%;
							height: 100%;
						}
					}

					.box3 {
						position: relative;
						width: 344rpx;
						height: 162rpx;
						background: #E9F0FD;
						opacity: 1;
						border-radius: 16rpx;

						.box3-1 {
							position: absolute;
							z-index: 2;
							width: 146rpx;
							height: 38rpx;
							background: #FF8D8D;
							opacity: 1;
							border-radius: 16rpx 0px 16rpx 0px;
							font-size: 20rpx;
							font-family: Segoe UI;
							font-weight: 400;
							line-height: 28rpx;
							color: #FFFFFF;
							opacity: 1;
							text-align: center;
						}

						.pic {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}

		.tit5 {
			margin: 54rpx 20rpx 22rpx 20rpx;

			.pic1 {
				width: 468rpx;
				height: 162rpx;
				border-radius: 16rpx;
				margin-right: 20rpx;
			}
		}

		.tit6 {
			.box1 {
				width: 750rpx;
				height: 186rpx;
				opacity: 1;
				position: relative;

				.pic {
					position: absolute;
					z-index: -1;
					width: 100%;
					height: 100%;
				}

				.txt1 {
					display: flex;
					align-items: center;
					padding-top: 30rpx;

					.pic2 {
						margin-left: 32rpx;
						margin-right: 22rpx;
						width: 38rpx;
						height: 38rpx;
					}

					.txt1-1 {
						font-size: 32rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 42rpx;
						color: #000000;
						opacity: 1;
						margin-right: 30rpx;
					}
				}

				.txt2 {
					margin-left: 92rpx;
					font-size: 28rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 38rpx;
					color: #000000;
					opacity: 1;
				}
			}

			.box2 {
				margin: 0 20rpx;
				transform: translateY(-30rpx);
				width: 710rpx;
				height: 358rpx;
				background: #FFFFFF;
				opacity: 1;
				border-radius: 16rpx;

				.items {
					padding: 18rpx 48rpx;
					display: flex;
					flex-wrap: wrap;

					.item {
						// flex: 0 0 33.3%;
						display: flex;
						flex-direction: column;
						align-items: center;
						margin-bottom: 7rpx;

						&:nth-child(2),
						&:nth-child(5) {
							margin: 0 120rpx;
						}

						.pic {
							width: 125rpx;
							height: 125rpx;
							opacity: 1;
						}

						.txt {
							margin-top: 6rpx;
							font-size: 20rpx;
							font-family: Segoe UI;
							font-weight: 400;
							line-height: 28rpx;
							color: #000000;
							opacity: 1;
						}
					}
				}
			}

		}

		.tit7 {
			background-color: #fff;
			margin: 0 20rpx 100rpx 20rpx;

			.tit7-1 {
				width: 710rpx;
				height: 215rpx;
				opacity: 1;
				border-radius: 16rpx;
				position: relative;

				.pic1 {
					width: 100%;
					height: 100%;
				}

				.tit7-1-1 {
					position: absolute;
					bottom: 0;
					width: 710rpx;
					height: 50rpx;
					padding: 0 48rpx;
					background: rgba($color: #000000, $alpha: 0.2);

					.txt {
						font-size: 24rpx;
						font-family: Segoe UI;
						font-weight: 400;
						line-height: 32rpx;
						color: #FFFFFF;
						opacity: 1;
						line-height: 50rpx;
					}
				}
			}

			.item {
				height: 156rpx;
				display: flex;
				justify-content: space-between;
				padding: 20rpx 36rpx 14rpx 24rpx;

				.txt1 {
					width: 336rpx;
					height: 64rpx;
					font-size: 24rpx;
					font-family: Segoe UI;
					font-weight: 400;
					line-height: 32rpx;
					color: #000000;
					opacity: 1;
				}

				.pic1 {
					width: 186rpx;
					height: 116rpx;
					opacity: 1;
				}
			}

		}
	}
</style>
