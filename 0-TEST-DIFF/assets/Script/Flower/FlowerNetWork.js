/**
 * 炸金花SOCKET通讯
 */
var FlowerNetWork = (function () {
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
        this.flower = null;
        this.flowerSocket = null;
        this.playerInfo = null;
        this.tableId = -1;
        this.seatIndex = -1;
        this.playerHead = null;
        this.tax = -1;
        this.addScore = 0;
        this.eventOn = false;

        this.seats = null;
        this.turn = -1;
        this.button = -1;
        this.chu = -1;
        this.isOver = false;
        this.consume_num = 0;

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
                var self = this;
                var socket = null;
                if (cc.sys.isNative) {
                    self.flowerSocket = SocketIO.connect(loginIP + ":" + port);
                } else {
                    socket = require("socket-io");
                    self.flowerSocket = socket(loginIP + ":" + port);
                }
                //用户连接游戏服务器
                this.connectServer_Function(userid, sign);
                //连接失败
                this.flowerSocket.on("error", function () {
                        cc.sys.isBrowser && self.flowerSocket.close();
                        self.flowerSocket = null;
                        self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("Flower");
                    }),
                    //连接失败
                    this.flowerSocket.on("connect_error", function () {
                        cc.sys.isBrowser && self.flowerSocket.close();
                        self.flowerSocket = null;
                        self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("Flower");
                    });
                //连接超时
                this.flowerSocket.on("connect_timeout", function () {
                    cc.sys.isBrowser && self.flowerSocket.close();
                    self.flowerSocket = null;
                    self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("Flower");
                });
                //连接
                this.flowerSocket.on("connected", function (ret) {
                    if (ret) {
                        try {
                            //进入游戏
                            self.flowerSocket.emit("LoginGame", {
                                userid: userid, //用户ID
                                gametype: 11, //游戏类型
                                sign: sign //签名
                            });
                        } catch (error) {}
                    }
                });

                this.flowerSocket.on("disconnect", function (ret) {
                    cc.find('Canvas/Loading').active = true;
                });
            };

        /**
         * 连接炸金花服务器
         * @param {*} userid 
         * @param {*} sign 
         */
        this.connectServer_Function = function (userid, sign) {
            var self = this;

            this.flowerSocket && this.flowerSocket.on("loginGameResult", function (ret) {
                var result = self.changeResultJSON_Function(ret);
                if (result.resultid) { //游戏登录成功
                    self.playerInfo.playerCoin = result.Obj.score;
                    self.lobbyMain.getComponent("LobbyMain").netWork.socket.disconnect();
                    self.flowerSocket.emit("LoginRoom", { //登录游戏房间接口 roomid传 1 就好
                        roomid: 1
                    });
                    self.setFlowerSocketOn_Function();
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
            this.flowerSocket.on("LoginRoomResult", function (ret) {
                console.log('LoginRoomResult:', ret);
                var result = self.changeResultJSON_Function(ret);
                if (result.ResultCode) {
                    self.lobbyMain.bg_Black.active = true;
                    self.tableId = result.ResultData.TableId;
                    self.seatIndex = result.ResultData.seatId;
                    self.tax = result.ResultData.tax;
                    self.addScore = result.ResultData.addscore;
                    self.playerInfo.gameDisconnect = false;
                    self.playerInfo.gameName = "Flower";
                    cc.audioEngine.stopAll();
                    // cc.director.loadScene("FlowerMain");
                }
            });
        };


        this.reset = function () {
            this.turn = -1;
            this.chu = -1;
            this.button = -1;
            this.curaction = null;
            for (var i = 0; i < this.seats.length; ++i) {
                this.seats[i].op = null;
                this.seats[i].ready = false;
            }
        }

        this.isOwner = function () {
            return this.seatIndex == 0;
        }

        this.getSelfData = function () {
            return this.seats[this.seatIndex];
        }

        this.getSeatByID = function (userId) {
            var seatIndex = this.getSeatIndexByID(userId);
            var seat = this.seats[seatIndex];
            return seat;
        };

        this.getSeatIndexByID = function (userId) {
            for (var i = 0; i < this.seats.length; ++i) {
                var s = this.seats[i];
                if (s.userid == userId) {
                    return i;
                }
            }
            return -1;
        }

        this.getLocalIndex = function (index) {
            var ret = (index - this.seatIndex + 5) % 5;
            return ret;
        }

        this.getLocalIndexByUserId = function (userId) {
            var seatIndex = this.getSeatIndexByID(userId);
            var ret = this.getLocalIndex(seatIndex);
            return ret;
        }

        /**
         * 长连通讯
         */
        this.setFlowerSocketOn_Function = function () {
                var self = this;

                this.flowerSocket.on("login_result", function (data) {
                    console.log("login_result:", data);
                    data = self.changeResultJSON_Function(data);
                    if (data.errcode === 0) {
                        self.reconnectP = data.ret;
                        var data = data.data;
                        var seat = data.seats;
                        for (let i = 0; i < seat.length; i++) {
                            if (seat[i].score != "") {
                                seat[i].score = (seat[i].score * 0.01).toFixed(2);
                            }
                        }
                        self.roomId = data.roomid;
                        self.seats = data.seats;
                        self.seatIndex = self.getSeatIndexByID(self.playerInfo.playerId);
                        console.log('返回登陆结果==================' + self.seatIndex);
                        self.isOver = false;
                        cc.find("Canvas/buttonCtrl").getComponent("LobbyButtonClick").QieHuanScene_normal("game_FlowerMain");
                    } else {
                        console.log(data.errmsg);
                    }
                });

                this.flowerSocket.on("exit_result", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.roomId = null;
                    self.turn = -1;
                    self.seats = null;
                    if (data) {
                        //特殊情况下（锦标赛等）可以设置这里的data，在退出的时候进行操作
                        self.actionData = data;
                    }
                });
                this.flowerSocket.on("exit_notify_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    var userId = data;
                    var s = self.getSeatByID(userId);
                    if (s != null) {
                        s.userid = 0;
                        s.name = "";
                        self.flower.changedUserState(s);
                    }
                });
                this.flowerSocket.on("count_down_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.flower.gameCountDown(data);
                });
                this.flowerSocket.on("dispress_push", function (data) {
                    self.roomId = null;
                    self.turn = -1;
                    self.seats = null;
                });


                this.flowerSocket.on("new_user_comes_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    var seatIndex = data.seatindex;
                    if (self.seats[seatIndex].userid > 0) {
                        self.seats[seatIndex].online = true;
                    } else {
                        data.online = true;
                        self.seats[seatIndex] = JSON.parse(JSON.stringify(data));
                        !!self.flower && self.flower.addUser(self.seats[seatIndex]);
                    }

                });
                this.flowerSocket.on("game_checkPai_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.flower.kanpai(data);
                });
                this.flowerSocket.on("game_losed_push", function (data) {
                    self.flower.qipaiResult();
                });
                this.flowerSocket.on("game_wannaToCompare_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.flower.gameWannaToCompare(data);
                });
                //弃牌通知 game_userInlosed_push
                this.flowerSocket.on("game_userInlosed_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.flower.qiPaiNotify(data);
                });
                this.flowerSocket.on("game_myTurn_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.flower.gameMyTurnPush(data);
                });
                this.flowerSocket.on("game_turnChanged_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.flower.changedGameTurn(data);
                });
                this.flowerSocket.on("game_timerInitCounter_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.flower.gameTimerInitCounter(data);
                });
                this.flowerSocket.on("guo_notify_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.flower.guoNotify(data);
                });
                this.flowerSocket.on("game_myWin_push", function (data) {
                    //我赢了
                    //self.flower.win(data);
                });
                this.flowerSocket.on("gameOver_notify_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    //游戏结束清除定时器
                    self.flower.gameOverNotify(data);
                })
                this.flowerSocket.on("game_oneInWin_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    //赢了
                    self.flower.win(data);
                });
                this.flowerSocket.on("game_begin_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.button = data;
                    self.turn = self.button;
                    self.gamestate = "begin";
                    self.flower.gameBegin({
                        currentZhu: data.currentZhu,
                        turn: data.turn
                    });
                });
                //没钱了通知前端，让其退出
                this.flowerSocket.on("game_noMoney_exit", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.flower.noMoneyExit(data);
                });
                //总注通知
                this.flowerSocket.on("game_moneyPool_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    console.log('game_moneyPool_push', data);
                    let a = data.commonInfo;
                    for (var key in a) {
                        a[key].money = (a[key].money * 0.01).toFixed(2);
                    }
                    self.flower.gameMoneyPool(data);
                });
                //跟注通知
                this.flowerSocket.on("genZhu_notify_push", function (data) {
                    console.log('跟注通知：genZhu_notify_push');
                    data = self.changeResultJSON_Function(data);
                    console.log(data);
                    self.flower.genZhuNotify(data);
                });
                //看牌通知 game_oneInCheckPai_push
                this.flowerSocket.on("game_oneInCheckPai_push", function (data) {
                    console.log('game_oneInCheckPai_push');
                    data = self.changeResultJSON_Function(data);
                    console.log(data);
                    self.flower.kanPaiNotify(data);
                });
                //加注通知 jiaZhu_notify_push
                this.flowerSocket.on("jiaZhu_notify_push", function (data) {
                    console.log('jiaZhu_notify_push');
                    data = self.changeResultJSON_Function(data);
                    console.log(data);
                    self.flower.jiaZhuNotify(data);
                });
                //提示消息通知
                this.flowerSocket.on("message_notify_push", function (data) {
                    console.log('message_notify_push');
                    data = self.changeResultJSON_Function(data);
                    console.log(data);
                    self.flower.messageNotify(data);
                });
                //轮数通知
                this.flowerSocket.on("game_circleCount_push", function (data) {
                    console.log('game_circleCount_push');
                    data = self.changeResultJSON_Function(data);
                    console.log(data);
                    self.flower.gameCircleCount(data);
                });
                //比牌结果通知 game_userInBipai_result_push
                this.flowerSocket.on("game_userInBipai_result_push", function (data) {
                    console.log('game_userInBipai_result_push');
                    data = self.changeResultJSON_Function(data);
                    console.log(data);
                    self.flower.gameUserInBiPaiResult(data);
                });
                this.flowerSocket.on("game_actionChanged_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.flower.changedGameAction(data);
                });
                this.flowerSocket.on("game_AntiResults_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    self.flower.gameAntiResults(data);
                });
                this.flowerSocket.on("game_userInfoById_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    if (data) {
                        self.flower.userInfoById(data);
                    }
                });
                this.flowerSocket.on("game_gameInfoById_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    if (data) {
                        self.flower.gameInfoById(data);
                    }
                });
                this.flowerSocket.on("game_sbInAllIn_push", function (data) {
                    data = self.changeResultJSON_Function(data);
                    if (data) {
                        self.flower.sbInAllIn(data);
                    }
                });


                this.flowerSocket.on("noExit", ret => {
                    cc.find('Canvas/com_ingame_tips').active = true;
                });

                /**
                 * 长连接断开监听
                 */
                this.flowerSocket.on("disconnect", function (ret) {

                    //console.log("aaaxxxxxxxxxxxx");
                    //console.log(self.flower);

                    var actionData = self.actionData;
                    self.flower.exitRoom();
                    console.log(self.roomId);

                    // if (self.roomId == null) {

                    //     if (actionData) {
                    //         if (actionData.msg) {
                    //             //alert.show("提示", actionData.msg);
                    //         }
                    //         setTimeout(function() {
                    //             self.actionData = null;
                    //             cc.audioEngine.stopAll();
                    //             cc.director.loadScene(window.hallName);
                    //         }, actionData.delay * 1000);
                    //     } else {
                    cc.audioEngine.stopAll();
                    cc.director.loadScene(window.hallName);
                    //    }
                    //}

                    if (!self.flower.gameExit) {
                        self.flower.disconnectNetWork_Function();
                    }
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
             * @param {*} scene 来自FlowerMain.js
             */
            this.setFlowerObj_Function = function (scene) {
                this.flower = scene;
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

module.exports = FlowerNetWork;