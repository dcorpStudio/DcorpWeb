cc.Class({
    extends: cc.Component,

    properties: {
        shouhuo_bg: cc.Node,
        xiangqing: cc.Node,
        duihuanjilu: cc.Node,
        diamondLab: cc.Label,
        bangzhu: cc.Node,//帮助界面
        typeScroll: cc.ScrollView,//商品类别列表
        typePreb: cc.Prefab,
        shopList: cc.ScrollView,//商品列表
        goodsItem: cc.Prefab,
        recordList: cc.ScrollView,//兑换记录列表
        recordItem: cc.Prefab,
        //商品详情页
        goodsSp: cc.Sprite,
        goodsIdLab: cc.Label,
        goodsPirceLab: cc.Label,
        goodsNumLab: cc.Label,
        goodsNameLab: cc.Label,
        goodsDecLab: cc.Label,
        needNumLb: cc.Label,
        //收货信息页
        shouhuoAdressEdit: cc.EditBox,
        shouhuoNameEdit: cc.EditBox,
        shouhuoPhoneEdit: cc.EditBox,
    },

    onLoad() {
        this.init();
        this.playerInfo = require("PlayerInfo").getInstant;
        this.netWork = require("LobbyNetWork");
    },

    start() {

    },
    //初始化
    init() {
        this.shouhuo_bg.active = false;
        this.xiangqing.active = false;
        this.duihuanjilu.active = false;
        this.bangzhu.active = false;
    },
    //打开商城面板
    onOpenPanel(ret) {
        this.typeScroll.content.removeAllChildren();
        this.diamondLab.string = this.playerInfo.playerDiamond;
        this.goodsList = ret;
        for (let i in ret) {
            let newNode = cc.instantiate(this.typePreb);
            this.typeScroll.content.addChild(newNode);
            newNode.getComponent("typeToggleCtrl").setView(i);
        }
        this.updateList(Object.keys(ret)[0]);
    },

    updateList(type) {
        this.shopList.content.removeAllChildren();
        for (let i in this.goodsList[type]) {
            let newNode = cc.instantiate(this.goodsItem);
            this.shopList.content.addChild(newNode);
            newNode.getComponent("goodsItem").setView(this.goodsList[type][i]);
        }
    },
    //点击收货
    onBtnClick_exchange() {
        this.shouhuo_bg.active = true;
        this.netWork.socket.emit("getShopPlayerInfo");
    },
    //更新收货信息
    updateShouhuo(res) {
        this.shouhuoAdressEdit.string = res[0].address;
        this.shouhuoNameEdit.string = res[0].playerName;
        this.shouhuoPhoneEdit.string = res[0].phone;
    },
    //提交收货信息
    onBtnClick_submitInfo() {
        this.shouhuo_bg.active = false;
        this.netWork.socket.emit("updateShopPlayerInfo", {
            adress: this.shouhuoAdressEdit.string,
            userName: this.shouhuoNameEdit.string,
            phone: this.shouhuoPhoneEdit.string
        });
    },
    //点击详情
    onBtnClick_xiangqin(data) {
        this.xiangqing.active = true;
        Helper.loadHead(data.goodsUrl, sp => {
            this.goodsSp.spriteFrame = sp;
        });
        this.nowId = data.id;
        this.goodsIdLab.string = "ID : " + data.id;
        this.goodsPirceLab.string = data.goodsPrice;
        this.goodsNumLab.string = data.goodsNum;
        this.goodsNameLab.string = data.goodsName;
        this.goodsDecLab.string = data.goodsDescribe;
        this.needNumLb.string = 1;
        this.goodsPrice = data.goodsPrice;
    },
    //详情页增减数量
    addBtn() {
        if (parseInt(this.needNumLb.string) + 1 > parseInt(this.goodsNumLab.string)) {
            return;
        }
        this.needNumLb.string = parseInt(this.needNumLb.string) + 1;
        this.goodsPirceLab.string = this.goodsPrice * parseInt(this.needNumLb.string);
    },

    sunBtn() {
        if (parseInt(this.needNumLb.string) <= 1) {
            return;
        }
        this.needNumLb.string = parseInt(this.needNumLb.string) - 1;
        this.goodsPirceLab.string = this.goodsPrice * parseInt(this.needNumLb.string);
    },

    onBtnClick_submit() {
        this.xiangqing.active = false;
        this.netWork.socket.emit("requestGetShopItem", {
            id: this.nowId,
            needNum: parseInt(this.needNumLb.string),
        });
    },
    //刷新商品数据
    updateListData() {
        this.netWork.socket.emit("getShoppingList");
    },
    //点击兑换记录
    onBtnClick_duihuanjilu() {
        this.duihuanjilu.active = true;
        this.netWork.socket.emit("getShouhuoRecord");
    },

    updateRecordData(data) {
        this.recordList.content.removeAllChildren();
        for (let i in data) {
            let newNode = cc.instantiate(this.recordItem);
            this.recordList.content.addChild(newNode);
            newNode.getComponent("shop_recordItem").setView(data[i]);
        }
    },
    //点击帮助
    onBtnClick_bangzhu() {
        this.bangzhu.active = true;
    },
    //通用关闭界面
    onBtnClick_closePanel(event) {
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        event.target.parent.active = false;
    },
});
