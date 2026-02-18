console.log("LETS GO");
let currentSong = new Audio();

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
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
            let songName =
                element.href.split("/songs/")[1] ||
                element.href.split("%5Csongs%5C")[1];
            songs.push(songName);
        }
    }
    return songs;
}

const playMusic = (track) => {
    // let audio=new Audio("/songs/"+track)
    currentSong.src = "/songs/" + track
    currentSong.play()

    document.querySelector(".songinfo").innerHTML = track
    document.querySelector(".songtime").innerHTML = "00:00/00:00"

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
                  </div> </li>`;
    }


    //Attach an element listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            let songName = e.querySelector(".info").firstElementChild.innerHTML.trim();
            console.log(songName)
            playMusic(songName + ".mp3");
        })
    })

    //Attach an element listener to previous,play,forward
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "play.svg"
        }
    })

    //Listen for timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration)
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
    })

}

main();