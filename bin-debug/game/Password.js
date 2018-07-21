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
        _this.dialogModal();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.dialog, _this);
        return _this;
    }
    Password.prototype.dialogModal = function () {
        var stageW = egret.MainContext.instance.stage.stageWidth;
        var stageH = egret.MainContext.instance.stage.stageHeight;
        var container = new egret.Sprite();
        container.width = stageW;
        container.height = stageH;
        var rect = new egret.Shape();
        rect.graphics.beginFill(0x000000, 0.7);
        rect.graphics.drawRect(0, 0, stageW, stageH);
        rect.graphics.endFill();
        container.addChild(rect);
        this.addChild(container);
    };
    Password.prototype.dialog = function () {
        var content = new egret.Sprite();
        content.x = 135;
        content.y = 610;
        var bg = createBitmapByName("tuanchuang_png");
        content.addChild(bg);
        var title = new CreateTextField({ x: 0, y: 22, width: 280, tx: "\u8BF7\u8F93\u5165\u94B1\u5305\u5BC6\u7801", color: 0x57ffed }).create();
        content.addChild(title);
        var close = createBitmapByName("close_small_png");
        close.x = 642;
        close.y = -5;
        content.addChild(close);
        close.touchEnabled = true;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
        var inputBorder = new egret.Shape();
        inputBorder.graphics.lineStyle(2, 0x2B7B62, 1);
        inputBorder.graphics.beginFill(0x062911, 0.3);
        inputBorder.graphics.drawRoundRect(50, 170, 680, 100, 20);
        inputBorder.graphics.endFill();
        content.addChild(inputBorder);
        var txInput = new CreateTextField({
            x: 60,
            y: 195,
            width: 660,
            height: 100,
            color: 0xffdd02,
            tx: "",
            size: 54
        }).create();
        txInput.type = egret.TextFieldType.INPUT;
        txInput.displayAsPassword = true;
        txInput.inputType = "password";
        content.addChild(txInput);
        var submit = new egret.Sprite();
        submit.x = 270;
        submit.y = 340;
        var submitBtn = new egret.Shape();
        submitBtn.graphics.beginFill(0xf0e92f);
        submitBtn.graphics.drawRoundRect(0, 0, 300, 90, 20);
        submitBtn.graphics.endFill();
        submit.addChild(submitBtn);
        var submitText = new CreateTextField({ x: 0, y: 26, width: 300, color: 0x5a3c0c, tx: "确定", size: 42 }).create();
        submit.addChild(submitText);
        content.addChild(submit);
        submit.touchEnabled = true;
        submit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submitEvent.bind(this, txInput, submitText, close, submitBtn), this);
        this.addChild(content);
    };
    Password.prototype.closeModal = function () {
        egret.MainContext.instance.stage.removeChild(password);
        password = null;
        eventButtonCtr(true);
    };
    Password.prototype.submitEvent = function (input, submitText, close, submitBtn) {
        var _this = this;
        submitText.text = "正在解锁钱包...";
        var tw = egret.Tween.get(submitText, { loop: true });
        tw.to({ alpha: 0.2 }, 1000);
        tw.to({ alpha: 1 }, 1000);
        close.toucheEnabled = false;
        submitBtn.toucheEnabled = false;
        var promise = verifyWalletPwd(input.text);
        promise.then(function () {
            var wallet = getActiveAccount();
            if (wallet.address) {
                getBalance(wallet.address, myBalance);
                setInterval(function () {
                    getBalance(getActiveAccount().address, myBalance);
                }, 3000);
            }
            tw.pause();
            tw = null;
            _this.closeModal();
        }, function (err) {
            submitText.text = "密码不正确";
            setTimeout(function () {
                tw.pause();
                tw = null;
                submitText.text = "确定";
                close.toucheEnabled = true;
                submitBtn.toucheEnabled = true;
            }, 4000);
        });
    };
    return Password;
}(egret.Sprite));
__reflect(Password.prototype, "Password");
