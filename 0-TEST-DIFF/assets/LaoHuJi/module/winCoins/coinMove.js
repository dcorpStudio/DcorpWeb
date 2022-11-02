cc.Class({
    extends: cc.Component,

    properties: {
        Distance: {
            default: 60,
            tooltip: "在起点附近随机位置生成金币的最大距离",
        },
        Delay: {
            default: 0.4,
            tooltip: "从生成到开始移动的延迟（秒）",
        },
        Time: {
            default: 0.3,
            tooltip: "金币从起点到终点运动的总时间（秒）",
        },
    },

    SetData: function (posStart, posEnd) {
        this._posStart = new cc.Vec2(posStart.x + ((Math.random() * 2 - 1) * this.Distance), posStart.y + ((Math.random() * 2 - 1) * this.Distance));
        this._posEnd = posEnd;
        this._direction = new cc.Vec2(this._posEnd.x - this._posStart.x, this._posEnd.y - this._posStart.y);
        this._move = false;
        this._accMoveTime = 0;
        this.node.x = this._posStart.x;
        this.node.y = this._posStart.y;

        this.scheduleOnce(function () {
            this._move = true;
        }, this.Delay);

        var anim = this.getComponent(cc.Animation);
        anim.playAdditive('coinScale');//播放第一个动画
        anim.playAdditive('coinSpin');//播放第二个动画,使用 playAdditive 播放动画时，不会停止其他动画的播放。如果还有其他动画正在播放，则同时会有多个动画进行播放。
    },

    update: function (dt) {
        if (this._move) {
            this._accMoveTime += dt;
            if (this._accMoveTime > this.Time) {
                this.node.x = this._posEnd.x;
                this.node.y = this._posEnd.y;
                this._move = false;
                this.node.destroy();
                return;
            }
            var scale = this._accMoveTime / this.Time;
            var move = new cc.Vec2(scale * this._direction.x, scale * this._direction.y);
            this.node.x = this._posStart.x + move.x;
            this.node.y = this._posStart.y + move.y;
        }
    },
});