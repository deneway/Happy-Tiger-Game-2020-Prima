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
    function start() {
        let startBtn = document.getElementById("start");
        startBtn.addEventListener("click", startGame);
    }
    function startGame() {
        console.log("startgame");
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
        coin = new HappyTiger.Coin("Coin");
        rocket = new HappyTiger.Rocket("Rocket");
        HappyTiger.level = createLevel();
        HappyTiger.game.appendChild(HappyTiger.level);
        HappyTiger.game.appendChild(tiger);
        HappyTiger.game.appendChild(rocket);
        rocket.act(HappyTiger.ACTION.ROCKET);
        for (let i = 0; i < 5; i++) {
            let coin = new HappyTiger.Coin();
            coin.mtxLocal.translation = new HappyTiger.ƒ.Vector3(HappyTiger.ƒ.Random.default.getRange(-1.6, 1.6), HappyTiger.ƒ.Random.default.getRange(-1.6, 1.6));
            HappyTiger.game.appendChild(coin);
        }
        let cmpCamera = new HappyTiger.ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(8);
        cmpCamera.pivot.lookAt(tiger.mtxLocal.translation); //!!! Kamera soll Tiger folgen? wie kann ich das lösen?
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
        floor.cmpTransform.local.scaleY(0.2);
        level.appendChild(floor);
        floor = new HappyTiger.Floor();
        floor.cmpTransform.local.translateX(1.4);
        floor.cmpTransform.local.translateY(0.17);
        floor.cmpTransform.local.scaleY(0.2);
        floor.cmpTransform.local.scaleX(2);
        level.appendChild(floor);
        floor = new HappyTiger.Floor();
        floor.cmpTransform.local.translateY(-1.6);
        floor.cmpTransform.local.scaleY(0.2);
        floor.cmpTransform.local.scaleX(5);
        level.appendChild(floor);
        return level;
    }
})(HappyTiger || (HappyTiger = {}));
//# sourceMappingURL=Main.js.map