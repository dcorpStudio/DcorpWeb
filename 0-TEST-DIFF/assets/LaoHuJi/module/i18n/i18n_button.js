cc.Class({
    extends: cc.Component,

    properties: {
        Button :{
            default:null,
            tooltip: '要应用多语言的按钮组件',
            type:cc.Button
        } , 

        normalSprite_zh : {
            default:null,
            tooltip: '（中文）普通状态下按钮所显示的 Sprite',
            type:cc.SpriteFrame
        } ,
        normalSprite_en : {
            default:null,
            tooltip: '（英文）普通状态下按钮所显示的 Sprite',
            type:cc.SpriteFrame
        } ,
        normalSprite_my : {
            default:null,
            tooltip: '（马来文）普通状态下按钮所显示的 Sprite',
            type:cc.SpriteFrame
        } ,
        
        pressedSprite_zh : {
            default:null,
            tooltip: '（中文）按下状态时按钮所显示的 Sprite',
            type:cc.SpriteFrame
        } ,
        pressedSprite_en : {
            default:null,
            tooltip: '（英文）按下状态时按钮所显示的 Sprite',
            type:cc.SpriteFrame
        } ,
        pressedSprite_my : {
            default:null,
            tooltip: '（马来文）按下状态时按钮所显示的 Sprite',
            type:cc.SpriteFrame
        } ,
        
        hoverSprite_zh : {
            default:null,
            tooltip: '（中文）悬停状态下按钮所显示的 Sprite',
            type:cc.SpriteFrame
        } ,
        hoverSprite_en : {
            default:null,
            tooltip: '（英文）悬停状态下按钮所显示的 Sprite',
            type:cc.SpriteFrame
        } ,
        hoverSprite_my : {
            default:null,
            tooltip: '（马来文）悬停状态下按钮所显示的 Sprite',
            type:cc.SpriteFrame
        } ,

        disabledSprite_zh : {
            default:null,
            tooltip: '（中文）禁用状态下按钮所显示的 Sprite',
            type:cc.SpriteFrame
        } ,
        disabledSprite_en : {
            default:null,
            tooltip: '（英文）禁用状态下按钮所显示的 Sprite',
            type:cc.SpriteFrame
        } ,
        disabledSprite_my : {
            default:null,
            tooltip: '（马来文）禁用状态下按钮所显示的 Sprite',
            type:cc.SpriteFrame
        } ,
    },

    update: function () 
    {
        if(this.language != cc.sys.localStorage.getItem('language'))
        {
            this.language = cc.sys.localStorage.getItem('language');
            this.ChangeLanguage(this.language);
        }
    },

    ChangeLanguage: function (language) 
    {
        switch(language)
        {
            case 'zh':
            this.Button.normalSprite = this.normalSprite_zh;
            this.Button.pressedSprite = this.pressedSprite_zh;
            this.Button.hoverSprite = this.hoverSprite_zh;
            this.Button.disabledSprite = this.disabledSprite_zh;
            break;            
            case 'my':
            this.Button.normalSprite = this.normalSprite_my;
            this.Button.pressedSprite = this.pressedSprite_my;
            this.Button.hoverSprite = this.hoverSprite_my;
            this.Button.disabledSprite = this.disabledSprite_my;
            break;
            case 'en':
            default:
            this.Button.normalSprite = this.normalSprite_en;
            this.Button.pressedSprite = this.pressedSprite_en;
            this.Button.hoverSprite = this.hoverSprite_en;
            this.Button.disabledSprite = this.disabledSprite_en;
            break;
        }
    },
});