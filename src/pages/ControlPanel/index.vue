<template>
    <Layout class="cev-layout">
        <transition name="pm-slide-left">
            <Sider id="sider" v-show="isShow" :class="{'sider-hover':isEnterSider}">
                <div id="sider-menu-box" v-bar="{preventParentScroll: true}" @mouseenter="enterSider" @mouseleave="leaveSider">
                    <Menu theme="light" width="200px" :open-names="matchedModel" :active-name="matchedRoute" accordion @on-select="onMenuSelect">
                        <template v-for="item in menuList">
                            <Submenu v-if="item.isGroup" :name="item.name" :key="item.name">
                                <template slot="title">
                                    <i :class="['icon' ,'iconfont', item.icon]" />{{ item.title }}
                                </template>
                                <MenuItem v-for="sitem in item.childs" :name="sitem.to" :key="sitem.name">
                                <i :class="['icon' ,'iconfont', sitem.icon]" />{{ sitem.title }}
                                </MenuItem>
                            </Submenu>
                            <MenuItem v-else :name="item.to" :key="item.name">
                            <i :class="['icon' ,'iconfont', item.icon]" :key="item.name" />{{ item.title }}
                            </MenuItem>
                        </template>
                    </Menu>
                </div>
            </Sider>
        </transition>
        <transition name="pm-fade">
            <Content id="control-panel-cav-box" v-show="isShow" class="transition-box">
                <transition :enter-class="tC.enter" :enter-active-class="tC.enterActive" :enter-to-class="tC.enterTo" :leave-class="tC.leave" :leave-active-class="tC.leaveActive" :leave-to-class="tC.leaveTo">
                    <router-view class="transition-view"></router-view>
                </transition>
            </Content>
        </transition>
    </Layout>
</template>

<script>
let chridRoute;
import { Card, Breadcrumb, BreadcrumbItem } from "iview";
import Promise from "bluebird";
import Models from "../../models/model-config";


export default {
    name: "ControlPanel",
    components: {
        Card,
        Breadcrumb,
        BreadcrumbItem
    },
    data() {
        return {
            tC: {},
            isShow: false,
            isEnterSider: false
        };
    },
    computed: {
        matchedModel: function () {
            return this.$route.meta.menuGroup ? [this.$route.meta.menuGroup] : [];
        },
        matchedRoute: function () {
            return this.$route.meta.menu || "";
        },
        menuList: function () {
            return Models.panelMenus;
        }
    },
    watch: {
        $route(to, from) {
            chridRoute = to.name;
            this.$pm.setTransitionClass(
                to,
                from,
                2,
                function (e) {
                    this.tC = e;
                }.bind(this)
            );
        }
    },
    beforeRouteEnter: (to, from, next) => {
        // $pm.overridePageAnimation({
        //     openEnter: { name: "pm-none-enter", active: "t-bottom" },
        //     openLeave: { name: "pm-fade-leave", active: "t-top" }
        // });
        if (!chridRoute || chridRoute == to.name) {
            next();
        } else {
            next({
                path: chridRoute,
                query: {
                    _isReplace: true
                }
            });
        }
    },
    mounted() {
        if (!this.isShow) {
            this.isShow = true;
        }
    },
    activated() {
        if (!this.isShow) {
            this.isShow = true;
        }
    },
    deactivated() {
        if (this.isShow) {
            this.isShow = false;
        }
    },
    destroyed() {
        if (this.isShow) {
            this.isShow = false;
        }
    },
    methods: {
        onMenuSelect(name) {
            this.$router.replace(name);
        },
        enterSider() {
            if (this.lsp && this.lsp.isPending()) {
                this.lsp.cancel();
            }
            this.isEnterSider = true;
        },
        leaveSider() {
            if (this.lsp && this.lsp.isPending()) {
                this.lsp.cancel();
            }
            this.lsp = Promise.delay(200).then(() => {
                this.isEnterSider = false;
            });
        }
    }
};
</script>

<style scoped>
    #sider {
        min-height: 0;
        height: auto;
        overflow-x: hidden;
        width: 50px !important;
        min-width: 0px !important;
        max-width: 200px !important;
        flex: none !important;
        transition: all 0.4s;
        background: #282c34;
    }

    #sider-menu-box {
        width: 200px;
        height: 100%;
    }

    #sider-menu-box .ivu-menu {
        width: 100%;
    }

    #sider-menu-box .ivu-menu .icon {
        text-align: center;
        width: 50px;
        height: 50px;
        font-size: 18px;
        margin-right: 0px;
        display: inline-block;
    }

    #sider .ivu-menu .ivu-menu-submenu .ivu-menu-item {
        padding-left: 0px !important;
        transition: background, color, padding-left 0.4s, 0.4s, 0.4s;
    }

    #sider.sider-hover {
        width: 200px !important;
    }

    #sider.sider-hover .ivu-menu .ivu-menu-submenu .ivu-menu-item {
        padding-left: 16px !important;
    }
</style>
