/** 游戏主程序 */
let gameContent;

class Game extends egret.DisplayObjectContainer {

    public constructor() {
        super();

        this.addChild(new Background());
        this.addChild(new HeaderBar());
        this.addChild(new Deadline());
        this.addChild(new RaceParty());
        this.addChild(new BottomPour());
        this.addChild(new Multiple());
        this.addChild(new SubmitBtn());
        this.addChild(new HopeBonus());
        dialog = new Dialog();
        dialog.alpha = 0;
        this.addChild(dialog);
        gameContent = this;

        //在界面渲染完成后启动监听
        CONTRACTINSTANCE.events
            .returnBetResult()
            .on('data', (event) => {
                if (event.returnValues && event.returnValues.code === "205") {
                    showDialog("比赛结束，主客队比分为 " + event.returnValues.hCore + " - " + event.returnValues.vCore);
                }
            })
            .on('error', (err) => {
                console.log(err)
            })
    }
}

let TotalAmount: egret.TextField;
let HopeResult: egret.TextField;

/**
 * 背景
 */
class Background extends egret.Sprite {
    public constructor() {
        super();
        this.background();
    }
    private background() {
        let stageW = egret.MainContext.instance.stage.stageWidth;
        let stageH = egret.MainContext.instance.stage.stageHeight;

        let sky = createBitmapByName("bg_png");
        this.addChild(sky);
        sky.width = stageW;
        sky.height = stageH;
    }
}

/** 顶部内容 */
class HeaderBar extends egret.Sprite {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.drawStaticRes, this);

    }

    private drawStaticRes() {

        let homeIcon: egret.Bitmap = createBitmapByName("icon_home_png");
        this.addChild(homeIcon);
        eventButton["homeIcon"] = homeIcon;
        homeIcon.x = 31;
        homeIcon.y = 28;

       /* let walletIcon: egret.Bitmap = createBitmapByName("icon_wallet_png");
        this.addChild(walletIcon);
        eventButton["walletIcon"] = walletIcon;
        walletIcon.x = 177;
        walletIcon.y = 28;*/

        let recordIcon: egret.Bitmap = createBitmapByName("icon_jl_png");
        this.addChild(recordIcon);
        eventButton["recordIcon"] = recordIcon;
        recordIcon.x = 177;
        recordIcon.y = 28;
        recordIcon.touchEnabled = true;
        recordIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openRecord, this);

        /*let shareIcon: egret.Bitmap = createBitmapByName("icon_share_png");
        this.addChild(shareIcon);
        eventButton["shareIcon"] = shareIcon;
        shareIcon.x = 470;
        shareIcon.y = 28;*/

        this.myBalance();
        this.myCurrentBalance();
    }

    private myBalance() {

        let fofIcon1: egret.Bitmap = createBitmapByName("fof_bg_png");
        this.addChild(fofIcon1);
        fofIcon1.x = 740;
        fofIcon1.y = 130;
        fofIcon1.scaleX=0.8;
        fofIcon1.scaleY=0.8;

        let balance = new CreateTextField({x: 770, y: 155, width: 300, tx: "0", size: 40}).create();
        this.addChild(balance);

        if (ACCADDR)
            getBalance(ACCADDR, balance)
        setInterval(() => {
            getBalance(ACCADDR, balance)
        }, 3000)
    }

    private myCurrentBalance(){

        let coinTotal:egret.Bitmap=createBitmapByName("icon_jc_png");
        this.addChild(coinTotal);
        coinTotal.x=740;
        coinTotal.y=28;
        coinTotal.scaleX=0.8;
        coinTotal.scaleY=0.8;
        let balanceTotal = new CreateTextField({x: 770, y: 55, width: 300, tx: "0", size: 40}).create();
        this.addChild(balanceTotal);
        getCurrentBalance( balanceTotal);
        setInterval(() => {
            getCurrentBalance( balanceTotal)
        }, 3000)

    }

    private openRecord() {
        // let arr = [
        //     {
        //         Name: "世界杯",
        //         time: 1531069385000,
        //         info: CONTRACTINFO,
        //         selected: {"zhusheng": true, "ping": false, "kesheng": false,},
        //         multiple: "5",
        //         hScore: 3,
        //         vScore: 1
        //     }
        // ]
        eventButtonCtr(false);
        getRecord(5,1).then((res) => {
            console.log(res);
            records = new Records(res);
            egret.MainContext.instance.stage.addChild(records);
        }, (err) => {
            eventButtonCtr(true);
            console.log(err);
        });
    }
}

/*
截止时间
 */
