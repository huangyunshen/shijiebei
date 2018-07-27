
class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(err => {
            console.log(err);
        })
    }

    private async runGame() {
        await this.loadResource();
        let promise = this.getInfo();
        promise.then(() => {
            this.createGameScene()
            document.getElementById('bgmMusic').play();
        });
        // const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        // await platform.login();
        // const userInfo = await platform.getUserInfo();
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private getInfo() {
        return new Promise((resolve,reject) => {
            try {
                let CODE:any = null;
                RES.getResByUrl("contract/playGame.json", function (code) {
                    CONTRACTINSTANCE = new web3.eth.Contract(code.abi, CONCADDR);
                    CONTRACTINSTANCE.methods.getSetting().call().then((data) => {
                        console.log(data);
                        CONTRACTINFO = data;
                        resolve();
                    })
                }, this, RES.ResourceItem.TYPE_JSON)
            }
            catch (e) {
                console.error(e);
            }
        })
    }
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        this.addChild(new Game());
    }


    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    // private startAnimation(result: string[]) {
    //     let parser = new egret.HtmlTextParser();
    //
    //     let textflowArr = result.map(text => parser.parse(text));
    //     // let textfield = this.textfield;
    //     let count = -1;
    //     let change = () => {
    //         count++;
    //         if (count >= textflowArr.length) {
    //             count = 0;
    //         }
    //         let textFlow = textflowArr[count];
    //
    //         // 切换描述内容
    //         // Switch to described content
    //         // textfield.textFlow = textFlow;
    //         // let tw = egret.Tween.get(textfield);
    //         // tw.to({ "alpha": 1 }, 200);
    //         // tw.wait(2000);
    //         // tw.to({ "alpha": 0 }, 200);
    //         // tw.call(change, this);
    //     };
    //
    //     change();
    // }
}
