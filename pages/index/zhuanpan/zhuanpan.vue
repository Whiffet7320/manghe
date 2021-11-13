<template>
	<view class="index">
		<u-toast ref="uToast" />
		<u-modal @confirm='modalClick' v-model="modalShow" :content="modalContent"></u-modal>
		<view class="headerbox">
			<view class="left" @click="openJiangpin">
				<image src="/static/img/liwu.png" mode="" class="imgs"></image>
				<view class="size">
					我的奖品
				</view>
				<image src="/static/img/xiangyoujiantou.png" mode="" class="jiantou"></image>
			</view>
			<view class="flex"></view>
			<view class="right">
				剩余抽奖次数：{{cishu}}
			</view>
		</view>
		<image class="pic1" src="/static/img/mcz156.png" mode=""></image>
		<image class="pic2" src="/static/img/zt.png" mode=""></image>
		<!-- 大转盘 -->
		<view class="myZP"
			v-show="!jiasutixian2&&!vidioShow&&!pop1show&&!modalShow&&!wodejiangpinShow&&!wuliuShow&&!haoyouzhuli&&!jiasutixian">
			<image class="pic3" src="/static/img/mcz158.png" mode=""></image>
			<LuckyWheel class="mywheel" ref="luckyWheel" width="468rpx" height="468rpx" :blocks="blocks"
				:prizes="prizes" :buttons="buttons" :defaultStyle="defaultStyle" @start="startCallBack"
				@end="endCallBack" />
		</view>
		<view class="footbox">
			<view class="yihuoqujine">
				已获视频现金
				<view class="yuanss">{{zongPrice}}</view>元
			</view>
			<!-- 			<view class="btn" @click="tixian">
				提现
			</view> -->
			<view class="tishi">
				<view class="headerTitle">
					抽奖说明
				</view>
				<view class="size">
					<p v-for="(item,index) in choujiangshuoming" :key=index>{{item}}</p>
				</view>
			</view>
		</view>
		<u-popup v-model="wodejiangpinShow" mode="center" :mask-close-able="false" :closeable="true" width="654rpx"
			border-radius="20">
			<view class="popbody">
				<view class="title">
					我的奖品
				</view>
				<scroll-view :scroll-y="true" class="popbody" :style="{height:swiperheight+'px'}" :show-scrollbar="true"
					@scrolltolower="scrolltolowercc">
					<view v-for="(item,index) in wodejiangpin" :key="index" class="indexbox">
						<view class="center" @click="caozuo(item)">
							<view class="top">
								{{item.title}}
							</view>
							<view class="foot">
								<view class="left">
									{{item.time}}
								</view>
								<view
									:class="item.status == 0 && (item.type == 1 || item.type == 2)?'size':item.status == 2 && (item.type == 1 || item.type == 2)?'size1':item.status == 0 && item.type == 3?'size':item.status == 1 && item.type == 3?'size':item.status == 2 && item.type == 3?'size':item.status == 3 && item.type == 3?'size':''">
									<template v-if="item.type == 1">
										{{item.status == 0?'观看视频':item.status == 1?'已失效':'已提现'}}
									</template>
									<template v-if="item.type == 2">
										{{item.status == 0?'邀请中':item.status == 1?'已失效':'已提现'}}
									</template>
									<template v-if="item.type == 3">
										{{item.status == 0?'邀请中':item.status == 1?'选择商品':item.status == 2?'请填写收获地址':item.status == 3?'查看物流信息':'已失效'}}
									</template>
								</view>
							</view>
						</view>
					</view>
					<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
				</scroll-view>
			</view>
		</u-popup>
		<u-popup v-model="wuliuShow" mode="center" :mask-close-able="false" :closeable="true" width="654rpx"
			border-radius="20">
			<view class="popbody" v-if="wuliuxinxiList.length == 0">
				<view class="wuliutitle">
					物流信息
				</view>
				<view class="tishi mt">
					请等待发货
				</view>
				<view class=" tishi mt1 mb">
					暂无物流信息
				</view>
			</view>
			<view class="popbody" v-if="wuliuxinxiList.length !== 0">
				<view class="wuliutitle">
					物流信息
				</view>
				<view class="tishi mt">
					{{wltxt}} {{wlorder}}
				</view>
				<scroll-view :scroll-y="true" class="popupscroll" :style="{height:swiperheight+'px',marginTop:'38rpx'}"
					:show-scrollbar="true" @scrolltolower="scrolltolowercc">
					<u-time-line>
						<u-time-line-item v-for="(item,index) in wuliuxinxiList" :key="index">
							<template v-slot:node>
								<view :class="index == 0?'node1':'node'" class="position">
								</view>
							</template>
							<template v-slot:content>
								<view class="content" style="margin-right: 40rpx;">
									<view :class="index == 0?'tt1':'tt'">
										{{item.ftime}}
									</view>
									<view class="bb">
										{{item.context}}
									</view>
								</view>
							</template>
						</u-time-line-item>
					</u-time-line>
				</scroll-view>
			</view>
		</u-popup>
		<u-popup v-model="haoyouzhuli" mode="center" :mask-close-able="false" :closeable="true" width="654rpx"
			height="350rpx" border-radius="20">
			<view class="popbody">
				<view class="wuliutitle">
					抽奖助力
				</view>
				<view class="tishi2">
					是否为好友助力？
				</view>
				<view class="footbss">
					<view @click="haoyouzhuli = false" class="quxiao">取消</view>
					<view @click="zhuli" class="queding">确定</view>
				</view>
			</view>
		</u-popup>
		<!-- 现金 -->
		<u-mask :show="jiasutixian" :mask-click-able="false">
			<view class="centerbody">
				<view class="zhulibox">
					<view class="dingbu">
						<view class="title">
							抽中
							<text class="num">{{resObj.count_money}}</text>
							元现金
						</view>
						<view class="title">
							距离提现仅差
							<text class="num">{{resObj.money}}</text>
							元
						</view>
						<view class="imgcc">
							<image src="/static/img/1229310763000_mthumb.png" mode="" class="imgs"></image>
						</view>
						<!-- <image src="/static/img/dachacha.png" mode="" class="close" @click="closeShow"></image> -->
					</view>
					<view class="yihuoquxianjin">
						已获现金
					</view>
					<view class="zongjine">
						<text class="danwei">¥</text>
						<text class="money">{{Number(resObj.count_money) - Number(resObj.money)}}</text>
					</view>
					<image :src="zhulixianjin.baifenbi !== 100?'/static/img/noman.png':'/static/img/manle.png'" mode=""
						class="jindutiao"></image>
					<view class="bsdtn" @click="jiasudddd">
						点击加速提现
					</view>
				</view>
			</view>
		</u-mask>
		<!-- 奖品 -->
		<u-mask :show="jiasutixian2" :mask-click-able="false">
			<view class="centerbody">
				<view class="zhulibox">
					<view class="dingbu">
						<view class="title">
							已选择价值
							<text class="num">{{resObj.count_money}}</text>
							元商品
						</view>
						<view class="title">
							距离提现仅差
							<text class="num">{{resObj.money}}</text>
							元
						</view>
						<view class="imgcc">
							<image src="/static/img/1229310763000_mthumb.png" mode="" class="imgs"></image>
						</view>
						<!-- <image src="/static/img/dachacha.png" mode="" class="close" @click="closeShow"></image> -->
					</view>
					<view class="yihuoquxianjin">免单仅差</view>
					<view class="zongjine">
						<text class="danwei">¥</text>
						<text class="money">{{resObj.money}}</text>
					</view>
					<image :src="zhulixianjin.baifenbi !== 100?'/static/img/noman.png':'/static/img/manle.png'" mode=""
						class="jindutiao"></image>
					<view class="bsdtn" @click="jiasudddd">
						点击加速提现
					</view>
				</view>
			</view>
		</u-mask>
		<!-- 观看视频 -->
		<view class="myVideo" v-if="vidioShow">
			<video id="video_play" :show-fullscreen-btn='false' :show-play-btn='false' :show-center-play-btn='false'
				:enable-progress-gesture='false' :src="csViderSrc"  :autoplay="true" object-fit="contain"
				@ended='videoEnd' :controls="false" style="height: 100vh;width: 100%"></video>
			<view class="videoMask">完整观看视频可获现金哦</view>
		</view>
		<!-- 获得视频现金 -->
		<u-popup v-model="pop1show" mode='center' border-radius='22' width='522rpx' height='470rpx'>
			<view class="pop1">
				<view class="pop1-txt1">获得视频现金！</view>
				<image src="/static/img/qianqian.png" class="pop1-pic" mode=""></image>
				<view class="pop1-txt2">+{{videoPrice}}</view>
				<view class="pop1-btn" @click="pop1show = false">
					<view class="child">开心收下</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import LuckyWheel from 'uni-luck-draw/lucky-wheel';
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["dzpWodejiangpinPage"]),
		},
		watch: {
			dzpWodejiangpinPage: function(page) {
				this.$store.commit("dzpWodejiangpinPage", page);
				if (this.dzpWodejiangpinPage != 1) {
					this.getData();
				}
			},
		},
		components: {
			LuckyWheel
		},
		data() {
			return {
				wlorder:'',
				wltxt:'',
				videoPrice: '',
				csViderSrc: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
				pop1show: false,
				vidioShow: false,
				// 加载
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '上拉加载更多',
					loading: '正在加载...',
					nomore: '没有了更多了'
				},
				jiasutixian2: false,
				cishu: '',
				modalShow: false,
				modalContent: '',
				zhulixianjin: {
					zongjine: 200,
					chaer: 0.25,
					yihuojine: 19999.75,
					baifenbi: 99.9
				},
				jiasutixian: false,
				haoyouzhuli: false,
				wuliuxinxiList: [],
				wodejiangpinShow: false,
				wuliuShow: false,
				swiperheight: 500,
				blocks: [{
					padding: '13px',
					background: '#d64737',
					// imgs: [{
					// 	src: '/static/img/zu1821.png',
					// }],
				}],
				prizes: [], //奖品
				buttons: [{
						radius: '50px',
						background: '#d64737'
					},
					{
						radius: '45px',
						background: '#fff'
					},
					{
						radius: '41px',
						background: '#f6c66f',
						pointer: true
					},
					{
						radius: '35px',
						background: '#ffdea0',
						fonts: [{
							text: '开始\n抽奖',
							fontSize: '18px',
							top: -18
						}]
					}
				],
				defaultStyle: {
					fontColor: '#d64737',
					fontSize: '14px'
				},
				choujiangshuoming: '',
				wodejiangpin: [],
				resObj: {},
				toTTid: '',
				optionId: '',
				scencLid: '',
				zongPrice: '',
				showType: '',
				idid: '',
			}
		},
		onShow() {
			this.$store.commit('dzpWodejiangpinPage', 1)
			this.wodejiangpin = [];
			this.getData()
		},
		async onLoad(options) {
			console.log(options.scene, 1111111111111111)
			if (options.scene) {
				const arr = options.scene.split('_')
				// uni.setStorageSync('scene', arr[1])
				this.scencLid = arr[0];
				this.haoyouzhuli = true;
				// uni.setStorageSync('myUserId', arr[1])
				if (!uni.getStorageSync('token')) {
					uni.navigateTo({
						url: `/pages/wode/weixinshouquan/weixinshouquan?recommend_userid=${uni.getStorageSync('myUserId')}`
					})
				}
			} else {
				uni.setStorageSync('scene', 0)
			}
			if (options.id) {
				const res = await this.$api.choujiangTreeTurntable({
					lid: options.id
				})
				this.toTTid = options.id;
				console.log(res, 'option')
				if (res.code == 200) {
					this.resObj = res.data;
					this.jiasutixian2 = true;
				}
			}
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight
					this.swiperheight = height - 100;
				}
			})
		},
		// 用户点击右上角分享转发
		onShareAppMessage: async function() {
			var title = '分销商城app'; //data，return 数据title
			return {
				title: title || '',
				path: `/pages/index/index?scene=0_${uni.getStorageSync('user_id')}`,
			}
		},
		//用户点击右上角分享朋友圈
		onShareTimeline: async function() {
			var title = '分销商城app'; //data，return 数据title
			return {
				title: title || '',
				path: `/pages/index/index?scene=0_${uni.getStorageSync('user_id')}`,
			}
		},
		methods: {
			async getData() {
				this.status = 'loading';
				const res2 = await this.$api.choujiangI_prize_list({
					page: this.dzpWodejiangpinPage
				});
				if (res2.data.length == 0) {
					this.status = 'nomore'
				} else {
					this.status = 'loadmore';
					console.log(this.wodejiangpin)
					this.wodejiangpin = this.wodejiangpin.concat(res2.data.data)
				}
				const res = await this.$api.choujiangIndex()
				this.cishu = res.data.cishu;
				this.choujiangshuoming = res.data.shuoming;
				this.prizes = res.data.prize;
				this.zongPrice = res.data.live_moeny;
				res.data.prize.forEach((ele, i) => {
					if (i % 2 == 0) {
						this.prizes[i] = {
							title: ele.prize,
							id: ele.id,
							background: '#f9e3bb',
							fonts: [{
								text: ele.prize,
								top: '18%'
							}]
						}
					} else {
						this.prizes[i] = {
							title: ele.prize,
							id: ele.id,
							background: '#f8d384',
							fonts: [{
								text: ele.prize,
								top: '18%'
							}]
						}
					}
				})
				console.log(this.prizes)
			},
			playVedio() {
				this.videoContext = uni.createVideoContext('video_play');
				this.videoContext.requestFullScreen();
			},
			// 
			jiasudddd() {
				// this.zhulixianjin.baifenbi = 100;
				this.jiasutixian = false;
				this.jiasutixian2 = false;
				uni.navigateTo({
					url: `/pages/index/zhuanpan/tiantianmiandan?lid=${this.toTTid}`
				})
			},
			closeShow() {
				this.jiasutixian = false
			},
			tixian() {
				this.jiasutixian = true
			},
			async caozuo(item) {
				this.toTTid = item.id;
				console.log(item.status, item.type, item);
				const res = await this.$api.choujiangTreeTurntable({
					lid: item.id
				})
				console.log(res)
				if (res.code == 200) {
					this.resObj = res.data;
				}
				if (item.type == 1) {
					if (item.status == 0) {
						this.csViderSrc = item.live_url;
						this.wodejiangpinShow = false;
						this.vidioShow = true;
					} else if (item.status == 2) {

					}
				} else if (item.type == 2) {
					if (item.status == 0) {
						this.wodejiangpinShow = false;
						this.jiasutixian = true;
					} else if (item.status == 2) {

					}
				} else if (item.type == 3) {
					if (item.status == 0) {
						this.wodejiangpinShow = false;
						this.jiasutixian2 = true;
					} else if (item.status == 1) {
						this.wodejiangpinShow = false;
						uni.navigateTo({
							url: `/pages/index/zhuanpan/shangpingmiandan?id=${item.prize}&lid=${item.id}`
						})
					} else if (item.status == 2) {
						this.wodejiangpinShow = false;
						uni.navigateTo({
							url: `/pages/index/zhuanpan/tiantianmiandan?lid=${item.id}`
						})
					} else if (item.status == 3) {
						const res = await this.$api.choujiangKuaidi({
							lid: item.id
						})
						console.log(res)
						this.wuliuxinxiList = res.data.content;
						this.wltxt = res.data.name;
						this.wlorder = res.data.order;
						this.wodejiangpinShow = false;
						this.wuliuShow = true;
					}
				}

			},
			scrolltolowercc() {
				console.log('11');
				this.$store.commit('dzpWodejiangpinPage', this.dzpWodejiangpinPage + 1)
				// 上啦加载事件 
			},
			// 点击抽奖按钮触发回调
			async startCallBack() {
				// 先开始旋转
				const res2 = await this.$api.choujiangChou_jiang();
				console.log(res2)
				this.modalContent = res2.msg;
				this.toTTid = res2.data.lid;
				this.idid = res2.data.id;
				this.showType = res2.data.type;
				this.csViderSrc = res2.data.live;
				if (res2.code == 200) {
					this.resultId = res2.data.id;
					this.$refs.luckyWheel.play()
					setTimeout(async () => {
						// 3s后得到中奖索引
						let resultIndex;
						this.prizes.forEach((ele, i) => {
							if (ele.id == this.resultId) {
								this.resultIndex = i
							}
						})
						console.log(this.resultIndex)
						const res = await this.$api.choujiangTreeTurntable({
							lid: this.toTTid,
						})
						console.log(res)
						if (res.code == 200) {
							this.resObj = res.data;
							// this.showType = res.data.type;
							// console.log(this.showType,'type')
						}
						// 缓慢停止游戏
						this.$refs.luckyWheel.stop(this.resultIndex)
					}, 2000)
				} else {
					this.modalShow = true;
				}
			},
			// 抽奖结束触发回调
			async endCallBack(prize) {
				// 奖品详情
				console.log(this.showType, 'showtype')
				if (this.showType == 1) {
					// 视频
					this.modalShow = true;
				} else if (this.showType == 2) {
					// 现金
					this.jiasutixian = true;
				} else if (this.showType == 3) {
					// 实物
					this.modalShow = true;
				}
				this.$store.commit('dzpWodejiangpinPage', 1)
				this.wodejiangpin = [];
				this.getData();
			},
			modalClick() {
				if (this.showType == 3) {
					uni.navigateTo({
						url: `/pages/index/zhuanpan/shangpingmiandan?id=${this.idid}&lid=${this.toTTid}`
					})
				}else if(this.showType == 1){
					this.vidioShow = true;
				}
			},
			toWodejiangping() {
				uni.navigateTo({
					url: '/pages/index/zhuanpan/wodejiangping'
				})
			},
			openJiangpin() {
				this.wodejiangpinShow = true
			},
			async videoEnd() {
				const res = await this.$api.choujiangLive_prize({
					lid: this.toTTid,
				})
				console.log(res)
				if (res.code == 200) {
					this.videoPrice = res.data;
					this.vidioShow = false;
					this.pop1show = true;
					this.$store.commit('dzpWodejiangpinPage', 1)
					this.wodejiangpin = [];
					this.getData();
				}
			},
			async zhuli() {
				const res = await this.$api.choujiangZhuLi({
					prize: this.scencLid
				})
				console.log(res)
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success',
						callback: () => {
							this.haoyouzhuli = false;
						}
					})
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


