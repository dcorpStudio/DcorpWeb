cc.Class({
    extends: cc.Component,

    properties: {
        Panel_multi_language : cc.Node,
    },
    
    onBtnClick : function () 
    {
        this.node.active = false;
        this.Panel_multi_language.active = true;
    }
});