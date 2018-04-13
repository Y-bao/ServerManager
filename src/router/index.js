import Vue from "vue";
import PMRouter from "ybao-page-manager";
import * as Pages from "./pages.js";

Vue.use(PMRouter);

const AppAnim = {
    openEnter: "pm-fade-enter",
    openLeave: "pm-fade-leave",
    closeEnter: "pm-fade-enter",
    closeLeave: "pm-fade-leave"
};

const CPChridAnim = {
    openEnter: "pm-sl-f-enter",
    openLeave: "pm-sl-f-leave",
    closeEnter: "pm-sl-f-enter",
    closeLeave: "pm-sl-f-leave"
};

var router = new PMRouter({
    listenGuide: true,
    title: "服务管理系统",
    pageAnimation: AppAnim,
    routes: [
        {
            path: "/",
            redirect: "/ControlPanel"
        },
        {
            name: "ControlPanel",
            path: "/ControlPanel",
            component: Pages.ControlPanel,
            children: [
                {
                    path: "/ControlPanel",
                    redirect: "/ControlPanel/SystemState"
                },
                {
                    name: "SystemState",
                    path: "/ControlPanel/SystemState",
                    component: Pages.HostList,
                    title: "服务器状态",
                    modelName: "Main",
                    pageAnimation: CPChridAnim
                },
                {
                    name: "ApiList",
                    path: "/ControlPanel/ApiList",
                    component: Pages.ApiList,
                    title: "接口服务管理",
                    modelName: "System",
                    pageAnimation: CPChridAnim
                },
                {
                    name: "ServiceList",
                    path: "/ControlPanel/ServiceList",
                    component: Pages.ServiceList,
                    title: "系统服务管理",
                    modelName: "System",
                    pageAnimation: CPChridAnim
                },
                {
                    name: "RedisGroupList",
                    path: "/ControlPanel/RedisGroupList",
                    component: Pages.RedisGroupList,
                    title: "Redis管理",
                    modelName: "System",
                    pageAnimation: CPChridAnim
                },
                {
                    name: "AlarmList",
                    path: "/ControlPanel/AlarmList",
                    component: Pages.AlarmList,
                    title: "警报管理",
                    modelName: "Alarm",
                    pageAnimation: CPChridAnim
                }
            ],
            modelName: "Main"
        },
        {
            name: "Settings",
            path: "/Settings",
            component: Pages.Settings,
            title: "设置",
            modelName: "UtilsMenu"
        },
        {
            name: "About",
            path: "/About",
            component: Pages.About,
            title: "关于",
            modelName: "UtilsMenu"
        }
    ]
});

router.beforeEach((a, b, n) => {
    // alert(router.$pm.jumpWay);
    n();
});

export default router;
