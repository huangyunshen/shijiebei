/** 游戏数据 */
let ACCADDR:string = "0xb98d0cdf093d52618d2dea0ff564470a7b031b7a";    //账户地址
let CONCADDR:string = "0x96CA8748E376fAcc0658C54766B0F0947C327D6E";   //合约地址
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
