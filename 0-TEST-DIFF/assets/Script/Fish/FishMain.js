cc.Class({
    extends: cc.Component,

    properties: {
        bg_anim: cc.Node, //海水特效
        effect_frozen: cc.Node, //海水特效
        effect_lockFish: cc.Node,   //锁定效果
        lab_lockFish: cc.Label,//锁定文字
        bg_picList: [cc.Node], //背景列表
        seat_node: [cc.Node], //座位列表
        seat_noPlayer_node: [cc.Node], //没座位列表
        touchLayer: cc.Node, //点击层
        bulletPb: cc.Prefab, //子弹pb
        bulletBg: cc.Node, //子弹层
        netBg: cc.Node, // 网层
        netPb: cc.Prefab, // 网pb
        fishBg: cc.Node, //鱼层
        fishPb: [cc.Prefab],
        //
        //heartBeat: 0,
        jackpotlab: cc.Label,//奖池信息
        coinPb: [cc.Prefab],
        diamondPb: cc.Prefab,
        label_pb: cc.Prefab,
        label_pb2: cc.Prefab,
        musicToggle: cc.Toggle,
        soundToggle: cc.Toggle,
    },

    onLoad() {
        //是否允许开炮
        // var t;
        // for (this.fishW = [62.4, 80, 73.2, 74, 62.4, 72, 117.6, 112.8, 100, 120, 225, 180, 180, 235.2, 237.6, 160, 160, 160, 160, 160, 160, 350, 350, 350, 350, 350, 350], this.labelPosition = new Array(this.maxPlayer), t = 0; t < this.labelPosition.length; ++t) this.labelPosition[t] = cc.p(0, 0);
        //         cc.p(0, 0);

        window.fish_ins = this;
        this.FishPool = new cc.NodePool("Fish");
        this.left_stat = 0;
        this.bulletId = 0;
        this.allowBullet = true;
        this.isAutoShot = false;
        this.isLockFish = false;

        this.bulletPower = 1;
        this.targetFish = null;
        this.bigFishType = 15;

        //屏幕适配
        if (cc.sys.isNative) {
            cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        }

        //碰撞管理器
        this.collisionMgr = cc.director.getCollisionManager();
        this.collisionMgr.enabled = true;
        // this.collisionMgr.enabledDebugDraw = true;
        // this.collisionMgr.enabledDrawBoundingBox = true;

        //获取组件
        this.fishNet = require("./FishNetWork").getInstant;
        this.fishNet.setFishObj_Funtion(this);
        this.pInfo = require("PlayerInfo").getInstant;
        this.pInfo.setGameObj_Function(this);
        this.fishNet.disconnected = false;
        //获取房间倍率
        this.roomBet = this.fishNet.roomBet;
        //房间玩家信息
        this.playerList = [null, null, null, null];
        //获取奖池信息
        this.jackpotlab.string = parseInt(this.pInfo.win_pool / this.pInfo.exchangeRate);

        //炮对象 在BUlletCtrl中赋值
        this.cannonList = [];

        //注册点击事件
        this.pos = cc.v2(667, 375);
        this.touchLayer.on("touchstart", e => {
            if (this.isLockFish) return;
            this.pos = e.getLocation();
            this.schedule(this.shoot, 0.2, cc.macro.REPEAT_FOREVER, 0.01);
        })

        this.touchLayer.on("touchmove", e => {
            this.pos = e.getLocation();
        })

        this.touchLayer.on("touchend", e => {
            if (this.isLockFish) {
                let isSwitchTarget = false;
                for (const child of this.fishBg.children) {
                    let fishType = child.getComponent("Fish").fishType;
                    if (child.x < -667 || child.x > 667 || child.y < -375 || child.y > 375 || fishType < this.bigFishType) {
                        continue;
                    }
                    if (child.getBoundingBoxToWorld().contains(e.getLocation()) && child != this.targetFish) {
                        this.targetFish = child;
                        isSwitchTarget = true;
                        console.log("点击锁定鱼", child);
                    }
                }
                if (!isSwitchTarget) {
                    this.shoot();
                }
            } else {
                if (this.isAutoShot) {
                    this.schedule(this.shoot, 0.3, cc.macro.REPEAT_FOREVER, 0.01);
                } else {
                    this.unschedule(this.shoot);
                }
            }
        })

        this.touchLayer.on("touchcancel", e => {
            if (this.isLockFish) return;
            if (this.isAutoShot) {
                this.schedule(this.shoot, 0.3, cc.macro.REPEAT_FOREVER, 0.01);
            } else {
                this.unschedule(this.shoot);
            }
        })

        //生成子弹池
        this.bulletPool = new cc.NodePool();
        for (let i = 0; i < 50; i++) {
            let pb = cc.instantiate(this.bulletPb);
            this.bulletPool.put(pb);
        }

        //生成网池
        this.netPool = new cc.NodePool();
        for (let i = 0; i < 20; i++) {
            let pb = cc.instantiate(this.netPb);
            this.netPool.put(pb);
        }
        this.set_left_view(true);

        if (this.roomBet == 1) {
            this.power_list = [1, 2, 3, 4, 5];
        } else if (this.roomBet == 10) {
            this.power_list = [1, 2, 3, 4, 5];
        } else if (this.roomBet == 100) {
            this.power_list = [1, 2, 3, 4, 5];
        } else if (this.roomBet == 1000) {
            this.power_list = [1, 2, 3, 4, 5];
        }
        this.skillMaxTime = [5 * 60, 100000 * 60];
        this.skillTime = [0, 0];
        this.skillCost = [10 * this.roomBet, 20 * this.roomBet];
        this.skillCD = [0, 0];
        this.skillMaxCD = [10 * 60, 100000 * 60];
        cc.find('Canvas/UI/b/s1/shuzi').getComponent(cc.Label).string = Helper.fixNum(this.skillCost[0]);
        cc.find('Canvas/UI/b/s2/shuzi').getComponent(cc.Label).string = Helper.fixNum(this.skillCost[1]);
    },

    start_() {
        for (let i in this.fishNet.userList) {
            let usr = this.fishNet.userList[i];
            this.playerList[usr.seatId] = {
                name: usr.nickname,
                score: usr.score,
                diamond: usr.diamond,
                uid: usr.userId,
                head: usr.headimgurl,
            }
        }
        playBGM('bg_0');
        this.checkSeatShow();
        this.checkSelf();
        this.musicToggle.isChecked = this.pInfo.musicControl;
        this.soundToggle.isChecked = this.pInfo.soundEffectControl;
    },

    /**
     * 射击
     */
    shoot() {
        // if (this.isAiming())
        if (this.isLockFish) {
            var fishNode = this.getBigFish();
            if (!cc.isValid(fishNode)) {
                this.pos = cc.v2(667, 375);
            } else {

                this.pos = fishNode.getPosition();
                this.pos.x += 667;
                this.pos.y += 375;
            }
        } else {
            if (this.fishNet.seatId > 1 && this.pos.y > 700 || this.fishNet.seatId <= 1 && this.pos.y < 50) {
                // console.log('touch outsider!');
                return;
            }
        }

        let playerUid = this.playerList[this.fishNet.seatId].uid;
        if (playerUid == this.pInfo.playerId) {

            playEffect('shot');
            this.fishNet.fishSocket && this.fishNet.fishSocket.emit('fishShoot', JSON.stringify({
                userid: playerUid,
                bet: this.bulletPower,
                position: this.pos,
                bulletId: this.getNextBulletID(),
            }));
        }
    },

    shoot_r(userid, pos, bet, bid) {
        // console.log("SHOOT :"+pos.x+"-"+pos.y);
        // var node = cc.find("Canvas/GameNode/aurabg/aura");
        // console.log("aura :"+node.position.x+"-"+node.position.y);

        var seatId = this.getSeatByUser(userid);
        if (seatId < 0) return;
        if (this.allowBullet) {
            this.cannonList[seatId].bang(pos, bet, bid);
        }
    },

    getSeatByUser(userid) {
        for (var i in this.playerList) {
            if (this.playerList[i] == null) continue;
            if (this.playerList[i].uid == userid) {
                return i;
            }
        }
        return -1;
    },

    /**
     * 其它玩家进入房间
     * @param {用户id} UserId 
     * @param {座位id} seatId 
     * @param {用户名} nickname 
     * @param {用户分数} score 
     */
    setPlayerEnter(UserId, seatId, nickname, score, head, diamond) {
        if (!this.playerList[seatId]) {
            this.playerList[seatId] = {
                name: nickname,
                score: score,
                diamond: diamond,
                uid: UserId,
                head: head,
            }
            playEffect('sit_down');
            this.checkSeatShow();
        } else {
            console.error('位置已占-不能进入座位-请检查');
        }
    },

    /**
     * 其它玩家离开房间操作
     * @param {座位id} seatId 
     */
    setPlayerExit(seatId) {
        this.playerList[seatId] = null;
        this.checkSeatShow();
    },

    /**
     * 控制座位的显隐
     */
    checkSeatShow() {
        for (let i in this.playerList) {
            this.seat_noPlayer_node[i].active = !this.playerList[i];
            this.seat_node[i].active = !this.seat_noPlayer_node[i].active;
        }
    },

    checkSelf() {
        var pinfo = require('PlayerInfo').getInstant;
        for (var i in this.playerList) {
            if (this.playerList[i] && this.playerList[i].uid == pinfo.playerId) {
                this.seat_node[i].getChildByName('up').active = true;
                this.seat_node[i].getChildByName('down').active = true;
                this.seat_node[i].getChildByName('your_position').active = true;
                this.seat_node[i].getChildByName('your_position').runAction(cc.sequence(cc.delayTime(5), cc.hide()));
                break;
            }
        }
    },

    /**
     * 获取子弹池中的子弹
     */
    getBullet() {
        if (this.bulletPool.size() <= 0) {
            let pb = cc.instantiate(this.bulletPb);
            this.bulletPool.put(pb);
        }
        return this.bulletPool.get();
    },

    /**
     * 获取渔网池中的渔网
     */
    getNet() {
        if (this.netPool.size() <= 0) {
            let pb = cc.instantiate(this.netPb);
            this.netPool.put(pb);
        }
        return this.netPool.get();
    },
    getNextBulletID() {
        if (this.bulletId >= 1e4)
            this.bulletId = 0;
        else
            this.bulletId++;

        return this.bulletId;
    },
    openAlert() {
        this.node && (this.node.getChildByName('messageboxbg').active = true);
        cc.director.loadScene(window.hallName);
    },

    switch_left() {
        if (this.left_stat == 0) {
            this.left_stat = 1;
        } else {
            this.left_stat = 0;
        }
        this.set_left_view();
    },
    set_left_view(instance) {
        var left = this.node.getChildByName('UI').getChildByName('left');
        left.stopAllActions();
        var t = 0.2;
        if (instance) t = 0;
        if (this.left_stat == 1) {
            cc.find('Canvas/UI/left/左侧导航栏').active = true;
            left.runAction(cc.moveTo(t, cc.v2(-667, 0)));
        } else {
            left.runAction(cc.sequence(cc.moveTo(t, cc.v2(-790, 0)), cc.callFunc(function () {
                cc.find('Canvas/UI/left/左侧导航栏').active = false;
            }, this)))
        }
    },
    createFish(info) {
        //{"fishId":[2324,2325,2326],
        //"fishType":11,"fishPath":7,"fishCount":3,
        //"fishLineup":1,"lineup":false,"propCount":0}
        let type = info.fishType;
        let paths = this.node.getComponent("FishPath");
        let pathArr = paths.path_list[info.fishPath];

        let offsetX = 0;
        let offsetY = 0;
        let listX = 1;
        let listY = 1;

        //console.log("出鱼: 鱼类型-", type, " 鱼的排列-", info.fishLineup, " 鱼的数量-", info.fishCount);

        switch (info.fishLineup) {
            case 0:
                break;
            case 1:
                //并排
                listX = 1;
                listY = info.fishCount;
                break;
            case 2:
                //正方形 4只
                listX = 2;
                listY = 2;
                break;
            case 3:
                //5星 5只
                listX = 1;
                listY = info.fishCount;
                break;
            case 4:
                //长方形 6只
                listX = 2;
                listY = 3;
                break;
        }

        if (info.fishLineup == 0) {
            for (let i = 0; i < info.fishCount; i++) {
                setTimeout(() => {
                    if (this.fishPb) {
                        let fish = cc.instantiate(this.fishPb[type]);

                        fish.parent = this.fishBg;
                        fish.zIndex = info.fishType;

                        fish.getComponent("Fish").pathArr = pathArr;
                        fish.getComponent("Fish").pathIndex = 0;
                        fish.getComponent("Fish").fishInfo = info;
                        fish.getComponent("Fish").fishId = info.fishId[i];
                        fish.getComponent("Fish").fishType = type;
                        fish.getComponent("Fish").offset = cc.v2(offsetX, offsetY);
                        fish.position = cc.v2(pathArr[0][0], pathArr[0][1]);

                        fish.getComponent('Fish').executeMove();
                    }
                }, i * 800);
            }
        }
        else {
            for (let i = 0; i < info.fishCount; i++) {
                let fish = cc.instantiate(this.fishPb[type]);

                offsetX = (Math.floor(i / listY) - (listX - 1) / 2) * fish.width;
                offsetY = (i % listY - (listY - 1) / 2) * fish.height;

                fish.parent = this.fishBg;
                fish.zIndex = info.fishType;

                fish.getComponent("Fish").pathArr = pathArr;
                fish.getComponent("Fish").pathIndex = 0;
                fish.getComponent("Fish").fishInfo = info;
                fish.getComponent("Fish").fishId = info.fishId[i];
                fish.getComponent("Fish").fishType = type;
                fish.getComponent("Fish").offset = cc.v2(offsetX, offsetY);
                fish.position = cc.v2(pathArr[0][0] + offsetX, pathArr[0][1] + offsetY);

                fish.getComponent('Fish').executeMove();
            }
        }

    },

    getFishById(fid) {
        for (const fishNode of this.fishBg.children) {
            let fish = fishNode.getComponent("Fish");
            if (fish.fishId == fid) {
                if (fishNode.x >= -667 && fishNode.x <= 667 && fishNode.y >= -375 && fishNode.y <= 375) {
                    return fishNode;
                }
            }
        }
        return null;
    },

    checkFishId(fid) {
        return cc.isValid(this.getFishById(fid));
    },

    onFishHit(info) {
        // fishId
        // hitScore
        // propCount
        // propId
        // userId
        let target = null;
        let fishes = this.fishBg.children;
        for (let i in fishes) {
            let fishNode = fishes[i];
            let fish = fishNode.getComponent("Fish");
            if (fish.fishId == info.fishId) {
                target = fishNode;
                break;
            }
        }
        if (target == null) {
            let targetSeat = this.getSeatByUser(info.userId);
            this.cannonList[targetSeat].addscore(info.hitSocre * this.roomBet);
            return;
        }
        //如果选中的鱼被打死，就清空选中容器
        if (target == this.targetFish) {
            this.targetFish = null;
        }

        let targetSeat = this.getSeatByUser(info.userId);

        if (target.getComponent("Fish").fishType == 24 ||
            target.getComponent("Fish").fishType == 25) {
            // fishId,fishIdList,sendId

            let fish = null;
            let fishidlist = [];
            for (const chlid of this.fishBg.children) {
                fish = chlid.getComponent("Fish");
                fishidlist.push(fish.fishId);
            }
            console.log("击中鱼列表：", fishidlist);
            this.fishNet.fishSocket.emit('boomFishHit', JSON.stringify({
                fishId: info.fishId,
                fishIdList: fishidlist,
            }));
        }

        let isSelf = false;
        if (this.pInfo.playerId == info.userId) {
            isSelf = true;
        }
        if (info.propId == 2) {
            this.addDiamondAnim(targetSeat, info.propValue, target.position, isSelf);
        } else {
            this.addCoinAnime(targetSeat, info.hitSocre * this.roomBet, target.position, target.getComponent("Fish").fishInfo, isSelf, true);
        }
        target.parent = null;
        target.destroy();
    },

    onBoomFishHit(info) {
        // info:{userId:_userId,hitSocre:score,fishList:outfishList}}
        console.log("击中炸弹事件：", info);
        let fishNode = null;
        let isSelf = false;
        let targetSeat = this.getSeatByUser(info.userId);
        if (this.pInfo.playerId == info.userId) {
            isSelf = true;
        }
        for (const key in info.fishList) {
            let fishId = info.fishList[key];
            fishNode = this.getFishById(fishId);
            if (cc.isValid(fishNode)) {
                if (key == 0) {
                    this.addCoinAnime(targetSeat, info.hitSocre * this.roomBet, fishNode.position, fishNode.getComponent("Fish").fishType, isSelf, true);
                } else {
                    this.addCoinAnime(targetSeat, info.hitSocre * this.roomBet, fishNode.position, fishNode.getComponent("Fish").fishType, isSelf, false);
                }
                fishNode.parent = null;
                fishNode.destroy();
            }
        }
    },

    addCoinAnime(targetSeat, score, position, fishType, isSelf, isAddScore) {
        this.cannonList[targetSeat].check_pan(fishType, score);

        // console.log("score++ " + score);
        var coinbg = cc.find('Canvas/GameNode/coinbg');

        var coinpb = null;
        var coinnum = 0;
        if (score >= 100) {
            coinpb = this.coinPb[0];
            coinnum = parseInt(score / 100);
        } else if (score >= 10) {
            coinpb = this.coinPb[1];
            coinnum = parseInt(score / 10);
        } else {
            coinpb = this.coinPb[2];
            coinnum = Math.ceil(score);
        }
        if (coinnum > 6) coinnum = 6;
        for (var i = 0; i < coinnum; i++) {
            var coin = cc.instantiate(coinpb);
            coin.parent = coinbg;
            coin.position = position;

            coin.runAction(cc.sequence(cc.delayTime(0.3 * (i + 1)),
                cc.moveBy(0.4, 0, 65),
                cc.moveTo(0.5, this.cannonList[targetSeat].node.position),
                cc.removeSelf()));

        }

        if (isSelf) {
            var s = parseInt(Math.random() * 19);
            playEffect('die_' + s);
            playEffect('collect_2');

            var label = cc.instantiate(this.label_pb);
            label.opacity = 0;
            label.position = position;
            label.getComponent(cc.Label).string = "+" + Helper.fixNum(score);
            label.parent = coinbg;
            label.zIndex = 200;
            var t1 = 0.4;
            var s1 = 80;
            var t2 = 0.6
            label.runAction(cc.sequence(
                cc.spawn(cc.fadeIn(t1), cc.moveBy(t1, cc.v2(0, t1 * s1))),
                cc.moveBy(t2, cc.v2(0, t2 * s1)),
                cc.spawn(cc.fadeOut(t1), cc.moveBy(t1, cc.v2(0, t1 * s1))),
                cc.removeSelf()));
        }
        //分数增加
        if (isAddScore) {
            this.node.runAction(cc.sequence(cc.delayTime(0.3 * (coinnum + 1)),
                cc.callFunc(function () {
                    this.cannonList[targetSeat].addscore(score);
                }, this)));
        }

    },
    //增加钻石
    addDiamondAnim(targetSeat, dia, position, isSelf) {
        var coinbg = cc.find('Canvas/GameNode/coinbg');

        var diapb = this.diamondPb;
        var dianum = dia;

        for (var i = 0; i < dianum; i++) {
            var coin = cc.instantiate(diapb);
            coin.parent = coinbg;
            coin.position = position;

            coin.runAction(cc.sequence(cc.delayTime(0.1 * (i + 1)),
                cc.moveBy(0.4, 0, 65),
                cc.moveTo(0.5, this.cannonList[targetSeat].node.position),
                cc.removeSelf()));

        }

        if (isSelf) {
            var s = parseInt(Math.random() * 19);
            playEffect('die_' + s);
            playEffect('collect_2');

            var label = cc.instantiate(this.label_pb2);
            label.opacity = 0;
            label.position = position;
            label.getComponent(cc.Label).string = "+" + dia;
            label.parent = coinbg;
            label.zIndex = 200;
            var t1 = 0.4;
            var s1 = 80;
            var t2 = 0.6
            label.runAction(cc.sequence(
                cc.spawn(cc.fadeIn(t1), cc.moveBy(t1, cc.v2(0, t1 * s1))),
                cc.moveBy(t2, cc.v2(0, t2 * s1)),
                cc.spawn(cc.fadeOut(t1), cc.moveBy(t1, cc.v2(0, t1 * s1))),
                cc.removeSelf()));
        }
        //钻石增加
        this.node.runAction(cc.sequence(cc.delayTime(0.1 * (dianum + 1)),
            cc.callFunc(function () {
                this.cannonList[targetSeat].addDiamond(dia);
            }, this)));

    },

    bullet_change(num) {
        var index = this.power_list.indexOf(this.bulletPower);
        index += num;
        if (index < 0 || index >= this.power_list.length) return;
        this.bulletPower = this.power_list[index];

        this.fishNet.fishSocket.emit('changePower', JSON.stringify({
            userid: this.pInfo.playerId,
            bet: this.bulletPower,
        }));
    },


    changePower(info) {
        for (var i in this.playerList) {
            if (this.playerList && this.playerList[i].uid == info.userid) {
                this.cannonList[i].betLbl.string = Helper.fixNum(info.bet * this.roomBet);
                break;
            }
        }
    },

    cast_skill(sid) {
        if (sid == 1) {
            if (this.skillCD[0] > 0 || this.pInfo.playerCoin < this.skillCost[0]) {
                return;
            }
            let info = { uid: this.pInfo.playerId, sid: sid };

            //this.cast_skill_r(info);            
            this.fishNet.fishSocket.emit('useSKill', JSON.stringify(info));
        }
        // 锁定开关
        if (sid == 2) {
            this.isLockFish = !this.isLockFish;
            if (this.isLockFish) {
                this.getBigFishId();
                this.effect_lockFish.active = true;
                this.lab_lockFish.string = "解除锁定";
            } else {
                this.effect_lockFish.active = false;
                this.lab_lockFish.string = "锁定";
            }
        }

    },

    cast_skill_r(info) {
        var seatId = this.getSeatByUser(info.uid);
        if (seatId < 0) return;

        if (info.sid == 1) {
            this.skillTime[0] = this.skillMaxTime[0];
            this.skillCD[0] = this.skillMaxCD[0];
            this.effect_frozen.active = true;
            for (var i in this.fishBg.children) {
                var fish = this.fishBg.children[i];
                fish.pauseAllActions();
            }
        }

        // if (info.uid == this.pInfo.playerId)
        // {
        //     else if (info.sid == 2)
        //     {
        //         this.skillCD[1]  = this.skillMaxCD[1];
        //         this.skillTime[1] = this.skillMaxTime[1];
        //         this.schedule(this.shoot, 0.2, cc.macro.REPEAT_FOREVER, 0.01);
        //     }
        // }

        // if (info.sid == 2){
        //     this.cannonList[seatId].autoTime = this.skillMaxTime[1];
        // }
    },

    // isAiming(){
    //     return this.skillTime[1]>0;
    // },

    update(dt) {
        for (var i in this.skillTime) {
            if (this.skillTime[i] > 0) {
                this.skillTime[i]--;
            }
            if (this.skillCD[i] > 0) {
                this.skillCD[i]--;
            }

            var node;
            if (i == 0) {
                node = cc.find('Canvas/UI/b/s1/cd');
            } else if (i == 1) {
                node = cc.find('Canvas/UI/b/s2/cd');
            }

            node.getComponent(cc.ProgressBar).progress = this.skillCD[i] / this.skillMaxCD[i];
        }

        if (this.skillTime[0] == 1) {
            for (var i in this.fishBg.children) {
                var fish = this.fishBg.children[i];
                fish.resumeAllActions();
            }
            this.effect_frozen.active = false;
        }
        // if (this.skillTime[1] == 1)
        // {
        //     if (this.isAutoShot) {
        //         this.schedule(this.shoot, 0.3, cc.macro.REPEAT_FOREVER, 0.01);
        //     }else{
        //         this.unschedule(this.shoot);
        //     }
        // }

        // var aura = false;
        // for (var i in this.cannonList)
        // {
        //     if (this.cannonList[i].autoTime && this.cannonList[i].autoTime>0){
        //         aura = true;
        //     }
        // }

        var node = cc.find("Canvas/GameNode/aurabg/aura");
        if (this.isLockFish) {
            var fish = this.getBigFish();
            if (cc.isValid(fish)) {
                node.active = true;
                node.position = fish.position;
                node.scale = fish.height * 0.75 / 249;
            } else {
                node.active = false;
            }
        } else {
            node.active = false;
        }

    },

    getBigFishId() {
        let fishNode = this.getBigFish();
        if (!cc.isValid(fishNode)) return -1;
        return fishNode.getComponent("Fish").fishId;
    },
    getBigFish() {
        if (cc.isValid(this.targetFish)) {
            return this.targetFish;
        }
        var bigfishNode = null;
        for (var i in this.fishBg.children) {
            var fishNode = this.fishBg.children[i];
            var fish = fishNode.getComponent("Fish");
            if (fishNode.x < -667 || fishNode.x > 667 || fishNode.y < -375 || fishNode.y > 375 || fish.fishType < this.bigFishType) {
                continue;
            }
            if (bigfishNode == null || fish.fishType > bigfishNode.getComponent("Fish").fishType) {
                bigfishNode = fishNode;
            }
        }
        return bigfishNode;
    },

    setAutoShot(isAuto) {
        this.isAutoShot = isAuto;
        //if (this.skillTime[1]>0) return;
        if (isAuto) {
            this.schedule(this.shoot, 0.3, cc.macro.REPEAT_FOREVER, 0.01);
        } else {
            this.unschedule(this.shoot);
        }
    },

    setMusic() {
        if (this.pInfo.musicControl) {
            this.pInfo.musicControl = 0;
            this.musicToggle.isChecked = false;
            cc.audioEngine.stopAll();
        } else {
            this.pInfo.musicControl = 1;
            this.musicToggle.isChecked = true;
            playBGM('bg_0');
        }
        this.writeUserSettingDate_Function();
    },

    setSound() {
        if (this.pInfo.soundEffectControl) {
            this.pInfo.soundEffectControl = 0;
            this.soundToggle.isChecked = false;
        } else {
            this.pInfo.soundEffectControl = 1;
            this.soundToggle.isChecked = true;
        }
        this.writeUserSettingDate_Function();
    },
    /**
     * 将设置数据写入缓存数据
     */
    writeUserSettingDate_Function: function () {
        var data = {
            musicControl: this.pInfo.musicControl,
            soundEffectControl: this.pInfo.soundEffectControl
        };
        this.pInfo.writeData_Function("userSetting", data);
    },
});