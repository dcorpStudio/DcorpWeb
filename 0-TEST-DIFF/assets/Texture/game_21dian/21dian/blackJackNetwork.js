cc.Class({
    extends: cc.Component,

    onLoad() {
        this.mainObj = this.node.getComponent('blackJackMain');
        this.playerInfo = require("PlayerInfo").getInstant;
        this.audio = this.node.getComponent('blackJackAudio');

    },

    start() {
        this.url = Lhjconfig.Server_IP + ':13901';
        this.socket = io.connect(this.url);
        this.addEvent();
    },


    addEvent() {
        this.socket.on('connected', () => {
            this.socket.emit('LoginGame', JSON.stringify({
                userid: this.playerInfo.playerId,
                gametype: null,
                sign: this.playerInfo.gameSign
            }));
        });

        this.socket.on('loginGameResult', data => {
            data = this.changeResultJSON_Function(data);
            console.log('LoginGameResult:', data);
            this.socket.emit('LoginRoom');
            this.mainObj.myCoin = data.Obj.score;
            this.mainObj.userCoin.string = (data.Obj.score / 100).toFixed(2);
            this.mainObj.userName.string = data.Obj.nickname;
            Helper.loadHead(data.Obj.headimgurl, texture => {
                this.mainObj.userHead.spriteFrame = texture;
            })
            window.BLACKJACK_LOBBYNET.disconnect();
        });

        this.socket.on('LoginRoomResult', (data) => {
            data = this.changeResultJSON_Function(data);
            console.log('LoginRoomResult', data);
        });

        this.socket.on('lotteryResult', (data) => {
            data = this.changeResultJSON_Function(data);
            console.log('lotteryResult:', data);
            if (!!data.ResultCode && data.ResultCode == 1) {
                this.mainObj.betCallBack();
                this.mainObj.firstDeal(data.zhuang_card[0], '', ...data.hand_card);
            }
            if (!data.is_over) {
                this.scheduleOnce(() => {
                    this.mainObj.playerStatus(data.q_safe ? 1 : 2);
                }, 1.2);
            } else {
                this.mainObj.overAction(data.zhuang_card, data.win_res, data.user_score);
            }
        });

        this.socket.on('sendCardResult', (data) => {
            data = this.changeResultJSON_Function(data);
            console.log('sendCardResult', data);
            if (this.mainObj.playerCardNode.children.length != data.hand_card.length) {
                this.mainObj.deal('', data.hand_card[data.hand_card.length - 1]);
            }

            if (data.is_fanbei) {
                this.mainObj.rollCoin();
                this.mainObj.myCoin = this.mainObj.myCoin - this.mainObj.bet;
                this.mainObj.userCoin.string = (this.mainObj.myCoin / 100).toFixed(2);
                this.mainObj.myChipsLbl.string = (this.mainObj.bet * 2 / 100).toFixed(2);
            }

            if (!data.is_over) {
                this.scheduleOnce(() => {
                    this.mainObj.playerStatus(3);
                }, 0.3);
            } else {
                this.mainObj.overAction(data.zhuang_card, data.win_res, data.user_score);
            }
        });

        this.socket.on('buySafeResult', (data) => {
            data = this.changeResultJSON_Function(data);
            console.log('buySafeResult', data);
            this.mainObj.playerStatus(2);
            this.mainObj.rollCoin(true);
            this.mainObj.myCoin = this.mainObj.myCoin - this.mainObj.bet / 2;
            this.mainObj.userCoin.string = (this.mainObj.myCoin / 100).toFixed(2);
            this.mainObj.myChipsLbl.string = (this.mainObj.bet * 1.5 / 100).toFixed(2);
        });
    },

    changeResultJSON_Function(ret) {
        if (cc.sys.isNative) {
            return JSON.parse(ret);
        }
        return ret;
    },
});