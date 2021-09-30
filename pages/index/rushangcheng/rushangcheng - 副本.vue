<template>
	<view class="index">
		<u-mask :show="maskshow" z-index='1' @click="onMask"></u-mask>
		<view class="nav1">
			<view @click="fenleiShow" class="txt1">全部分类</view>
			<!-- <view @click="changeJiage" class="txt2">价格</view>
			<image v-if="jiageStatus == 0" class="pic1" src="/static/img/zu68.png" mode=""></image>
			<image v-else class="pic1" src="/static/img/zu69.png" mode=""></image>
			<view class="txt3">推荐</view> -->
		</view>
		<view v-if="isShow" :style="{'height':height}" class="nav1-1">
			<view class="btns">
				<view @click="changeBtnRadio(item,0)" :class="{'btn':true,'active':nowItem == 0}">全部</view>
				<view @click="changeBtnRadio(item,i+1)" :class="{'btn':true,'active':i == nowItem-1}"
					v-for="(item,i) in fenleiList" :key=item.id>{{item.name}}</view>
			</view>
		</view>
		<!--  -->
		<view class="nav2">
			<view @click="toXiangqin(item.id)" class="item" v-for="item in list" :key='item.id'>
				<image class="pic1" :src="item.main_img" mode=""></image>
				<view class="txt1">{{item.name}}</view>
				<view class="txt2">
					<view class="txt2-1">
						￥<text class="big">{{item.price}}</text>
					</view>
					<view class="txt2-2">销售量{{item.sales_count}}</view>
				</view>
			</view>
			
		</view>
		<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["shopPage", "shopPageSize"]),
		},
		watch: {
			shopPage: function(page) {
				console.log('ddpage')
				this.$store.commit("shopPage", page);
				if (this.shopPage != 1) {
					this.getData();
				}
			},
		},
		data() {
			return {
				maskshow: false,
				height: '',
				isShow: false,
				jiageStatus: 0,
				nowItem: 0,
				fenleiList: [],
				list:[],
				category_id:'',
				// 加载
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '上拉加载更多',
					loading: '正在加载...',
					nomore: '没有了更多了'
				}
			}
		},
		onReachBottom() {
			this.$store.commit("shopPage", this.shopPage + 1);
		},
		onShow() {
			this.list = [];
			this.$store.commit("shopPage", 1);
			this.getData();
		},
		methods: {
			async getData() {
				const res = await this.$api.categories({
					type: 1
				})
				console.log(res.data);
				this.fenleiList = res.data;
				this.status = 'loading';
				setTimeout(async () => {
					const res = await this.$api.itemsList({
						page: this.shopPage,
						limit: this.shopPageSize,
						is_service:0,
						category_id:this.category_id,
					})
					console.log(res)
					if (res.data.data.length == 0) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
						console.log(this.list)
						this.list = this.list.concat(res.data.data)
					}
				}, 200)
				console.log(this.list)
			},
			onMask() {
				this.maskshow = false;
				this.isShow = false;
			},
			fenleiShow() {
				this.maskshow = !this.maskshow;
				this.isShow = !this.isShow;
				this.getCurrentSwiperHeight()
				console.log(this.height)
			},
			changeJiage() {
				if (this.jiageStatus == 0) {
					this.jiageStatus = 1
				} else {
					this.jiageStatus = 0
				}
			},
			changeBtnRadio(item, i) {
				console.log(item, i)
				if(i == 0){
					this.category_id = ''
				}else{
					this.category_id = item.id;
				}
				this.nowItem = i;
				this.maskshow = false;
				this.isShow = false;
				this.list = [];
				this.$store.commit("shopPage", 1);
				this.getData();
			},
			toXiangqin(id) {
				uni.navigateTo({
					url: `/pages/index/shangpinxiangqin/shangpinxiangqin?id=${id}`
				})
			},
			getCurrentSwiperHeight(element) {
				// let query = uni.createSelectorQuery().in(this);
				// query.selectAll(element).boundingClientRect();
				// query.exec((res) => {
				// 	console.log(res, 'res')
				// 	this.height = 50 + res[0][0].height;
				// })
				this.$u.getRect('.nav1-1').then(res => {
					console.log(res);
					this.height = res.height
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #EBEBEB;
	}
</style>
<style scoped lang="scss">
	.index {
		position: relative;
	}
	/deep/ .u-load-more-wrap{
		height: 80rpx !important;
	}

	.nav1 {
		position: fixed;
		z-index: 3;
		top: 0rpx;
		width: 750rpx;
		height: 76rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;

		.txt1 {
			font-size: 28rpx;
			font-weight: 400;
			line-height: 76rpx;
			margin-left: 22rpx;
			color: #000000;
		}

		.txt2 {
			margin-left: 86rpx;
			font-size: 28rpx;
			font-weight: 400;
			line-height: 76rpx;
			color: #000000;
		}

		.pic1 {
			height: 18rpx;
			width: 18rpx;
			margin: 0 14rpx 0 8rpx;
		}

		.txt3 {
			margin-left: 20rpx;
			font-size: 28rpx;
			font-weight: 400;
			line-height: 76rpx;
			color: #000000;
		}
	}

	.nav1-1 {
		z-index: 3;
		position: fixed;
		top: -26rpx;
		background: #FFFFFF;
		transition: all 1s;
		position: absolute;
		z-index: 2;

		.btns {
			padding: 24rpx 22rpx 18rpx 0rpx;

			.btn {
				margin-left: 22rpx;
				margin-bottom: 20rpx;
				display: inline-block;
				padding: 6rpx 32rpx;
				background: #F0F0F0;
				border-radius: 30rpx;
				font-size: 24rpx;
				font-weight: 400;
				line-height: 32rpx;
				color: #000000;
			}

			.btn.active {
				background: #5694FF;
				color: #FFFFFF;
			}
		}
	}

	.nav2 {
		margin-top: 102rpx;
		padding: 0 24rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.item {
			margin-bottom: 20rpx;
			height: 520rpx;
			width: 340rpx;
			background: #FFFFFF;
			border-radius: 16rpx;

			.pic1 {
				border-radius: 16rpx 16rpx 0px 0px;
				width: 340rpx;
				height: 340rpx;
			}

			.txt1 {
				margin: 10rpx 20rpx 26rpx 20rpx;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				line-height: 38rpx;
				color: #000000;
			}

			.txt2 {
				margin: 0 12rpx;
				display: flex;
				justify-content: space-between;
				align-items: flex-end;

				.txt2-1 {
					font-size: 24rpx;
					font-family: SimHei;
					font-weight: 400;
					line-height: 54rpx;
					color: #5694FF;

					.big {
						font-size: 40rpx;
					}
				}

				.txt2-2 {
					transform: translateY(-14rpx);
					width: 120rpx;
					height: 32rpx;
					font-size: 20rpx;
					font-weight: 400;
					line-height: 32rpx;
					color: #989898;
				}
			}
		}
	}
</style>
