cc.Class({
    extends: cc.Component,

    properties: {
        Panel_choose_language : cc.Node,
    },

    onBtnClick_arrow: function () 
    {
        this.node.active = false;
        this.Panel_choose_language.active = true;
    },
});