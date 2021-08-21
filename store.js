import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		fl:null,
		youhuiquanPage:1,
		youhuiquanPageSize: 10,//优惠券列表
		// 
		allshopPage: 1, //所有商品列表
		allshopPageSize: 10,
		page: 1, //商品列表
		pageSize: 10,
		ddPage: 1, //订单列表
		ddPageSize: 10,
		mdPage: 1, //免单列表
		mdPageSize: 10,
		mdgmShow: false, //购物车的免单是否显示
		yqhyPage: 1, //邀请好友列表
		yqhyPageSize: 10,
		yjPage: 1, //佣金列表
		yjPageSize: 10,
		yyjlPage: 1, //交易记录列表
		yyjlPageSize: 10,
		txjlPage: 1, //提现历史记录列表
		txjlPageSize: 15,
		shoucangPage: 1, //收藏列表
		shoucangPageSize: 10,
		pinglunPage: 1, //商品评论列表
		pinglunPageSize: 10,
		sousuopage: 1, //搜索商品列表
		sousuopageSize: 10,
	},
	mutations: {
		fl(state, str) {
			state.fl = str;
		},
		youhuiquanPage(state, str) {
			state.youhuiquanPage = str;
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
