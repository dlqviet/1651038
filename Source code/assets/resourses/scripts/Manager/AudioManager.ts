const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    @property(cc.AudioClip)
    m_collisionAudio: cc.AudioClip = null;
    @property(cc.AudioClip)
    m_dropAudio: cc.AudioClip = null;
    @property(cc.AudioClip)
    m_scoreAudio: cc.AudioClip = null;
    @property(cc.AudioClip)
    m_jumpAudio: cc.AudioClip = null;
    
    @property(cc.Node)
    m_onSound: cc.Node = null;
    @property(cc.Node)
    m_offSound: cc.Node = null;

    checkOffAudio = false;

    PlayJumpSound() {
        cc.audioEngine.playEffect(this.m_jumpAudio, false);
        if(this.checkOffAudio){
            cc.audioEngine.stopAllEffects();
        }
    }

    PlayCollisionSound() {
        cc.audioEngine.playEffect(this.m_collisionAudio, false);
        if(this.checkOffAudio){
            cc.audioEngine.stopAllEffects();
        }
    }

    PlayDropSound() {
        cc.audioEngine.playEffect(this.m_dropAudio, false);
        if(this.checkOffAudio){
            cc.audioEngine.stopAllEffects();
        }
    }

    PlayScoreSound() {
        cc.audioEngine.playEffect(this.m_scoreAudio, false);
        if(this.checkOffAudio){
            cc.audioEngine.stopAllEffects();
        }
    }

    OnSoundIngame(){
        this.m_offSound.active = false;
        this.m_onSound.active = true;
        this.checkOffAudio = false;
    }

    OffSoundIngame(){
        this.m_offSound.active = true;
        this.m_onSound.active = false;
        this.checkOffAudio = true;
    }
}
