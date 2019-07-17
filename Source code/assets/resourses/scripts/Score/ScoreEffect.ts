const {ccclass, property} = cc._decorator;

@ccclass
export default class ScoreEffect extends cc.Component {

    @property({
        type: cc.Animation
    })
    anim = null;
    game = null;

    init (game) {
        this.game = game;
        this.anim.getComponent('ScoreAnimation').init(this);
    }

    despawn () {
        this.game.DespawnScoreFX(this.node);
    }

    play () {
        this.anim.play('score_pop');
    }

}
