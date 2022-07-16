import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const inputEmail = document.querySelector('.feedback-form input');
const textareaMessage = document.querySelector('.feedback-form textarea');
const dataForm = {};
const LOCALSTORAGE_KEY = 'feedback-form-state';

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
}

function populateForm() {
  const savedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

  if (savedData.message) {
      textareaMessage.value = savedData.message;
  }

  if (savedData.email) {
      inputEmail.value = savedData.email;
  }
  
  console.log(savedData)
}