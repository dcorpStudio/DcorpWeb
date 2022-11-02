/**
 * 热更新点击事件处理
 */
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function () {
        this.canvasNode = cc.find("Canvas");
    },

    messageBoxConfirmButtonClick_Function: function () {
        this.canvasNode.getComponent("HotUpdateMain").com_MessageBox.active = false;
        this.canvasNode.getComponent("HotUpdateMain").getIp_Function(this.canvasNode.getComponent("HotUpdateMain").configData);
    },

    openURL: function () {
        this.node.parent.active = false;
        cc.sys.openURL("https://itunes.apple.com/cn/app/%E9%BE%99%E6%B5%A9%E7%9F%BF%E5%B7%A5/id1256343442?mt=8");
    },

    versionUpdate() {
        if (cc.sys.isNative) {
            //onfire.fire("onplatform","openurl",window.versionUrl);
            var s = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openurl", "(Ljava/lang/String;)I", window.versionUrl);
            if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
                let ret = jsb.reflection.callStaticMethod("AdMaster", "openurl:title:", window.versionUrl, "");
            } else {
                var s = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openurl", "(Ljava/lang/String;)I", window.versionUrl);
            }
        } else {
            cc.sys.openURL(window.versionUrl);
        }
    },
});
