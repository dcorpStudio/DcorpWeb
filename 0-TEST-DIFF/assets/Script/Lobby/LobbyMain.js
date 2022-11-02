const i18n = require('i18n');
cc.Class({
    extends: cc.Component,

    properties: {
        pb_Chat0: {
            default: null,
            type: cc.Prefab
        },
        pb_Chat1: {
            default: null,
            type: cc.Prefab
        },
        pb_EditCardInfo: {
            default: null,
            type: cc.Prefab
        },
        pb_MailSelect: {
            default: null,
            type: cc.Prefab
        },
        com_BG: {
            default: null,
            type: cc.Node
        },
        com_PlayerMessage: {
            default: null,
            type: cc.Node
        },
        com_Button: {
            default: null,
            type: cc.Node
        },
        com_SystemMessage: {
            default: null,
            type: cc.Node
        },
        com_Mall: {
            default: null,
            type: cc.Node
        },
        com_CustomerService: {
            default: null,
            type: cc.Node
        },
        com_Mail: {
            default: null,
            type: cc.Node
        },
        com_PlayerInfo: {
            default: null,
            type: cc.Node
        },
        com_Login: {
            default: null,
            type: cc.Node
        },
        com_Register: {
            default: null,
            type: cc.Node
        },
        com_Tips: {
            default: null,
            type: cc.Node
        },
        com_Setting: {
            default: null,
            type: cc.Node
        },
        com_MessageBox: {
            default: null,
            type: cc.Node
        },
        bg_Black: {
            default: null,
            type: cc.Node
        },
        au_LobbyBGM: {
            default: null,
            type: cc.AudioClip
        },
        sp_OnAndOff: {
            default: [],
            type: cc.SpriteFrame
        },
        poxyUI: {
            default: null,
            type: cc.Node
        },
        poxyPb: {
            default: null,
            type: cc.Prefab
        },

        com_Quest: {
            default: null,
            type: cc.Node
        },

        com_rank: {
            default: null,
            type: cc.Node
        },

        com_activity: {
            default: null,
            type: cc.Node
        },

        com_vip: {
            default: null,
            type: cc.Node
        },

        com_vipRoom: {
            default: null,
            type: cc.Node
        },

        com_left: {
            default: null,
            type: cc.Node
        },

        historyItemPb: {
            default: null,
            type: cc.Prefab
        },
        headBgSp: {
            default: null,
            type: cc.SpriteFrame
        },
        adView: {
            default: null,
            type: cc.Node,
        },

        com_bank: cc.Node,//银行界面
    },

    /**
     * 
     */
    onLoad: function () {
        //cc.sys.isNative && cc.Device.setKeepScreenOn(true);
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        //关闭脏矩形

        this.node.getChildByName("lb_Version").getComponent(cc.Label).string = window.game_ver;

        if (cc.renderType === cc.game.RENDER_TYPE_CANVAS) {
            cc.renderer.enableDirtyRegion(false);
        }
        var self = this;
        cc.view.setResizeCallback(function () {
            self.uiResize_Function();
        });
        this.bg_Black.on("touchstart", function (ret) {
            return false;
        }, this);
        this.disconneted = false;
        this.playerInfo = require("PlayerInfo").getInstant;
        this.playerInfo.setGameObj_Function(this);
        this.jackpot_script = this.node.getChildByName('jackpot').getComponent('jackpot');
        this.node.getChildByName('Loading').active = false; //默认隐藏加载页面
        //加载配置文件
        cc.loader.loadRes('Configuration/SwitchControl', function (error, ret) {
            ret = ret.json;
            // cc.loader.load("res/raw-assets/Texture/Configuration/SwitchControl.json", function (err, ret) {
            this.playerInfo.isBindAli = ret.isBindAli;
            this.playerInfo.isBindCreditCard = ret.isBindCreditCard;
            this.playerInfo.isBindPhone = ret.isBindPhone;
            this.playerInfo.isWithdraw = ret.isWithdraw;
            this.playerInfo.isWithdrawPhoneCard = ret.isWithdrawPhoneCard;
            this.playerInfo.shareUrl = ret.shareUrl;
            this.playerInfo.isAutoLogin = ret.isAutoLogin;
            this.playerInfo.paySelect = ret.paySelect;
            this.netWork = require("LobbyNetWork");
            this.netWork.netWorkInit_Function();
        }.bind(this));
        this.netWorkTimeCount = 0;
        this.tempNetWork = null;
        this.md5 = require("md5").getInstant;
        this.wordFilter = require("WordFilter").getInstant;

        if (cc.sys.isNative && window.platform_wx) {
            cc.find('Canvas/com_Login/wx_denglu').active = true;
            // cc.find('Canvas/com_Login/bt_Login').y = -80;
            // cc.find('Canvas/com_Login/yjian_zhuce').y = -80;
            // cc.find('Canvas/com_Login/bt_Register').y = -80;
        }


        // this.com_daohang.active = !!!window.firstComeIn;
        window.firstComeIn = true;

        Helper.http('http://yidaliadmin.youmegame.cn/index.php/admin/api/imgs').then(e => {
            //Helper.http('http://211.149.229.56:8089/index.php/admin/api/imgs').then(e => {
            console.log('得到服务器信息' + JSON.stringify(e));
            let arr = [];
            for (let i in e) {
                if (!!e[i]) {
                    arr.push(e[i]);
                }
            }
            if (arr.length > 1) {
                for (let i = arr.length - 1; i > 0; i--) {
                    let adNd = this.adView.getChildByName('ad');
                    let newAdNd = cc.instantiate(adNd);
                    this.adView.parent.parent.getComponent(cc.PageView).addPage(newAdNd);
                }
            }
            for (let i in arr) {
                let spr = this.adView.children[i];
                Helper.loadHead(arr[i], sp => {
                    spr.getComponent("cc.Sprite").spriteFrame = sp;
                });
            }
        });
    },
    /**
     * 
     */
    /**
     * 初始化
     */
    lobbyInit_Function: function () {
        this.loadGameScene = false;
        this.com_MessageBox.active = false;
        this.com_MessageBox.getChildByName("bt_Reconnet").active = false;
        this.mallInit_Function();
        this.setSystemMessage_Function();
        this.enterRoom = false;
        this.checkUpdateTimeOut = false;
        this.checkUpdateGameName = "";
        this.checkUpdateTime = 20;
        this.checkUpdateTimeLabel = this.checkUpdateTime;
        this.heartBeatTime = -20;
        this.heartBeatTimeOut = 0;
        this.heartBeatEmitControl = false;
        this.chatArray = [];
        this.chatMessageArray = new Array();
        this.chatMessagePosition = [
            [-500, -30],
            [485, -30]
        ];
        this.bankSelect = -1;
        this.editCardId = -1;
        this.bg_Black.active = false;
        this.settingInit_Function();
        if (!cc.sys.isBrowser) {
            //this.node.getComponent("LobbyMenu").needToUpdate_Function();
        }
        // if (this.playerInfo.gameDisconnect) {
        //     this.gameReconnect_Function(this.playerInfo.gameIp, this.playerInfo.gameProt, this.playerInfo.gameName);
        // }
        this.codeTimeCount = false;
        this.getCodeTime = 0;
        this.checkIdResult = false;
        this.messageBoxType = 0;
        // this.customerServiceMessageInit_Function();
        this.HeadInit_Function();
        this.netWork.socket.emit("getBankScore");
        this.show_vip();
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 设置界面初始化
     */
    settingInit_Function: function () {
        this.sp_settingControl = new Array(2);
        //背景音乐
        this.sp_settingControl[0] = this.sp_OnAndOff[0];
        //游戏音效
        this.sp_settingControl[1] = this.sp_OnAndOff[1];
        cc.audioEngine.stopAll();

        var e = null;
        null === this.playerInfo.musicControl ? (e = this.playerInfo.readData_Function("userSetting"), null === e ? (e = {
            musicControl: 1,
            soundEffectControl: 1
        },
            this.playerInfo.writeData_Function("userSetting", e), this.playerInfo.musicControl = e.musicControl, this.playerInfo.soundEffectControl = e.soundEffectControl, this.com_Setting.getChildByName("bt_MusicControl").isVoice = this.playerInfo.musiccontrol, this.com_Setting.getChildByName("bt_SoundEffectControl").isVoice = this.playerInfo.soundEffectControl, this.bgmNumber = cc.audioEngine.play(this.au_LobbyBGM, true, 1)) : (this.playerInfo.musicControl = e.musicControl, this.playerInfo.soundEffectControl = e.soundEffectControl, this.com_Setting.getChildByName("bt_MusicControl").isVoice = this.playerInfo.musiccontrol, this.com_Setting.getChildByName("bt_SoundEffectControl").isVoice = this.playerInfo.soundEffectControl, this.playerInfo.musicControl && (this.bgmNumber = cc.audioEngine.play(this.au_LobbyBGM, true, 1)))) : this.playerInfo.musicControl && (this.com_Setting.getChildByName("bt_MusicControl").isVoice = this.playerInfo.musiccontrol, this.com_Setting.getChildByName("bt_SoundEffectControl").isVoice = this.playerInfo.soundEffectControl, this.bgmNumber = cc.audioEngine.play(this.au_LobbyBGM, true, 1)),
            this.playerInfo.musicControl ? (this.com_Setting.getChildByName("bt_MusicControl").getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[1], this.com_Setting.getChildByName("bt_MusicControl").getChildByName("sp_Control").setPosition(60, 0)) : (this.com_Setting.getChildByName("bt_MusicControl").getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[0], this.com_Setting.getChildByName("bt_MusicControl").getChildByName("sp_Control").setPosition(-60, 0)),
            this.playerInfo.soundEffectControl ? (this.com_Setting.getChildByName("bt_SoundEffectControl").getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[1], this.com_Setting.getChildByName("bt_SoundEffectControl").getChildByName("sp_Control").setPosition(60, 0)) : (this.com_Setting.getChildByName("bt_SoundEffectControl").getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[0], this.com_Setting.getChildByName("bt_SoundEffectControl").getChildByName("sp_Control").setPosition(-60, 0)),
            cc.sys.os === cc.sys.OS_ANDROID && (this.com_Setting.getChildByName("bt_Exit").active = true);
    },


    playerInfoMenuInit_Function: function () {
        for (var e = 12; e < this.com_PlayerInfo.children.length; ++e) this.com_PlayerInfo.children[e].active = false;
        this.playerInfo.isOffical ? (this.com_PlayerInfo.getChildByName("bt_CreateAccount").active = false, this.com_PlayerInfo.getChildByName("com_CreateAccount").active = false, this.com_PlayerInfo.getChildByName("bt_ChangeName").active = true, this.com_PlayerInfo.getChildByName("bt_ChangeName").getComponent("cc.Button").interactable = false, this.com_PlayerInfo.getChildByName("com_ChangeName").active = true, this.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("lb_State").getComponent("cc.Label").string = "账号状态: 已转正", this.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("lb_Account").getComponent("cc.Label").string = "账号: " + this.playerInfo.account, this.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("lb_Id").getComponent("cc.Label").string = "用户ID: " + this.playerInfo.playerId) : (this.com_PlayerInfo.getChildByName("bt_CreateAccount").active = true, this.com_PlayerInfo.getChildByName("bt_CreateAccount").active = true, this.com_PlayerInfo.getChildByName("bt_CreateAccount").getComponent("cc.Button").interactable = false, this.com_PlayerInfo.getChildByName("com_CreateAccount").active = true, this.com_PlayerInfo.getChildByName("bt_ChangeName").active = false, this.com_PlayerInfo.getChildByName("com_ChangeName").active = false, this.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("lb_State").getComponent("cc.Label").string = "", this.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("lb_Account").getComponent("cc.Label").string = "", this.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("lb_Id").getComponent("cc.Label").string = "");
        //this.playerInfo.isBindAli ? this.playerInfo.aliAccount ? (this.com_PlayerInfo.getChildByName("bt_BindAli").active = false, this.com_PlayerInfo.getChildByName("bt_BindedAli").active = true, this.playerInfo.encryptAliAccount = this.encryptString_Function(this.playerInfo.aliAccount, 3, 6), this.playerInfo.encryptAliName = this.encryptString_Function(this.playerInfo.aliName, 1, 3), this.com_PlayerInfo.getChildByName("com_BindedAli").getChildByName("lb_AccountInfo").getComponent("cc.Label").string = this.playerInfo.encryptAliAccount, this.com_PlayerInfo.getChildByName("com_BindedAli").getChildByName("lb_NameInfo").getComponent("cc.Label").string = this.playerInfo.encryptAliName) : (this.com_PlayerInfo.getChildByName("bt_BindAli").active = true, this.com_PlayerInfo.getChildByName("bt_BindedAli").active = false, this.com_PlayerInfo.getChildByName("com_BindedAli").getChildByName("lb_AccountInfo").getComponent("cc.Label").string = "", this.com_PlayerInfo.getChildByName("com_BindedAli").getChildByName("lb_NameInfo").getComponent("cc.Label").string = "") : (this.com_PlayerInfo.getChildByName("bt_BindAli").active = false, this.com_PlayerInfo.getChildByName("bt_BindedAli").active = false);
        this.playerInfo.isBindCreditCard ? this.com_PlayerInfo.getChildByName("bt_BindCreditCard").active = true : this.com_PlayerInfo.getChildByName("bt_BindCreditCard").active = false;
        this.playerInfo.isBindPhone ? (this.com_PlayerInfo.getChildByName("bt_BindPhone").active = true) : this.com_PlayerInfo.getChildByName("bt_BindPhone").active = false;
        this.playerInfo.playerCoin < 50 ? (this.com_Button.getChildByName("bt_PlusMall").getChildByName("tips").active = true) : (this.com_Button.getChildByName("bt_PlusMall").getChildByName("tips").active = false);
        2 === this.playerInfo.isAutoLogin && (this.com_PlayerInfo.getChildByName("bt_ChangeAccount").active = false, this.com_PlayerInfo.getChildByName("bt_ChangePassword").active = false);
        this.bankIdInit_Function();
        this.netWork.socket && this.netWork.socket.emit("getBank");
        this.readChat_Function();
    },
    encryptString_Function: function (e, t, i) {
        for (var n = e,
            o = "",
            a = t; a < n.length; ++a) o += "*";
        return o.length > 8 && (o = "********"),
            n = n.length > i ? n.substring(0, t) + o + n.substring(n.length - t, n.length) : n.substring(0, t) + o
    },
    mallInit_Function: function () {
        this.rechargeMoneyArray = [98, 198, 498, 968];
        for (var e = 0; e < 4; ++e) this.com_Mall.getChildByName("com_chongzhi_01").getChildByName("bt_Recharge" + e).rechargeId = e;
        //for (e = 0; e < this.playerInfo.paySelect.length; ++e) this.com_Mall.children[e + 9].getComponent("cc.Button").interactable = this.playerInfo.paySelect[e];
    },
    HeadInit_Function: function () {
        //初始化头像
        Helper.loadHead(this.playerInfo.playerHeadId, sp => {
            this.com_BG.getChildByName("sp_Head").getComponent("cc.Sprite").spriteFrame = sp;
        });
    },
    customerServiceMessageInit_Function: function () {
        var e = this.com_CustomerService.getChildByName("sv_View").getComponent("cc.ScrollView").content;
        e.removeAllChildren(),
            this.chatMessageArray = [],
            this.netWork.socket && this.netWork.socket.emit("getMsgToUser")
    },

    mailInit_Function: function (e) {
        this.playerInfo.mailList = e,
            this.com_Mail.getChildByName("lb_MailInfo").getComponent("cc.Label").string = "";
        this.com_Mail.getChildByName("bt_Get").getComponent("cc.Button").interactable = false;
        var t = this.com_Mail.getChildByName("sv_Mail").getComponent("cc.ScrollView").content;
        if (t.removeAllChildren(), e) {
            for (var i = null,
                n = 0,
                o = -40,
                a = 0; a < e.length; ++a) i = cc.instantiate(this.pb_MailSelect),
                    t.addChild(i),
                    i.setPosition(n, o + a * -70),
                    i.getChildByName("Label").getComponent("cc.Label").string = "系统邮件",
                    i.getComponent("LobbyButtonClick").canvasNode = this,
                    i.buttonID = a,
                    i.mailID = e[a].id;
            e.length > 4 ? t.height = 70 * e.length : t.height = 320,
                e.length > 0 ? this.com_Button.getChildByName("bt_Mail").getChildByName("tips").active = true : this.com_Button.getChildByName("bt_Mail").getChildByName("tips").active = false
        }
    },
    getMailInfo_Function: function (e) {
        for (var t = this.com_Mail.getChildByName("sv_Mail").getComponent("cc.ScrollView").content, i = 0; i < t.children.length; ++i) t.children[i].getComponent("cc.Button").interactable = true;
        e.getComponent("cc.Button").interactable = false,
            this.mailClick = e.node.buttonID,
            this.com_Mail.getChildByName("bt_Get").getComponent("cc.Button").interactable = true;
        var n = "";
        switch (this.com_Mail.getChildByName("lb_MailInfo").getComponent("cc.Label").string = "系统邮件\n\n", this.playerInfo.mailList[e.node.buttonID].type) {
            case 0:
                this.com_Mail.getChildByName("lb_MailInfo").getComponent("cc.Label").string += "恭喜您在比赛当中获得第 " + this.playerInfo.mailList[e.node.buttonID].rankidx + " 名\n\n";
                break;
            case 1:
                this.com_Mail.getChildByName("lb_MailInfo").getComponent("cc.Label").string += "玩家昵称: " + this.playerInfo.mailList[e.node.buttonID].nickName + "\nID: " + this.playerInfo.mailList[e.node.buttonID].sendCoinUserId + "\n\n给你赠送了";
                break;
            case 2:
                this.com_Mail.getChildByName("lb_MailInfo").getComponent("cc.Label").string += "在开炮送话费活动中您完成了一个等级\n\n"
        }
        if (this.playerInfo.mailList[e.node.buttonID].propCount > 0) {
            switch (this.com_Mail.getChildByName("lb_MailInfo").getComponent("cc.Label").string += "获得 " + this.playerInfo.mailList[e.node.buttonID].propCount + " 个", this.playerInfo.mailList[e.node.buttonID].propId) {
                case 1:
                    n = "话费券"
            }
            this.com_Mail.getChildByName("lb_MailInfo").getComponent("cc.Label").string += n + "\n\n"
        }
        this.playerInfo.mailList[e.node.buttonID].winScore > 0 && (this.playerInfo.mailList[e.node.buttonID].nickName ? this.com_Mail.getChildByName("lb_MailInfo").getComponent("cc.Label").string += (this.playerInfo.mailList[e.node.buttonID].winScore / this.playerInfo.exchangeRate).toFixed(2) + " 金币" : this.com_Mail.getChildByName("lb_MailInfo").getComponent("cc.Label").string += "获得 " + (this.playerInfo.mailList[e.node.buttonID].winScore / this.playerInfo.exchangeRate).toFixed(2) + " 金币")
    },

    /**
     * 获得邮件
     */
    getMail_Function: function () {
        if (this.mailClick !== -1) {
            this.netWork.socket.emit("getPrize", {
                id: this.playerInfo.mailList[this.mailClick].id
            });
        }
        this.com_Mail.getChildByName("bt_Get").getComponent("cc.Button").interactable = false;
    },

    /**
     * 添加邮件
     * @param {*} data 
     */
    addMail_Function: function (data) {
        this.playerInfo.mailList.push(data);
        var sv_Mail = this.com_Mail.getChildByName("sv_Mail").getComponent("cc.ScrollView").content;
        var mailObject = null;
        mailObject = cc.instantiate(this.pb_MailSelect);
        sv_Mail.addChild(mailObject);
        mailObject.getChildByName("Label").getComponent("cc.Label").string = "系统邮件";
        mailObject.getComponent("LobbyButtonClick").canvasNode = this;
        mailObject.mailID = data.id;
        mailObject.buttonID = this.playerInfo.mailList.length - 1;
        this.com_Button.getChildByName("bt_Mail").getChildByName("tips").active = true;
        this.updateMailContent_Function();
    },

    /**
     * 删除邮件
     */
    destroyMail_Function: function () {
        this.playerInfo.mailList[this.mailClick] = null;
        this.updateMailContent_Function();
    },

    updateMailContent_Function: function () {
        for (var e = this.com_Mail.getChildByName("sv_Mail").getComponent("cc.ScrollView").content, t = 0, i = -40, n = 0; n < this.playerInfo.mailList.length; ++n) null === this.playerInfo.mailList[n] && (this.playerInfo.mailList.splice(n, 1), e.removeChild(e.children[n]));
        for (var n = 0; n < this.playerInfo.mailList.length; ++n) e.children[n].buttonID = n,
            e.children[n].setPosition(t, i + n * -70);
        this.playerInfo.mailList.length > 4 ? e.height = 70 * this.playerInfo.mailList.length : (e.height = 320, 0 === this.playerInfo.mailList.length && (this.com_Button.getChildByName("bt_Mail").getChildByName("tips").active = false)),
            this.com_Mail.getChildByName("sv_Mail").getComponent("cc.ScrollView").scrollToTop(.5),
            this.mailClick = -1,
            this.com_Mail.getChildByName("lb_MailInfo").getComponent("cc.Label").string = ""
    },
    bankIdInit_Function: function () {
        for (var e = this.com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("sv_SelectBank").getComponent("cc.ScrollView").content, t = this.com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("sv_SelectBank").getComponent("cc.ScrollView").content, i = 0; i < e.childrenCount; ++i) e.children[i].bankId = i,
            t.children[i].bankId = i
    },
    bankInfoInit_Function: function (e) {
        this.creditCardObj = null;
        this.bankList = e;
        this.bankNameList = ["", "工商银行", "中国银行", "农业银行", "建设银行", "交通银行", "招商银行", "中国邮政", "光大银行", "民生银行", "中信银行", "兴业银行", "华夏银行"];
        for (var t = null, i = 0; i < e.length; ++i) {
            t = cc.instantiate(this.pb_EditCardInfo);
            t.setPosition(175, 180 - 100 * i);
            t.getChildByName("lb_CardInfo").getComponent("cc.Label").string = "银行卡: " + this.encryptString_Function(e[i].account, 4, 4);
            t.cardId = e[i].cardId;
            t.getComponent("LobbyButtonClick").canvasNode = this;
            this.com_PlayerInfo.getChildByName("com_BindCreditCard").addChild(t);
            e.length > 4 ? this.com_PlayerInfo.getChildByName("com_BindCreditCard").getChildByName("bt_AddCreditCard").active = false :
                this.com_PlayerInfo.getChildByName("com_BindCreditCard").getChildByName("bt_AddCreditCard").setPosition(175, 180 - 100 * e.length);
        }
    },

    /**
     * 添加银行卡
     * @param {*} cardId 
     * @param {*} msg 
     */
    addCreditCard_Function: function (cardId, msg) {
        if (!this.bankList) {
            this.bankList = new Array();
        }
        this.creditCardObj.cardId = cardId;
        this.bankList.push(this.creditCardObj);
        this.com_PlayerInfo.getChildByName("com_AddCreditCard").active = false;
        this.com_PlayerInfo.getChildByName("com_BindCreditCard").active = true;
        var info = cc.instantiate(this.pb_EditCardInfo);
        info.cardId = cardId;
        info.setPosition(175, 180 - 100 * (this.bankList.length - 1));
        info.getChildByName("lb_CardInfo").getComponent("cc.Label").string = "银行卡: " + this.encryptString_Function(this.creditCardObj.account, 4, 4);
        info.getComponent("LobbyButtonClick").canvasNode = this;
        this.com_PlayerInfo.getChildByName("com_BindCreditCard").addChild(info);
        if (this.bankList.length > 4) {
            this.com_PlayerInfo.getChildByName("com_BindCreditCard").getChildByName("bt_AddCreditCard").active = false;
        } else {
            this.com_PlayerInfo.getChildByName("com_BindCreditCard").getChildByName("bt_AddCreditCard").setPosition(175, 180 - 100 * this.bankList.length);
        }
        this.creditCardObj = null;
        this.showMessagebox_Function(msg, 1, 0);
    },

    /**
     * 修改银行卡
     * @param {*} cardId 
     * @param {*} msg 
     */
    editCreditCard_Function: function (cardId, msg) {
        for (var i = 0; i < this.bankList.length; i++) {
            if (this.bankList[i].cardId === cardId) {
                this.bankList[i].account = this.com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("eb_CardNo").getComponent("cc.EditBox").string;
                this.bankList[i].name = this.com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("eb_Owner").getComponent("cc.EditBox").string;
                this.bankList[i].bankType = this.bankSelect;
            }
        }
        this.bankSelect = -1;
        this.com_PlayerInfo.getChildByName("com_EditCreditCard").active = false;
        this.com_PlayerInfo.getChildByName("com_BindCreditCard").active = true;
        this.showMessagebox_Function(msg, 1, 0);

        for (var i = 0; i < this.com_PlayerInfo.getChildByName("com_BindCreditCard").childrenCount; i++) {
            if (this.com_PlayerInfo.getChildByName("com_BindCreditCard").children[i].cardId === cardId) {
                this.com_PlayerInfo.getChildByName("com_BindCreditCard").children[i].getChildByName("lb_CardInfo").getComponent("cc.Label").string = "银行卡: " + this.encryptString_Function(this.com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("eb_CardNo").getComponent("cc.EditBox").string, 4, 4);
            }
        }
    },

    /**
     * 删除银行卡
     * @param {*} cardId 
     * @param {*} msg 
     */
    deleteCreditCard_Function: function (cardId, msg) {
        this.com_PlayerInfo.getChildByName("com_EditCreditCard").active = false;
        this.com_PlayerInfo.getChildByName("com_BindCreditCard").active = true;
        for (var i = 0; i < this.bankList.length; i++) {
            if (this.bankList[i].cardId === cardId) {
                this.bankList.splice(i, 1);
                break;
            }
        }

        for (i = 0; i < this.com_PlayerInfo.getChildByName("com_BindCreditCard").childrenCount; i++) {
            if (this.com_PlayerInfo.getChildByName("com_BindCreditCard").children[i].cardId === cardId) {
                this.com_PlayerInfo.getChildByName("com_BindCreditCard").removeChild(this.com_PlayerInfo.getChildByName("com_BindCreditCard").children[i]);
                break
            }
        }
        this.showMessagebox_Function(msg, 1, 0);
        this.updateBankList_Function();
    },

    /**
     * 更新银行列表
     */
    updateBankList_Function: function () {
        for (var i = 0; i < this.com_PlayerInfo.getChildByName("com_BindCreditCard").childrenCount; i++) {
            this.com_PlayerInfo.getChildByName("com_BindCreditCard").children[i].setPosition(175, 180 - 100 * (i - 1));
        }
        if (this.bankList.length > 4) {
            this.com_PlayerInfo.getChildByName("com_BindCreditCard").getChildByName("bt_AddCreditCard").active = false;
        } else {
            this.com_PlayerInfo.getChildByName("com_BindCreditCard").getChildByName("bt_AddCreditCard").active = true;
            this.com_PlayerInfo.getChildByName("com_BindCreditCard").getChildByName("bt_AddCreditCard").setPosition(175, 180 - 100 * this.bankList.length);
        }
    },

    /**
     * 连接游戏服务器失败
     * @param {*} gameName 
     */
    contentGameServerFail_Function: function (gameName) {
        var errorMsg = "";
        switch (gameName) {
            case "Fish":
                errorMsg = "街机捕鱼";
                break;
            case "Bde":
                errorMsg = "八搭二";
                break;
            case "GrabBull":
                errorMsg = "抢庄牛牛";
                break;
            case "TwoEight":
                errorMsg = "二八杠";
                break;
            case "Bull":
                errorMsg = "经典牛牛";
                break;
            case "LineGame":
                errorMsg = "经典老虎机";
                break;
            case "Roulette":
                errorMsg = "欧式轮盘";
                break;
            case "hongbao":
                errorMsg = "红包达人";
                break;
            case "Fishhaiwang2":
                errorMsg = "海王2";
                break;
			case "shenhaibuyu":
                errorMsg = "深海捕鱼";
                break;
			case "leitingzhanji":
                errorMsg = "雷霆战机";
                break;
			case "kuailebuyu":
                errorMsg = "快乐捕鱼";
                break;
        }
        this.showMessagebox_Function(errorMsg + i18n.t("TIP8_MSG"), 1, 4);
        this.loadGameScene = false;
    },

    /**
     * 进入游戏房间
     * @param {*} gameObj 
     * @param {*} gameName 
     */
    loginGameRoom_Function: function (gameObj, gameName) {
        if (this.playerInfo.playerCoin < gameObj.node.entryCoin / 100) {
            this.showMessagebox_Function(i18n.t("TIP7_MSG"), 3, 4);
            return;
        }
        this.node.getChildByName('Loading').active = true; //点亮加载游戏界面
        console.log('gameObj:', gameObj);
        this.playerInfo.gameIp = gameObj.node.ip;
        this.playerInfo.gameProt = gameObj.node.prot;
        this.playerInfo.gameName = gameName;
        this.tempNetWork = null;
        if (!this.loadGameScene) {
            this.loadGameScene = true;
            switch (gameName) {
                case "GrabBull":
                    this.tempNetWork = require("GrabBullNetWork").getInstant;
                    break;
                case "Land":
                    this.tempNetWork = require("LandNetWork").getInstant;
                    break;
                case "Runing":
                    this.tempNetWork = require("RuningNetWork").getInstant;
                    break;
                case "Holdem":
                    this.tempNetWork = require("HoldemNetWork").getInstant;
                    break;
                case "Flower":
                    this.tempNetWork = require("FlowerNetWork").getInstant;
                    break;
                case "Roulette":
                    this.tempNetWork = require("RouletteNet").getInstant;
                    break;
                case "Fish":
                    this.tempNetWork = require("FishNetWork").getInstant;
                    break;
                case "hongbao":
                    this.tempNetWork = require("HongBaoNetWork").getInstant;
                    break;
                case "Fishhaiwang2":
                    this.tempNetWork = require("Fishhaiwang2NetWork").getInstant;
                    break;
				case "shenhaibuyu":
                    this.tempNetWork = require("FishshenhaibuyuNetWork").getInstant;
                    break;
				case "leitingzhanji":
                    this.tempNetWork = require("FishleitingzhanjiNetWork").getInstant;
                    break;
				case "kuailebuyu":
                    this.tempNetWork = require("FishkuailebuyuNetWork").getInstant;
                    break;
            }
            this.getComponent("LobbyMain").bg_Black.active = true;
            this.enterRoom = true;
            this.tempNetWork.setLobbyMainObj_Function(this);
            this.tempNetWork.loginGame_Function(this.playerInfo.gameIp, this.playerInfo.gameProt, this.playerInfo.playerId, this.playerInfo.gameSign);
            cc.audioEngine.stopAll();
        }
        this.checkLinkTimeOut = true;
        this.linkTime = 5;
    },

    /**
     * 连接游戏Socket服务器
     * @param {*} loginIP 
     * @param {*} prot 
     * @param {*} gameName 
     */
    gameReconnect_Function: function (loginIP, prot, gameName) {
        this.playerInfo.gameIp = loginIP;
        this.playerInfo.gameProt = prot;
        this.playerInfo.gameName = gameName;
        var netWord = null;
        if (!this.loadGameScene) {
            this.loadGameScene = true;
            switch (gameName) {
                case "GrabBull":
                    netWord = require("GrabBullNetWork").getInstant;
                    break;
                case "Land":
                    netWord = require("LandNetWork").getInstant;
                    break;
                case "Runing":
                    netWord = require("RuningNetWork").getInstant;
                    break;
                case "Holdem":
                    this.tempNetWork = require("HoldemNetWork").getInstant;
                    break;
                case "Flower":
                    this.tempNetWork = require("FlowerNetWork").getInstant;
                    break;
                case "hongbao":
                    this.tempNetWork = require("hongbaoNetWork").getInstant;
                    break;
            }

            this.enterRoom = true;
            this.getComponent("LobbyMain").bg_Black.active = true;
            netWord.setLobbyMainObj_Function(this);
            netWord.loginGame_Function(loginIP, prot, this.playerInfo.playerId, this.playerInfo.gameSign);
            cc.audioEngine.stopAll();
            netWord = null;
        }
    },

    /**
     * 
     * @param {*} money 
     * @param {*} nodeID 
     * @param {*} type 
     */
    pay_Function: function (money, nodeID, type) {
        if (!money || money < 50) return; //
        var url = "http://yidaliadmin.youmegame.cn/";
        //var url = "http://211.149.229.56:8089/";
        url += "index.php/api/pay/pay/";
        url += "uid/";
        url += this.playerInfo.playerId;
        url += "/fee/"
        url += money;
        url += "/type/";
        url += type;

        if (cc.sys.isNative) {
            cc.sys.openURL(url);
        } else {
            var webnode = this.com_Mall.getChildByName('com_RechargeWeb');
            webnode.active = true;

            var web = webnode.getChildByName('wv_Web').getComponent(cc.WebView);
            web.url = url;
        }
        this.rechargeMoney = 0;
        // var platform = -1;
        // switch (cc.sys.os) {
        //     case cc.sys.OS_ANDROID:
        //         platform = 0;
        //         break;
        //     case cc.sys.OS_IOS:
        //         platform = 1;
        //         break;
        //     default:
        //         platform = 2;
        //         break;
        // }
        // switch (type) {
        //     case 0:
        //         var playerId = this.playerInfo.playerId;
        //         var totalFee = money * this.playerInfo.exchangeRate;
        //         var payType = 1300;
        //         var appId = 1001;
        //         var account = this.playerInfo.account;
        //         var url = "http://ys.httpvip.com:8088/cz.php?userId=" + playerId + "&totalFee=" + totalFee + "&platform=" + platform + "&payType=" + payType + "&appId=" + appId + "&account=" + account;
        //         break;
        //     case 1:
        //         var playerId = this.playerInfo.playerId;
        //         var totalFee = money * this.playerInfo.exchangeRate;
        //         var payType = 2000;
        //         var appId = 1002;
        //         var account = this.playerInfo.account;
        //         var url = "http://ys.httpvip.com:8088/cz.php?userId=" + playerId + "&totalFee=" + totalFee + "&platform=" + platform + "&payType=" + payType + "&appId=" + appId + "&account=" + account;
        //         break;
        //     case 2:
        //         var d = [6, 18, 50, 100, 200];
        //         var playerId = this.playerInfo.playerId;
        //         var totalFee = d[nodeID] * this.playerInfo.exchangeRate;
        //         var appId = 1001;
        //         var account = this.playerInfo.account;
        //         var url = "http://ys.httpvip.com:8088/cz.php?userId=" + playerId + "&totalFee=" + totalFee + "&platform=" + platform + "&goodsId=" + nodeID + "&appId=" + appId + "&account=" + account;
        //         break;

        // }
        // this.rechargeMoney = 0;
        // cc.sys.openURL(url);
    },

    /**
     * 
     * @param {*} userId 
     * @param {*} nickname 
     * @param {*} msg 
     */
    customerServiceSendMessage_Function: function (userId, nickname, msg) {
        // this.setChat_Function(userId, nickname, msg);
        // this.writeChat_Function(userId, nickname, msg);
    },

    /**
     * 
     * @param {*} userId 
     * @param {*} nickname 
     * @param {*} message 
     */
    setChat_Function: function (userId, nickname, message) {
        var view = this.com_CustomerService.getChildByName("sv_View").getComponent("cc.ScrollView").content;
        var object = null;
        if (userId === this.playerInfo.playerId) {
            object = cc.instantiate(this.pb_Chat1);
            object.setPosition(this.chatMessagePosition[1][0] - 50, this.chatMessagePosition[1][1] + this.chatMessageArray.length * -160);
        } else if (userId == 10) {
            object = cc.instantiate(this.pb_Chat0);
            object.setPosition(this.chatMessagePosition[0][0] + 65, this.chatMessagePosition[0][1] + this.chatMessageArray.length * -160);
        }
        if (object) {
            object.getChildByName("lb_Chat").width = object.getChildByName("lb_Chat").width + 10;
            object.getChildByName("lb_Chat").height = object.getChildByName("lb_Chat").height + 10;
            Helper.loadHead(userId == 10 ? 99 : this.playerInfo.playerHeadId, (texture) => {
                object.getChildByName("sp").getChildByName("sp_Head").getComponent(cc.Sprite).spriteFrame = texture;
            });

            object.getChildByName("lb_Name").getComponent("cc.Label").string = nickname;
            object.getChildByName("lb_Chat").getComponent("cc.Label").string = message;
            this.chatMessageArray.push(object);
            view.addChild(object);
            object.getChildByName("sp_ChatFrame").width = object.getChildByName("lb_Chat").width + 20;
            object.getChildByName("sp_ChatFrame").height = object.getChildByName("lb_Chat").height + 20;
            this.updateCustomerServiceMessageContent_Function(view);
        }
    },

    /**
     * 将聊天数据写入缓存
     * @param {*} userId 
     * @param {*} nickname 
     * @param {*} message 
     */
    writeChat_Function: function (userId, nickname, message) {
        if (typeof this.chatData == "undefined") {
            this.chatData = this.playerInfo.readData_Function("chatData" + this.playerInfo.playerId);
        }
        var data = {
            userId: userId,
            nickname: nickname,
            message: message
        };
        if (!this.chatData) {
            this.chatData = new Array();
        }
        this.chatData.push(data);
        if (this.chatData.length > 30) {
            this.chatData.shift();
        }
        this.playerInfo.writeData_Function("chatData" + this.playerInfo.playerId, this.chatData);
    },

    /**
     * 读取缓存中的聊天记录
     */
    readChat_Function: function () {
        // this.chatData = null;
        // this.chatData = this.playerInfo.readData_Function("chatData" + this.playerInfo.playerId);

        // if (this.chatData != null) {
        //     for (var i = 0; i < this.chatData.length; i++) {
        //         this.setChat_Function(this.chatData[i].userId, this.chatData[i].nickname, this.chatData[i].message);
        //     }

        // }

    },

    /**
     * 
     * @param {*} node 
     */
    updateCustomerServiceMessageContent_Function: function (node) {
        node.height = 160 * this.chatMessageArray.length + 30;
        this.com_CustomerService.getChildByName("sv_View").getComponent("cc.ScrollView").scrollToBottom(.5);
    },

    /**
     * 
     */
    setSystemMessage_Function: function () {
        if (this.systemMessageArray) {
            this.systemMessageArray = [];
        } else {
            this.systemMessageArray = new Array(0);
        }
        this.com_SystemMessage.getChildByName("vi_View").removeAllChildren();
        this.systemMessageSign = 0;
        var node = new cc.Node;
        node.addComponent("cc.Label");
        node.anchorX = 0;
        node.anchorY = .5;
        node.getComponent("cc.Label").overflow = 0;
        node.getComponent("cc.Label").string = "本程序仅供演示严禁赌博";
        node.getComponent("cc.Label").fontSize = 26;
        node.getComponent("cc.Label").lineHeight = 28;
        node.setPosition(this.com_SystemMessage.getChildByName("vi_View").width / 2, 0);
        this.systemMessageArray.push(node);
        this.com_SystemMessage.getChildByName("vi_View").addChild(node);
        this.moveSystemMessage_Function();
    },

    /**
     * 
     */
    moveSystemMessage_Function: function () {
        if (this.systemMessageArray.length > 0) {
            var movePoint = cc.moveBy(8, -this.systemMessageArray[this.systemMessageSign].width - this.com_SystemMessage.getChildByName("vi_View").width, 0);
            var delayTime = cc.delayTime(2);
            var action = cc.sequence(movePoint, delayTime, cc.callFunc(function () {
                if (this.systemMessageArray.length > 5) {
                    for (var i = 0; i < this.systemMessageArray.length - 5; i++) {
                        this.com_SystemMessage.getChildByName("vi_View").children[i].destroy();
                    }
                    this.systemMessageArray.splice(0, this.systemMessageArray.length - 5);
                    this.systemMessageSign = this.systemMessageArray.length - 1;
                } else if (this.systemMessageSign < this.systemMessageArray.length - 1) {
                    this.systemMessageSign++;
                } else {
                    this.systemMessageSign = 0;
                }
                this.moveSystemMessage_Function();
            }, this));
            this.systemMessageArray[this.systemMessageSign].setPosition(this.com_SystemMessage.getChildByName("vi_View").width / 2, 0),
                this.systemMessageArray[this.systemMessageSign].runAction(action);
        }
    },

    /**
     * 
     * @param {*} msg 
     */
    updateSystemMessage_Function: function (msg) {
        if (!this.systemMessageArray) return;
        var node = new cc.Node();
        node.addComponent("cc.Label");
        node.anchorX = 0;
        node.anchorY = .5;
        node.getComponent("cc.Label").overflow = 0;
        node.getComponent("cc.Label").string = msg;
        node.getComponent("cc.Label").fontSize = 26;
        node.getComponent("cc.Label").lineHeight = 28;
        node.setPosition(this.com_SystemMessage.getChildByName("vi_View").width / 2, 0);
        this.systemMessageArray.push(node);
        this.com_SystemMessage.getChildByName("vi_View").addChild(node);
    },

    /**
     * 点击游戏按钮
     * @param {*} index 
     */
    gameMenuButtonClick_Function: function (index) {
        this.com_Button.getChildByName("bt_GameMenuBack").active = true;
        this.com_Button.getChildByName("bt_Mail").active = true;
        this.com_Button.getChildByName("bt_Setting").active = true;
        //隐藏子节点下的全部按钮
        for (var i = 0; i < this.node.getComponent("LobbyMenu").com_GameMenu.children.length; i++) {
            this.node.getComponent("LobbyMenu").com_GameMenu.children[i].active = false;
        }
        this.node.getComponent("LobbyMenu").com_GameMenu.getChildByName(index).active = true;
        this.com_BG.getChildByName("roomselectbg").active = true;
        this.com_BG.getChildByName("bg").active = false;
    },

    /**
     * 点击返回按钮
     */
    gameMenuBackButtonClick_Function: function () {
        this.com_Button.getChildByName("bt_GameMenuBack").active = false;
        this.com_Button.getChildByName("bt_Mail").active = true;
        this.com_Button.getChildByName("bt_Setting").active = true;
        //隐藏子节点下的全部按钮
        for (var i = 0; i < this.node.getComponent("LobbyMenu").com_GameMenu.children.length; i++) {
            this.node.getComponent("LobbyMenu").com_GameMenu.children[i].active = false;
        }

        var menuList = this.node.getComponent("LobbyMenu").com_GameMenu.getChildByName("Game_iconlist");
        //显示游戏按钮列表
        menuList.active = true;
        this.com_BG.getChildByName("roomselectbg").active = false;
        this.com_BG.getChildByName("bg").active = true;
    },

    /**
     * 点击设置按钮
     * @param {*} self 
     * @param {*} type 
     */
    settingControlButtonClick_Function: function (self, type) {
        var movePoint, action;
        switch (type) {
            case 0:
                if (this.playerInfo.musicControl) {
                    movePoint = cc.moveBy(.1, -120, 0);
                    action = cc.sequence(movePoint, cc.callFunc(function () {
                        this.playerInfo.musicControl = 0;
                        self.getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[0];
                        this.writeUserSettingDate_Function();
                    }, this));
                    cc.audioEngine.stop(this.bgmNumber);
                } else {
                    movePoint = cc.moveBy(.1, 120, 0);
                    action = cc.sequence(movePoint, cc.callFunc(function () {
                        this.playerInfo.musicControl = 1;
                        self.getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[1];
                        this.writeUserSettingDate_Function();
                    }, this));
                    this.bgmNumber = cc.audioEngine.play(this.au_LobbyBGM, true, 1);
                }
                break;
            case 1:
                if (this.playerInfo.soundEffectControl) {
                    movePoint = cc.moveBy(.1, -120, 0);
                    action = cc.sequence(movePoint, cc.callFunc(function () {
                        this.playerInfo.soundEffectControl = 0;
                        self.getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[0];
                        this.writeUserSettingDate_Function();
                    }, this));
                } else {
                    movePoint = cc.moveBy(.1, 120, 0);
                    action = cc.sequence(movePoint, cc.callFunc(function () {
                        this.playerInfo.soundEffectControl = 1;
                        self.getComponent("cc.Sprite").spriteFrame = this.sp_settingControl[1];
                        this.writeUserSettingDate_Function();
                    }, this));
                }
                break;
        }
        self.getChildByName("sp_Control").runAction(action);
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

    /**
     * 断开连接
     */
    checkNetWorkConnected_Function: function () {
        return this.disconneted;
    },

    /**
     * 中断socket服务器
     * @param {*} msg 
     */
    netWorkDisconneted_Function: function (msg) {
        if (this.com_Tips == null) {
            return;
        }
        this.showMessagebox_Function(msg, 0, 4);
        this.disconneted = true;
        if (cc.sys.isNative || this.netWork.socket !== null) {
            this.netWork.socket.close();
        }
        this.netWork.socket = null;
    },

    /**
     * 重新连接
     */
    reconntetedGame_Function: function () {
        cc.audioEngine.stopAll();
        switch (this.playerInfo.isAutoLogin) {
            case 0:
                this.com_MessageBox.active = false;
                break;
            case 1:
                var account = this.node.getComponent("LobbyRegister").account;
                var password = this.node.getComponent("LobbyRegister").password;
                if (this.netWork.socket !== null) {
                    if (!cc.sys.isNative) {
                        this.netWork.socket.close();
                    }
                    for (var socket in this.netWork.socket.$events) {
                        if (socket !== 0) {
                            this.netWork.socket.removeListen(socket);
                        }
                    }
                    this.netWork.socket = null;
                    this.netWork.connected = false;
                }
                this.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "正在重新连接";
                this.netWork.loginAccount_Function(this.playerInfo.loginIp, account, password);
                break;
            case 2:
                this.netWork.accountChange = true;
                this.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "正在重新连接";
                this.netWork.loginAccount_Function(this.playerInfo.loginIp, null, null, this.playerInfo.loginCode);
                break;
        }
    },

    /**
     * 检测更新
     * @param {*} gameName 
     */
    checkUpdate_Function: function (gameName) {
        if (gameName !== "") {
            this.checkUpdateGameName = gameName;
        } else if (this.checkUpdateGameName === "") {
            return;
        }
        this.bg_Black.active = true;
        this.node.getComponent("GameUpdate").checkGameUpdate_Function(this.checkUpdateGameName);
        this.checkUpdateTimeOut = true;
    },

    /**
     * 显示提示框
     * @param {*} msg 
     * @param {*} type 
     * @param {*} operationType 
     */
    messageBoxCallBack_Function: function (msg, type, operationType) {
        switch (type) {
            case 0:
                this.com_MessageBox_CB.getChildByName("bt_Confirm").setPosition(0, -130);
                this.com_MessageBox_CB.getChildByName("bt_Cancel").active = false;
                break;
            case 1:
                this.com_MessageBox_CB.getChildByName("bt_Confirm").setPosition(-120, -130);
                this.com_MessageBox_CB.getChildByName("bt_Cancel").active = true;
                break;
        }
        this.com_MessageBox_CB.active = true,
            this.com_MessageBox_CB.getChildByName("lb_Tips").getComponent("cc.Label").string = msg,
            this.operationType = operationType
    },

    /**
     * 显示提示信息
     * @param {*} msg 
     * @param {*} type 
     * @param {*} operationType 
     */
    showMessagebox_Function: function (msg, type, operationType) {
        this.node.getChildByName('Loading').active = false; //隐藏加载界面
        this.bg_Black.active = true;
        for (var i = 3; i < this.com_MessageBox.children.length; i++) {
            this.com_MessageBox.children[i].active = false;
        }
        this.com_MessageBox.active = true;
        this.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = msg;
        switch (type) {
            case 0:
                this.com_MessageBox.getChildByName("bt_Reconnet").active = true;
                this.com_MessageBox.getChildByName("bt_Reconnet").setPosition(0, -130);
                break;
            case 1:
                this.com_MessageBox.getChildByName("bt_Confirm").active = true;
                this.com_MessageBox.getChildByName("bt_Confirm").setPosition(0, -130);
                break;
            case 2:
                this.com_MessageBox.getChildByName("bt_Cancel").active = true;
                this.com_MessageBox.getChildByName("bt_Cancel").setPosition(-130, -130);
                this.com_MessageBox.getChildByName("bt_Confirm").active = true;
                this.com_MessageBox.getChildByName("bt_Confirm").setPosition(130, -130);
                break;
            case 3:
                this.com_MessageBox.getChildByName("bt_Cancel").active = true;
                this.com_MessageBox.getChildByName("bt_Cancel").setPosition(-130, -130);
                this.com_MessageBox.getChildByName("bt_GoToMall").active = true;
                this.com_MessageBox.getChildByName("bt_GoToMall").setPosition(130, -130);
                break;
            case 4:
                this.com_MessageBox.getChildByName("sp_Award0").active = true;
                this.com_MessageBox.getChildByName("sp_Award0").setPosition(0, -20);
                this.com_MessageBox.getChildByName("db_Award0").active = true;
                this.com_MessageBox.getChildByName("db_Award0").setPosition(0, -20);
                var db_Award0 = this.com_MessageBox.getChildByName("db_Award0").getComponent("dragonBones.ArmatureDisplay");
                db_Award0.playAnimation("db_Award", 1);
                this.com_MessageBox.getChildByName("bt_Confirm").active = true;
                this.com_MessageBox.getChildByName("bt_Confirm").setPosition(0, -130);
                break;
            case 5:
                this.com_MessageBox.getChildByName("sp_Award1").active = true;
                this.com_MessageBox.getChildByName("sp_Award1").setPosition(0, -20);
                this.com_MessageBox.getChildByName("db_Award1").active = true;
                this.com_MessageBox.getChildByName("db_Award1").setPosition(0, -20);
                var db_Award1 = this.com_MessageBox.getChildByName("db_Award1").getComponent("dragonBones.ArmatureDisplay");
                db_Award1.playAnimation("db_Award", 1);
                this.com_MessageBox.getChildByName("bt_Confirm").active = true;
                this.com_MessageBox.getChildByName("bt_Confirm").setPosition(0, -130);
                break;
            case 6:
                this.com_MessageBox.getChildByName("sp_Award0").active = true;
                this.com_MessageBox.getChildByName("sp_Award0").setPosition(-80, -20);
                this.com_MessageBox.getChildByName("sp_Award1").active = true;
                this.com_MessageBox.getChildByName("sp_Award1").setPosition(80, -20);
                this.com_MessageBox.getChildByName("db_Award0").active = true;
                this.com_MessageBox.getChildByName("db_Award1").active = true;
                this.com_MessageBox.getChildByName("db_Award0").setPosition(-80, -20);
                this.com_MessageBox.getChildByName("db_Award1").setPosition(80, -20);
                var award0 = this.com_MessageBox.getChildByName("db_Award0").getComponent("dragonBones.ArmatureDisplay");
                var award1 = this.com_MessageBox.getChildByName("db_Award1").getComponent("dragonBones.ArmatureDisplay");
                award0.playAnimation("db_Award", 1);
                award1.playAnimation("db_Award", 1);
                this.com_MessageBox.getChildByName("bt_Confirm").active = true;
                this.com_MessageBox.getChildByName("bt_Confirm").setPosition(0, -130);
                break;
        }
        this.messageBoxOperationType = operationType;
    },

    /**
     * 获得范围随机数
     * @param {*} min 
     * @param {*} max 
     */
    getRandom_Function: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    /**
     * 更新
     * @param {*} dt 
     */
    update: function (dt) {
        if (this.checkUpdateTimeOut) {
            if (this.checkUpdateTime > 0) {
                this.checkUpdateTime -= dt;
                this.checkUpdateTimeLabel = parseInt(this.checkUpdateTime);
            } else {
                this.checkUpdateTimeOut = false;
            }
        }
        if (this.codeTimeCount) {
            if (this.getCodeTime > 0) {
                this.getCodeTime -= dt;
                this.com_PlayerInfo.getChildByName("com_BindPhone").getChildByName("bt_GetCode").getChildByName("lb_Time").getComponent("cc.Label").string = parseInt(this.getCodeTime) + "s";
            } else {
                this.com_PlayerInfo.getChildByName("com_BindPhone").getChildByName("bt_GetCode").getChildByName("lb_Time").getComponent("cc.Label").string = "";
                this.com_PlayerInfo.getChildByName("com_BindPhone").getChildByName("bt_GetCode").getComponent("cc.Button").interactable = true;
            }
        }
        if (this.tempNetWork && this.tempNetWork.eventOn) {
            switch (this.playerInfo.gameName) {
                case "Fish":
                    this.tempNetWork.fishSocket.disconnect();
                    this.tempNetWork.fishSocket = null;
                    break;
                case "Bde":
                    this.tempNetWork.bdeGameSocket.disconnect();
                    this.tempNetWork.bdeGameSocket = null;
                    break;
                case "GrabBull":
                    this.tempNetWork.grabBullSocket.disconnect();
                    this.tempNetWork.grabBullSocket = null;
                    break;
                case "TwoEight":
                    this.tempNetWork.twoEightGameSocket.disconnect();
                    this.tempNetWork.twoEightGameSocket = null;
                    break;
                case "Bull":
                    this.tempNetWork.bullSocket.disconnect();
                    this.tempNetWork.bullSocket = null;
                    break;
                case "LineGame":
                    this.tempNetWork.lineGameGameSocket.disconnect();
                    this.tempNetWork.lineGameGameSocket = null;
                    break;
                case "Land":
                    break;
                case "hongbao":
                    this.tempNetWork.gameSocket.disconnect();
                    this.tempNetWork.gameSocket = null;
                    break;
                case "Fishhaiwang2":
                    this.tempNetWork.fishhaiwang2Socket.disconnect();
                    this.tempNetWork.fishhaiwang2Socket = null;
                    break;
				case "Shenhaibuyu":
                    this.tempNetWork.shenhaibuyuSocket.disconnect();
                    this.tempNetWork.shenhaibuyuSocket = null;
                    break;
				case "Leitingzhanji":
                    this.tempNetWork.leitingzhanjiSocket.disconnect();
                    this.tempNetWork.leitingzhanjiSocket = null;
                    break;
            }
            this.tempNetWork.eventOn = false;
            this.tempNetWork = null;
            this.playerInfo.gameName = "Lobby";
        }
    },

    setPoxyUI: function (result) {
        const data = result.data;
        console.log('poxy:', data);
        if (!!result.status && result.status == 1) {
            this.poxyUI.active = true;
            this.changePoxyPage(1);
            this.poxyUI.getChildByName('dl_a').getChildByName('renshu').getComponent(cc.Label).string = data.numA;
            this.poxyUI.getChildByName('dl_b').getChildByName('renshu').getComponent(cc.Label).string = data.numB;
            this.poxyUI.getChildByName('dl_c').getChildByName('renshu').getComponent(cc.Label).string = data.numC;
            this.poxyUI.getChildByName('zongshouyi').getChildByName('shuzi').getComponent(cc.Label).string = data.AllYongJin;
            this.poxyUI.getChildByName('benzhoushishi').getChildByName('shuzi').getComponent(cc.Label).string = data.nowIncome;
            let view = this.poxyUI.getChildByName('com_symx').getChildByName('list_view').getChildByName('view').getChildByName('content');
            view.removeAllChildren();
            let time = data.timeDiff;
            this.poxyTime(time);
            this.interval_poxy = setInterval(() => {
                time--;
                time >= 0 && this.poxyTime(time);
            }, 1000);
            let stack = new Array();
            if (!!data.person.a) {
                for (let i in data.person.a) {
                    stack.push({
                        grade: 'A',
                        data: data.person.a[i],
                        name: i,
                    });
                }
            }
            if (!!data.person.b) {
                for (let i in data.person.b) {
                    stack.push({
                        grade: 'B',
                        data: data.person.b[i],
                        name: i,
                    });
                }
            }
            if (!!data.person.c) {
                for (let i in data.person.c) {
                    stack.push({
                        grade: 'C',
                        data: data.person.c[i],
                        name: i,
                    });
                }
            }

            for (let i in stack) {
                let lt = cc.instantiate(this.poxyPb);
                view.addChild(lt);
                let ch = lt.getChildByName('id').children;
                for (let j in ch) {
                    ch[j].active = ch[j]._name == stack[i].grade;
                }
                let red = new cc.Color(255, 0, 0, 255);
                let green = new cc.Color(109, 148, 48, 255);
                lt.getChildByName('id').getComponent(cc.Label).string = stack[i].name;
                lt.getChildByName('dqks').getComponent(cc.Label).string = stack[i].data[0];
                lt.getChildByName('dqks').color = stack[i].data[0] >= 0 ? green : red;
                lt.getChildByName('zks').getComponent(cc.Label).string = stack[i].data[1];
                lt.getChildByName('zks').color = stack[i].data[1] >= 0 ? green : red;
                lt.getChildByName('sssy').getComponent(cc.Label).string = stack[i].data[2];
                lt.getChildByName('sssy').color = stack[i].data[2] >= 0 ? green : red;
                lt.getChildByName('sssy1').getComponent(cc.Label).string = stack[i].data[3];
                lt.getChildByName('sssy1').color = stack[i].data[3] >= 0 ? green : red;
            }
        } else if (!!result.status && result.status == 2) {
            this.showMessagebox_Function("未绑定代理", 1, 4);
        }
    },

    poxyTime: function (time) {
        let day = parseInt(time / 86400);
        let hour = parseInt(time / 3600 % 24);
        let min = parseInt(time / 60 % 60);
        let sec = parseInt(time % 60);
        let timeLbl = this.poxyUI.getChildByName('bg').getChildByName('time').getComponent(cc.Label);
        timeLbl.string = `距离结算还有${day}天${hour}小时${min}分钟${sec}秒`;
    },

    changePoxyPage: function (page) {
        if (page == 1) {
            this.poxyUI.getChildByName('btn_symx').getComponent(cc.Button).interactable = false;
            this.poxyUI.getChildByName('btn_tgjc').getComponent(cc.Button).interactable = true;
            this.poxyUI.getChildByName('com_symx').active = true;
            this.poxyUI.getChildByName('com_tgjc').active = false;
        } else if (page == 2) {
            this.poxyUI.getChildByName('btn_symx').getComponent(cc.Button).interactable = true;
            this.poxyUI.getChildByName('btn_tgjc').getComponent(cc.Button).interactable = false;
            this.poxyUI.getChildByName('com_symx').active = false;
            this.poxyUI.getChildByName('com_tgjc').active = true;
        }
    },

    closePoxyUI: function () {
        clearInterval(this.interval_poxy);
        this.poxyUI.active = false;
    },

    changeMallUI: function (id) {
        this.com_Mall.getChildByName('com_chongzhi_01').active = id == 0;
        this.com_Mall.getChildByName('com_kefulist').active = id == 1;
        this.com_Mall.getChildByName('com_CustomerService').active = id == 2;
        this.com_Mall.getChildByName('btn_kefuzhichong').getComponent(cc.Button).interactable = id == 0;
        this.com_Mall.getChildByName('btn_xianshang').getComponent(cc.Button).interactable = id != 0;
        if (id == 1) {
            Helper.http('http://yidaliadmin.youmegame.cn/index.php/api/kefu/lists').then(e => {
                console.log('得到服务器信息' + JSON.stringify(e));
                if (!!e.code) {
                    let pb = this.com_Mall.getChildByName('customServerPb');
                    let pr = this.com_Mall.getChildByName('com_kefulist').getChildByName('scrollview').getChildByName('view').getChildByName('content');
                    pr.removeAllChildren();
                    for (let i in e.data) {
                        let p = cc.instantiate(pb);
                        p.getChildByName('kefu_name').getComponent(cc.Label).string = e.data[i].name;
                        p.getChildByName('btn_shop_recharge1_0').getComponent(cc.Button).clickEvents[0].customEventData = JSON.stringify(e.data[i]);
                        p.active = true;
                        pr.addChild(p);
                    }
                }
            });
        } else if (id == 2) {
            let view = this.com_CustomerService.getChildByName("sv_View").getComponent("cc.ScrollView").content;
            this.chatMessageArray = [];
            view.removeAllChildren();
        }
    },
    //显示vip界面
    show_vip() {
        let date = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
        if (date == this.playerInfo.readData_Function("todayTime")) {
            this.com_vip.active = false;
        } else {
            this.com_vip.active = true;
            this.playerInfo.writeData_Function("todayTime", date);
        }
    },

});