class Deadline extends egret.Sprite {
    public constructor() {
        super();
        this.deadline();
    }

    private deadline() {
        let container = new egret.Sprite();
        container.x = 215;
        container.y = 235;

        let rect = new egret.Shape();
        container.addChild(rect);
        rect.graphics.beginFill(0x022617, 0.5);
        rect.graphics.drawRoundRect(0, 0, 600, 62, 20);
        rect.graphics.endFill();

        let time = timestampToTime(CONTRACTINFO[7]);
        let text = new CreateTextField({y: 13, width: 600, color: 0xc6f1ff, tx: `下注截止时间  ${time}`, size: 36}).create();
        container.addChild(text);

        this.addChild(container);
    }
}

/*
竞赛方
 */
class RaceParty extends egret.Sprite {
    public constructor() {
        super();
        this.raceParty();
    }

    private raceParty() {
        let container = new egret.Sprite();
        container.width = 1020;
        container.height = 427;
        container.x = 30;
        container.y = 300;

        let bg = createBitmapByName("vs_bg_png");
        container.addChild(bg);

        let homeTeam = createBitmapByName("contry1_png");
        homeTeam.x = 145;
        homeTeam.y = 85;
        container.addChild(homeTeam);

        let visitingTeam = createBitmapByName("contry2_png");
        visitingTeam.x = 630;
        visitingTeam.y = 85;
        container.addChild(visitingTeam);

        let text1 = new CreateTextField({
            x: 141,
            y: 250,
            width: 250,
            color: 0xc6f1ff,
            tx: `${CONTRACTINFO[2]}`,
            size: 30
        }).create();
        container.addChild(text1);

        let text2 = new CreateTextField({x: 625, y: 250, width: 250, tx: `${CONTRACTINFO[3]}`, size: 30}).create();
        container.addChild(text2);

        if (CONTRACTINFO[9] !== "0") {
            let concede = this.concededPoints(200, 350, CONTRACTINFO[9]);
            container.addChild(concede);
        }
        if (CONTRACTINFO[10] !== "0") {
            let concede = this.concededPoints(685, 350, CONTRACTINFO[10]);
            container.addChild(concede);
        }

        this.addChild(container);
    }

    private concededPoints(x: number, y: number, t: string) {
        let container = new egret.Sprite();
        container.x = x;
        container.y = y;
        let rect = new egret.Shape();
        rect.graphics.beginFill(0x074520, 1);
        rect.graphics.drawRoundRect(0, 0, 136, 48, 20);
        rect.graphics.endFill();
        container.addChild(rect);
        let text = new CreateTextField({x: 0, y: 8, width: 136, color: 0xff9d55, tx: `让${t}球`, size: 36}).create();
        container.addChild(text);
        return container;
    }

}

/**
 * 下注
 */
