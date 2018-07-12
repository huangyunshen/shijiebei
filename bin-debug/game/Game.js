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
var gameContent;
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.addChild(new Background());
        _this.addChild(new HeaderBar());
        _this.addChild(new Deadline());
        _this.addChild(new RaceParty());
        _this.addChild(new BottomPour());
        _this.addChild(new Multiple());
        _this.addChild(new SubmitBtn());
        _this.addChild(new HopeBonus());
        dialog = new Dialog();
        dialog.alpha = 0;
        _this.addChild(dialog);
        gameContent = _this;
        CONTRACTINSTANCE.events
            .returnBetResult()
            .on('data', function (event) {
            if (event.returnValues && event.returnValues.code === "205") {
                showDialog("比赛结束，主客队比分为 " + event.returnValues.hCore + " - " + event.returnValues.vCore);
            }
        })
            .on('error', function (err) {
            console.log(err);
        });
        return _this;
    }
    return Game;
}(egret.DisplayObjectContainer));
__reflect(Game.prototype, "Game");
var TotalAmount;
var HopeResult;
var Background = (function (_super) {
    __extends(Background, _super);
    function Background() {
        var _this = _super.call(this) || this;
        _this.background();
        return _this;
    }
    Background.prototype.background = function () {
        var stageW = egret.MainContext.instance.stage.stageWidth;
        var stageH = egret.MainContext.instance.stage.stageHeight;
        var sky = createBitmapByName("bg_png");
        this.addChild(sky);
        sky.width = stageW;
        sky.height = stageH;
    };
    return Background;
}(egret.Sprite));
__reflect(Background.prototype, "Background");
var HeaderBar = (function (_super) {
    __extends(HeaderBar, _super);
    function HeaderBar() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.drawStaticRes, _this);
        return _this;
    }
    HeaderBar.prototype.drawStaticRes = function () {
        var homeIcon = createBitmapByName("icon_home_png");
        this.addChild(homeIcon);
        eventButton["homeIcon"] = homeIcon;
        homeIcon.x = 31;
        homeIcon.y = 28;
        var recordIcon = createBitmapByName("icon_jl_png");
        this.addChild(recordIcon);
        eventButton["recordIcon"] = recordIcon;
        recordIcon.x = 177;
        recordIcon.y = 28;
        recordIcon.touchEnabled = true;
        recordIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openRecord, this);
        this.myBalance();
    };
    HeaderBar.prototype.myBalance = function () {
        var fofIcon1 = createBitmapByName("fof_bg_png");
        this.addChild(fofIcon1);
        fofIcon1.x = 649;
        fofIcon1.y = 28;
        var balance = new CreateTextField({ x: 752, y: 60, width: 300, tx: "0", size: 54 }).create();
        this.addChild(balance);
        if (ACCADDR)
            getBalance(ACCADDR, balance);
        setInterval(function () {
            getBalance(ACCADDR, balance);
        }, 3000);
    };
    HeaderBar.prototype.openRecord = function () {
        eventButtonCtr(false);
        getRecord(5, 1).then(function (res) {
            console.log(res);
            records = new Records(res);
            egret.MainContext.instance.stage.addChild(records);
        }, function (err) {
            eventButtonCtr(true);
            console.log(err);
        });
    };
    return HeaderBar;
}(egret.Sprite));
__reflect(HeaderBar.prototype, "HeaderBar");
var Deadline = (function (_super) {
    __extends(Deadline, _super);
    function Deadline() {
        var _this = _super.call(this) || this;
        _this.deadline();
        return _this;
    }
    Deadline.prototype.deadline = function () {
        var container = new egret.Sprite();
        container.x = 240;
        container.y = 170;
        var rect = new egret.Shape();
        container.addChild(rect);
        rect.graphics.beginFill(0x022617, 0.5);
        rect.graphics.drawRoundRect(0, 0, 600, 62, 20);
        rect.graphics.endFill();
        var time = timestampToTime(CONTRACTINFO[7]);
        var text = new CreateTextField({ y: 13, width: 600, color: 0xc6f1ff, tx: "\u4E0B\u6CE8\u622A\u6B62\u65F6\u95F4  " + time, size: 36 }).create();
        container.addChild(text);
        this.addChild(container);
    };
    return Deadline;
}(egret.Sprite));
__reflect(Deadline.prototype, "Deadline");
var RaceParty = (function (_super) {
    __extends(RaceParty, _super);
    function RaceParty() {
        var _this = _super.call(this) || this;
        _this.raceParty();
        return _this;
    }
    RaceParty.prototype.raceParty = function () {
        var container = new egret.Sprite();
        container.width = 1020;
        container.height = 427;
        container.x = 30;
        container.y = 262;
        var bg = createBitmapByName("vs_bg_png");
        container.addChild(bg);
        var homeTeam = createBitmapByName("contry1_png");
        homeTeam.x = 145;
        homeTeam.y = 85;
        container.addChild(homeTeam);
        var visitingTeam = createBitmapByName("contry2_png");
        visitingTeam.x = 630;
        visitingTeam.y = 85;
        container.addChild(visitingTeam);
        var text1 = new CreateTextField({
            x: 141,
            y: 250,
            width: 250,
            color: 0xc6f1ff,
            tx: "" + CONTRACTINFO[2],
            size: 30
        }).create();
        container.addChild(text1);
        var text2 = new CreateTextField({ x: 625, y: 250, width: 250, tx: "" + CONTRACTINFO[3], size: 30 }).create();
        container.addChild(text2);
        if (CONTRACTINFO[9] !== "0") {
            var concede = this.concededPoints(200, 350, CONTRACTINFO[9]);
            container.addChild(concede);
        }
        if (CONTRACTINFO[10] !== "0") {
            var concede = this.concededPoints(685, 350, CONTRACTINFO[10]);
            container.addChild(concede);
        }
        this.addChild(container);
    };
    RaceParty.prototype.concededPoints = function (x, y, t) {
        var container = new egret.Sprite();
        container.x = x;
        container.y = y;
        var rect = new egret.Shape();
        rect.graphics.beginFill(0x074520, 1);
        rect.graphics.drawRoundRect(0, 0, 136, 48, 20);
        rect.graphics.endFill();
        container.addChild(rect);
        var text = new CreateTextField({ x: 0, y: 8, width: 136, color: 0xff9d55, tx: "\u8BA9" + t + "\u7403", size: 36 }).create();
        container.addChild(text);
        return container;
    };
    return RaceParty;
}(egret.Sprite));
__reflect(RaceParty.prototype, "RaceParty");
var BottomPour = (function (_super) {
    __extends(BottomPour, _super);
    function BottomPour() {
        var _this = _super.call(this) || this;
        _this.btnWidth = 328;
        _this.btnHeight = 280;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.bottomPour, _this);
        return _this;
    }
    BottomPour.prototype.bottomPour = function () {
        var _this = this;
        var text1 = function (t) {
            var text = new CreateTextField({ y: 43, width: _this.btnWidth, tx: t, size: 48 }).create();
            return text;
        };
        var text2 = function (t) {
            var text = new CreateTextField({ y: 119, width: _this.btnWidth, color: 0xfedc01, tx: t }).create();
            return text;
        };
        var container1 = new egret.Sprite();
        container1.width = this.btnWidth;
        container1.height = this.btnHeight;
        container1.x = 28;
        container1.y = 743;
        container1.$anchorOffsetX = container1.width / 2;
        container1.$anchorOffsetY = container1.height / 2;
        container1.x = container1.x + container1.width / 2;
        container1.y = container1.y + container1.height / 2;
        var btn1 = createBtnBitmapByName("btn_1_png");
        btn1.btnName = "zhusheng";
        btn1.odds = Number(CONTRACTINFO[4]);
        container1.addChild(btn1);
        eventButton["btn1"] = btn1;
        container1.addChild(text1("主胜"));
        container1.addChild(text2((CONTRACTINFO[4] / 100).toString()));
        this.addChild(container1);
        btn1.touchEnabled = true;
        btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabBottomPour.bind(this, container1), this);
        var container2 = new egret.Sprite();
        container2.width = this.btnWidth;
        container2.height = this.btnHeight;
        container2.x = 378;
        container2.y = 743;
        container2.$anchorOffsetX = container2.width / 2;
        container2.$anchorOffsetY = container2.height / 2;
        container2.x = container2.x + container2.width / 2;
        container2.y = container2.y + container2.height / 2;
        var btn2 = createBtnBitmapByName("btn_1_png");
        btn2.btnName = "ping";
        btn2.odds = Number(CONTRACTINFO[5]);
        container2.addChild(btn2);
        eventButton["btn2"] = btn2;
        container2.addChild(text1("平"));
        container2.addChild(text2((CONTRACTINFO[5] / 100).toString()));
        this.addChild(container2);
        btn2.touchEnabled = true;
        btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabBottomPour.bind(this, container2), this);
        var container3 = new egret.Sprite();
        container3.width = this.btnWidth;
        container3.height = this.btnHeight;
        container3.x = 728;
        container3.y = 743;
        container3.$anchorOffsetX = container3.width / 2;
        container3.$anchorOffsetY = container3.height / 2;
        container3.x = container3.x + container3.width / 2;
        container3.y = container3.y + container3.height / 2;
        var btn3 = createBtnBitmapByName("btn_1_png");
        btn3.btnName = "kesheng";
        btn3.odds = Number(CONTRACTINFO[6]);
        container3.addChild(btn3);
        eventButton["btn3"] = btn3;
        container3.addChild(text1("客胜"));
        container3.addChild(text2((CONTRACTINFO[6] / 100).toString()));
        this.addChild(container3);
        btn3.touchEnabled = true;
        btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabBottomPour.bind(this, container3), this);
    };
    BottomPour.prototype.onTabBottomPour = function (container, e) {
        if (e.target.isChoosed) {
            e.target.texture = RES.getRes("btn_1_png");
            selected[e.target.btnName] = null;
        }
        else {
            e.target.texture = RES.getRes("btn_2_png");
            selected[e.target.btnName] = e.target.odds;
            egret.Tween.get(container)
                .to({ scaleX: 0.98, scaleY: 0.98 }, 100, egret.Ease.circIn)
                .to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.circIn);
        }
        e.target.isChoosed = !e.target.isChoosed;
        var triger = new TrigerEvent();
        var change = new ChangeEvent();
        triger.addEventListener(HopeBonusEvent.Hope, change.getChangeEvent, change);
        triger.sendMsg();
        triger.removeEventListener(HopeBonusEvent.Hope, change.getChangeEvent, change);
    };
    return BottomPour;
}(egret.Sprite));
__reflect(BottomPour.prototype, "BottomPour");
var Multiple = (function (_super) {
    __extends(Multiple, _super);
    function Multiple() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.multiple, _this);
        return _this;
    }
    Multiple.prototype.multiple = function () {
        var background = createBitmapByName("beilv_bg_png");
        this.addChild(background);
        background.x = 40;
        background.y = 989;
        var beilv = new CreateTextField({ x: 80, y: 1006, width: 100, tx: "倍率", size: 42 }).create();
        this.addChild(beilv);
        var danzhu = new CreateTextField({
            x: 200,
            y: 1088,
            width: 680,
            color: 0x53fc9b,
            tx: "\u5355\u6CE8\u91D1\u989D\uFF1A" + CONTRACTINFO[8] + " FOF"
        }).create();
        this.addChild(danzhu);
        var container = new egret.Sprite();
        this.addChild(container);
        var inputBorder = new egret.Shape();
        inputBorder.graphics.lineStyle(2, 0x2B7B62, 1);
        inputBorder.graphics.beginFill(0x062911, 0.3);
        inputBorder.graphics.drawRoundRect(200, 1144, 680, 100, 20);
        inputBorder.graphics.endFill();
        container.addChild(inputBorder);
        var txInput = new CreateTextField({
            x: 210,
            y: 1166,
            width: 660,
            height: 100,
            color: 0xffdd02,
            tx: "1",
            size: 54
        }).create();
        txInput.type = egret.TextFieldType.INPUT;
        container.addChild(txInput);
        eventButton["txInput"] = txInput;
        txInput.addEventListener(egret.Event.CHANGE, this.onMultipleInput, this);
        var zong = new CreateTextField({ x: 200, y: 1273, width: 680, color: 0x53fc9b, tx: "总金额：0FOF" }).create();
        this.addChild(zong);
        TotalAmount = zong;
        var btnLeft = createBtnBitmapByName("btn_jian_png");
        this.addChild(btnLeft);
        eventButton["btnLeft"] = btnLeft;
        btnLeft.x = 80;
        btnLeft.y = 1144;
        btnLeft.btnName = "minus";
        btnLeft.touchEnabled = true;
        btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMultipleClick.bind(this, txInput), this);
        var btnRight = createBtnBitmapByName("btn_jia_png");
        this.addChild(btnRight);
        eventButton["btnRight"] = btnRight;
        btnRight.x = 900;
        btnRight.y = 1144;
        btnRight.btnName = "add";
        btnRight.touchEnabled = true;
        btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMultipleClick.bind(this, txInput), this);
    };
    Multiple.prototype.onMultipleInput = function (e) {
        e.target.text = e.target.text.replace(/[^\d]/g, "");
        var num = Number(e.target.text);
        if (num < 1) {
            e.target.text = "1";
        }
        if (num > 99) {
            e.target.text = "99";
        }
        multiplying = e.target.text;
        console.log(multiplying);
        if (selected["zhusheng"] || selected["ping"] || selected["kesheng"]) {
            var triger = new TrigerEvent();
            var change = new ChangeEvent();
            triger.addEventListener(HopeBonusEvent.Hope, change.getChangeEvent, change);
            triger.sendMsg();
            triger.removeEventListener(HopeBonusEvent.Hope, change.getChangeEvent, change);
        }
    };
    Multiple.prototype.onMultipleClick = function (txInput, e) {
        var num = Number(txInput.text);
        if (e.target.btnName === 'add' && num < 99) {
            num++;
        }
        else if (e.target.btnName === 'minus' && num > 1) {
            num--;
        }
        multiplying = txInput.text = String(num);
        console.log(multiplying);
        if (selected["zhusheng"] || selected["ping"] || selected["kesheng"]) {
            var triger = new TrigerEvent();
            var change = new ChangeEvent();
            triger.addEventListener(HopeBonusEvent.Hope, change.getChangeEvent, change);
            triger.sendMsg();
            triger.removeEventListener(HopeBonusEvent.Hope, change.getChangeEvent, change);
        }
    };
    return Multiple;
}(egret.Sprite));
__reflect(Multiple.prototype, "Multiple");
var SubmitBtn = (function (_super) {
    __extends(SubmitBtn, _super);
    function SubmitBtn() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.submit, _this);
        return _this;
    }
    SubmitBtn.prototype.submit = function () {
        var container = new egret.Sprite();
        container.x = 165;
        container.y = 1429;
        var rect = new egret.Shape();
        container.addChild(rect);
        rect.graphics.beginFill(0xf0e92f);
        rect.graphics.drawRoundRect(0, 0, 750, 124, 10);
        rect.graphics.endFill();
        var btnText = new CreateTextField({ y: 35, width: 750, color: 0x5a3c0c, tx: "确定下注", size: 56 }).create();
        container.addChild(btnText);
        this.addChild(container);
        eventButton["container"] = container;
        container.touchEnabled = true;
        container.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submitEvent.bind(this, container), this);
    };
    SubmitBtn.prototype.submitEvent = function (obj, e) {
        var _this = this;
        if (!ACCADDR) {
            showDialog("未登录，点击确定跳转登陆");
            return;
        }
        var num = 0;
        var total;
        var maxOdds = [];
        var arr = [-1, -1, -1];
        if (selected["zhusheng"]) {
            arr[0] = 0;
            num++;
            maxOdds.push(Number(CONTRACTINFO[4]));
        }
        if (selected["ping"]) {
            arr[1] = 2;
            num++;
            maxOdds.push(Number(CONTRACTINFO[5]));
        }
        if (selected["kesheng"]) {
            arr[2] = 1;
            num++;
            maxOdds.push(Number(CONTRACTINFO[6]));
        }
        total = num * Number(multiplying) * Number(CONTRACTINFO[8]) * 1e18;
        if (arr[0] === -1 && arr[1] === -1 && arr[2] === -1) {
            showDialog("请选择下注方");
            return;
        }
        getBalance(ACCADDR, null, function (data) {
            if (total > data) {
                showDialog("余额不足，请充值");
                return;
            }
            CONTRACTINSTANCE.methods.getNow().call().then(function (now) {
                now = now + 10000;
                if (now > CONTRACTINFO[7]) {
                    showDialog("已过下注截止时间 " + timestampToTime(CONTRACTINFO[7]));
                    return;
                }
                CONTRACTINSTANCE.methods.availableBalance().call().then(function (balance) {
                    maxOdds.sort(function (a, b) {
                        return a - b;
                    });
                    var maximum = total / num * maxOdds[maxOdds.length - 1] / 100;
                    if (maximum > balance) {
                        showDialog("奖池可用余额不足，下注金额大于奖池可用余额");
                        return;
                    }
                    var textObj = obj.$children[1];
                    textObj.text = "正在下注...";
                    var tw = egret.Tween.get(textObj, { loop: true });
                    tw.to({ alpha: 0.2 }, 1000);
                    tw.to({ alpha: 1 }, 1000);
                    eventButtonCtr(false);
                    CONTRACTINSTANCE.methods.betFun(ACCADDR, arr, total, num, maximum)
                        .send({
                        from: ACCADDR,
                        value: total,
                        gas: 210000,
                    })
                        .on('error', function (err) {
                        showDialog(err);
                    })
                        .on('receipt', function (receipt) {
                        tw.pause();
                        tw = null;
                        textObj.text = "确定下注";
                        showDialog("下注成功，请等待最终赛事结果");
                        var url = "http://39.104.81.103/api/addGuessRecord.php";
                        var contractInfo = JSON.stringify(CONTRACTINFO);
                        contractInfo = contractInfo.replace(/\"/g, "'");
                        var data = {
                            "addr": ACCADDR,
                            "contractAddr": CONCADDR,
                            "contractInfo": contractInfo,
                            "deadline": timestampToTime(CONTRACTINFO[7]),
                            "txType": "投注",
                            "txHash": receipt.transactionHash,
                            "multiple": multiplying,
                            "selected": selected,
                            "liveId": CONTRACTINFO[11]
                        };
                        console.log(data);
                        var request = new egret.HttpRequest();
                        request.responseType = egret.HttpResponseType.TEXT;
                        request.open(url, egret.HttpMethod.POST);
                        request.setRequestHeader("Content-Type", "application/json");
                        request.send(JSON.stringify(data));
                        request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (err) {
                            console.log(err);
                        }, _this);
                    });
                });
            });
        });
    };
    return SubmitBtn;
}(egret.Sprite));
__reflect(SubmitBtn.prototype, "SubmitBtn");
var HopeBonus = (function (_super) {
    __extends(HopeBonus, _super);
    function HopeBonus() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addTextView, _this);
        return _this;
    }
    HopeBonus.prototype.addTextView = function () {
        var estResult = new CreateTextField({ x: 165, y: 1590, width: 750, color: 0x8bffd7, tx: "预计奖金：0 FOF" }).create();
        this.addChild(estResult);
        HopeResult = estResult;
    };
    return HopeBonus;
}(egret.Sprite));
__reflect(HopeBonus.prototype, "HopeBonus");
var ChangeEvent = (function (_super) {
    __extends(ChangeEvent, _super);
    function ChangeEvent() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.getChangeEvent, _this);
        return _this;
    }
    ChangeEvent.prototype.getChangeEvent = function (evt) {
        var arr = [];
        var totalText = "总金额：";
        var hopeText = "预计奖金：";
        var singleBetCoin = Number(CONTRACTINFO[8]);
        var zhusheng;
        if (selected["zhusheng"]) {
            zhusheng = selected["zhusheng"] * Number(multiplying) * singleBetCoin / 100;
            arr.push(zhusheng);
        }
        var ping;
        if (selected["ping"]) {
            ping = selected["ping"] * Number(multiplying) * singleBetCoin / 100;
            arr.push(ping);
        }
        var kesheng;
        if (selected["kesheng"]) {
            kesheng = selected["kesheng"] * Number(multiplying) * singleBetCoin / 100;
            arr.push(kesheng);
        }
        if (arr.length === 0) {
            hopeText = hopeText + "0 FOF";
            totalText = totalText + "0 FOF";
        }
        else {
            totalText = totalText + (arr.length * Number(multiplying) * singleBetCoin) + " FOF";
        }
        if (arr.length === 1) {
            hopeText = hopeText + arr[0] + " FOF";
        }
        if (arr.length > 1) {
            arr.sort(function (a, b) {
                return a - b;
            });
            hopeText = hopeText + arr[0] + " FOF" + " - " + arr[arr.length - 1] + " FOF";
        }
        egret.Tween.get(HopeResult)
            .to({ alpha: 0.2 }, 50)
            .to({ alpha: 1 }, 400);
        HopeResult.text = hopeText;
        TotalAmount.text = totalText;
    };
    return ChangeEvent;
}(egret.Sprite));
__reflect(ChangeEvent.prototype, "ChangeEvent");
var TrigerEvent = (function (_super) {
    __extends(TrigerEvent, _super);
    function TrigerEvent() {
        return _super.call(this) || this;
    }
    TrigerEvent.prototype.sendMsg = function () {
        var hope = new HopeBonusEvent(HopeBonusEvent.Hope);
        this.dispatchEvent(hope);
    };
    return TrigerEvent;
}(egret.Sprite));
__reflect(TrigerEvent.prototype, "TrigerEvent");
var HopeBonusEvent = (function (_super) {
    __extends(HopeBonusEvent, _super);
    function HopeBonusEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, bubbles, cancelable) || this;
    }
    HopeBonusEvent.Hope = "Hope";
    return HopeBonusEvent;
}(egret.Event));
__reflect(HopeBonusEvent.prototype, "HopeBonusEvent");
