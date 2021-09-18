<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view :class="{'box1':true,'box2':item.status==1}"  v-for="item in list">
			<view class="box1-1">
				<image class="pic1" :src="item.image" mode=""></image>
				<view class="txt3">{{item.name}}</view>
			</view>
			<view @click="duihuan(item.id)" v-if="item.status == 0" class="box1-2">
				<view class="txt1">立即</view>
				<view class="txt1">兑换</view>
			</view>
			<view v-else class="box1-2">
				<view class="txt1">兑换</view>
				<view class="txt1">成功</view>
			</view>
		</view>
		<!-- <view class="box1 box2">
			<view class="box1-1">
				<image class="pic1" src="/static/img/zu13.png" mode=""></image>
				<view class="txt3">HUAWEI Mate40</view>
			</view>
			<view class="box1-2">
				<view class="txt1">兑换</view>
				<view class="txt1">成功</view>
			</view>
		</view> -->
		<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default{
		computed: {
			...mapState(["wodejiangpinPage", "wodejiangpinPageSize"]),
		},
		watch: {
			wodejiangpinPage: function(page) {
				console.log('ddpage')
				this.$store.commit("wodejiangpinPage", page);
				if (this.wodejiangpinPage != 1) {
					this.getData();
				}
			},
		},
		data(){
			return{
				list:[],
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
			this.$store.commit("wodejiangpinPage", this.wodejiangpinPage + 1);
		},
		onShow() {
			this.list = [];
			this.$store.commit("wodejiangpinPage", 1);
			this.getData();
		},
		methods:{
			async getData() {
				this.status = 'loading';
				setTimeout(async () => {
					const res = await this.$api.awards({
						page: this.wodejiangpinPage,
						limit: this.wodejiangpinPageSize,
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
			async duihuan(id){
				const res = await this.$api.duihuanAwards(id);
				console.log(res.data);
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: `兑换成功`,
						type: 'success',
						callback:()=>{
							this.list = [];
							this.$store.commit("wodejiangpinPage", 1);
							this.getData()
						},
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #EBEBEB;
	}
</style>
<style scoped lang="scss">
	.index {}
	/deep/ .u-load-more-wrap{
		height: 80rpx !important;
	}
	.box1{
		margin-top: 20rpx;
		margin-left: 20rpx;
		width: 710rpx;
		height: 204rpx;
		background: linear-gradient(90deg, #4D8BFD 0%, #9457FF 100%);
		opacity: 1;
		border-radius: 16rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.box1-1{
			height: 160rpx;
			width: 524rpx;
			border-right: 2rpx dashed #FFFFFF;
			display: flex;
			align-items: center;
			.pic1{
				width: 160rpx;
				height: 160rpx;
			}
			.txt3{
				width: 360rpx;
				padding: 0 16rpx;
				text-align: center;
				font-size: 24rpx;
				color: #FFFFFF;
			}
		}
		.box1-2{
			width: 158rpx;
			height: 160rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.txt1{
				font-size: 30rpx;
				line-height: 44rpx;
				letter-spacing: 4rpx;
				color: #FFFFFF;
			}
		}
	}
	.box2.box1{
		background: #999999;
	}
</style>
