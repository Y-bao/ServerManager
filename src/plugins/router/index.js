import Vue from "vue";
import PMRouter from "./pm/page-manager";
import * as Pages from "./pages.js";
import LM from "../../helper/manager/login-manager";
import Modules from "../../models/model-config";

Vue.use(PMRouter);

const MainAnim = {
    openEnter: { name: "pm-fade-enter", active: "t-top" },
    openLeave: { name: "pm-fade-leave", active: "t-bottom" },
    closeEnter: { name: "pm-fade-enter", active: "t-top" },
    closeLeave: { name: "pm-fade-leave", active: "t-bottom" }
};

const CPChridAnim = {
    openEnter: { name: "pm-sr-f-enter", active: "t-top" },
    openLeave: { name: "pm-sr-f-leave", active: "t-bottom" },
    closeEnter: { name: "pm-sr-f-enter", active: "t-top" },
    closeLeave: { name: "pm-sr-f-leave", active: "t-bottom" }
};
const PChridAnim = {
    openEnter: "pm-none-enter",
    openLeave: { name: "pm-fade-leave", active: "t-bottom" },
    closeEnter: "pm-none-enter",
    closeLeave: { name: "pm-fade-leave", active: "t-bottom" }
};
var router = new PMRouter({
    listenGuide: true,
    title: "INNOVATION",
    pageAnimation: CPChridAnim,
    routes: [
        {
            path: "/",
            redirect: "/ControlPanel"
        },
        {
            name: "Login",
            path: "/login",
            component: Pages.Login,
            title: "登录"
        },
        {
            name: "ControlPanel",
            path: "/controlpanel",
            component: Pages.ControlPanel,
            children: [
                {
                    path: "/ControlPanel",
                    redirect: Modules.routes[0].path
                },
                ...Modules.routes
            ],
            pageAnimation: PChridAnim
        },
        {
            name: "About",
            path: "/about",
            component: Pages.About,
            title: "关于",
            pageAnimation: MainAnim
        }
    ]
});

router.beforeEach((to, from, n) => {
    if (LM.isLogin || router.$pm.pages.Login.name == to.name) {
        n();
    } else {
        n({
            path: router.$pm.pages.Login.name
        });
    }
});

export default router;
