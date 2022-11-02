/**
 * 抢庄牛牛动画管理
 */
cc.Class({
    extends: cc.Component,

    properties: {
        canvasNode: {
            default: null,
            type: cc.Node
        }
    },
    onLoad: function() {},

    /**
     * 发牌动画
     * @param {*} index 
     */
    sendCardAnimationCallBack_Function: function(index) {
        this.canvasNode.getComponent("GrabBullMain").cardArray[index].active = true;
    },

    /**
     * 发牌完成后回调
     */
    sendCardFinishCallBack_Function: function() {
        this.canvasNode.getComponent("GrabBullMain").openSendCard_Function();
    },

    /**
     * 再次发牌动画
     * @param {*} index 
     */
    reissueCardAnimationCallBack_Function: function(index) {
        this.canvasNode.getComponent("GrabBullMain").cardArray[index].active = true;
        this.canvasNode.getComponent("GrabBullMain").openReissueCard_Function();
    },
    setBankerAnimationCallBack_Funcion: function() {},

    /**
     * 播放结算动画
     * @param {*} index 
     */
    playerWinScoreLabelCallBack_Function: function(index) {
        this.canvasNode.getComponent("GrabBullMain").com_PlayerMessage.getChildByName("com_Player" + index).getChildByName("lb_WinScore").active = false;
        this.canvasNode.getComponent("GrabBullMain").com_PlayerMessage.getChildByName("com_Player" + index).getChildByName("lb_FailScore").active = false;
    }
});
