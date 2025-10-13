import { initializeAuth } from '../auth/authService.js';
import apiService from '../api/apiService.js';
import store from '../store/store.js';

const AuthPage = {
  render: async () => {
    return `<div class="login-page">
        <header class="header" id="login-page-header">
            <div class="header__container">
                <a href="#/" class="web-name">PronaFlow</a>
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
                    <button class="form__social-btn">
                        <img src="../assets/images/facebook.svg" alt="Facebook">
                    </button>
                    <button class="form__social-btn">
                        <img src="../assets/images/google.svg" alt="Google">
                    </button>
                    <button class="form__social-btn">
                        <img src="../assets/images/twitter.svg" alt="Twitter">
                    </button>
                    <button class="form__social-btn">
                        <img src="../assets/images/linkedin.svg" alt="LinkedIn">
                    </button>
                </div>
            </div>

            <!-- SIGNUP FORM -->
            <div class="login-card__form-wrapper login-card__form-wrapper--signup" id="signup_form">
                <form action="" class="form" id="signupForm" name="signupForm" novalidate>
                    <h1 class="form__title">Create Account</h1>
                    <div class="form__input-groups">
                        <div class="form__input-group">
                            <input id="signupName" 
                                    name="signupName" 
                                    type="text" 
                                    class="form__input"
                                    title="Please enter your name" 
                                    required 
                                    placeholder="Name" 
                                    autocomplete="name" />
                            <i data-lucide="user" class="form__icon"></i>
                            <span class="form__error" id="signupNameError"></span>
                        </div>
                        <div class="form__input-group">
                            <input id="signupEmail" 
                                    name="signupEmail" 
                                    type="email" 
                                    class="form__input"
                                    title="Please enter your email" 
                                    required 
                                    placeholder="Email" 
                                    autocomplete="email" />
                            <i data-lucide="mail" class="form__icon"></i>
                            <span class="form__error" id="signupEmailError"></span>
                        </div>
                        <div class="form__input-group">
                            <input id="signupPassword" 
                                    name="signupPassword" 
                                    type="password" 
                                    class="form__input"
                                    title="Please enter your password" 
                                    placeholder="Password"
                                    required 
                                    autocomplete="new-password" />
                            <i data-lucide="lock" class="form__icon"></i>
                            <span class="form__error" id="signupPasswordError"></span>
                        </div>
                    </div>

                    <button type="submit" class="form__submit-btn">Sign Up</button>
                </form>
                <p class="form__text">or sign up with social platforms</p>
                <div class="form_socials">
                    <button class="form__social-btn">
                        <img src="../assets/images/facebook.svg" alt="Facebook">
                    </button>
                    <button class="form__social-btn">
                        <img src="../assets/images/google.svg" alt="Google">
                    </button>
                    <button class="form__social-btn">
                        <img src="../assets/images/twitter.svg" alt="Twitter">
                    </button>
                    <button class="form__social-btn">
                        <img src="../assets/images/linkedin.svg" alt="LinkedIn">
                    </button>
                </div>
            </div>

            <!-- OVERLAY -->
            <div class="login-card__overlay-container">
                <div class="login-card__overlay">
                    <div class="login-card__overlay-panel login-card__overlay-panel--left">
                        <h1 class="login-card__title">Welcome Back!</h1>
                        <p class="login-card__text">To keep connected with us please login with your personal info</p>
                        <button class="login-card__btn" id="signInBtn">Sign In</button>
                    </div>
                    <div class="login-card__overlay-panel login-card__overlay-panel--right">
                        <h1 class="login-card__title">Hello, Friend!</h1>
                        <p class="login-card__text">Enter your personal details and start journey with us</p>
                        <button class="login-card__btn" id="signUpBtn">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
  },
  after_render: async () => {
    // Khởi tạo các icon Lucide
    lucide.createIcons();
    
    // Khởi tạo các sự kiện xác thực
    initializeAuth();
    
    // Xử lý chuyển đổi giữa form đăng nhập và đăng ký
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
    
    // Xử lý form đăng nhập
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Lấy dữ liệu từ form
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Xóa thông báo lỗi cũ
        document.getElementById('loginEmailError').textContent = '';
        document.getElementById('loginPasswordError').textContent = '';
        
        // Validate dữ liệu
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
            // Gọi API đăng nhập
            await apiService.auth.login({ email, password });
            
            // Chuyển hướng đến trang dashboard
            window.location.hash = '#/dashboard';
          } catch (error) {
            // Hiển thị lỗi
            document.getElementById('loginEmailError').textContent = error.message || 'Login failed';
          }
        }
      });
    }
    
    // Xử lý form đăng ký
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
      signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Lấy dữ liệu từ form
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        
        // Xóa thông báo lỗi cũ
        document.getElementById('signupNameError').textContent = '';
        document.getElementById('signupEmailError').textContent = '';
        document.getElementById('signupPasswordError').textContent = '';
        
        // Validate dữ liệu
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
            // Gọi API đăng ký
            await apiService.auth.register({ name, email, password });
            
            // Chuyển sang form đăng nhập
            loginCard.classList.remove('login-card--right-panel-active');
            
            // Hiển thị thông báo thành công
            alert('Registration successful! Please login.');
          } catch (error) {
            // Hiển thị lỗi
            document.getElementById('signupEmailError').textContent = error.message || 'Registration failed';
          }
        }
      });
    }
  }
};

export default AuthPage;
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