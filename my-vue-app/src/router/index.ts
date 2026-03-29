import {createRouter, createWebHistory} from 'vue-router';
// import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Login from '@/views/Login/index.vue'

const routes = [
    {path: '/', redirect: '/login'},
    {path: '/home', name: 'Home', component: ()=> import('@/views/Home.vue')},
    {path: '/about', name: 'About', component: About},
    {path: '/login', name: 'Login', component: Login},
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next)=>{
    let token = localStorage.getItem('token');
    if(!token && to.path !== '/login'){
        next('/login')
    }else{
        next()
    }
})

export default router;