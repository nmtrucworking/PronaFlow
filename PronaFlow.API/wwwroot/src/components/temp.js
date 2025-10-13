/**
 * Tải sidebar, chèn vào trang, và khởi tạo các chức năng liên quan.
 */
export function loadSidebarAndSetActiveLink() {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (!sidebarContainer) return;

    fetch('../../../pages/sidebar.html')
        .then(response => response.ok ? response.text() : Promise.reject('Could not load sidebar.html'))
        .then(html => {
            sidebarContainer.innerHTML = html;
            setActiveSidebarLink();
            initializeSidebar();
            lucide.createIcons();
        })
        .catch(error => console.error('Error loading sidebar:', error));
}

export function setActiveSidebarLink() {
    const currentPagePath = window.location.pathname;
    document.querySelectorAll('#sidebar .sidebar__nav-item').forEach(link => {
        // Sử dụng getAttribute('href') để lấy đường dẫn tương đối chính xác
        const linkPath = link.getAttribute('href');
        // Lấy tên file từ đường dẫn trang hiện tại
        const currentPageFile = currentPagePath.substring(currentPagePath.lastIndexOf('/') + 1);

        if (linkPath.includes(currentPageFile)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Hàm này QUYẾT ĐỊNH trạng thái của sidebar (đóng hay mở)
 * dựa trên kích thước màn hình hiện tại và lựa chọn đã lưu của người dùng.
 * Đây là phần logic cốt lõi.
 */

// Định nghĩa các điểm breakpoint để dễ dàng thay đổi và đọc code hơn
const BREAKPOINTS = {
    TABLET: 768,
    DESKTOP: 1024,
};

export function handleSidebarState() {
    const screenWidth = window.innerWidth;
    const savedState = localStorage.getItem('sidebarCollapsed');

    // Định nghĩa trạng thái MẶC ĐỊNH cho từng loại màn hình
    // Đây là trạng thái sẽ được áp dụng nếu người dùng chưa từng thay đổi
    const defaultStateForViewport = {
        isMobile: false,  // Trên mobile, sidebar là top-bar, không có trạng thái 'collapsed'
        isTablet: true,   // Trên tablet, sidebar mặc định là ĐÓNG
        isDesktop: false, // Trên desktop, sidebar mặc định là MỞ
    };

    let shouldBeCollapsed;

    // --- Phân chia trường hợp chặt chẽ ---
    if (screenWidth < BREAKPOINTS.TABLET) {
        // 1. TRƯỜNG HỢP MOBILE (< 768px)
        // Bỏ qua mọi trạng thái đã lưu và luôn đảm bảo sidebar không có class 'collapsed'
        shouldBeCollapsed = defaultStateForViewport.isMobile;

    } else if (screenWidth < BREAKPOINTS.DESKTOP) {
        // 2. TRƯỜNG HỢP TABLET (768px <= width < 1024px)
        // Ưu tiên trạng thái người dùng đã lưu. Nếu không có, dùng trạng thái mặc định của tablet.
        shouldBeCollapsed = savedState !== null 
            ? (savedState === 'true') 
            : defaultStateForViewport.isTablet;

    } else {
        // 3. TRƯỜNG HỢP DESKTOP (>= 1024px)
        // Ưu tiên trạng thái người dùng đã lưu. Nếu không có, dùng trạng thái mặc định của desktop.
        shouldBeCollapsed = savedState !== null 
            ? (savedState === 'true') 
            : defaultStateForViewport.isDesktop;
    }

    // Sau khi đã quyết định, gọi hàm để áp dụng thay đổi lên giao diện
    applySidebarState(shouldBeCollapsed);
}

export function initResize(sidebar, root, minWidth, maxWidth, onResizeEnd) {
    const resizeHandle = document.querySelector('.resize-handle');
    if (!resizeHandle) return;

    let isResizing = false;

    resizeHandle.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        isResizing = true;
        document.body.classList.add('is-resizing');
        const startX = e.clientX;
        const startWidth = sidebar.offsetWidth;

        const handleMouseMove = (e) => {
            if (!isResizing) return;
            let newWidth = startX > e.clientX ? startWidth - (startX - e.clientX) : startWidth + (e.clientX - startX);
            if (newWidth < minWidth) newWidth = minWidth;
            if (newWidth > maxWidth) newWidth = maxWidth;
            root.style.setProperty('--sidebar-width', `${newWidth}px`);
        };

        const handleMouseUp = () => {
            if (!isResizing) return;
            isResizing = false;
            document.body.classList.remove('is-resizing');
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            if (typeof onResizeEnd === 'function') onResizeEnd();
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    });
}

export function saveSidebarState(sidebar, root) {
    const isCollapsed = sidebar.classList.contains('collapsed');
    localStorage.setItem('sidebarCollapsed', isCollapsed);
    if (!isCollapsed) {
        const currentWidth = root.style.getPropertyValue('--sidebar-width');
        localStorage.setItem('sidebarWidth', currentWidth);
    }
}

export function loadSidebarState(sidebar, root) {
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isCollapsed) {
        sidebar.classList.add('collapsed');
        root.style.setProperty('--sidebar-width', 'var(--sidebar-width-collapsed)');
    } else {
        sidebar.classList.remove('collapsed');
        const savedWidth = localStorage.getItem('sidebarWidth') || '240px';
        root.style.setProperty('--sidebar-width', savedWidth);
    }
}

/**
 * Hàm này CẬP NHẬT GIAO DIỆN của sidebar dựa trên trạng thái (đóng/mở).
 * Nó chịu trách nhiệm duy nhất cho việc thay đổi DOM.
 * @param {boolean} isCollapsed - Trạng thái mong muốn: true là đóng, false là mở.
 */
export function applySidebarState(isCollapsed) {
    const sidebar = document.getElementById('sidebar');
    const root = document.documentElement;
    if (!sidebar) return;

    if (isCollapsed) {
        sidebar.classList.add('collapsed');
        root.style.setProperty('--sidebar-width', 'var(--sidebar-width-collapsed)');
    } else {
        sidebar.classList.remove('collapsed');
        // SỬA LỖI: Lấy lại chiều rộng đã lưu hoặc chiều rộng mặc định khi mở rộng
        const lastWidth = localStorage.getItem('sidebarWidth') || '240px';
        root.style.setProperty('--sidebar-width', lastWidth);
    }
}

/* =====================================================================================
 * ====================  FUNCTION for Sidebar: toggle and resizing  ====================
 * ===================================================================================== */
export function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const toggleBtn = document.getElementById('sidebar-toggle-button');
    const root = document.documentElement;
    const MIN_WIDTH = 180;
    const MAX_WIDTH = 500;

    loadSidebarState(sidebar, root);

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSidebarAction(sidebar, root);
        saveSidebarState(sidebar, root);
    });

    initResize(sidebar, root, MIN_WIDTH, MAX_WIDTH, () => {
        saveSidebarState(sidebar, root);
    });

    const mobileToolsGroup = document.getElementById('mobile-tools-group');
    const toggleButton = mobileToolsGroup.querySelector('.mobile-group-toggle');

    toggleButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent click from bubbling up
        mobileToolsGroup.classList.toggle('is-open');
    });

    // Optional: Close the menu if you click anywhere else on the page
    document.addEventListener('click', function () {
        if (mobileToolsGroup.classList.contains('is-open')) {
            mobileToolsGroup.classList.remove('is-open');
        }
    });
}

/**
 * Hàm này xử lý việc đóng/mở sidebar KHI NGƯỜI DÙNG CLICK.
 * Nó chỉ hoạt động trên màn hình từ tablet (>= 768px) trở lên.
 */
export function toggleSidebarAction(sidebar, root) {
    // 1. Chỉ thực hiện hành động nếu màn hình lớn hơn hoặc bằng 768px
    if (window.innerWidth >= 768) {
        sidebar.classList.toggle('collapsed');
        const isCollapsed = sidebar.classList.contains('collapsed');
        
        // Lưu trạng thái vào localStorage để ghi nhớ lựa chọn của người dùng
        localStorage.setItem('sidebarCollapsed', isCollapsed);

        // Cập nhật biến CSS để thay đổi chiều rộng
        if (isCollapsed) {
            root.style.setProperty('--sidebar-width', 'var(--sidebar-width-collapsed)');
        } else {
            // Khi mở rộng, lấy lại chiều rộng đã lưu hoặc dùng giá trị mặc định
            const lastWidth = localStorage.getItem('sidebarWidth') || '240px';
            root.style.setProperty('--sidebar-width', lastWidth);
        }
    }
    // Trên màn hình mobile (< 768px), hàm này sẽ không làm gì cả.
}