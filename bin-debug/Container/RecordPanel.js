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
var RecordPanel = (function (_super) {
    __extends(RecordPanel, _super);
    function RecordPanel(recordData) {
        var _this = _super.call(this) || this;
        _this.recordData = recordData;
        /**lang data */
        _this.langData = $ZHTW.record;
        _this.data = {
            title: CONTRACTINFO[1],
            bottomPourTime: '0000.00.00 00:00:00',
            hOdds: CONTRACTINFO[4],
            pOdds: CONTRACTINFO[5],
            vOdds: CONTRACTINFO[6],
            hScore: '',
            vScore: '',
            singleAmount: '',
            totalAmount: '',
            rewardAmount: '-',
        };
        _this.textColor = 0xff873e;
        /**load Container skin */
        _this.skinName = "resource/eui_modules/RecordPanelUI.exml";
        return _this;
    }
    RecordPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.initData();
        this.layout();
    };
    RecordPanel.prototype.layout = function () {
        this.timeTitle.layout = setHLayoutCenter(10);
        this.hWinGroup.layout = setHLayoutLeft(0);
        this.pingGroup.layout = setHLayoutLeft(0);
        this.vWinGroup.layout = setHLayoutLeft(0);
        this.singleAmountGroup.layout = setHLayoutLeft(0);
        this.totalAmountGroup.layout = setHLayoutLeft(0);
        this.rewardAmountGroup.layout = setHLayoutLeft(0);
    };
    RecordPanel.prototype.initData = function () {
        this.data.bottomPourTime = this.recordData.time;
        this.data.singleAmount = CONTRACTINFO[8] + ' FOF';
        var num = 0;
        if (this.recordData.selected.zhusheng) {
            num++;
        }
        if (this.recordData.selected.ping) {
            num++;
        }
        if (this.recordData.selected.kesheng) {
            num++;
        }
        var total = Number(this.recordData.multiple) * CONTRACTINFO[8] * num;
        this.data.totalAmount = total + " FOF (" + this.recordData.multiple + this.langData.bei + ")";
        var hScore = Number(this.recordData.score.homeTeam);
        var vScore = Number(this.recordData.score.guestTeam);
        if (hScore >= 0 && vScore >= 0) {
            this.data.hScore = hScore;
            this.data.vScore = vScore;
            var whoWin = (hScore - CONTRACTINFO[9]) - (vScore - CONTRACTINFO[10]); //whoWin>0 : hTeam win ; whoWin<0 : vTeamWin
            var reward = 0;
            if (whoWin > 0) {
                this.hWinGroup.$children[0].textColor = this.textColor;
                this.hWinGroup.$children[1].textColor = this.textColor;
                if (this.recordData.selected.zhusheng) {
                    this.rewardAmountGroup.$children[1].textColor = this.textColor;
                    reward = total * CONTRACTINFO[4];
                    this.data.rewardAmount = reward + ' FOF';
                    this.congratulation.visible = true;
                }
                else {
                    this.data.rewardAmount = this.langData.notWin;
                }
            }
            else if (whoWin < 0) {
                this.vWinGroup.$children[0].textColor = this.textColor;
                this.vWinGroup.$children[1].textColor = this.textColor;
                if (this.recordData.selected.kesheng) {
                    this.rewardAmountGroup.$children[1].textColor = this.textColor;
                    reward = total * CONTRACTINFO[6];
                    this.data.rewardAmount = reward + ' FOF';
                    this.congratulation.visible = true;
                }
                else {
                    this.data.rewardAmount = this.langData.notWin;
                }
            }
            else {
                this.pingGroup.$children[0].textColor = this.textColor;
                this.pingGroup.$children[1].textColor = this.textColor;
                if (this.recordData.selected.ping) {
                    this.rewardAmountGroup.$children[1].textColor = this.textColor;
                    reward = total * CONTRACTINFO[5];
                    this.data.rewardAmount = reward + ' FOF';
                    this.congratulation.visible = true;
                }
                else {
                    this.data.rewardAmount = this.langData.notWin;
                }
            }
        }
        else {
            this.data.rewardAmount = this.langData.notOpen;
        }
        //TODO 恭喜中奖图片切换语言
    };
    return RecordPanel;
}(eui.Component));
__reflect(RecordPanel.prototype, "RecordPanel");
