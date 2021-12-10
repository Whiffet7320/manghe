<template>
	<view class="index">
		<u-select @confirm='changeCity' v-model="cityShow" :list="cityList"></u-select>
		<view class="nav1">
			<view class="tit1">
				<view @click="cityShow = true" class="txt1">{{city.label}}</view>
				<u-icon @click="cityShow = true" name="arrow-down" color="#000000" size="20"></u-icon>
				<view class="myInp" @click="toSearch">
					<u-icon @click="toSearch" name="search" color="#000000" size="28"></u-icon>
					<u-input @click="toSearch" :clearable='false' v-model="searchVal" input-align='center'
						placeholder='搜索专家/项目/关键词' placeholder-style='color: #122106;' type="text" height="60rpx" />
				</view>
			</view>
			<view class="tit2">
				<view class="hot">
					<view class="txt1-1">热搜榜</view>
					<image src="/static/image/lujin1732.png" class="pic" mode=""></image>
				</view>
				<view v-for="item in searchList" :key='item.id' class="txt2">{{item.keyword}}</view>
			</view>
			<view class="tit3">
				<u-swiper height='320' :list="bannerList"></u-swiper>
			</view>
		</view>
		<view class="nav2">
			<view class="items">
				<view class="item" @click="toYimeixiangmu(21)">
					<image src="/static/image/tu188.png" class="pic-item" mode=""></image>
					<view class="txt-item">眼部整形</view>
				</view>
				<view class="item" @click="toYimeixiangmu(25)">
					<image src="/static/image/tu189.png" class="pic-item" mode=""></image>
					<view class="txt-item">胸部整形</view>
				</view>
				<view class="item" @click="toYimeixiangmu(26)">
					<image src="/static/image/tu190.png" class="pic-item" mode=""></image>
					<view class="txt-item">鼻部整修</view>
				</view>
				<view class="item" @click="toYimeixiangmu(27)">
					<image src="/static/image/tu198.png" class="pic-item" mode=""></image>
					<view class="txt-item">玻尿酸</view>
				</view>
				<view class="item" @click="toYimeixiangmu(28)">
					<image src="/static/image/tu196.png" class="pic-item" mode=""></image>
					<view class="txt-item">瘦脸针</view>
				</view>
			</view>
			<view class="items items2">
				<view class="item" @click="toYimeixiangmu(29)">
					<image src="/static/image/tu193.png" class="pic-item" mode=""></image>
					<view class="txt-item">医学美肤</view>
				</view>
				<view class="item" @click="toYimeixiangmu(30)">
					<image src="/static/image/tu194.png" class="pic-item" mode=""></image>
					<view class="txt-item">脂肪填充</view>
				</view>
				<view class="item" @click="toYimeixiangmu(31)">
					<image src="/static/image/tu195.png" class="pic-item" mode=""></image>
					<view class="txt-item">半永久妆</view>
				</view>
				<view class="item" @click="toYimeixiangmu(32)">
					<image src="/static/image/tu199.png" class="pic-item" mode=""></image>
					<view class="txt-item">激光脱毛</view>
				</view>
				<view class="item" @click="toYimeixiangmu(33)">
					<image src="/static/image/tu197.png" class="pic-item" mode=""></image>
					<view class="txt-item">美丽咨询</view>
				</view>
			</view>
			<view class="nav2-1">
				<image src="/static/image/zu1501.png" class="pic3-1" mode=""></image>
				<view class="tit3-1">进口玻尿酸限时8.5折～赶紧加购吧～！</view>
			</view>
		</view>
		<view class="nav3">
			<view class="title">
				<view class="shu"></view>
				<view class="t-txt">修复专区</view>
			</view>
			<view class="items">
				<view class="item" v-for="item in xfzqList" :key='item.id' @click="toXiufu(item.xiufu_name,item.xiufu_big_img)">
					<image :src="item.xiufu_img" class="pic" mode=""></image>
					<view class="txt">{{item.xiufu_name}}</view>
				</view>
			</view>
		</view>
		<view class="nav3 nav4">
			<view class="title">
				<view class="shu"></view>
				<view class="t-txt">专家团队</view>
			</view>
			<scroll-view class="scroll-view" scroll-x style="width: 100%;white-space:nowrap;">
				<view class="itemss">
					<view class="item" @click="toZhuanjiatuandui(item)" v-for="item in zjtdList" :key='item.id'>
						<image :src="item.doctor_img" class="pic" mode=""></image>
						<view class="right">
							<view class="txt1">
								{{item.doctor_name}}<text class="small">{{item.doctor_titles}}</text>
							</view>
							<view class="txt2" v-if="item.doctor_sub_titles">{{item.doctor_sub_titles}}</view>
							<view class="txt2" v-if="item.doctor_content">{{item.doctor_content}}</view>
							<view class="btn">
								<image src="/static/image/lujin1758.png" class="btn-img" mode=""></image>
								<view class="btn-txt">点击预约</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<image class="picc" src="/static/image/zu1872.png" mode=""></image>
			<image class="picc2" src="https://cdn.uviewui.com/uview/swiper/2.jpg" mode=""></image>
		</view>
		<view class="nav5">
			<u-tabs-swiper bg-color="#F7F8FA" height='96' font-size="28" gutter="30" inactive-color="#707070"
				bar-height="4" bar-width="64" active-color="#BD9E81" ref="uTabs" :list="list" :current="current"
				@change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			<swiper :style="[{height: height + 'px'}]" :current="swiperCurrent" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
					<scroll-view scroll-y='true'>
						<view class="nav5Items">
							<!-- {{item.name}} -->
							<!-- 热销 -->
							<!-- <template v-if="swiperCurrent == 0"> -->
								<view class="item" @click="toXianqgin(item)" v-for="item in shopList" :key='item.product_id'>
									<image :src="item.image"
										class="pic" mode=""></image>
									<view class="txt">{{item.store_name}}</view>
								</view>
								<u-loadmore v-if='swiperCurrent == index' :status="status" />
							<!-- </template> -->
							<!-- 推荐 -->
							<!-- <template v-if="swiperCurrent == 1">

							</template> -->
							<!-- 口碑 -->
							<!-- <template v-if="swiperCurrent == 2">

							</template> -->
							<!-- 精选 -->
							<!-- <template v-if="swiperCurrent == 3">

							</template> -->
						</view>
					</scroll-view>

				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["IndexshopPage", "IndexshopPageSize"]),
		},
		watch: {
			IndexshopPage: function(page) {
				console.log('ddpage')
				this.$store.commit("IndexshopPage", page);
				if (this.IndexshopPage != 1) {
					this.getShopData();
				}
			},
			current:function(){
				this.shopList = [];
				this.$store.commit("IndexshopPage", 1);
				this.getShopData()
				setTimeout(() => {
					this.getCurrentSwiperHeight('.nav5Items')
				}, 800)
			},
		},
		data() {
			return {
				shopList:[],
				city:'',
				searchList:[],
				cityShow:false,
				cityList:[],
				zjtdList:[],
				xfzqList:[],
				searchVal: '',
				bannerList: [],
				//
				swiperCurrentIndex: 0,
				height: 0,
				list: [{
					name: '热销'
				}, {
					name: '推荐'
				}, {
					name: '口碑'
				}, {
					name: '精选'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				// 加载
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '上拉加载更多',
					loading: '正在加载...',
					nomore: '没有了更多了'
				},
			}
		},
		onShow() {
			this.getShopData()
			this.getBanner()
			this.getData()
			this.shopList = [];
			this.$store.commit("IndexshopPage", 1);
			this.tabsChange(this.current);
		},
		mounted() {
			setTimeout(()=>{
				this.getCurrentSwiperHeight('.nav5Items')
			},900)
		},
		onReachBottom() {
			this.$store.commit("IndexshopPage", this.IndexshopPage + 1);
		},
		methods: {
			async getBanner(){
				const res = await this.$api.banner({
					position:1
				})
				console.log(res)
				this.bannerList = res.data;
				this.bannerList.forEach(ele=>{
					ele.image = ele.image_url;
				})
			},
			async getData(){
				const res = await this.$api.zhuanjia()
				this.zjtdList = res.data;
				const res2 = await this.$api.xiufu()
				this.xfzqList = res2.data;
				const res3 = await this.$api.productHot()
				this.rxList = res3.data;
				const res4 = await this.$api.searchKeyword()
				this.searchList = res4.data;
				const res5 = await this.$api.position()
				this.cityList = res5.data;
				this.cityList = JSON.stringify(this.cityList)
				this.cityList = this.cityList.replace(/city_name/g,'label')
				this.cityList = this.cityList.replace(/id/g,'value')
				this.cityList = JSON.parse(this.cityList)
				this.city = this.cityList[0];
			},
			async getShopData(){
				this.status = 'loading';
				setTimeout(async () => {
					const res = await this.$api.productHot({
						page: this.IndexshopPage,
						limit: this.IndexshopPageSize,
						product_from:1,
						is_best:this.current == 3 ? 1 : '',
						is_good:this.current == 1 ? 1 : '',
						is_comment:this.current == 2 ? 1 : '',
					})
					console.log(res.data)
					if (res.data.length == 0) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
						this.shopList = this.shopList.concat(res.data)
					}
				}, 200)
				console.log(this.shopList)
			},
			changeCity(e){
				console.log(e)
				this.city = e[0];
			},
			toYimeixiangmu(val) {
				this.$store.commit('from',val)
				uni.switchTab({
					url: `/pages/tabBar/yimeixiangmu`
				})
			},
			toSearchResult() {
				uni.navigateTo({
					url: '/pages/search/searchResult'
				})
			},
			toXianqgin(item) {
				uni.navigateTo({
					url: `/pages/index/search/xiangqin?title=${item.store_name}&id=${item.product_id}`
				})
			},
			toZhuanjiatuandui(val) {
				this.$store.commit("setDoctor",val);
				uni.navigateTo({
					url: '/pages/index/zhuanjiatuandui/zhuanjiatuandui?id='+val.id
				})
			},
			toXiufu(val,img) {
				uni.navigateTo({
					url: `/pages/index/xiufu/xiufu?index=${val}&bigImg=${img}`
				})
			},
			toSearch() {
				uni.navigateTo({
					url: '/pages/search/search?type=1'
				})
			},
			// tabs通知swiper切换
			tabsChange(index) {
				console.log(index);
				this.swiperCurrent = index;
				this.swiperCurrentIndex = index;
				this.current = index;
			},
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			getCurrentSwiperHeight(element) {
				let query = uni.createSelectorQuery().in(this);
				query.selectAll(element).boundingClientRect();
				query.exec((res) => {
					this.height = res[0][this.swiperCurrentIndex].height;
				})
			},
		}
	}
