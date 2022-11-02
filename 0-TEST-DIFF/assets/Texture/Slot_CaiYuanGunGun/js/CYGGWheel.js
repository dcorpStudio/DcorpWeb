const ROLENUM = 40; //每一轮的角色数量
const TIMEMIN = 1; //第一轮摇奖时间

cc.Class({
    extends: cc.Component,

    properties: {
        wheelId: 0,
        excludeId: {
            default: 0,
            displayName: '不会出现的数字id',
        },
    },

    onLoad() {
        this.audio = cc.director.getScene().getChildByName('Canvas').getComponent('CYGGAudio');
        this.mainObj = cc.director.getScene().getChildByName('Canvas').getComponent('CYGGMain');
        this.mainObj.wheelList[this.wheelId] = this;
        this.status = 0; //0停止 1转 
        this.lastResult = [0, 0, 0, 0, 0]; //中间三位是上一局结果 首位末尾是为了防止露出部分转起来不一样 
        this.rolePbList = []; //roles
        this.roleIdList = []; //role ID
    },

    start() {
        //初始化场景role
        this.initWheel();
    },

    initWheel() {
        this.rolePbList = [];
        this.roleIdList = [];
        this.node.removeAllChildren();
        for (let i in this.lastResult) {
            this.lastResult[i] = this.getRandomId();
            this.addRole(this.lastResult[i]);
        }
        this.addRole(this.getRandomId());
        this.node.y = 0;
        this.mainObj.rollIndex++;
        this.mainObj.closeShine();
    },

    startRoll(...args) {
        this.status = 1;
        this.rolePbList = [];
        this.roleIdList = [];
        this.node.removeAllChildren();
        this.node.y = 0;
        for (let i in this.lastResult) {
            this.lastResult[i] = this.lastResult[i] == 0 ? this.getRandomId() : this.lastResult[i];
            this.addRole(this.lastResult[i]);
        }
        for (let i = 0; i < ROLENUM - 12; i++) {
            this.addRole(this.getRandomId());
        }
        for (let i in args) {
            this.addRole(args[i]);
        }
        this.addRole(this.getRandomId());
        setTimeout(() => {
            let timer = TIMEMIN + this.wheelId * 0.2;
            // timer = !this.mainObj.auto ? TIMEMIN : timer;
            this.node.runAction(
                cc.sequence(
                    cc.delayTime(0.2),
                    cc.moveTo(timer, cc.v2(this.node.x, -this.node.height + 585)),
                    cc.moveTo(0.1, cc.v2(this.node.x, -this.node.height + 640)),
                    cc.moveTo(0.1, cc.v2(this.node.x, -this.node.height + 585)),
                    cc.callFunc(this.rollCallBack.bind(this))
                )
            );
        }, 100);
    },

    getRandomId() {
        let randomId = 0;
        while (randomId == 0) {
            if (this.mainObj.freeTimes > 0 || this.mainObj.stopFree) {
                randomId = Math.floor(Math.random() * (this.mainObj.rolePb.length - 1) + 1);
                randomId = randomId == 6 ? 12 : randomId;
            } else {
                randomId = Math.floor(Math.random() * (this.mainObj.rolePb.length - 1) + 1);
            }
            randomId = randomId == this.excludeId ? 0 : randomId;
        };
        return randomId;
    },

    addRole(id) {
        let pb = cc.instantiate(this.mainObj.rolePb[id]);
        this.rolePbList.push(pb);
        this.roleIdList.push(id);
        this.node.addChild(pb);
    },

    rollCallBack() {
        this.audio.playStopWheel();
        this.lastResult = this.roleIdList.slice(-5);
        this.status = 0;
        this.mainObj.stateCallBack();
    },

    stopImmediately() {
        this.lastResult = this.roleIdList.slice(-5);
        this.node.stopAllActions();
        setTimeout(() => {
            this.node.y = -this.node.height + 585;
        }, 50);
        this.status = 0;
        this.mainObj.stateCallBack();
    },
});