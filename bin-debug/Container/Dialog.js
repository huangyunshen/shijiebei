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
var Dialog = (function (_super) {
    __extends(Dialog, _super);
    function Dialog() {
        var _this = _super.call(this) || this;
        /**lang data */
        _this.langData = $ZHTW.dialog;
        _this.msg = '';
        _this.canBeClose = true;
        /**load Container skin */
        _this.skinName = "resource/eui_modules/DialogUI.exml";
        return _this;
    }
    Dialog.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submit, this);
    };
    Dialog.prototype.closeModal = function () {
        this.canBeClose && (this.visible = false);
    };
    Dialog.prototype.submit = function () {
        if (this.url) {
            window.location.href = this.url;
            return;
        }
        this.closeModal();
    };
    return Dialog;
}(eui.Component));
__reflect(Dialog.prototype, "Dialog");
