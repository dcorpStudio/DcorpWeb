cc.Class({
    extends: cc.Component,

    properties: {
        edit_box: cc.EditBox,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.url_ = "http://yidaliadmin.youmegame.cn/index.php/agent/api/uidcode"; //太子城版本
        //this.url_="http://211.149.229.56:8089/index.php/agent/api/uidcode"; //金博娱乐版本
        this.key_ = "fdgkl5rtlk4mfdv";
    },

    start() {
        this.node.getChildByName('dl_ui').active = false;
    },

    onClick(event, customEventData) {
        if (customEventData == "close") {
            this.node.active = false;
        } else if (customEventData == "sure") {
            this.setDaili(this.edit_box.string);
        }
    },

    setDaili(txt) {
        if (txt == "") return;

        // $time = strtotime('now');
        // $key = 'fdgkl5rtlk4mfdv';
        // $sign = md5($time.$key);
        // $uid = 1000;
        // $code = '025679';
        // $url= $this->hturl."/index.php/agent/api/uidcode/time/{$time}/sign/{$sign}/uid/{$uid}/code/{$code}";
        // $res = $this->_request($url);

        var pInfo = require('PlayerInfo').getInstant;
        var MD5 = require("md5").getInstant;
        var time = parseInt(Date.now() / 1000);

        var url = this.url_;
        url += "/time";
        url += "/" + time;
        url += "/sign";
        url += "/" + MD5.hex_md5(time + this.key_);
        url += "/uid";
        url += "/" + pInfo.playerId;
        url += "/code";
        url += "/" + txt;

        console.log("pInfo:", pInfo, "url:", url);
        let instance = this;
        this.sendpost(url, function (response) {
            if (response.status === 1) {
                //成功
                instance.node.active = false;
            } else {
                //失败
                instance.node.getChildByName('dl_ui').active = true;
            }
            cc.find("Canvas").getComponent("LobbyMain").showMessagebox_Function(response.msg, 1, 4);
        }, "");


    },
    // update (dt) {},

    sendpost: function (url, callback, str) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = xhr.response;
                //console.log(response);

                if (null !== xhr.response !== null) {
                    try {
                        response = JSON.parse(response);
                    }
                    catch (errot) {
                        //  cc.log("JSON wrong");
                    }
                    callback && callback(response);
                }
            }
        };
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
        xhr.send(str);
    },
});
