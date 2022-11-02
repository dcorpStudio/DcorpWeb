function loadImage(url, code, callback) {
    cc.loader.load(url, function(err, tex) {
        var spriteFrame = new cc.SpriteFrame(tex, cc.Rect(0, 0, tex.width, tex.height));
        callback(code, spriteFrame);
    });
};

function getBaseInfo(userid, callback) {
    if (cc.vv.baseInfoMap == null) {
        cc.vv.baseInfoMap = {};
    }
    if (cc.vv.baseInfoMap[userid] != null) {
        callback(userid, cc.vv.baseInfoMap[userid]);
    } else {
        cc.vv.http.sendRequest('/base_info', {
            userid: userid
        }, function(ret) {
            var url = null;
            if (ret.headimgurl) {
                url = ret.headimgurl;
            }
            var info = {
                name: ret.name,
                sex: ret.sex,
                url: url
            }
            cc.vv.baseInfoMap[userid] = info;
            callback(userid, info);
        }, cc.vv.http.master_url);
    }
};
cc.Class({
    extends: cc.Component,
    properties: {},
    // use this for initialization
    onLoad: function() {
        this.setupSpriteFrame();
    },
    setUserID: function(userid, ttype) {
        if (!userid) {
            return;
        }
        if (cc.vv.images == null) {
            cc.vv.images = {};
        }
        var self = this;
        // 如果指定类型为1表示显示二维码信息
        if (ttype == 1) {
            var yaoqing = 'btmj' + cc.vv.userMgr.yaoqing_key;
            var roomid = cc.vv.userMgr.shareRoomId || cc.vv.gameNetMgr.roomId || "000000";
            var url = 'http://mj.yajugame.com/manage1/?/member/user/qrcode_app/';
            if (!yaoqing) {
                return
            }
            url = url + yaoqing + '/' + roomid + '.png';
            loadImage(url, userid, function(err, spriteFrame) {
                self._spriteFrame = spriteFrame;
                self.setupSpriteFrame();
            });
        } else {
            getBaseInfo(userid, function(code, info) {
                if (info && info.url) {
                    loadImage(info.url, userid, function(err, spriteFrame) {
                        self._spriteFrame = spriteFrame;
                        self.setupSpriteFrame();
                    });
                }
            });
        }
    },
    setupSpriteFrame: function() {
        if (this._spriteFrame) {
            var spr = this.getComponent(cc.Sprite);
            if (spr) {
                spr.spriteFrame = this._spriteFrame;
            }
        }
    }
});