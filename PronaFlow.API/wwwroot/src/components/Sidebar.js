import { isAuthenticated, logout } from '../auth/authService.js';
import { decodeToken } from '../utils/index.js';
import store from '../store/store.js';
import apiService from '../api/apiService.js';

const Sidebar = {
    render: async () => {
        if (!isAuthenticated()) {
            return '';
        }

        const user = store.getState().user;
        const userName = user?.fullName || 'Guest';
        const userEmail = user?.email || '';

        return `
      <nav id="sidebar" class="sidebar">
        <div class="resize-handle"></div>
        <div class="sidebar__nav-top">
            <a href="#/home" class="sidebar__web-info">
                <img src="./assets/images/logo-dark.svg" alt="PronaFlow" class="logo">
                <span class="web-name item-hide-collapsed">PronaFlow</span>
            </a>

            <button class="sidebar__user-profile" popovertarget="profile-menu" popovertargetaction="toggle" type="button">
                <div id="userAvt">
                    <img class="user__avt" src="./assets/images/avt-notion_1.png" alt="User Avatar">
                </div>
                <span class="user__name item-hide-collapsed" id="user-name">${userName}</span>
            </button>

            <div id="profile-menu" popover class="popover profile-menu" aria-labelledby="profile-menu-title">
                <div class="popover__header">
                    <h4 id="profile-menu-title" class="popover__title">Profile Menu</h4>
                    <button class="btn-exit" popovertarget="profile-menu" popovertargetaction="hide">
                        <i data-lucide="x"></i>
                    </button>
                </div>
                <div class="popover__body">
                    <div class="user-info popover-item">
                        <span id="user-name">${userName}</span>
                        <span id="user-email">${userEmail}</span>
                    </div>
                    <div class="divider"></div>
                    <ul class="popover-action-list">
                        <li>
                            <button type="button" class="popover-item">
                                <a href="#/setting" class="popover-item">
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
                </select>

                <ul class="sidebar__workspace-tools">
                    <li>
                        <a class="sidebar__nav-item" href="#/kanban-board"">
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

            <div id="mobile-tools-group" class="mobile-group no-scrollbar">
                <button class="mobile-group-toggle" type="button" aria-label="Toggle Tools Menu">
                    <i data-lucide="grid-2x2"></i>
                </button>
                <ul class="mobile-group__list">
                    <li><a class="sidebar__nav-item" href="#/kanban-board"><i class="nav-icon icon-lg" data-lucide="square-kanban"></i></a></li>
                    <li><a class="sidebar__nav-item" href="#/my-task"><i class="nav-icon icon-lg" data-lucide="list-todo"></i></a></li>
                    <li><a class="sidebar__nav-item" href="#/my-calendar"><i class="nav-icon icon-lg" data-lucide="calendar"></i></a></li>
                    <li><a class="sidebar__nav-item" href="#/trash"><i class="nav-icon icon-lg" data-lucide="trash-2"></i></a></li>
                    <li><a class="sidebar__nav-item" href="#/archive"><i class="nav-icon icon-lg" data-lucide="archive"></i></a></li>
                </ul>
            </div>
        </div>

        <div class="sidebar__nav-bot">
            <div class="divider"></div>
            <div class="nav-bot__inner">
                <a href="#/setting" title="Settings" class="sidebar-bot-btn icon-lg"><i data-lucide="settings"></i></a>
                <a href="#/notification" title="Notifications" class="sidebar-bot-btn icon-lg"><i data-lucide="bell"></i></a>
            </div>
        </div>
    </nav>
    `;
    },

    after_render: async () => {
        if (!isAuthenticated()) return;

        const signOutBtn = document.getElementById('sign-out-btn');
        if (signOutBtn) {
            signOutBtn.addEventListener('click', () => {
                logout();
                window.location.hash = '#/login';
            });
        }

        initializeSidebar(); // <-- Thay thế các hàm cũ bằng hàm khởi tạo mới
        setActiveSidebarLink();
        await loadWorkspaces();

        if (window.lucide) {
            lucide.createIcons();
        }
    }
};

export default Sidebar;

/**
 * Sets the 'active' class on the current sidebar navigation link
 * based on the window's URL hash.
 */
