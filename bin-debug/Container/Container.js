var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Container = (function (_super) {
    __extends(Container, _super);
    function Container() {
        var _this = _super.call(this) || this;
        _this.langData = $ZHTW.container;
        _this.data = {
            jackpot: 0,
            myBalance: 0,
            deadline: CONTRACTINFO[7],
            hTeam: CONTRACTINFO[2],
            vTeam: CONTRACTINFO[3],
            rangQiu: '1',
            hOdds: CONTRACTINFO[4],
            ping: CONTRACTINFO[5],
            vOdds: CONTRACTINFO[6],
            singAmount: '1 FOF',
            totalAmount: '0 FOF',
            number: 1,
            predictAmount: '0 FOF',
        };
        _this.bottomPourList = {
            hTeam: false,
            ping: false,
            vTeam: false,
        };
        /**load Container skin */
        _this.skinName = "resource/eui_modules/ContainerUI.exml";
        return _this;
    }
    Container.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.content();
    };
    Container.prototype.content = function () {
        /**layout */
        this.setLayout();
        /**init data */
        this.initData();
        /**events */
        this.bindEvents();
        $Modal.password = new Password(); //password
        $Modal.password.visible = false;
        this.addChild($Modal.password);
        $Modal.dialog = new Dialog(); //dialog
        $Modal.dialog.visible = false;
        this.addChild($Modal.dialog);
    };
    /**layout */
    Container.prototype.setLayout = function () {
        this.deadlineGroup.layout = setHLayoutCenter(20);
        this.hConcede.layout = setHLayoutCenter(0);
        this.vConcede.layout = setHLayoutCenter(0);
        this.singleAmount.layout = setHLayoutCenter(0);
        this.totalAmount.layout = setHLayoutCenter(0);
        this.predictAmount.layout = setHLayoutCenter(0);
    };
    /**init data */
    Container.prototype.initData = function () {
        var _this = this;
        this.data.singAmount = CONTRACTINFO[8] + ' FOF';
        if (CONTRACTINFO[9] > 0)
            this.hConcedeGroup.visible = true;
        if (CONTRACTINFO[10] > 0)
            this.vConcedeGroup.visible = true;
        /**get balance interval*/
        this.getAccAndBalance();
        setInterval(function () {
            _this.getAccAndBalance();
        }, 3000);
    };
    /**balance and account */
    Container.prototype.getAccAndBalance = function () {
        var _this = this;
        //jackpot
        getBalance(CONCADDR).then(function (balance) {
            _this.data.jackpot = balance;
        }, function (err) {
            console.log(err);
        });
        //mine
        var wallet = getActiveAccount();
        if (wallet) {
            getBalance(wallet.address).then(function (balance) {
                _this.data.myBalance = balance;
            }, function (err) {
                console.log(err);
            });
        }
    };
    /**add events */
    Container.prototype.bindEvents = function () {
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
    };
    /**show more */
    Container.prototype.showMore = function () {
        this.moreGroup.visible = !this.moreGroup.visible;
    };
    /**show record */
    Container.prototype.showRecord = function () {
        if (!$Modal.record) {
            $Modal.record = new Records(); //record
            this.addChild($Modal.record);
        }
        else {
            $Modal.record.visible = true;
        }
    };
    /**show app info */
    Container.prototype.showAppInfo = function () {
        if (!$Modal.appinfo) {
            $Modal.appinfo = new AppInfo();
            this.addChild($Modal.appinfo);
        }
        else {
            $Modal.appinfo.visible = true;
        }
    };
    /**show code */
    Container.prototype.showCode = function () {
        var _this = this;
        if (!$Modal.code) {
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open('../contract/playGame.sol', egret.HttpMethod.GET);
            // request.open('/quiz/contract/playGame.sol', egret.HttpMethod.GET);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            request.addEventListener(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
                $Modal.code = new Code(request.response);
                _this.addChild($Modal.code);
            }, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
                showDialog(_this.langData.networkError);
            }, this);
        }
        else {
            $Modal.code.visible = true;
        }
    };
    /**show language */
    Container.prototype.showLanguage = function () {
        if (!$Modal.language) {
            $Modal.language = new Language();
            this.addChild($Modal.language);
        }
        else {
            $Modal.language.visible = true;
        }
    };
    /** 选择队伍事件 */
    Container.prototype.seletTeam = function (btn) {
        var newBtn;
        switch (btn) {
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
        var sourceBtn = newBtn.$children[0];
        if (sourceBtn.source === 'btn_1_png') {
            sourceBtn.source = 'btn_2_png';
            switch (btn) {
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
        }
        else {
            sourceBtn.source = 'btn_1_png';
            switch (btn) {
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
    };
    /**倍率加减事件 */
    Container.prototype.onMultipleClick = function (btn) {
        var num = this.data.number;
        if (btn === 'add' && num < 99) {
            num++;
        }
        else if (btn === 'minus' && num > 1) {
            num--;
        }
        this.data.number = num;
        this.calcAmount();
    };
    Container.prototype.onMultipleInput = function (e) {
        e.target.text = e.target.text.replace(/[^\d]/g, "");
        var num = Number(e.target.text);
        this.data.number = num;
        if (num < 1) {
            this.data.number = 1;
            e.target.text = '1';
        }
        if (num > 99) {
            this.data.number = 99;
            e.target.text = '99';
        }
        this.calcAmount();
    };
    Container.prototype.calcAmount = function () {
        var teams = 0, arr = [];
        if (this.bottomPourList.hTeam) {
            teams++;
            arr.push(CONTRACTINFO[4] * CONTRACTINFO[8] * this.data.number);
        }
        if (this.bottomPourList.ping) {
            teams++;
            arr.push(CONTRACTINFO[5] * CONTRACTINFO[8] * this.data.number);
        }
        if (this.bottomPourList.vTeam) {
            teams++;
            arr.push(CONTRACTINFO[6] * CONTRACTINFO[8] * this.data.number);
        }
        this.data.totalAmount = teams * CONTRACTINFO[8] * this.data.number + ' FOF';
        if (arr.length > 1) {
            arr.sort(function (a, b) {
                return a - b;
            });
            this.data.predictAmount = arr[0] + " FOF" + " - " + arr[arr.length - 1] + " FOF";
        }
        else if (arr.length === 1) {
            this.data.predictAmount = arr[0] + " FOF";
        }
        else {
            this.data.predictAmount = "0 FOF";
        }
    };
    /**下注事件 */
    Container.prototype.bottomPour = function () {
        var _this = this;
        if (!ifWalletExist()) {
            showDialog(this.langData.noWallet, location.origin);
            return;
        }
        var account = getActiveAccount();
        if (!account) {
            showPassword();
            return;
        }
        var address = account.address;
        var num = 0; //下注方的数量
        var total; //下注总金额
        var maxOdds = []; //下注方对应的赔率
        var arr = [-1, -1, -1]; //下注方
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
        web3.eth.getBalance(address).then(function (balance) {
            if (total > balance) {
                showDialog(_this.langData.balanceNotEnough);
                return;
            }
            CONTRACTINSTANCE.methods.getNow().call().then(function (now) {
                now = now + 10000; //纠正10秒
                if (now > CONTRACTINFO[7]) {
                    showDialog(_this.langData.deadLineOver + CONTRACTINFO[7]);
                    return;
                }
                CONTRACTINSTANCE.methods.availableBalance().call().then(function (pourBalance) {
                    maxOdds.sort(function (a, b) {
                        return a - b;
                    });
                    var maximum = total / num * maxOdds[maxOdds.length - 1]; //可能的最大奖金，用于计算奖池剩余可用奖金
                    if (maximum > pourBalance) {
                        showDialog(_this.langData.pourBalanceNotEnough);
                        return;
                    }
                    showDialog(_this.langData.isBottomPouring, null, false);
                    var tw = egret.Tween.get($Modal.dialog.contentText, { loop: true }); //开始动画
                    tw.to({ alpha: 0.2 }, 1000);
                    tw.to({ alpha: 1 }, 1000);
                    CONTRACTINSTANCE.methods.betFun(address, arr, total, num, maximum)
                        .send({
                        from: address,
                        value: total,
                        gas: 4700000,
                        txType: 0
                    })
                        .on('error', function (err) {
                        console.log(err);
                        tw.pause();
                        tw = null;
                        $Modal.dialog.msg = err;
                        $Modal.dialog.canBeClose = true;
                    })
                        .on('receipt', function (receipt) {
                        tw.pause();
                        tw = null;
                        $Modal.dialog.msg = _this.langData.justWaitResult;
                        $Modal.dialog.canBeClose = true;
                        var contractInfo = JSON.stringify(CONTRACTINFO);
                        contractInfo = contractInfo.replace(/\"/g, "'");
                        var data = {
                            "addr": address,
                            "contractAddr": CONCADDR,
                            "contractInfo": contractInfo,
                            "deadline": CONTRACTINFO[7],
                            "txType": _this.langData.bet,
                            "txHash": receipt.transactionHash,
                            "multiple": _this.data.number,
                            "selected": _this.bottomPourList,
                            "liveId": CONTRACTINFO[11]
                        };
                        var request = new egret.HttpRequest();
                        request.responseType = egret.HttpResponseType.TEXT;
                        request.open(setRecordUrl, egret.HttpMethod.POST);
                        request.setRequestHeader("Content-Type", "application/json");
                        request.send(JSON.stringify(data));
                        // request.addEventListener(egret.Event.COMPLETE, (event) => {
                        // let request = <egret.HttpRequest>event.currentTarget;
                        // console.log(request);
                        // }, this);
                        request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (err) {
                            console.log(err);
                        }, _this);
                    });
                });
            });
        }, function (err) {
            console.log(err);
        });
    };
    return Container;
}(eui.Component));
__reflect(Container.prototype, "Container");
