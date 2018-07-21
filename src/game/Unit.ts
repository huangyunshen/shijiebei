let dialog;//消息弹窗
let records;//记录界面
let password;//密码界面
let infoMsg;//应用信息
let contractBalance;//合约余额
let sourceCode;//源码
let myBalance;
let eventButton: Object = {};//保存点击事件的组件，用于批量暂停或打开点击事件
let eventDialog: Object = {};//消息弹窗点击事件，用于批量暂停或打开点击事件

function eventButtonCtr(flag: boolean, show?: boolean) {
    dialog.alpha = show ? 1 : 0;
    for (let key in eventButton) {
        eventButton[key].touchEnabled = flag;
    }
}

function eventDialogCtr(flag: boolean, show?: boolean) {
    dialog.alpha = show ? 1 : 0;
    for (let key in eventDialog) {
        eventDialog[key].touchEnabled = flag;
    }
}

function showDialog(msg: string, url: any = null) {
    dialog.$children[1].$children[3].text = msg;
    dialog.url = url;
    eventButtonCtr(false);
    eventDialogCtr(true, true);
}


/**扩展Bitmap，增加属性 */
class BtnBitmap extends egret.Bitmap {
    public isChoosed: boolean = false; //默认不选中
    public btnName: string;
    public odds: number; //赔率
    public constructor() {
        super();
    }
}

/**
 * 根据name关键字创建一个Bitmap对象。
 */
function createBitmapByName(name: string) {
    let result = new egret.Bitmap();
    let texture: egret.Texture = RES.getRes(name);
    result.texture = texture;
    return result;
}

function createBtnBitmapByName(name: string) {
    let result = new BtnBitmap();
    let texture: egret.Texture = RES.getRes(name);
    result.texture = texture;
    return result;
}

/*
通用创建文字
 */
class CreateTextField {
    private align = "center";   //默认剧中（根据当前项目自定义）
    private color = 0xffffff;   //默认白色（根据当前项目自定义）
    private tx = "";        //默认文字为空（根据当前项目自定义）
    private size = 38;      //默认字号38（根据当前项目自定义）
    public constructor(public obj: {
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        align?: string,
        color?: number,
        tx?: string,
        size?: number
    }) {
    }

    public create() {
        let text = new egret.TextField();
        this.obj.x && (text.x = this.obj.x);
        this.obj.y && (text.y = this.obj.y);
        this.obj.width && (text.width = this.obj.width);
        this.obj.height && (text.height = this.obj.height);
        text.textAlign = this.obj.align ? this.obj.align : this.align;
        text.textColor = this.obj.color ? this.obj.color : this.color;
        text.text = this.obj.tx ? this.obj.tx : this.tx;
        text.size = this.obj.size ? this.obj.size : this.size;
        return text;
    }
}

/*
转换时间
 */
function timestampToTime(timestamp) {
    if(timestamp.length === 10){
        timestamp = timestamp * 1000
    } else {
        timestamp = timestamp * 1
    }
    let date = new Date(timestamp)//时间戳为10位需*1000，时间戳为13位的话不需乘1000
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

/*
获取下注记录
 */
function getRecord(size: number, num: number) {
    return new Promise((resolve, reject) => {
        let url = "/api/requestGuessRecord.php";

        let data = {
            "addr": getActiveAccount().address,
            "liveId": CONTRACTINFO[11],
            "pageSize": size,
            "pageNum": num
        }

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(data));
        request.addEventListener(egret.Event.COMPLETE, (event) => {
            let request = <egret.HttpRequest>event.currentTarget;
            let data = JSON.parse(request.response);
            if(data.code === "200") {
                resolve(data.result);
            } else {
                reject(data)
                console.log(data);
            }
        }, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, (err) => {
            reject(err);
            console.log(err);
        }, this);
    })
}

/**
 * 账户相关
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
    let activeAccount = wallet[index] || new Error('Wallet Is Locked')
    return activeAccount
}
