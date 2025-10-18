import { login } from './services/adminAuthService.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Sử dụng hàm đăng nhập giả lập
            const result = login(email, password);

            if (result.success) {
                // Chuyển hướng đến trang dashboard chính khi đăng nhập thành công
                window.location.href = '/admin/index.html#admin/dashboard';
            } else {
                errorMessage.textContent = result.message || 'Login failed!';
                errorMessage.style.display = 'block';
            }
        });
    }
});