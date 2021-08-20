// Creating a new Waveform object
var homeWaveform = new SingleWaveForm(
    containerID = "homeWaveContainer", 
    audio = "./resources/examples_1.ogg", 
    barCount = 128, 
    barClassNotPlayed = "homeBarGradientNotPlayed",
    barClassIsPlayed = "homeBarGradientIsPlayed",
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
        homeWaveform.changeNotPlayedBarClass("homeBarGradientNotPlayed")
        homeWaveform.changeIsPlayedBarClass("homeBarGradientIsPlayed",)
        header.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(./resources/header_blue.jpg)"
    } else if (homeWaveform_color == "blue") {
        homeWaveform_color = "orange"
        homeWaveform.changeNotPlayedBarClass("homeBarGradientNotPlayedAlt")
        homeWaveform.changeIsPlayedBarClass("homeBarGradientIsPlayedAlt",)
        header.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(./resources/header_orange.jpg)"
    } else {
        throw("Something went horribly wrong with the color button")
    }
})
