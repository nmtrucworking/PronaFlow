import authService from '../auth/authService.js';
import store from '../store/store.js';
import { pageTransition } from '../utils/animations.js';

// Page Component
import HomePage from '../pages/HomePage.js';
import AuthPage from '../pages/AuthPage.js';
import DashboardPage from '../pages/DashboardPage.js';
import KanbanPage from '../pages/KanbanPage.js';
import MyTaskPage from '../pages/MyTaskPage.js';
import MyCalendarPage from '../pages/MyCalendarPage.js';
import NotificationPage from '../pages/NotificationPage.js';
import SettingPage from '../pages/SettingPage.js';
import ArchivePage from '../pages/ArchivePage.js';
import TrashPage from '../pages/TrashPage.js';


const routes = {
    '/': { component: HomePage, requiresAuth: false },
    '/login': { component: AuthPage, requiresAuth: false },
    '/dashboard': { component: DashboardPage, requiresAuth: true },
    '/kanban-board': { component: KanbanPage, requiresAuth: true },
    '/my-task': { component: MyTaskPage, requiresAuth: true },
    '/my-calendar': { component: MyCalendarPage, requiresAuth: true },
    '/notification': { component: NotificationPage, requiresAuth: true },
    '/setting': { component: SettingPage, requiresAuth: true },
    '/archive': { component: ArchivePage, requiresAuth: true },
    '/trash': { component: TrashPage, requiresAuth: true },
};

// Lưu trữ route hiện tại để xác định hướng chuyển trang
let currentRoute = window.location.hash.slice(1).toLowerCase() || '/';

const router = async () => {
    try {
        const app = document.getElementById('app');
        if (!app) {
            console.error('Không tìm thấy phần tử app');
            return;
        }

        await authService.checkAuthStatus();
        const isAuthenticated = !!store.getState().user;

        const request = window.location.hash.slice(1).toLowerCase() || '/';
        // Cải thiện xử lý cho trường hợp route không tồn tại
        const route = routes[request];
        if (!route) {
            console.warn(`Route không tồn tại: ${request}, chuyển hướng về trang chính`);
            // Hiển thị thông báo lỗi 404
            app.innerHTML = `
                <div class="error-container">
                    <h2>Lỗi 404 - Không tìm thấy trang</h2>
                    <p>Trang bạn đang tìm kiếm không tồn tại.</p>
                    <a href="#/" class="btn btn-primary">Quay về trang chủ</a>
                </div>
            `;
            return;
        }

        // 2. Logic Auth Guard: Dựa hoàn toàn vào trạng thái từ store đã được cập nhật
        if (route.requiresAuth && !isAuthenticated) {
            console.warn('Yêu cầu đăng nhập. Chuyển hướng về trang login.');
            window.location.hash = '#/login';
            return;
        }

        // 3. Logic chuyển hướng người dùng đã đăng nhập ra khỏi trang login
        if (request === '/login' && isAuthenticated) {
            window.location.hash = '#/dashboard';
            return;
        }

        if (!route.component || typeof route.component.render !== 'function') {
            console.error('Component không hợp lệ hoặc không có phương thức render');
            window.location.hash = '#/';
            return;
        }

        const newContent = await route.component.render();

        // (Phần logic hiệu ứng chuyển trang giữ nguyên)
        app.innerHTML = newContent;

        if (route.component.after_render) {
            await route.component.after_render();
        }

        currentRoute = request;

        store.dispatch({
            type: 'SET_CURRENT_ROUTE',
            payload: {
                path: request,
                title: document.title,
                timestamp: new Date().getTime()
            }
        });

        window.scrollTo(0, 0);
    } catch (error) {
        console.error('Lỗi không xác định trong router:', error);
        const app = document.getElementById('app');
        if (app) {
            app.innerHTML = '<div class="error-container"><h2>Đã xảy ra lỗi</h2><p>Không thể tải nội dung trang. Vui lòng thử lại sau.</p></div>';
        }
    }
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

export { router };