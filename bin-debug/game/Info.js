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
var Info = (function (_super) {
    __extends(Info, _super);
    function Info() {
        var _this = _super.call(this) || this;
        _this.dialogModal();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.dialog, _this);
        return _this;
    }
    Info.prototype.dialogModal = function () {
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
        rect.touchEnabled = true;
        rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
        this.addChild(container);
    };
    Info.prototype.dialog = function () {
        var _this = this;
        var content = new egret.Sprite();
        content.x = 80;
        content.y = 420;
        var bg = createBitmapByName("zjxx_bg_png");
        content.addChild(bg);
        var title = new CreateTextField({ x: 0, y: 22, width: 280, tx: "\u5E94\u7528\u4FE1\u606F", color: 0x57ffed }).create();
        content.addChild(title);
        CONTRACTINSTANCE.methods.getPublicData().call()
            .then(function (data) {
            console.log(contractBalance);
            var r1 = _this.getList(125, 80, 40, "应用名", data[0]);
            content.addChild(r1);
            var r2 = _this.getList(235, 126, 80, "创建人地址", data[2]);
            content.addChild(r2);
            var r3 = _this.getList(390, 126, 80, "应用地址", CONCADDR);
            content.addChild(r3);
            var r4 = _this.getList(547, 80, 40, "创建时间", timestampToTime(data[3]));
            content.addChild(r4);
            var r5 = _this.getList(657, 80, 40, "奖池余额", contractBalance + " FOF");
            content.addChild(r5);
            var r6 = _this.getList(767, 80, 40, "下注总金额", web3.utils.fromWei(data[4], 'ether') + " FOF");
            content.addChild(r6);
            _this.addChild(content);
        });
    };
    Info.prototype.getList = function (y, cHeight, tHeight, text1, text2) {
        var content = new egret.Sprite();
        content.x = 29;
        content.y = y;
        content.width = 860;
        content.height = cHeight;
        var rect1 = new egret.Shape();
        rect1.graphics.beginFill(0x60ffcc, 0.17);
        rect1.graphics.drawRoundRect(0, 0, 860, cHeight, 20);
        rect1.graphics.endFill();
        var msg1 = new CreateTextField({ x: 30, y: 24, width: 250, height: tHeight, tx: text1, size: 34, color: 0xf0e92f, align: "left" }).create();
        var msg2 = new CreateTextField({ x: 270, y: 24, width: 560, height: tHeight, tx: text2, size: 34, align: "left" }).create();
        content.addChild(rect1);
        content.addChild(msg1);
        content.addChild(msg2);
        return content;
    };
    Info.prototype.closeModal = function () {
        egret.MainContext.instance.stage.removeChild(infoMsg);
        eventButtonCtr(true);
    };
    return Info;
}(egret.Sprite));
__reflect(Info.prototype, "Info");
