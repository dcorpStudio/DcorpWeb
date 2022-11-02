var i18n = require('i18n');

cc.Class({
    extends: cc.Component,
	
	SetLanguage_en: function () 
    {
        cc.sys.localStorage.setItem('language', 'en');
        i18n.init('en');
    },
    
    SetLanguage_zh: function () 
    {
        cc.sys.localStorage.setItem('language', 'zh');
        i18n.init('zh');
    },
	
	SetLanguage_cht: function () 
    {
        cc.sys.localStorage.setItem('language', 'cht');
        i18n.init('cht');
    },

    SetLanguage_my: function () 
    {
        cc.sys.localStorage.setItem('language', 'my');
        i18n.init('my');
    },
	
	SetLanguage_es: function () 
    {
        cc.sys.localStorage.setItem('language', 'es');
        i18n.init('es');
    },
	
	SetLanguage_fr: function () 
    {
        cc.sys.localStorage.setItem('language', 'fr');
        i18n.init('fr');
    },
	
	SetLanguage_th: function () 
    {
        cc.sys.localStorage.setItem('language', 'th');
        i18n.init('th');
    },
	
	SetLanguage_vn: function () 
    {
        cc.sys.localStorage.setItem('language', 'vn');
        i18n.init('vn');
    },
	SetLanguage_kp: function () 
    {
        cc.sys.localStorage.setItem('language', 'kp');
        i18n.init('kp');
    },
	SetLanguage_id: function () 
    {
        cc.sys.localStorage.setItem('language', 'id');
        i18n.init('id');
    },
	SetLanguage_in: function () 
    {
        cc.sys.localStorage.setItem('language', 'in');
        i18n.init('in');
    },
	SetLanguage_mm: function () 
    {
        cc.sys.localStorage.setItem('language', 'mm');
        i18n.init('mm');
    },
    SetLanguage_pt: function () 
    {
        cc.sys.localStorage.setItem('language', 'pt');
        i18n.init('pt');
    },
});