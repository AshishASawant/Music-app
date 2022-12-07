let play=document.querySelector('.play')
let disk=document.querySelector('.disk')
let music=document.querySelector('audio')
let prev=document.querySelector('.fa-chevron-left')
let next=document.querySelector('.fa-chevron-right')
let duration=document.querySelector('.total-time')
let current=document.querySelector('.current-time')
let seekBar=document.querySelector('.seek-bar')
let authName=document.querySelector('p')
let songName=document.querySelector('h1')
let img=document.querySelector('img')

const allSongs=[{
    authName:'Author 1',
    songName:'Song 1',
    songUrl:'audio/audio1.mp3',
    imgUrl:"image/img1.jpg",
},{
    authName:'Author 2',
    songName:'Song 2',
    songUrl:'audio/audio2.mp3',
    imgUrl:"image/img2.jpg",
},{
    authName:'Author 3',
    songName:'Song 3',
    songUrl:'audio/audio3.mp3',
    imgUrl:"image/img3.jpg",
},{
    authName:'Author 4',
    songName:'Song 4',
    songUrl:'audio/audio4.mp3',
    imgUrl:"image/img4.jpg",
},{
    authName:'Author 5',
    songName:'Song 5',
    songUrl:'audio/audio5.mp3',
    imgUrl:"image/img5.jpg",
},
]

let isplaying=false
let currentSong=0

let playMusic=()=>{
    if(isplaying){
        disk.classList.add('animation')
        play.classList.replace('fa-play','fa-pause')
        music.play()
        isplaying=false
    }
    else{
        disk.classList.remove('animation')
        play.classList.replace('fa-pause','fa-play')
        music.pause()
        isplaying=true
    }

}

let nextMusic=()=>{
    console.log('this is next')
    currentSong=(currentSong+1)%allSongs.length
    getAudio(allSongs[currentSong])
    playMusic()
    
}

let prevMusic=()=>{
    console.log('this is prev')
    currentSong=(currentSong-1+allSongs.length)%allSongs.length
    getAudio(allSongs[currentSong])
    playMusic()
  
}

let getAudio=(song)=>{
    authName.textContent=song.authName
    songName.textContent=song.songName
    img.src=song.imgUrl
    music.src=song.songUrl
    isplaying=true
    music.onloadedmetadata=()=>{
        seekBar.max=music.duration
        duration.textContent=formatTime(music.duration)
    }
    // setTimeout(() => {
    //     seekBar.max=music.duration
    //     duration.textContent=formatTime(music.duration)
    // }, 300);
}

let formatTime=(time)=>{
    min=Math.floor(time/60)
    sec=Math.floor(time%60)
    if(min<10){
        min='0'+min
    }
    if(sec<10){
        sec='0'+sec
    }
    return `${min}:${sec}`
}

let changeCtime=()=>{
    music.currentTime=seekBar.value
}

play.addEventListener('click',playMusic)
next.addEventListener('click',nextMusic)
prev.addEventListener('click',prevMusic)
seekBar.addEventListener('change',changeCtime)

getAudio(allSongs[currentSong])

setInterval(() => {
    current.textContent=formatTime(music.currentTime)
    seekBar.value=music.currentTime
    if(current.textContent===duration.textContent){
        nextMusic()
    }
}, 500);




