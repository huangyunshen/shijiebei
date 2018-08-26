//commen data and function 

/**public data */
let web3;
/** 游戏数据 */
const getRecordUrl = `${location.origin}/api/requestGuessRecord.php`;
const setRecordUrl = `${location.origin}/api/addGuessRecord.php`;

//let CONCADDR:string = window.location.href.split('?')[1];   //合约地址
let CONCADDR:string = "0x66F7d7Cb07f3B70Bdbe2Ce0A8f9ec5a94E61B5f4"
let CONTRACTINFO;//合约信息
let CONTRACTINSTANCE;//合约实例

/**modals */
let $Modal:any = {
    dialog:null,
    password:null,
    record:null,
    appinfo:null,
    code:null,
    language:null,
}

/**
 * layout
 */

/**left layout*/
function setHLayoutLeft(gap) {
    let hLayout = new eui.HorizontalLayout();
    hLayout.gap = gap;
    hLayout.horizontalAlign = egret.HorizontalAlign.LEFT;
    return hLayout;
}

/**center horizontal */
function setHLayoutCenter(gap) {
    let hLayout = new eui.HorizontalLayout();
    hLayout.gap = gap;
    hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
    return hLayout;
}

/**top vertical */
function setVerticalTop(gap) {
    let vLayout:eui.VerticalLayout = new eui.VerticalLayout();
    vLayout.gap = gap;
    vLayout.verticalAlign = egret.VerticalAlign.TOP;
    return vLayout; //设置问垂直布局
}


/**
 * timestamp to date
 */
function timestampToTime(timestamp) {
    if(timestamp.length === 10){
        timestamp = timestamp * 1000
    } else {
        timestamp = timestamp * 1
    }
    let date = new Date(timestamp)
    let Y = date.getFullYear() + '.';
    let M = fillZero(date.getMonth() + 1) + '.';
    let D = fillZero(date.getDate()) + ' ';
    let h = fillZero(date.getHours()) + ':';
    let m = fillZero(date.getMinutes()) + ':';
    let s = fillZero(date.getSeconds());
    return Y + M + D + h + m + s
}

function fillZero(time) {
    time = time < 10 ? "0" + time : time;
    return time;
}

/**
 * get balance
 */
function getBalance(addr:string) { 
    return new Promise( (resolve, reject) => {
        web3.eth.getBalance(addr).then( balance => {
            balance = web3.utils.fromWei(balance, 'ether');
            balance = Number(balance).toFixed(2);
            let amount:number = balance;
            resolve(amount)
        }, err => {
            reject(err)
        })
    })
}


/**
 * accounts
 */
function  ifWalletExist() {
    let walletJSON = localStorage.getItem('web3js_wallet')
    if (walletJSON) {
        return walletJSON
    } else {
        return false
    }
}
function  loadWallet(pwd) {
    return web3.eth.accounts.wallet.load(pwd)
}
function  verifyWalletPwd(pwd) {
    return new Promise((resolve, reject) => {
        try {
            let wallet = this.loadWallet(pwd);
            resolve(wallet);
        }
        catch (e) {
            reject(e);
        }
    })
}
function  getActiveAccount() {
    let wallet = web3.eth.accounts.wallet
    let index = localStorage.getItem('active_account')
    let activeAccount:any = wallet[index] || null
    return activeAccount
}

/**show dialog */
function showDialog(msg: string, url: any = null, canBeClose: boolean = true) {
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