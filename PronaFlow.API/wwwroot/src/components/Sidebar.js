// File: wwwroot/src/components/Sidebar.js

import { isAuthenticated, logout } from '../auth/authService.js';
import { decodeToken } from '../utils/index.js';
import store from '../store/store.js';

const Sidebar = {

  render: async () => {
    // KIỂM TRA: Chỉ render sidebar nếu người dùng đã đăng nhập
    if (!isAuthenticated()) {
      return ''; // return empty if unauthenticated
    }

    // Get user informations from token displayed
    const token = localStorage.getItem('authToken');
    const userData = decodeToken(token); // HELPER: decode token

    // tag <a> using hash-based routing (href="#/...")
    return `
      <nav id="sidebar" class="sidebar">
        <div class="sidebar__nav-top">
            <a href="#/home" class="sidebar__web-info">
                <img src=".#/assets/images/logo-dark.svg" alt="PronaFlow" class="logo">
                <span class="web-name item-hide-collapsed">PronaFlow</span>
            </a>

            <button class="sidebar__user-profile" popovertarget="profile-menu" popovertargetaction="toggle"
                type="button">
                <div id="userAvt">
                    <img class="user__avt" src=".#/assets/images/avt-notion_1.png" alt="User Avatar">
                </div>
                <span class="user__name item-hide-collapsed" id="user-name">${userData?.name}</span>
            </button>

            <!-- Popover for user profile -->
            <div id="profile-menu" popover class="popover profile-menu" aria-labelledby="profile-menu-title">
                <div class="popover__header">
                    <h4 id="profile-menu-title" class="popover__title">Profile Menu</h4>
                    <button class="btn-exit" popovertarget="profile-menu" popovertargetaction="hide">
                        <i data-lucide="x"></i>
                    </button>
                </div>
                <div class="popover__body">
                    <div class="user-info popover-item">
                        <span id="user-name">${userData?.name || 'Guest'}</span>
                        <span id="user-email">${userData?.email || ''}</span>
                    </div>
                    <div class="divider"></div>
                    <ul class="popover-action-list">
                        <li>
                            <button type="button" class="popover-item">
                                <a href="#/settings" class="popover-item">
                                    <i data-lucide="settings-2" class="icon-md"></i>
                                    <span>Manage Account</span>
                                </a>
                            </button>
                        </li>
                        <li>
                            <button id="sign-out-btn" type="button" class="popover-item btn-danger">
                                <i data-lucide="log-out" class="icon-md"></i>
                                <span>Sign out</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- NAV-mid -->
        <div class="sidebar__nav-mid">
            <div class="nav-group sidebar-dashboard">
                <a class="sidebar__nav-item" href="#/dashboard">
                    <i class="nav-icon icon-lg" data-lucide="tv-minimal"></i>
                    <span class="item-hide-collapsed">Dashboard</span>
                </a>
            </div>

            <div class="nav-group group-1">
                <select name="" id="workspace-selector" class="sidebar__workspace-selector">
                    <option value="" disabled selected hidden>Choose Workspace</option>
                    <option value="ws001">PronaFlow Team</option>
                    <option value="ws002">Dự án Cá nhân</option>
                </select>

                <ul class="sidebar__workspace-tools">
                    <li>
                        <a class="sidebar__nav-item" href="#/kanban-board">
                            <i class="nav-icon icon-lg" data-lucide="square-kanban"></i>
                            <span class="item-hide-collapsed">Kanban Board</span>
                        </a>
                    </li>
                    <li>
                        <a class="sidebar__nav-item" href="#/my-task">
                            <i class="nav-icon icon-lg" data-lucide="list-todo"></i>
                            <span class="item-hide-collapsed">My Tasks</span>
                        </a>
                    </li>
                    <li>
                        <a class="sidebar__nav-item" href="#/my-calendar">
                            <i class="nav-icon icon-lg" data-lucide="calendar"></i>
                            <span class="item-hide-collapsed">My Calendar</span>
                        </a>
                    </li>
                </ul>
            </div>


            <ul class="nav-group group-2">
                <li>
                    <a class="sidebar__nav-item" href="#/trash">
                        <i class="nav-icon icon-lg" data-lucide="trash-2"></i>
                        <span class="item-hide-collapsed">Trash</span>
                    </a>
                </li>
                <li>
                    <a class="sidebar__nav-item" href="#/archive">
                        <i class="nav-icon icon-lg" data-lucide="archive"></i>
                        <span class="item-hide-collapsed">Archive</span>
                    </a>
                </li>
            </ul>

            <!-- START OF MODIFICATION -->
            <div id="mobile-tools-group" class="mobile-group no-scrollbar">
                <!-- This button is the new icon that users will tap -->
                <button class="mobile-group-toggle" type="button" aria-label="Toggle Tools Menu">
                    <i data-lucide="grid-2x2"></i>
                </button>
                <!-- The list that will fly out -->
                <ul class="mobile-group__list">
                    <!-- Move the original list items inside here -->
                    <li>
                        <a class="sidebar__nav-item" href="#/kanban-board">
                            <i class="nav-icon icon-lg" data-lucide="square-kanban"></i>
                        </a>
                    </li>
                    <li>
                        <a class="sidebar__nav-item" href="#/my-task">
                            <i class="nav-icon icon-lg" data-lucide="list-todo"></i>
                        </a>
                    </li>
                    <li>
                        <a class="sidebar__nav-item" href="#/my-calendar">
                            <i class="nav-icon icon-lg" data-lucide="calendar"></i>
                        </a>
                    </li>
                    <li>
                        <a class="sidebar__nav-item" href="#/trash">
                            <i class="nav-icon icon-lg" data-lucide="trash-2"></i>
                        </a>
                    </li>
                    <li>
                        <a class="sidebar__nav-item" href="#/archive">
                            <i class="nav-icon icon-lg" data-lucide="archive"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- NAV-bot -->
        <div class="sidebar__nav-bot">
            <!-- divider -->
            <div class="divider"></div>
            <!-- inner content -->
            <div class="nav-bot__inner">
                <a href="#/settings" title="Settings" class="sidebar-bot-btn icon-lg">
                    <i data-lucide="settings"></i>
                </a>
                <a href="#/notifications" title="Notifications" class="sidebar-bot-btn icon-lg">
                    <i data-lucide="bell"></i>
                </a>
            </div>
        </div>
    </nav>
    `;
  },
  
  
  after_render: async () => {
    if (!isAuthenticated()) return;

    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    // Gán sự kiện cho nút đăng xuất
    const signOutBtn = document.getElementById('sign-out-btn');
    if (signOutBtn) {
      signOutBtn.addEventListener('click', () => {
        logout();
        window.location.hash = '#/login';
      });
    }
    
    // Đánh dấu link active
    setActiveSidebarLink();
    
    // Khởi tạo các chức năng đóng/mở, responsive
    initializeSidebarEventListeners();

    // Khởi tạo lại các icon
    if (window.lucide) {
      lucide.createIcons();
    }
    
    // Cập nhật trạng thái sidebar từ store
    const sidebarState = store.getState().ui.sidebarCollapsed;
    if (sidebarState !== undefined) {
      sidebar.classList.toggle('collapsed', sidebarState);
    }
  }
};

