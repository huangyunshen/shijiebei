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
    function Records() {
        var _this = _super.call(this) || this;
        /**lang data */
        _this.langData = $ZHTW.record;
        _this.recordList = [];
        /**load Container skin */
        _this.skinName = "resource/eui_modules/RecordUI.exml";
        return _this;
    }
    Records.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.content.layout = setVerticalTop(30);
        this.addRecord();
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
    };
    Records.prototype.closeModal = function () {
        this.visible = false;
    };
    /**添加纪录到界面 */
    Records.prototype.addRecord = function () {
        var _this = this;
        this.getRecord().then(function () {
            if (_this.recordList.length) {
                for (var i = 0; i < _this.recordList.length; i++) {
                    var rec = new RecordPanel(_this.recordList[i]);
                    _this.content.addChild(rec);
                }
            }
        }, function (err) {
            console.log(err);
        });
    };
    /*
    获取下注记录
    */
    Records.prototype.getRecord = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var acc = getActiveAccount();
            if (!acc) {
                _this.recordList = [];
                resolve();
            }
            else {
                var data = {
                    "addr": acc.address,
                    "liveId": CONTRACTINFO[11],
                    "pageSize": 1000,
                    "pageNum": 1
                };
                var request = new egret.HttpRequest();
                request.responseType = egret.HttpResponseType.TEXT;
                request.open(getRecordUrl, egret.HttpMethod.POST);
                request.setRequestHeader("Content-Type", "application/json");
                request.send(JSON.stringify(data));
                request.addEventListener(egret.Event.COMPLETE, function (event) {
                    var request = event.currentTarget;
                    var data = JSON.parse(request.response);
                    if (data.code === "200") {
                        _this.recordList = data.result;
                        resolve();
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
            }
        });
    };
    return Records;
}(eui.Component));
__reflect(Records.prototype, "Records");
