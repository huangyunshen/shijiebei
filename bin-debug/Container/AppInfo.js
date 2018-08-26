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
var AppInfo = (function (_super) {
    __extends(AppInfo, _super);
    function AppInfo() {
        var _this = _super.call(this) || this;
        /**lang data */
        _this.langData = $ZHTW.appinfo;
        _this.data = {
            name: CONTRACTINFO[1],
            creator: '',
            appAddr: CONCADDR,
            creatTime: '',
            balance: '',
            historyTotalCoins: ''
        };
        /**load Container skin */
        _this.skinName = "resource/eui_modules/AppInfoUI.exml";
        return _this;
    }
    AppInfo.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.getPublicData();
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
    };
    AppInfo.prototype.closeModal = function () {
        this.visible = false;
    };
    AppInfo.prototype.getPublicData = function () {
        var _this = this;
        CONTRACTINSTANCE.methods.getPublicData().call().then(function (data) {
            _this.data.creator = data[2];
            _this.data.creatTime = timestampToTime(data[3]);
            _this.data.historyTotalCoins = web3.utils.fromWei(data[4], 'ether') + ' FOF';
        }, function (err) {
            console.log(err);
        });
        getBalance(CONCADDR).then(function (balance) {
            _this.data.balance = balance + ' FOF';
        }, function (err) {
            console.log(err);
        });
    };
    return AppInfo;
}(eui.Component));
__reflect(AppInfo.prototype, "AppInfo");
