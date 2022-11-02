/**
 * 抢庄牛牛金币显示
 */
cc.Class({
    extends: cc.Component,

    properties: {
        type: 0,
        flyFinish: false,
        timeCount: 0
    },
    onLoad: function() {},

    /**
     * 
     * @param {*} index 
     */
    setFrame_Function: function(index) {
        this.node.getComponent("cc.Sprite").spriteFrame = this.sp_CoinSprite[index];
    },

    /**
     * 获得范围随机数
     * @param {*} min 
     * @param {*} max 
     */
    getRandom_Function: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    
    /**
     * 金币从输家位置飞到庄家位置
     * @param {*} losePlayer 
     * @param {*} bankerPlayer 
     * @param {*} delayTime 
     */
    setCoinToBanker_Function: function(losePlayer, bankerPlayer, delayTime) {
        this.node.setPosition(losePlayer.x, losePlayer.y);
        var move = cc.moveTo(.05 + .01 * delayTime, bankerPlayer.x + this.getRandom_Function( - 30, 30), bankerPlayer.y + this.getRandom_Function( - 30, 30));
        var action = cc.sequence(move, cc.callFunc(function() {
            this.flyFinish = true;
            this.timeCount = 0;
        }, this));
        this.node.runAction(action);
    },

    /**
     * 金币从庄家位置飞到赢家位置
     * @param {*} bankerPlayer 
     * @param {*} winPlayer 
     * @param {*} delayTime 
     */
    setCoinToPlayer_Function: function(bankerPlayer, winPlayer, delayTime) {
        this.node.setPosition(winPlayer.x, winPlayer.y);
        var move = cc.moveTo(.05 + .01 * delayTime, bankerPlayer.x + this.getRandom_Function( - 30, 30), bankerPlayer.y + this.getRandom_Function( - 30, 30));
        var action = cc.sequence(move, cc.callFunc(function() {
            this.flyFinish = true;
            this.timeCount = 0;
        },this));
        this.node.runAction(action);
    },

    /**
     * 更新
     * @param {*} dt 
     */
    update: function(dt) {
        if(this.node.active && this.flyFinish)
        {
            if(this.timeCount < .4)
            {
                this.timeCount += dt;
            }
            else
            {
                this.timeCount = 0;
                this.node.active = false;
                this.flyFinish = false;
            }
        }
    }
});
