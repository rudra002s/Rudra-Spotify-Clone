console.log("LETS GO");
let currentSong = new Audio();
let songs;
let currFolder;

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

async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/${folder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            let songName =
                element.href.split(`/${folder}/`)[1] ||
                element.href.split(`%5C${folder}%5C`)[1];
            songs.push(songName);
        }
    }
    return songs;
}

const playMusic = (track, pause = false) => {
    // let audio=new Audio("/songs/"+track)
    currentSong.src = `/${currFolder}/` + track

    localStorage.setItem("lastSong", track)

    if (!pause) {
        currentSong.play()
    }

    document.querySelector(".songinfo").innerHTML = decodeURI(track)
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
    songs = await getSongs("songs/love");

    let savedSong = localStorage.getItem("lastSong")
    let encodedSavedSong = encodeURIComponent(savedSong)

    if (encodedSavedSong && songs.includes(encodedSavedSong)) {
        playMusic(encodedSavedSong, true)
    } else {
        playMusic(songs[0], true)
    }

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
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        //to make the player circle move
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
    })

    //Add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%"
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    //Add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    //Add an event listener for cross
    document.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })

    //Add an event listener to previous and forward
    previous.addEventListener("click", () => {
        console.log("Previous Clicked")
        console.log(currentSong)
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])

        if ((index - 1) >=0) {
            playMusic(songs[index - 1])
        }
    })

    forward.addEventListener("click", () => {
        currentSong.pause()
        console.log("Forward Clicked")

        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])

        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }

    })

    //Add an event listener to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log(e,e.target,e.target.value)
        currentSong.volume = parseInt(e.target.value)/100
    })

}

main();