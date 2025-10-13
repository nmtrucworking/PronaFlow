// Import các hàm gọi API và các hàm tiện ích giao diện
import { api } from '../api/apiService.js';
import { showToast, setLoadingState, toggleForms } from '../utils/ui.js';

/**
 * Hàm chính để khởi tạo các sự kiện và logic trên trang xác thực.
 * Sẽ được gọi bởi AuthPage.js sau khi HTML đã được render.
 */
export function initializeAuth() {
    // Kích hoạt các icon trên trang
    if (window.lucide) {
        lucide.createIcons();
    }

    // Lấy các element cần thiết từ DOM
    const container = document.querySelector('.login-card');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Gán sự kiện cho các nút chuyển đổi form
    registerBtn?.addEventListener('click', () => toggleForms(container, 'register'));
    loginBtn?.addEventListener('click', () => toggleForms(container, 'login'));

    // Gán sự kiện submit cho từng form
    loginForm?.addEventListener('submit', handleLoginSubmit);
    registerForm?.addEventListener('submit', (e) => handleRegisterSubmit(e, container));
}

/**
 * Xử lý logic khi người dùng submit form đăng nhập.
 * @param {Event} event - Sự kiện submit.
 */
async function handleLoginSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = form.querySelector('.form__submit-btn');
    const originalButtonText = submitBtn.textContent;

    const email = form.elements.loginEmail.value;
    const password = form.elements.loginPassword.value;

    setLoadingState(submitBtn, true, 'Logging in...');

    try {
        const data = await api.post('/auth/login', { email, password });

        if (data && data.token) {
            // Đăng nhập thành công
            localStorage.setItem('authToken', data.token); // Lưu token vào localStorage
            showToast('Login successful!', 'success');
            
            // Chuyển hướng đến trang dashboard sau một khoảng trễ ngắn
            setTimeout(() => {
                window.location.hash = '#/dashboard';
            }, 500);
        } else {
            throw new Error('Invalid response from server.');
        }

    } catch (error) {
        // Xử lý lỗi
        showToast(error.message || 'Login failed. Please check your credentials.', 'error');
        setLoadingState(submitBtn, false, originalButtonText);
    }
}

/**
 * Xử lý logic khi người dùng submit form đăng ký.
 * @param {Event} event - Sự kiện submit.
 * @param {HTMLElement} container - Element container chính để chuyển form.
 */
async function handleRegisterSubmit(event, container) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = form.querySelector('.form__submit-btn');
    const originalButtonText = submitBtn.textContent;
    
    // Lưu ý: Giao diện của bạn có input 'Username' nhưng API register chỉ cần 'FullName'.
    // Chúng ta sẽ dùng Username làm FullName.
    const fullName = form.elements.registerUsername.value;
    const email = form.elements.registerEmail.value;
    const password = form.elements.registerPassword.value;

    // TODO: Thêm bước kiểm tra dữ liệu phía client (validation) ở đây

    setLoadingState(submitBtn, true, 'Registering...');

    try {
        // Gọi API đăng ký
        await api.post('/auth/register', { fullName, email, password });

        // Đăng ký thành công
        showToast('Registration successful! Please log in.', 'success');
        form.reset();
        toggleForms(container, 'login'); // Tự động chuyển sang form đăng nhập

    } catch (error) {
        // Xử lý lỗi (ví dụ: email đã tồn tại)
        showToast(error.message || 'Registration failed. Please try again.', 'error');
    } finally {
        // Luôn luôn trả lại trạng thái ban đầu cho nút bấm
        setLoadingState(submitBtn, false, originalButtonText);
    }
}

/**
 * Kiểm tra xem người dùng đã đăng nhập hay chưa bằng cách kiểm tra sự tồn tại của token.
 * @returns {boolean} - True nếu đã đăng nhập, ngược lại là false.
 */
export function isAuthenticated() {
    return !!localStorage.getItem('authToken');
}

/**
 * Xử lý đăng xuất.
 */
export function logout() {
    localStorage.removeItem('authToken');
    window.location.hash = '#/login';
    showToast('You have been logged out.', 'success');
}