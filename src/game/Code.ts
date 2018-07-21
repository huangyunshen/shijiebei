class Code extends egret.Sprite {
    public url:any;

    public constructor(public code:any) {
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
        content.x = 50;
        content.y = 90;

        let bg = createBitmapByName("jilu_bg_png");
        content.addChild(bg);

        let title = new CreateTextField({x: 0, y: 28, width: 350, color: 0x57ffed, tx: `智能合约源码`, size: 54}).create();
        content.addChild(title);
        
        let close = createBitmapByName("close_large_png");
        close.x = 804;
        close.y = -6;
        content.addChild(close);
        close.touchEnabled = true;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
        
        let myScrollView = new egret.ScrollView();
        myScrollView.width = 980;
        myScrollView.height = 1385;
        myScrollView.y = 135

        let sprite = new egret.Sprite();
        sprite.x = 45;
        sprite.y = 40;
        let text = new CreateTextField({x:0, y: 0, width: 885, tx: this.code, size: 34, align:"left"}).create();
        sprite.addChild(text);
        myScrollView.setContent(sprite);
        content.addChild(myScrollView)

        this.addChild(content);
    }
    private closeModal():void {     
        egret.MainContext.instance.stage.removeChild(sourceCode);
        eventButtonCtr(true);
    }
}
