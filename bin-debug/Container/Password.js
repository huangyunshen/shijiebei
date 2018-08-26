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
var Password = (function (_super) {
    __extends(Password, _super);
    function Password() {
        var _this = _super.call(this) || this;
        /**lang data */
        _this.langData = $ZHTW.password;
        _this.pwd = '';
        /**load Container skin */
        _this.skinName = "resource/eui_modules/PasswordUI.exml";
        return _this;
    }
    Password.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
        this.input.addEventListener(egret.Event.CHANGE, this.onInput, this);
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submit, this);
    };
    Password.prototype.closeModal = function () {
        this.visible = false;
    };
    Password.prototype.onInput = function (e) {
        this.pwd = e.target.text;
    };
    Password.prototype.submit = function () {
        var _this = this;
        if (!this.pwd) {
            showDialog(this.langData.enterPwd);
            return;
        }
        showDialog(this.langData.isUnlocking, null, false);
        var tw = egret.Tween.get($Modal.dialog.contentText, { loop: true }); //开始动画
        tw.to({ alpha: 0.2 }, 1000);
        tw.to({ alpha: 1 }, 1000);
        setTimeout(function () {
            var promise = verifyWalletPwd(_this.pwd);
            promise.then(function () {
                var wallet = getActiveAccount();
                tw.pause(); //停止动画
                tw = null;
                $Modal.dialog.canBeClose = true;
                $Modal.dialog.visible = false;
                _this.closeModal();
            }, function (err) {
                tw.pause(); //停止动画
                tw = null;
                $Modal.dialog.msg = _this.langData.pwdError;
                $Modal.dialog.canBeClose = true;
            });
        }, 500);
    };
    return Password;
}(eui.Component));
__reflect(Password.prototype, "Password");
