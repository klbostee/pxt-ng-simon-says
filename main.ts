function registerPress (value: number) {
    if (ng.hasStarted()) {
        presses.push(value)
        showValue(value)
    }
}
function showValue (value: number) {
    if (value == 0) {
        basic.showLeds(`
            . # # # .
            # . . . #
            # # # # #
            # . . . #
            # . . . #
            `)
        ng.neopixels().showColor(neopixel.colors(NeoPixelColors.Yellow))
        music.playTone(440, music.beat(BeatFraction.Half))
    } else {
        basic.showLeds(`
            # # # # .
            # . . . #
            # # # # .
            # . . . #
            # # # # .
            `)
        ng.neopixels().showColor(neopixel.colors(NeoPixelColors.Blue))
        music.playTone(494, music.beat(BeatFraction.Half))
    }
    basic.pause(100)
    basic.clearScreen()
    ng.neopixels().clear()
    ng.neopixels().show()
    basic.pause(delay)
}
ng.onButtonPressed(ng.NGButton.A, function () {
    registerPress(0)
})
ng.onButtonPressed(ng.NGButton.B, function () {
    registerPress(1)
})
let presses: number[] = []
let delay = 0
ng.startWithIcon(IconNames.Confused)
if (ng.hardWasChosen()) {
    delay = 100
} else {
    delay = 500
}
let sequence: number[] = []
basic.forever(function () {
    presses = []
    sequence.push(Math.randomRange(0, 1))
    for (let value of sequence) {
        showValue(value)
    }
    while (presses.length < sequence.length) {
        basic.pause(100)
    }
    for (let index = 0; index <= sequence.length; index++) {
        if (presses[index] != sequence[index]) {
            ng.gameOver()
        }
    }
    basic.pause(2000)
    ng.incrementScore()
    basic.pause(500)
})
