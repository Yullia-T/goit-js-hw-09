import Notiflix from "notiflix";

const formEl = document.querySelector('form');
let formData = {};
let delay = 0;

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', onFormInput);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay)
  })
}

function onFormInput(event) {
  formData[event.target.name] = Number(event.target.value);
  return formData;
}

function onFormSubmit(event) {
  event.preventDefault();
  delay = formData.delay;
  for (let i = 1; i <= formData.amount; i++) {
    createPromise(i, delay)
      .then(value => Notiflix.Notify.success(value))
      .catch(error => Notiflix.Notify.failure(error));
  delay += formData.step;
  }
}
