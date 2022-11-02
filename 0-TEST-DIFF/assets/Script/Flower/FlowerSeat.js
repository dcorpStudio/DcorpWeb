cc.Class({
    extends: cc.Component,
    properties: {
        cavas: {
            default: null,
            type: cc.Node
        },
        _sprIcon: null,
        _zhuang: null,
        _ready: null,
        _offline: null,
        _lblName: null,
        _lblScore: null,
        _nddayingjia: null,
        _userName: "",
        _score: 0,
        _dayingjia: false,
        _isOffline: false,
        _isReady: false,
        _isZhuang: false,
        _userId: null,
        _isKanPai: false,
        _isQiPai: false,
        _isShu: false,
        _timeLabel: null,
        _time: -1,
    },
    // use this for initialization
    onLoad: function () {
        this._sprIcon = this.node.getChildByName("head").getComponent(cc.Sprite);
        this._lblName = this.node.getChildByName("name").getComponent(cc.Label);
        this._lblScore = this.node.getChildByName("money").getComponent(cc.Label);
        this._costMoney = this.node.getChildByName("zjh14").getChildByName("xiazhu").getComponent(cc.Label);
        this._kanicon = this.node.getChildByName("kanicon");
        this._shuicon = this.node.getChildByName("shuicon");
        this._qiicon = this.node.getChildByName("qiicon");
        this._kanpai = this.node.getChildByName("kanpai");
        this._saykanpai = this.node.getChildByName("saykanpai");
        this._genzhu = this.node.getChildByName("genzhu");
        this._jiazhu = this.node.getChildByName("jiazhu");
        this._fangqi = this.node.getChildByName("fangqi");
        this._pkButton = this.node.getChildByName("pk_button");
        this._yanhua = this.node.getChildByName("yanhua");
        this._yanhuaAnim = this._yanhua.getComponent(cc.Animation);
        this._timeLabel = this.node.getChildByName("toggle").getChildByName("lblTime").getComponent(cc.Label);
        this._timeLabel.string = "00";
        this._zhuang = this.node.getChildByName("zhuang");
        this.refresh();
        // if (this._sprIcon && this._userId) {
        //     this._sprIcon.setUserID(this._userId);
        // }
    },
    onIconClicked: function () {
        // if (this._userId != null && this._userId > 0) {
        //     var seat = cc.vv.gameNetMgr.getSeatByID(this._userId);
        //     var sex = 0;
        //     if (cc.vv.baseInfoMap) {
        //         var info = cc.vv.baseInfoMap[this._userId];
        //         if (info) {
        //             sex = info.sex;
        //         }
        //     }
        // }
    },
    refresh: function () {
        if (this._lblName != null) {
            this._lblName.string = this._userName;
        }
        if (this._lblScore != null) {
            this._lblScore.string = this._score;
        }
        if (this._nddayingjia != null) {
            this._nddayingjia.active = this._dayingjia == true;
        }
        if (this._offline) {
            this._offline.active = this._isOffline && this._userName != "";
        }
        if (this._ready) {
            this._ready.active = this._isReady && (cc.vv.gameNetMgr.numOfGames > 0);
        }
        if (this._zhuang) {
            this._zhuang.active = this._isZhuang;
        }
        this.node.active = this._userName != null && this._userName != "";
        if (this._kanicon) {
            this._kanicon.active = this._isKanPai;
        }
        if (this._shuicon) {
            this._shuicon.active = this._isShu;
        }
        if (this._qiicon) {
            this._qiicon.active = this._isQiPai;
        }
        if (this._kanpai) {
            this._kanpai.active = false;
        }
        if (this._saykanpai) {
            this._saykanpai.active = false;
        }
        if (this._genzhu) {
            this._genzhu.active = false;
        }
        if (this._jiazhu) {
            this._jiazhu.active = false;
        }
        if (this._fangqi) {
            this._fangqi.active = false;
        }
        if (this._pkButton) {
            this._pkButton.active = false;
        }
        if (this._yanhua) {
            this._yanhua.active = false;
        }
    },
    setInfo: function (name, score, head) {
        this._userName = name;
        Helper.loadHead(head, sp => {
            if (!!this._sprIcon) this._sprIcon.spriteFrame = sp;
        });

        this._score = score;
        if (this._score == null) {
            this._score = 0;
        }
        if (this._lblScore != null) {
            this._lblScore.node.active = this._score != null;
        }
        this.refresh();
    },
    setZhuang: function (value) {
        this._isZhuang = value;
        if (this._zhuang) {
            this._zhuang.active = value;
        } else {
            this._zhuang = this.node.getChildByName("zhuang");
            this._zhuang.active = value;
        }
    },
    setReady: function (isReady) {
        this._isReady = isReady;
        if (this._ready) {
            this._ready.active = this._isReady && (cc.vv.gameNetMgr.numOfGames > 0);
        }
    },
    setID: function (id) {
        var idNode = this.node.getChildByName("id");
        if (idNode) {
            var lbl = idNode.getComponent(cc.Label);
            lbl.string = "ID:" + id;
        }
        this._userId = id;
        // if (this._sprIcon) {
        //     this._sprIcon.setUserID(id);
        // }
    },
    getID: function () {
        return this._userId;
    },
    setOffline: function (isOffline) {
        this._isOffline = isOffline;
        if (this._offline) {
            this._offline.active = this._isOffline && this._userName != "";
        }
    },

    setMoney: function (data) {
        //设置该玩家所拥有的的钱
        this._lblScore.string = data;
        this._score = data;
    },
    setCostMoney: function (data) {
        //设置该玩家本局所压的注
        if (data) {
            console.log('注池数据' + JSON.stringify(data));
            this._costMoney.string = (data / 100).toFixed(2);
        }
        if (!this.node.getChildByName("zjh14").active) this.node.getChildByName("zjh14").active = true;
    },
    showGenZhu: function () {
        var self = this;
        self._genzhu.active = true;
        setTimeout(function () {
            self._genzhu.active = false;
        }, 1000);
    },
    /**
     * 显示开牌图标
     */
    showKanPai: function () {
        var self = this;
        this._kanicon.active = true;
        this._saykanpai.active = true;
        var stime = setTimeout(function () {
            clearTimeout(stime);
            self._saykanpai.active = false;
        }, 1000);
    },
    showJiaZhu: function () {
        var self = this;
        self._jiazhu.active = true;
        setTimeout(function () {
            self._jiazhu.active = false;
        }, 1000);
    },
    showQiPai: function (status) {
        var self = this;
        if (status == 'shu') {
            self._shuicon.active = true;
        } else {
            self._qiicon.active = true;
            self._fangqi.active = true;
            setTimeout(function () {
                if (self._fangqi) {
                    self._fangqi.active = false;
                }
            }, 1000);
        }
    },
    showPkButton: function () {
        if (this._pkButton) {
            this._pkButton.active = true;
        }
    },
    hidePkButton: function () {
        if (this._pkButton) {
            this._pkButton.active = false;
        }
    },
    onClickPkButton: function () {
        this.cavas.getComponent("FlowerMain").clickPkButton(this._userId);
    },
    showYanhua: function () {
        if (this._yanhua) {
            this._yanhua.active = true;
            this._yanhuaAnim.play('yanhua');
        }
    },
    setTime: function (o) {
        if (o) {
            this._time = 0;
        } else {
            this._time = 30;
        }
    },
    fanPai: function (spriteFrames) {
        cc.log('进行翻牌-----------------------------------')
        for (var i = 0; i < 3; i++) {
            var zhengpai = this._kanpai.getChildByName('zhengpai' + i);
            var paiObj = spriteFrames[i];
            var numRes = paiObj['num'];
            var huase_bigRes = paiObj['huase_big'];
            var huase_smallRes = paiObj['huase_small'];
            zhengpai.getChildByName('num').getComponent(cc.Sprite).spriteFrame = numRes;
            zhengpai.getChildByName('huase_big').getComponent(cc.Sprite).spriteFrame = huase_bigRes;
            zhengpai.getChildByName('huase_small').getComponent(cc.Sprite).spriteFrame = huase_smallRes;
        }
        this.hideFupai();
        this._kanpai.active = true;
    },
    hideFupai: function () {
        cc.log('隐藏副牌===================');
        for (var i = 0; i < 3; i++) {
            var fupai = this.node.getChildByName('fupai' + i);
            fupai.active = false;
        }
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this._time > 0) {
            this._time -= dt;
            var pre = "";
            if (this._time < 0) {
                this._time = 0;
            }
            var t = Math.ceil(this._time);
            if (t < 10) {
                pre = "0";
            }
            this._timeLabel.string = pre + t;
        }
    },
});