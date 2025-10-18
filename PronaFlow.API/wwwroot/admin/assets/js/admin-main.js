import { router } from './admin-router.js';
import { getCurrentUser, logout } from './services/adminAuthService.js';

async function loadSidebar() {
    try {
        const response = await fetch('/admin/components/admin-sidebar.html');
        if (!response.ok) throw new Error('Sidebar component not found');
        const sidebarHtml = await response.text();
        document.getElementById('admin-sidebar-container').innerHTML = sidebarHtml;

        const user = getCurrentUser();
        if (user) {
            const userNameEl = document.getElementById('sidebar-user-name');
            const userEmailEl = document.getElementById('sidebar-user-email');
            if (userNameEl) userNameEl.textContent = user.name;
            if (userEmailEl) userEmailEl.textContent = user.email;
        }

        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        }

    } catch (error) {
        console.error('Failed to load sidebar:', error);
        document.getElementById('admin-sidebar-container').innerHTML = '<p>Error loading sidebar.</p>';
    }
}

function setupRouting() {
    router();
    window.addEventListener('hashchange', router);
}

document.addEventListener('DOMContentLoaded', () => {
    loadSidebar();
    setupRouting();
});