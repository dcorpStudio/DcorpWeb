cc.Class({
    extends: cc.Component,

    properties: {
        AnimationArrayItem: {
            default: [],
            type: [cc.Animation],
            tooltip: '图标的淡出动画',
        },
        AudioSourceArrayItem: {
            default: [],
            type: [cc.AudioSource],
            tooltip: '图标的中奖音效',
        },
        JiaSuDu_QiDong: {
            default: 3,
            tooltip: '启动的加速度（需要经过几个图标才能加速到最大速度）',
        },
        JiaSuDu_ZhiDong: {
            default: 3,
            tooltip: '制动的加速度（需要经过几个图标才能减速到停止）',
        },
        SpeedChangeForOneStep: {
            default: 0.1,
            tooltip: '加速或减速过程中，每完成一个step速度的改变量（时间）',
        },
        MaxSpeed: {
            default: 12,
            tooltip: '每秒钟闪过的图标数',
        },
        AudioSourceLaunch: {
            default: null,
            type: cc.AudioSource,
            tooltip: '启动音效',
        },
        AudioSourcePaoMa: {
            default: null,
            type: cc.AudioSource,
            tooltip: '跑马音效',
        },
        AudioSourceStop: {
            default: null,
            type: cc.AudioSource,
            tooltip: '停止音效',
        },
        AudioSourceDaQiang: {
            default: null,
            type: cc.AudioSource,
            tooltip: '打枪音效',
        },
        TimeIntervalDaQiang: {
            default: 0.8,
            tooltip: '两次打枪之间的间隔时间（秒）',
        },
    },

    start: function () {
        this._arrayLength = this.AnimationArrayItem.length;//数组的长度
        this._currentIndex = 0;//当前的数组索引
        this._timeForOneItem = 1 / this.MaxSpeed;//最大速度下闪过一个图标需要的时间
        this._accTime = 0;//在两个相邻图标间的累积停顿时间
        this._timeArrayJiaSu = new Array(this.JiaSuDu_QiDong);//加速过程
        this._timeArrayJianSu = new Array(this.JiaSuDu_ZhiDong);//减速过程
        var time = this._timeForOneItem;
        for (var i = this.JiaSuDu_QiDong - 1; i > -1; i--) {
            time += this.SpeedChangeForOneStep;
            this._timeArrayJiaSu[i] = time;
        }
        time = this._timeForOneItem;
        for (var i = 0; i < this.JiaSuDu_ZhiDong; i++) {
            time += this.SpeedChangeForOneStep;
            this._timeArrayJianSu[i] = time;
        }
        this._indexJiaSu = -1;//加速过程数组的索引
        this._indexJianSu = -1;//减速过程数组的索引
        this._isMove = false;
    },

    update: function (dt) {
        if (this._isJianSu) {//需要减速
            if (this._currentIndex === this._indexZhiDong) {//到了开始减速的那个点
                this._indexJiaSu = -1;
                this._indexJianSu = 0;
                this._isJianSu = false;
                this.AudioSourceStop.play();//播放停止音效
            }
        }

        if (this._indexJiaSu >= 0 || this._indexJianSu >= 0) {
            if (this._indexJiaSu >= 0) {//加速过程
                this._accTime += dt;
                if (this._accTime > this._timeArrayJiaSu[this._indexJiaSu]) {
                    this._accTime = 0;
                    this.MoveAStep();
                    this._indexJiaSu++;//完成了加速过程的一个step
                    if (this._indexJiaSu >= this.JiaSuDu_QiDong) {//完成了整个加速过程
                        this._isMove = true;
                        this._indexJiaSu = -1;
                    }
                }
            }
            if (this._indexJianSu >= 0) {//减速过程
                this._accTime += dt;
                if (this._accTime > this._timeArrayJianSu[this._indexJianSu]) {
                    this._accTime = 0;
                    this.MoveAStep();
                    this._indexJianSu++;//完成了减速过程的一个step
                    if (this._indexJianSu >= this.JiaSuDu_ZhiDong) {//完成了整个减速过程
                        this._isMove = false;
                        this._indexJianSu = -1;
                        this.AnimationArrayItem[this._currentIndex].stop();
                        this.AnimationArrayItem[this._currentIndex].node.opacity = 255;
                        this.AudioSourcePaoMa.stop();//停止播放跑马音效
                        this.AudioSourceArrayItem[this._currentIndex].play();//播放中奖音效
                        this.HandleLucky();//中奖分析，处理中Lucky的情况
                    }
                }
            }
        }
        else {
            if (this._isMove) {
                this._accTime += dt;
                if (this._accTime > this._timeForOneItem) {
                    this._accTime = 0;
                    this.MoveAStep();
                }
            }
        }
    },

    Launch: function () {
        for (var i = 0; i < this.AnimationArrayItem.length; i++) {
            this.AnimationArrayItem[i].play();
        }
        this._indexJiaSu = 0;
        this._indexJianSu = -1;
        this.AudioSourceLaunch.play();//播放启动音效
        this.AudioSourcePaoMa.play();//播放跑马音效
    },

    Stop: function (indexStop) {
        this._indexZhiDong = (this._arrayLength + indexStop - this.JiaSuDu_ZhiDong) % this._arrayLength;//js的负数取模竟然还是负数，也是醉了！！
        this._isJianSu = true;
    },

    StopLucky: function (itemArray) {
        // var indexStop = Math.round(Math.random());
       
        // //21和9是左右两个Lucky图标的索引
        // if (indexStop === 0) {
        //     indexStop = 21;
        // }
        // else {
        //     indexStop = 9;
        // }
        var indexStop = itemArray[0];   //返回的数组第一位是触法打枪的位置
        this._indexZhiDong = (this._arrayLength + indexStop - this.JiaSuDu_ZhiDong) % this._arrayLength;//js的负数取模竟然还是负数，也是醉了！！
        this._isJianSu = true;
        this._itemArray = itemArray;//保存中Lucky后给的2-5个奖励图标
        this._itemArrayIndex = 0;
    },

    MoveAStep: function () {
        this._currentIndex++;
        this._currentIndex %= this._arrayLength;
        this.AnimationArrayItem[this._currentIndex].play();
    },

    //投递事件
    DispatchEvent: function () {
        this.node.dispatchEvent(new cc.Event.EventCustom('Event_ZhuanPanStop', true));
    },

    //处理Lucky的情况
    HandleLucky: function () {
        if (this._currentIndex === 9 || this._currentIndex === 21) {//中Lucky
            var delay = 0;
            console.log('处理Lucky的情况:',this._itemArray);
            for (var i = 0; i < this._itemArray.length; i++) {
                delay += this.TimeIntervalDaQiang;
                this.scheduleOnce(function () {
                    this.AudioSourceDaQiang.play();//播放打枪音效
                    this.AudioSourceArrayItem[this._itemArray[this._itemArrayIndex]].play();//播放中奖音效
                    this.AnimationArrayItem[this._itemArray[this._itemArrayIndex]].node.opacity = 255;//显示红圈
                    this._itemArrayIndex++;
                }, delay);
            }
            
            this.scheduleOnce(function () {
                this.DispatchEvent();
            }, delay);
        }
        else {//没中Lucky
            this.DispatchEvent();
            return;
        }
    },
});