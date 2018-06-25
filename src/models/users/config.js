export const Users = r => require.ensure([], () => r(require("@/models/users")), "users");

const routes = [
    {
        name: "Users",
        title: "用户管理",
        path: "/users",
        component: Users,
        meta: { menu: "Users" }
    }
];

const panelMenus = [
    {
        name: "Users",
        title: "用户管理",
        icon: "icon-users",
        to: "Users"
    }
];

export default {
    routes,
    panelMenus
};
