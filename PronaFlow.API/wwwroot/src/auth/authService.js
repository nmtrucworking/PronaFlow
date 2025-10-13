// Import các hàm gọi API và các hàm tiện ích giao diện
import apiService from '../api/apiService.js';
import store from '../store/store.js';
import { showToast, setLoadingState } from '../utils/ui.js';

/**
 * Hàm chính để khởi tạo các sự kiện và logic trên trang xác thực.
 * Sẽ được gọi bởi AuthPage.js sau khi HTML đã được render.
 */
export function initializeAuth() {
    // Kích hoạt các icon trên trang
    if (window.lucide) {
        lucide.createIcons();
    }

    // Kiểm tra nếu người dùng đã đăng nhập
    checkAuthStatus();
}

/**
 * Kiểm tra trạng thái xác thực của người dùng
 */
export async function checkAuthStatus() {
    const token = localStorage.getItem('authToken');

    if (token) {
        try {
            // Lấy thông tin người dùng hiện tại
            const user = await apiService.auth.getCurrentUser();

            // Nếu đang ở trang đăng nhập, chuyển hướng đến dashboard
            if (window.location.hash === '#/login') {
                window.location.hash = '#/dashboard';
            }

            return true;
        } catch (error) {
            console.error('Failed to verify authentication:', error);
            // Token không hợp lệ, xóa khỏi localStorage
            localStorage.removeItem('authToken');
            store.logout();
            return false;
        }
    }

    return false;
}

/**
 * Đăng nhập người dùng
 * @param {string} email - Email người dùng
 * @param {string} password - Mật khẩu người dùng
 * @returns {Promise<object>} - Thông tin người dùng
 */
export async function login(email, password) {
    try {
        const response = await apiService.auth.login({ email, password });

        // Chuyển hướng đến dashboard
        window.location.hash = '#/dashboard';

        return response;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

/**
 * Đăng ký người dùng mới
 * @param {object} userData - Thông tin người dùng
 * @returns {Promise<object>} - Thông tin người dùng đã đăng ký
 */
export async function register(userData) {
    try {
        const response = await apiService.auth.register(userData);
        return response;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
}

/**
 * Đăng xuất người dùng
 */
export function logout() {
    // Clear user session/token
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    showToast('You have been logged out.', 'success');
}

/**
 * Kiểm tra quyền truy cập vào một trang
 * @param {object} route - Thông tin route
 * @returns {boolean} - Có quyền truy cập hay không
 */
export function checkAccess(route) {
    // Nếu route không yêu cầu xác thực, cho phép truy cập
    if (!route.requiresAuth) {
        return true;
    }

    // Kiểm tra token
    const token = localStorage.getItem('authToken');
    if (!token) {
        return false;
    }

    // Kiểm tra vai trò nếu cần
    if (route.roles) {
        const user = store.getState().user;
        if (!user || !route.roles.includes(user.role)) {
            return false;
        }
    }

    return true;
}

export default {
    initializeAuth,
    checkAuthStatus,
    login,
    register,
    logout,
    checkAccess
};

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
