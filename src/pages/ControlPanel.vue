<template>
    <Layout class="cev-layout">
        <transition name="pm-slide-left">
            <Sider id="sider" v-show="isShow" :class="siderClass">
                <div id="sider-menu-box" v-bar="{preventParentScroll: true}">
                    <Menu theme="light" width="200px" :open-names="matchedModel" :active-name="matchedPath" accordion @on-select="onMenuSelect">
                        <MenuItem :name="$pm.pages.SystemState.path">
                        <div class="sider-menu-icon">
                            <Icon type="ios-navigate"></Icon>
                        </div>
                        系统状态
                        </MenuItem>
                        <Submenu :name="$pm.pages.ApiList.modelName">
                            <template slot="title">
                                <div class="sider-menu-icon">
                                    <Icon type="ios-navigate"></Icon>
                                </div>
                                接口服务
                            </template>
                            <MenuItem :name="$pm.pages.ApiList.path">
                            <div class="sider-menu-icon">
                                <Icon type="ios-navigate"></Icon>
                            </div>
                            接口
                            </MenuItem>
                            <MenuItem :name="$pm.pages.ServiceList.path">
                            <div class="sider-menu-icon">
                                <Icon type="ios-navigate"></Icon>
                            </div>
                            服务
                            </MenuItem>
                            <MenuItem :name="$pm.pages.RedisGroupList.path">
                            <div class="sider-menu-icon">
                                <Icon type="ios-navigate"></Icon>
                            </div>
                            Redis
                            </MenuItem>
                        </Submenu>
                        <MenuItem :name="$pm.pages.AlarmList.path">
                        <div class="sider-menu-icon">
                            <Icon type="ios-navigate"></Icon>
                        </div>
                        警报
                        </MenuItem>
                    </Menu>
                </div>
            </Sider>
        </transition>
        <transition name="pm-fade">
            <Content id="control-panel-cav-box" v-show="isShow" class="transition-box">
                <transition :enter-class="tC.enter" :enter-active-class="tC.enterActive" :enter-to-class="tC.enterTo" :leave-class="tC.leave" :leave-active-class="tC.leaveActive" :leave-to-class="tC.leaveTo">
                    <router-view class="transition-view"></router-view>
                </transition>
                <transition name="pm-fade">
                    <div id="sider-bg" v-if="isOpenSider" @touchstart.prevent="closeSider" @mousedown.prevent="closeSider"></div>
                </transition>
                <div id="sider-btn" :class="siderBtnClass" @click="openSider">
                    <Icon type="navicon-round"></Icon>
                </div>
            </Content>
        </transition>
    </Layout>
</template>

<script>
var chridPath;
import { Card, Breadcrumb, BreadcrumbItem } from "iview";
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
            chridPath: undefined,
            isOpenSider: false
        };
    },
    computed: {
        siderClass: function () {
            return [this.isOpenSider ? "sider-open" : ""];
        },
        siderBtnClass: function () {
            return [this.isOpenSider ? "sider-btn-open" : ""];
        },
        matchedModel: function () {
            var page = this.$router.$pm.getPage(this.$route, 2);
            return page && page.modelName ? [page.modelName] : [];
        },
        matchedPath: function () {
            return this.$route.matched.length > 1
                ? this.$route.matched[1].path
                : "";
        }
    },
    watch: {
        $route(to, from) {
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
        $pm.getPage(to, 1).overridePageAnimation({
            openEnter: { name: "pm-none-enter", active: "t-bottom" },
            openLeave: { name: "pm-fade-leave", active: "t-top" }
        });
        if (!chridPath || chridPath == to.path) {
            next();
        } else {
            next({
                path: chridPath,
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
        onMenuSelect(path) {
            this.closeSider();
            chridPath = path;
            this.$router.replace(path);
        },
        openSider() {
            this.isOpenSider = true;
        },
        closeSider() {
            this.isOpenSider = false;
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

    .sider-menu-icon {
        text-align: center;
        width: 50px;
        height: 50px;
        margin-right: 0px;
        display: inline-block;
    }

    #sider-btn {
        width: 40px;
        height: 40px;
        background: rgba(91, 98, 112, 0.6);
        text-align: center;
        line-height: 40px;
        color: white;
        font-size: 18px;
        border-radius: 3px;
        display: none;
    }

    #sider-btn i {
        transition: transform 0.4s;
        transform: rotate(-90deg);
    }

    #sider-btn.sider-btn-open i {
        transform: rotate(0deg);
    }

    #sider-bg {
        display: none;
        background: rgba(0, 0, 0, 0.5);
    }

    #sider .ivu-menu .ivu-menu-submenu .ivu-menu-item {
        padding-left: 0px !important;
        transition: background, color, padding-left 0.4s, 0.4s, 0.4s;
    }

    @media screen and (min-width: 769px) {
        #sider:hover {
            width: 200px !important;
        }

        #sider:hover .ivu-menu .ivu-menu-submenu .ivu-menu-item {
            padding-left: 16px !important;
        }
    }
    @media screen and (max-width: 768px) {
        #sider {
            width: 0px !important;
        }

        #sider.sider-open {
            width: 200px !important;
        }

        #sider .ivu-menu .ivu-menu-submenu .ivu-menu-item {
            padding-left: 16px !important;
        }

        #control-panel-cav-box {
            position: relative;
            width: 100%;
            flex: none;
        }

        #sider-btn {
            z-index: 3;
            bottom: 10px;
            left: 10px;
            position: absolute;
            display: block;
        }

        #sider-bg {
            display: block;
            width: 100%;
            height: 100%;
            position: fixed;
            z-index: 9;
        }
    }
</style>
