
var web3;
var ethers;
var Wallet = ethers.Wallet;
/** 游戏数据 */
// let CONCADDR:string = window.location.href.split('?')[1];   //合约地址
let CONCADDR:string = "0x839f077B4EFDCe7c65461d96217313F82D118451"
let CONTRACTINFO;//合约信息
let CONTRACTINSTANCE;//合约实例

let selected:Object = { //选择的下注方。
    "zhusheng":false,
    "ping":false,
    "kesheng":false
};
let multiplying:string = "1"; //倍率

function getBalance(addr:string, obj?:any, callback?:Function) {    //获取余额
    web3.eth.getBalance(addr).then((balance) => {
        let amount = web3.utils.fromWei(balance, 'ether');
        amount = Number(amount).toFixed(2);
        obj && (obj.text = amount);
        callback && callback(balance);
    })
}