<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="container">
			<view class="items">
				<view class="item" v-for="(item,i) in list" :key='i'>
					<view class="nav2">
						<image class="pic1" :src="item.img_src" mode=""></image>
						<view class="tit">
							<view class="tit1">{{item.title}}</view>
							<image @click="qxshoucang(item)" class="pic2" src="/static/组34.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["shoucangPage", "shoucangPageSize"]),
		},
		watch: {
			shoucangPage: function(page) {
				this.$store.commit("shoucangPage", page);
				if (this.shoucangPage != 1) {
					this.getData();
				}
			},
		},
		data() {
			return {
				openid: "",
				list: [],
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
			this.$store.commit("shoucangPage", this.shoucangPage + 1);
		},
		onShow() {
			this.list = [];
			this.openid = uni.getStorageSync('openid');
			this.$store.commit("shoucangPage", 1);
			this.getData();
		},
		methods: {
			async getData() {
				this.status = 'loading';
				const res = await this.$api.wx_mycollect(this.openid, this.shoucangPage, this.shoucangPageSize);
				console.log(res)
				setTimeout(() => {
					if (!res.list) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
						this.list = this.list.concat(res.list);
						console.log(this.list)
					}
					if (res.list) {
						if (res.list.length < this.shoucangPage) {
							this.status = 'nomore'
						}
					}
				}, 200)
			},
			async qxshoucang(item){
				var signstr = "openid=" + this.openid + "&goods_id=" + item.goods_id + "";
				const md51 = this.$md5(signstr);
				const md52 = md51 + this.$apikey;
				const md = this.$md5(md52).toUpperCase()
				const res = await this.$api.wx_mycollectdel(this.openid,item.goods_id,md)
				console.log(res);
				if (res.result == 1) {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success',
					})
					this.$store.commit("shoucangPage", 1);
					this.list = [];
					this.getData()
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.index {}

	.container {
		.items {
			.item {
				margin: 0 49rpx;

				.nav2 {
					display: flex;
					margin-top: 22rpx;
					height: 163rpx;

					.pic1 {
						width: 228rpx;
						height: 163rpx;
						opacity: 1;
					}

					.tit {
						margin-left: 10rpx;
						height: 36rpx;
						width: 430rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.tit1 {
							opacity: 1;
							font-size: 25rpx;
							font-family: PingFang SC, PingFang SC-Bold;
							font-weight: 700;
							text-align: left;
							color: #121314;
							letter-spacing: 2rpx;
						}

						.pic2 {
							width: 22rpx;
							height: 25rpx;
							opacity: 1;
						}

					}

				}


			}
		}
	}
</style>
