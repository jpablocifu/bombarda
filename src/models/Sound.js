class Sound {

    constructor(sources) {

        this.audio = document.createElement("audio");

        for (var i = 0; i < sources.length; i++) {
            var source = document.createElement("source");
            source.src = sources[i];
            this.audio.appendChild(source);
        }
 
    }


    play(){
        this.audio.play();
    }

   
}