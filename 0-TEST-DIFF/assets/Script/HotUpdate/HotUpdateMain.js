cc.Class({
    extends: cc.Component,

    onLoad: function () {
        //cc.sys.isNative && cc.Device.setKeepScreenOn(true);
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        //关闭脏矩形
    },

    properties: {
        manifestUrl: cc.Asset,//热更新比对文件
        hallName: "",//大厅场景名
        _updating: false,
        _canRetry: false,
    },
    /**
     * 检测版本
     * @param {*} event 
     */
    checkCb: function (event) {
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.panel.getComponent(cc.Label).string = "没找到本地更新文件";
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.panel.getComponent(cc.Label).string = "更新文件下载失败";
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.panel.getComponent(cc.Label).string = "开始更新";
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                this.panel.getComponent(cc.Label).string = "游戏新版本查找失败";
                break;
            default:
                return;
        }
        cc.eventManager.removeListener(this._checkListener);
        this._checkListener = null;
        this._updating = false;
    },
    /**
     * 更新版本
     * @param {*} event 
     */
    updateCb: function (event) {
        //cc.log("***************************yyy*****************************");
        //是否更新完成
        var isFinished = false;
        //是否需要更新
        var isUpdate = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.panel.getComponent("cc.Label").string = "没找到本地更新文件";
                isUpdate = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                this.pb_Loading.getComponent("cc.ProgressBar").progress = event.getDownloadedBytes() / event.getTotalBytes();
                //获得消息
                var message = event.getMessage();
                if (message) {
                    this.panel.getComponent("cc.Label").string = "更新中..." + message;
                }
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.panel.getComponent("cc.Label").string = "更新文件下载失败";
                isUpdate = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.panel.getComponent("cc.Label").string = "已是最新版本";
                this.playerInfo.localVersion[0] = this.serverVersion;
                this.writeGameVersion_Function(this.playerInfo.localVersion, function () {
                    // cc.log("***************************vvv*****************************");
                    cc.game.restart();
                });
                isUpdate = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                this.panel.getComponent("cc.Label").string = "更新完成" + event.getMessage();
                isFinished = true;
                //cc.log("***************************uuu*****************************");
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                this.panel.getComponent("cc.Label").string = "更新失败" + event.getMessage();
                this._updating = false;
                this._canRetry = true;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                this.panel.getComponent("cc.Label").string = "资源更新错误: " + event.getAssetId() + ", " + event.getMessage();
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                this.panel.getComponent("cc.Label").string = event.getMessage();
        }

        //需要更新时处理事件
        if (isUpdate) {
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
            this._updating = false;
        }
        //更新完成后处理事件
        if (isFinished) {
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
            //获得更新路径
            var paths = jsb.fileUtils.getSearchPaths();
            var local_paths = this._am.getLocalManifest().getSearchPaths();
            Array.prototype.unshift(paths, local_paths);
            //搜索热更新文件
            cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(paths));
            jsb.fileUtils.setSearchPaths(paths);
            cc.audioEngine.stopAll();
            //设置版本
            this.playerInfo.localVersion[0] = this.serverVersion;
            //重启
            this.writeGameVersion_Function(this.playerInfo.localVersion, function () {
                cc.game.restart();
            });
        }

    },
    /*
     * 尝试重新下载资源 
     */
    retry: function () {
        if (!this._updating && this._canRetry) {
            this._canRetry = false, this.panel.getComponent("cc.Label").string = "尝试重新下载资源";
            this._am.downloadFailedAssets();
        }
    },

    /*
     *检查更新
     */
    checkUpdate: function () {

        if (this._updating) {
            this.panel.getComponent("cc.Label").string = "检测更新中 ...";
        } else {
            if (this._am.getLocalManifest().isLoaded()) {
                this._checkListener = new jsb.EventListenerAssetsManager(this._am, this.checkCb.bind(this));
                cc.eventManager.addListener(this._checkListener, 1);
                this._am.checkUpdate();
                this._updating = true;
                this.panel.getComponent("cc.Label").string = "检测完成";
            } else {
                this.panel.getComponent("cc.Label").string = "加载本地更新文件失败 ...";
            }
        }
    },

    /*
     *热更新方法
     */
    hotUpdate: function () {
        this.panel.getComponent(cc.Label).string = "更新中";
        this._updateListener = new jsb.EventListenerAssetsManager(this._am, this.updateCb.bind(this));
        cc.eventManager.addListener(this._updateListener, 1);
        this._failCount = 0;
        this._am.update();
        this._updating = true;
    },

    onLoad: function () {
        window.hallName = this.hallName;
        cc.loader.loadRes("update_ui/" + this.hallName, function (err, prefab) {
            cc.loader.setAutoReleaseRecursively(prefab, true);
            let newNode = cc.instantiate(prefab);
            cc.find("Canvas").addChild(newNode);
            callback();
        }.bind(this));

        let callback = () => {
            this.init();
            cc.debug.setDisplayStats(false);
            //关闭脏矩形
            if (cc.renderType === cc.game.RENDER_TYPE_CANVAS) {
                cc.renderer.enableDirtyRegion(false);
            }

            var self = this;
            //设置玩家信息
            this.playerInfo = require("PlayerInfo").getInstant;

            cc.view.setResizeCallback(function () {
                self.uiResize_Function();
            });
            this.uiInit_Function();
            //加载配置文件
            cc.resources.load('Configuration/Configuration', function (error, ret) {
                // cc.loader.load("res/raw-assets/Texture/Configuration/Configuration.json", function(error, ret){
                ret = ret.json;
                if (typeof ret.iosPay === "undefined") {
                    self.playerInfo.iosPay = 0;
                } else {
                    self.playerInfo.iosPay = ret.iosPay;
                }

                var strver = ret.versionCode;
                var index = strver.indexOf('_');
                strver = strver.substring(index + 1);

                window.game_ver = 'v' + strver;

                self.configData = ret;
                self.playerInfo.versionCode = ret.versionCode;
                self.playerInfo.loginIp = ret.loginIp;
                console.log(ret.loginIp);
                Lhjconfig.Server_IP = ret.loginIp.substring(0, ret.loginIp.lastIndexOf(':')); //给老虎机的服务器地址赋值
                self.playerInfo.guest = ret.guest;
                self.playerInfo.exchangeRate = ret.exchangeRate;
                self.getIp_Function(ret);
            });
        };
    },
    //节点绑定初始化
    init() {
        this.panel = cc.find("Canvas/" + this.hallName + "/update_tip");//更新文字提示
        this.com_MessageBox = cc.find("Canvas/" + this.hallName + "/com_MessageBox_hotupdate");//热更新
        this.com_MessageBox_iOS = cc.find("Canvas/" + this.hallName + "/com_MessageBox_iOS");//iOS下载
        this.com_MessageBox_native = cc.find("Canvas/" + this.hallName + "/com_MessageBox_native");//原生下载
        this.sp_BG = cc.find("Canvas/" + this.hallName + "/bg").getComponent(cc.Sprite);//背景
        this.pb_Loading = cc.find("Canvas/" + this.hallName + "/pb_Loading");//进度条
        this.progress_lab = cc.find("Canvas/" + this.hallName + "/pb_Loading/pb_Loading_txt").getComponent(cc.Label);//进度百分比文字
    },
    /*
     *热更新UI初始化
     */
    uiInit_Function: function () {
        var size = cc.view.getVisibleSize();
        var scale = size.width / 1334;
        if (size.width > 1334) {
            this.sp_BG.node.scaleX = scale;
            this.sp_BG.node.scaleY = scale;
        } else if (size.width < 1334) {
            this.sp_BG.node.scaleX = 1 / scale;
            this.sp_BG.node.scaleY = 1 / scale;
        }
        this.pb_Loading.getComponent("cc.ProgressBar").progress = 0;
    },

    /*
     *热更新进度条计算
     */
    uiResize_Function: function () {
        var size = cc.view.getVisibleSize();
        var scale = size.width / 1334;
        if (size.width > 1334) {
            this.sp_BG.node.scaleX = scale;
            this.sp_BG.node.scaleY = scale;
        } else if (size.width < 1334) {
            this.sp_BG.node.scaleX = 1 / scale;
            this.sp_BG.node.scaleY = 1 / scale;
        }
    },

    /*
     * 获取IP地址
     */
    getIp_Function: function (ret) {
        //if (!cc.sys.isNative) 
        return void this.loadScene_Function();
        var self = this;
        var path = ret.loginIp + "/logitech";
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = xhr.response;
                if (xhr.response !== null) {
                    try {
                        response = JSON.parse(response);
                        self.checkGameVersion_Function(ret, response);
                    } catch (error) {
                        console.log("JSON wrong");
                    }
                }
            }
        }
        xhr.onerror = function () {
            self.com_MessageBox.active = true;
            self.com_MessageBox.getChildByName("lb_Tips").getComponent("cc.Label").string = "连接服务器出错，请检测网络";
        };
        xhr.open("get", path);
        xhr.send();
    },

    /*
     *校验游戏版本
     */
    checkGameVersion_Function: function (data, info) {
        //获取缓存中的游戏版本信息
        var gameVersion = JSON.parse(cc.sys.localStorage.getItem("gameVersion"));

        if (cc.sys.os === cc.sys.OS_IOS) {
            if (gameVersion === null) {
                if (parseInt(info.lobby.toString().charAt(0)) > parseInt(data.versionArray.toString().charAt(0))) {
                    this.com_MessageBox_Update.active = true;
                } else if (parseInt(info.lobby.toString().charAt(0)) > parseInt(gameVersion.gameVersion.toString().charAt(0))) {
                    this.com_MessageBox_Update.active = true;
                }
            }
        }
        if (typeof data.showGame == "undefined") {
            data.showGame = 0;
        }
        if (typeof data.iosUpdate == "undefined") {
            data.iosUpdate = 0;
        }

        if (cc.sys.os === cc.sys.OS_IOS) {
            for (var i = 0; i < info.showgame.length; ++i) {
                if (data.showGame === info.showgame[i]) {
                    cc.director.loadScene("FarmGuanQia");
                }
            }
            for (var i = 0; i < info.iosUpdate.length; ++i) {
                if (data.iosUpdate === info.iosUpdate[i]) {
                    cc.director.loadScene("FarmGuanQia");
                }
            }
        }

        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);

        for (var i = 0; i < 4; ++i) {
            this.node.children[i].active = true;
        }

        if (!data.isUpdate) {
            this.loadScene_Function();
        }

        //设置子游戏版本信息
        this.playerInfo.serverVersion[0] = info.lobby;
        this.playerInfo.serverVersion[1] = info.cowgame_qiang;
        this.playerInfo.serverVersion[2] = info.fish;
        this.playerInfo.serverVersion[3] = info.cowgame_jindian;
        this.playerInfo.serverVersion[4] = info.game82;
        this.playerInfo.serverVersion[5] = info.game28;
        this.playerInfo.serverVersion[6] = info.linegame;
        this.playerInfo.serverVersion[7] = info.land;
        this.playerInfo.serverVersion[8] = info.run;

        if (gameVersion !== null) {
            this.playerInfo.localVersion = gameVersion.gameVersion;
        } else {
            this.playerInfo.localVersion = data.versionArray;
        }
        //版本长度比较
        if (this.playerInfo.localVersion.length === this.playerInfo.serverVersion.length) {
            for (var i = 0; i < this.playerInfo.serverVersion.length; ++i) {
                if (this.playerInfo.serverVersion[i] !== this.playerInfo.localVersion[i]) {
                    this.playerInfo.needToUpdate[i] = 1;
                }
            }
            this.changeScene_Funtion();
        } else {
            this.playerInfo.localVersion[this.playerInfo.localVersion.length] = "1.0";
            this.writeGameVersion_Function(this.playerInfo.localVersion, function () {
                this.playerInfo.needToUpdate[0] = 1;
                this.changeScene_Funtion();
            }.bind(this));
        }
        cc.log(this.playerInfo.localVersion);
        cc.log(this.playerInfo.serverVersion);
        cc.log(this.playerInfo.needToUpdate);
    },

    /*
     *修改跟新进度条
     */
    changeScene_Funtion: function () {
        if (this.playerInfo.needToUpdate[0]) {
            //cc.log("******************************ccc***************************************");
            this.gameUpdate_Function();
        } else {
            // cc.log("******************************ddd***************************************");
            this.node.getChildByName("pb_Loading").getComponent("cc.ProgressBar").progress = 1;
            this.loadScene_Function();
        }
        // 这是上面if语句的简写
        // return this.playerInfo.needToUpdate[0] ? (cc.log("******************************ccc***************************************"), void this.gameUpdate_Function()) : (cc.log("******************************ddd***************************************"), this.node.getChildByName("pb_Loading").getComponent("cc.ProgressBar").progress = 1, void this.loadScene_Function())
    },

    /*
     *跳转场景方法
     */
    loadScene_Function: function () {
        let path = this.playerInfo.loginIp + "/checkVersion?key=" + this.playerInfo.versionCode;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (!!xhr.response) {
                    try {
                        const response = JSON.parse(xhr.response);
                        if (response.code == 1) {
                            this.p = 0;
                            cc.director.preloadScene(window.hallName, (cc, tc, item) => {
                                if (this.p < cc / tc) {
                                    this.p = cc / tc;
                                    this.pb_Loading.getComponent("cc.ProgressBar").progress = cc / tc;
                                    this.progress_lab.string = ((cc / tc) * 100).toFixed(2) + "%";
                                }
                            }, () => {
                                cc.director.loadScene(window.hallName);
                            })


                        } else {
                            this.com_MessageBox_native.active = true;
                            window.versionUrl = response.url;
                        }
                    } catch (e) {
                        console.error('json解析错误');
                    }
                }
            }
        }
        xhr.open("post", path);
        xhr.send();
    },
    /**
     * 
     * @param {*} version 
     * @param {*} callback 
     */
    writeGameVersion_Function: function (version, callback) {
        cc.sys.localStorage.setItem("gameVersion", JSON.stringify({
            gameVersion: version
        }));
        callback && callback();
    },

    /*
     * 热更新方法
     */
    gameUpdate_Function: function () {
        var lobby_path = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "lobby";
        this._am = new jsb.AssetsManager(this.manifestUrl, lobby_path);
        if (!cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
            this._am.retain();
        }
        var self = this;
        //版本比较
        this._am.setVersionCompareHandle(function (loacl_version, server_version) {
            self.serverVersion = server_version;
            var loacl_version_list = loacl_version.split(".");
            var server_version_list = server_version.split(".")
            for (var i = 0; i < loacl_version_list.length; i++) {
                var loaclVersion = parseInt(loacl_version_list[i]);
                var serverVersion = parseInt(server_version_list[i] || 0);
                if (loaclVersion !== serverVersion) return -1;
            }
            if (server_version_list.length != loacl_version_list.length) {
                return -1;
            } else {
                return 0;
            }

        });
        var panel = this.panel;
        this._am.setVerifyCallback(function (error, ret) {
            var compressed = ret.compressed;
            var md5 = ret.md5;
            var path = ret.path;
            ret.size;
            if (compressed) {
                panel.getComponent("cc.Label").string = "Verification passed : " + path;
            } else {
                panel.getComponent("cc.Label").string = "Verification passed : " + path + " (" + md5 + ")";
            }
        });
        this.panel.getComponent("cc.Label").string = "更新已准备好，正在检测地址";
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            this._am.setMaxConcurrentTask(1);
            this.panel.getComponent("cc.Label").string = "Max concurrent tasks count have been limited to 1";
        }
        this.hotUpdate();
    },
    /**
     * 销毁
     */
    onDestroy: function () {
        if (this._updateListener) {
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
        }
        if (this._am && !cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
            this._am.release();
        }
    },
});