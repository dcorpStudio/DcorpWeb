cc.Class({
    extends: cc.Component,

    properties: {
        myChipsLbl: cc.Label,
        chipPbList: [cc.Prefab], // 1，19，50，100，500，保险
        coinNode: cc.Node,
        betTip: cc.Node,
        chipsPool: cc.Node,
        chipsNode: cc.Node,
        btnList: [cc.Button], //要 不要 保险 翻倍 继续游戏
        helpBd: cc.Node,
        gameResultPicList: [cc.Node], // 赢 平 输
        userHead: cc.Sprite,
        userName: cc.Label,
        userCoin: cc.Label,
        cardAtlas: cc.SpriteAtlas,
        bankerCardNode: cc.Node,
        playerCardNode: cc.Node,
        bankerArrow: cc.Node,
        playerArrow: cc.Node,
        playerScoreLbl: cc.Label,
        bankerScoreLbl: cc.Label,

    },

    onLoad() {
        this.playerInfo = require("PlayerInfo").getInstant;
        this.net = this.node.getComponent('blackJackNetwork');
        this.audio = this.node.getComponent('blackJackAudio');

        //初始化数值
        this.bet = 100;
        this.lastChips = 0;
        this.myCoin = 0;
        this.playerScore = [0, 0];
        this.bankerScore = [0, 0];
    },

    start() {
        this.clearGame();
    },

    clearGame() {
        this.playerScore = [0, 0];
        this.bankerScore = [0, 0];
        this.playerScoreLbl.string = '0';
        this.bankerScoreLbl.string = '0';
        this.myChipsLbl.string = '0.00';
        this.chipsPool.removeAllChildren();
        for (let i in this.btnList) {
            this.btnList[i].node.active = false;
        }
        this.chipsNode.active = true;
        for (let i in this.gameResultPicList) {
            this.gameResultPicList[i].active = false;
        }
        this.bankerCardNode.removeAllChildren();
        this.playerCardNode.removeAllChildren();
        this.coinNode.removeAllChildren();
        this.betTip.active = true;
        this.bankerArrow.active = false;
        this.playerArrow.active = false;
    },

    onClick(ev, args) {
        if (args == 'exitGame') {
            this.net.socket.disconnect();
            cc.director.loadScene(window.hallName);
        } else if (args == 'onBet') {
            if (this.myCoin >= this.bet && this.chipsNode.active) {
                this.betTip.active = false;
                this.chipsNode.active = false;
                this.net.socket.emit('lottery', this.bet);
            }
        } else if (args == 'help') {
            this.helpBd.active = true;
        } else if (args == 'closeHelp') {
            this.helpBd.active = false;
        } else if (args == 'hit') {
            this.playerStatus(-1);
            //sendCard  0 stand  1 hit 2double
            this.net.socket.emit('sendCard', 1);
        } else if (args == 'stand') {
            this.playerStatus(-1);
            //sendCard  0 stand  1 hit 2double
            this.net.socket.emit('sendCard', 0);
        } else if (args == 'double') {
            this.playerStatus(-1);
            //sendCard  0 stand  1 hit 2double
            this.net.socket.emit('sendCard', 2);
        } else if (args == 'insurance') {
            this.playerStatus(-1);
            this.net.socket.emit('buySafe');
        } else if (args == 'reGame') {
            this.clearGame();
        }
    },

    betCallBack() {
        this.myCoin -= this.bet;
        this.lastChips = this.bet;
        this.userCoin.string = (this.myCoin / 100).toFixed(2);
        this.myChipsLbl.string = (this.lastChips / 100).toFixed(2);
        this.rollCoin();
    },

    rollCoin(insuranceBool) {
        let coinJson = {
            100: 0,
            1000: 1,
            5000: 2,
            10000: 3,
            50000: 4,
        }
        let coin = cc.instantiate(this.chipPbList[!!insuranceBool ? 5 : coinJson[this.bet]]);
        this.coinNode.addChild(coin);
        coin.position = cc.v2(400, -600);
        coin.runAction(cc.moveTo(0.3, cc.v2(Math.random() * 100 - 50, Math.random() * 100 - 50)));
    },

    onToggle(ev, args) {
        this.bet = parseInt(args) * 100;
    },

    startBet() {
        this.chipsNode.active = true;
        this.betTip.active = true;
    },

    getCard() {
        let node = new cc.Node();
        this.node.addChild(node);
        let spr = node.addComponent(cc.Sprite);
        spr.spriteFrame = this.cardAtlas.getSpriteFrame('bg_back');
        return node;
    },

    changeFlowerToStr(flower) {
        let str = 'bg_back';
        if (!!flower) {
            let u = parseInt(flower / 16 / 16);
            let v = flower % 16;
            str = `${v}_${u >= 10 ? u : '0' + u}`;
        }
        return str;
    },

    firstDeal(...args) {
        let curIndex = 0;
        this.schedule(() => {
            if (curIndex <= 1) {
                this.deal('banker', args[curIndex]);
            } else {
                this.deal('', args[curIndex]);
            }
            curIndex++;
            if (curIndex == 4) {
                this.playerArrow.active = true;
            }
        }, 0.3, 3);
    },

    deal(who, flower) {
        let defaultPos = cc.v2(515, 386);
        let card = this.getCard();
        card.position = defaultPos;
        card.rotation = -76;
        let whoNode = this.playerCardNode;
        let whoPos = cc.v2(0, -160);
        if (who == 'banker') {
            whoNode = this.bankerCardNode;
            whoPos = cc.v2(0, 240);
        }

        //出牌
        card.runAction(cc.sequence(cc.spawn(cc.moveTo(0.3, whoPos), cc.rotateTo(0.3, 0)), cc.callFunc(() => {
            let sprName = this.changeFlowerToStr(flower);
            card.getComponent(cc.Sprite).spriteFrame = this.cardAtlas.getSpriteFrame(sprName);
            card.parent = whoNode;
            card.position = cc.v2(0, 0);
            this.setCount(who, flower);
        })));
    },

    setCount(who, flower) {
        //计算分数
        let score = who == 'banker' ? this.bankerScore : this.playerScore;
        let scoreLlb = who == 'banker' ? this.bankerScoreLbl : this.playerScoreLbl;
        let cardScore = parseInt(flower / 16 / 16);
        cardScore = cardScore >= 10 ? 10 : cardScore;
        if (cardScore == 1) {
            score[0] += 1;
            score[1] += 11;
        } else {
            score[0] += cardScore;
            score[1] += cardScore;
        }
        if (score[0] == score[1]) {
            scoreLlb.string = score[0];
        } else {
            if (score[0] <= 21 && score[1] <= 21) {
                if (score[0] == 21 || score[1] == 21) {
                    scoreLlb.string = '21';
                } else {
                    scoreLlb.string = score[0] + '/' + score[1];
                }
            } else if (score[0] > 21 && score[1] > 21) {
                scoreLlb.string = score[0] >= score[1] ? score[1] : score[0];
            } else {
                scoreLlb.string = score[0] <= 21 ? score[0] : score[1];
            }
        }
    },

    playerStatus(index) {
        for (let i in this.btnList) {
            this.btnList[i].node.active = false;
        }
        if (index == 1) {
            //保险+首次是否要牌
            this.btnList[0].node.active = true;
            this.btnList[1].node.active = true;
            this.btnList[2].node.active = true;
            this.btnList[3].node.active = true;
        } else if (index == 2) {
            //不用买保险+首次是否要牌
            this.btnList[0].node.active = true;
            this.btnList[1].node.active = true;
            this.btnList[3].node.active = true;
        } else if (index == 3) {
            //再次次是否要牌
            this.btnList[0].node.active = true;
            this.btnList[1].node.active = true;
        } else if (index == 4) {
            this.btnList[4].node.active = true;
        }
    },

    overAction(bankerCards, whoWin, score) {
        //whoWin 0 玩家赢 1庄赢 2平
        for (let i in this.btnList) {
            this.btnList[i].node.active = false;
        }
        this.playerArrow.active = false;
        this.scheduleOnce(() => {
            this.bankerArrow.active = true;
            if (bankerCards.length > 2) {
                let index = 2;
                this.schedule(() => {
                    this.deal('banker', bankerCards[index]);
                    index++;
                    if (index == bankerCards.length) {
                        this.scheduleOnce(() => {
                            let sprName = this.changeFlowerToStr(bankerCards[1]);
                            this.setCount('banker', bankerCards[1]);
                            this.bankerCardNode.children[1].getComponent(cc.Sprite).spriteFrame = this.cardAtlas.getSpriteFrame(sprName);
                            this.gameResultPicList[whoWin].active = true;
                            this.bankerArrow.active = false;
                            this.playerArrow.active = false;
                            this.myCoin = score;
                            this.userCoin.string = (this.myCoin / 100).toFixed(2);
                            this.playerStatus(4);
                        }, 0.5);
                    }
                }, 0.3, bankerCards.length - 3);
            } else {
                this.scheduleOnce(() => {
                    let sprName = this.changeFlowerToStr(bankerCards[1]);
                    this.setCount('banker', bankerCards[1]);
                    this.bankerCardNode.children[1].getComponent(cc.Sprite).spriteFrame = this.cardAtlas.getSpriteFrame(sprName);
                    this.gameResultPicList[whoWin].active = true;
                    this.bankerArrow.active = false;
                    this.playerArrow.active = false;
                    this.myCoin = score;
                    this.userCoin.string = (this.myCoin / 100).toFixed(2);
                    this.playerStatus(4);
                }, 0.5);
            }
        }, 1);
    },
});