class BottomPour extends egret.Sprite {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.bottomPour, this);
    }

    private btnWidth: number = 328;
    private btnHeight: number = 280;

    private bottomPour() {
        let text1 = (t: string) => {
            let text = new CreateTextField({y: 43, width: this.btnWidth, tx: t, size: 48}).create();
            return text;
        }
        let text2 = (t: string) => {
            let text = new CreateTextField({y: 119, width: this.btnWidth, color: 0xfedc01, tx: t}).create();
            return text;
        }

        let container1 = new egret.Sprite();
        container1.width = this.btnWidth;
        container1.height = this.btnHeight;
        container1.x = 28;
        container1.y = 755;
        container1.$anchorOffsetX = container1.width / 2;
        container1.$anchorOffsetY = container1.height / 2;
        container1.x = container1.x + container1.width / 2;
        container1.y = container1.y + container1.height / 2;
        let btn1: BtnBitmap = createBtnBitmapByName("btn_1_png");
        btn1.btnName = "zhusheng";
        btn1.odds = Number(CONTRACTINFO[4]);
        container1.addChild(btn1);
        eventButton["btn1"] = btn1;
        container1.addChild(text1("主胜"));
        container1.addChild(text2((CONTRACTINFO[4] / 100).toString()));
        this.addChild(container1);
        btn1.touchEnabled = true;
        btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabBottomPour.bind(this, container1), this);


        let container2 = new egret.Sprite();
        container2.width = this.btnWidth;
        container2.height = this.btnHeight;
        container2.x = 378;
        container2.y = 755;
        container2.$anchorOffsetX = container2.width / 2;
        container2.$anchorOffsetY = container2.height / 2;
        container2.x = container2.x + container2.width / 2;
        container2.y = container2.y + container2.height / 2;
        let btn2: BtnBitmap = createBtnBitmapByName("btn_1_png");
        btn2.btnName = "ping";
        btn2.odds = Number(CONTRACTINFO[5]);
        container2.addChild(btn2);
        eventButton["btn2"] = btn2;
        container2.addChild(text1("平"));
        container2.addChild(text2((CONTRACTINFO[5] / 100).toString()));
        this.addChild(container2);
        btn2.touchEnabled = true;
        btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabBottomPour.bind(this, container2), this);

        let container3 = new egret.Sprite();
        container3.width = this.btnWidth;
        container3.height = this.btnHeight;
        container3.x = 728;
        container3.y = 755;
        container3.$anchorOffsetX = container3.width / 2;
        container3.$anchorOffsetY = container3.height / 2;
        container3.x = container3.x + container3.width / 2;
        container3.y = container3.y + container3.height / 2;
        let btn3: BtnBitmap = createBtnBitmapByName("btn_1_png");
        btn3.btnName = "kesheng";
        btn3.odds = Number(CONTRACTINFO[6]);
        container3.addChild(btn3);
        eventButton["btn3"] = btn3;
        container3.addChild(text1("客胜"));
        container3.addChild(text2((CONTRACTINFO[6] / 100).toString()));
        this.addChild(container3);
        btn3.touchEnabled = true;
        btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabBottomPour.bind(this, container3), this);
    }

    /** 下注事件 */
    private onTabBottomPour(container, e: egret.TouchEvent): void {
        if (e.target.isChoosed) {
            e.target.texture = RES.getRes("btn_1_png");
            selected[e.target.btnName] = null;
        } else {
            e.target.texture = RES.getRes("btn_2_png");
            selected[e.target.btnName] = e.target.odds;

            egret.Tween.get(container)
                .to({scaleX: 0.98, scaleY: 0.98}, 100, egret.Ease.circIn)
                .to({scaleX: 1, scaleY: 1}, 100, egret.Ease.circIn);
        }
        e.target.isChoosed = !e.target.isChoosed;
        let triger = new TrigerEvent();
        let change = new ChangeEvent();
        triger.addEventListener(HopeBonusEvent.Hope, change.getChangeEvent, change);
        triger.sendMsg();
        triger.removeEventListener(HopeBonusEvent.Hope, change.getChangeEvent, change);
    }
}

/**
 * 倍率
 */

class Multiple extends egret.Sprite {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.multiple, this);
    }

    private multiple() {

        let background: egret.Bitmap = createBitmapByName("beilv_bg_png");
        this.addChild(background);
        background.x = 40;
        background.y = 989;

        let beilv = new CreateTextField({x: 80, y: 1006, width: 100, tx: "倍率", size: 42}).create();
        this.addChild(beilv);

        let danzhu = new CreateTextField({
            x: 200,
            y: 1088,
            width: 680,
            color: 0x53fc9b,
            tx: `单注金额：${CONTRACTINFO[8]} FOF`
        }).create();
        this.addChild(danzhu);


        let container = new egret.Sprite();
        this.addChild(container);

        let inputBorder = new egret.Shape();
        inputBorder.graphics.lineStyle(2, 0x2B7B62, 1);
        inputBorder.graphics.beginFill(0x062911, 0.3);
        inputBorder.graphics.drawRoundRect(200, 1144, 680, 100, 20);
        inputBorder.graphics.endFill();
        container.addChild(inputBorder);

        let txInput = new CreateTextField({
            x: 210,
            y: 1166,
            width: 660,
            height: 100,
            color: 0xffdd02,
            tx: "1",
            size: 54
        }).create();
        txInput.type = egret.TextFieldType.INPUT;
        container.addChild(txInput);
        eventButton["txInput"] = txInput;
        txInput.addEventListener(egret.Event.CHANGE, this.onMultipleInput, this);

        let zong = new CreateTextField({x: 200, y: 1273, width: 680, color: 0x53fc9b, tx: "总金额：0FOF"}).create();
        this.addChild(zong);
        TotalAmount = zong;

        let btnLeft: BtnBitmap = createBtnBitmapByName("btn_jian_png");
        this.addChild(btnLeft);
        eventButton["btnLeft"] = btnLeft;
        btnLeft.x = 80;
        btnLeft.y = 1144;
        btnLeft.btnName = "minus"
        btnLeft.touchEnabled = true;
        btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMultipleClick.bind(this, txInput), this);

        let btnRight: BtnBitmap = createBtnBitmapByName("btn_jia_png");
        this.addChild(btnRight);
        eventButton["btnRight"] = btnRight;
        btnRight.x = 900;
        btnRight.y = 1144;
        btnRight.btnName = "add"
        btnRight.touchEnabled = true;
        btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMultipleClick.bind(this, txInput), this);
    }

    /**倍率加减事件 */
    private onMultipleInput(e: egret.TouchEvent): void {
        e.target.text = e.target.text.replace(/[^\d]/g, "");
        let num = Number(e.target.text);
        if (num < 1) {
            e.target.text = "1";
        }
        if (num > 99) {
            e.target.text = "99";
        }
        multiplying = e.target.text;
        console.log(multiplying);

        if (selected["zhusheng"] || selected["ping"] || selected["kesheng"]) {

            let triger = new TrigerEvent();
            let change = new ChangeEvent();
            triger.addEventListener(HopeBonusEvent.Hope, change.getChangeEvent, change);
            triger.sendMsg();
            triger.removeEventListener(HopeBonusEvent.Hope, change.getChangeEvent, change);
        }
    }

    private onMultipleClick(txInput, e: egret.Event): void {
        let num = Number(txInput.text);
        if (e.target.btnName === 'add' && num < 99) {
            num++;
        } else if (e.target.btnName === 'minus' && num > 1) {
            num--;
        }
        multiplying = txInput.text = String(num);
        console.log(multiplying);

        if (selected["zhusheng"] || selected["ping"] || selected["kesheng"]) {

            let triger = new TrigerEvent();
            let change = new ChangeEvent();
            triger.addEventListener(HopeBonusEvent.Hope, change.getChangeEvent, change);
            triger.sendMsg();
            triger.removeEventListener(HopeBonusEvent.Hope, change.getChangeEvent, change);
        }
    }
}

