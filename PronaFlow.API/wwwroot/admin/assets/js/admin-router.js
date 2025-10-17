import { getCurrentUser } from './services/adminAuthService.js';

const routes = {
    '/admin/dashboard': '/admin/pages/dashboard.html',
    '/admin/users': '/admin/pages/users.html',
    '/admin/projects': '/admin/pages/projects.html',
    '/admin/logs': '/admin/pages/logs.html',
};

// Admin Guard - Chốt chặn an ninh
function adminGuard() {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
        alert("Access Denied. Admins only.");
        window.location.href = '/index.html'; // Chuyển về trang chủ người dùng
        return false;
    }
    return true;
}

export async function router() {
    if (!adminGuard()) return;

    const path = window.location.hash.substring(1) || '/admin/dashboard';
    const route = routes[path];

    if (route) {
        const response = await fetch(route);
        const html = await response.text();
        document.getElementById('admin-app').innerHTML = html;
        // Tùy chọn: gọi hàm init cho trang tương ứng
        // Ví dụ: if (path === '/admin/users') { initUsersPage(); }
    } else {
        document.getElementById('admin-app').innerHTML = '<h2>404 Page Not Found</h2>';
    }
}