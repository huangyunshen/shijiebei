class Records extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/RecordUI.exml";
    }

     /**lang data */
    private langData:Object = $ZHTW.record;

    private recordList:any = [];

    public modal:eui.Rect;
    public close:eui.Image;
    public content:eui.Group;


    protected childrenCreated(): void {
        super.childrenCreated();
        this.content.layout = setVerticalTop(30);
        this.addRecord();

        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);
    }

    private closeModal() {
        this.visible = false;
    }

    /**添加纪录到界面 */
    private addRecord() {
        this.getRecord().then( () => {
            if(this.recordList.length) {
                for( let i=0; i<this.recordList.length; i++){
                    let rec = new RecordPanel(this.recordList[i]);
                    this.content.addChild(rec);
                }
            }
        }, err => {
            console.log(err);
        })
        
    }

    
    /*
    获取下注记录
    */
    private getRecord() {
        return new Promise((resolve, reject) => {
            let acc = getActiveAccount()
            if(!acc) {
                this.recordList = [];
                resolve()
            } else {            
                let data = {
                    "addr": acc.address,
                    "liveId": CONTRACTINFO[11],
                    "pageSize": 1000,
                    "pageNum": 1
                }        
                let request = new egret.HttpRequest();
                request.responseType = egret.HttpResponseType.TEXT;
                request.open(getRecordUrl, egret.HttpMethod.POST);
                request.setRequestHeader("Content-Type", "application/json");
                request.send(JSON.stringify(data));
                request.addEventListener(egret.Event.COMPLETE, (event) => {
                    let request = <egret.HttpRequest>event.currentTarget;
                    let data = JSON.parse(request.response);
                    if(data.code === "200") {
                        this.recordList = data.result;
                        resolve();
                    } else {
                        reject(data)
                        console.log(data);
                    }
                }, this);
                request.addEventListener(egret.IOErrorEvent.IO_ERROR, (err) => {
                    reject(err);
                    console.log(err);
                }, this);
            }
        })
    }
}
