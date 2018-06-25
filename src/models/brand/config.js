export const Brand = r => require.ensure([], () => r(require("@/models/brand")), "brand");

const routes = [
    {
        name: "Brand",
        title: "品牌信息",
        path: "/brand",
        component: Brand,
        meta: { menu: "Brand" }
    }
];

const panelMenus = [
    {
        name: "Brand",
        title: "品牌信息",
        icon: "icon-brand",
        to: "Brand"
    }
];

export default {
    routes,
    panelMenus
};
