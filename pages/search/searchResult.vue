<template>
	<view class="index">
		<view class="nav1">
			<u-icon @click='toBack' name="arrow-left" color="#000000" size="40"></u-icon>
			<view class="myInp">
				<u-icon name="search" color="#C7C7C7" size="28"></u-icon>
				<u-input v-model="searchVal" placeholder='搜索专家/项目/关键词' placeholder-style='color: #C7C7C7;' type="text"
					height="60rpx" />
			</view>
		</view>
		<view class="nav2">
			<view class="item" @click="changeRad(1)">
				<view :class='{"txt":true,"active":RadIndex==1}'>综合</view>
				<image class="pic" v-if="RadIndex == 1" src="/static/image/zu1564.png" mode=""></image>
				<image class="pic" v-else src="/static/image/zu1567.png" mode=""></image>
			</view>
			<view class="item" @click="changeRad(2)">
				<view :class='{"txt":true,"active":RadIndex==2}'>价格</view>
				<image class="pic" v-if="RadIndex == 2" src="/static/image/zu1564.png" mode=""></image>
				<image class="pic" v-else src="/static/image/zu1567.png" mode=""></image>
			</view>
			<view class="item" @click="changeRad(3)">
				<view :class='{"txt":true,"active":RadIndex==3}'>销量</view>
				<image class="pic" v-if="RadIndex == 3" src="/static/image/zu1564.png" mode=""></image>
				<image class="pic" v-else src="/static/image/zu1567.png" mode=""></image>
			</view>
		</view>
		<view class="nav3">
			<view class="item" v-for="item in list" :key='item.id' @click="toSousuoXiangqin(item)">
				<image :src="item.image" class="pic" mode=""></image>
				<view class="right">
					<view class="txt1">{{item.store_name}}</view>
					<view class="txt2">肋骨鼻综合</view>
					<view class="txt3">¥{{item.price}}<text class="small" style="margin-left: 10rpx;">¥{{item.ot_price}}</text></view>
				</view>
			</view>
		</view>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				searchVal: '',
				RadIndex: 1,
				sid:'',
				list:[],
				type:'',
				keyword:'',
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
		onLoad(options) {
			this.sid = options.sid;
			options.type ? this.type = options.type : ''
			options.keyword ? this.keyword = options.keyword : ''
			this.list = [];
			this.$store.commit("shopPage", 1);
			this.getData();
		},
		// onShow() {
		// 	this.getData()
		// },
		onReachBottom() {
			this.$store.commit("shopPage", this.shopPage + 1);
		},
		methods: {
			async getData(){
				this.status = 'loading';
				setTimeout(async () => {
					const res = await this.$api.products({
						sid:this.sid,
						page: this.shopPage,
						limit: this.shopPageSize,
						keyword:this.keyword,
						type:this.type
					})
					if (res.data.length == 0) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
						this.list = this.list.concat(res.data)
						// this.list.forEach(ele => {
						// 	if (ele.img_paths) {
						// 		ele.myImg_paths = ele.img_paths.split(',')
						// 		ele.myImg_paths.forEach((img, i) => {
						// 			this.$set(ele.myImg_paths, i, `${this.$url}/${img}`)
						// 		})
						// 	}
						// })
					}
				}, 200)
				console.log(this.list)
			},
			changeRad(val) {
				this.RadIndex = val;
			},
			toBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			toSousuoXiangqin(item){
				uni.navigateTo({
					url:`/pages/index/search/xiangqin?title=${item.store_name}&id=${item.id}`
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
		// width: 686rpx;
		height: 100rpx !important;
	}
	.index {}

	.nav1 {
		background: #FFFFFF;
		padding-bottom: 18rpx;
		display: flex;
		align-items: center;
		margin-top: 96rpx;
		padding-left: 30rpx;

		.myInp {
			margin-left: 8rpx;
			padding: 0 24rpx;
			width: 436rpx;
			height: 64rpx;
			background: rgba(189, 158, 129, 0.05);
			border: 2rpx solid #BD9E81;
			display: flex;
			align-items: center;
			border-radius: 30rpx;

			/deep/ .u-input {
				margin-left: 14rpx;
				width: 340rpx !important;

				.u-input__input {
					font-size: 24rpx;
					font-weight: 400;
					line-height: 60rpx;
				}
			}
		}
	}

	.nav2 {
		display: flex;
		align-items: center;
		justify-content: space-around;
		.item {
			height: 80rpx;
			display: flex;
			align-items: center;

			.txt {
				font-size: 24rpx;
				font-weight: bold;
				color: #707070;
			}
			.txt.active{
				color: #BD9E81;
			}

			.pic {
				margin-left: 14rpx;
				height: 18rpx;
				width: 12rpx;
			}
		}
	}
	.nav3{
		.item{
			display: flex;
			background: #FFFFFF;
			padding: 24rpx 36rpx;
			margin-bottom: 20rpx;
			.pic{
				width: 140rpx;
				height: 140rpx;
				margin-right: 24rpx;
			}
			.right{
				width: 512rpx;
				display: flex;
				flex-direction: column;
				// justify-content: space-between;
				.txt1{
					font-size: 32rpx;
					font-weight: 500;
					color: #BD9E81;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
				.txt2{
					margin: 12rpx 0;
					font-size: 24rpx;
					font-weight: 400;
					color: #707070;
				}
				.txt3{
					font-size: 32rpx;
					font-weight: bold;
					color: #FA8677;
					.small{
						font-size: 24rpx;
						font-weight: 400;
						color: #707070;
						text-decoration:line-through;
					}
				}
			}
		}
	}
</style>
