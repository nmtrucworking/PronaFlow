import { getCurrentUser } from './services/adminAuthService.js';
import { initDashboardPage } from '../pages/dashboard.js';
import { initUsersPage } from '../pages/users.js';
import { initProjectsPage } from '../pages/projects.js';
import { initLogsPage } from '../pages/logs.js';

(function() {
    const token = localStorage.getItem('adminToken');
    const isLoginPage = window.location.pathname.endsWith('login.html');

    if (!token && !isLoginPage) {
        // Nếu không có token và không phải trang login, chuyển hướng về trang login
        window.location.href = '/admin/login.html';
    }
})();

const routes = {
    '/admin/dashboard': { html: '/admin/pages/dashboard.html', init: initDashboardPage },
    '/admin/users': { html: '/admin/pages/users.html', init: initUsersPage },
    '/admin/projects': { html: '/admin/pages/projects.html', init: initProjectsPage },
    '/admin/logs': { html: '/admin/pages/logs.html', init: initLogsPage },
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
        
        if (route.init) {
            route.init();
        }
    } else {
        document.getElementById('admin-app').innerHTML = '<h2>404 Page Not Found</h2>';
    }
}