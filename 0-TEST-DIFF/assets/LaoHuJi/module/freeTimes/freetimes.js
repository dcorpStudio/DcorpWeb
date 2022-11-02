
cc.Class({
    extends: cc.Component,

    properties: {
        Label_Freetimes: cc.Label,
        _freeTimes: 0,
    },

    start: function () {
        ////KBEngineEvent.register("onGetAccountInfo", this, "onGetAccountInfo");
        // if (Global != null && Global != undefined &&
        //     Global.accountInfo != null && Global.accountInfo != undefined &&
        //     Global.freeTimes != null && Global.freeTimes != undefined &&
        //     Global.currentGameID != null && Global.currentGameID != undefined) {
        //     this.onGetAccountInfo(1, Global.accountInfo, Global.freeTimes);
        // }
    },

    //取消注册
    onDestroy: function () {
        ////KBEngineEvent.deregister("onGetAccountInfo", this);
    },

    //收到消息:得到账户信息
    onGetAccountInfo: function (nSuccess, dict, dictList) {
        this.node.active = false;
        if (nSuccess === 1) {//success
            for (var i = 0; i < dictList["values"].length; i++) {
                if (dictList["values"][i]["nGameId"] === Global.currentGameID) {//当前子游戏的免费次数
                    this._freeTimes = dictList["values"][i]["nFreeTimes"];//免费次数
                    if (this._freeTimes > 0) {
                        this.node.active = true;
                        this.Label_Freetimes.string = this._freeTimes;//显示免费次数
                    }
                    break;
                }
            }
        }
    },
});