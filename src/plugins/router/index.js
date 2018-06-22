import Vue from "vue";
import PMRouter from "ybao-page-manager";
import * as Pages from "./pages.js";
import LM from "../../helper/manager/login-manager";

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

const LGChridAnim = {
    openEnter: "pm-st-enter"
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
            name: "Login",
            path: "/Login",
            component: Pages.Login,
            title: "登录",
            pageAnimation: LGChridAnim
        },
        {
            name: "ControlPanel",
            path: "/ControlPanel",
            component: Pages.ControlPanel,
            children: [
                {
                    path: "/ControlPanel",
                    redirect: "/Brand"
                },
                {
                    name: "Brand",
                    path: "/Brand",
                    component: Pages.Brand,
                    title: "品牌信息",
                    modelName: "Main",
                    pageAnimation: CPChridAnim
                },
                {
                    name: "Users",
                    path: "/Users",
                    component: Pages.Users,
                    title: "用户管理",
                    modelName: "Main",
                    pageAnimation: CPChridAnim
                },
                {
                    name: "Draw",
                    path: "/Draw",
                    component: Pages.Draw,
                    title: "抽签活动",
                    modelName: "Sales",
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

router.beforeEach((to, from, n) => {
    if (LM.isLogin||router.$pm.pages.Login.path == to.path ) {
        n();
    } else {
        n({
            path: router.$pm.pages.Login.path
        });
    }
});

export default router;
