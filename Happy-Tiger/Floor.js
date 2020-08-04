"use strict";
var HappyTiger;
(function (HappyTiger) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    let img = document.getElementById("dirt");
    let spritesheet = ƒAid.createSpriteSheet("Floor", img);
    let BODEN;
    (function (BODEN) {
        BODEN["DIRT"] = "Dirt";
    })(BODEN = HappyTiger.BODEN || (HappyTiger.BODEN = {}));
    class Floor extends ƒ.Node {
        constructor() {
            super("Floor");
            this.addComponent(new ƒ.ComponentTransform());
            this.addComponent(new ƒ.ComponentMaterial(Floor.material));
            let cmpMesh = new ƒ.ComponentMesh(Floor.mesh);
            //cmpMesh.pivot.translateY(-0.5);
            cmpMesh.pivot = Floor.pivot;
            this.addComponent(cmpMesh);
        }
        static generateSprites(_spritesheet) {
            Floor.animations = {};
            let sprite = new ƒAid.SpriteSheetAnimation(BODEN.DIRT, _spritesheet);
            sprite.generateByGrid(ƒ.Rectangle.GET(512 / 2, 512 / 2, 512, 512), 1, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
            Floor.animations[BODEN.DIRT] = sprite;
            sprite.frames.forEach(element => {
                element.mtxPivot.rotateX(180);
            });
        }
        show(_action) {
            this.setAnimation(Floor.animations[_action]);
        }
        getRectWorld() {
            let rect = ƒ.Rectangle.GET(0, 0, 100, 100);
            let topleft = new ƒ.Vector3(-0.5, 0.5, 0);
            let bottomright = new ƒ.Vector3(0.5, -0.5, 0);
            //let pivot: ƒ.Matrix4x4 = this.getComponent(ƒ.ComponentMesh).pivot;
            let mtxResult = ƒ.Matrix4x4.MULTIPLICATION(this.mtxWorld, Floor.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
            let size = new ƒ.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;
            return rect;
        }
    }
    Floor.mesh = new ƒ.MeshSprite();
    Floor.material = new ƒ.Material("Floor", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("brown")));
    Floor.pivot = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));
    HappyTiger.Floor = Floor;
})(HappyTiger || (HappyTiger = {}));
//# sourceMappingURL=Floor.js.map