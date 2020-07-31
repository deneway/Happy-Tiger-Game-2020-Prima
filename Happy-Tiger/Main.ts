
namespace HappyTiger {
  export import ƒ = FudgeCore;
  export import ƒAid = FudgeAid;

  window.addEventListener("load", test);
  window.addEventListener("load", start);

  export let game: ƒ.Node;
  export let level: ƒ.Node;
  let tiger: Tiger;
  let coin: Coin;
  let rocket: Rocket;
  
  function start(){
      let startBtn: HTMLDivElement = <HTMLDivElement>document.getElementById("start");
      startBtn.addEventListener("click", startGame);
  }

  function startGame(){
    console.log("startgame");
  }

  function test(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
    let img: HTMLImageElement = document.querySelector("img");
    let spritesheet: ƒ.CoatTextured = ƒAid.createSpriteSheet("Tiger", img);
    Tiger.generateSprites(spritesheet);
    Coin.generateSprites(spritesheet);
    Rocket.generateSprites(spritesheet);
    

    game = new ƒ.Node("Game");
    tiger = new Tiger("Tiger");
    coin = new Coin("Coin");
    rocket = new Rocket("Rocket");
    level = createLevel();
    game.appendChild(level);
    game.appendChild(tiger);
    game.appendChild(rocket);

    rocket.act(ACTION.ROCKET);

    for (let i: number = 0; i < 5; i++) {
      let coin: Coin = new Coin();
      coin.mtxLocal.translation = new ƒ.Vector3(ƒ.Random.default.getRange(-1.6, 1.6), ƒ.Random.default.getRange(-1.6, 1.6));
      game.appendChild(coin);
    }

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(8);
    cmpCamera.pivot.lookAt(tiger.mtxLocal.translation); //!!! Kamera soll Tiger folgen? wie kann ich das lösen?
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
    
    //coin.act(ACTION.COINFLIP);
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