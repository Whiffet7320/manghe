<template>
	<view class="index">
		<u-toast ref="uToast" />
		<u-tabs-swiper gutter='80' bg-color="#ffffff" height='80' font-size="28" inactive-color="#707070" bar-height="4"
			bar-width="64" active-color="#BD9E81" ref="uTabs" :list="list" :current="current" @change="tabsChange"
			:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		<swiper :style="[{height: height + 'px'}]" :current="swiperCurrent" @animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
				<scroll-view scroll-y='true'>
					<view class="nav5Items">
						<!-- 全部 -->
						<view v-for="item in orderList" :key='item.id'>
							<!-- 待付款 -->
							<view class="item" v-if="item._status._title == '未支付'">
								<view class="tit1">
									<view class="left">
										<view class="txt1-1">剩余支付时间：</view>
										<view class="txt1-2">
											<view class="kuang">{{item.timeObj.h}}</view>
											<view class="txt1-2-1">：</view>
											<view class="kuang">{{item.timeObj.m}}</view>
											<view class="txt1-2-1">：</view>
											<view class="kuang">{{item.timeObj.s}}</view>
										</view>
									</view>
									<view class="right">待付款</view>
								</view>
								<view class="tit2" v-for="item2 in item.cartInfo" :key='item2.id'>
									<image class="pic" :src="item2.productInfo.image" mode="">
									</image>
									<!-- 未预付款 -->
									<view class="box1">
										<view class="tit2-1">
											<view class="txt1">{{item2.productInfo.store_name}}</view>
											<view class="txt2">X{{item2.cart_num}}</view>
										</view>
										<view class="down">
											<view class="tit2-2">{{item2.productInfo.attrInfo.suk}}</view>
											<view class="tit2-3">¥{{item2.productInfo.attrInfo.price}}</view>
										</view>
									</view>
									<!-- 预付款 -->
									<!-- <view class="box1" v-if="product_from == 1">
										<view class="tit2-1">
											<view class="txt1">250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一</view>
										</view>
										<view class="tit2-1-1">预约时间：2021-11-06 下午</view>
										<view class="tit2-1-2">预约医生：李竞</view>
										<view class="down">
											<view class="tit2-3">预付款 ¥2000.00</view>
										</view>
									</view> -->
								</view>
								<view class="tit3">
									<view class="box1">
										<view class="txt1">订单编号:{{item.order_id}}</view>
										<view class="txt2" @click='fuzhi(item.order_id)'>复制</view>
									</view>
									<view class="btns">
										<view class="btn2" @click="tozhifu(item)">去支付</view>
										<view class="btn1" @click="quxiaodingdan">取消订单</view>
									</view>
								</view>
							</view>
							<!-- 待付尾款 -->
							<!-- <view class="item dfwk">
								<view class="tit1">
									<view class="left">下单时间：2021-09-24 20:00</view>
									<view class="right">待付尾款</view>
								</view>
								<view class="tit-z">注：尾款 ¥1600.00需要在2021-11-06 上午面诊后支付</view>
								<view class="tit2">
									<image class="pic"
										src="https://img2.baidu.com/it/u=4006635947,2132087516&fm=26&fmt=auto" mode="">
									</image>
									<view class="box1">
										<view class="tit2-1">
											<view class="txt1">250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一</view>
										</view>
										<view class="tit2-1-1">预约时间：2021-11-06 下午</view>
										<view class="tit2-1-2">预约医生：李竞</view>
										<view class="down dfwk">
											<view class="tit2-1-2-1">预付款 ¥2000.00</view>
											<view class="tit2-1-2-2 red">尾款 ¥1600.00</view>
										</view>
									</view>
								</view>
								<view class="tit3">
									<view class="box1">
										<view class="txt1">订单编号:{{item.order_id}}</view>
										<view class="txt2" @click='fuzhi(item.order_id)'>复制</view>
									</view>
									<view class="btns">
										<view class="btn2">已面诊</view>
										<view class="btn1">取消订单</view>
									</view>
								</view>
							</view> -->
							<!-- 待发货 -->
							<view class="item dfwk" v-if="item._status._title == '未发货'">
								<view class="tit1">
									<view class="left">下单时间：{{item._add_time}}</view>
									<view class="right">待发货</view>
								</view>
								<view class="tit2" v-for="item2 in item.cartInfo">
									<image class="pic" :src="item2.productInfo.image" mode="">
									</image>
									<!-- 未预付款 -->
									<view class="box1">
										<view class="tit2-1">
											<view class="txt1">{{item2.productInfo.store_name}}</view>
											<view class="txt2">X{{item2.cart_num}}</view>
										</view>
										<view class="down">
											<view class="tit2-2">{{item2.productInfo.attrInfo.suk}}</view>
											<view class="tit2-3-1">
												<view class="tit2-3-1-1">¥{{item2.productInfo.attrInfo.price}}</view>
												<view class="tit2-3-1-1 red">¥{{item2.productInfo.attrInfo.price}}
												</view>
											</view>
										</view>
									</view>
									<!-- 预付款 -->
									<!-- <view class="box1">
										<view class="tit2-1">
											<view class="txt1">{{item2.productInfo.store_name}}</view>
										</view>
										<view class="tit2-1-1">预约时间：2021-11-06 下午</view>
										<view class="tit2-1-2">预约医生：李竞</view>
										<view class="down dfwk">
											<view class="tit2-1-2-1">预付款 ¥2000.00</view>
											<view class="tit2-1-2-2">尾款 ¥1600.00</view>
										</view>
									</view> -->
								</view>
								<view class="tit3">
									<view class="box1">
										<view class="txt1">订单编号:{{item.order_id}}</view>
										<view class="txt2" @click='fuzhi(item.order_id)'>复制</view>
									</view>
									<view class="btns">
										<view @click="toBuyagain(item)" class="btn2">再次购买</view>
										<view class="btn1">取消订单</view>
									</view>
								</view>
							</view>
							<!-- 待收货 -->
							<view class="item dfwk" v-if="item._status._title == '待收货'">
								<view class="tit1">
									<view class="left">下单时间：{{item._add_time}}</view>
									<view class="right">待收货</view>
								</view>
								<view class="tit2" v-for="item2 in item.cartInfo">
									<image class="pic" :src="item2.productInfo.image" mode="">
									</image>
									<!-- 未预付款 -->
									<view class="box1">
										<view class="tit2-1">
											<view class="txt1">{{item2.productInfo.store_name}}</view>
											<view class="txt2">X{{item2.cart_num}}</view>
										</view>
										<view class="down">
											<view class="tit2-2">{{item2.productInfo.attrInfo.suk}}</view>
											<view class="tit2-3-1">
												<view class="tit2-3-1-1">¥{{item2.productInfo.attrInfo.price}}</view>
												<view class="tit2-3-1-1 red">¥{{item2.productInfo.attrInfo.price}}
												</view>
											</view>
										</view>
									</view>
									<!-- 预付款 -->
									<!-- <view class="box1">
										<view class="tit2-1">
											<view class="txt1">250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一</view>
										</view>
										<view class="tit2-1-1">预约时间：2021-11-06 下午</view>
										<view class="tit2-1-2">预约医生：李竞</view>
										<view class="down dfwk">
											<view class="tit2-1-2-1">预付款 ¥2000.00</view>
											<view class="tit2-1-2-2">尾款 ¥1600.00</view>
										</view>
									</view> -->
								</view>
								<view class="tit3">
									<view class="box1">
										<view class="txt1">订单编号:{{item.order_id}}</view>
										<view class="txt2" @click='fuzhi(item.order_id)'>复制</view>
									</view>
									<view class="btns">
										<view @click="querenshouhuo(item.order_id)" class="btn2">确认收货</view>
										<view class="btn1">取消订单</view>
									</view>
								</view>
							</view>
							<!-- 待评价 -->
							<view class="item dfwk" v-if="item._status._title == '待评价'">
								<view class="tit1">
									<view class="left">下单时间：{{item._add_time}}</view>
									<view class="right">待评价</view>
								</view>
								<view class="tit2" v-for="item2 in item.cartInfo">
									<image class="pic" :src="item2.productInfo.image" mode="">
									</image>
									<!-- 未预付款 -->
									<view class="box1">
										<view class="tit2-1">
											<view class="txt1">{{item2.productInfo.store_name}}</view>
											<view class="txt2">X{{item2.cart_num}}</view>
										</view>
										<view class="down">
											<view class="tit2-2">{{item2.productInfo.attrInfo.suk}}</view>
											<view class="tit2-3-1">
												<view class="tit2-3-1-1">¥{{item2.productInfo.attrInfo.price}}</view>
												<view class="tit2-3-1-1 red">¥{{item2.productInfo.attrInfo.price}}
												</view>
											</view>
										</view>
									</view>
									<!-- 预付款 -->
									<!-- <view class="box1">
										<view class="tit2-1">
											<view class="txt1">250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一</view>
										</view>
										<view class="tit2-1-1">预约时间：2021-11-06 下午</view>
										<view class="tit2-1-2">预约医生：李竞</view>
										<view class="down dfwk">
											<view class="tit2-1-2-1">预付款 ¥2000.00</view>
											<view class="tit2-1-2-2">尾款 ¥1600.00</view>
										</view>
									</view> -->
								</view>
								<view class="tit3">
									<view class="box1">
										<view class="txt1">订单编号:{{item.order_id}}</view>
										<view class="txt2" @click='fuzhi(item.order_id)'>复制</view>
									</view>
									<view class="btns">
										<view @click="qupingjia(item.order_id)" class="btn2">去评价</view>
									</view>
								</view>
							</view>
							<!-- 已完成 -->
							<view class="item dfwk" v-if="item.status == 2">
								<view class="tit1">
									<view class="left">下单时间：2021-09-24 20:00</view>
									<view class="right">已完成</view>
								</view>
								<view class="tit2">
									<image class="pic"
										src="https://img2.baidu.com/it/u=4006635947,2132087516&fm=26&fmt=auto" mode="">
									</image>
									<!-- 未预付款 -->
									<view class="box1">
										<view class="tit2-1">
											<view class="txt1">250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一</view>
											<view class="txt2">X1</view>
										</view>
										<view class="down">
											<view class="tit2-2">250ml</view>
											<view class="tit2-3-1">
												<view class="tit2-3-1-1">¥9.90</view>
												<view class="tit2-3-1-1 red">¥9.90</view>
											</view>
										</view>
									</view>
									<!-- 预付款 -->
									<!-- <view class="box1">
										<view class="tit2-1">
											<view class="txt1">250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一</view>
										</view>
										<view class="tit2-1-1">预约时间：2021-11-06 下午</view>
										<view class="tit2-1-2">预约医生：李竞</view>
										<view class="down dfwk">
											<view class="tit2-1-2-1">预付款 ¥2000.00</view>
											<view class="tit2-1-2-2">尾款 ¥1600.00</view>
										</view>
									</view> -->
								</view>
								<view class="tit3">
									<view class="box1">
										<view class="txt1">订单编号:{{item.order_id}}</view>
										<view class="txt2" @click='fuzhi(item.order_id)'>复制</view>
									</view>
									<view class="btns">
										<view class="btn2">再次购买</view>
										<view class="btn1">查看评价</view>
										<view class="btn1 btn3">申请售后</view>
									</view>
								</view>
							</view>
							<!-- 已关闭 -->
							<view class="item dfwk" v-if="item.is_del == 1">
								<view class="tit1">
									<view class="left">下单时间：2021-09-24 20:00</view>
									<view class="right" style="color: #707070;">已关闭</view>
								</view>
								<view class="tit2">
									<image class="pic"
										src="https://img2.baidu.com/it/u=4006635947,2132087516&fm=26&fmt=auto" mode="">
									</image>
									<!-- 未预付款 -->
									<!-- <view class="box1">
										<view class="tit2-1">
											<view class="txt1" style="color: #707070;">250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一</view>
											<view class="txt2">X1</view>
										</view>
										<view class="down">
											<view class="tit2-2">250ml</view>
										</view>
									</view> -->
									<!-- 预付款 -->
									<view class="box1">
										<view class="tit2-1">
											<view class="txt1" style="color: #707070;">250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一250ml
												雅漾补水喷雾赠一</view>
										</view>
										<view class="tit2-1-1">预约时间：2021-11-06 下午</view>
										<view class="tit2-1-2">预约医生：李竞</view>
									</view>
								</view>
								<view class="tit3">
									<view class="box1">
										<view class="txt1">订单编号:{{item.order_id}}</view>
										<view class="txt2" @click='fuzhi(item.order_id)'>复制</view>
									</view>
									<view class="btns">
										<view class="btn2">再次购买</view>
									</view>
								</view>
							</view>
							<!-- 拼团中 -->
							<view class="item dfwk ptz" v-if="item.is_del == 1">
								<view class="tit1">
									<view class="left">下单时间：2021-09-24 20:00</view>
									<view class="right">拼团中</view>
								</view>
								<view class="tit2">
									<image class="pic"
										src="https://img2.baidu.com/it/u=4006635947,2132087516&fm=26&fmt=auto" mode="">
									</image>
									<!-- 未预付款 -->
									<view class="box1">
										<view class="tit2-1">
											<view class="txt1">250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一</view>
											<view class="txt2">X1</view>
										</view>
										<view class="down">
											<view class="tit2-2">250ml</view>
										</view>
									</view>
									<!-- 预付款 -->
									<view class="box1">
										<view class="tit2-1">
											<view class="txt1">250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一</view>
										</view>
										<view class="tit2-1-1">预约时间：2021-11-06 下午</view>
										<view class="tit2-1-2">预约医生：李竞</view>
									</view>
								</view>
								<view class="tit3">
									<view class="box1">
										<view class="txt1">订单编号:{{item.order_id}}</view>
										<view class="txt2" @click='fuzhi(item.order_id)'>复制</view>
									</view>
									<view class="btns">
										<view class="b-left">
											<view class="txt1">等待开团</view>
											<view class="imgss">
												<image class="imggg"
													src="https://img2.baidu.com/it/u=4006635947,2132087516&fm=26&fmt=auto"
													mode=""></image>
											</view>
										</view>
										<view class="btn1">取消订单</view>
									</view>
								</view>
							</view>
							<!-- 未成团 -->
							<view class="item dfwk ptz" v-if="item.is_del == 1">
								<view class="tit1">
									<view class="left">下单时间：2021-09-24 20:00</view>
									<view class="right" style="color: #707070;">未成团</view>
								</view>
								<view class="tit2">
									<image class="pic"
										src="https://img2.baidu.com/it/u=4006635947,2132087516&fm=26&fmt=auto" mode="">
									</image>
									<!-- 未预付款 -->
									<view class="box1">
										<view class="tit2-1">
											<view class="txt1" style="color: #707070;">250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一250ml
												雅漾补水喷雾赠一</view>
											<view class="txt2">X1</view>
										</view>
										<view class="down">
											<view class="tit2-2">250ml</view>
										</view>
									</view>
									<!-- 预付款 -->
									<!-- <view class="box1">
										<view class="tit2-1">
											<view class="txt1" style="color: #707070;">250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一</view>
										</view>
										<view class="tit2-1-1">预约时间：2021-11-06 下午</view>
										<view class="tit2-1-2">预约医生：李竞</view>
									</view> -->
								</view>
								<view class="tit3">
									<view class="box1">
										<view class="txt1">订单编号:{{item.order_id}}</view>
										<view class="txt2" @click='fuzhi(item.order_id)'>复制</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 待付款 -->
						<!-- <template v-if="swiperCurrent == 1">
							<view class="item">
								<view class="tit1">
									<view class="left">
										<view class="txt1-1">剩余支付时间：</view>
										<view class="txt1-2">
											<view class="kuang">21</view>
											<view class="txt1-2-1">：</view>
											<view class="kuang">15</view>
											<view class="txt1-2-1">：</view>
											<view class="kuang">18</view>
										</view>
									</view>
									<view class="right">待付款</view>
								</view>
								<view class="tit2">
									<image class="pic"
										src="https://img2.baidu.com/it/u=4006635947,2132087516&fm=26&fmt=auto" mode="">
									</image>
									<view class="box1">
										<view class="tit2-1">
											<view class="txt1">250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一</view>
											<view class="txt2">X1</view>
										</view>
										<view class="down">
											<view class="tit2-2">250ml</view>
											<view class="tit2-3">¥9.90</view>
										</view>
									</view>
								</view>
								<view class="tit3">
									<view class="box1">
										<view class="txt1">订单编号:{{item.order_id}}</view>
										<view class="txt2" @click='fuzhi(item.order_id)'>复制</view>
									</view>
									<view class="btns">
										<view class="btn2">去支付</view>
										<view class="btn1">取消订单</view>
									</view>
								</view>
							</view>
						</template> -->
						<!-- 待付尾款 -->
						<!-- <template v-if="swiperCurrent == 2">
							<view class="item">
								<view class="tit1 dfwk">
									<view class="left">
										<view class="txt1-1">剩余支付时间：</view>
										<view class="txt1-2">
											<view class="kuang">21</view>
											<view class="txt1-2-1">：</view>
											<view class="kuang">15</view>
											<view class="txt1-2-1">：</view>
											<view class="kuang">18</view>
										</view>
									</view>
									<view class="right">待付款</view>
								</view>
								<view class="tit2">
									<image class="pic"
										src="https://img2.baidu.com/it/u=4006635947,2132087516&fm=26&fmt=auto" mode="">
									</image>
									<view class="box1">
										<view class="tit2-1">
											<view class="txt1">250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一250ml 雅漾补水喷雾赠一</view>
											<view class="txt2">X1</view>
										</view>
										<view class="down">
											<view class="tit2-2">250ml</view>
											<view class="tit2-3">¥9.90</view>
										</view>
									</view>
								</view>
								<view class="tit3">
									<view class="box1">
										<view class="txt1">订单编号:{{item.order_id}}</view>
										<view class="txt2" @click='fuzhi(item.order_id)'>复制</view>
									</view>
									<view class="btns">
										<view class="btn2">去支付</view>
										<view class="btn1">取消订单</view>
									</view>
								</view>
							</view>
						</template> -->
						<!-- 已完成 -->
						<!-- <template v-if="swiperCurrent == 3">

						</template> -->
						<!-- 已关闭 -->
						<!-- <template v-if="swiperCurrent == 4">

						</template> -->
						<u-loadmore v-if='swiperCurrent == index' :status="status" />
					</view>
				</scroll-view>

			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["dingdanPage", "dingdanPageSize"]),
		},
		watch: {
			dingdanPage: function(page) {
				console.log('ddpage')
				this.$store.commit("dingdanPage", page);
				if (this.dingdanPage != 1) {
					this.getData();
				}
			},
			current:function(){
				this.orderList = [];
				this.$store.commit("dingdanPage", 1);
				this.getData()
				setTimeout(() => {
					this.getCurrentSwiperHeight('.nav5Items')
				}, 900)
			},
		},
		data() {
			return {
				orderList: [],
				// 
				swiperCurrentIndex: 0,
				height: 0,
				list: [{
					name: '全部'
				}, {
					name: '待付款'
				}, {
					name: '待付尾款'
				}, {
					name: '待发货'
				}, {
					name: '待收货'
				},{
					name: '待评价'
				}, {
					name: '已完成'
				}, {
					name: '已关闭'
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
		onLoad(options){
			if(options.type){
				this.current = options.type;
				if(this.current == 0){
					this.orderList = [];
					this.$store.commit("dingdanPage", 1);
					this.getData()
					setTimeout(() => {
						this.getCurrentSwiperHeight('.nav5Items')
					}, 900)
				}
			}
		},
		onShow() {
			// this.getData()
			this.orderList = [];
			this.$store.commit("dingdanPage", 1);
			// this.tabsChange(this.current);
		},
		onReachBottom() {
			this.$store.commit("dingdanPage", this.dingdanPage + 1);
		},
		mounted() {
			this.getCurrentSwiperHeight('.nav5Items')
		},
		methods: {
			async getData() {
				this.status = 'loading';
				setTimeout(async () => {
					const res = await this.$api.orderList({
						page: this.dingdanPage,
						limit: this.dingdanPageSize,
						type: this.current == 0 ? '' : this.current == 1 ? '0' : this.current ==
							3 ? '4' : ''
					})
					console.log(res.data)
					if (res.data.length == 0) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
						this.orderList = this.orderList.concat(res.data)
					}
					this.orderList.forEach(ele => {
						if (ele.stop_time) {
							this.mygetdate(ele.stop_time,ele)
						}
					})
				}, 200)
				console.log(this.orderList)
			},
			fuzhi(e) {
				uni.setClipboardData({
					data: e,
				});
			},
			async qupingjia(orderId){
				console.log(orderId)
			},
			toBuyagain(item) {
				if (item.cartInfo.length > 1) {
					var myId;
					item.cartInfo.forEach(ele => {
						myId += ele.id
					})
					uni.navigateTo({
						url: `/pages/users/order/tijiaodingdan?uni=${item.order_id}&id=${myId}&isGWC=yes`
					})
				} else {
					var skuItem = item.cartInfo[0].productInfo;
					skuItem.shopName = skuItem.store_name;
					skuItem.buyNum = item.cartInfo[0].cart_num;
					uni.navigateTo({
						url: `/pages/users/order/tijiaodingdan?uni=${item.order_id}&skuItem=${JSON.stringify([skuItem])}&isGWC=no&cartId=${item.cart_id[0]}&isAgain=yes`
					})
				}
			},
			async querenshouhuo(orderId) {
				const res = await this.$api.orderTake({
					uni:orderId
				})
				console.log(res)
				if (res.status == 200) {
					this.$refs.uToast.show({
						title: '收货成功',
						type: 'success',
						callback:()=>{
							this.orderList = [];
							this.$store.commit("dingdanPage", 1);
							this.tabsChange(this.current);
						}
					})
				}
			},
			async tozhifu(item) {
				const res2 = await this.$api.orderPay({
					uni: item.order_id,
					paytype: 'weixin',
					from: 'routine',
				})
				console.log(res2)
				if (res2.status == 200) {
					uni.navigateTo({
						url: `/pages/users/order/querendingdan?payObj=${encodeURIComponent(JSON.stringify(res2.data.result.jsConfig))}&price=${item.pay_price}`
					})
				}
			},
			mygetdate(startSellTime,ele) {
				var date = new Date();
				var now = date.getTime();
				var endTime = new Date(startSellTime * 1000); // 结束时间
				var end = endTime.getTime();
				var lefttime = end - now;
				var d, h, m, s;
				if (lefttime > 0) {

					h = Math.floor(Math.floor(lefttime / 1000 / 60 / 60 / 24) * 24 + (lefttime / 1000 / 60 / 60 % 24))
					d = Math.floor(h / 24);
					h = d % 24;
					m = Math.floor(lefttime / 1000 / 60 % 60)
					s = Math.floor(lefttime / 1000 % 60)
					if (s < 10) {
						s = '0' + s
					}
					if (m < 10) {
						m = '0' + m
					}
					if (h < 10) {
						h = '0' + h
					}
				} else {
					this.h = '00';
					this.m = '00';
					this.s = '00';
					this.$set(ele, 'timeObj', {
						h: '00',
						m: '00',
						s: '00',
					})
					// return {
					// 	h: '00',
					// 	m: '00',
					// 	s: '00',
					// }
					// 清除定时器
					clearTimeout(timer)
				}
				// console.log(d + '天' +h + '时' + m + '分' + s + '秒后开始')
				var timer = setTimeout(() => {
					this.mygetdate(startSellTime,ele)
				}, 1000);
				this.$set(ele, 'timeObj', {
					d,
					h,
					m,
					s,
				})
				// return {
				// 	d,
				// 	h,
				// 	m,
				// 	s,
				// }
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
	// /deep/ .u-load-more-wrap {
	// 	height: 100rpx !important;
	// }
	.index {}

	.swiper-item {
		margin-top: 20rpx;
	}

	.nav5Items {
		padding-bottom: 100rpx;

		.item {
			margin-bottom: 20rpx;
			background: #FFFFFF;
			padding: 0 40rpx 28rpx 40rpx;

			.tit1 {
				height: 90rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 2rpx solid #F7F8FA;

				.left {
					display: flex;
					align-items: center;

					.txt1-1 {
						font-size: 24rpx;
						font-weight: 400;
						color: #707070;
					}

					.txt1-2 {
						display: flex;
						align-items: center;

						.kuang {
							width: 44rpx;
							height: 42rpx;
							background: #FA8677;
							border-radius: 10rpx;
							font-size: 22rpx;
							font-weight: bold;
							line-height: 42rpx;
							text-align: center;
							color: #FFFFFF;
						}

						.txt1-2-1 {
							margin-left: 12rpx;
							font-size: 24rpx;
							font-weight: 400;
							color: #000000;
						}
					}
				}

				.right {
					font-size: 24rpx;
					font-weight: 500;
					color: #BD9E81;
				}
			}

			.tit2 {
				border-bottom: 2rpx solid #F7F8FA;
				padding: 28rpx 0;
				display: flex;
				align-items: center;

				.pic {
					width: 186rpx;
					height: 186rpx;
					background: #FFFFFF;
					border-radius: 10rpx;
				}

				.box1 {
					margin-left: 24rpx;
					width: 460rpx;
					height: 186rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.tit2-1 {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.txt1 {
							font-size: 28rpx;
							font-weight: 500;
							color: #BD9E81;
							width: 406rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}

						.txt2 {
							font-size: 24rpx;
							font-weight: 400;
							color: #707070;
						}
					}

					.tit2-1-1 {
						margin-top: 12rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #707070;
					}

					.tit2-1-2 {
						margin-top: 6rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #707070;
					}

					.down {
						.tit2-2 {
							font-size: 24rpx;
							font-weight: 400;
							color: #707070;
						}

						.tit2-3 {
							margin-top: 8rpx;
							font-size: 28rpx;
							font-weight: bold;
							color: #707070;
						}
					}
				}
			}

			.tit3 {
				.box1 {
					margin-top: 28rpx;
					display: flex;

					.txt1 {
						font-size: 24rpx;
						font-weight: 400;
						line-height: 34rpx;
						color: #707070;
					}

					.txt2 {
						margin-left: 20rpx;
						font-size: 24rpx;
						font-weight: 500;
						color: #BD9E81;
					}
				}

				.btns {
					margin-top: 28rpx;
					display: flex;
					align-items: center;
					flex-direction: row-reverse;

					.btn1 {
						height: 56rpx;
						width: 152rpx;
						border: 2rpx solid #666666;
						border-radius: 10rpx;
						ackground: #ffffff;
						font-size: 24rpx;
						font-weight: 400;
						line-height: 52rpx;
						text-align: center;
						color: #707070;
					}

					.btn3.btn1 {
						margin-right: 20rpx;
					}

					.btn2 {
						margin-left: 20rpx;
						height: 56rpx;
						width: 152rpx;
						border-radius: 10rpx;
						background: #BD9E81;
						font-size: 24rpx;
						font-weight: 400;
						line-height: 56rpx;
						text-align: center;
						color: #FFFFFF;
					}
				}
			}
		}

		.item.dfwk {
			.tit1 {
				.left {
					font-size: 24rpx;
					font-weight: 400;
					color: #707070;
				}
			}

			.tit-z {
				transform: translateX(-40rpx);
				width: 750rpx;
				height: 56rpx;
				background: #F2ECE6;
				font-size: 20rpx;
				font-weight: bold;
				line-height: 56rpx;
				text-align: center;
				color: #BD9E81;
			}

			.down {
				.tit2-3-1 {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.tit2-3-1-1 {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						line-height: 40rpx;
						color: #707070;
					}

					.tit2-3-1-1.red {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						line-height: 40rpx;
						color: #FA8677;
					}
				}
			}

			.down.dfwk {
				margin-top: 6rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.tit2-1-2-1 {
					font-size: 24rpx;
					color: #707070;
					font-weight: 500;
				}

				.tit2-1-2-2 {
					font-size: 24rpx;
					font-weight: 500;
					color: #707070;
				}

				.tit2-1-2-2.red {
					color: #FA8677;
				}

			}
		}

		.item.dfwk.ptz {
			.btns {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;

				.b-left {
					display: flex;
					align-items: center;

					.txt1 {
						font-size: 20rpx;
						font-weight: 400;
						color: #707070;
					}

					.imgss {
						margin-left: 20rpx;
						display: flex;
						align-items: center;

						.imggg {
							width: 34rpx;
							height: 34rpx;
							border-radius: 50%;
						}
					}
				}
			}
		}
	}
</style>
