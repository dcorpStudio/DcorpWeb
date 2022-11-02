const BETNUM = 150; //单注值
const LINES = 15; //线数
const TOPBET = [30, 1000, 100, 10];
const BET = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const RULELIST = [2, 0.2, 0.1, 1, 0.2, 0.1, 0.4, 0.1, 0.05, 0.4, 0.1, 0.05, 0.4, 0.1, 0.05, 0.4, 0.1, 0.05, 3, 0.6, 0.2]; //规则
cc.Class({
    extends: cc.Component,

    properties: {
        spUserFace: {
            default: null,
            type: cc.Sprite,
            displayName: '用户头像',
        },
        lblUserName: {
            default: null,
            type: cc.Label,
            displayName: '用户名',
        },
        lblUserCoin: {
            default: null,
            type: cc.Label,
            displayName: '用户金币',
        },
        lblBet: {
            default: null,
            type: cc.Label,
            displayName: '单注',
        },
        lblLines: {
            default: null,
            type: cc.Label,
            displayName: '线数',
        },
        lblCurBet: {
            default: null,
            type: cc.Label,
            displayName: '本局总注',
        },
        lblWinCoin: {
            default: null,
            type: cc.Label,
            displayName: '本局赢得',
        },
        lblCoinList: {
            default: [],
            type: cc.Label,
            displayName: '列倍率显示',
        },
        rollBtnAnim: {
            default: null,
            type: cc.Animation,
            displayName: 'roll按钮动画',
        },
        rolePb: {
            default: [],
            type: cc.Prefab,
            displayName: '滚轮角色Pb',
        },
        spAtlas: {
            default: null,
            type: cc.SpriteAtlas,
            displayName: '图集',
        },
        autoBtn: {
            default: null,
            type: cc.Sprite,
            displayName: '自动按钮Sprite',
        },
        effectAnimPr: {
            default: null,
            type: cc.Node,
            displayName: '中奖特效',
        },

        bigWinNode: {
            default: null,
            type: cc.Node,
            displayName: '大奖节点',
        },

        bigWinResultAnim: {
            default: null,
            type: cc.Node,
            displayName: 'bigWin中奖'
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

        audioBtn: {
            default: null,
            type: cc.Sprite,
            displayName: '声音按钮',
        }
    },

    onLoad() {
        this.playerInfo = require("PlayerInfo").getInstant;
        this.net = this.node.getComponent('DiamondNetwork');
        this.audio = this.node.getComponent('DiamondAudio');
        this.wheelList = [];
        this.bet = 0;
        this.auto = false;
        this.status = 0;
        this.bigWinResList = [3, 1, 2];
        this.bigWinCard = 0;
        this.bigWinCoin = 0;
        this.bigWinBoo = false;
        this.freeTimes = 0;
        this.rollResult = [];
        this.rollIndex = 0;
        this.lotteryRes = null;
        this.stopFree = false;
        this.bIsFreeGame = false;
        this.delayClick = false;
        this.turnNum = 0;
    },

    start() {
        this.lblLines.string = LINES;
        this.lblWinCoin.string = '0.00';
        this.setBet();
        Helper.loadHead(this.playerInfo.playerHeadId, sp => {
            this.spUserFace.spriteFrame = sp;
        });
        this.lblUserName.string = this.playerInfo.playerName;
        this.lblUserCoin.string = this.playerInfo.playerCoin.toFixed(2);
    },

    onCLick(event, args) {
        if (args == 'auto') {
            if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.delayClick) {
                return;
            }
            this.auto = !this.auto;
            this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.auto ? 'btn_tingzhi' : 'btn_zidong');
            if (this.auto && this.status == 0) {
                this.sendRoll();
            }
        } else if (args == 'roll') {
            if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.delayClick) {
                return;
            }
            if (!this.auto) {
                if (this.status == 0) {
                    this.rollBtnAnim.play();
                    this.status = 2;
                    this.sendRoll();
                } else if (this.status == 1) {
                    if (this.lotteryRes.viewarray.getFreeTime.bFlag) {
                        return;
                    }
                    this.delayClick = true;
                    this.scheduleOnce(() => {
                        this.delayClick = false;
                    }, 1);
                    this.stopImmediately();
                }
            }
        } else if (args == 'add') {
            if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto) {
                return;
            }
            this.bet += 1;
            this.bet = this.bet >= BET.length ? BET.length - 1 : this.bet;
            this.setBet();
        } else if (args == 'dec') {
            if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto) {
                return;
            }
            this.bet -= 1;
            this.bet = this.bet >= 0 ? this.bet : 0;
            this.setBet();
        } else if (args == 'closeBigWin') {
            this.bigWinResultAnim.active = false;
            this.bigWinNode.active = false;
            this.audio.playBgm(0);
        } else if (args == 'help') {
            this.helpUI.active = true;
            let hr = this.helpNum.children;
            for (let i in hr) {
                hr[i].getComponent(cc.Label).string = (RULELIST[i] * BET[this.bet]).toFixed(2);
            }
        } else if (args == 'closeHelp') {
            this.helpUI.active = false;
        } else if (args == 'exitGame') {
            this.net.socket.disconnect();
            cc.director.loadScene(window.hallName);
        } else if (args == 'audio') {
            this.audio.pInfo.musicControl = !this.audio.pInfo.musicControl;
            this.audioBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.audio.pInfo.musicControl ? 'btn_sound' : 'btn_sound_2');
            if (!this.audio.pInfo.musicControl) {
                this.audio.stopAudio();
            } else {
                if (this.freeTimes > 0) {
                    this.audio.playBgm(1);
                } else if (this.bigWinBoo) {
                    this.audio.playBgm(2);
                } else {
                    this.audio.playBgm(0);
                }
            }
        }
    },

    setBet() {
        this.lblBet.string = (BETNUM / this.playerInfo.exchangeRate).toFixed(2);
        this.lblCurBet.string = (BET[this.bet] * BETNUM / this.playerInfo.exchangeRate).toFixed(2);
        for (let i in this.lblCoinList) {
            this.lblCoinList[i].string = (TOPBET[i] * (this.bet + 1) * BETNUM / this.playerInfo.exchangeRate).toFixed(2);
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
            this.lblUserCoin.string = (this.lotteryRes.userscore / this.playerInfo.exchangeRate).toFixed(2);
            this.lblWinCoin.string = (this.lotteryRes.winscore / this.playerInfo.exchangeRate).toFixed(2);
            this.scheduleOnce(() => {
                if (rIndex == this.rollIndex) {
                    this.playWinAnim();
                }
            }, 1);
            if (this.lotteryRes.viewarray.getOpenBox.bFlag) {
                this.bigWinBoo = true;
                this.bigWinTimes = this.lotteryRes.viewarray.getOpenBox.win_list.length;
                this.bigWinResList = this.lotteryRes.viewarray.getOpenBox.win_list;
                this.bigWinCard = this.lotteryRes.viewarray.getOpenBox.win_card;
                this.bigWinCoin = this.lotteryRes.viewarray.getOpenBox.win;
                this.bigWinResultCoin = this.lotteryRes.viewarray.user_score;
                this.scheduleOnce(() => {
                    this.startBigWin();
                }, 2);

            }
            if (this.lotteryRes.viewarray.getFreeTime.bFlag) {
                if (this.freeTimes == 0) {
                    this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
                    this.scheduleOnce(() => {
                        this.closeShine();
                        this.startFreeGame();
                    }, 5);
                } else {
                    this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
                    this.stopFree = false;
                }
            } else {
                this.scheduleOnce(() => {
                    if (rIndex == this.rollIndex) {
                        this.turnNum += 1;
                        this.playWinAnim(this.turnNum);
                    }
                }, 1);
            }
        }
    },

    playWinAnim(tm) {
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
        }, 3, list.length, 0.01);


        this.scheduleOnce(() => {
            if (tm != this.turnNum) {//不是当前旋转轮次则跳过后续操作
                return;
            }
            if (this.stopFree) {
                this.stopFree = false;
                this.stopFreeTimes();
                this.closeShine();
                this.auto = false;
            }
            if (this.freeTimes > 0) {
                this.freeTimes--;
                this.freeTimesNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = this.freeTimes;
                if (this.freeTimes == 0) {
                    this.stopFree = true;
                }
                this.auto && this.sendRoll();
            }
            if (rIndex == this.rollIndex) {
                this.auto && this.freeTimes == 0 && this.sendRoll();
            }
        }, hasWinBool > 0 ? hasWinBool * 3 : 1);
    },

    //免费次数有关
    startFreeGame() {
        this.audio.playBgm(1);
        this.auto = false;
        this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.auto ? 'btn_tingzhi' : 'btn_zidong');
        this.BgNode.active = false;
        this.bIsFreeGame = true;
        this.freeBgNode.active = true;

        for (let i in this.wheelList) {
            this.wheelList[i].initWheel();
        }
        this.freeTimesNode.active = true;
        this.freeTimesNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = this.freeTimes;
        // this.scheduleOnce(() => {
        this.auto = true;
        this.sendRoll();
        // }, 2);
    },

    stopFreeTimes() {
        this.audio.playBgm(0);

        for (let i in this.wheelList) {
            this.wheelList[i].initWheel();
        }
        this.freeTimesNode.active = false;
        this.BgNode.active = true;
        this.freeBgNode.active = false;
        this.bIsFreeGame = false;
    },

    //0-5 0-2
    showAnim(cols, index) {
        this.audio.playBW();
        let length = this.wheelList[cols].roleIdList.length;
        this.wheelList[cols].rolePbList[length - 2 - index].getComponent(cc.Animation).play();
        let nodeList = this.effectAnimPr.children;
        nodeList[cols * 3 + index].active = true;
        nodeList[cols * 3 + index].getComponent(cc.Animation).play();
    },

    clsoeAnim(cols, index) {
        let length = this.wheelList[cols].roleIdList.length;
        let anim = this.wheelList[cols].rolePbList[length - 2 - index].getComponent(cc.Animation);
        anim.setCurrentTime(0);
        anim.stop();
        let nodeList = this.effectAnimPr.children;
        nodeList[cols * 3 + index].active = false;
    },

    roll(list) {
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
        this.auto = false;
        this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.auto ? 'btn_tingzhi' : 'btn_zidong');
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

    bigWinClick(event, args) {
        if (this.bigWinTimes > 0) {
            let num = this.BigWinSet.size;
            this.BigWinSet.add(args);
            if (num == this.BigWinSet.size) {
                return;
            }
            let winNodePr = this.bigWinNode.children;
            this.bigWinTimes--;
            let index = this.bigWinResList[this.bigWinTimes];
            let nameList = {
                10: 's_bonus_diamond_mini',
                30: 's_bonus_diamond_minor',
                100: 's_bonus_diamond_major',
                1000: 's_bonus_diamond_mega'
            }
            let nd = winNodePr[args].getChildByName(nameList[index]);
            this.scheduleOnce(() => {
                nd.active = true;
                nd.getComponent(cc.Animation).play();
            }, 0.5);
            if (this.bigWinTimes == 0) {
                this.scheduleOnce(() => {
                    this.bigWinResultAnim.active = true;
                    this.lblUserCoin.string = (this.bigWinResultCoin / this.playerInfo.exchangeRate).toFixed(2);
                    this.lblWinCoin.string = (this.bigWinCoin / this.playerInfo.exchangeRate).toFixed(2);
                    this.bigWinResultAnim.getChildByName('coin').getComponent(cc.Label).string = (this.bigWinCoin / this.playerInfo.exchangeRate).toFixed(2);
                    let lt = [10, 30, 100, 1000];
                    for (let i in lt) {
                        this.bigWinResultAnim.getChildByName('' + lt[i]).active = this.bigWinCard == lt[i];
                    }
                    this.bigWinBoo = false;
                }, 2);
            }
        }
    },
});