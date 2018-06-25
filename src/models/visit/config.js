export const Visit = r => require.ensure([], () => r(require("@/models/visit")), "visit");

const routes = [{
    name: "Visit",
    title: "访客统计",
    path: "/visit",
    component: Visit
}];

const panelMenus = [{
    title: "访客统计",
    icon: "icon-visitlog"
}];

export default {
    routes,
    panelMenus
};
