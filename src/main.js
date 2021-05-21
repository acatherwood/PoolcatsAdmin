import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import moment from 'moment'

Vue.filter('formatDate', function(value) {
  console.log("made it to the function")
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


