"use strict";
var HappyTiger;
(function (HappyTiger) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    let coincounter = 0;
    HappyTiger.dead = false;
    let ACTION;
    (function (ACTION) {
        ACTION["IDLE"] = "Idle";
        ACTION["WALK"] = "Walk";
        ACTION["JUMP"] = "Jump";
        ACTION["DUCK"] = "Duck";
        ACTION["RUN"] = "Run";
        ACTION["SLIDE"] = "Slide";
        ACTION["DIE"] = "Die";
    })(ACTION = HappyTiger.ACTION || (HappyTiger.ACTION = {}));
    let DIRECTION;
    (function (DIRECTION) {
        DIRECTION[DIRECTION["LEFT"] = 0] = "LEFT";
        DIRECTION[DIRECTION["RIGHT"] = 1] = "RIGHT";
    })(DIRECTION = HappyTiger.DIRECTION || (HappyTiger.DIRECTION = {}));
    class Tiger extends ƒAid.NodeSprite {
        constructor(_name = "Tiger") {
            super(_name);
            this.speed = ƒ.Vector3.ZERO();
            this.update = (_event) => {
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                if (this.mtxWorld.translation.x > 3.5) {
                    this.cmpTransform.local.translateX(-7);
                }
                if (this.mtxWorld.translation.x < -3.5) {
                    this.cmpTransform.local.translateX(-7);
                }
                this.speed.y += Tiger.gravity.y * timeFrame;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision();
                this.checkCollisionCoin();
                this.checkCollisionRocket();
            };
            this.addComponent(new ƒ.ComponentTransform());
            this.show(ACTION.IDLE);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_spritesheet) {
            Tiger.animations = {};
            let sprite = new ƒAid.SpriteSheetAnimation(ACTION.WALK, _spritesheet);
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
            sprite.generateByGrid(ƒ.Rectangle.GET(75, 370, 150, 150), 7, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
            Tiger.animations[ACTION.JUMP] = sprite;
            sprite.frames.forEach(element => {
                element.mtxPivot.rotateX(180);
            });
            sprite = new ƒAid.SpriteSheetAnimation(ACTION.DUCK, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(75, 520, 150, 150), 4, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
            Tiger.animations[ACTION.DUCK] = sprite;
            sprite.frames.forEach(element => {
                element.mtxPivot.rotateX(180);
            });
            sprite.generateByGrid(ƒ.Rectangle.GET(525, 520, 150, 150), 1, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
            Tiger.animations[ACTION.DUCK] = sprite;
            sprite.frames.forEach(element => {
                element.mtxPivot.rotateX(180);
            });
            sprite = new ƒAid.SpriteSheetAnimation(ACTION.SLIDE, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(75, 820, 150, 150), 3, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
            Tiger.animations[ACTION.SLIDE] = sprite;
            sprite.frames.forEach(element => {
                element.mtxPivot.rotateX(180);
            });
            sprite = new ƒAid.SpriteSheetAnimation(ACTION.RUN, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(75, 671, 150, 150), 7, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
            Tiger.animations[ACTION.RUN] = sprite;
            sprite.frames.forEach(element => {
                element.mtxPivot.rotateX(180);
            });
            sprite = new ƒAid.SpriteSheetAnimation(ACTION.DIE, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(75, 1125, 150, 150), 9, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
            Tiger.animations[ACTION.DIE] = sprite;
            sprite.frames.forEach(element => {
                element.mtxPivot.rotateX(180);
            });
            sprite.generateByGrid(ƒ.Rectangle.GET(1425, 1125, 150, 150), 1, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
            Tiger.animations[ACTION.DIE] = sprite;
            sprite.frames.forEach(element => {
                element.mtxPivot.rotateX(180);
            });
        }
        show(_action) {
            // show only the animation defined for the action
            // if (_action == ACTION.JUMP)
            //   return;
            this.setAnimation(Tiger.animations[_action]);
        }
        act(_action, _direction) {
            switch (_action) {
                case ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case ACTION.WALK:
                    let direction = (_direction == DIRECTION.RIGHT ? 1 : -1);
                    this.speed.x = Tiger.speedWalk.x; // * direction;
                    this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * direction);
                    break;
                case ACTION.RUN:
                    this.speed.x = Tiger.speedRun.x; // * direction;
                    break;
                case ACTION.JUMP:
                    if (this.speed.y != 0) {
                        break;
                    }
                    else {
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
        checkCollision() {
            for (let floor of HappyTiger.level.getChildren()) {
                if (floor.name == "Floor") {
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
        checkCollisionCoin() {
            for (let coin of HappyTiger.level.getChildren()) {
                if (coin.name == "Coin") {
                    let rect = coin.getRectCoin();
                    let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                    if (hit) {
                        coin.cmpTransform.local.translateX(100);
                        coincounter += 1;
                        HappyTiger.Audio.init();
                        HappyTiger.Audio.play("Coin");
                        console.log(coincounter);
                        if (coincounter == HappyTiger.coins) {
                            let winoverlay = document.getElementById("winoverlay");
                            winoverlay.style.display = "inline";
                        }
                    }
                }
            }
        }
        checkCollisionRocket() {
            for (let rocket of HappyTiger.level.getChildren()) {
                if (rocket.name == "Rocket") {
                    let rect = rocket.getRectRocket();
                    let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                    let test = new ƒ.Vector2(0, 0.15);
                    let vector = this.cmpTransform.local.translation.toVector2();
                    vector.add(test);
                    let test2 = new ƒ.Vector2(0, -0.15);
                    let vector2 = this.cmpTransform.local.translation.toVector2();
                    vector2.add(test2);
                    hit = rect.isInside(vector);
                    hit = rect.isInside(vector2);
                    if (hit) {
                        console.log("rocket-hit");
                        if (HappyTiger.restart == 0) {
                            HappyTiger.dead = true;
                        }
                        else {
                            HappyTiger.dead = false;
                        }
                    }
                }
            }
        }
    }
    Tiger.speedWalk = new ƒ.Vector2(1, 5); // units per second
    Tiger.speedRun = new ƒ.Vector2(1.5, 5);
    Tiger.gravity = ƒ.Vector2.Y(-3);
    HappyTiger.Tiger = Tiger;
})(HappyTiger || (HappyTiger = {}));
//# sourceMappingURL=Tiger.js.map