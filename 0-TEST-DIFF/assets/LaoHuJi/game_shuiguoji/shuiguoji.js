var zhuanpan = require("zhuanpan");
var StateMachine = require("stateMachine");
var shuiguoji_socket = require('../module/SocketIO/game_socket');
var Global = null;
cc.Class({
    extends: cc.Component,

    properties: {
        ZhuanPan: zhuanpan,
        MaxXiaZhu: {
            default: 99,
            tooltip: "最大下注数",
        },
        Interval: {
            default: 2,
            tooltip: '从开始状态到停止状态必须等待的间隔时间（秒）',
        },
        ShowTime: {
            default: 5,
            tooltip: "中奖展示时间(秒)",
        },
        Timeout: {
            default: 10,
            tooltip: "连接超时倒计时(秒)",
        },
        LabelJinBi: {
            default: null,
            type: cc.Label,
            tooltip: '金币文字',
        },
        LabelJiangLi: {
            default: null,
            type: cc.Label,
            tooltip: '奖励文字',
        },
        PanelXinXi: {
            default: null,
            type: cc.Node,
            tooltip: '信息界面',
        },
        PanelQianBuGou: {
            default: null,
            type: cc.Node,
            tooltip: '钱不够界面',
        },
        PanelQingXiaZhu: {
            default: null,
            type: cc.Node,
            tooltip: '请下注界面',
        },
        NodeAudioParent: cc.Node,//所有音效的父节点
        stateMachine: StateMachine,//状态机
        BtnArrayInteraction: {
            default: [],
            type: [cc.Button],
            tooltip: '所有需要在状态变化时改变可交互性的按钮的集合',
        },
        LabelArrayXiaZhu: {
            default: [],
            type: cc.Label,
            tooltip: "下注的文字Label数组",
        },
        ServerDataToLocalData: {
            default: [],
            type: [cc.Integer],
            tooltip: "服务器索引数据转本地索引数据",
        },
        show_duzhu:{
            default: null,
            type: cc.Label,
            tooltip: '压注金额',
        },
        show_yazhu:{
            default: null,
            type: cc.Label,
            tooltip: '单注金额',
        },
        show_beilv:{
            default: null,
            type: cc.Label,
            tooltip: '倍率',
        },
        icon:{
            default: [],
            type:cc.SpriteFrame
        },
        show_history:{
            default: null,
            type: cc.Node,
            tooltip: '历史记录节点',
        },
        history_shuiguo:{
            default: null,
            type: cc.Prefab,
            tooltip: '历史水果图标',
        }
    },

    //取消注册
    onDestroy: function () {
        //////KBEngineEvent.deregister("onBet", this);
        //////KBEngineEvent.deregister("onGetAccountInfo", this);
    },

    start: function () {
        //////KBEngineEvent.register("onBet", this, "onBet");
        //////KBEngineEvent.register("onGetAccountInfo", this, "onGetAccountInfo");
        Global=require("PlayerInfo").getInstant;
        this.url=Lhjconfig.Server_IP+Lhjconfig.shuiguoji_Port;
        shuiguoji_socket.socket_Inin(this.url,'shuiguoji',Global);                      //连接水果机服务器
        shuiguoji_socket.Nowcanvas=this;
        this.LabelJinBi.string = Global.playerCoin.toFixed(2); //总金币数

        this._itemArrayLength = this.LabelArrayXiaZhu.length;
        this._intArrayXiaZhu = new Array(this._itemArrayLength);    //每种水果的注数
        this.duzhuMoney=100;              //单注金额
        this.beilv=1;                     //倍率  
        this.show_duzhu.string=0;         //压注金额
        this.show_yazhu.string=this.duzhuMoney*0.01; //显示单注金额
        this.show_beilv.string=this.beilv;           //显示倍率

        for (var i = 0; i < this._itemArrayLength; i++) {
            this._intArrayXiaZhu[i] = 0;
        }
        this.RefreshLabel();
        this._autoFlag = false;//自动状态

        var self = this;
        this.node.on('Event_ZhuanPanStop', function (event) {
            event.stopPropagation();//停止传递当前事件
            //显示结果
            if(self._winCoin > 0){
                self.stateMachine.Input_Ready(self.ShowTime);
            }
            else{
                self.stateMachine.Input_Ready(0.01);
            }
        });

        //监听状态机改变事件
        this.node.on('Event_StateChange', function (event) {
            event.stopPropagation();//停止传递当前事件
            //不知道怎么用js写枚举变量，先用整数代替吧
            //规定state === 0 表示准备状态，解除界面交互限制
            //规定state === 1 表示开始状态，转动转轮，限制部分界面交互功能
            //规定state === 2 表示停止状态，停止转轮并显示图标结果
            //规定state === 3 表示中奖展示状态,显示结算
            //规定state === 4 表示错误状态，停止转轮
            switch (event.detail) {
                case 0:
                    //准备状态，解除界面交互限制
                    self.SetPanelInteraction(true);
                    break;
                case 1:
                    //开始状态，转动转轮，限制部分界面交互功能
                    self.SetPanelInteraction(false);
                    //发动
                    self.ZhuanPan.Launch();
                    //给服务器发消息
                    //拼个买哪条线的数组给服务器
                    //////KBEngineapp.player().reqBet(self._intArrayXiaZhu, Global.currentGameID);//最后一个参数是游戏ID
                    var now__intArrayXiaZhu=[];
                    for(let i=0;i<self._intArrayXiaZhu.length;i++){
                        now__intArrayXiaZhu[i]= self._intArrayXiaZhu[i]*self.duzhuMoney*self.beilv;
                    }
                    shuiguoji_socket.reqBet('lottery',JSON.stringify({nBetList:now__intArrayXiaZhu}));
                    Global.playerCoin = Global.playerCoin - self.GetDuZhu()*0.01;
                    console.log('赌注:',now__intArrayXiaZhu);
                    self.LabelJinBi.string = Global.playerCoin.toFixed(2); //总金币数扣除赌注金额
                    break;
                case 2:
                    //停止状态，停止转轮并显示图标结果
                    if (self._listWinLines.length > 1) {
                        var length = self._listWinLines.length;
                        var listWinItems = new Array(length);
                        for (var i = 0; i < length; i++) {
                            listWinItems[i] = self.ServerDataToLocalData[self._listWinLines[i]];//拼一个本地的中奖图标数组
                        }
                        console.log('size:',listWinItems);
                        self.ZhuanPan.StopLucky(listWinItems);
                    }
                    else {
                        self.ZhuanPan.Stop(self.ServerDataToLocalData[self._listWinLines[0]]);
                    }
                    self.history(self._listWinLines[0]);
                    break;
                case 3:
                    //中奖展示状态,显示结算
                    self.LabelJinBi.string = Global.playerCoin;//总金币数
                    self.LabelJiangLi.string = self._winCoin;//显示本局赢多少钱
                    
                    break;
                case 4:
                    //错误状态，停止转轮
                    self.ZhuanPan.Stop(0);
                    break;
                default:
                    //走到这肯定出错了
                    break;
            }
        });
    },

    update: function (dt) {
        //规定state === 0 表示准备状态
        if (this.stateMachine.GetState() === 0 && this._autoFlag) {
            this.onBtnClick_KaiShi();
        }
    },

    //点击信息按钮
    onBtnClick_XinXi: function () {
        this.PanelXinXi.active = !this.PanelXinXi.active;
    },

    //点击开始按钮
    onBtnClick_KaiShi: function () {
        var duzhu = this.GetDuZhu();
        if (duzhu <= 0) {
            this.PanelQingXiaZhu.active = true;//请下注界面
            return;
        }
        if (duzhu * 0.01 > Global.playerCoin) {
            this.PanelQianBuGou.active = true;//钱不够界面
        }
        else {
            this.stateMachine.Input_Start(this.Interval, this.Timeout);
        }
    },

    onBtnClick_xiazhu: function (event, itemIndex) {
        if (this._intArrayXiaZhu[itemIndex] < this.MaxXiaZhu) {
            this._intArrayXiaZhu[itemIndex]++;
            this.RefreshLabel();
        }
        this.show_duzhu.string=this.GetDuZhu()*0.01;
    },
    onBtnClick_addMoney:function(){     //加钱
        if(this.duzhuMoney>900){return;}
        this.duzhuMoney+=100;
        this.show_yazhu.string=this.duzhuMoney*0.01;
        this.show_duzhu.string=this.GetDuZhu()*0.01;
    },
    onBtnClick_delMoney:function(){     //减钱
        if(this.duzhuMoney<=100){return;}
        this.duzhuMoney-=100;
        this.show_yazhu.string=this.duzhuMoney*0.01;
        this.show_duzhu.string=this.GetDuZhu()*0.01;
    },
    onBtnClick_addBeiLv:function(){     //增加倍率
        if(this.beilv>=10){return;}
        this.beilv++;
        this.show_beilv.string=this.beilv;
        this.show_duzhu.string=this.GetDuZhu()*0.01;
    },
    onBtnClick_delBeiLv:function(){     //减少倍率
        if(this.beilv<=1){return;}
        this.beilv--;
        this.show_beilv.string=this.beilv;
        this.show_duzhu.string=this.GetDuZhu()*0.01;
    },

    onBtnClick_xiazhu_all: function () {
        for (var i = 0; i < this._itemArrayLength; i++) {
            if (this._intArrayXiaZhu[i] < this.MaxXiaZhu) {
                this._intArrayXiaZhu[i]++;
            }
        }
        this.RefreshLabel();
    },

    onBtnClick_clear: function () {
        for (var i = 0; i < this._itemArrayLength; i++) {
            this._intArrayXiaZhu[i] = 0;
        }
        this.RefreshLabel();
    },

    RefreshLabel: function () {
        var xiazhu;
        for (var i = 0; i < this._itemArrayLength; i++) {
            if (this._intArrayXiaZhu[i] < 10) {
                xiazhu = "0" + this._intArrayXiaZhu[i];
            }
            else {
                xiazhu = this._intArrayXiaZhu[i];
            }
            this.LabelArrayXiaZhu[i].string = xiazhu;
        }
        this.show_duzhu.string=this.GetDuZhu()*0.01;
    },

    //点击自动开关
    onToggleClick_ZiDong: function (toggle, customEventData) {
        this._autoFlag = !toggle.isChecked;
    },

    //点击声音开关
    onToggleClick_ShengYin: function (toggle, customEventData) {
        if (toggle.isChecked === true) {
            for (var i = 0; i < this.NodeAudioParent.children.length; i++) {
                this.NodeAudioParent.children[i].getComponent(cc.AudioSource).volume = 1;
            }
        }
        else {
            for (var i = 0; i < this.NodeAudioParent.children.length; i++) {
                this.NodeAudioParent.children[i].getComponent(cc.AudioSource).volume = 0;
            }
        }
    },

    //点击返回大厅按钮
    onBtnClick_BackHall: function () {
        shuiguoji_socket.exit();
        cc.director.loadScene(window.hallName);
    },

    //关闭弹出界面
    onBtnClick_closePanel: function (event, customEventData) {
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        event.target.parent.active = false;
    },

    //接收到服务器消息：返回游戏结果
    onBet: function (nSuccess, dict,userdata) {
        console.log(dict.nWinLines);
        this._winCoin = dict["win"];//保存服务器返回的本局赢多少钱
        this._listWinLines = dict["nWinLines"];//保存服务器返回的中哪一条线
        this.stateMachine.Input_Stop();
        Global.playerCoin = userdata.userscore;//更新游戏金币数量
       
    },

    //收到消息:得到账户信息
    onGetAccountInfo: function (nSuccess, dict, dictList) {
        if (nSuccess === 1) {
            //success
            //保存用户信息
            // Global.accountInfo = dict;
            // Global.freeTimes = dictList;
        }
        else {
            //fail
        }
    },

    //调整界面交互性
    SetPanelInteraction: function (interactable) {
        var length = this.BtnArrayInteraction.length;
        for (var i = 0; i < length; i++) {
            this.BtnArrayInteraction[i].interactable = interactable;
        }
    },

    //计算得到下注金额
    GetDuZhu: function () {
        var sum = 0;
        for (var i = 0; i < this._itemArrayLength; i++) {
            sum += this._intArrayXiaZhu[i]*this.duzhuMoney*this.beilv;
        }
        return sum;
    },
    onFreeTime:function(num){
       // this.Free_shuzi.string=num;             //刷新免费次数 水果机无用
    },
    history:function(lines){
        if(this._winCoin==null||this._winCoin==0){return;}  //没有中奖不显示历史记录
        var allnode=this.show_history.children;
        if(allnode.length>=8){
            allnode[7].destroy();
        }
        if(allnode.length>0){
            allnode[0].zIndex=0;
        }
        var n = cc.instantiate(this.history_shuiguo); 
        n.getComponent(cc.Sprite).spriteFrame=this.icon[lines];
        n.zIndex = -1;
        n.parent=this.show_history;
    }
});