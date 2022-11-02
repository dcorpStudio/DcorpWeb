
cc.Class({
    extends: cc.Component,

    properties: {
        playerList: [cc.Node],
        id_lab: cc.Label,
    },

    onLoad() {
        this.tempNetWork = require("FishNetWork_t").getInstant;
        this.playerInfo = require("PlayerInfo").getInstant;
    },

    start() {

    },

    setView(data, index) {
        this.id_lab.string = "Table" + (index + 1);
        this.pNum = 0;
        for (let i = 0; i < this.playerList.length; i++) {
            if (data[i]) {
                this.playerList[i].active = true;
                this.pNum += 1;
            }
        }
        this.idx = index;
    },

    tableClick() {
        if (this.pNum >= 4) {
            return;
        }
        this.tempNetWork.loginGame_Function(Lhjconfig.Server_IP, "13102", this.playerInfo.playerId, this.playerInfo.gameSign, this.idx);
    }

});