/*
确认下注按钮
 */
class SubmitBtn extends egret.Sprite {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.submit, this);
    }

    private submit() {
        let container = new egret.Sprite();
        container.x = 165;
        container.y = 1429;
        let rect = new egret.Shape();
        container.addChild(rect);
        rect.graphics.beginFill(0xf0e92f);
        rect.graphics.drawRoundRect(0, 0, 750, 124, 10);
        rect.graphics.endFill();

        let btnText = new CreateTextField({y: 35, width: 750, color: 0x5a3c0c, tx: "确定下注", size: 56}).create();
        container.addChild(btnText);
        this.addChild(container);
        eventButton["container"] = container;

        container.touchEnabled = true;
        container.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submitEvent.bind(this, container), this);
    }

    private submitEvent(obj, e: egret.TouchEvent): void {

        if (!ACCADDR) {
            showDialog("未登录，点击确定跳转登陆");
            return;
        }

        let num = 0;        //下注方的数量
        let total;          //下注总金额
        let maxOdds = [];   //下注方对应的赔率
        let arr = [-1, -1, -1];//下注方
        if (selected["zhusheng"]) {
            arr[0] = 0;
            num++;
            maxOdds.push(Number(CONTRACTINFO[4]));
        }
        if (selected["ping"]) {
            arr[1] = 2;
            num++;
            maxOdds.push(Number(CONTRACTINFO[5]));
        }
        if (selected["kesheng"]) {
            arr[2] = 1;
            num++;
            maxOdds.push(Number(CONTRACTINFO[6]));
        }
        total = num * Number(multiplying) * Number(CONTRACTINFO[8]) * 1e18; //总下注金额 = 下注方的数量*倍率*单注金额*10的18次方

        if (arr[0] === -1 && arr[1] === -1 && arr[2] === -1) {
            showDialog("请选择下注方");
            return;
        }

        getBalance(ACCADDR, null, (data) => {
            if (total > data) {
                showDialog("余额不足，请充值");
                return;
            }

            CONTRACTINSTANCE.methods.getNow().call().then((now) => {  //获取当前时间
                now = now + 10000 //纠正10秒
                if (now > CONTRACTINFO[7]) {
                    showDialog("已过下注截止时间 " + timestampToTime(CONTRACTINFO[7]));
                    return;
                }
                CONTRACTINSTANCE.methods.availableBalance().call().then((balance) => {  //获取奖池可用余额
                    maxOdds.sort((a, b) => {
                        return a - b
                    });
                    let maximum = total / num * maxOdds[maxOdds.length - 1] / 100;    //可能的最大奖金，用于计算奖池剩余可用奖金
                    if (maximum > balance) {
                        showDialog("奖池可用余额不足，下注金额大于奖池可用余额");
                        return;
                    }
                    let textObj = obj.$children[1]
                    textObj.text = "正在下注...";

                    let tw = egret.Tween.get(textObj, {loop: true});//开始动画
                    tw.to({alpha: 0.2}, 1000);
                    tw.to({alpha: 1}, 1000);

                    eventButtonCtr(false); //关闭其他按钮点击事件

                    CONTRACTINSTANCE.methods.betFun(ACCADDR, arr, total, num, maximum)
                        .send({
                            from: ACCADDR,
                            // gasPrice: 200000000000,
                            value: total,
                            gas: 210000,
                        })
                        .on('error', (err) => {
                            showDialog(err);
                        })
                        .on('receipt', (receipt) => {
                            tw.pause();             //停止动画
                            tw = null;
                            textObj.text = "确定下注";
                            showDialog("下注成功，请等待最终赛事结果");
                            let url = "http://39.104.81.103/api/addGuessRecord.php";

                            let contractInfo = JSON.stringify(CONTRACTINFO)
                            contractInfo = contractInfo.replace(/\"/g, "'")
                            let data = {
                                "addr": ACCADDR,
                                "contractAddr": CONCADDR,
                                "contractInfo": contractInfo,
                                "deadline": timestampToTime(CONTRACTINFO[7]),
                                "txType": "投注",
                                "txHash": receipt.transactionHash,
                                "multiple": multiplying,
                                "selected": selected,
                                "liveId": CONTRACTINFO[11]
                            }
                            console.log(data);

                            // let eeeeeeefe = JSON.parse(str.replace(/\'/g,'"'))
                            // console.log(eeeeeeefe);

                            let request = new egret.HttpRequest();
                            request.responseType = egret.HttpResponseType.TEXT;
                            request.open(url, egret.HttpMethod.POST);
                            request.setRequestHeader("Content-Type", "application/json");
                            request.send(JSON.stringify(data));
                            // request.addEventListener(egret.Event.COMPLETE, (event) => {
                            // let request = <egret.HttpRequest>event.currentTarget;
                            // console.log(request);
                            // }, this);
                            request.addEventListener(egret.IOErrorEvent.IO_ERROR, (err) => {
                                console.log(err);
                            }, this);

                        })
                });
            });
        })
    }
}

