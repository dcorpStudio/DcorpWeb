cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.netWork = require("LobbyNetWork");
        this.lobbyMain = cc.find('Canvas').getComponent("LobbyMain");
        this.playerInfo = require("PlayerInfo").getInstant;
    },

    start() {

    },
    //打开充值面板
    openMallPanel() {
        this.node.active = false;
        this.lobbyMain.bg_Black.active = true;
        this.lobbyMain.com_Mall.active = true;
        this.lobbyMain.changeMallUI(0);
        cc.find('com_chongzhi_01/lb_PlayerId',this.lobbyMain.com_Mall).getComponent("cc.Label").string = "ID: " + this.playerInfo.playerId;;
    },
    //关闭当前面板
    closePanel() {
        this.node.active = false;
    },
});
