/**
 * 斗地主游戏逻辑
 */
cc.Class({
    extends: cc.Component,

    properties: {
        pb_Cards: {
            default: null,
            type: cc.Prefab
        },
        pb_CardNode: {
            default: null,
            type: cc.Node
        },
        btn_RobLandload: {
            default: null,
            type: cc.Node
        },
        otherOneL: {
            default: null,
            type: cc.Node
        },
        otherTwoR: {
            default: null,
            type: cc.Node
        },
        pb_Timer: {
            default: [],
            type: cc.Node
        },
        pb_LandloadsCard: {
            default: [],
            type: cc.Node
        },
        pb_Lower: {
            default: null,
            type: cc.Node
        },
        btn_CallLandload: {
            default: null,
            type: cc.Node
        },
        landloadsCards: {
            default: null,
            type: cc.Node
        },
        bgAudio: {
            default: null,
            type: cc.AudioClip
        },
        allTips: {
            default: [],
            type: cc.Node
        },
        landloadsLogo: {
            default: [],
            type: cc.Node
        },
        btn_OutCard: {
            default: null,
            type: cc.Node
        },
        btn_again: {
            default: null,
            type: cc.Node
        },
        btn_match_again: {
            default: null,
            type: cc.Node
        },
        cardAudio: {
            default: [],
            type: cc.AudioClip
        },
        duiZiAudio: {
            default: [],
            type: cc.AudioClip
        },
        baoJingAudio: {
            default: [],
            type: cc.AudioClip
        },
        buYaoAudio: {
            default: [],
            type: cc.AudioClip
        },
        chuTianAudio: {
            default: null,
            type: cc.AudioClip
        },
        jiaoDiZhuAudio: {
            default: null,
            type: cc.AudioClip
        },
        buJiaoAudio: {
            default: null,
            type: cc.AudioClip
        },
        qiangAudio: {
            default: null,
            type: cc.AudioClip
        },
        buQiangAudio: {
            default: null,
            type: cc.AudioClip
        },
        cardTypeAudio: {
            default: [],
            type: cc.AudioClip
        },
        faPaiAudio: {
            default: null,
            type: cc.AudioClip
        },
        shuYing: {
            default: [],
            type: cc.AudioClip
        },
        sanGeAudio: {
            default: [],
            type: cc.AudioClip
        },
        billMessage: {
            default: [],
            type: cc.Node
        },
        billBg: {
            default: [],
            type: cc.SpriteFrame
        },
        teXiao: {
            default: [],
            type: cc.Prefab
        },
        cardTypeText: {
            default: [],
            type: cc.Prefab
        },
        teXiaoAudio: {
            default: [],
            type: cc.AudioClip
        },
        changeAudio: {
            default: null,
            type: cc.AudioClip
        },
        protagonist: {
            default: null,
            type: cc.Node
        },
        btn_Start: {
            default: null,
            type: cc.Node
        },
        com_MessageBox: {
            default: null,
            type: cc.Node
        },
        bgTu: {
            default: null,
            type: cc.Node
        },
        topSet: {
            default: null,
            type: cc.Node
        },
        paiXing: {
            default: null,
            type: cc.Prefab
        },
        rocket: {
            default: [],
            type: cc.Prefab
        },
        rocketBoom: {
            default: null,
            type: cc.Prefab
        },
        zuoZi: {
            default: null,
            type: cc.Node
        },
        exitReady: {
            default: null,
            type: cc.Node
        },
        exitBtn: {
            default: null,
            type: cc.Node
        },
        exitMatchBtn: {
            default: null,
            type: cc.Node
        },
        firstOutCard: 1,
        distanceCard: 50,
        smallDistanceCard: 40,
        initY: -220,
        movedY: -200,
        finishY: -50,
        peak: 10,
        tipsCount: 0,
        tuoGuan: false,
        gameFinish: true,
        qiangDiZhu: false,
    },
    onLoad() {
        this.allowTips = false;
        //玩家手中的牌
        this.playerCards = [];
        //选中的牌
        this.selectedCard = [];
        this.CardsNum = [];
        this.recycling = [
            [null],
            [null],
            [null]
        ];
        this.otherCardArr = [];
        this.mingPaiArray = [
            [],
            [],
            []
        ];
        this.cardsGroup = [
            [],
            [],
            [],
            [],
            []
        ];
        //提示出的牌
        this.tipsCardsArr = [];
        this.tempPlayerId = null;
        this.chongLian = false;
        this.allPlayerTipsState = [
            [null],
            [null],
            [null]
        ];
        this.btnPlayerState = null;
        this.netWork = null;

        for (var i = 3; i < 16; i++) {
            this.CardsNum.push(i);
        }
        this.CardsNum.splice(this.CardsNum.length - 2, 0, 1, 2);

        this.count = 0;
        this.cardsList = [
            //小王
            {
                val: 14,
                type: 5
            },
            //大王
            {
                val: 15,
                type: 5
            },
            //黑桃A
            {
                val: 1,
                type: 1
            },
            //黑桃2
            {
                val: 2,
                type: 1
            },
            //黑桃3
            {
                val: 3,
                type: 1
            },
            //黑桃4
            {
                val: 4,
                type: 1
            },
            //黑桃5
            {
                val: 5,
                type: 1
            },
            //黑桃
            {
                val: 6,
                type: 1
            },
            //黑桃7
            {
                val: 7,
                type: 1
            },
            //黑桃8
            {
                val: 8,
                type: 1
            },
            //黑桃9
            {
                val: 9,
                type: 1
            },
            //黑桃10
            {
                val: 10,
                type: 1
            },
            //黑桃J
            {
                val: 11,
                type: 1
            },
            //黑桃Q
            {
                val: 12,
                type: 1
            },
            //黑桃K
            {
                val: 13,
                type: 1
            },
            //红桃A
            {
                val: 1,
                type: 2
            },
            //红桃2
            {
                val: 2,
                type: 2
            },
            //红桃3
            {
                val: 3,
                type: 2
            },
            //红桃4
            {
                val: 4,
                type: 2
            },
            //红桃5
            {
                val: 5,
                type: 2
            },
            //红桃
            {
                val: 6,
                type: 2
            },
            //红桃7
            {
                val: 7,
                type: 2
            },
            //红桃8
            {
                val: 8,
                type: 2
            },
            //红桃9
            {
                val: 9,
                type: 2
            },
            //红桃10
            {
                val: 10,
                type: 2
            },
            //红桃J
            {
                val: 11,
                type: 2
            },
            //红桃Q
            {
                val: 12,
                type: 2
            },
            //红桃K
            {
                val: 13,
                type: 2
            },
            //梅花A
            {
                val: 1,
                type: 3
            },
            //梅花2
            {
                val: 2,
                type: 3
            },
            //梅花3
            {
                val: 3,
                type: 3
            },
            //梅花4
            {
                val: 4,
                type: 3
            },
            //梅花5
            {
                val: 5,
                type: 3
            },
            //梅花
            {
                val: 6,
                type: 3
            },
            //梅花7
            {
                val: 7,
                type: 3
            },
            //梅花8
            {
                val: 8,
                type: 3
            },
            //梅花9
            {
                val: 9,
                type: 3
            },
            //梅花10
            {
                val: 10,
                type: 3
            },
            //梅花J
            {
                val: 11,
                type: 3
            },
            //梅花Q
            {
                val: 12,
                type: 3
            },
            //梅花K
            {
                val: 13,
                type: 3
            },
            //方片A
            {
                val: 1,
                type: 4
            },
            //方片2
            {
                val: 2,
                type: 4
            },
            //方片3
            {
                val: 3,
                type: 4
            },
            //方片4
            {
                val: 4,
                type: 4
            },
            //方片5
            {
                val: 5,
                type: 4
            },
            //方片
            {
                val: 6,
                type: 4
            },
            //方片7
            {
                val: 7,
                type: 4
            },
            //方片8
            {
                val: 8,
                type: 4
            },
            //方片9
            {
                val: 9,
                type: 4
            },
            //方片10
            {
                val: 10,
                type: 4
            },
            //方片J
            {
                val: 11,
                type: 4
            },
            //方片Q
            {
                val: 12,
                type: 4
            },
            //方片K
            {
                val: 13,
                type: 4
            },
        ];

        //排序底牌
        this.cardsArray = this.cardsList.sort(() => {
            return 1 * Math.random() - .5;
        });

        //每人上来发17张牌
        this.cardsArray = [{
                    val: 12,
                    type: 1
                }, {
                    val: 12,
                    type: 3
                }, {
                    val: 12,
                    type: 3
                }, {
                    val: 12,
                    type: 4
                },
                {
                    val: 12,
                    type: 1
                }, {
                    val: 12,
                    type: 2
                }, {
                    val: 12,
                    type: 3
                }, {
                    val: 12,
                    type: 4
                },
                {
                    val: 12,
                    type: 1
                }, {
                    val: 12,
                    type: 2
                }, {
                    val: 12,
                    type: 3
                }, {
                    val: 12,
                    type: 4
                },
                {
                    val: 12,
                    type: 1
                }, {
                    val: 12,
                    type: 2
                }, {
                    val: 12,
                    type: 3
                }, {
                    val: 12,
                    type: 2
                }, {
                    val: 12,
                    type: 1
                }
            ],

            this.cardsArray = this.cardsArray.splice(0, 17);
        this.initUI();
    },

    start() {
        if (!!window.reconnectPoint) {
            cc.log('断线重连开始游戏');
            this.btn_Start.active = false;
            this.exitBtn.active = false;
            window.reconnectPoint = false;
            this.netWork.startGameFunction();
            this.gameInit();
            this.allTips[1].getChildByName("dengdai").active = true;
        }

    },

    /**
     * 初始化UI
     */
    initUI() {
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        //if (cc.view.getVisibleSize().width / 1334 < cc.view.getVisibleSize().height / 750) {
        //    this.biLi = cc.view.getVisibleSize().width / 1334;
        //} else {
        //    this.biLi = cc.view.getVisibleSize().height / 750;
        //}

        //if (this.biLi > 1) {
        ////    this.bgTu.width = cc.view.getVisibleSize().width + 30;
        //    this.bgTu.height = cc.view.getVisibleSize().height + 30;
        //    this.node.scale = 1;
        //    this.biLi = 1;
        //} else {
        //    this.bgTu.width = cc.view.getVisibleSize().width / this.biLi + 30;
        //    this.bgTu.height = cc.view.getVisibleSize().height / this.biLi + 30;
        //    this.node.scale = this.biLi;
        //}
        this.topSet.setPosition(cc.view.getVisibleSize().width / 2 / this.biLi, cc.view.getVisibleSize().height / 2 / this.biLi - this.topSet.height / 2);

        //设置三张底牌位置
        this.landloadsCards.setPosition(-68, cc.view.getVisibleSize().height / 2 / this.biLi - this.landloadsCards.height / 2 * this.landloadsCards.scale - 20);
        this.node.getChildByName("blackFace").setContentSize(cc.view.getVisibleSize().width / this.biLi, cc.view.getVisibleSize().height / this.biLi);
        this.com_MessageBox.getChildByName("blackFace").setContentSize(cc.view.getVisibleSize().width / this.biLi, cc.view.getVisibleSize().height / this.biLi);
        this.node.getChildByName("tuoGuanCancel").getChildByName("smallBlack").setContentSize(cc.view.getVisibleSize().width / this.biLi, this.node.getChildByName("tuoGuanCancel").getChildByName("smallBlack").getContentSize().height);

        cc.view.setResizeCallback(() => {
            if (cc.view.getVisibleSize().width / 1334 < cc.view.getVisibleSize().height / 750) {
                this.biLi = cc.view.getVisibleSize().width / 1334;
            } else {
                this.biLi = cc.view.getVisibleSize().height / 750;
            }
            if (this.biLi > 1) {
                this.bgTu.width = cc.view.getVisibleSize().width + 30;
                this.bgTu.height = cc.view.getVisibleSize().height + 30;
                this.node.scale = 1;
                this.biLi = 1;
            } else {
                this.bgTu.width = cc.view.getVisibleSize().width / this.biLi + 30;
                this.bgTu.height = cc.view.getVisibleSize().height / this.biLi + 30;
                this.node.scale = this.biLi;
            }

            this.topSet.setPosition(cc.view.getVisibleSize().width / 2 / this.biLi, cc.view.getVisibleSize().height / 2 / this.biLi - this.topSet.height / 2);
            //设置三张底牌位置
            this.landloadsCards.setPosition(-68, cc.view.getVisibleSize().height / 2 / this.biLi - this.landloadsCards.height / 2 * this.landloadsCards.scale - 20);
            this.node.getChildByName("blackFace").setContentSize(cc.view.getVisibleSize().width / this.biLi, cc.view.getVisibleSize().height / this.biLi);
            this.com_MessageBox.getChildByName("blackFace").setContentSize(cc.view.getVisibleSize().width / this.biLi, cc.view.getVisibleSize().height / this.biLi);
            this.node.getChildByName("tuoGuanCancel").getChildByName("smallBlack").setContentSize(cc.view.getVisibleSize().width / this.biLi, this.node.getChildByName("tuoGuanCancel").getChildByName("smallBlack").getContentSize().height);
        });
        this.pInfo = require("PlayerInfo").getInstant;
        this.netWork = require("LandNetWork").getInstant;
        this.netWork.setLandlordsObj_Function(this);
        this.pInfo.setGameObj_Function(this);
        Helper.loadHead(this.pInfo.playerHeadId, sp => {
            this.node.getChildByName('player').getComponent("cc.Sprite").spriteFrame = sp;
        });
        this.pb_Lower.getChildByName("gold").getChildByName("integral").getComponent("cc.Label").string = parseFloat(this.pInfo.playerCoin).toFixed(2);
        this.pb_Lower.getChildByName("head").getChildByName("niCheng").getComponent("cc.Label").string = this.pInfo.playerName;
        this.tempPlayersLists = [];
        if (this.pInfo.musicControl) {
            this.bgMusic = cc.audioEngine.play(this.bgAudio, true, 1);
        }
    },

    /**
     * 初始化游戏
     */
    gameInit() {
        this.netWork.disconnected = false;
        this.roomBet = this.netWork.roomBet;
        this.netWork.gameExit = false;
        this.playerId = this.pInfo.playerId;
        //玩家列表
        this.playerArr = [null, this.pInfo.playerId, null];
        //扑克数量
        var cardLength = 54;
        //卡牌对象池
        this.cardsPool = new cc.NodePool("cards");
        for (var i = 0; i < cardLength; i++) {
            var card = cc.instantiate(this.pb_Cards);
            this.cardsPool.put(card);
        }
    },
    /**
     * 重置底分
     * @param {*} score 
     */
    resetDF(score) {
        this.pb_Lower.getChildByName("di").getChildByName("bottomScore").getComponent("cc.Label").string = (score / this.pInfo.exchangeRate).toFixed(2);
    },

    /**
     * 设置玩家信息
     * @param {*} nickname 
     * @param {*} score 
     * @param {*} seatId 
     * @param {*} userId 
     */
    setMySeat(nickname, score, seatId, userId) {
        this.pb_Lower.getChildByName("head").getChildByName("niCheng").getComponent("cc.Label").string = nickname;
        this.pb_Lower.getChildByName("gold").getChildByName("integral").getComponent("cc.Label").string = (score / this.pInfo.exchangeRate).toFixed(2);
    },

    /**
     * 设置卡牌数量
     * @param {*} userId 
     * @param {*} carcd_length 
     */
    setCardLength(userId, carcd_length) {
        for (var i = 0; i < this.playerArr.length; i++) {
            if (this.playerArr[i] == userId) {
                if (i == 0) {
                    this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = carcd_length;
                } else if (i == 2) {
                    this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = carcd_length;
                }
            }
        }
    },
    /**
     * 进入房间  座位号排序
     * @param {*} nickname 
     * @param {*} score 
     * @param {*} seatId 
     * @param {*} userId 
     */
    otherEnterRoom(nickname, score, seatId, userId, usrHead) {
        cc.log('其它玩家进入房间:' + seatId);
        let seat = null;
        if (this.netWork.seatId == 0 && seatId == 1) {
            seat = this.otherTwoR;
            this.playerArr[2] = userId;
        } else if (this.netWork.seatId == 0 && seatId == 2) {
            seat = this.otherOneL;
            this.playerArr[0] = userId;
        } else if (this.netWork.seatId == 1 && seatId == 0) {
            seat = this.otherOneL;
            this.playerArr[0] = userId;
        } else if (this.netWork.seatId == 1 && seatId == 2) {
            seat = this.otherTwoR;
            this.playerArr[2] = userId;
        } else if (this.netWork.seatId == 2 && seatId == 1) {
            seat = this.otherOneL;
            this.playerArr[0] = userId;
        } else if (this.netWork.seatId == 2 && seatId == 0) {
            seat = this.otherTwoR;
            this.playerArr[2] = userId;
        }

        seat.active = true;
        seat.getChildByName("bg_name").getChildByName("Score").getComponent("cc.Label").string = (score / this.pInfo.exchangeRate).toFixed(2);
        seat.getChildByName("bg_name").getChildByName("niCheng").getComponent("cc.Label").string = nickname;
        Helper.loadHead(usrHead, sp => {
            seat.getComponent("cc.Sprite").spriteFrame = sp;
        });
    },

    /**
     * 离开房间
     * @param {*} userId 
     */
    playerOutRoom(userId) {
        for (let i in this.playerArr) {
            if (this.playerArr[i] == userId) {
                if (i == 0) {
                    this.otherOneL.active = false;
                } else if (i == 2) {
                    this.otherTwoR.active = false;
                }
                this.landloadsLogo[i].active = false;
            }
        }
    },

    /**
     * 断开连接
     */
    disconnectNetWork_Function() {
        try {
            this.netWork.LandlordsSocket.disconnect();
        } catch (error) {};
        this.netWork.LandlordsSocket = null;
        this.pInfo.gameDisconnect = true;
        this.com_MessageBox.active = true;
        this.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "您已断线，请重新登录";
    },

    /**
     * 重新连接
     * @param {*} userId 
     * @param {*} double 
     */
    resetLandlords(userId, double) {
        this.qiangDiZhu = false;
        for (var i = 0; i < this.playerArr.length; i++) {
            if (this.playerArr[i] == userId) {
                if (this.netWork.playerId == userId) {
                    this.landloadsLogo[1].active = true;
                    this.tempPlayersLists[1].isLandlord = true;
                    this.pb_Lower.getChildByName("bei").getChildByName("bet").getComponent("cc.Label").string = double;
                } else {
                    this.landloadsLogo[i].active = true;
                    this.tempPlayersLists[i].isLandlord = true;
                    this.pb_Lower.getChildByName("bei").getChildByName("bet").getComponent("cc.Label").string = double / 2;
                }
            }
        }
        for (var i = 0; i < this.tempPlayersLists.length; i++) {
            for (var j = 0; j < this.tempPlayersLists[i].state.length; j++) {
                if (this.tempPlayersLists[i].state[j] != null) {
                    this.tempPlayersLists[i].state[j].active = false;
                }
            }
            this.tempPlayersLists[i].state = [];
        }
    },

    //叫地主
    callLandloads(second) {
        this.btn_CallLandload.active = true;
        this.btnPlayerState = this.btn_CallLandload;
        this.timer(1, second);
    },

    //抢地主
    robLandlord(second, userId) {
        for (let i = 0; i < this.playerArr.length; i++) {
            if (this.playerArr[i] === userId) {
                if (i === 1) {
                    this.btn_RobLandload.active = true;
                    this.btnPlayerState = this.btn_RobLandload;
                }

                //判断是否托管
                if (this.tuoGuan === true) {
                    this.tuoGuanFunction(i);
                } else {
                    this.timer(i, second);
                }
                break;
            }
        }
    },

    /**
     * 公共牌, 三张底牌
     * @param {*} cards 
     */
    publicCard(cards) {
        cc.log("公共牌", cards);
        this.landloadsCards.active = true;
        //对底牌进行对比排序
        cards.sort((cardA, cardB) => {
            var value;
            if (cardA.val == 1) {
                cardA.val += 12.1;
            } else if (cardA.val == 2) {
                cardA.val += 11.2;
            }

            if (cardB.val == 1) {
                cardB.val += 12.1;
            } else if (cardB.val == 2) {
                cardB.val += 11.2;
            }

            if (cardA.val == cardB.val) {
                value = cardB.type - cardA.type;
            } else {
                value = cardB.val - cardA.val;
            }
            return value;
        });
        for (var i = 0; i < this.pb_LandloadsCard.length; i++) {
            if (cards[i].val == 13.1) {
                cards[i].val = 1;
            } else if (cards[i].val == 13.2) {
                cards[i].val = 2;
            }
            this.pb_LandloadsCard[i].getComponent("Cards").cardsCreate(cards[i].val, cards[i].type);
        }
    },

    /**
     * 震屏效果
     */
    shacking() {
        // this.bgTu.stopAllActions();
        // this.zuoZi.stopAllActions();
        // var zuoZiPoint = this.zuoZi.position;
        // var zuoZiAction = cc.sequence(cc.moveTo(.05, cc.v2(zuoZiPoint.x + 15, zuoZiPoint.y + 15)), cc.moveTo(.1, cc.v2(zuoZiPoint.x - 15, zuoZiPoint.y - 15)), cc.moveTo(.05, cc.v2(zuoZiPoint.x + 15, zuoZiPoint.y)), cc.moveTo(.05, cc.v2(zuoZiPoint.x - 15, zuoZiPoint.y)), cc.moveTo(.1, cc.v2(zuoZiPoint.x, zuoZiPoint.y - 15)), cc.moveTo(.05, zuoZiPoint));
        // var bgTuAction = cc.repeat(cc.sequence(cc.moveTo(.05, cc.v2(15, 15)), cc.moveTo(.1, cc.v2(-15, -15)), cc.moveTo(.05, cc.v2(15, 0)), cc.moveTo(.05, cc.v2(-15, 0)), cc.moveTo(.1, cc.v2(0, -15)), cc.moveTo(.05, cc.v2(0, 0))), 1);
        // this.bgTu.runAction(bgTuAction);
        // this.zuoZi.runAction(zuoZiAction);
    },

    checkLandlords(e, t, i) {
        this.landloadsCards.active = true,
            this.qiangDiZhu = false,
            this.tempPlayerId = null,
            t.sort(function (e, t) {
                return 1 == e.val ? e.val += 12.1 : 2 == e.val && (e.val += 11.2),
                    1 == t.val ? t.val += 12.1 : 2 == t.val && (t.val += 11.2),
                    e.val == t.val ? t.type - e.type : t.val - e.val
            });
        for (var n = 0; n < this.pb_LandloadsCard.length; n++) 13.1 == t[n].val ? t[n].val = 1 : 13.2 == t[n].val && (t[n].val = 2),
            this.pb_LandloadsCard[n].getComponent("Cards").cardsCreate(t[n].val, t[n].type);
        if (e == this.netWork.playerId) {
            this.landloadsLogo[1].active = true,
                this.tempPlayersLists[1].isLandlord = true,
                this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 17,
                this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 17;
            for (var n = 0; n < t.length; n++) {
                var o;
                o = this.cardsPool.size() > 0 ? this.cardsPool.get() : cc.instantiate(this.pb_Cards),
                    o.scale = 1.2,
                    this.pb_CardNode.addChild(o, 1),
                    o.getComponent("Cards").cardsCreate(t[n].val, t[n].type),
                    this.playerCards.push(o)
            }
            this.playerCards.sort(function (e, t) {
                return e.getComponent("Cards").val == t.getComponent("Cards").val ? t.getComponent("Cards").type - e.getComponent("Cards").type : t.getComponent("Cards").val - e.getComponent("Cards").val
            });
            for (var n = 0,
                    a = null,
                    s = null,
                    c = null; n < this.playerCards.length; n++)
                if (this.playerCards[n].getComponent("Cards").val > 13) a = n;
                else if (2 == this.playerCards[n].getComponent("Cards").val || 1 == this.playerCards[n].getComponent("Cards").val) {
                s = n;
                break
            }
            if (null == a && null != s) {
                c = this.playerCards.splice(n, this.playerCards.length - 1);
                for (var r = 0; r < c.length; r++) this.playerCards.splice(r, 0, c[r])
            } else if (null != a && null != s) {
                c = this.playerCards.splice(n, this.playerCards.length - 1);
                for (var r = 0; r < c.length; r++) this.playerCards.splice(a + r + 1, 0, c[r])
            }
            this.pb_Lower.getChildByName("bei").getChildByName("bet").getComponent("cc.Label").string = i,
                this.resetCardLocat(),
                this.firstOutCard = 0,
                this.count = 2
        } else {
            for (var n = 0; n < this.playerArr.length; n++) this.playerArr[n] == e && 0 == n ? (this.landloadsLogo[n].active = true, this.tempPlayersLists[n].isLandlord = true, this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 20, this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 17) : this.playerArr[n] == e && 2 == n && (this.landloadsLogo[n].active = true, this.tempPlayersLists[n].isLandlord = true, this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 17, this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 20);
            this.pb_Lower.getChildByName("bei").getChildByName("bet").getComponent("cc.Label").string = i / 2
        }
        this.scheduleOnce(function () {
                cc.log("检测地主");
                for (var e = 0; e < this.tempPlayersLists.length; e++) {
                    for (var t = 0; t < this.tempPlayersLists[e].state.length; t++) null != this.tempPlayersLists[e].state[t] && (this.tempPlayersLists[e].state[t].active = false);
                    this.tempPlayersLists[e].state = []
                }
            },
            1)
    },
    playerNowState(e, t, i, n) {
        cc.log("玩家状态", e, t),
            this.cancelTimer(),
            null != n && this.landloadsLogo[1].active == true ? this.pb_Lower.getChildByName("bei").getChildByName("bet").getComponent("cc.Label").string = n : null != n && this.landloadsLogo[1].active == false && (this.pb_Lower.getChildByName("bei").getChildByName("bet").getComponent("cc.Label").string = n / 2);
        for (var o = -1,
                a = 0; a < this.playerArr.length; a++)
            if (this.playerArr[a] == e) {
                o = a;
                break
            }
        switch (1 == o && null != this.btnPlayerState && (this.btnPlayerState.active = false), t) {
            case "叫地主":
                this.allTips[o].getChildByName("Call-the-landlord").active = true,
                    this.pInfo.soundEffectControl && cc.audioEngine.play(this.jiaoDiZhuAudio, false, 1),
                    this.allPlayerTipsState[o] = this.allTips[o].getChildByName("Call-the-landlord");
                break;
            case "不叫":
                this.allTips[o].getChildByName("Don't-call").active = true,
                    this.pInfo.soundEffectControl && cc.audioEngine.play(this.buJiaoAudio, false, 1),
                    this.allPlayerTipsState[o] = this.allTips[o].getChildByName("Don't-call");
                break;
            case "不抢":
                this.allTips[o].getChildByName("Don't-grab").active = true,
                    this.pInfo.soundEffectControl && cc.audioEngine.play(this.buQiangAudio, false, 1),
                    this.allPlayerTipsState[o] = this.allTips[o].getChildByName("Don't-grab");
                break;
            case "不加倍":
                this.allTips[o].getChildByName("No-doubling").active = true,
                    this.allPlayerTipsState[o] = this.allTips[o].getChildByName("No-doubling");
                break;
            case "不出":
                if (this.allTips[o].getChildByName("No").active = true, this.pInfo.soundEffectControl && cc.audioEngine.play(this.buYaoAudio[Math.floor(3 * Math.random())], false, 1), 1 == o) {
                    for (var a = 0; a < this.playerCards.length; a++) this.playerCards[a].position.y == this.movedY && this.playerCards[a].getComponent("Cards").moveCard();
                    this.selectedCard = [],
                        this.count = 0
                }
                this.allPlayerTipsState[o] = this.allTips[o].getChildByName("No");
                break;
            case "抢地主":
                this.allTips[o].getChildByName("Rob-landlords").active = true,
                    this.pInfo.soundEffectControl && cc.audioEngine.play(this.qiangAudio, false, 1),
                    this.allPlayerTipsState[o] = this.allTips[o].getChildByName("Rob-landlords");
                break;
            case "加倍":
                this.allTips[o].getChildByName("double").active = true,
                    this.allPlayerTipsState[o] = this.allTips[o].getChildByName("double");
                break;
            case "单牌":
                this.pInfo.soundEffectControl && cc.audioEngine.play(this.cardAudio[i[0].val - 1], false, 1);
                break;
            case "对子":
                this.pInfo.soundEffectControl && cc.audioEngine.play(this.duiZiAudio[i[0].val - 1], false, 1);
                break;
            case "顺子":
                this.pInfo.soundEffectControl && cc.audioEngine.play(this.cardTypeAudio[4], false, 1);
                var s = cc.instantiate(this.paiXing);
                this.pb_CardNode.addChild(s, 101),
                    this.recycling[o].length < this.peak ? s.setPosition((this.recycling[o][0].position.x + this.recycling[o][this.recycling[o].length - 1].position.x + this.recycling[o][0].width * this.recycling[o][0].scale) / 2, this.recycling[o][0].position.y) : s.setPosition((this.recycling[o][0].position.x + this.recycling[o][this.peak].position.x + this.recycling[o][0].width * this.recycling[o][0].scale) / 2, this.recycling[o][0].position.y),
                    s.getComponent("dragonBones.ArmatureDisplay").armature().animation.play("shunzi", 1),
                    this.scheduleOnce(() => {
                            s.destroy()
                        },
                        1);
                break;
            case "三顺":
                this.pInfo.soundEffectControl && (cc.audioEngine.play(this.cardTypeAudio[0], false, 1), cc.audioEngine.play(this.teXiaoAudio[1], false, 1));
                var c = cc.instantiate(this.cardTypeText[0]);
                this.pb_CardNode.addChild(c, 101),
                    c.setPosition(cc.v2(0, 0)),
                    this.scheduleOnce(function () {
                            var e = cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
                                    c.destroy()
                                },
                                this));
                            c.runAction(e)
                        },
                        1);
                var r = cc.instantiate(this.teXiao[0]);
                this.pb_CardNode.addChild(r, 100),
                    r.setPosition(cc.v2(867 / this.biLi, 0));
                var l = cc.sequence(cc.moveTo(1, cc.v2(-867 / this.biLi, 0)), cc.callFunc(function () {
                        r.destroy()
                    },
                    this));
                r.runAction(l);
                break;
            case "连对":
                this.pInfo.soundEffectControl && (cc.audioEngine.play(this.cardTypeAudio[1], false, 1), cc.audioEngine.play(this.changeAudio, false, 1));
                var s = cc.instantiate(this.paiXing);
                this.pb_CardNode.addChild(s, 101),
                    this.recycling[o].length < this.peak ? s.setPosition((this.recycling[o][0].position.x + this.recycling[o][this.recycling[o].length - 1].position.x + this.recycling[o][0].width * this.recycling[o][0].scale) / 2, this.recycling[o][0].position.y) : s.setPosition((this.recycling[o][0].position.x + this.recycling[o][this.peak].position.x + this.recycling[o][0].width * this.recycling[o][0].scale) / 2, this.recycling[o][0].position.y),
                    s.getComponent("dragonBones.ArmatureDisplay").armature().animation.play("liandui", 1),
                    this.scheduleOnce(function () {
                            s.destroy()
                        },
                        1);
                break;
            case "三条":
                this.pInfo.soundEffectControl && cc.audioEngine.play(this.sanGeAudio[i[0].val - 1], false, 1);
                break;
            case "三带一":
                this.pInfo.soundEffectControl && cc.audioEngine.play(this.cardTypeAudio[3], false, 1);
                break;
            case "三带二":
                this.pInfo.soundEffectControl && cc.audioEngine.play(this.cardTypeAudio[2], false, 1);
                break;
            case "四带二":
                this.pInfo.soundEffectControl && (6 == i.length ? cc.audioEngine.play(this.cardTypeAudio[5], false, 1) : 8 == i.length && cc.audioEngine.play(this.cardTypeAudio[6], false, 1));
                break;
            case "飞机":
                this.pInfo.soundEffectControl && (cc.audioEngine.play(this.cardTypeAudio[0], false, 1), cc.audioEngine.play(this.teXiaoAudio[1], false, 1));
                var c = cc.instantiate(this.cardTypeText[0]);
                this.pb_CardNode.addChild(c, 101),
                    c.setPosition(cc.v2(0, 0)),
                    this.scheduleOnce(function () {
                            var e = cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
                                    c.destroy()
                                },
                                this));
                            c.runAction(e)
                        },
                        1);
                var r = cc.instantiate(this.teXiao[0]);
                this.pb_CardNode.addChild(r, 100),
                    r.setPosition(cc.v2(867 / this.biLi, 0));
                var l = cc.sequence(cc.moveTo(1, cc.v2(-867 / this.biLi, 0)), cc.callFunc(function () {
                        r.destroy()
                    },
                    this));
                r.runAction(l);
                break;
            case "炸弹":
                if (0 == o) var h = this.otherOneL.position,
                    d = [h, cc.v2(h.x / 2, h.y + 150), cc.v2(0, 0)];
                else if (1 == o) var h = this.protagonist.position,
                    d = [h, cc.v2(h.x / 2, h.y + 350), cc.v2(0, 0)];
                else if (2 == o) var h = this.otherTwoR.position,
                    d = [h, cc.v2(h.x / 2, h.y + 150), cc.v2(0, 0)];
                this.pInfo.soundEffectControl && cc.audioEngine.play(this.cardTypeAudio[8], false, 1);
                var c = cc.instantiate(this.cardTypeText[3]);
                this.pb_CardNode.addChild(c, 101),
                    c.setPosition(cc.v2(0, 0));
                var r = cc.instantiate(this.teXiao[3]);
                this.pb_CardNode.addChild(r, 100),
                    r.setPosition(h);
                var u = cc.spawn(cc.rotateTo(.5, 180), cc.cardinalSplineTo(.5, d, -.5));
                r.runAction(u);
                var m = null;
                this.scheduleOnce(function () {
                            r.destroy(),
                                this.pInfo.soundEffectControl && cc.audioEngine.play(this.teXiaoAudio[0], false, 1),
                                m = cc.instantiate(this.teXiao[1]),
                                this.pb_CardNode.addChild(m, 100),
                                m.setPosition(cc.v2(0, 0));
                            var e = cc.sequence(cc.scaleTo(.2, 1.2, 1.2), cc.scaleTo(.2, 1, 1), cc.delayTime(1), cc.fadeOut(.1), cc.callFunc(function () {
                                    c.destroy()
                                },
                                this));
                            c.runAction(e),
                                this.shacking()
                        },
                        .5),
                    this.scheduleOnce(function () {
                            m.destroy()
                        },
                        1.1);
                break;
            case "王炸":
                this.pInfo.soundEffectControl && cc.audioEngine.play(this.cardTypeAudio[7], false, 1);
                var r = cc.instantiate(this.teXiao[2]),
                    g = cc.v2((this.recycling[o][0].position.x + this.recycling[o][this.recycling[o].length - 1].position.x) / 2, this.recycling[o][0].position.y);
                this.pb_CardNode.addChild(r, 100),
                    r.setPosition(g),
                    this.scheduleOnce(function () {
                            r.destroy()
                        },
                        .4);
                var p = cc.sequence(cc.moveTo(.4, cc.v2(0, 735 / this.biLi)), cc.rotateTo(0, 180), cc.moveTo(.2, cc.v2(0, 0)), cc.callFunc(function () {
                            var e = cc.instantiate(this.rocketBoom);
                            this.pb_CardNode.addChild(e, 100),
                                e.setPosition(cc.v2(0, 0));
                            var t = cc.sequence(cc.spawn(cc.scaleTo(.5, 3), cc.fadeOut(.5)), cc.callFunc(function () {
                                    e.destroy()
                                },
                                this));
                            e.runAction(t),
                                this.pInfo.soundEffectControl && cc.audioEngine.play(this.teXiaoAudio[0], false, 1);
                            var i = cc.instantiate(this.cardTypeText[4]);
                            this.pb_CardNode.addChild(i, 101),
                                i.setPosition(cc.v2(0, 0)),
                                this.scheduleOnce(function () {
                                        var e = cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
                                                i.destroy()
                                            },
                                            this));
                                        i.runAction(e)
                                    },
                                    1),
                                this.shacking(),
                                y.destroy()
                        },
                        this)),
                    y = cc.instantiate(this.rocket);
                this.pb_CardNode.addChild(y, 100),
                    y.setPosition(g.x, g.y + 150),
                    y.runAction(p);
                break;
            default:
                this.allPlayerTipsState[o] = [null]
        }
        this.tempPlayersLists[o].state.push(this.allPlayerTipsState[o])
    },

    /**
     * 春天动画
     */
    chunTianAnimation() {
        this.node.getChildByName("chunTian").active = true;
        this.node.getChildByName("chunTian").getComponent("dragonBones.ArmatureDisplay").armature().animation.play("chuntian", 1);
        this.scheduleOnce(function () {
            this.node.getChildByName("chunTian").active = false;
        }, 2);
    },

    /**
     * 发牌,并进行排序
     * @param {*} cards 
     * @param {*} isLicensing 
     */
    cardsSorting(cards, isLicensing) {
        this.finishGame(),
            this.allTips[1].getChildByName("dengdai").active = false,
            this.tempPlayerList(),
            this.cardsArray = cards,
            this.cardsArray.sort(function (e, t) {
                return e.val === t.val ? t.type - e.type : t.val - e.val
            });
        for (var i = 0,
                n = null,
                o = null,
                a = null; i < this.cardsArray.length; i++)
            if (this.cardsArray[i].val > 13) n = i;
            else if (2 === this.cardsArray[i].val || 1 === this.cardsArray[i].val) {
            o = i;
            break
        }
        if (null === n && null !== o) {
            a = this.cardsArray.splice(i, this.cardsArray.length - 1);
            for (var s = 0; s < a.length; s++) this.cardsArray.splice(s, 0, a[s])
        } else if (null !== n && null !== o) {
            a = this.cardsArray.splice(i, this.cardsArray.length - 1);
            for (var s = 0; s < a.length; s++) this.cardsArray.splice(n + s + 1, 0, a[s])
        }
        if (isLicensing)
            for (var i = 0; i < cards.length; i++) this.licensing(i, cards[i].val, cards[i].type);
        else this.licensingTimer();
        this.addEventListener(),
            this.count = 2
    },

    /**
     * 临时的玩家列表
     */
    tempPlayerList() {
        var niCheng = null;
        this.tempPlayersLists = [];
        for (var i = 0; i < this.playerArr.length; i++) {

            if (i == 0) {
                niCheng = this.otherOneL.getChildByName("bg_name").getChildByName("niCheng").getComponent("cc.Label").string;
            } else if (i == 1) {
                niCheng = this.pb_Lower.getChildByName("head").getChildByName("niCheng").getComponent("cc.Label").string;
            } else {
                niCheng = this.otherTwoR.getChildByName("bg_name").getChildByName("niCheng").getComponent("cc.Label").string;
            }
            this.tempPlayersLists[i] = {
                id: this.playerArr[i],
                niCheng: niCheng,
                zhiShengYi: 1,
                zhiShengEr: 1,
                seatId: i,
                outCard: [],
                state: [],
                isLandlord: false
            }
        }

    },
    /**
     * 初始化卡牌数
     */
    licensingTimer() {
        var index = 0;
        this.schedule(function () {
            this.licensing(index, this.cardsArray[index].val, this.cardsArray[index].type);
            this.pInfo.soundEffectControl && cc.audioEngine.play(this.faPaiAudio, false, 1);
            if (this.cardsArray.length - 1 === index) {
                this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 17;
                this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = 17;
            }
            index++;
        }, 0.1, this.cardsArray.length - 1);
    },

    /**
     * 
     * @param {*} index 
     * @param {*} val 
     * @param {*} type 
     */
    licensing(index, val, type) {
        var card;
        if (this.cardsPool.size() > 0) {
            card = this.cardsPool.get();
        } else {
            card = cc.instantiate(this.pb_Cards);
        }
        card.scale = 1.2;
        this.cardWidth = card.getContentSize().width * card.scale;
        this.cardHeight = card.getContentSize().height * card.scale;
        var dWidth = -this.cardWidth / 2 - (this.cardsArray.length - 1) / 2 * this.distanceCard;
        this.pb_CardNode.addChild(card, 50 + index);
        card.setPosition(dWidth + this.distanceCard * index, this.initY);
        card.getComponent("Cards").cardsCreate(val, type);
        this.playerCards.push(card);
    },


    /**
     * 启动计时器
     * @param {*} seatIndex 
     * @param {*} second 
     */
    timer(seatIndex, second) {
        //移除原来的计时器
        this.cancelTimer();
        cc.log("计时器", seatIndex);
        for (var i = 0; i < this.tempPlayersLists[seatIndex].state.length; i++) {
            if (this.tempPlayersLists[seatIndex].state[i]) {
                this.tempPlayersLists[seatIndex].state[i].active = false;
            }
        }

        this.tempPlayersLists[seatIndex].state = [];
        this.removeCards(seatIndex);
        this.pb_Timer[seatIndex].active = true;

        if (second) {
            this.pb_Timer[seatIndex].getComponent("timer").num = second;
            this.pb_Timer[seatIndex].getComponent("timer").count = 0;
        }
        this.pb_Timer[seatIndex].getComponent("timer").startTimer();
    },

    /**
     * 移除计时器
     */
    cancelTimer() {
        for (var i = 0; i < this.pb_Timer.length; i++) {
            if (this.pb_Timer[i].active === true) {
                this.pb_Timer[i].getComponent("timer").cancelTimer();
                this.pb_Timer[i].active = false;
                break;
            }
        }
    },


    rules(e) {
        var t = this.cardType(this.primaryCard);
        if (0 == e.length) return t.type > -1;
        var i = this.cardType(e);
        return 1 == t.max ? t.max += 12.1 : 2 == t.max && (t.max += 11.2),
            1 == i.max ? i.max += 12.1 : 2 == i.max && (i.max += 11.2),
            8 == t.type && i.type < 8 || (9 == t.type || t.length == i.length && t.type == i.type && t.max > i.max)
    },
    /**
     * 获得牌型
     */
    cardType(cards) {
        var count;
        var type = -1;
        var max = 0;
        var cardList = [];
        if (cards.length > 0) {
            //单牌
            cardList[0] = this.checkOneCard(cards);
            //对子
            cardList[1] = this.checkDuiZi(cards);
            //顺子
            cardList[2] = this.checkShunZi(cards);
            //三顺
            cardList[3] = this.checkSanOrShun(cards);
            //四带二
            cardList[4] = this.checkSiTakeTwo(cards);
            //四带两对
            cardList[5] = this.checkSiTakeTwoShuang(cards);
            //飞机
            cardList[6] = this.checkSanOrPlane(cards);
            //连队
            cardList[7] = this.checkSanShuangOrPlane(cards);
            //炸弹
            cardList[8] = this.checkSi(cards);
            //王炸
            cardList[9] = this.kingBoom(cards);
            for (var i = 0; i < cardList.length; i++) {
                if (cardList[i].num) {
                    type = i;
                    max = cardList[i].max;
                    count = cards.length;
                }
            }
        }
        return {
            type: type,
            max: max,
            length: count
        }
    },

    /**
     * 选择卡牌
     * @param {*} ar 
     */
    selectCards(ar) {
        // console.log('1111111', this.startLocat.x, ar.x, this.playerCards.length);
        if (this.startLocat.x >= ar.x) {
            for (var t = 0; t < this.playerCards.length; t++) {
                if (t == this.playerCards.length - 1) {
                    if (ar.x > this.playerCards[t].position.x + this.cardWidth || this.startLocat.x < this.playerCards[t].position.x || this.startLocat.y > this.playerCards[t].position.y + this.cardHeight / 2 || ar.y < this.playerCards[t].position.y - this.cardHeight / 2) {
                        this.playerCards[t].getComponent("Cards").changeBai();
                    } else {
                        this.playerCards[t].getComponent("Cards").changeHui();
                    }
                } else {
                    if (ar.x > this.playerCards[t].position.x + this.distanceCard || this.startLocat.x < this.playerCards[t].position.x || this.startLocat.y > this.playerCards[t].position.y + this.cardHeight / 2 || ar.y < this.playerCards[t].position.y - this.cardHeight / 2) {
                        this.playerCards[t].getComponent("Cards").changeBai();
                    } else {
                        this.playerCards[t].getComponent("Cards").changeHui();
                    }
                }
            }
        } else {
            for (var t = 0; t < this.playerCards.length; t++) {
                if (t == this.playerCards.length - 1) {
                    if (this.startLocat.x > this.playerCards[t].position.x + this.cardWidth || ar.x < this.playerCards[t].position.x || this.startLocat.y > this.playerCards[t].position.y + this.cardHeight / 2 || ar.y < this.playerCards[t].position.y - this.cardHeight / 2) {
                        this.playerCards[t].getComponent("Cards").changeBai();
                    } else {
                        this.playerCards[t].getComponent("Cards").changeHui();
                    }
                } else {
                    if (this.startLocat.x > this.playerCards[t].position.x + this.distanceCard || ar.x < this.playerCards[t].position.x || this.startLocat.y > this.playerCards[t].position.y + this.cardHeight / 2 || ar.y < this.playerCards[t].position.y - this.cardHeight / 2) {
                        this.playerCards[t].getComponent("Cards").changeBai();
                    } else {
                        this.playerCards[t].getComponent("Cards").changeHui();
                    }
                }
            }
        }
    },
    outCard() {
        this.selectedCard = [];
        this.primaryNum();
        for (var e = 0; e < this.playerCards.length; e++) this.playerCards[e].position.y == this.movedY && this.selectedCard.push(this.playerCards[e]);
        if (this.selectedCard.length <= 0) {
            this.notConformRules();
            this.btn_OutCard.active = true;
            // this.timer(1, null);
            this.btnPlayerState = this.btn_OutCard;
            return;
        }
        for (var t = [], e = 0; e < this.selectedCard.length; e++) t.push({
            val: this.selectedCard[e].getComponent("Cards").val,
            type: this.selectedCard[e].getComponent("Cards").type
        });
        try {
            this.netWork.LandlordsSocket.emit("sendCardsArr", {
                    array: t,
                    userId: this.pInfo.playerId,
                    tableId: this.netWork.tableId,
                    seatId: this.netWork.seatId
                }),
                cc.log("emit", t, this.pInfo.playerId, this.netWork.tableId, this.netWork.seatId)
        } catch (i) {}
    },
    identifyCards() {
        this.btn_OutCard.active = false;
        for (var e = 0; e < this.playerCards.length; e++)
            for (var t = 0; t < this.selectedCard.length; t++)
                if (this.playerCards[e] == this.selectedCard[t]) {
                    this.playerCards.splice(e, 1),
                        e--;
                    break
                }
        var i = null,
            n = null;
        if (this.selectedCard.length % 2 == 0) {
            n = this.selectedCard.length / 2;
            for (var e = 0; e < this.selectedCard.length; e++) this.selectedCard[e].scale = .8,
                i = -n * this.smallDistanceCard + e * this.smallDistanceCard - this.selectedCard[e].getContentSize().width * this.selectedCard[e].scale / 2 + this.smallDistanceCard / 2,
                this.selectedCard[e].setPosition(cc.v2(i, this.finishY)),
                this.selectedCard[e].zIndex = 0,
                this.selectedCard[e].color = new cc.Color(255, 255, 255)
        } else {
            n = (this.selectedCard.length - 1) / 2;
            for (var e = 0; e < this.selectedCard.length; e++) this.selectedCard[e].scale = .8,
                i = -n * this.smallDistanceCard + e * this.smallDistanceCard - this.selectedCard[e].getContentSize().width * this.selectedCard[e].scale / 2,
                this.selectedCard[e].setPosition(cc.v2(i, this.finishY)),
                this.selectedCard[e].zIndex = 0,
                this.selectedCard[e].color = new cc.Color(255, 255, 255)
        }
        this.btn_OutCard.getChildByName("btn_buchu").getComponent("cc.Button").interactable == false && (this.btn_OutCard.getChildByName("btn_buchu").getComponent("cc.Button").interactable = true),
            this.selectedCard.length > 0 && this.resetCardLocat(),
            this.otherCardArr = [],
            this.tipsCardsArr = [],
            this.tipsCount = 0,
            this.count = 0
    },
    /**
     * 不符合规则
     */
    notConformRules() {
        this.allTips[1].getChildByName("Prompt1").active = true;
        this.allTips[1].getChildByName("Prompt1").getComponent("cc.Animation").play();
    },

    /**
     * 到自己出牌 显示出牌按钮
     * @param {*} userId 
     * @param {*} second 
     */
    playState(userId, second) {
        this.cancelTimer();
        for (let i = 0; i < this.playerArr.length; i++) {
            if (this.playerArr[i] == userId) {
                if (this.netWork.playerId == userId) {
                    //是否托管
                    if (this.tuoGuan == false) {
                        this.btn_OutCard.active = true;
                        this.btnPlayerState = this.btn_OutCard;
                        this.timer(i, second);
                        if (this.count >= 2 || this.firstOutCard == 0) {
                            this.btn_OutCard.getChildByName("btn_buchu").getComponent("cc.Button").interactable = false;
                            this.firstOutCard++;
                        }
                    } else {
                        this.tuoGuanFunction(i);
                    }
                } else {
                    this.timer(i, second);
                }
            }
        }
    },

    /**
     * 托管
     * @param {*} index 
     */
    tuoGuanFunction(index) {
        // this.scheduleOnce(() => {
        if (this.qiangDiZhu && (this.pb_Timer[1].active == true || index == 1)) {
            try {
                this.netWork.LandlordsSocket.emit("qiang", {
                    tableId: this.netWork.tableId,
                    seatId: this.netWork.seatId,
                    playerId: this.netWork.playerId,
                    qiang: 0
                })
            } catch (error) {};
            for (var i = 0; i < this.tempPlayersLists[1].state.length; i++) {
                if (this.tempPlayersLists[1].state[i] != null) {
                    this.tempPlayersLists[1].state[i].active = false;
                }
            }
            this.tempPlayersLists[1].state = [];
            return;
        }
        if (!this.gameFinish && (index == 1 || this.pb_Timer[1].active == true)) {
            for (var i = 0; i < this.tempPlayersLists[1].state.length; i++) {
                if (this.tempPlayersLists[1].state[i] != null) {
                    this.tempPlayersLists[1].state[i].active = false;
                }
            }
            this.tempPlayersLists[1].state = [];
            this.removeCards(1);
            this.tmpTuoguan = true;
            this.scheduleOnce(() => {
                this.tipsClick();
            }, 1);

        }
        // }, 1);
    },

    /**
     * 托管状态
     * @param {*} reslut 
     * @param {*} userId 
     */
    tuoGuanState(reslut, userId) {
        var index = -1;
        for (var i = 0; i < this.playerArr.length; i++) {
            if (this.playerArr[i] == userId) {
                index = i;
                break;
            }
        }
        if (index == 0) {
            this.otherOneL.getChildByName("tuoGuan").active = reslut;
        } else if (index == 2) {
            this.otherTwoR.getChildByName("tuoGuan").active = reslut;
        }
    },

    /**
     * 
     */
    resetCardLocat() {
        var size = -this.cardWidth / 2 - (this.playerCards.length - 1) / 2 * this.distanceCard;
        for (var i = 0; i < this.playerCards.length; i++) {
            this.playerCards[i].setPosition(cc.v2(size + this.distanceCard * i, this.initY));
            this.playerCards[i].zIndex = i + 50;
            this.playerCards[i].getComponent("Cards").handCard = true;
        }
        this.recycling[1] = this.selectedCard;
        this.selectedCard = [];
    },

    /**
     * 
     */
    primaryNum() {
        this.primaryCard = [];
        for (var e = 0; e < this.playerCards.length; e++) {
            if (this.playerCards[e].position.y == this.movedY) {
                this.primaryCard.push({
                    val: this.playerCards[e].getComponent("Cards").val
                });
            }
        }
    },

    /**
     * 检测单牌
     * @param {*} cards 
     */
    checkOneCard(cards) {
        var value = {};
        value.max = 0;
        value.num = 0;
        if (cards.length === 1) {
            value.max = cards[0].val;
            value.num = 1;
        }
        return value;
    },

    /**
     * 检测对子
     * @param {*} cards 
     */
    checkDuiZi(cards) {

        var value = {};
        value.max = cards[0].val;
        value.num = 0;

        //计算偶数
        if (cards.length % 2 === 0) {
            if (cards.length == 2) {
                if (cards[0].val == cards[1].val) {
                    return {
                        max: cards[0].val,
                        num: 1
                    }
                }
            } else if (cards.length > 5) {
                if (this.checkSi(cards).num != 0) {
                    return {
                        max: cards[0].val,
                        num: 0
                    };
                }
                var isCan, isEqual;
                var size = cards.length / 2;
                for (var eq = 0; eq < size; eq++) {
                    if (cards[2 * eq].val != cards[2 * eq + 1].val) {
                        isEqual = false;
                        break;
                    }
                    isEqual = true;
                    if ((eq + 1) * 2 < cards.length) {
                        if (cards[2 * eq].val == 1 && cards[2 * (eq + 1)].val == 13) {
                            isCan = true;
                        } else {
                            if (2 === cards[2 * eq].val) {
                                isCan = false;
                                break;
                            }
                            if (cards[2 * eq].val - cards[2 * (eq + 1)].val != 1) {
                                isCan = false;
                                break;
                            }
                            isCan = true;
                        }
                    }
                }
                if (isEqual && isCan) {
                    value.max = cards[0].val;
                    value.num = size;
                }
            }
        }
        return value;
    },

    /**
     * 检测顺子
     * @param {*} cards 
     */
    checkShunZi(cards) {
        var isCan;
        var value = {};
        value.max = cards[0].val;
        value.num = 0;
        //长度大于4
        if (cards.length > 4) {
            for (var i = 0; i < cards.length - 1; i++) {
                if (cards[i].val == 1 && cards[i + 1].val == 13) {
                    isCan = true;
                } else {
                    if (cards[i].val == 2) {
                        isCan = false;
                        break
                    }
                    if (cards[i].val - cards[i + 1].val != 1) {
                        isCan = false;
                        break
                    }
                    isCan = true;
                }
            }
            if (isCan) {
                value.max = cards[0].val;
                value.num = cards.length;
            }
        }
        return value;
    },

    /**
     * 检测三顺
     * @param {*} cards 
     */
    checkSanOrShun(cards) {
        var isCan, isEqual;
        var value = {};
        value.max = cards[0].val;
        value.num = 0;
        if (cards.length % 3 == 0) {
            var size = cards.length / 3;
            if (size == 1) {
                isEqual = true;
                for (var i = 0; i < cards.length - 1; i++) {
                    if (cards[i].val !== cards[i + 1].val) {
                        isCan = false;
                        break;
                    }
                    isCan = true;
                }
            } else {
                for (var i = 0; i < size; i++) {
                    for (var j = 0; j < 2; j++) {
                        if (3 * (i + 1) < cards.length) {
                            if (cards[3 * i].val - cards[3 * (i + 1)].val != 1 && (cards[3 * i].val != 1 || cards[3 * (i + 1)].val != 13)) {
                                isEqual = false;
                                break;
                            }
                            isEqual = true;
                        }
                        if (cards[3 * i + j].val != cards[3 * i + j + 1].val || cards[3 * i + j].val == 2) {
                            isCan = false;
                            break;
                        }
                        isCan = true;
                    }
                }
            }
            if (isCan && isEqual) {
                value.max = cards[0].val;
                value.num = size;
            }
        }
        return value;
    },

    /**
     * 检测炸弹
     * @param {*} cards 
     */
    checkSi(cards) {
        var isEqual = false;
        var value = {};
        value.max = cards[0].val;
        value.num = 0;
        //判断长度为4
        if (cards.length === 4) {
            for (var i = 0; i < cards.length - 1; i++) {
                //判断是否相同
                if (cards[i].val == cards[i + 1].val) {
                    isEqual = true;
                } else {
                    isEqual = false;
                }
            }
            if (isEqual) {
                value.max = cards[0].val;
                value.num = 1;
            }
        }
        return value;
    },

    /**
     * 检测四带二
     * @param {*} cards 
     */
    checkSiTakeTwo(cards) {
        var temp;
        var value = {};
        value.max = cards[0].val;
        value.num = 0;

        if (cards.length === 6) {
            for (var i = 0; i < 3; i++) {
                temp = [];
                for (var k = 0; k < cards.length; k++) {
                    temp.push(cards[k]);
                }
                temp.splice(0, i);
                temp.splice(temp.length - (2 - i), 2 - i);
                if (this.checkSi(temp).num === 1) {
                    value.max = temp[0].val;
                    value.num = 1;
                }
            }
        }
        return value;
    },

    /**
     * 检测四带两对
     */
    checkSiTakeTwoShuang(cards) {
        var cardList, tempList, index, size = 2;
        var value = {};
        value.max = cards[0].val;
        value.num = 0;

        //判断长度等于8
        if (cards.length == 8) {
            for (var i = 0; i < 3; i++) {
                cardList = [];
                tempList = [];
                index = 0;
                for (var j = 0; j < cards.length; j++) {
                    cardList.push(cards[j]);
                }
                var oneCard = cardList.slice(0, 2 * i);
                var twoCard = cardList.slice(cardList.length - 2 * size + 2 * i, cardList.length);
                cardList.splice(0, 2 * i);
                cardList.splice(cardList.length - 2 * size + 2 * i, 2 * size - 2 * i);
                for (var j = 0; j < oneCard.length / 2; j++) {
                    tempList.push([oneCard[2 * j], oneCard[2 * j + 1]]);
                }
                for (var j = 0; j < twoCard.length / 2; j++) {
                    tempList.push([twoCard[2 * j], twoCard[2 * j + 1]]);
                }
                for (var j = 0; j < tempList.length; j++) {
                    if (this.checkDuiZi(tempList[j]).num == 1) {
                        index++;
                        if (index == size && this.checkSi(cardList).num == 1) {
                            value.max = cardList[0].val;
                            value.num = 1;
                        }
                    }
                }
            }
        }
        return value;
    },

    /**
     * 检测飞机
     */
    checkSanOrPlane(cards) {
        var size;
        var value = {};
        value.max = cards[0].val;
        value.num = 0;

        if (cards.length % 4 == 0) {
            size = cards.length / 4;
            var tempList;
            for (var i = 0; i <= size; i++) {
                if (this.checkSi(cards.slice(i, i + 4)).num) {
                    value.max = cards[0].val;
                    value.num = 0;
                }
                tempList = [];
                for (var k = 0; k < cards.length; k++) {
                    if (size > 1 && cards[k].val == 2) {
                        value.max = cards[0].val;
                        value.num = 0;
                    }
                    tempList.push(cards[k])
                }
                tempList.splice(0, i);
                tempList.splice(tempList.length - size + i, size - i);
                if (this.checkSanOrShun(tempList).num === size) {
                    value.max = tempList[0].val;
                    value.num = size;
                }
            }
        }
        return value;
    },

    /**
     * 检测连对
     * @param {*} cards 
     */
    checkSanShuangOrPlane(cards) {
        var value = {};
        value.max = cards[0].val;
        value.num = 0;

        if (cards.length % 5 == 0) {
            var size;
            var cardList = [];
            var tempList;
            var index = 0;
            var size = cards.length / 5;

            for (var i = 0; i <= size; i++) {
                tempList = [];
                cardList = [];
                index = 0;
                for (var k = 0; k < cards.length; k++) {
                    if (size > 1 && 2 === cards[k].val) {
                        value.max = cards[0].val;
                        value.num = 0;
                    }
                    tempList.push(cards[k]);
                }
                var oneCard = tempList.slice(0, 2 * i);
                var twoCard = tempList.slice(tempList.length - 2 * size + 2 * i, tempList.length);
                tempList.splice(0, 2 * i);
                tempList.splice(tempList.length - 2 * size + 2 * i, 2 * size - 2 * i);
                for (var k = 0; k < oneCard.length / 2; k++) {
                    cardList.push([oneCard[2 * k], oneCard[2 * k + 1]]);
                }
                for (var k = 0; k < twoCard.length / 2; k++) {
                    cardList.push([twoCard[2 * k], twoCard[2 * k + 1]]);
                }
                for (var k = 0; k < cardList.length; k++) {
                    if (this.checkDuiZi(cardList[k]).num == 1) {
                        index++;
                        if (index == size && this.checkSanOrShun(tempList).num == size) {
                            value.max = tempList[0].val;
                            value.num = size;
                        }
                    }
                }
            }
        }
        return value;
    },

    /**
     * 检测王炸
     * @param {*} cards 
     */
    kingBoom(cards) {
        var value = {};
        value.max = 0;
        value.num = 0;
        //判断是两张牌, 有大王和小王，则是王炸
        if (cards.length === 2) {
            if (cards[0].val === 15 && cards[1].val == 14) {
                value.max = 15;
                value.num = 1;
            }
        };
        return value;
    },
    otherPlayerOutCard(e, t, i) {
        for (var n = -1,
                o = 0; o < this.playerArr.length; o++)
            if (this.playerArr[o] == t) {
                n = o,
                    0 == n ? (this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string > 0 && (this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = parseInt(this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string) - e.length + i), this.pInfo.soundEffectControl && (2 == this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string ? 1 == this.tempPlayersLists[n].zhiShengEr && (cc.audioEngine.play(this.baoJingAudio[1], false, 1), this.tempPlayersLists[n].zhiShengEr--) : 1 == this.otherOneL.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string && 1 == this.tempPlayersLists[n].zhiShengYi && (cc.audioEngine.play(this.baoJingAudio[0], false, 1), this.tempPlayersLists[n].zhiShengYi--))) : 2 == n && (this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string > 0 && (this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string = parseInt(this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string) - e.length + i), this.pInfo.soundEffectControl && (2 == this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string ? 1 == this.tempPlayersLists[n].zhiShengEr && (cc.audioEngine.play(this.baoJingAudio[1], false, 1), this.tempPlayersLists[n].zhiShengEr--) : 1 == this.otherTwoR.getChildByName("card").getChildByName("cardsNum").getComponent("cc.Label").string && 1 == this.tempPlayersLists[n].zhiShengYi && (cc.audioEngine.play(this.baoJingAudio[0], false, 1), this.tempPlayersLists[n].zhiShengYi--)));
                break
            }
        if (e.length > 0) {
            e = this.xiTongSorting(e);
            var a, s = [],
                c = .8,
                r = 0;
            if (0 == n) var l = this.otherOneL.position.x + 120;
            else if (e.length < this.peak) var l = this.otherTwoR.position.x - 178.5 - e.length * this.smallDistanceCard;
            else var l = this.otherTwoR.position.x - 178.5 - this.peak * this.smallDistanceCard,
                h = this.otherTwoR.position.x - 178.5 - (e.length - this.peak) * this.smallDistanceCard;
            for (var o = 0; o < e.length; o++) a = this.cardsPool.size() > 0 ? this.cardsPool.get() : cc.instantiate(this.pb_Cards),
                this.pb_CardNode.addChild(a, 0),
                e.length < this.peak ? (a.scale = c, 0 == n ? a.setPosition(cc.v2(l + this.smallDistanceCard * o, this.otherOneL.position.y + a.getContentSize().height * c * .4)) : a.setPosition(cc.v2(l + this.smallDistanceCard * o, this.otherTwoR.position.y + a.getContentSize().height * c * .4))) : (a.scale = c, o < this.peak ? 0 == n ? a.setPosition(cc.v2(l + this.smallDistanceCard * o, this.otherOneL.position.y + a.getContentSize().height * c * .4)) : a.setPosition(cc.v2(l + this.smallDistanceCard * o, this.otherTwoR.position.y + a.getContentSize().height * c * .4)) : (0 == n ? a.setPosition(cc.v2(l + this.smallDistanceCard * r, this.otherOneL.position.y)) : a.setPosition(cc.v2(h + this.smallDistanceCard * r, this.otherTwoR.position.y)), r++)),
                a.getComponent("Cards").cardsCreate(e[o].val, e[o].type),
                s.push(a);
            cc.log("otherPlayerOutCard", n),
                this.recycling[n] = s,
                this.otherCardArr = e,
                cc.log(this.otherCardArr),
                this.count = 0,
                this.tempPlayersLists[n].outCard.push(s)
        } else this.count++,
            this.recycling[n] = null,
            this.tempPlayersLists[n].outCard.push([])
    },
    otherPlayerNo(e) {
        for (var t = -1,
                i = 0; i < this.playerArr.length; i++)
            if (this.playerArr[i] == e) {
                t = i;
                break
            }
        this.count++,
            this.recycling[t] = null,
            this.tempPlayersLists[t].outCard.push([])
    },
    checkTopPlayer() {
        return this.count < 2 ? !!this.rules(this.otherCardArr) : this.count >= 2 ? !!this.rules([]) : void 0
    },
    removeCards(e) {
        this.recycling[e] = null;
        for (var t = 0; t < this.tempPlayersLists[e].outCard.length; t++) {
            cc.log(this.tempPlayersLists[e].outCard);
            for (var i = 0; i < this.tempPlayersLists[e].outCard[t].length; i++) this.cardsPool.put(this.tempPlayersLists[e].outCard[t][i])
        }
        this.tempPlayersLists[e].outCard = []
    },
    settlement(e, chuntian) {

        if (chuntian) {
            this.chunTianAnimation();
        }
        for (var t = 0; t < e.length; t++)
            for (var i = 0; i < this.tempPlayersLists.length; i++)
                if (e[t].userId == this.tempPlayersLists[i].id) {
                    0 == i ? (this.otherOneL.getChildByName("bg_name").getChildByName("Score").getComponent("cc.Label").string = (e[t].Fraction / this.pInfo.exchangeRate).toFixed(2), this.landloadsLogo[i].active && !this.landloadsLogo[1].active ? this.billMessage[i].getChildByName("bet").getComponent("cc.Label").string = "x" + e[t].bei_shu : this.landloadsLogo[i].active || this.landloadsLogo[1].active ? this.landloadsLogo[1].active && (this.billMessage[i].getChildByName("bet").getComponent("cc.Label").string = "x" + e[t].bei_shu) : this.billMessage[i].getChildByName("bet").getComponent("cc.Label").string = "x" + e[t].bei_shu) : 1 == i ? (this.node.getChildByName("Bill").active = true, e[t].Bottom > 0 ? this.node.getChildByName("Bill").getChildByName("jieShuan").getComponent("dragonBones.ArmatureDisplay").armature().animation.play("shengli", 0) : this.node.getChildByName("Bill").getChildByName("jieShuan").getComponent("dragonBones.ArmatureDisplay").armature().animation.play("shibai", 0), this.pInfo.soundEffectControl && (e[t].Bottom > 0 ? cc.audioEngine.play(this.shuYing[1], false, 1) : cc.audioEngine.play(this.shuYing[0], false, 1)), this.pb_Lower.getChildByName("gold").getChildByName("integral").getComponent("cc.Label").string = (e[t].Fraction / this.pInfo.exchangeRate).toFixed(2), this.node.getChildByName("Bill").getComponent("cc.Sprite").spriteFrame = this.billBg[1], this.node.getChildByName("blackFace").active = true, this.node.getChildByName("blackFace").getChildByName("btn_Signout").active = true, this.billMessage[i].getChildByName("bet").getComponent("cc.Label").string = "x" + e[t].bei_shu) : 2 == i && (this.otherTwoR.getChildByName("bg_name").getChildByName("Score").getComponent("cc.Label").string = (e[t].Fraction / this.pInfo.exchangeRate).toFixed(2), this.landloadsLogo[i].active && !this.landloadsLogo[1].active ? this.billMessage[i].getChildByName("bet").getComponent("cc.Label").string = "x" + e[t].bei_shu : this.landloadsLogo[i].active || this.landloadsLogo[1].active ? this.landloadsLogo[1].active && (this.billMessage[i].getChildByName("bet").getComponent("cc.Label").string = "x" + e[t].bei_shu) : this.billMessage[i].getChildByName("bet").getComponent("cc.Label").string = "x" + e[t].bei_shu),
                        1 == this.tempPlayersLists[i].isLandlord ? this.billMessage[i].getChildByName("icon").active = true : this.billMessage[i].getChildByName("icon").active = false,
                        this.billMessage[i].getChildByName("niCheng").getComponent("cc.Label").string = this.tempPlayersLists[i].niCheng,
                        this.billMessage[i].getChildByName("bottomScore").getComponent("cc.Label").string = this.pb_Lower.getChildByName("di").getChildByName("bottomScore").getComponent("cc.Label").string,
                        this.billMessage[i].getChildByName("gold").getComponent("cc.Label").string = (e[t].Bottom / this.pInfo.exchangeRate).toFixed(2);
                    break
                }
        for (let k in e) {
            if (e[k].userId == this.pInfo.playerId && this.netWork.prot != 13706) {
                this.pb_Lower.getChildByName("gold").getChildByName("integral").getComponent("cc.Label").string = (e[k].score * 0.01).toFixed(2);
                break;
            }
        }
        this.btn_again.active = this.netWork.prot != 13706;
        this.exitMatchBtn.active = this.netWork.prot == 13706;
        // this.btn_match_again.active = false;
        this.gameFinish = true;
    },

    /**
     * 添加鼠标侦听事件
     */
    addEventListener() {
        //开始
        this.TouchStart = this.node.on("touchstart", event => {
            this.startLocat = this.node.convertToNodeSpaceAR(event.getLocation());
            this.selectCards(this.startLocat);
            for (var i = 0; i < this.playerCards.length; i++) {
                if (this.playerCards[i].position.y != this.movedY && i == this.playerCards.length - 1) {
                    this.tuoPaiCount = 0;
                } else if (this.playerCards[i].position.y == this.movedY) {
                    break;
                }
            }
        }, this);
        //移动
        this.TouchMove = this.node.on("touchmove", event => {
            var ar = this.node.convertToNodeSpaceAR(event.getLocation());
            this.selectCards(ar);
        }, this);
        //停止
        this.TouchEnd = this.node.on("touchend", event => {
            for (var i = 0; i < this.playerCards.length; i++)
                if (this.playerCards[i].color == "rgba(144, 144, 144, 255)") {
                    this.playerCards[i].getComponent("Cards").moveCard();
                    this.playerCards[i].getComponent("Cards").changeBai();
                }
            this.tuoPaiCount = 0;
        }, this);
        //取消
        this.TouchCancel = this.node.on("touchcancel", event => {
            for (var i = 0; i < this.playerCards.length; i++)
                if (this.playerCards[i].color == "rgba(144, 144, 144, 255)") {
                    this.playerCards[i].getComponent("Cards").moveCard();
                    this.playerCards[i].getComponent("Cards").changeBai();
                }
            this.tuoPaiCount = 0;
        }, this);
    },

    /**
     * 移除鼠标事件
     */
    turnOffTouch() {
        this.node.off("touchstart", this.TouchStart, this);
        this.node.off("touchmove", this.TouchMove, this);
        this.node.off("touchend", this.TouchEnd, this);
        this.node.off("touchcancel", this.TouchCancel, this);
    },


    finishGame() {
        this.turnOffTouch();
        for (var e = 0; e < this.recycling.length; e++)
            if (null != this.recycling[e])
                for (var t = 0; t < this.recycling[e].length; t++) this.cardsPool.put(this.recycling[e][t]);
        this.recycling = [
            [null],
            [null],
            [null]
        ];
        for (var e = 0; e < this.playerCards.length; e++) this.cardsPool.put(this.playerCards[e]);
        this.playerCards = [],
            this.landloadsCards.active = false,
            this.cancelTimer(),
            cc.log("结束all");
        for (var t = 0; t < this.tempPlayersLists.length; t++) {
            for (var e = 0; e < this.tempPlayersLists[t].state.length; e++) null != this.tempPlayersLists[t].state[e] && (this.tempPlayersLists[t].state[e].active = false);
            this.tempPlayersLists[t].state = []
        }
        for (var e = 0; e < this.landloadsLogo.length; e++) this.landloadsLogo[e].active = false;
        this.firstOutCard = 1,
            null != this.btnPlayerState && (this.btnPlayerState.active = false),
            this.pb_Lower.getChildByName("bei").getChildByName("bet").getComponent("cc.Label").string = 0
    },

    /**
     * 移除全部状态
     */
    removeAllState() {
        this.cancelTimer(),
            cc.log("移除");
        for (var i = 0; i < this.tempPlayersLists.length; i++) {
            for (var j = 0; j < this.tempPlayersLists[i].state.length; j++) {
                if (this.tempPlayersLists[i].state[j] != null) {
                    this.tempPlayersLists[i].state[j].active = false;
                }
            }
            this.tempPlayersLists[i].state = []
        }

        this.otherOneL.getChildByName("tuoGuan").active = false;
        this.otherTwoR.getChildByName("tuoGuan").active = false;

        for (var i = 0; i < this.playerArr.length; i++) {
            this.removeCards(i);
        }
        this.node.getComponent("LandlordsButtonClick").cancelTuoGaun()
    },

    /**
     * 重新开始游戏
     */
    resetGame() {
        this.finishGame();
        this.addEventListener();
    },
    matchingType() {
        cc.log(this.otherCardArr, this.count);
        var e = -1;
        this.count < 2 ? (e = this.cardType(this.otherCardArr), this.checkTypeNum(e)) : this.count >= 2 && this.tipsCardsArr.push(this.playerCards[this.playerCards.length - 1])
    },
    checkTypeNum: function (e) {
        this.sameDifferentVal();
        var t, i = [],
            n = [],
            o = -1,
            a = -1;
        switch (e.type) {
            case 0:
                this.pureType();
                for (var s = 0; s < this.pureArr.length; s++)
                    for (var c = 0; c < this.pureArr[s].length; c++) o = 1 == this.pureArr[s][c][0].getComponent("Cards").val ? 13.1 : 2 == this.pureArr[s][c][0].getComponent("Cards").val ? 13.2 : this.pureArr[s][c][0].getComponent("Cards").val,
                        a = 1 == e.max ? 13.1 : 2 == e.max ? 13.2 : e.max,
                        o > a && this.tipsCardsArr.push(this.pureArr[s][c][0]);
                for (var s = 0; s < this.cardsGroup[3].length; s++) {
                    n = [];
                    for (var c = 0; c < this.cardsGroup[3][s].length; c++) n.push(this.cardsGroup[3][s][c]),
                        4 == n.length && this.tipsCardsArr.push(n)
                }
                if (this.cardsGroup[4].length > 1) {
                    n = [];
                    for (var s = 0; s < this.cardsGroup[4].length; s++)
                        for (var c = 0; c < this.cardsGroup[4][s].length; c++) n.push(this.cardsGroup[4][s][c]),
                            2 == n.length && this.tipsCardsArr.push(n)
                }
                break;
            case 1:
                if (t = e.length / 2, 1 == t) {
                    this.pureType();
                    for (var s = 0; s < this.pureArr[1].length; s++) i = [],
                        i.push(this.pureArr[1][s][0]),
                        i.push(this.pureArr[1][s][1]),
                        this.drawCards(i, e);
                    for (var s = 0; s < this.pureArr[2].length; s++) i = [],
                        i.push(this.pureArr[2][s][0]),
                        i.push(this.pureArr[2][s][1]),
                        this.drawCards(i, e);
                    for (var s = 0; s < this.pureArr[3].length; s++) i = [],
                        i.push(this.pureArr[3][s][0]),
                        i.push(this.pureArr[3][s][1]),
                        this.drawCards(i, e)
                } else
                    for (var s = 0; s < this.cardsGroup[1].length; s++) {
                        i = [];
                        for (var r = 0; r < t && !(s + r >= this.cardsGroup[1].length); r++)
                            for (var c = 0; c < this.cardsGroup[1][s + r].length; c++) i.push(this.cardsGroup[1][s + r][c]);
                        i.length == e.length && this.drawCards(i, e)
                    }
                for (var s = 0; s < this.cardsGroup[3].length; s++) {
                    n = [];
                    for (var c = 0; c < this.cardsGroup[3][s].length; c++) n.push(this.cardsGroup[3][s][c]),
                        4 == n.length && this.tipsCardsArr.push(n)
                }
                if (this.cardsGroup[4].length > 1) {
                    n = [];
                    for (var s = 0; s < this.cardsGroup[4].length; s++)
                        for (var c = 0; c < this.cardsGroup[4][s].length; c++) n.push(this.cardsGroup[4][s][c]),
                            2 == n.length && this.tipsCardsArr.push(n)
                }
                break;
            case 2:
                for (var s = 0; s < this.cardsGroup[0].length; s++) {
                    i = [];
                    for (var c = 0; c < e.length; c++) s + c < this.cardsGroup[0].length && i.push(this.cardsGroup[0][s + c][0]);
                    i.length == e.length && this.drawCards(i, e)
                }
                for (var s = 0; s < this.cardsGroup[3].length; s++) {
                    n = [];
                    for (var c = 0; c < this.cardsGroup[3][s].length; c++) n.push(this.cardsGroup[3][s][c]),
                        4 == n.length && this.tipsCardsArr.push(n)
                }
                if (this.cardsGroup[4].length > 1) {
                    n = [];
                    for (var s = 0; s < this.cardsGroup[4].length; s++)
                        for (var c = 0; c < this.cardsGroup[4][s].length; c++) n.push(this.cardsGroup[4][s][c]),
                            2 == n.length && this.tipsCardsArr.push(n)
                }
                break;
            case 3:
                t = e.length / 3;
                for (var s = 0; s < this.cardsGroup[2].length; s++) {
                    i = [];
                    for (var r = 0; r < t; r++)
                        if (s + r < this.cardsGroup[2].length) {
                            for (var c = 0; c < this.cardsGroup[2][s + r].length; c++) i.push(this.cardsGroup[2][s + r][c]);
                            i.length == e.length && this.drawCards(i, e)
                        }
                }
                for (var s = 0; s < this.cardsGroup[3].length; s++) {
                    n = [];
                    for (var c = 0; c < this.cardsGroup[3][s].length; c++) n.push(this.cardsGroup[3][s][c]),
                        4 == n.length && this.tipsCardsArr.push(n)
                }
                if (this.cardsGroup[4].length > 1) {
                    n = [];
                    for (var s = 0; s < this.cardsGroup[4].length; s++)
                        for (var c = 0; c < this.cardsGroup[4][s].length; c++) n.push(this.cardsGroup[4][s][c]),
                            2 == n.length && this.tipsCardsArr.push(n)
                }
                break;
            case 4:
                for (var l = 0,
                        s = 0; s < this.cardsGroup[3].length; s++) {
                    i = [];
                    e: for (var c = 0; c < this.cardsGroup[3][s].length; c++)
                        if (i.push(this.cardsGroup[3][s][c]), 4 == i.length) {
                            this.pureType();
                            for (var h = 0; h < this.pureArr[0].length; h++)
                                if (i.push(this.pureArr[0][h][0]), i.length == e.length) {
                                    this.drawCards(i, e);
                                    break
                                }
                            if (i.length < e.length)
                                for (var r = this.playerCards.length - 1; r > -1; r--)
                                    for (var d = 0; d < i.length; d++)
                                        if (i[d].getComponent("Cards").val != this.playerCards[r].val) {
                                            if ((14 == this.playerCards[r].val || 15 == this.playerCards[r].val) && l < 1) l++;
                                            else if ((14 == this.playerCards[r].val || 15 == this.playerCards[r].val) && 1 == l) continue;
                                            if (d == i.length - 1 && (i.push(this.playerCards[r]), i.length == e.length)) {
                                                this.drawCards(i, e);
                                                break e
                                            }
                                        }
                        }
                }
                for (var s = 0; s < this.cardsGroup[3].length; s++) {
                    n = [];
                    for (var c = 0; c < this.cardsGroup[3][s].length; c++) n.push(this.cardsGroup[3][s][c]),
                        4 == n.length && this.tipsCardsArr.push(n)
                }
                if (this.cardsGroup[4].length > 1) {
                    n = [];
                    for (var s = 0; s < this.cardsGroup[4].length; s++)
                        for (var c = 0; c < this.cardsGroup[4][s].length; c++) n.push(this.cardsGroup[4][s][c]),
                            2 == n.length && this.tipsCardsArr.push(n)
                }
                break;
            case 5:
                for (var s = 0; s < this.cardsGroup[3].length; s++) {
                    i = [];
                    e: for (var c = 0; c < this.cardsGroup[3][s].length; c++)
                        if (i.push(this.cardsGroup[3][s][c]), 4 == i.length) {
                            this.pureType();
                            for (var h = 0; h < this.pureArr[1].length; h++)
                                if (i.push(this.pureArr[1][h][0]), i.push(this.pureArr[1][h][1]), i.length == e.length) {
                                    this.drawCards(i, e);
                                    break e
                                }
                            if (i.length < e.length)
                                for (var h = 0; h < this.pureArr[2].length; h++)
                                    if (i.push(this.pureArr[2][h][0]), i.push(this.pureArr[2][h][1]), i.length == e.length) {
                                        this.drawCards(i, e);
                                        break e
                                    }
                            if (i.length < e.length)
                                for (var h = 0; h < this.pureArr[3].length; h++)
                                    for (var u = 0; u < i.length && i[u].getComponent("Cards").val != this.pureArr[3][h][0].getComponent("Cards").val; u++)
                                        if (u == i.length - 1 && (i.push(this.pureArr[3][h][0]), i.push(this.pureArr[3][h][1]), i.length == e.length)) {
                                            this.drawCards(i, e);
                                            break e
                                        }
                        }
                }
                for (var s = 0; s < this.cardsGroup[3].length; s++) {
                    n = [];
                    for (var c = 0; c < this.cardsGroup[3][s].length; c++) n.push(this.cardsGroup[3][s][c]),
                        4 == n.length && this.tipsCardsArr.push(n)
                }
                if (this.cardsGroup[4].length > 1) {
                    n = [];
                    for (var s = 0; s < this.cardsGroup[4].length; s++)
                        for (var c = 0; c < this.cardsGroup[4][s].length; c++) n.push(this.cardsGroup[4][s][c]),
                            2 == n.length && this.tipsCardsArr.push(n)
                }
                break;
            case 6:
                var l = 0;
                t = e.length / 4;
                for (var s = 0; s < this.cardsGroup[2].length; s++) {
                    i = [];
                    for (var r = 0; r < t; r++)
                        if (s + r < this.cardsGroup[2].length)
                            for (var c = 0; c < this.cardsGroup[2][s + r].length; c++) i.push(this.cardsGroup[2][s + r][c]);
                    this.pureType();
                    for (var c = 0; c < this.pureArr[0].length; c++)
                        if (i.push(this.pureArr[0][c][0]), i.length == e.length) {
                            this.drawCards(i, e);
                            break
                        }
                    if (i.length < e.length) {
                        var m = i.length;
                        e: for (var r = this.playerCards.length - 1; r > -1; r--)
                            for (var d = 0; d < m && i[d].getComponent("Cards").val != this.playerCards[r].val; d++) {
                                if ((14 == this.playerCards[r].val || 15 == this.playerCards[r].val) && l < 1) l++;
                                else if ((14 == this.playerCards[r].val || 15 == this.playerCards[r].val) && 1 == l) break;
                                if (d == m - 1 && (cc.log(this.playerCards[r].val), i.push(this.playerCards[r]), i.length == e.length)) {
                                    this.drawCards(i, e);
                                    break e
                                }
                            }
                    }
                }
                for (var s = 0; s < this.cardsGroup[3].length; s++) {
                    n = [];
                    for (var c = 0; c < this.cardsGroup[3][s].length; c++) n.push(this.cardsGroup[3][s][c]),
                        4 == n.length && this.tipsCardsArr.push(n)
                }
                if (this.cardsGroup[4].length > 1) {
                    n = [];
                    for (var s = 0; s < this.cardsGroup[4].length; s++)
                        for (var c = 0; c < this.cardsGroup[4][s].length; c++) n.push(this.cardsGroup[4][s][c]),
                            2 == n.length && this.tipsCardsArr.push(n)
                }
                break;
            case 7:
                t = e.length / 5;
                for (var s = 0; s < this.cardsGroup[2].length; s++) {
                    i = [];
                    for (var r = 0; r < t; r++)
                        if (s + r < this.cardsGroup[2].length)
                            for (var c = 0; c < this.cardsGroup[2][s + r].length; c++) i.push(this.cardsGroup[2][s + r][c]);
                    this.pureType();
                    for (var h = 0; h < this.pureArr[1].length; h++)
                        if (i.push(this.pureArr[1][h][0]), i.push(this.pureArr[1][h][1]), i.length == e.length) {
                            this.drawCards(i, e);
                            break
                        }
                    if (i.length < e.length)
                        for (var h = 0; h < this.pureArr[2].length; h++)
                            for (var u = 0; u < i.length && i[u].getComponent("Cards").val != this.pureArr[2][h][0].getComponent("Cards").val; u++)
                                if (u == i.length - 1 && (i.push(this.pureArr[2][h][0]), i.push(this.pureArr[2][h][1]), i.length == e.length)) {
                                    this.drawCards(i, e);
                                    break
                                }
                    if (i.length < e.length)
                        for (var h = 0; h < this.pureArr[3].length; h++)
                            if (i.push(this.pureArr[3][h][0]), i.push(this.pureArr[3][h][1]), i.length == e.length) {
                                this.drawCards(i, e);
                                break
                            }
                }
                for (var s = 0; s < this.cardsGroup[3].length; s++) {
                    n = [];
                    for (var c = 0; c < this.cardsGroup[3][s].length; c++) n.push(this.cardsGroup[3][s][c]),
                        4 == n.length && this.tipsCardsArr.push(n)
                }
                if (this.cardsGroup[4].length > 1) {
                    n = [];
                    for (var s = 0; s < this.cardsGroup[4].length; s++)
                        for (var c = 0; c < this.cardsGroup[4][s].length; c++) n.push(this.cardsGroup[4][s][c]),
                            2 == n.length && this.tipsCardsArr.push(n)
                }
                break;
            case 8:
                for (var s = 0; s < this.cardsGroup[3].length; s++) {
                    i = [];
                    for (var c = 0; c < this.cardsGroup[3][s].length; c++) i.push(this.cardsGroup[3][s][c]),
                        i.length == e.length && this.drawCards(i, e)
                }
                if (this.cardsGroup[4].length > 1) {
                    n = [];
                    for (var s = 0; s < this.cardsGroup[4].length; s++)
                        for (var c = 0; c < this.cardsGroup[4][s].length; c++) n.push(this.cardsGroup[4][s][c]),
                            2 == n.length && this.tipsCardsArr.push(n)
                }
                break;
            case 9:
                this.tipsCardsArr = []
        }
    },

    tipsClick() {
        if (!!this.allowTips) {
            return;
        }
        this.allowTips = true;
        this.netWork.LandlordsSocket.emit('TipsCards');
        // 0 == this.tipsCount && this.matchingType(),
        //     this.tipsCount >= this.tipsCardsArr.length && (this.tipsCount = 0);
        // for (var e = 0; e < this.playerCards.length; e++) this.playerCards[e].position.y == this.movedY && this.playerCards[e].getComponent("Cards").moveCard();
        // if (this.tipsCardsArr.length > 0) {
        //     if (this.tipsCardsArr[this.tipsCount].length > 0)
        //         for (var e = 0; e < this.tipsCardsArr[this.tipsCount].length; e++) this.tipsCardsArr[this.tipsCount][e].getComponent("Cards").moveCard(),
        //             cc.log(this.tipsCardsArr[this.tipsCount][e].getComponent("Cards").val);
        //     else this.tipsCardsArr[this.tipsCount].getComponent("Cards").moveCard(),
        //         cc.log(this.tipsCardsArr[this.tipsCount].getComponent("Cards").val);
        //     this.tipsCount++
        // } else this.tuoGuan == false ? (this.allTips[1].getChildByName("Prompt2").active = true, this.allTips[1].getChildByName("Prompt2").getComponent("cc.Animation").play(), this.node.getComponent("LandlordsButtonClick").noOut()) : this.node.getComponent("LandlordsButtonClick").noOut()
    },


    tipsClickCallBack(res) {
        this.scheduleOnce(()=>{
            this.allowTips = false;
        },1);
        for (let i in this.playerCards) {
            if (this.playerCards[i].y == this.movedY) {
                this.playerCards[i].getComponent("Cards").moveCard();
            }
        }
        if (res.code) {
            for (let i in res.card) {
                for (let j in this.playerCards) {
                    if (this.playerCards[j].getComponent("Cards").val == res.card[i].val && this.playerCards[j].getComponent("Cards").type == res.card[i].type) {
                        this.playerCards[j].getComponent("Cards").moveCard();
                        break;
                    }
                }
            }
        } else {
            try {
                this.netWork.LandlordsSocket.emit("sendCardsArr", {
                    array: [],
                    userId: this.pInfo.playerId,
                    tableId: this.netWork.tableId,
                    seatId: this.netWork.seatId
                });
            } catch (e) {
                console.log(e);
            }
        }

        if (this.tmpTuoguan) {
            this.tmpTuoguan = false;
            if (res.code) {
                this.outCard();
            }
        }
    },

    xiTongSorting: function (e) {
        var t = [];
        e.sort(function (e, t) {
            return e.val == t.val ? t.type - e.type : t.val - e.val
        });
        for (var i = 0,
                n = null,
                o = null,
                a = null; i < e.length; i++)
            if (e[i].val > 13) n = i;
            else if (2 == e[i].val || 1 == e[i].val) {
            o = i;
            break
        }
        if (null == n && null != o) {
            a = e.splice(i, e.length - 1);
            for (var s = 0; s < a.length; s++) e.splice(s, 0, a[s])
        } else if (null != n && null != o) {
            a = e.splice(i, e.length - 1);
            for (var s = 0; s < a.length; s++) e.splice(n + s + 1, 0, a[s])
        }
        for (var i = e.length - 1; i > -1; i--) t.push(e[i]);
        return e
    },
    xiTongOutCard: function (e) {
        this.cancelTimer(),
            this.selectedCard = [];
        for (var t = 0; t < e.length; t++)
            for (var i = 0; i < this.playerCards.length; i++)
                if (e[t].val == this.playerCards[i].getComponent("Cards").val && e[t].type == this.playerCards[i].getComponent("Cards").type) {
                    this.selectedCard.push(this.playerCards[i]);
                    break
                }
        this.selectedCard = this.allSorting(this.selectedCard),
            this.tempPlayersLists[1].outCard.push(this.selectedCard),
            this.identifyCards()
    },
    teShuChuPai: function (e) {
        for (var t, i = [], n = 0; n < e.length; n++) t = this.cardsPool.size() > 0 ? this.cardsPool.get() : cc.instantiate(this.pb_Cards),
            this.pb_CardNode.addChild(t),
            t.getComponent("Cards").cardsCreate(e[n].val, e[n].type),
            i.push(t);
        i = this.allSorting(i);
        var o = null,
            a = null;
        if (i.length % 2 == 0) {
            a = i.length / 2;
            for (var n = 0; n < i.length; n++) i[n].scale = .8,
                o = -a * this.smallDistanceCard + n * this.smallDistanceCard - i[n].getContentSize().width * i[n].scale / 2 + this.smallDistanceCard / 2,
                i[n].setPosition(cc.v2(o, this.finishY)),
                i[n].zIndex = n;
        } else {
            a = (i.length - 1) / 2;
            for (var n = 0; n < i.length; n++) i[n].scale = .8,
                o = -a * this.smallDistanceCard + n * this.smallDistanceCard - i[n].getContentSize().width * i[n].scale / 2,
                i[n].setPosition(cc.v2(o, this.finishY)),
                i[n].zIndex = n;
        }
        this.tempPlayersLists[1].outCard.push(i),
            this.recycling[1] = i
    },
    allSorting: function (e) {
        var t = [];
        e.sort(function (e, t) {
            return e.getComponent("Cards").val == t.getComponent("Cards").val ? t.getComponent("Cards").type - e.getComponent("Cards").type : t.getComponent("Cards").val - e.getComponent("Cards").val
        });
        for (var i = 0,
                n = null,
                o = null,
                a = null; i < e.length; i++)
            if (e[i].getComponent("Cards").val > 13) n = i;
            else if (2 == e[i].getComponent("Cards").val || 1 == e[i].getComponent("Cards").val) {
            o = i;
            break
        }
        if (null == n && null != o) {
            a = e.splice(i, e.length - 1);
            for (var s = 0; s < a.length; s++) e.splice(s, 0, a[s])
        } else if (null != n && null != o) {
            a = e.splice(i, e.length - 1);
            for (var s = 0; s < a.length; s++) e.splice(n + s + 1, 0, a[s])
        }
        for (var i = e.length - 1; i > -1; i--) t.push(e[i]);
        return e
    },
    drawCards: function (e, t) {
        for (var i = [], n = e.length - 1; n > -1; n--) i.push({
            val: e[n].getComponent("Cards").val
        });
        var o;
        1 == t.type ? o = this.checkDuiZi(i) : 2 == t.type ? o = this.checkShunZi(i) : 3 == t.type ? o = this.checkSanOrShun(i) : 4 == t.type ? o = this.checkSiTakeTwo(i) : 5 == t.type ? o = this.checkSiTakeTwoShuang(i) : 6 == t.type ? o = this.checkSanOrPlane(i) : 7 == t.type ? o = this.checkSanShuangOrPlane(i) : 8 == t.type && (o = this.checkSi(i)),
            o.num > 0 && (1 == o.max ? o.max += 12.1 : 2 == o.max && (o.max += 11.2), 1 == t.max ? t.max += 12.1 : 2 == t.max && (t.max += 11.2), o.max > t.max && this.tipsCardsArr.push(e))
    },
    sameDifferentVal() {
        this.cardsGroup = [
            [],
            [],
            [],
            [],
            []
        ];
        for (var e = 0; e < this.CardsNum.length; e++)
            for (var t = [], i = [], n = [], o = [], a = [], s = 0, c = this.playerCards.length - 1; c > -1; c--) this.CardsNum[e] == this.playerCards[c].getComponent("Cards").val && (14 == this.CardsNum[e] || 15 == this.CardsNum[e] ? s = 5 : s++, 1 == s ? (t.push(this.playerCards[c]), i.push(this.playerCards[c]), n.push(this.playerCards[c]), o.push(this.playerCards[c]), this.cardsGroup[0].push(t)) : 2 == s ? (i.push(this.playerCards[c]), n.push(this.playerCards[c]), o.push(this.playerCards[c]), this.cardsGroup[1].push(i)) : 3 == s ? (n.push(this.playerCards[c]), o.push(this.playerCards[c]), this.cardsGroup[2].push(n)) : 4 == s ? (o.push(this.playerCards[c]), this.cardsGroup[3].push(o)) : 5 == s && (a.push(this.playerCards[c]), this.cardsGroup[4].push(a)))
    },
    pureType() {
        this.pureArr = [
            [],
            [],
            [],
            [],
            []
        ];
        for (var e = 0; e < this.CardsNum.length; e++) {
            for (var t = [], i = 0, n = this.playerCards.length - 1; n > -1; n--) this.CardsNum[e] == this.playerCards[n].getComponent("Cards").val && (14 == this.CardsNum[e] || 15 == this.CardsNum[e] ? (t.push(this.playerCards[n]), i += 5) : (t.push(this.playerCards[n]), i++));
            1 == i || 5 == i ? this.pureArr[0].push(t) : 2 == i ? this.pureArr[1].push(t) : 3 == i ? this.pureArr[2].push(t) : 4 == i && this.pureArr[3].push(t),
                5 == i && this.pureArr[4].push(t)
        }
    },
    tuoPai() {
        var e = -1,
            t = [];
        if (this.count < 2) {
            e = this.cardType(this.otherCardArr);
            var i = this.xuanPai(e);
            this.yiDong(i)
        } else if (this.count >= 2) {
            this.sameDifferentVal();
            for (var n = 0; n < this.playerCards.length; n++) this.playerCards[n].position.y == this.movedY && t.push(this.playerCards[n]);
            if (t.length < 1) return
        }
    },
    t_shunZi: function (e) {
        for (var t, i = this.cardsGroup[0].length, n = []; i >= 5;)
            for (var o = 0; o < this.cardsGroup[0].length; o++) {
                if (!(o + i <= this.cardsGroup[0].length)) {
                    i--;
                    break
                }
                n = [];
                for (var a = 0; a < i; a++)
                    if (n.push(this.cardsGroup[0][a + o][0]), n.length == i) {
                        if (this.coincidence(n, e) && this.qiCards(n, {
                                type: 2,
                                max: 0
                            })) {
                            t = this.differentZu(n, e),
                                this.yiDong(t),
                                i = 0;
                            break
                        }
                    } else if (a == this.cardsGroup[0].length - 1 && n.length < i) {
                    i--;
                    break
                }
            }
    },
    t_lianDui: function (e) {
        for (var t, i = 2 * this.cardsGroup[1].length, n = []; i > 5;)
            if (i % 2 == 0)
                for (var o = 0; o < this.cardsGroup[1].length; o++) {
                    if (!(o + i / 2 <= this.cardsGroup[1].length)) {
                        i--;
                        break
                    }
                    n = [];
                    for (var a = 0; a < i / 2; a++)
                        if (n.push(this.cardsGroup[1][a + o][0]), n.push(this.cardsGroup[1][a + o][1]), n.length == i) {
                            if (this.coincidence(n, e) && this.qiCards(n, {
                                    type: 1,
                                    max: 0
                                })) {
                                t = this.differentZu(n, e),
                                    this.yiDong(t),
                                    i = 0;
                                break
                            }
                        } else if (a == this.cardsGroup[1].length - 1 && n.length < i) {
                        i--;
                        break
                    }
                } else i--
    },
    t_sanShun: function (e) {
        for (var t, i = 3 * this.cardsGroup[2].length, n = []; i > 2;)
            if (i % 3 == 0)
                for (var o = 0; o < this.cardsGroup[2].length; o++) {
                    if (!(o + i / 3 <= this.cardsGroup[2].length)) {
                        i--;
                        break
                    }
                    n = [];
                    for (var a = 0; a < i / 3; a++)
                        if (n.push(this.cardsGroup[2][a + o][0]), n.push(this.cardsGroup[2][a + o][1]), n.push(this.cardsGroup[2][a + o][2]), n.length == i) {
                            if (this.coincidence(n, e) && this.qiCards(n, {
                                    type: 3,
                                    max: 0
                                })) {
                                t = this.differentZu(n, e),
                                    this.yiDong(t),
                                    i = 0;
                                break
                            }
                        } else if (a == this.cardsGroup[2].length - 1 && n.length < i) {
                        i--;
                        break
                    }
                } else i--
    },
    t_sanDaiYi: function (e) {
        for (var t, i = 3 * this.cardsGroup[2].length, n = []; i > 3;)
            if (i % 3 == 0)
                for (var o = 0; o < this.cardsGroup[2].length; o++) {
                    if (!(o + i / 3 <= this.cardsGroup[2].length)) {
                        i--;
                        break
                    }
                    n = [];
                    for (var a = 0; a < i / 3; a++)
                        if (n.push(this.cardsGroup[2][a + o][0]), n.push(this.cardsGroup[2][a + o][1]), n.push(this.cardsGroup[2][a + o][2]), n.length == i) {
                            for (var s = this.yiJiNext(n, e), c = 0; c < s.length; c++) n.push(s[c]);
                            if (s.length < i / 3) {
                                var r = n.length;
                                e: for (var c = this.playerCards.length - 1; c > -1; c--)
                                    for (var l = 0; l < r && n[l].getComponent("Cards").val != this.playerCards[c].getComponent("Cards").val; l++) {
                                        if ((14 == this.playerCards[c].getComponent("Cards").val || 15 == this.playerCards[c].getComponent("Cards").val) && kingNum < 1) kingNum++;
                                        else if ((14 == this.playerCards[c].getComponent("Cards").val || 15 == this.playerCards[c].getComponent("Cards").val) && 1 == kingNum) break;
                                        if (l == r - 1 && (n.push(this.playerCards[c]), n.length == i / 3 * 4 && this.coincidence(n, e) && this.qiCards(n, {
                                                type: 6,
                                                max: 0
                                            }))) {
                                            t = this.differentZu(n, e),
                                                this.yiDong(t),
                                                i = 0;
                                            break e
                                        }
                                    }
                            } else if (n.length == i / 3 * 4 && this.coincidence(n, e) && this.qiCards(n, {
                                    type: 6,
                                    max: 0
                                })) {
                                t = this.differentZu(n, e),
                                    this.yiDong(t),
                                    i = 0;
                                break
                            }
                        } else if (a == this.cardsGroup[2].length - 1 && n.length < i) {
                        i--;
                        break
                    }
                } else i--
    },
    t_sanDaiYiDui: function (e) {
        for (var t, i = 3 * this.cardsGroup[2].length, n = []; i > 4;)
            if (i % 3 == 0)
                for (var o = 0; o < this.cardsGroup[2].length; o++) {
                    if (!(o + i / 3 <= this.cardsGroup[2].length)) {
                        i--;
                        break
                    }
                    n = [];
                    for (var a = 0; a < i / 3; a++)
                        if (n.push(this.cardsGroup[2][a + o][0]), n.push(this.cardsGroup[2][a + o][1]), n.push(this.cardsGroup[2][a + o][2]), n.length == i) {
                            var s = this.yiJiNext(n, e);
                            if (!(s.length <= i / 3)) break;
                            for (var c = 0; c < s.length; c++)
                                for (var r = 0; r < this.cardsGroup[1].length; r++)
                                    if (this.cardsGroup[1][r][0].getComponent("Cards").val == s[c].getComponent("Cards").val)
                                        for (var l = 0; l < n.length && n[l] != s[c]; l++) l == n.length - 1 && (n.push(this.cardsGroup[1][r][0]), n.push(this.cardsGroup[1][r][1]));
                            n.length == i / 3 * 5
                        } else if (n.length == i / 3 * 4 && this.coincidence(n, e) && this.qiCards(n, {
                            type: 6,
                            max: 0
                        })) {
                        t = this.differentZu(n, e),
                            this.yiDong(t),
                            i = 0;
                        break
                    }
                } else i--
    },
    yiJiNext: function (e, t) {
        for (var i = [], n = 0; n < t.length; n++)
            for (var o = 0; o < e.length && t[n].getComponent("Cards").val != e[o].getComponent("Cards").val; o++)
                if (o == e.length - 1) {
                    i.push(t[n]);
                    break
                }
        return i
    },
    differentZu: function (e, t) {
        for (var i = [], n = 0; n < e.length; n++)
            for (var o = 0; o < t.length && (e[n].getComponent("Cards").val != t[o].getComponent("Cards").val || e[n].getComponent("Cards").type != t[o].getComponent("Cards").type); o++) o == t.length - 1 && i.push(e[n]);
        return this.tuoPaiCount++,
            i
    },
    coincidence: function (e, t) {
        cc.log(t[0].getComponent("Cards").val);
        for (var i = 0; i < t.length; i++)
            for (var n = 0; n < e.length && t[i].getComponent("Cards").val != e[n].getComponent("Cards").val; n++)
                if (n == e.length - 1) return cc.log(t[i].getComponent("Cards").val),
                    false;
        return !0
    },
    yiDong: function (e) {
        for (var t = 0; t < e.length; t++) e[t].getComponent("Cards").moveCard()
    },
    yiJi: function (e, t) {
        for (var i = [], n = [], o = 0; o < e.length; o++)
            for (var a = 0; a < t.length; a++) {
                if (t[a].getComponent("Cards").val == e[o].getComponent("Cards").val && t[a].getComponent("Cards").type == e[o].getComponent("Cards").type) {
                    i.push(t[a]);
                    break
                }
                a == t.length - 1 && n.push(t[a])
            }
        return {
            same: i,
            different: n
        }
    },
    xuanPai: function (e) {
        this.sameDifferentVal();
        for (var t, i, n = [], o = [], a = [], s = 0; s < this.playerCards.length; s++) this.playerCards[s].position.y == this.movedY && a.push(this.playerCards[s]);
        switch (e.type) {
            case 0:
                break;
            case 1:
                if (t = e.length / 2, a.length > t) return 0;
                for (var s = 0; s < this.cardsGroup[1].length; s++) {
                    n = [];
                    for (var c = 0; c < t && !(s + c >= this.cardsGroup[1].length); c++)
                        for (var r = 0; r < this.cardsGroup[1][s + c].length; r++) n.push(this.cardsGroup[1][s + c][r]);
                    if (n.length == e.length && (i = this.yiJi(n, a), i.same.length == a.length && this.qiCards(n, e))) return i.different
                }
                for (var s = 0; s < this.cardsGroup[3].length; s++) {
                    o = [];
                    for (var r = 0; r < this.cardsGroup[3][s].length; r++)
                        if (o.push(this.cardsGroup[3][s][r]), 4 == o.length && (i = this.yiJi(o, a), i.same.length == a.length && this.qiCards(n, e))) return i.different
                }
                if (this.cardsGroup[4].length > 1) {
                    o = [];
                    for (var s = 0; s < this.cardsGroup[4].length; s++)
                        for (var r = 0; r < this.cardsGroup[4][s].length; r++)
                            if (o.push(this.cardsGroup[4][s][r]), 2 == o.length && (i = this.yiJi(o, a), i.same.length == a.length)) return i.different
                }
                break;
            case 2:
                for (var s = 0; s < this.cardsGroup[0].length; s++) {
                    n = [];
                    for (var r = 0; r < e.length; r++) s + r < this.cardsGroup[0].length && n.push(this.cardsGroup[0][s + r][0]);
                    if (n.length == e.length && (i = this.yiJi(n, a), i.same.length == a.length && this.qiCards(n, e))) return i.different
                }
                for (var s = 0; s < this.cardsGroup[3].length; s++) {
                    o = [];
                    for (var r = 0; r < this.cardsGroup[3][s].length; r++)
                        if (o.push(this.cardsGroup[3][s][r]), 4 == o.length && (i = this.yiJi(o, a), i.same.length == a.length && this.qiCards(n, e))) return i.different
                }
                if (this.cardsGroup[4].length > 1) {
                    o = [];
                    for (var s = 0; s < this.cardsGroup[4].length; s++)
                        for (var r = 0; r < this.cardsGroup[4][s].length; r++)
                            if (o.push(this.cardsGroup[4][s][r]), 2 == o.length && (i = this.yiJi(o, a), i.same.length == a.length)) return i.different
                }
                break;
            case 3:
                t = e.length / 3;
                for (var s = 0; s < this.cardsGroup[2].length; s++) {
                    n = [];
                    for (var c = 0; c < t; c++)
                        if (s + c < this.cardsGroup[2].length) {
                            for (var r = 0; r < this.cardsGroup[2][s + c].length; r++) n.push(this.cardsGroup[2][s + c][r]);
                            if (n.length == e.length && (i = this.yiJi(n, a), i.same.length == a.length && this.qiCards(n, e))) return i.different
                        }
                }
                for (var s = 0; s < this.cardsGroup[3].length; s++) {
                    o = [];
                    for (var r = 0; r < this.cardsGroup[3][s].length; r++)
                        if (o.push(this.cardsGroup[3][s][r]), 4 == o.length && (i = this.yiJi(o, a), i.same.length == a.length && this.qiCards(n, e))) return i.different
                }
                if (this.cardsGroup[4].length > 1) {
                    o = [];
                    for (var s = 0; s < this.cardsGroup[4].length; s++)
                        for (var r = 0; r < this.cardsGroup[4][s].length; r++)
                            if (o.push(this.cardsGroup[4][s][r]), 2 == o.length && (i = this.yiJi(o, a), i.same.length == a.length)) return i.different
                }
                break;
            case 4:
                for (var l = 0,
                        s = 0; s < this.cardsGroup[3].length; s++) {
                    n = [];
                    for (var r = 0; r < this.cardsGroup[3][s].length; r++)
                        if (n.push(this.cardsGroup[3][s][r]), 4 == n.length) {
                            for (var h = this.yiJi(n, a), c = 0; c < h.different.length; c++) n.push(h.different[c]);
                            if (n.length < e.length)
                                for (var c = this.playerCards.length - 1; c > -1; c--)
                                    for (var d = 0; d < n.length && n[d].getComponent("Cards").val != this.playerCards[c].val; d++) {
                                        if ((14 == this.playerCards[c].val || 15 == this.playerCards[c].val) && l < 1) l++;
                                        else if ((14 == this.playerCards[c].val || 15 == this.playerCards[c].val) && 1 == l) continue;
                                        if (d == n.length - 1 && (n.push(this.playerCards[c]), n.length == e.length && (i = this.yiJi(n, a), i.same.length == a.length && this.qiCards(n, e)))) return i.different
                                    } else if (n.length == e.length && (i = this.yiJi(n, a), i.same.length == a.length && this.qiCards(n, e))) return i.different
                        }
                }
                for (var s = 0; s < this.cardsGroup[3].length; s++) {
                    o = [];
                    for (var r = 0; r < this.cardsGroup[3][s].length; r++)
                        if (o.push(this.cardsGroup[3][s][r]), 4 == o.length && (i = this.yiJi(o, a), i.same.length == a.length && this.qiCards(n, e))) return i.different
                }
                if (this.cardsGroup[4].length > 1) {
                    o = [];
                    for (var s = 0; s < this.cardsGroup[4].length; s++)
                        for (var r = 0; r < this.cardsGroup[4][s].length; r++)
                            if (o.push(this.cardsGroup[4][s][r]), 2 == o.length && (i = this.yiJi(o, a), i.same.length == a.length)) return i.different
                }
                break;
            case 5:
                for (var s = 0; s < this.cardsGroup[3].length; s++) {
                    n = [];
                    for (var r = 0; r < this.cardsGroup[3][s].length; r++)
                        if (n.push(this.cardsGroup[3][s][r]), 4 == n.length) {
                            for (var h = this.yiJi(n, a), c = 0; c < h.different.length; c++) n.push(h.different[c]);
                            if (n.length < e.length) {
                                for (var c = 0; c < this.cardsGroup[1].length; c++)
                                    if (this.cardsGroup[1][c][0].getComponent("Cards").val != n[0].getComponent("Cards").val)
                                        for (var d = 0; d < this.cardsGroup[1][c].length; d++)
                                            if (n.push(this.cardsGroup[1][c][d]), n.length == e.length)
                                                if (i = this.yiJi(n, a), i.same.length == a.length) {
                                                    if (this.qiCards(n, e)) return i.different
                                                } else n.splice(n.length - this.cardsGroup[1][c][d].length, n.length);
                                for (var c = 0; c < this.cardsGroup[3].length; c++)
                                    if (this.cardsGroup[3][c][0].getComponent("Cards").val != n[0].getComponent("Cards").val)
                                        for (var d = 0; d < this.cardsGroup[3][c].length; d++)
                                            if (n.push(this.cardsGroup[3][c][d]), n.length == e.length && i.same.length == a.length && this.qiCards(n, e)) return i.different
                            }
                        }
                }
                for (var s = 0; s < this.cardsGroup[3].length; s++) {
                    o = [];
                    for (var r = 0; r < this.cardsGroup[3][s].length; r++)
                        if (o.push(this.cardsGroup[3][s][r]), 4 == o.length && (i = this.yiJi(o, a), i.same.length == a.length && this.qiCards(n, e))) return i.different
                }
                if (this.cardsGroup[4].length > 1) {
                    o = [];
                    for (var s = 0; s < this.cardsGroup[4].length; s++)
                        for (var r = 0; r < this.cardsGroup[4][s].length; r++)
                            if (o.push(this.cardsGroup[4][s][r]), 2 == o.length && (i = this.yiJi(o, a), i.same.length == a.length)) return i.different
                }
                break;
            case 6:
                var l = 0;
                t = e.length / 4;
                for (var s = 0; s < this.cardsGroup[2].length; s++) {
                    n = [];
                    for (var c = 0; c < t; c++)
                        if (s + c < this.cardsGroup[2].length)
                            for (var r = 0; r < this.cardsGroup[2][s + c].length; r++) n.push(this.cardsGroup[2][s + c][r]);
                    for (var h = this.yiJi(n, a), c = 0; c < h.different.length; c++) n.push(h.different[c]);
                    if (n.length < e.length)
                        for (var u = n.length,
                                c = this.playerCards.length - 1; c > -1; c--)
                            for (var d = 0; d < u && n[d].getComponent("Cards").val != this.playerCards[c].val; d++) {
                                if ((14 == this.playerCards[c].val || 15 == this.playerCards[c].val) && l < 1) l++;
                                else if ((14 == this.playerCards[c].val || 15 == this.playerCards[c].val) && 1 == l) break;
                                if (d == u - 1 && (cc.log(this.playerCards[c].val), n.push(this.playerCards[c]), n.length == e.length && (i = this.yiJi(n, a), i.same.length == a.length && this.qiCards(n, e)))) return i.different
                            } else if (n.length == e.length && (i = this.yiJi(n, a), i.same.length == a.length && this.qiCards(n, e))) return i.different
                }
                for (var s = 0; s < this.cardsGroup[3].length; s++) {
                    o = [];
                    for (var r = 0; r < this.cardsGroup[3][s].length; r++)
                        if (o.push(this.cardsGroup[3][s][r]), 4 == o.length && (i = this.yiJi(o, a), i.same.length == a.length && this.qiCards(n, e))) return i.different
                }
                if (this.cardsGroup[4].length > 1) {
                    o = [];
                    for (var s = 0; s < this.cardsGroup[4].length; s++)
                        for (var r = 0; r < this.cardsGroup[4][s].length; r++)
                            if (o.push(this.cardsGroup[4][s][r]), 2 == o.length && (i = this.yiJi(o, a), i.same.length == a.length)) return i.different
                }
                break;
            case 7:
                t = e.length / 5;
                for (var s = 0; s < this.cardsGroup[2].length; s++) {
                    n = [];
                    for (var c = 0; c < t; c++)
                        if (s + c < this.cardsGroup[2].length)
                            for (var r = 0; r < this.cardsGroup[2][s + c].length; r++) n.push(this.cardsGroup[2][s + c][r]);
                    for (var h = this.yiJi(n, a), c = 0; c < this.cardsGroup[1].length; c++)
                        for (var r = 0; r < this.cardsGroup[1][c].length; r++)
                            for (var d = 0; d < h.different.length; d++)
                                if (h.different[s].getComponent("Cards").val == this.cardsGroup[1][c][0].getComponent("Cards").val && (n.push(this.cardsGroup[1][c][r]), n.length == e.length && (i = this.yiJi(n, a), i.same.length == a.length && this.qiCards(n, e)))) return i.different
                }
                for (var s = 0; s < this.cardsGroup[3].length; s++) {
                    o = [];
                    for (var r = 0; r < this.cardsGroup[3][s].length; r++)
                        if (o.push(this.cardsGroup[3][s][r]), 4 == o.length && (i = this.yiJi(o, a), i.same.length == a.length && this.qiCards(n, e))) return i.different
                }
                if (this.cardsGroup[4].length > 1) {
                    o = [];
                    for (var s = 0; s < this.cardsGroup[4].length; s++)
                        for (var r = 0; r < this.cardsGroup[4][s].length; r++)
                            if (o.push(this.cardsGroup[4][s][r]), 2 == o.length && (i = this.yiJi(o, a), i.same.length == a.length)) return i.different
                }
                break;
            case 8:
                for (var s = 0; s < this.cardsGroup[3].length; s++) {
                    o = [];
                    for (var r = 0; r < this.cardsGroup[3][s].length; r++)
                        if (o.push(this.cardsGroup[3][s][r]), 4 == o.length && (i = this.yiJi(o, a), i.same.length == a.length && this.qiCards(n, e))) return i.different
                }
                if (this.cardsGroup[4].length > 1) {
                    o = [];
                    for (var s = 0; s < this.cardsGroup[4].length; s++)
                        for (var r = 0; r < this.cardsGroup[4][s].length; r++)
                            if (o.push(this.cardsGroup[4][s][r]), 2 == o.length && (i = this.yiJi(o, a), i.same.length == a.length)) return i.different
                }
                break;
            case 9:
        }
    },
    qiCards: function (e, t) {
        var cardVal = [];
        for (var i = e.length - 1; i > -1; i--) {
            cardVal.push({
                val: e[i].getComponent("Cards").val
            });
        }
        var o;
        return 1 == t.type ? o = this.checkDuiZi(cardVal) : 2 == t.type ? o = this.checkShunZi(cardVal) : 3 == t.type ? o = this.checkSanOrShun(cardVal) : 4 == t.type ? o = this.checkSiTakeTwo(cardVal) : 5 == t.type ? o = this.checkSiTakeTwoShuang(cardVal) : 6 == t.type ? o = this.checkSanOrPlane(cardVal) : 7 == t.type ? o = this.checkSanShuangOrPlane(cardVal) : 8 == t.type && (o = this.checkSi(cardVal)),
            o.num > 0 ? (1 == o.max ? o.max += 12.1 : 2 == o.max && (o.max += 11.2), 1 == t.max ? t.max += 12.1 : 2 == t.max && (t.max += 11.2), o.max > t.max) : (cc.log(cardVal), false)
    }
});