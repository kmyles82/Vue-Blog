import Router from 'vue-router'
import Vue from 'vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Home from './views/Home.vue'
import Article from './views/Article.vue'
import Create from './views/Create.vue'


Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/signup',
            name: 'signup',
            component: Signup,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/article/:id',
            name: 'article',
            component: Article,
        },
        {
            path: '/articles/create',
            name: 'create',
            component: Create,
        },
    ]
})

export default router;