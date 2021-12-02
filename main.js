import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import api from 'api/index.js';
import md5 from 'static/md5.min.js'
import store from './store';
import tool from 'utils/tool';
import {Base64} from 'js-base64/base64.js';
import crypto from 'crypto-js';

Vue.use(uView);


Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$tool = tool;
App.mpType = 'app';

const app = new Vue({
	...App,
	store,
})
app.$mount()
