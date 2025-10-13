import { VALIDATION_RULES, validateInput } from './validation.js';
import { showToast, setLoadingState } from './ui.js';

export function handleLoginSubmit(event) {
  event.preventDefault();
  
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const submitBtn = form.querySelector('.form__submit-btn');
  
  const isEmailValid = validateInput(emailInput, VALIDATION_RULES.email);
  const isPasswordValid = validateInput(passwordInput, VALIDATION_RULES.password);
  
  if (!isEmailValid || !isPasswordValid) {
    return;
  }

  setLoadingState(submitBtn, true);
  
  // TODO: Add API call here
  setTimeout(() => {
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = './dashboard.html';
  }, 1000);
}

export function handleRegisterSubmit(event) {
  event.preventDefault();
  
  const form = document.getElementById('registerForm');
  const usernameInput = document.getElementById('registerUsername');
  const emailInput = document.getElementById('registerEmail');
  const passwordInput = document.getElementById('registerPassword');
  const confirmPasswordInput = document.getElementById('registerConfirmPassword');
  const submitBtn = form.querySelector('.form__submit-btn');
  
  const isUsernameValid = validateInput(usernameInput, VALIDATION_RULES.username);
  const isEmailValid = validateInput(emailInput, VALIDATION_RULES.email);
  const isPasswordValid = validateInput(passwordInput, VALIDATION_RULES.password);
  
  if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
    return;
  }
  
  if (passwordInput.value !== confirmPasswordInput.value) {
    showInputError(confirmPasswordInput, 'Passwords do not match');
    return;
  }

  setLoadingState(submitBtn, true);
  
  // TODO: Add API call here
  setTimeout(() => {
    showToast('Registration successful! Please log in.', 'success');
    form.reset();
    document.querySelector('.login-btn').click();
    setLoadingState(submitBtn, false);
  }, 1000);
}