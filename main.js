import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import api from 'api/index.js';
import md5 from 'static/md5.min.js'
import store from './store';
Vue.use(uView);

Vue.config.productionTip = false
Vue.prototype.$apikey="2AA881310EF08E68659107D9D70D40A1";
Vue.prototype.$api = api
Vue.prototype.$md5 = md5
App.mpType = 'app'

const app = new Vue({
    ...App,
	store,
})
app.$mount()
