var coinMove = require("coinMove");
cc.Class({
    extends: cc.Component,

    properties: {
        Label_coins: {
            default: null,
            type: cc.Label,
            tooltip: "金币文字",
        },
        Prefab_coin: {
            default: null,
            type: cc.Prefab,
            tooltip: "金币预制件",
        },
        MaxPrefabCoinNum: {
            default: 20,
            tooltip: "最多可以生成多少个金币预制件",
        },
        ShowTime: {
            default: 2,
            tooltip: "展示中奖金币的时长（秒）",
        },
        Time: {
            default: 3,
            tooltip: "加金币动画的总时长（秒）",
        },
        ValueOfPrefabCoin: {
            default: 100,
            tooltip: "一个金币预制件代表的价值",
        },

        _winCoins: 0,//赢了多少金币
        _currentAdd: 0,//当前加到多少金币
        _addSpeed: 0,//每秒金币增加量
        _continueAdd: false,//持续增加金币
    },

    Initialize: function (winCoins, posStart, posEnd) {
        if (winCoins <= 0) return;

        this._winCoins = winCoins;
        this._posStart = posStart;
        this._posEnd = posEnd;

        this._addSpeed = Math.ceil(winCoins / this.Time);

        var prefabCoinNum = Math.ceil(winCoins / this.ValueOfPrefabCoin);
        this._prefabCoinNum = Math.min(prefabCoinNum, this.MaxPrefabCoinNum);
        this._prefabCoinsArray = new Array();

        this.Label_coins.string = this._currentAdd;
        this._continueAdd = true;
    },

    update: function (dt) {
        if (this._continueAdd) {
            var addCoins = Math.ceil(this._addSpeed * dt);
            this._currentAdd += addCoins;
            this.Label_coins.string = this._currentAdd;

            if (this._prefabCoinsArray.length < this._prefabCoinNum) {//金币预制件数组元素个数少于应该生成的金币数
                var prefabCoinNum = Math.ceil(this._currentAdd / this.ValueOfPrefabCoin);
                if (prefabCoinNum > this._prefabCoinsArray.length) {
                    var instantiateNum = prefabCoinNum - this._prefabCoinsArray.length;
                    for (var i = 0; i < instantiateNum; i++) {
                        var nodeCoin = cc.instantiate(this.Prefab_coin);//克隆一个金币
                        nodeCoin.parent = this.node.parent;
                        nodeCoin.getComponent(coinMove).SetData(this._posStart, this._posEnd);//设置金币的起点和终点
                        this._prefabCoinsArray.push(nodeCoin.getComponent(coinMove));
                    }
                }
            }
            
            if (this._currentAdd >= this._winCoins) {
                this.Label_coins.string = this._winCoins;
                this._continueAdd = false;
                this.scheduleOnce(function () {
                    this.node.active = false;
                    this.node.destroy();
                }, this.ShowTime);
            }
        }
    },
});