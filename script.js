let timer;
let timeLeft = 25 * 60; // 25 минут в секундах
let isRunning = false;
let cycles = 0;
let mode = "work"; // work (работа) или break (перерыв)

const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const cycleCount = document.getElementById("cycle-count");
const alarmSound = document.getElementById("alarm");

// Форматирование времени (ММ:СС)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Запуск таймера
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timerDisplay.textContent = formatTime(timeLeft);
            } else {
                clearInterval(timer);
                isRunning = false;
                alarmSound.play();
                switchMode();
            }
        }, 1000);
    }
}

// Пауза таймера
function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

// Сброс таймера
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    mode = "work";
    timeLeft = 25 * 60;
    timerDisplay.textContent = formatTime(timeLeft);
    document.body.style.background = "#282c34";
}

// Переключение между рабочей сессией и перерывом
function switchMode() {
    if (mode === "work") {
        mode = "break";
        timeLeft = 5 * 60; // 5 минут на перерыв
        document.body.style.background = "#4caf50";
    } else {
        mode = "work";
        timeLeft = 25 * 60;
        document.body.style.background = "#282c34";
        cycles++;
        cycleCount.textContent = cycles;
    }
    timerDisplay.textContent = formatTime(timeLeft);
    startTimer();
}

// Назначение событий кнопкам
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
