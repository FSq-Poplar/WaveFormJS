/* WaveForm v0.9.0 | Poplar Wang @FSq-Poplar | FSq-Poplar.com/WaveFormJS */

// IIFE Wrapper
(function(global, document) {

    const waveformPrototype = {
        playAudio: function() {
            /**
             * Plays audio of the waveform by resuming the audio context and playing the DOM element
             * 
             * @since 0.1.0
             * @access public
             */
            this.audioElement.play()
            this.audioContext.resume()
        },
    
        stopAudio: function() {
            /**
             * Plays audio of the waveform by pausing the DOM element, does NOT stop the audio context
             * 
             * @since 0.1.0
             * @access public
             */
            this.audioElement.pause()
        },
    
        navigateRatio: function(ratio) {
            /**
             * Changes the playhead to @param ratio * audio length.
             * 
             * @since 0.3.0
             * @access public
             * 
             * @param ratio float between 0 and 1, inclusive
             */
            if (ratio > 1 || ratio < 0) {
                console.warn("Waveform.js Ratio passed to navigateRatio (" + ratio + ") is out of bounds")
            } else if (isNaN(ratio)) {
                console.warn("Waveform.js Object passed to navigateRatio is not a number")
            } else {
                audioElement = document.getElementById(this.audioElement.id)
                const destinationTime = (audioElement.duration * ratio).toFixed(2)
                this.audioElement.currentTime = destinationTime.toString()
            }
        },
    
        navigate: function(seconds) {
            /**
             * Changes the playhead to @param seconds seconds, does nothing if
             * greater than duration or less than 0 (invalid values)
             * 
             * @since 0.6.0
             * @access public
             * 
             * @param seconds timestamp in seconds to move to
             */
            if (isNaN(seconds)) {
                console.warn("Waveform.js Object passed to navigate is not a number")
            } else if (seconds < 0 || seconds > this.audioElement.duration) {
                console.warn("Waveform.js Time passed to navigate is out of bounds")
            } else {
                this.audioElement.currentTime = seconds
            }
        },
    
        navForward: function(timeToMove) {
            /**
             * Moves the current playhead @param timeToMove seconds forwards, stopping
             * the audio/visualization if new time is after end of audio.
             * 
             * @since 0.6.0
             * @access public
             * 
             * @param timeToMove seconds to move, num
             */
            if (isNaN(timeToMove)) {
                console.warn("Object passed to navForward is not a number")
                return
            }
    
            const newTime = this.audioElement.currentTime + timeToMove
    
            if (newTime <= this.audioElement.duration) {
                this.audioElement.currentTime = newTime
            } else {
                this.audioElement.currentTime = 0
                this.stopAudio()
            }
        },
    
        navBackward: function(timeToMove) {
            /**
             * Moves the current playhead @param timeToMove seconds backwards, to
             * a minimum value of 0 (start of audio)
             * 
             * @since 0.6.0
             * @access public
             * 
             * @param timeToMove seconds to move, num
             */
            if (isNaN(timeToMove)) {
                console.warn("Object passed to navBackward is not a number")
                return
            }
    
            const newTime = this.audioElement.currentTime - timeToMove
    
            if (newTime <= this.audioElement.duration) {
                this.audioElement.currentTime = newTime
            } else {
                this.audioElement.currentTime = 0
            }
        },
    
        changeVolume: function(percentage) {
            /**
             * Changes the volume to the percentage, represented as a decimal.
             * 
             * @since 0.6.0
             * @access public
             * 
             * @param percentage float between 0 and 1 inclusive to set volume to
             */
            if (isNaN(percentage)) {
                console.warn("Waveform.js Object passed to changeVolume is not a number")
            } else if (percentage < 0 || percentage > 1) {
                console.warn("Waveform.js percentage passed to changeVolume (" + percentage
                + ") is out of bounds")
            } else {
                this.audioElement.volume = percentage
            }
        },
    
        incrementVolume: function(increase) {
            /**
             * Increases the volume's current ratio by @param increase
             * 
             * @since 0.9.0
             * @access public
             * 
             * @param increase float between 0 and 1 inclusive to increase volume by
             */
            const newVol = this.audioElement.volume + increase
    
            if (isNaN(increase)) {
                console.warn("Waveform.js Object passed to incrementVolume is not a number")
            } else if (increase < 0 || increase > 1) {
                console.warn("Waveform.js percentage passed to incrementVolume (" + increase
                + ") is out of bounds")
            } else {
                if (newVol <= 1) {
                    this.audioElement.volume = newVol
                } else {
                    this.audioElement.volume = 1
                }
            }
        },
    
        decrementVolume: function(decrease) {
            /**
             * Decreases the volume's current ratio by @param decrease
             * 
             * @since 0.9.0
             * @access public
             * 
             * @param decrease float between 0 and 1 inclusive to decrease volume by
             */
            const newVol = this.audioElement.volume - decrease
    
            if (isNaN(decrease)) {
                console.warn("Waveform.js Object passed to decrementVolume is not a number")
            } else if (decrease < 0 || decrease > 1) {
                console.warn("Waveform.js percentage passed to decrementVolume (" + decrease
                + ") is out of bounds")
            } else {
                if (newVol >= 0) {
                    this.audioElement.volume = newVol
                } else {
                    this.audioElement.volume = 0
                }
            }
        },
    
        toggleMute: function() {
            /**
             * API through Waveform object to mute audio, consequently stops visualization
             * 
             * @since 0.6.0
             * @access public
             */
            this.audioElement.muted = !this.audioElement.muted
        },
    
        changeAudioSource: function(newSource) {
            /**
             * Changes the audio source of the visualizer to @param newSource, 
             * and reconnects frequency data array/audio contexts
             * 
             * @since 0.5.0
             * @access public
             * 
             * @param newSource The path to the new audio source
             */
            this.stopAudio()
            this.audioElement.src = newSource
        },
    
        changeBarClass: function(newClass) {
            /**
             * Changes the classname used on bars not yet played to @param newClass
             * 
             * @since 0.4.0
             * @access public
             * 
             * @param newClass The name of the new class that will be used
             */
            if (typeof newClass === 'string' || newClass instanceof String) {
                this.clearBarClasses()
                this.barClasses.notPlayed = newClass
            } else {
                console.warn("Waveform.js ERROR object passed to changeBarClass is not a string")
            }
        },
    
        changeBarClassPlayed: function(newClass) {
            /**
             * Changes the classname used on bars which have been played to @param newClass
             * 
             * @since 0.4.0
             * @access public
             * 
             * @param newClass The name of the new class that will be used
             */
            if (typeof newClass === 'string' || newClass instanceof String) {
                this.clearBarClasses()
                this.barClasses.isPlayed = newClass
            } else {
                console.warn("Waveform.js ERROR object passed to changeBarClassPlayed is not a string")
            }  
        },
    
        clearBarClasses: function() {
            /**
             * Helper function, clears class assignments to the bars in the visualizer
             * 
             * @since 0.4.0
             * @access private
             */
            for (let i = 0; i < this.barCount; i++) {
                let bar = document.getElementById(`${this.wrapper.id}-bar-${i + 1}`)
        
                bar.classList.remove(this.barClasses.notPlayed)
                bar.classList.remove(this.barClasses.isPlayed)
            }
        }
    }
    
    function setupWaveForm(waveform, containerID, audio, barCount, barClass, options) {
        /**
         * Sets up the common elements between different WaveForm designs, namely the
         * wrapper div, classes, and audio elements
         * 
         * @since 0.7.0
         * @access private
         * 
         * @param waveform          waveform object which is being modified
         * @param containerID       id of the div which the visualizer will be built within.
         *                          Should be empty, although styling is okay
         * @param audio             path or URL to the audio which will be visualized
         * @param barCount          How many bars should be constructed, MUST BE A POWER OF 2 and AT LEAST 16, MAX 1024
         * @param barClassNotPlayed className which will be used when displaying visualizer bars of audio
         *                          which has yet to be played.
         * @param options           additional, optional arguments for futher functional and visual customization
         *      @property barClassPlayed    className which will be used when displaying visualizer bars of audio which
         *                                  HAS been played.
         *                                  Default: value given for @param barClass
         *      @property clickable         bool which deterines whether clicking a bar navigates the audio
         *                                  Default: True
         * 
         * @property wrapper        Wrapper element in which the visualizer will be built within
         *                          Just a full size div within @param containerID, but with non static positioning
         * @property barCount       Number of bars in the visualizer
         * @property barClasses     Class names of bars to be used
         * @property audioElement   Audio element in HTML, for connection to DOM
         * @property audioContext   Audio context of the waveform, used for visualization purposes
         * @property audioAnalyser  AudioContext analyser, gets frequency data of data being played
         * @property audioData      Uint8Array, stores real time frequency data of the audio being played
         */
        if (barCount < 16) {
            throw("Waveform.js ERROR BarCount must be at least 16")
        } else if (barCount > 1024) {
            throw("Waveform.js ERROR BarCount must be no more than 1024")
        } else if ((Math.log(barCount)/Math.log(2)) % 1 != 0) {
            throw("WaveForm.js ERROR BarCount is not power of 2")
        } else {
            waveform.barCount = barCount
        }
    
        if (options.barClassPlayed != null) {
            waveform.barClasses = {
                "notPlayed": barClass,
                "isPlayed": options.barClassPlayed,
            }
        } else {
            waveform.barClasses = {
                "notPlayed": barClass,
                "isPlayed": barClass,
            }
        }
    
        waveform.wrapper = document.createElement('div')
        waveform.wrapper.style = 'width: 100%; height: 100%; position: relative;'
        waveform.wrapper.id = containerID + "-visualizer"
        document.getElementById(containerID).append(waveform.wrapper)
    
        waveform.audioElement = document.createElement('audio')
        waveform.audioElement.id = containerID + "-audio"
        waveform.audioElement.src = audio
        waveform.wrapper.append(waveform.audioElement)
    
        waveform.audioContext = new AudioContext()
        let source = waveform.audioContext.createMediaElementSource(waveform.audioElement)
        waveform.analyser = waveform.audioContext.createAnalyser()
        waveform.analyser.fftSize = 8 * waveform.barCount
        source.connect(waveform.analyser)
        source.connect(waveform.audioContext.destination)
        waveform.audioData = new Uint8Array(waveform.analyser.frequencyBinCount)
    }
    
    function SingleWaveForm(containerID, audio, barCount, barClass, options = {}) {
        /**
         * Constructs a new Waveform object within the element with the provided ID.
         * One bar per frequency band, moving upwards relative to bottom of container div
         * 
         * @since   0.7.0
         * @access  public
         * 
         * @parameters and @properties - see @function setupWaveForm
         */
        setupWaveForm(this, containerID, audio, barCount, barClass, options)
    
        for (let i = 0; i < this.barCount; i++) {
            let bar = document.createElement('div')
            bar.id = `${containerID}-visualizer-bar-${i + 1}`
            bar.style.position = "absolute"
            bar.style.margin = "0 1px 0 0"
            bar.style.width = `calc(${100/this.barCount}% - 1px)`
            bar.style.bottom = "0"
            bar.style.left = `${(100/this.barCount) * i}%`

            if (!(options.clickable != null && options.clickable == false)) {
                bar.onclick = function() {
                    const ratio = (i / this.barCount)
                    this.navigateRatio(ratio)
                }.bind(this)
            }
            
            this.wrapper.append(bar)
        }
    
        requestAnimationFrame(function () {
            animateSingleWaveform(this)
        }.bind(this))
    }
    SingleWaveForm.prototype = waveformPrototype
    
    function animateSingleWaveform(waveform) {
        /**
         * Animates the SingleWaveForm's visualization bars within the passed waveform based on its audio data,
         * using browser animation frames to call itself.
         * 
         * @since 0.7.0
         * @access private
         * 
         * @param waveform  The waveform which needs to be animated
         */
        const audioElement = document.getElementById(waveform.audioElement.id)
        const duration = audioElement.duration
        const currTime = audioElement.currentTime / duration
        waveform.analyser.getByteFrequencyData(waveform.audioData)
    
        data = [...waveform.audioData]
        for (let i = 0; i < waveform.barCount; i++) {
            let bar = document.getElementById(`${waveform.wrapper.id}-bar-${i + 1}`)
            bar.style.height = `${10 + (88 * (data[i] / 255))}%`
    
            if (!isNaN(duration)){
                if (currTime > (i / waveform.barCount)) {
                    bar.classList.remove(waveform.barClasses.notPlayed)
                    bar.classList.add(waveform.barClasses.isPlayed)
                } else {
                    bar.classList.remove(waveform.barClasses.isPlayed)
                    bar.classList.add(waveform.barClasses.notPlayed)
                }
            }
        }
    
        requestAnimationFrame(function () {
            animateSingleWaveform(this)
        }.bind(waveform))
    }
    
    function DoubleWaveForm(containerID, audio, barCount, barClass, options = {}) {
        /**
         * Constructs a new Waveform object within the element with the provided ID.
         * Two bar per frequency band, moving up and down relative to the div's vertical center
         * 
         * @since   0.7.0
         * @access  public
         * 
         * @parameters and @properties - see @function setupWaveForm
         */
        setupWaveForm(this, containerID, audio, barCount, barClass, options)
    
        for (let i = 0; i < this.barCount; i++) {
            let bar_top = document.createElement('div')
            bar_top.id = `${containerID}-visualizer-bar-${i + 1}-top`
            bar_top.style.position = "absolute"
            bar_top.style.margin = "0 1px 0 0"
            bar_top.style.width = `calc(${100/this.barCount}% - 1px)`
            bar_top.style.bottom = "50%"
            bar_top.style.left = `${(100/this.barCount) * i}%`
    
            let bar_bot = document.createElement('div')
            bar_bot.id = `${containerID}-visualizer-bar-${i + 1}-bot`
            bar_bot.style.position = "absolute"
            bar_bot.style.margin = "0 1px 0 0"
            bar_bot.style.width = `calc(${100/this.barCount}% - 1px)`
            bar_bot.style.left = `${(100/this.barCount) * i}%`
            bar_bot.style.transform = "rotate(180deg)"

            if (!(options.clickable != null && options.clickable == false)) {
                bar_bot.onclick = function() {
                    const ratio = (i / this.barCount)
                    this.navigateRatio(ratio)
                }.bind(this)
                bar_top.onclick = function() {
                    const ratio = (i / this.barCount)
                    this.navigateRatio(ratio)
                }.bind(this)
            }
            
            this.wrapper.append(bar_top)
            this.wrapper.append(bar_bot)
        }
    
        requestAnimationFrame(function () {
            animateDoubleWaveform(this)
        }.bind(this))
    }
    DoubleWaveForm.prototype = waveformPrototype
    
    function animateDoubleWaveform(waveform) {
        /**
         * Animates the DoubleWaveForm's visualization bars within the passed waveform based on its audio data,
         * using browser animation frames to call itself.
         * 
         * @since 0.7.0
         * @access private
         * 
         * @param waveform  The waveform which needs to be animated
         */
        const audioElement = document.getElementById(waveform.audioElement.id)
        const duration = audioElement.duration
        const currTime = audioElement.currentTime / duration
        waveform.analyser.getByteFrequencyData(waveform.audioData)
    
        data = [...waveform.audioData]
        for (let i = 0; i < waveform.barCount; i++) {
            let bar = document.getElementById(`${waveform.wrapper.id}-bar-${i + 1}-top`)
            bar.style.height = `${5 + (43 * (data[i] / 255))}%`
    
            if (!isNaN(duration)){
                if (currTime > (i / waveform.barCount)) {
                    bar.classList.remove(waveform.barClasses.notPlayed)
                    bar.classList.add(waveform.barClasses.isPlayed)
                } else {
                    bar.classList.remove(waveform.barClasses.isPlayed)
                    bar.classList.add(waveform.barClasses.notPlayed)
                }
            }
        }
        for (let i = 0; i < waveform.barCount; i++) {
            let bar = document.getElementById(`${waveform.wrapper.id}-bar-${i + 1}-bot`)
            const height = 5 + (43 * (data[i] / 255))
            bar.style.height = `${height}%`
            bar.style.bottom = `calc(51% - ${height}%`
    
            if (!isNaN(duration)){
                if (currTime > (i / waveform.barCount)) {
                    bar.classList.remove(waveform.barClasses.notPlayed)
                    bar.classList.add(waveform.barClasses.isPlayed)
                } else {
                    bar.classList.remove(waveform.barClasses.isPlayed)
                    bar.classList.add(waveform.barClasses.notPlayed)
                }
            }
        }
    
        requestAnimationFrame(function () {
            animateDoubleWaveform(this)
        }.bind(waveform))
    }
    
    function CircleWaveForm(containerID, audio, barCount, barClass, options = {}) {
        /**
         * Constructs a new Waveform object within the element with the provided ID.
         * One bar per frequency band, moving outwards from div center
         * 
         * @since   0.8.0
         * @access  public
         * 
         * @parameters and @properties - see @function setupWaveForm
         */
        setupWaveForm(this, containerID, audio, barCount, barClass, options)
    
        for (let i = 0; i < this.barCount; i++) {
            let bar = document.createElement('div')
            bar.id = `${containerID}-visualizer-bar-${i + 1}`
            bar.style.position = "absolute"
            bar.style.margin = "0 1px 0 0"
            bar.style.width = `${100/this.barCount}%`
            bar.style.transform = `rotate(${360 * i / barCount + 1}deg)`

            if (!(options.clickable != null && options.clickable == false)) {
                bar.onclick = function() {
                    const ratio = (i / this.barCount)
                    this.navigateRatio(ratio)
                }.bind(this)
            }
            
            this.wrapper.append(bar)
        }
    
        requestAnimationFrame(function () {
            animateCircleWaveform(this)
        }.bind(this))
    }
    CircleWaveForm.prototype = waveformPrototype
    
    function animateCircleWaveform(waveform) {
        /**
         * Animates the CirclWaveForm's visualization bars within the passed waveform based on its audio data,
         * using browser animation frames to call itself.
         * 
         * @since 0.8.0
         * @access private
         * 
         * @param waveform  The waveform which needs to be animated
         */
        const audioElement = document.getElementById(waveform.audioElement.id)
        const duration = audioElement.duration
        const currTime = audioElement.currentTime / duration
        waveform.analyser.getByteFrequencyData(waveform.audioData)
    
        data = [...waveform.audioData]
        for (let i = 0; i < waveform.barCount; i++) {
            let bar = document.getElementById(`${waveform.wrapper.id}-bar-${i + 1}`)
            const height = 48 * (data[i] / 255)
            bar.style.height = `${height}%`
            const radians = (360 * i / barCount) * Math.PI / 180
            bar.style.bottom = `${50 - (0.5 * (height - (height * Math.cos(radians))))}%`
            bar.style.left = `${50 + (0.5 * (height * Math.sin(radians)))}%`
    
            if (!isNaN(duration)){
                if (currTime > (i / waveform.barCount)) {
                    bar.classList.remove(waveform.barClasses.notPlayed)
                    bar.classList.add(waveform.barClasses.isPlayed)
                } else {
                    bar.classList.remove(waveform.barClasses.isPlayed)
                    bar.classList.add(waveform.barClasses.notPlayed)
                }
            }
        }
    
        requestAnimationFrame(function () {
            animateCircleWaveform(this)
        }.bind(waveform))
    }

    // Exports
    global.SingleWaveForm = global.SingleWaveForm || SingleWaveForm
    global.DoubleWaveForm = global.DoubleWaveForm || DoubleWaveForm
    global.CircleWaveForm = global.CircleWaveForm || CircleWaveForm

})(window, window.document);
