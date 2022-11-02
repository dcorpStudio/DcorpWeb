
const i18n = require('i18n');
/**
 * 替换所有匹配exp的字符串为指定字符串
 * @param exp 被替换部分的正则
 * @param newStr 替换成的字符串
 */
String.prototype.replaceAll = function (exp, newStr) {
    return this.replace(new RegExp(exp, "gm"), newStr);
};

/**
 * 原型：字符串格式化
 * @param args 格式化参数值
 */
String.prototype.format = function (args) {
    var result = this;
    if (arguments.length < 1) {
        return result;
    }

    var data = arguments; // 如果模板参数是数组
    if (arguments.length == 1 && typeof (args) == "object") {
        // 如果模板参数是对象
        data = args;
    }
    for (var key in data) {
        var value = data[key];
        if (undefined != value) {
            result = result.replaceAll("\\{" + key + "\\}", value);
        }
    }
    return result;
}

cc.Class({
    extends: cc.Component,

    properties: {
        Label_Text: cc.RichText,
        _totalTime: 10,//显示时长
        _countDown: 0,//显示倒计时
        _strTemplate_SubGame: "LHJ_SUBGAME_GAMEID_{0}"
    },

    onLoad: function () {
        ////KBEngineEvent.register("onWorldWinMSG", this, "onWorldWinMSG");
        ////KBEngineEvent.register("onSendNotice", this, "onSendNotice");
        this.node.active = false;
    },

    //取消注册
    onDestroy: function () {
        ////KBEngineEvent.deregister("onWorldWinMSG", this);
        ////KBEngineEvent.deregister("onSendNotice", this);
    },

    update: function (dt) {
        this._countDown -= dt;
        if (this._countDown < 0) {
            this.node.active = false;
        }
    },

    //收到消息:玩家中奖跑马灯
    onWorldWinMSG: function (parameterArray, strNickName) {
        this.node.active = true;
        this._countDown = this._totalTime;

        var nGameId = parameterArray[0];
        var nWinCoin = parameterArray[1];        
        var template = i18n.t("LHJ_GONGGAO_WIN");
        var strGameName = i18n.t(this._strTemplate_SubGame.format(nGameId));
        this.Label_Text.string = template.format(strNickName, strGameName, nWinCoin);
    },

    //公告消息
    onSendNotice: function (strNotice) {
        this.node.active = true;
        this._countDown = this._totalTime;
        this.Label_Text.string = strNotice;
    },
});