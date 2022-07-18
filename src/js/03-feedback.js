import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const inputEmail = document.querySelector('input[name="email"]');
const textareaMessage = document.querySelector('textarea[name="message"]');
const dataForm = {};

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

populateForm();

function onFormInput(event) {  
  dataForm[event.target.name] = event.target.value;  

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(dataForm));  
}

function onFormSubmit(event) {
  if (!inputEmail.value || !textareaMessage.value) {
    alert(`Неможливо виконвти Ваш запит!\n\Будь ласка, заповніть усі поля форми`);
    return;
  }

  event.preventDefault();  
  event.target.reset();

  console.log(dataForm);
  localStorage.removeItem(LOCALSTORAGE_KEY);  
}

function populateForm() {
  const savedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

  if (savedData) {
    if (savedData.message) {
      textareaMessage.value = savedData.message;
      dataForm.message = savedData.message;
    }

    if (savedData.email) {
      inputEmail.value = savedData.email;
      dataForm.email = savedData.email;
    }
  }
}

