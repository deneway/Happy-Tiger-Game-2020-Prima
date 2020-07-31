"use strict";
var HappyTiger;
(function (HappyTiger) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    let ACTION;
    (function (ACTION) {
        ACTION["ROCKET"] = "Rocket";
    })(ACTION = HappyTiger.ACTION || (HappyTiger.ACTION = {}));
    class Rocket extends ƒAid.NodeSprite {
        constructor(_name = "Rocket") {
            super(_name);
            this.speed = ƒ.Vector3.ZERO();
            this.update = (_event) => {
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                if (this.mtxWorld.translation.x > 1) {
                    this.speed.x += Rocket.gravity.y * timeFrame;
                }
                else {
                    this.speed.y += Rocket.gravity.y * timeFrame;
                }
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision();
            };
            this.addComponent(new ƒ.ComponentTransform());
            this.show(ACTION.ROCKET);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_spritesheet) {
            Rocket.animations = {};
            let sprite = new ƒAid.SpriteSheetAnimation(ACTION.ROCKET, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(825, 1420, 150, 150), 3, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
            Rocket.animations[ACTION.ROCKET] = sprite;
            sprite.frames.forEach(element => {
                element.mtxPivot.rotateX(180);
            });
        }
        show(_action) {
            this.setAnimation(Rocket.animations[_action]);
        }
        // case ACTION.JUMP:
        //   if (this.speed.y != 0) {
        //     break;
        //   } else {
        //     this.speed.y = 3;
        //     break;
        //   }
        act(_action, _direction) {
            switch (_action) {
                case ACTION.ROCKET:
                    this.speed.x = 1.5;
                //wenn rechts raus, dann switch richtung, pro reihe eine mit unterschiedlicher geschwindigkeit
            }
            if (_action == this.action)
                return;
            this.action = _action;
            this.show(_action);
        }
        checkCollision() {
            for (let floor of HappyTiger.level.getChildren()) {
                let rect = floor.getRectWorld();
                let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                if (hit) {
                    let translation = this.cmpTransform.local.translation;
                    translation.y = rect.y;
                    this.cmpTransform.local.translation = translation;
                    this.speed.y = 0;
                }
            }
        }
    }
    Rocket.gravity = ƒ.Vector2.Y(-3);
    HappyTiger.Rocket = Rocket;
})(HappyTiger || (HappyTiger = {}));
//# sourceMappingURL=Rocket.js.map