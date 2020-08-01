"use strict";
var HappyTiger;
(function (HappyTiger) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    class item extends ƒAid.NodeSprite {
        constructor(_name = "Item") {
            super(_name);
            this.speed = ƒ.Vector3.ZERO();
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
    item.gravity = ƒ.Vector2.Y(-3);
    item.pivot = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));
    HappyTiger.item = item;
})(HappyTiger || (HappyTiger = {}));
//# sourceMappingURL=item.js.map