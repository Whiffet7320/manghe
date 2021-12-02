import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		shopPage:1,
		shopPageSize: 15,//商品列表
		from:21,
		token:uni.getStorageSync("token")||"",
		userInfo: {},
		uid:uni.getStorageSync("uid") || 0,
	},
	mutations: {
		from(state, str) {
			state.from = str;
		},
		shopPage(state, str) {
			state.shopPage = str;
		},
		// 
		Login(state, opt) {
			state.token = opt.token;
		},
		SetUid(state,val){
			state.uid = val;
			uni.setStorageSync("uid",val);
		},
		UpdateUserinfo(state, userInfo) {
			state.userInfo = userInfo;
			uni.setStorageSync("userInfo",userInfo);
		},
	},
	getters:{
		token: state => state.token,
		isLogin: state => !!state.token,
	},
	actions: {

	},
});
