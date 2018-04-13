export const ControlPanel = r =>
    require.ensure([], () => r(require("@/pages/ControlPanel")), "Main");
export const HostList = r =>
    require.ensure(
        [],
        () => r(require("@/pages/ControlPanel/System/SystemState")),
        "System"
    );
export const ServiceList = r =>
    require.ensure(
        [],
        () => r(require("@/pages/ControlPanel/Service/ServiceList")),
        "Service"
    );
export const RedisGroupList = r =>
    require.ensure(
        [],
        () => r(require("@/pages/ControlPanel/Redis/RedisGroupList")),
        "Redis"
    );
export const ApiList = r =>
    require.ensure(
        [],
        () => r(require("@/pages/ControlPanel/Api/ApiList")),
        "Api"
    );
export const AlarmList = r =>
    require.ensure(
        [],
        () => r(require("@/pages/ControlPanel/Alarm/AlarmList")),
        "Alarm"
    );
export const Settings = r =>
    require.ensure([], () => r(require("@/pages/Settings")), "UtilsMenu");
export const About = r =>
    require.ensure([], () => r(require("@/pages/About")), "UtilsMenu");
