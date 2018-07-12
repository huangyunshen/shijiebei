/** 游戏数据 */
let ACCADDR:string = "0xA5B725E03Ad76Ad9be88CBb3207D5a306C58600f";    //账户地址
// let CONCADDR:string = "0xFc95083B18E649FB53C2e0856ef8Eb5E917E94b2";   //合约地址
let CONCADDR:string = window.location.href.split('?')[1];   //合约地址
let CONTRACTINFO;//合约信息
let CONTRACTINSTANCE;//合约实例

let selected:Object = { //选择的下注方。
    "zhusheng":false,
    "ping":false,
    "kesheng":false
};
let multiplying:string = "1"; //倍率

function getBalance(addr:string, obj?:any, callback?:Function) {
    web3.eth.getBalance(addr).then((data) => {
        let amount = web3.utils.fromWei(data, 'ether');
        amount = Number(amount).toFixed(2);
        obj && (obj.text = amount);
        callback && callback(data);
    })
}
