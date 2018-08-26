class Password extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/PasswordUI.exml";
    }

     /**lang data */
    private langData:any = $ZHTW.password;

    private pwd = '';

    public modal:eui.Rect;
    public close:eui.Image;
    public input:eui.EditableText;
    public submitBtn:eui.Group;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);

        this.input.addEventListener(egret.Event.CHANGE, this.onInput, this);

        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submit, this);
    }

    private closeModal() {
        this.visible = false;
    }
    private onInput(e: egret.TouchEvent) {
        this.pwd = e.target.text;
    }

    private submit() {

        if(!this.pwd) {
            showDialog(this.langData.enterPwd);
            return;
        }

        showDialog(this.langData.isUnlocking, null, false);

        let tw = egret.Tween.get($Modal.dialog.contentText, {loop: true});   //开始动画
        tw.to({alpha: 0.2}, 1000);
        tw.to({alpha: 1}, 1000);

        setTimeout( () => {
            let promise = verifyWalletPwd(this.pwd)

            promise.then(() => {
                let wallet = getActiveAccount()                 
                tw.pause();             //停止动画
                tw = null;
                $Modal.dialog.canBeClose = true;
                $Modal.dialog.visible = false;
                this.closeModal();
            }, (err) => {
                tw.pause();             //停止动画
                tw = null;
                $Modal.dialog.msg = this.langData.pwdError;
                $Modal.dialog.canBeClose = true;
            })
        }, 500)
    }
}
