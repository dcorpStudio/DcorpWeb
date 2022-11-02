const i18n = require('i18n');
cc.Class({
    extends: cc.Component,

    properties: {
        Label: cc.Label,
        textKey: {
            default: 'TEXT_KEY',
            multiline: true,
            tooltip: 'Enter i18n key here',
        },
    },

    update: function () {
        if (this.language != cc.sys.localStorage.getItem('language')) {
            this.language = cc.sys.localStorage.getItem('language');
            this.Label.string = i18n.t(this.textKey);
        }
    },
});