<style lang="scss">
	page {
		width: 750rpx;
		height: 1624rpx;
		background: #ffeedf;
	}
</style>
<style scoped lang="scss">
	.pop1 {
		width: 522rpx;
		height: 470rpx;
		background: linear-gradient(180deg, #ff4b4b, #f23636);
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.pop1-txt1 {
			padding-top: 48rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #ffed77;
			line-height: 44rpx;
		}

		.pop1-pic {
			margin-top: 58rpx;
			width: 76rpx;
			height: 76rpx;
		}

		.pop1-txt2 {
			margin-top: 8rpx;
			font-size: 48rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #fff5b5;
			line-height: 44rpx;
		}

		.pop1-btn {
			margin-top: 54rpx;
			width: 250rpx;
			height: 80rpx;
			background: linear-gradient(0deg, #ffb34b, #fbf8c5);
			border-radius: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.child {
				width: 226rpx;
				height: 64rpx;
				background: linear-gradient(180deg, #ffb34b, #fbf8c5);
				border-radius: 32rpx;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #e51a1a;
				line-height: 64rpx;
			}
		}
	}

	.myVideo {
		position: relative;

		.videoMask {
			position: absolute;
			bottom: 118rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 328rpx;
			height: 82rpx;
			background: #191721;
			border-radius: 10rpx;
			font-size: 24rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: center;
			color: #ffffff;
			line-height: 82rpx;
		}
	}

	.centerbody {
		z-index: 10099;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 750rpx;
		height: 1624rpx;

		.zhulibox {
			width: 522rpx;
			height: 520rpx;
			background: linear-gradient(180deg, #ff4b4b, #f51111);
			border-radius: 20rpx;
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;

			.dingbu {
				width: 100%;
				position: absolute;
				top: -210rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				// background-color: blue;
				.title {
					font-size: 36rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					text-align: center;
					color: #ffffff;
					line-height: 44rpx;
					z-index: 9999;

					.num {
						font-size: 36rpx;
						font-family: PingFang SC, PingFang SC-Bold;
						font-weight: 700;
						text-align: center;
						color: #FFF194;
						line-height: 44rpx;
					}
				}

				.imgcc {
					margin-top: 58rpx;
					width: 116rpx;
					height: 116rpx;
					background: rgba(0, 0, 0, 0.00);
					border: 4rpx solid #fe4646;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;

					// position: absolute;
					// left: 50%;
					// top: -58rpx;
					// transform: translateX(-50%);
					.imgs {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}

				.close {
					position: absolute;
					bottom: 73rpx;
					right: 10rpx;
					width: 26rpx;
					height: 26rpx;
				}
			}

			.yihuoquxianjin {
				margin-top: 100rpx;
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #ffed77;
			}

			.zongjine {
				margin-top: 30rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #fff5b5;
				line-height: 44rpx;

				.danwei {
					font-size: 48rpx;
				}

				.money {
					font-size: 60rpx;
				}

			}

			.jindutiao {
				margin-top: 36rpx;
				width: 462rpx;
				height: 76rpx;
			}

			.bsdtn {
				margin-top: 46rpx;
				background: url(/static/img/jiasutixian.png) no-repeat no-repeat;
				background-size: cover;
				width: 250rpx;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: left;
				color: #e51a1a;
				line-height: 44rpx;
			}
		}
	}

	.content {
		margin-left: 45rpx;
		display: flex;
		flex-direction: column;
		align-items: left;

		// margin-left: 45rpx;
		.tt {
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: left;
			color: #333333;
			margin-bottom: 2rpx;
		}

		.tt1 {
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: left;
			color: #3585f5;
		}

		.bb {
			font-size: 24rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: left;
			color: #cccccc;
		}
	}

	.index {
		position: relative;
	}

	.myZP {
		position: absolute;
		width: 600rpx;
		height: 600rpx;
		top: 150rpx;
		left: 76rpx;

		.pic3 {
			position: absolute;
			width: 600rpx;
			height: 600rpx;
			// z-index: 2;
		}

		.mywheel {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.pic1 {
		position: absolute;
		top: 108rpx;
		left: 34rpx;
		width: 682rpx;
		height: 704rpx;
	}

	.pic2 {
		position: absolute;
		top: 753rpx;
		left: 74rpx;
		width: 602rpx;
		height: 234rpx;
	}

	.footbox {
		width: 100%;
		position: absolute;
		// background: red;
		top: 1008rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.yihuoqujine {
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 24rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: right;
			color: #632f01;
			line-height: 24rpx;

			.yuanss {
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: right;
				color: #FA4A4A;
				line-height: 24rpx;
			}
		}

		.btn {
			margin-top: 20rpx;
			width: 172rpx;
			height: 62rpx;
			background: linear-gradient(180deg, #ff7474, #f51111);
			border: 2rpx solid #f62020;
			border-radius: 34rpx;
			font-size: 24rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: left;
			color: #ffffff;
			line-height: 44rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.tishi {
			margin-top: 40rpx;
			width: 692rpx;
			height: 382rpx;
			background: rgba(255, 255, 255, 0.50);
			border: 2rpx dashed #c80000;
			border-radius: 24rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #a40000;

			.headerTitle {
				margin-top: 30rpx;
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: left;
				color: #a40000;
			}

			.size {
				margin-top: 14rpx;
				width: 612rpx;
				height: 258rpx;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: left;
				color: #a40000;
				line-height: 44rpx;
			}
		}
	}

	.headerbox {
		display: flex;
		flex-direction: row;
		align-items: center;
		position: absolute;
		top: 38rpx;
		height: 66rpx;
		// background-color: red;
		width: 100%;
		padding: 0 48rpx 0 38rpx;

		.left {
			width: 216rpx;
			height: 66rpx;
			opacity: 0.8;
			background: #ffffff;
			border-radius: 34rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 0 20rpx;

			.imgs {
				width: 38rpx;
				height: 38rpx;
				margin-right: 14rpx;
			}

			.size {
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #632f01;
				line-height: 24rpx;
				margin-right: 12rpx;
			}

			.jiantou {
				width: 12rpx;
				height: 22rpx;
			}
		}

		.flex {
			flex: 1;
		}

		.right {
			font-size: 24rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: right;
			color: #632f01;
			line-height: 24rpx;
		}
	}

	.popbody {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.title {
			margin-top: 40rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #333333;
			line-height: 44rpx;
			margin-bottom: 34rpx;
		}

		.indexbox {
			margin-left: 24rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 606rpx;
			height: 138rpx;
			background: rgba(153, 153, 153, 0.05);
			border-radius: 10rpx;
			margin-bottom: 16rpx;
			padding: 30rpx 54rpx 30rpx 30rpx;

			.center {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: left;

				.top {
					font-size: 24rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					text-align: left;
					color: #333333;
					line-height: 44rpx;
					margin-bottom: 10rpx;
				}

				.foot {
					width: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;

					.left {
						font-size: 24rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						text-align: left;
						color: #999999;
						line-height: 44rpx;
						flex: 1;
					}

					.right {}

					.size {
						font-size: 24rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						text-align: right;
						color: #1a71f3;
						line-height: 44rpx;
					}

					.size1 {
						font-size: 24rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						text-align: right;
						color: #666666;
						line-height: 44rpx;
					}
				}
			}
		}

		.wuliutitle {
			margin-top: 40rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #333333;
		}

		.mt {
			margin-top: 8rpx;
		}

		.mt1 {
			margin-top: 108rpx;
		}

		.mb {
			margin-bottom: 136rpx;
		}

		.tishi {
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: center;
			color: #999999;
			line-height: 44rpx;
		}

		.tishi2 {
			margin-top: 64rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: center;
			color: #666666;
			line-height: 44rpx;
		}

		.footbss {
			margin-top: 64rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

			.quxiao {
				width: 172rpx;
				height: 62rpx;
				background: #ffffff;
				border: 1rpx solid #999999;
				border-radius: 33rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: left;
				color: #707070;
				line-height: 44rpx;
				margin-right: 20rpx;
			}

			.queding {
				width: 172rpx;
				height: 62rpx;
				background: linear-gradient(180deg, #ff7474, #f51111);
				border: 2rpx solid #f62020;
				border-radius: 34rpx;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: left;
				color: #ffffff;
				line-height: 44rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.node {
			margin-left: 88rpx;
			width: 10rpx;
			height: 10rpx;
			background: #cccccc;
			border-radius: 6rpx;
		}

		.node1 {
			margin-left: 88rpx;
			width: 10rpx;
			height: 10rpx;
			background: #3585F5;
			border-radius: 6rpx;
		}

		.position {
			position: relative;
		}
	}
</style>