/*
预计奖金
 */
class HopeBonus extends egret.Sprite {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addTextView, this);
    }

    private addTextView() {
        let estResult = new CreateTextField({x: 165, y: 1590, width: 750, color: 0x8bffd7, tx: "预计奖金：0 FOF"}).create();
        this.addChild(estResult);
        HopeResult = estResult;
    }
}

/*
改变事件
 */
class ChangeEvent extends egret.Sprite {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.getChangeEvent, this);
    }

    public getChangeEvent(evt: HopeBonusEvent) {
        let arr = [];
        let totalText = "总金额：";
        let hopeText = "预计奖金：";
        const singleBetCoin: number = Number(CONTRACTINFO[8]);
        let zhusheng;
        if (selected["zhusheng"]) {
            zhusheng = selected["zhusheng"] * Number(multiplying) * singleBetCoin / 100;
            arr.push(zhusheng);
        }
        let ping;
        if (selected["ping"]) {
            ping = selected["ping"] * Number(multiplying) * singleBetCoin / 100;
            arr.push(ping);
        }
        let kesheng;
        if (selected["kesheng"]) {
            kesheng = selected["kesheng"] * Number(multiplying) * singleBetCoin / 100;
            arr.push(kesheng);
        }

        if (arr.length === 0) {
            hopeText = hopeText + "0 FOF";
            totalText = totalText + "0 FOF";
        } else {
            totalText = totalText + (arr.length * Number(multiplying) * singleBetCoin) + " FOF";
        }
        if (arr.length === 1) {
            hopeText = hopeText + arr[0] + " FOF";
        }
        if (arr.length > 1) {
            arr.sort((a, b) => {
                return a - b
            })
            hopeText = hopeText + arr[0] + " FOF" + " - " + arr[arr.length - 1] + " FOF";
        }
        egret.Tween.get(HopeResult)
            .to({alpha: 0.2}, 50)
            .to({alpha: 1}, 400)
        HopeResult.text = hopeText;
        TotalAmount.text = totalText;
    }
}

/*
触发事件类
 */
class TrigerEvent extends egret.Sprite {
    public constructor() {
        super();
    }

    public sendMsg() {
        let hope: HopeBonusEvent = new HopeBonusEvent(HopeBonusEvent.Hope);
        this.dispatchEvent(hope);
    }
}

/*
预计奖金时间类
 */
class HopeBonusEvent extends egret.Event {
    public static Hope: string = "Hope";

    public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }
}