
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
  let dolly: ƒ.Vector3 = ƒ.Vector3.ZERO();

  //JSON-Daten
  let floors: number = 4;
  let coins: number = 10;
  
  //GUI
  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  } 

  function start(){
      let startBtn: HTMLDivElement = <HTMLDivElement>document.getElementById("start");
      startBtn.addEventListener("click", startGame);
  }

  async function startGame(){
    console.log("startgame");
    let overlay: HTMLDivElement = <HTMLDivElement>document.getElementById("overlay");
    let startbutton: HTMLDivElement = <HTMLDivElement>document.getElementById("start");
    startbutton.style.visibility = "hidden";
    overlay.style.display = "none";
    //Sound.init();
    //Sound.play("Theme");
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
    tiger.cmpTransform.local.translateY(-3.6);
    tiger.cmpTransform.local.translateX(-2.5);
    coin = new Coin("Coin");
    level = createLevel();
    game.appendChild(level);
    

    
    for (let i: number = 0; i < coins; i++) {
      let coin: Coin = new Coin();
      coin.cmpTransform.local.translateY(ƒ.Random.default.getRange(-2,4));
      coin.cmpTransform.local.translateX(-2.47+(5.5/coins)*(i));
      game.appendChild(coin);
    }
    game.appendChild(tiger);

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(8);
    cmpCamera.pivot.lookAt(dolly); //!!! Kamera soll Tiger folgen? wie kann ich das lösen?
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
      //cmpCamera.pivot.lookAt(tiger.mtxLocal.translation); 
      //cmpCamera.pivot.translateX(0);
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
    
  

    floor = new Floor();
    floor.cmpTransform.local.translateY(-3.6);
    floor.cmpTransform.local.scaleY(0.3);
    floor.cmpTransform.local.scaleX(7);
    level.appendChild(floor);

    //Floor-Left-And-Right
    floor = new Floor();
    floor.cmpTransform.local.scaleY(4);
    floor.cmpTransform.local.scaleX(8);
    floor.cmpTransform.local.rotateX(90);
    level.appendChild(floor);



    for (let i: number = 0; i < floors+1; i++) {
    let floorescape: number = ƒ.Random.default.getRange(0.5,-0.5);
     //coin.mtxLocal.translation = new ƒ.Vector3(ƒ.Random.default.getRange(-1.6, 1.6) 
    floor = new Floor();
    rocket = new Rocket();
    floor.cmpTransform.local.translateY(-3.6+(6/floors)*i);
    floor.cmpTransform.local.scaleY(0.2);
    floor.cmpTransform.local.scaleX(5);
    floor.cmpTransform.local.translateX(-0.57+(floorescape));
    rocket.cmpTransform.local.translateY(-3.6+(6/floors)*(i+1));
    level.appendChild(floor);
    game.appendChild(rocket);
    rocket.act(ACTION.ROCKET);

    floor = new Floor();
    floor.cmpTransform.local.translateY(-3.6+(6/floors)*i);
    floor.cmpTransform.local.scaleY(0.2);
    floor.cmpTransform.local.scaleX(5);
    floor.cmpTransform.local.translateX(0.57+(floorescape));
    level.appendChild(floor);
    }

    return level;
  }
}