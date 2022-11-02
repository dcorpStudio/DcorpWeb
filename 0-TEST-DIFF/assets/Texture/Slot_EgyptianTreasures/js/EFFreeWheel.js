const ROLENUM = 40; //每一轮的角色数量
const TIMEMIN = 1; //第一轮摇奖时间

cc.Class({
    extends: cc.Component,

    properties: {
        wheelId: 0,
    },

    onLoad() {
        this.audio = this.node.getComponent('EFAudio');
        this.mainObj = cc.director.getScene().getChildByName('Canvas').getComponent('EFMain');
        this.mainObj.freeWheelList[this.wheelId] = this;
    },

    startRoll(args) {
        this.animObj = null;
        this.node.removeAllChildren();
        this.node.y = 0;
        for (let i = 0; i < 39; i++) {
            this.addRole(Math.floor(Math.random() * 10 + 1));
        }
        this.animObj = this.addRole(args);
        let timer = TIMEMIN + this.wheelId * 0.2;
        setTimeout(() => {
            this.node.runAction(
                cc.sequence(
                    cc.moveTo(timer, cc.v2(this.node.x, -this.node.height + 220)),
                    cc.moveTo(0.1, cc.v2(this.node.x, -this.node.height + 230)),
                    cc.moveTo(0.1, cc.v2(this.node.x, -this.node.height + 220)),
                    cc.callFunc(this.rollCallBack.bind(this))
                )
            );
        }, 1000);
    },

    addRole(id) {
        let pb = cc.instantiate(this.mainObj.rolePb[id]);
        this.node.addChild(pb);
        return pb;
    },

    rollCallBack() {
        this.animObj.getComponent(cc.Animation).play();
    },

});