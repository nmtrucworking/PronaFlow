export function getAuthToken() {
    // Trong môi trường phát triển, chúng ta có thể trả về một token giả
    return localStorage.getItem('adminToken') || 'dummy-admin-token';
}

export function getCurrentUser() {
    // Dữ liệu người dùng giả lập. 
    try {
        const token = getAuthToken();
        if (!token) return null;
        // Trong ứng dụng thực tế, bạn sẽ giải mã JWT tại đây
        const payload = {
            name: 'Admin User',
            email: 'admin@pronaflow.com',
            role: 'admin'
        };
        return payload;
    } catch (e) {
        console.error("Failed to get user from token", e);
        return null;
    }
}

export function login(email, password) {
    // Hàm đăng nhập giả lập
    if (email === 'admin@pronaflow.com' && password === 'password') {
        const fakeToken = 'dummy-admin-token-from-login';
        localStorage.setItem('adminToken', fakeToken);
        return { success: true, token: fakeToken };
    }
    return { success: false, message: 'Invalid credentials' };
}

export function logout() {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login.html';
}