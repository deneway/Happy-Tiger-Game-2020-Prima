namespace HappyTiger {
    import ƒ = FudgeCore;
    import ƒAid = FudgeAid;
  
    export enum ACTION {
      ROCKET = "Rocket"
    }


    export class Rocket extends item {
    public static animations: ƒAid.SpriteSheetAnimations;  
    public action: ACTION;
    public speed: ƒ.Vector3 = ƒ.Vector3.ZERO();
    public static gravity: ƒ.Vector2 = ƒ.Vector2.Y(0);

    
    constructor(_name: string = "Rocket") {
        super(_name);
        this.addComponent(new ƒ.ComponentTransform());
        this.show(ACTION.ROCKET);
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
    }

    public static generateSprites(_spritesheet: ƒ.CoatTextured): void {
        Rocket.animations = {};
        let sprite: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation(ACTION.ROCKET, _spritesheet);
        sprite.generateByGrid(ƒ.Rectangle.GET(825, 1420, 150, 150), 3, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
        Rocket.animations[ACTION.ROCKET] = sprite;
        sprite.frames.forEach(element => {
          element.mtxPivot.rotateX(180);
        });
    }

    public show(_action: ACTION): void {
        this.setAnimation(<ƒAid.SpriteSheetAnimation>Rocket.animations[_action]);
    }

    public act(_action: ACTION, _direction?: DIRECTION): void {
        switch (_action) {
          case ACTION.ROCKET:
            this.speed.x = ƒ.Random.default.getRange(3,1.5);
         //wenn rechts raus, dann switch richtung, pro reihe eine mit unterschiedlicher geschwindigkeit
        }
        if (_action == this.action)
        return;

        this.action = _action;
        this.show(_action);
    }

    private update = (_event: ƒ.Eventƒ): void => {
        let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
        if(this.mtxWorld.translation.x > 3.5){                  
          this.speed.x += Rocket.gravity.y * timeFrame;
          this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * -1);
        } 
          else {
          this.speed.y += Rocket.gravity.y * timeFrame;
          }
        if(this.mtxWorld.translation.x < -3.5){
          this.speed.x -= Rocket.gravity.y * timeFrame;
          this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * 1);
        }
          else {
          this.speed.y += Rocket.gravity.y * timeFrame;
          }

        
        // if(this.mtxWorld.translation.x < 3){
        //   this.speed.x -= Rocket.gravity.y * timeFrame;
        // }
        //   else {
        //   this.speed.y -= Rocket.gravity.y * timeFrame;
        //   }
        

        
        
        let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
        this.cmpTransform.local.translate(distance);
        this.checkCollision();
        
    }

    private checkCollision(): void {
        for (let floor of level.getChildren()) {
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