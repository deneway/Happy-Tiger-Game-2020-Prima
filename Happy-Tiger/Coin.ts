namespace HappyTiger {
    import ƒ = FudgeCore;
    import ƒAid = FudgeAid;
  
    export enum ACTION {
      COINFLIP = "Coinflip"
    }


    export class Coin extends item {
    

    
    constructor(_name: string = "Coin") {
        super(_name);
        this.addComponent(new ƒ.ComponentTransform());
        this.show(ACTION.COINFLIP);
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
    }

    public static generateSprites(_spritesheet: ƒ.CoatTextured): void {
        Coin.animations = {};
        let sprite: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation(ACTION.COINFLIP, _spritesheet);
        sprite.generateByGrid(ƒ.Rectangle.GET(75, 1420, 150, 150), 4, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
        Coin.animations[ACTION.COINFLIP] = sprite;
        sprite.frames.forEach(element => {
          element.mtxPivot.rotateX(180);
        });
    }

    public show(_action: ACTION): void {
        this.setAnimation(<ƒAid.SpriteSheetAnimation>Coin.animations[_action]);
    }

    public act(_action: ACTION, _direction?: DIRECTION): void {
        switch (_action) {
          case ACTION.COINFLIP:
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
        this.speed.y += Coin.gravity.y * timeFrame;
        let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
        this.cmpTransform.local.translate(distance);
        this.checkCollision();
        
    }

    public getRectCoin(): ƒ.Rectangle {
      let rect: ƒ.Rectangle = ƒ.Rectangle.GET(0, 0, 100, 100);
      let topleft: ƒ.Vector3 = new ƒ.Vector3(-0.3, 0.2, 0);
      let bottomright: ƒ.Vector3 = new ƒ.Vector3(0.5, -0.5, 0);
      
      let mtxResult: ƒ.Matrix4x4 = ƒ.Matrix4x4.MULTIPLICATION(this.mtxWorld, Coin.pivot);
      topleft.transform(mtxResult, true);
      bottomright.transform(mtxResult, true);

      let size: ƒ.Vector2 = new ƒ.Vector2(0.6, 0.4);
      rect.position = topleft.toVector2();
      rect.size = size;

      return rect;
    }


    public checkCollision(): void {
      super.checkCollision();
    }
  }
}