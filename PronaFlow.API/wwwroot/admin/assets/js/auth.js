// File: /admin/assets/js/auth.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    // Nếu người dùng đã đăng nhập, chuyển hướng ngay đến dashboard
    if (localStorage.getItem('adminToken')) {
        window.location.href = '/admin/index.html';
        return;
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessage.style.display = 'none';

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                // Thử đọc chi tiết lỗi từ API
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();

            // Quan trọng: Lưu token vào localStorage
            localStorage.setItem('adminToken', data.token);

            // Chuyển hướng đến trang dashboard sau khi đăng nhập thành công
            window.location.href = '/admin/index.html';

        } catch (error) {
            errorMessage.textContent = error.message;
            errorMessage.style.display = 'block';
        }
    });
});