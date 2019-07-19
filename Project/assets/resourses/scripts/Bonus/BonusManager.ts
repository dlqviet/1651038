const {ccclass, property} = cc._decorator;

@ccclass
export default class BonusManager extends cc.Component {

    @property(cc.Prefab)
    m_bonusPrefab: cc.Prefab = null;

    @property m_bonusStack: number = 0;

    @property m_bonusTime: number = 0;

    @property m_nextTime: number = 0;

    @property m_deadTime: number = 0;

    bonusTimer = 0;
    newBonus = null;
    spawnOneBonus = false;
    firstBonusTime = 0;
    bonusStack = 1;

    onLoad() {
        this.firstBonusTime = this.m_bonusTime;
        this.schedule(this.BonusTimeCounter,1);
    }

    IncreaseBonusTime() {
        this.m_bonusTime += this.m_nextTime;
    }

    DecreaseBonusTime() {
        this.m_bonusTime -= this.m_nextTime;
    }

    ResetBonusTime() {
        this.m_bonusTime = this.firstBonusTime;
    }

    SpawnBonus() {
        this.bonusTimer = -this.m_deadTime;
        this.newBonus = cc.instantiate(this.m_bonusPrefab);
        this.node.addChild(this.newBonus);
        this.newBonus.setPosition(this.GetBonusPosition());
    }

    CheckBonus(){
        if (this.spawnOneBonus == false 
            && this.bonusStack < this.m_bonusStack
            && this.bonusTimer == this.m_bonusTime)
        {
            this.SpawnBonus();
            this.spawnOneBonus = true;  
            this.scheduleOnce(this.DelayBonus,1);
        }
    }

    DelayBonus() {
        this.spawnOneBonus = false;
    }

    ResetBonus() {
        this.ResetBonusTime();
        this.bonusStack = 1;
        this.bonusTimer = 0;
        this.schedule(this.BonusTimeCounter,1);
    }

    GetBonusPosition() {
        var random;
        if (Math.random() <= 0.5)
        {
            random = -1;
        }
        else
        {
            random = 1;
        }
        var randX = random*185 + 140*Math.random()*random;
        var randY = Math.random() * 555;
        return cc.v2(randX, randY);
    }

    BonusTimeCounter() {
        this.bonusTimer++;
    }

    update() {
        this.CheckBonus();
    }
}
