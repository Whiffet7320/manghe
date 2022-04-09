<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="nav1">
			<u-icon name="arrow-left" color="#FFFFFF" size="36"></u-icon>
			<view class="tit1" @click="toJump('/pages/tabBar/guize')">规则</view>
		</view>
		<view class="float11">
			<vue-seamless-scroll :data="shouyeObj.message" :class-option="classOption" class="wrap"
				ref="seamlessScroll">
				<view class="item" v-for="(item,i) in shouyeObj.message" :key='i'>
					<image :src="item.user_icon" class="fl11-pic1" mode=""></image>
					<view class="fl11-txt">{{item.message_text}}</view>
					<image :src="item.message_img" class="fl11-pic2" mode=""></image>
				</view>
			</vue-seamless-scroll>
		</view>
		<view class="float1">
			<view class="item1" @click="toJump('/pages/user/shounahe/shounahe')">
				<image src="/static/img/zu1323.png" class="pic1" mode=""></image>
				<view class="txt1">收纳箱</view>
			</view>
			<view class="item1 item2" @click="popShow1 = true">
				<view class="bb">
					<view class="b-txt1">{{user_lucky}}</view>
					<view class="b-txt2"></view>
				</view>
				<view class="txt1">幸运值</view>
			</view>
			<view class="item1 item3" @click="shiwan">
				<image src="/static/img/zu1325.png" class="pic1" mode=""></image>
				<view class="txt1">试玩</view>
			</view>
		</view>
		<view class="float2">
			<image src="/static/img/mcz37.png" class="f2-pic" mode=""></image>
		</view>
		<view class="xz">
			<image v-show="nowIndex1 == 0" class="xz-picc"
				src="https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649380927270.gif" mode=""></image>
			<image v-show="nowIndex1 == 1" class="xz-picc"
				src="https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649380962507.gif" mode=""></image>
			<image v-show="nowIndex1 == 2" class="xz-picc"
				src="https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649380975706.gif" mode=""></image>
			<image v-show="nowIndex1 == 3" class="xz-picc"
				src="https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649380988200.gif" mode=""></image>
			<image v-show="nowIndex1 == 4" class="xz-picc"
				src="https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649380999765.gif" mode=""></image>

		</view>
		<view class="nav2">
			<image src="/static/img/mcz38.png" class="n2-pic1" mode=""></image>
		</view>
		<!-- <view class="nav3">
			<view @click="changeIndex1(1)" :class="{'item':true,'active':nowIndex1 == 1}">壕出天际</view>
			<view @click="changeIndex1(2)" :class="{'item':true,'active':nowIndex1 == 2}">小试牛刀</view>
			<view @click="changeIndex1(3)" :class="{'item':true,'active':nowIndex1 == 3}">潮虎想象</view>
		</view> -->
		<scroll-view class="nav3" scroll-with-animation :scroll-left="scrollLeft" scroll-x="true">

			<view v-for="(item,i) in shouyeObj.box" :key='item.box_id' @click="changeIndex1(i,item,$event)"
				:class="{'item':true,'active':nowIndex1 == i,'scrollItem':true,'marginRight':i == shouyeObj.box.length - 1}">
				{{item.box_name}}
			</view>
			<!-- <view @click="changeIndex1(2,$event)" :class="{'item':true,'active':nowIndex1 == 2,'scrollItem':true}">小试牛刀
			</view>
			<view @click="changeIndex1(3,$event)" :class="{'item':true,'active':nowIndex1 == 3,'scrollItem':true}">潮虎想象
			</view>
			<view @click="changeIndex1(5,$event)" :class="{'item':true,'active':nowIndex1 == 5,'scrollItem':true}">一飞冲天
			</view>
			<view @click="changeIndex1(4,$event)" :class="{'item':true,'active':nowIndex1 == 4,'scrollItem':true}">豪气满满
			</view> -->
		</scroll-view>
		<view class="nav4">
			<view class="item" @click="toJump('/pages/tabBar/shop','type=2')">
				<image src="/static/img/zu1317.png" class="n4-pic1" mode=""></image>
				<image src="/static/img/tu1002.png" class="n4-pic2" mode=""></image>
			</view>
			<image @click="kaixiang" src="/static/img/zu4142.png" class="n4-pic3" mode=""></image>
			<view class="item" @click="toKefu">
				<image src="/static/img/zu1319.png" class="n4-pic1" mode=""></image>
				<image src="/static/img/tu1003.png" class="n4-pic2" mode=""></image>
			</view>
		</view>
		<view class="nav5" v-if="shouyeObj.tip">{{shouyeObj.tip.tips}}</view>
		<view class="nav6">
			<view class="n6-txt1" @click="popShow2 = true">
				查看全部商品
			</view>
			<u-icon name="arrow-down" color="#dcdcdc" size="18"></u-icon>
		</view>
		<view class="nav7">
			<view v-for="item in shouyeObj.shop"
				:class="{'item':true, 'item1':item.shop_quality == 0, 'item2':item.shop_quality == 1, 'item3':item.shop_quality == 2, 'item4':item.shop_quality == 3}">
				<view class="n7i-txt1">
					{{item.shop_quality == 0?'金色传说':item.shop_quality == 1?'红色史诗':item.shop_quality == 2?'紫色稀有':'蓝色普通'}}
				</view>
				<image :src="item.shop_img" mode="" class="n7i-img"></image>
			</view>
			<!-- <view class="item item2">
				<view class="n7i-txt1">红色史诗</view>
			</view>
			<view class="item item3">
				<view class="n7i-txt1">紫色稀有</view>
			</view>
			<view class="item item4">
				<view class="n7i-txt1">蓝色普通</view>
			</view> -->
		</view>
		<!-- 幸运值 -->
		<u-popup v-model="popShow1" mode='center' border-radius="28" width="690rpx" height="440rpx">
			<view class="pop1">
				<image src="/static/img/zu4081.png" class="p1-pic" mode=""></image>
				<view class="p1-tit1">
					<view class="p1-txt1">幸运值</view>
					<view class="p1-txt2">
						<view class="p1-txt2-1">{{user_lucky}}</view>
						<view class="p1-txt2-2"></view>
					</view>
				</view>
				<view class="p1-tit2">幸运值达到100开启幸运模式</view>
				<view class="p1-tit3">传说、史诗抽中概率大幅提升</view>
				<view @click="popShow1 = false" class="p1-tit4">抽中蓝色普通提升幸运值</view>
			</view>
		</u-popup>
		<!-- 查看全部商品 -->
		<u-popup v-model="popShow2" mode='bottom' border-radius="28" width="690rpx" height="1080rpx">
			<view class="pop2">
				<view class="p2-tit1">全部商品</view>
				<view class="heng"></view>
				<view class="items">
					<view v-for="item in shopList" :key='item.shop_id'>
						<view
							:class="{'item':true,'item1':item.shop_quality == 0,'item2':item.shop_quality == 1,'item3':item.shop_quality == 2,'item4':item.shop_quality == 3}">
							<view class="txt1" v-if="item.shop_quality == 0">金色传说</view>
							<view class="txt1" v-if="item.shop_quality == 1">红色史诗</view>
							<view class="txt1" v-if="item.shop_quality == 2">紫色稀有</view>
							<view class="txt1" v-if="item.shop_quality == 3">蓝色普通</view>
							<image :src="item.shop_img" class="pic1" mode=""></image>
							<view class="txt2">{{item.shop_name}}</view>
							<view class="txt3">
								<view class="txttt1">价格：</view>
								<view class="txttt2">
									{{item.shop_price}}
									<image src="/static/img/tu1001.png" class="picc" mode=""></image>
								</view>
							</view>
						</view>

					</view>
				</view>
				<view class="p2-tit2">注意事项：</view>
				<view class="p2-tit3" v-if="gailvList.length != 0" style="margin-top: 10rpx;">
					{{gailvList[0].box_name}}：{{gailvList[0].probability}}%
					；{{gailvList[1].box_name}}：{{gailvList[1].probability}}%
				</view>
				<view class="p2-tit3" v-if="gailvList.length != 0" style="padding-bottom: 30rpx;">
					{{gailvList[2].box_name}}：{{gailvList[2].probability}}%
					；{{gailvList[3].box_name}}：{{gailvList[3].probability}}%
				</view>
			</view>
		</u-popup>
		<!-- 开箱(牛刀小试) -->
		<view class="pop33">
			<u-popup v-model="popShow3" mode='center' border-radius="28">
				<view class="pop3">
					<image @click="popShow3 = false" src="/static/img/zu4080.png" class="p3-close" mode=""></image>
					<view class="p3-tit1">{{nowBox.box_name}}</view>
					<!-- <image v-if="nowIndex1 == 0" class="p3-xz" src="/static/img/xz1.gif" mode=""></image> -->
					<image v-if="nowIndex1 == 0" class="p3-xz"
						src="https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649380927270.gif" mode=""></image>
					<image v-if="nowIndex1 == 1" class="p3-xz"
						src="https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649380962507.gif" mode=""></image>
					<image v-if="nowIndex1 == 2" class="p3-xz"
						src="https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649380975706.gif" mode=""></image>
					<image v-if="nowIndex1 == 3" class="p3-xz"
						src="https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649380988200.gif" mode=""></image>
					<image v-if="nowIndex1 == 4" class="p3-xz"
						src="https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649380999765.gif" mode=""></image>
					<template v-if="boxPriceList.length!=0">
						<view class="p3-tit2" @click="toBay(1,nowBox)">
							<view class="txt1" style="margin: 0 16rpx 0 10rpx;">一发入魂</view>
							<view class="txt1">{{nowBox.box_price1}}</view>
							<image src="/static/img/tu1001.png" class="picc" mode=""></image>
						</view>
						<view class="p3-tit3 p3-tit2" @click="toBay(5,nowBox)">
							<view class="txt1" style="margin: 0 16rpx 0 10rpx;">五连绝世</view>
							<view class="txt1">{{nowBox.box_price2}}</view>
							<image src="/static/img/tu1001.png" class="picc" mode=""></image>
						</view>
						<view class="p3-tit4 p3-tit2" @click="toBay(10,nowBox)">
							<view class="txt1" style="margin: 0 16rpx 0 10rpx;">豪气十连</view>
							<view class="txt1">{{nowBox.box_price3}}</view>
							<image src="/static/img/tu1001.png" class="picc" mode=""></image>
						</view>
					</template>

				</view>
			</u-popup>
		</view>

		<!-- 点击五连绝世(购买箱子) -->
		<u-popup v-model="popShow4" mode='bottom' border-radius="28" height="476rpx">
			<view class="pop4">
				<view class="p4-tit1">
					<image src="/static/img/xz1.png" class="p4-l-pic" mode=""></image>
					<view class="p4-r">
						<view class="p4-t">{{boxName}}</view>
						<view class="p4-d">{{boxPirce}}
							<image src="/static/img/tu1001.png" class="picc" mode=""></image>
						</view>
					</view>
				</view>
				<view class="p4-tit2">
					<view class="p4-l2">数量</view>
					<view class="p4-r2">x {{payNum}}</view>
				</view>
				<view @click="buyBox" class="p4-tit3">确认购买</view>
			</view>
		</u-popup>
		<!-- 确认购买 -->
		<view class="pop33">
			<u-popup v-model="popShow5" mode='center' border-radius="28">
				<view class="pop5">
					<image v-if="playNow" src="/static/img/zj9.png" @click="closeMusic" class="p5-pic" mode=""></image>
					<image v-else src="/static/img/zu4156.png" @click="openMusic" class="p5-pic" mode=""></image>
					<!-- 未开箱 -->
					<view v-show="!isKaixiang">
						<image v-show="nowIndex1 == 0" class="p5-xz"
							src="https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649380927270.gif" mode=""></image>
						<image v-show="nowIndex1 == 1" class="p5-xz"
							src="https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649380962507.gif" mode=""></image>
						<image v-show="nowIndex1 == 2" class="p5-xz"
							src="https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649380975706.gif" mode=""></image>
						<image v-show="nowIndex1 == 3" class="p5-xz"
							src="https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649380988200.gif" mode=""></image>
						<image v-show="nowIndex1 == 4" class="p5-xz"
							src="https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649380999765.gif" mode=""></image>
					</view>
					<!-- 开箱 -->
					<view v-show="isKaixiang">
						<image v-show="nowIndex1 == 0" class="p5-xz xzd"
							src="https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649381012357.gif" mode=""></image>
						<image v-show="nowIndex1 == 1" class="p5-xz xzd"
							src="https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649381079857.gif" mode=""></image>
						<image v-show="nowIndex1 == 2" class="p5-xz xzd"
							src="https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649381092856.gif" mode=""></image>
						<image v-show="nowIndex1 == 3" class="p5-xz xzd"
							src="https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649381105815.gif" mode=""></image>
						<image v-show="nowIndex1 == 4" class="p5-xz xzd"
							src="https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649381116979.gif" mode=""></image>
					</view>
					<view class="p5-tit1" @click="choujiang">立即拆开</view>
					<view class="p5-tit2" v-if="payNum != 1">
						<view v-if="!isKuaisu" @click="isKuaisu = true" class="p5-icon"></view>
						<u-icon v-else @click="isKuaisu = false" name="checkmark-circle-fill" color="#02b3b6" size="30">
						</u-icon>
						<view class="p5-txtt">快速抽奖</view>
					</view>
				</view>
			</u-popup>
		</view>
		<!-- 立即拆开（动画） -->
		<view class="pop66">
			<u-popup v-model="popShow6" mode='center' border-radius="28">
				<view class="pop6">
					<view class="mySwiper">
						<uniSwiper @change='changSwiper' :current='current' :autoplay='autoplay' height="340"
							mode='none' :duration='pop6Duration' :interval='pop6Interval' effect3d title :list="list">
						</uniSwiper>
					</view>
				</view>
			</u-popup>
		</view>
		<!-- 一个箱子 -->
		<view class="pop77">
			<u-popup v-model="popShow7" mode='center' border-radius="28">
				<view class="pop7">
					<view
						:class="{'p7-box1':true,'item1':zhongjiangShop.shop_quality == 0,'item2':zhongjiangShop.shop_quality == 1,'item3':zhongjiangShop.shop_quality == 2,'item4':zhongjiangShop.shop_quality == 3}">
						<view class="txt1" v-if="zhongjiangShop.shop_quality == 0">金色传说</view>
						<view class="txt1" v-if="zhongjiangShop.shop_quality == 1">红色史诗</view>
						<view class="txt1" v-if="zhongjiangShop.shop_quality == 2">紫色稀有</view>
						<view class="txt1" v-if="zhongjiangShop.shop_quality == 3">蓝色普通</view>
						<image :src="zhongjiangShop.shop_img" class="pic1" mode=""></image>
						<view class="txt2">{{zhongjiangShop.shop_name}}</view>
						<view class="txt3">
							<view class="t3-1">参考价：</view>
							<view class="t3-2">{{zhongjiangShop.shop_price}}
								<image src="/static/img/tu1001.png" class="picc" mode=""></image>
							</view>
						</view>
					</view>
					<view class="p7-btns" v-if="!isShiwan">
						<view @click="addShounahe" class="btn1">放入收纳箱</view>
						<view class="p3-tit2" @click="buyAgain(1)">
							<view class="txt1" style="margin: 0 16rpx 0 10rpx;">再玩一场</view>
							<view v-if="boxPriceList.length != 0" class="txt1">{{nowBox.box_price1}}</view>
							<image src="/static/img/tu1001.png" class="picc" mode=""></image>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
		<!-- 五个箱子 -->
		<view class="pop77">
			<u-popup v-model="popShow8" mode='center' border-radius="28">
				<view class="pop8">
					<view v-for="(item,i) in buyShopList" :key='i'
						:class="{'p7-box1':true,'item1':item.shop_quality == 0,'item2':item.shop_quality == 1,'item3':item.shop_quality == 2,'item4':item.shop_quality == 3}">
						<view class="txt1" v-if="item.shop_quality == 0">金色传说</view>
						<view class="txt1" v-if="item.shop_quality == 1">红色史诗</view>
						<view class="txt1" v-if="item.shop_quality == 2">紫色稀有</view>
						<view class="txt1" v-if="item.shop_quality == 3">蓝色普通</view>
						<image :src="item.shop_img" class="pic1" mode=""></image>
						<view class="txt2">{{item.shop_name}}</view>
					</view>
					<view class="p7-btns" v-if="!isShiwan">
						<view @click="addShounahe" class="btn1">放入收纳箱</view>
						<view class="p3-tit2" @click="buyAgain(5)">
							<view class="txt1" style="margin: 0 16rpx 0 10rpx;">再玩一场</view>
							<view v-if="boxPriceList.length != 0" class="txt1">{{nowBox.box_price2}}</view>
							<image src="/static/img/tu1001.png" class="picc" mode=""></image>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
		<!-- 十个箱子 -->
		<view class="pop77">
			<u-popup v-model="popShow9" mode='center' border-radius="28">
				<view class="pop9">
					<view v-for="(item,i) in buyShopList" :key='i'
						:class="{'p7-box1':true,'item1':item.shop_quality == 0,'item2':item.shop_quality == 1,'item3':item.shop_quality == 2,'item4':item.shop_quality == 3}">
						<view class="txt1" v-if="item.shop_quality == 0">金色传说</view>
						<view class="txt1" v-if="item.shop_quality == 1">红色史诗</view>
						<view class="txt1" v-if="item.shop_quality == 2">紫色稀有</view>
						<view class="txt1" v-if="item.shop_quality == 3">蓝色普通</view>
						<image :src="item.shop_img" class="pic1" mode=""></image>
						<view class="txt2">{{item.shop_name}}</view>
					</view>
					<view class="p7-btns" v-if="!isShiwan">
						<view @click="addShounahe" class="btn1">放入收纳箱</view>
						<view class="p3-tit2" @click="buyAgain(10)">
							<view class="txt1" style="margin: 0 16rpx 0 10rpx;">再玩一场</view>
							<view v-if="boxPriceList.length != 0" class="txt1">{{nowBox.box_price3}}</view>
							<image src="/static/img/tu1001.png" class="picc" mode=""></image>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapState
	} from "vuex";
	import uniSwiper from '../../components/uni-swiper/index.vue'
	export default {
		computed: {
			...mapGetters(['isLogin'])
		},
		components: {
			uniSwiper,
		},
		watch: {
			// popShow9(newVal){
			// 	if(newVal){
			// 		this.flag = false;
			// 	}
			// }
			autoplay(newVal) {
				if (!newVal) {
					this.flag = false;
				} else {
					this.flag = true;
				}
			}
		},
		data() {
			return {
				listData11: [{
					'title': '无缝滚动第一行无缝滚动第一行',
					'date': '2017-12-16'
				}, {
					'title': '无缝滚动第二行无缝滚动第二行',
					'date': '2017-12-16'
				}, {
					'title': '无缝滚动第三行无缝滚动第三行',
					'date': '2017-12-16'
				}, {
					'title': '无缝滚动第四行无缝滚动第四行',
					'date': '2017-12-16'
				}, {
					'title': '无缝滚动第五行无缝滚动第五行',
					'date': '2017-12-16'
				}, {
					'title': '无缝滚动第六行无缝滚动第六行',
					'date': '2017-12-16'
				}],
				// 
				actIndex: 'act-3',
				payNum: '',
				nowIndex1: 0,
				popShow1: false,
				popShow2: false,
				popShow3: false,
				popShow4: false,
				popShow5: false,
				playNow: true,
				isKuaisu: true,
				popShow6: false,
				popShow7: false,
				popShow8: false,
				popShow9: false,
				list: [],
				pop6Duration: 100,
				pop6Interval: 110,
				// pop6Duration: 1000000,
				// pop6Interval: 1100000,
				autoplay: false,
				current: 0,
				timer: null,
				zjNum1Shop: 1,
				scrollLeft: 0,
				scrollViewWidth: '',
				isKaixiang: false,
				flag: true,
				user_lucky: 0,
				isShiwan: false,
				zhongjiangShop: {},
				zhongjiangNum: '',
				shopList: [],
				boxPriceList: [],
				boxId: '',
				boxPirce: '',
				boxName: '',
				buyShopList: [],
				shouyeObj: {},
				gailvList: [],
				nowBox: {},
				zhongjiangName: '',
				classOption: {
					step: 0.5
				},
				buyShopList2: [],
				innerAudioContext: null,
			}
		},
		onShow() {
			this.getData();
		},
		async onLoad(options) {
			if (options.scene) {
				const arr = options.scene.split('_');
				this.scencLid = arr[0];
				uni.setStorageSync('scencLid', this.scencLid);
			}
		},
		mounted() {
			// this.toMove()
			uni.createSelectorQuery().select('.nav3').boundingClientRect((rect) => {
				console.log(Math.round(rect.width))
				// this.scrollViewWidth = Math.round(rect.width)
				this.scrollViewWidth = 278;
			}).exec()
			this.innerAudioContext = uni.createInnerAudioContext();
			// this.innerAudioContext.src =
			// 	'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649299819377.mpeg';
			// this.innerAudioContext.loop = true
			// this.innerAudioContext.play()
			// https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649299638723.mpeg 结束时音效
			// https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649299801426.mpeg 滚动音效
			// https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649299819377.mpeg 下落时音效
		},
		methods: {
			async getData() {
				const res = await this.$api.doLogin({
					spm: 'JLLWBsQCSCjVrMetK2PTfPw17oc2Q7y3kt7kv2Lf9ISkMXSR33sfBowrsDKmkTkV735p7bGISy'
				})
				if (res.status == 200) {
					this.user_lucky = res.data.user_lucky;
					uni.setStorageSync('userId', res.data.user_id);
				}
				const res4 = await this.$api.getHomeMessage();
				this.shouyeObj = res4.data;
				this.boxId = this.shouyeObj.box[0].box_id
				const res2 = await this.$api.getAllBoxShop({
					box_id: this.boxId
				})
				this.shopList = res2.data.box;
				this.shopList.forEach(ele => {
					this.list.push({
						image: ele.shop_quality == 0 ? '/static/img/zu4158.png' : ele.shop_quality ==
							1 ? '/static/img/zu4158.png' : ele.shop_quality == 2 ?
							'/static/img/zu4159.png' : '/static/img/zu4157.png',
						shopImage: ele.shop_img,
					})
				})
				this.gailvList = res2.data.probability;
				const res3 = await this.$api.getBoxPrice()
				this.boxPriceList = res3.data;
				this.nowBox = this.boxPriceList[0];
			},
			toKefu() {
				// window.open(`http://wpa.qq.com/msgrd?v=3&uin=${2054982001}&site=qq&menu=yes`)
				window.open(`mqqwpa://im/chat?chat_type=wpa&uin=${2054982001}&version=1&src_type=web&web_src=bjhuli.com`)
			},
			async buyBox() {
				// if (this.isShiwan) {
				// 	const res = await this.$api.getFreeBox({
				// 		box_id: this.boxId
				// 	})
				// 	console.log(res)
				// 	this.zhongjiangShop = res.data[0];
				// 	this.zhongjiangNum = this.zhongjiangShop.shop_quality
				// } else {
				const res = await this.$api.buyBox({
					box_id: this.boxId,
					box_num: this.payNum
				})
				this.$refs.uToast.show({
					title: res.msg,
					duration: 1000,
					callback: () => {
						if (res.status == 200) {
							this.popShow5 = true;
							this.popShow4 = false
							this.buyShopList = res.data;
						}
					}
				})
				// }

			},
			shiwan() {
				this.isShiwan = true;
				this.payNum = 1;
				this.popShow5 = true;
			},
			buyAgain(num) {
				if (num == 1) {
					this.boxPirce = this.nowBox.box_price1
				} else if (num == 5) {
					this.boxPirce = this.nowBox.box_price2
				} else if (num == 10) {
					this.boxPirce = this.nowBox.box_price3
				}
				this.boxName = this.nowBox.box_name;
				this.payNum = num;
				this.popShow7 = false;
				this.popShow8 = false;
				this.popShow9 = false;
				this.popShow4 = true;
			},
			addShounahe() {
				this.$refs.uToast.show({
					title: '已放入收纳箱',
					callback: () => {
						this.popShow7 = false;
						this.popShow8 = false;
						this.popShow9 = false;
					}
				})

			},
			toBay(num, item) {
				this.payNum = num;
				if (num == 1) {
					this.boxPirce = item.box_price1;
				} else if (num == 5) {
					this.boxPirce = item.box_price2;
				} else if (num == 10) {
					this.boxPirce = item.box_price3;
				}
				this.popShow3 = false;
				this.popShow4 = true
				this.boxId = item.box_id;
				this.boxName = item.box_name;
			},
			kaixiang() {
				this.isShiwan = false;
				this.popShow3 = true;
			},
			async choujiang() {
				this.isKaixiang = true;
				this.innerAudioContext.src =
					'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649299819377.mpeg';
				this.innerAudioContext.play()
				// this.innerAudioContext.onEnded(()=>{
				// 	this.innerAudioContext.stop()
				// })
				if (this.isShiwan) {
					const res = await this.$api.getFreeBox({
						box_id: this.boxId
					})
					console.log(res)
					this.zhongjiangShop = res.data[0];
					this.zhongjiangNum = this.zhongjiangShop.shop_quality;
					this.zhongjiangName = this.zhongjiangShop.shop_name;
					// this.zhongjiangID = this.zhongjiangShop.shop_id;
				} else if (!this.isShiwan && !this.isKuaisu) {
					this.buyShopList2 = [...this.buyShopList]
				} else if (!this.isShiwan && this.isKuaisu) {
					this.zhongjiangShop = this.buyShopList[0];
					this.zhongjiangNum = this.zhongjiangShop.shop_quality;
					this.zhongjiangName = this.zhongjiangShop.shop_name;
				}

				setTimeout(() => {
					this.popShow5 = false;
					this.popShow6 = true;
					this.isKaixiang = false;
					this.autoplay = true;
					this.innerAudioContext.src =
						'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649299801426.mpeg';
					this.innerAudioContext.autoplay = true;
				}, 2600)
			},
			toMove() {
				// for (let i = 0; i < 4; i++) {
				// 	setTimeout(() => {
				// 		this.pop6Interval = 220 + 50 * i
				// 		this.pop6Duration = 220 + 40 * i
				// 	}, 2200 + i * 500)
				// }
			},
			changSwiper(index) {
				// console.log(index, this.shopList[index].shop_name)
				if (this.payNum == 1) {
					this.isKuaisu = true;
				}
				if (this.shopList[index] && this.shopList[index].shop_name == this.zhongjiangName && this.flag && this
					.isKuaisu) {
					setTimeout(() => {
						this.$set(this, 'autoplay', false)
						this.$set(this, 'current', index.toString())
						console.log(this.payNum)
						if (this.payNum == 1 && this.flag) {
							setTimeout(() => {
								this.popShow6 = false;
								this.popShow7 = true;
								this.innerAudioContext.src =
									'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649299638723.mpeg';
							}, 500)
						} else if (this.payNum == 5 && this.flag) {
							setTimeout(() => {
								this.innerAudioContext.src =
									'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649299638723.mpeg';
								this.popShow6 = false;
								this.popShow8 = true;
							}, 500)
						} else if (this.payNum == 10 && this.flag) {
							setTimeout(() => {
								this.innerAudioContext.src =
									'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649299638723.mpeg';
								this.popShow9 = true;
								this.popShow6 = false;
								console.log(this.popShow9)
							}, 500)
						}
					}, 2000)
				} else if (!this.isKuaisu) {
					setTimeout(() => {
						var shopList = this.buyShopList2
						shopList.forEach((ele, i) => {
							if (ele.shop_name == this.shopList[index].shop_name && this.flag) {
								this.$set(this, 'autoplay', false)
								setTimeout(() => {
									shopList.splice(i, 1)
									if (this.payNum != 1) {
										this.innerAudioContext.seek(0)
									}
									this.$set(this, 'autoplay', true)
								}, 500)
							}
						})
						console.log(shopList.length, this.payNum)
						if (shopList.length == 0 && this.payNum == 5) {
							this.$set(this, 'autoplay', false)
							setTimeout(() => {
								this.popShow6 = false;
								this.popShow8 = true;
								this.innerAudioContext.stop()
								this.innerAudioContext.volume = 0
								this.innerAudioContext.src =
									'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649299638723.mpeg';
								this.innerAudioContext.volume = 1
								setTimeout(() => {
									this.innerAudioContext.play()
								}, 1000)
							}, 600)
						} else if (shopList.length == 0 && this.payNum == 10) {
							this.$set(this, 'autoplay', false)
							setTimeout(() => {
								this.popShow9 = true;
								this.popShow6 = false;
								this.innerAudioContext.stop()
								this.innerAudioContext.volume = 0
								this.innerAudioContext.src =
									'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649299638723.mpeg';
								this.innerAudioContext.volume = 1
								setTimeout(() => {
									this.innerAudioContext.play()
								}, 1000)

							}, 600)
						} else if (shopList.length == 0 && this.payNum == 1) {
							this.$set(this, 'autoplay', false)
							setTimeout(() => {
								this.popShow6 = false;
								this.popShow7 = true;
								this.innerAudioContext.stop()
								this.innerAudioContext.volume = 0
								this.innerAudioContext.src =
									'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1649299638723.mpeg';
								this.innerAudioContext.volume = 1
								setTimeout(() => {
									this.innerAudioContext.play()
								}, 1000)
							}, 600)
						}
					}, 1000)
				}
				// 	setTimeout(() => {
				// 		if (this.shopList[index].shop_name == this.zhongjiangName && this.flag && this.isKuaisu) {

				// 			this.$set(this, 'autoplay', false)
				// 			this.$set(this, 'current', index.toString())
				// 			console.log(this.payNum)
				// 			if (this.payNum == 1 && this.flag) {
				// 				setTimeout(() => {
				// 					this.popShow6 = false;
				// 					this.popShow7 = true;
				// 				}, 1000)
				// 			} else if (this.payNum == 5 && this.flag) {
				// 				setTimeout(() => {
				// 					this.popShow6 = false;
				// 					this.popShow8 = true;
				// 				}, 1000)
				// 			} else if (this.payNum == 10 && this.flag) {
				// 				setTimeout(() => {
				// 					this.popShow9 = true;
				// 					this.popShow6 = false;
				// 					console.log(this.popShow9)
				// 				}, 1000)
				// 			}
				// 		} else if (!this.isKuaisu) {
				// 			var shopList = this.buyShopList2
				// 			shopList.forEach((ele, i) => {
				// 				if (ele.shop_name == this.shopList[index].shop_name && this.flag) {
				// 					this.$set(this, 'autoplay', false)
				// 					setTimeout(() => {
				// 						shopList.splice(i, 1)
				// 						this.$set(this, 'autoplay', true)
				// 					}, 200)
				// 				}
				// 			})
				// 			console.log(shopList.length, this.payNum)
				// 			if (shopList.length == 0 && this.payNum == 5) {
				// 				this.$set(this, 'autoplay', false)
				// 				setTimeout(() => {
				// 					this.popShow6 = false;
				// 					this.popShow8 = true;
				// 				}, 500)
				// 			} else if (shopList.length == 0 && this.payNum == 10) {
				// 				this.$set(this, 'autoplay', false)
				// 				setTimeout(() => {
				// 					this.popShow9 = true;
				// 					this.popShow6 = false;
				// 				}, 500)
				// 			}
				// 		}
				// 	}, 4000)

			},
			async changeIndex1(i, item, e) {
				this.nowBox = item;
				this.nowIndex1 = i;
				this.boxId = item.box_id;
				this.actIndex = `act-${i}`;
				let offsetLeft = e.currentTarget.offsetLeft
				this.scrollLeft = offsetLeft - this.scrollViewWidth / 2
				console.log(this.scrollLeft)
				const res2 = await this.$api.getAllBoxShop({
					box_id: this.boxId
				})
				this.shopList = res2.data.box;
				this.shopList.forEach(ele => {
					this.list.push({
						image: ele.shop_quality == 0 ? '/static/img/zu4158.png' : ele.shop_quality ==
							1 ? '/static/img/zu4158.png' : ele.shop_quality == 2 ?
							'/static/img/zu4159.png' : '/static/img/zu4157.png',
						shopImage: ele.shop_img,
					})
				})
				this.gailvList = res2.data.probability;
				const res4 = await this.$api.getHomeMessage({
					box_id: this.boxId
				});
				this.shouyeObj = res4.data;
				// this.setData({
				// 	scrollLeft: offsetLeft - this.data.scrollViewWidth / 2
				// })
			},
			toJump(url, param) {
				console.log(url)
				uni.navigateTo({
					url: `${url}?${param}`
				})
			},
			closeMusic() {
				this.playNow = false;
				this.innerAudioContext.volume = 0
			},
			openMusic() {
				this.playNow = true;
				this.innerAudioContext.volume = 1
			},
			ScrollEnd() {
				console.log('enddd')
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #061d1e;
	}
</style>
<style lang="scss" scoped>
	.index {
		position: relative;
	}

	.nav1 {
		margin-top: 50rpx;
		padding-left: 32rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		z-index: 30;

		.tit1 {
			width: 130rpx;
			height: 56rpx;
			background: rgba(171, 234, 235, 0.55);
			border-radius: 28rpx 0rpx 0rpx 28rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: center;
			line-height: 56rpx;
			color: #ffffff;
		}
	}

	.float11 {
		position: absolute;
		left: 36rpx;
		top: 80rpx;
		z-index: 9999;

		.wrap {
			height: 70px;
			width: 360px;
			margin: 0 auto;
			overflow: hidden;

			.item {
				display: flex;
				position: relative;
				margin-top: 20rpx;
				width: 238rpx;
				height: 44rpx;
				opacity: 0.72;
				background-image: url(../../static/img/zu4073.png) !important;
				background-size: 100% 100% !important;

				.fl11-pic1 {
					position: absolute;
					top: 50%;
					left: 6rpx;
					transform: translateY(-50%);
					width: 36rpx;
					height: 36rpx;
					border-radius: 50%;
				}

				.fl11-txt {
					position: absolute;
					top: 50%;
					left: 50rpx;
					transform: translateY(-50%);
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #333333;
				}

				.fl11-pic2 {
					position: absolute;
					top: 50%;
					right: 6rpx;
					transform: translateY(-50%);
					width: 26rpx;
					height: 26rpx;
				}
			}
		}
	}

	.float1 {
		position: absolute;
		right: 36rpx;
		top: 126rpx;
		z-index: 9999;

		.item1 {
			display: flex;
			flex-direction: column;
			align-items: center;

			.pic1 {
				width: 74rpx;
				height: 74rpx;
			}

			.txt1 {
				margin-top: 4rpx;
				color: #abeaeb;
			}
		}

		.item2 {
			margin-top: 22rpx;

			.bb {
				display: flex;
				flex-direction: column;
				align-items: center;

				.b-txt1 {
					position: relative;
					color: #abeaeb;
					font-size: 56rpx;
					font-weight: 700;
					line-height: 38rpx;
					z-index: 1;
				}

				.b-txt2 {
					width: 92rpx;
					height: 12rpx;
					background: #089290;
					border-radius: 50%;
				}
			}
		}

		.item3 {
			margin-top: 22rpx;

			.pic1 {
				width: 62rpx;
				height: 62rpx;
			}
		}
	}

	.float2 {
		position: absolute;
		top: -50rpx;
		z-index: 2;

		.f2-pic {
			width: 750rpx;
			height: 770rpx;
			opacity: 0.33;
		}
	}

	.xz {
		position: absolute;
		z-index: 8;
		left: 50%;
		transform: translateX(-50%);
		top: 184rpx;

		.xz-picc {
			width: 640rpx;
			height: 440rpx;
		}
	}

	.nav2 {
		margin: 180rpx 32rpx 0 32rpx;

		.n2-pic1 {
			width: 690rpx;
			height: 524rpx;
		}
	}

	.nav3 {
		margin: 14rpx 12rpx 0 12rpx;
		white-space: nowrap;

		// /deep/ .uni-scroll-view-content{
		// 	display: flex;
		// 	// flex-wrap: nowrap
		// }
		.item {
			display: inline-block;
			margin-right: 76rpx;
			width: 192rpx;
			height: 62rpx;
			background: #448a8b;
			border-radius: 32rpx;
			font-size: 28rpx;
			font-weight: 700;
			text-align: center;
			color: #333333;
			letter-spacing: 1.96rpx;
			line-height: 62rpx;

			&:nth-child(1) {
				margin-left: 278rpx;
			}

			// &:nth-child(5) {
			// 	margin-right: 278rpx;
			// }
		}

		.item.active {
			width: 192rpx;
			height: 62rpx;
			background: #90e2e3;
			border-radius: 32rpx;
			box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(8, 144, 148, 0.48);
		}

		.item.marginRight {
			margin-right: 278rpx !important;
		}
	}

	.nav4 {
		display: flex;
		justify-content: space-between;
		margin: 40rpx 62rpx 0 62rpx;

		.item {
			margin-top: 120rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.n4-pic1 {
				width: 86rpx;
				height: 94rpx;
			}

			.n4-pic2 {
				margin-top: 8rpx;
				width: 92rpx;
				height: 24rpx;
			}
		}

		.n4-pic3 {
			width: 310rpx;
			height: 282rpx;
		}
	}

	.nav5 {
		margin-top: 40rpx;
		font-size: 24rpx;
		font-family: PingFang SC, PingFang SC-Regular;
		font-weight: 400;
		text-align: center;
		color: #8af0f2;
	}

	.nav6 {
		position: relative;
		z-index: 2;
		margin: 28rpx auto 0;
		width: 272rpx;
		height: 60rpx;
		background: #3c5d5a;
		border-radius: 20rpx;
		box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(255, 255, 255, 0.78) inset;
		display: flex;
		align-items: center;
		justify-content: center;

		.n6-txt1 {
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			line-height: 60rpx;
			color: #dcdcdc;
			margin-right: 14rpx;
		}
	}

	.nav7 {
		position: relative;
		z-index: 1;
		margin: -18rpx auto 0;
		width: 690rpx;
		height: 220rpx;
		background: #4b5e5e;
		border-radius: 20rpx;
		padding: 30rpx 18rpx 0 18rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.item {
			width: 156rpx;
			height: 164rpx;

			.n7i-txt1 {
				padding-top: 8rpx;
				font-size: 12rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #ffffff;
				letter-spacing: 0.72rpx;
			}

			.n7i-img {
				display: block;
				margin: 24rpx auto 0;
				width: 96rpx;
				height: 96rpx;
			}
		}

		.item1.item {
			background-image: url(../../static/img/zu4076.png);
			background-size: 100% 100%;
		}

		.item2.item {
			background-image: url(../../static/img/zu4075.png);
			background-size: 100% 100%;
		}

		.item3.item {
			background-image: url(../../static/img/zu4077.png);
			background-size: 100% 100%;
		}

		.item4.item {
			background-image: url(../../static/img/zu4078.png);
			background-size: 100% 100%;
		}
	}

	.pop1 {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;

		.p1-pic {
			transform: translateY(-44rpx);
			width: 690rpx;
			height: 194rpx;
			position: fixed;
		}

		.p1-tit1 {
			position: fixed;
			z-index: 9999;
			display: flex;
			align-items: center;
			left: 50%;
			transform: translate(-50%, -50rpx);

			.p1-txt1 {
				font-size: 32rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				color: #afe7e8;
				margin-right: 16rpx;
				transform: translate(0, 6rpx);
			}

			.p1-txt2 {
				display: flex;
				flex-direction: column;
				align-items: center;

				.p1-txt2-1 {
					color: #abeaeb;
					font-size: 100rpx;
					font-weight: 700;
				}

				.p1-txt2-2 {
					transform: translate(0, -40rpx);
					z-index: -1;
					width: 128rpx;
					height: 14rpx;
					background: #089290;
					border-radius: 50%;
				}
			}
		}

		.p1-tit2 {
			position: absolute;
			top: 200rpx;
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			color: #333333;
		}

		.p1-tit3 {
			position: absolute;
			top: 254rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			color: #333333;
		}

		.p1-tit4 {
			position: absolute;
			top: 324rpx;
			width: 416rpx;
			height: 74rpx;
			border: 2rpx solid #02b3b6;
			border-radius: 40rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			line-height: 72rpx;
			color: #02b3b6;
		}

	}

	.pop2 {
		padding: 0 30rpx;

		.p2-tit1 {
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #333333;
			margin-top: 24rpx;
		}

		.heng {
			margin-top: 20rpx;
			height: 2rpx;
			background: #d8d8d8;
		}

		.items {
			margin-top: 30rpx;
			display: flex;
			flex-wrap: wrap;

			.item1.item {
				background-image: url(../../static/img/zu4154.png);
			}

			.item2.item {
				background-image: url(../../static/img/zu4152.png);
			}

			.item3.item {
				background-image: url(../../static/img/zu4153.png);
			}

			.item4.item {
				background-image: url(../../static/img/zu4151.png);
			}

			.item {
				width: 328rpx;
				height: 360rpx;
				background-size: 100% 100%;
				padding: 0 30rpx;
				margin-bottom: 30rpx;

				&:nth-child(2n) {
					margin-left: 30rpx;
				}

				.txt1 {
					padding-top: 20rpx;
					font-size: 24rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					text-align: center;
					color: #ffffff;
					letter-spacing: 1.44rpx;
				}

				.pic1 {
					margin-top: 40rpx;
					margin-left: 54rpx;
					width: 152rpx;
					height: 152rpx;
				}

				.txt2 {
					font-size: 28rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #333333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-top: 6rpx;
				}

				.txt3 {
					display: flex;
					align-items: center;

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
		}

		.p2-tit2 {
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			color: #f90000;
		}

		.p2-tit3 {
			font-size: 24rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			color: #666666;
			margin-bottom: 4rpx;
		}

	}

	.pop33 {
		/deep/ .u-drawer-content {
			width: 100vw;
			height: 100vh;
		}

		/deep/ .u-mode-center-box {
			background-color: transparent !important;
		}

		/deep/ .u-mask {
			background-color: rgba(0, 0, 0, 0.8) !important;
		}
	}

	.pop3 {
		width: 750rpx;
		height: 1624rpx;
		background-image: url(../../static/img/zu4079.png);
		background-size: 100% 100%;
		position: relative;

		.p3-close {
			position: absolute;
			width: 68rpx;
			height: 68rpx;
			right: 30rpx;
			top: 80rpx;
		}

		.p3-xz {
			position: absolute;
			top: 490rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 640rpx;
			height: 440rpx;
		}

		.p3-tit1 {
			position: absolute;
			top: 324rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 244rpx;
			height: 72rpx;
			background: #3c5d5a;
			border-radius: 20rpx;
			box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(255, 255, 255, 0.32) inset;
			font-size: 36rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			line-height: 72rpx;
			color: #dcdcdc;
		}

		.p3-tit2 {
			position: absolute;
			top: 960rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 324rpx;
			height: 82rpx;
			background: #02b3b6;
			border-radius: 42rpx;
			box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(2, 179, 182, 0.54);
			display: flex;
			align-items: center;
			justify-content: center;

			.txt1 {
				font-size: 30rpx;
				font-family: PingFang SC, PingFang SC-Heavy;
				font-weight: 800;
				color: #ffffff;
				letter-spacing: 0.32rpx;
			}

			.picc {
				width: 46rpx;
				height: 46rpx;
			}
		}

		.p3-tit3.p3-tit2 {
			position: absolute;
			top: 1090rpx;
			left: 30rpx;
			width: 324rpx;
			height: 82rpx;
			transform: translateX(0);
		}

		.p3-tit4.p3-tit2 {
			position: absolute;
			top: 1090rpx;
			right: 30rpx;
			width: 324rpx;
			height: 82rpx;
			transform: translateX(0);
		}
	}

	.pop4 {
		.p4-tit1 {
			display: flex;
			align-items: center;

			.p4-l-pic {
				width: 320rpx;
				height: 234rpx;
			}

			.p4-r {
				.p4-t {
					font-size: 36rpx;
					font-family: PingFang SC, PingFang SC-Heavy;
					font-weight: 800;
					color: #333333;
				}

				.p4-d {
					display: flex;
					align-items: center;
					font-size: 40rpx;
					font-family: PingFang SC, PingFang SC-Heavy;
					font-weight: 800;
					color: #f90000;

					.picc {
						width: 54rpx;
						height: 54rpx;
					}
				}
			}
		}

		.p4-tit2 {
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.p4-l2 {
				font-size: 32rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #333333;
			}

			.p4-r2 {
				font-size: 32rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #333333;
			}
		}

		.p4-tit3 {
			margin: 42rpx auto 0;
			width: 690rpx;
			height: 76rpx;
			background: #02b3b6;
			border-radius: 38rpx;
			box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(2, 179, 182, 0.14);
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			line-height: 76rpx;
			color: #ffffff;
		}
	}

	.pop5 {
		width: 750rpx;
		height: 1624rpx;
		// background-image: url(../../static/img/zu4079.png);
		background-size: 100% 100%;
		position: relative;

		.p5-pic {
			position: absolute;
			width: 68rpx;
			height: 68rpx;
			left: 30rpx;
			top: 200rpx;
		}

		.p5-xz {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			top: 480rpx;
			width: 640rpx;
			height: 440rpx;
		}

		.p5-xz.xzd {
			top: 40rpx;
			height: 1000rpx;
			width: 1000rpx;
		}

		.p5-tit1 {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			top: 1030rpx;
			width: 432rpx;
			height: 82rpx;
			background: #02b3b6;
			border-radius: 42rpx;
			font-size: 36rpx;
			font-family: PingFang SC, PingFang SC-Heavy;
			font-weight: 800;
			text-align: center;
			line-height: 82rpx;
			color: #ffffff;
			letter-spacing: 2.16rpx;
			box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(2, 179, 182, 0.44);
		}

		.p5-tit2 {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			top: 1230rpx;
			display: flex;
			align-items: center;

			.p5-icon {
				width: 26rpx;
				height: 26rpx;
				border: 2rpx solid #02b3b6;
				border-radius: 50%;
			}

			.p5-txtt {
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: center;
				color: #ffffff;
				margin-left: 18rpx;
			}
		}
	}

	.pop66 {
		/deep/ .u-drawer-content {
			width: 100vw;
			height: 100vh;
		}

		/deep/ .u-mode-center-box {
			background-color: transparent !important;
		}

		/deep/ .u-mask {
			background-color: rgba(0, 0, 0, 1) !important;
		}

		/deep/ .uni-swiper-slides {
			inset: 0px 180rpx !important;
			// box-shadow: 0 0 10px 0px #9fe2e3;
			// height: 88%;
			// margin-top: 18rpx;
		}
	}

	.pop6 {
		width: 750rpx;
		height: 1624rpx;
		background-image: url(../../static/img/zu4163.png);
		background-size: 100% 100%;
		position: relative;

		.mySwiper {
			position: absolute;
			top: 50%;
			// height: 300rpx;
			transform: translateY(-50%);
			width: 100%;
		}
	}

	.pop77 {
		/deep/ .u-drawer-content {
			width: 100vw;
			height: 100vh;
		}

		/deep/ .u-mode-center-box {
			background-color: transparent !important;
		}

		/deep/ .u-mask {
			background-color: rgba(0, 0, 0, 0.8) !important;
		}


	}

	.pop7 {
		.item1.p7-box1 {
			background-image: url(../../static/img/zu4154.png);
			background-size: 100% 100%;
		}

		.item2.p7-box1 {
			background-image: url(../../static/img/zu4152.png);
			background-size: 100% 100%;

		}

		.item3.p7-box1 {
			background-image: url(../../static/img/zu4153.png);
			background-size: 100% 100%;
		}

		.item4.p7-box1 {
			background-image: url(../../static/img/zu4151.png);
			background-size: 100% 100%;
		}

		.p7-box1 {
			height: 748rpx;
			width: 690rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.txt1 {
				padding-top: 46rpx;
				font-size: 48rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #ffffff;
				letter-spacing: 2.88rpx;
			}

			.pic1 {
				margin-top: 90rpx;
				width: 398rpx;
				height: 318rpx;
			}

			.txt2 {
				margin-top: 30rpx;
				width: 584rpx;
				font-size: 30rpx;
				font-family: PingFang SC, PingFang SC-Heavy;
				font-weight: 800;
				text-align: center;
				color: #333333;
			}

			.txt3 {
				display: flex;
				align-items: center;
				margin-top: 12rpx;

				.t3-1 {
					font-size: 30rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #333333;
				}

				.t3-2 {
					display: flex;
					align-items: center;
					font-size: 32rpx;
					font-family: PingFang SC, PingFang SC-Heavy;
					font-weight: 800;
					text-align: left;
					color: #f90000;
				}

				.picc {
					width: 56rpx;
					height: 56rpx;
				}
			}
		}

		.p7-btns {
			margin: 80rpx 0;
			display: flex;
			align-items: center;

			.btn1 {
				width: 320rpx;
				height: 82rpx;
				background: #049b9e;
				border-radius: 42rpx;
				box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(2, 179, 182, 0.41);
				font-size: 30rpx;
				font-family: PingFang SC, PingFang SC-Heavy;
				font-weight: 800;
				text-align: center;
				line-height: 82rpx;
				color: #ffffff;
			}

			.p3-tit2 {
				margin-left: 32rpx;
				width: 324rpx;
				height: 82rpx;
				background: #02b3b6;
				border-radius: 42rpx;
				box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(2, 179, 182, 0.54);
				display: flex;
				align-items: center;
				justify-content: center;

				.txt1 {
					font-size: 30rpx;
					font-family: PingFang SC, PingFang SC-Heavy;
					font-weight: 800;
					color: #333333;
					letter-spacing: 0.32rpx;
				}

				.picc {
					width: 46rpx;
					height: 46rpx;
				}
			}

		}

	}

	.pop8 {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		.item1.p7-box1 {
			background-image: url(../../static/img/zu4154.png);
			background-size: 100% 100%;
		}

		.item2.p7-box1 {
			background-image: url(../../static/img/zu4152.png);
			background-size: 100% 100%;

		}

		.item3.p7-box1 {
			background-image: url(../../static/img/zu4153.png);
			background-size: 100% 100%;
		}

		.item4.p7-box1 {
			background-image: url(../../static/img/zu4151.png);
			background-size: 100% 100%;
		}

		.p7-box1 {
			margin: 14rpx 8rpx;
			width: 220rpx;
			height: 246rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.txt1 {
				font-size: 16rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #ffffff;
				margin-top: 16rpx;
				letter-spacing: 0.96rpx;
			}

			.pic1 {
				margin-top: 24rpx;
				width: 126rpx;
				height: 126rpx;
			}

			.txt2 {
				width: 196rpx;
				height: 28rpx;
				margin-top: 12rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Heavy;
				font-weight: 700;
				text-align: center;
				color: #333333;
			}

			.txt3 {
				display: flex;
				align-items: center;
				margin-top: 12rpx;

				.t3-1 {
					font-size: 30rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #333333;
				}

				.t3-2 {
					display: flex;
					align-items: center;
					font-size: 32rpx;
					font-family: PingFang SC, PingFang SC-Heavy;
					font-weight: 800;
					text-align: left;
					color: #f90000;
				}

				.picc {
					width: 56rpx;
					height: 56rpx;
				}
			}
		}

		.p7-btns {
			margin: 80rpx 0;
			display: flex;
			align-items: center;

			.btn1 {
				width: 320rpx;
				height: 82rpx;
				background: #049b9e;
				border-radius: 42rpx;
				box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(2, 179, 182, 0.41);
				font-size: 30rpx;
				font-family: PingFang SC, PingFang SC-Heavy;
				font-weight: 800;
				text-align: center;
				line-height: 82rpx;
				color: #ffffff;
			}

			.p3-tit2 {
				margin-left: 32rpx;
				width: 324rpx;
				height: 82rpx;
				background: #02b3b6;
				border-radius: 42rpx;
				box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(2, 179, 182, 0.54);
				display: flex;
				align-items: center;
				justify-content: center;

				.txt1 {
					font-size: 30rpx;
					font-family: PingFang SC, PingFang SC-Heavy;
					font-weight: 800;
					color: #333333;
					letter-spacing: 0.32rpx;
				}

				.picc {
					width: 46rpx;
					height: 46rpx;
				}
			}

		}

	}

	.pop9 {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		.item1.p7-box1 {
			background-image: url(../../static/img/zu4154.png);
			background-size: 100% 100%;
		}

		.item2.p7-box1 {
			background-image: url(../../static/img/zu4152.png);
			background-size: 100% 100%;

		}

		.item3.p7-box1 {
			background-image: url(../../static/img/zu4153.png);
			background-size: 100% 100%;
		}

		.item4.p7-box1 {
			background-image: url(../../static/img/zu4151.png);
			background-size: 100% 100%;
		}

		.p7-box1 {
			margin: 14rpx 8rpx;
			width: 220rpx;
			height: 246rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.txt1 {
				font-size: 16rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #ffffff;
				margin-top: 16rpx;
				letter-spacing: 0.96rpx;
			}

			.pic1 {
				margin-top: 24rpx;
				width: 126rpx;
				height: 126rpx;
			}

			.txt2 {
				width: 196rpx;
				height: 28rpx;
				margin-top: 12rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Heavy;
				font-weight: 700;
				text-align: center;
				color: #333333;
			}

			.txt3 {
				display: flex;
				align-items: center;
				margin-top: 12rpx;

				.t3-1 {
					font-size: 30rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #333333;
				}

				.t3-2 {
					display: flex;
					align-items: center;
					font-size: 32rpx;
					font-family: PingFang SC, PingFang SC-Heavy;
					font-weight: 800;
					text-align: left;
					color: #f90000;
				}

				.picc {
					width: 56rpx;
					height: 56rpx;
				}
			}
		}

		.p7-btns {
			margin: 80rpx 0;
			display: flex;
			align-items: center;

			.btn1 {
				width: 320rpx;
				height: 82rpx;
				background: #049b9e;
				border-radius: 42rpx;
				box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(2, 179, 182, 0.41);
				font-size: 30rpx;
				font-family: PingFang SC, PingFang SC-Heavy;
				font-weight: 800;
				text-align: center;
				line-height: 82rpx;
				color: #ffffff;
			}

			.p3-tit2 {
				margin-left: 32rpx;
				width: 324rpx;
				height: 82rpx;
				background: #02b3b6;
				border-radius: 42rpx;
				box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(2, 179, 182, 0.54);
				display: flex;
				align-items: center;
				justify-content: center;

				.txt1 {
					font-size: 30rpx;
					font-family: PingFang SC, PingFang SC-Heavy;
					font-weight: 800;
					color: #333333;
					letter-spacing: 0.32rpx;
				}

				.picc {
					width: 46rpx;
					height: 46rpx;
				}
			}

		}

	}
</style>
