import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		token:uni.getStorageSync("token")||"",
		userInfo: {},
		uid:uni.getStorageSync("uid") || 0,
	},
	getters:{
		token: state => state.token,
		isLogin: state => !!state.token,
	},
	mutations: {
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
	actions: {

	},
});
