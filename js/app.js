const screens = document.querySelectorAll('.screen')
const startBtn = document.querySelector('#start')
const againBtn = document.querySelector('#again')
const timeBtn = document.querySelector('#time-list')
const sizeBtn = document.querySelector('#size-list')
const time = document.querySelector('#time')
const board = document.querySelector('#board')
const score = document.querySelector('#score')
const scorePlayer = document.querySelector('#score-player')

let timeNumber = 0
let countGame = 0
let selectedSize = null
let intervalId

const colors = ['#DC143C', '#00FF00', '#FF1493', '#00FFFF', 'orange', 'yellow', '#FF00FF', 'blue']

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeBtn.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        timeNumber = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
    }
})

sizeBtn.addEventListener('click', (event) => {
    if (event.target.classList.contains('size-btn')) {
        selectedSize = event.target.getAttribute('data-info').split(',').map(Number)
        screens[2].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        countGame++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    clearInterval(intervalId)
    intervalId = setInterval(decreaseTime, 1000)
    setTime(timeNumber)
    createRandomCircle()
}

function decreaseTime() {
    if (timeNumber === 0) {
        finishGame()
    } else {
        let current = --timeNumber
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    time.innerHTML = `00:${value}`
}

function finishGame() {
    clearInterval(intervalId)
    screens[3].classList.add('up')
    score.textContent = `Счёт: ${countGame}`
    
    localStorage.setItem('previousScore', countGame)
}

function createRandomCircle() {
    const circle = document.createElement('div')
    circle.classList.add('circle')

    const size = getRandomNumber(selectedSize[0], selectedSize[1])
    const { width, height } = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    const color = getRandomColor()
    circle.style.background = `${color}`

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

againBtn.addEventListener('click', event => {
    countGame = 0
    timeNumber = 0
    selectedSize = null

    board.innerHTML = ''

    const previousScore = localStorage.getItem('previousScore')
    scorePlayer.textContent = `Ваш прошлый результат: ${previousScore || 0}`

    screens.forEach(screen => {
        screen.classList.remove('up')
    })
})