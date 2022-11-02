(() => {
    let helper = function () { };

    helper.prototype.loadHead = (url, cb) => {
        if (!!url) {
            if (url == parseInt(url)) {
                cc.loader.loadRes(`head/s${url}`, cc.SpriteFrame, (err, sp) => {
                    cb(sp);
                });
            } else {
                cc.loader.load({
                    url: url,
                    type: 'png'
                }, (err, texture) => {
                    cb(new cc.SpriteFrame(texture));
                });
            }
        }
    };

    helper.prototype.setButtonAudio = () => {
        cc.Button.prototype._onTouchEnded = function (t) {
            let audioBool = this.clickEvents.length > 0 && !!this.clickEvents[0] && !!this.clickEvents[0].target && !!this.clickEvents[0].handler;
            if (audioBool && cc.director.getScene().name == 'LobbyMain') {
                window.playEffect('click');
            }
            if (this.interactable && this.enabledInHierarchy) {
                if (this._pressed) {
                    cc.Component.EventHandler.emitEvents(this.clickEvents, t);
                    this.node.emit("click", this);

                }
                this._pressed = !1;
                this._updateState();
                t.stopPropagation();
            }
        };
    };

    helper.prototype.fixNum = n => {
        let playerInfo = require("PlayerInfo").getInstant;
        n = n / playerInfo.exchangeRate;
        return n.toFixed(2);
    };

    helper.prototype.tofixNum = n => {
        return n.toFixed(2);
    };

    helper.prototype.toThousands = val => {
        if (!isNaN(val)) {
            var source = String(val.toFixed(2)).split("."); //按小数点分成2部分
            source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");//只将整数部分进行都好分割
            return source.join(".");//再将小数部分合并进来
        }
        else {
            return "转化失败";
        }
    };

    helper.prototype.http = (url, data) => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    if (!!xhr.response) {
                        try {
                            const response = JSON.parse(xhr.response);
                            resolve(response);
                        } catch (e) {
                            reject(e);
                            console.error('json解析错误');
                        }
                    } else {
                        reject('空消息');
                    }
                }
            }
            xhr.open("post", url);
            xhr.send(data);
        })
    };

    if (typeof (window) != "undefined") {
        window.Helper = Object.create(helper.prototype);
    }
})();