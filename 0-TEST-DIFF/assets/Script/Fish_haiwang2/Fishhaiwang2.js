cc.Class({
    extends: cc.Component,

    properties: {

    },

    fishInit() {
        this.fishMain = null;
        this.fishID = 0;
        this.fishType = 0;
        this.offset = cc.v2(0, 0);
        this.activity = false;
        this.dead = false;
    },

    onDie() {
        let anim = this.node.getComponent(cc.Animation);
        anim.play(anim._clips[1]._name);
        this.node.getComponent(cc.BoxCollider).enabled = false;
        this.scheduleOnce(() => {
            this.node.removeFromParent();
        }, 1);
    },

    update() {
        if (this.last_pos == undefined) {
            this.last_pos = this.node.position;
            return;
        }

        if (this.last_pos.x == this.node.position.x && this.last_pos.y == this.node.position.y) {
            return;
        }

        var startPos = this.last_pos;
        var endPos = this.node.position;

        let dirVec = endPos.sub(startPos);//获得从startPos指向endPos的方向向量
        let comVec = new cc.v2(0, 1);//计算夹角的参考方向，这里选择x轴正方向
        let radian = cc.v2(dirVec).signAngle(comVec);//获得带方向的夹角弧度值(参考方向顺时针为正值，逆时针为负值)
        let degree = Math.floor(cc.misc.radiansToDegrees(radian));

        // this.node.rotation = degree;
        this.node.angle = -degree;

        if (!this.rot_setted) {
            this.rot_setted = true;
            if (degree > 180 || (degree > -180 && degree < 0)) {
                this.node.scaleX = -1;
                this.node.getChildByName("tip") && (this.node.getChildByName("tip").scaleX = -1);
            }
        }

        this.last_pos = this.node.position;
    },
    // BirdCreat_function: function(e, t, i, n, o, a, s, c, r) {
    //     this.birdID = e,
    //     this.birdType = t,
    //     this.node.opacity = 255,
    //     this.node.scale = 1.8,
    //     this.positionArray = null,
    //     26 === t ? r += "+": r = "",
    //     this.node.getChildByName("id").getComponent("cc.Label").string = r,
    //     this.LoadPath_Function(i, n, o, a, s, c)
    // },
    // LoadPath_Function: function(e, t, i, n, o, a) {
    //     var s = cc.p(0, 0),
    //     c = 0;
    //     if (this.positionArray = new Array(i[e].length), t < 2) for (c = 0; c < this.positionArray.length; ++c) s = cc.p(0, 0),
    //     s.x = i[e][c][0] * a * 1.1 - n.x,
    //     s.y = i[e][c][1] * a * 1.1 - n.y,
    //     this.positionArray[c] = s;
    //     else for (c = 0; c < this.positionArray.length; ++c) s = cc.p(0, 0),
    //     s.x = i[e][c][0] * a * 1.1 - n.x,
    //     s.y = i[e][c][1] * a * 1.1 * -1 - n.y,
    //     this.positionArray[c] = s;
    //     this.BirdRun_Function(o)
    // },
    // BirdRun_Function: function(e) {
    //     this.node.setPosition(this.positionArray[0]),
    //     this.lastP = cc.p(0, 0),
    //     this.currentP = cc.p(0, 0);
    //     var t;
    //     t = e === !0 ? cc.cardinalSplineTo(this.node.parent.parent.getComponent("GameMain").fishWaveMoveTime, this.positionArray, -.5) : cc.cardinalSplineTo(this.node.parent.parent.getComponent("GameMain").moveTime[this.birdType], this.positionArray, -.5);
    //     var i = cc.sequence(t, cc.callFunc(function() {
    //         this.deaded = !0,
    //         this.dying = !1,
    //         this.activity = !1,
    //         this.existence ? (this.turn.destroy(), this.existence = !1) : this.Halo ? (this.PHalo.destroy(), this.Halo = !1) : this.TQ ? (this.toadquan.destroy(), this.TQ = !1) : this.PL && (this.p_Label.destroy(), this.PL = !1, this.node.parent.parent.getComponent("GameMain").pen = null);
    //         for (var e = 0; e < this.node.parent.parent.getComponent("GameMain").birdArray.length; e++) this.node.parent.parent.getComponent("GameMain").birdArray[e] == this.node && this.node.parent.parent.getComponent("GameMain").birdArray.splice(e, 1);
    //         this.node.parent.parent.getComponent("GameMain").FishPool.put(this.node)
    //     },
    //     this));
    //     this.node.runAction(i),
    //     18 === this.birdType || 19 === this.birdType || 20 === this.birdType ? (this.turn = cc.instantiate(this.turntable), this.node.parent.addChild(this.turn, -1), this.turn.setPosition(this.node.getPosition()), this.existence = !0) : 15 === this.birdType || 16 === this.birdType || 17 === this.birdType ? (this.PHalo = cc.instantiate(this.Pb_Halo), this.node.parent.addChild(this.PHalo, -1), this.PHalo.setPosition(this.node.getPosition()), this.Halo = !0) : 23 === this.birdType ? (this.p_Label = cc.instantiate(this.pen_Label), this.node.addChild(this.p_Label), this.PL = !0, this.p_Label.getComponent("cc.Label").string = this.node.parent.parent.getComponent("GameMain").pool) : 24 === this.birdType && (this.toadquan = cc.instantiate(this.pb_toadquan), this.node.parent.addChild(this.toadquan, -1), this.toadquan.setPosition(this.node.getPosition()), this.TQ = !0),
    //     this.getComponent("cc.Animation").play("move" + this.birdType),
    //     this.deaded = !1,
    //     this.dying = !1,
    //     this.activity = !0
    // },
    // Rotation_function: function() {
    //     this.currentP = this.node.getPosition();
    //     var e = this.currentP.sub(this.lastP),
    //     t = cc.pToAngle(e) / Math.PI * 180;
    //     if (this.node.rotation = -t, this.lastP = this.currentP, 18 === this.birdType || 19 === this.birdType || 20 === this.birdType) {
    //         var i = this.node.getPosition().x + 10 * Math.cos(cc.pToAngle(e)),
    //         n = this.node.getPosition().y + 10 * Math.sin(cc.pToAngle(e));
    //         this.turn.setPosition(i, n)
    //     } else 15 === this.birdType || 16 === this.birdType || 17 === this.birdType ? this.PHalo.setPosition(this.node.getPosition()) : 23 === this.birdType || 25 === this.birdType ? this.node.rotation = 0 : 24 === this.birdType ? this.toadquan.setPosition(this.node.getPosition()) : 26 === this.birdType && (this.node.rotation = 0)
    // },
    // CountDeadAnimationTimes_Function: function(e) {
    //     this.deadAnimationTimes += e,
    //     this.deadAnimationTimes > 1 && (this.node.stopAllActions(), this.playDeadAnimation = !1, this.dying = !1, this.deaded = !0, this.activity = !1, this.deadAnimationTimes = 0, this.existence ? (this.turn.destroy(), this.existence = !1) : this.Halo ? (this.PHalo.destroy(), this.Halo = !1) : this.TQ ? (this.toadquan.destroy(), this.TQ = !1) : this.PL && (this.p_Label.destroy(), this.PL = !1, this.node.parent.parent.getComponent("GameMain").pen = null), this.node.getComponent("cc.Animation").stop(), this.node.parent.parent.getComponent("GameMain").FishPool.put(this.node))
    // },
    // playDeadAnimation_Function: function(e) {
    //     this.node.getComponent("cc.Animation").play("dead" + this.birdType),
    //     this.playDeadAnimation = !0
    // },
    // countColorChange_Function: function(e) {
    //     this.time >= .3 ? (this.time = 0, this.colorChange = !1, this.node.color = cc.Color.WHITE, this.existence ? this.turn.color = cc.Color.WHITE: this.Halo ? this.PHalo.color = cc.Color.WHITE: this.TQ && (this.toadquan.color = cc.Color.WHITE)) : this.time += e
    // },
    // update: function(e) { ! this.activity || this.deaded || this.dying || this.Rotation_function(),
    //     this.dying && this.CountDeadAnimationTimes_Function(e),
    //     this.colorChange && this.countColorChange_Function(e)
    // }

    executeMove() {
        var pos_arr = [];
        for (var i = this.pathIndex; i < this.pathIndex + 3; i++) {
            if (i >= this.pathArr.length) break;
            pos_arr.push(cc.v2(this.pathArr[i][0], this.pathArr[i][1]).add(this.offset));
        }

        var path = cc.find('Canvas').getComponent("Fishhaiwang2Path");


        if (pos_arr.length == 0) {
            this.node.destroy();
        } else if (pos_arr.length == 3) {
            var t = path.waveMoveTime;
            if (this.fishInfo.fishLineup != 0) {
                t = path.moveTime[this.fishInfo.fishType];
            }
            var bezierTo = cc.bezierTo(t, pos_arr);
            var finish = cc.callFunc(this.executeMove, this);
            this.node.runAction(cc.sequence(bezierTo, finish));
            this.pathIndex += 3;
        } else {

            var t = path.waveMoveTime;
            if (this.fishInfo.fishLineup != 0) {
                t = path.moveTime[this.fishInfo.fishType];
            }
            var move = cc.moveTo(t / 3, pos_arr[0]);
            var finish = cc.callFunc(this.executeMove, this);
            this.node.runAction(cc.sequence(move, finish));
            this.pathIndex++;
        }
    },
});