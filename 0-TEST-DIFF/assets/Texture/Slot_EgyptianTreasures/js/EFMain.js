const BETNUM = 200; //单注值
const LINES = 20; //线数
const BET = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const RULELIST = [10, 6, 0.5, 8, 4, 0.25, 5, 2, 0.2, 4, 1, 0.15, 3, 0.9, 0.15, 2, 0.8, 0.12, 1.5, 0.7, 0.12, 1.5, 0.7, 0.1, 1, 0.6, 0.08, 0.6, 0.5, 0.05, 0.5, 0.4, 0.04]; //规则

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

        //免费次数有关

        freeTimesNode: {
            default: null,
            type: cc.Node,
            displayName: '免费摇奖显示节点',
        },

        extraNode: {
            default: null,
            type: cc.Node,
            displayName: '额外旋转显示节点',
        },

        shadowEf: {
            default: null,
            type: cc.Animation,
            displayName: '沙尘暴',
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
        this.net = this.node.getComponent('EFNetwork');
        this.audio = this.node.getComponent('EFAudio');
        this.wheelList = [];
        this.freeWheelList = [];
        this.bet = 0;
        this.auto = false;
        this.status = 0;
        this.bigWinResList = [3, 1, 2];
        this.bigWinBoo = false;
        this.freeTimes = 0;
        this.rollResult = [];
        this.rollIndex = 0;
        this.lotteryRes = null;
        this.stopFree = false;
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
            if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto || this.extraNode.active) {
                return;
            }
            this.bet += 1;
            this.bet = this.bet >= BET.length ? BET.length - 1 : this.bet;
            this.setBet();
        } else if (args == 'dec') {
            if (this.freeTimes > 0 || this.bigWinBoo || this.stopFree || this.auto || this.extraNode.active) {
                return;
            }
            this.bet -= 1;
            this.bet = this.bet >= 0 ? this.bet : 0;
            this.setBet();
        } else if (args == 'closeResult') {
            this.bigWinResultAnim.active = false;
            this.bigWinBoo = false;
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
                if (this.bigWinBoo) {
                    if (this.bigWinResultAnim.active) {
                        this.audio.playBgm(2);
                    } else {
                        this.audio.playBgm(1);
                    }
                } else {
                    this.audio.playBgm(0);
                }
            }
        }
    },

    setBet() {
        this.lblBet.string = (BETNUM / this.playerInfo.exchangeRate).toFixed(2);
        this.lblCurBet.string = (BET[this.bet] * BETNUM / this.playerInfo.exchangeRate).toFixed(2);
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
            this.freeGold += this.lotteryRes.winscore;
            if (rIndex == this.rollIndex) {
                this.turnNum += 1;
                this.playWinAnim(this.turnNum);
            }
            this.extraNode.active = this.lotteryRes.viewarray.ADD_Free.bFlag;
            this.extraNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = this.lotteryRes.viewarray.ADD_Free.nFreeTime;

            if (this.lotteryRes.viewarray.getFreeTime.bFlag) {
                if (this.freeTimes == 0) {
                    this.bigWinBoo = true;
                    this.auto = false;
                    this.autoBtn.spriteFrame = this.spAtlas.getSpriteFrame(this.auto ? 'btn_tingzhi' : 'btn_zidong');
                    this.freeTimes = this.lotteryRes.viewarray.getFreeTime.nFreeTime;
                    this.bigWinResList = [...this.lotteryRes.viewarray.getFreeTime.nIndex];
                    this.bigWinResList.map((currentValue, index, arr) => {
                        this.bigWinResList[index] = ++currentValue;
                    });
                    this.audio.playFree();
                    this.scheduleOnce(() => {
                        this.closeShine();
                        this.audio.playFreeWheel();
                        this.bigWinNode.active = true;
                        for (let i in this.freeWheelList) {
                            this.freeWheelList[i].startRoll(this.bigWinResList[i]);
                        }
                    }, 3);
                    this.scheduleOnce(() => {
                        this.bigWinNode.active = false;
                        this.shadowEf.play();
                    }, 9);
                    this.scheduleOnce(() => {
                        this.startFreeGame();
                    }, 10)
                }
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
        }, hasWinBool > 0 ? hasWinBool * 3 : 2);
    },

    //免费次数有关
    startFreeGame() {
        this.freeGold = 0;
        for (let i in this.freeHideNode) {
            this.freeHideNode[i].active = false;
        }

        for (let i in this.wheelList) {
            this.wheelList[i].initWheel();
        }
        this.freeTimesNode.active = true;
        this.freeTimesNode.getChildByName('txt').getChildByName('New Label').getComponent(cc.Label).string = this.freeTimes;
        this.auto = true;
        this.sendRoll();
    },

    stopFreeTimes() {
        this.bigWinResultAnim.active = true;
        let spList = this.bigWinResultAnim.getChildByName('s_egfo_meter_static').children;
        let lbl = this.bigWinResultAnim.getChildByName('goldLable').getComponent(cc.Label);
        lbl.string = (this.freeGold / this.playerInfo.exchangeRate).toFixed(2);
        let showId = 0;
        if (this.freeGold > 1000 && this.freeGold <= 20000) {
            showId = 1;
        } else if (this.freeGold > 20000 && this.freeGold <= 40000) {
            showId = 2;
        } else {
            showId = 3;
        }
        for (let i in spList) {
            spList[i].active = i == showId;
        }
        for (let i in this.freeHideNode) {
            this.freeHideNode[i].active = true;
        }

        for (let i in this.wheelList) {
            this.wheelList[i].initWheel();
        }
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


    //大奖有关
    closeDoorAnim() {
        this.doorNode.active = true;
        let chList = this.doorNode.children;
        for (let i in chList) {
            chList[i].getComponent(cc.Animation).play();
        }

    },
});