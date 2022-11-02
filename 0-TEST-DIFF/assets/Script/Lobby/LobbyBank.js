cc.Class({
    extends: cc.Component,

    properties: {
        com_bank_childNode: [cc.Node],//银行子界面
        gift_id: cc.EditBox,
        gift_coin: cc.EditBox,
        gift_pwd: cc.EditBox,
        gift_playerCoin: cc.Label,
        gift_bankCoin: cc.Label,
        select_id: cc.EditBox,
        select_userCoin: cc.Label,
        select_userId: cc.Label,
        save_coin: cc.EditBox,
        save_playerCoin: cc.Label,
        save_bankCoin: cc.Label,
        load_coin: cc.EditBox,
        load_pwd: cc.EditBox,
        load_playerCoin: cc.Label,
        load_bankCoin: cc.Label,
        update_pwd: cc.EditBox,
        update_newpwd: cc.EditBox,
        update_newpwd2: cc.EditBox,
    },


    onLoad() {
        this.netWork = require("LobbyNetWork");
        this.playerInfo = require("PlayerInfo").getInstant;
        this.lobbyMain = cc.find('Canvas').getComponent("LobbyMain");
    },

    start() {
        this.updateView();
    },

    updateView() {
        if (!this.playerInfo) {
            this.playerInfo = require("PlayerInfo").getInstant;
        }
        this.save_playerCoin.string = this.playerInfo.playerCoin.toFixed(2);
        this.save_bankCoin.string = (this.playerInfo.playerBankCoin / this.playerInfo.exchangeRate).toFixed(2);
        this.load_playerCoin.string = this.playerInfo.playerCoin.toFixed(2);
        this.load_bankCoin.string = (this.playerInfo.playerBankCoin / this.playerInfo.exchangeRate).toFixed(2);
    },
    //关闭银行界面
    closePanelClick() {
        this.node.active = false;
    },
    //--------------------------银行UI刷新--------------------------
    bankToggleClick(target, index) {
        let i = parseInt(index);
        this.showBankUI(i);
    },

    showBankUI(index) {
        for (let i = 0; i < this.com_bank_childNode.length; i++) {
            this.com_bank_childNode[i].active = false;
        }
        this.com_bank_childNode[index].active = true;
        switch (index) {
            case 0://存入界面
                this.save_playerCoin.string = this.playerInfo.playerCoin.toFixed(2);
                this.save_bankCoin.string = (this.playerInfo.playerBankCoin / this.playerInfo.exchangeRate).toFixed(2);
                break;
            case 1://取款界面
                this.load_playerCoin.string = this.playerInfo.playerCoin.toFixed(2);
                this.load_bankCoin.string = (this.playerInfo.playerBankCoin / this.playerInfo.exchangeRate).toFixed(2);
                break;
            case 2://赠送界面
                this.gift_playerCoin.string = this.playerInfo.playerCoin.toFixed(2);
                this.gift_bankCoin.string = (this.playerInfo.playerBankCoin / this.playerInfo.exchangeRate).toFixed(2);
                break;
            case 5://查询界面
                this.select_userCoin.string = "";
                this.select_userId.string = "";
                break;
        }
    },
    //--------------------------银行赠送金币--------------------------
    bank_giftClick() {
        let info = {
            sendUserId: this.gift_id.string,
            sendCoin: this.gift_coin.string,
            pwd: this.gift_pwd.string
        };
        this.netWork.socket.emit("sendCoin", info);
    },
    //输入重置
    bank_gift_reSet_Click() {
        this.gift_id.string = "";
        this.gift_coin.string = "";
    },
    //--------------------------银行查询--------------------------
    bank_selectClick() {
        this.netWork.socket.emit("getPlayerCoin", {
            userid: this.select_id.string
        });
    },
    //展示查询内容
    showSelectCoin(res) {
        this.select_userCoin.string = (res.userCoin / this.playerInfo.exchangeRate).toFixed(2);
        this.select_userId.string = res.userId;
    },
    //--------------------------银行存款--------------------------
    //输入重置
    bank_save_reSet_Click() {
        this.save_coin.string = "";
    },

    bank_save_chooseCoinClick(target, index) {
        let i = parseInt(index);
        let coin = 0;
        switch (i) {
            case 0:
                coin = 5000;
                break;
            case 1:
                coin = 10000;
                break;
            case 2:
                coin = 20000;
                break;
            case 3:
                coin = 50000;
                break;
            case 4:
                coin = this.playerInfo.playerCoin * this.playerInfo.exchangeRate;
                break;
        }
        this.save_coin.string = (coin / this.playerInfo.exchangeRate).toFixed(2);
    },
    //银行存入提交
    bank_save_commit_Click() {
        let coin = parseFloat(this.save_coin.string) * this.playerInfo.exchangeRate;
        if (coin && coin > 0) {
            this.netWork.socket.emit("updateBankScore", {
                saveCoin: coin
            });
        }
    },
    //--------------------------银行取款--------------------------
    bank_load_reSet_Click() {
        this.load_coin.string = "";
    },

    bank_load_chooseCoinClick(target, index) {
        let i = parseInt(index);
        let coin = 0;
        switch (i) {
            case 0:
                coin = 5000;
                break;
            case 1:
                coin = 10000;
                break;
            case 2:
                coin = 20000;
                break;
            case 3:
                coin = 50000;
                break;
            case 4:
                coin = this.playerInfo.playerBankCoin;
                break;
        }
        this.load_coin.string = (coin / this.playerInfo.exchangeRate).toFixed(2);
    },

    bank_load_commit_Click() {
        let coin = parseFloat(this.load_coin.string) * this.playerInfo.exchangeRate;
        if (coin && coin > 0) {
            this.netWork.socket.emit("updateBankScore", {
                saveCoin: -coin,
                pwd: this.load_pwd.string
            });
        }
    },
    //--------------------------银行修改密码--------------------------
    bank_update_commit_Click() {
        if (this.update_newpwd.string == this.update_newpwd2.string) {
            this.netWork.socket.emit("updateBankpwd", {
                pwd: this.update_pwd.string,
                newPwd: this.update_newpwd.string
            });
        } else {
            this.lobbyMain.showMessagebox_Function("两次新密码不相符", 1, 4);
        }
    },

});
