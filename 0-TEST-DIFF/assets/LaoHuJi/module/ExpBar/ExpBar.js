
cc.Class({
    extends: cc.Component,

    properties: {
        ProgressBar_EXP: cc.ProgressBar,
        Label_EXP: cc.Label,
    },

    start: function () {
        ////KBEngineEvent.register("onGetAccountInfo", this, "onGetAccountInfo");
        // if (Global.accountInfo != null && Global.accountInfo != undefined) {
        //     this.onGetAccountInfo(1, Global.accountInfo, null);
        // }
    },

    //取消注册
    onDestroy: function () {
        ////KBEngineEvent.deregister("onGetAccountInfo", this);
    },

    //收到消息:得到账户信息
    onGetAccountInfo: function (nSuccess, dict, dictList) {
        if (nSuccess === 1) {
            //success
            var exp = dict["nLevelEXP"];
            var needExp = dict["nLevelNeedEXP"];
            this.ProgressBar_EXP.progress = exp / needExp;
            this.Label_EXP.string = exp + "/" + needExp;
        }
        else {
            //fail
        }
    },

    onBtnClick_info: function () {

    },
});