const {ccclass, property} = cc._decorator;

@ccclass
export default class ScoreAnimation extends cc.Component {
    scoreFX = null;
    
    init (scoreFX) {
        this.scoreFX = scoreFX;
    }

    hideFX () {
        this.scoreFX.despawn();
    }
}
