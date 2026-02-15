console.log("LETS GO")

async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            // FIX: This split looks for the song name regardless of / or \ 
            let songName = element.href.split("/songs/")[1] || element.href.split("%5Csongs%5C")[1];
            songs.push(songName)
        }
    }
    return songs
}

async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            // Updated split to handle both forward and backward slashes
            let splitArray = element.href.split(/songs\/|%5Csongs%5C/);
            if (splitArray.length > 1) {
                songs.push(splitArray[1]);
            }
        }
    }
    return songs
}

async function main() {
    // 1. Get the list of songs
    let songs = await getSongs()
    
    // 2. Show songs in the library sidebar
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = "" 

    for (const song of songs) {
        
        let displayName = song.replaceAll("%20", " ");
        songUL.innerHTML = songUL.innerHTML + `<li> ${displayName} </li>`
    }


    if (songs.length > 0) {
        var audio = new Audio("/songs/" + songs[0].replaceAll("%20", "/"));
        audio.addEventListener("loadeddata", () => {
            console.log(audio.duration, audio.currentSrc, audio.currentTime);
        });
    }
}

main()