// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import "./config/iview-config.js";
import EasyBar from "easy-bar";

import "./assets/css/main.css";
import "./assets/css/anim.css";
import "./assets/css/over-iview.css";

Vue.use(EasyBar);

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    components: {
        App
    },
    template: "<App/>"
});
