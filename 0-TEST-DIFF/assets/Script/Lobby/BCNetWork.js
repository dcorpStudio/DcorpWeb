/**
 * 消息SOCKET通讯
 */
var BCNetWork = {
    playerInfo: null,
    socket: null,
    io: null,
    connected: false,
    /**
     * 初始化
     */
    netWorkInit_Function: function () {
        this.io = null;
        this.socket = null;
        this.connected = false;
        this.playerInfo = require("PlayerInfo").getInstant;
        this.url = Lhjconfig.Server_IP + ':13001';
        if (cc.sys.isNative) {
            this.socket = SocketIO.connect(this.url);
        } else {
            this.io = require("socket-io");
            this.socket = this.io(this.url);
        }
        this.loginSocketOn_Function();
    },

    loginSocketOn_Function: function () {
        var self = this;
        /**
         * 连接错误
         */
        self.socket.on("connect_error", function (ret) {
            if (self.socket !== null) {
                for (var key in self.socket.$events) {
                    if (key !== 0) {
                        self.socket.removeListen(key);
                    }
                }
            }
        });
        /**
         * 连接超时
         */
        self.socket.on("connect_timeout", function (ret) {
            if (self.socket !== null) {
                for (var key in self.socket.$events) {
                    if (key !== 0) {
                        self.socket.removeListen(key);
                    }
                }
            }
        });
        /**
         * 网络错误
         */
        self.socket.on("error", function (ret) {
            if (self.socket !== null) {
                for (var key in self.socket.$events) {
                    if (key !== 0) {
                        self.socket.removeListen(key);
                    }
                }
            }
        });
        /**
         * 重新连接
         */
        self.socket.on("reconnect", function (ret) {
            if (self.socket !== null) {
                for (var key in self.socket.$events) {
                    if (key !== 0) {
                        self.socket.removeListen(key);
                    }
                }
            }
        });
        /**
         * 连接socke.
         * 用户登录
         */
        self.socket.on("connected", function (ret) {
            //cc.log(ret);
            if (ret) {
                self.connected = true;
            }
        });

        self.anotherFunctionInit_Function();

    },
    /**
     * 
     */
    anotherFunctionInit_Function: function () {
        var self = this;

        /**
         * 走马灯信息
         */
        self.socket.on("bigPriceMessage", function (ret) {
            console.log('noticeMsg:' + JSON.stringify(ret));
            if(ret.code){
                cc.loader.loadRes("bc_Message", function (err, prefab) {
                    cc.loader.setAutoReleaseRecursively(prefab, true);
                    let newNode = cc.instantiate(prefab);
                    newNode.getComponent("BC_message").setView(ret.data);
                    cc.find("Canvas").addChild(newNode);
                }.bind(this));
            }
        });

        /**
         * 断开连接
         */
        self.socket.on("disconnect", function () {
            self.connected = false;
        });

    },

    /**
     * 断开socket
     */
    logoutAccount_Function: function () {
        console.log('logoutAccount_Function');
        this.socket.disconnect();
        this.socket = null;
    },

    /**
     * 解析JSON数据
     * @param {*} ret 
     */
    changeResultJSON: function (ret) {
        if (cc.sys.isNative) {
            return JSON.parse(ret);
        }
        return ret;
    },
}

module.exports = BCNetWork;