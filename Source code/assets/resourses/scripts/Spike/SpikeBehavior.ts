const {ccclass, property} = cc._decorator;

@ccclass
export default class SpikeBehavior extends cc.Component {

    @property
    m_duration: number = 0;

    deadTimer = 0;

    onLoad(){
        this.schedule(this.TimeCounter, 1);
    }

    TimeCounter() {
        this.deadTimer++;
    }

    SpikeRotation() {
        switch (this.node.parent.getComponent('SpikeManager').random)
        {
            case -1:
            {
                this.node.rotation = 90;
                break;
            }
            case 1:
            {
                this.node.rotation = -90; 
                break;
            }
            case 0:
            {
                this.node.rotation = 180; 
                break;
            }
        }
    }

    DestroySpike(){
        this.node.destroy();
    }

    onCollisionEnter(other, self) {
        switch (other.tag) {
            case 0:
            {
                this.node.parent.parent.getChildByName('Ball').getComponent('BallManager').newBall.destroy();
                this.node.parent.parent.parent.getComponent('GameManager').GameOver();
                break;
            }
        }
    }

    update(dt){
        if (this.deadTimer == this.m_duration)
        {
            this.DestroySpike();
        }
    }

}
