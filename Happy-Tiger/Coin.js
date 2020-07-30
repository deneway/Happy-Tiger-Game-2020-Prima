"use strict";
var HappyTiger;
(function (HappyTiger) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    let ACTION;
    (function (ACTION) {
        ACTION["COINFLIP"] = "Coinflip";
    })(ACTION = HappyTiger.ACTION || (HappyTiger.ACTION = {}));
    class Coin extends ƒAid.NodeSprite {
        constructor(_name = "Coin") {
            super(_name);
            this.speed = ƒ.Vector3.ZERO();
            this.update = (_event) => {
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                this.speed.y += Coin.gravity.y * timeFrame;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision();
            };
            this.addComponent(new ƒ.ComponentTransform());
            this.show(ACTION.COINFLIP);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_spritesheet) {
            Coin.animations = {};
            let sprite = new ƒAid.SpriteSheetAnimation(ACTION.COINFLIP, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(75, 1420, 150, 150), 4, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
            Coin.animations[ACTION.COINFLIP] = sprite;
            sprite.frames.forEach(element => {
                element.mtxPivot.rotateX(180);
            });
        }
        show(_action) {
            this.setAnimation(Coin.animations[_action]);
        }
        act(_action, _direction) {
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
    Coin.gravity = ƒ.Vector2.Y(-3);
    HappyTiger.Coin = Coin;
})(HappyTiger || (HappyTiger = {}));
//# sourceMappingURL=Coin.js.map