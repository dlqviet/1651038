const {ccclass, property} = cc._decorator;

@ccclass
export default class BallBehavior extends cc.Component {

    @property(cc.Node)
    m_particle: cc.Node = null;

    /*@property(cc.Layout)
    m_layoutPaused: cc.Layout = null;*/

    @property
    m_jumpHeight: number = 0;
    
	@property
    m_jumpDuration: number = 0;

    @property
    m_fallSpeed: number = 0;

    @property
    m_maxFallSpeed: number = 0;

    @property
    m_minPixelForSwipe: number = 0;

    firstGravity = 0;
    isJumping = false;
    isFalling = false;

    startX = 0;
    startY = 0;
    speedX = 0;
    speedY = 0;
    
    touchStart = null;
    touchEnd = null;

    deltaX = null;
    deltaY = null;
    myParticle = null;

    onCollisionEnter(other, self) {
        this.node.parent.parent.parent.getComponent('AudioManager').PlayCollisionSound();
        switch (other.tag) {
            case 1:
            {
                this.node.getComponent(cc.RigidBody).gravityScale = this.firstGravity;
                break;
            } 
            case 2:
            {
                this.node.getComponent(cc.RigidBody).gravityScale = this.firstGravity;
                this.node.parent.parent.getChildByName('Bonus').getComponent('BonusManager').bonusStack--;
                if (this.node.parent.parent.getChildByName('Bonus').getComponent('BonusManager').bonusStack == 0)
                {
                    this.node.parent.parent.parent.getComponent('GameManager').GameOver();
                }
                else
                {
                    //this.node.setPosition(cc.v2(10000,-10000));
                    this.node.parent.getComponent('BallManager').powerFull = false;
                    this.node.active = false;
                    //this.node.destroy();
                    this.node.parent.parent.getChildByName('Bonus').getComponent('BonusManager').DecreaseBonusTime();
                }
                break;
            }
            case 3:
            {
                this.node.getComponent(cc.RigidBody).gravityScale = this.firstGravity;
                this.speedX = Math.abs(this.speedX);
                break;
            }
            case 4:
            {
                this.node.getComponent(cc.RigidBody).gravityScale = this.firstGravity;
                this.speedX = -Math.abs(this.speedX);
                break;
            }
            case 5:
            {
                this.node.getComponent(cc.RigidBody).linearVelocity.x = this.startX;
                this.node.getComponent(cc.RigidBody).linearVelocity.y = this.startY;
                this.node.getComponent(cc.RigidBody).gravityScale = this.firstGravity;
                break;
            }
            case 6:
            {
                this.node.getComponent(cc.RigidBody).gravityScale = this.firstGravity;
                if (!this.node.parent.getComponent('BallManager').powerFull)
                {
                    this.node.parent.parent.getChildByName('Bonus').getComponent('BonusManager').bonusStack--;
                    if (this.node.parent.parent.getChildByName('Bonus').getComponent('BonusManager').bonusStack == 0)
                    {
                        this.node.parent.parent.parent.getComponent('GameManager').GameOver();
                    }
                    else
                    {
                        this.node.parent.getComponent('BallManager').powerFull = false;
                        //this.node.setPosition(cc.v2(10000,-10000));
                        this.node.active = false;
                        //this.node.destroy();
                        this.node.parent.parent.getChildByName('Bonus').getComponent('BonusManager').DecreaseBonusTime();
                    }
                    break;
                }
            }
            case 7:
            {
                this.node.getComponent(cc.RigidBody).gravityScale = this.firstGravity;
                break;
            }
        }
    }

	SetJumpAction() {
        var jumpUp = cc.moveBy(this.m_jumpDuration, cc.v2(0, this.m_jumpHeight)).easing(cc.easeCubicActionOut());
        return jumpUp;
    }

	onLoad() {

        this.myParticle = this.m_particle.getComponent(cc.ParticleSystem);
        this.myParticle.stopSystem();

        this.firstGravity =  this.node.getComponent(cc.RigidBody).gravityScale;

        this.startX = this.getComponent(cc.RigidBody).linearVelocity.x;
        this.startY = this.getComponent(cc.RigidBody).linearVelocity.y;
    
        this.speedX = this.startX * (-this.node.parent.getComponent('BallManager').randomRL);
        this.speedY = this.startY * -Math.abs(this.node.parent.getComponent('BallManager').randomRL);

        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speedX,this.speedY);
    }

	update(dt) {
        if (this.node.parent.getComponent('BallManager').powerFull)
        {
            this.myParticle.resetSystem();
        }
        else
        {
            this.myParticle.stopSystem();
        }

        if (!this.isJumping)
        {
            this.node.getComponent(cc.RigidBody).gravityScale += dt * 5;
        }

            this.node.parent.parent.parent.on(cc.Node.EventType.TOUCH_START, function(event){
                if(!this.node.parent.parent.parent.getComponent("UIManager").m_pauseIngameUI.node.active == true){
                    this.touchStart = event.touch.getLocation();
                    if (!this.isJumping)
                    {
                        this.isFalling = false;
                        this.isJumping = true;
                    }
                }
            },this);
    
            this.node.parent.parent.parent.on(cc.Node.EventType.TOUCH_MOVE, function(event){
                if(!this.node.parent.parent.parent.getComponent("UIManager").m_pauseIngameUI.node.active == true){
                    var touchEnd = event.touch.getLocationY();
                    var delta = this.touchStart.y - touchEnd;
                    if (delta > this.m_minPixelForSwipe)
                    {
                        this.isJumping = false;
                        this.isFalling = true;
                    }
                }
            },this);
    
            this.node.parent.parent.parent.on(cc.Node.EventType.TOUCH_END, function(event){
                if(!this.node.parent.parent.parent.getComponent("UIManager").m_pauseIngameUI.node.active == true){
                    this.touchEnd = event.touch.getLocation();
                    if (this.isJumping)
                    {
                        this.isJumping = false;
                        this.node.parent.parent.parent.getComponent('GameManager').isSwipe = false;
    
                        this.node.parent.parent.parent.getComponent('AudioManager').PlayJumpSound();
    
                        this.node.getComponent(cc.RigidBody).gravityScale = this.firstGravity;
                        this.node.runAction(this.SetJumpAction());
                        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speedX,this.speedY);
                    }
    
                    if (this.isFalling)
                    {
                        this.isFalling = false;
                      this.node.parent.parent.parent.getComponent('GameManager').isSwipe = true;
    
                        this.node.parent.parent.parent.getComponent('AudioManager').PlayJumpSound();
                    
                        this.node.getComponent(cc.RigidBody).gravityScale = this.firstGravity;
                        this.deltaX = this.touchEnd.x - this.touchStart.x;
                        this.deltaY = -Math.abs(this.touchStart.y - this.touchEnd.y);
                    
                        var velocityX = this.deltaX * this.m_fallSpeed;
                        var velocityY = this.deltaY * this.m_fallSpeed;
                    
    
                        if(Math.abs(velocityY) > this.m_maxFallSpeed)
                        {
                            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.m_maxFallSpeed * this.deltaX / Math.abs(this.deltaY), -this.m_maxFallSpeed);
                        }
                        else 
                        {
                            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(velocityX, velocityY);
                        }
                    }
                }
            },this);
    }
}
