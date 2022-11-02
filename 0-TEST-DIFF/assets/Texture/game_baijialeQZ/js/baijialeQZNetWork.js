//sgttest
var LandNetWork = (function () {
    function getInstant() {
        var _instance;
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
        this.houseId = null;
        this.tableId = -1;
        this.seatId = -1;
        this.playerHead = null;
        this.playerList = null;
        this.roomBet = 1;
        this.LandlordsData = null;
        this.maxLint = [0, 0, 0]; //单压 串  豹子
        this.gameData = []; //单局数据
        this.mineData = []; //单局个人数据
        this.tmpMoveTm = 0; //挪的次数
        this.tmpSubsequent = {}; //局内串的组合
        this.enterGameType = 0; // 正常房卡场 0   俱乐部房卡场1

        this.init = function () {
            this.playerInfo = require("PlayerInfo").getInstant;
        };

        /**
         * 房卡场进入游戏
         */
        this.loginGame_Function = (ip, prot, playerId, sign) => {
            this.ip = Lhjconfig.Server_IP;
            this.prot = prot;
            this.playerId = playerId;
            this.sign = sign;
            if (!this.playerInfo) {
                this.init();
            }
            this.enterGameType = 0;
            this.playerInfo.gameName = "lottery";
            this.playerInfo.gameDisconnect = false;
            this.lobbyMainSocket = require("LobbyNetWork").socket;
            this.startGameFunction();

        };

        this.initCLubObj = function (clubObj) {
            this.clubObj = clubObj;
            this.clubObj.loginGameResult();
        };

        /**
         * 开始游戏
         */
        this.startGameFunction = function () {
            var ip = this.ip;
            var prot = this.prot;
            var playerId = this.playerId;
            var sign = this.sign;
            var self = this;
            var socket = null;

            if (cc.sys.isNative) {
                self.LandlordsSocket = SocketIO.connect(ip + ":" + prot);
            } else {
                socket = require("socket-io"), self.LandlordsSocket = socket(ip + ":" + prot);
            }

            self.LandlordsSocket.on("connect_error", function () {
                cc.log("连接失败");
            });

            self.LandlordsSocket.on("connect_timeout", function () {
                cc.log("连接超时");
            });

            self.LandlordsSocket.on("connected", function (ret) {
                //cc.log('进入游戏=====' + JSON.stringify(ret));
                self.LandlordsSocket.emit("LoginGame", JSON.stringify({
                    userid: playerId,
                    gametype: 1,
                    sign: sign
                }));
            });

            self.LandlordsSocket.on("loginGameResult", function (ret) {
                cc.log('进入百家乐， 返回游戏信息:' + JSON.stringify(ret));
                ret = self.changeResultJSON_Function(ret);
                window.baijialeQZ_sc = ret.Obj;
                if (ret.resultid) {
                    self.playerInfo.playerCoin = ret.Obj.score;
                    self.lobbyMainSocket.disconnect();
                    self.LandlordsSocket.emit("getGameRankingList", "");
                }
            });

            // //名单
            self.LandlordsSocket.on("getGameRankingListResult", function (ret) {
                var result = self.changeResultJSON_Function(ret);
                console.log(result);
                window.baijialeQZ_global.userInfo_list = result;
                if (cc.director.getScene().name != "game_baijialeQZ") {
                    cc.find("Canvas/buttonCtrl").getComponent("LobbyButtonClick").QieHuanScene_normal("game_baijialeQZ");
                } else {
                    window.baijialeQZ_ins.serializeUsers(result);
                    window.baijialeQZ_ins.betBegin_r();
                }
            });
            // //当前状态
            self.LandlordsSocket.on("getGameTypeResult", function (ret) {
                var result = self.changeResultJSON_Function(ret);
                console.log(result);

                window.baijialeQZ_ins.init_stat(result);
                window.baijialeQZ_ins.updateBankerList(result.zhuangList);
            });

            //当前在线状态
            self.LandlordsSocket.on("getOnlineResult", function (ret) {
                var result = self.changeResultJSON_Function(ret);
                // console.log(result);

                window.baijialeQZ_ins.updateOnlinePlayer(result);

            });

            self.LandlordsSocket.on("lotteryResult", function (ret) {
                var result = self.changeResultJSON_Function(ret);
                // console.log(result)
                // console.log(result.bet_dict);
                // console.log("～～～～～～下注返回");
                switch (result.ResultCode) {
                    case -1:
                        window.baijialeQZ_ins.createNewTip("下注失败!");
                        break;
                    case -2:
                        window.baijialeQZ_ins.createNewTip("余额不足!");
                        break;
                    case -3:
                        window.baijialeQZ_ins.createNewTip("当前下注已达上限!");
                        break;
                    case 2:
                        baijialeQZ_ins.onBet(result.bet_dict);
                        break;
                }

            });
            self.LandlordsSocket.on("OpenWinResult", function (ret) {
                var result = self.changeResultJSON_Function(ret);
                console.log(ret);
                if (window.baijialeQZ_ins)
                    window.baijialeQZ_ins.showResult(result);
                console.log("～～～～～～开牌");
            });
            self.LandlordsSocket.on("BetStart", function (ret) {
                var result = self.changeResultJSON_Function(ret);
                //var ss = {result:true,type:1};
                if (window.baijialeQZ_ins)
                    window.baijialeQZ_ins.betBegin(ret.zhuangName, ret.zhuangCoin);
                //console.log("～～～～～～开局");
            });
            self.LandlordsSocket.on("upZhuangResult", function (ret) {
                var result = self.changeResultJSON_Function(ret);
                //var ss = {result:true,type:1};
                if (window.baijialeQZ_ins) {
                    if (result.ResultCode == -1) {
                        window.baijialeQZ_ins.createNewTip("上庄失败!");
                        return;
                    }
                    window.baijialeQZ_ins.updateBankerList(result.zhuangList);
                }
            });
            self.LandlordsSocket.on("downZhuangResult", function (ret) {
                var result = self.changeResultJSON_Function(ret);
                //var ss = {result:true,type:1};
                if (window.baijialeQZ_ins) {
                    if (result.ResultCode == -1) {
                        return;
                    }
                    window.baijialeQZ_ins.updateBankerList(result.zhuangList);
                }
            });
            //记录
            self.LandlordsSocket.on("getGameRecordListResult", function (ret) {
                var result = self.changeResultJSON_Function(ret);
                console.log(result);
                window.baijialeQZ_ins.init_record(result.game_record_list);
            });

            self.LandlordsSocket.on("sendTableMsgResult", function (ret) {

                var cjson = null;
                try {
                    cjson = JSON.parse(ret);
                    if (typeof cjson == 'object' && cjson) {
                        ret = cjson;
                    }
                } catch (e) { };


                cc.log('聊天=====' + JSON.stringify(ret));
                window.yuxiaxieMain.receiveSpChat(ret);
            });

            self.LandlordsSocket.on("BrokenLineRecovery", ret => {
                console.log('短线重连' + JSON.stringify(ret));
                self.Landlords.node.getChildByName('准备按钮').active = false;
                self.Landlords.node.getChildByName('邀请俱乐部成员按钮').active = false;
                self.Landlords.Ready(true);
                if (cc.sys.isNative) {
                    ret = JSON.parse(ret);
                    console.log('BetTypeResult22222==========================开始', ret);
                }
                self.Landlords.JuShu.string = '剩' + ret.round_num + '局';
                window.global_left_round = ret.round_num;
                if (ret.is_table_type == 1) {
                    //如果下注状态需要 可以下注  
                    self.Landlords.startInit();
                    self.Landlords.mineData = [0, 0, 0, 0, 0, 0];
                    self.Landlords.scheduleOnce(() => {
                        yuxiaxieMain.startTouZhu(ret.bet_time - 1);

                        //补投注信息
                        let betData = ret.bet_data;
                        for (let i in betData) {
                            if (betData[i].bet_type == 1) {
                                let pox = [0, -279, 9, 298, -279, 9, 298];
                                let poy = [0, 97, 97, 97, -103, -103, -103, -103];
                                self.Landlords.XiaZhu(betData[i].bet_gold, pox[betData[i].bet_res], poy[betData[i].bet_res], betData[i].seatId);
                                if (betData[i].seatId == self.Landlords.seatID) {
                                    self.Landlords.tempNetWork.mineData[betData[i].bet_res - 1] += betData[i].bet_gold;
                                    self.Landlords.rfMineData();
                                }
                            }
                        }
                        self.Landlords.tempNetWork.tmpSubsequent = ret.lian_chuan_max;
                        self.Landlords.tempNetWork.gameData = ret.bet_max_check;
                        self.Landlords.rfGameData();
                    }, 1);
                }

                self.Landlords.scheduleOnce(() => {
                    //补玩家金币
                    for (let i in ret.user_gold_dict) {
                        for (let j in self.playerList) {
                            if (!!self.playerList[j] && self.playerList[j].userId == i) {
                                self.playerList[j].table_gold = ret.user_gold_dict[i];
                            }
                        }
                    }
                    self.Landlords.initPlayer(self.playerList);
                }, 1);

                //补上一局开骰子结果
                if (!!ret.last_win_card) {
                    let list = ret.last_win_card;
                    self.Landlords.resultNode.removeAllChildren();
                    for (let i in list) {
                        let nd = cc.instantiate(self.Landlords.ShaiZis[list[i]]);
                        if (self.Landlords.spType == '1') {
                            nd.getComponent(cc.Sprite).spriteFrame = self.Landlords.shaiList1[list[i] - 1];
                        } else if (self.Landlords.spType == '2') {
                            nd.getComponent(cc.Sprite).spriteFrame = self.Landlords.shaiList2[list[i] - 1];
                        }
                        nd.scale = 0.2;
                        nd.position = i == '0' ? cc.v2(-140, 239) : cc.v2(-93, 239);
                        self.Landlords.resultNode.addChild(nd);
                    }
                }
            });
        };

        this.Exit_Function = function () {
            this.LandlordsSocket.disconnect();
            cc.director.loadScene('LobbyMain');
            this.lobbyMain = null;
            this.Landlords = null;
            this.LandlordsSocket = null;
            this.houseId = null;
            this.tableId = -1;
            this.seatId = -1;
            this.playerHead = null;
            this.playerList = null;
            this.roomBet = 1;
            this.LandlordsData = null;
            this.maxLint = [0, 0, 0];
            this.gameData = []; //单局数据
            this.mineData = []; //单局个人数据
            this.tmpMoveTm = 0; //挪的次数
            this.tmpSubsequent = {}; //局内串的组合
        };

        this.enterRoomSend_func = function () {
            let self = this;
            try {
                console.log('获取hudshow消息');
                self.LandlordsSocket.emit("getUer", {
                    tableId: self.tableId,
                    seatId: self.seatId,
                    playerId: self.playerId
                });
                // self.LandlordsSocket.emit("joinTableroom", {
                //     tableId: self.tableId,
                //     seatId: self.seatId,
                //     userId: self.playerId
                // });
            } catch (error) { };
        };

        /**
         * 设置场景对象
         */
        this.setLobbyMainObj_Function = function (scene) {
            this.lobbyMain = scene;
        };

        this.setLandlordsObj_Function = function (scene) {
            this.Landlords = scene;
        };

        this.changeResultJSON_Function = function (ret) {
            if (cc.sys.isNative) {
                return JSON.parse(ret);
            }
            return ret;
        };
        this.init();
    }
    return {
        getInstant: new getInstant(),
    }
})();

module.exports = LandNetWork;