class Container extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/ContainerUI.exml";
    }

    private langData:any = $ZHTW.container;

    private data:any = {
        jackpot: 0,
        myBalance: 0,
        deadline: CONTRACTINFO[7],
        hTeam: CONTRACTINFO[2],
        vTeam: CONTRACTINFO[3],
        rangQiu:'1',
        hOdds: CONTRACTINFO[4],
        ping: CONTRACTINFO[5],
        vOdds: CONTRACTINFO[6],
        singAmount: '1 FOF',
        totalAmount:'0 FOF',
        number: 1,
        predictAmount:'0 FOF',
    }

    private bottomPourList:any = {
        hTeam:false,
        ping:false,
        vTeam:false,
    }

public moreBtn:eui.Image;
public jackpot:eui.Label;
public myBalance:eui.Label;
public deadlineGroup:eui.Group;
public hConcedeGroup:eui.Group;
public hConcede:eui.Group;
public vConcedeGroup:eui.Group;
public vConcede:eui.Group;
public hTeamBtn:eui.Group;
public pingBtn:eui.Group;
public vTeamBtn:eui.Group;
public minusBtn:eui.Image;
public input:eui.EditableText;
public addBtn:eui.Image;
public singleAmount:eui.Group;
public totalAmount:eui.Group;
public bottomPourBtn:eui.Group;
public predictAmount:eui.Group;
public moreGroup:eui.Group;
public homeBtn:eui.Image;
public recordBtn:eui.Image;
public myWalletBtn:eui.Image;
public languageBtn:eui.Image;
public appInfoBtn:eui.Image;
public codeBtn:eui.Image;


    protected childrenCreated(): void {
        super.childrenCreated();
        this.content();
    }

    private content() {

        /**layout */
        this.setLayout();

        /**init data */
        this.initData();

        /**events */
        this.bindEvents();

        $Modal.password = new Password();  //password
        $Modal.password.visible = false;
        this.addChild($Modal.password);

        $Modal.dialog = new Dialog();  //dialog
        $Modal.dialog.visible = false;
        this.addChild($Modal.dialog);
    }

    /**layout */
    private setLayout() {
        this.deadlineGroup.layout = setHLayoutCenter(20);
        this.hConcede.layout = setHLayoutCenter(0);
        this.vConcede.layout = setHLayoutCenter(0);
        this.singleAmount.layout = setHLayoutCenter(0);
        this.totalAmount.layout = setHLayoutCenter(0);
        this.predictAmount.layout = setHLayoutCenter(0);
    }

    /**init data */
    private initData() {
        this.data.singAmount =  CONTRACTINFO[8] + ' FOF'
        if( CONTRACTINFO[9] > 0)
            this.hConcedeGroup.visible = true;
        if( CONTRACTINFO[10] > 0)
            this.vConcedeGroup.visible = true;

        /**get balance interval*/
        this.getAccAndBalance();
        setInterval( () => {
            this.getAccAndBalance();
        }, 3000)
    }
    /**balance and account */
    private getAccAndBalance() {
        //jackpot
        getBalance(CONCADDR).then( balance => {
            this.data.jackpot = balance
        }, err => {
            console.log(err);
        })

        //mine
        let wallet = getActiveAccount()
        if(wallet) {
            getBalance(wallet.address).then( balance => {
                this.data.myBalance = balance
            }, err => {
                console.log(err);
            })
        }
    }

    /**add events */
    private bindEvents() {
        this.moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showMore, this);
        this.recordBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showRecord, this);
        this.appInfoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showAppInfo, this);
        this.codeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showCode, this);
        this.languageBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showLanguage, this);

        this.hTeamBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.seletTeam.bind(this, 'h'), this);
        this.pingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.seletTeam.bind(this, 'p'), this);
        this.vTeamBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.seletTeam.bind(this, 'v'), this);

        this.minusBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMultipleClick.bind(this, 'minus'), this);
        this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMultipleClick.bind(this, 'add'), this);
        
        this.input.addEventListener(egret.Event.CHANGE, this.onMultipleInput, this);

        this.bottomPourBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bottomPour, this);
    }

    /**show more */
    private showMore() {
        this.moreGroup.visible = !this.moreGroup.visible;
    }
    /**show record */ 
    private showRecord() {
        if(!$Modal.record) {
            $Modal.record = new Records();  //record
            this.addChild($Modal.record);
        } else {
            $Modal.record.visible = true;
        }
    }
    /**show app info */
    private showAppInfo() {
        if(!$Modal.appinfo) {
            $Modal.appinfo = new AppInfo();
            this.addChild($Modal.appinfo);
        } else {
            $Modal.appinfo.visible = true;
        }
    }
    /**show code */
    private showCode() {
        if(!$Modal.code) {
            let request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open('../contract/playGame.sol', egret.HttpMethod.GET);
            // request.open('/quiz/contract/playGame.sol', egret.HttpMethod.GET);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            request.addEventListener(egret.Event.COMPLETE, (event) => {
                let request = <egret.HttpRequest>event.currentTarget;
                
                $Modal.code = new Code(request.response);
                this.addChild($Modal.code);
            }, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {
                   showDialog(this.langData.networkError);
            }, this);
        } else {
            $Modal.code.visible = true;
        }
    }
    /**show language */
    private showLanguage() {
        if(!$Modal.language) {
            $Modal.language = new Language();
            this.addChild($Modal.language);
        } else {
            $Modal.language.visible = true;
        }
    }

    /** 选择队伍事件 */
    private seletTeam(btn:any): void {
        let newBtn;
        switch(btn) {
            case 'h':
                newBtn = this.hTeamBtn;
                break;
            case 'p':
                newBtn = this.pingBtn;
                break;
            case 'v':
                newBtn = this.vTeamBtn;
                break;
        }
        let sourceBtn = newBtn.$children[0];
        if(sourceBtn.source === 'btn_1_png') {
            sourceBtn.source = 'btn_2_png';
            switch(btn) {
                case 'h':
                    this.bottomPourList.hTeam = true;
                    break;
                case 'p':
                    this.bottomPourList.ping = true;
                    break;
                case 'v':
                    this.bottomPourList.vTeam = true;
                    break;
            }
        } else {
            sourceBtn.source = 'btn_1_png';
            switch(btn) {
                case 'h':
                    this.bottomPourList.hTeam = false;
                    break;
                case 'p':
                    this.bottomPourList.ping = false;
                    break;
                case 'v':
                    this.bottomPourList.vTeam = false;
                    break;
            }
        }
        egret.Tween.get(newBtn)
        .to({ scaleX: 0.96, scaleY: 0.96 }, 100, egret.Ease.circIn)
        .to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.circIn);

        this.calcAmount();
    }
    
    /**倍率加减事件 */
    private onMultipleClick(btn): void {
        let num = this.data.number;
        if (btn === 'add' && num < 99) {
            num++;
        } else if (btn === 'minus' && num > 1) {
            num--;
        }
        this.data.number = num;

        this.calcAmount();
    }
    private onMultipleInput(e: egret.TouchEvent): void {
        e.target.text = e.target.text.replace(/[^\d]/g, "");
        let num = Number(e.target.text);
         this.data.number = num;
        if (num < 1) {
            this.data.number = 1;
            e.target.text = '1'
        }
        if (num > 99) {
            this.data.number = 99;
            e.target.text = '99'
        }

        this.calcAmount();
    }

    private calcAmount() {
        let teams = 0, arr = [];
        if(this.bottomPourList.hTeam) {
            teams++;
            arr.push(CONTRACTINFO[4] * CONTRACTINFO[8] * this.data.number);
        }

        if(this.bottomPourList.ping) {
            teams++;
            arr.push(CONTRACTINFO[5] * CONTRACTINFO[8] * this.data.number);
        }

        if(this.bottomPourList.vTeam) {
            teams++;
            arr.push(CONTRACTINFO[6] * CONTRACTINFO[8] * this.data.number);
        }

        this.data.totalAmount = teams * CONTRACTINFO[8] * this.data.number + ' FOF';

        if(arr.length > 1) {
             arr.sort((a, b) => {
                return a - b
            })
            this.data.predictAmount = arr[0] + " FOF" + " - " + arr[arr.length - 1] + " FOF";
        } else if (arr.length === 1) {
            this.data.predictAmount = arr[0] + " FOF";
        } else {
            this.data.predictAmount = "0 FOF";
        }
    }

    /**下注事件 */
    private bottomPour(): void {
        
        if (!ifWalletExist()) {
            showDialog(this.langData.noWallet, location.origin);
            return;
        }
        let account = getActiveAccount()   
        
        if (!account) {
            showPassword();
            return;
        }
        let address = account.address

        let num = 0;        //下注方的数量
        let total;          //下注总金额
        let maxOdds = [];   //下注方对应的赔率
        let arr = [-1, -1, -1];//下注方
        if (this.bottomPourList.hTeam) {
            arr[0] = 0;
            num++;
            maxOdds.push(CONTRACTINFO[4]);
        }
        if (this.bottomPourList.ping) {
            arr[1] = 2;
            num++;
            maxOdds.push(CONTRACTINFO[5]);
        }
        if (this.bottomPourList.vTeam) {
            arr[2] = 1;
            num++;
            maxOdds.push(CONTRACTINFO[6]);
        }
        
        if (arr[0] === -1 && arr[1] === -1 && arr[2] === -1) {
            showDialog(this.langData.selectTeams);
            return;
        }

        total = num * this.data.number * Number(CONTRACTINFO[8]) * 1e18; //总下注金额 = 下注方的数量*倍率*单注金额*10的18次方


        web3.eth.getBalance(address).then( balance => {
            
            if (total > balance) {
                showDialog(this.langData.balanceNotEnough);
                return;
            }
            
            CONTRACTINSTANCE.methods.getNow().call().then( now => {  //获取当前时间
                now = now + 10000 //纠正10秒
                if (now > CONTRACTINFO[7]) {
                    showDialog(this.langData.deadLineOver + CONTRACTINFO[7]);
                    return;
                }
                CONTRACTINSTANCE.methods.availableBalance().call().then((pourBalance) => {  //获取奖池可用余额
                    maxOdds.sort((a, b) => {
                        return a - b
                    });
                    let maximum = total / num * maxOdds[maxOdds.length - 1];    //可能的最大奖金，用于计算奖池剩余可用奖金
                    if (maximum > pourBalance) {
                        showDialog(this.langData.pourBalanceNotEnough);
                        return;
                    }

                    
                    showDialog(this.langData.isBottomPouring, null, false);

                    let tw = egret.Tween.get($Modal.dialog.contentText, { loop: true });//开始动画
                    tw.to({ alpha: 0.2 }, 1000);
                    tw.to({ alpha: 1 }, 1000);


                    CONTRACTINSTANCE.methods.betFun(address, arr, total, num, maximum)
                    .send({
                        from: address,
                        value: total,
                        gas: 4700000,
                        txType:0
                    })
                    .on('error', (err) => {
                        console.log(err);
                        tw.pause();           
                        tw = null;                        
                        $Modal.dialog.msg = err;
                        $Modal.dialog.canBeClose = true;
                    })
                    .on('receipt', (receipt) => {
                        tw.pause();           
                        tw = null;                        
                        $Modal.dialog.msg = this.langData.justWaitResult;
                        $Modal.dialog.canBeClose = true;

                        let contractInfo = JSON.stringify(CONTRACTINFO)
                        contractInfo = contractInfo.replace(/\"/g, "'")
                        let data = {
                            "addr": address,
                            "contractAddr": CONCADDR,
                            "contractInfo": contractInfo,
                            "deadline": CONTRACTINFO[7],
                            "txType": this.langData.bet,
                            "txHash": receipt.transactionHash,
                            "multiple": this.data.number,
                            "selected": this.bottomPourList,
                            "liveId": CONTRACTINFO[11]
                        }

                        let request = new egret.HttpRequest();
                        request.responseType = egret.HttpResponseType.TEXT;
                        request.open(setRecordUrl, egret.HttpMethod.POST);
                        request.setRequestHeader("Content-Type", "application/json");
                        request.send(JSON.stringify(data));
                        // request.addEventListener(egret.Event.COMPLETE, (event) => {
                        // let request = <egret.HttpRequest>event.currentTarget;
                        // console.log(request);
                        // }, this);
                        request.addEventListener(egret.IOErrorEvent.IO_ERROR, (err) => {
                            console.log(err);
                        }, this);

                    })
                });
            });
        }, err => {
            console.log(err);
        })
    }
}
