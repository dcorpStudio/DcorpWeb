const i18n = require('i18n');
cc.Class({
    extends: cc.Component,

    properties: {
        canvasNode: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function () { },

    /**
     * 点击登陆
     */
    loginMenuLoginButtonClick_Function: function () {
        var account = this.canvasNode.getComponent("LobbyMain").com_Login.getChildByName("eb_Account").getComponent("cc.EditBox").string;
        var password = this.canvasNode.getComponent("LobbyMain").com_Login.getChildByName("eb_Password").getComponent("cc.EditBox").string;
        this.canvasNode.getComponent("LobbyMain").netWork.loginClick = true;
        if (account !== "" && password !== "") {
            var self = this;
            setTimeout(function () {
                self.canvasNode.getComponent("LobbyMain").netWork.accountChange = true;
                self.canvasNode.getComponent("LobbyMain").netWork.loginAccount_Function(self.canvasNode.getComponent("LobbyMain").playerInfo.loginIp, account, password);
            }, 1000);
            this.node.getComponent("cc.Button").interactable = false;
        }
    },

    /**
     * 点击打开注册界面
     */
    loginMenuRegisterButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").com_Login.active = false;
        this.canvasNode.getComponent("LobbyMain").com_Register.active = true;
    },

    /**
     * 点击关闭注册界面
     */
    registerMenuBackToLoginButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").com_Login.active = true;
        this.canvasNode.getComponent("LobbyMain").com_Register.active = false;
    },

    /**
     * 点击注册
     */
    registerMenuRegisterButtonClick_Function: function () {
        var account = this.canvasNode.getComponent("LobbyMain").com_Register.getChildByName("普通注册").getChildByName("eb_Account").getComponent("cc.EditBox").string;
        var password = this.canvasNode.getComponent("LobbyMain").com_Register.getChildByName("普通注册").getChildByName("eb_Password").getComponent("cc.EditBox").string;
        var confirm = this.canvasNode.getComponent("LobbyMain").com_Register.getChildByName("普通注册").getChildByName("eb_PasswordConfirm").getComponent("cc.EditBox").string;
        if (!account) {
            this.canvasNode.getComponent("LobbyMain").com_Register.getChildByName("普通注册").getChildByName("eb_Account").getComponent("cc.EditBox").string = "账号不能为空";
            return;
        }
        if (!password) {
            this.canvasNode.getComponent("LobbyMain").com_Register.getChildByName("普通注册").getChildByName("eb_Password").getComponent("cc.EditBox").string = "密码不能为空";
            return;
        }

        if (account && password && confirm) {
            if (password.length < 6) {
                this.canvasNode.getComponent("LobbyMain").com_Register.getChildByName("普通注册").getChildByName("eb_Password").getComponent("cc.EditBox").string = "不能少于6个英文或者数字";
                return;
            }
            if (account.length < 6) {
                this.canvasNode.getComponent("LobbyMain").com_Register.getChildByName("普通注册").getChildByName("eb_Account").getComponent("cc.EditBox").string = "不能少于6个英文或者数字";
                return;
            }

            if (password !== confirm) {
                this.canvasNode.getComponent("LobbyMain").com_Register.getChildByName("普通注册").getChildByName("eb_PasswordConfirm").getComponent("cc.EditBox").string = "两次密码并不相同";
                return;
            }
            this.canvasNode.getComponent("LobbyRegister").mlapiRegister_Function(account, password);
        }
    },

    /**
     * 
     */
    playerInfoButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.active = true;
        this.canvasNode.getComponent("LobbyMain").bg_Black.active = true;
    },

    /**
     * 
     */
    mallButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").bg_Black.active = true;
        this.canvasNode.getComponent("LobbyMain").com_Mall.active = true;
        this.canvasNode.getComponent("LobbyMain").changeMallUI(0);
        this.canvasNode.getComponent("LobbyMain").com_Mall.getChildByName("com_chongzhi_01").getChildByName("lb_PlayerId").getComponent("cc.Label").string = "ID: " + this.canvasNode.getComponent("LobbyMain").playerInfo.playerId;
    },

    /**
     * 
     */
    mallMenuBackButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").bg_Black.active = false;
        this.canvasNode.getComponent("LobbyMain").com_Mall.active = false;
    },

    /**
     * 
     */
    mallMenuRechangeButtonClick_Function: function () {
        var index = 0;
        switch (this.node.rechargeId) {
            case 0:
                index = 0;
                break;
            case 1:
                index = 1;
                break;
            case 2:
                index = 2;
                break;
            case 3:
                index = 3
        }
        var money = this.canvasNode.getComponent("LobbyMain").rechargeMoneyArray[index];
        this.canvasNode.getComponent("LobbyMain").com_Mall.getChildByName("com_chongzhi_01").getChildByName("eb_RechargeMoney").getComponent("cc.EditBox").string = money.toString();
    },

    /**
     * 
     */
    mallMenuAliPayButtonClick_Function: function () {
        var money = parseFloat(this.canvasNode.getComponent("LobbyMain").com_Mall.getChildByName('com_chongzhi_01').getChildByName("eb_RechargeMoney").getComponent("cc.EditBox").string);

        //if (money && money >= 50) {
        this.canvasNode.getComponent("LobbyMain").pay_Function(money, null, 2);
        //}
    },

    /**
     * 
     */
    mallMenuWeChatPayButtonClick_Function: function () {
        var money = parseFloat(this.canvasNode.getComponent("LobbyMain").com_Mall.getChildByName("com_chongzhi_01").getChildByName("eb_RechargeMoney").getComponent("cc.EditBox").string);
        //if (money && money >= 50) {
        this.canvasNode.getComponent("LobbyMain").pay_Function(money, null, 1);
        //}
    },

    /**
     * 
     */
    mallMenuQqPayButtonClick_Function: function () {
        var money = parseFloat(this.canvasNode.getComponent("LobbyMain").com_Mall.getChildByName("com_chongzhi_01").getChildByName("eb_RechargeMoney").getComponent("cc.EditBox").string);
        //if (money && money >= 50) {
        this.canvasNode.getComponent("LobbyMain").pay_Function(money, null, 2);
        //}
    },
    mallMenuQuickPayButtonClick_Function: function () { },
    /**
     * 
     */
    rechargeWebViewCloseButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").com_Mall.getChildByName("com_RechargeWeb").active = false;
    },

    /**
     * 
     */
    mailButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").bg_Black.active = true;
        this.canvasNode.getComponent("LobbyMain").com_Mail.active = true;
        this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("getEmail");
    },

    /**
     * 
     */
    mailMenuCloseButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").com_Mail.active = false;
        this.canvasNode.getComponent("LobbyMain").bg_Black.active = false;
    },

    /**
     * 
     */
    mailMenuMailSelectButtonClick: function () {
        this.canvasNode.getMailInfo_Function(this);
    },

    /**
     * 
     */
    mailMenuGetButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").getMail_Function();
    },

    /**
     * 点击打开设置界面
     */
    settingButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").bg_Black.active = true;
        this.canvasNode.getComponent("LobbyMain").com_Setting.active = true;
    },

    /**
     * 点击关闭设置界面
     */
    settingMenuCloseButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").bg_Black.active = false;
        this.canvasNode.getComponent("LobbyMain").com_Setting.active = false;
    },

    /**
     * 点击背景音乐按钮
     */
    settingMenuMusicButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").settingControlButtonClick_Function(this.node, 0);
    },

    /**
     * 点击游戏音效按钮
     */
    settingMenuSoundEffectButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").settingControlButtonClick_Function(this.node, 1);
    },

    /**
     * 点击设置面板中的退出游戏按钮
     */
    settingMenuExitButtonClick_Function: function () {
        cc.game.end();
    },

    /**
     * 点击分享按钮
     */
    shareButtonClick_Function: function () {
        var channel = this.canvasNode.getComponent("LobbyMain").netWork.getUrlCode_Function("channel");
        if (channel) {
            cc.sys.openURL(this.canvasNode.getComponent("LobbyMain").playerInfo.shareUrl + "?channel=" + channel);
            return;
        } else {
            channel = this.canvasNode.getComponent("LobbyMain").playerInfo.guest.split("_");
            cc.sys.openURL(this.canvasNode.getComponent("LobbyMain").playerInfo.shareUrl + "?channel=" + channel[0]);
            return;
        }
    },

    /**
     * 点击兑换按钮
     */
    exchangeButtonClick_Function: function () {
        cc.log('点击兑换按钮============')
        this.canvasNode.getComponent("LobbyMain").bg_Black.active = true;
        if (this.canvasNode.getComponent("LobbyMain").playerInfo.isOffical) {
            if (!this.canvasNode.getComponent("LobbyMain").playerInfo.aliAccount && this.canvasNode.getComponent("LobbyMain").playerInfo.isBindAli) {
                this.canvasNode.getComponent("LobbyMain").showMessagebox_Function(i18n.t("TIP2_MSG"), 2, 2);
            } else {
                //打开兑换界面
            }
        } else {
            this.canvasNode.getComponent("LobbyMain").showMessagebox_Function(i18n.t("TIP1_MSG"), 2, 1);
        }
    },

    /**
     * 
     */
    customerServiceButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").bg_Black.active = true;
        this.canvasNode.getComponent("LobbyMain").com_CustomerService.active = true;
    },
    customerServiceMenuSendButtonClick_Function: function () {
        var e = this.canvasNode.getComponent("LobbyMain").com_CustomerService.getChildByName("eb_Chat").getComponent("cc.EditBox").string;
        "" !== e && (this.canvasNode.getComponent("LobbyMain").sendMessage = e, this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("sendMsgToUser", {
            userId: 10,
            msg: e
        })),
            this.canvasNode.getComponent("LobbyMain").com_CustomerService.getChildByName("eb_Chat").getComponent("cc.EditBox").string = ""
    },

    /**
     * 
     */
    customerServiceMenuCloseButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").bg_Black.active = false;
        this.canvasNode.getComponent("LobbyMain").com_CustomerService.active = false;
    },

    IrishLuckButtonClick_Function: function () {
        window.IrishLuck_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
        this.QieHuanScene('Slot_IrishLuck');
    },

    IcelandButtonClick_Function: function () {
        window.Iceland_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
        this.QieHuanScene('Slot_Iceland');
    },

    PantherMoonButtonClick_Function: function () {
        window.PantherMoon_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
        this.QieHuanScene('Slot_PantherMoon');
    },

    IndianMythButtonClick_Function: function () {
        window.IndianMyth_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
        this.QieHuanScene('Slot_IndianMyth');
    },

    JapanFortureButtonClick_Function: function () {
        window.JapanForture_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
        this.QieHuanScene('Slot_JapanForture');
    },

    /**
     * 
     */
    gameMenuBackButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").gameMenuBackButtonClick_Function();
    },

    /**
     * 点击进入抢庄牛牛房间
     */
    grabBullRoomButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").loginGameRoom_Function(this, "GrabBull");
    },
    /**
    * 点击进入红包达人房间
    */
    hongbaoRoomButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").loginGameRoom_Function(this, "hongbao");
    },


    /**
     * 点击进入斗地主房间
     */
    landRoomButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").loginGameRoom_Function(this, "Land");
    },

    /**
     * 点击进入跑得快房间
     */
    runRoomButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").loginGameRoom_Function(this, "Runing");
    },

    /**
     * 点击进入德州扑克房间
     */
    dzRoomButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").loginGameRoom_Function(this, "Holdem");
    },

    /**
     * 点击进入炸金花房间
     */
    zjhRoomButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").loginGameRoom_Function(this, "Flower");
    },

    /**
     * 点击进入钻石捕鱼房间
     */
    fishRoomButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").loginGameRoom_Function(this, "Fish");
    },
    /**
     * 点击进入捕鱼海王2房间
     */
    fishRoom_haiwang2ButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").loginGameRoom_Function(this, "Fishhaiwang2");
    },
	/**
     * 点击进入雷霆战机房间
     */
    fishRoom_LeitingzhanjiButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").loginGameRoom_Function(this, "leitingzhanji");
    },
	/**
     * 点击进入快乐捕鱼房间
     */
    fishRoom_KuailebuyuButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").loginGameRoom_Function(this, "kuailebuyu");
    },
		/**
     * 点击进入捕鱼海王2房间
     */
    fishRoom_SHBYButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").loginGameRoom_Function(this, "shenhaibuyu");
    },

    /**
     * 跳转各种老虎机界面
     */
    QieHuanScene: function (sceneName) {
        if (this.canvasNode.getComponent('LobbyMain').netWork.connected == false) { //判断大厅服务器是否连接
            return;
        }
        var self = this;
        let loadingNode = self.canvasNode.getChildByName('Loading');
        loadingNode.active = true; //点亮加载游戏界面
        let progressBarNode = loadingNode.getChildByName('loadingProgressBar');
        let loadTxt = cc.find("pb_Loading_txt", progressBarNode);
        //初始化
        progressBarNode.getComponent(cc.ProgressBar).progress = 0;
        loadTxt.getComponent(cc.Label).string = 0 + "%";
        this.p = 0;
        cc.director.preloadScene(sceneName, (completedCount, totalCount, item) => { //预加载场景&监听加载进度
            if (this.p < completedCount / totalCount) {
                let loadProgress = completedCount / totalCount;
                this.p = loadProgress;
                progressBarNode.getComponent(cc.ProgressBar).progress = loadProgress;
                loadTxt.getComponent(cc.Label).string = (loadProgress * 100).toFixed(2) + "%";
            }
        }, (err, scene) => {
            // loadingNode.active = false; //隐藏加载游戏界面
            cc.audioEngine.stopAll();
            cc.director.loadScene(sceneName);
        });
    },

    /**
     * 普通跳转场景界面
     */
    QieHuanScene_normal(sceneName, cb) {
        let loadingNode = cc.find("Canvas").getChildByName('Loading');
        loadingNode.active = true; //点亮加载游戏界面
        let progressBarNode = loadingNode.getChildByName('loadingProgressBar');
        let loadTxt = cc.find("pb_Loading_txt", progressBarNode);
        //初始化
        progressBarNode.getComponent(cc.ProgressBar).progress = 0;
        loadTxt.getComponent(cc.Label).string = 0 + "%";
        this.p = 0;
        cc.director.preloadScene(sceneName, (completedCount, totalCount, item) => { //预加载场景&监听加载进度
            if (this.p < completedCount / totalCount) {
                let loadProgress = completedCount / totalCount;
                this.p = loadProgress;
                progressBarNode.getComponent(cc.ProgressBar).progress = loadProgress;
                loadTxt.getComponent(cc.Label).string = (loadProgress * 100).toFixed(2) + "%";
            }
        }, (err, scene) => {
            // loadingNode.active = false; //隐藏加载游戏界面
            cc.audioEngine.stopAll();
            cc.director.loadScene(sceneName, cb);
        });
    },

    /**
     * 
     */
    updateMessageBoxConfirmButtonClick_Function: function () {
        this.node.active = false;
        this.node.parent.getChildByName("bt_Close").active = false;
        this.canvasNode.getComponent("LobbyMain").checkUpdate_Function("");
    },

    /**
     * 
     */
    updateMessageBoxCloseuttonClick_Function: function () {
        this.canvasNode.getComponent("GameUpdate").gameName = "";
        this.canvasNode.getComponent("LobbyMain").com_UpdateMessageBox.active = false;
        this.canvasNode.getComponent("LobbyMain").bg_Black.active = false;
    },
    /**
     * 
     */
    messageBoxConfirmButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").com_MessageBox.active = false;
        switch (this.canvasNode.getComponent("LobbyMain").messageBoxOperationType) {
            case 1:
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.active = true;
                this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("bt_CreateAccount"), "com_CreateAccount");
                break;
            case 2:
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.active = true;
                this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("bt_BindAli"), "com_BindAli");
                break;
            case 3:
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.active = true;
                this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("bt_BindPhone"), "com_BindPhone");
                break;
            case 4:
                this.canvasNode.getComponent("LobbyMain").bg_Black.active = false;
                break;
            case 5:
                this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("BankInfo", {
                    act: 3,
                    cardId: this.canvasNode.getComponent("LobbyMain").editCardId
                });
                break;
            case 6:
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.active = false;
                this.canvasNode.getComponent("LobbyRegister").registerAccount_Function(this.canvasNode.getComponent("LobbyMain").playerInfo.loginIp, false);
                break;
            case 7:
                var account = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAccount").getChildByName("eb_Account").getComponent("cc.EditBox").string;
                var password = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAccount").getChildByName("eb_Password").getComponent("cc.EditBox").string;
                this.canvasNode.getComponent("LobbyMain").netWork.loginClick = true;
                var self = this;
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.active = false;
                this.canvasNode.getComponent("LobbyMain").com_Tips.getChildByName("sp_Logining").active = true;
                var timer = setTimeout(function () {
                    clearTimeout(timer);
                    self.canvasNode.getComponent("LobbyMain").netWork.logoutAccount_Function();
                    self.canvasNode.getComponent("LobbyMain").netWork.accountChange = true;
                    self.canvasNode.getComponent("LobbyMain").netWork.loginAccount_Function(self.canvasNode.getComponent("LobbyMain").playerInfo.loginIp, account, password);
                    self.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("bt_PlayerInfoBack").getComponent("cc.Button").interactable = false;
                }, 1000);
                break;
            case 8:
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.active = true;
                this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("bt_ChangeAccount"), "com_ChangeAccount");
                break;
            case 9:
                this.closeGame();
            case 10:
                this.log_out();
        }
        this.canvasNode.getComponent("LobbyMain").messageBoxOperationType = 0;
    },

    /**
     * 
     */
    messageBoxCancelButtonClick_Function: function () {
        switch (this.canvasNode.getComponent("LobbyMain").messageBoxOperationType) {
            case 1:
            case 2:
            case 3:
            case 4:
                this.canvasNode.getComponent("LobbyMain").bg_Black.active = false;
                break;
            case 5:
            case 6:
            case 7:
        }
        this.canvasNode.getComponent("LobbyMain").com_MessageBox.active = false;
        this.canvasNode.getComponent("LobbyMain").messageBoxOperationType = 0;
    },

    /**
     * 
     */
    messageBoxGoToMallButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").com_MessageBox.active = false;
        this.mallButtonClick_Function();
    },

    /**
     * 点击重新连接游戏按钮
     */
    reconnetedButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").reconntetedGame_Function();
    },

    /**
     * 点击玩家信息按钮
     */
    playerInfoMenuBackButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.active = false;
        this.canvasNode.getComponent("LobbyMain").bg_Black.active = false;
    },

    /**
     * 
     */
    playerInfoMenuCreateAccountButtonClick_Function: function () {
        this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.node, "com_CreateAccount");
    },
    /**
     * 
     */
    playerInfoMenuChangeNameButtonClick_Function: function () {
        this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.node, "com_ChangeName");
    },
    /**
     * 
     */
    playerInfoMenuChangeAccountButtonClick_Function: function () {
        this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.node, "com_ChangeAccount");
    },
    /**
     * 
     */
    playerInfoMenuBindAliButtonClick_Function: function () {
        this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.node, "com_BindAli");
    },
    /**
     * 
     */
    playerInfoMenuBindedAliButtonClick_Function: function () {
        this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.node, "com_BindedAli");
    },
    /**
     * 
     */
    playerInfoMenuBindCreditCardButtonClick_Function: function () {
        this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.node, "com_BindCreditCard");
    },
    /**
     * 
     */
    playerInfoMenuBindedCreditCardButtonClick_Function: function () {
        this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.node, "com_BindedCreditCard");
    },
    /**
     * 
     */
    playerInfoMenuChangePasswordButtonClick_Function: function () {
        this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.node, "com_ChangePassword");
    },

    /**
     * 
     */
    playerInfoMenuBindPhoneButtonClick_Function: function () {
        if (this.canvasNode.getComponent("LobbyMain").playerInfo.phoneNumber) {
            this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.node, "com_BindedPhone");
        } else {
            this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.node, "com_BindPhone");
        }
    },

    playerInfoMenuFaceClick_Function: function () {
        this.playerInfoButtonsAndComponentChange_Function(this.canvasNode, this.node, "com_face");
        this.node.parent.getChildByName('com_face').getComponent('LobbyButtonClick').changeHeadSex_Function(null, 1);
    },

    /**
     * 
     * @param {*} mainRoot 
     * @param {*} comRoot 
     * @param {*} index 
     */
    playerInfoButtonsAndComponentChange_Function: function (mainRoot, comRoot, index) {
        for (var i = 2; i < 10; i++) {
            mainRoot.getComponent("LobbyMain").com_PlayerInfo.children[i].getComponent("cc.Button").interactable = true;
        }
        comRoot.getComponent("cc.Button").interactable = false;
        for (i = 10; i < mainRoot.getComponent("LobbyMain").com_PlayerInfo.children.length; i++) {
            mainRoot.getComponent("LobbyMain").com_PlayerInfo.children[i].active = false;
        }
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName(index).active = true;
    },

    /**
     * 创建账号
     */
    createAccountMenuCreateButtonClick_Function: function () {
        var account = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("eb_Account").getComponent("cc.EditBox").string;
        var password = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("eb_Password").getComponent("cc.EditBox").string;
        var confirm = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("eb_PasswordConfirm").getComponent("cc.EditBox").string;
        this.editBoxEditingBegin_Function("createAccount");

        if (!account) {
            this.canvasNode.getComponent("LobbyMain").com_Register.getChildByName("普通注册").getChildByName("eb_Account").getComponent("cc.EditBox").string = "账号不能为空";
            return;
        }
        if (!password) {
            this.canvasNode.getComponent("LobbyMain").com_Register.getChildByName("普通注册").getChildByName("eb_Password").getComponent("cc.EditBox").string = "密码不能为空";
            return;
        }

        if (account && password && confirm) {
            if (account.length < 6) {
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("lb_Tips0").getComponent("cc.Label").string = "账号至少6个数字或字母";
                return;
            }
            if (password.length < 6) {
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("lb_Tips1").getComponent("cc.Label").string = "密码至少6个数字或字母";
                return;
            }
            if (password !== confirm) {
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("lb_Tips2").getComponent("cc.Label").string = "密码与确认密码不一致";
                return;
            }

            this.node.getComponent("cc.Button").interactable = false;
            this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("changeOfficial", {
                newAccount: account,
                password: password
            });
        }
    },

    /**
     * 
     */
    changeNameMenuChangeButtonClick_Function: function () {
        var nickName = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("eb_Name").getComponent("cc.EditBox").string;
        if (nickName !== "") {
            /*
            //过滤敏感字
            var wordFilter = this.canvasNode.getComponent("LobbyMain").wordFilter.checkFilter(nickName);
            if (nickName !== wordFilter)
            {
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("eb_Name").getComponent("cc.EditBox").string = "名字不符合规定";
                return;
            }
            */
            this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("updateNickName", {
                newNickName: nickName
            });
            this.node.getComponent("cc.Button").interactable = false;
        }
    },

    /**
     * 
     */
    changeAccountMenuChangeButtonClick_Function: function () {
        var account = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAccount").getChildByName("eb_Account").getComponent("cc.EditBox").string;
        var password = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAccount").getChildByName("eb_Password").getComponent("cc.EditBox").string;
        if (account && password) {
            this.canvasNode.getComponent("LobbyMain").showMessagebox_Function(i18n.t("TIP3_MSG"), 2, 7);
        }
    },

    /**
     * 
     */
    changeAccountMenuRegisterButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").showMessagebox_Function(i18n.t("TIP4_MSG"), 2, 6);
    },
    changeAccountMenuForgotButtonClick_Function: function () { },

    /**
     * 绑定支付宝账号
     */
    bindAliMenuBindButtonClick_Function: function () {
        var account = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindAli").getChildByName("eb_Account").getComponent("cc.EditBox").string;
        var confirm = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindAli").getChildByName("eb_AccountConfirm").getComponent("cc.EditBox").string;
        var nickName = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindAli").getChildByName("eb_Name").getComponent("cc.EditBox").string;
        this.editBoxEditingBegin_Function("bindAli");
        if (account && confirm && nickName) {
            if (account !== confirm) {
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindAli").getChildByName("lb_Tips0").getComponent("cc.Label").string = "账号与确认账号不一致";
                return;
            }
            this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("bindZhifubao", {
                zhifubao: account,
                name: nickName
            });
            this.node.getComponent("cc.Button").interactable = false;
        }
    },

    /**
     * 
     */
    bindedAliChangeButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindedAli").active = false;
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAli").active = true;
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAli").getChildByName("eb_Account").getComponent("cc.EditBox").string = "";
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAli").getChildByName("eb_AccountConfirm").getComponent("cc.EditBox").string = "";
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAli").getChildByName("eb_Name").getComponent("cc.EditBox").string = "";
    },

    /**
     * 
     */
    changeAliAccountSubmitButtonClick_Function: function () {
        var account = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAli").getChildByName("eb_Account").getComponent("cc.EditBox").string;
        var confirm = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAli").getChildByName("eb_AccountConfirm").getComponent("cc.EditBox").string;
        var nickName = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAli").getChildByName("eb_Name").getComponent("cc.EditBox").string;
        this.editBoxEditingBegin_Function("changeAli");
        if (account && confirm && nickName) {
            if (account !== confirm) {
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindAli").getChildByName("lb_Tips0").getComponent("cc.Label").string = "账号与确认账号不一致";
                return;
            }
            this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("bindZhifubao", {
                zhifubao: account,
                name: nickName
            });
        }
    },

    /**
     * 
     */
    changeAliAccountBackButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindedAli").active = true;
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAli").active = false;
    },

    /**
     * 
     */
    bindCreditCardSelectBankButtonClick_Function: function () {
        if (this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("sv_SelectBank").active) {
            this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("sv_SelectBank").active = false;
        } else {
            this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("sv_SelectBank").active = true;
        }
    },

    /**
     * 
     */
    bindCreditCardMenuSubmitButtonClick_Function: function () {
        var owner = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("eb_Owner").getComponent("cc.EditBox").string;
        var cardNo = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("eb_CardNo").getComponent("cc.EditBox").string;
        var confirm = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("eb_CardNoConfirm").getComponent("cc.EditBox").string;

        if (owner && cardNo && confirm) {
            if (cardNo === confirm) {
                if (this.canvasNode.getComponent("LobbyMain").bankSelect > 0) {
                    this.canvasNode.getComponent("LobbyMain").creditCardObj = {
                        account: cardNo,
                        bankType: this.canvasNode.getComponent("LobbyMain").bankSelect,
                        cardId: 0,
                        name: owner,
                        userId: this.canvasNode.getComponent("LobbyMain").playerInfo.playerId
                    };
                    this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("BankInfo", {
                        act: 1,
                        account: cardNo,
                        name: owner,
                        bankType: this.canvasNode.getComponent("LobbyMain").bankSelect
                    });
                } else {
                    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("lb_Tips0").getComponent("cc.Label").string = "请选择银行卡类型";
                }
            } else {
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("lb_Tips0").getComponent("cc.Label").string = "信用卡号与确认卡号不一致";
            }
        } else {
            this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("lb_Tips0").getComponent("cc.Label").string = "请正确输入持卡人与卡号";
        }
    },

    /**
     * 
     */
    bindCreditCardMenuBackButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").active = false;
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindCreditCard").active = true;
    },

    /**
     * 
     */
    bindCreditCardMenuEditButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").editCardId = this.node.cardId;
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindCreditCard").active = false;
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").active = true;

        for (var i = 0; i < this.canvasNode.getComponent("LobbyMain").bankList.length; i++) {
            if (this.node.cardId === this.canvasNode.getComponent("LobbyMain").bankList[i].cardId) {
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("eb_CardNo").getComponent("cc.EditBox").string = this.canvasNode.getComponent("LobbyMain").bankList[i].account;
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("eb_CardNoConfirm").getComponent("cc.EditBox").string = this.canvasNode.getComponent("LobbyMain").bankList[i].account;
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("eb_Owner").getComponent("cc.EditBox").string = this.canvasNode.getComponent("LobbyMain").bankList[i].name;
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("bt_SelectBank").getComponent("cc.Sprite").spriteFrame = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("sv_SelectBank").getComponent("cc.ScrollView").content.children[this.canvasNode.getComponent("LobbyMain").bankList[i].bankType].getComponent("cc.Sprite").spriteFrame;
                this.canvasNode.getComponent("LobbyMain").bankSelect = this.canvasNode.getComponent("LobbyMain").bankList[i].bankType;
                break
            }
        }

    },

    /**
     * 
     */
    bindCreditCardMenuAddButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindCreditCard").active = false;
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").active = true;
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("eb_CardNo").getComponent("cc.EditBox").string = "";
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("eb_CardNoConfirm").getComponent("cc.EditBox").string = "";
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("eb_Owner").getComponent("cc.EditBox").string = "";
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("bt_SelectBank").getComponent("cc.Sprite").spriteFrame = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("sv_SelectBank").getComponent("cc.ScrollView").content.children[0].getComponent("cc.Sprite").spriteFrame;
    },

    /**
     * 
     */
    editCreditCardSelectBankButtonClick_Function: function () {
        if (this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("sv_SelectBank").active) {
            this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("sv_SelectBank").active = false;
        } else {
            this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("sv_SelectBank").active = true;
        }
    },

    /**
     * 
     */
    editCreditCardBanSelectkButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").bankSelect = this.node.bankId;
        if (this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").active) {
            this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("sv_SelectBank").active = false;
            this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_AddCreditCard").getChildByName("bt_SelectBank").getComponent("cc.Sprite").spriteFrame = this.node.getComponent("cc.Sprite").spriteFrame;
            return 1;
        } else if (this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").active) {
            this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("sv_SelectBank").active = false;
            this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("bt_SelectBank").getComponent("cc.Sprite").spriteFrame = this.node.getComponent("cc.Sprite").spriteFrame;
            return 1;
        } else {
            return 0;
        }
    },

    /**
     * 点击修改银行卡信息
     */
    editCreditCardBackButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindCreditCard").active = true;
        this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").active = false;
        this.canvasNode.getComponent("LobbyMain").bankSelect = -1;
    },

    /**
     * 
     */
    editCreditCardEditConfirmButtonClick_Function: function () {
        this.editBoxEditingBegin_Function("editCreditCard");
        var owner = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("eb_Owner").getComponent("cc.EditBox").string;
        var cardNo = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("eb_CardNo").getComponent("cc.EditBox").string;
        var confirm = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("eb_CardNoConfirm").getComponent("cc.EditBox").string;

        if (owner && cardNo && confirm) {
            if (cardNo === confirm) {
                if (this.canvasNode.getComponent("LobbyMain").bankSelect > 0) {
                    this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("BankInfo", {
                        act: 2,
                        cardId: this.canvasNode.getComponent("LobbyMain").editCardId,
                        account: cardNo,
                        name: owner,
                        bankType: this.canvasNode.getComponent("LobbyMain").bankSelect
                    });
                } else {
                    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("lb_Tips0").getComponent("cc.Label").string = "请选择银行卡类型";
                }
            } else {
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("lb_Tips0").getComponent("cc.Label").string = "信用卡号与确认卡号不一致";
            }
        } else {
            this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("lb_Tips0").getComponent("cc.Label").string = "请正确输入持卡人与卡号";
        }
    },

    /**
     * 点击删除银行卡
     */
    editCreditCardDeleteButtonClick_FunctionF: function () {
        this.canvasNode.getComponent("LobbyMain").showMessagebox_Function(i18n.t("TIP5_MSG"), 2, 5);
    },

    /**
     * 获得手机验证码
     */
    bindPhoneGetCodeButtonClick_Function: function () {
        var phoneNumber = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindPhone").getChildByName("eb_PhoneNumber").getComponent("cc.EditBox").string;

        if (phoneNumber.length > 11) {
            this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("sendbindPhoneNo", {
                phoneNo: parseInt(phoneNumber)
            });
            this.canvasNode.getComponent("LobbyMain").codeTimeCount = true;
            this.node.getComponent("cc.Button").interactable = false;
            this.canvasNode.getComponent("LobbyMain").getCodeTime = 60;
            this.node.children[0].getComponent("cc.Label").string = 60;
        }

        /*
        phoneNumber.length < 11 || (this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("sendbindPhoneNo", {
            phoneNo: parseInt(phoneNumber)
        }), this.canvasNode.getComponent("LobbyMain").codeTimeCount = true, this.canvasNode.getComponent("LobbyMain").getCodeTime = 60, this.node.getComponent("cc.Button").interactable = false, this.node.children[0].getComponent("cc.Label").string = 60)
        */
    },

    /**
     * 点击绑定手机号
     */
    bindPhoneSubmitButtonClick_Function: function () {
        var phoneNumber = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindPhone").getChildByName("eb_PhoneNumber").getComponent("cc.EditBox").string;
        var code = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindPhone").getChildByName("eb_Code").getComponent("cc.EditBox").string;
        if (phoneNumber.length > 11 && code.length > 4) {
            this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("bindPhone", {
                phoneNo: parseInt(phoneNumber),
                checkNo: parseInt(code)
            });
        }

        /*
        phoneNumber.length < 11 || code.length < 4 || this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("bindPhone", {
            phoneNo: parseInt(phoneNumber),
            checkNo: parseInt(code)
        })
        */
    },

    /**
     * 检测修改密码
     */
    changePasswordMenuChangeButtonClick_Function: function () {
        if (!this.canvasNode.getComponent("LobbyMain").playerInfo.isOffical) {
            this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("lb_Tips1").getComponent("cc.Label").string = "修改密码前必须转正账号";
            return;
        }
        var eb_OldPassword = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("eb_OldPassword").getComponent("cc.EditBox").string;
        var eb_NewPassword = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("eb_NewPassword").getComponent("cc.EditBox").string;
        var eb_PasswordConfirm = this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("eb_PasswordConfirm").getComponent("cc.EditBox").string;
        this.editBoxEditingBegin_Function("changePassword");
        if (eb_OldPassword && eb_NewPassword && eb_PasswordConfirm) {
            if (eb_OldPassword === eb_NewPassword) {
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("lb_Tips1").getComponent("cc.Label").string = "旧密码与新密码相同";
                return;
            }
            if (eb_NewPassword.length < 6) {
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("lb_Tips2").getComponent("cc.Label").string = "密码至少6个数字或字母";
                return;
            }
            if (eb_NewPassword !== eb_PasswordConfirm) {
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("lb_Tips2").getComponent("cc.Label").string = "密码与确认密码不一致";
                return;
            }
            this.canvasNode.getComponent("LobbyMain").netWork.socket.emit("updatePassword", {
                oldPassword: eb_OldPassword,
                password: eb_NewPassword
            });
            this.node.getComponent("cc.Button").interactable = false;
        }
    },

    /**
     * 
     * @param {*} type 
     */
    editBoxEditingBegin_Function: function (type) {
        switch (type) {
            case "createAccount":
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("lb_Tips0").getComponent("cc.Label").string = "";
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("lb_Tips1").getComponent("cc.Label").string = "";
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("lb_Tips2").getComponent("cc.Label").string = "";
                break;
            case "changeName":
                break;
            case "bindAli":
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindAli").getChildByName("lb_Tips0").getComponent("cc.Label").string = "";
                break;
            case "changePassword":
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("lb_Tips1").getComponent("cc.Label").string = "",
                    this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("lb_Tips2").getComponent("cc.Label").string = "";
                break;
            case "bindCreditCard":
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindCreditCard").getChildByName("lb_Tips0").getComponent("cc.Label").string = "";
                break;
            case "editCreditCard":
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_EditCreditCard").getChildByName("lb_Tips0").getComponent("cc.Label").string = "";
                break;
            case "changeAli":
                this.canvasNode.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_BindAli").getChildByName("lb_Tips0").getComponent("cc.Label").string = "";
                break;
        }
    },

   

    /**
     * 关闭导航界面
     */
    daohangCloseButtonClick_Function: function () {
        this.canvasNode.getComponent("LobbyMain").bg_Black.active = false;
        this.canvasNode.getComponent("LobbyMain").com_daohang.active = false;
    },

    onClickPoxy(e, v) {
        let lobbyMain = this.canvasNode.getComponent("LobbyMain");
        let uid = lobbyMain.playerInfo.playerId;
        let sendData = JSON.stringify({
            uid: uid,
            sign: require('md5').getInstant.hex_md5(`${uid}fdgkl5rtlk4mvcccd765fdv`),
        });
        //Helper.http('http://211.149.229.56:8089/index.php/agent/api/clientShow', sendData).then(e => {
        //lobbyMain.setPoxyUI(e);
        //});
        Helper.http('http://yidaliadmin.youmegame.cn/index.php/agent/api/clientShow', sendData).then(e => {
            lobbyMain.setPoxyUI(e);
        });

    },

    onClickClosePoxy(e, v) {
        let lobbyMain = this.canvasNode.getComponent("LobbyMain");
        lobbyMain.closePoxyUI();
    },

    changePoxyPage(e, v) {
        let lobbyMain = this.canvasNode.getComponent("LobbyMain");
        lobbyMain.changePoxyPage(v);
    },

    //点击进入三角魔阵
    triangleButtonClick(event, customEventData) {
        cc.find('Canvas/Loading').active = true;
        event.currentTarget.getComponent(cc.Button).interactable = false;
        this.QieHuanScene_normal('Slot_Trianglegame');
        window.TG_LOBBYNET = this.canvasNode.getComponent("LobbyMain").netWork.socket;
    },

    sanjiaoButtonClick(event, customEventData) {
        cc.find('Canvas/Loading').active = true;
        this.QieHuanScene_normal("Slot_Trianglegame");
    },

    changeHeadSex_Function: function (ev, sex) {
        if (sex == '1') {
            //男
            this.node.getChildByName('btn_girl_01').getComponent(cc.Button).interactable = true;
            this.node.getChildByName('btn_man_01').getComponent(cc.Button).interactable = false;
            this.node.getChildByName('com_faceman').active = true;
            this.node.getChildByName('com_facegirl').active = false;
            this.clearHeadSel();
        } else {
            //女
            this.node.getChildByName('btn_girl_01').getComponent(cc.Button).interactable = false;
            this.node.getChildByName('btn_man_01').getComponent(cc.Button).interactable = true;
            this.node.getChildByName('com_faceman').active = false;
            this.node.getChildByName('com_facegirl').active = true;
            this.clearHeadSel();
        }
    },

    clearHeadSel: function (ev, n) {
        let prMale = this.node.getChildByName('com_faceman');
        let prFemale = this.node.getChildByName('com_facegirl');
        for (let i in prMale.children) {
            let show = prMale.children[i].name == n ? true : false;
            prMale.children[i].getChildByName('box').active = show;
        }

        for (let i in prFemale.children) {
            let show = prFemale.children[i].name == n ? true : false;
            prFemale.children[i].getChildByName('box').active = show;
        }
    },

    selHead_Function: function (ev, args) {
        let selId = -1;
        let prMale = this.node.getChildByName('com_faceman');
        let prFemale = this.node.getChildByName('com_facegirl');
        if (prMale.active) {
            for (let i in prMale.children) {
                if (prMale.children[i].getChildByName('box').active) {
                    selId = prMale.children[i].name;
                }
            }
        } else {
            for (let i in prFemale.children) {
                if (prFemale.children[i].getChildByName('box').active) {
                    selId = prFemale.children[i].name;
                }
            }
        }
        if (selId != -1) {
            this.canvasNode.getComponent("LobbyMain").netWork.changeHead(selId);
        }
    },

    daili_click() {
        cc.find('Canvas/com_dlnumber').active = true;
        cc.find('Canvas/com_dlnumber').getComponent("daili").setDaili(this.canvasNode.getComponent("LobbyMain").playerInfo.playerId);
    },

    log_out() {
        cc.sys.localStorage.removeItem("userData");
        cc.game.restart();
    },

    mallTagClick(ev, args) {
        this.canvasNode.getComponent("LobbyMain").changeMallUI(args);
    },

    callCustomerService(ev, args) {
        this.canvasNode.getComponent("LobbyMain").changeMallUI(2);
        let lbl = this.canvasNode.getComponent("LobbyMain").com_Mall.getChildByName('com_CustomerService').getChildByName('New Label');
        lbl.csData = JSON.parse(args);
        lbl.getComponent(cc.Label).string = `您正在与 客服 ${lbl.csData.name} 对话`;
    },

    sendMsg_CustomerService: function () {
        let lobbyMain = this.canvasNode.getComponent("LobbyMain");
        let e = lobbyMain.com_CustomerService.getChildByName("eb_Chat").getComponent("cc.EditBox").string;
        if (e == '') {
            return;
        }
        let lbl = lobbyMain.com_Mall.getChildByName('com_CustomerService').getChildByName('New Label');
        lobbyMain.netWork.socket.emit("sendMsgToGM", JSON.stringify({
            gm_id: lbl.csData.id,
            msg: e
        }));
        lobbyMain.com_CustomerService.getChildByName("eb_Chat").getComponent("cc.EditBox").string = "";
        lobbyMain.setChat_Function(lobbyMain.playerInfo.playerId, lobbyMain.playerInfo.playerName, e);
    },

    closeGame() {
        if (cc.sys.isNative) {
            cc.game.end();
        } else {
            window.close();
        }
    },

    clsoeGameTip() {
        this.canvasNode.getComponent("LobbyMain").showMessagebox_Function(i18n.t("TIP6_MSG"), 2, 9);
    },

    goHall() {
        this.canvasNode.getComponent("LobbyMain").bg_Black.active = true;
        this.canvasNode.getComponent("LobbyMain").com_daohang.active = true;
    },

    //通用关闭界面
    onBtnClick_closePanel(event) {
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        event.target.parent.active = false;
    },
    //打开任务
    onBtnClick_questPanel() {
        let lobbyMain = this.canvasNode.getComponent("LobbyMain");
        this.canvasNode.getComponent("LobbyMain").com_Quest.active = true;
        lobbyMain.netWork.socket.emit("getTaskInfo");
    },
    //打开排行榜
    onBtnClick_rankPanel() {
        let lobbyMain = this.canvasNode.getComponent("LobbyMain");
        this.canvasNode.getComponent("LobbyMain").com_rank.active = true;
        lobbyMain.netWork.socket.emit("getCoinRank");
    },
    //打开活动
    onBtnClick_activityPanel() {
        this.canvasNode.getComponent("LobbyMain").bg_Black.active = true;
        this.canvasNode.getComponent("LobbyMain").com_activity.active = true;
    },
    //打开银行
    yinhangButtonClick() {
        this.canvasNode.getComponent("LobbyMain").com_bank.getComponent("LobbyBank").updateView();
        this.canvasNode.getComponent("LobbyMain").com_bank.active = true;
    },
    //打开银行
    guibinButtonClick() {
        this.canvasNode.getComponent("LobbyMain").com_vipRoom.active = true;
    },
    //打开游戏类型
    gameType_openButtonClick() {
        if (this.isOnAction) {
            return;
        }

        if (this.isopen_type) {
            this.gameType_closeButtonClick();
            return;
        }
        this.isOnAction = true;
        let node = this.canvasNode.getComponent("LobbyMain").com_left;
        if (!this.haveX) {
            this.haveX = true;
            this.left_x = this.canvasNode.getComponent("LobbyMain").com_left.x;
        }
        node.x = this.left_x;
        let toX = this.left_x + 280;
        node.getChildByName("mask").active = true;
        cc.tween(node)
            .to(0.3, { position: cc.v2(toX, 0) })
            .call(() => {
                this.isOnAction = false;
                this.isopen_type = true;
            }).start();
    },
    //关闭游戏类型
    gameType_closeButtonClick() {
        if (this.isOnAction) {
            return;
        }
        this.isOnAction = true;
        let node = this.canvasNode.getComponent("LobbyMain").com_left;
        node.x = this.left_x + 289;
        cc.tween(node)
            .to(0.3, { position: cc.v2(this.left_x, 0) })
            .call(() => {
                node.getChildByName("mask").active = false;
                this.isOnAction = false;
                this.isopen_type = false;
            }).start();
    },

});