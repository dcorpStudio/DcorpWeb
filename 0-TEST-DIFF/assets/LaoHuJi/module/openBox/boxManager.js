cc.Class({
    extends: cc.Component,

    properties: {
        _bonusSum: 0,//总奖金
        _times: 0,//分几次开
        _bonusArray: [],//每次开奖的奖金
        _openCount: 0,//已经点击打开的宝箱计数
        _showCount: 0,//已经显示奖金的宝箱计数
        PanelMask: {
            default: null,
            type: cc.Node,
            tooltip: "遮罩面板",
        },
        Countdown: {
            default: 10,
            tooltip: "界面销毁倒计时(秒)",
        },
        LabelCountdown: {
            default: null,
            type: cc.Label,
            tooltip: "倒计时Label数字",
        },
        LabelWinCoins: {
            default: null,
            type: cc.Label,
            tooltip: "中奖金额",
        },
        LabelRemainOpenCount: {
            default: null,
            type: cc.Label,
            tooltip: "剩余开奖次数",
        },
        _totalWinCoins: 0,
    },

    start: function () {
        var self = this;
        this.node.on('Event_OpenBox', function (event) {
            event.stopPropagation();//停止传递当前事件
            //播放音效
            event.detail.string = self._bonusArray[self._showCount];//显示奖金
            self._totalWinCoins += self._bonusArray[self._showCount];//总金额累加
            self.LabelWinCoins.string = self._totalWinCoins;//显示总金额
            self._showCount++;//增加计数
        });
        this.RefreshLabel_RemainOpenCount();//刷新剩余开奖次数文字
    },

    update: function (dt) {
        this.Countdown -= dt;
        this.LabelCountdown.string = Math.round(this.Countdown);//显示倒计时
        if (this.Countdown < 0) {
            this.onBtnClick_close();//关闭界面
        }
    },

    SetData: function (bonusSum, times) {
        if (times <= 0) return;
        this._bonusSum = bonusSum;
        this._times = times;

        var remain = this._bonusSum;
        this._bonusArray = new Array(this._times);
        for (var i = 0; i < this._times - 1; i++) {
            var random = Math.round(Math.random() * remain);
            this._bonusArray[i] = random;
            remain -= random;
        }
        this._bonusArray[this._times - 1] = remain;
    },

    //关闭界面
    onBtnClick_close: function () {
        //console.log('关闭宝箱界面');
        this.node.active = false;
        this.node.destroy();
    },

    //点击宝箱
    onBtnClick_openBox: function () {
        this._openCount++;
        this.RefreshLabel_RemainOpenCount();//刷新剩余开奖次数文字
        if (this._openCount === this._times) {
            this.PanelMask.active = true;//禁止界面交互
        }
    },

    //刷新剩余开奖次数文字
    RefreshLabel_RemainOpenCount: function () {
        this.LabelRemainOpenCount.string = this._times - this._openCount;
    },
});