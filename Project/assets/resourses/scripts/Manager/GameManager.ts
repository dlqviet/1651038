const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    @property(cc.Node) 
    m_ball: cc.Node = null;

    @property(cc.Node)
    m_platform: cc.Node = null;

    @property(cc.Node)
    m_spike: cc.Node = null;

    @property(cc.Node)
    m_bonus: cc.Node = null;

    replay = false;
    isSwipe = false;
    isPlaying = false;
    isGameOver = false;
    gameTimer = 0;

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
    }

    StartGame() {
        this.gameTimer = 0;
        this.isPlaying = true;
        this.m_platform.getComponent('PlatformManager').deathByRoof = false;
        this.m_ball.getComponent('BallManager').OnStartBall();
        this.schedule(this.TimeCounter, 1);
    }

    GameOver() {
        this.isPlaying = false;
        this.node.getComponent('AudioManager').PlayDropSound();
        this.node.getComponent('UIManager').OnGameOver();
        this.scheduleOnce(this.DestroyAll,0.1);
    }

    ResetGame() {
        this.node.getComponent('LevelManager').heightMeasure = 0;
        this.node.getChildByName('InGame').getChildByName('ScoreManager').getComponent('ScoreManager').ResetScore();
        this.m_ball.getComponent('BallManager').ResetBall();
        this.m_bonus.getComponent('BonusManager').ResetBonus();
        this.gameTimer = 0;
    }

    ReplayGame() {
        this.node.getComponent('UIManager').isRestart = false;
        this.ResetGame();
        this.StartGame();
    }

    DestroyAll() {
        this.m_ball.destroyAllChildren();
        this.m_platform.destroyAllChildren();
        this.m_spike.destroyAllChildren();
        this.m_bonus.destroyAllChildren();
    }

    TimeCounter() {
        this.gameTimer++;
    }

    update() {
        if (this.isGameOver)
        {
            this.isGameOver = false;
            this.GameOver();
        }
    }
}
