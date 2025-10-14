import authService from '../auth/authService.js';
import store from '../store/store.js';
import { pageTransition } from '../utils/animations.js';

// Page Component
import HomePage from        '../pages/HomePage.js';
import AuthPage from        '../pages/AuthPage.js';
import DashboardPage from   '../pages/DashboardPage.js';
import KanbanPage from      '../pages/KanbanPage.js';
import MyTaskPage from     '../pages/MyTaskPage.js';
import MyCalendarPage from  '../pages/MyCalendarPage.js';
import NotificationPage from '../pages/NotificationPage.js';
import SettingPage from     '../pages/SettingPage.js';
import ArchivePage from     '../pages/ArchivePage.js';
import TrashPage from       '../pages/TrashPage.js';


const routes = {
    '/': { component: HomePage, requiresAuth: false},
    '/login': { component: AuthPage, requiresAuth: false},
    '/dashboard': { component: DashboardPage, requiresAuth: true}, 
    '/kanban-board': { component: KanbanPage, requiresAuth: true}, 
    '/my-tasks': { component: MyTaskPage, requiresAuth: true},
    '/my-calendar': { component: MyCalendarPage, requiresAuth: true},
    '/notification': { component: NotificationPage, requiresAuth: true},
    '/setting': { component: SettingPage, requiresAuth: true},
    '/archive': { component: ArchivePage, requiresAuth: true},
    '/trash': { component: TrashPage, requiresAuth: true},
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

        // Kiểm tra trạng thái xác thực khi chuyển trang
        try {
            await authService.checkAuthStatus();
        } catch (authError) {
            console.error('Lỗi khi kiểm tra trạng thái xác thực:', authError);
            // Xử lý lỗi xác thực - chuyển hướng về trang đăng nhập
            if (route.requiresAuth) {
                window.location.hash = '#/login';
                return;
            }
        }

        // LOGIC: Auth GUARD
        if (route.requiresAuth) {
            // Kiểm tra token tồn tại
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.warn('Không có token xác thực');
                window.location.hash = '#/login';
                return;
            }
            
            // Kiểm tra quyền truy cập
            if (!authService.checkAccess(route)) {
                console.warn('Không có quyền truy cập vào trang này');
                window.location.hash = '#/login';
                return;
            }
            
            // Kiểm tra token có hợp lệ không bằng cách sử dụng isAuthenticated
            if (!authService.isAuthenticated()) {
                console.warn('Token không hợp lệ hoặc đã hết hạn');
                localStorage.removeItem('authToken');
                window.location.hash = '#/login';
                return;
            }
        }

        if (request === '/login' && localStorage.getItem('authToken')) {
            // Kiểm tra token có hợp lệ không trước khi chuyển hướng
            if (authService.isAuthenticated()) {
                window.location.hash = '#/dashboard';
                return;
            } else {
                // Nếu token không hợp lệ, xóa token
                localStorage.removeItem('authToken');
            }
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
        
        // Kiểm tra component có phương thức render không
        if (!route.component || typeof route.component.render !== 'function') {
            console.error('Component không hợp lệ hoặc không có phương thức render');
            // Chuyển hướng về trang chính
            window.location.hash = '#/';
            return;
        }
        
        // Render nội dung mới
        let newContent;
        try {
            newContent = await route.component.render();
        } catch (renderError) {
            console.error('Lỗi khi render component:', renderError);
            // Xử lý lỗi render - hiển thị thông báo lỗi
            app.innerHTML = '<div class="error-container"><h2>Đã xảy ra lỗi</h2><p>Không thể tải nội dung trang. Vui lòng thử lại sau.</p></div>';
            return;
        }
        
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
        try {
            await pageTransition(oldContentDiv, newContentDiv, direction);
        } catch (animationError) {
            console.error('Lỗi khi thực hiện hiệu ứng chuyển trang:', animationError);
            // Nếu hiệu ứng lỗi, vẫn hiển thị nội dung mới
            app.innerHTML = newContent;
        }
        
        // Xóa phần tử cũ và giữ lại nội dung mới
        app.innerHTML = newContent;
        
        // Gọi after_render nếu có
        if (route.component.after_render) {
            try {
                await route.component.after_render();
            } catch (afterRenderError) {
                console.error('Lỗi khi thực hiện after_render:', afterRenderError);
            }
        }
        
        // Cập nhật route hiện tại
        currentRoute = request;
        
        // Cập nhật trạng thái route trong store
        store.dispatch({
            type: 'SET_CURRENT_ROUTE',
            payload: {
                path: request,
                title: document.title,
                timestamp: new Date().getTime()
            }
        });
        
        // Cuộn lên đầu trang
        window.scrollTo(0, 0);
    } catch (error) {
        console.error('Lỗi không xác định trong router:', error);
        // Xử lý lỗi chung - hiển thị thông báo lỗi
        const app = document.getElementById('app');
        if (app) {
            app.innerHTML = '<div class="error-container"><h2>Đã xảy ra lỗi</h2><p>Không thể tải nội dung trang. Vui lòng thử lại sau.</p></div>';
        }
    }
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

// Export để main.js có thể gọi
export { router };