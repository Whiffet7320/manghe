<template>
	<view class="olist">
		<view class="navbar">
			<u-tabs-swiper bg-color="#f7f8fa" height='60' font-size="32" inactive-color="#000000" bar-height="2"
				bar-width="80" active-color="#D61D1D" ref="uTabs" :list="list" :current="tabCurrentIndex" @change="tabClick"
				:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper style="height: calc(100% - 110rpx)" :current="tabCurrentIndex" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(item, index) in list" :key="index">
				<scroll-view class="list-scroll-content" scroll-y='true' @scrolltolower="loadData">
					<page-empty text="没有找到任何订单" v-if="loaded === true && orderList.length === 0"/>
					<view class="nav5Items">
						<view class="item" v-for="(order, okey) in orderList" :key="okey" @click="goDetail(order)">
							<image :src="proInfo.img" class="pic1" mode="" v-if="proInfo.img"></image>
							<view class="right">
								<view class="tit1">
									<view class="txt1">{{proInfo.name}}<u-icon style='margin-left: 20rpx;' name="arrow-right" color="#808080" size="28"></u-icon></view>
									<view class="txt2" v-if="order.status==0">待发货</view>
									<view class="txt2" v-if="order.status==1">待收货</view>
									<view class="txt2" v-if="order.status==2">订单已完成</view>
								</view>
								<view class="tit2">
									<view class="txt1">规格：<text style="margin-left: 4rpx;">母蟹{{proInfo.unit}}两</text></view>
									<view class="txt2">x{{order.total_num}}</view>
								</view>
								<view class="tit3">
									<view class="txt1">下单时间：{{order.add_time}}</view>
								</view>
								<view class="tit3">
									<view class="txt2">实付<text style="font-weight: 700;">￥{{order.pay_price}}</text></view>
								</view>
								<view class="btns" v-if="order.status==0">
									<view class="btn2" @click.stop="pshow=true">提醒发货</view>
									<view class="btn1" @click.stop="onDel(order.id,index)">删除订单</view>
								</view>
								<view class="btns" v-if="order.status==1">
									<view class="btn2" @click.stop="comfirmOrder(order.id)">确认收货</view>
									<view class="btn1" style="margin-left: 20rpx;" @click.stop="toWuliu(order.id)">查看物流</view>
								</view>
								<view class="btns" v-if="order.status==2">
									<view class="btn2" @click.stop="goShop">再来一单</view>
									<view class="btn1" style="margin-left: 20rpx;" @click.stop="toWuliu(order.id)">查看物流</view>
									<view class="btn1" @click.stop="onDel(order.id,index)">删除订单</view>
								</view>
							</view>
						</view>
						<u-loadmore :status="status" />
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<page-toast v-model="pshow" title="提醒发货成功" content="卖家会第一时间发货" @confirm="pconfirm"></page-toast>
		<page-modal v-model="show" width="466" title="确认删除订单？" confirm-text="确认删除" @confirm="confirm">
			<view class="mcont">删除之后数据无法恢复</view>
		</page-modal>
		<page-modal v-model="cshow" width="466" title="确定收到货了？" confirm-text="确认收货" @confirm="confirm2">
			<view class="mcont">保障权益商品无误再收货</view>
		</page-modal>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	import pageEmpty from "@/components/page-empty";
	import pageToast from "@/components/page-toast";
	import pageModal from "@/components/page-modal";
	export default {
		components:{
			pageEmpty,
			pageToast,
			pageModal
		},
		data() {
			return {
				id:0,
				index:0,
				show:false,
				pshow:false,
				cshow:false,
				proInfo:{},
				orderList: [],
				tabCurrentIndex: 0,
				list: [
					{
						name: '全部订单',
						state:-1
					}, 
					{
						name: '待发货',
						state:0
					},
					{
						name: '待收货',
						state:1
					},
					{
						name: '已完成',
						state:2
					}
				],
				type: -1, // tabs组件的current值，表示当前活动的tab选项
				// 加载
				status: 'loadmore',
				current_page:1,
				loaded:false
			}
		},
		onLoad(options){
			this.getProinfo();
			this.loadData();
		},
		methods: {
			async getProinfo(){
				await this.$api.product().then((res)=>{
					if(res.code==200){
						this.proInfo = res.data;
					}
				})
			},
			loadData(source) {
				//判断是否最后一页
				if (this.status == 'nomore') {
					return;
				}
				//tab切换只有第一次需要加载数据
				if (source === 'tabChange' && this.loaded === true) {
					return;
				}
				//防止重复加载
				if (this.status === 'loading') {
					return;
				}
				this.status = 'loading';
				setTimeout(()=>{
					this.$api.orderList({
						page: this.current_page,
						limit: 10,
						type: this.type
					}).then((res)=>{
						if(res.code==200){
							this.current_page = res.data.current_page; //当前页码
							if (res.data.last_page === res.data.current_page) {
								this.status = 'nomore';
							} else {
								this.status = 'more';
								this.current_page++;
							}
							this.orderList = this.orderList.concat(res.data.data);
							//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
							this.loaded = true;
						}
					})
				}, 200)
			},
			goDetail(val){
				this.$store.commit("setProinfo",this.proInfo);
				this.$store.commit("setOrderInfo",val);
				uni.navigateTo({
					url:"/pages/user/order/detail?id="+val.id
				})
			},
			toWuliu(){
				uni.navigateTo({
					url:'/pages/user/order/wuliu'
				})
			},
			onDel(id,index){
				this.id = id;
				this.index = index;
				this.show = true;
			},
			confirm(){
				this.$api.delOrder(this.id).then((res)=>{
					if(res.code==200){
						this.$u.toast("删除成功");
						this.orderList.splice(this.index,1);
					}else{
						this.$u.toast(res.message);
					}
				})
			},
			//提醒发货
			pconfirm(){
				this.pshow = !this.pshow;
			},
			comfirmOrder(id){
				this.$api.comfirmOrder(id).then((res)=>{
					if(res.code==200){
						this.$u.toast(res.message);
						this.loadData();
					}else{
						this.$u.toast(res.message);
					}
				})
			},
			goShop(){
				this.$store.commit("setProinfo",this.proInfo);
				uni.navigateTo({
					url:'/pages/order/querendingdan'
				})
			},
			// tabs通知swiper切换
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
				this.type = this.list[this.tabCurrentIndex].state;
				this.current_page = 1;
				this.orderList = [];
				this.loadData();
			},
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
				this.type = this.list[this.tabCurrentIndex].state;
				this.loadData('tabChange');
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
			}
		}
	}
