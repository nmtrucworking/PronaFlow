import { getCurrentUser } from './services/adminAuthService.js';
import { initDashboardPage } from './pages/dashboard.js';
import { initUsersPage } from './pages/users.js';
import { initProjectsPage } from './pages/projects.js';
import { initLogsPage } from './pages/logs.js';

(function() {
    const token = localStorage.getItem('adminToken');
    const isLoginPage = window.location.pathname.endsWith('login.html');

    if (!token && !isLoginPage) {
        window.location.href = '/admin/login.html';
    } else if (token && isLoginPage) {
        window.location.href = '/admin/index.html#admin/dashboard';
    }
})();

const routes = {
    '/admin/dashboard': { html: '/admin/pages/dashboard.html', init: initDashboardPage },
    '/admin/users': { html: '/admin/pages/users.html', init: initUsersPage },
    '/admin/projects': { html: '/admin/pages/projects.html', init: initProjectsPage },
    '/admin/logs': { html: '/admin/pages/logs.html', init: initLogsPage },
};

function adminGuard() {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
        alert("Access Denied. Admins only.");
        window.location.href = '/admin/login.html';
        return false;
    }
    return true;
}

export async function router() {
    if (!adminGuard()) return;

    const path = window.location.hash.substring(1) || '/admin/dashboard';
    const route = routes[path];
    const appContainer = document.getElementById('admin-app');

    if (route) {
        try {
            const response = await fetch(route.html); // Sửa lỗi fetch
            if (!response.ok) throw new Error(`Page not found: ${route.html}`);
            const html = await response.text();
            appContainer.innerHTML = html;

            if (typeof route.init === 'function') {
                route.init();
            }
        } catch (error) {
            console.error('Error loading page:', error);
            appContainer.innerHTML = '<h2>Error loading page content.</h2>';
        }
    } else {
        appContainer.innerHTML = '<h2>404 Page Not Found</h2><p>The requested page does not exist.</p>';
    }
}