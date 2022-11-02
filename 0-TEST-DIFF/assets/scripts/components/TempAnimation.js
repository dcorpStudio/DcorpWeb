// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        isSkeAnim:{
            default: false,
            displayName:"骨骼动画？"
        },
        sketNode: {
            default: null,
            type: cc.Node,
            displayName:"骨骼数据"
        },
        animArray:{
            default: [],
            type: cc.String,
            displayName:"动画列表"
        }

    },

    onLoad() {
    },

    start() {
        if (this.isSkeAnim) {
            this.sket = this.sketNode.getComponent(sp.Skeleton);
            if (!cc.isValid(this.sket)) return;
            this.sket.timeScale = 0.5;
            this.stopAnim();
        } else {
            this.anim = this.getComponent(cc.Animation);
        }
    },

    playAnim(){
        if (this.isSkeAnim) {
            if (!cc.isValid(this.sket)) return;
            this.sket.clearTrack(0);
            for (const iterator of this.animArray) {
                this.sket.setAnimation(0, iterator, true);
            }
        }else{
            if (!cc.isValid(this.anim)) return;
            this.anim.play();
        }
    },

    stopAnim(){
        if (this.isSkeAnim) {
            if (!cc.isValid(this.sket)) return;
            this.sket.clearTracks()
        }else{
            if (!cc.isValid(this.anim)) return;
            this.anim.setCurrentTime(0);
            this.anim.stop();
        }
    }
});
