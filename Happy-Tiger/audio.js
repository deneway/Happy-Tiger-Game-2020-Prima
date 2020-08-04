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
            // if (Audio.sounds[_id].id == "WalkOnGrass" || Audio.sounds[_id].id == "Sword" || Audio.sounds[_id].id == "Slurp") {
            //     Audio.sounds[_id].volume = Audio.volEffects;
            if (Audio.sounds[_id].id == "Safari") {
                Audio.sounds[_id].volume = Audio.volMusic;
            }
            // else if (Audio.sounds[_id].id == "Wind") {
            //     Audio.sounds[_id].volume = Audio.volEnvironment;
            // }
            Audio.sounds[_id].play();
        }
    }
    Audio.volMusic = 0.3;
    Audio.volEffects = 0.1;
    Audio.volEnvironment = 0.1;
    Audio.sounds = {};
    HappyTiger.Audio = Audio;
})(HappyTiger || (HappyTiger = {}));
//# sourceMappingURL=audio.js.map