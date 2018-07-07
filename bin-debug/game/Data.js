var ACCADDR = "0xb98d0cdf093d52618d2dea0ff564470a7b031b7a";
var CONCADDR = "0x96CA8748E376fAcc0658C54766B0F0947C327D6E";
var CONTRACTINFO;
var CONTRACTINSTANCE;
var selected = {
    "zhusheng": false,
    "ping": false,
    "kesheng": false
};
var multiplying = "1";
function getBalance(addr, obj, callback) {
    web3.eth.getBalance(addr).then(function (data) {
        var amount = web3.utils.fromWei(data, 'ether');
        amount = Number(amount).toFixed(2);
        obj && (obj.text = amount);
        callback && callback(data);
    });
}
