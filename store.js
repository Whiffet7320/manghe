import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		nowAddress:null,
		fl:null,
		youhuiquanPage:1,
		youhuiquanPageSize: 10,//优惠券列表
		dingdanPage:1,
		dingdanPageSize: 10,//订单列表
		jinqianjiluPage:1,
		jinqianjiluPageSize: 10,//金钱记录列表
		pinglunliebiaoPage:1,
		pinglunliebiaoPageSize: 10,//评论列表
		jifenbiaoPage:1,
		jifenbiaoPageSize: 10,//积分明细列表
		wodejiangpinPage:1,
		wodejiangpinPageSize: 10,//我的奖品列表
		shopPage:1,
		shopPageSize: 15,//商品列表
		dingdanStatus:null,
		// 
	},
	mutations: {
		dingdanStatus(state, str) {
			state.dingdanStatus = str;
		},
		pinglunliebiaoPage(state, str) {
			state.pinglunliebiaoPage = str;
		},
		jinqianjiluPage(state, str) {
			state.jinqianjiluPage = str;
		},
		dingdanPage(state, str) {
			state.dingdanPage = str;
		},
		nowAddress(state, str) {
			state.nowAddress = str;
		},
		fl(state, str) {
			state.fl = str;
		},
		youhuiquanPage(state, str) {
			state.youhuiquanPage = str;
		},
		jifenbiaoPage(state, str) {
			state.jifenbiaoPage = str;
		},
		wodejiangpinPage(state, str) {
			state.wodejiangpinPage = str;
		},
		shopPage(state, str) {
			state.shopPage = str;
		},
		// 
		allshopPage(state, str) {
			state.allshopPage = str;
		},
		page(state, str) {
			state.page = str;
		},
		ddPage(state, str) {
			state.ddPage = str;
		},
		mdPage(state, str) {
			state.mdPage = str;
		},
		mdgmShow(state, str) {
			state.mdgmShow = str;
		},
		yqhyPage(state, str) {
			state.yqhyPage = str;
		},
		yjPage(state, str) {
			state.yjPage = str;
		},
		yyjlPage(state, str) {
			state.yyjlPage = str;
		},
		txjlPage(state, str) {
			state.txjlPage = str;
		},
		shoucangPage(state, str) {
			state.shoucangPage = str;
		},
		pinglunPage(state, str) {
			state.pinglunPage = str;
		},
		sousuopage(state, str) {
			state.sousuopage = str;
		},
	},
	actions: {

	},
});
