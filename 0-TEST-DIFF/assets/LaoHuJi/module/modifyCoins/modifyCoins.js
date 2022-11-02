
cc.Class({
    extends: cc.Component,
    
    start: function () {
        //////KBEngineEvent.register("onSendNewCoin", this, "onSendNewCoin");
    },

    //取消注册
    onDestroy: function () {
        //////KBEngineEvent.deregister("onSendNewCoin", this);
    },

    onSendNewCoin: function (nNewCoin) { 
        this.node.getComponent(cc.Label).string = nNewCoin.lo;
        //////KBEngineapp.player().reqGetAccountInfo();//刷新账户信息
    },
});