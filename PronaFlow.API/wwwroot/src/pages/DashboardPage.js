import AuthPage from './AuthPage.js'; // include extension if needed
import { loadSidebarAndSetActiveLink } from '../components/Sidebar.js';
import { isAuthenticated } from '../auth/authService.js';

const DashboardPage = {
    render: async () => {
        // Check Authorizator
        if (!isAuthenticated()) {
        window.location.hash = '#/login'; 
        return ''; 
    }

        return `<div id="sidebar-container"></div>

    <main id="main" class="main dashboard no-scrollbar">
        <!-- top-main -->
        <div id="greeting-widget-frame" class="greeting-widget">
            <img src="../assets/images/hello.gif" alt="">
            <span id="greeting-widget">
                <!-- Js fill: renderGreetingWidget() -->
            </span>
        </div>

        <div class="divider"></div>

        <div class="widget-group">
            <div class="widget">
                <h3 class="widget__title">Overview</h3>
                <div class="widget__content widget__content--overview">
                    <div class="inner-widget-content">
                        You're managing <span id="total-projects">#</span> projects in total
                    </div>
                </div>
            </div>
            <div class="widget">
                <h3 class="widget__title">Task in progress</h3>
                <div class="widget__content widget__content--inprogress">
                    <div class="inner-widget-content">
                        You're working on <span id="total-tasks-inprogress">#</span> tasks right now
                    </div>
                </div>
            </div>
            <div class="widget">
                <h3 class="widget__title">Task Overdue</h3>
                <div class="widget__content widget__content--overdue">
                    <div class="inner-widget-content">
                        You have <span id="total-tasks-overdue">#</span> overdue tasks to catch up on
                    </div>
                </div>
            </div>
        </div>

        <div class="divider"></div>

        <!-- Some Task -->
        <div class="frames">
            <div class="frame frame--dashboard">
                <h3 class="frame__title frame__title--dashboard">Upcoming task</h3>
                <div class="frame__content hide-scrollbar">
                    <div class="task-list">
                        <!-- sample task-card -->
                        <div class="task-card" data-task-id="t001"
                            style="background: var(--color-background-inprogress);">
                            <!-- checkbox: to done status -->
                            <label class="custom-checkbox">
                                <input type="checkbox" name="" id="task-status">
                                <span class="custom-checkbox__checkmark"></span>
                            </label>

                            <!-- inner task-card -->
                            <div class="task-card__content">
                                <span class="task__name" id="task__name">Tạo Dashboard Mockup trên Figma</span>
                                <div class="task-card__detail">
                                    <div class="task__address">
                                        <span id="taskAddress__prjId">Project</span>
                                        <span> / </span>
                                        <span id="taskAddress__tasklistId">tl001</span>
                                    </div>
                                    <div class="task__deadline" id="task__deadline">
                                        <i data-lucide="calendar-fold" class="icon--minium"></i>
                                        <span>Wednesday, 30 July 2025</span>
                                    </div>
                                </div>
                            </div>
                            <!-- priority -->
                            <button class="btn priority-high">
                                <i data-lucide="star"></i>
                            </button>
                        </div>

                        <div class="task-card" data-task-id="t002"
                            style="background: var(--color-background-notstarted);">
                            <label class="custom-checkbox">
                                <input type="checkbox" name="" id="task-status">
                                <span class="custom-checkbox__checkmark"></span>
                            </label>
                            <div class="task-card__content">
                                <div class="task__name">Lập trình Sidebar Component</div>
                                <div class="task-card__detail">
                                    <div class="task__address">
                                        <span id="taskAddress__prjId">Project</span>
                                        <span> / </span>
                                        <span id="taskAddress__tasklistId">tl002</span>
                                    </div>
                                    <div class="task__deadline">
                                        <i data-lucide="calendar-fold" class="icon--minium"></i>
                                        <span>Friday, 15 August 2025</span>
                                    </div>
                                </div>
                            </div>
                            <button class="btn priority-high">
                                <i data-lucide="star"></i>
                            </button>
                        </div>

                        <div class="task-card" data-task-id="t003"
                            style="background: var(--color-background-inreview);">
                            <label class="custom-checkbox">
                                <input type="checkbox" name="" id="task-status">
                                <span class="custom-checkbox__checkmark"></span>
                            </label>
                            <div class="task-card__content">
                                <div class="task__name">Kiểm thử API thanh toán với Stripe</div>
                                <div class="task-card__detail">
                                    <div class="task__address">
                                        <span id="taskAddress__prjId">Project</span>
                                        <span> / </span>
                                        <span id="taskAddress__tasklistId">tl003</span>
                                    </div>
                                    <div class="task__deadline">
                                        <i data-lucide="calendar-fold" class="icon--minium"></i>
                                        <span>Thursday, 01 August 2025</span>
                                    </div>
                                </div>
                            </div>
                            <button class="btn priority-medium">
                                <i data-lucide="star"></i>
                            </button>
                        </div>

                        <div class="task-card" data-task-id="t009" style="background: var(--color-background-done);">
                            <label class="custom-checkbox">
                                <input type="checkbox" name="" id="task-status">
                                <span class="custom-checkbox__checkmark"></span>
                            </label>
                            <div class="task-card__content">
                                <div class="task__name">Lên kịch bản video quảng cáo</div>
                                <div class="task-card__detail">
                                    <div class="task__address">
                                        <span id="taskAddress__prjId">p006</span>
                                        <span> / </span>
                                        <span id="taskAddress__tasklistId">-</span>
                                    </div>
                                    <div class="task__deadline">
                                        <i data-lucide="calendar-fold" class="icon--minium"></i>
                                        <span>Not set</span>
                                    </div>
                                </div>
                            </div>
                            <button class="btn priority-low">
                                <i data-lucide="star"></i>
                            </button>
                        </div>

                        <div class="task-card" data-task-id="t010"
                            style="background: var(--color-background-inprogress);">
                            <label class="custom-checkbox">
                                <input type="checkbox" name="" id="task-status">
                                <span class="custom-checkbox__checkmark"></span>
                            </label>
                            <div class="task-card__content">
                                <div class="task__name">Booking KOLs</div>
                                <div class="task-card__detail">
                                    <div class="task__address">
                                        <span id="taskAddress__prjId">p006</span>
                                        <span> / </span>
                                        <span id="taskAddress__tasklistId">-</span>
                                    </div>
                                    <div class="task__deadline">
                                        <i data-lucide="calendar-fold" class="icon--minium"></i>
                                        <span>Not set</span>
                                    </div>
                                </div>
                            </div>
                            <button class="btn priority-high">
                                <i data-lucide="star"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <button id="sidebar-toggle-button" class="sidebar-toggle">
        <i class="icon-open" data-lucide="chevrons-left"></i>
        <i class="icon-closed" data-lucide="chevrons-right"></i>
    </button>`;
    },
    
    after_render: async () => {
        if (!isAuthenticated()) return;

        await loadSidebarAndSetActiveLink();

        renderGreetingWidget();
    }
};

export default DashboardPage;