export const Visit = r => require.ensure([], () => r(require("@/models/visit")), "visit");

const routes = [
    {
        name: "Visit",
        title: "访客统计",
        path: "/visit",
        component: Visit,
        meta: { menu: "Visit" }
    }
];

const panelMenus = [
    {
        name: "Visit",
        title: "访客统计",
        icon: "icon-visitlog",
        to: "Visit"
    }
];

export default {
    routes,
    panelMenus
};
