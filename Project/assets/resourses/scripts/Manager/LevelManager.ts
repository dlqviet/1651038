const {ccclass, property} = cc._decorator;


@ccclass("PrefabElement")
export class PrefabElement{
    @property(cc.Prefab)
    m_prefab: cc.Prefab = null;
    @property(Number)
    m_spawnRate: number = 0;
}

@ccclass("NormalRocket")
export class NormalRocket{

    @property(cc.Prefab)
    m_prefab: cc.Prefab = null;
    @property(Number)
    m_minHeight: number = 0;
    @property(Number)
    m_maxHeight: number = 0;
    @property(Number)
    m_indicatorDurationTime: number = 0;   
    @property(Number)
    m_indicatorFlashingTime: number = 0;
    @property(Number)
    m_rocketSpeed: number = 0;
}

@ccclass("FollowRocket")
export class FollowRocket{

    @property(cc.Prefab)
    m_prefab: cc.Prefab = null;
    @property(Number)
    m_time: Number = 0;
    @property(Number)
    m_minHeight: number = 0;
    @property(Number)
    m_maxHeight: number = 0;
    @property(Number)
    m_indicatorFollowDurationTime: number = 0;   
    @property(Number)
    m_indicatorFlashingTime: number = 0;
    @property(Number)
    m_rocketSpeed: number = 0;
}

@ccclass("Level")
export class Level{
    @property(Number) 
    m_startTime: number = 0;
    
    @property(Number) 
    m_levelTime: number = 0;

    @property(Number)
    m_speedSpawn: number = 0;
    
    @property(Boolean)
    m_normalRocket: boolean = false;

    @property({
        type: NormalRocket,
        visible: function (this: Level){ return this.m_normalRocket} 
    })
    m_normalRocketInfo: NormalRocket = null;

    @property(Boolean)
    m_followRocket: boolean = false;

    @property({
        type: FollowRocket,
        visible: function (this: Level){ return this.m_followRocket} 
        
    })
    m_followRocketInfo: FollowRocket = null;

    @property(PrefabElement)
    m_prefabArray: PrefabElement[] = [];
}

@ccclass
export default class LevelManager extends cc.Component {

    @property(Level)
    m_level: Level[] = [];
    
    levelNo = 0;
    prefabType = null;

    tmp = 0;
    random = 0;

    heightMeasure = 0;

    CheckLevelUp() {
        if (this.node.getComponent('GameManager').gameTimer == this.tmp)
        {  
            this.node.getChildByName('InGame').getChildByName('Platform').getComponent('PlatformManager').UnscheduleSpawn();
            //this.node.getChildByName('InGame').getChildByName('Rocket').getComponent('RocketManager').UnscheduleSpawn();
        }
    }

    CheckLevel() {
        for(var i = 0; i < this.m_level.length; i++)
        {
            if (this.node.getComponent('GameManager').gameTimer == this.m_level[i].m_startTime)
            {
                this.levelNo = i;
                break;
            }
        }
    }

    LoadLevel() {
        for (var lvlNo = 0; lvlNo < this.m_level.length; lvlNo++)
        {
            if (this.levelNo == lvlNo)
            {
                this.random = Math.random()*100;
                var i = 1;
                var min = 0;
                var max = this.m_level[lvlNo].m_prefabArray[0].m_spawnRate;
                if (this.random >= min && this.random < max)
                {
                    this.prefabType = this.m_level[lvlNo].m_prefabArray[0].m_prefab;
                }
                while (i < this.m_level[lvlNo].m_prefabArray.length)
                {
                    min += this.m_level[lvlNo].m_prefabArray[i-1].m_spawnRate;
                    max += this.m_level[lvlNo].m_prefabArray[i].m_spawnRate;
                    if (this.random >= min && this.random < max)
                    {
                        this.prefabType = this.m_level[lvlNo].m_prefabArray[i].m_prefab;
                    }
                    i++;
                }
                this.node.getChildByName('InGame').getChildByName('Platform').getComponent('PlatformManager').ScheduleSpawn();

                if (this.m_level[lvlNo].m_normalRocket) {
                    this.node.getChildByName('InGame').getChildByName('Rocket').getComponent('RocketManager').ScheduleSpawn();
                }
                this.tmp = this.m_level[lvlNo].m_startTime + this.m_level[lvlNo].m_levelTime;
                break;
            }
        }
    }
    
    InitialPlatforms(){ 
        for(this.heightMeasure; this.heightMeasure < this.node.height / 2; this.heightMeasure += 120){ 
            this.node.getChildByName('InGame').getChildByName('Platform').getComponent('PlatformManager').SpawnBeginPlatforms(); 
        } 
    } 

    update(){
        if (this.node.getComponent('GameManager').isPlaying)
        {
            this.CheckLevel();
            this.LoadLevel();
            this.CheckLevelUp();
            this.InitialPlatforms();
        }        
    }
}

