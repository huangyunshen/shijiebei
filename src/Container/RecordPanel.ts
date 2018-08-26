class RecordPanel extends eui.Component {

    public constructor(public recordData:any) {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/RecordPanelUI.exml";
    }

     /**lang data */
    private langData:any = $ZHTW.record;

    private data:any = {
        title:CONTRACTINFO[1],
        bottomPourTime:'0000.00.00 00:00:00',
        hOdds:CONTRACTINFO[4],
        pOdds:CONTRACTINFO[5],
        vOdds: CONTRACTINFO[6],
        hScore:'',
        vScore:'',
        singleAmount:'',
        totalAmount:'',
        rewardAmount:'-',
    }

    private textColor:number = 0xff873e;
    
    public timeTitle:eui.Group;
    public hWinGroup:any;
    public pingGroup:any;
    public vWinGroup:any;
    public singleAmountGroup:eui.Group;
    public totalAmountGroup:eui.Group;
    public rewardAmountGroup:any;
    public congratulation:eui.Image;


    protected childrenCreated(): void {
        super.childrenCreated();

        this.initData();
        this.layout();
    }

    private layout() {
        this.timeTitle.layout = setHLayoutCenter(10);
        this.hWinGroup.layout = setHLayoutLeft(0);
        this.pingGroup.layout = setHLayoutLeft(0);
        this.vWinGroup.layout = setHLayoutLeft(0);
        this.singleAmountGroup.layout = setHLayoutLeft(0);
        this.totalAmountGroup.layout = setHLayoutLeft(0);
        this.rewardAmountGroup.layout = setHLayoutLeft(0);
    }

    
    private initData() {
        this.data.bottomPourTime = this.recordData.time;
        this.data.singleAmount =  CONTRACTINFO[8] + ' FOF';

        let num = 0;
        if(this.recordData.selected.zhusheng) {
            num++;
        }
        if(this.recordData.selected.ping) {
            num++;
        }
        if(this.recordData.selected.kesheng) {
            num++;
        }
        let total = Number(this.recordData.multiple) * CONTRACTINFO[8] * num
        this.data.totalAmount = `${total} FOF (${this.recordData.multiple}${this.langData.bei})`;

        let hScore = Number(this.recordData.score.homeTeam);
        let vScore = Number(this.recordData.score.guestTeam);

        if(hScore >= 0 && vScore >= 0) {
            this.data.hScore = hScore;
            this.data.vScore = vScore;
            let whoWin = (hScore - CONTRACTINFO[9]) - (vScore - CONTRACTINFO[10]); //whoWin>0 : hTeam win ; whoWin<0 : vTeamWin
            let reward = 0;
            if(whoWin > 0) {
                this.hWinGroup.$children[0].textColor = this.textColor;
                this.hWinGroup.$children[1].textColor = this.textColor;
                if(this.recordData.selected.zhusheng) {
                    this.rewardAmountGroup.$children[1].textColor = this.textColor;
                    reward = total * CONTRACTINFO[4]
                    this.data.rewardAmount = reward + ' FOF';
                    this.congratulation.visible = true;
                } else {
                    this.data.rewardAmount = this.langData.notWin;
                }
            } else if (whoWin < 0) {
                this.vWinGroup.$children[0].textColor = this.textColor;
                this.vWinGroup.$children[1].textColor = this.textColor;
                if(this.recordData.selected.kesheng) {
                    this.rewardAmountGroup.$children[1].textColor = this.textColor;
                    reward = total * CONTRACTINFO[6]
                    this.data.rewardAmount = reward + ' FOF';
                    this.congratulation.visible = true;
                } else {
                    this.data.rewardAmount = this.langData.notWin;
                }
            } else {
                this.pingGroup.$children[0].textColor = this.textColor;
                this.pingGroup.$children[1].textColor = this.textColor;
                if(this.recordData.selected.ping) {
                    this.rewardAmountGroup.$children[1].textColor = this.textColor;
                    reward = total * CONTRACTINFO[5]
                    this.data.rewardAmount = reward + ' FOF';
                    this.congratulation.visible = true;
                } else {
                    this.data.rewardAmount = this.langData.notWin;
                }
            }
        } else {
            this.data.rewardAmount = this.langData.notOpen;
        }

        //TODO 恭喜中奖图片切换语言
    }

}
