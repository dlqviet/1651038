const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    @property(cc.Node)
    m_gameName: cc.Node = null;

    @property(cc.Node)
    m_playButton: cc.Node = null;

    @property(cc.Node)
    m_replayButton: cc.Node = null;

    @property(cc.Node)
    m_inGame: cc.Node = null;

    @property(cc.Node)
    m_gameOver: cc.Node = null;

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
    gameTimer = 0;

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
    }

    StartGame() {
        this.gameTimer = 0;
        this.isPlaying = true;
        this.m_gameName.active = false;
        this.m_gameOver.active = false;
        this.m_inGame.active = true;
        this.m_ball.getComponent('BallManager').SpawnBall(1);
        this.schedule(this.TimeCounter, 1);
    }

    GameOver() {
        this.isPlaying = false;
        this.m_inGame.active = false;
        this.m_gameOver.active = true;
        this.m_replayButton.active = true;
        this.node.getComponent('AudioManager').PlayDropSound();
        this.getComponent('ScoreManager').DisplayScoreBoard();
        this.scheduleOnce(this.DestroyAll,0.1);
        
    }

    ResetGame() {
        this.node.getComponent('LevelManager').heightMeasure = 0;
        this.node.getComponent('ScoreManager').ResetScore();
        this.m_ball.getComponent('BallManager').ResetBall();
        this.m_bonus.getComponent('BonusManager').ResetBonus();
        this.gameTimer = 0;
    }

    ReplayGame() {
        this.m_replayButton.active = false;
        this.ResetGame();
        this.StartGame();
    }

    DestroyAll() {
        //this.m_ball.active = false;
        this.m_ball.destroyAllChildren();
        this.m_platform.destroyAllChildren();
        this.m_spike.destroyAllChildren();
        this.m_bonus.destroyAllChildren();
    }

    TimeCounter() {
        this.gameTimer++;
    }
}
