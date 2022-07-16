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
  event.preventDefault();  
  event.target.reset();

  localStorage.removeItem(LOCALSTORAGE_KEY);

  console.log(dataForm);
}

function populateForm() {
  const savedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

  if (savedData) {
    if (savedData.message) {
      textareaMessage.value = savedData.message;
    }

    if (savedData.email) {
      inputEmail.value = savedData.email;
    }
  }
}