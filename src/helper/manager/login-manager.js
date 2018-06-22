import Vue from "vue";
import Vuex from "vuex";
import Promise from "bluebird";

Vue.use(Vuex);
const LoginEventKey = "LoginStateChange";

class LoginManager {
    static getInstance() {
        if (!LoginManager.instance) {
            LoginManager.instance = new LoginManager();
        }
        return LoginManager.instance;
    }
    constructor() {
        this._store = new Vuex.Store({
            state: {
                isLogin: false
            },
            mutations: {
                [LoginEventKey](state, isLogin) {
                    state.isLogin = isLogin;
                }
            }
        });
    }

    get store() {
        return this._store;
    }

    get isLogin() {
        return this.store.state.isLogin;
    }

    login() {
        this.i = 1;
        return new Promise((rs) => {
            this.store.commit(LoginEventKey, true);
            rs();
        });
    }

    logout() {
        this.i = 0;
        return new Promise((rs) => {
            this.store.commit(LoginEventKey, false);
            rs();
        });
    }

}
export default LoginManager.getInstance();
