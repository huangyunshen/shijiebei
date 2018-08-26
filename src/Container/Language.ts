class Language extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/LanguageUI.exml";
    }

     /**lang data */
    private langData:any = $ZHTW.language;

    public modal:eui.Rect;
    public close:eui.Image;

    public zhtw:eui.Group;
    public en:eui.Group;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);

        this.zhtw.addEventListener(egret.TouchEvent.TOUCH_TAP, this.select.bind(this, 'zhtw'), this);
        this.en.addEventListener(egret.TouchEvent.TOUCH_TAP, this.select.bind(this, 'en'), this);
    }

    private closeModal() {
        this.visible = false;
    }

    private select(lang) {

    }
}