export default Sidebar;


// =====================================================================================
// CÁC HÀM HELPER (PRIVATE) CHO SIDEBAR
// Toàn bộ logic từ file sidebar.js cũ được chuyển vào đây và không cần export.
// =====================================================================================

function setActiveSidebarLink() {
    // Sửa lại để hoạt động với hash
    const currentHash = window.location.hash || '#/dashboard';
    document.querySelectorAll('#sidebar .sidebar__nav-item').forEach(link => {
        const linkHash = link.getAttribute('href');
        
        // So sánh hash thay vì pathname
        if (linkHash === currentHash) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initializeSidebarEventListeners() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle-button');
    if (!sidebar || !toggleBtn) return;
    
    // Logic đóng/mở khi click nút toggle
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('collapsed');
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    });
    
    // Logic responsive khi thay đổi kích thước cửa sổ
    window.addEventListener('resize', handleSidebarState);

    // Áp dụng trạng thái ban đầu khi tải
    handleSidebarState();
}

function handleSidebarState() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const isDesktop = window.innerWidth >= 1024;
    const savedState = localStorage.getItem('sidebarCollapsed');
    
    // Trên desktop, ưu tiên lựa chọn đã lưu. Nếu không có, mặc định là mở.
    // Trên mobile/tablet, sidebar luôn ở trạng thái "collapsed" (chỉ hiện icon).
    const shouldBeCollapsed = isDesktop ? (savedState === 'true') : true;

    sidebar.classList.toggle('collapsed', shouldBeCollapsed);
}