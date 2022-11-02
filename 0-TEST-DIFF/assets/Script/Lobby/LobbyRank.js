cc.Class({
    extends: cc.Component,

    properties: {
        rankScroll: cc.ScrollView,
        rankPrefab: cc.Prefab
    },

    onLoad() {
        this.playerInfo = require("PlayerInfo").getInstant;
        this.netWork = require("LobbyNetWork");
    },

    start() {

    },

    updateCoinPanel(data) {
        this.data = data;
        console.log(data);
        this.rankScroll.content.removeAllChildren();
        for (let i = 0; i < data.length; i++) {
            let newNode = cc.instantiate(this.rankPrefab);
            this.rankScroll.content.addChild(newNode);
            newNode.getComponent("paihangbg").setView(data[i], i, 1);
        }
    },
    updateDiamondPanel(data) {
        this.data = data;
        this.rankScroll.content.removeAllChildren();
        for (let i = 0; i < data.length; i++) {
            let newNode = cc.instantiate(this.rankPrefab);
            this.rankScroll.content.addChild(newNode);
            newNode.getComponent("paihangbg").setView(data[i], i, 2);
        }
    },
    //查询金币排行
    selectCoinRank() {
        this.netWork.socket.emit("getCoinRank");
    },
    //查询钻石排行
    selectDiamondRank() {
        this.netWork.socket.emit("getDiamondRank");
    },
});
