
const {ccclass, property} = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {

    @property(cc.Node)
    m_gameName: cc.Node = null;

    @property(cc.Node)
    m_playButton: cc.Node = null;

    @property(cc.Node)
    m_replayButton: cc.Node = null;

    @property(cc.Node) 
    m_mainMenuGameUI: cc.Node = null;

    @property(cc.Node) 
    m_inGameUI: cc.Node = null;

    @property(cc.Node) 
    m_roof: cc.Node = null;

    @property(cc.Node) 
    m_gameOverUI: cc.Node = null;

    @property(cc.Layout) 
    m_pauseIngameUI: cc.Layout = null;

    @property(cc.Layout) 
    m_settingUI: cc.Layout = null;

    isRestart = false;

    onLoad(){
        this.m_roof.active = false;
    }

    OnGameOver() {
        this.m_gameOverUI.active = true;
        this.m_inGameUI.active = false;
        this.m_replayButton.active = true;
        this.node.getChildByName('InGame').getChildByName('ScoreManager').getComponent('ScoreManager').DisplayScoreBoard();
    }

    PressBtnPause(){
        cc.director.pause();
        this.isRestart = true;
        this.m_pauseIngameUI.node.active = true;
    }

    PressBtnPlay(){
        this.m_gameName.active = false;
        this.m_gameOverUI.active = false;
        this.m_mainMenuGameUI.active = false;
        this.m_inGameUI.active = true;
        this.m_roof.active = true;
        cc.director.resume();
    }

    PressBtnPlayContinue(){
        this.isRestart = false;
        this.m_pauseIngameUI.node.active = false;
        cc.director.resume();
    }

    PressBtnHomeInPaused(){
        this.m_inGameUI.active = false;
        this.m_pauseIngameUI.node.active = false;
        this.m_gameOverUI.active = false;
        this.m_gameName.active = true;
        this.m_mainMenuGameUI.active = true;
        cc.director.resume();
    }

    PressBtnRestartGame(){
        this.m_pauseIngameUI.node.active = false;
        cc.director.resume();
    }

    PressBtnSettingIngame(){
        this.m_mainMenuGameUI.active = false;
        this.m_settingUI.node.active = true;
    }

    PressBackInSettingUI(){
        this.m_settingUI.node.active = false;
        this.m_mainMenuGameUI.active = true;
    }


    update () {
        if(this.m_gameOverUI.active){
            this.m_roof.active = false;
        }
    }
}