</script>

<style>
	page {
		background: #F7F8FA;
	}
</style>
<style lang="scss" scoped>
	.olist{
		height: 100vh;
	}
	.list-scroll-content{
		height: 100%;
	}
	.navbar{
		padding:40rpx 0 24rpx 0;
	}
	.mcont{
		padding: 24rpx 24rpx 30rpx 24rpx;
		font-size: 32rpx;
		font-family: PingFang SC, PingFang SC-Bold;
		font-weight: 700;
		text-align: center;
		color: #141414;
	}
	.nav5Items {
		padding: 0 30rpx;

		.item {
			margin-bottom: 20rpx;
			width: 690rpx;
			height: 278rpx;
			background: #ffffff;
			border-radius: 12rpx;
			box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(0, 0, 0, 0.16);
			display: flex;
			align-items: center;
			padding: 0 28rpx 0 16rpx;
			.pic1 {
				width: 248rpx;
				height: 248rpx;
			}

			.right {
				margin-top: 18rpx;
				margin-left: 18rpx;
				.tit1 {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.txt1 {
						font-size: 32rpx;
						font-weight: 700;
						color: #0f0f0f;
					}

					.txt2 {
						font-size: 24rpx;
						font-weight: 500;
						color: #808080;
					}
				}
				.tit2{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 12rpx;
					.txt1{
						font-size: 24rpx;
						font-weight: 500;
						color: #808080;
					}
					.txt2{
						font-size: 24rpx;
						font-weight: 500;
						color: #808080;
					}
				}
				.tit3{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 10rpx;
					.txt1{
						font-size: 20rpx;
						font-weight: 500;
						color: #808080;
					}
					.txt2{
						font-size: 20rpx;
						font-weight: 500;
						color: #000000;
					}
				}
				.btns{
					width: 380rpx;
					margin-top: 34rpx;
					display: flex;
					flex-direction: row-reverse;
					align-items: center;
					.btn1{
						width: 112rpx;
						height: 44rpx;
						border: 2rpx solid #f2f2f2;
						border-radius: 8rpx;
						font-size: 20rpx;
						font-weight: 500;
						text-align: center;
						line-height: 40rpx;
						color: #000000;
					}
					.btn2{
						margin-left: 20rpx;
						width: 112rpx;
						height: 44rpx;
						border: 2rpx solid #d61d1d;
						border-radius: 8rpx;
						font-size: 20rpx;
						font-weight: 500;
						text-align: center;
						line-height: 40rpx;
						color: #d61d1d;
					}
				}
			}
		}
	}
</style>
