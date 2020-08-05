namespace HappyTiger {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  let coincounter: number = 0;
  export let dead: boolean = false;



  export enum ACTION {
    IDLE = "Idle",
    WALK = "Walk",
    JUMP = "Jump",
    DUCK = "Duck",
    RUN = "Run",
    SLIDE = "Slide",
    DIE = "Die"
  }

  export enum DIRECTION {
    LEFT, RIGHT
  }

  export class Tiger extends ƒAid.NodeSprite {
    private static animations: ƒAid.SpriteSheetAnimations;  //SprideSheet generaor
    private static speedWalk: ƒ.Vector2 = new ƒ.Vector2(1, 5); // units per second
    private static speedRun: ƒ.Vector2 = new ƒ.Vector2(1.5, 5);
    private static gravity: ƒ.Vector2 = ƒ.Vector2.Y(-3);
    public speed: ƒ.Vector3 = ƒ.Vector3.ZERO();
    private action: ACTION;
    

    constructor(_name: string = "Tiger") {
      super(_name);
      this.addComponent(new ƒ.ComponentTransform());
      this.show(ACTION.IDLE);
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
    }

    public static generateSprites(_spritesheet: ƒ.CoatTextured): void {
      Tiger.animations = {};
      let sprite: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation(ACTION.WALK, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(75, 220, 150, 150), 9, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
      Tiger.animations[ACTION.WALK] = sprite;
      sprite.frames.forEach(element => {
        element.mtxPivot.rotateX(180);
      });

      sprite = new ƒAid.SpriteSheetAnimation(ACTION.IDLE, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(75, 70, 150, 150), 11, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
      Tiger.animations[ACTION.IDLE] = sprite;
      sprite.frames.forEach(element => {
        element.mtxPivot.rotateX(180);
      });
      sprite.frames[2].timeScale = 2;

      sprite = new ƒAid.SpriteSheetAnimation(ACTION.JUMP, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(75, 370, 150, 150), 7 , ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
      Tiger.animations[ACTION.JUMP] = sprite;
      sprite.frames.forEach(element => {
        element.mtxPivot.rotateX(180);
      });
      
      sprite = new ƒAid.SpriteSheetAnimation(ACTION.DUCK, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(75, 520, 150, 150), 4 , ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
      Tiger.animations[ACTION.DUCK] = sprite;
      sprite.frames.forEach(element => {
        element.mtxPivot.rotateX(180);
      });
      sprite.generateByGrid(ƒ.Rectangle.GET(525, 520, 150, 150), 1 , ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
      Tiger.animations[ACTION.DUCK] = sprite;
      sprite.frames.forEach(element => {
        element.mtxPivot.rotateX(180);
      });

      sprite = new ƒAid.SpriteSheetAnimation(ACTION.SLIDE, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(75, 820, 150, 150), 3 , ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER); 
      Tiger.animations[ACTION.SLIDE] = sprite;
      sprite.frames.forEach(element => {
        element.mtxPivot.rotateX(180);
      });
      
      sprite = new ƒAid.SpriteSheetAnimation(ACTION.RUN, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(75, 671, 150, 150), 7 , ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
      Tiger.animations[ACTION.RUN] = sprite;
      sprite.frames.forEach(element => {
        element.mtxPivot.rotateX(180);
      });

      sprite = new ƒAid.SpriteSheetAnimation(ACTION.DIE, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(75, 1125, 150, 150), 9 , ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
      Tiger.animations[ACTION.DIE] = sprite;
      sprite.frames.forEach(element => {
        element.mtxPivot.rotateX(180);
      });
      sprite.generateByGrid(ƒ.Rectangle.GET(1425, 1125, 150, 150), 1 , ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
      Tiger.animations[ACTION.DIE] = sprite;
      sprite.frames.forEach(element => {
        element.mtxPivot.rotateX(180);
      });
   
      
    }


    public show(_action: ACTION): void {
      // show only the animation defined for the action
      // if (_action == ACTION.JUMP)

      //   return;
      this.setAnimation(<ƒAid.SpriteSheetAnimation>Tiger.animations[_action]);
    }

    public act(_action: ACTION, _direction?: DIRECTION): void {
      switch (_action) {
        case ACTION.IDLE:
          this.speed.x = 0;
          break;
        case ACTION.WALK:
          let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
          this.speed.x = Tiger.speedWalk.x; // * direction;
          this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * direction);
          break;
        case ACTION.RUN:
          this.speed.x = Tiger.speedRun.x; // * direction;
          break;
        case ACTION.JUMP:
          if (this.speed.y != 0) {
            break;
          } else {
            this.speed.y = 3;
            break;
          }

        case ACTION.DUCK:
          this.speed.x = 0;
          this.speed.y = -2;
          
            break;

      }
      if (_action == this.action)
        return;

      this.action = _action;
      this.show(_action);
    }

    private update = (_event: ƒ.Eventƒ): void => {
      let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
      if(this.mtxWorld.translation.x > 3.5) 
      {
        this.cmpTransform.local.translateX(-7);
      }
      if(this.mtxWorld.translation.x < -3.5) 
      {
        this.cmpTransform.local.translateX(-7);
      }
     

      
      this.speed.y += Tiger.gravity.y * timeFrame;
      let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
      this.cmpTransform.local.translate(distance);

      this.checkCollision();
      this.checkCollisionCoin();
      this.checkCollisionRocket();
    }

    private checkCollision(): void {
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
    private checkCollisionCoin(): void {
      for (let coin of level.getChildren()) {
        if (coin.name == "Coin"){
        let rect: ƒ.Rectangle = (<Coin>coin).getRectCoin();
        let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
        if (hit) {

          coin.cmpTransform.local.translateX(100);
          coincounter += 1;
          if (coincounter <= coins){
          Audio.init();
          Audio.play("Coin");}
          if (coincounter == coins){
          let winoverlay: HTMLDivElement = <HTMLDivElement>document.getElementById("winoverlay");
          winoverlay.style.display = "inline";
          game.removeChild(level);
          
          } 
        }
      }
    } 
  }
  private checkCollisionRocket(): void {
    for (let rocket of level.getChildren()) {
      if (rocket.name == "Rocket"){
      let rect: ƒ.Rectangle = (<Rocket>rocket).getRectRocket();
      let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
      let test: ƒ.Vector2 = new ƒ.Vector2(0, 0.15);
      let vector: ƒ.Vector2 = this.cmpTransform.local.translation.toVector2();
      vector.add(test);
      let test2: ƒ.Vector2 = new ƒ.Vector2(0, -0.15);
      let vector2: ƒ.Vector2 = this.cmpTransform.local.translation.toVector2();
      vector2.add(test2);
      
      hit = rect.isInside(vector);
      hit = rect.isInside(vector2);
      
      if (hit) {
        Audio.init();
        Audio.play("Loose");
        console.log("rocket-hit");
        if (restart == 0){
        dead = true; 

        }
        else {
          dead = false;
        } 
      }
    }
  } 
}
    }}
