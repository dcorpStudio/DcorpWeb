cc.Class({
    extends: cc.Component,

    properties: {
        rankNumBg: [cc.Node],
        rankNumLab: cc.Label,
        headSp: cc.Sprite,
        nickNameLab: cc.Label,
        coinLab: cc.Label,
    },

    onLoad() {

    },

    start() {

    },

    setView(data, index, type) {
        for (let i in this.rankNumBg) {
            this.rankNumBg[i].active = false;
        }
        if (index < 3) {
            this.rankNumBg[index].active = true;
        } else {
            this.rankNumBg[3].active = true;
        }
        this.rankNumLab.string = index + 1;
        Helper.loadHead(data.headimgurl, sp => {
            this.headSp.spriteFrame = sp;
        });
        this.nickNameLab.string = data.nickname;
        if (type == 1) {
            this.coinLab.string = data.score;
        } else {
            this.coinLab.string = data.diamond;
        }
    }

});
