/**
 * 大厅用户注册管理类
 */
window.getUrlParas = function()
{
   var theRequest = new Object();
   if (cc.sys.isNative) return theRequest;
   var neturl=window.location.href;  
   var neturl = location.search;
   if (neturl.indexOf("?") != -1) {
       var str = neturl.substr(1);
       var strs = str.split("&");
       for(var i = 0; i < strs.length; i ++) {
           theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
       }
   }
   return theRequest;
}

cc.Class({
    extends: cc.Component,

    properties: {
    },
    onLoad: function () {
        this.md5 = require("md5").getInstant;
        this.actType = '';
        //口令
        this.token = '42dfcb34fb02d8cd';
        this.canLoign = false;
        this.account = null;
        this.password = null;

        this.messFire = onfire.on("onplatform_login", this.onPlatformLogin.bind(this)); //监听第三方相关事件
    },

    onPlatformLogin(acc, pwd) {
        this.mlapiRegister_Function_wx(acc, pwd);
    },
    onDestroy: function () {
        onfire.un(this.messFire);
    },

    /**
     * 
     * @param {*} url 
     */
    checkAccount_Function: function (url) {
        var userData = null;

        //获取缓存中的用户数据
        if(cc.sys.isNative)
        {
            userData = JSON.parse(cc.sys.localStorage.getItem("userData"));
        }
        else
        {
            userData = JSON.parse(localStorage.getItem("userData"));
        }

        if(userData == null)
        {

            this.registerAccount_Function(url, true);
            //对苹果手机进行特殊处理
            if(cc.sys.os === cc.sys.OS_IOS)
            {
                jsb.reflection.callStaticMethod("RootViewController", "UserId:", this.getComponent("LobbyMain").playerInfo.playerId);
            }
        }
        else
        {
            //获取到缓存数据后，进行赋值
            this.account = userData.account;
            this.password = userData.password;
            this.canLoign = true;
            //通过缓存数据进行用户登录
            if(this.getComponent("LobbyMain").netWork.socket !== null)
            {
                this.getComponent("LobbyMain").netWork.socket.emit("login", {
                    userName: this.account,
                    password: this.password
                });
            }
        }
    },

    /**
     * 将用户数据写入缓存
     * @param {*} account 
     * @param {*} password 
     */
    changeUserData_Function: function (account, password) {
        var data = {
            account: account,
            password: password
        };
        this.writeUserDate_Function(data);
    },

    /**
     * 将用户数据写入缓存
     * @param {*} data 
     * @param {*} callback 
     */
    writeUserDate_Function: function (data, callback) {
        if (cc.sys.isNative) 
        {
            cc.sys.localStorage.setItem("userData", JSON.stringify(data));
        }
        else 
        {
            localStorage.setItem("userData", JSON.stringify(data));
        }
        callback && callback();
    },

    /**
     * 注册游客，并进行登录
     * @param {*} url 
     * @param {*} isLogin 
     */
    registerAccount_Function: function (url, isLogin) {
        var self = this;
        //游客登录
        this.getAccount_Function(url, function (account, password) {
            var data = {
                account: account,
                password: password
            };
            //将游客账号写入缓存中,并进行socket登录
            self.writeUserDate_Function(data, function(){
                self.account = data.account;
                self.password = data.password;
                self.canLoign = true;
                //是否socket登录
                if (isLogin) 
                {
                    self.getComponent("LobbyMain").netWork.socket.emit("login", {
                        userName: self.account,
                        password: self.password
                    });
                }
                else {
                    self.getComponent("LobbyMain").netWork.loginAccount_Function(self.getComponent("LobbyMain").playerInfo.loginIp, self.account, self.password);
                }
            })
        })
    },

    /**
     * 游客登录
     * @param {*} url 
     * @param {*} callback 
     */
    getAccount_Function: function (url, callback) {
        this.actType = "getGuessA";
        var daili = this.node.getComponent("LobbyMain").playerInfo.guest;
        if (cc.sys.isNative) 
        {
            if (this.getComponent("LobbyMain").playerInfo.iosChannel !== '') 
            {
                daili = this.getComponent("LobbyMain").playerInfo.iosChannel;
            }
        }
        else 
        {
            if(this.getUrlCode_Function("channel") !== null)
            {
                daili = this.getUrlCode_Function("channel");
            }
        }

        var time = parseInt(Date.parse(new Date) / 1000);
        var sign = this.md5.hex_md5(this.actType + daili + time + this.token);
        var apiUrl = url + "/weixinLogin?act=" + this.actType + "&time=" + time + "&daili=" + daili + "&sign=" + sign;
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) 
            {
                var response = xhr.response;
                if (xhr.response !== null) 
                {
                    try 
                    {
                        response = JSON.parse(response);
                    }
                    catch (error) 
                    {
                        cc.log("JSON wrong");
                    }
                    callback && callback(response.data.account, response.data.password);
                }
            }
        };
        xhr.open("get", apiUrl);
        xhr.send();
    },

    /**
     * HTTP注册账号
     * @param {*} account 
     * @param {*} password 
     */
    mlapiRegister_Function: function (account, password) {
        this.actType = "register";
        var guest = this.node.getComponent("LobbyMain").playerInfo.guest;
        var time = parseInt(Date.parse(new Date) / 1000);
        var sign = this.md5.hex_md5(this.actType + account + account + password + time + this.token);
        var url = this.node.getComponent("LobbyMain").playerInfo.loginIp;
        var apiUrl = url + "/ml_api?act=" + this.actType + "&accountname=" + account + "&nickname=" + account + "&pwd=" + password + "&time=" + time + "&agc=" + guest + "&sign=" + sign;
        cc.log('账号注册:' + apiUrl);
        this.mlapiRegisterAccount_Function(apiUrl, function (errormsg) {
            cc.log('注册返回信息=================================' + errormsg);
            switch (errormsg) {
                case 0://注册成功
                    this.node.getComponent("LobbyMain").netWork.accountChange = true;
                    this.node.getComponent("LobbyMain").netWork.loginAccount_Function(this.node.getComponent("LobbyMain").playerInfo.loginIp, account, password);
                    break;
                case 1:
                    break;
                case 2://注册失败，账号已存在
                    this.node.getComponent("LobbyMain").com_Register.getChildByName("普通注册").getChildByName("eb_Account").getComponent("cc.EditBox").string = "账号已存在";
                    break;
                case 3://注册失败，账号已存在
                    this.node.getComponent("LobbyMain").com_Register.getChildByName("普通注册").getChildByName("eb_Account").getComponent("cc.EditBox").string = "账号已存在";
                    break;
            }
        }.bind(this));
    },


    
    mlapiRegister_Function_wx: function (account, password) {
        this.actType = "register";
        var guest = this.node.getComponent("LobbyMain").playerInfo.guest;
        var time = parseInt(Date.parse(new Date) / 1000);
        var sign = this.md5.hex_md5(this.actType + account + account + password + time + this.token);
        var url = this.node.getComponent("LobbyMain").playerInfo.loginIp;
        
        var apiUrl = "";

        var str_mix = "weixinLogin" + account + password + time + this.token;
        sign = this.md5.hex_md5(str_mix);
        
        apiUrl = url + "/weixinLogin?act=" + "weixinLogin" + "&accountname=" + account + "&nickname=" + window.platform_name + "&pwd=" + password + "&time=" + time + "&agc=" + guest + "&sign=" + sign;
        if (window.platform_head != undefined)
        {
            apiUrl+="&headimgurl=" + encodeURIComponent(window.platform_head);
        }

        apiUrl = "https://fangka.youmegame.cn/nxp.php?url=" + encodeURIComponent(apiUrl);
        window.global_post = true;

        var theRequest = window.getUrlParas();
        if (theRequest.aid)
        {
            apiUrl+="&aid=";
            apiUrl+=theRequest.aid;
        }
        
        cc.log('账号注册:' + apiUrl);
        this.mlapiRegisterAccount_Function(apiUrl, function (errormsg) {
            cc.log('注册返回信息=================================' + errormsg);
            errormsg = parseInt(errormsg);
            switch (errormsg) {
                case 0://注册成功
                    this.node.getComponent("LobbyMain").netWork.accountChange = true;
                    
                    this.node.getComponent("LobbyMain").netWork.loginAccount_Function(this.node.getComponent("LobbyMain").playerInfo.loginIp, account, password);
                    break;
                case 1:
                    this.node.getComponent("LobbyMain").com_Register.getChildByName("eb_Account").getComponent("cc.EditBox").string = "信息错误或用户名重复";
                    break;
                case 2://注册失败，账号已存在
                    this.node.getComponent("LobbyMain").com_Register.getChildByName("eb_Account").getComponent("cc.EditBox").string = "账号已存在";
                    if (cc.sys.isNative){
                        this.node.getComponent("LobbyMain").netWork.loginAccount_Function(this.node.getComponent("LobbyMain").playerInfo.loginIp, account, password);
                    }
                    break;
                case 3://注册失败，账号已存在
                    this.node.getComponent("LobbyMain").com_Register.getChildByName("eb_Account").getComponent("cc.EditBox").string = "账号已存在";
                    if (cc.sys.isNative){
                        this.node.getComponent("LobbyMain").netWork.loginAccount_Function(this.node.getComponent("LobbyMain").playerInfo.loginIp, account, password);
                    }
                    break;
            }
        }.bind(this));
    },

    /**
     * 发送HTTP注册请求
     * @param {*} url 
     * @param {*} callback 
     */
    mlapiRegisterAccount_Function: function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = xhr.response;
                if (null !== xhr.response !== null) 
                {
                    try 
                    {
                        response = JSON.parse(response);
                    }
                    catch (errot) 
                    {
                        cc.log("JSON wrong");
                    }
                    callback && callback(response.status);
                }
            }
        };
        if (window.global_post)
        {
            window.global_post = false;
            xhr.open("post", url);
        }else{
                xhr.open("get", url);
        }
        xhr.send();
    },

    /**
     * 获取url参数
     * @param {*} name 
     */
    getUrlCode_Function: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
});
