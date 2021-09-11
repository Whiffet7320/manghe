<template>
	<view class="index">
		<view class="pingjiaItem">
			<view class="item" v-for="(item,i) in comment" :key='i'>
				<image class="pic1-1" :src="item.user_info.avatar" mode=""></image>
				<view class="left">
					<view class="tit1">
						<view class="tit1-1">
							<view class="txt1">{{item.user_info.nick_name}}</view>
							<view class="txt2">{{item.comment[0].created_at}}</view>
						</view>
						<view class="tit1-2">
							<u-rate disabled active-color="#1677FF" size='20' gutter="6" :count="pingjiaCount"
								v-model="item.comment[0].rate"></u-rate>
						</view>
					</view>
					<view class="tit2">{{item.comment[0].content}}</view>
					<view class="imgs">
						<image v-for="(ele,i) in item.comment[0].images" :key='i' @click="seeImg(item.comment[0].images,i)" class="img-pic" :src="ele"
							mode=""></image>
					</view>
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
	export default{
		computed: {
			...mapState(["pinglunliebiaoPage", "pinglunliebiaoPageSize"]),
		},
		watch: {
			pinglunliebiaoPage: function(page) {
				console.log('ddpage')
				this.$store.commit("pinglunliebiaoPage", page);
				if (this.pinglunliebiaoPage != 1) {
					this.getData();
				}
			},
		},
		data(){
			return{
				comment:[],
				id:'',
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
		onLoad(option) {
			this.id = option.id;
			this.$store.commit("pinglunliebiaoPage", 1);
			console.log(1111)
			this.getData();
		},
		onReachBottom(){
			this.$store.commit("pinglunliebiaoPage", this.pinglunliebiaoPage + 1);
		},
		methods:{
			async getData() {
				this.status = 'loading';
				setTimeout(async () => {
					const res = await this.$api.itemsItemIdComments({
						page: this.jinqianjiluPage,
						limit: this.jinqianjiluPageSize,
					},this.id)
					console.log(res)
					res.data.forEach(ele=>{
						ele.comment[0].images.forEach(ele2=>{
							if(!ele2){
								ele.comment[0].images.pop()
							}
						})
					})
					if (res.data.length == 0) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
						console.log(this.comment)
						this.comment = this.comment.concat(res.data)
					}
				}, 200)
				console.log(this.comment)
			},
			// 浏览评论图片
			seeImg(images,i) {
				uni.previewImage({
					urls: images,
					current: i
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}
</style>
<style scoped lang="scss">
	.index{}
	.pingjiaItem {
		.item {
			margin-left: 42rpx;
			margin-bottom: 20rpx;
			width: 668rpx;
			height: 298rpx;
			background: #F5F5F5;
			opacity: 1;
			border-radius: 6rpx;
			padding: 30rpx 44rpx;
			display: flex;
			justify-content: space-between;
	
			.pic1-1 {
				width: 80rpx;
				height: 80rpx;
				background: #FFFFFF;
				border-radius: 50%;
			}
	
			.left {
				width: 465rpx;
				display: flex;
				flex-direction: column;
	
				.tit1 {
					margin-top: 0;
					display: flex;
					justify-content: space-between;
					align-items: center;
	
					.tit1-1 {
						.txt1 {
							font-size: 28rpx;
							font-family: Microsoft YaHei;
							font-weight: 300;
							line-height: 38rpx;
							color: #000000;
						}
	
						.txt2 {
							font-size: 20rpx;
							font-family: Microsoft YaHei;
							font-weight: 300;
							line-height: 28rpx;
							color: #000000;
						}
					}
	
					.tit1-2 {}
				}
	
				.tit2 {
					margin-top: 14rpx;
					font-size: 28rpx;
					font-family: Microsoft YaHei;
					font-weight: 300;
					line-height: 38rpx;
					color: #000000;
				}
	
				.imgs {
					margin-top: 24rpx;
					display: flex;
	
					.img-pic {
						width: 96rpx;
						height: 96rpx;
						margin-right: 10rpx;
					}
				}
			}
		}
	}
	
</style>
