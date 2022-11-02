cc.Class({
    extends: cc.Component,

    properties: {

    },

    // onLoad () {},

    start() {
        if (!window.BCNetWork) {
            window.BCNetWork = require("BCNetWork");
            window.BCNetWork.netWorkInit_Function();
        }
    },

});
