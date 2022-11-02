cc.Class({
    extends: cc.Component,

    properties: {
        animation: cc.Animation,
        label: cc.Label,
    },

    onLoad: function () {
        this.animation.on('finished', this.onFinished, this);
        console.log('onLoad');
    },
    //取消注册事件
    onDestroy: function () {
        //this.animation.off('finished', this.onFinished, this);    //注掉这段,否则关闭宝箱界面会报错,我也不知道为啥~
    },

    PlayAnimation: function () {
        this.animation.play();//播放默认动画
        this.node.getComponent(cc.Button).interactable = false;//禁用按钮
        // console.log('PlayAnimation');
    },

    onFinished: function () {
        var eventCustom = new cc.Event.EventCustom('Event_OpenBox', true);
        eventCustom.setUserData(this.label);
        this.node.dispatchEvent(eventCustom);
    },
});