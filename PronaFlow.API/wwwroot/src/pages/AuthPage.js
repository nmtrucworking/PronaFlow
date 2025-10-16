import { initializeAuth } from '../auth/authService.js';
import apiService from '../api/apiService.js';
import store from '../store/store.js';

const AuthPage = {
  render: async () => {
    // The render function remains unchanged.
    return `
    <style>
        /* ... CSS styles ... */
        .toast { visibility: hidden; min-width: 250px; background-color: #27ae60; color: #fff; text-align: center; border-radius: 8px; padding: 16px; position: fixed; z-index: 9999; left: 50%; bottom: 30px; transform: translateX(-50%); font-size: 16px; display: flex; align-items: center; gap: 10px; }
        .toast.show { visibility: visible; -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s; animation: fadein 0.5s, fadeout 0.5s 2.5s; }
        .form__error { display: none; color: #e74c3c; font-size: 12px; margin-top: 4px; }
        .form__input-group.error .form__input { border-color: #e74c3c; }
        .form__input-group.error .form__error { display: block; }
        .form__input-group.success .form__input { border-color: #27ae60; }
        .toast.error { background-color: #e74c3c; }
        .toast.success { background-color: #27ae60; }
        .toast.warning { background-color: #f1c40f; }
        .form__submit-btn.loading { position: relative; color: transparent; }
        .form__submit-btn.loading::after { content: ""; position: absolute; width: 16px; height: 16px; top: 0; left: 0; right: 0; bottom: 0; margin: auto; border: 4px solid #ffffff; border-top-color: transparent; border-radius: 50%; animation: button-loading-spinner 1s linear infinite; }
    </style>
    <div class="login-page">
        <header class="header" id="login-page-header"><div class="header__container"><a href="#/" class="web-name">PronaFlow</a></div></header>
        <div class="login-card">
            <div class="login-card__form-wrapper login-card__form-wrapper--login">
                <form action="" class="form" id="loginForm" name="loginForm" novalidate>
                    <h1 class="form__title">Login</h1>
                    <div class="form__input-groups">
                        <div class="form__input-group"><input id="loginEmail" name="loginEmail" type="email" class="form__input" title="Please enter your email" required placeholder="Email" autocomplete="email" /><i data-lucide="mail" class="form__icon"></i><span class="form__error" id="loginEmailError"></span></div>
                        <div class="form__input-group"><input id="loginPassword" name="loginPassword" type="password" class="form__input" title="Please enter your password" placeholder="Password" required autocomplete="current-password" /><i data-lucide="lock" class="form__icon"></i><span class="form__error" id="loginPasswordError"></span></div>
                    </div>
                    <a href="#" class="form__link">Forgot Password?</a>
                    <button id="signInBtn" type="submit" class="form__submit-btn">Login</button>
                </form>
                <p class="form__text">or login with social platforms</p>
                <div class="form_socials"><a href="#" class="form__social-link"><i class="bx bxl-google"></i></a><a href="#" class="form__social-link"><i class="bx bxl-facebook"></i></a><a href="#" class="form__social-link"><i class="bx bxl-github"></i></a><a href="#" class="form__social-link"><i class="bx bxl-linkedin"></i></a></div>
            </div>
            <div class="login-card__form-wrapper login-card__form-wrapper--register">
                <form action="#" class="form" id="registerForm" name="registerForm" novalidate>
                    <h1 class="form__title">Registration</h1>
                    <div class="form__input-groups">
                        <div class="form__input-group"><input id="signupName" name="signupName" type="text" class="form__input" title="Username must be 4-20 characters" required placeholder="Username" autocomplete="username" minlength="4" maxlength="20" /><i data-lucide="user" class="form__icon"></i><span class="form__error" id="registerUsernameError"></span></div>
                        <div class="form__input-group"><input id="signupEmail" name="signupEmail" type="email" class="form__input" title="Please enter a valid email" required placeholder="Email" autocomplete="email" /><i data-lucide="mail" class="form__icon"></i><span class="form__error" id="registerEmailError"></span></div>
                        <div class="form__input-group"><input id="signupPassword" name="signupPassword" type="password" class="form__input" title="Password must be at least 8 characters" required placeholder="Password" autocomplete="new-password" minlength="8" /><i data-lucide="lock" class="form__icon"></i><span class="form__error" id="registerPasswordError"></span></div>
                        <div class="form__input-group"><input id="registerConfirmPassword" name="registerConfirmPassword" type="password" class="form__input" title="Please confirm your password" required placeholder="Confirm Password" autocomplete="new-password" /><i data-lucide="lock" class="form__icon"></i><span class="form__error" id="registerConfirmPasswordError"></span></div>
                    </div>
                    <button id="signUpBtn" type="submit" class="form__submit-btn">Register</button>
                </form>
                <p class="form__text">or register with social platforms</p>
                <div class="form_socials"><a href="#" class="form__social-link"><i class="bx bxl-google"></i></a><a href="#" class="form__social-link"><i class="bx bxl-facebook"></i></a><a href="#" class="form__social-link"><i class="bx bxl-github"></i></a><a href="#" class="form__social-link"><i class="bx bxl-linkedin"></i></a></div>
            </div>
            <div class="toggle-box"><div class="toggle-panel toggle-left"><h1 class="toggle-panel__title">Hello, Welcome!</h1><p class="toggle-panel__text">Don't have an account?</p><button class="form__submit-btn register-btn">Register</button></div></div>
            <div class="toggle-box"><div class="toggle-panel toggle-right"><h1 class="toggle-panel__title">Welcome Back!</h1><p class="toggle-panel__text">Already have an account?</p><button class="form__submit-btn login-btn">Login</button></div></div>
        </div>
        <footer class="footer"><p class="footer__text">© 2025 PronaFlow. All Rights Reserved. Built for better work management.</p></footer>
    </div>
`;
  },
  /**
   * after_render is now much cleaner. It acts as a coordinator,
   * calling the specific initialization functions.
   */
  after_render: async () => {
    // Initialize required libraries and services
    lucide.createIcons();
    initializeAuth();
    
    // Set up all event listeners for the page
    initializeToggleButtons();
    handleLoginForm();
    handleRegisterForm();
  }
};

