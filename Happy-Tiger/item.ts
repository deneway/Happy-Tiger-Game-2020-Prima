namespace HappyTiger {
    import ƒ = FudgeCore;
    import ƒAid = FudgeAid;
  


    export class item extends ƒAid.NodeSprite {
    public static animations: ƒAid.SpriteSheetAnimations;  
    public action: ACTION;
    public speed: ƒ.Vector3 = ƒ.Vector3.ZERO();
    public static gravity: ƒ.Vector2 = ƒ.Vector2.Y(-3);
    public static readonly pivot: ƒ.Matrix4x4 = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));

    
    constructor(_name: string = "Item") {
        super(_name);
       
    }
    }
}