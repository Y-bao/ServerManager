export const ControlPanel = r => require.ensure([], () => r(require("@/pages/ControlPanel")), "Main");
export const Login = r => require.ensure([], () => r(require("@/pages/Login")), "Login");
export const Brand = r => require.ensure([], () => r(require("@/pages/ControlPanel/Brand")), "Brand");
export const Users = r => require.ensure([], () => r(require("@/pages/ControlPanel/Users")), "Users");
export const Draw = r => require.ensure([], () => r(require("@/pages/ControlPanel/Sales/Draw")), "Draw");
export const Visit = r => require.ensure([], () => r(require("@/pages/Visit")), "Visit");
export const Settings = r => require.ensure([], () => r(require("@/pages/Settings")), "UtilsMenu");
export const About = r => require.ensure([], () => r(require("@/pages/About")), "UtilsMenu");
