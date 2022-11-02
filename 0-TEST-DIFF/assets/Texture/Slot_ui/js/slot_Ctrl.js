cc.Class({
    extends: cc.Component,

    properties: {
        Btn_start: {
            default: null,
            type: cc.Node,
            displayName: '开始按钮',
        },
        Btn_stop: {
            default: null,
            type: cc.Node,
            displayName: '停止按钮',
        },
        Btn_stopAuto: {
            default: null,
            type: cc.Node,
            displayName: '自动次数按钮',
        },
        Btn_Max: {
            default: null,
            type: cc.Node,
            displayName: '最大下注按钮',
        },
        Btn_free: {
            default: null,
            type: cc.Node,
            displayName: '免费按钮',
        },
        Auto_panel: {
            default: null,
            type: cc.Node,
            displayName: '自动面板',
        },
        Setting_panel: {
            default: null,
            type: cc.Node,
            displayName: '设置面板',
        },
        Sound_panel: {
            default: null,
            type: cc.Node,
            displayName: '声音面板',
        },
        MaxCoin_bg: {
            default: null,
            type: cc.Node,
            displayName: '最大值背景',
        },
        NonMaxCoin_bg: {
            default: null,
            type: cc.Node,
            displayName: '非最大值背景',
        },
        spUserFace: {
            default: null,
            type: cc.Sprite,
            displayName: '用户头像',
        },
        lblUserName: {
            default: null,
            type: cc.Label,
            displayName: '用户名',
        },
        lblUserCoin: {
            default: null,
            type: cc.Label,
            displayName: '用户金币',
        },
        lblLines: {
            default: null,
            type: cc.Label,
            displayName: '线数',
        },
        lblCurBet: {
            default: null,
            type: cc.Label,
            displayName: '本局总注',
        },
        jackpot_lab: {
            default: null,
            type: cc.Label,
            displayName: '奖池',
        },
        lineLv_lab: {
            default: null,
            type: cc.Label,
            displayName: '下注等级',
        },
        winCoin_lab: {
            default: null,
            type: cc.Label,
            displayName: '赢钱金额',
        },
        bigWinCoin_lab: {
            default: null,
            type: cc.Label,
            displayName: '大奖赢钱金额',
        },
        stateNode: {
            default: null,
            type: cc.Node,
            displayName: '状态节点',
        },
        bigWinNode: {
            default: null,
            type: cc.Node,
            displayName: '大奖节点',
        },
        effectAnim_bet: sp.Skeleton,
        effectAnim_coin: sp.Skeleton,
        effectAnim_max: cc.Node,
        effectAnim_win: sp.Skeleton,
        effectAnim_dropCoin: sp.Skeleton,
        musicBtn: cc.Node,//音乐
        soundBtn: cc.Node,//音效
        sp_settingControl: [cc.SpriteFrame],
        _holdTimeEclipse: 0,//用来检测长按
        _holdClick: false,
    },

    start() {
        this.playerInfo = require("PlayerInfo").getInstant;
        Helper.loadHead(this.playerInfo.playerHeadId, sp => {
            this.spUserFace.spriteFrame = sp;
        });
        this.lblUserName.string = this.playerInfo.playerName;
        this.lblUserCoin.string = Helper.tofixNum(this.playerInfo.playerCoin);
        this.settingInit_Function();
        this.initEvent();
    },

    init(obj) {
        this.mainJs = obj;
        this.winCoin_lab.string = "0.00";
    },

    update() {
        if (this._holdClick) {
            this._holdTimeEclipse++;
            if (this._holdTimeEclipse > 60) {//如果长按时间大于1s，则认为长按了1s
                this._holdClick = false;
                this._holdTimeEclipse = 0;
                if (this.auto) {
                    return;
                }
                this.Auto_panel.active = true;
            }
        }
    },

    initEvent() {
        //长按自动相关注册事件
        this.Btn_start.on('touchstart', function (event) {
            this._holdClick = true;
            this._holdTimeEclipse = 0;
        }, this);

        this.Btn_start.on('touchend', function (event) {
            this._holdClick = false;
            this._holdTimeEclipse = 0;
        }, this);

        this.effectAnim_coin.setCompleteListener((event) => {
            switch (event.animation.name) {
                case "up":
                    this.effectAnim_coin.setAnimation(0, "loop", true);
                    break;
                case "down":
                    this.effectAnim_coin.setAnimation(0, "loop", true);
                    break;
                case "full_in":
                    this.effectAnim_coin.setAnimation(0, "full_loop", true);
                    break;
            }
        });
    },

    settingInit_Function: function () {
        cc.audioEngine.stopAll();
        this.mainJs.audio.playBgm(0);
        this.playerInfo.musicControl ? (
            this.musicBtn.getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[1],
            this.musicBtn.getChildByName("sp_Control").setPosition(60, 0)) :
            (this.musicBtn.getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[0],
                this.musicBtn.getChildByName("sp_Control").setPosition(-60, 0));
        this.playerInfo.soundEffectControl ? (
            this.soundBtn.getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[1],
            this.soundBtn.getChildByName("sp_Control").setPosition(60, 0)) :
            (this.soundBtn.getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[0],
                this.soundBtn.getChildByName("sp_Control").setPosition(-60, 0));

    },

    settingControlButtonClick_Function: function (self, type) {
        var movePoint, action;
        switch (type) {
            case 0:
                if (this.playerInfo.musicControl) {
                    movePoint = cc.moveBy(.1, -120, 0);
                    action = cc.sequence(movePoint, cc.callFunc(() => {
                        this.playerInfo.musicControl = 0;
                        self.getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[0];
                        this.writeUserSettingDate_Function();
                    }, this));
                    this.mainJs.audio.stopAudio();
                } else {
                    movePoint = cc.moveBy(.1, 120, 0);
                    action = cc.sequence(movePoint, cc.callFunc(() => {
                        this.playerInfo.musicControl = 1;
                        self.getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[1];
                        this.writeUserSettingDate_Function();
                        if (this.mainJs.freeTimes > 0) {
                            this.mainJs.audio.playBgm(1);
                        } else if (this.mainJs.bigWinBoo) {
                            this.mainJs.audio.playBgm(2);
                        } else {
                            this.mainJs.audio.playBgm(0);
                        }
                    }, this));
                }
                break;
            case 1:
                if (this.playerInfo.soundEffectControl) {
                    movePoint = cc.moveBy(.1, -120, 0);
                    action = cc.sequence(movePoint, cc.callFunc(() => {
                        this.playerInfo.soundEffectControl = 0;
                        self.getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[0];
                        this.writeUserSettingDate_Function();
                    }, this));
                } else {
                    movePoint = cc.moveBy(.1, 120, 0);
                    action = cc.sequence(movePoint, cc.callFunc(() => {
                        this.playerInfo.soundEffectControl = 1;
                        self.getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[1];
                        this.writeUserSettingDate_Function();
                    }, this));
                }
                break;
        }
        self.getChildByName("sp_Control").runAction(action);
    },

    //main.js相关点击
    onCLick(event, args) {
        this.mainJs.onCLick(event, args);
    },
    //关闭自动弹板
    onCLick_closeAutoPanel() {
        this.Auto_panel.active = false;
    },
    //设置弹板开关
    onCLick_settingPanel(event, args) {
        let type = parseInt(args);
        this.Setting_panel.active = type == 1;
    },
    //声音弹板开关
    onCLick_soundPanel(event, args) {
        let type = parseInt(args);
        this.Sound_panel.active = type == 1;
    },
    //声音选项
    onCLick_sound(event, args) {
        if (args == "music") {
            this.settingControlButtonClick_Function(this.musicBtn, 0);
        } else if (args == "sound") {
            this.settingControlButtonClick_Function(this.soundBtn, 1);
        }
    },
    //购买金币
    onCLick_buyCoin() {
        cc.log("购买金币");
    },
    //选择自动次数
    onCLick_chooseAutoNum(event, args) {
        let num = parseInt(args);
        this.Auto_panel.active = false;
        this.mainJs.startAuto(num);
    },
    //停止自动
    onCLick_stopAuto() {
        this.Btn_stopAuto.active = false;
        this.Btn_start.active = true;
        this.mainJs.stopAuto();
    },

    addBet() {
        this.effectAnim_bet.clearTracks();
        this.effectAnim_bet.setAnimation(0, "up", false);
        this.effectAnim_coin.clearTracks();
        this.effectAnim_coin.setAnimation(0, "up", false);
    },

    subBet() {
        this.effectAnim_max.active = false;
        this.effectAnim_coin.clearTracks();
        this.effectAnim_coin.setAnimation(0, "down", false);
        this.effectAnim_win.clearTracks();
        this.Btn_Max.getComponent(cc.Button).interactable = true;
    },

    maxBet() {
        this.effectAnim_max.active = true;
        this.effectAnim_max.getComponent(cc.Animation).play();
        this.effectAnim_coin.clearTracks();
        this.effectAnim_coin.setAnimation(0, "full_in", false);
        this.effectAnim_win.addAnimation(0, "text_in_jackpot", false);
        this.effectAnim_win.addAnimation(0, "text_in_jackpot", false);
        this.effectAnim_win.addAnimation(0, "text_in_jackpot", false);
        this.effectAnim_win.addAnimation(0, "loop", true);
        this.Btn_Max.getComponent(cc.Button).interactable = false;
    },

    updateStateNode(type) {
        for (let i in this.stateNode.children) {
            this.stateNode.children[i].active = false;
        }
        this.stateNode.children[type].active = true;
    },

    playAnimWin(type, coin) {
        this.effectAnim_win.addAnimation(0, "fin", false);
        this.effectAnim_win.addAnimation(0, "fin", false);
        this.effectAnim_win.addAnimation(0, "fin", false);
        let t = (type + 1) * 30;//变化次数
        let list = [];//变化数组
        for (let i = 0; i < t; i++) {
            let A1 = coin / 100;
            let An = A1 + 2 * i * (coin - t * A1) / (t * (t - 1));

            list.push(An);
        }
        let x = t - 1;
        let addcoin = 0;
        this.schedule(() => {
            addcoin += list[x];
            if (x == 0) {
                addcoin = coin;
            }
            this.winCoin_lab.string = Helper.fixNum(addcoin);
            x--;
        }, 0.05, t - 1);
    },
    //大奖数字滚动动画
    playBigWinCoin(coin) {
        let addcoin = 0;
        this.schedule(() => {
            addcoin += coin / 30;
            if (addcoin > coin) {
                addcoin = coin;
            }
            this.bigWinCoin_lab.string = Helper.fixNum(addcoin);
        }, 0.05, 30);
    },
    //大奖BigWin动画
    playAnim_BigWin(coin) {
        this.bigWinNode.active = true;
        let spine = this.bigWinNode.children[0].getComponent(sp.Skeleton);
        spine.clearTracks();
        spine.setAnimation(0, "big_in", false);
        spine.addAnimation(0, "big_end", false);
        spine.addAnimation(0, "big_end_loop", true);
        this.effectAnim_dropCoin.clearTracks();
        this.effectAnim_dropCoin.setAnimation(0, "animation1", true);
        this.playBigWinCoin(coin);
    },
    //大奖SuperWin动画
    playAnim_SuperWin(coin) {
        this.bigWinNode.active = true;
        let spine = this.bigWinNode.children[1].getComponent(sp.Skeleton);
        spine.clearTracks();
        spine.setAnimation(0, "super_in", false);
        spine.addAnimation(0, "super_end", false);
        spine.addAnimation(0, "super_end_loop", true);
        this.effectAnim_dropCoin.clearTracks();
        this.effectAnim_dropCoin.setAnimation(0, "animation1", true);
        this.playBigWinCoin(coin);
    },
    //大奖MegaWin动画
    playAnim_MegaWin(coin) {
        this.bigWinNode.active = true;
        let spine = this.bigWinNode.children[2].getComponent(sp.Skeleton);
        spine.clearTracks();
        spine.setAnimation(0, "mega_in", false);
        spine.addAnimation(0, "mega_end", false);
        spine.addAnimation(0, "mega_end_loop", true);
        this.effectAnim_dropCoin.clearTracks();
        this.effectAnim_dropCoin.setAnimation(0, "animation1", true);
        this.playBigWinCoin(coin);
    },

    closeBigWin() {
        this.bigWinNode.active = false;
    },

    /**
     * 将设置数据写入缓存数据
     */
    writeUserSettingDate_Function: function () {
        var data = {
            musicControl: this.playerInfo.musicControl,
            soundEffectControl: this.playerInfo.soundEffectControl
        };
        this.playerInfo.writeData_Function("userSetting", data);
    },

});
