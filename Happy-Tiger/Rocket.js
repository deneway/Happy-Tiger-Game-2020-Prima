"use strict";
var HappyTiger;
(function (HappyTiger) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    let ACTION;
    (function (ACTION) {
        ACTION["ROCKET"] = "Rocket";
        ACTION["EXPLOSION"] = "Explosion";
    })(ACTION = HappyTiger.ACTION || (HappyTiger.ACTION = {}));
    class Rocket extends HappyTiger.item {
        constructor(_name = "Rocket") {
            super(_name);
            this.speed = ƒ.Vector3.ZERO();
            this.update = (_event) => {
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                if (this.mtxWorld.translation.x > 3.5) {
                    this.speed.x += Rocket.gravity.y * timeFrame;
                    this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * -1);
                }
                else {
                    this.speed.y += Rocket.gravity.y * timeFrame;
                }
                if (this.mtxWorld.translation.x < -3.5) {
                    this.speed.x -= Rocket.gravity.y * timeFrame;
                    this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * 1);
                }
                else {
                    this.speed.y += Rocket.gravity.y * timeFrame;
                }
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision();
                if (HappyTiger.dead == true) {
                    this.act(ACTION.EXPLOSION);
                }
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
            sprite = new ƒAid.SpriteSheetAnimation(ACTION.EXPLOSION, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(75, 1270, 150, 150), 7, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
            Rocket.animations[ACTION.EXPLOSION] = sprite;
            sprite.frames.forEach(element => {
                element.mtxPivot.rotateX(180);
            });
        }
        show(_action) {
            this.setAnimation(Rocket.animations[_action]);
        }
        act(_action, _direction) {
            switch (_action) {
                case ACTION.ROCKET:
                    this.speed.x = ƒ.Random.default.getRange(3.5, 1.3);
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
        getRectRocket() {
            let rect = ƒ.Rectangle.GET(0, 0, 100, 100);
            let topleft = new ƒ.Vector3(0.0, 0.2, 0);
            let bottomright = new ƒ.Vector3(0.5, -0.5, 0);
            let mtxResult = ƒ.Matrix4x4.MULTIPLICATION(this.mtxWorld, Rocket.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
            let size = new ƒ.Vector2(0.6, 0.6);
            rect.position = topleft.toVector2();
            rect.size = size;
            return rect;
        }
        checkCollision() {
            super.checkCollision();
        }
    }
    Rocket.gravity = ƒ.Vector2.Y(0);
    HappyTiger.Rocket = Rocket;
})(HappyTiger || (HappyTiger = {}));
//# sourceMappingURL=Rocket.js.map