cc.Class({
    extends: cc.Component,

    properties: {
        toggleGroup: cc.ToggleContainer,
        gameList: cc.Node,//游戏选框
    },

    // onLoad () {},

    start() {

    },
    //刷新创建的UI
    changeGameType() {
        let toggleArray = this.toggleGroup.toggleItems;
        toggleArray[window.gameType].isChecked = true;
        for (let i = 0; i < this.gameList.children.length; i++) {
            if (i == window.gameType) {
                this.gameList.children[i].active = true;
            } else {
                this.gameList.children[i].active = false;
            }
        }
    },

    gameType_toggleClick(event, args) {
        let str = event.node.name;
        str = str.charAt(str.length - 1);
        window.gameType = parseInt(str);
        this.changeGameType();
    },
});
