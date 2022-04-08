import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import api from './api/index.js';
import store from './store.js';
import tool from './utils/tool';
import md5 from 'static/md5.min.js'
import vueSeamlessScroll from 'vue-seamless-scroll'
Vue.use(vueSeamlessScroll)

Vue.use(uView);

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$tool = tool;
Vue.prototype.$md5 = md5
// 小程序分享的mixin封装
import mpShare from './libs/mixin/mpShare.js';
Vue.mixin(mpShare);
App.mpType = 'app';

const app = new Vue({
	...App,
	store,
	scroll
})
app.$mount()
