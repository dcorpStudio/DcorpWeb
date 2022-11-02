
cc.Class({
    extends: cc.Component,

    properties: {
        origin : 1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.origin = this.node.scale;
    },

    onEnable(){
       if (this.allLoad)
       {
           this.open();
       }else{
           this.node.scale = 0;
       }
    },

    start () {
        if (!this.allLoad)
        {
            this.node.runAction(cc.sequence(cc.delayTime(0.1),cc.callFunc(
                function(){
                    this.open();
                    this.allLoad = true;
                },this
            )));
        }
    },

    open(){
        this.node.stopAllActions();
        this.node.scale = this.origin * 0.1;

        var ac = cc.sequence(cc.scaleTo(0.2,1.05),cc.scaleTo(0.1,1));
        this.node.runAction(ac);

    },

    close()
    {
        this.node.stopAllActions();
        this.node.scale = this.origin;
        this.node.runAction(cc.sequence(cc.scaleTo(0.2,0.1) , cc.callFunc(
            function(){
                this.node.active = false;
            },this
        )));
    }

    // update (dt) {},
});
