class Dialog extends egret.Sprite {
    // public msg: string = "客官您好";
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

        this.addChild(container);
    }

    private dialog() {
        let content = new egret.Sprite();
        content.x = 135;
        content.y = 610;

        let bg = createBitmapByName("tuanchuang_png");
        content.addChild(bg);

        let title = new CreateTextField({x: 0, y: 22, width: 280, tx: `提示`}).create();
        content.addChild(title);

        let close = createBitmapByName("close_small_png");
        close.x = 642;
        close.y = -5;
        content.addChild(close);
        eventDialog["close"] = close;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal.bind(this,false), this);

        let message = new CreateTextField({x: 45, y: 160, width: 695,height:100, tx: ""}).create();
        message.verticalAlign = egret.VerticalAlign.MIDDLE;
        content.addChild(message);

        let submit = new egret.Sprite();
        submit.x = 270;
        submit.y = 340;

        let submitBtn = new egret.Shape();
        submitBtn.graphics.beginFill(0xf0e92f);
        submitBtn.graphics.drawRoundRect(0, 0, 260, 90, 20);
        submitBtn.graphics.endFill();
        submit.addChild(submitBtn);
        eventDialog["submit"] = submit;
        submit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submitEvent.bind(this,false), this);

        let submitText = new CreateTextField({x: 0, y: 26, width: 260, color: 0x5a3c0c, tx: "确定", size: 42}).create();
        submit.addChild(submitText);
        content.addChild(submit);

        this.addChild(content);
    }
    private closeModal(flag:boolean):void {
        eventButtonCtr(!flag);
        eventDialogCtr(flag);
    }
    private  submitEvent(flag:boolean):void {
        if(dialog.url){
            console.log(dialog.url);
            location.href = dialog.url;
        }
        this.closeModal(flag)
    }
}
