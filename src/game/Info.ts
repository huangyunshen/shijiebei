class Info extends egret.Sprite {
    public url:any;

    public constructor() {
        super();
        this.dialogModal();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.dialog, this);
    }

    private dialogModal() {
        let stageW = egret.MainContext.instance.stage.stageWidth;
        let stageH = egret.MainContext.instance.stage.stageHeight;

        let container = new egret.Sprite();
        container.width = stageW;
        container.height = stageH;

        let rect = new egret.Shape();
        rect.graphics.beginFill(0x000000, 0.7);
        rect.graphics.drawRect(0, 0, stageW, stageH);
        rect.graphics.endFill();
        container.addChild(rect);
        rect.touchEnabled = true
        rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);

        this.addChild(container);
    }

    private dialog() {
        let content = new egret.Sprite();
        content.x = 80;
        content.y = 420;

        let bg = createBitmapByName("zjxx_bg_png");
        content.addChild(bg);

        let title = new CreateTextField({x: 0, y: 22, width: 280, tx: `应用信息`, color:0x57ffed}).create();
        content.addChild(title);

        CONTRACTINSTANCE.methods.getPublicData().call()
        .then((data) => {
            console.log(contractBalance)
            let r1 = this.getList(125, 80, 40, "应用名", data[0]);
            content.addChild(r1);
            let r2 = this.getList(235, 126, 80, "创建人地址", data[2]);
            content.addChild(r2);
            let r3 = this.getList(390, 126, 80, "应用地址", CONCADDR);
            content.addChild(r3);
            let r4 = this.getList(547, 80, 40, "创建时间", timestampToTime(data[3]));
            content.addChild(r4);
            let r5 = this.getList(657, 80, 40, "奖池余额", contractBalance + " FOF");
            content.addChild(r5);
            let r6 = this.getList(767, 80, 40, "下注总金额",  web3.utils.fromWei(data[4], 'ether') + " FOF");
            content.addChild(r6);

            this.addChild(content);
        })

    }
    private getList(y, cHeight, tHeight, text1, text2) {
        let content = new egret.Sprite();
        content.x = 29;
        content.y = y;
        content.width = 860;
        content.height = cHeight;
        let rect1 = new egret.Shape();
        rect1.graphics.beginFill(0x60ffcc, 0.17);
        rect1.graphics.drawRoundRect(0, 0, 860,cHeight, 20);
        rect1.graphics.endFill();
        let msg1 =  new CreateTextField({x: 30, y: 24, width: 250, height: tHeight, tx: text1, size: 34, color:0xf0e92f ,align:"left"}).create();
        let msg2 =  new CreateTextField({x: 270, y: 24, width: 560, height: tHeight, tx: text2, size: 34 ,align:"left"}).create();
        content.addChild(rect1);
        content.addChild(msg1);
        content.addChild(msg2);

        return content;
    }
    private closeModal():void {     
        egret.MainContext.instance.stage.removeChild(infoMsg);
        eventButtonCtr(true);
    }
}
