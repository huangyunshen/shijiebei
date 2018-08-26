class Dialog extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/DialogUI.exml";
    }

     /**lang data */
    private langData:any = $ZHTW.dialog;

    public msg = '';
    public url:any;
    public canBeClose = true;
    
    public modal:eui.Rect;
    public close:eui.Image;
    public contentText:eui.Group;
    public submitBtn:eui.Group;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submit, this);
    }

    private closeModal() {
        this.canBeClose && (this.visible = false);
    }

    private submit() {
        if(this.url) {
            window.location.href = this.url;
            return;
        }
        this.closeModal();
    }
}
