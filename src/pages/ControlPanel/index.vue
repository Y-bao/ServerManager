<template>
    <Layout class="cev-layout">
        <transition name="pm-slide-left">
            <Sider id="sider" v-show="isShow" :class="{'sider-open':isOpenSider,'sider-hover':isEnterSider}">
                <div id="sider-menu-box" v-bar="{preventParentScroll: true}" @mouseenter="enterSider" @mouseleave="leaveSider">
                    <Menu theme="light" width="200px" :open-names="matchedModel" :active-name="matchedPath" accordion @on-select="onMenuSelect">
                        <template v-for="item in menuList">
                            <Submenu v-if="item.childs" :name="item.modelName" :key="item.path">
                                <template slot="title">
                                    <i :class="['icon' ,'iconfont', item.icon]" />{{ item.name }}
                                </template>
                                <MenuItem v-for="sitem in item.childs" :name="sitem.path" :key="sitem.path">
                                <i :class="['icon' ,'iconfont', sitem.icon]" />{{ sitem.name }}
                                </MenuItem>
                            </Submenu>
                            <MenuItem v-else :name="item.path" :key="item.path">
                            <i :class="['icon' ,'iconfont', item.icon]" :key="item.path" />{{ item.name }}
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
                <transition name="pm-fade">
                    <div id="sider-bg" v-if="isOpenSider" @touchstart.prevent="closeSider" @mousedown.prevent="closeSider"></div>
                </transition>
                <div id="sider-btn" :class="{'sider-btn-open':isOpenSider}" @click="openSider">
                    <Icon type="navicon-round"></Icon>
                </div>
            </Content>
        </transition>
    </Layout>
</template>

<script>
var chridPath;
import { Card, Breadcrumb, BreadcrumbItem } from "iview";
import Promise from "bluebird";

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
            chridPath: null,
            isOpenSider: false,
            isEnterSider: false,
            menuList: [
                {
                    name: "品牌信息",
                    path: $pm.pages.Brand.path,
                    icon: "icon-brand"
                },
                {
                    name: "用户管理",
                    path: $pm.pages.Users.path,
                    icon: "icon-users"
                },
                {
                    name: "访客统计",
                    path: $pm.pages.Visit.path,
                    icon: "icon-users"
                },
                {
                    name: "营销模块",
                    modelName: $pm.pages.Draw.modelName,
                    icon: "icon-sales",
                    childs: [
                        {
                            name: "抽签活动",
                            path: $pm.pages.Draw.path,
                            icon: "icon-draw"
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        matchedModel: function() {
            var page = this.$router.$pm.getPage(this.$route, 2);
            return page && page.modelName ? [page.modelName] : [];
        },
        matchedPath: function() {
            return this.$route.matched.length > 1 ? this.$route.matched[1].path : "";
        }
    },
    watch: {
        $route(to, from) {
            this.$pm.setTransitionClass(
                to,
                from,
                2,
                function(e) {
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

#sider-menu-box .ivu-menu .icon {
    text-align: center;
    width: 50px;
    height: 50px;
    font-size: 18px;
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
    #sider.sider-hover {
        width: 200px !important;
    }

    #sider.sider-hover .ivu-menu .ivu-menu-submenu .ivu-menu-item {
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
