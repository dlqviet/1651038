const {ccclass, property} = cc._decorator;

@ccclass
export default class PlatformBehavior extends cc.Component {

    @property(cc.Color)
    m_color: cc.Color[] = [];
    @property([cc.SpriteFrame])
    m_sprite: Array<cc.SpriteFrame> = [];

    @property(cc.AnimationClip)
    m_animation: cc.AnimationClip = null;

    @property m_limitBreak: number = 0;
    

    collisionTime = 0;
    breakTime = 0;
    oneScore = false;
    
    

    onLoad(){
        this.breakTime = this.m_limitBreak;
    }

    BreakBrick() {
        this.node.getChildByName('PerfectPoint').getComponent(cc.Animation).defaultClip = this.m_animation;
        this.node.getChildByName('PerfectPoint').getComponent(cc.Animation).play(this.m_animation.toString());
        this.node.getComponent(cc.Animation).play(this.m_animation.toString());
        this.node.runAction(cc.sequence(cc.fadeOut(0.3), cc.callFunc(() => {this.node.destroy();}, this)));
        var pos = this.node.getPosition();
        this.node.parent.parent.getChildByName('ScoreManager').getComponent('ScoreManager').GainScore(pos);
    }

    BreakBrickPerfect() {
        this.node.getChildByName('PerfectPoint').getComponent(cc.Animation).defaultClip = this.m_animation;
        this.node.getChildByName('PerfectPoint').getComponent(cc.Animation).play(this.m_animation.toString());
        this.node.getComponent(cc.Animation).play(this.m_animation.toString());
        this.node.runAction(cc.sequence(cc.fadeOut(0.3), cc.callFunc(() => {this.node.destroy();}, this)));
        var pos2 = this.node.getPosition();
        this.node.parent.parent.getChildByName('ScoreManager').getComponent('ScoreManager').GainScorePerfect(pos2);
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
                                this.node.getComponent(cc.Sprite).spriteFrame = this.m_sprite[this.m_limitBreak - this.breakTime];
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
                            this.BreakBrickPerfect();
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
                        this.node.parent.getComponent('PlatformManager').deathByRoof = true;
                        this.node.parent.parent.parent.getComponent('GameManager').GameOver();
                        break;
                    }   
                }
            }
        }
    }
}
