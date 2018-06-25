<template>
    <Layout class="cev-layout">
        <transition name="pm-slide-left">
            <Sider id="sider" v-show="isShow" :class="{'sider-hover':isEnterSider}">
                <div id="sider-menu-box" v-bar="{preventParentScroll: true}" @mouseenter="enterSider" @mouseleave="leaveSider">
                    <Menu theme="light" width="200px" :open-names="matchedModel" :active-name="matchedRoute" accordion @on-select="onMenuSelect">
                        <template v-for="item in menuList">
                            <Submenu v-if="item.childs" :name="item.modelName||''" :key="item.name">
                                <template slot="title">
                                    <i :class="['icon' ,'iconfont', item.icon]" />{{ item.title }}
                                </template>
                                <MenuItem v-for="sitem in item.childs" :name="sitem.name" :key="sitem.name">
                                <i :class="['icon' ,'iconfont', sitem.icon]" />{{ sitem.title }}
                                </MenuItem>
                            </Submenu>
                            <MenuItem v-else :name="item.name" :key="item.name">
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
            isEnterSider: false,
            menuList: [
                {
                    title: "品牌信息",
                    name: $pm.pages.Brand.name,
                    icon: "icon-brand"
                },
                {
                    title: "用户管理",
                    name: $pm.pages.Users.name,
                    icon: "icon-users"
                },
                {
                    title: "访客统计",
                    name: $pm.pages.Visit.name,
                    icon: "icon-visitlog"
                },
                {
                    title: "营销模块",
                    icon: "icon-sales",
                    childs: [
                        {
                            title: "抽签活动",
                            name: $pm.pages.Draw.name,
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
        matchedRoute: function() {
            return this.$route.matched.length > 1 ? this.$route.matched[1].name : "";
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
        // router.$pm.getPage(to, 1).overridePageAnimation({
        //     openEnter: { name: "pm-none-enter", active: "t-bottom" },
        //     openLeave: { name: "pm-fade-leave", active: "t-top" }
        // });
        if (!chridPath || chridPath == to.name) {
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
