import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入字体图标
import './assets/font_user/iconfont.css'
import './assets/font_password/iconfont.css'
import './assets/fonts/iconfont.css'
import './assets/css/global.css'
import './mock/mock.js'
import axios from 'axios';
import mock from 'mockjs'

/*配置请求根路径*/
axios.defaults.baseURL = 'http://localhost:8081/test'

axios.interceptors.request.use(config => {
    console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(mock)

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
