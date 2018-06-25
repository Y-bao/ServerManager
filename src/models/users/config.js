export const Users = r => require.ensure([], () => r(require("@/models/users")), "users");

const routes = [{
    name: "Users",
    title: "用户管理",
    path: "/users",
    component: Users
}];

const panelMenus = [{
    title: "用户管理",
    icon: "icon-users"
}];

export default {
    routes,
    panelMenus
};
