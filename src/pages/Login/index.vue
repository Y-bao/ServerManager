<template>
    <Layout class="cev-layout login-layout">
        <p class="login-title">LOGIN</p>
        <Card class="login-card">
            <Layout class="login-box">
                <Input size="large" placeholder="账号" clearable :maxlength="16"></Input>
                <Input type="password" size="large" placeholder="密码" clearable :maxlength="16"></Input>
                <Button size="large" @click="login">登陆</Button>
            </Layout>
        </Card>
    </Layout>
</template>
<script>
import LM from "../../helper/manager/login-manager";
export default {
    name: "Login",
    data() {
        return {};
    },
    beforeRouteEnter: (to, from, next) => {
        $pm.overridePageAnimation({
            openEnter: { name: "pm-st-enter", active: "t-top" },
            openLeave: { name: "pm-fade-leave", active: "t-bottom" }
        });
        next();
    },
    methods: {
        login() {
            LM.login().then(() => {
                $pm.overridePageAnimation({
                    openEnter: { name: "pm-none-enter", active: "t-bottom" },
                    openLeave: { name: "pm-st-leave", active: "t-top" }
                });
                this.$router.push("/");
            });
        }
    }
};
</script>

<style scoped>
    .login-layout {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-bottom: 200px;
    }
    .login-title {
        font-size: 60px;
    }
    .login-card {
        margin-top: 40px;
    }
    .login-box {
        padding: 10px 30px;
        box-sizing: content-box;
        width: 300px;
        background: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .login-box > * {
        margin-top: 10px;
        width: 100%;
    }
</style>
