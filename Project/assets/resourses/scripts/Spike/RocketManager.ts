const {ccclass, property} = cc._decorator;

@ccclass
export default class RocketManager extends cc.Component {

    newRocket = null;
    prefabSlot = null;
    random = 0;

    ScheduleSpawn(){
        this.schedule(this.SpawnNewRocket,
            1); 
    }
    UnscheduleSpawn(){
        this.unschedule(this.SpawnNewRocket); 
    }

    SpawnNewRocket() {
        var rand = Math.random();
        if (rand < 0.33)
        {
            this.random = 1;
        }
        else if (rand > 0.66)
        {
            this.random = -1;
        }
        else
        {
            this.random = 0;
        }
        
        this.newRocket = cc.instantiate(this.node.parent.parent.getComponent('LevelManager').m_level[this.node.parent.parent.getComponent('LevelManager').levelNo].m_normalRocketInfo.m_prefab);
        this.node.addChild(this.newRocket);
        this.newRocket.getComponent('RocketBehavior').RocketRotation();
        this.newRocket.setPosition(this.GetRocketPosition());
    }   

    GetRocketPosition() {
        if (this.random == -1 || this.random == 1)
        {
            let x = 335*(this.random);
            let randY = 565 - 1180 * Math.random();
            return cc.v2(x, randY);
        }
    }

}
