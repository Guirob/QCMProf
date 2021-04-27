import QCMComponent from "@/views/QCM/QCMComponent.vue";
import QCMList from "@/views/QCMList/QCMList.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import QCMform from "../views/QCMform.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "qcm-list",
        component: QCMList,
    },
    {
        path: "/qcm-edit/:id",
        name: "qcm-edit",
        component: QCMform,
    },
    {
        path: "/qcm/:id",
        name: "qcm",
        component: QCMComponent,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
