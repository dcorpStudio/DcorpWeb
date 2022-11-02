const BETNUM = 90; //单注值
const LINES = 9; //线数
const BET = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
cc.Class({
    extends: cc.Component,

    properties: {
        rolePb: {
            default: [],
            type: cc.Prefab,
            displayName: '滚轮角色Pb',
        },
        roleMiniPb: {
            default: [],
            type: cc.Prefab,
            displayName: 'mini游戏滚轮角色Pb',
        },
        winLineNode: {
            default: null,
            type: cc.Node,
            displayName: '中奖线',
        },

        bigWinNode: {
            default: null,
            type: cc.Node,
            displayName: '大奖节点',
        },

        BgNode: {
            default: null,
            type: cc.Node,
            displayName: '游戏背景节点',
        },

        //免费次数有关
        freeBgNode: {
            default: null,
            type: cc.Node,
            displayName: '免费摇奖背景节点',
        },

        freeEndNode: {
            default: null,
            type: cc.Node,
            displayName: '结束免费摇奖节点',
        },

        helpUI: {
            default: null,
            type: cc.Node,
            displayName: 'help界面',
        },

    },

    onLoad() {
        this.playerInfo = require("PlayerInfo").getInstant;
        this.net = this.node.getComponent('SGXMLNetwork');
        this.audio = this.node.getComponent('SGXMLAudio');
        this.slotCtrl = cc.find("Canvas/Slot_Control_03").getComponent('slot_Ctrl'); //newSlot
        this.slotCtrl.init(this); //newSlot
        this.wheelList = [];
        this.miniWheelList = [];
        this.bet = 0;
        this.auto = false;
        this.autoTimes = 0;
        this.status = 0;
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
        this.roundOldIndex = 0;//minigame用
        this.roundNowIndex = 0;//minigame用
        this.castTime = 0;//minigame用
        this.allSteps = 0;//minigame用
        this.nowStep = 0;//minigame用
        this.miniGameScore = 0;//minigame用
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
        this.audio.playClick();
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
                this.bigWinNode.active = false;
                this.audio.playBgm(0);
                break;
            case "help":
                this.helpUI.active = true;
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
            if (this.bIsFreeGame) {
                this.freeGameCoin += this.lotteryRes.winscore;
            }
            this.scheduleOnce(() => {
                if (rIndex == this.rollIndex) {
                    this.playWinAnim();
                }
                if (!this.auto) {
                    this.slotCtrl.Btn_start.active = true;
                    this.slotCtrl.Btn_stop.active = false;
                }
            }, 1);
            if (this.lotteryRes.viewarray.getOpenBox.bFlag) {
                this.bigWinBoo = true;
                this.bigWinCoin = this.lotteryRes.viewarray.getOpenBox.win;
                this.bigWinResultCoin = this.lotteryRes.viewarray.user_score;
                this.scheduleOnce(() => {
                    this.startBigWin();
                }, 2);
            }
            if (this.lotteryRes.viewarray.getFreeTime.bFlag) {
                if (this.freeTimes == 0) {
                    this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
                    this.auto = false;
                    this.autoTimes = 0;
                    this.scheduleOnce(() => {
                        this.closeShine();
                        this.startFreeGame();
                    }, 2);
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
        let list = (this.freeTimes > 0 || this.stopFree) ? [allLine] : [allLine, ...lines];
        hasWinBool = list.length - 1;
        if (this.lotteryRes.winscore > 0) {
            this.slotCtrl.updateStateNode(3);
            //判断播放金币掉落动画
            if (this.lotteryRes.winscore > BET[this.bet] * BETNUM * 80) { //如果大于80倍赌注，就播放bigFull动画
                this.audio.playBW();
                this.slotCtrl.playAnim_BigWin(this.lotteryRes.winscore);
                this.slotCtrl.playAnimWin(3, this.lotteryRes.winscore);
            } else if (this.lotteryRes.winscore > BET[this.bet] * BETNUM * 50) {
                this.audio.playBW();
                this.slotCtrl.playAnim_SuperWin(this.lotteryRes.winscore);
                this.slotCtrl.playAnimWin(2, this.lotteryRes.winscore);
            } else if (this.lotteryRes.winscore > BET[this.bet] * BETNUM * 30) {
                this.audio.playBW();
                this.slotCtrl.playAnim_BigWin(this.lotteryRes.winscore);
                this.slotCtrl.playAnimWin(1, this.lotteryRes.winscore);
            } else {
                this.audio.playWin();
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
                    this.closeAnim(i % 5, parseInt(i / 5));
                }
                if (!!!list[animIndex] || list[animIndex].length == 0) {
                    return;
                }

                let linelist = this.lotteryRes.viewarray.nWinLines;
                if (animIndex == 0) {
                    for (let i = 0; i < linelist.length; i++) {
                        this.winLineNode.children[linelist[i]].active = true;
                    }
                } else {
                    this.winLineNode.children[linelist[animIndex - 1]].active = true;
                }
                this.audio.playWinLine();
                for (let j in list[animIndex]) {
                    this.showAnim(list[animIndex][j] % 5, parseInt(list[animIndex][j] / 5));
                }
                animIndex++;
            }
        }, 3, list.length, 0.01);


        this.scheduleOnce(() => {
            this.slotCtrl.closeBigWin();
            if (this.stopFree) {
                this.stopFree = false;
                this.stopFreeTimes();
                this.closeShine();
            }
            if (this.freeTimes > 0) {
                this.freeTimes--;
                this.slotCtrl.Btn_free.getChildByName('auto_lab').getComponent(cc.Label).string = this.freeTimes;
                if (this.freeTimes == 0) {
                    this.stopFree = true;
                }
                if (rIndex == this.rollIndex) {
                    this.auto && this.sendRoll();
                }
            }
            if (rIndex == this.rollIndex) {
                this.auto && this.freeTimes == 0 && this.autoTimes > 0 && this.sendRoll();
            }
        }, hasWinBool > 0 ? hasWinBool * 3 : 1);
    },

    //免费次数有关
    startFreeGame() {
        console.log("startFreeGame");
        this.audio.playBgm(1);
        this.freeGameCoin = 0;
        this.BgNode.active = false;
        this.bIsFreeGame = true;
        this.freeBgNode.active = true;

        for (let i in this.wheelList) {
            this.wheelList[i].initWheel();
        }
        this.freeTimes--;
        this.slotCtrl.Btn_free.active = true;
        this.slotCtrl.Btn_free.getChildByName('auto_lab').getComponent(cc.Label).string = this.freeTimes;
        if (this.freeTimes == 0) {
            this.stopFree = true;
        }
        this.scheduleOnce(() => {
            this.auto = true;
            this.sendRoll();
        }, 1);
    },

    stopFreeTimes() {
        console.log("stopFreeTimes freeGameCoin : ", this.freeGameCoin);
        this.audio.playBgm(0);
        this.auto = false;

        for (let i in this.wheelList) {
            this.wheelList[i].initWheel();
        }
        this.slotCtrl.Btn_free.active = false;
        this.freeEndNode.active = true;
        this.freeEndNode.getChildByName("lbl_coin").getComponent(cc.Label).string = Helper.fixNum(this.freeGameCoin);
        this.scheduleOnce(() => {
            this.freeEndNode.active = false;
            this.BgNode.active = true;
            this.freeBgNode.active = false;
            this.bIsFreeGame = false;
        }, 2);

    },

    //0-5 0-2
    showAnim(cols, index) {
        let length = this.wheelList[cols].roleIdList.length;
        this.wheelList[cols].rolePbList[length - 2 - index].getComponent("TempAnimation").playAnim();
    },

    closeAnim(cols, index) {
        let length = this.wheelList[cols].roleIdList.length;
        this.wheelList[cols].rolePbList[length - 2 - index].getComponent("TempAnimation").stopAnim();
    },

    checkRollData(list) {
        for (const iterator of list) {
            if (iterator >= this.rolePb.length) {
                return false;
            }
        }
        return true;
    },

    roll(list) {
        if (!this.checkRollData(list)) {
            alert(`
            服务器获取的花色种类大于现有的花色种类！！！
            请联系服务器人员进行数据调整！`
            );
            return;
        }
        if (!this.auto) {
            this.slotCtrl.Btn_start.active = false;
            this.slotCtrl.Btn_stop.active = true;
        }
        this.audio.playStartWheel();
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
        let list = this.winLineNode.children;
        for (let i = 0; i < list.length; i++) {
            list[i].active = false;
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

    //开始mini游戏
    startMiniGame(event, customentData) {
        this.bigWinNode.getChildByName("startNode").active = false;
        this.bigWinNode.getChildByName("img_CiShu_0").getChildByName("label").getComponent(cc.Label).string = this.lotteryRes.viewarray.getOpenBox.cishu;
        this.bigWinNode.getChildByName("img_ZongYa_0").getChildByName("label").getComponent(cc.Label).string = (this.lotteryRes.viewarray.getOpenBox.chouma / this.playerInfo.exchangeRate).toFixed(2);
        this.bigWinNode.getChildByName("img_DeFen_0").getChildByName("label").getComponent(cc.Label).string = this.miniGameScore.toFixed(2);
        this.bigWinNode.getChildByName("img_ChouMa_0").getChildByName("label").getComponent(cc.Label).string = (this.miniGameScore / this.playerInfo.exchangeRate).toFixed(2);
        if (this.lotteryRes.viewarray.getOpenBox.gameList.length > 0) {
            let list = this.lotteryRes.viewarray.getOpenBox.gameList.shift();
            let round = this.lotteryRes.viewarray.getOpenBox.roundList.shift();
            let tempScore = this.lotteryRes.viewarray.getOpenBox.scoreList.shift();
            for (let i in this.miniWheelList) {
                this.miniWheelList[i].initWheel();
            }
            this.miniGameScore += tempScore;
            this.startMiniGameRoll(list, round);
        } else {
            this.audio.playBgm(0);
            this.bigWinNode.active = false;
            this.bigWinBoo = false;
            this.roundOldIndex = 0;
            this.miniGameScore = 0;
            this.lblUserCoin.string = (this.bigWinResultCoin / this.playerInfo.exchangeRate).toFixed(2);
            this.lblWinCoin.string = (this.bigWinCoin / this.playerInfo.exchangeRate).toFixed(2);
            let lightNode = this.bigWinNode.getChildByName("light");
            for (let i = 1; i < 25; i++) {
                lightNode.getChildByName("" + i).active = false;
            }
        }
    },

    startMiniGameRoll(data, round) {
        for (let i in this.miniWheelList) {
            this.miniWheelList[i].startRoll(data[i]);
        }
        let roundArray = [6, 5, 0, 7,
            6, 2, 1, 3, 4, 7,
            2, 0, 1, 4, 5, 7,
            6, 0, 3, 4, 5, 7,
            2, 3];
        if (round == 3 || round == 9 || round == 15 || round == 21) {
            this.lotteryRes.viewarray.getOpenBox.cishu--;
        }
        let oldIndex = this.roundOldIndex;
        this.roundNowIndex = this.roundOldIndex;
        this.roundOldIndex = round;
        let lightNode = this.bigWinNode.getChildByName("light");
        lightNode.getChildByName("" + (this.roundNowIndex + 1)).active = true;
        oldIndex = this.oldIndexAdd(oldIndex);
        oldIndex = this.oldIndexAdd(oldIndex);
        oldIndex = this.oldIndexAdd(oldIndex);
        this.allSteps = 3;
        this.nowStep = 1;
        let endIndex = round - 7;
        if (endIndex < 0) {
            endIndex += 24;
        }
        let count = 0;
        while (true) {
            oldIndex = this.oldIndexAdd(oldIndex);
            this.allSteps++;
            if (oldIndex == endIndex) {
                count++;
            }
            if (count == 2) {
                break;
            }
        }
        this.allSteps += 7;
        this.schedule(this.scheduleFun, 0.02);
    },

    scheduleFun(dt) {
        this.castTime += dt;
        if (this.nowStep == 1) {
            if (this.castTime > 0.4) {
                this.doStep();
            }
        } else if (this.nowStep == 2) {
            if (this.castTime > 0.3) {
                this.doStep();
            }
        } else if (this.nowStep == 3) {
            if (this.castTime > 0.1) {
                this.doStep();
            }
        } else if (this.nowStep > 3 && this.nowStep <= this.allSteps - 7) {
            this.doStep();
        } else {
            if (this.castTime > (0.03 + (this.nowStep + 7 - this.allSteps) * 0.03)) {
                this.doStep();
                if (this.nowStep > this.allSteps) {
                    this.bigWinNode.getChildByName("img_DeFen_0").getChildByName("label").getComponent(cc.Label).string = this.miniGameScore.toFixed(2);
                    this.bigWinNode.getChildByName("img_ChouMa_0").getChildByName("label").getComponent(cc.Label).string = (this.miniGameScore / this.playerInfo.exchangeRate).toFixed(2);
                    this.bigWinNode.getChildByName("img_CiShu_0").getChildByName("label").getComponent(cc.Label).string = this.lotteryRes.viewarray.getOpenBox.cishu;
                    this.scheduleOnce(() => {
                        this.startMiniGame();
                    }, 2);
                    this.unschedule(this.scheduleFun);
                }
            }
        }
    },

    doStep() {
        let lightNode = this.bigWinNode.getChildByName("light");
        lightNode.getChildByName("" + (this.roundNowIndex + 1)).active = false;
        this.roundNowIndex = this.oldIndexAdd(this.roundNowIndex);
        lightNode.getChildByName("" + (this.roundNowIndex + 1)).active = true;
        this.castTime = 0;
        this.nowStep++;
    },

    oldIndexAdd(index) {
        index++;
        if (index > 23) {
            index = 0;
        }
        return index;
    },

    startBigWin() {
        this.audio.playBgm(2);
        this.auto = false;
        this.slotCtrl.Btn_stopAuto.active = this.auto;
        this.slotCtrl.Btn_start.active = !this.auto;
        this.bigWinNode.active = true;
        this.bigWinNode.getChildByName("startNode").active = true;
    },

    setPool(coin) {
        this.slotCtrl.jackpot_lab.string = Helper.fixNum(coin);
    },

    refreshPool(coin) {
        this.slotCtrl.jackpot_lab.string = Helper.fixNum(coin);
    },
});