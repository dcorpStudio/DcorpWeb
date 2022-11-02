/**
 * 游戏更新管理
 */
cc.Class({
    extends: cc.Component,

    properties: {
        manifesttype: {
            default: [],
            type: cc.Asset
        },
        _updating: false,
        _canRetry: false
    },
    onLoad: function() {
        this.gameArray = [0, 0, 0, 0, 0, 0, 0, 0];
        this.gameName = "";
        this.isChecking = false;
        this.playerInfo = require("PlayerInfo").getInstant;
    },
    /**
     * 检测版本
     * @param {*} event 
     */
    checkCb: function(event) {
        cc.log("Code: " + event.getEventCode());
        switch (event.getEventCode()) 
        {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                var index = 1;
                switch (this.gameName) {
                case "GrabBull":
                    this.gameArray[0] = 1;
                    index = 1;
                    break;
                case "Fish":
                    this.gameArray[1] = 1;
                    index = 2;
                    break;
                case "Bull":
                    this.gameArray[2] = 1;
                    index = 3;
                    break;
                case "Bde":
                    this.gameArray[3] = 1;
                    index = 4;
                    break;
                case "TwoEight":
                    this.gameArray[4] = 1;
                    index = 5;
                    break;
                case "LineGame":
                    this.gameArray[5] = 1;
                    index = 6;
                    break;
                case "Land":
                    this.gameArray[6] = 1;
                    index = 7;
                    break;
                }
                this.playerInfo.localVersion[index] = this.serverVersion;
                cc.log(this.serverVersion);
                cc.log(this.playerInfo.localVersion);
                this.writeGameVersion_Function(this.playerInfo.localVersion,function() {
                    cc.game.restart();
                });
                this._updating = false;
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                this.node.getComponent("LobbyMain").com_UpdateMessageBox.active = true;
                this.node.getComponent("LobbyMain").com_UpdateMessageBox.getChildByName("pb_Loading").getComponent("cc.ProgressBar").progress = 0;
                this.node.getComponent("LobbyMain").com_UpdateMessageBox.getChildByName("pb_Loading").active = true;
                this.node.getComponent("LobbyMain").bg_Black.active = true;
                this.node.getComponent("LobbyMain").com_UpdateMessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "游戏需要更新到 " + this.serverVersion + " 版本";
                break;
            default:
                break;
        }
        cc.eventManager.removeListener(this._checkListener);
        this._checkListener = null;
        this._updating = false;
        this.hotUpdate();
    },

    /**
     * 更新版本
     * @param {*} event 
     */
    updateCb: function(event) {
        //是否更新完成
        var isFinished = false;
        //是否需要更新
        var isUpdate = false;
        switch (event.getEventCode()) 
        {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                isUpdate = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                this.node.getComponent("LobbyMain").checkUpdateTime = 20;
                this.node.getComponent("LobbyMain").com_UpdateMessageBox.getChildByName("pb_Loading").active = true;
                this.node.getComponent("LobbyMain").com_UpdateMessageBox.getChildByName("pb_Loading").getComponent("cc.ProgressBar").progress = event.getDownloadedBytes() / event.getTotalBytes();
                event.getMessage();
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                isUpdate = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                cc.log("已是最新版本");
                this._updating = false;
                isUpdate = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                cc.log("更新完成");
                this.node.getComponent("LobbyMain").checkUpdateTimeOut = false;
                this.node.getComponent("LobbyMain").com_UpdateMessageBox.getChildByName("pb_Loading").active = true;
                this.node.getComponent("LobbyMain").com_UpdateMessageBox.getChildByName("pb_Loading").getComponent("cc.ProgressBar").progress = 1;
                isFinished = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                this._updating = false;
                this._canRetry = true;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                break;
        }
        if(isUpdate)
        {
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
            this._updating = false;
        }
        if (isFinished) 
        {
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
            var paths = jsb.fileUtils.getSearchPaths();
            var local_paths = this._am.getLocalManifest().getSearchPaths();
            console.log(JSON.stringify(local_paths));
            Array.prototype.unshift(paths, local_paths);
            cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(paths));
            jsb.fileUtils.setSearchPaths(paths);
            cc.audioEngine.stopAll();
            var index = 0;
            switch (this.gameName) {
            case "GrabBull":
                this.gameArray[0] = 1;
                index = 1;
                break;
            case "Fish":
                this.gameArray[1] = 1;
                index = 2;
                break;
            case "Bull":
                this.gameArray[2] = 1;
                index = 3;
                break;
            case "Bde":
                this.gameArray[3] = 1;
                index = 4;
                break;
            case "TwoEight":
                this.gameArray[4] = 1;
                index = 5;
                break;
            case "LineGame":
                this.gameArray[5] = 1;
                index = 6;
                break;
            case "Land":
                this.gameArray[6] = 1;
                index = 7
            }
            var gameVersion = JSON.parse(cc.sys.localStorage.getItem("gameVersion"));
            this.node.getComponent("LobbyMain").com_UpdateMessageBox.getChildByName("pb_Loading").active = true;
            this.node.getComponent("LobbyMain").com_UpdateMessageBox.getChildByName("pb_Loading").getComponent("cc.ProgressBar").progress = 1;
            if(gameVersion !== null)
            {
                this.playerInfo.localVersion[index] = this.serverVersion;
                this.writeGameVersion_Function(this.playerInfo.localVersion,function() {
                    cc.game.restart();
                });
            }
        }
    },
    /**
     * 重试
     */
    retry: function() { 
        if(!this._updating && this._canRetry)
        {
            this._canRetry = false, this._am.downloadFailedAssets();
        }
    },

    /**
     * 检测更新
     */
    checkUpdate: function() {
        if(this._updating || this._am.getLocalManifest().isLoaded())
        {
            this._checkListener = new jsb.EventListenerAssetsManager(this._am, this.checkCb.bind(this));
            cc.eventManager.addListener(this._checkListener, 1);
            this._am.checkUpdate();
            this._updating = true;
        }
    },

    /**
     * 热更新
     */
    hotUpdate: function() {
        this._updateListener = new jsb.EventListenerAssetsManager(this._am, this.updateCb.bind(this));
        cc.eventManager.addListener(this._updateListener, 1);
        this._failCount = 0;
        this._am.update();
        this.versionA === this.versionB ? this._updating = false : this._updating = true;
    },

    /**
     * 
     * @param {*} gameName 
     */
    checkGameUpdate_Function: function(gameName) {
        this.node.getComponent("LobbyMain").com_UpdateMessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = gameName;
        var index = 0;
        switch (gameName) 
        {
            case "GrabBull":
                index = 0;
                break;
            case "Fish":
                index = 1;
                break;
            case "Bull":
                index = 2;
                break;
            case "Bde":
                index = 3;
                break;
            case "TwoEight":
                index = 4;
                break;
            case "LineGame":
                index = 5;
                break;
            case "Land":
                index = 6;
                break;
            case "Runing":
                index = 7;
                break;
        }
        this.node.getComponent("LobbyMain").com_UpdateMessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = index;
        this.gameName = gameName;
        this.node.getComponent("LobbyMain").com_UpdateMessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = this.gameName;

        if (this.gameArray[index])
        {
            if(this.gameName == "LineGame")
            {
                //this.node.getComponent("LobbyMain").loginGameRoom_Function(this.node.getComponent("LobbyMain").com_GameMenu.getChildByName("LineGame").getComponent("LobbyButtonClick"), "LineGame");
            }
            else
            {
                this.node.getComponent("LobbyMain").gameMenuButtonClick_Function("com_" + this.gameName);
                this.node.getComponent("LobbyMain").bg_Black.active = false;
                this.node.getComponent("LobbyMain").com_UpdateMessageBox.active = false;
                this.node.getComponent("LobbyMain").com_UpdateMessageBox.getChildByName("pb_Loading").getComponent("cc.ProgressBar").progress = 1;
            }
        }
        else 
        {
            var path = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + gameName;
            //cc.log(path);
            this._am = new jsb.AssetsManager(this.manifestUrl[index], path);
            cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS || this._am.retain();
            //cc.log(index);
            var self = this;
            this.serverVersion = 0;
            this.node.getComponent("LobbyMain").com_UpdateMessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "获取版本号...";
            //检测版本
            this._am.setVersionCompareHandle(function(versionA, versionB) {
                self.serverVersion = versionB;
                cc.log("JS Custom Version Compare: version A is " + versionA + ", version B is " + versionB);
                self.node.getComponent("LobbyMain").checkUpdateTimeOut = true;
                var versionAList = versionA.split(".");
                var versionBList = versionB.split(".");
                for (var i = 0; i < versionAList.length; i++) 
                {
                    var version_A = parseInt(versionAList[i]);
                    var version_B = parseInt(versionBList[i] || 0);
                    if (version_A !== version_B)
                    {
                        return - 1;
                    }
                }
                if(versionBList.length != versionAList.length)
                {
                    return -1;
                }
                else
                {
                    self._updating = false;
                    return 0;
                }
            });
            this.size = 0;
            this._am.setVerifyCallback(function(err, ret) {
                ret.compressed,
                ret.md5,
                ret.path;
                return self.size = ret.size,
                true
            });
            if(cc.sys.os === cc.sys.OS_ANDROID)
            {
                this._am.setMaxConcurrentTask(1);
            }
            this.checkUpdate();
        }
    },

    /**
     * 将游戏版本写入缓存数据
     * @param {*} version 
     * @param {*} callback 
     */
    writeGameVersion_Function: function(version, callback) {
        var data = null;
        data = {
            gameVersion: version
        },
        cc.sys.localStorage.setItem("gameVersion", JSON.stringify(data));
        callback && callback();
    },

    /**
     * 销毁
     */
    onDestroy: function() {
        if(this._updateListener)
        {
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
        }
        if(this._am && !cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS)
        {
            this._am.release();
        }
    }
});
