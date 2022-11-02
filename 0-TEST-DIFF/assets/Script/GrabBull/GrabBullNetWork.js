/**
 * 抢庄牛牛SOCKET通讯
 */
var GrabBullNetWork = (function () {
    /**
     * 单例模式
     */
    function getInstant() {
        var _instance;
        if (_instance === undefined) {
            _instance = new Single();
        }
        return _instance;
    }
    /**
     * 逻辑层
     */
    function Single() {
        this.lobbyMain = null;
        this.grabBull = null;
        this.grabBullSocket = null;
        this.playerInfo = null;
        this.tableId = -1;
        this.seatId = -1;
        this.playerHead = null;
        this.tax = -1;
        this.addScore = 0;
        this.eventOn = false;

        /**
         * 初始化
         */
        this.init = function () {
                this.playerInfo = require("PlayerInfo").getInstant;
            },

            /**
             * 进入游戏
             * @param {*} loginIP 
             * @param {*} port 
             * @param {*} userid 
             * @param {*} sign 
             */
            this.loginGame_Function = function (loginIP, port, userid, sign) {
                console.log('loginIP:', loginIP);
                console.log('port:', port);
                console.log('userid:', userid);
                console.log('sign:', sign);
                var self = this;
                var socket = null;
                if (cc.sys.isNative) {
                    self.grabBullSocket = SocketIO.connect(loginIP + ":" + port);
                } else {
                    socket = require("socket-io");
                    self.grabBullSocket = socket(loginIP + ":" + port);
                }
                //用户连接游戏服务器
                this.connectServer_Function(userid, sign);
                //连接失败
                this.grabBullSocket.on("error", function () {
                        cc.sys.isBrowser && self.grabBullSocket.close();
                        self.grabBullSocket = null;
                        self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("GrabBull");
                    }),
                    //连接失败
                    this.grabBullSocket.on("connect_error", function () {
                        cc.sys.isBrowser && self.grabBullSocket.close();
                        self.grabBullSocket = null;
                        self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("GrabBull");
                    });
                //连接超时
                this.grabBullSocket.on("connect_timeout", function () {
                    cc.sys.isBrowser && self.grabBullSocket.close();
                    self.grabBullSocket = null;
                    self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("GrabBull");
                });
                //连接
                this.grabBullSocket.on("connected", function (ret) {
                    if (ret) {
                        try {
                            //进入游戏
                            self.grabBullSocket.emit("LoginGame", {
                                userid: userid, //用户ID
                                gametype: 4, //游戏类型
                                sign: sign //签名
                            });
                        } catch (error) {}
                    }
                });
            };

        /**
         * 连接抢庄牛牛服务器
         * @param {*} userid 
         * @param {*} sign 
         */
        this.connectServer_Function = function (userid, sign) {
            var self = this;

            this.grabBullSocket && this.grabBullSocket.on("loginGameResult", function (ret) {
                /*游戏登录接口(LoginGame)的回调
                    ret=
                    {
                        resultid: 1,    登录成功为 1
                        msg: "login 抢庄牛牛 succeed!",
                        Obj: {account: "账号", id: xxx, nickname: "用户名", score: 金币}
                    }
                */
                var result = self.changeResultJSON_Function(ret);
                if (result.resultid) { //游戏登录成功
                    self.playerInfo.playerCoin = result.Obj.score;
                    self.lobbyMain.getComponent("LobbyMain").netWork.socket.disconnect();
                    self.grabBullSocket.emit("LoginRoom", { //登录游戏房间接口 roomid传 1 就好
                        roomid: 1
                    });
                    self.loginRoom_Function();
                } else {
                    //游戏登录失败
                    self.lobbyMain.getComponent("LobbyMain").loadGameScene = false;
                    self.lobbyMain.getComponent("LobbyMain").showMessagebox_Function(result.msg, 1, 4);
                    self.eventOn = true;
                }
            });
        };

        /**
         * 进入房间
         */
        this.loginRoom_Function = function () {
            var self = this;
            //返回房间数据
            this.grabBullSocket.on("LoginRoomResult", function (ret) {
                console.log('LoginRoomResult:', ret);
                var result = self.changeResultJSON_Function(ret);
                if (result.ResultCode) {
                    self.lobbyMain.bg_Black.active = true;
                    self.tableId = result.ResultData.TableId;
                    self.seatId = result.ResultData.seatId;
                    self.tax = result.ResultData.tax;
                    self.addScore = result.ResultData.addscore;
                    self.playerInfo.gameDisconnect = false;
                    self.playerInfo.gameName = "GrabBull";
                    cc.audioEngine.stopAll();
                    cc.find("Canvas/buttonCtrl").getComponent("LobbyButtonClick").QieHuanScene_normal("game_GrabBullMain");
                }
            });
        };

        /**
         * 抢庄牛牛长连通讯
         */
        this.setGrabBullSocketOn_Function = function () {
                var self = this;

                /**
                 * 游戏开始
                 */
                this.grabBullSocket.on("readyPlay", function (ret) {
                    var result = self.changeResultJSON_Function(ret);
                    self.grabBull.gameStart_Function(result);
                });

                /**
                 * 开始发牌
                 */
                this.grabBullSocket.on("sendCard", function (ret) {
                    var result = self.changeResultJSON_Function(ret);
                    self.grabBull.sendCard_Function(result);
                });

                /**
                 * 抢庄倍数
                 */
                this.grabBullSocket.on("selectBet", function (ret) {
                    var result = self.changeResultJSON_Function(ret);
                    self.grabBull.checkBanker_Function(result)
                });

                /**
                 * 抢庄回调 这段无用
                 */
                this.grabBullSocket.on("callResult", function (ret) {
                    var result = self.changeResultJSON_Function(ret);
                });

                /**
                 * 抢庄倍数回调
                 */
                this.grabBullSocket.on("callValueId", function (ret) {
                    var result = self.changeResultJSON_Function(ret);
                    self.grabBull.setXbetBankerLabel_Function(result);
                });

                /**
                 * 无用
                 */
                this.grabBullSocket.on("reCallResult", function (ret) {
                    var result = self.changeResultJSON_Function(ret);
                });

                /**
                 * 下注回调
                 */
                this.grabBullSocket.on("reCallValueId", function (ret) {
                    var result = self.changeResultJSON_Function(ret);
                    self.grabBull.setXBetPlayerLabel_Function(result);
                });

                /**
                 * 补牌
                 */
                this.grabBullSocket.on("couCow", function (ret) {
                    var result = self.changeResultJSON_Function(ret);
                    self.grabBull.reissueCard_Function(result);
                });

                /**
                 * 明牌
                 */
                this.grabBullSocket.on("showResult", function (ret) {
                    console.log('showResult:', ret);
                    var result = self.changeResultJSON_Function(ret);
                    switch (result.Result) {
                        case 0:
                            self.grabBull.showBullPoint_Function(result.data.cowPoint, result.data.seatId, result.data.card);
                            break;
                    }
                });

                /**
                 * 本局金币结算回调,输了为负数
                 */
                this.grabBullSocket.on("open", function (ret) {
                    var result = self.changeResultJSON_Function(ret);
                    self.grabBull.billing_Function(result);
                });

                /**
                 * 玩家进来的数据
                 */
                this.grabBullSocket.on("playEnter", function (ret) {
                    var result = self.changeResultJSON_Function(ret);
                    result.ResultCode && self.grabBull.playerEnterRoom_Function(result.ResultData);
                });

                /**
                 * 离开的玩家数据
                 */
                this.grabBullSocket.on("PlayerOut", function (ret) {
                    var result = self.changeResultJSON_Function(ret);
                    result && self.grabBull.playerLeaveRoom_Function(result.PlayerSeatId, result.userId);
                });

                /**
                 * 桌子状态信息
                 */
                this.grabBullSocket.on("getDownTimeResult", function (ret) {
                    var result = self.changeResultJSON_Function(ret);
                    result.ResultCode || self.grabBull.firstTimeEntryInit_Function(result);
                });

                /**
                 * 当前桌子所有玩家信息
                 */
                this.grabBullSocket.on("getTableListResult", function (ret) {
                    var result = self.changeResultJSON_Function(ret);
                    result.ResuleCode || self.grabBull.playerMessageInit_Function(result.data.tableList);
                });

                /**
                 * 金币不足,踢出房间
                 */
                this.grabBullSocket.on("notEnouhtScore", function () {
                    self.grabBull.noMoneyOut_Function();
                });

                /**
                 * 长连接断开监听
                 */
                this.grabBullSocket.on("disconnect", function (ret) {
                    if (!self.grabBull.gameExit) {
                        self.grabBull.disconnectNetWork_Function();
                    }
                });



                this.grabBullSocket.on("noExit", ret => {
                    ret = self.changeResultJSON_Function(ret);
                    if (!!ret) {
                        cc.find('Canvas/com_ingame_tips').active = true;
                    } else {
                        self.grabBull.gameExit = true;
                        self.grabBull.exitGame_Function();
                    }
                });

                //vip特权
                this.grabBullSocket.on("vipGetCardResult", function (ret) {
                    let result = self.changeResultJSON_Function(ret);
                    if (!!result && !!self.vipTap) {
                        self.showVipBool = true;
                        self.showVipIndexList = [];
                        for (let i in result.card_list) {
                            let seatIndex = self.grabBull.changeSeatId_Function(result.card_list[i].seatId);
                            self.showVipIndexList.push(seatIndex);
                            for (var j = 0; j < 5; j++) {
                                self.grabBull.cardArray[j + 5 * seatIndex].getComponent("GrabBullCard").open_Function(result.card_list[i].card[j]);
                            }
                        }
                    }
                })

                this.grabBullSocket.on("CanExit", ret => {
                    ret = self.changeResultJSON_Function(ret);
                    console.log('canExit', ret.result);
                    self.grabBull.com_Button.getChildByName("bt_Exit").active = ret.result;
                    // cc.find('Canvas/com_exit_tips').active = ret.result;
                });
            },

            /**
             * 传递this作用域
             * @param {*} scene 来自LobbyMain.js
             */
            this.setLobbyMainObj_Function = function (scene) {
                this.lobbyMain = scene;
            },

            /**
             * 传递this作用域
             * @param {*} scene 来自GrabBullMain.js
             */
            this.setGrabBullObj_Function = function (scene) {
                this.grabBull = scene;
            },

            /**
             * 解析JSON数据
             * @param {*} ret 
             */
            this.changeResultJSON_Function = function (ret) {
                if (cc.sys.isNative) {
                    return JSON.parse(ret);
                }
                return ret;
            },
            this.init();
    }
    return {
        getInstant: new getInstant()
    }
})();

module.exports = GrabBullNetWork;