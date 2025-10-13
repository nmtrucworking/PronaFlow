export const VALIDATION_RULES = {
  username: {
    pattern: /^[a-zA-Z0-9_]{4,20}$/,
    message: 'Username must be 4-20 characters and contain only letters, numbers and underscores'
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  password: {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message: 'Password must be at least 8 characters and contain uppercase, lowercase, number and special character'
  }
};

export function showInputError(inputElement, message) {
  const formGroup = inputElement.closest('.form__input-group');
  formGroup.classList.add('error');
  formGroup.classList.remove('success');
  const errorElement = formGroup.querySelector('.form__error');
  if (errorElement) {
    errorElement.textContent = message;
  }
}

export function showInputSuccess(inputElement) {
  const formGroup = inputElement.closest('.form__input-group');
  formGroup.classList.remove('error');
  formGroup.classList.add('success');
}

export function validateInput(inputElement, rule) {
  const value = inputElement.value.trim();
  
  if (!value) {
    showInputError(inputElement, `${inputElement.placeholder} is required`);
    return false;
  }

  if (rule && !rule.pattern.test(value)) {
    showInputError(inputElement, rule.message);
    return false;
  }

  showInputSuccess(inputElement);
  return true;
}