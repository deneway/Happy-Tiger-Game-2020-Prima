namespace HappyTiger {
    import ƒ = FudgeCore;
    import ƒAid = FudgeAid;
  
    export enum ACTION {
      ROCKET = "Rocket",
      EXPLOSION = "Explosion"
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

        sprite = new ƒAid.SpriteSheetAnimation(ACTION.EXPLOSION, _spritesheet);
        sprite.generateByGrid(ƒ.Rectangle.GET(75, 1270, 150, 150), 7, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
        Rocket.animations[ACTION.EXPLOSION] = sprite;
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
            this.speed.x = ƒ.Random.default.getRange(3.5,1.3);
            break;
            case ACTION.EXPLOSION:
            this.speed.x = 0;
            break; 
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

        let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
        this.cmpTransform.local.translate(distance);
        this.checkCollision();
        if(dead == true){
        this.act(ACTION.EXPLOSION);
        }
    }

    public getRectRocket(): ƒ.Rectangle {
      let rect: ƒ.Rectangle = ƒ.Rectangle.GET(0, 0, 100, 100);
      let topleft: ƒ.Vector3 = new ƒ.Vector3(0.0, 0.2, 0);
      let bottomright: ƒ.Vector3 = new ƒ.Vector3(0.5, -0.5, 0);
      
      
      let mtxResult: ƒ.Matrix4x4 = ƒ.Matrix4x4.MULTIPLICATION(this.mtxWorld, Rocket.pivot);
      
      
      topleft.transform(mtxResult, true);
      bottomright.transform(mtxResult, true);


      let size: ƒ.Vector2 = new ƒ.Vector2(0.6, 0.6);
      rect.position = topleft.toVector2();
      rect.size = size;

      return rect;
    }

    public checkCollision(): void {
      super.checkCollision();
    }
}
}