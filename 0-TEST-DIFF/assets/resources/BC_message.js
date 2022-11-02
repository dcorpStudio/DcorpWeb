cc.Class({
    extends: cc.Component,

    properties: {
        rich_text: cc.RichText,
    },

    setView(data) {
        // cc.log(data);
        this.playerInfo = require("PlayerInfo").getInstant;
        this.rich_text.string = `玩家${data.nickName}刚刚在游戏<color=#94FF86>${data.gameName}</color>中奖<color=#CD7F32>${data.win / this.playerInfo.exchangeRate}</color>金币`;
        this.actionDo();
    },
    //滚动展示
    actionDo() {
        this.rich_text.node.x = 800;
        cc.tween(this.rich_text.node)
            .to(5, { position: cc.v2(-800, 0) })
            .call(() => {
                this.node.destroy();
            })
            .start();
    }
});
