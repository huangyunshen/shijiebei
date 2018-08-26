class AppInfo extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/AppInfoUI.exml";
    }

     /**lang data */
    private langData:any = $ZHTW.appinfo;

    private data:any = {
        name:CONTRACTINFO[1],
        creator:'',
        appAddr:CONCADDR,
        creatTime:'',
        balance:'',
        historyTotalCoins:''
    }

    public modal:eui.Rect;
    public close:eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.getPublicData();
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
    }

    private closeModal() {
        this.visible = false;
    }

    private getPublicData() {
        CONTRACTINSTANCE.methods.getPublicData().call().then( data => {
            this.data.creator = data[2];
            this.data.creatTime = timestampToTime(data[3]);
            
            this.data.historyTotalCoins = web3.utils.fromWei(data[4], 'ether') + ' FOF';
        }, err => {
            console.log(err);
        })
        
        getBalance(CONCADDR).then( balance => {
            this.data.balance = balance + ' FOF'
        }, err => {
            console.log(err);
        })
    }

}
