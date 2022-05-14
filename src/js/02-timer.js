import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.querySelector('#datetime-picker');
const buttonEl = document.querySelector('[data-start]');
const timerEl = document.querySelector('.timer');
const valueEl = document.querySelectorAll('.value');
const fieldEl = document.querySelectorAll('.field');

let time = null;
let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            Notify.failure('Please choose future date in the calendar');
        } else {
            buttonEl.disabled = false;
           time = selectedDates[0] - Date.now();
        }
    },
};

inputEl.style.border = '1px solid black';
inputEl.style.fontSize = '25px';
inputEl.style.height = '30px';
inputEl.style.width = '220px';
timerEl.style.display = 'flex';
timerEl.style.marginRight = '10px';
buttonEl.style.border = '3px solid red';
buttonEl.style.background = 'red';
buttonEl.style.height = '30px';
buttonEl.style.width = '60px';
buttonEl.style.color = 'white';
buttonEl.style.fontSize = '21px';
buttonEl.style.cursor= 'pointer';
buttonEl.disabled = false;

fieldEl.forEach(el => {
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.marginRight = '15px';
    el.style.marginTop = '25px';
    el.style.alignItems = 'center';
    el.style.textTransform = 'uppercase';
});

valueEl.forEach(el => {
    el.style.fontSize = '45px';
})

flatpickr("#datetime-picker", options);  

buttonEl.addEventListener('click', startCountdown);

function startCountdown() {
timerId = setInterval(() => {
    if (time >= 1000) {
        time -= 1000;
        convertMs(time);
    } else {
        clearInterval(timerId)
        }
    }, 1000)
      buttonEl.disabled = true;
    }

function convertMs(ms) {
            // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

            // Remaining days
        const days = addLeadingZero(Math.floor(ms / day));
            // Remaining hours
        const hours = addLeadingZero(Math.floor((ms % day) / hour));
            // Remaining minutes
        const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
            // Remaining seconds
        const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    
        valueEl[0].textContent = days;
        valueEl[1].textContent = hours;
        valueEl[2].textContent = minutes;
        valueEl[3].textContent = seconds;
                  
    return { days, hours, minutes, seconds };
    }

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}