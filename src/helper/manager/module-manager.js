class ModuleManager {
    addModule(...modules) {
        if (modules) {
            for (let i = 0, n = modules.length; i < n; i++) {
                let e = modules[i];
                if (e.routes && e.routes.length > 0) {
                    this.routes.splice(this.routes.length, 0, ...e.routes);
                }
                if (e.panelMenus && e.panelMenus.length > 0) {
                    this.panelMenusSrc.splice(this.panelMenusSrc.length, 0, ...e.panelMenus);
                }
            }
        }
        return this;
    }

    get routes() {
        this._routes || (this._routes = new Array());
        return this._routes;
    }

    get panelMenusSrc() {
        this._panelMenusSrc || (this._panelMenusSrc = new Array());
        return this._panelMenusSrc;
    }
    get panelMenus() {
        if (!this._panelMenus && this.panelMenusSrc && this.panelMenusSrc.length > 0) {
            this._panelMenus || (this._panelMenus = new Array());
            let groups = {};
            for (let i = 0, n = this.panelMenusSrc.length; i < n; i++) {
                let e = this.panelMenusSrc[i];
                if (e.isGroup) {
                    if (!groups[e.name]) {
                        groups[e.name] = e;
                        this._panelMenus.push(e);
                    } else {
                        let group = groups[e.name];
                        Object.assign(group, e);
                    }
                } else if (e.group) {
                    let group;
                    if (!groups[e.group]) {
                        group = {
                            name: e.group
                        };
                        groups[e.group] = group;
                        this._panelMenus.push(group);
                    } else {
                        group = groups[e.group];
                    }
                    group.childs || (group.childs = new Array());
                    group.childs.push(e);
                } else {
                    this._panelMenus.push(e);
                }
            }
        }
        return this._panelMenus;
    }
}

export default ModuleManager;
