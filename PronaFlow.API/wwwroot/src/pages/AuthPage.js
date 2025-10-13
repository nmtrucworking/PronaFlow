import { initializeAuth } from '../auth/authService.js';

const AuthPage = {
  render: async () => {
    return `<div class="login-page">
        <header class="header" id="login-page-header">
            <div class="header__container">
                <a href="../pages/home.html" class="web-name">PronaFlow</a>
            </div>
        </header>
        <!-- HEADER END -->

        <div class="login-card">
            <!-- LOGIN FORM -->
            <div class="login-card__form-wrapper login-card__form-wrapper--login" id="login_form">
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

                    <button type="submit" class="form__submit-btn">Login</button>
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
            <div class="login-card__form-wrapper login-card__form-wrapper--register" id="register-form">
                <form action="#" class="form" id="registerForm" name="registerForm" novalidate>
                    <h1 class="form__title">Registration</h1>
                    <div class="form__input-groups">
                        <div class="form__input-group">
                            <input id="registerUsername" 
                                name="registerUsername" 
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
                            <input id="registerEmail" 
                                name="registerEmail" 
                                type="email" 
                                class="form__input"
                                title="Please enter a valid email" 
                                required placeholder="Email" 
                                autocomplete="email" />
                            <i data-lucide="mail" class="form__icon"></i>
                            <span class="form__error" id="registerEmailError"></span>
                        </div>
                        <div class="form__input-group">
                            <input id="registerPassword" name="registerPassword" type="password" class="form__input"
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

                    <button type="submit" class="form__submit-btn">Register</button>
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
    </div>`;
  },

  after_render: async () => {
    initializeAuth();
  }
};

export default AuthPage;