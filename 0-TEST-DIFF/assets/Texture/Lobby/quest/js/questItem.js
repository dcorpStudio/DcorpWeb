cc.Class({
    extends: cc.Component,

    properties: {
        lingqu_btn: cc.Button,
        taskPro: cc.ProgressBar,
        taskProLab: cc.Label,
    },

    onLoad() {
        this.netWork = require("LobbyNetWork");
    },

    start() {

    },

    setView(data) {
        this.data = data;
        this.lingqu_btn.node.active = data.isLingQu != 2;
        this.lingqu_btn.interactable = data.isLingQu == 1;
        this.taskPro.progress = (data.isLingQu - 1) / 1;
        this.taskProLab.string = (data.isLingQu - 1) + "/1";
    },

    lingquClick() {
        this.netWork.socket.emit("getEveryLogin");
    }
});
