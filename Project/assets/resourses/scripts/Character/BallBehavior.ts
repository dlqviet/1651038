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
    m_finalFallSpeed: number = 0;

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
    ballManager = null;
    
    ballTmp = null;
    
    unuse() {
        this.unscheduleAllCallbacks();
    }

    reuse() {
        //this.node.parent = Ball;
    }

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
                    this.node.parent.parent.parent.getComponent('GameManager').isGameOver = true;
                    //this.node.parent.getComponent('BallManager').DestroyBall(this.node);
                    this.node.active = false;
                }
                else
                {   
                    this.node.active = false;
                    //this.node.parent.getComponent('BallManager').DestroyBall(this.node);
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
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speedX/2, Math.abs(this.speedY) * 3);
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
                        this.node.parent.parent.parent.getComponent('GameManager').isGameOver = true;
                        this.node.active = false;
                        //this.node.parent.getComponent('BallManager').DestroyBall(this.node);
                    }
                    else
                    {
                        this.node.active = false;
                        //this.node.parent.getComponent('BallManager').DestroyBall(this.node);
                        this.node.parent.parent.getChildByName('Bonus').getComponent('BonusManager').DecreaseBonusTime();
                    }
                    break;
                }
            }
            case 7:
            {
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speedX/2, Math.abs(this.speedY) * 3);
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
        if(this.node.y >= 610){
            this.node.y = 610;
        }

        if(this.node.x <= -360){
            this.node.x = -360;
        }

        if(this.node.x >= 360){
            this.node.x = 360;
        }

        // if (this.node.parent.parent.parent.getComponent('UIManager').isRestart)
        // { 
        //     this.node.parent.parent.parent.getComponent('GameManager').isGameOver = true;
        // }
        if (this.node.parent.getComponent('BallManager').powerFull)
        {
            this.myParticle.resetSystem();
            this.node.getChildByName('MotionStreak').active = false;
            this.node.getChildByName('PowerStreak').active = true;
        }
        else
        {
            this.myParticle.stopSystem();
            this.node.getChildByName('MotionStreak').active = true;
            this.node.getChildByName('PowerStreak').active = false;
        }

        if (!this.isJumping)
        {
            this.node.getComponent(cc.RigidBody).gravityScale += dt * 5;
        }

        this.node.parent.parent.parent.on(cc.Node.EventType.TOUCH_START, function(event){
            if (event.touch.getID() == 0)
            {
                if(!this.node.parent.parent.parent.getComponent("UIManager").m_pauseIngameUI.node.active == true){
                    this.touchStart = event.touch.getLocation();
                    if (!this.isJumping)
                    {
                        this.isFalling = false;
                        this.isJumping = true;
                    }
                }
            }
        },this);

        this.node.parent.parent.parent.on(cc.Node.EventType.TOUCH_MOVE, function(event){
            if (event.touch.getID() == 0)
            {
                if(!this.node.parent.parent.parent.getComponent("UIManager").m_pauseIngameUI.node.active == true){
                    var touchEnd = event.touch.getLocationY();                               
                    var delta = this.touchStart.y - touchEnd;
                    if (delta > this.m_minPixelForSwipe)
                    {
                        this.isJumping = false;
                        this.isFalling = true;
                    }
                }
            }
        },this);

        this.node.parent.parent.parent.on(cc.Node.EventType.TOUCH_END, function(event){
            if (event.touch.getID() == 0)
            {
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
                        
                        if(this.deltaX < 0){
                            this.speedX = -Math.abs(this.speedX);
                        }
                        else{
                            this.speedX = Math.abs(this.speedX);
                        }
                    
                        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.m_finalFallSpeed * this.deltaX / Math.abs(this.deltaY), -this.m_finalFallSpeed);
                    }
                }
            }
        },this);
    }
}
