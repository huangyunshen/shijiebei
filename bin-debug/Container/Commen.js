//commen data and function 
/**public data */
var web3;
/** 游戏数据 */
var getRecordUrl = location.origin + "/api/requestGuessRecord.php";
var setRecordUrl = location.origin + "/api/addGuessRecord.php";
//let CONCADDR:string = window.location.href.split('?')[1];   //合约地址
var CONCADDR = "0x66F7d7Cb07f3B70Bdbe2Ce0A8f9ec5a94E61B5f4";
var CONTRACTINFO; //合约信息
var CONTRACTINSTANCE; //合约实例
/**modals */
var $Modal = {
    dialog: null,
    password: null,
    record: null,
    appinfo: null,
    code: null,
    language: null,
};
/**
 * layout
 */
/**left layout*/
function setHLayoutLeft(gap) {
    var hLayout = new eui.HorizontalLayout();
    hLayout.gap = gap;
    hLayout.horizontalAlign = egret.HorizontalAlign.LEFT;
    return hLayout;
}
/**center horizontal */
function setHLayoutCenter(gap) {
    var hLayout = new eui.HorizontalLayout();
    hLayout.gap = gap;
    hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
    return hLayout;
}
/**top vertical */
function setVerticalTop(gap) {
    var vLayout = new eui.VerticalLayout();
    vLayout.gap = gap;
    vLayout.verticalAlign = egret.VerticalAlign.TOP;
    return vLayout; //设置问垂直布局
}
/**
 * timestamp to date
 */
function timestampToTime(timestamp) {
    if (timestamp.length === 10) {
        timestamp = timestamp * 1000;
    }
    else {
        timestamp = timestamp * 1;
    }
    var date = new Date(timestamp);
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
/**
 * get balance
 */
function getBalance(addr) {
    return new Promise(function (resolve, reject) {
        web3.eth.getBalance(addr).then(function (balance) {
            balance = web3.utils.fromWei(balance, 'ether');
            balance = Number(balance).toFixed(2);
            var amount = balance;
            resolve(amount);
        }, function (err) {
            reject(err);
        });
    });
}
/**
 * accounts
 */
function ifWalletExist() {
    var walletJSON = localStorage.getItem('web3js_wallet');
    if (walletJSON) {
        return walletJSON;
    }
    else {
        return false;
    }
}
function loadWallet(pwd) {
    return web3.eth.accounts.wallet.load(pwd);
}
function verifyWalletPwd(pwd) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        try {
            var wallet = _this.loadWallet(pwd);
            resolve(wallet);
        }
        catch (e) {
            reject(e);
        }
    });
}
function getActiveAccount() {
    var wallet = web3.eth.accounts.wallet;
    var index = localStorage.getItem('active_account');
    var activeAccount = wallet[index] || null;
    return activeAccount;
}
/**show dialog */
function showDialog(msg, url, canBeClose) {
    if (url === void 0) { url = null; }
    if (canBeClose === void 0) { canBeClose = true; }
    $Modal.dialog.msg = msg;
    $Modal.dialog.url = url;
    $Modal.dialog.canBeClose = canBeClose;
    $Modal.dialog.visible = true;
    egret.Tween.get($Modal.dialog.$children[1])
        .to({ scaleX: 0.5, scaleY: 0.5 }, 0, egret.Ease.circIn)
        .to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.circIn);
}
/**show password */
function showPassword() {
    $Modal.password.pwd = '';
    $Modal.password.visible = true;
    egret.Tween.get($Modal.password.$children[1])
        .to({ scaleX: 0.5, scaleY: 0.5 }, 0, egret.Ease.circIn)
        .to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.circIn);
}
