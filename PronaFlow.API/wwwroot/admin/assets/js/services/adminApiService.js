import { getAuthToken } from './adminAuthService.js';

const API_BASE_URL = '/api/admin';

async function request(endpoint, options = {}) {
    const token = getAuthToken();
    if (!token) {
        // Nếu không có token, chuyển hướng về trang đăng nhập chính
        window.location.href = '/index.html#auth';
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });

    if (!response.ok) {
        if (response.status === 403) {
             // Nếu quyền bị từ chối, cũng chuyển hướng
             alert("You don't have permission to access this page.");
             window.location.href = '/index.html#home';
        }
        // Xử lý các lỗi khác...
    }
    return response.json();
}

// Các hàm tiện ích
export const adminApi = {
    get: (endpoint) => request(endpoint),
    post: (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
    put: (endpoint, body) => request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};