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
    // Get the list of all the songs
    let songs = await getSongs()
    console.log(songs)

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> ${song.replaceAll("%20", " ")} </li>`;
    }

    // Play the first song
    // var audio = new Audio("/songs/" + songs[0]);
    // audio.play();
}

main()