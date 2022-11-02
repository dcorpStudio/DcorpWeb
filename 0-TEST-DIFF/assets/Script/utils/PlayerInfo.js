/**
 * 玩家信息管理
 */
var PlayerInfo = (function () {
    /**
     * 单例模式
     */
    function getInstant() {
        var _instance;
        if (_instance === undefined) {
            _instance = new Single();
        }
        return _instance;
    }
    /**
     * 逻辑层
     */
    function Single() {
        this.serverVersion = new Array(8);
        this.localVersion = new Array(8);
        this.needToUpdate = [0, 0, 0, 0, 0, 0, 0, 0];
        this.loginIp = "";
        this.guest = "";
        this.shareUrl = null;
        this.exchangeRate = 1;
        this.account = "";
        this.password = "";
        this.loginCode = "";
        this.sign = "";
        this.gameSign = "";
        this.code = "";
        this.playerId = 0;
        this.playerName = "";
        this.playerCoin = 0;
        this.playerBankCoin = 0;
        this.playerGift = 0;
        this.playerDiamond = 0;
        this.playerHead = null;
        this.playerHeadId = -1;
        this.playerHeadArray = [];
        this.mailList = null;
        this.musicControl = null;
        this.soundEffectControl = null;
        this.isOffical = !1;
        this.phoneNumber = "";
        this.aliAccount = "";
        this.encryptAliAccount = "";
        this.aliName = "";
        this.encryptAliName = "";
        this.gameIp = "";
        this.gameProt = "";
        this.gameName = "";
        this.gameDisconnect = !1;
        this.gameHide = !1;
        this.gameObj = null;
        this.sceneName = "";
        this.isBindPhone = null;
        this.isBindAli = null;
        this.isBindCreditCard = null;
        this.isWithdraw = null;
        this.isWithdrawPhoneCard = null;
        this.isAutoLogin = 0;
        this.paySelect = null;
        this.iosPay = 0;
        this.agent = null;
        this.iosChannel = "";
        this.win_pool = 0;
        this.init_Function = function () {
            cc.game.on(cc.game.EVENT_HIDE, this.gameOnHide_Function.bind(this)),
                cc.game.on(cc.game.EVENT_SHOW, this.gameOnShow_Function.bind(this))
        };
        this.writeData_Function = function (e, t, i) {
            cc.sys.isNative ? cc.sys.localStorage.setItem(e, JSON.stringify(t)) : localStorage.setItem(e, JSON.stringify(t)),
                i && i()
        };
        this.readData_Function = function (e) {
            var t = null;
            return t = cc.sys.isNative ? JSON.parse(cc.sys.localStorage.getItem(e)) : JSON.parse(localStorage.getItem(e))
        };
        this.gameOnHide_Function = function () {
            this.gameHide = true;
            this.hideTime = Date.parse(new Date) / 1000;
        };
        this.gameOnShow_Function = function () {
            if (this.gameHide) {
                this.showTime = Date.parse(new Date) / 1000;
                /*
                switch (this.gameName) 
                {
                    case "Lobby":
                        this.showTime - this.hideTime > 30 && this.gameObj.netWorkDisconneted_Function("游戏已断开，请重新连接游戏");
                        break;
                    case "GrabBull":
                        this.showTime - this.hideTime > 5 && (this.gameObj.gameExit = true, this.gameObj.disconnectNetWork_Function());
                        break;
                    case "Bull":
                        this.showTime - this.hideTime > 5 && (this.gameObj.gameExit = true, this.gameObj.disconnectNetWork_Function());
                        break;
                    case "LineGame":
                        this.showTime - this.hideTime > 20 && (this.gameObj.gameExit = true, this.gameObj.disconnectNetWork_Function());
                        break;
                    case "Fish":
                        this.showTime - this.hideTime > 5 && (this.gameObj.gameExit = true, this.gameObj.disconnectNetWork_Function());
                        break;
                    case "Bde":
                        this.showTime - this.hideTime > 5 && (this.gameObj.gameExit = true, this.gameObj.disconnectNetWork_Function());
                        break;
                    case "TwoEight":
                        this.showTime - this.hideTime > 5 && (this.gameObj.gameExit = true, this.gameObj.disconnectNetWork_Function());
                        break;
                    case "Land":
                        this.showTime - this.hideTime > 5 && (this.gameObj.gameExit = true, this.gameObj.disconnectNetWork_Function());
                        break;
                    case "Runing":
                        this.showTime - this.hideTime > 5 && (this.gameObj.gameExit = true, this.gameObj.disconnectNetWork_Function());
                        break;
                    case "Holdem":
                        this.showTime - this.hideTime > 5 && (this.gameObj.gameExit = true, this.gameObj.disconnectNetWork_Function());
                        break;
                    case "Flower":
                        this.showTime - this.hideTime > 5 && (this.gameObj.gameExit = true, this.gameObj.disconnectNetWork_Function());
                        break;
                    default:
                        cc.log(this.gameName);
                        break;
                }
                */
                this.gameHide = false;
            }
        };
        this.setGameObj_Function = function (gameObj) {
            this.gameObj = null;
            this.gameObj = gameObj;
        };
        this.changeIp_Function = function (e, t) {
            var i, n, o;
            switch (t) {
                case 0:
                    i = e.substr(7),
                        n = i.split(":")[0],
                        o = "http://" + jsb.reflection.callStaticMethod("RootViewController", "getIp:", n) + ":" + i.split(":")[1];
                    break;
                case 1:
                    o = jsb.reflection.callStaticMethod("RootViewController", "getIp:", e)
            }
            return o
        };
        this.init_Function();
    }
    return {
        getInstant: new getInstant()
    }
})();
module.exports = PlayerInfo;