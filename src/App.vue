<template>
    <Layout class="layout">
        <Header class="main-layout-header">
            <a class="main-logo">INNOVATION</a>
            <template v-if="isLogin">
                <div class="main-shortcut">
                    <input ref="inputShortcut" @blur="change(false)" @focus="change(true)" :class="['input' ,{'focus':focus}]" />
                    <i class="btn iconfont icon-search" @click="onSearch" />
                </div>
                <Menu class="main-menu" mode="horizontal" :active-name="matchedRoute" @on-select="onMenuSelect">
                    <MenuItem :name="$pm.pages.ControlPanel.name" class="main-menu-item">
                    <i class="iconfont icon-panel" /> 控制面板
                    </MenuItem>
                    <MenuItem :name="$pm.pages.About.name" class="main-menu-item">
                    <i class="iconfont icon-about" /> 关于
                    </MenuItem>
                    <MenuItem name="Exit" class="main-menu-item">
                    <i class="iconfont icon-exit" /> 退出
                    </MenuItem>
                </Menu>
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
import LM from "./helper/manager/login-manager";
export default {
    name: "App",
    data() {
        return {
            tC: {},
            focus: false
        };
    },
    computed: {
        matchedRoute: function () {
            return this.$route.matched[0] != null ? this.$route.matched[0].name : "";
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
                function (e) {
                    this.tC = e;
                }.bind(this)
            );
        }
    },
    methods: {
        onSearch() {
            this.$refs.inputShortcut.focus();
        },
        change(focus) {
            this.focus = focus;
        },
        onMenuSelect(name) {
            if (this.matchedPath == name) {
                return;
            }
            if (name == "Exit") {
                LM.logout().then(() => {
                    this.$router.push(this.$pm.pages.Login.path);
                });
                return;
            }
            this.$router.replace(name);
        }
    }
};
</script>

<style scoped>
    .main-layout-header {
        display: flex;
        padding: 0, 0;
        padding-left: 10px;
        padding-right: 10px;
        box-sizing: border-box;
        height: 60px;
        background: #282c34;
        flex-direction: row;
        align-items: center;
    }

    .main-layout-footer {
        border-top: solid 1px #cccccc;
        padding: 2px 10px;
        text-align: center;
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
        font-size: 16px;
    }
    .main-shortcut {
        margin-left: 30px;
        display: flex;
        align-items: center;
        flex: 1 0;
        height: 40px;
        line-height: 40px;
        color: #fff;
    }
    .main-shortcut .input {
        background: none;
        border: none;
        border-bottom: solid #fff 1px;
        height: 30px;
        color: #fff;
        font-size: 14px;
        width: 0;
        padding: 0;
        transition: width 300ms;
    }
    .main-shortcut .input.focus {
        width: 200px;
        padding: 0 8px;
        margin-right: 10px;
    }
    .main-shortcut .btn {
        cursor: pointer;
        font-size: 18px;
    }
    .main-menu {
        height: 100%;
        margin-left: 30px;
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
</style>
