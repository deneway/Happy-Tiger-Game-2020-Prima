    namespace HappyTiger{
    interface Sounds {
        [id: string]: HTMLAudioElement;
      }
    export class Audio {
    public static volMusic: number = 0.3;
    public static volEffects: number = 0.1;
    public static volEnvironment: number = 0.1;
    private static sounds: Sounds = {};

    public static init(): void {
        let audioElements: NodeListOf<HTMLAudioElement> = document.querySelectorAll("audio");
        for (let element of audioElements) {
            Audio.sounds[element.id] = element;
        }
    }

    public static play(_id: string): void {

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
}