</script>

<style>
	page {
		background: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	/deep/ .u-load-more-wrap {
		width: 686rpx;
		height: 100rpx !important;
	}
	.index {}

	.nav1 {
		width: 750rpx;
		height: 298rpx;
		background: linear-gradient(316deg, #F6A309 0%, #F8B607 22%, #FFD438 42%, #F9C706 51%, #F8CA20 80%, #FECF05 100%);
		padding: 0 36rpx;

		.tit1 {
			padding-top: 32rpx;
			display: flex;
			align-items: center;

			.txt1 {
				font-size: 28rpx;
				font-weight: 500;
				line-height: 40rpx;
				color: #122106;
				margin-right: 14rpx;
			}

			.myInp {
				margin-left: 60rpx;
				padding: 0 24rpx;
				width: 494rpx;
				height: 60rpx;
				background: rgba(255, 255, 255, 0.2);
				border-radius: 50rpx;
				display: flex;
				align-items: center;

				/deep/ .u-input {
					width: 400rpx !important;

					.u-input__input {
						font-size: 24rpx;
						font-weight: 400;
						line-height: 60rpx;
						color: #122106 !important;
					}
				}
			}
		}

		.tit2 {
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			padding: 0 10rpx;
			flex-wrap: wrap;
			height: 34rpx;
			overflow: hidden;
			// justify-content: space-between;

			.hot {
				display: flex;
				align-items: center;
				margin-right: 36rpx;
				.txt1-1 {
					font-size: 24rpx;
					font-weight: bold;
					line-height: 34rpx;
					color: #122106;
				}

				.pic {
					margin-left: 8rpx;
					width: 20rpx;
					height: 22rpx;
				}
			}

			.txt2 {
				font-size: 24rpx;
				font-weight: 400;
				line-height: 34rpx;
				color: #122106;
				margin-left: 20rpx;
			}
		}

		.tit3 {
			margin-top: 34rpx;
		}

	}

	.nav2 {
		background: #FFFFFF;
		padding: 232rpx 38rpx 0 38rpx;

		.items {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.item {
				width: 20%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.pic-item {
					width: 76rpx;
					height: 76rpx;
				}

				.txt-item {
					margin-top: 20rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #BD9E81;
				}
			}
		}

		.items2.items {
			margin-top: 40rpx;
		}

		.nav2-1 {
			margin-top: 40rpx;
			padding-bottom: 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.pic3-1 {
				width: 28rpx;
				height: 28rpx;
				transform: translateX(16rpx);
				margin-right: 16rpx;
			}

			.tit3-1 {
				padding-left: 24rpx;
				width: 612rpx;
				height: 60rpx;
				background: #fff2ee;
				border-radius: 30rpx;
				font-size: 24rpx;
				font-weight: 500;
				color: #FF7C5E;
				line-height: 60rpx;
			}
		}
	}

	.nav3 {
		margin-top: 20rpx;
		width: 750rpx;
		background: #FFFFFF;
		padding: 28rpx 0;

		.title {
			display: flex;
			align-items: center;

			.shu {
				margin-left: 24rpx;
				margin-right: 20rpx;
				width: 6rpx;
				height: 28rpx;
				background: #BD9E81;
			}

			.t-txt {
				font-size: 28rpx;
				font-weight: bold;
				color: #BD9E81;
			}
		}

		.items {
			padding: 0 40rpx;
			margin-top: 36rpx;
			display: flex;
			align-items: center;

			.item {
				width: 25%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.pic {
					width: 150rpx;
					height: 150rpx;
					border-radius: 10rpx;
				}

				.txt {
					margin-top: 12rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #BD9E81;
				}
			}
		}
	}

	.nav4.nav3 {

		.scroll-view {
			height: 356rpx;
		}

		.itemss {
			margin-top: 36rpx;
			display: flex;
			align-items: center;

			.item {
				margin-left: 24rpx;
				display: flex;
				flex-wrap: nowrap;
				align-items: center;

				.pic {
					height: 284rpx;
					width: 196rpx;
				}

				.right {
					width: 192rpx;
					margin-left: 20rpx;

					.txt1 {
						margin-bottom: 16rpx;
						font-size: 32rpx;
						font-weight: bold;
						color: #BD9E81;

						.small {
							margin-left: 12rpx;
							font-weight: 500;
							font-size: 24rpx;
						}
					}

					.txt2::before {
						content: '· ';
						position: absolute;
						left: -14rpx;
						top: 0;
						font-weight: 500;
					}

					.txt2 {
						position: relative;
						left: 14rpx;
						width: 192rpx;
						margin-top: 10rpx;
						font-size: 28rpx;
						font-weight: 500;
						color: #707071;
						word-wrap: break-word;
						word-break: break-all;
						white-space: pre-wrap;
					}

					.btn {
						margin-top: 24rpx;
						width: 186rpx;
						height: 52rpx;
						background: #FA8677;
						border-radius: 26rpx;
						display: flex;
						align-items: center;
						justify-content: center;

						.btn-img {
							width: 26rpx;
							height: 26rpx;
							margin-right: 6rpx;
						}

						.btn-txt {
							font-size: 28rpx;
							font-weight: 500;
							color: #FFFFFF;
						}
					}
				}
			}

		}

		.picc {
			width: 702rpx;
			height: 8rpx;
			margin-left: 26rpx;
			margin-bottom: 20rpx;
		}

		.picc2 {
			margin-left: 26rpx;
			width: 702rpx;
			height: 220rpx;
		}
	}

	.nav5 {
		.swiper-item {
			background: #FFFFFF;
		}

		.nav5Items {
			padding: 8rpx 24rpx 20rpx 24rpx;
			background: #FFFFFF;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.item {
				margin-top: 24rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
				width: 50%;

				.pic {
					width: 334rpx;
					height: 334rpx;
				}

				.txt {
					margin-top: 20rpx;
					width: 334rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #BD9E81;
					display:-webkit-box; //将对象作为弹性伸缩盒子模型显示。
					-webkit-box-orient:vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
					-webkit-line-clamp:2; 
					overflow:hidden; 
					text-overflow:ellipsis;
				}
			}
		}
	}
</style>
