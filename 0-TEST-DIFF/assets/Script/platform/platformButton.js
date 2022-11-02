window.onfire = require("onfire");

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {

    },

    start () {

    },

    // update (dt) {},
    onClick(event,customEventData)
    {
        if (customEventData == "login")
        {
            onfire.fire("onplatform","login");
        }else if (customEventData == "share")
        {
            onfire.fire("onplatform","share")
        }
        else if (customEventData == "share1")
        {
            onfire.fire("onplatform","shareurl","潮乐会","传统游戏，玩法简单，点击下载APP",window.platform_openid);
        }
    },
});

window.background_return = function()
{

}

window.onAppHide = function(){

}

window.onAppShow = function(){

}

window.native_close = function(){

}