var self = null;
cc.Class({
    extends: cc.Component,

    properties: {
        JackpotLabel: {
            type: cc.Node,
            default: null
        },
        zuobiao: {
            default: [],
            type: cc.String
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.allnum = this.JackpotLabel.children;
        self = this;
    },
    ShowJackPot(num) {
        num = parseInt(num / 100);
        num += '';
        num = num.split('');
        var num1 = [];
        for (let i = num.length - 1; i >= 0; i--) { //数字变为倒序
            num1.push(num[i]);
            if (i == 0) {
                this.aa(num1);
            }
        }
    },
    aa(num1) {
        // console.log('!!!!',num1);
        num1.forEach((element, index) => { //控制每一位的数字选择
            if (element != '.') {
                self.allnum[index].runAction(cc.moveTo(0.5, cc.v2(self.allnum[index].x, self.zuobiao[element])));
            }
        });
    },
    start() {

    },

    // update (dt) {},
});