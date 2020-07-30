
namespace HappyTiger {
  export import ƒ = FudgeCore;
  export import ƒAid = FudgeAid;

  window.addEventListener("load", test);

  export let game: ƒ.Node;
  export let level: ƒ.Node;
  let tiger: Tiger;

  function test(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
    let img: HTMLImageElement = document.querySelector("img");
    let spritesheet: ƒ.CoatTextured = ƒAid.createSpriteSheet("Tiger", img);
    Tiger.generateSprites(spritesheet);
    

    game = new ƒ.Node("Game");
    tiger = new Tiger("Tiger");
    level = createLevel();
    game.appendChild(level);
    game.appendChild(tiger);

    for (let i: number = 0; i < 5; i++) {
      let tiger: Tiger = new Tiger();
      tiger.mtxLocal.translation = new ƒ.Vector3(ƒ.Random.default.getRange(-1, 1), ƒ.Random.default.getRange(-1, 1));
      game.appendChild(tiger);
    }

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(5);
    cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
    cmpCamera.backgroundColor = ƒ.Color.CSS("aliceblue");

    let viewport: ƒ.Viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", game, cmpCamera, canvas);
    viewport.draw();

    viewport.addEventListener(ƒ.EVENT_KEYBOARD.DOWN, handleKeyboard);
    viewport.activateKeyboardEvent(ƒ.EVENT_KEYBOARD.DOWN, true);
    viewport.setFocus(true);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 60);

    function update(_event: ƒ.Eventƒ): void {
      processInput();

      viewport.draw();

      crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
      crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
    }
  }

  function handleKeyboard(_event: ƒ.EventKeyboard): void {
    if (_event.code == ƒ.KEYBOARD_CODE.SPACE)
      tiger.act(ACTION.JUMP);
  }

  function processInput(): void {
 
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])){
      tiger.act(ACTION.WALK, DIRECTION.LEFT);{
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]))
      tiger.act(ACTION.SLIDE, DIRECTION.LEFT);}}
    else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])){
      tiger.act(ACTION.WALK, DIRECTION.RIGHT);{
      if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]))
      tiger.act(ACTION.SLIDE, DIRECTION.RIGHT);}}
    else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]))
      tiger.act(ACTION.DUCK);
    else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.F, ƒ.KEYBOARD_CODE.SHIFT_RIGHT]))
      tiger.act(ACTION.RUN);
    else
      tiger.act(ACTION.IDLE);
  }

  function createLevel(): ƒ.Node {
    let level: ƒ.Node = new ƒ.Node("Level");
    let floor: Floor = new Floor();
    floor.cmpTransform.local.scaleY(0.2);
    level.appendChild(floor);

    floor = new Floor();
    floor.cmpTransform.local.translateX(1.4);
    floor.cmpTransform.local.translateY(0.17);
    floor.cmpTransform.local.scaleY(0.2);
    floor.cmpTransform.local.scaleX(2);
    level.appendChild(floor);


    floor = new Floor();
    floor.cmpTransform.local.translateY(-1.6);
    floor.cmpTransform.local.scaleY(0.2);
    floor.cmpTransform.local.scaleX(5);
    level.appendChild(floor);

    return level;
  }
}