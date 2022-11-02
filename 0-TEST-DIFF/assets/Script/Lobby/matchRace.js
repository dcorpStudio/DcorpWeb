cc.Class({
    extends: cc.Component,

    properties: {
        list: cc.Node,
        pb: cc.Prefab,
    },

    init(dataList) {
        console.log(dataList);
        this.pbList = [];
        this.dataList = dataList;
        this.list.removeAllChildren();
        this.index = 0;
        for (let i = 0; i <= 4; i++) {
            !!this.dataList[i] && this.initPb(this.dataList[i]);
        }
        this.unschedule(this.runAct);
        if (this.dataList.length > 5) {
            this.schedule(this.runAct, 2);
        }
    },

    runAct() {
        let pb = this.pbList.shift();
        pb.removeFromParent();
        this.index = this.index >= this.dataList.length ? 0 : this.index;
        this.initPb(this.dataList[this.index]);
    },


    initPb(data) {
        let p = cc.instantiate(this.pb);
        let head = p.getChildByName('face').getComponent(cc.Sprite);
        Helper.loadHead(data.head_url, texture => {
            head.spriteFrame = texture;
        });
        p.getChildByName('name').getComponent(cc.Label).string = data.nick_name;
        p.getChildByName('New Label').getComponent(cc.Label).string = `${data.win_all}胜  ${data.play-data.win_all}负`;
        this.list.addChild(p);
        this.pbList.push(p);
        this.index++;
    },

    // update (dt) {},
});