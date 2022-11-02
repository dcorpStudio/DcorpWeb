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

    getEveryLoginPrice(data) {
        this.setView(data);
    },

    updatePanel(data) {
        this.setView(data);
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
    },

    //通用关闭界面
    onBtnClick_closePanel(event) {
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        event.target.parent.active = false;
    },
});
