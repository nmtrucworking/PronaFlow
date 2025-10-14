import { initializeAuth } from '../auth/authService.js';
import apiService from '../api/apiService.js';
import store from '../store/store.js';

const AuthPage = {
  render: async () => {
    return `<style>
        .toast {
            visibility: hidden;
            min-width: 250px;
            background-color: #27ae60;
            /* Màu xanh lá thành công */
            color: #fff;
            text-align: center;
            border-radius: 8px;
            padding: 16px;
            position: fixed;
            z-index: 9999;
            left: 50%;
            bottom: 30px;
            transform: translateX(-50%);
            font-size: 16px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .toast.show {
            visibility: visible;
            -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
            animation: fadein 0.5s, fadeout 0.5s 2.5s;
        }

        .form__error {
            display: none;
            color: #e74c3c;
            font-size: 12px;
            margin-top: 4px;
        }

        .form__input-group.error .form__input {
            border-color: #e74c3c;
        }

        .form__input-group.error .form__error {
            display: block;
        }

        .form__input-group.success .form__input {
            border-color: #27ae60;
        }

        /* Toast types */
        .toast.error {
            background-color: #e74c3c;
        }

        .toast.success {
            background-color: #27ae60;
        }

        .toast.warning {
            background-color: #f1c40f;
        }

        /* Loading state */
        .form__submit-btn.loading {
            position: relative;
            color: transparent;
        }

        .form__submit-btn.loading::after {
            content: "";
            position: absolute;
            width: 16px;
            height: 16px;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            border: 4px solid #ffffff;
            border-top-color: transparent;
            border-radius: 50%;
            animation: button-loading-spinner 1s linear infinite;
        }

        
    </style>
    <div class="login-page">
        <header class="header" id="login-page-header">
            <div class="header__container">
                <a href="#/" class="web-name">PronaFlow</a>
            </div>
        </header>
        <!-- HEADER END -->

        <div class="login-card">
            <!-- LOGIN FORM -->
            <div class="login-card__form-wrapper login-card__form-wrapper--login" id="loginForm">
                <form action="" class="form" id="loginForm" name="loginForm" novalidate>
                    <h1 class="form__title">Login</h1>
                    <div class="form__input-groups">
                        <div class="form__input-group">
                            <input id="loginEmail" 
                                    name="loginEmail" 
                                    type="email" 
                                    class="form__input"
                                    title="Please enter your email" 
                                    required 
                                    placeholder="Email" 
                                    autocomplete="email" />
                            <i data-lucide="mail" class="form__icon"></i>
                            <span class="form__error" id="loginEmailError"></span>
                        </div>
                        <div class="form__input-group">
                            <input id="loginPassword" 
                                    name="loginPassword" 
                                    type="password" 
                                    class="form__input"
                                    title="Please enter your password" 
                                    placeholder="Password"
                                    required 
                                    autocomplete="current-password" />
                            <i data-lucide="lock" class="form__icon"></i>
                            <span class="form__error" id="loginPasswordError"></span>
                        </div>
                    </div>

                    <a href="#" class="form__link">Forgot Password?</a>

                    <button id="sigInBtn" type="submit" class="form__submit-btn">Login</button>
                </form>
                <p class="form__text">or login with social platforms</p>
                <div class="form_socials">
                    <a href="#" class="form__social-link"><i class="bx bxl-google"></i></a>
                    <a href="#" class="form__social-link"><i class="bx bxl-facebook"></i></a>
                    <a href="#" class="form__social-link"><i class="bx bxl-github"></i></a>
                    <a href="#" class="form__social-link"><i class="bx bxl-linkedin"></i></a>
                </div>
            </div>

            <!-- REGISTER FORM -->
            <div class="login-card__form-wrapper login-card__form-wrapper--register" id="signupForm">
                <form action="#" class="form" id="registerForm" name="registerForm" novalidate>
                    <h1 class="form__title">Registration</h1>
                    <div class="form__input-groups">
                        <div class="form__input-group">
                            <input id="signupName"
                                name="signupName"
                                type="text" 
                                class="form__input"
                                title="Username must be 4-20 characters" 
                                required placeholder="Username"
                                autocomplete="username" 
                                minlength="4" 
                                maxlength="20" />
                            <i data-lucide="user" class="form__icon"></i>
                            <span class="form__error" id="registerUsernameError"></span>
                        </div>
                        <div class="form__input-group">
                            <input id="signupEmail"
                                name="signupEmail"
                                type="email" 
                                class="form__input"
                                title="Please enter a valid email" 
                                required placeholder="Email" 
                                autocomplete="email" />
                            <i data-lucide="mail" class="form__icon"></i>
                            <span class="form__error" id="registerEmailError"></span>
                        </div>
                        <div class="form__input-group">
                            <input id="signupPassword" name="signupPassword" type="password" class="form__input"
                                title="Password must be at least 8 characters" required placeholder="Password"
                                autocomplete="new-password" minlength="8" />
                            <i data-lucide="lock" class="form__icon"></i>
                            <span class="form__error" id="registerPasswordError"></span>
                        </div>
                        <div class="form__input-group">
                            <input id="registerConfirmPassword" name="registerConfirmPassword" type="password"
                                class="form__input" title="Please confirm your password" required
                                placeholder="Confirm Password" autocomplete="new-password" />
                            <i data-lucide="lock" class="form__icon"></i>
                            <span class="form__error" id="registerConfirmPasswordError"></span>
                        </div>
                    </div>

                    <button id="signUpBtn" type="submit" class="form__submit-btn">Register</button>
                </form>
                <p class="form__text">or register with social platforms</p>
                <div class="form_socials">
                    <a href="#" class="form__social-link"><i class="bx bxl-google"></i></a>
                    <a href="#" class="form__social-link"><i class="bx bxl-facebook"></i></a>
                    <a href="#" class="form__social-link"><i class="bx bxl-github"></i></a>
                    <a href="#" class="form__social-link"><i class="bx bxl-linkedin"></i></a>
                </div>
            </div>

            <div class="toggle-box">
                <div class="toggle-panel toggle-left">
                    <h1 class="toggle-panel__title">Hello, Welcome!</h1>
                    <p class="toggle-panel__text">Don't have an account?</p>
                    <button class="form__submit-btn register-btn">Register</button>
                </div>
            </div>

            <div class="toggle-box">
                <div class="toggle-panel toggle-right">
                    <h1 class="toggle-panel__title">Welcome Back!</h1>
                    <p class="toggle-panel__text">Already have an account?</p>
                    <button class="form__submit-btn login-btn">Login</button>
                </div>
            </div>
        </div>

        <!-- FOOTER -->
        <footer class="footer">
            <p class="footer__text">
                © 2025 PronaFlow. All Rights Reserved. Built for better work
                management.
            </p>
        </footer>
    </div>
`;
  },
  after_render: async () => {
    lucide.createIcons();
    initializeAuth();
    
    const signUpBtn = document.getElementById('signUpBtn');
    const signInBtn = document.getElementById('signInBtn');
    const loginCard = document.querySelector('.login-card');
    
    if (signUpBtn && signInBtn && loginCard) {
      signUpBtn.addEventListener('click', () => {
        loginCard.classList.add('login-card--right-panel-active');
      });
      
      signInBtn.addEventListener('click', () => {
        loginCard.classList.remove('login-card--right-panel-active');
      });
    }
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        document.getElementById('loginEmailError').textContent = '';
        document.getElementById('loginPasswordError').textContent = '';
        
        let isValid = true;
        
        if (!email) {
          document.getElementById('loginEmailError').textContent = 'Email is required';
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          document.getElementById('loginEmailError').textContent = 'Email is invalid';
          isValid = false;
        }
        
        if (!password) {
          document.getElementById('loginPasswordError').textContent = 'Password is required';
          isValid = false;
        }
        
        if (isValid) {
          try {
            await apiService.auth.login({ email, password });
            window.location.hash = '#/dashboard';
          } catch (error) {
            document.getElementById('loginEmailError').textContent = error.message || 'Login failed';
          }
        }
      });
    }
    
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
      signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        
        document.getElementById('signupNameError').textContent = '';
        document.getElementById('signupEmailError').textContent = '';
        document.getElementById('signupPasswordError').textContent = '';
        
        let isValid = true;
        
        if (!name) {
          document.getElementById('signupNameError').textContent = 'Name is required';
          isValid = false;
        }
        
        if (!email) {
          document.getElementById('signupEmailError').textContent = 'Email is required';
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          document.getElementById('signupEmailError').textContent = 'Email is invalid';
          isValid = false;
        }
        
        if (!password) {
          document.getElementById('signupPasswordError').textContent = 'Password is required';
          isValid = false;
        } else if (password.length < 6) {
          document.getElementById('signupPasswordError').textContent = 'Password must be at least 6 characters';
          isValid = false;
        }
        
        if (isValid) {
          try {
            await apiService.auth.register({ fullName: name, email, password });
            
            loginCard.classList.remove('login-card--right-panel-active');
            alert('Registration successful! Please login.');
          } catch (error) {
            document.getElementById('signupEmailError').textContent = error.message || 'Registration failed';
          }
        }
      });
    }
  }
};

export default AuthPage;