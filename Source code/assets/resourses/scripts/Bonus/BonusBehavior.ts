const {ccclass, property} = cc._decorator;

@ccclass
export default class BonusBehavior extends cc.Component {

    deadTimer = 0;

    onLoad() {
        this.schedule(this.DeadTimeCounter,1);
    }

    DeadTimeCounter() {
        this.deadTimer++;
    }

    onCollisionEnter(other, self) {
        switch (other.tag) {
            case 0:
            {
                this.deadTimer = 0;
                this.node.parent.getComponent('BonusManager').bonusTimer = 0;
                this.node.parent.getComponent('BonusManager').IncreaseBonusTime();
                this.node.parent.getComponent('BonusManager').bonusStack++;
                this.node.parent.parent.getChildByName('Ball').getComponent('BallManager').SpawnBall(this.node.parent.getComponent('BonusManager').bonusStack);
                this.node.destroy();
            }
        }
    }

    update() {
        if (this.deadTimer == this.node.parent.getComponent('BonusManager').m_deadTime)
        {
            this.deadTimer = 0;
            this.node.destroy();
            this.node.parent.getComponent('BonusManager').ResetBonusTime();
        }
    }
}
