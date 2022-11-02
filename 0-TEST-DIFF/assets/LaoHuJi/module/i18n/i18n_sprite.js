cc.Class({
    extends: cc.Component,

    properties: {
        Sprite: cc.Sprite,
        SpriteFrame_zh: {
            default: null,
            type: cc.SpriteFrame
        },
		SpriteFrame_cht: {
            default: null,
            type: cc.SpriteFrame
        },
        SpriteFrame_my: {
            default: null,
            type: cc.SpriteFrame
        },
        SpriteFrame_en: {
            default: null,
            type: cc.SpriteFrame
        },
        SpriteFrame_th: {
            default: null,
            type: cc.SpriteFrame
        },
        SpriteFrame_fr: {
            default: null,
            type: cc.SpriteFrame
        },
        SpriteFrame_es: {
            default: null,
            type: cc.SpriteFrame
        },
        SpriteFrame_vn: {
            default: null,
            type: cc.SpriteFrame
        },
        SpriteFrame_kp: {
            default: null,
            type: cc.SpriteFrame
        },
        SpriteFrame_in: {
            default: null,
            type: cc.SpriteFrame
        },
        SpriteFrame_id: {
            default: null,
            type: cc.SpriteFrame
        },
		SpriteFrame_mm: {
            default: null,
            type: cc.SpriteFrame
        },
        SpriteFrame_pt: {
            default: null,
            type: cc.SpriteFrame
        },

    },

    update: function () {
        if (this.language != cc.sys.localStorage.getItem('language')) {
            this.language = cc.sys.localStorage.getItem('language');
            this.ChangeLanguage(this.language);
        }
    },

    ChangeLanguage: function (language) {
        switch (language) {
            case 'zh':
                this.Sprite.spriteFrame = this.SpriteFrame_zh;
                break;
			case 'cht':
                this.Sprite.spriteFrame = this.SpriteFrame_cht;
                break;
            case 'fr':
                this.Sprite.spriteFrame = this.SpriteFrame_fr;
                break;
            case 'th':
                this.Sprite.spriteFrame = this.SpriteFrame_th;
                break;
            case 'es':
                this.Sprite.spriteFrame = this.SpriteFrame_es;
                break;
            case 'vn':
                this.Sprite.spriteFrame = this.SpriteFrame_vn;
                break;
            case 'my':
                this.Sprite.spriteFrame = this.SpriteFrame_my;
                break;
            case 'kp':
                this.Sprite.spriteFrame = this.SpriteFrame_kp;
                break;
            case 'in':
                this.Sprite.spriteFrame = this.SpriteFrame_in;
                break;
            case 'id':
                this.Sprite.spriteFrame = this.SpriteFrame_id;
                break;
			case 'mm':
                this.Sprite.spriteFrame = this.SpriteFrame_mm;
                break;
            case 'pt':
                this.Sprite.spriteFrame = this.SpriteFrame_pt;
                break;
            case 'en':
            default:
                this.Sprite.spriteFrame = this.SpriteFrame_en;
                break;
        }
    },
});