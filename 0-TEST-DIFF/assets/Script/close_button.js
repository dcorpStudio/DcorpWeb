
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
    onClick()
    {
        playEffect('Click');;
        this.node.active = false;
    }
});
