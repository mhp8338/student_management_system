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
import VueAMap from 'vue-amap';


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
Vue.use(VueAMap)

VueAMap.initAMapApiLoader({
    key: '08547378df03af7f3ed8c7360131b3b1',
    plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'Geocoder'],
    v: '1.4.4'
});

Vue.filter('dataFormat', function (originVal) {
    const dt = new Date(originVal)
    const year = dt.getFullYear()
    const month = (dt.getMonth() + 1 + '').padStart(2, '0')
    const day = (dt.getDate() + '').padStart(2, '0')
    const hour = (dt.getHours() + '').padStart(2, '0')
    const minutes = (dt.getMinutes() + '').padStart(2, '0')
    const seconds = (dt.getSeconds() + '').padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
