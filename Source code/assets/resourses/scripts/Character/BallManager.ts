const {ccclass, property} = cc._decorator;

@ccclass
export default class BallManager extends cc.Component {

    @property(cc.Prefab) m_ballPrefab: cc.Prefab = null;

    @property
    m_stackToActivePower: number = 0;

    @property
    m_powerTime: number = 0;

    randomRL = 0;

    newBall = null;
    
    comboStack = 0;
    powerFull = false;
    powerTimer = 0;

    SpawnBall(Number) {
        if (Math.random() < 0.5)
        {
            this.randomRL = -1;
        }
        else
        {
            this.randomRL = 1;
        }
        this.newBall = cc.instantiate(this.m_ballPrefab);
        this.node.addChild(this.newBall);
        if (Number > 1)
        {
            this.newBall.setPosition(this.GetBonusBallPosition());
        }   
        else
        {
            this.newBall.setPosition(this.GetStartBallPosition());
        }
    }

    GetStartBallPosition() {
        var randX = 300 * this.randomRL;
        var y = 200;
        return cc.v2(randX, y);
    }

    GetBonusBallPosition() {
        var pos = this.node.parent.getChildByName('Bonus').getChildByName('Bonus').getPosition();
        pos.x += 50;
        pos.y += 50;
        return pos;  
    }

    CheckActivePowerBall() {
        if (this.comboStack == this.m_stackToActivePower)
        {
            this.schedule(this.PowerTimeCounter,1);
            this.powerFull = true;
            this.comboStack = 0;
        }
    }

    CheckDeactivePowerBall() {
        if (this.powerTimer == this.m_powerTime)
        {
            this.unschedule(this.PowerTimeCounter);
            this.powerTimer = 0;
            this.powerFull = false;
        }
    }

    PowerTimeCounter() {
        this.powerTimer++;
    }

    ResetBall() {
        this.powerFull = false;
        this.comboStack = 0;
        this.powerTimer = 0;
    }

    update() {
        this.CheckActivePowerBall();
        this.CheckDeactivePowerBall();
    }
}
