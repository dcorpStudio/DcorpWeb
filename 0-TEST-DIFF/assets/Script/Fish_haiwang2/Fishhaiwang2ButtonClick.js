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
        let instance = window.fish_ins;
        if (customEventData.indexOf('bet') == 0) {
            //
        } else if (customEventData.indexOf('bullet') == 0) {
            //
        } else {
            playEffect('Click');
        }

        switch (customEventData) {
            case "close":
                //var lobbyMainSocket = require('../Lobby/LobbyNetWork').socket;
                var ins = require("Fishhaiwang2NetWork").getInstant;
                if (ins.fishSocket) {
                    ins.fishSocket.disconnect();
                } else {
                    cc.director.loadScene(window.hallName);
                }
                break;
            case "exit":
                cc.find("Canvas/exitPanel").active = true;
                break;
            case "closeExit":
                cc.find("Canvas/exitPanel").active = false;
                break;
            case "left_switch":
                instance.switch_left();
                break;
            case "info":
                instance.node.getChildByName("help").active = true;
                break;
            case "closeinfo":
                instance.node.getChildByName("help").active = false;
                break;
            case "setting":
                cc.find("Canvas/settingPanel").active = true;
                break;
            case "closeSetting":
                cc.find("Canvas/settingPanel").active = false;
                break;
            case "setMusic":
                instance.setMusic();
                break;
            case "setSound":
                instance.setSound();
                break;
            case "skill_0":
                instance.cast_skill(1);
                break;
            case "skill_1":
                instance.cast_skill(2);
                break;
            case "bulletup":
                instance.bullet_change(1);
                playEffect('bullet_down');
                break;
            case "bullet_down":
                instance.bullet_change(-1);
                playEffect('bullet_up');
                break;
        }

    },

    onToggleClick(toggle, customEventData) {
        let instance = window.fish_ins;
        toggle.target.active = !toggle.isChecked;
        if (customEventData == "AutoShot") {
            instance.setAutoShot(toggle.isChecked);
        }
    }

});
