cc.Class({
    extends: cc.Component,

    properties: {
        WheelIndex: {
            default: 1,
            tooltip: '第几个转轮（从1开始）',
        },
        ItemHigh: {
            default: 0,
            tooltip: '图标的高度',
        },
        LaunchDelay: {
            default: 0.2,
            tooltip: '响应启动命令的延迟时间',
        },
        StopDelay: {
            default: 0.5,
            tooltip: '响应制动命令的延迟时间',
        },
        MaxSpeed: {
            default: 20,
            tooltip: '一秒钟内闪过的图标的个数',
        },
        LaunchInertia: {
            default: 5,
            tooltip: '从静止加速到最大速度需要经过几个图标',
        },
        StopInertia: {
            default: 5,
            tooltip: '从最大速度减速到静止需要经过几个图标',
        },
        GuiWeiShiJian: {
            default: 0.5,
            tooltip: '图标归位需要的时间',
        }
    },

    start: function () {
        this._isStop = true;//标记当前运动状态
        this._isDispatchEvent = false;//是否发送“Event_WhellStop”消息
        this._currentSpeed = 0;  //当前的速度
        this._maxSpeed = this.ItemHigh * this.MaxSpeed;  //最大速度
        this._launchAcceleration = 0.5 * this._maxSpeed * this._maxSpeed / (this.LaunchInertia * this.ItemHigh);
        this._stopAcceleration = 0.5 * this._maxSpeed * this._maxSpeed / (this.StopInertia * this.ItemHigh);
        this._guiWeiSuDu = (this.ItemHigh * 0.5) / this.GuiWeiShiJian;
        this._itemNum = this.node.children.length;
        this._validItemNum = this._itemNum - 3;//（有效的图标个数 = 图标总数 - 3）减3的原因是可见的图标个数为3个
        this._validItemTotalHigh = this._validItemNum * this.ItemHigh;//有效的图标的总高度
        //图标数组
        this._itemArray = new Array(this._itemNum);
        for (var i = 0; i < this._itemNum; i++) {
            this._itemArray[i] = this.node.children[i].getComponent(cc.Sprite);
        }
        //因为使用了一条直线来模拟一个圆周，为了保证旋转一圈时不穿帮，需要让直线首位接应
        //可见的图标个数为3个，所以首部3个图标和尾部3个图标必须是是完全相同的
        this._index_0_start = 0;
        this._index_1_start = 1;
        this._index_2_start = 2;
        this._index_0_end = this._validItemNum + 0;
        this._index_1_end = this._validItemNum + 1;
        this._index_2_end = this._validItemNum + 2;
        this._stopPosY = 0;//停在0点    
    },

    update: function (dt) {
        if (this._isStop) {
            if (this._currentSpeed > 0) {
                //减速
                this._currentSpeed -= this._stopAcceleration * dt;

                this.node.y -= this._currentSpeed * dt;
                //转了一轮
                if (this.node.y < -this._validItemTotalHigh) {
                    this.node.y += this._validItemTotalHigh;
                }
            }
            else {
                this._currentSpeed = 0;
                //图标对齐
                var move = this._stopPosY - this.node.y;//正负未知
                if (move > 0.01 || move < -0.01) {//move太小证明两点重合
                    if (Math.abs(move) > (this._validItemTotalHigh * 0.5))//补丁：修复在首尾接口处小概率可能出现的BUG
                    {
                        this.node.y += this._validItemTotalHigh;
                        this._stopPosY = 0;
                        move = this._stopPosY - this.node.y;
                    }
                    var thisFrameMove = this._guiWeiSuDu * dt;//正数
                    if (thisFrameMove > Math.abs(move)) {
                        thisFrameMove = move;//这次移动过后两点将重合
                    }
                    else if (move < 0) {
                        thisFrameMove *= -1;
                    }
                    this.node.y += thisFrameMove;
                }
                else if (this._isDispatchEvent) {
                    this.DispatchEvent();
                    this._isDispatchEvent = false;
                }
            }
        }
        else {
            if (this._currentSpeed < this._maxSpeed) {
                //加速
                this._currentSpeed += this._launchAcceleration * dt;
            }
            else {
                //速度封顶
                this._currentSpeed = this._maxSpeed;
            }

            this.node.y -= this._currentSpeed * dt;
            //转了一轮
            if (this.node.y < -this._validItemTotalHigh) {
                this.node.y += this._validItemTotalHigh;
            }
        }
    },

    //投递事件
    DispatchEvent: function () {
        var eventCustom = new cc.Event.EventCustom('Event_WhellStop', true);
        eventCustom.setUserData(this.WheelIndex);
        this.node.dispatchEvent(eventCustom);
    },

    Launch: function () {
        this.unscheduleAllCallbacks();
        this.scheduleOnce(function () {
            this._isStop = false;
            this._isDispatchEvent = true;
        }, this.LaunchDelay);
    },

    Stop: function (spriteFrame0, spriteFrame1, spriteFrame2) {
        this.unscheduleAllCallbacks();
        this.scheduleOnce(function () {
            this._isStop = true;

            var s = 0.5 * this._currentSpeed * this._currentSpeed / this._stopAcceleration;//以当前速度减速到0需要移动的距离
            var stopPosY = this.node.y - s;//停在哪个点上
            if (stopPosY < -this._validItemTotalHigh) {
                stopPosY += this._validItemTotalHigh;
            }
            var divisor = Math.abs(stopPosY) / this.ItemHigh;
            var round = Math.round(divisor);

            this._stopPosY = -1 * round * this.ItemHigh;//记录一下最终会停在哪

            if (spriteFrame0 != null      && spriteFrame1 != null      && spriteFrame2 != null &&
                spriteFrame0 != undefined && spriteFrame1 != undefined && spriteFrame2 != undefined) {
                //修改图标
                var index_0 = round;
                var index_1 = round + 1;
                var index_2 = round + 2;

                this._itemArray[index_0].spriteFrame = spriteFrame0;
                this._itemArray[index_1].spriteFrame = spriteFrame1;
                this._itemArray[index_2].spriteFrame = spriteFrame2;

                //首尾图标保持一致
                if (index_0 <= this._index_2_start) {
                    this._itemArray[this._index_0_end].spriteFrame = this._itemArray[this._index_0_start].spriteFrame;
                    this._itemArray[this._index_1_end].spriteFrame = this._itemArray[this._index_1_start].spriteFrame;
                    this._itemArray[this._index_2_end].spriteFrame = this._itemArray[this._index_2_start].spriteFrame;
                }
                else if (index_2 >= this._index_0_end) {
                    this._itemArray[this._index_0_start].spriteFrame = this._itemArray[this._index_0_end].spriteFrame;
                    this._itemArray[this._index_1_start].spriteFrame = this._itemArray[this._index_1_end].spriteFrame;
                    this._itemArray[this._index_2_start].spriteFrame = this._itemArray[this._index_2_end].spriteFrame;
                }
            }
        }, this.StopDelay);
    },
});