"use strict";
var HappyTiger;
(function (HappyTiger) {
    HappyTiger.ƒ = FudgeCore;
    HappyTiger.ƒAid = FudgeAid;
    window.addEventListener("load", test);
    window.addEventListener("load", start);
    let tiger;
    let coin;
    let rocket;
    let dolly = HappyTiger.ƒ.Vector3.ZERO();
    //JSON-Daten
    let floors = 4;
    let coins = 10;
    //GUI
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    function start() {
        let startBtn = document.getElementById("start");
        startBtn.addEventListener("click", startGame);
    }
    async function startGame() {
        console.log("startgame");
        let overlay = document.getElementById("overlay");
        let startbutton = document.getElementById("start");
        startbutton.style.visibility = "hidden";
        overlay.style.display = "none";
        //Sound.init();
        //Sound.play("Theme");
    }
    function test() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let img = document.querySelector("img");
        let spritesheet = HappyTiger.ƒAid.createSpriteSheet("Tiger", img);
        HappyTiger.Tiger.generateSprites(spritesheet);
        HappyTiger.Coin.generateSprites(spritesheet);
        HappyTiger.Rocket.generateSprites(spritesheet);
        HappyTiger.game = new HappyTiger.ƒ.Node("Game");
        tiger = new HappyTiger.Tiger("Tiger");
        tiger.cmpTransform.local.translateY(-3.6);
        tiger.cmpTransform.local.translateX(-2.5);
        coin = new HappyTiger.Coin("Coin");
        HappyTiger.level = createLevel();
        HappyTiger.game.appendChild(HappyTiger.level);
        for (let i = 0; i < coins; i++) {
            let coin = new HappyTiger.Coin();
            coin.cmpTransform.local.translateY(HappyTiger.ƒ.Random.default.getRange(-2, 4));
            coin.cmpTransform.local.translateX(-2.47 + (5.5 / coins) * (i));
            HappyTiger.game.appendChild(coin);
        }
        HappyTiger.game.appendChild(tiger);
        let cmpCamera = new HappyTiger.ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(8);
        cmpCamera.pivot.lookAt(dolly); //!!! Kamera soll Tiger folgen? wie kann ich das lösen?
        cmpCamera.backgroundColor = HappyTiger.ƒ.Color.CSS("aliceblue");
        let viewport = new HappyTiger.ƒ.Viewport();
        viewport.initialize("Viewport", HappyTiger.game, cmpCamera, canvas);
        viewport.draw();
        viewport.addEventListener("\u0192keydown" /* DOWN */, handleKeyboard);
        viewport.activateKeyboardEvent("\u0192keydown" /* DOWN */, true);
        viewport.setFocus(true);
        HappyTiger.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        HappyTiger.ƒ.Loop.start(HappyTiger.ƒ.LOOP_MODE.TIME_GAME, 60);
        function update(_event) {
            processInput();
            //cmpCamera.pivot.lookAt(tiger.mtxLocal.translation); 
            //cmpCamera.pivot.translateX(0);
            viewport.draw();
            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
        }
    }
    function handleKeyboard(_event) {
        if (_event.code == HappyTiger.ƒ.KEYBOARD_CODE.SPACE)
            tiger.act(HappyTiger.ACTION.JUMP);
    }
    function processInput() {
        if (HappyTiger.ƒ.Keyboard.isPressedOne([HappyTiger.ƒ.KEYBOARD_CODE.A, HappyTiger.ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
            tiger.act(HappyTiger.ACTION.WALK, HappyTiger.DIRECTION.LEFT);
            {
                if (HappyTiger.ƒ.Keyboard.isPressedOne([HappyTiger.ƒ.KEYBOARD_CODE.S, HappyTiger.ƒ.KEYBOARD_CODE.ARROW_DOWN]))
                    tiger.act(HappyTiger.ACTION.SLIDE, HappyTiger.DIRECTION.LEFT);
            }
        }
        else if (HappyTiger.ƒ.Keyboard.isPressedOne([HappyTiger.ƒ.KEYBOARD_CODE.D, HappyTiger.ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
            tiger.act(HappyTiger.ACTION.WALK, HappyTiger.DIRECTION.RIGHT);
            {
                if (HappyTiger.ƒ.Keyboard.isPressedOne([HappyTiger.ƒ.KEYBOARD_CODE.S, HappyTiger.ƒ.KEYBOARD_CODE.ARROW_DOWN]))
                    tiger.act(HappyTiger.ACTION.SLIDE, HappyTiger.DIRECTION.RIGHT);
            }
        }
        else if (HappyTiger.ƒ.Keyboard.isPressedOne([HappyTiger.ƒ.KEYBOARD_CODE.S, HappyTiger.ƒ.KEYBOARD_CODE.ARROW_DOWN]))
            tiger.act(HappyTiger.ACTION.DUCK);
        else if (HappyTiger.ƒ.Keyboard.isPressedOne([HappyTiger.ƒ.KEYBOARD_CODE.F, HappyTiger.ƒ.KEYBOARD_CODE.SHIFT_RIGHT]))
            tiger.act(HappyTiger.ACTION.RUN);
        else
            tiger.act(HappyTiger.ACTION.IDLE);
        //coin.act(ACTION.COINFLIP);
    }
    function createLevel() {
        let level = new HappyTiger.ƒ.Node("Level");
        let floor = new HappyTiger.Floor();
        floor = new HappyTiger.Floor();
        floor.cmpTransform.local.translateY(-3.6);
        floor.cmpTransform.local.scaleY(0.3);
        floor.cmpTransform.local.scaleX(7);
        level.appendChild(floor);
        //Floor-Left-And-Right
        floor = new HappyTiger.Floor();
        floor.cmpTransform.local.scaleY(4);
        floor.cmpTransform.local.scaleX(8);
        floor.cmpTransform.local.rotateX(90);
        level.appendChild(floor);
        for (let i = 0; i < floors + 1; i++) {
            let floorescape = HappyTiger.ƒ.Random.default.getRange(0.5, -0.5);
            //coin.mtxLocal.translation = new ƒ.Vector3(ƒ.Random.default.getRange(-1.6, 1.6) 
            floor = new HappyTiger.Floor();
            rocket = new HappyTiger.Rocket();
            floor.cmpTransform.local.translateY(-3.6 + (6 / floors) * i);
            floor.cmpTransform.local.scaleY(0.2);
            floor.cmpTransform.local.scaleX(5);
            floor.cmpTransform.local.translateX(-0.57 + (floorescape));
            rocket.cmpTransform.local.translateY(-3.6 + (6 / floors) * (i + 1));
            level.appendChild(floor);
            HappyTiger.game.appendChild(rocket);
            rocket.act(HappyTiger.ACTION.ROCKET);
            floor = new HappyTiger.Floor();
            floor.cmpTransform.local.translateY(-3.6 + (6 / floors) * i);
            floor.cmpTransform.local.scaleY(0.2);
            floor.cmpTransform.local.scaleX(5);
            floor.cmpTransform.local.translateX(0.57 + (floorescape));
            level.appendChild(floor);
        }
        return level;
    }
})(HappyTiger || (HappyTiger = {}));
//# sourceMappingURL=Main.js.map