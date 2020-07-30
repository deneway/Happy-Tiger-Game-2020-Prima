namespace HappyTiger {
    import ƒ = FudgeCore;
    import ƒAid = FudgeAid;
  
    export enum ACTION {
      COINFLIP = "Coinflip"
    }


    export class Coin extends ƒAid.NodeSprite {
    private static animations: ƒAid.SpriteSheetAnimations;  
    private action: ACTION;
    public speed: ƒ.Vector3 = ƒ.Vector3.ZERO();
    private static gravity: ƒ.Vector2 = ƒ.Vector2.Y(-3);

    
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