const i18n = require('i18n');
cc.Class({
    extends: cc.Component,

    properties: {
        EditBox : cc.EditBox,
        textKey: {
            default: 'TEXT_KEY',
            multiline: true,
            tooltip: 'Enter i18n key here',
            notify: function () {
                if (this._sgNode) {
                    this._sgNode.setString(this.string);
                    this._updateNodeSize();
                }
            }
        },
    },

    update: function () 
    {
        if(this.language != cc.sys.localStorage.getItem('language'))
        {
            this.language = cc.sys.localStorage.getItem('language');
            this.EditBox.placeholder = i18n.t(this.textKey);
        }
    },
});