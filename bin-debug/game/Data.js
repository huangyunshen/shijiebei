var web3;
var ethers;
var Wallet = ethers.Wallet;
var CONCADDR = window.location.href.split('?')[1];
var CONTRACTINFO;
var CONTRACTINSTANCE;
var selected = {
    "zhusheng": false,
    "ping": false,
    "kesheng": false
};
var multiplying = "1";
function getBalance(addr, obj, callback) {
    web3.eth.getBalance(addr).then(function (balance) {
        var amount = web3.utils.fromWei(balance, 'ether');
        amount = Number(amount).toFixed(2);
        obj && (obj.text = amount);
        callback && callback(balance);
    });
}
