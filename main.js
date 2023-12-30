const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const imageBackground = document.querySelector('.app__image')
const text = document.querySelector('.app__title')
const musicSwitch = document.querySelector('#alternar-musica')
const music = new Audio('./sons/luna-rise-part-one.mp3')
const playBtIcon = document.querySelector('#start-pause img')
const playBtText = document.querySelector('#start-pause span')
const timerShow = document.querySelector('#timer')


const startTimeout = new Audio('./sons/beep.mp3')
const startPlay = new Audio('./sons/play.wav')
const startPause = new Audio('./sons/pause.mp3')

const timerBt = document.querySelector('#start-pause')
let timeToReset = 1500
let timeInSeconds = 1500
let timeId = null

music.loop = true

musicSwitch.addEventListener('change', () => {
    if (music.paused) {
        music.play()
    } else {
        music.pause()
    }
})

focoBt.addEventListener('click', () => {
    changeContext('foco')
    timeInSeconds = 1500
    timeToReset = 1500

    showTimer()
})

curtoBt.addEventListener('click', () => {
    changeContext('descanso-curto')
    timeInSeconds = 300
    timeToReset = 300
    showTimer()
})

longoBt.addEventListener('click', () => {
    changeContext('descanso-longo')
    timeInSeconds = 900
    timeToReset = 900
    showTimer()
})


function changeContext(context) {
    changeContextBackground(context)
    changeSelectedButton(context)
    changeText(context)
}

function changeText(context) {
    switch (context) {
        case 'foco': text.innerHTML = `Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break
        case 'descanso-curto': text.innerHTML = `Que tal dar uma respirada?<br>
        <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break
        case 'descanso-longo':
            text.innerHTML = `Hora de voltar à superfície.<br>
        <strong class="app__title-strong">
        Faça uma pausa longa.</strong>`
    }
}

function changeContextBackground(context) {
    html.setAttribute('data-contexto', context)
    console.log(context)
    imageBackground.setAttribute('src', `/imagens/${context}.png`);
}

function changeSelectedButton(context) {

    switch (context) {
        case 'foco': curtoBt.classList.remove('active')
            focoBt.classList.add('active')
            longoBt.classList.remove('active')
            break
        case 'descanso-curto': curtoBt.classList.add('active')
            focoBt.classList.remove('active')
            longoBt.classList.remove('active')
            break
        case 'descanso-longo':
            curtoBt.classList.remove('active')
            focoBt.classList.remove('active')
            longoBt.classList.add('active')
    }

}


const countdown = () => {
    if (timeInSeconds <= 0) {
        timeInSeconds = timeToReset
        showTimer()
        startTimeout.play()
        alert('Time ended!')
        const focoActive = html.getAttribute('data-contexto') == 'foco'
        if (focoActive) {
            evento = new CustomEvent('focoEnded')
            document.dispatchEvent(evento)
        }
        resetTimer()
        return
    }
    timeInSeconds--
    showTimer()
}

timerBt.addEventListener('click', startTimer)

function startTimer() {
    if (timeId) {

        startPause.play()
        resetTimer()
        return
    }
    playBtIcon.setAttribute('src', './imagens/pause.png')
    playBtText.textContent = 'Pausar'
    timeId = setInterval(countdown, 1000)
    startPlay.play()

}

function resetTimer() {
    clearInterval(timeId)
    playBtIcon.setAttribute('src', './imagens/play_arrow.png')
    playBtText.textContent = 'Começar'
    timeId = null
}

function showTimer() {
    const timeToShow = new Date(timeInSeconds * 1000)
    const timeFormated = timeToShow.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' })
    timerShow.innerHTML = `${timeFormated}`
}

showTimer()