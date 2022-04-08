<template>
	<view class="index">
		<u-toast ref="uToast" />
		<u-navbar :is-back='false' title="收纳盒">
			<u-icon @click='toHome' style='margin-left: 24rpx;' name="arrow-left" color="#666666" size="36"></u-icon>
			<view v-if="!isZH" @click="popShow1 = true" class="slot-wrap">说明</view>
			<view v-else class="slot-wrap" @click="isZH = false">取消</view>
		</u-navbar>
		<view class="nav11">
			<view class="nav1">
				<view @click="changeIndex(0)" :class="{'txt':true,'active':nowIndex==0}">待提取</view>
				<view @click="changeIndex(1)" :class="{'txt':true,'active':nowIndex==1}">待收货</view>
				<view @click="changeIndex(2)" :class="{'txt':true,'active':nowIndex==2}">已分解</view>
				<view @click="changeIndex(3)" :class="{'txt':true,'active':nowIndex==3}">已置换</view>
				<view @click="changeIndex(4)" :class="{'txt':true,'active':nowIndex==4}">已完成</view>
			</view>
		</view>

		<!-- 空 -->
		<template v-if="list.length == 0">
			<image src="/static/img/zu810.png" class="kImg" mode=""></image>
			<view class="kTxt">暂无记录，快去开始吧</view>
		</template>

		<template v-else>
			<view :class="{'nav2':true,'active':isZH}">
				<!-- 置换 -->
				<template v-if="isZH">
					<u-checkbox-group @change="checkboxGroupChange">
						<u-checkbox @change="checkboxChange(item,$event)" shape="circle" v-model="item.checked"
							v-for="(item, index) in list" :key="item.order_id" :name="item.order_id">
							<view class="item2 item">
								<view class="tit1">
									<view class="txt1">开盒时间：{{formatDate(item.open_time)}}</view>
									<view class="txt2">待提取</view>
								</view>
								<view class="heng"></view>
								<view class="tit2">
									<view :class="{'t2-l':true,'item1':item.shop_degree == 0,'item2':item.shop_degree == 1,'item3':item.shop_degree == 2,'item4':item.shop_degree == 3}">
										<view v-if="item.shop_degree == 0" class="t2-l-txt2 t2-l-txt">金色传说</view>
										<view v-if="item.shop_degree == 1" class="t2-l-txt2 t2-l-txt">红色史诗</view>
										<view v-if="item.shop_degree == 2" class="t2-l-txt2 t2-l-txt">紫色稀有</view>
										<view v-if="item.shop_degree == 3" class="t2-l-txt2 t2-l-txt">蓝色普通</view>
										<image :src="item.shop_img" class="t2-l-img" mode=""></image>
									</view>
									<view class="t2-r">
										<view class="txtt1">{{item.shop_name}}</view>
										<view class="txtt2">参考价：<text class="sp">{{item.order_total}}</text>
											<image src="/static/img/tu1001.png" class="picc" mode=""></image>
										</view>
									</view>
								</view>
								<view class="heng"></view>
								<view class="tit3">
									<view class="btn">分解</view>
									<view class="btn">置换</view>
									<view class="btn">提取</view>
								</view>
							</view>
						</u-checkbox>
					</u-checkbox-group>

				</template>
				<template v-else>
					<view class="item" v-for="(item,i) in list" :key='item.order_id'>
						<view class="tit1">
							<view class="txt1">开盒时间：{{formatDate(item.open_time)}}</view>
							<!-- 待提取 -->
							<view v-if="nowIndex == 0" class="txt2">{{item.order_status_name}}</view>
							<!-- 待收货 -->
							<view v-if="nowIndex == 1" class="txt2">{{item.order_status_name}}</view>
							<!-- 已分解 -->
							<image v-if="nowIndex == 2" src="/static/img/zu4125.png" class="piccc" mode=""></image>
							<!-- 已置换 -->
							<image v-if="nowIndex == 3" src="/static/img/zu4122.png" class="piccc" mode=""></image>
							<!-- 已完成 -->
							<image v-if="nowIndex == 4" src="/static/img/zu4124.png" class="piccc" mode=""></image>
						</view>
						<view class="heng"></view>
						<view class="tit2">
							<view :class="{'t2-l':true,'item1':item.shop_degree == 0,'item2':item.shop_degree == 1,'item3':item.shop_degree == 2,'item4':item.shop_degree == 3}">
								<view v-if="item.shop_degree == 0" class="t2-l-txt">金色传说</view>
								<view v-if="item.shop_degree == 1" class="t2-l-txt">红色史诗</view>
								<view v-if="item.shop_degree == 2" class="t2-l-txt">紫色稀有</view>
								<view v-if="item.shop_degree == 3" class="t2-l-txt">蓝色普通</view>
								<image :src="item.shop_img" class="t2-l-img" mode=""></image>
							</view>
							<view class="t2-r">
								<view class="txtt1">{{item.shop_name}}</view>
								<view class="txtt2">参考价：<text class="sp">{{item.order_total}}</text>
									<image src="/static/img/tu1001.png" class="picc" mode=""></image>
								</view>
							</view>
						</view>
						<view class="heng"></view>
						<!-- 待提取 -->
						<template v-if="nowIndex == 0">
							<view class="tit3">
								<view @click="fenjie(item)" class="btn">分解</view>
								<view @click="zhClick(i,item)" class="btn">置换</view>
								<view @click="toTiqu(item)" class="btn">提取</view>
							</view>
						</template>
						<!-- 待收货 -->
						<template v-if="nowIndex == 1">
							<view class="tit3">
								<view @click="shouhuo(item)" class="btn">确认收货</view>
								<view @click="toKefu" class="btn">联系客服</view>
								
								<view v-if="item.order_status_name == '已发货' && item.shop_type == 0" @click="seeWuliu(item)" class="btn">查看物流
								</view>
								<view v-if="item.order_status_name == '已发货' && item.shop_type == 1" @click="lingqukami(item)" class="btn">领取卡密</view>
							</view>
						</template>
						<!-- 已分解 -->
						<!-- 已置换 -->
						<!-- 已完成 -->
						<template v-if="nowIndex == 4">
							<view class="tit3">
								<view @click="toKefu" class="btn">联系客服</view>
								<view @click="seeWuliu(item)" class="btn">查看物流</view>
							</view>
						</template>
					</view>
				</template>
			</view>
			<view v-if="isZH" class="nav3">
				<view class="n3-l">
					<view class="n3l-tit1">
						<u-checkbox-group>
							<u-checkbox shape="circle" v-model='rad1' :name='1' @change="radioChange">
								<view class="txt1">全选<text class="sp">({{zhLength}}/{{list.length}})</text></view>
							</u-checkbox>
						</u-checkbox-group>
					</view>

					<view class="n3l-tit2">
						<view class="txttt1">可置换：</view>
						<view class="txttt2">
							{{zhihuanNum}}
							<image src="/static/img/tu1001.png" class="picc" mode=""></image>
						</view>
					</view>
				</view>
				<view @click="toZhihuan" class="n3-r">前往置换</view>
			</view>
			<u-loadmore :class="{'myloadmore':true,'active':isZH}" :status="status" :icon-type="iconType"
				:load-text="loadText" />
		</template>

		<!-- 说明 -->
		<u-popup v-model="popShow1" mode='center' border-radius="28" width="690rpx" height="776rpx">
			<view class="pop1">
				<view class="p1-txt1">收纳盒说明</view>
				<view class="p1-txt2">1、开箱所获得商品都会存放在收纳盒中待提取，商品可进行提取、分解、置换！</view>
				<view class="p1-txt2">2、置换：可单个或多个商品进行置换，在置换商城中选择喜欢商品进行置换，置换商城商品不和兑换商城商品同步，以实际展示商品为准</view>
				<view class="p1-txt2">3、置换后的商品，是无法再进行二次置换，一定要选对哦！</view>
				<view class="p1-txt2">4、分解：开箱获得不喜欢的商品可进行分解处理，分解可获得聚豆（聚豆是作为平台兑换商品媒介）一旦分解，不可撤销！</view>
				<view class="p1-txt2">5、如有问题发生或疑问，还请及时联系在线客服处理哦！</view>
				<view @click="popShow1 = false" class="p1-btn">确定</view>
			</view>
		</u-popup>
		<!-- 分解 -->
		<u-popup v-model="popShow2" mode='center' border-radius="28" width="640rpx" height="304rpx">
			<view class="pop2">
				<view class="p2-txt1">分解所得商品将得到相应的聚豆， 该商品也将被摧毁，请确定是否分解？</view>
				<view class="p2-btns">
					<view class="btn1" @click="popShow2 = false">取消</view>
					<view @click="fenjieSubmit" class="btn2">确定</view>
				</view>
			</view>
		</u-popup>
		<!-- 确认收货 -->
		<u-popup v-model="popShow3" mode='center' border-radius="28" width="640rpx" height="256rpx">
			<view class="pop3">
				<view class="p3-txt1">确认收到货了吗？</view>
				<view class="p3-btns">
					<view class="btn1" @click="popShow3 = false">取消</view>
					<view @click="shouhuoSubmit" class="btn2">确定</view>
				</view>
			</view>
		</u-popup>
		<!-- 领取卡密 -->
		<u-popup v-model="popShow4" mode='center' border-radius="28" width="690rpx" height="732rpx">
			<view class="pop4">
				<view class="p4-txt1">领取卡密</view>
				<view :class="{'p4-box1':true,'bbx1':nowDengji == 0,'bbx2':nowDengji == 1,'bbx3':nowDengji == 2,'bbx4':nowDengji == 3}">
					<view class="p4-b1-txt1">{{nowDengji == 0 ? '金色传说' : nowDengji == 1 ? '红色史诗' : nowDengji == 2 ? '紫色稀有' : '蓝色普通'}}</view>
					<image :src="nowImg" class="p4-b1-pic1"
						mode=""></image>
				</view>
				<view class="p4-box2">
					<view class="p4-item">
						<view class="p4-txtt4">卡号：</view>
						<u-input placeholder='' :clearable='false' v-model="kahao" />
					</view>
					<view class="p4-item" style="margin-top: 16rpx;">
						<view class="p4-txtt4">卡密：</view>
						<u-input placeholder='' :clearable='false' v-model="kami" />
					</view>
				</view>
				<view @click="yijianfuzhi" class="p4-btnn">一键复制</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["dingdanPage"]),
		},
		data() {
			return {
				kahao: '',
				kami:'',
				nowIndex: 0,
				list: [{
					name: 'a'
				}, {
					name: 'b'
				}, {
					name: 'c'
				}, {
					name: 'd'
				}],
				isZH: false,
				rad1: false,
				zhLength: 0,
				popShow1: false,
				popShow2: false,
				popShow3: false,
				popShow4: false,
				order: [],
				orderId: '',
				sumList: [],
				nowDengji:'',
				nowImg:'',
				zhihuanNum:0,
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
			this.list = []
			this.$store.commit('dingdanPage', 1)
			this.getData()
			this.getShuoming()
		},
		onReachBottom() {
			this.$store.commit("dingdanPage", this.dingdanPage + 1);
			this.getData()
		},
		methods: {
			async getData() {
				this.status = 'loading';
				const res = await this.$api.getOrderList({
					order_status: this.nowIndex,
					pagenum: this.dingdanPage,
					pagesize: 10,
				})
				if (res.data.data.length < 10) {
					this.status = 'nomore'
				} else {
					this.status = 'loadmore';
				}
				res.data.data.forEach(ele => {
					this.$set(ele, 'checked', false)
				})
				this.list = this.list.concat(res.data.data)
			},
			async getShuoming() {
				const res = await this.$api.getSystemInfo({
					title: '收纳盒说明'
				})
				console.log(111, res)
			},
			toKefu(){
				// window.open(`http://wpa.qq.com/msgrd?v=3&uin=${2054982001}&site=qq&menu=yes`)
				window.open(`mqqwpa://im/chat?chat_type=wpa&uin=${2054982001}&version=1&src_type=web&web_src=bjhuli.com`)
			},
			shouhuo(item) {
				this.orderId = item.order_id;
				this.popShow3 = true;
			},
			yijianfuzhi(){
				uni.setClipboardData({
					data: `卡号:${this.kahao},卡密:${this.kami}`,
				});
			},
			async lingqukami(item) {
				this.nowDengji = item.shop_degree;
				this.nowImg = item.shop_img;
				const res = await this.$api.getCardInfoByOrder({
					order_id:item.order_id,
				})
				console.log(res)
				this.kahao = res.data.card_account;
				this.kami = res.data.card_password;
				this.popShow4 = true;
			},
			async shouhuoSubmit() {
				const res = await this.$api.completeOrder({
					order_id: this.orderId
				})
				this.$refs.uToast.show({
					title: res.msg,
					duration: 1000,
					callback: () => {
						this.popShow3 = false
						this.list = []
						this.$store.commit('dingdanPage', 1)
						this.getData()
					},
				})
			},
			fenjie(item) {
				this.orderId = item.order_id;
				this.popShow2 = true;
			},
			async fenjieSubmit() {
				const res = await this.$api.changeOrderToDecompose({
					order_id: this.orderId
				})
				this.$refs.uToast.show({
					title: res.msg,
					duration: 1000,
					callback: () => {
						this.popShow2 = false
						this.list = []
						this.$store.commit('dingdanPage', 1)
						this.getData()
					},
				})
			},
			seeWuliu(item) {
				uni.navigateTo({
					url: `/pages/order/wuliu?order_id=${item.order_id}&item=${JSON.stringify(item)}`
				})
			},
			toTiqu(item) {
				uni.navigateTo({
					url: `/pages/order/tijiaodingdan?isTiqu=1&shopObj=${JSON.stringify(item)}`
				})
			},
			toZhihuan() {
				var sum = 0
				this.sumList.forEach(ele => {
					sum += Number(ele.order_total)
				})
				console.log(sum)
				uni.navigateTo({
					url: `/pages/tabBar/shop?type=1&order=${this.order.toString()}&sum=${sum}`
				})
				this.isZH = false;
			},
			formatDate(date) {
				var date = new Date(date);
				var YY = date.getFullYear() + '-';
				var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
				var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
				var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
				var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
				return YY + MM + DD + " " + hh + mm + ss;
			},
			toHome() {
				uni.navigateTo({
					url: '/pages/tabBar/index'
				})
			},
			changeIndex(i) {
				this.isZH = false;
				this.nowIndex = i
				this.list = [];
				this.$store.commit('dingdanPage', 1)
				this.getData()
			},
			checkboxGroupChange(e) {
				this.order = e;
				this.zhLength = e.length;
			},
			checkboxChange(item, e) {
				console.log(item, e)
				var zhihuanNum = 0;
				if (e.value) {
					this.sumList.push(item)
				} else {
					var index = this.sumList.findIndex(ele => {
						return ele.order_id == e.name
					})
					this.sumList.splice(index, 1)
				}
				this.sumList.forEach(ele=>{
					zhihuanNum += Number(ele.order_total)
				})
				this.zhihuanNum = zhihuanNum;
				console.log(this.sumList,zhihuanNum)

			},
			radioChange(e) {
				this.zhihuanNum = 0;
				if (e.value) {
					this.sumList = [...this.list]
					this.list.forEach(ele=>{
						this.zhihuanNum += Number(ele.order_total)
					})
					this.list.map(val => {
						val.checked = true;
						this.zhLength = this.list.length;
					})
				} else {
					this.sumList = []
					this.zhihuanNum = 0;
					this.list.map(val => {
						val.checked = false;
						this.zhLength = 0;
					})
				}
			},
			zhClick(i, item) {
				this.isZH = true
				this.list.map(val => {
					val.checked = false;
				})
				this.list.map((val, index) => {
					if (index == i) {
						val.checked = true;
						this.zhLength = 1;
					}
				})
				this.zhihuanNum = Number(item.order_total)
				this.sumList.push(item)
			},
			toJump(url, param) {
				console.log(url)
				uni.navigateTo({
					url: `${url}?${param}`
				})
			},
		}
	}
