/**
 * Tải các thành phần HTML (components) vào trang chính.
 * @param {string} componentPath - Đường dẫn đến tệp HTML của component.
 * @param {string} targetElementId - ID của phần tử HTML sẽ chứa component.
 */
async function loadComponent(componentPath, targetElementId) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Không thể tải component: ${componentPath}`);
        }
        const componentHtml = await response.text();
        const targetElement = document.getElementById(targetElementId);
        if (targetElement) {
            targetElement.innerHTML = componentHtml;
        } else {
            console.error(`Không tìm thấy phần tử với ID: ${targetElementId}`);
        }
    } catch (error) {
        console.error('Lỗi khi tải component:', error);
    }
}

/**
 * Khởi tạo ứng dụng admin.
 */
function initializeAdminApp() {
    // Tải sidebar vào vị trí được chỉ định trong index.html
    loadComponent('/admin/components/admin-sidebar.html', 'admin-sidebar-container');

    // Kích hoạt router để quản lý việc điều hướng và hiển thị các trang
    // (Giả sử bạn có một hàm initRouter trong admin-router.js)
    if (window.adminRouter && typeof window.adminRouter.router === 'function') {
        window.adminRouter.router();
    } else {
        console.error('Admin router chưa được định nghĩa hoặc không có hàm init.');
    }

    // Thêm các logic khởi tạo chung khác tại đây (nếu cần)
    console.log("Ứng dụng Admin đã được khởi tạo.");
}

// Chạy hàm khởi tạo sau khi toàn bộ DOM đã được tải
document.addEventListener('DOMContentLoaded', initializeAdminApp);