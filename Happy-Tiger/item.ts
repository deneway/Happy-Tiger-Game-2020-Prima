namespace HappyTiger {
    import ƒ = FudgeCore;
    import ƒAid = FudgeAid;
  


    export class item extends ƒAid.NodeSprite {
    public static animations: ƒAid.SpriteSheetAnimations;  
    public action: ACTION;
    public speed: ƒ.Vector3 = ƒ.Vector3.ZERO();
    public static gravity: ƒ.Vector2 = ƒ.Vector2.Y(-3);
    public static readonly pivot: ƒ.Matrix4x4 = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));

    
    constructor(_name: string = "Item") {
        super(_name);
       
    }
    public checkCollision(): void {
        for (let floor of level.getChildren()) {
          if (floor.name == "Floor"){
          let rect: ƒ.Rectangle = (<Floor>floor).getRectWorld();
          let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
          if (hit) {
            let translation: ƒ.Vector3 = this.cmpTransform.local.translation;
            translation.y = rect.y;
            this.cmpTransform.local.translation = translation;
            this.speed.y = 0;
          }
        }
    }
    }
  }
}