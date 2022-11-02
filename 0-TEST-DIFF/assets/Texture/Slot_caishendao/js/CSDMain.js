const BETNUM = 38; //单注值
const LINES = 243; //线数
const TOPBET = [1000, 50, 30, 100]; //列倍率
const BET = [1, 5, 10, 20, 25, 30, 40, 50, 80, 100];
const RULELIST = [2, 0.75, 0.25, 1.5, 0.5, 0.2, 1.25, 0.3, 0.15, 1, 0.25, 0.1, 0.75, 0.2, 0.1, 0.5, 0.1, 0.05, 0.5, 0.1, 0.05, 0.25, 0.1, 0.05, 0.25, 0.1, 0.05, 0.25, 0.1, 0.05, 0.25, 0.1, 0.05, 0.25, 0.1, 0.05]; //规则
cc.Class({
    extends: cc.Component,

    properties: {
        lblCoinList: {
            default: [],
            type: cc.Label,
            displayName: '列倍率显示',
        },
        rolePb: {
            default: [],
            type: cc.Prefab,
            displayName: '滚轮角色Pb',
        },
        coinPb: {
            default: null,
            type: cc.Prefab,
            displayName: '财神吐金币特效',
        },
        coinAnimPr: {
            default: null,
            type: cc.Node,
            displayName: '财神吐金币父节点',
        },

        effectAnimPr: {
            default: null,
            type: cc.Node,
            displayName: '终奖特效',
        },

        //大奖有关
        doorNode: {
            default: null,
            type: cc.Node,
            displayName: '大门',
        },
        caiShenBg: {
            default: null,
            type: cc.Node,
            displayName: '财神背景',
        },
        caiShenAnim: {
            default: null,
            type: cc.Animation,
            displayName: '财神动画',
        },
        bigWinNode: {
            default: null,
            type: cc.Node,
            displayName: '大奖节点',
        },
        bigWinResultAnim: {
            default: null,
            type: cc.Animation,
            displayName: 'bigWin终奖动画'
        },
        //免费次数有关
        freeHideNode: {
            default: [],
            type: cc.Node,
            displayName: '免费摇奖隐藏节点',
        },

        freeTimesNode: {
            default: null,
            type: cc.Node,
            displayName: '免费摇奖显示节点',
        },

        helpUI: {
            default: null,
            type: cc.Node,
            displayName: 'help界面',
        },

        helpNum: {
            default: null,
            type: cc.Node,
            displayName: 'help界面可变注数',
        },
    },

    onLoad() {
        this.playerInfo = require("PlayerInfo").getInstant;
        this.net = this.node.getComponent('CSDNetwork');
        this.audio = this.node.getComponent('CSDAudio');
        this.slotCtrl = cc.find("Canvas/Slot_Control_03").getComponent('slot_Ctrl'); //newSlot
        this.slotCtrl.init(this); //newSlot
        this.wheelList = [];
        this.bet = 0;
        this.auto = false;
        this.autoTimes = 0;
        this.status = 0;
        this.bigWinResList = [3, 1, 2];
        this.bigWinCoin = 0;
        this.bigWinBoo = false;
        this.freeTimes = 0;
        this.rollResult = [];
        this.rollIndex = 0;
        this.lotteryRes = null;
        this.stopFree = false;
        this.freeGameCoin = 0;
        this.bIsFreeGame = false;
        this.delayClick = false;
    },

    start() {
        this.slotCtrl.lblLines.string = LINES;
        this.setBet();
    },

    update() {
        if (this.status == 0 && !this.slotCtrl.Btn_start.children[0].active) {
            this._showBtnAnimTime++;
            if (this._showBtnAnimTime >= 300) {
                this._showBtnAnimTime = 0;
                this.slotCtrl.Btn_start.children[0].active = true;
            }
        }
    },

    onCLick(event, args) {
        switch (args) {
            case "roll":
                if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.bIsFreeGame || this.delayClick) {
                    return;
                }
                if (!this.auto) {
                    if (this.status == 0) {
                        this.status = 2;
                        this.sendRoll();
                    }
                }
                break;
            case "stopRoll":
                if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.bIsFreeGame || this.delayClick) {
                    return;
                }
                if (!this.auto) {
                    if (this.status == 1) {
                        this.delayClick = true;
                        this.scheduleOnce(() => {
                            this.delayClick = false;
                        }, 1);
                        this.stopImmediately();
                    }
                }
                break;
            case "add":
                if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto) {
                    return;
                }
                this.slotCtrl.addBet();
                this.bet += 1;
                this.bet = this.bet >= BET.length ? BET.length - 1 : this.bet;
                if (this.bet >= BET.length - 1) {
                    this.slotCtrl.maxBet();
                    this.slotCtrl.MaxCoin_bg.active = true;
                    this.slotCtrl.NonMaxCoin_bg.active = false;
                }
                this.setBet();
                break;
            case "dec":
                if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto) {
                    return;
                }
                this.slotCtrl.subBet();
                this.bet -= 1;
                this.bet = this.bet >= 0 ? this.bet : 0;
                if (this.bet < BET.length - 1) {
                    this.slotCtrl.MaxCoin_bg.active = false;
                    this.slotCtrl.NonMaxCoin_bg.active = true;
                }
                this.setBet();
                break;
            case "max":
                if (this.bet == BET.length - 1 || this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto) {
                    return;
                }
                this.slotCtrl.maxBet();
                this.bet = BET.length - 1;
                this.slotCtrl.MaxCoin_bg.active = true;
                this.slotCtrl.NonMaxCoin_bg.active = false;
                this.setBet();
                break;
            case "closeBigWin":
                this.audio.playBgm(0);
                this.bigWinResultAnim.node.active = false;
                this.bigWinNode.active = false;
                this.caiShenBg.active = false;
                break;
            case "help":
                this.helpUI.active = true;
                let hr = this.helpNum.children;
                for (let i in hr) {
                    hr[i].getComponent(cc.Label).string = (RULELIST[i] * BET[this.bet]).toFixed(2);
                }
                break;
            case "closeHelp":
                this.helpUI.active = false;
                break;
            case "exitGame":
                this.net.socket.disconnect();
                cc.director.loadScene(window.hallName);
                break;
        }
    },

    startAuto(n) {
        if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.bIsFreeGame || this.delayClick) {
            return;
        }
        if (this.status == 0) {
            this.auto = true;
            this.autoTimes = n;
            this.slotCtrl.Btn_stopAuto.children[1].getComponent(cc.Label).string = n;
            this.sendRoll();
        }
    },

    stopAuto() {
        this.auto = false;
        this.autoTimes = 0;
    },

    setBet() {
        this.slotCtrl.lblCurBet.string = Helper.fixNum(BET[this.bet] * BETNUM);
        this.slotCtrl.lineLv_lab.string = this.bet + 1;
        for (let i in this.lblCoinList) {
            this.lblCoinList[i].string = Helper.fixNum(TOPBET[i] * (this.bet + 1) * BETNUM);
        }
    },

    stateCallBack() {
        let st = 0;
        for (let i in this.wheelList) {
            if (this.wheelList[i].status) {
                st = 1;
                break;
            }
        }
        this.status = st;
        if (this.status == 0) {
            //结束当前轮盘
            let rIndex = this.rollIndex;
            this.slotCtrl.lblUserCoin.string = Helper.fixNum(this.lotteryRes.userscore);
            //财神专属吐钱动画
            let animBool = false;
            let posX = [-547, -274, 0, 274, 547];
            for (let i in this.wheelList) {
                let length = this.wheelList[i].roleIdList.length;
                for (let j = 2; j <= 4; j++) {
                    if (this.wheelList[i].roleIdList[length - j] == 13) {
                        animBool = true;
                        this.wheelList[i].rolePbList[length - j].getComponent(cc.Animation).play('s02_s');
                        let pb = cc.instantiate(this.coinPb);
                        pb.position = cc.v2(posX[i], (4 - j + 2) * 200 - 60);
                        this.coinAnimPr.addChild(pb);
                        pb.runAction(cc.sequence(
                            cc.spawn(cc.moveTo(1, cc.v2(0, 750)), cc.scaleTo(1, 0)),
                            cc.removeSelf()
                        ))
                    }
                }
            }
            // if (animBool) {
            this.scheduleOnce(() => {
                if (rIndex == this.rollIndex) {
                    this.playWinAnim();
                }
                if (!this.auto) {
                    this.slotCtrl.Btn_start.active = true;
                    this.slotCtrl.Btn_stop.active = false;
                }
            }, 1);
            // } else {
            //     this.playWinAnim();
            // }
            if (this.lotteryRes.viewarray.getOpenBox.bFlag) {
                this.bigWinBoo = true;
                this.bigWinTimes = this.lotteryRes.viewarray.getOpenBox.win_list.length;
                this.bigWinResList = this.lotteryRes.viewarray.getOpenBox.win_list;
                this.bigWinCoin = this.lotteryRes.viewarray.getOpenBox.win;
                this.bigWinResultCoin = this.lotteryRes.viewarray.user_score;
                this.startBigWin();
            }
            if (this.lotteryRes.viewarray.getFreeTime.bFlag) {
                if (this.freeTimes == 0) {
                    this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
                    this.audio.playFree();
                    this.scheduleOnce(() => {
                        this.closeShine();
                        this.startFreeGame();
                    }, 5);
                } else {
                    this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
                    this.stopFree = false;
                }
            }
        }
    },

    playWinAnim() {
        //动画结束后自动roll
        let hasWinBool = 0;
        let allLine = [];
        for (let i in this.lotteryRes.viewarray.nWinCards) {
            if (this.lotteryRes.viewarray.nWinCards[i]) {
                allLine.push(i);
            }
        }
        let lines = this.lotteryRes.viewarray.nWinLinesDetail;
        let rIndex = this.rollIndex;
        let list = (this.freeTimes > 0 || this.stopFree) ? [allLine,] : [allLine, ...lines];
        hasWinBool = list.length - 1;
        if (this.lotteryRes.winscore > 0) {
            this.slotCtrl.updateStateNode(3);
            //判断播放金币掉落动画
            if (this.lotteryRes.winscore > BET[this.bet] * BETNUM * 80) { //如果大于80倍赌注，就播放bigFull动画
                this.slotCtrl.playAnim_BigWin(this.lotteryRes.winscore);
                this.slotCtrl.playAnimWin(3, this.lotteryRes.winscore);
            } else if (this.lotteryRes.winscore > BET[this.bet] * BETNUM * 50) {
                this.slotCtrl.playAnim_SuperWin(this.lotteryRes.winscore);
                this.slotCtrl.playAnimWin(2, this.lotteryRes.winscore);
            } else if (this.lotteryRes.winscore > BET[this.bet] * BETNUM * 30) {
                this.slotCtrl.playAnim_BigWin(this.lotteryRes.winscore);
                this.slotCtrl.playAnimWin(1, this.lotteryRes.winscore);
            } else {
                this.slotCtrl.playAnimWin(0, this.lotteryRes.winscore);
            }
        } else {
            this.slotCtrl.updateStateNode(2);
        }
        let animIndex = 0;
        this.schedule(() => {
            if (rIndex == this.rollIndex) {
                this.closeShine();
                for (let i = 0; i < 15; i++) {
                    this.clsoeAnim(i % 5, parseInt(i / 5));
                }
                if (!!!list[animIndex]) {
                    return;
                }
                for (let j in list[animIndex]) {
                    this.showAnim(list[animIndex][j] % 5, parseInt(list[animIndex][j] / 5));
                }
                animIndex++;
            }
        }, 3, list.length, 0.01)


        this.scheduleOnce(() => {
            if (rIndex != this.rollIndex) {//不是当前旋转轮次则跳过后续操作
                return;
            }
            this.slotCtrl.closeBigWin();
            if (this.stopFree) {
                this.stopFree = false;
                this.stopFreeTimes();
                this.closeShine();
                this.auto = false;
            }
            if (this.freeTimes > 0) {
                this.freeTimes--;
                this.slotCtrl.Btn_free.getChildByName('auto_lab').getComponent(cc.Label).string = this.freeTimes;
                if (this.freeTimes == 0) {
                    this.stopFree = true;
                }
                this.auto && this.sendRoll();
            }
            if (rIndex == this.rollIndex) {
                this.auto && this.freeTimes == 0 && this.autoTimes > 0 && this.sendRoll();
            }
        }, hasWinBool > 0 ? hasWinBool * 3 : 1);
    },

    //免费次数有关
    startFreeGame() {
        this.audio.playBgm(1);
        this.freeGameCoin = 0;
        this.auto = false;
        for (let i in this.freeHideNode) {
            this.freeHideNode[i].active = false;
        }

        for (let i in this.wheelList) {
            this.wheelList[i].initWheel();
        }
        this.slotCtrl.Btn_free.active = true;
        this.slotCtrl.Btn_free.getChildByName('auto_lab').getComponent(cc.Label).string = this.freeTimes;
        this.scheduleOnce(() => {
            this.auto = true;
            this.sendRoll();
        }, 2);
    },

    stopFreeTimes() {
        this.audio.playBgm(0);
        for (let i in this.freeHideNode) {
            this.freeHideNode[i].active = true;
        }

        for (let i in this.wheelList) {
            this.wheelList[i].initWheel();
        }
        this.slotCtrl.Btn_free.active = false;
        this.freeTimesNode.active = false;
    },

    //0-5 0-2
    showAnim(cols, index) {
        let length = this.wheelList[cols].roleIdList.length;
        this.wheelList[cols].rolePbList[length - 2 - index].getComponent(cc.Animation).play();
        let nodeList = this.effectAnimPr.children;
        nodeList[cols * 3 + index].active = true;
        nodeList[cols * 3 + index].getComponent(cc.Animation).play();
    },

    clsoeAnim(cols, index) {
        let length = this.wheelList[cols].roleIdList.length;
        let anim = this.wheelList[cols].rolePbList[length - 2 - index].getComponent(cc.Animation);
        //anim.setCurrentTime(0);
        //anim.stop();
        let nodeList = this.effectAnimPr.children;
        nodeList[cols * 3 + index].active = false;
    },

    roll(list) {
        if (!this.auto) {
            this.slotCtrl.Btn_start.active = false;
            this.slotCtrl.Btn_stop.active = true;
        }
        this.status = 1;
        let line = [];
        for (let i = 0; i < 5; i++) {
            line[i] = [];
        }
        for (let i in list) {
            line[i % 5][2 - parseInt(i / 5)] = list[i];
        }
        for (let i in this.wheelList) {
            this.wheelList[i].startRoll(...line[i]);
        }
    },

    closeShine() {
        let nodeList = this.effectAnimPr.children;
        for (let i in nodeList) {
            nodeList[i].active = false;
        }
    },

    sendRoll() {
        this.rollIndex++;
        this.closeShine();
        this.autoTimes = this.autoTimes > 0 ? this.autoTimes - 1 : 0;
        this.slotCtrl.Btn_start.children[0].active = false;
        if (this.freeTimes == 0 && this.autoTimes == 0) {
            this.auto = false;
        }
        this.slotCtrl.Btn_stopAuto.active = this.auto;
        this.slotCtrl.Btn_start.active = !this.auto;
        this.slotCtrl.updateStateNode(1);
        this.slotCtrl.Btn_stopAuto.children[0].getComponent(cc.Label).string = this.autoTimes;
        this.net.socket.emit('lottery', JSON.stringify({
            bet: this.bet,
            nBetList: [BET[this.bet] * BETNUM]
        }));
    },

    stopImmediately() {
        if (!this.auto) {
            for (let i in this.wheelList) {
                this.wheelList[i].stopImmediately();
            }
        }
    },


    //大奖有关
    closeDoorAnim() {
        this.doorNode.active = true;
        let chList = this.doorNode.children;
        this.audio.playCloseDoor();
        for (let i in chList) {
            chList[i].getComponent(cc.Animation).play();
        }

    },

    startBigWin() {
        this.audio.playBgm(3);
        this.auto = false;
        this.node.runAction(cc.sequence(
            cc.callFunc(() => {
                this.caiShenAnim.play();
                this.closeDoorAnim();
            }),
            cc.delayTime(3),
            cc.callFunc(() => {
                this.doorNode.active = false;
                this.caiShenBg.active = true;
                this.caiShenBg.getChildByName('Big_caishen').getComponent(cc.Animation).play();
                this.audio.playCs();
            }),
            cc.delayTime(4),
            cc.callFunc(() => {
                this.caiShenBg.active = false;
                this.bigWinInit();
            })
        ))
    },

    bigWinClick(event, args) {
        if (this.bigWinTimes > 0) {
            let num = this.BigWinSet.size;
            this.BigWinSet.add(args);
            if (num == this.BigWinSet.size) {
                return;
            }
            let winNodePr = this.bigWinNode.children;
            let coinPr = winNodePr[args].children;
            this.bigWinTimes--;
            let coinNode = coinPr[0];
            coinNode.getComponent(cc.Animation).play();
            let index = this.bigWinResList[this.bigWinTimes];
            console.log(index, this.bigWinTimes);
            this.scheduleOnce(() => {
                let nameList = {
                    30: 's_show_mini',
                    50: 's_show_minor',
                    100: 's_show_major',
                    1000: 's_show_grand'
                }
                let nd = winNodePr[args].getChildByName(nameList[index]);
                nd.active = true;
                nd.getComponent(cc.Animation).play();
            }, 0.5);
            if (this.bigWinTimes == 0) {
                this.scheduleOnce(() => {
                    this.audio.playBW();
                    this.bigWinResultAnim.node.active = true;
                    this.slotCtrl.lblUserCoin.string = Helper.fixNum(this.bigWinResultCoin);
                    this.slotCtrl.winCoin_lab.string = Helper.fixNum(this.bigWinCoin);
                    this.bigWinResultAnim.node.getChildByName('gold').getComponent(cc.Label).string = (this.bigWinCoin / this.playerInfo.exchangeRate).toFixed(2);
                    this.bigWinResultAnim.play();
                    this.bigWinBoo = false;
                }, 2);
            }
        }
    },

    bigWinInit() {
        this.audio.playBgm(2);
        this.BigWinSet = new Set();
        this.bigWinNode.active = true;
        let pr = this.bigWinNode.children;
        for (let i in pr) {
            let pr1 = pr[i].children;
            for (let j in pr1) {
                pr1[j].active = j == 0;
            }
        }
    },

    setPool(coin) {
        this.slotCtrl.jackpot_lab.string = Helper.fixNum(coin);
    },

    refreshPool(coin) {
        this.slotCtrl.jackpot_lab.string = Helper.fixNum(coin);
    },

});