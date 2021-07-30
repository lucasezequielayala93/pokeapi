import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import services from "./services";
import Buefy from "buefy";
import FontAwesome from "@fortawesome/fontawesome-free/js/all";
import VueObserveVisibility from 'vue-observe-visibility';
import VueClipboard from 'vue-clipboard2';
 
Vue.config.productionTip = false;
Vue.use(Buefy);
Vue.use(FontAwesome);
Vue.use(VueClipboard);
Vue.use(VueObserveVisibility);
Vue.prototype.$eventBus = new Vue();
Vue.prototype.$services = services;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
