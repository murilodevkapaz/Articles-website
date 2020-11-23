import 'font-awesome/css/font-awesome.css';
import Vue from 'vue';

import App from './App';

import './config/bootstrap';
import './config/msgs';
import store from './config/store';
import router from './config/router';

Vue.config.productionTip = false

//TEMPORÁRIO!
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ik11cmlsbyBSZXJpc29uIGRlIFNvdXNhIFBheiIsImVtYWlsIjoibXVyaWxva2FwYXpAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTYwNTk5Mzc2MSwiZXhwIjoxNjA2MjUyOTYxfQ.lupuZmObv-sZvp-RD2WrJAV0oL65hykHCpRLi-fTXA4';

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')