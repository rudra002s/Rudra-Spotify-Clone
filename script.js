console.log("LETS GO");

async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            let songName =
                element.href.split("/songs/")[1] ||
                element.href.split("%5Csongs%5C")[1];
            songs.push(songName);
        }
    }
    return songs;
}

async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            let splitArray = element.href.split(/songs\/|%5Csongs%5C/);
            if (splitArray.length > 1) {
                songs.push(splitArray[1]);
            }
        }
    }
    return songs;
}

async function main() {
    // Get the list of all the songs
    let songs = await getSongs();

    let songUL = document
        .querySelector(".songList")
        .getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML =
            songUL.innerHTML + `<li> 
            <img class="invert" src="music.svg" alt="">
                  <div class="info">
                    <div>${song.replaceAll("%20", " ").replaceAll(".mp3", "")}</div>
                  </div>
                  <div class=""playnow>
                    <span>Play Now</span>
                    <img class="invert" src="playNow.svg" alt="">
                  </div> li>`;
    }


    // Play the first song
    //   var audio = new Audio("/songs/" + songs[9]);
    //   audio.play();

}

main();
