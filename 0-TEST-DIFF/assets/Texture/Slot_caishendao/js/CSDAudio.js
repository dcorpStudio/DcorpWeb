cc.Class({
    extends: cc.Component,

    properties: {
        bgmAudio: {
            type: cc.AudioClip,
            default: [],
        },

        stopWheel: {
            type: cc.AudioClip,
            default: null,
        },

        closeDoor: {
            type: cc.AudioClip,
            default: null,
        },

        showCS: {
            type: cc.AudioClip,
            default: null,
        },

        freeAudio: {
            type: cc.AudioClip,
            default: null,
        },

        bigWinEf: {
            type: cc.AudioClip,
            default: null,
        }
    },

    onLoad() {
        this.pInfo = require("PlayerInfo").getInstant;
    },

    start() {
        // cc.audioEngine.stopAll();
        // this.playBgm(0);
    },

    stopAudio(){
        cc.audioEngine.stopAll();
    },

    playBgm(id) {
        if (this.pInfo.musicControl == 0) {
            return;
        }
        cc.audioEngine.stopMusic();
        cc.audioEngine.playMusic(this.bgmAudio[id], true);
    },

    playStopWheel() {
        this.playEf(this.stopWheel);
    },

    playCloseDoor() {
        this.playEf(this.closeDoor);
    },

    playCs() {
        this.playEf(this.showCS);
    },

    playFree() {
        this.playEf(this.freeAudio);
    },

    playBW(){
        this.playEf(this.bigWinEf);
    },

    playEf(clip) {
        if (this.pInfo.soundEffectControl == 0) {
            return;
        }
        cc.audioEngine.playEffect(clip);
    }
})