export default AuthPage;

/**
 * Initializes the toggle functionality between the login and register panels.
 */
function initializeToggleButtons() {
    const registerToggleBtn = document.querySelector('.register-btn');
    const loginToggleBtn = document.querySelector('.login-btn');
    const loginCard = document.querySelector('.login-card');

    if (registerToggleBtn && loginToggleBtn && loginCard) {
        registerToggleBtn.addEventListener('click', () => {
            loginCard.classList.add('login-card--right-panel-active');
        });

        loginToggleBtn.addEventListener('click', () => {
            loginCard.classList.remove('login-card--right-panel-active');
        });
    }
}

/**
 * Handles the login form submission, including validation and API call.
 */
function handleLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const emailField = document.getElementById('loginEmail');
        const passwordField = document.getElementById('loginPassword');
        const emailError = document.getElementById('loginEmailError');
        const passwordError = document.getElementById('loginPasswordError');

        // Clear previous errors
        emailError.textContent = '';
        passwordError.textContent = '';

        let isValid = true;
        
        // Basic validation
        if (!emailField.value) {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(emailField.value)) {
            emailError.textContent = 'Email is invalid';
            isValid = false;
        }

        if (!passwordField.value) {
            passwordError.textContent = 'Password is required';
            isValid = false;
        }

        if (isValid) {
            try {
                await apiService.auth.login({
                    email: emailField.value,
                    password: passwordField.value
                });
                // Redirect on successful login
                window.location.hash = '#/dashboard';
            } catch (error) {
                emailError.textContent = error.message || 'Login failed. Please check your credentials.';
            }
        }
    });
}

/**
 * Handles the registration form submission, including validation and API call.
 */
function handleRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameField = document.getElementById('signupName');
        const emailField = document.getElementById('signupEmail');
        const passwordField = document.getElementById('signupPassword');
        const confirmPasswordField = document.getElementById('registerConfirmPassword');

        const nameError = document.getElementById('registerUsernameError');
        const emailError = document.getElementById('registerEmailError');
        const passwordError = document.getElementById('registerPasswordError');
        const confirmPasswordError = document.getElementById('registerConfirmPasswordError');
        
        // Clear previous errors
        nameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';

        let isValid = true;

        if (!nameField.value) {
            nameError.textContent = 'Name is required';
            isValid = false;
        }

        if (!emailField.value) {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(emailField.value)) {
            emailError.textContent = 'Email is invalid';
            isValid = false;
        }

        if (!passwordField.value) {
            passwordError.textContent = 'Password is required';
            isValid = false;
        } else if (passwordField.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            isValid = false;
        }
        
        if (passwordField.value !== confirmPasswordField.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
            isValid = false;
        }

        if (isValid) {
            try {
                await apiService.auth.register({
                    fullName: nameField.value,
                    email: emailField.value,
                    password: passwordField.value
                });

                // On success, show a message and switch to the login form
                alert('Registration successful! Please login.');
                const loginCard = document.querySelector('.login-card');
                if (loginCard) {
                    loginCard.classList.remove('login-card--right-panel-active');
                }
            } catch (error) {
                emailError.textContent = error.message || 'Registration failed. The email might already be in use.';
            }
        }
    });
}