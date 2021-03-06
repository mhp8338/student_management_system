import Vue from 'vue'
import Router from 'vue-router'
import Login from "./components/Login.vue";
import Home from "@/components/Home";
import './plugins/elements.js'
import Welcome from "@/components/Welcome";
import Users from "@/components/user/Users";
import Rights from "@/components/power/Rights";
import Roles from "@/components/power/Roles";
import ActivityList from "@/components/activity/ActivityList";
import Add from "@/components/activity/Add";


Vue.use(Router)


const router = new Router(
    {
        routes: [
            {path: '/', redirect: '/login'},
            {path: '/login', component: Login},
            {
                path: '/home', component: Home,
                redirect: '/welcome',
                children: [
                    {path: '/welcome', component: Welcome},
                    {path: '/users', component: Users},
                    {path: '/authorize', component: Rights},
                    {path: '/roles', component: Roles},
                    {path: '/workList', component: ActivityList},
                    {path: '/workList/add', component: Add}
                ]
            }
        ]
    }
)

router.beforeEach((to, from, next) => {
    // to:将要访问的路径
    // from：从哪个路径跳转
    // next：放行 next() next('/login')
    if (to.path === '/login') {
        return next()
    }
    if (to.path === '/activity') return next('/activity')
    // 获取token
    const tokenstr = window.sessionStorage.getItem('token')
    if (!tokenstr && to.path !== '/activity') return next('/login')
    next()
})

export default router
