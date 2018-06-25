import Vue from "vue";
import PMRouter from "ybao-page-manager";
import * as Pages from "./pages.js";
import LM from "../../helper/manager/login-manager";
import Modules from "../../models/model-config";

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
    title: "INNOVATION",
    pageAnimation: AppAnim,
    routes: [
        {
            path: "/",
            redirect: "/ControlPanel"
        },
        {
            name: "Login",
            path: "/login",
            component: Pages.Login,
            title: "登录",
            pageAnimation: LGChridAnim
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
            ]
        },
        {
            name: "About",
            path: "/about",
            component: Pages.About,
            title: "关于"
        }
    ]
});

router.beforeEach((to, from, n) => {
    if (LM.isLogin||router.$pm.pages.Login.name == to.name ) {
        n();
    } else {
        n({
            path: router.$pm.pages.Login.name
        });
    }
});

export default router;
