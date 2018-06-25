export const Brand = r => require.ensure([], () => r(require("@/models/brand")), "brand");

const routes = [{
    name: "Brand",
    title: "品牌信息",
    path: "/brand",
    component: Brand
}];

const panelMenus = [{
    title: "品牌信息",
    icon: "icon-brand"
}];

export default {
    routes,
    panelMenus
};
