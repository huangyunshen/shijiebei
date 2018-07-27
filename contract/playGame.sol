pragma solidity ^0.4.0;

contract Quiz {
    string public contractName;
    uint public gameType = 2;
    address public creator = msg.sender;
    uint public creationTime;
    uint public historyTotalCoins = 0; // Total note in history

    uint public liveId;//Event ID
    string homeTeam; //Home team
    string visitingTeam; //Visiting team
    uint oddsH; //Main winning odds
    uint oddsD; //Flat rate
    uint oddsV; //Winning odds
    uint deadline; // Closing date
    uint singleBetCoin; //Single amount of money
    uint hConcedePoints = 0; //Home teamLet the ball
    uint vConcedePoints = 0; //Visiting teamLet the ball
    address [] hVictory;  // Save the address of 0 of the main victory
    mapping(address => uint) hVictoryMap; // Select the amount of the subscribers for the main winner
    address [] vVictory;   // Save the address of 1
    mapping(address => uint) vVictoryMap; // Choose the amount of the subscribers
    address [] draw;    // Save the address of the 2
    mapping(address => uint) drawMap; // The amount of the subscriber's bet
    uint256 public availableBalance = 0;

    event returnBetResult(uint code, string msg, uint hCore, uint vCore); // Returns whether the bet is successful. 101- "has already paid off the deadline" 201- "bet successful" 205- "settlement completed".

    function deposit() public payable {
        uint balance = getCurrentBalance();
        availableBalance = availableBalance + balance;
    }

    function getPublicData() public constant returns (string, uint, address, uint, uint){
        return (contractName, gameType, creator, creationTime, historyTotalCoins);
    }

    function getNow() public constant returns (uint){//Get the current time
        uint Now = block.timestamp * 1000;
        return Now;
    }

    /*
    * @homeTeam Home team
    * @visitingTeam Visiting team
    * @oddsH Main winning odds 0
    * @oddsD Flat rate   2
    * @oddsV Winning odds 1
    * soliditySmall numbers are not supported in it
    * The incoming odds have increased by 100 times, and the final result needs to be divided by 100.
    */
    constructor(string _name, string _homeTeam, string _visitingTeam, uint _oddsH, uint _oddsD, uint _oddsV, uint _deadline, uint _singleCoin, uint _hConcedePoints, uint _vConcedePoints, uint _liveId) public{
        contractName = _name;
        homeTeam = _homeTeam;
        visitingTeam = _visitingTeam;
        oddsH = _oddsH;
        oddsD = _oddsD;
        oddsV = _oddsV;
        deadline = _deadline;
        singleBetCoin = _singleCoin;
        hConcedePoints = _hConcedePoints;
        vConcedePoints = _vConcedePoints;
        liveId = _liveId;
        creationTime = getTimestamp();
    }

    function getLiveId() returns(uint){
        return liveId;
    }

    // Get the current block timestamp (unit is second)
    function getTimestamp() public constant returns (uint) {
        return block.timestamp;
    }
    // Return the balance of the current contract account
    function getCurrentBalance() public constant returns (uint256) {
        return address(this).balance;
    }

    // Return configuration parameters
    function getSetting() public constant returns (uint, string, string, string, uint, uint, uint, uint, uint, uint, uint, uint) {
        return (gameType, contractName, homeTeam, visitingTeam, oddsH, oddsD, oddsV, deadline, singleBetCoin, hConcedePoints, vConcedePoints, liveId);
    }

    // Injection function
    /*
    * @addr Note address
    * @choose Choice of victory and defeat - - - - - - - 012, -1 representative is not selected
    * @coin Amount of note
    * @num The number of notes - - - - - 123
    */
    function betFun(address addr, uint [3] choose, uint coin, uint num, uint maximum) public payable {
        if (block.timestamp * 1000 > deadline) {
            transferCoin(addr, coin);
            emit returnBetResult(101, "已过下注截止时间", 0, 0);
        } else {
            //            emit returnBetResult(201, "下注成功", 0, 0);
            historyTotalCoins += coin;
            for (uint i = 0; i < 3; i++) {
                if (choose[i] == 0) {
                    bool flag1 = false;
                    for (uint j = 0; j < hVictory.length; j++) {
                        if (hVictory[j] == addr) {
                            flag1 = true;
                            break;
                        }
                    }
                    if (!flag1) {
                        hVictory.push(addr);
                    }
                    hVictoryMap[addr] = hVictoryMap[addr] + coin / num;
                } else if (choose[i] == 1) {
                    bool flag2 = false;
                    for (uint k = 0; k < vVictory.length; k++) {
                        if (vVictory[k] == addr) {
                            flag2 = true;
                            break;
                        }
                    }
                    if (!flag2) {
                        vVictory.push(addr);
                    }
                    vVictoryMap[addr] = vVictoryMap[addr] + coin / num;
                } else if (choose[i] == 2) {
                    bool flag3 = false;
                    for (uint l = 0; l < draw.length; l++) {
                        if (draw[l] == addr) {
                            flag3 = true;
                            break;
                        }
                    }
                    if (!flag3) {
                        draw.push(addr);
                    }
                    drawMap[addr] = drawMap[addr] + coin / num;
                }
            }
            availableBalance = availableBalance + coin - maximum;
            //The available balance of the prize pool = the current available balance + the total amount of the bet - the maximum bonus.
        }
    }

    // Settlement function
    // @_result Who wins 012 / winner Ke Shengping
    function getResult(uint _hCore, uint _vCore) public {
        uint h = _hCore + vConcedePoints;
        //Home team Score +Let the ball score
        uint v = _vCore + hConcedePoints;
        //Visiting team Score +Let the ball score
        if (h > v) {
            for (uint i = 0; i < hVictory.length; i++) {
                transferCoin(hVictory[i], hVictoryMap[hVictory[i]] * oddsH / 100);
            }
        }
        if (h < v) {
            for (uint j = 0; j < vVictory.length; j++) {
                transferCoin(vVictory[j], vVictoryMap[vVictory[j]] * oddsV / 100);
            }
        }
        if (h == v) {
            for (uint k = 0; k < draw.length; k++) {
                transferCoin(draw[k], drawMap[draw[k]] * oddsD / 100);
            }
        }
        emit returnBetResult(205, "比赛结束", _hCore, _vCore);
        reset();
        //        if (block.timestamp * 1000 > deadline) {
        //            drawings();
        //            reset();
        //        }
    }

    // The present function, only the creator's account can be presented
    function drawings(uint _coin) public payable {
        if (msg.sender == creator) {
            uint _balance = getCurrentBalance();
            transferCoin(creator, _balance);
        }
    }

    // Reset function
    function reset() private {
        for (uint i = 0; i < hVictory.length; i++) {
            hVictoryMap[hVictory[i]] = 0;
        }
        hVictory.length = 0;
        for (uint j = 0; j < vVictory.length; j++) {
            vVictoryMap[vVictory[j]] = 0;
        }
        vVictory.length = 0;
        for (uint k = 0; k < draw.length; k++) {
            drawMap[draw[k]] = 0;
        }
        draw.length = 0;
    }

    // Transfer function
    /*
    * @_to Target address
    * @_coins Amount of money
    */
    function transferCoin(address _to, uint _coins) private {
        _to.transfer(_coins);
    }
}
