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
        _this.dialogModal();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.dialog, _this);
        return _this;
    }
    Dialog.prototype.dialogModal = function () {
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
    Dialog.prototype.dialog = function () {
        var content = new egret.Sprite();
        content.x = 135;
        content.y = 610;
        var bg = createBitmapByName("tuanchuang_png");
        content.addChild(bg);
        var title = new CreateTextField({ x: 0, y: 22, width: 280, tx: "\u63D0\u793A", color: 0x57ffed }).create();
        content.addChild(title);
        var close = createBitmapByName("close_small_png");
        close.x = 642;
        close.y = -5;
        content.addChild(close);
        eventDialog["close"] = close;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal.bind(this, false), this);
        var message = new CreateTextField({ x: 45, y: 160, width: 695, height: 100, tx: "" }).create();
        message.verticalAlign = egret.VerticalAlign.MIDDLE;
        content.addChild(message);
        var submit = new egret.Sprite();
        submit.x = 270;
        submit.y = 340;
        var submitBtn = new egret.Shape();
        submitBtn.graphics.beginFill(0xf0e92f);
        submitBtn.graphics.drawRoundRect(0, 0, 260, 90, 20);
        submitBtn.graphics.endFill();
        submit.addChild(submitBtn);
        eventDialog["submit"] = submit;
        submit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submitEvent.bind(this, false), this);
        var submitText = new CreateTextField({ x: 0, y: 26, width: 260, color: 0x5a3c0c, tx: "确定", size: 42 }).create();
        submit.addChild(submitText);
        content.addChild(submit);
        this.addChild(content);
    };
    Dialog.prototype.closeModal = function (flag) {
        eventButtonCtr(!flag);
        eventDialogCtr(flag);
    };
    Dialog.prototype.submitEvent = function (flag) {
        if (dialog.url) {
            window.open(dialog.url);
        }
        this.closeModal(flag);
    };
    return Dialog;
}(egret.Sprite));
__reflect(Dialog.prototype, "Dialog");
