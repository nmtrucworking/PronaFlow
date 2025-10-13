import { router } from './route/router.js';
import { initializeStore } from './store/store.js';
import { initPerformanceOptimizations } from './utils/performance.js';

// Khởi tạo store trước khi render ứng dụng
initializeStore();

// Khởi tạo router và các tối ưu hóa
document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo các tối ưu hóa hiệu suất
    initPerformanceOptimizations();
    
    // Khởi tạo router
    router();
    
    // Khởi tạo các icon từ Lucide
    lucide.createIcons();
});