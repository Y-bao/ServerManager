<template>
    <Layout class="cev-layout">
        <Header class="main-layout-header">
            <a class="main-logo">ServerManager</a>
            <template v-if="isLogin">
                <div class="main-shortcut">
                    <i class="btn iconfont icon-search"/>
                    <input class="input" />
                </div>
                <Menu ref="mainMenu" class="main-menu" mode="horizontal" :active-name="matchedPath" @on-select="onMenuSelect">
                    <MenuItem :name="$pm.pages.ControlPanel.path" class="main-menu-item">
                    <i class="iconfont icon-panel" /> 控制面板
                    </MenuItem>
                    <MenuItem :name="$pm.pages.Settings.path" class="main-menu-item">
                    <i class="iconfont icon-settings" /> 设置
                    </MenuItem>
                    <MenuItem :name="$pm.pages.About.path" class="main-menu-item">
                    <i class="iconfont icon-about" /> 关于
                    </MenuItem>
                    <MenuItem name="Exit" class="main-menu-item">
                    <i class="iconfont icon-exit" /> 退出
                    </MenuItem>
                </Menu>
                <div :class="menuBtnClass" @click="openAndCloseMenu">
                    <Icon type="navicon-round"></Icon>
                </div>
                <transition name="pm-fade">
                    <div v-if="isOpenMenu" class="main-menu-bg" @touchstart.prevent="closeMenu" @mousedown.prevent="closeMenu"></div>
                </transition>
            </template>
        </Header>
        <Content class="transition-box">
            <transition :enter-class="tC.enter" :enter-active-class="tC.enterActive" :enter-to-class="tC.enterTo" :leave-class="tC.leave" :leave-active-class="tC.leaveActive" :leave-to-class="tC.leaveTo">
                <!-- <keep-alive> -->
                <router-view class="transition-view"></router-view>
                <!-- </keep-alive> -->
            </transition>
        </Content>
        <Footer class="main-layout-footer">2018-2022 &copy; INNOVITION</Footer>
    </Layout>
</template>

<script>
import { Button, Input } from "iview";
import LM from "./helper/manager/login-manager";
export default {
    name: "App",
    components: {
        Button,
        Input
    },
    data() {
        return {
            isOpenMenu: false,
            tC: {}
        };
    },
    computed: {
        menuBtnClass: function() {
            return ["main-menu-btn", this.isOpenMenu ? "main-menu-btn-open" : ""];
        },
        matchedPath: function() {
            return this.$route.matched[0] != null ? this.$route.matched[0].path : "";
        },
        isLogin() {
            return LM.isLogin;
        }
    },
    watch: {
        $route(to, from) {
            this.$pm.setTransitionClass(
                to,
                from,
                1,
                function(e) {
                    this.tC = e;
                }.bind(this)
            );
        }
    },
    methods: {
        onMenuSelect(name) {
            if (this.matchedPath == name) {
                return;
            }
            this.closeMenu();
            if (name == "Exit") {
                LM.logout().then(() => {
                    this.$router.push(this.$pm.pages.Login.path);
                });
                return;
            }
            this.$router.replace(name);
        },
        openMenu() {
            this.isOpenMenu = true;
            var el = this.$refs.mainMenu.$el;
            var startHeught = getComputedStyle(el).height;
            el.style.setProperty("--max-height", "auto");
            var endHeight = getComputedStyle(el).height;
            el.style.setProperty("--max-height", startHeught);
            this._menuHeight = el.offsetHeight;
            el.style.setProperty("--max-height", endHeight);
        },
        closeMenu() {
            this.isOpenMenu = false;
            var el = this.$refs.mainMenu.$el;
            el.style.setProperty("--max-height", "0px");
        },
        openAndCloseMenu() {
            this.isOpenMenu ? this.closeMenu() : this.openMenu();
        }
    }
};
</script>

<style scoped>
.main-layout-header {
    padding: 0, 0;
    padding-left: 10px;
    padding-right: 10px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    z-index: 91;
    background: #282c34;
}

.main-layout-footer {
    border-top: solid 1px #cccccc;
    padding: 2px 10px;
    text-align: center;
    z-index: 90;
}

.main-logo {
    padding: 0, 0;
    padding-left: 20px;
    padding-right: 20px;
    height: 40px;
    line-height: 40px;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border-radius: 3px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    float: left;
}
.main-shortcut {
    display: inline-block;
    box-sizing: border-box;
    display: flex;
    height: 40px;
    line-height: 40px;
    color: #fff;
}
.main-shortcut .input {
    display: inline-block;
    padding: 0 8px;
    background: none;
    border: none;
    border-bottom: solid #fff 1px;
    width: 200px;
    color: #fff;
}
.main-menu {
    height: 100%;
    float: right;
    margin-right: 20px;
}
.main-menu-btn {
    text-align: center;
    color: white;
    font-size: 18px;
    float: right;
    display: none;
    width: 50px;
    height: 50px;
}

.main-menu-btn i {
    transition: transform 0.4s;
}

.main-menu-btn-open {
    background: rgba(255, 255, 255, 0.1);
}

.main-menu-btn-open i {
    transform: rotate(90deg);
}

.main-menu-bg {
    display: none;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    top: 50px;
    position: fixed;
    z-index: 91;
}

@media screen and (max-width: 768px) {
    .main-layout-header {
        padding-left: 0px;
        padding-right: 0px;
        height: 50px;
        line-height: 50px;
    }
    .main-logo {
        padding: 0, 0;
        padding-left: 0px;
        margin-left: 10px;
        padding-right: 0px;
        background: none;
        color: white;
        border-radius: 3px;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        font-size: 16px;
        float: left;
    }
    .main-menu-btn {
        display: block;
    }
    .main-menu {
        --max-height: 0px;
        overflow: hidden;
        top: 50px;
        position: fixed;
        width: 100%;
        height: auto;
        max-height: var(--max-height);
        display: block;
        background: #282c34;
        transition: max-height 0.4s;
        z-index: 92;
    }

    .main-menu .main-menu-item {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: left;
        display: block;
    }
    .main-menu-bg {
        display: block;
    }
}
</style>
