cc.Class({
    extends: cc.Component,

    properties: {
        gameList_node: cc.Node,
        table_node: cc.Node,
        tablePreb: cc.Prefab,
        tableScroll: cc.ScrollView,
    },

    onLoad() {
        this.netWork = require("LobbyNetWork");
        this.lobbyMain = cc.find('Canvas').getComponent("LobbyMain");
        this.playerInfo = require("PlayerInfo").getInstant;
        this.gameList_node.active = true;
        this.table_node.active = false;
    },

    start() {

    },

    /**
     * 点击进入捕鱼贵宾厅
     */
    fishRoom_tableButtonClick_Function() {
        this.tempNetWork = require("FishNetWork_t").getInstant;
        this.tempNetWork.setLobbyMainObj_Function(this.lobbyMain);
        this.getRoomInfo(Lhjconfig.Server_IP + ":13102/getRoom");
    },

    getRoomInfo(u) {
        let xhr = new XMLHttpRequest();
        let self = this;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let response = xhr.response;
                if (null !== xhr.response !== null) {
                    try {
                        response = JSON.parse(response);
                    }
                    catch (errot) {
                        cc.log("JSON wrong");
                    }
                    cc.log(response);
                    self.setVipTable(response.tableList);
                }
            }
        };
        xhr.open("get", u);
        xhr.send();
    },

    setVipTable(data) {
        this.table_node.active = true;
        this.gameList_node.active = false;
        this.tableScroll.content.removeAllChildren();
        for (let i = 0; i < data.length; i++) {
            let newNode = cc.instantiate(this.tablePreb);
            newNode.getComponent("TablePreb").setView(data[i], i);
            this.tableScroll.content.addChild(newNode);
        }
    },

    close_panel() {
        if (this.table_node.active) {
            this.gameList_node.active = true;
            this.table_node.active = false;
            // this.tempNetWork.fishSocket.disconnect();
        } else {
            this.node.active = false;
        }
    }
});
