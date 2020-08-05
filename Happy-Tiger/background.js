"use strict";
var HappyTiger;
(function (HappyTiger) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    let ACTION;
    (function (ACTION) {
        ACTION["BACKGROUND"] = "Background";
    })(ACTION = HappyTiger.ACTION || (HappyTiger.ACTION = {}));
    class Background extends ƒAid.NodeSprite {
        constructor(_name = "Background") {
            super(_name);
            this.update = (_event) => {
            };
            this.addComponent(new ƒ.ComponentTransform());
            this.show(ACTION.BACKGROUND);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_spritesheet) {
            Background.animations = {};
            let sprite = new ƒAid.SpriteSheetAnimation(ACTION.BACKGROUND, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(300, 400, 600, 800), 1, ƒ.Vector2.ZERO(), 100, ƒ.ORIGIN2D.BOTTOMCENTER);
            Background.animations[ACTION.BACKGROUND] = sprite;
            sprite.frames.forEach(element => {
                element.mtxPivot.rotateX(180);
            });
        }
        show(_action) {
            this.setAnimation(Background.animations[_action]);
        }
        act(_action, _direction) {
            switch (_action) {
                case ACTION.BACKGROUND:
                    break;
            }
            this.action = _action;
            this.show(_action);
        }
    }
    HappyTiger.Background = Background;
})(HappyTiger || (HappyTiger = {}));
//# sourceMappingURL=background.js.map