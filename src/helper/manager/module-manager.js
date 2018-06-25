class ModuleManager {
    addModule(...modules) {
        if (modules) {
            modules.forEach(e => {
                if (e.routes && e.routes.length > 0) {
                    this.routes.splice(this.routes.length, 0, ...e.routes);
                }
                if (e.panelMenus && e.panelMenus.length > 0) {
                    this.panelMenus.splice(this.panelMenus.length, 0, ...e.panelMenus);
                }
            });
        }
        return this;
    }

    get routes() {
        this._routes || (this._routes = new Array());
        return this._routes;
    }

    get panelMenus() {
        this._panelMenus || (this._panelMenus = new Array());
        return this._panelMenus;
    }
}

export default ModuleManager;
