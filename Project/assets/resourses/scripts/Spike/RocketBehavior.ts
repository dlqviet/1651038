const {ccclass, property} = cc._decorator;

@ccclass
export default class RocketBehavior extends cc.Component {

    @property
    m_duration: number = 0;

    RocketRotation() {
        switch (this.node.parent.getComponent('RocketManager').random)
        {
            case -1:
            {
                this.node.rotation = 0;
                this.getComponent(cc.RigidBody).linearVelocity = cc.v2(500,0);
                break;
            }
            case 1:
            {
                this.node.rotation = 180; 
                this.getComponent(cc.RigidBody).linearVelocity = cc.v2(-500,0);
                break;
            }
        }
    }

    DestroyRocket(){
        this.node.destroy();
    }

    // onCollisionEnter(other, self) {
    //     switch (other.tag) {
    //         case 0:
    //         {
    //             this.node.parent.parent.getChildByName('Ball').getComponent('BallManager').newBall.destroy();
    //             this.node.parent.parent.parent.getComponent('GameManager').GameOver();
    //             break;
    //         }
    //     }
    // }

    update(dt){
    }

}
