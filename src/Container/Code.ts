class Code extends eui.Component {

    public constructor(public codes:any) {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/CodeUI.exml";
    }

     /**lang data */
    private langData:any = $ZHTW.code;

    public modal:eui.Rect;
    public close:eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
    }

    private closeModal() {
        this.visible = false;
    }
}
