
const {ccclass, property} = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {

    @property(cc.Layout) m_pauseIngameUI: cc.Layout = null;
    @property(cc.Layout) m_settingUI: cc.Layout = null;
    @property(cc.Node) m_menuMainGameUI: cc.Node = null;
    @property(cc.Node) m_inGameUI: cc.Node = null;
    @property(cc.Node) m_roof: cc.Node = null;
    @property(cc.Node) m_gameOverUI: cc.Node = null;
    onLoad(){
        this.m_roof.active = false;
    }
    PressBtnPause(){
        cc.director.pause();
        this.m_pauseIngameUI.node.active = true;
    }

    PressBtnPlay(){
        this.m_inGameUI.active = true;
        this.m_roof.active = true;
        cc.director.resume();
    }

    PressBtnPlayContinue(){
        this.m_pauseIngameUI.node.active = false;
        cc.director.resume();
    }

    PressBtnHomeInPaused(){
        this.m_inGameUI.active = false;
        this.m_pauseIngameUI.node.active = false;
        this.m_gameOverUI.active = false;
        this.m_menuMainGameUI.active = true;
    }

    PressBtnRestartGame(){
        this.m_pauseIngameUI.node.active = false;
        cc.director.resume();
    }

    PressBtnSettingIngame(){
        this.m_menuMainGameUI.active = false;
        this.m_settingUI.node.active = true;
    }

    PressBackInSettingUI(){
        this.m_settingUI.node.active = false;
        this.m_menuMainGameUI.active = true;
    }

    start () {

    }

    update (dt) {
        if(this.m_gameOverUI.active){
            this.m_roof.active = false;
        }
    }
}
