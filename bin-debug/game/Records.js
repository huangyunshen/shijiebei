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
var Records = (function (_super) {
    __extends(Records, _super);
    function Records(arr) {
        var _this = _super.call(this) || this;
        _this.arr = arr;
        _this.dialogModal();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.records, _this);
        return _this;
    }
    Records.prototype.dialogModal = function () {
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
    Records.prototype.records = function () {
        var content = new egret.Sprite();
        content.x = 50;
        content.y = 90;
        var bg = createBitmapByName("jilu_bg_png");
        content.addChild(bg);
        var title = new CreateTextField({ x: 0, y: 28, width: 350, color: 0x57ffed, tx: "\u8BB0\u5F55", size: 54 }).create();
        content.addChild(title);
        var close = createBitmapByName("close_large_png");
        close.x = 804;
        close.y = -6;
        content.addChild(close);
        close.touchEnabled = true;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
        var message = new CreateTextField({ x: 45, y: 160, width: 695, height: 100, tx: "" }).create();
        message.verticalAlign = egret.VerticalAlign.MIDDLE;
        content.addChild(message);
        var myScrollView = new egret.ScrollView();
        myScrollView.width = 980;
        myScrollView.height = 1385;
        myScrollView.y = 135;
        var sprite = new egret.Sprite();
        for (var i = 0; i < this.arr.length; i++) {
            var con = this.record(i, "世界杯", this.arr[i].time, CONTRACTINFO, this.arr[i].selected, this.arr[i].multiple, this.arr[i].score.homeTeam, this.arr[i].score.guestTeam);
            sprite.addChild(con);
        }
        myScrollView.setContent(sprite);
        content.addChild(myScrollView);
        this.addChild(content);
    };
    Records.prototype.closeModal = function () {
        egret.MainContext.instance.stage.removeChild(records);
        records = null;
        eventButtonCtr(true);
    };
    Records.prototype.record = function (_index, _Name, _time, _info, _selected, _multiple, _hScore, _vScore) {
        var singAmount = Number(_info[8]);
        var container = new egret.Sprite();
        var width = 920;
        var height = 610;
        var textColor = 0x01ffea;
        var defaultColor = 0xffffff;
        var y = 0;
        y += _index * (height + 30);
        container.x = 30;
        container.y = y;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x095e35);
        bg.graphics.drawRoundRect(0, 0, width, height, 15);
        bg.graphics.endFill();
        container.addChild(bg);
        var name = new CreateTextField({ x: 20, y: 26, width: 400, align: "left", tx: _Name, size: 40 }).create();
        container.addChild(name);
        var time = new CreateTextField({
            x: 400,
            y: 30,
            width: 500,
            align: "right",
            tx: "\u4E0B\u6CE8\u65F6\u95F4\uFF1A" + _time,
            size: 34
        }).create();
        container.addChild(time);
        var content = new egret.Sprite();
        content.width = 860;
        content.height = 290;
        content.x = 30;
        content.y = 88;
        var rect = new egret.Shape();
        rect.graphics.beginFill(0x60ffcc, 0.12);
        rect.graphics.drawRoundRect(0, 0, 860, 290, 15);
        rect.graphics.endFill();
        content.addChild(rect);
        var textH = new CreateTextField({
            x: 38,
            y: 53,
            width: 250,
            align: "left",
            color: _selected.zhusheng ? textColor : defaultColor,
            tx: "\u4E3B\u80DC\uFF1A" + _info[4] / 100,
            size: 36
        }).create();
        content.addChild(textH);
        var textD = new CreateTextField({
            x: 38,
            y: 129,
            width: 250,
            align: "left",
            color: _selected.ping ? textColor : defaultColor,
            tx: "\u5E73\uFF1A" + _info[5] / 100,
            size: 36
        }).create();
        content.addChild(textD);
        var textV = new CreateTextField({
            x: 38,
            y: 200,
            width: 250,
            color: _selected.kesheng ? textColor : defaultColor,
            align: "left",
            tx: "\u5BA2\u80DC\uFF1A" + _info[6] / 100,
            size: 36
        }).create();
        content.addChild(textV);
        var gameParty = new egret.Sprite();
        gameParty.width = 520;
        gameParty.height = 183;
        gameParty.x = 291;
        gameParty.y = 30;
        var circle1 = createBitmapByName("contry_bg_png");
        gameParty.addChild(circle1);
        var circle2 = createBitmapByName("contry_bg_png");
        circle2.x = 335;
        gameParty.addChild(circle2);
        var vs = createBitmapByName("vs_png");
        vs.x = 212;
        vs.y = 60;
        gameParty.addChild(vs);
        var homeTeam = createBitmapByName("contry1_png");
        homeTeam.x = 10;
        homeTeam.y = 10;
        homeTeam.scaleX = 0.66;
        homeTeam.scaleY = 0.66;
        gameParty.addChild(homeTeam);
        var visitingTeam = createBitmapByName("contry2_png");
        visitingTeam.x = 346;
        visitingTeam.y = 10;
        visitingTeam.scaleX = 0.66;
        visitingTeam.scaleY = 0.66;
        gameParty.addChild(visitingTeam);
        var teamText1 = new CreateTextField({ x: 0, y: 120, width: 180, tx: _info[2], size: 24 }).create();
        gameParty.addChild(teamText1);
        var teamText2 = new CreateTextField({ x: 336, y: 120, width: 180, tx: _info[3], size: 24 }).create();
        gameParty.addChild(teamText2);
        if (_hScore) {
            var scoreText1 = new CreateTextField({
                x: 355,
                y: 233,
                width: 50,
                tx: String(_hScore),
                size: 40
            }).create();
            content.addChild(scoreText1);
        }
        if (_vScore) {
            var scoreText2 = new CreateTextField({
                x: 695,
                y: 233,
                width: 50,
                tx: String(_vScore),
                size: 40
            }).create();
            content.addChild(scoreText2);
        }
        var text1 = new CreateTextField({
            x: 40,
            y: 416,
            width: 850,
            align: "left",
            tx: "\u5355\u6CE8\u91D1\u989D\uFF1A" + singAmount + " FOF",
            size: 34
        }).create();
        container.addChild(text1);
        var num = 0;
        for (var key in _selected) {
            if (_selected[key])
                num++;
        }
        var text2 = new CreateTextField({
            x: 40,
            y: 477,
            width: 850,
            align: "left",
            tx: "\u6295\u6CE8\u603B\u989D\uFF1A" + num * singAmount * _multiple + " FOF(" + _multiple + "\u500D)",
            size: 34
        }).create();
        container.addChild(text2);
        var total = "未开奖";
        var isWin = false;
        if ((_hScore >= 0) && (_vScore >= 0)) {
            var result = Number(_hScore) - Number(_vScore) - Number(CONTRACTINFO[9]) + Number(CONTRACTINFO[10]);
            if (result > 0) {
                if (_selected.zhusheng) {
                    isWin = true;
                    total = Number(singAmount) * _multiple * CONTRACTINFO[4] / 100 + ' FOF';
                }
                else {
                    total = "未中奖";
                }
            }
            else if (result === 0) {
                if (_selected.ping) {
                    isWin = true;
                    total = singAmount * _multiple * CONTRACTINFO[5] / 100 + ' FOF';
                }
                else {
                    total = "未中奖";
                }
            }
            else if (result < 0) {
                if (_selected.kesheng) {
                    isWin = true;
                    total = singAmount * _multiple * CONTRACTINFO[6] / 100 + ' FOF';
                }
                else {
                    total = "未中奖";
                }
            }
        }
        var text3 = new CreateTextField({
            x: 40,
            y: 540,
            width: 850,
            align: "left",
            color: isWin ? textColor : defaultColor,
            tx: "\u83B7\u5956\u91D1\u989D\uFF1A" + total,
            size: 34
        }).create();
        container.addChild(text3);
        if (isWin) {
            var win = createBitmapByName("gxzj_png");
            win.x = 550;
            win.y = 420;
            container.addChild(win);
        }
        content.addChild(gameParty);
        container.addChild(content);
        return container;
    };
    return Records;
}(egret.Sprite));
__reflect(Records.prototype, "Records");
