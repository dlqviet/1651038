const {ccclass, property} = cc._decorator;

@ccclass
export default class SpikeManager extends cc.Component {

    newSpike = null;
    prefabSlot = null;
    random = 0;

    ScheduleSpawn(){
        this.schedule(this.SpawnNewSpike,
            this.node.parent.parent.getComponent('LevelManager').m_level[this.node.parent.parent.getComponent('LevelManager').levelNo].m_spikeInfo.m_interval); 
    }
    UnscheduleSpawn(){
        this.unschedule(this.SpawnNewSpike); 
    }

    SpawnNewSpike() {
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
        
        this.newSpike = cc.instantiate(this.node.parent.parent.getComponent('LevelManager').m_level[this.node.parent.parent.getComponent('LevelManager').levelNo].m_spikeInfo.m_prefab);
        this.node.addChild(this.newSpike);
        this.newSpike.getComponent('SpikeBehavior').SpikeRotation();
        this.newSpike.setPosition(this.GetSpikePosition());
    }   

    GetSpikePosition() {
        if (this.random == -1 || this.random == 1)
        {
            let x = 335*(this.random);
            let randY = 565 - 1180 * Math.random();
            return cc.v2(x, randY);
        }
        else
        {
            let randX = 670 * (Math.random() - 0.5); 
            let y = 565; 
            return cc.v2(randX,y);
        }
        
    }

}
