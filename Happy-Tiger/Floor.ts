namespace HappyTiger {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  let img: HTMLImageElement = <HTMLImageElement>document.getElementById("dirt");
  let spritesheet: ƒ.CoatTextured = ƒAid.createSpriteSheet("Floor", img);
  
  export enum BODEN {
    DIRT = "Dirt"
  }

  export class Floor extends ƒ.Node    {
    private static animations: ƒAid.SpriteSheetAnimations;  
    private static mesh: ƒ.MeshSprite = new ƒ.MeshSprite();
    
    private static material: ƒ.Material = new ƒ.Material("Floor", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("brown")));
    private static readonly pivot: ƒ.Matrix4x4 = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));

    public constructor() {
      super("Floor");
      this.addComponent(new ƒ.ComponentTransform());
      this.addComponent(new ƒ.ComponentMaterial(Floor.material));
      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Floor.mesh);
      //cmpMesh.pivot.translateY(-0.5);
      cmpMesh.pivot = Floor.pivot;
      this.addComponent(cmpMesh);
    }

    public static generateSprites(_spritesheet: ƒ.CoatTextured): void {
      Floor.animations = {};
      let sprite: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation(BODEN.DIRT, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(512/2, 512/2, 512, 512), 1, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
      Floor.animations[BODEN.DIRT] = sprite;
      sprite.frames.forEach(element => {
        element.mtxPivot.rotateX(180);
      });
    }

    public show(_action: BODEN): void {
      this.setAnimation(<ƒAid.SpriteSheetAnimation>Floor.animations[_action]);
    }


    public getRectWorld(): ƒ.Rectangle {
      let rect: ƒ.Rectangle = ƒ.Rectangle.GET(0, 0, 100, 100);
      let topleft: ƒ.Vector3 = new ƒ.Vector3(-0.5, 0.5, 0);
      let bottomright: ƒ.Vector3 = new ƒ.Vector3(0.5, -0.5, 0);
      
      //let pivot: ƒ.Matrix4x4 = this.getComponent(ƒ.ComponentMesh).pivot;
      let mtxResult: ƒ.Matrix4x4 = ƒ.Matrix4x4.MULTIPLICATION(this.mtxWorld, Floor.pivot);
      topleft.transform(mtxResult, true);
      bottomright.transform(mtxResult, true);

      let size: ƒ.Vector2 = new ƒ.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
      rect.position = topleft.toVector2();
      rect.size = size;

      return rect;
    }
  }
}