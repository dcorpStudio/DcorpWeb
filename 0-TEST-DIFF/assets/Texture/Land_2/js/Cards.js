/**
 * 斗地主卡牌管理类
 */
cc.Class({
    extends: cc.Component,

    properties: {
        //扑克容器
        pb_Cards: {
            default: [],
            type: cc.SpriteFrame
        },
        handCard: false,
        selectedCard: false,
        outCard: false,
        moved: false,
        subscript: 0
    },

    /**
     * 创建扑克牌
     * @param {*} value 值
     * @param {*} type  花色
     */
    cardsCreate: function (value, type) {
        this.val = value;
        this.type = type;
        this.handCard = true;
        //类型等于5代表是王
        if (type == 5) {
            //值是14为小王,15为大王
            if (value == 14) {
                //小王
                this.node.getComponent("cc.Sprite").spriteFrame = this.pb_Cards[53];
            } else {
                //大王
                this.node.getComponent("cc.Sprite").spriteFrame = this.pb_Cards[54];
            }
        } else {
            //A-K
            this.node.getComponent("cc.Sprite").spriteFrame = this.pb_Cards[13 * (type - 1) + value];
        }
    },

    /**
     * 卡牌移动
     */
    moveCard: function () {
        if (this.handCard) {
            this.node.setPosition(this.node.position.x, this.node.position.y + 20);
            this.handCard = false;
        } else {
            this.node.setPosition(this.node.position.x, this.node.position.y - 20);
            this.handCard = true;
        }
        this.node.parent.parent.getComponent("LandlordsMain").primaryNum();
    },

    /**
     * 
     */
    changeHui: function () {
        this.node.color = new cc.Color(144, 144, 144);
    },

    /**
     * 
     */
    changeBai: function () {
        this.node.color = new cc.Color(255, 255, 255);
    }
});