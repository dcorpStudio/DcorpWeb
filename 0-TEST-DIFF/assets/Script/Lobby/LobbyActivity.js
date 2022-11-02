cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.netWork = require("LobbyNetWork");
    },

    start() {

    },
    //关闭当前面板
    closePanel() {
        this.node.active = false;
    },
});
