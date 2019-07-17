const {ccclass, property} = cc._decorator;

@ccclass
export default class PlatformManager extends cc.Component {

    newPlatform = null;
    prefabSlot = null;

    ScheduleSpawn(){
        this.schedule(this.SpawnNewPlatform,this.node.parent.parent.getComponent('LevelManager').m_level[this.node.parent.parent.getComponent('LevelManager').levelNo].m_speedSpawn); 
    }

    UnscheduleSpawn(){
        this.unschedule(this.SpawnNewPlatform); 
    }

    SpawnNewPlatform() {
        this.prefabSlot = this.node.parent.parent.getComponent('LevelManager').prefabType;
        this.newPlatform = cc.instantiate(this.prefabSlot);
        if (this.node.parent.parent.getComponent('LevelManager').levelNo > 0
            && this.prefabSlot == this.node.parent.parent.getComponent('LevelManager').m_level[this.node.parent.parent.getComponent('LevelManager').levelNo].m_prefabArray[0].m_prefab)
        {
            this.newPlatform.scaleX = 1;
        }

        var random = Math.random();

        if(random >= 0.5){
            this.newPlatform.scaleX = -this.newPlatform.scaleX;
        }

        this.node.addChild(this.newPlatform);
        this.newPlatform.setPosition(this.GetPlatformPosition());
    } 
    
    SpawnBeginPlatforms(){
        var beginPrefabSlot = this.node.parent.parent.getComponent('LevelManager').m_level[this.node.parent.parent.getComponent('LevelManager').levelNo].m_prefabArray[0].m_prefab
        this.newPlatform = cc.instantiate(beginPrefabSlot);
        this.node.addChild(this.newPlatform);
        this.newPlatform.setPosition(this.GetPlatformPosition());
    }

    GetPlatformPosition() {
        var randX = this.node.width/2 + (Math.random() * 50);
        var y = -610;
        return cc.v2(randX, y);
    }

}
