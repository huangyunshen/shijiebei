var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Language = (function (_super) {
    __extends(Language, _super);
    function Language() {
        var _this = _super.call(this) || this;
        /**lang data */
        _this.langData = $ZHTW.language;
        /**load Container skin */
        _this.skinName = "resource/eui_modules/LanguageUI.exml";
        return _this;
    }
    Language.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
        this.zhtw.addEventListener(egret.TouchEvent.TOUCH_TAP, this.select.bind(this, 'zhtw'), this);
        this.en.addEventListener(egret.TouchEvent.TOUCH_TAP, this.select.bind(this, 'en'), this);
    };
    Language.prototype.closeModal = function () {
        this.visible = false;
    };
    Language.prototype.select = function (lang) {
    };
    return Language;
}(eui.Component));
__reflect(Language.prototype, "Language");
