cc.Class({
    extends: cc.Component,

    properties: {


    },

    onLoad () {
        if (cc.sys.isNative){
            window.platform_wx = true;
            if (!window.wx_flag_e){
                window.wx_flag_e = true;
                cc.game.addPersistRootNode(this.node);
            }
            // this.AppID =  "wx79ec924e452db83d";
            // this.AppSecret = "509afff10023ccb38c46b5b0a127aa48";
            this.AppID =  "wx45d424390f66b4ef";
            this.AppSecret = "c5364c87cea56de25fe9e2514b236a14";
            this.androidPackageName = "youme/playcity/game/wxapi/WXEntryActivity";

            var TOKEN_CODE_URL     = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code";
            var USER_INFO_URL      = "https://api.weixin.qq.com/sns/userinfo?access_token=%s&openid=%s";
            var REFRESH_TOKEN_URL  = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=%s&grant_type=refresh_token&refresh_token=%s"


            this.messFire = onfire.on("onplatform",this.onPlatform.bind(this));//监听第三方相关事件


            var url = "https://fangka.youmegame.cn/shareUrl.php";
            //var self = this;
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var result = JSON.parse(xhr.responseText);
                    window.shareurl = result.shareUrl;
                }
            };
            xhr.open("GET", url, true);
            xhr.send();

        }else{
            //(console.log("yyyyyyyyyyyy"));

        }
    },

    start () {
        //onfire.fire("onplatform","login","login");
    },
    update (dt) {

    },
    onPlatform:function()//监听游戏中发起的第三方事件
    {
        window.platform_opera = arguments[0];
        
        console.log(window.platform_opera);
        console.log(arguments[0]+"--------"+arguments[1]+"--------"+arguments[2]+"--------"+arguments[3]);
        if (arguments[0] == "init")
        {

        }else if (arguments[0] == "login"){
            if (cc.sys.isNative&&cc.sys.os==cc.sys.OS_IOS) {
                let ret = jsb.reflection.callStaticMethod("AdMaster","sendAuthRequest:title:","1","1");
            }else{
                var s = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","sendAuthRequest", "()I");
            }
            //console.log(s);
        }else if (arguments[0] == "share")
        {
            if (cc.sys.isNative&&cc.sys.os==cc.sys.OS_IOS) {
                let ret = jsb.reflection.callStaticMethod("AdMaster","share:title:","","");
            }else{
                var s = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","share", "()I");
            }
        }else if (arguments[0] == "openurl"){

        }else if (arguments[0] == "shareurl")
        {
            if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
                let ret = jsb.reflection.callStaticMethod("AdMaster", "shareurl:cont:url:", 
                arguments[1], arguments[2],arguments[3]);
            } else {
                var s = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "shareurl", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)I", 
                    arguments[1], arguments[2],arguments[3]);
            }
        }
    },



    onDestroy:function()
    {
        if (cc.sys.isNative){
            onfire.un(this.messFire);
        }
    },    



    getAccessToken : function(code){        //获取accessToken
        var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid="
        +this.AppID+"&secret="+this.AppSecret+"&code=" + code + "&grant_type=authorization_code";
        console.log("url=>>>> "+url);
        let self = this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                console.log("response===>>>",response);
                var msg = JSON.parse(response);
                var access_token = msg.access_token;
                var refresh_token = msg.refresh_token;
                var openid = msg.openid;
                window.platform_openid = openid;
                //如果超时进行重新刷新accessToken
                if(msg.expires_in >= 7200){
                    //刷新accesstoken
                    // self.freshAccessToken(refresh_token).then(function(data){
                    //    console.log("刷新accessToken 是",data);
                    //    access_token = data;
                    self.getUserInfo(access_token,openid);
                    //});
                    //console.log("这个accessToken是刷新出来的token",access_token);
                }else{
                    self.getUserInfo(access_token,openid);
                }
                
            }
        };
        xhr.open("GET",url,true);
        xhr.send();
    },
    getUserInfo : function(access_token,openid){       //获取用户信息
        console.log("accessToken is " + access_token);
        console.log("openid is " + openid);
        window.platform_acc = openid+"";
        window.platform_pwd = "wxpwd1";
        var url = "https://api.weixin.qq.com/sns/userinfo?access_token="+access_token + "&openid="+openid;
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                console.log("response===>>>",response);
                var msg = JSON.parse(response);
                console.log("msg is " , msg);
                console.log("nickName is " + msg.nickname);
                window.platform_name = msg.nickname;
                window.platform_head = msg.headimgurl;
                
                window.platform_head = window.platform_head.replace("http:","https:");

                console.log("city is " + msg.city);
                console.log("country " + msg.country);
                console.log("sex is  " + msg.sex);

                //cc.find("Canvas/com_Register").active = true;
                onfire.fire("onplatform_login",window.platform_acc,window.platform_pwd);
            }
        };
        xhr.open("GET",url,true);
        xhr.send();
    
    },

});

window.platformResponse = function()
{
    console.log("-----");
    console.log(arguments[0]);
    if (arguments[0] != undefined){
        cc.find("wx").getComponent("wx").getAccessToken(arguments[0]);
    }
}
