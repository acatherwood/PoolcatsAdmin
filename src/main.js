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

// create a directive to transform the model value
Vue.directive('prettyDate', {
  twoWay: true, // this transformation applies back to the vm
  bind: function () {
    this.handler = function () {
      this.set(String(this.el.value)).format('MM/DD/YYYY');
    }.bind(this);
    this.el.addEventListener('input', this.handler);
  },
  unbind: function () {
    this.el.removeEventListener('input', this.handler);
  }
});


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


