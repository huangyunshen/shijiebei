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
var dialog;
var records;
var eventButton = {};
var eventDialog = {};
function eventButtonCtr(flag, show) {
    dialog.alpha = show ? 1 : 0;
    for (var key in eventButton) {
        eventButton[key].touchEnabled = flag;
    }
}
function eventDialogCtr(flag, show) {
    dialog.alpha = show ? 1 : 0;
    for (var key in eventDialog) {
        eventDialog[key].touchEnabled = flag;
    }
}
function showDialog(msg, url) {
    if (url === void 0) { url = null; }
    dialog.$children[1].$children[3].text = msg;
    dialog.url = url;
    eventButtonCtr(false);
    eventDialogCtr(true, true);
}
var BtnBitmap = (function (_super) {
    __extends(BtnBitmap, _super);
    function BtnBitmap() {
        var _this = _super.call(this) || this;
        _this.isChoosed = false;
        return _this;
    }
    return BtnBitmap;
}(egret.Bitmap));
__reflect(BtnBitmap.prototype, "BtnBitmap");
function createBitmapByName(name) {
    var result = new egret.Bitmap();
    var texture = RES.getRes(name);
    result.texture = texture;
    return result;
}
function createBtnBitmapByName(name) {
    var result = new BtnBitmap();
    var texture = RES.getRes(name);
    result.texture = texture;
    return result;
}
var CreateTextField = (function () {
    function CreateTextField(obj) {
        this.obj = obj;
        this.align = "center";
        this.color = 0xffffff;
        this.tx = "";
        this.size = 38;
    }
    CreateTextField.prototype.create = function () {
        var text = new egret.TextField();
        this.obj.x && (text.x = this.obj.x);
        this.obj.y && (text.y = this.obj.y);
        this.obj.width && (text.width = this.obj.width);
        this.obj.height && (text.height = this.obj.height);
        text.textAlign = this.obj.align ? this.obj.align : this.align;
        text.textColor = this.obj.color ? this.obj.color : this.color;
        text.text = this.obj.tx ? this.obj.tx : this.tx;
        text.size = this.obj.size ? this.obj.size : this.size;
        return text;
    };
    return CreateTextField;
}());
__reflect(CreateTextField.prototype, "CreateTextField");
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1);
    var Y = date.getFullYear() + '.';
    var M = fillZero(date.getMonth() + 1) + '.';
    var D = fillZero(date.getDate()) + ' ';
    var h = fillZero(date.getHours()) + ':';
    var m = fillZero(date.getMinutes()) + ':';
    var s = fillZero(date.getSeconds());
    return Y + M + D + h + m + s;
}
function fillZero(time) {
    time = time < 10 ? "0" + time : time;
    return time;
}
function getRecord(size, num) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        var url = "http://39.104.81.103/api/requestGuessRecord.php";
        var data = {
            "addr": ACCADDR,
            "liveId": CONTRACTINFO[11],
            "pageSize": size,
            "pageNum": num
        };
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(data));
        request.addEventListener(egret.Event.COMPLETE, function (event) {
            var request = event.currentTarget;
            var data = JSON.parse(request.response);
            if (data.code === "200") {
                resolve(data.result);
            }
            else {
                reject(data);
                console.log(data);
            }
        }, _this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (err) {
            reject(err);
            console.log(err);
        }, _this);
    });
}
