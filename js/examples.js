// Set up first demo waveform
var example = new SingleWaveForm(
    containerID = "demoContainer",
    audio = "../resources/examples_2_alt.mp3",
    barCount = 256,
    barClass = "demoBarNotPlayed",
    options = {
        barClassPlayed: "demoBarIsPlayed"
    }
)

// Play and pause button
example_playing = false

document.getElementById("demoPlayButton").addEventListener('click', function() {
    if (!example_playing) {
        example.playAudio()
        example_playing = true
        document.getElementById("demoPlayButton").innerText = "Pause"
    } else {
        example.stopAudio()
        example_playing = false
        document.getElementById("demoPlayButton").innerText = "Play"
    }
})

// Demo change audio source function: create button to swap audio source
example_audio = "giant_steps"

document.getElementById("demoSongButton").addEventListener('click', function() {
    example_playing = false
    document.getElementById("demoPlayButton").innerText = "Play"

    songTitle = document.getElementById("demoSongTitle")
    if (example_audio == "torrent") {
        example_audio = "giant_steps"
        example.changeAudioSource("../resources/examples_2_alt.mp3")
        songTitle.innerHTML = "John Coltrane - Giant Steps"
    } else if (example_audio == "giant_steps") {
        example_audio = "torrent"
        example.changeAudioSource("../resources/examples_2.mp3")
        songTitle.innerHTML = 'Chopin - Etude Op. 10, No. 4 "Torrent"'
    } else {
        throw("Something went horribly wrong with the color button")
    }
})

// Section to show source code
function openFile1(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent1");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks1");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    if (document.getElementById(tabName) === null) {
        return
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Set up second demo waveform
var example2 = new DoubleWaveForm(
    containerID = "demo2Container",
    audio = "../resources/examples_3.mp3",
    barCount = 64,
    barClass = "demo2Bar",
    options = {
        barClassPlayed: "demo2BarPlayed",
        clickable: false
    }
)

// Play pause button
example2_playing = false

document.getElementById("demo2PlayButton").addEventListener('click', function() {
    if (!example2_playing) {
        example2.playAudio()
        example2_playing = true
        document.getElementById("demo2PlayButton").innerText = "Pause"
    } else {
        example2.stopAudio()
        example2_playing = false
        document.getElementById("demo2PlayButton").innerText = "Play"
    }
})

// Navigation buttons
document.getElementById("demo2NavForward").addEventListener('click', function() {
    example2.navForward(10)
})
document.getElementById("demo2NavBackward").addEventListener('click', function() {
    example2.navBackward(10)
})

// Section to show source code
function openFile2(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent2");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks2");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    if (document.getElementById(tabName) === null) {
        return
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}


// Set up third demo waveform
var example3 = new CircleWaveForm(
    containerID = "demo3Container",
    audio = "../resources/examples_4.mp3",
    barCount = 128,
    barClass = "demo3Bar",
    options = {
        barClassIsPlayed: "demo3Bar",
        clickable: false
    }
)

// Play pause button
example3_playing = false

document.getElementById("demo3PlayButton").addEventListener('click', function() {
    if (!example3_playing) {
        example3.playAudio()
        example3_playing = true
        document.getElementById("demo3PlayButton").className = "fa fa-pause"
    } else {
        example3.stopAudio()
        example3_playing = false
        document.getElementById("demo3PlayButton").className = "fa fa-play"
    }
})

// Volume Controls
document.getElementById("demo3VolDown").addEventListener('click', function() {
    example3.decrementVolume(0.1)
})
document.getElementById("demo3VolMute").addEventListener('click', function() {
    example3.toggleMute()
})
document.getElementById("demo3VolUp").addEventListener('click', function() {
    example3.incrementVolume(0.1)
})

// Section to show source code
function openFile3(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent3");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks3");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    if (document.getElementById(tabName) === null) {
        return
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
