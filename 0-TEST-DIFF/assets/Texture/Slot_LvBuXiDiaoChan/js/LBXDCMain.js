const BETNUM = 250; //单注值
const LINES = 25; //线数
const BET = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
cc.Class({
    extends: cc.Component,

    properties: {

        rolePb: {
            default: [],
            type: cc.Prefab,
            displayName: '滚轮角色Pb',
        },

        effectAnimPr: {
            default: null,
            type: cc.Node,
            displayName: '中奖特效',
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
        freeBeginNode: {
            default: null,
            type: cc.Node,
            displayName: '开始免费摇奖节点',
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
        _showBtnAnimTime: 0,
    },

    onLoad() {
        this.playerInfo = require("PlayerInfo").getInstant;
        this.net = this.node.getComponent('LBXDCNetwork');
        this.audio = this.node.getComponent('LBXDCAudio');
        this.slotCtrl = cc.find("Canvas/Slot_Control_03").getComponent('slot_Ctrl'); //newSlot
        this.slotCtrl.init(this); //newSlot
        this.wheelList = [];
        this.bet = 0;
        this.auto = false;
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
                this.bigWinResultAnim.active = false;
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
            let freeFlag = this.lotteryRes.viewarray.getFreeTime.bFlag
            this.scheduleOnce(() => {
                if (rIndex == this.rollIndex) {
                    this.playWinAnim(freeFlag);
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
                    this.closeShine();
                    this.startFreeGame();
                    this.scheduleOnce(() => {
                        this.node.getChildByName("fire").active = false;
                        this.freeBeginNode.active = true;
                    }, 3);
                } else {
                    this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
                    this.stopFree = false;
                }
            }
        }
    },

    playWinAnim(freeTimeFlag) {
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
                    this.closeAnim(i % 5, parseInt(i / 5));
                }
                if (!!!list[animIndex]) {
                    return;
                }
                for (let j in list[animIndex]) {
                    // this.showAnim(list[animIndex][j] % 5, parseInt(list[animIndex][j] / 5));//修改
                    this.showAnim(list[animIndex][j] % 5, parseInt(list[animIndex][j] / 5), this.lotteryRes.viewarray.fMultiple);
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
            if (this.freeTimes > 0 && !freeTimeFlag) {
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
        }, hasWinBool > 0 ? hasWinBool * 3 : 2);
    },

    //免费次数有关
    startFreeGame() {
        console.log("startFreeGame");
        this.audio.playBgm(1);
        this.freeGameCoin = 0;
        this.BgNode.active = false;
        this.bIsFreeGame = true;
        this.freeBgNode.active = true;
        this.node.getChildByName("fire").active = true;
        this.node.getChildByName("fire").getComponent(sp.Skeleton).setAnimation(0, "animation", false);
    },
    //选择游戏
    chooseGame(event, customentData) {
        this.net.socket.emit('chooseGame', JSON.stringify({
            choose: customentData,
        }));
    },
    //选择后开始免费
    sendFree() {
        for (let i in this.wheelList) {
            this.wheelList[i].initWheel();
        }
        this.freeBeginNode.active = false;
        this.slotCtrl.Btn_free.active = true;
        this.slotCtrl.Btn_free.getChildByName('auto_lab').getComponent(cc.Label).string = this.freeTimes;
        this.auto = true;
        this.sendRoll();
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
        for (let i = 1; i <= 5; i++) {
            this.node.getChildByName("Game_main").getChildByName("MASK").getChildByName("line" + i).opacity = 255;
            this.node.getChildByName("Game_main").getChildByName("ice" + i).active = false;
        }
    },

    //0-5 0-2
    showAnim(cols, index, beishu) {
        this.audio.playBW();
        let length = this.wheelList[cols].roleIdList.length;
        this.wheelList[cols].rolePbList[length - 2 - index].getComponent("TempAnimation").playAnim();
        //添加
        if (this.wheelList[cols].rolePbList[length - 2 - index].getChildByName("beishu") && beishu > 1) {
            this.wheelList[cols].rolePbList[length - 2 - index].getChildByName("beishu").active = true;
            this.wheelList[cols].rolePbList[length - 2 - index].getChildByName("beishu").getComponent(cc.Label).string = "x" + beishu;
        }
        //添加结束
        let nodeList = this.effectAnimPr.children;
        nodeList[cols * 3 + index].active = true;
        nodeList[cols * 3 + index].getComponent(cc.Animation).play();
    },

    closeAnim(cols, index) {
        let length = this.wheelList[cols].roleIdList.length;
        this.wheelList[cols].rolePbList[length - 2 - index].getComponent("TempAnimation").stopAnim();
        //添加
        if (this.wheelList[cols].rolePbList[length - 2 - index].getChildByName("beishu")) {
            this.wheelList[cols].rolePbList[length - 2 - index].getChildByName("beishu").active = false;
        }
        //添加结束
        let nodeList = this.effectAnimPr.children;
        nodeList[cols * 3 + index].active = false;
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
        if (this.slotCtrl.Btn_free.active) {//吕布模式 有一列全是wild就冻结住
            for (let i = 1; i <= 5; i++) {
                if (list[i - 1] == 10 &&
                    list[i + 4] == 10 &&
                    list[i + 9] == 10) {
                    this.node.getChildByName("Game_main").getChildByName("MASK").getChildByName("line" + i).opacity = 0;
                    this.node.getChildByName("Game_main").getChildByName("ice" + i).active = true;
                }
            }
        } else {
            for (let i = 1; i <= 5; i++) {
                this.node.getChildByName("Game_main").getChildByName("MASK").getChildByName("line" + i).opacity = 255;
                this.node.getChildByName("Game_main").getChildByName("ice" + i).active = false;
            }
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

    startBigWin() {
        this.audio.playBgm(2);
        this.bigWinNode.active = true;
        this.bigWinNode.getChildByName("slots_minigame_wheel").rotation = 0;
        this.bigWinNode.getChildByName("slots_minigame_wheel_pintu").rotation = 0;
        let suipianArray = this.lotteryRes.viewarray.getOpenBox.nWinOpenBox;
        this.bigWinNode.getChildByName("slots_minigame_wheel").active = false;
        this.bigWinNode.getChildByName("slots_minigame_wheel_pintu").active = true;
        for (let j = 1; j <= 6; j++) {
            this.bigWinNode.getChildByName("slots_minigame_wheel_pintu").getChildByName("slots_pintu" + j).active = false;
            this.bigWinNode.getChildByName("slots_minigame_icon").getChildByName("slots_minigame_icon_piece" + j).active = false;
        }
        for (let i = 0; i < suipianArray.length; i++) {
            this.bigWinNode.getChildByName("slots_minigame_wheel_pintu").getChildByName("slots_pintu" + suipianArray[i]).active = true;
            this.bigWinNode.getChildByName("slots_minigame_icon").getChildByName("slots_minigame_icon_piece" + suipianArray[i]).active = true;
        }
        this.bigWinNode.getChildByName("slots_minigame_btn_begin").getChildByName("slots_minigame_btn_piece").active = true;
    },

    bigWinBegin(event, customentData) {
        this.bigWinNode.getChildByName("slots_minigame_btn_begin").getComponent(cc.Button).interactable = false;
        if (this.bigWinNode.getChildByName("slots_minigame_btn_begin").getChildByName("slots_minigame_btn_piece").active) {
            let tempWheel = this.bigWinNode.getChildByName("slots_minigame_wheel_pintu");
            let tempDu = 0;
            let location = this.lotteryRes.viewarray.getOpenBox.location;
            switch (location) {
                case 1:
                    tempDu = 360;
                    break;
                case 2:
                    tempDu = 300;
                    break;
                case 3:
                    tempDu = 240;
                    break;
                case 4:
                    tempDu = 180;
                    break;
                case 5:
                    tempDu = 120;
                    break;
                case 6:
                    tempDu = 60;
                    break;
            }
            tempWheel.runAction(cc.sequence(cc.rotateBy(0.5, 360),
                cc.rotateBy(2.5, 360 + tempDu).easing(cc.easeOut(5)),
                cc.callFunc(() => {
                    this.bigWinNode.getChildByName("slots_minigame_wheel_pintu").getChildByName("slots_pintu" + location).active = true;
                    this.bigWinNode.getChildByName("slots_minigame_icon").getChildByName("slots_minigame_icon_piece" + location).active = true;
                }),
                cc.delayTime(1),
                cc.callFunc(() => {
                    this.bigWinNode.getChildByName("slots_minigame_btn_begin").getComponent(cc.Button).interactable = true;
                    this.bigWinNode.getChildByName("slots_minigame_btn_begin").getChildByName("slots_minigame_btn_piece").active = false;
                    if (this.bigWinCoin > 0) {
                        this.bigWinNode.getChildByName("slots_minigame_wheel").active = true;
                        this.bigWinNode.getChildByName("slots_minigame_wheel_pintu").active = false;
                    } else {
                        this.bigWinBoo = false;
                        this.audio.playBgm(0);
                        this.bigWinNode.active = false;
                    }
                })
            ));
        } else {
            this.bigWinBoo = false;
            let tempWheel = this.bigWinNode.getChildByName("slots_minigame_wheel");
            let tempDu = 0;
            switch (this.bigWinCoin) {
                case 2000000:
                    tempDu = 120;
                    break;
                case 10000000:
                    tempDu = 60;
                    break;
                case 1000000:
                    tempDu = 180;
                    break;
                case 500000:
                    tempDu = 240;
                    break;
                case 200000:
                    tempDu = 300;
                    break;
                case 50000:
                    tempDu = 360;
                    break;
            }
            tempWheel.runAction(cc.sequence(cc.rotateBy(0.5, 360),
                cc.rotateBy(2.5, 360 + tempDu).easing(cc.easeOut(5)),
                cc.delayTime(1),
                cc.callFunc(() => {
                    this.bigWinNode.getChildByName("slots_minigame_btn_begin").getComponent(cc.Button).interactable = true;
                    this.audio.playBgm(0);
                    this.bigWinNode.active = false;
                    this.bigWinResultAnim.active = true;
                    this.bigWinResultAnim.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(() => {
                        this.bigWinResultAnim.active = false;
                    })));
                    this.lblUserCoin.string = (this.bigWinResultCoin / 100).toFixed(2);
                    this.lblWinCoin.string = (this.bigWinCoin / 100).toFixed(2);
                    this.bigWinResultAnim.getChildByName('lbl_coin ').getComponent(cc.Label).string = (this.bigWinCoin / 100).toFixed(2);;
                })
            ));
        }
    },

    setPool(coin) {
        this.slotCtrl.jackpot_lab.string = Helper.fixNum(coin);
    },

    refreshPool(coin) {
        this.slotCtrl.jackpot_lab.string = Helper.fixNum(coin);
    },

});