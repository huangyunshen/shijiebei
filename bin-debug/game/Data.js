var ACCADDR = "0xA5B725E03Ad76Ad9be88CBb3207D5a306C58600f";
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
    web3.eth.getBalance(addr).then(function (data) {
        var amount = web3.utils.fromWei(data, 'ether');
        amount = Number(amount).toFixed(2);
        obj && (obj.text = amount);
        callback && callback(data);
    });
}
