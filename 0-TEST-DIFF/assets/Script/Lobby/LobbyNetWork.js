/**
 * 大厅SOCKET通讯
 */
const i18n = require('i18n');
var LobbyNetWork = {
    accountChange: false,
    lobbyMain: null,
    playerInfo: null,
    serverList: null,
    getNameAndSign: false,
    getLoginCode: false,
    headSprite: null,
    socket: null,
    io: null,
    connected: false,
    userName: "",
    passWord: "",
    loginClick: false,
    /**
     * 初始化
     */
    netWorkInit_Function: function () {
        this.io = null;
        this.socket = null;
        this.connected = false;
        this.playerInfo = require("PlayerInfo").getInstant;
        this.setLobbyMainObj_Function(this.playerInfo.gameObj);
        switch (this.playerInfo.isAutoLogin) {
            case 0: //账号登陆
                var userData = null;
                //获取缓存中的用户数据
                if (cc.sys.isNative) {
                    userData = JSON.parse(cc.sys.localStorage.getItem("userData"));
                } else {
                    userData = JSON.parse(localStorage.getItem("userData"));
                }

                if (userData) {
                    this.lobbyMain.node.getChildByName('Loading').active = true;
                    this.loginAccount_Function(this.playerInfo.loginIp, userData.account, userData.password);
                } else {
                    this.lobbyMain.com_Login.active = true;
                }
                break;
            case 1: //游客登录
                this.loginAccount_Function(this.playerInfo.loginIp);
                break;
            case 2: //微信登陆
                this.accountChange = true;
                var t = "";
                t = this.playerInfo.loginCode ? this.playerInfo.loginCode : this.getUrlCode_Function("loginCode"),
                    t ? this.loginAccount_Function(this.playerInfo.loginIp, null, null, t) : (this.accountChange = false, this.loginAccount_Function(this.playerInfo.loginIp));
                break;
        }
    },
    /**
     * 账号登陆
     * @param {*} url 
     * @param {*} account 
     * @param {*} passWord 
     * @param {*} loginCode 
     */
    loginAccount_Function: function (url, account, passWord, loginCode) {
        this.userName = account;
        this.passWord = passWord;
        this.loginCode = loginCode;
        this.socket = null;
        if (cc.sys.isNative) {
            this.socket = SocketIO.connect(url);

        } else {
            this.io = require("socket-io");
            this.socket = this.io(url);
        }
        this.loginSocketOn_Function();
    },
    loginSocketOn_Function: function () {
        var self = this;
        /**
         * 连接错误
         */
        self.socket.on("connect_error", function (ret) {
            if (self.lobbyMain.com_MessageBox == null) {
                return;
            }
            self.lobbyMain.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "连接错误,请检测网络";
            if (self.socket !== null) {
                for (var key in self.socket.$events) {
                    if (key !== 0) {
                        self.socket.removeListen(key);
                    }
                }
            }
        });
        /**
         * 连接超时
         */
        self.socket.on("connect_timeout", function (ret) {
            self.lobbyMain.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "连接超时,请检测网络";
            if (self.socket !== null) {
                for (var key in self.socket.$events) {
                    if (key !== 0) {
                        self.socket.removeListen(key);
                    }
                }
            }
        });
        /**
         * 网络错误
         */
        self.socket.on("error", function (ret) {
            self.lobbyMain.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "网络错误,请检测网络";
            if (self.socket !== null) {
                for (var key in self.socket.$events) {
                    if (key !== 0) {
                        self.socket.removeListen(key);
                    }
                }
            }
        });
        /**
         * 重新连接
         */
        self.socket.on("reconnect", function (ret) {
            if (self.socket !== null) {
                for (var key in self.socket.$events) {
                    if (key !== 0) {
                        self.socket.removeListen(key);
                    }
                }
            }
        });
        /**
         * 连接socke.
         * 用户登录
         */
        self.socket.on("connected", function (ret) {
            //cc.log(ret);
            if (ret) {
                self.lobbyMain.disconneted = false;
                if (self.accountChange) {
                    switch (self.playerInfo.isAutoLogin) {
                        case 0:
                        case 1:
                            self.socket.emit("login", {
                                userName: self.userName,
                                password: self.passWord
                            });
                            break;
                        case 2: //微信登陆
                            self.socket.emit("login", {
                                loginCode: self.loginCode
                            });
                            break;
                    }
                } else {
                    self.lobbyMain.getComponent("LobbyRegister").checkAccount_Function(self.playerInfo.loginIp);
                }

                if (!self.lobbyMain.disconneted) {
                    self.lobbyMain.bg_Black.active = false;
                    self.lobbyMain.com_MessageBox.active = false;
                }

                self.connected = true;
            }
        });
        /**
         * 返回登陆信息
         */
        self.socket.on("loginResult", function (ret) {
            console.log('返回登陆信息:' + JSON.stringify(ret));
            var result = self.changeResultJSON(ret);
            switch (result.resultid) {
                case -2:
                    self.lobbyMain.bg_Black.active = true;
                    self.lobbyMain.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAccount").getChildByName("eb_Password").getComponent("cc.EditBox").string = "";
                    self.lobbyMain.com_Login.getChildByName("bt_Login").getComponent("cc.Button").interactable = true;
                    self.accountChange = false;
                    switch (self.playerInfo.isAutoLogin) {
                        case 0:
                            break;
                        case 1:
                            self.lobbyMain.showMessagebox_Function(i18n.t("TIP9_MSG"), 1, 4);
                            break;
                        case 2:
                            self.lobbyMain.showMessagebox_Function(i18n.t("TIP9_MSG"), 1, 0);
                            break;
                    }
                    break;
                case -1:
                    self.lobbyMain.bg_Black.active = true;
                    self.lobbyMain.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAccount").getChildByName("eb_Password").getComponent("cc.EditBox").string = "";
                    self.lobbyMain.com_Login.getChildByName("bt_Login").getComponent("cc.Button").interactable = true;
                    self.accountChange = false;
                    switch (self.playerInfo.isAutoLogin) {
                        case 0:
                            self.lobbyMain.showMessagebox_Function(i18n.t("TIP10_MSG"), 1, 0);
                            break;
                        case 1:
                            self.lobbyMain.showMessagebox_Function(i18n.t("TIP10_MSG"), 1, 4);
                            break;
                        case 2:
                            self.lobbyMain.showMessagebox_Function(i18n.t("TIP10_MSG"), 1, 0);
                            break;
                    }
                    break;
                case 0:
                    self.lobbyMain.bg_Black.active = true;
                    self.lobbyMain.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAccount").getChildByName("eb_Password").getComponent("cc.EditBox").string = "";
                    self.lobbyMain.com_Login.getChildByName("bt_Login").getComponent("cc.Button").interactable = true;
                    self.accountChange = false;
                    switch (self.playerInfo.isAutoLogin) {
                        case 0:
                            self.lobbyMain.showMessagebox_Function(i18n.t("TIP11_MSG"), 1, 10);
                            break;
                        case 1:
                            self.lobbyMain.showMessagebox_Function(i18n.t("TIP12_MSG"), 1, 4);
                            break;
                        case 2:
                            self.lobbyMain.showMessagebox_Function(i18n.t("TIP11_MSG"), 1, 10);
                            break;
                    }
                    break;
                case 1:
                    self.loginClick = false;
                    self.playerInfo.account = result.Obj.account;
                    self.playerInfo.password = self.lobbyMain.com_Login.getChildByName("eb_Password").getComponent("cc.EditBox").string;
                    self.playerInfo.loginCode = self.loginCode;
                    self.playerInfo.gameSign = result.Obj.sign;
                    self.playerInfo.playerId = result.Obj.id;
                    self.playerInfo.playerName = result.Obj.nickname;
                    self.playerInfo.playerCoin = result.Obj.score / self.playerInfo.exchangeRate;
                    self.playerInfo.playerDiamond = result.Obj.diamond;
                    self.playerInfo.playerHeadId = result.Obj.headimgurl;
                    self.playerInfo.iosChannel = result.Obj.ChannelType;
                    self.playerInfo.win_pool = result.win_pool;

                    if (result.Obj.proplist[1]) {
                        self.playerInfo.playerGift = result.Obj.proplist[1];
                    } else {
                        self.playerInfo.playerGift = 0;
                    }
                    self.playerInfo.phoneNumber = result.Obj.phoneNo;

                    if (result.Obj.phoneNo) {
                        self.lobbyMain.com_PlayerInfo.getChildByName("com_BindedPhone").getChildByName("lb_Number").getComponent("cc.Label").string = self.lobbyMain.encryptString_Function(result.Obj.phoneNo, 3, 6);
                    } else {
                        self.lobbyMain.com_PlayerInfo.getChildByName("com_BindedPhone").getChildByName("lb_Number").getComponent("cc.Label").string = "";
                    }
                    self.playerInfo.isOffical = result.Obj.official;
                    self.playerInfo.gameDisconnect || (self.playerInfo.gameName = "Lobby");
                    self.lobbyMain.com_PlayerMessage.getChildByName("lb_PlayerName").getComponent("cc.Label").string = result.Obj.nickname;
                    self.lobbyMain.com_PlayerMessage.getChildByName("lb_PlayerId").getComponent("cc.Label").string = result.Obj.id;
                    self.lobbyMain.com_PlayerMessage.getChildByName("lb_PlayerMoney").getComponent("cc.Label").string = self.playerInfo.playerCoin.toFixed(2);
                    self.lobbyMain.com_PlayerMessage.getChildByName("lb_PlayerDiamond").getComponent("cc.Label").string = self.playerInfo.playerDiamond;
                    self.lobbyMain.com_PlayerInfo.active = false;
                    self.lobbyMain.com_Mall.active = false;
                    self.lobbyMain.com_CustomerService.active = false;
                    self.lobbyMain.com_Setting.active = false;
                    self.lobbyMain.com_Login.active = false;
                    self.lobbyMain.com_Register.active = false;
                    self.lobbyMain.com_Mail.active = false;
                    self.lobbyMain.com_bank.active = false;
                    self.lobbyMain.com_vipRoom && (self.lobbyMain.com_vipRoom.active = false);
                    self.lobbyMain.jackpot_script.ShowJackPot(result.win_pool); //显示彩金数值
                    if (self.playerInfo.isAutoLogin === 2) {
                        history.replaceState(null, "Fish_CN_WX", "?login=1");
                    }
                    if (self.accountChange) {

                        if (self.userName !== "" && self.passWord !== "") {
                            self.lobbyMain.getComponent("LobbyRegister").changeUserData_Function(self.userName, self.passWord);
                        }

                        self.accountChange = false;
                        self.lobbyMain.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAccount").active = false;
                        self.lobbyMain.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAccount").getChildByName("eb_Account").getComponent("cc.EditBox").string = "";
                        self.lobbyMain.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAccount").getChildByName("eb_Password").getComponent("cc.EditBox").string = "";
                    }
                    self.lobbyMain.lobbyInit_Function();
                    break;
            };
            self.lobbyMain.getComponent("LobbyMain").com_PlayerInfo.getChildByName("bt_ChangeAccount").getComponent("cc.Button").interactable = true;
            self.lobbyMain.getComponent("LobbyMain").com_PlayerInfo.getChildByName("com_ChangeAccount").getChildByName("bt_Change").getComponent("cc.Button").interactable = true;
            self.lobbyMain.node.getChildByName('Loading').active = false;
        });

        /**
         * 返回服务器列表数据
         */
        self.socket.on("ServerListResult", function (ret) {
            var result = self.changeResultJSON(ret);
            if (result) {
                self.serverList = result.GameInfo;
                // cc.log('返回服务器列表数据:' + JSON.stringify(ret));
                // cc.log('查找LobbyMenu==============================' + self.lobbyMain.getComponent("LobbyMenu"));
                // cc.log('--------------返回服务器列表===============' + JSON.stringify(self.serverList));
                //初始化游戏按钮
                self.lobbyMain.getComponent("LobbyMenu").gameMenuInit_Function(self.serverList);
            }
        });
        self.anotherFunctionInit_Function();

        /**
         * 监听彩金的刷新
         */
        self.socket.on('RedisWinPool', (ret) => {
            if (self.lobbyMain.jackpot_script == null) {
                return;
            }
            self.lobbyMain.jackpot_script.ShowJackPot(ret);
        });
    },
    /**
     * 
     */
    anotherFunctionInit_Function: function () {
        var self = this;

        /**
         * 
         */
        self.socket.on("sendCoinResult", function (ret) {
            var result = self.changeResultJSON(ret);
            if (result.Result) {
                //充值回调接口
                self.playerInfo.playerCoin = (self.playerInfo.playerCoin + result.score / self.playerInfo.exchangeRate);
                self.lobbyMain.com_PlayerMessage.getChildByName("lb_PlayerMoney").getComponent("cc.Label").string = self.playerInfo.playerCoin.toFixed(2);
            }
        }),

            /**
             * 
             */
            self.socket.on("sendGiveCoinResult", function (ret) {
                var result = self.changeResultJSON(ret);
                if (result.Result) {
                    self.playerInfo.playerCoin = (result.remainScore / self.playerInfo.exchangeRate).toFixed(2);
                    self.lobbyMain.com_PlayerMessage.getChildByName("lb_PlayerMoney").getComponent("cc.Label").string = self.playerInfo.playerCoin.toFixed(2);

                }
                self.lobbyMain.showMessagebox_Function(result.msg, 1, 0);
            });

        /**
         * 检测昵称
         */
        self.socket.on("checkNickNameResult", function (ret) {
            var result = self.changeResultJSON(ret);
            if (result.resultCode) {
                self.lobbyMain.checkIdResult = true;
            } else {
                self.lobbyMain.checkIdResult = false;
            }
        });

        /**
         * 请求绑定手机号
         */
        self.socket.on("sendbindPhoneNoResult", function (ret) {
            var result = self.changeResultJSON(ret);
            result.Result || (self.lobbyMain.com_PlayerInfo.active = false, self.lobbyMain.showMessagebox_Function(result.msg, 1, 4));
        });

        /**
         * 绑定手机号
         */
        self.socket.on("bindPhoneResult", function (ret) {
            var result = self.changeResultJSON(ret);
            if (result.Result) {
                self.playerInfo.phoneNumber = self.lobbyMain.com_PlayerInfo.getChildByName("com_BindPhone").getChildByName("eb_PhoneNumber").getComponent("cc.EditBox").string;
                self.lobbyMain.com_PlayerInfo.getChildByName("com_BindPhone").active = false;
                self.lobbyMain.com_PlayerInfo.getChildByName("com_BindedPhone").active = true;
                self.lobbyMain.com_PlayerInfo.getChildByName("com_BindedPhone").getChildByName("lb_Number").getComponent("cc.Label").string = self.playerInfo.phoneNumber;
            }
            self.lobbyMain.com_PlayerInfo.active = false;
            self.lobbyMain.showMessagebox_Function(result.msg, 1, 4);
        });

        /**
         * 
         */
        self.socket.on("exchangeResult", function (ret) {
            var result = self.changeResultJSON(ret);
            if (result.Result) {
                self.playerInfo.playerGift += result.deleteCount;
            }
            self.lobbyMain.showMessagebox_Function(result.msg, 1, 4);
        });


        self.socket.on("GMsendMsg", function (ret) {
            var result = self.changeResultJSON(ret);
            cc.log('GM:', JSON.stringify(result));
            let lbl = self.lobbyMain.com_Mall.getChildByName('com_CustomerService').getChildByName('New Label');
            if (lbl.csData.id == result.gm_id) {
                self.lobbyMain.setChat_Function(10, lbl.csData.name, result.msg);
            }
        });


        /**
         * 
         */
        self.socket.on("sendMsg", function (ret) {
            var result = self.changeResultJSON(ret);
            self.lobbyMain.customerServiceSendMessage_Function(result.userId, result.nickname, result.msg);
        });

        /**
         * 
         */
        self.socket.on("sendMsgToUserResult", function (ret) {
            var result = self.changeResultJSON(ret);
            if (result.ResultCode) {
                self.lobbyMain.com_CustomerService.getChildByName("eb_Chat").getComponent("cc.EditBox").string = result.msg;
            } else {
                self.lobbyMain.customerServiceSendMessage_Function(self.playerInfo.playerId, self.playerInfo.playerName, self.lobbyMain.sendMessage);
                self.lobbyMain.sendMessage = "";
            }
        });

        /**
         * 
         */
        self.socket.on("getMsgToUserResult", function (ret) {
            var result = self.changeResultJSON(ret);
            if (!result.ResultCode) {
                var idList = new Array();
                if (result.data.chatList) {
                    for (var i = 0; i < result.data.chatList.length; i++) {
                        self.lobbyMain.customerServiceSendMessage_Function(result.data.chatList[i].userId, result.data.chatList[i].nickname, result.data.chatList[i].msg);
                        idList[i] = result.data.chatList[i].id;
                    }
                }
            }
            self.socket.emit("updateCharLog", {
                idList: idList
            })
        });

        /**
         * 银行查金币结果
         */
        self.socket.on("getPlayerCoinResult", function (ret) {
            var result = self.changeResultJSON(ret);
            cc.log(result.ResultCode);
            if (result.ResultCode) {
                self.lobbyMain.getComponent("LobbyMain").com_bank.getComponent("LobbyBank").showSelectCoin(result);
            } else {
                self.lobbyMain.getComponent("LobbyMain").showMessagebox_Function(result.msg, 1, 4);
            }
        });

        /**
         * 获取银行资金数
         */
        self.socket.on("getBankScoreResult", function (ret) {
            var result = self.changeResultJSON(ret);
            self.playerInfo.playerBankCoin = result.bankScore;
        });

        /**
         * 更新银行资金数
         */
        self.socket.on("updateBankScoreResult", function (ret) {
            var result = self.changeResultJSON(ret);
            if (result.ResultCode) {
                self.playerInfo.playerBankCoin = result.bankScore;
                self.lobbyMain.getComponent("LobbyMain").com_bank.getComponent("LobbyBank").updateView();
            } else {
                self.lobbyMain.getComponent("LobbyMain").showMessagebox_Function(result.msg, 1, 4);
            }

        });

        /**
        * 修改银行密码
        */
        self.socket.on("updateBankpwdResult", function (ret) {
            var result = self.changeResultJSON(ret);
            if (result.ResultCode) {
                self.lobbyMain.getComponent("LobbyMain").showMessagebox_Function(i18n.t("TIP13_MSG"), 1, 4);
            } else {
                self.lobbyMain.getComponent("LobbyMain").showMessagebox_Function(result.msg, 1, 4);
            }
        });

        /**
         * 走马灯公告信息
         */
        self.socket.on("noticeMsg", function (ret) {
            // var result = self.changeResultJSON(ret);
            // self.lobbyMain.updateSystemMessage_Function(result.nickname + " : " + result.msg);

            console.log('noticeMsg:' + JSON.stringify(ret));
            var result = self.changeResultJSON(ret);
            if (self.lobbyMain.systemMessageArray) {
                self.lobbyMain.systemMessageArray = [];
            } else {
                self.lobbyMain.systemMessageArray = new Array(0);
            }
            if (!self.lobbyMain.com_SystemMessage) {
                return;
            }
            self.lobbyMain.com_SystemMessage.getChildByName("vi_View").removeAllChildren();
            self.lobbyMain.systemMessageSign = 0;
            for (let i in result) {
                self.lobbyMain.updateSystemMessage_Function(result[i].txt);
            }
            self.lobbyMain.moveSystemMessage_Function();
        });

        /**
         * 
         */
        self.socket.on("sendMsgResult", function (ret) {
            var result = self.changeResultJSON(ret);
            self.playerInfo.playerCoin = (result.remainScore / self.playerInfo.exchangeRate).toFixed(2);
            self.lobbyMain.com_PlayerMessage.getChildByName("lb_PlayerMoney").getComponent("cc.Label").string = self.playerInfo.playerCoin.toFixed(2);
        });

        /**
         * 
         */
        self.socket.on("firstExchagerResult", function (ret) {
            var result = self.changeResultJSON(ret);
            self.playerInfo.aliAccount = result.zhifubao;
            self.playerInfo.aliName = result.zhifubaoName;
            self.lobbyMain.playerInfoMenuInit_Function();
        });

        /**
         * 
         */
        self.socket.on("addPrize", function (ret) {
            var result = self.changeResultJSON(ret);
            result && self.lobbyMain.addMail_Function(result);
        });

        /**
         * 
         */
        self.socket.on("prizeListResult", function (ret) {
            var result = self.changeResultJSON(ret);
            result.prizeList && self.lobbyMain.mailInit_Function(result.prizeList);
        });

        /**
         * 
         */
        self.socket.on("getPrizeResult", function (ret) {
            var result = self.changeResultJSON(ret);
            if (result.Result) {
                if (result.data.winScore) {
                    self.lobbyMain.showMessagebox_Function(result.msg + " " + result.data.winScore / self.playerInfo.exchangeRate + " 金币\n\n", 4, 0);
                    self.playerInfo.playerCoin = (parseFloat(self.playerInfo.playerCoin) + result.data.winScore / self.playerInfo.exchangeRate).toFixed(2);
                    self.lobbyMain.com_PlayerMessage.getChildByName("lb_PlayerMoney").getComponent("cc.Label").string = self.playerInfo.playerCoin.toFixed(2);
                } else {
                    self.lobbyMain.showMessagebox_Function(result.msg, 1, 0);
                }
                self.lobbyMain.destroyMail_Function();
            }
        });

        /**
         * 断开连接
         */
        self.socket.on("disconnect", function () {
            console.log('大厅连接断开', self.lobbyMain.enterRoom);
            if (self.lobbyMain.enterRoom == undefined) {
                return;
            }
            self.connected = false;
            //self.loginClick || self.lobbyMain.enterRoom || self.lobbyMain.netWorkDisconneted_Function("游戏已断开，请重新连接游戏");
        });

        /**
         * 
         */
        self.socket.on("heartbeatResult", function () {
            self.lobbyMain.heartBeatTime = 0;
            self.lobbyMain.heartBeatTimeOut = 0;
        });

        /**
         * 修改昵称
         */
        self.socket.on("updateNickNameResult", function (ret) {
            var result = self.changeResultJSON(ret);
            self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("bt_Change").getComponent("cc.Button").interactable = true;
            if (result.Result) {
                self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("eb_Name").getComponent("cc.EditBox").string = result.msg;
            } else {
                self.playerInfo.playerName = self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("eb_Name").getComponent("cc.EditBox").string;
                self.lobbyMain.com_PlayerMessage.getChildByName("lb_PlayerName").getComponent("cc.Label").string = self.playerInfo.playerName;
                self.lobbyMain.com_PlayerInfo.active = false;
                self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("eb_Name").getComponent("cc.EditBox").string = "";
                self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("lb_Account").getComponent("cc.Label").string = "账号: " + self.playerInfo.account;
                self.lobbyMain.showMessagebox_Function(result.msg, 1, 4);
            }
        });

        /**
         * 绑定支付宝
         */
        self.socket.on("bindZhifubaoResult", function (ret) {
            var result = self.changeResultJSON(ret);
            self.lobbyMain.com_PlayerInfo.getChildByName("com_BindAli").getChildByName("bt_Bind").getComponent("cc.Button").interactable = true;
            if (result.Result) {
                self.lobbyMain.com_PlayerInfo.getChildByName("com_BindAli").getChildByName("eb_Account").getComponent("cc.EditBox").string = result.msg;
                self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeAli").getChildByName("eb_Account").getComponent("cc.EditBox").string = result.msg;
            } else {
                if (self.lobbyMain.com_PlayerInfo.getChildByName("com_BindAli").getChildByName("eb_Account").getComponent("cc.EditBox").string) {
                    self.playerInfo.aliAccount = self.lobbyMain.com_PlayerInfo.getChildByName("com_BindAli").getChildByName("eb_Account").getComponent("cc.EditBox").string;
                    self.playerInfo.aliName = self.lobbyMain.com_PlayerInfo.getChildByName("com_BindAli").getChildByName("eb_Name").getComponent("cc.EditBox").string;
                } else {
                    self.playerInfo.aliAccount = self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeAli").getChildByName("eb_Account").getComponent("cc.EditBox").string;
                    self.playerInfo.aliName = self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeAli").getChildByName("eb_Name").getComponent("cc.EditBox").string;
                }
                self.lobbyMain.com_PlayerInfo.getChildByName("com_BindAli").getChildByName("eb_Account").getComponent("cc.EditBox").string = "";
                self.lobbyMain.com_PlayerInfo.getChildByName("com_BindAli").getChildByName("eb_AccountConfirm").getComponent("cc.EditBox").string = "";
                self.lobbyMain.com_PlayerInfo.getChildByName("com_BindAli").getChildByName("eb_Name").getComponent("cc.EditBox").string = "";
                self.lobbyMain.com_PlayerInfo.getChildByName("com_BindAli").active = false;
                self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeAli").active = false;
                self.lobbyMain.com_PlayerInfo.getChildByName("bt_BindAli").active = false;
                self.lobbyMain.com_PlayerInfo.getChildByName("bt_BindedAli").active = true;
                self.lobbyMain.com_PlayerInfo.getChildByName("bt_BindedAli").getComponent("cc.Button").interactable = false;
                self.playerInfo.encryptAliAccount = self.lobbyMain.encryptString_Function(self.playerInfo.aliAccount, 3, 6);
                self.playerInfo.encryptAliName = self.lobbyMain.encryptString_Function(self.playerInfo.aliName, 1, 3);
                self.lobbyMain.com_PlayerInfo.getChildByName("com_BindedAli").getChildByName("lb_AccountInfo").getComponent("cc.Label").string = self.playerInfo.encryptAliAccount;
                self.lobbyMain.com_PlayerInfo.getChildByName("com_BindedAli").getChildByName("lb_NameInfo").getComponent("cc.Label").string = self.playerInfo.encryptAliName;
                self.lobbyMain.com_PlayerInfo.getChildByName("com_BindedAli").active = true;
                self.lobbyMain.com_PlayerInfo.active = false;
                self.lobbyMain.showMessagebox_Function(result.msg, 1, 4);
            }
        });

        /**
         * 
         */
        self.socket.on("scoreOutResult", function (ret) {
            var result = self.changeResultJSON(ret)
            self.lobbyMain.showMessagebox_Function(result.msg, 1, 4);
        });

        /**
         * 
         */
        self.socket.on("changeOfficialResult", function (ret) {
            var result = self.changeResultJSON(ret);
            self.lobbyMain.com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("bt_Create").getComponent("cc.Button").interactable = true;
            if (result.ResultCode) {
                self.lobbyMain.com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("lb_Tips0").getComponent("cc.Label").string = result.msg;
            } else {
                var data = {
                    account: self.lobbyMain.com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("eb_Account").getComponent("cc.EditBox").string,
                    password: self.lobbyMain.com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("eb_Password").getComponent("cc.EditBox").string
                };
                self.lobbyMain.getComponent("LobbyRegister").writeUserDate_Function(data, function () {
                    self.playerInfo.account = data.account;
                    self.playerInfo.password = data.password;
                    self.lobbyMain.com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("eb_Account").getComponent("cc.EditBox").string = "";
                    self.lobbyMain.com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("eb_Password").getComponent("cc.EditBox").string = "";
                    self.lobbyMain.com_PlayerInfo.getChildByName("com_CreateAccount").getChildByName("eb_PasswordConfirm").getComponent("cc.EditBox").string = "";
                    self.lobbyMain.com_PlayerInfo.getChildByName("com_CreateAccount").active = false;
                    self.lobbyMain.com_PlayerInfo.getChildByName("bt_CreateAccount").active = false;
                    self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeName").active = true;
                    self.lobbyMain.com_PlayerInfo.getChildByName("bt_ChangeName").active = true;
                    self.lobbyMain.com_PlayerInfo.getChildByName("bt_ChangeName").getComponent("cc.Button").interactable = false;
                    self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("lb_State").getComponent("cc.Label").string = "账号状态: 已转正";
                    self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("lb_Account").getComponent("cc.Label").string = "账号: " + self.playerInfo.account;
                    self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangeName").getChildByName("lb_Id").getComponent("cc.Label").string = "用户ID: " + self.playerInfo.playerId;
                    self.lobbyMain.com_PlayerInfo.active = false;
                    self.lobbyMain.showMessagebox_Function(result.msg, 1, 4);
                    self.playerInfo.isOffical = 1;
                })
            }
        });

        /**
         * 
         */
        self.socket.on("BankInfoResult", function (ret) {
            var result = self.changeResultJSON(ret)
            if (!result.Result) {
                switch (result.act) {
                    case 1:
                        self.lobbyMain.addCreditCard_Function(result.cardId, result.msg);
                        break;
                    case 2:
                        self.lobbyMain.editCreditCard_Function(result.cardId, result.msg);
                        break;
                    case 3:
                        self.lobbyMain.deleteCreditCard_Function(result.cardId, result.msg);
                        break;
                }
            }
        });
        /**
         * 
         */
        self.socket.on("getBankResult", function (ret) {
            var result = self.changeResultJSON(ret);
            self.lobbyMain.bankInfoInit_Function(result.data.bankList);
        });
        /**
         * 修改密码
         */
        self.socket.on("updatePasswordResult", function (ret) {
            var result = self.changeResultJSON(ret);
            self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("bt_Change").getComponent("cc.Button").interactable = true;
            if (result.ResultCode) {
                self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("lb_Tips0").getComponent("cc.Label").string = result.msg;
            } else {
                var data = {
                    account: self.playerInfo.account,
                    password: self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("eb_NewPassword").getComponent("cc.EditBox").string
                };
                self.lobbyMain.getComponent("LobbyRegister").writeUserDate_Function(data, function () {
                    self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("eb_OldPassword").getComponent("cc.EditBox").string = "",
                        self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("eb_NewPassword").getComponent("cc.EditBox").string = "",
                        self.lobbyMain.com_PlayerInfo.getChildByName("com_ChangePassword").getChildByName("eb_PasswordConfirm").getComponent("cc.EditBox").string = "",
                        self.lobbyMain.com_PlayerInfo.active = false,
                        self.lobbyMain.showMessagebox_Function(result.msg, 1, 4);
                })
            }
        });

        self.socket.on('updateHeadUrlResult', ret => {
            var result = self.changeResultJSON(ret);
            if (!result.Result) {
                let head = self.lobbyMain.com_BG.getChildByName("sp_Head");
                Helper.loadHead(result.url, texture => {
                    head.getComponent(cc.Sprite).spriteFrame = texture;
                });
            }
            self.lobbyMain.showMessagebox_Function(result.msg, 1, 0);
        });

        /**
         * 设置头像返回信息
         */
        self.socket.on("setHeadResult", function (ret) {
            var result = self.changeResultJSON(ret);
            if (!result.Result) {
                self.playerInfo.playerHeadId = result.headId;
                self.lobbyMain.com_PlayerMessage.getChildByName("sp_Head").getComponent("cc.Sprite").spriteFrame = self.playerInfo.playerHeadArray[self.playerInfo.playerHeadId];
                self.playerInfo.playerHead = self.playerInfo.playerHeadArray[self.playerInfo.playerHeadId];
            }
            self.lobbyMain.showMessagebox_Function(result.msg, 1, 0);
        });

        self.socket.on("lineOutMsg", function (ret) {
            var result = self.changeResultJSON(ret);
            console.log('断线重连 发起', JSON.stringify(result));
            self.playerInfo.gameIp = Lhjconfig.Server_IP;
            self.playerInfo.gameProt = result.serverId;
            let tmpNet = null;
            if (result.serverId >= 13701 && result.serverId <= 13704) {
                //斗地主
                tmpNet = require("LandNetWork").getInstant;
            } else if (result.serverId >= 14101 && result.serverId <= 14104) {
                //德州
                tmpNet = require("HoldemNetWork").getInstant;
            } else if (result.serverId >= 13201 && result.serverId <= 13204) {
                //红包
                tmpNet = require("hongbaoNetWork").getInstant;
            } else if (result.serverId >= 13401 && result.serverId <= 13404) {
                //牛牛
                tmpNet = require("GrabBullNetWork").getInstant;
            } else if (result.serverId >= 13801 && result.serverId <= 13804) {
                //跑的快
                tmpNet = require("RuningNetWork").getInstant;
            } else if (result.serverId >= 14201 && result.serverId <= 14204) {
                //砸金花
                tmpNet = require("FlowerNetWork").getInstant;
            } else if (result.serverId == 13706) {
                tmpNet = require("LandNetWork").getInstant;
            }
            if (!!tmpNet) {
                self.lobbyMain.node.getChildByName('Loading').active = true; //点亮加载游戏界面
                if (result.serverId >= 13701 && result.serverId <= 13704 || result.serverId >= 13801 && result.serverId <= 13804 || result.serverId == 13706) {
                    window.reconnectPoint = true; //判断是不是断线重连
                }
                tmpNet.setLobbyMainObj_Function(self.lobbyMain);
                tmpNet.loginGame_Function(self.playerInfo.gameIp, self.playerInfo.gameProt, self.playerInfo.playerId, self.playerInfo.gameSign);
                cc.audioEngine.stopAll();
            }
        });

        //任务接口
        self.socket.on("getTaskInfoResult", (ret) => {
            let result = self.changeResultJSON(ret);
            console.log('getTaskInfoResult', JSON.stringify(result));
            if (result.ResultCode) {
                cc.find("Canvas").getComponent("LobbyMain").com_Quest.getComponent("LobbyQuest").updatePanel(result.result);
            } else {
                self.lobbyMain.showMessagebox_Function(result.msg, 1, 4);
            }
        });

        self.socket.on("getEveryLoginResult", (ret) => {
            let result = self.changeResultJSON(ret);
            console.log('getEveryLoginResult', JSON.stringify(result));
            if (result.ResultCode) {
                cc.find("Canvas").getComponent("LobbyMain").com_Quest.getComponent("LobbyQuest").getEveryLoginPrice(result.result);
                self.lobbyMain.showMessagebox_Function("领取成功", 1, 4);
            } else {
                self.lobbyMain.showMessagebox_Function(result.msg, 1, 4);
            }
        });
        //排行榜接口
        self.socket.on("getCoinRankResult", (ret) => {
            let result = self.changeResultJSON(ret);
            console.log('getCoinRankResult', JSON.stringify(result));
            if (result.ResultCode) {
                cc.find("Canvas").getComponent("LobbyMain").com_rank.getComponent("LobbyRank").updateCoinPanel(result.result);
            }
        });

        self.socket.on("getDiamondRankResult", (ret) => {
            let result = self.changeResultJSON(ret);
            console.log('getDiamondRankResult', JSON.stringify(result));
            if (result.ResultCode) {
                cc.find("Canvas").getComponent("LobbyMain").com_rank.getComponent("LobbyRank").updateDiamondPanel(result.result);
            }
        });
    },

    timeFormat: function (nS) {
        let date = new Date(parseInt(nS)) // 时间戳为10位需乘1000，为13位则不用
        let Y = date.getFullYear() // 年
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) // 月
        let D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() + '' // 日

        let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() // 时
        let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() // 分
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() // 秒
        return Y + '' + M + '' + D; // yyyy/mm/dd hh:mm:ss

    },

    /**
     * 断开socket
     */
    logoutAccount_Function: function () {
        console.log('logoutAccount_Function');
        this.socket.disconnect();
        this.socket = null;
    },

    /**
     * 设置场景对象
     * @param {*} scene 
     */
    setLobbyMainObj_Function: function (scene) {
        this.lobbyMain = scene;
    },
    /**
     * 获取url参数
     * @param {*} name 
     */
    getUrlCode_Function: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    /**
     * 解析JSON数据
     * @param {*} ret 
     */
    changeResultJSON: function (ret) {
        if (cc.sys.isNative) {
            return JSON.parse(ret);
        }
        return ret;
    },

    changeHead: function (headUrl) {
        this.socket.emit('updateHeadUrl', JSON.stringify({
            url: headUrl
        }));
    },
}

module.exports = LobbyNetWork;