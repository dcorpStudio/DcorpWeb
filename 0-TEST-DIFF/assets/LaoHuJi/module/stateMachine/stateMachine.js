//不知道怎么用js写枚举变量，先用整数代替吧
//规定  state === 0 表示准备状态
//规定  state === 1 表示开始状态
//规定  state === 2 表示停止状态
//----------------------------------------------
//增加：state === 3 表示中奖展示状态
//增加：ShowTime    中奖展示时间
//增加：state === 4 表示错误状态
//增加：Timeout     连接超时倒计时
cc.Class({
    extends: cc.Component,

    properties: {
        _state: 0,
        _receiveStop: false,
        _interval: false,
    },

    Input_Error: function () {
        //开始状态->错误状态
        if (this._state === 1) {
            this.unscheduleAllCallbacks();
            this._receiveStop = false;
            this._interval = false;
            this.SetState(4);//进入错误状态
        }
    },

    Input_Start: function (interval, timeout) {
        //准备状态->开始状态
        if (this._state === 0) {
            this.SetState(1);//进入开始状态
            this.scheduleOnce(function () {
                this._interval = true;
            }, interval);

            this.scheduleOnce(this.Input_Error, timeout);//超时后进入错误状态
        }
    },

    Input_Stop: function () {
        //开始状态->停止状态
        if (this._state === 1) {
            this._receiveStop = true;
            this.unschedule(this.Input_Error);//取消超时回调
        }
    },

    Input_Ready: function (showTime) {
        if (this._state === 2) {//停止状态->中奖展示状态
            this.SetState(3);//进入中奖展示状态
            this.scheduleOnce(function () {
                this.SetState(0);//进入准备状态
            }, showTime);
        }
        else if (this._state === 4) {//错误状态->准备状态
            this.SetState(0);//进入准备状态
        }
    },

    //改变当前状态，并投递状态改变事件
    SetState: function (state) {
        this._state = state;
        var eventCustom = new cc.Event.EventCustom('Event_StateChange', true);
        eventCustom.setUserData(this._state);
        this.node.dispatchEvent(eventCustom);
    },

    GetState: function () {
        return this._state;
    },

    update: function () {
        //开始状态下，收到过停止命令并且等待的时间已超时
        if (this._state === 1 && this._receiveStop && this._interval) {
            this.SetState(2);//进入停止状态
            this._receiveStop = false;
            this._interval = false;
        }
    },
});