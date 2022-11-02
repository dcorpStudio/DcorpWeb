cc.Class({
    extends: cc.Component,

    properties: {
        bgmAudio: {
            type: cc.AudioClip,
            default: [],
        },

        startWheel: {
            type: cc.AudioClip,
            default: null,
            displayName: '开始旋转',
        },

        stopWheel: {
            type: cc.AudioClip,
            default: null,
            displayName: '停止旋转',
        },

        buttonEf: {
            type: cc.AudioClip,
            default: null,
            displayName: '按键音',
        },

        WinEf: {
            type: cc.AudioClip,
            default: null,
            displayName: '中奖',
        },

        bigWinEf: {
            type: cc.AudioClip,
            default: null,
            displayName: '大奖',
        },

        winLineEf: {
            type: cc.AudioClip,
            default: null,
            displayName: '中奖每条线',
        },

        boomEf: {
            type: cc.AudioClip,
            default: null,
            displayName: '炸弹',
        },


    },

    onLoad() {
        this.pInfo = require("PlayerInfo").getInstant;
    },

    start() {
        // cc.audioEngine.stopAll();
        // this.playBgm(0);
    },

    stopAudio() {
        cc.audioEngine.stopAll();
    },

    playBgm(id) {
        if (this.pInfo.musicControl == 0) {
            return;
        }
        cc.audioEngine.stopMusic();
        cc.audioEngine.playMusic(this.bgmAudio[id], true);
    },

    playStartWheel() {
        this.playEf(this.startWheel);
    },

    playStopWheel() {
        this.playEf(this.stopWheel);
    },

    playClick() {
        this.playEf(this.buttonEf);
    },

    playWin() {
        this.playEf(this.WinEf);
    },

    playBW() {
        this.playEf(this.bigWinEf);
    },

    playWinLine() {
        this.playEf(this.winLineEf);
    },

    playBoom() {
        this.playEf(this.boomEf);
    },

    playEf(clip) {
        if (this.pInfo.soundEffectControl == 0) {
            return;
        }
        cc.audioEngine.playEffect(clip);
    },
})