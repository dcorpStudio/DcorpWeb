/**
 * 斗地主SOCKET通讯
 */
let LandNetWork = (() => {
    function getInstant() {
        let _instance;
        if (_instance === undefined) {
            _instance = new Single();
        }
        return _instance;
    }

    function Single() {
        this.lobbyMain = null;
        this.Landlords = null;
        this.LandlordsSocket = null;
        this.playerInfo = null;
        this.tableId = -1;
        this.seatId = -1;
        this.playerHead = null;
        this.playerList = null;
        this.roomBet = 1;
        this.disconnected = false;
        this.LandlordsData = null;
        this.gameExit = false;
        this.count = 0;

        this.init = () => {
            this.playerInfo = require("PlayerInfo").getInstant;
        };

        this.loginGame_Function = (ip, prot, playerId, sign) => {
            this.ip = ip;
            this.prot = prot;
            this.playerId = playerId;
            this.sign = sign;
            this.playerInfo.gameName = "Land";
            this.playerInfo.gameDisconnect = false;
            setTimeout(() => {
                cc.log('开始加载斗地主场景');
                cc.find("Canvas/buttonCtrl").getComponent("LobbyButtonClick").QieHuanScene_normal("game_LandMain");
            }, 1000);
        };

        this.startGameFunction = () => {
            let ip = this.ip;
            let prot = this.prot;
            let playerId = this.playerId;
            let sign = this.sign;

            if (cc.sys.isNative) {
                this.LandlordsSocket = SocketIO.connect(ip + ":" + prot);
            } else {
                let socket = require("socket-io");
                this.LandlordsSocket = socket(ip + ":" + prot);
            }

            this.LandlordsSocket.on("connect_error", () => {
                this.netErr('网络连接错误，请联系客服');
            });

            this.LandlordsSocket.on("connect_timeout", () => {
                this.netErr('网络连接错误，请联系客服');
            });

            this.LandlordsSocket.on("connected", ret => {
                cc.log('斗地主网络已连接，发起loginGame');
                this.LandlordsSocket.emit("LoginGame", JSON.stringify({
                    userid: playerId,
                    gametype: 1,
                    sign: sign
                }));
            });

            this.LandlordsSocket.on('TipsCardsResult', ret => {
                ret = this.changeResultJSON_Function(ret);
                cc.log('出牌提示：' + JSON.stringify(ret));
                this.Landlords.tipsClickCallBack(ret);
            });

            this.LandlordsSocket.on("loginGameResult", ret => {
                ret = this.changeResultJSON_Function(ret);
                cc.log('loginGameResult + LoginRoom:' + JSON.stringify(ret));
                if (ret.resultid) {
                    this.playerInfo.playerCoin = ret.Obj.score;
                    this.roomBet = ret.Obj.bet;
                    this.lobbyMainSocket.disconnect();
                    this.LandlordsSocket.emit("LoginRoom", JSON.stringify({
                        roomid: 1
                    }));

                    if (!cc.sys.isNative)
                        this.LandlordsSocket.removeListener("LoginRoomResult");
                    this.LandlordsSocket.on("LoginRoomResult", ret => {
                        ret = this.changeResultJSON_Function(ret);
                        if (ret.ResultCode) {
                            this.tableId = ret.ResultData.tableId;
                            this.seatId = ret.ResultData.seatId;
                            this.playerList = ret.ResultData.userList;
                            this.tax = ret.ResultData.tax;
                            this.addScore = ret.ResultData.addscore;
                            this.LandlordsData = ret.ResultData.LandlordsData;
                            this.LandlordsNetWork();
                        }
                    })
                } else {
                    !this.gameExit && this.netErr(ret.msg);
                }
            });
        };

        //错误信息弹板
        this.netErr = msg => {
            this.Landlords.node.getChildByName("blackFace").active = true;
            this.Landlords.exitReady.active = true;
            this.Landlords.exitReady.getChildByName("message").getComponent("cc.Label").string = msg;
        }

        //长连监听
        this.LandlordsNetWork = () => {
            this.LandlordsSocket.on("disconnect", t => {
                this.gameExit || (this.Landlords.com_MessageBox.active = true, this.Landlords.disconnectNetWork_Function());
            });

            this.LandlordsSocket.on("Hudshow", ret => {
                cc.log('Hudshow~~~~:' + JSON.stringify(ret));
                let result = this.changeResultJSON_Function(ret);
                for (let i = 0; i < result.data.length; i++) {
                    if (result.data[i] != null) {
                        if (result.data[i].seatId != this.seatId) {
                            //设置其他人的信息
                            this.Landlords.otherEnterRoom(result.data[i].nickname, result.data[i].score, result.data[i].seatId, result.data[i].userId, result.data[i].headimgurl);
                        } else {
                            //设置自己的信息
                            this.Landlords.setMySeat(result.data[i].nickname, result.data[i].score);
                        }
                    }
                }
            });

            /**
             * 抢地主 叫地主
             */
            this.LandlordsSocket.on("Landlord", ret => {
                let result = this.changeResultJSON_Function(ret);
                console.log('landlord', JSON.stringify(result));
                if (result.No1 && result.userId === this.playerId) {
                    this.Landlords.callLandloads(result.second);
                } else {
                    this.Landlords.robLandlord(result.second, result.userId);
                }
                this.Landlords.qiangDiZhu = true;
            });

            /**
             * 是否到自己出牌
             */
            this.LandlordsSocket.on("ListenCarcd", ret => {
                let result = this.changeResultJSON_Function(ret);
                result.second = result.second - 1;
                this.Landlords.scheduleOnce(() => {
                    this.Landlords.gameFinish || this.Landlords.playState(result.userId, result.second);
                }, 1);
            });

            /**
             * 
             */
            this.LandlordsSocket.on("ACarcd", ret => {
                let result = this.changeResultJSON_Function(ret);
                if (result.userId !== this.playerId) {
                    this.Landlords.otherPlayerOutCard(result.carcd, result.userId, 0);
                } else {
                    this.Landlords.xiTongOutCard(result.carcd);
                }
                this.Landlords.playerNowState(result.userId, result.Explain, result.carcd, result["double"]);
            });

            /**
             * 
             */
            this.LandlordsSocket.on("MyCarcd", ret => {
                let result = this.changeResultJSON_Function(ret);
                result.soery || result.result || (cc.log("不能出"), this.Landlords.notConformRules());
            });

            /**
             * 广播 出不出 要不要地主
             */
            this.LandlordsSocket.on("CCTV", ret => {
                let result = this.changeResultJSON_Function(ret);
                this.Landlords.playerNowState(result.userId, result.Explain, null, null);
            });

            /**
             * 
             */
            this.LandlordsSocket.on("victory", ret => {
                let result = this.changeResultJSON_Function(ret);
                let winner = result.Winner;
                this.Landlords.scheduleOnce(() => {
                    this.Landlords.settlement(winner, result.chun_tian)
                    this.Landlords.exitBtn.active = true;
                }, 2);
            });

            /**
             * 
             */
            this.LandlordsSocket.on("Mingcarcd", ret => {
                let result = this.changeResultJSON_Function(ret);
                this.Landlords.removeAllState();
                for (let i = 0; i < result.carcd.length; i++) {
                    if (result.carcd[i].userId == this.playerId) {
                        if (this.Landlords.playerCards.length > 0) {
                            this.Landlords.xiTongOutCard(result.carcd[i].carcd);
                        } else {
                            this.Landlords.teShuChuPai(result.carcd[i].carcd);
                        }
                    } else {
                        this.Landlords.otherPlayerOutCard(result.carcd[i].carcd, result.carcd[i].userId, 0);
                    }
                }
            });

            /**
             * 托管
             */
            this.LandlordsSocket.on("InTuoGuan", ret => {
                let result = this.changeResultJSON_Function(ret);
                this.Landlords.tuoGuanState(result.reslut, result.userId);
            });

            /**
             * 玩家进入
             */
            this.LandlordsSocket.on("playEnter", ret => {
                cc.log('其它玩家进入' + JSON.stringify(ret));
                let result = this.changeResultJSON_Function(ret);
                this.Landlords.otherEnterRoom(result.ResultData.nickname, result.ResultData.score, result.ResultData.seatId, result.ResultData.userId, result.ResultData.headimgurl);
            });

            /**
             * 发牌
             */
            this.LandlordsSocket.on("sendCard", ret => {
                let result = this.changeResultJSON_Function(ret);
                this.Landlords.exitBtn.active = false;
                if (this.Landlords.gameFinish == true) {
                    this.Landlords.gameFinish = false;
                    this.Landlords.cardsSorting(result.carcd, false);
                } else {
                    this.Landlords.cardsSorting(result.carcd, false);
                }
            });

            this.LandlordsSocket.on("sendCardsArrResult", ret => {
                let result = this.changeResultJSON_Function(ret);
                console.log("sendCardsArrResult", result);
                if (result) {
                    this.Landlords.count = 0;
                } else {
                    for (let e = 0; e < this.Landlords.playerCards.length; e++) {
                        if (this.Landlords.playerCards[e].position.y == this.Landlords.movedY) {
                            this.Landlords.playerCards[e].getComponent("Cards").moveCard();
                        }
                    }
                    this.Landlords.notConformRules();
                    this.Landlords.btn_OutCard.active = true;
                    this.Landlords.timer(1, null);
                    this.Landlords.btnPlayerState = this.Landlords.btn_OutCard;
                }
            });

            this.LandlordsSocket.on("PlayerOut", ret => {
                let result = this.changeResultJSON_Function(ret);
                this.Landlords.playerOutRoom(result.userId);
            });

            this.LandlordsSocket.on("LandlordsSocket", ret => {
                let result = this.changeResultJSON_Function(ret);
            });

            /**
             * 春天
             */
            this.LandlordsSocket.on("Spring", ret => {
                let result = this.changeResultJSON_Function(ret);
                this.Landlords.chunTianAnimation();
            });

            /**
             * 地主
             */
            this.LandlordsSocket.on("Landlord_Poker", ret => {
                let result = this.changeResultJSON_Function(ret);
                result && this.Landlords.checkLandlords(result.userId, result.carcd, result["double"]);
            });

            /**
             * 
             */
            this.LandlordsSocket.on("regression", t => {
                t = this.changeResultJSON_Function(t);
                cc.log("断线重连", t);
                if (t.result) {
                    t = t.HUD;
                    for (let i = 0; i < t.length; i++) t[i].userId === this.playerId ? (this.Landlords.resetDF(t[i].DF), t[i].MyCarcd && (this.Landlords.gameFinish = false, this.Landlords.cardsSorting(t[i].MyCarcd, true)), this.Landlords.publicCard(t[i].tong_yi_pai)) : this.Landlords.setCardLength(t[i].userId, t[i].carcd_length),
                        2 === t[i].Landlord && this.Landlords.resetLandlords(t[i].userId, t[i]["double"]);
                    if (0 == this.seatId) {
                        e: for (let i = 0; i < t.length; i++)
                            if (0 == t[i].seatId) {
                                this.Landlords.teShuChuPai(t[i].carcd);
                                for (let n = 0; n < t.length; n++)
                                    if (1 == t[n].seatId) {
                                        0 == t[n].carcd.length ? this.Landlords.otherPlayerNo(t[n].userId) : this.Landlords.otherPlayerOutCard(t[n].carcd, t[n].userId, t[n].carcd.length);
                                        for (let o = 0; o < t.length; o++)
                                            if (2 == t[o].seatId) {
                                                0 == t[o].carcd.length ? this.Landlords.otherPlayerNo(t[o].userId) : this.Landlords.otherPlayerOutCard(t[o].carcd, t[o].userId, t[o].carcd.length);
                                                break e
                                            }
                                    }
                            }
                    }
                    else if (1 == this.seatId) {
                        e: for (let i = 0; i < t.length; i++)
                            if (1 == t[i].seatId) {
                                this.Landlords.teShuChuPai(t[i].carcd);
                                for (let n = 0; n < t.length; n++)
                                    if (2 == t[n].seatId) {
                                        0 == t[n].carcd.length ? this.Landlords.otherPlayerNo(t[n].userId) : this.Landlords.otherPlayerOutCard(t[n].carcd, t[n].userId, t[n].carcd.length);
                                        for (let o = 0; o < t.length; o++)
                                            if (0 == t[o].seatId) {
                                                0 == t[o].carcd.length ? this.Landlords.otherPlayerNo(t[o].userId) : this.Landlords.otherPlayerOutCard(t[o].carcd, t[o].userId, t[o].carcd.length);
                                                break e
                                            }
                                    }
                            }
                    }
                    else e: for (let i = 0; i < t.length; i++)
                        if (2 == t[i].seatId) {
                            this.Landlords.teShuChuPai(t[i].carcd);
                            for (let n = 0; n < t.length; n++)
                                if (0 == t[n].seatId) {
                                    0 == t[n].carcd.length ? this.Landlords.otherPlayerNo(t[n].userId) : this.Landlords.otherPlayerOutCard(t[n].carcd, t[n].userId, t[n].carcd.length);
                                    for (let o = 0; o < t.length; o++)
                                        if (1 == t[o].seatId) {
                                            0 == t[o].carcd.length ? this.Landlords.otherPlayerNo(t[o].userId) : this.Landlords.otherPlayerOutCard(t[o].carcd, t[o].userId, t[o].carcd.length);
                                            break e
                                        }
                                }
                        }
                    for (let i = 0; i < t.length; i++) "undefined" != typeof t[i].qiang ? t[i].Pgup != -1 && (1 == t[i].qiang ? this.Landlords.playerNowState(t[i].userId, "抢地主", null, null) : this.Landlords.playerNowState(t[i].userId, "不抢", null, null)) : 0 == t[i].carcd.length && this.Landlords.playerNowState(t[i].userId, "不出", null, null);
                    for (let i = 0; i < t.length; i++) 20 === t[i].Mytime ? this.Landlords.playState(t[i].userId, t[i].time) : 15 === t[i].Mytime && this.Landlords.robLandlord(t[i].time, t[i].userId)
                }
                this.Landlords.chongLian = true;
            });


            this.LandlordsSocket.on("publicCarcd", ret => {
                let result = this.changeResultJSON_Function(ret);
                this.Landlords.resetDF(result.points);
            });

            try {
                this.LandlordsSocket.emit("getUer", {
                    tableId: this.tableId,
                    seatId: this.seatId,
                    playerId: this.playerId
                });
                this.LandlordsSocket.emit("loadedFinish", {
                    ready: 0,
                    tableId: this.tableId,
                    seatId: this.seatId,
                    playerId: this.playerId
                });
                this.LandlordsSocket.emit("joinTableroom", {
                    tableId: this.tableId,
                    seatId: this.seatId,
                    userId: this.playerId
                });
            } catch (error) {
                console.log(loadedFinish, error);
            };

            // this.LandlordsSocket.on("OverUserPush", ret => {
            //     let result = this.changeResultJSON_Function(ret);
            //     console.log('overUserpush', result);
            //     let st = new Set(result.over_user_list);
            //     this.Landlords.btn_match_again.active = !st.has(this.playerId);
            // })
        };

        /**
         * 设置场景对象
         */
        this.setLobbyMainObj_Function = scene => {
            this.lobbyMain = scene;
            this.lobbyMainSocket = scene.getComponent("LobbyMain").netWork.socket;
        };

        /**
         * 
         */
        this.setLandlordsObj_Function = scene => {
            this.Landlords = scene;
        };

        /**
         * 
         */
        this.changeResultJSON_Function = ret => {
            if (cc.sys.isNative) {
                return JSON.parse(ret);
            }
            return ret;
        };
        this.init();
    }
    return {
        getInstant: new getInstant()
    }
})();

module.exports = LandNetWork;