import Vue from 'vue';
import App from './App.vue';
import './plugins/element.js';
import router from './sys/router';
import store from './sys/store';
import i18n from './sys/i18n';
import VueRx from 'vue-rx';
//引入过滤函数
import vueFilter from './sys/filters';


for (let key in vueFilter) {
  Vue.filter(key,vueFilter[key])
}


Vue.use(VueRx);
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app');
