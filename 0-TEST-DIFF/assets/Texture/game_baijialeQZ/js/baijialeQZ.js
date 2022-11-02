window.baijialeQZ_global = {};
cc.Class({
    extends: cc.Component,

    properties: {
        poker_arr: [cc.Node],

        chip_box: cc.Node,
        bet_text: cc.Node,
        player_node: [cc.Node],
        helpNode: cc.Node,
        recordNode: cc.Node,
        openCardNode: cc.Node,

        animeNode_start: cc.Node,
        animeNode_end: cc.Node,

        chips_node: cc.Node,
        com_result: cc.Node,
        zhuangName_lab: cc.Label,
        zhuangCoin_lab: cc.Label,
        //抢庄界面
        bankerNode: cc.Node,
        bankerslider: cc.Slider,
        bankerScroll: cc.ScrollView,
        bankerPreb: cc.Prefab,
        bankerCoin_lab: cc.Label,
        tipPreb: cc.Prefab,
        cardspframe: [cc.SpriteFrame],
        //headspframe:    [cc.SpriteFrame],
        resultspframe: [cc.SpriteFrame],

        pointspframe: [cc.SpriteFrame],

        chip_prefab: [cc.Prefab],
        m_iCurrentSelBet: -1,

        m_iGameOverTime: -1,
        m_lPoolNum: [],
        m_lPointNum: [],

        // userInfo_list:[],
        // farseer:{},
        table_userinfo: [],

        result_icon: [cc.SpriteFrame],
        result_icon_w: [cc.SpriteFrame],
    },

    // LIFE-CYCLE CALLBACKS:

    serializeUsers(user_object) {
        //0自己 1神算 2首富 3-6其他
        //bet_score
        //score
        //user_id
        //user_name
        //user_url
        //win_num

        // this.farseer = user_object.shen_suan_zi;
        // this.userInfo_list = user_object.ranking_list;
        if (this.table_userinfo.length == 0) {

            var playerInfo = require("PlayerInfo").getInstant;
            var playerInfoEx = window.baijialeQZ_sc;
            var info_0 = {
                score: playerInfoEx.score,
                user_id: playerInfoEx.id,
                user_name: playerInfoEx.nickname,
                user_url: playerInfoEx.headimgurl
            };
            this.table_userinfo.push(info_0);
        } else {
            this.table_userinfo.splice(1, this.table_userinfo.length - 1);
        }


        if (JSON.stringify(user_object.shen_suan_zi) != "{}") {
            this.table_userinfo.push(user_object.shen_suan_zi);
        } else {
            var info_x = {
                score: "",
                user_id: -1,
                user_name: "空缺",
                user_url: -1
            };
            this.table_userinfo.push(info_x);
        }

        for (var i in user_object.ranking_list) {
            var info = user_object.ranking_list[i];
            if (info.user_id == this.table_userinfo[1].user_id && parseInt(i) != 0)
                continue;
            if (info.user_id == this.table_userinfo[0].user_id && parseInt(i) != 0)
                continue;


            this.table_userinfo.push(info);
            if (this.table_userinfo.length >= 7)
                break;
        }

        for (var i = this.table_userinfo.length; i < 7; i++) {
            var info_x = {
                score: "",
                user_id: -1,
                user_name: "空缺",
                user_url: -1
            };
            this.table_userinfo.push(info_x);
        }

        this.setPlayerView();
    },

    onLoad() {

        this.chip_name = { 100: "chip_5", 500: "chip_5", 1000: "chip_10", 5000: "chip_50", 10000: "chip_100", 50000: "chip_500" };
        this.chip_nums = [100, 500, 1000, 5000, 10000, 50000];
        cc.debug.setDisplayStats(false);
        window.baijialeQZ_ins = this;
        var playerInfo = require("PlayerInfo").getInstant;
        var playerInfoEx = window.baijialeQZ_sc;
        this.playerId = playerInfoEx.id;
        //this.player_score = playerInfoEx.score;
        this.player_name = playerInfo.playerName;
        this.playerHead = playerInfo.playerHead;
        this.playerHeadId = playerInfo.playerHeadId;

        this.m_lPoolNum = [0, 0, 0, 0, 0];
        this.m_lPointNum = [0, 0];
        this.serializeUsers(window.baijialeQZ_global.userInfo_list);


        this.poker_pos = [];
        for (var i in this.poker_arr) {
            this.poker_pos[i] = this.poker_arr[i].position;
            this.poker_pos[i].opacity = 0;
        }


        this.resetparam();
        this.network = require('baijialeQZNetWork').getInstant;
        this.bet_text.active = false;
        this.zhuangName_lab.string = "";
        this.zhuangCoin_lab.string = "";

        this.network.LandlordsSocket.emit('getGameType', '');
        this.network.LandlordsSocket.emit("getGameRecordList", "");
    },

    start() {
        playBGM('bg');
    },

    updateOnlinePlayer(result) {
        let online_scrollView = this.node.getChildByName("com_online").getChildByName("list").getComponent(cc.ScrollView);
        online_scrollView.content.removeAllChildren();
        cc.loader.loadRes("playerList_item", function (err, prefab) {
            cc.loader.setAutoReleaseRecursively(prefab, true);
            for (let i in result) {
                let newNode = cc.instantiate(prefab);
                newNode.getChildByName("name_lab").getComponent(cc.Label).string = result[i].nickname;
                newNode.getChildByName("coin_lab").getComponent(cc.Label).string = Helper.fixNum(result[i].score);
                window.setHeadTexture(newNode.getChildByName("head_sp"), result[i].headimgurl);
                online_scrollView.content.addChild(newNode);
            }
        }.bind(this));

    },

    updateBankerList(ret) {
        this.bankerScroll.content.removeAllChildren();
        for (let i = 0; i < ret.length; i++) {
            let newNode = cc.instantiate(this.bankerPreb);
            newNode.getChildByName("num_lab").getComponent(cc.Label).string = i + 1;
            newNode.getChildByName("name_lab").getComponent(cc.Label).string = ret[i].nickname;
            newNode.getChildByName("coin_lab").getComponent(cc.Label).string = Helper.fixNum(ret[i].coin);
            this.bankerScroll.content.addChild(newNode);
        }
    },

    init_record(result) {
        // var arr = this.node.getChildByName("trend_box").getChildByName("ludan_20").children;
        // for (var i = result.length-1;i>0;i--)
        // {
        //     var res = result[i].win;
        //     var num = arr.length-1 - (result.length-1 - parseInt(i));
        //     if (num<0)break;
        //     var node = arr[num];

        //     node.getComponent(cc.Sprite).spriteFrame = this.resultspframe[res];
        // }

        var res_arr = [];
        var res_count = [0, 0, 0, 0, 0];
        for (var i in result) {
            res_count[result[i].win]++;
            if (result[i].is_zhuang_dui) res_count[3]++;
            if (result[i].is_xian_dui) res_count[4]++;

            if (res_arr.length == 0 || res_arr[res_arr.length - 1].win != result[i].win) {
                var r = { win: result[i].win, num: 0 };
                res_arr.push(r);
            } else {
                res_arr[res_arr.length - 1].num++;
            }
        }

        var k = res_arr.length - this.recordNode.getChildByName('dalu').children.length;
        if (k > 0) {
            res_arr.splice(0, k);
        }

        this.recordNode.getChildByName('zhuang').getComponent(cc.Label).string = res_count[0];
        this.recordNode.getChildByName('xian').getComponent(cc.Label).string = res_count[1];
        this.recordNode.getChildByName('ping').getComponent(cc.Label).string = res_count[2];

        this.recordNode.getChildByName('zhuangdui').getComponent(cc.Label).string = res_count[3];
        this.recordNode.getChildByName('xiandui').getComponent(cc.Label).string = res_count[4];


        var arr = this.recordNode.getChildByName('ld_da').children;
        for (var i in arr) {
            var node = arr[i];
            if (i >= result.length) {
                node.active = false;
            } else {
                node.active = true;
                node.getComponent(cc.Sprite).spriteFrame = this.result_icon_w[result[i].win];
            }
        }
        var arr_d = this.recordNode.getChildByName('dalu').children;
        for (var i = 0; i < arr_d.length; i++) {
            var node = arr_d[i];
            if (i >= res_arr.length) {
                node.active = false;
            } else {
                node.active = true;
                var info = res_arr[i];
                for (var j in node.children) {
                    var index = parseInt(j);
                    var item = node.children[j];
                    if (info.num < index) {
                        item.active = false;
                    } else {
                        item.active = true;
                        item.getComponent(cc.Sprite).spriteFrame = this.result_icon[info.win];
                        if (index == node.children.length - 1) {
                            var content = item.getChildByName('label').getComponent(cc.Label);
                            var z = info.num - node.children.length + 1;
                            content.string = z > 0 ? z : "";
                        }
                    }
                }
            }
        }
    },

    init_stat(result) {
        if (result.game_type == 1) {

            this.bet_text.active = true;
            this.m_iGameOverTime = Date.now() / 1000 + result.bet_time;

            this.node.getChildByName("anim_wait").active = false;
            this.poker_arr[4].opacity = 0;
            this.poker_arr[5].opacity = 0;
        } else {
            this.node.getChildByName("anim_wait").active = true;
            for (var i in this.poker_arr) {
                this.poker_arr[i].opacity = 0;
            }
        }

        for (var i in result.bet_list) {
            this.m_lPoolNum[result.bet_list[i].bet_res] = result.bet_list[i].bet_gold;
        }
        this.setPoolView();
    },

    setPoolView() {
        // for (var i =0;i<3;i++)
        // {
        //     this.node.getChildByName("main").getChildByName("chip_bg_"+i).getChildByName("pool").getComponent(cc.Label).string = this.m_lPoolNum[i];    
        // }

    },

    setPointView() {
        this.openCardNode.getChildByName('clearing_0').getComponent(cc.Sprite).spriteFrame = this.pointspframe[this.m_lPointNum[0] % 10];
        this.openCardNode.getChildByName('clearing_1').getComponent(cc.Sprite).spriteFrame = this.pointspframe[this.m_lPointNum[1] % 10];
    },
    update(dt) {
        if (this.m_iGameOverTime && this.bet_text.active) {
            var t = parseInt(this.m_iGameOverTime - Date.now() / 1000);

            if (t <= 5 && t + "" != this.bet_text.getChildByName('New Label').getComponent(cc.Label).string) {
                playEffect('countdown');
                if (t == 0) {
                    playEffect('stop_s');
                }
            }

            if (t <= 0) {
                this.bet_text.active = false;
                return;
            }
            this.bet_text.getChildByName('New Label').getComponent(cc.Label).string = t;
        }
    },

    resetparam() {
        this.m_iCurrentSelBet = -1;
        this.setBetView();
        this.setPlayerView();
    },

    bet(num, point) {
        this.lastTouchPoint = point;
        if (this.m_iCurrentSelBet == -1) {
            return;
        }

        var str = JSON.stringify({
            //bet_type: 1,
            bet_res: parseInt(num),
            bet_gold: this.m_iCurrentSelBet,
        });

        this.network.LandlordsSocket.emit('lottery', str);

        this.setBetView();
    },

    selbet(num) {
        if (this.m_iCurrentSelBet == num) {
            this.m_iCurrentSelBet = -1;
        } else {
            if (this.table_userinfo[0].score < num) {
                return;
            }
            playEffect('chip');
            this.m_iCurrentSelBet = num;
        }
        this.setBetView();
    },
    setBetView() {
        if (this.m_iCurrentSelBet > this.table_userinfo[0].score) {
            this.m_iCurrentSelBet = -1;
        }
        var betarray = this.chip_box.children;
        for (var i in betarray) {
            var node = betarray[i];

            if (this.chip_nums[i] <= this.table_userinfo[0].score) {
                node.opacity = 255;
            } else {
                node.opacity = 128;
            }

            if (this.chip_nums[i] == this.m_iCurrentSelBet) {
                node.getChildByName('chip_select').active = true;
            } else {
                node.getChildByName('chip_select').active = false;
            }
        }
    },

    setPlayerView() {
        for (var i in this.player_node) {
            var tag = parseInt(i);
            var info;
            if (tag >= this.table_userinfo.length) {
                info = {};
            } else {
                info = this.table_userinfo[tag];
            }
            this.player_node[tag].getChildByName("New Label").getComponent(cc.Label).string = info.user_name;
            if (this.player_node[tag].getChildByName("pl_gold_bar"))
                this.player_node[tag].getChildByName("pl_gold_bar").getChildByName("New Label").getComponent(cc.Label).string = Helper.fixNum(info.score);

            var head = info.user_url;
            var headnode = this.player_node[tag];
            if (head < 0) {
                head = 0;
            }
            if (headnode.getChildByName("pl_face")) {
                headnode = headnode.getChildByName("pl_face");
            }
            //headnode.getComponent(cc.Sprite).spriteFrame = this.headspframe[head];
            window.setHeadTexture(headnode, head);
        }
    },

    showResult(ret) {
        let instance = this;
        //012 龙虎和 1234 黑红花片
        //var sam = {hu_card:2307,long_card:258,ResultCode:1,win:1};

        this.table_userinfo[0].score += ret.user_win;

        var per_time = 1.2;
        var needtime = 1.2 * (ret.XianCards.length + ret.ZhuangCards.length - 2);
        this.openCardNode.active = true;


        this.scheduleOnce(function () {
            this.setPokerSp(0, ret.XianCards[0]);
        }, 0);

        this.scheduleOnce(function () {
            this.setPokerSp(1, ret.ZhuangCards[0]);
        }, per_time);

        this.scheduleOnce(function () {
            this.setPokerSp(2, ret.XianCards[1]);
        }, per_time * 2);

        this.scheduleOnce(function () {
            this.setPokerSp(3, ret.ZhuangCards[1]);
        }, per_time * 3);

        var t_delay = 0;
        if (ret.XianCards.length == 3) {
            this.scheduleOnce(function () {
                this.setPokerSp(4, -1);
                this.poker_arr[4].opacity = 255;
                this.poker_arr[4].position = this.poker_pos[4];
                this.poker_arr[4].x += 60;
                this.poker_arr[4].y += 120;
                this.poker_arr[4].runAction(cc.moveTo(0.1, this.poker_pos[4]));
            }, per_time * 4);

            this.scheduleOnce(function () {
                this.setPokerSp(4, ret.XianCards[2]);
            }, per_time * 4 + 0.1);

            t_delay = per_time + 0.1;
        }

        if (ret.ZhuangCards.length == 3) {
            this.scheduleOnce(function () {
                this.setPokerSp(5, -1);
                this.poker_arr[5].opacity = 255;
                this.poker_arr[5].position = this.poker_pos[5];
                this.poker_arr[5].x -= 60;
                this.poker_arr[5].y += 120;
                this.poker_arr[5].runAction(cc.moveTo(0.1, this.poker_pos[5]));
            }, per_time * 4 + t_delay);

            this.scheduleOnce(function () {
                this.setPokerSp(5, ret.ZhuangCards[2]);
            }, per_time * 4 + t_delay + 0.1);
        }

        //this.setPokerSp(0,ret.long_card);
        this.scheduleOnce(function () {
            //this.setPokerSp(1,ret.hu_card);
            this.scheduleOnce(function () {
                var winarea = this.node.getChildByName('main').getChildByName('win_effect_' + ret.win);
                winarea.opacity = 0;
                winarea.active = true;
                winarea.runAction(cc.sequence(cc.fadeIn(0.4), cc.fadeOut(0.4), cc.fadeIn(0.4), cc.fadeOut(0.4)));


                if (ret.is_zhuang_dui) {
                    var winarea = this.node.getChildByName('main').getChildByName('win_effect_3');
                    winarea.opacity = 0;
                    winarea.active = true;
                    winarea.runAction(cc.sequence(cc.fadeIn(0.4), cc.fadeOut(0.4), cc.fadeIn(0.4), cc.fadeOut(0.4)));
                }
                if (ret.is_xian_dui) {
                    var winarea = this.node.getChildByName('main').getChildByName('win_effect_4');
                    winarea.opacity = 0;
                    winarea.active = true;
                    winarea.runAction(cc.sequence(cc.fadeIn(0.4), cc.fadeOut(0.4), cc.fadeIn(0.4), cc.fadeOut(0.4)));
                }

            }, needtime);

            this.scheduleOnce(function () {
                this.com_result.active = true;
                this.com_result.getChildByName("win_lab").getComponent(cc.Label).string = Helper.fixNum(ret.user_win);
                var arr = this.chips_node.children;
                for (var i in arr) {
                    var chip_node = arr[i];
                    if (chip_node.on_pool == ret.win
                        || (chip_node.on_pool == 3 && ret.is_zhuang_dui)
                        || (chip_node.on_pool == 4 && ret.is_xian_dui)) {
                        var inited = false;
                        var endpos;
                        if (chip_node.owner == this.playerId) {
                            inited = true;
                            endpos = cc.v2(693, 61);
                        }
                        if (inited) {
                            chip_node.runAction(cc.sequence(cc.moveTo(0.25, endpos), cc.removeSelf()));
                        } else {
                            chip_node.runAction(cc.sequence(cc.fadeOut(0.25), cc.removeSelf()));
                        }
                    } else {
                        chip_node.runAction(cc.sequence(cc.fadeOut(0.2), cc.removeSelf()));
                    }
                }
            }, needtime + 0.4);

            this.scheduleOnce(function (dt) {
                this.setPlayerView(0);
                if (ret.user_win > 0) {
                    playEffect('ADD_SCORE');
                }

                this.network.LandlordsSocket.emit("getGameRecordList", "");
            }, needtime);

            this.scheduleOnce(function (dt) {
                instance.setPokerVisible(false);
                instance.node.getChildByName("anim_wait").active = true;

                instance.m_lPoolNum = [0, 0, 0, 0, 0];
                instance.m_lPointNum = [0, 0];
                instance.setPoolView();

                instance.setPointView();
            }, needtime + 1.4);
        }, needtime);

    },

    onBet(info) {
        // info.bet_res;
        // info.bet_gold;
        // info.userId;

        playEffect('choumaxiazhu');
        this.m_lPoolNum[info.bet_res] += info.bet_gold;
        this.setPoolView();

        var chip_startpos;

        var chip_endpos;

        var inited = false;

        var endnode = this.node.getChildByName('main').getChildByName('betting_area_' + info.bet_res);

        var ownerTag = -1;
        for (var i in this.table_userinfo) {
            if (this.table_userinfo[i].user_id + "" == info.userId + "") {
                ownerTag = parseInt(i);
                break;
            }
        }

        for (var i in this.table_userinfo) {
            if (this.table_userinfo[i].user_id + "" == info.userId + "") {
                this.table_userinfo[i].score -= info.bet_gold;
            }
        }
        this.setPlayerView();

        if (ownerTag == 0) {
            //this.player_score -= info.bet_gold;
            inited = true;

            chip_startpos = this.chip_box.getChildByName(this.chip_name[info.bet_gold]).convertToWorldSpaceAR(cc.v2(0, 0));

            //var endpos_mid = endnode.getChildByName('mid').convertToWorldSpaceAR(cc.v2(0, 0));
            var endpos_min = endnode.getChildByName('min').convertToWorldSpace(cc.v2(0, 0));
            var endpos_max = endnode.getChildByName('max').convertToWorldSpace(cc.v2(0, 0));

            if (this.lastTouchPoint.x >= endpos_min.x && this.lastTouchPoint.y >= endpos_min.y
                && this.lastTouchPoint.x <= endpos_max.x && this.lastTouchPoint.y <= endpos_max.y) {
                var endx = this.lastTouchPoint.x + Math.floor(Math.random() * 60) - 30;
                var endy = this.lastTouchPoint.y + Math.floor(Math.random() * 60) - 30;
            } else {
                var endx = Math.floor(Math.random() * (endpos_max.x - endpos_min.x)) + endpos_min.x;
                var endy = Math.floor(Math.random() * (endpos_max.y - endpos_min.y)) + endpos_min.y;
            }

            chip_endpos = cc.v2(endx, endy);

        } else {
            inited = true;

            //var endpos_mid = endnode.getChildByName('mid').convertToWorldSpaceAR(cc.v2(0, 0));
            var endpos_min = endnode.getChildByName('min').convertToWorldSpaceAR(cc.v2(0, 0));
            var endpos_max = endnode.getChildByName('max').convertToWorldSpaceAR(cc.v2(0, 0));


            var endx = Math.floor(Math.random() * (endpos_max.x - endpos_min.x)) + endpos_min.x;
            var endy = Math.floor(Math.random() * (endpos_max.y - endpos_min.y)) + endpos_min.y;

            chip_endpos = cc.v2(endx, endy);

            chip_startpos = chip_endpos;

        }

        if (inited) {
            var chip_node = cc.instantiate(this.chip_prefab[this.chip_nums.indexOf(info.bet_gold)]);
            chip_node.x = chip_startpos.x;
            chip_node.y = chip_startpos.y;
            chip_node.scale = 0.4;
            chip_node.parent = this.chips_node;
            chip_node.runAction(cc.moveTo(0.25, chip_endpos.x, chip_endpos.y));

            chip_node.owner = info.userId;
            chip_node.on_pool = info.bet_res;
        }
    },

    betBegin(name, coin) {
        this.zhuangName_lab.string = name;
        this.zhuangCoin_lab.string = Helper.fixNum(coin);
        this.network.LandlordsSocket.emit("getGameRankingList", "");
    },

    betBegin_r() {
        playEffect('start_s');
        this.m_lPoolNum = [0, 0, 0, 0, 0];
        this.m_lPointNum = [0, 0];
        this.com_result.active = false;
        this.setPoolView();
        this.setPointView();
        this.openCardNode.active = false;

        this.node.getChildByName("anim_wait").active = false;
        this.m_iGameOverTime = Date.now() / 1000 + 15;

        let instance = this;
        instance.setPokerVisible(true);

        var start = instance.node.getChildByName('anim_start');
        this.scheduleOnce(() => {
            start.active = false;
            this.bet_text.active = true;
        }, 1);
        start.active = true;

        // });
        // ske.active = true;
    },

    setPokerSp(tag, num) {
        var node = this.poker_arr[tag];

        if (num < 0) {
            node.getComponent(cc.Sprite).spriteFrame = this.cardspframe[52];
        } else {
            var a1 = parseInt(num / 16) / 16;
            var b1 = num % 16;
            var i = (b1 - 1) * 13 + (a1 - 1);
            node.runAction(cc.sequence(cc.scaleTo(0.25, 1.2, 1.2), cc.scaleTo(0.25, 0, 1.2)));
            this.scheduleOnce(function () {
                node.getComponent(cc.Sprite).spriteFrame = this.cardspframe[i];
                node.runAction(cc.sequence(cc.scaleTo(0.25, 1.2, 1.2), cc.scaleTo(0.25, 1, 1)));

                console.log("a1 = " + a1 + ",tag = " + tag, ",num = " + num);

                var mm = a1;
                if (mm >= 10 || mm < 0) mm = 0;
                if (tag % 2 == 0) {
                    this.m_lPointNum[0] += mm;
                    //this.m_lPointNum[0] = this.m_lPointNum[0]%10;
                } else {
                    this.m_lPointNum[1] += mm;
                    //this.m_lPointNum[1] = this.m_lPointNum[1]%10;
                }

                this.setPointView();

            }, 0.5);

        }
    },

    setPokerVisible(flag) {
        var t = 0.15;
        if (!flag) {
            for (var j = 0; j < 6; j++) {
                let i = j;
                this.poker_arr[i].runAction(cc.spawn(cc.moveTo(t, cc.v2(this.poker_pos[i].x, this.poker_pos[i].y + 120)), cc.fadeOut(t)));
                this.scheduleOnce(function (dt) {
                    this.poker_arr[i].position = this.poker_pos[i];
                    this.setPokerSp(i, -1);
                }, t + 0.1);
            }
        } else {
            for (var j = 0; j < 4; j++) {
                let i = j;
                this.poker_arr[i].opacity = 0;
                this.scheduleOnce(function () {
                    playEffect('SEND_CARD');
                    this.setPokerSp(i, -1);
                    this.poker_arr[i].opacity = 0;
                    this.poker_arr[i].position = this.poker_pos[i];
                    this.poker_arr[i].y += 120;
                    if (i % 2 == 0) {
                        this.poker_arr[i].x += 60;
                    } else {
                        this.poker_arr[i].x -= 60;
                    }

                    this.poker_arr[i].runAction(cc.spawn(cc.moveTo(t, this.poker_pos[i]), cc.fadeIn(t)));
                }, j * t);
            }
            this.poker_arr[4].opacity = 0;
            this.poker_arr[5].opacity = 0;
        }
    },

    createNewTip(data) {
        let newTip = cc.instantiate(this.tipPreb);
        newTip.getComponent(cc.Label).string = data;
        this.node.addChild(newTip);
        cc.tween(newTip)
            .to(1, { position: cc.v2(0, 100), opacity: 100 })
            .call(() => {
                newTip.destroy();
            })
            .start();
    }
});
