cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {}
    onClick(event, customEventData) {
        let instance = window.baijialeQZ_ins;
        if (customEventData.indexOf('bet') == 0) {
            //
        } else if (customEventData.indexOf('tobet_') == 0) {
            //
        } else {
            playEffect('Click');
        }

        if (customEventData == "close") {
            //var lobbyMainSocket = require('../Lobby/LobbyNetWork').socket;
            instance.network.LandlordsSocket.disconnect();
            cc.director.loadScene(window.hallName);
        } else if (customEventData == "sound") {

        } else if (customEventData == "help") {
            instance.helpNode.active = true;
        } else if (customEventData == "online") {
            instance.node.getChildByName("com_online").active = true;
            instance.network.LandlordsSocket.emit('getOnline');
        } else if (customEventData == "record") {
            instance.recordNode.active = true;
        } else if (customEventData == "bet1") {
            instance.selbet(1 * 100);
        } else if (customEventData == "bet5") {
            instance.selbet(5 * 100);
        } else if (customEventData == "bet10") {
            instance.selbet(10 * 100);
        } else if (customEventData == "bet50") {
            instance.selbet(50 * 100);
        } else if (customEventData == "bet100") {
            instance.selbet(100 * 100);
        } else if (customEventData == "bet500") {
            instance.selbet(500 * 100);
        } else if (customEventData == "tobet_0") {
            instance.bet(0, event.touch._point);
        } else if (customEventData == "tobet_1") {
            instance.bet(1, event.touch._point);
        } else if (customEventData == "tobet_2") {
            instance.bet(2, event.touch._point);
        } else if (customEventData == "tobet_3") {
            instance.bet(3, event.touch._point);
        } else if (customEventData == "tobet_4") {
            instance.bet(4, event.touch._point);
        } else if (customEventData == "closeResult") {
            instance.com_result.active = false;
        } else if (customEventData == "up") {
            instance.network.LandlordsSocket.emit('upZhuang', JSON.stringify({ coin: parseInt(instance.bankerCoin_lab.string) * 100 }));
        } else if (customEventData == "openUp") {
            instance.bankerNode.active = true;
        }else if (customEventData == "down") {
            instance.network.LandlordsSocket.emit('downZhuang');
        }
    },

    SliderCallback(slider, customEventData) {
        let instance = window.baijialeQZ_ins;
        if (instance.table_userinfo[0].score > 50000) {
            instance.bankerCoin_lab.string = parseInt(Helper.fixNum(50000 + slider.progress * (instance.table_userinfo[0].score - 50000)));
        } else {
            instance.bankerCoin_lab.string = "500";
        }

    }
});
