namespace HappyTiger {
    import ƒ = FudgeCore;
    import ƒAid = FudgeAid;
  
    export enum ACTION {
      BACKGROUND = "Background"
    }

    export class Background extends ƒAid.NodeSprite {
        private static animations: ƒAid.SpriteSheetAnimations;  //SprideSheet generator
        private action: ACTION;
        
        constructor(_name: string = "Background") {
            super(_name);
            this.addComponent(new ƒ.ComponentTransform());
            this.show(ACTION.BACKGROUND);
            ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
        }
    
        public static generateSprites(_spritesheet: ƒ.CoatTextured): void {
            Background.animations = {};
            let sprite: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation(ACTION.BACKGROUND, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(300, 400, 600, 800), 1, ƒ.Vector2.ZERO(), 100, ƒ.ORIGIN2D.BOTTOMCENTER);
            Background.animations[ACTION.BACKGROUND] = sprite;
            sprite.frames.forEach(element => {
              element.mtxPivot.rotateX(180);
            });
        }
    
        public show(_action: ACTION): void {
            this.setAnimation(<ƒAid.SpriteSheetAnimation>Background.animations[_action]);
        }
    
        public act(_action: ACTION, _direction?: DIRECTION): void {
            switch (_action) {
              case ACTION.BACKGROUND:
                break;
            }
    
            this.action = _action;
            this.show(_action);
        }

        private update = (_event: ƒ.Eventƒ): void => {

        }
    
    }
}