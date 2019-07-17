const {ccclass, property} = cc._decorator;

@ccclass
export default class PlatformBehavior extends cc.Component {

    @property(cc.Color)
    m_color: cc.Color[] = [];

    @property m_limitBreak: number = 0;

    collisionTime = 0;
    breakTime = 0;
    oneScore = false;
    

    onLoad(){
        this.breakTime = this.m_limitBreak;
    }

    BreakBrick() {
        this.node.getChildByName('PerfectPoint').getComponent(cc.Animation).play('breaking');
        this.node.getComponent(cc.Animation).play('breaking');
        this.node.runAction(cc.sequence(cc.fadeOut(0.3), cc.callFunc(() => {this.node.destroy();}, this)));
        var pos = this.node.getPosition();
        this.node.parent.parent.parent.getComponent('ScoreManager').GainScore(pos);
    }

    onCollisionEnter(other, self) {
        switch (other.tag) {
            case 0:
            {
                switch(self.tag) {
                    case 5:
                    {
                        if (!this.node.parent.parent.getChildByName('Ball').getComponent('BallManager').powerFull)
                        {
                            this.node.parent.parent.getChildByName('Ball').getComponent('BallManager').comboStack = 0;
                            this.collisionTime ++;
                            if (this.collisionTime == this.m_limitBreak)
                            {
                                if (this.node.opacity == 255){
                                    this.node.opacity -= 1;
                                    this.BreakBrick();
                                    this.collisionTime = 0;
                                }
                            }
                            if (this.collisionTime == this.m_limitBreak - this.breakTime + 1)
                            {
                                this.node.color = this.m_color[this.m_limitBreak - this.breakTime];
                                this.breakTime--;
                            }
                            break;    
                        }
                        else
                        {
                            if (this.node.opacity == 255){
                                this.node.opacity -= 1;
                                this.BreakBrick();
                                this.collisionTime = 0;
                            }
                            break;   
                        }
                    }
                    case 6:
                    {
                        if (this.node.parent.parent.getChildByName('Ball').getComponent('BallManager').powerFull)
                        {
                            if (this.node.opacity == 255){
                                this.node.opacity -= 1;
                                this.BreakBrick();
                                this.collisionTime = 0;
                            }
                            break;   
                        }
                    }
                    case 7:
                    {
                        if (!this.node.parent.parent.getChildByName('Ball').getComponent('BallManager').powerFull)
                        {
                            this.node.parent.parent.getChildByName('Ball').getComponent('BallManager').comboStack++;
                        }
                        if (this.node.opacity == 255){
                            this.node.opacity -= 1;
                            this.BreakBrick();
                            this.collisionTime = 0;
                        }
                        break; 
                    }
                }
            }
        }
        switch (other.tag) {
            case 1:
            {
                switch(self.tag) {
                    case 5:
                    {
                        this.node.parent.parent.parent.getComponent('GameManager').GameOver();
                        break;
                    }   
                }
            }
        }
    }
}
