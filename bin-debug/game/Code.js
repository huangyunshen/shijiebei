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
    function Code(code) {
        var _this = _super.call(this) || this;
        _this.code = code;
        _this.dialogModal();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.dialog, _this);
        return _this;
    }
    Code.prototype.dialogModal = function () {
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
    Code.prototype.dialog = function () {
        var content = new egret.Sprite();
        content.x = 50;
        content.y = 90;
        var bg = createBitmapByName("jilu_bg_png");
        content.addChild(bg);
        var title = new CreateTextField({ x: 0, y: 28, width: 350, color: 0x57ffed, tx: "\u667A\u80FD\u5408\u7EA6\u6E90\u7801", size: 54 }).create();
        content.addChild(title);
        var close = createBitmapByName("close_large_png");
        close.x = 804;
        close.y = -6;
        content.addChild(close);
        close.touchEnabled = true;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
        var myScrollView = new egret.ScrollView();
        myScrollView.width = 980;
        myScrollView.height = 1385;
        myScrollView.y = 135;
        var sprite = new egret.Sprite();
        sprite.x = 45;
        sprite.y = 40;
        var text = new CreateTextField({ x: 0, y: 0, width: 885, tx: this.code, size: 34, align: "left" }).create();
        sprite.addChild(text);
        myScrollView.setContent(sprite);
        content.addChild(myScrollView);
        this.addChild(content);
    };
    Code.prototype.closeModal = function () {
        egret.MainContext.instance.stage.removeChild(sourceCode);
        eventButtonCtr(true);
    };
    return Code;
}(egret.Sprite));
__reflect(Code.prototype, "Code");
