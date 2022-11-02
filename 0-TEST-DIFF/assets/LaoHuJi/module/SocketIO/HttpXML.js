cc.Class({
    extends: cc.Component,

    properties: {
        url: cc.String,
        YKID:cc.String,
    },
    onLoad() {
        this.url = "http://192.168.1.114:13000";;
    },
    OnRapidEnrollment: function () {
        this.getAccount_Function(this.url);
    },
    getAccount_Function: function (t) {
        cc.log("1234455");
        var n = "123456",
            a = "42dfcb34fb02d8cd",
            s = "getGuessA";
        var c = parseInt(Date.parse(new Date) / 1e3),
            r = s + n + c + a,
            l = t + "/weixinLogin?act=" + s + "&time=" + c + "&daili=" + n + "&sign=" + r,
            h = new XMLHttpRequest;
        h.onreadystatechange = function () {
            if (4 === h.readyState && 200 === h.status) {
                var e = h.response;
                if (null !== h.response) {
                    try {
                        e = JSON.parse(e)
                        this.YKID=e.data.id;
                        cc.log(this.YKID);
                    } catch (t) {
                        console.log("JSON wrong")
                    }

                }
            }
        },

        h.open("get", l),
            h.send()
    },
    OnRegister: function (t) {
        cc.log("123455");
        var n = "14725835",
            f = "14725835",
            a = "42dfcb34fb02d8cd",
            s = "register";
        var c = parseInt(Date.parse(new Date) / 1e3),
            r = s + n + c + a,
            l = t + "/weixinLogin?act=" + s + "&time=" + c + "&username=" + n + "&pwd=" + f + "&sign=" + r,
            h = new XMLHttpRequest;
        h.onreadystatechange = function () {
            if (4 === h.readyState && 200 === h.status) {
                var e = h.response;
                if (null !== h.response) {
                    try {
                        e = JSON.parse(e)
                        cc.log(e);
                    } catch (t) {
                        console.log("JSON wrong")
                    }

                }
            }
        },
            cc.log(l);
        h.open("get", l),
            h.send()
    },
    // update (dt) {},
});
