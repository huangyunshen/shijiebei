class Password extends egret.Sprite {

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

        let title = new CreateTextField({x: 0, y: 22, width: 280, tx: `请输入钱包密码`, color: 0x57ffed}).create();
        content.addChild(title);

        let close = createBitmapByName("close_small_png");
        close.x = 642;
        close.y = -5;
        content.addChild(close);
        close.touchEnabled = true;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);

        let inputBorder = new egret.Shape();
        inputBorder.graphics.lineStyle(2, 0x2B7B62, 1);
        inputBorder.graphics.beginFill(0x062911, 0.3);
        inputBorder.graphics.drawRoundRect(50,170, 680, 100, 20);
   
        inputBorder.graphics.endFill();
        content.addChild(inputBorder);

        let txInput = new CreateTextField({
            x: 60,
            y: 195,
            width: 660,
            height: 100,
            color: 0xffdd02,
            tx: "",
            size: 54
        }).create();
        txInput.type = egret.TextFieldType.INPUT;
        txInput.displayAsPassword = true
        txInput.inputType = "password"
        content.addChild(txInput);

        let submit = new egret.Sprite();
        submit.x = 270;
        submit.y = 340;

        let submitBtn = new egret.Shape();
        submitBtn.graphics.beginFill(0xf0e92f);
        submitBtn.graphics.drawRoundRect(0, 0, 300, 90, 20);
        submitBtn.graphics.endFill();
        submit.addChild(submitBtn);

        let submitText = new CreateTextField({x: 0, y: 26, width: 300, color: 0x5a3c0c, tx: "确定", size: 42}).create();
        submit.addChild(submitText);
        content.addChild(submit);

        submit.touchEnabled = true;
        submit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submitEvent.bind(this, txInput, submitText, close, submitBtn), this);

        this.addChild(content);
    }
    private closeModal(){
        egret.MainContext.instance.stage.removeChild(password);
        password = null;
        eventButtonCtr(true);
    }
    private  submitEvent(input, submitText, close, submitBtn) {

        submitText.text = "正在解锁钱包...";  
        let tw = egret.Tween.get(submitText, {loop: true});//开始动画
        tw.to({alpha: 0.2}, 1000);
        tw.to({alpha: 1}, 1000);
        close.toucheEnabled = false;
        submitBtn.toucheEnabled = false;

        let promise = verifyWalletPwd(input.text)

        promise.then(() => {
                let wallet = getActiveAccount()                 
                if (wallet.address) {
                    getBalance(wallet.address, myBalance)
                    setInterval(() => {
                        getBalance(getActiveAccount().address, myBalance)
                    }, 3000)
                }
                // web3.eth.accounts.wallet.myPwd = input.text;
                tw.pause();             //停止动画
                tw = null;
                this.closeModal()
            }, (err) => {
                submitText.text = "密码不正确"; 
                setTimeout(() => {
                    tw.pause();             //停止动画
                    tw = null;
                    submitText.text = "确定";
                    
                    close.toucheEnabled = true;
                    submitBtn.toucheEnabled = true;
                },4000)
            })
    }
    
}
