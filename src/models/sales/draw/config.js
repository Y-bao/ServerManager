export const Draw = r => require.ensure([], () => r(require("@/models/sales/draw")), "draw");

const routes = [
    {
        name: "Draw",
        title: "抽签活动",
        path: "/draw",
        component: Draw,
        meta: { menu: "Draw", menuGroup: "Sales" }
    }
];

const panelMenus = [
    {
        name: "Draw",
        title: "抽签活动",
        icon: "icon-draw",
        group: "Sales",
        to: "Draw"
    }
];

export default {
    routes,
    panelMenus
};