function setActiveSidebarLink() {
    const currentHash = window.location.hash || '#/dashboard';
    document.querySelectorAll('#sidebar .sidebar__nav-item').forEach(link => {
        const linkHash = link.getAttribute('href');
        if (linkHash === currentHash) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * A helper function to render the sidebar into a specified container element
 * and then execute its after_render logic.
 */
export async function loadSidebarAndSetActiveLink() {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
        sidebarContainer.innerHTML = await Sidebar.render();
        await Sidebar.after_render();
    }
}

/**
 * Fetches workspaces from the API and populates the workspace selector dropdown.
 */
async function loadWorkspaces() {
    const workspaceSelector = document.getElementById('workspace-selector');
    if (!workspaceSelector) return;

    try {
        const workspaces = await apiService.workspaces.getAll();
        workspaceSelector.innerHTML = '<option value="" disabled>Choose Workspace</option>';
        if (workspaces && workspaces.length > 0) {
            workspaces.forEach(ws => {
                workspaceSelector.innerHTML += `<option value="${ws.id}">${ws.name}</option>`;
            });

            workspaceSelector.addEventListener('change', () => {
                const selectedWorkspaceId = workspaceSelector.value;
                console.log(`Workspace changed to: ${selectedWorkspaceId}`);
                // Thêm logic để dispatch action tới store hoặc xử lý sự kiện tại đây
            });

            workspaceSelector.selectedIndex = 1;
            workspaceSelector.dispatchEvent(new Event('change'));
        } else {
            workspaceSelector.innerHTML = '<option value="" disabled selected>No workspaces found</option>';
        }
    } catch (error) {
        console.error('Failed to load workspaces:', error);
        workspaceSelector.innerHTML = '<option>Error loading</option>';
    }
}

/**
 * @constant {object} BREAKPOINTS
 * Defines the viewport width thresholds for different device types.
 * This makes the responsive logic easier to read and maintain.
 */
const BREAKPOINTS = {
    TABLET: 768,
    DESKTOP: 1024,
};

/**
 * Determines the sidebar's state (collapsed or expanded) based on the current screen width
 * and the user's previously saved preference in localStorage.
 * This is the core logic for responsive sidebar behavior.
 */
function handleSidebarState() {
    const screenWidth = window.innerWidth;
    const savedState = localStorage.getItem('sidebarCollapsed');

    const defaultStateForViewport = {
        isMobile: false,
        isTablet: true,
        isDesktop: false,
    };

    let shouldBeCollapsed;

    if (screenWidth < BREAKPOINTS.TABLET) {
        shouldBeCollapsed = defaultStateForViewport.isMobile;
    } else if (screenWidth < BREAKPOINTS.DESKTOP) {
        shouldBeCollapsed = savedState !== null ? (savedState === 'true') : defaultStateForViewport.isTablet;
    } else {
        shouldBeCollapsed = savedState !== null ? (savedState === 'true') : defaultStateForViewport.isDesktop;
    }

    applySidebarState(shouldBeCollapsed);
}

/**
 * Cập nhật giao diện của sidebar dựa trên trạng thái được quyết định.
 * @param {boolean} isCollapsed - True nếu sidebar nên được đóng.
 */
function applySidebarState(isCollapsed) {
    const sidebar = document.getElementById('sidebar');
    const root = document.documentElement;
    if (!sidebar) return;

    if (isCollapsed) {
        sidebar.classList.add('collapsed');
        root.style.setProperty('--sidebar-width', 'var(--sidebar-width-collapsed)');
    } else {
        sidebar.classList.remove('collapsed');
        const lastWidth = localStorage.getItem('sidebarWidth') || '240px';
        root.style.setProperty('--sidebar-width', lastWidth);
    }
}

/**
 * Initializes the resize functionality for the sidebar.
 * It attaches mousedown, mousemove, and mouseup event listeners to a resize handle.
 * @param {HTMLElement} sidebar - The sidebar element.
 * @param {HTMLElement} root - The root element (html) for setting CSS variables.
 * @param {number} minWidth - The minimum width the sidebar can be resized to.
 * @param {number} maxWidth - The maximum width the sidebar can be resized to.
 * @param {Function} onResizeEnd - A callback function to execute when resizing is finished.
 */
function initResize(sidebar, root, minWidth, maxWidth, onResizeEnd) {
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

/**
 * Saves the current state of the sidebar (collapsed status and width) to localStorage.
 * @param {HTMLElement} sidebar - The sidebar element.
 * @param {HTMLElement} root - The root element to get the current width from.
 */
function saveSidebarState(sidebar, root) {
    const isCollapsed = sidebar.classList.contains('collapsed');
    localStorage.setItem('sidebarCollapsed', isCollapsed);
    if (!isCollapsed) {
        const currentWidth = root.style.getPropertyValue('--sidebar-width');
        localStorage.setItem('sidebarWidth', currentWidth);
    }
}

/**
 * Loads and applies the saved sidebar state from localStorage when the application starts.
 * @param {HTMLElement} sidebar - The sidebar element.
 * @param {HTMLElement} root - The root element.
 */
function loadSidebarState(sidebar, root) {
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
 * Handles the user's click action to toggle the sidebar's collapsed state.
 * NOTE: This action is only effective on screens wider than the mobile breakpoint.
 * @param {HTMLElement} sidebar - The sidebar element.
 * @param {HTMLElement} root - The root element.
 */
function toggleSidebarAction(sidebar, root) {
    if (window.innerWidth >= BREAKPOINTS.TABLET) {
        sidebar.classList.toggle('collapsed');
        saveSidebarState(sidebar, root);
        applySidebarState(sidebar.classList.contains('collapsed'));
    }
}

/**
 * The main initialization function for all sidebar-related functionalities.
 * It sets up the initial state, event listeners for toggling, resizing, and responsive adjustments.
 */
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const toggleBtn = document.getElementById('sidebar-toggle-button');
    const root = document.documentElement;
    const MIN_WIDTH = 180;
    const MAX_WIDTH = 500;

    loadSidebarState(sidebar, root);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebarAction(sidebar, root);
        });
    }

    initResize(sidebar, root, MIN_WIDTH, MAX_WIDTH, () => {
        saveSidebarState(sidebar, root);
    });

    const mobileToolsGroup = document.getElementById('mobile-tools-group');
    if (mobileToolsGroup) {
        const toggleButton = mobileToolsGroup.querySelector('.mobile-group-toggle');
        toggleButton.addEventListener('click', function (event) {
            event.stopPropagation();
            mobileToolsGroup.classList.toggle('is-open');
        });
    }

    document.addEventListener('click', function () {
        if (mobileToolsGroup && mobileToolsGroup.classList.contains('is-open')) {
            mobileToolsGroup.classList.remove('is-open');
        }
    });

    window.addEventListener('resize', handleSidebarState);
    handleSidebarState(); // Gọi lần đầu để thiết lập trạng thái ban đầu
}
