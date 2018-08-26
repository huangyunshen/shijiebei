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
var Code = (function (_super) {
    __extends(Code, _super);
    function Code(codes) {
        var _this = _super.call(this) || this;
        _this.codes = codes;
        /**lang data */
        _this.langData = $ZHTW.code;
        /**load Container skin */
        _this.skinName = "resource/eui_modules/CodeUI.exml";
        return _this;
    }
    Code.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
    };
    Code.prototype.closeModal = function () {
        this.visible = false;
    };
    return Code;
}(eui.Component));
__reflect(Code.prototype, "Code");