</script>

<style>
	page {
		background: #f7f7f7;
	}
</style>
<style lang="scss" scoped>
	.myloadmore.active {
		padding: 16rpx 0 190rpx 0;
	}

	/deep/ .u-load-more-wrap {
		padding: 16rpx 0 50rpx 0;
	}

	.slot-wrap {
		position: absolute;
		right: 40rpx;
		font-size: 28rpx;
		font-family: PingFang SC, PingFang SC-Regular;
		font-weight: 400;
		color: #666666;
	}

	.nav11 {
		position: fixed;
		z-index: 2;
		width: 100vw;
		height: 110rpx;
		background: #f7f7f7;
	}

	.nav1 {
		display: flex;
		align-items: center;
		padding: 32rpx 30rpx;
		justify-content: space-between;

		.txt {
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			color: #575656;
		}

		.txt.active {
			font-size: 36rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			color: #333333;
			position: relative;
		}

		.txt.active:after {
			content: '';
			width: 36rpx;
			height: 6rpx;
			background: #02b3b6;
			border-radius: 4rpx;
			position: absolute;
			bottom: -10rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.kImg {
		margin-top: 440rpx;
		margin-left: 238rpx;
		width: 274rpx;
		height: 142rpx;
	}

	.kTxt {
		margin-top: 26rpx;
		font-size: 28rpx;
		font-family: PingFang SC, PingFang SC-Regular;
		font-weight: 400;
		text-align: center;
		color: #666666;
		letter-spacing: 0.31rpx;
	}

	.nav2 {
		// background: #ffffff;
		// padding: 22rpx 24rpx;
		margin: 120rpx 30rpx 30rpx 30rpx;

		.item {
			padding: 22rpx 24rpx;
			margin-bottom: 20rpx;
			background: #ffffff;
			border-radius: 24rpx;
			position: relative;

			.tit1 {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.txt1 {
					font-size: 24rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					color: #666666;
				}

				.txt2 {
					font-size: 28rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					color: #02b3b6;
				}

				.piccc {
					width: 156rpx;
					height: 156rpx;
					position: absolute;
					right: 8rpx;
					top: -12rpx;
				}
			}

			.heng {
				margin-top: 16rpx;
				height: 2rpx;
				background: #e4e4e4;
			}

			.tit2 {
				display: flex;
				margin: 26rpx 0;
				.t2-l {
					width: 220rpx;
					height: 212rpx;
					// background: #f2f2f2;
					border-radius: 8rpx;
					background-size: 100% 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
				}
				.t2-l.item1{
					background-image: url(../../../static/img/zu4076.png);
				}
				.t2-l.item2{
					background-image: url(../../../static/img/zu4075.png);
				}
				.t2-l.item3{
					background-image: url(../../../static/img/zu4077.png);
				}
				.t2-l.item4{
					background-image: url(../../../static/img/zu4078.png);
				}
				.t2-l-txt{
					margin-top: 12rpx;
					font-size: 16rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					text-align: center;
					color: #ffffff;
					letter-spacing: 0.96rpx;
				}
				.t2-l-txt.t2-l-txt2{
					margin-top: 10rpx;
					font-size: 16rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					text-align: center;
					color: #ffffff;
					letter-spacing: 0.96rpx;
				}
				.t2-l-img{
					margin-top: 26rpx;
					width: 126rpx;
					height: 126rpx;
				}
				.t2-r {
					width: 392rpx;
					margin-left: 22rpx;

					.txtt1 {
						font-size: 32rpx;
						font-family: PingFang SC, PingFang SC-Bold;
						font-weight: 700;
						color: #333333;
						letter-spacing: 0;
						overflow: hidden;
						display: -webkit-box;
						text-overflow: ellipsis;
						-webkit-line-clamp: 2;
						/*要显示的行数*/
						-webkit-box-orient: vertical;
					}

					.txtt2 {
						margin-top: 50rpx;
						font-size: 28rpx;
						font-family: PingFang SC, PingFang SC-Bold;
						font-weight: 700;
						color: #333333;
						display: flex;
						align-items: center;

						.sp {
							font-size: 32rpx;
							font-family: PingFang SC, PingFang SC-Heavy;
							font-weight: 800;
							color: #f90000;
						}

						.picc {
							width: 42rpx;
							height: 42rpx;
						}
					}
				}
			}

			.tit3 {
				display: flex;
				flex-direction: row-reverse;
				margin-top: 18rpx;

				.btn {
					width: 136rpx;
					height: 52rpx;
					background: #02b3b6;
					border-radius: 26rpx;
					box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(2, 179, 182, 0.10);
					font-size: 24rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					text-align: center;
					line-height: 52rpx;
					color: #ffffff;
					margin-left: 16rpx;
				}
			}
		}

		.item2.item {
			width: 90%;
			margin-left: 8px;
		}
	}

	.nav2.active {
		// margin-bottom: 140rpx;
	}

	.nav3 {
		position: fixed;
		bottom: 0;
		z-index: 99;
		width: 750rpx;
		height: 140rpx;
		background: #ffffff;
		box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(51, 51, 51, 0.04);
		padding: 0 30rpx;
		display: flex;
		// align-items: center;
		justify-content: space-between;

		.n3-l {
			display: flex;
			// align-items: center;
			margin-top: 14rpx;

			.n3l-tit1 {
				margin-top: 10rpx;

				.txt1 {
					font-size: 28rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					color: #989797;

					.sp {
						margin-left: 4rpx;
						font-size: 24rpx;
					}
				}
			}


			.n3l-tit2 {
				margin-left: 30rpx;

				.txttt1 {
					font-size: 24rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #333333;
				}

				.txttt2 {
					display: flex;
					align-items: center;
					font-size: 32rpx;
					font-family: PingFang SC, PingFang SC-Heavy;
					font-weight: 800;
					text-align: left;
					color: #f90000;

					.picc {
						width: 42rpx;
						height: 42rpx;
					}
				}
			}

		}

		.n3-r {
			margin-top: 14rpx;
			width: 252rpx;
			height: 76rpx;
			background: #02b3b6;
			border-radius: 38rpx;
			box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(2, 179, 182, 0.12);
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			line-height: 76rpx;
			color: #ffffff;
		}
	}

	.pop1 {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 28rpx;

		.p1-txt1 {
			font-size: 36rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			color: #333333;
			margin-top: 36rpx;
			margin-bottom: 24rpx;
		}

		.p1-txt2 {
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			color: #333333;
		}

		.p1-btn {
			margin-top: 60rpx;
			width: 384rpx;
			height: 76rpx;
			background: #02b3b6;
			border-radius: 38rpx;
			box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(2, 179, 182, 0.12);
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			line-height: 76rpx;
			color: #ffffff;
		}
	}

	.pop2 {
		display: flex;
		flex-direction: column;
		align-items: center;

		.p2-txt1 {
			margin-top: 56rpx;
			width: 544rpx;
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			color: #666666;
		}

		.p2-btns {
			margin-top: 48rpx;
			width: 500rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.btn1 {
				width: 208rpx;
				height: 64rpx;
				border: 2rpx solid #02b3b6;
				border-radius: 34rpx;
				font-size: 36rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: center;
				line-height: 60rpx;
				color: #02b3b6;
			}

			.btn2 {
				width: 208rpx;
				height: 64rpx;
				background: #02b3b6;
				border-radius: 32rpx;
				box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(2, 179, 182, 0.18);
				font-size: 36rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #ffffff;
				line-height: 64rpx;
			}
		}
	}

	.pop3 {
		display: flex;
		flex-direction: column;
		align-items: center;

		.p3-txt1 {
			margin-top: 56rpx;
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			color: #666666;
		}

		.p3-btns {
			margin-top: 48rpx;
			width: 500rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.btn1 {
				width: 208rpx;
				height: 64rpx;
				border: 2rpx solid #02b3b6;
				border-radius: 34rpx;
				font-size: 36rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: center;
				line-height: 60rpx;
				color: #02b3b6;
			}

			.btn2 {
				width: 208rpx;
				height: 64rpx;
				background: #02b3b6;
				border-radius: 32rpx;
				box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(2, 179, 182, 0.18);
				font-size: 36rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #ffffff;
				line-height: 64rpx;
			}
		}
	}

	.pop4 {
		.p4-txt1 {
			margin-top: 28rpx;
			font-size: 36rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #333333;
		}

		.p4-box1 {
			margin: 26rpx auto 0;
			width: 312rpx;
			height: 286rpx;
			// background-image: url('/static/img/zu4151.png');
			background-size: 100% 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.p4-b1-txt1 {
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #ffffff;
				letter-spacing: 1.44rpx;
				padding-top: 16rpx;
			}

			.p4-b1-pic1 {
				margin-top: 34rpx;
				width: 162rpx;
				height: 162rpx;
			}
		}
		.p4-box1.bbx1{
			background-image: url('/static/img/zu4154.png');
		}
		.p4-box1.bbx2{
			background-image: url('/static/img/zu4152.png');
		}
		.p4-box1.bbx3{
			background-image: url('/static/img/zu4153.png');
		}
		.p4-box1.bbx4{
			background-image: url('/static/img/zu4151.png');
		}

		.p4-box2 {
			margin-top: 36rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.p4-item {
				width: 500rpx;
				display: flex;
				align-items: center;
				.p4-txtt4{
					font-size: 28rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #333333;
				}
				/deep/ .uni-input-placeholder{
					color: #333333 !important;
					margin-left: 24rpx;
				}
				/deep/ .uni-input-wrapper{
					background: #f5f5f5;
					border-radius: 10rpx;
					padding: 0 24rpx;
					box-sizing: border-box;
				}
			}
		}
		.p4-btnn{
			margin: 40rpx auto 0;
			width: 384rpx;
			height: 76rpx;
			background: #02b3b6;
			border-radius: 38rpx;
			box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(2,179,182,0.12); 
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #ffffff;
			line-height: 76rpx;
		}
	
	}
</style>
