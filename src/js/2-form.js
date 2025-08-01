const feedbackFormEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

document.addEventListener('DOMContentLoaded', () => {
  const savedData = loadFromLocalStorage(STORAGE_KEY);
  if (savedData) {
    formData = savedData;
    feedbackFormEl.elements.email.value = savedData.email || '';
    feedbackFormEl.elements.message.value = savedData.message || '';
  }
});

feedbackFormEl.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value.trim();
  saveToLocalStorage(STORAGE_KEY, formData);
});

feedbackFormEl.addEventListener('submit', event => {
  event.preventDefault();

  const emailValue = feedbackFormEl.elements.email.value.trim();
  const messageValue = feedbackFormEl.elements.message.value.trim();

  if (emailValue === '' || messageValue === '') {
    alert('Fill please all fields');
    return;
  }

  console.log('Form submitted:', formData);

  feedbackFormEl.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
});

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return null;
  }
}
