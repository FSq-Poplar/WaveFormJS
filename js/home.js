// Creating a new Waveform object
var homeWaveform = new SingleWaveForm(
    containerID = "homeWaveContainer", 
    audio = "./resources/examples_1.ogg", 
    barCount = 128, 
    barClass = "homeBarGradientNotPlayed",
    options = {
        barClassPlayed: "homeBarGradientIsPlayed"
    }
)

//Using API to create a play/pause button
homeWaveform_playing = false

document.getElementById("homePlayButton").addEventListener('click', function() {
    if (!homeWaveform_playing) {
        homeWaveform.playAudio()
        homeWaveform_playing = true
        document.getElementById("homePlayButton").innerText = "Pause"
    } else {
        homeWaveform.stopAudio()
        homeWaveform_playing = false
        document.getElementById("homePlayButton").innerText = "Play"
    }
})

// Demo change class functions: create a button to swap colours between presets on waveform 1
homeWaveform_color = "blue"

document.getElementById("homeThemeButton").addEventListener('click', function() {
    header = document.getElementById("homeHeader")

    if (homeWaveform_color == "orange") {
        homeWaveform_color = "blue"
        homeWaveform.changeBarClass("homeBarGradientNotPlayed")
        homeWaveform.changeBarClassPlayed("homeBarGradientIsPlayed",)
        header.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(./resources/header_blue.jpg)"
    } else if (homeWaveform_color == "blue") {
        homeWaveform_color = "orange"
        homeWaveform.changeBarClass("homeBarGradientNotPlayedAlt")
        homeWaveform.changeBarClassPlayed("homeBarGradientIsPlayedAlt",)
        header.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(./resources/header_orange.jpg)"
    } else {
        throw("Something went horribly wrong with the color button")
    }
})
