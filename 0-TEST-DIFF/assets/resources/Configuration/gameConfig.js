/**子游戏配置文件
 * iconName 图标名称
 * bundleName 子游戏包名
 * gameType 游戏类型 0:棋牌  1:电玩  2:拉霸
 * lineName 老虎机专用---线数图标名
 * isShow 游戏是否展示0:隐藏 1:显示
 * noUse 无用字段---用作一键替换添加新字段
 */
let gameConfig = {
    斗地主: { iconName: "doudizhu", bundleName: "", gameType: 0, lineName: "", isShow: 1, noUse: "" },
    炸金花: { iconName: "zhajinhua", bundleName: "", gameType: 0, lineName: "", isShow: 1, noUse: "" },
    抢庄百家乐: { iconName: "baijialeQZ", bundleName: "", gameType: 0, lineName: "", isShow:1, noUse: "" },
    水果机: { iconName: "shuiguoji", bundleName: "", gameType: 1, lineName: "", isShow: 1, noUse: "" },
    水果小玛丽: { iconName: "shuiguoxiaomali", bundleName: "", gameType: 2, lineName: "9", isShow: 1, noUse: "" },
    抢庄牛牛: { iconName: "qiangzhuangniuniu", bundleName: "", gameType: 0, lineName: "", isShow:1, noUse: "" },
    奔驰宝马: { iconName: "benchibaoma", bundleName: "", gameType: 1, lineName: "", isShow: 1, noUse: "" },
    二十一点: { iconName: "21dian", bundleName: "", gameType: 0, lineName: "", isShow: 1, noUse: "" },
    铃铛游戏: { iconName: "lingdangyouxi", bundleName: "", gameType: 1, lineName: "", isShow: 1, noUse: "" },
    冰球突破: { iconName: "bingqiutupo", bundleName: "", gameType: 2, lineName: "243", isShow: 1, noUse: "" },
    财神夺宝: { iconName: "caishenduobao", bundleName: "", gameType: 2, lineName: "9", isShow: 1, noUse: "" },
    水果钻石: { iconName: "shuiguozuanshi", bundleName: "", gameType: 2, lineName: "15", isShow: 1, noUse: "" },
    埃及珍宝: { iconName: "aijizhenbao", bundleName: "", gameType: 2, lineName: "25", isShow: 1, noUse: "" },
    吕布戏貂蝉: { iconName: "lvbuxidiaochan", bundleName: "", gameType: 2, lineName: "25", isShow: 1, noUse: "" },
    上海零零发: { iconName: "shanghai00fa", bundleName: "", gameType: 2, lineName: "25", isShow: 1, noUse: "" },
    太极熊猫: { iconName: "taijixiongmao", bundleName: "", gameType: 2, lineName: "243", isShow: 1, noUse: "" },
    一路发发发: { iconName: "yilufafafa", bundleName: "", gameType: 2, lineName: "243", isShow: 1, noUse: "" },
    阿兹特克: { iconName: "aziteke", bundleName: "", gameType: 2, lineName: "5", isShow: 1, noUse: "" },
    阿拉丁: { iconName: "alading", bundleName: "", gameType: 2, lineName: "50", isShow: 1, noUse: "" },
};
module.exports = gameConfig;