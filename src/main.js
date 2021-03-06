import Vue from 'vue';
import App from './app.vue';
import './assets/style/styles.scss';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
