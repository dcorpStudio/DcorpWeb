cc.Class({
    extends: cc.Component,

    properties: {
        com_btn: cc.Node,
        com_createRoom: cc.Node,
        back_btn: cc.Node,
    },

    start() {
        this.com_btn.active = true;
        this.node.y = -1000;
        this.back_btn.active = false;
    },

    setAllChildDisplay(isShow) {
        this.node.active = true;
        this.node.y = -18;
        this.com_btn.active = false;
        this.back_btn.active = true;
        for (const iterator of this.node.children) {
            iterator.active = isShow;
        }
    },

    onToggleClick(toggle, cus) {
        console.log("点击切换按钮", cus);
        this.node.getComponent(cc.ScrollView).scrollToLeft(0.1);
        switch (cus) {
            case "return":
                //隐藏子节点下的全部按钮
                for (var i = 0; i < this.node.parent.children.length; i++) {
                    this.node.parent.children[i].active = false;
                }
                this.com_btn.active = true;
                this.node.active = false;
                this.back_btn.active = false;
                break;
            case "qipai":
                this.setAllChildDisplay(false);
                for (const iterator of this.node.children) {
                    if (iterator.gameType == 0) {
                        iterator.active = true;
                    }
                }
                break;
            case "dianwan":
                this.setAllChildDisplay(false);
                for (const iterator of this.node.children) {
                    if (iterator.gameType == 1) {
                        iterator.active = true;
                    }
                }
                break;
            case "buyu":
                this.setAllChildDisplay(false);
                for (const iterator of this.node.children) {
                    if (iterator.gameType == 3) {
                        iterator.active = true;
                    }
                }
                break;
            case "fangjian":
                this.com_createRoom.active = true;
                break;
        }
    },

});
