import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/home/Home';
import AdminPages from '@/components/admin/AdminPages';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
    name: 'home',
    path: '/',
    component: Home
},{
    name: 'AdminPages',
    path: '/admin',
    component: AdminPages
}]

export default new VueRouter({
    mode: "history",
    routes
})
