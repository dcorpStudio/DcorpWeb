/**
 * 抢庄牛牛
 */
cc.Class({
    extends: cc.Component,

    properties: {
        com_BG: {
            default: null,
            type: cc.Node
        },
        com_View: {
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
        com_GameMenu: {
            default: null,
            type: cc.Node
        },
        com_GetBull: {
            default: null,
            type: cc.Node
        },
        com_Timer: {
            default: null,
            type: cc.Node
        },
        com_SendCardAnimation: {
            default: null,
            type: cc.Node
        },
        com_ReissueCardAniamtion: {
            default: null,
            type: cc.Node
        },
        com_Help: {
            default: null,
            type: cc.Node
        },
        com_Bill: {
            default: null,
            type: cc.Node
        },
        com_MessageBox: {
            default: null,
            type: cc.Node
        },
        com_Exit: {
            default: null,
            type: cc.Node
        },
        com_Tips: {
            default: null,
            type: cc.Node
        },
        pb_Card: {
            default: null,
            type: cc.Prefab
        },
        pb_Point: {
            default: null,
            type: cc.Prefab
        },
        pb_Coin: {
            default: null,
            type: cc.Prefab
        },
        bg_Black: {
            default: null,
            type: cc.Node
        },
        sp_BankerFrame: {
            default: null,
            type: cc.Node
        },
        sp_GrabBull: {
            default: [],
            type: cc.SpriteFrame
        },
        sp_Bet: {
            default: [],
            type: cc.SpriteFrame
        },
        an_GetBull: {
            default: null,
            type: cc.Node
        },
        an_DragonBoneAnimation: {
            default: null,
            type: cc.Node
        },
        an_SetBankerAnimation: {
            default: null,
            type: cc.Node
        },
        au_GrabBullBGM: {
            default: null,
            type: cc.AudioClip
        },
        au_ButtonSound: {
            default: null,
            type: cc.AudioClip
        },
        au_SendCard: {
            default: null,
            type: cc.AudioClip
        },
        au_GameStart: {
            default: null,
            type: cc.AudioClip
        },
        au_Point: {
            default: [],
            type: cc.AudioClip
        },
        au_Win: {
            default: null,
            type: cc.AudioClip
        },
        au_Lose: {
            default: null,
            type: cc.AudioClip
        },
        au_Coin: {
            default: null,
            type: cc.AudioClip
        },
        vipNode: {
            default: null,
            type: cc.Node
        }
    },

    /**
     * 
     */
    onLoad: function () {
        //cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        //关闭脏矩形
        if (cc.renderType === cc.game.RENDER_TYPE_CANVAS) {
            cc.renderer.enableDirtyRegion(false);
        }
        var self = this;
        cc.view.setResizeCallback(function () {
            self.uiResize_Function(cc.view.getVisibleSize());
        });
        this.uiInit_Function();

        this.playerInfo = require("PlayerInfo").getInstant;
        this.playerInfo.setGameObj_Function(this);
        this.netWork = require("GrabBullNetWork").getInstant;
        this.netWork.setGrabBullObj_Function(this);
        this.gameInit_Function();
        //vip特权
        this.vipNode.on('touchstart', () => {
            this.showVip();
        });
        this.vipNode.on('touchend', () => {
            this.closeVip();
        });
        this.vipNode.on('touchcancel', () => {
            this.closeVip();
        });
    },

    //vip特权
    showVip() {
        this.netWork.vipTap = true;
        this.netWork.grabBullSocket.emit("vipGetCard");
    },

    //vip特权
    closeVip() {
        this.netWork.vipTap = false;
        if (this.netWork.showVipBool) {
            this.netWork.showVipBool = false;
            for (let seatIndex in this.netWork.showVipIndexList) {
                for (let j = 0; j < 5; j++) {
                    this.cardArray[j + 5 * this.netWork.showVipIndexList[seatIndex]].getComponent("GrabBullCard").close_func();
                }
            }
        }
    },

    /**
     * 
     */
    uiInit_Function: function () {
        var size = cc.view.getVisibleSize();
        var scale = size.width / 1334;
        if (size.width > 1334) {
            this.com_BG.getChildByName("bg").scaleX = this.com_BG.getChildByName("bg").scaleY = scale;
            this.bg_Black.scaleX = this.bg_Black.scaleY = scale;
            this.com_PlayerMessage.getChildByName("com_Player0").x = -size.width / 2 + 100;
            this.com_Button.getChildByName("bt_Exit").x = size.width / 2 - 80;
        } else if (size.width < 1334) {
            this.node.scaleX = this.node.scaleY = scale;
            this.com_BG.getChildByName("bg").scaleX = this.com_BG.getChildByName("bg").scaleY = 1 / scale;
            this.bg_Black.scaleX = this.bg_Black.scaleY = 1 / scale;
            this.com_Button.getChildByName("bt_Exit").x = size.width / scale / 2 - 80;
        }
        this.com_PlayerMessage.getChildByName("com_Player1").x = -this.com_PlayerMessage.getChildByName("com_Player0").x;
        this.com_PlayerMessage.getChildByName("com_Player4").x = this.com_PlayerMessage.getChildByName("com_Player0").x;
        this.com_Button.getChildByName("bt_Help").x = -this.com_Button.getChildByName("bt_Exit").x;
    },

    /**
     * 
     * @param {*} size 
     */
    uiResize_Function: function (size) {
        var scale = size.width / 1334;
        if (size.width > 1334) {
            this.node.scaleX = this.node.scaleY = 1;
            this.com_BG.getChildByName("bg").scaleX = this.com_BG.getChildByName("bg").scaleY = scale;
            this.bg_Black.scaleX = this.bg_Black.scaleY = scale;
            this.com_PlayerMessage.getChildByName("com_Player0").x = -size.width / 2 + 100;
            this.com_Button.getChildByName("bt_Exit").x = size.width / 2 - 80;
        } else if (size.width < 1334) {
            this.node.scaleX = this.node.scaleY = scale;
            var minWidth = size.width / scale;
            this.com_BG.getChildByName("bg").scaleX = this.com_BG.getChildByName("bg").scaleY = 1 / scale;
            this.bg_Black.scaleX = this.bg_Black.scaleY = 1 / scale;
            this.com_PlayerMessage.getChildByName("com_Player0").x = -minWidth / 2 + 100;
            this.com_Button.getChildByName("bt_Exit").x = minWidth / 2 - 80;
        }
        this.com_PlayerMessage.getChildByName("com_Player1").x = -this.com_PlayerMessage.getChildByName("com_Player0").x,
            this.com_PlayerMessage.getChildByName("com_Player4").x = this.com_PlayerMessage.getChildByName("com_Player0").x,
            this.com_Button.getChildByName("bt_Help").x = -this.com_Button.getChildByName("bt_Exit").x
    },
    /**
     * 游戏初始化
     */
    gameInit_Function: function () {
        this.bg_Black.on("touchstart", function (ret) {
            return false;
        }, this);

        this.netWork.setGrabBullSocketOn_Function();
        this.cardArray = new Array(25);
        this.cardPosition = [
            [-350, -260],
            [280, 10],
            [140, 180],
            [-260, 180],
            [-400, 10]
        ];
        this.openCardPosition = [-60, -120];

        for (var i = 0; i < this.cardArray.length; i++) {
            var card = cc.instantiate(this.pb_Card);
            this.cardArray[i] = card;
            this.com_View.addChild(this.cardArray[i]);
            if (i < 5) {
                this.cardArray[i].scaleX = this.cardArray[i].scaleY = 1.5;
                this.cardArray[i].setPosition(this.cardPosition[parseInt(i / 5)][0] + 175 * parseInt(i % 5), this.cardPosition[parseInt(i / 5)][1]);
                this.cardArray[i].getComponent("GrabBullCard").canvasNode = this, this.cardArray[i].getComponent("cc.Button").interactable = true;
                this.cardArray[i].cardId = i;
            } else {
                this.cardArray[i].setPosition(this.cardPosition[parseInt(i / 5)][0] + 30 * parseInt(i % 5), this.cardPosition[parseInt(i / 5)][1]);
            }
            this.cardArray[i].active = false;
        }

        this.resultCardArray = new Array(5);
        this.pointArray = new Array(5);
        this.pointPosition = [
            [0, -150],
            [340, -25],
            [200, 145],
            [-210, 145],
            [-340, -25]
        ];

        for (var i = 0; i < this.pointArray.length; i++) {
            var point = cc.instantiate(this.pb_Point);
            this.pointArray[i] = point;
            this.com_View.addChild(this.pointArray[i]);
            this.pointArray[i].setPosition(this.pointPosition[i][0], this.pointPosition[i][1]);
            this.pointArray[i].active = false;
        }



        this.serverPoint = -1;
        this.coinArray = new Array(250);

        for (var i = 0; i < this.coinArray.length; i++) {
            var coin = cc.instantiate(this.pb_Coin);
            this.coinArray[i] = coin;
            this.com_View.addChild(this.coinArray[i]);
            this.coinArray[i].active = false;
        }

        this.coinFly = false;
        this.bankerSeatId = -1;
        this.randomBankerTimer = 0;
        this.randomBanker = false;
        this.randomBankerArray = [];
        this.randomBankerPosition = 0;
        this.sp_BankerFrame.active = false;
        this.grabBullSelectArray = [];
        this.randomBankerCount = 0;
        this.timeRun = false;
        this.currentTime = 0;
        this.totalTime = 0;
        this.timeCount = 0;
        this.com_Timer.active = false;
        this.cardClick = new Array(5);
        this.playerList = null;
        this.com_PlayerMessage.getChildByName("com_Player0").getChildByName("lb_PlayerName").getComponent("cc.Label").string = this.playerInfo.playerName;
        this.com_PlayerMessage.getChildByName("com_Player0").getChildByName("lb_PlayerMoney").getComponent("cc.Label").string = (this.playerInfo.playerCoin / this.playerInfo.exchangeRate).toFixed(2);
        Helper.loadHead(this.playerInfo.playerHeadId, sp => {
            this.com_PlayerMessage.getChildByName("com_Player0").getChildByName("sp_PlayerHead").active = true;
            this.com_PlayerMessage.getChildByName("com_Player0").getChildByName("sp_PlayerHead").getComponent("cc.Sprite").spriteFrame = sp;
        });
        this.canSendCard = [0, 0, 0, 0, 0];
        this.gameState = 0;
        this.GS_GAMESTART = 1;
        this.GS_SENDCARDS = 2;
        this.GS_GRABBANKER = 3;
        this.GS_SELECTBET = 4;
        this.GS_SETBULL = 5;
        this.GS_OPENCARD = 6;
        this.GS_BILLING = 7;

        this.an_DBSAnimation = this.an_DragonBoneAnimation.getComponent("dragonBones.ArmatureDisplay");
        this.dbArmature = this.an_DBSAnimation.armature();
        this.canSetBull = false;
        this.db_GetBullAnimation = this.an_GetBull.getChildByName("db_GetBull").getComponent("dragonBones.ArmatureDisplay");
        this.db_GetBullArmature = this.db_GetBullAnimation.armature();
        this.db_GetBullAnimation.addEventListener(dragonBones.EventObject.FRAME_EVENT, this.frame_event_Function, this);
        this.winResult = [];
        this.timeOut = [];

        this.buttonInit_Function();

        this.playerInfo.musicControl && cc.audioEngine.play(this.au_GrabBullBGM, true, .5);
        this.isGaming = false;
        this.gameExit = false;
        this.netWork.grabBullSocket.emit("getDownTime", {});
        this.netWork.grabBullSocket.emit("getTableList");
    },

    /**
     * 初始化座位上玩家的信息
     * @param {*} tableList 
     */
    playerMessageInit_Function: function (tableList) {
        this.playerList = tableList;
        for (var i = 0; i < tableList.length; i++) {
            let seatIndex = -1;
            seatIndex = this.changeSeatId_Function(this.playerList[i].seatId);
            this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("sp_PlayerHead").active = true;
            Helper.loadHead(this.playerList[i].headimgurl, sp => {
                this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("sp_PlayerHead").getComponent("cc.Sprite").spriteFrame = sp;
            });
            this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("lb_PlayerName").getComponent("cc.Label").string = this.playerList[i].nickname;
            this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("lb_PlayerMoney").getComponent("cc.Label").string = (this.playerList[i].score / this.playerInfo.exchangeRate).toFixed(2);
        }
    },

    /**
     * 侦听器
     * @param {*} event 
     */
    frame_event_Function: function (event) {
        switch (event.name) {
            case "start":
                break;
            case "win":
                break;
            case "lose":
                break;
            case "over":
                this.com_GetBull.active = false;
                break;
        }
    },

    /**
     * 按钮初始化
     */
    buttonInit_Function: function () {
        for (var i = 0; i < this.com_Button.getChildByName("com_GrabButton").children.length; i++) {
            this.com_Button.getChildByName("com_GrabButton").children[i].grab = i;
        };
        var betList = [5, 10, 20, 30];
        for (i = 0; i < this.com_Button.getChildByName("com_BetButton").children.length; i++) {
            this.com_Button.getChildByName("com_BetButton").children[i].bet = betList[i];
            this.com_Button.getChildByName("com_BetButton").children[i].betId = i;
        };
    },

    /**
     * 本局状态信息
     * @param {*} ret 
     */
    firstTimeEntryInit_Function: function (ret) {
        if (ret.data.tableState[ret.data.tableState.length - 1].play) {
            if (ret.data.remainTime > 0) {
                this.currentTime = ret.data.remainTime;
                this.totalTime = ret.data.remainTime;
                this.com_Timer.getChildByName("lb_Time").getComponent("cc.Label").string = this.currentTime;
                this.com_Timer.active = true;
                this.timeRun = true;
            }
            switch (ret.data.state) {
                case 0:
                    this.gameState = this.GS_GAMESTART;
                    for (var k = 0; k < ret.data.tableState.length - 1; k++) {
                        if (ret.data.tableState[k].userId) {
                            this.canSendCard[k] = 1;
                            if (ret.data.tableState[k].userId === this.playerInfo.playerId) {
                                this.com_Tips.getChildByName("sp_Tips01").active = false;
                                this.isGaming = true;
                            }
                        }
                    }
                    break;
                case 1:
                    this.gameState = this.GS_GRABBANKER;
                    for (var k = 0; k < ret.data.tableState.length - 1; k++) {
                        if (ret.data.tableState[k].userId) {
                            if (ret.data.tableState[k].userId === this.playerInfo.playerId) {
                                for (var k = 0; k < 4; k++) {
                                    this.cardArray[k].active = true;
                                    this.cardArray[k].getComponent("GrabBullCard").open_Function(ret.data.tableState[ret.data.tableState.length - 1].cardList[this.netWork.seatId][k]);
                                }
                                this.com_Button.getChildByName("com_GrabButton").active = true;
                                this.com_Tips.getChildByName("sp_Tips01").active = false;
                                this.isGaming = true;
                            } else {
                                var seatIndex = this.changeSeatId_Function(k);
                                for (var k = 0; k < 4; k++) {
                                    this.cardArray[k + 5 * seatIndex].active = true;
                                }
                            }
                            this.canSendCard[k] = 1;
                        }
                    }
                    break;
                case 2:
                    this.gameState = this.GS_SELECTBET;
                    for (var i = 0; i < ret.data.tableState.length - 1; i++)
                        if (ret.data.tableState[i].userId) {
                            if (ret.data.tableState[i].userId === this.playerInfo.playerId) {
                                for (var k = 0; k < 4; k++) {
                                    this.cardArray[k].active = true;
                                    this.cardArray[k].getComponent("GrabBullCard").open_Function(ret.data.tableState[ret.data.tableState.length - 1].cardList[this.netWork.seatId][k]);
                                }
                                if (ret.data.tableState[ret.data.tableState.length - 1].seatId !== this.netWork.seatId) {
                                    this.com_Button.getChildByName("com_BetButton").active = true;
                                }
                                this.com_Tips.getChildByName("sp_Tips01").active = false,
                                    this.isGaming = true
                            } else {
                                var seatIndex = this.changeSeatId_Function(i);
                                for (var k = 0; k < 4; k++) {
                                    this.cardArray[k + 5 * seatIndex].active = true;
                                }
                            }
                            this.canSendCard[i] = 1;
                        }
                    this.bankerSeatId = ret.data.tableState[ret.data.tableState.length - 1].seatId;
                    var seatId = this.changeSeatId_Function(ret.data.tableState[ret.data.tableState.length - 1].seatId);
                    this.sp_BankerFrame.active = true;
                    this.sp_BankerFrame.setPosition(this.com_PlayerMessage.getChildByName("com_Player" + seatId).position);
                    this.an_SetBankerAnimation.active = true;
                    switch (seatId) {
                        case 0:
                            this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x + 90, this.sp_BankerFrame.y + 55);
                            break;
                        case 1:
                            this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x - 90, this.sp_BankerFrame.y - 45);
                            break;
                        case 2:
                            this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x - 90, this.sp_BankerFrame.y - 45);
                            break;
                        case 3:
                            this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x + 90, this.sp_BankerFrame.y - 45);
                            break;
                        case 4:
                            this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x + 90, this.sp_BankerFrame.y + 55);
                            break;
                    }
                    break;
                case 3:
                    this.gameState = this.GS_SETBULL;
                    for (var i = 0; i < ret.data.tableState.length - 1; i++) {
                        if (ret.data.tableState[i].userId) {
                            if (ret.data.tableState[i].userId === this.playerInfo.playerId) {
                                for (var k = 0; k < 5; k++) {
                                    this.cardArray[k].active = true;
                                    this.cardArray[k].getComponent("GrabBullCard").open_Function(ret.data.tableState[ret.data.tableState.length - 1].cardList[this.netWork.seatId][k]);
                                }
                                if (ret.data.tableState[i].reCallValueId === -1) {
                                    this.com_PlayerMessage.getChildByName("com_Player0").getChildByName("sp_Xbet").getComponent("cc.Sprite").spriteFrame = this.sp_Bet[ret.data.tableState[i].callValueId];
                                }
                                this.com_Tips.getChildByName("sp_Tips01").active = false;
                                this.com_GetBull.active = true;
                                this.com_GetBull.getChildByName("bt_GetBull").active = true;
                                this.com_GetBull.getChildByName("bt_NotBull").active = true;
                                this.canSetBull = true;
                                this.db_GetBullAnimation.playAnimation("start", 1);
                                this.serverPoint = ret.data.my_point;
                                this.isGaming = true;
                            } else {
                                var seatIndex = this.changeSeatId_Function(i);
                                for (var k = 0; k < 5; k++) {
                                    this.cardArray[k + 5 * seatIndex].active = true;
                                }
                                if (ret.data.tableState[ret.data.tableState.length - 1].showList[i] !== -1) {
                                    for (var k = 0; k < 5; k++) {
                                        this.cardArray[k + 5 * seatIndex].getComponent("GrabBullCard").open_Function(ret.data.tableState[ret.data.tableState.length - 1].cardList[i][k]);
                                    }
                                    this.pointArray[seatIndex].active = true;
                                    this.pointArray[seatIndex].getComponent("GrabBullPoint").setType_Function(ret.data.tableState[ret.data.tableState.length - 1].showList[i]);
                                }
                                this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("sp_Xbet").getComponent("cc.Sprite").spriteFrame = this.sp_Bet[ret.data.tableState[i].callValueId];
                            }
                        }
                        this.canSendCard[i] = 1;
                    }
                    this.bankerSeatId = ret.data.tableState[ret.data.tableState.length - 1].seatId;
                    var seatIndex = this.changeSeatId_Function(ret.data.tableState[ret.data.tableState.length - 1].seatId);
                    this.sp_BankerFrame.active = true;
                    this.sp_BankerFrame.setPosition(this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).position);
                    this.an_SetBankerAnimation.active = true;
                    switch (seatIndex) {
                        case 0:
                            this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x + 90, this.sp_BankerFrame.y + 55);
                            break;
                        case 1:
                            this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x - 90, this.sp_BankerFrame.y - 45);
                            break;
                        case 2:
                            this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x - 90, this.sp_BankerFrame.y - 45);
                            break;
                        case 3:
                            this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x + 90, this.sp_BankerFrame.y - 45);
                            break;
                        case 4:
                            this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x + 90, this.sp_BankerFrame.y + 55);
                            break;
                    }
                    this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("sp_Xbet").getComponent("cc.Sprite").spriteFrame = this.sp_GrabBull[ret.data.tableState[ret.data.tableState.length - 1].bet];
                    break;
                case 4:
                    break;
            }
        }
    },

    /**
     * 开始游戏
     * @param {*} ret 
     */
    gameStart_Function: function (ret) {
        this.gameReset_Function();
        this.timeRun = true;
        this.currentTime = ret.remainTime;
        this.totalTime = ret.remainTime;
        this.com_Timer.getChildByName("lb_Time").getComponent("cc.Label").string = this.currentTime;
        this.com_Timer.active = true,
            this.canSendCard = new Array(5);
        this.canSendCard = ret.tableState;
        this.isGaming = true;
        this.gameState = this.GS_GAMESTART;
    },

    /**
     * 发牌
     * @param {*} ret 
     */
    sendCard_Function: function (ret) {
        for (var i = 0; i < this.cardArray.length; i++) {
            this.cardArray[i].active = false;
        }
        var seatIndex = 0;
        for (i = 0; i < this.canSendCard.length; i++) {
            if (this.canSendCard[i]) {
                seatIndex = this.changeSeatId_Function(i);
                this.com_SendCardAnimation.getChildByName("an_SendCardAnimation" + seatIndex).active = true;
                this.com_SendCardAnimation.getChildByName("an_SendCardAnimation" + seatIndex).getComponent("cc.Animation").play();
            }
        }
        if (this.playerInfo.soundEffectControl) {
            cc.audioEngine.play(this.au_SendCard, false, 1);
        }
        for (var i = 0; i < ret.card.length; i++) {
            this.resultCardArray[i] = ret.card[i];
        }
        this.timeRun = true;
        this.currentTime = ret.remainTime;
        this.totalTime = ret.remainTime;
        this.com_Timer.getChildByName("lb_Time").getComponent("cc.Label").string = this.currentTime;
        this.com_Timer.active = true;
        this.gameState = this.GS_GRABBANKER;
    },

    /**
     * 翻开前四张牌
     */
    openSendCard_Function: function () {
        for (var i = 0; i < 4; i++) {
            this.cardArray[i].getComponent("GrabBullCard").open_Function(this.resultCardArray[i]);
        }
        this.com_Button.getChildByName("com_GrabButton").active = true;
    },

    /**
     * 发最后一张牌
     * @param {*} ret 
     */
    reissueCard_Function: function (ret) {
        if (ret.cowPoint != -1) {
            this.serverPoint = ret.cowPoint;
            this.com_Button.getChildByName("com_BetButton").active = false;
            this.com_GetBull.active = true;
            this.com_GetBull.getChildByName("bt_GetBull").active = true;
            this.com_GetBull.getChildByName("bt_NotBull").active = true;
            this.db_GetBullAnimation.playAnimation("start", 1);
            this.canSetBull = true;
            this.resultCardArray[4] = ret.card[0];
        }
        var seatIndex = 0;
        for (var i = 0; i < this.canSendCard.length; i++) {
            if (this.canSendCard[i]) {
                seatIndex = this.changeSeatId_Function(i);
                this.com_ReissueCardAniamtion.getChildByName("an_ReissueCardAniamtion" + seatIndex).active = true;
                this.com_ReissueCardAniamtion.getChildByName("an_ReissueCardAniamtion" + seatIndex).getComponent("cc.Animation").play();
            }
        }
        if (this.playerInfo.soundEffectControl) {
            cc.audioEngine.play(this.au_SendCard, false, 1);
        }
        this.timeRun = true;
        this.currentTime = ret.remainTime;
        this.totalTime = ret.remainTime;
        this.com_Timer.getChildByName("lb_Time").getComponent("cc.Label").string = this.currentTime;
        this.com_Timer.active = true;
        this.gameState = this.GS_SETBULL;
    },

    /**
     * 翻开最后一张牌
     */
    openReissueCard_Function: function () {
        this.cardArray[4].getComponent("GrabBullCard").open_Function(this.resultCardArray[4]);
    },

    /**
     * 
     * @param {*} self 
     */
    grabBanker_Function: function (self) {
        this.netWork.grabBullSocket.emit("call", JSON.stringify({
            callValueId: self.node.grab
        }));
        this.com_Button.getChildByName("com_GrabButton").active = false;
        if (this.playerInfo.soundEffectControl) {
            cc.audioEngine.play(this.au_ButtonSound, false, 1);
        }
    },

    /**
     * 
     * @param {*} ret 
     */
    setXbetBankerLabel_Function: function (ret) {
        for (var i = 0; i < this.playerList.length; i++) {
            var seatIndex = this.changeSeatId_Function(ret.seatId);
            this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("sp_Xbet").getComponent("cc.Sprite").spriteFrame = this.sp_GrabBull[ret.callValueId];
        }
        this.grabBullSelectArray[ret.seatId] = ret.callValueId;
    },

    /**
     * 抢庄倍数
     * @param {*} ret 
     */
    checkBanker_Function: function (ret) {
        this.timeRun = true;
        this.currentTime = ret.remainTime;
        this.totalTime = ret.remainTime;
        this.com_Timer.getChildByName("lb_Time").getComponent("cc.Label").string = this.currentTime;
        this.com_Timer.active = true;
        this.bankerSeatId = ret.bankerSeatId;
        var selectIndex = -1;
        var bankerIndex = 0;
        var randomBankerIndex = 0;
        var seatIndex = -1;
        for (var i = 0; i < this.grabBullSelectArray.length; i++) {
            if (this.grabBullSelectArray[i] >= selectIndex) {
                selectIndex = this.grabBullSelectArray[i];
                bankerIndex++;
            }
        }
        this.com_Button.getChildByName("com_GrabButton").active = false;
        if (bankerIndex > 1) {
            for (var i = 0; i < this.grabBullSelectArray.length; i++) {
                if (this.grabBullSelectArray[i] === selectIndex) {
                    seatIndex = this.changeSeatId_Function(i);
                    this.randomBankerArray[randomBankerIndex] = seatIndex;
                    randomBankerIndex++;
                }
            }
            this.randomBanker = true;
        } else {
            this.setBanker_Function();
        }
    },

    /**
     * 
     * @param {*} self 
     */
    betSelect_Function: function (self) {
        this.com_Button.getChildByName("com_BetButton").active = false;
        this.netWork.grabBullSocket.emit("reCall", JSON.stringify({
            reCallValueId: self.node.betId
        }));
        if (this.playerInfo.soundEffectControl) {
            cc.audioEngine.play(this.au_ButtonSound, false, 1);
        }
    },

    /**
     * 下注回调
     * @param {*} ret 
     */
    setXBetPlayerLabel_Function: function (ret) {
        for (var i = 0; i < this.playerList.length; i++) {
            var seatIndex = this.changeSeatId_Function(ret.seatId);
            var xbetSprite = this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("sp_Xbet").getComponent("cc.Sprite");
            xbetSprite.spriteFrame = this.sp_Bet[ret.reCallValueId];
        }
    },

    /**
     * 
     * @param {*} randomBankerList 
     */
    randomBanker_Function: function (randomBankerList) {
        this.sp_BankerFrame.active = true;
        if (this.randomBankerPosition >= randomBankerList.length) {
            this.randomBankerPosition = 0;
        }
        this.sp_BankerFrame.setPosition(this.com_PlayerMessage.children[this.randomBankerArray[this.randomBankerPosition]].position);
        this.randomBankerPosition++;
    },

    /**
     * 设置庄家
     */
    setBanker_Function: function () {
        this.sp_BankerFrame.active = true;
        //庄家位置索引
        var bankerSeatIndex = this.changeSeatId_Function(this.bankerSeatId);
        this.sp_BankerFrame.setPosition(this.com_PlayerMessage.children[bankerSeatIndex].position);
        switch (bankerSeatIndex) {
            case 0:
                this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x + 90, this.sp_BankerFrame.y + 55);
                break;
            case 1:
                this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x - 90, this.sp_BankerFrame.y - 45);
                break;
            case 2:
                this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x - 90, this.sp_BankerFrame.y - 45);
                break;
            case 3:
                this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x + 90, this.sp_BankerFrame.y - 45);
                break;
            case 4:
                this.an_SetBankerAnimation.setPosition(this.sp_BankerFrame.position.x + 90, this.sp_BankerFrame.y + 55);
                break;
        }
        this.an_SetBankerAnimation.active = true;
        this.an_SetBankerAnimation.getComponent("cc.Animation").play();
        for (var i = 0; i < this.com_PlayerMessage.children.length; i++) {
            var xbetSprite = this.com_PlayerMessage.getChildByName("com_Player" + i).getChildByName("sp_Xbet").getComponent("cc.Sprite");
            if (bankerSeatIndex == i) {
                if (xbetSprite.spriteFrame === this.sp_GrabBull[0]) {
                    xbetSprite.spriteFrame = this.sp_GrabBull[1];
                }
            } else {
                if (xbetSprite.spriteFrame == this.sp_GrabBull[0] && xbetSprite.spriteFrame == this.sp_GrabBull[1] && xbetSprite.spriteFrame == this.sp_GrabBull[2] && xbetSprite.spriteFrame == this.sp_GrabBull[3] && xbetSprite.spriteFrame == this.sp_GrabBull[4]) {
                    xbetSprite.spriteFrame = null;
                }
            }
        }
        if (this.canSendCard[this.netWork.seatId] && this.netWork.seatId !== this.bankerSeatId) {
            this.com_Button.getChildByName("com_BetButton").active = true;
        }
    },

    /**
     * 检测是否有牛
     * @param {*} cardId 
     */
    checkBull_Function: function (cardId) {
        var index = 0;
        for (var i = 0; i < this.cardClick.length; i++) {
            this.cardClick[i] && index++;
        }
        if (index < 3) {
            if (this.cardClick[cardId]) {
                this.cardClick[cardId] = false;
                this.cardArray[cardId].y = this.cardArray[cardId].y - 20;
                this.setGetBullLabel_Function(cardId, false);
            } else {
                this.cardClick[cardId] = true;
                this.cardArray[cardId].y = this.cardArray[cardId].y + 20;
                this.setGetBullLabel_Function(cardId, true);
            }
        } else {
            if (this.cardClick[cardId]) {
                this.cardClick[cardId] = false;
                this.cardArray[cardId].y = this.cardArray[cardId].y - 20;
                this.setGetBullLabel_Function(cardId, false);
            }
        }
    },

    /**
     * 设置牛牛计算机
     * @param {*} cardId 
     * @param {*} isDown 
     */
    setGetBullLabel_Function: function (cardId, isDown) {
        if (isDown) {
            for (var i = 0; i < 3; i++) {
                if (this.com_GetBull.getChildByName("lb_GetBull" + i).getComponent("cc.Label").string == "") {
                    this.com_GetBull.getChildByName("lb_GetBull" + i).getComponent("cc.Label").string = this.cardArray[cardId].getComponent("GrabBullCard").point;
                    break;
                }
            }
        } else {
            for (var i = 0; i < 3; i++) {
                if (this.com_GetBull.getChildByName("lb_GetBull" + i).getComponent("cc.Label").string != "" && parseInt(this.com_GetBull.getChildByName("lb_GetBull" + i).getComponent("cc.Label").string) === this.cardArray[cardId].getComponent("GrabBullCard").point) {
                    this.com_GetBull.getChildByName("lb_GetBull" + i).getComponent("cc.Label").string = "";
                    break;
                }
            }
            for (var i = 0; i < 2; i++) {
                if (this.com_GetBull.getChildByName("lb_GetBull" + i).getComponent("cc.Label").string == "" && this.com_GetBull.getChildByName("lb_GetBull" + (i + 1)).getComponent("cc.Label").string !== "") {
                    this.com_GetBull.getChildByName("lb_GetBull" + i).getComponent("cc.Label").string = this.com_GetBull.getChildByName("lb_GetBull" + (i + 1)).getComponent("cc.Label").string;
                    this.com_GetBull.getChildByName("lb_GetBull" + (i + 1)).getComponent("cc.Label").string = "";
                }
            }
        }
        var num = 0;
        for (i = 0; i < 3; i++) {
            if (this.com_GetBull.getChildByName("lb_GetBull" + i).getComponent("cc.Label").string !== "") {
                num += parseInt(this.com_GetBull.getChildByName("lb_GetBull" + i).getComponent("cc.Label").string);
            }
        }
        if (num == 0) {
            this.com_GetBull.getChildByName("lb_GetBull3").getComponent("cc.Label").string = "";
        } else {
            this.com_GetBull.getChildByName("lb_GetBull3").getComponent("cc.Label").string = num;
        }
    },

    /**
     * 设置位置
     */
    setBullPoint_Function: function () {
        var index = 0;
        for (var i = 0; i < 4; i++) {
            if (this.com_GetBull.getChildByName("lb_GetBull" + i).getComponent("cc.Label").string !== "") {
                index++;
            }
        }
        if (index == 4 && parseInt(this.com_GetBull.getChildByName("lb_GetBull3").getComponent("cc.Label").string) % 10 === 0) {
            this.com_GetBull.active = false;
            this.com_GetBull.getChildByName("bt_GetBull").active = false;
            this.com_GetBull.getChildByName("bt_NotBull").active = false;
            this.netWork.grabBullSocket.emit("show");
        }
    },

    /**
     * 显示位置
     * @param {*} cowPoint 
     * @param {*} seatID 
     * @param {*} cardID 
     */
    showBullPoint_Function: function (cowPoint, seatID, cardID) {
        var self = this;
        if (seatID === this.netWork.seatId) {
            this.db_GetBullAnimation.playAnimation("over", 1);
            this.canSetBull = false;
            this.scheduleOnce(function () {
                for (var i = 0; i < 5; i++) {
                    this.cardArray[i].scaleX = 1;
                    this.cardArray[i].scaleY = 1;
                    this.cardArray[i].setPosition(this.cardPosition[0][0] + 120 * i, this.cardPosition[0][1]);
                    this.cardArray[i].runAction(cc.moveTo(.2, self.openCardPosition[0] + 30 * i, self.openCardPosition[1]));
                }
                this.pointArray[0].active = true;
                this.pointArray[0].getComponent("GrabBullPoint").setType_Function(cowPoint);
                this.playerInfo.soundEffectControl && cc.audioEngine.play(self.au_Point[cowPoint], false, 1);
            }, 1, 0);
        } else {
            var seatIndex = this.changeSeatId_Function(seatID);
            for (var i = 0; i < 5; i++) {
                this.cardArray[i + 5 * seatIndex].getComponent("GrabBullCard").open_Function(cardID[i]);
            }
            this.pointArray[seatIndex].active = true;
            this.pointArray[seatIndex].getComponent("GrabBullPoint").setType_Function(cowPoint);
            this.scheduleOnce(function () {
                this.playerInfo.soundEffectControl && cc.audioEngine.play(self.au_Point[cowPoint], false, 1);
            }, .3);
        }
    },

    /**
     * 金币结算
     * @param {*} ret 
     */
    billing_Function: function (ret) {
        this.isGaming = false;
        var self = this;

        this.scheduleOnce(function () {
            for (var i = 0; i < ret.openMsg.length; i++) {
                if (self.netWork.seatId === ret.openMsg[i].seatId) {
                    if (ret.openMsg[i].win > 0) {
                        self.an_DBSAnimation.playAnimation("win", 1);
                        if (self.playerInfo.soundEffectControl) {
                            cc.audioEngine.play(self.au_Win, false, 1);
                        }
                    } else {
                        self.an_DBSAnimation.playAnimation("lose", 1);
                        if (self.playerInfo.soundEffectControl) {
                            cc.audioEngine.play(self.au_Lose, false, 1);
                        }
                    }
                    break;
                }
            }
        }, 2);

        this.scheduleOnce(function () {
            for (var i = 0; i < self.cardArray.length; i++) {
                self.cardArray[i].getComponent("GrabBullCard").open_Function(0);
                self.cardArray[i].getComponent("GrabBullCard").point = 0;
                self.cardArray[i].active = false;
            }
            for (i = 0; i < self.pointArray.length; i++) {
                self.pointArray[i].active = false;
            }

            for (i = 0; i < self.com_PlayerMessage.children.length; i++) {
                self.com_PlayerMessage.getChildByName("com_Player" + i).getChildByName("sp_Xbet").getComponent("cc.Sprite").spriteFrame = null;
            }

            self.coinFly_Function(ret);
        }, 4);

        this.scheduleOnce(function () {
            for (var i = 0; i < ret.openMsg.length; i++) {
                if (self.netWork.seatId === ret.openMsg[i].seatId) {
                    if (ret.openMsg[i].win > 0) {
                        self.com_PlayerMessage.getChildByName("com_Player0").getChildByName("lb_WinScore").getChildByName("lb_Score").getComponent("cc.Label").string = "+" + ret.openMsg[i].win / self.playerInfo.exchangeRate;
                        self.com_PlayerMessage.getChildByName("com_Player0").getChildByName("lb_WinScore").active = true;
                        self.com_PlayerMessage.getChildByName("com_Player0").getChildByName("lb_WinScore").getComponent("cc.Animation").play();
                    } else {
                        self.com_PlayerMessage.getChildByName("com_Player0").getChildByName("lb_FailScore").getChildByName("lb_Score").getComponent("cc.Label").string = ret.openMsg[i].win / self.playerInfo.exchangeRate;
                        self.com_PlayerMessage.getChildByName("com_Player0").getChildByName("lb_FailScore").active = true;
                        self.com_PlayerMessage.getChildByName("com_Player0").getChildByName("lb_FailScore").getComponent("cc.Animation").play();
                    }
                    self.com_PlayerMessage.getChildByName("com_Player0").getChildByName("lb_PlayerMoney").getComponent("cc.Label").string = (parseFloat(self.com_PlayerMessage.getChildByName("com_Player0").getChildByName("lb_PlayerMoney").getComponent("cc.Label").string) + parseFloat(ret.openMsg[i].win / self.playerInfo.exchangeRate)).toFixed(2);
                } else {
                    var seatId = self.changeSeatId_Function(ret.openMsg[i].seatId);
                    if (ret.openMsg[i].win > 0) {
                        self.com_PlayerMessage.getChildByName("com_Player" + seatId).getChildByName("lb_WinScore").getChildByName("lb_Score").getComponent("cc.Label").string = "+" + ret.openMsg[i].win / self.playerInfo.exchangeRate;
                        self.com_PlayerMessage.getChildByName("com_Player" + seatId).getChildByName("lb_WinScore").active = true;
                        self.com_PlayerMessage.getChildByName("com_Player" + seatId).getChildByName("lb_WinScore").getComponent("cc.Animation").play();
                    } else {
                        self.com_PlayerMessage.getChildByName("com_Player" + seatId).getChildByName("lb_FailScore").getChildByName("lb_Score").getComponent("cc.Label").string = ret.openMsg[i].win / self.playerInfo.exchangeRate;
                        self.com_PlayerMessage.getChildByName("com_Player" + seatId).getChildByName("lb_FailScore").active = true;
                        self.com_PlayerMessage.getChildByName("com_Player" + seatId).getChildByName("lb_FailScore").getComponent("cc.Animation").play();
                    }
                    if (self.com_PlayerMessage.children[seatId].getChildByName("lb_PlayerName").getComponent("cc.Label").string) {
                        self.com_PlayerMessage.getChildByName("com_Player" + seatId).getChildByName("lb_PlayerMoney").getComponent("cc.Label").string = (parseFloat(self.com_PlayerMessage.getChildByName("com_Player" + seatId).getChildByName("lb_PlayerMoney").getComponent("cc.Label").string) + parseFloat(ret.openMsg[i].win / self.playerInfo.exchangeRate)).toFixed(2);
                    }
                }
            }
        }, 7);
    },

    /**
     * 金币飞行特效处理
     * @param {*} ret 
     */
    coinFly_Function: function (ret) {
        for (var i = 0; i < ret.openMsg.length; i++) {
            if (ret.openMsg[i].seatId !== this.bankerSeatId) {
                var seatId = this.changeSeatId_Function(ret.openMsg[i].seatId);
                var bankerSeatId = this.changeSeatId_Function(this.bankerSeatId);
                if (ret.openMsg[i].win < 0) {
                    this.coinToBankerAnimation_Function(seatId, bankerSeatId);
                } else {
                    this.coinToPlayerAnimation_Function(seatId, bankerSeatId);
                }
            }
        };
        if (this.playerInfo.soundEffectControl) {
            cc.audioEngine.play(this.au_Coin, false, 1);
        }
    },

    /**
     * 金币飞向庄家动画
     * @param {*} seatId 
     * @param {*} bankerSeatId 
     */
    coinToBankerAnimation_Function: function (seatId, bankerSeatId) {
        for (var i = 0; i < this.coinArray.length / 5; i++) {
            for (var j = 0; j < this.coinArray.length; j++) {
                if (!this.coinArray[j].active) {
                    this.coinArray[j].active = true;
                    this.coinArray[j].getComponent("GrabBullCoin").setCoinToBanker_Function(this.com_PlayerMessage.getChildByName("com_Player" + seatId).position, this.com_PlayerMessage.getChildByName("com_Player" + bankerSeatId).position, i);
                    break;
                }
            }
        }
    },

    /**
     * 金币飞向玩家动画
     * @param {*} seatId 
     * @param {*} bankerSeatId 
     */
    coinToPlayerAnimation_Function: function (seatId, bankerSeatId) {
        var self = this;
        this.scheduleOnce(function () {
            for (var i = 0; i < self.coinArray.length / 5; i++) {
                for (var j = 0; j < self.coinArray.length; j++) {
                    if (!self.coinArray[j].active) {
                        self.coinArray[j].active = true,
                            self.coinArray[j].getComponent("GrabBullCoin").setCoinToPlayer_Function(self.com_PlayerMessage.getChildByName("com_Player" + seatId).position, self.com_PlayerMessage.getChildByName("com_Player" + bankerSeatId).position, i);
                        break
                    }
                }
            }
        }, 1);
    },

    /**
     * 重新游戏
     */
    gameReset_Function: function () {
        //
        for (var i = 0; i < this.cardArray.length; i++) {
            this.cardArray[i].active = false;
            this.cardArray[i].getComponent("GrabBullCard").open_Function(0);
            this.cardArray[i].getComponent("GrabBullCard").point = 0;
        }
        //
        for (i = 0; i < 5; i++) {
            this.cardArray[i].scaleX = this.cardArray[i].scaleY = 1.5;
            this.cardArray[i].setPosition(this.cardPosition[0][0] + 175 * i, this.cardPosition[0][1]);
            this.cardArray[i].getComponent("cc.Button").interactable = true;
        }
        //
        for (i = 0; i < 4; i++) {
            this.com_GetBull.getChildByName("lb_GetBull" + i).getComponent("cc.Label").string = "";
        }
        //
        for (i = 0; i < this.com_PlayerMessage.children.length; i++) {
            this.com_PlayerMessage.getChildByName("com_Player" + i).getChildByName("sp_Xbet").getComponent("cc.Sprite").spriteFrame = null;
        }
        //
        for (i = 0; i < this.pointArray.length; i++) {
            this.pointArray[i].active = false;
        }

        //
        for (i = 0; i < this.cardClick.length; i++) {
            this.cardClick[i] = false;
        }
        this.randomBankerArray = [];
        this.grabBullSelectArray = [];
        this.com_Button.getChildByName("com_GrabButton").active = false;
        this.com_Button.getChildByName("com_BetButton").active = false;
        this.com_GetBull.active = false;
        this.com_GetBull.getChildByName("bt_GetBull").active = true;
        this.com_GetBull.getChildByName("bt_NotBull").active = true;
        this.com_Timer.active = false;
        this.com_Bill.active = false;
        this.bankerSeatId = -1;
        this.gameState = 0;
        this.canSetBull = false;
        this.sp_BankerFrame.active = false;
        this.an_SetBankerAnimation.active = false;
        this.serverPoint = -1;
        this.coinFly = false;
        this.winResult = [];
        this.com_Tips.getChildByName("sp_Tips01").active = false;
    },

    /**
     * 延时处理
     * @param {*} dt 
     */
    timeCount_Function: function (dt) {
        if (this.currentTime > 0) {
            if (this.timeCount >= 1) {
                this.timeCount = 0;
                this.currentTime--;
                this.com_Timer.getChildByName("lb_Time").getComponent("cc.Label").string = this.currentTime;
                switch (this.gameState) {
                    case this.GS_GAMESTART:
                        if (this.currentTime == 2) {
                            this.an_DBSAnimation.playAnimation("start", 1);
                            if (this.playerInfo.soundEffectControl) {
                                cc.audioEngine.play(this.au_GameStart, false, 1);
                            }
                        }
                        break;
                    case this.GS_SENDCARDS:
                        break;
                    case this.GS_GRABBANKER:
                        break;
                    case this.GS_SELECTBET:
                        break;
                    case this.GS_SETBULL:
                        break;
                    case this.GS_OPENCARD:
                        break;
                    case this.GS_BILLING:
                        break;
                }
            } else {
                this.timeCount += dt;
            }
        } else {
            this.timeRun = false
            switch (this.gameState) {
                case this.GS_GAMESTART:
                    this.com_Timer.active = false;
                    break;
                case this.GS_SENDCARDS:
                    break;
                case this.GS_GRABBANKER:
                    this.com_Button.getChildByName("com_GrabButton").active = false;
                    break;
                case this.GS_SELECTBET:
                    break;
                case this.GS_SETBULL:
                    break;
                case this.GS_OPENCARD:
                    break;
                case this.GS_BILLING:
                    break;
            }
        }
        this.com_Timer.getChildByName("sp_Time").getComponent("cc.Sprite").fillRange = (this.currentTime - this.timeCount) / this.totalTime;
    },
    /**
     * 显示进入本局的玩家
     * @param {*} data 
     */
    playerEnterRoom_Function: function (data) {
        this.playerList.push(data);
        let seatIndex = this.changeSeatId_Function(data.seatId);
        this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("sp_PlayerHead").active = true;
        Helper.loadHead(data.headimgurl, sp => {
            this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("sp_PlayerHead").getComponent("cc.Sprite").spriteFrame = sp;
        });
        this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("lb_PlayerName").getComponent("cc.Label").string = data.nickname;
        this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("lb_PlayerMoney").getComponent("cc.Label").string = (data.score / this.playerInfo.exchangeRate).toFixed(2);
    },

    /**
     * 隐藏离开本局的玩家UI
     * @param {*} seatId 
     * @param {*} userId 
     */
    playerLeaveRoom_Function: function (seatId, userId) {
        var index = 0;
        for (var i = 0; i < this.playerList.length; i++) {
            if (this.playerList[i].userId === userId) {
                index = i;
                break;
            }
        }

        var seatIndex = this.changeSeatId_Function(seatId);
        this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("sp_PlayerHead").active = false;
        this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("lb_PlayerName").getComponent("cc.Label").string = "";
        this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("lb_PlayerMoney").getComponent("cc.Label").string = "";
        this.com_PlayerMessage.getChildByName("com_Player" + seatIndex).getChildByName("sp_Xbet").getComponent("cc.Sprite").spriteFrame = null;
        for (var i = 0; i < 5; i++) {
            this.cardArray[i + 5 * seatIndex].active = false;
        }
        this.pointArray[seatIndex].active = false;
        this.playerList.splice(index, 1);
        this.sp_BankerFrame.active = false;
        this.an_SetBankerAnimation.active = false;
    },

    /**
     * 离开游戏，返回到大厅
     */
    exitGame_Function: function () {
        this.gameExit = true;
        this.netWork.grabBullSocket.disconnect();
        this.netWork.grabBullSocket = null;
        cc.audioEngine.stopAll();
        cc.director.loadScene(window.hallName);
    },

    /**
     * 
     * @param {*} seatId 
     */
    changeSeatId_Function: function (seatId) {
        if (this.netWork.seatId) {
            var index = (5 - this.netWork.seatId + seatId) % 5;
            return index;
        }
        return seatId;
    },

    /**
     * 金币不足，离开房间
     */
    noMoneyOut_Function: function () {
        this.gameExit = true;
        this.com_MessageBox.getChildByName("bt_Confirm").active = true;
        this.com_MessageBox.getChildByName("bt_Reconnect").active = false;
        this.com_MessageBox.active = true;
        this.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "您的金币不足，已被请离房间。";
    },

    /**
     * 断线重连
     */
    disconnectNetWork_Function: function () {
        this.bg_Black.active = true;
        if (this.gameExit) {
            this.netWork.grabBullSocket.disconnect();
        }
        this.netWork.grabBullSocket = null;
        this.playerInfo.gameDisconnect = true;
        this.com_MessageBox.active = true;
        this.com_MessageBox.getChildByName("bt_Confirm").active = false;
        this.com_MessageBox.getChildByName("bt_Reconnect").active = true;
        this.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "您已断线，请重新连接";
    },

    /**
     * 更新
     * @param {*} dt 
     */
    update: function (dt) {
        if (this.randomBanker) {
            if (this.randomBankerTimer < 1.5) {
                if (this.randomBankerCount < .08) {
                    this.randomBankerCount += dt;
                } else {
                    this.randomBankerCount = 0;
                    this.randomBanker_Function(this.randomBankerArray);
                }
                this.randomBankerTimer += dt;
            } else {
                this.randomBanker = false;
                this.randomBankerTimer = 0;
                this.setBanker_Function();
            }
        }
        if (this.timeRun) {
            this.timeCount_Function(dt);
        }
        if (this.coinFly) {
            this.coinAnimation_Function();
        }
    }
});