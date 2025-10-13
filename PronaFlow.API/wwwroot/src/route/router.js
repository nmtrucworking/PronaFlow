import { isAuthenticated } from '../auth/authService.js';

// Page Component
import HomePage from '../pages/HomePage.js';
import AuthPage from '../pages/AuthPage.js';
import DashboardPage from '../pages/DashboardPage.js';
import MyTasksPage from '../pages/MyTaskPage.js';
import MyCalendarPage from '../pages/MyCalendarPage.js';
import NotificationPage from '../pages/NotificationPage.js';
import SettingPage from '../pages/SettingPage.js';
import ArchivePage from '../pages/ArchivePage.js';
import TrasgPage from '../pages/TrashPage.js';


const routes = {
    '/': { component: HomePage, requiresAuth: false},
    '/login': { component: AuthPage, requiresAuth: false},
    '/dashboard': { component: DashboardPage, requiresAuth: true}, 
    '/my-tasks': { component: MyTasksPage, requiresAuth: true},
    '/my-calendar': { component: MyCalendarPage, requiresAuth: true},
    '/notification': { component: NotificationPage, requiresAuth: true},
    '/setting': { component: SettingPage, requiresAuth: true},
    '/archive': { component: ArchivePage, requiresAuth: true},
    '/trash': { component: TrasgPage, requiresAuth: true},
};

const router = async () => {
    const app = document.getElementById('app');
    if (!app) return;

    const request = window.location.hash.slice(1).toLowerCase() || '/';
    const page = routes[request] || routes['/'];


    // LOGIC: Auth GUARD
    if (router.requiresAuth && !isAuthenticated()){
        window.location.hash = '#/login';
        return;
    }

    if (request === '/login' && isAuthenticated()) {
        window.location.hash = '#/dashboard';
        return;
    }

    app.innerHTML = await route.component.render();
    await route.component.after_render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

// Export để main.js có thể gọi
export { router };