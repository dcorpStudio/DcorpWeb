window.playBGM = function (para) {
    cc.find("audio").getComponent("audio").playBGM(para);
};
window.playEffect = function (para) {
    cc.find("audio").getComponent("audio").playEffect(para);
};
window.stopBGM = function () {
    cc.find("audio").getComponent("audio").stopBGM();
};
window.stopEffect = function () {
    cc.find("audio").getComponent("audio").stopEffect();
};

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    start() {
        if (this.setted != true) {
            this.setted = true;
            cc.game.addPersistRootNode(this.node);
        }
    },

    // update (dt) {},

    playBGM(para) {
        this.pInfo = require("PlayerInfo").getInstant;
        if (this.pInfo.musicControl == 0) {
            return;
        }
        this.play(para, true);

    },
    stopBGM() {
        cc.audioEngine.stopAll();
    },
    playEffect(para) {
        this.pInfo = require("PlayerInfo").getInstant;
        if (this.pInfo.soundEffectControl == 0)
            return;
        this.play(para, false);
    },
    stopEffect() {

    },

    play(para, loop) {
        if (loop) {
            window.cc.audioEngine.stopAll();
        }

        var node = window.cc.find('Canvas/audio_source');
        if (!node) return;
        var audio_source = node._components[0];
        if (!audio_source) return;
        if (!audio_source[para]) return;
        window.cc.audioEngine.play(audio_source[para], loop);
    }
});
