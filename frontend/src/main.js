import 'font-awesome/css/font-awesome.css';
import Vue from 'vue';

import App from './App';

import './config/bootstrap';
import './config/msgs';
import store from './config/store';
import router from './config/router';

Vue.config.productionTip = false

//TEMPORÁRIO!
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ik11cmlsbyBSZXJpc29uIGRlIFNvdXNhIFBheiIsImVtYWlsIjoibXVyaWxva2FwYXpAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTYwNjM1NjYwNiwiZXhwIjoxNjA2NjE1ODA2fQ.UiHVbH4pOVUKlt9fmYGd5LE5xF2XTs0eOW2N62luYxE';

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')