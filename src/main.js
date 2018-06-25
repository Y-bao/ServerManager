import Vue from "vue";
import App from "./App";
import router from "./plugins/router";
import "./plugins/easy-bar";
import "./plugins/iview";

import "./assets/css/main.css";
import "./assets/css/anim.css";
import "./assets/css/over-iview.css";
import "./assets/font/iconfont.css";

import Promise from "bluebird";

Promise.config({
    warnings: false,
    cancellation: true
});
window.Bus = new Vue();

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


import  "./models/model-config";