// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from "vue";
Vue.directive("focus", {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function(el) {
        // 聚焦元素
        el.focus();
    }
});
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
