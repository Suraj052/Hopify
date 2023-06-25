

console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif'); gif.style.opacity = 0;
let masterSongName = document.getElementById('masterSongName');
let masterSongSinger = document.getElementById('masterSongSinger');
let btmImg = document.getElementById('btmImg');
let endTime = document.getElementById('endTime');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Give Me Your Forever", songSinger: "Zack Tabudio",filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Kaun Tujhe & Kuch Toh Hai",songSinger: "Armaan Malik", filePath: "songs/2.mp3", coverPath: "covers/2.jpeg"},
    {songName: "Chupana Bhi Nahi Aata", songSinger: "Stebin Ben",filePath: "songs/3.mp3", coverPath: "covers/3.jpeg"},
    {songName: "Rasiya",songSinger: "Pritam", filePath: "songs/4.mp3", coverPath: "covers/4.jpeg"},
    {songName: "Way Back Home",songSinger: "Shaun", filePath: "songs/5.mp3", coverPath: "covers/5.jpeg"},
    {songName: "Maula Mere Maula", songSinger: "Sonu Nigam",filePath: "songs/2.mp3", coverPath: "covers/6.jpeg"},
    {songName: "Until I Found You",songSinger: "Stephen Sanchez", filePath: "songs/2.mp3", coverPath: "covers/7.jpeg"},
    {songName: "Tujh Main Rab Dikhta Hai", songSinger: "Roop Kumar Rathod",filePath: "songs/2.mp3", coverPath: "covers/8.jpeg"},
    {songName: "Besabriyan",songSinger: "Armaan Malik", filePath: "songs/2.mp3", coverPath: "covers/9.jpeg"},
    {songName: "Subhanallah", songSinger: "Sreenam, Shilpa Rao",filePath: "songs/4.mp3", coverPath: "covers/10.jpeg"},
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("songSinger")[0].innerText = songs[i].songSinger;

});
  
function formatTime(timeInSeconds) {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = Math.floor(timeInSeconds % 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
}
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        makeAllPlays();
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;

    let currentTime = audioElement.currentTime;
    let formattedTime = formatTime(currentTime);
    startTime.innerText = formattedTime;
    
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedSongIndex = parseInt(e.target.id.replace('songItemPlay', ''));
        if (clickedSongIndex === songIndex) {
            // If the clicked song is the current playing song
            if (audioElement.paused || audioElement.currentTime <= 0) {
                audioElement.play();
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
            } else {
                audioElement.pause();
                e.target.classList.remove('fa-pause-circle');
                e.target.classList.add('fa-play-circle');
                gif.style.opacity = 0;
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
            }
        } else {
            // If a different song is clicked
            makeAllPlays();
            songIndex = clickedSongIndex;
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            masterSongSinger.innerText = songs[songIndex].songSinger;
            btmImg.src = songs[songIndex].coverPath;
            audioElement.addEventListener("loadedmetadata", () => {
                let duration = audioElement.duration;
                let formattedDuration = formatTime(duration);
                endTime.innerText = formattedDuration;
            });
            audioElement.load();
            audioElement.currentTime = 0;
            audioElement.play();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
           

        }
    });
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    masterSongSinger.innerText = songs[songIndex].songSinger;
    btmImg.src = songs[songIndex].coverPath;
    audioElement.addEventListener("loadedmetadata", () => {
        let duration = audioElement.duration;
        let formattedDuration = formatTime(duration);
        endTime.innerText = formattedDuration;
    });
    audioElement.load();
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    masterSongSinger.innerText = songs[songIndex].songSinger;
    btmImg.src = songs[songIndex].coverPath;
    audioElement.addEventListener("loadedmetadata", () => {
        let duration = audioElement.duration;
        let formattedDuration = formatTime(duration);
        endTime.innerText = formattedDuration;
    });
    audioElement.load();
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})





