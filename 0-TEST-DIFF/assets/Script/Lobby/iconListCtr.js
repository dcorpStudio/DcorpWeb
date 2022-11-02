cc.Class({
    extends: cc.Component,

    properties: {
        bgArray: [cc.Node],
    },

    setAllChildDisplay(isShow, idx) {
        for (const iterator of this.node.children) {
            iterator.active = isShow;
        }

        for (const iterator of this.bgArray) {
            iterator.active = false;
        }
        this.bgArray[idx].active = true;
    },

    onToggleClick(toggle, cus) {
        console.log("点击切换按钮", cus);
        this.node.getComponent(cc.ScrollView).scrollToLeft(0.1);
        switch (cus) {
            case "all":
                this.setAllChildDisplay(true, 0);
                break;
            case "qipai":
                this.setAllChildDisplay(false, 1);
                for (const iterator of this.node.children) {
                    if (iterator.gameType == 0) {
                        iterator.active = true;
                    }
                }
                break;
            case "dianwan":
                this.setAllChildDisplay(false, 2);
                for (const iterator of this.node.children) {
                    if (iterator.gameType == 1) {
                        iterator.active = true;
                    }
                }
                break;
            case "laohuji":
                this.setAllChildDisplay(false, 3);
                for (const iterator of this.node.children) {
                    if (iterator.gameType == 2) {
                        iterator.active = true;
                    }
                }
                break;
            case "buyu":
                this.setAllChildDisplay(false, 4);
                for (const iterator of this.node.children) {
                    if (iterator.gameType == 3) {
                        iterator.active = true;
                    }
                }
                break;
            case "Favorites":
                this.setAllChildDisplay(false, 5);
                for (const iterator of this.node.children) {
                    if (iterator.isFavor) {
                        iterator.active = true;
                    }
                }
                break;
            default:
                this.setAllChildDisplay(false, 0);
                break;
        }
    },

});
