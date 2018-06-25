import ModuleManager from "../helper/manager/module-manager";

import brand from "./brand/config";
import users from "./users/config";
import visit from "./visit/config";
import sales from "./sales/config";
import draw from "./sales/draw/config";

const moduleManager = new ModuleManager();

moduleManager
    .addModule(brand)
    .addModule(users)
    .addModule(visit)
    .addModule(sales)
    .addModule(draw);
console.log(moduleManager.panelMenus);
export default moduleManager;
