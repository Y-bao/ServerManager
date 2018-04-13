import Vue from "vue";
import "iview/dist/styles/iview.css";
import {
    Layout,
    Header,
    Content,
    Footer,
    Sider,
    Submenu,
    Menu,
    MenuItem,
    Icon
} from "iview";

Vue.config.productionTip = false;

Vue.component("Layout", Layout);
Vue.component("Header", Header);
Vue.component("Content", Content);
Vue.component("Footer", Footer);
Vue.component("Sider", Sider);
Vue.component("Submenu", Submenu);
Vue.component("Menu", Menu);
Vue.component("MenuItem", MenuItem);
Vue.component("Icon", Icon);
