class Records extends egret.Sprite {
    public constructor(public arr) {
        super();
        this.dialogModal();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.records, this);
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

    private records() {
        let content = new egret.Sprite();
        content.x = 50;
        content.y = 90;

        let bg = createBitmapByName("jilu_bg_png");
        content.addChild(bg);

        let title = new CreateTextField({x: 0, y: 28, width: 350, color: 0x57ffed, tx: `记录`, size: 54}).create();
        content.addChild(title);

        let close = createBitmapByName("close_large_png");
        close.x = 804;
        close.y = -6;
        content.addChild(close);
        close.touchEnabled = true;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModal, this);

        // let message = new CreateTextField({x: 45, y: 160, width: 695, height: 100, tx: ""}).create();
        // message.verticalAlign = egret.VerticalAlign.MIDDLE;
        // content.addChild(message);

        let myScrollView = new egret.ScrollView();
        myScrollView.width = 980;
        myScrollView.height = 1385;
        myScrollView.y = 135

        let sprite = new egret.Sprite();
        for(var i = 0; i<this.arr.length; i++){
            let con = this.record(i, this.arr[i].time, CONTRACTINFO, this.arr[i].selected, this.arr[i].multiple, this.arr[i].score.homeTeam, this.arr[i].score.guestTeam);
            sprite.addChild(con);
        }

        myScrollView.setContent(sprite);

        content.addChild(myScrollView);
        this.addChild(content);
    }

    private closeModal() {
        egret.MainContext.instance.stage.removeChild(records);
        records = null;
        eventButtonCtr(true);
    }

    private record(_index,  _time, _info, _selected, _multiple, _hScore, _vScore) {
        let singAmount = Number(_info[8])

        let container = new egret.Sprite();
        let width = 920;
        let height = 610;
        let textColor = 0x01ffea;
        let defaultColor = 0xffffff;
        let y = 0;
        y += _index * (height + 30 );

        container.x = 30;
        container.y = y;

        let bg = new egret.Shape();
        bg.graphics.beginFill(0x095e35);
        bg.graphics.drawRoundRect(0, 0, width, height, 15);
        bg.graphics.endFill();
        container.addChild(bg);

        let name = new CreateTextField({x: 20, y: 26, width: 400, align: "left", tx: _info[1], size: 40}).create();
        container.addChild(name);

        let time = new CreateTextField({
            x: 400,
            y: 30,
            width: 500,
            align: "right",
            tx: `下注时间：${_time}`,
            size: 34
        }).create();
        container.addChild(time);

        let content = new egret.Sprite();
        content.width = 860;
        content.height = 290;
        content.x = 30;
        content.y = 88;

        let rect = new egret.Shape();
        rect.graphics.beginFill(0x60ffcc, 0.12);
        rect.graphics.drawRoundRect(0, 0, 860, 290, 15);
        rect.graphics.endFill();
        content.addChild(rect);

        let textH = new CreateTextField({
            x: 38,
            y: 53,
            width: 250,
            align: "left",
            color: _selected.zhusheng ? textColor : defaultColor,
            tx: `主胜：${_info[4] / 100}`,
            size: 36
        }).create();
        content.addChild(textH);
        let textD = new CreateTextField({
            x: 38,
            y: 129,
            width: 250,
            align: "left",
            color: _selected.ping ? textColor : defaultColor,
            tx: `平：${_info[5] / 100}`,
            size: 36
        }).create();
        content.addChild(textD);
        let textV = new CreateTextField({
            x: 38,
            y: 200,
            width: 250,
            color: _selected.kesheng ? textColor : defaultColor,
            align: "left",
            tx: `客胜：${_info[6] / 100}`,
            size: 36
        }).create();
        content.addChild(textV);

        let gameParty = new egret.Sprite();
        gameParty.width = 520;
        gameParty.height = 183;
        gameParty.x = 291;
        gameParty.y = 30;

        let circle1 = createBitmapByName("contry_bg_png");
        gameParty.addChild(circle1);
        let circle2 = createBitmapByName("contry_bg_png");
        circle2.x = 335;
        gameParty.addChild(circle2);
        let vs = createBitmapByName("vs_png");
        vs.x = 212;
        vs.y = 60;
        gameParty.addChild(vs);

        let homeTeam = createBitmapByName("contry1_png");
        homeTeam.x = 10;
        homeTeam.y = 10;
        homeTeam.scaleX = 0.66;
        homeTeam.scaleY = 0.66;
        gameParty.addChild(homeTeam);

        let visitingTeam = createBitmapByName("contry2_png");
        visitingTeam.x = 346;
        visitingTeam.y = 10;
        visitingTeam.scaleX = 0.66;
        visitingTeam.scaleY = 0.66;
        gameParty.addChild(visitingTeam);

        let teamText1 = new CreateTextField({x: 0, y: 120, width: 180, tx: _info[2], size: 24}).create();
        gameParty.addChild(teamText1);

        let teamText2 = new CreateTextField({x: 336, y: 120, width: 180, tx: _info[3], size: 24}).create();
        gameParty.addChild(teamText2);

        if (_hScore > -1) {
            let scoreText1 = new CreateTextField({
                x: 355,
                y: 233,
                width: 50,
                tx: String(_hScore),
                size: 40
            }).create();
            content.addChild(scoreText1);
        }
        if (_vScore > -1) {
            let scoreText2 = new CreateTextField({
                x: 695,
                y: 233,
                width: 50,
                tx: String(_vScore),
                size: 40
            }).create();
            content.addChild(scoreText2);
        }

        let text1 = new CreateTextField({
            x: 40,
            y: 416,
            width: 850,
            align: "left",
            tx: `单注金额：${singAmount} FOF`,
            size: 34
        }).create();
        container.addChild(text1);

        let num = 0;
        for (let key in _selected) {
            if (_selected[key])
                num++;
        }
        let text2 = new CreateTextField({
            x: 40,
            y: 477,
            width: 850,
            align: "left",
            tx: `投注总额：${num * singAmount * _multiple} FOF(${_multiple}倍)`,
            size: 34
        }).create();
        container.addChild(text2);

        let total: any = "未开奖";
        let isWin: boolean = false;

        if ((_hScore >=0) && (_vScore >=0)) {
            let result = Number(_hScore) - Number(_vScore) - Number(CONTRACTINFO[9]) + Number(CONTRACTINFO[10]);
            if (result > 0) {
                if (_selected.zhusheng) {
                    isWin = true;
                    total = Number(singAmount) * _multiple * CONTRACTINFO[4] / 100 + ' FOF';
                } else {
                    total = "未中奖"
                }
            } else if (result === 0) {
                if (_selected.ping) {
                    isWin = true;
                    total = singAmount * _multiple * CONTRACTINFO[5] / 100 + ' FOF';
                } else {
                    total = "未中奖"
                }
            } else if (result < 0) {
                if (_selected.kesheng) {
                    isWin = true;
                    total = singAmount * _multiple * CONTRACTINFO[6] / 100 + ' FOF';
                } else {
                    total = "未中奖"
                }
            }
        }
        let text3 = new CreateTextField({
            x: 40,
            y: 540,
            width: 850,
            align: "left",
            color: isWin ? textColor : defaultColor,
            tx: `获奖金额：${total}`,
            size: 34
        }).create();
        container.addChild(text3);

        if (isWin) {
            let win = createBitmapByName("gxzj_png");
            win.x = 550;
            win.y = 420;
            container.addChild(win);
        }

        content.addChild(gameParty);
        container.addChild(content);
        return container;
    }
}