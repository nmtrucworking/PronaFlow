import authService from '../auth/authService.js';
import store from '../store/store.js';
import { pageTransition } from '../utils/animations.js';

// Page Component
import HomePage from '../pages/HomePage.js';
import AuthPage from '../pages/AuthPage.js';
import DashboardPage from '../pages/DashboardPage.js';
import KanbanPage from '../pages/KanbanPage';
import MyTasksPage from '../pages/MyTaskPage.js';
import MyCalendarPage from '../pages/MyCalendarPage.js';
import NotificationPage from '../pages/NotificationPage.js';
import SettingPage from '../pages/SettingPage.js';
import ArchivePage from '../pages/ArchivePage.js';
import TrashPage from '../pages/TrashPage.js';


const routes = {
    '/': { component: HomePage, requiresAuth: false},
    '/login': { component: AuthPage, requiresAuth: false},
    '/dashboard': { component: DashboardPage, requiresAuth: true}, 
    '/kanban-board': { component: KanbanPage, requiresAuth: true}, 
    '/my-tasks': { component: MyTasksPage, requiresAuth: true},
    '/my-calendar': { component: MyCalendarPage, requiresAuth: true},
    '/notification': { component: NotificationPage, requiresAuth: true},
    '/setting': { component: SettingPage, requiresAuth: true},
    '/archive': { component: ArchivePage, requiresAuth: true},
    '/trash': { component: TrashPage, requiresAuth: true},
};

// Lưu trữ route hiện tại để xác định hướng chuyển trang
let currentRoute = window.location.hash.slice(1).toLowerCase() || '/';

const router = async () => {
    const app = document.getElementById('app');
    if (!app) return;

    const request = window.location.hash.slice(1).toLowerCase() || '/';
    const route = routes[request] || routes['/'];

    // Kiểm tra trạng thái xác thực khi chuyển trang
    await authService.checkAuthStatus();

    // LOGIC: Auth GUARD
    if (route.requiresAuth && !authService.checkAccess(route)){
        window.location.hash = '#/login';
        return;
    }

    if (request === '/login' && localStorage.getItem('authToken')) {
        window.location.hash = '#/dashboard';
        return;
    }

    // Xác định hướng chuyển trang
    const routesList = Object.keys(routes);
    const currentIndex = routesList.indexOf(currentRoute);
    const newIndex = routesList.indexOf(request);
    const direction = newIndex > currentIndex ? 'right' : 'left';
    
    // Lưu nội dung hiện tại
    const oldContent = app.innerHTML;
    const oldContentWrapper = document.createElement('div');
    oldContentWrapper.innerHTML = oldContent;
    
    // Render nội dung mới
    const newContent = await route.component.render();
    
    // Thêm hiệu ứng chuyển trang
    app.innerHTML = '';
    
    const oldContentDiv = document.createElement('div');
    oldContentDiv.className = 'page-content old-content';
    oldContentDiv.innerHTML = oldContent;
    app.appendChild(oldContentDiv);
    
    const newContentDiv = document.createElement('div');
    newContentDiv.className = 'page-content new-content';
    newContentDiv.style.display = 'none';
    newContentDiv.innerHTML = newContent;
    app.appendChild(newContentDiv);
    
    // Thực hiện hiệu ứng chuyển trang
    await pageTransition(oldContentDiv, newContentDiv, direction);
    
    // Xóa phần tử cũ và giữ lại nội dung mới
    app.innerHTML = newContent;
    
    // Gọi after_render nếu có
    if (route.component.after_render) {
        await route.component.after_render();
    }
    
    // Cập nhật route hiện tại
    currentRoute = request;
    
    // Cuộn lên đầu trang
    window.scrollTo(0, 0);
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

// Export để main.js có thể gọi
export { router };