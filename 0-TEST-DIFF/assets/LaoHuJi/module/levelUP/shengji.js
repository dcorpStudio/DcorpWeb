
cc.Class({
    extends: cc.Component,

    properties: {
        Label_LV: cc.Label,
        _totalTime: 6,//显示时长
        _countDown: 0,//显示倒计时
    },

    onLoad: function () {
        ////KBEngineEvent.register("onLevelUP", this, "onLevelUP");
        this.node.active = false;
    },

    //取消注册
    onDestroy: function () {
        ////KBEngineEvent.deregister("onLevelUP", this);
    },

    update: function (dt) {
        this._countDown -= dt;
        if (this._countDown < 0) {
            this.node.active = false;
        }
    },

    //收到消息:玩家升级
    onLevelUP: function (nLevel) {
        this.node.active = true;
        this._countDown = this._totalTime;
        this.node.getComponent(cc.Animation).play();
        this.Label_LV.string = nLevel;
    },
});