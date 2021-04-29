import LoginService from '@/services/LoginService';
import LoggedLayout from '@/views/Layouts/Logged/LoggedLayout.vue';
import Login from '@/views/Login/Login.vue';
import QCMComponent from '@/views/QCM/QCMComponent.vue';
import QCMList from '@/views/QCMList/QCMList.vue';
import QCMReports from '@/views/QCMReports/QCMReports.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import QCMform from '../views/QCMform.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: LoggedLayout,
        beforeEnter: async (to, from, next) => {
            if (await LoginService.getInstance().isLogged()) {
                next();
            } else {
                next({ name: 'login' });
            }
        },
        children: [
            {
                path: '',
                name: 'qcm-list',
                component: QCMList,
            },
            {
                path: '/qcm-edit/:id',
                name: 'qcm-edit',
                component: QCMform,
            },
            {
                path: '/qcm-reports/:id',
                name: 'qcm-reports',
                component: QCMReports,
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: Login,

        beforeEnter: async (to, from, next) => {
            if (await LoginService.getInstance().isLogged()) {
                next({ name: 'qcm-list' });
            } else {
                next();
            }
        },
    },
    {
        path: '/qcm/:id',
        name: 'qcm',
        component: QCMComponent,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
