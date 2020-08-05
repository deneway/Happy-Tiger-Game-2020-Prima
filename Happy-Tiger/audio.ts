    namespace HappyTiger{
    interface Sounds {
        [id: string]: HTMLAudioElement;
      }
    export class Audio {
    public static volMusic: number = 0.3;
    public static volEffects: number = 0.1;
    private static sounds: Sounds = {};

    public static init(): void {
        let audioElements: NodeListOf<HTMLAudioElement> = document.querySelectorAll("audio");
        for (let element of audioElements) {
            Audio.sounds[element.id] = element;
        }
    }

    public static play(_id: string): void {

        if (Audio.sounds[_id].id == "Coin" || Audio.sounds[_id].id == "Loose"  || Audio.sounds[_id].id == "Coin2" ) {
             Audio.sounds[_id].volume = Audio.volEffects;}
        else if (Audio.sounds[_id].id == "Safari") {
            Audio.sounds[_id].volume = Audio.volMusic;
        } 
        Audio.sounds[_id].play();
    }


    }
}
