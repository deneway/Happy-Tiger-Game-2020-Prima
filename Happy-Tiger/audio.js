"use strict";
var HappyTiger;
(function (HappyTiger) {
    class Audio {
        static init() {
            let audioElements = document.querySelectorAll("audio");
            for (let element of audioElements) {
                Audio.sounds[element.id] = element;
            }
        }
        static play(_id) {
            if (Audio.sounds[_id].id == "Coin" || Audio.sounds[_id].id == "Loose" || Audio.sounds[_id].id == "Coin2") {
                Audio.sounds[_id].volume = Audio.volEffects;
            }
            else if (Audio.sounds[_id].id == "Safari") {
                Audio.sounds[_id].volume = Audio.volMusic;
            }
            Audio.sounds[_id].play();
        }
    }
    Audio.volMusic = 0.3;
    Audio.volEffects = 0.1;
    Audio.sounds = {};
    HappyTiger.Audio = Audio;
})(HappyTiger || (HappyTiger = {}));
//# sourceMappingURL=audio.js.map