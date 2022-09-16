const $Startbutton = document.querySelector(".start-button")
const $restartButton = document.querySelector(".restart-button")
let flippedImage = null
const images = ["img/Suribidet2.jpg", "img/Surifabulosa2.jpg", "img/Surifall2.jpg", "img/Surifutbolista2.jpg", "img/Surilangostino2.jpg", "img/Suriorigin2.jpg", "img/Surisepia2.jpg", "img/Suriseria2.jpg"]
const repeatedImages = images.concat(images)
let randomFrontSide = []
let seconds = 0
let timerInt

function start() {
    generateRandomOrder()
    enableUserInput()
    timerInt = setInterval(timer, 1000)
}

function disableUserInput() {
    document.querySelectorAll(".image").forEach(function (image) {
        image.onclick = () => {

        }
    })
}

function enableUserInput() {
    document.querySelectorAll(".image").forEach(function (image) {
        image.onclick = flipImage
    })

}

function flipImage(e) {
    const image = e.target
    image.src = randomFrontSide[image.id]
    disableUserInput()
    manageFlippedImages(image)
}

function manageFlippedImages(image) {

    if (flippedImage === null) {
        flippedImage = image
        setTimeout(function () {
            enableUserInput()
        }, 500)
        return
    } else if (flippedImage === image) {
        setTimeout(function () {
            enableUserInput()
        }, 500)
        return
    } else if (checkIfSame(flippedImage, image)) {

        setTimeout(function () {
            eraseCorrects(flippedImage)
            eraseCorrects(image)
            checkIfWin()
            enableUserInput()
            flippedImage = null
        }, 500)

    } else {
        setTimeout(function () {
            flipImageBack()
            enableUserInput()
        }, 1000)

        flippedImage = null
    }
}


function flipImageBack() {
    document.querySelectorAll(".image").forEach(function (image) {
        image.src = "img/gatoasesino.jpg"
    })
}


function timer() {
    seconds++
    document.querySelector(".timer").textContent = `Time: ${seconds}`
}


function generateRandomOrder() {
    const randomImages = repeatedImages.sort(function () {
        return 0.5 - Math.random()
    })

    randomImages.forEach(function (image) {
        randomFrontSide.push(image)
    })

}

function checkIfSame(image1, image2) {
    return image1.src === image2.src
}

function eraseCorrects(image) {
    image.style.opacity = "0"
    image.style.pointerEvents = "none"
    image.classList.remove("visible")
}

function checkIfWin() {
    if (document.querySelectorAll(".visible").length === 0) {
        const $gameBoard = document.querySelector(".game-board")
        $gameBoard.style.display = "none"
        document.querySelector(".display").id = ""
        document.querySelector(".restart-button").id = ""
        clearInterval(timerInt)
    }

}

function restartGame() {
    const $gameBoard = document.querySelector(".game-board")
    $gameBoard.style.display = "flex"
    document.querySelector(".display").id = "hidden"
    document.querySelector(".restart-button").id = "hidden"
    flippedImage = null
    seconds = 0
    randomFrontSide = []
    setImagesBack()
    disableUserInput()
}

function setImagesBack() {
    document.querySelectorAll(".image").forEach(function (image) {
        image.src = "img/gatoasesino.jpg"
        image.style.opacity = "1"
        image.style.pointerEvents = ""
        image.classList.add("visible")
    })
}

$Startbutton.addEventListener("click", start)
$restartButton.addEventListener("click", restartGame)