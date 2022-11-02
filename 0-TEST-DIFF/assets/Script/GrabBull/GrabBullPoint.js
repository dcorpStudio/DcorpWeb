/**
 * 牛牛点数动画管理
 */
cc.Class({
    extends: cc.Component,

    properties: {
        type: 0
    },
    onLoad: function() {
        this.pointDisplay = this.getComponent("dragonBones.ArmatureDisplay");
        this.pointArmature = this.pointDisplay.armature();
    },

    /**
     * 设置牌型
     * @param {*} type 
     */
    setType_Function: function(type) {
        this.type = type;
        this.setFrame_Function(type);
    },

    /**
     * 设置牌面材质
     * @param {*} type 
     */
    setFrame_Function: function(type) {
        this.pointDisplay.playAnimation("point" + type, 1);
    }
});
