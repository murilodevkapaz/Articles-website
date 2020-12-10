import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/components/home/Home';
import AdminPages from '@/components/admin/AdminPages';
import ArticlesByCategory from '@/components/articles/ArticlesByCategory';
import ArticleById from '@/components/articles/ArticlesById';
import Auth from '@/components/auth/Auth'

import {userKey} from '@/global';

Vue.use(VueRouter);

const routes = [{
    name: 'home',
    path: '/',
    component: Home
},{
    name: 'AdminPages',
    path: '/admin',
    component: AdminPages,
    meta: {requiresAdmin: true}//só acessa essa página quem for admin
},{
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory
},{
    name: 'articleById',
    path: '/articles/:id',
    component: ArticleById
},{
    name: 'auth',
    path: '/auth',
    component: Auth
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next)=>{
    //para impedir de um usuário não admin acessar uma page especifica
    const json = localStorage.getItem(userKey);

    if(to.matched.some(record=> record.meta.requiresAdmin)){
        const user = JSON.parse(json);
        user && user.admin ? next(): next({path: '/'});
    }
    else{
        next();
    }
})

export default router;
