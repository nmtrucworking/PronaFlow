import { isAuthenticated } from '../auth/authService.js';
import { loadSidebarAndSetActiveLink } from '../components/Sidebar.js';
import store from '../store/store.js';
import apiService from '../api/apiService.js';

const DashboardPage = {
    /**
     * Render a view of the page.
     */
    render: async () => {
        // Check Authorizator
        if (!isAuthenticated()) {
            window.location.hash = '#/login'; 
            return ''; 
        }

        // HTML content from dashboard.html
        return `
            <div id="sidebar-container"></div>

            <main id="main" class="main dashboard no-scrollbar">
                <div id="greeting-widget-frame" class="greeting-widget">
                    <img src="./assets/images/hello.gif" alt="Hello Icon">
                    <span id="greeting-widget">
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

                <div class="frames">
                    <div class="frame frame--dashboard">
                        <h3 class="frame__title frame__title--dashboard">Upcoming task</h3>
                        <div class="frame__content hide-scrollbar">
                            <div class="task-list" id="upcoming-tasks">
                                </div>
                        </div>
                    </div>
                </div>
            </main>

            <button id="sidebar-toggle-button" class="sidebar-toggle">
                <i class="icon-open" data-lucide="chevrons-left"></i>
                <i class="icon-closed" data-lucide="chevrons-right"></i>
            </button>
        `;
    },
    
    /**
     * Execute script after rendering
     */
    after_render: async () => {
        if (!isAuthenticated()) return;

        // Load sidebar and set active link
        await loadSidebarAndSetActiveLink();
        
        // Initialize Lucide icons
        if (window.lucide) {
            lucide.createIcons();
        }
        
        // Render greeting widget
        renderGreetingWidget();
        
        // Load dashboard data (You would call your API here)
        // For demonstration, we'll use static data.
        loadDashboardData();
    }
};

/**
 * Renders the greeting widget based on the time of day and user's name.
 */
function renderGreetingWidget() {
    const greetingWidget = document.getElementById('greeting-widget');
    if (!greetingWidget) return;
    
    const hour = new Date().getHours();
    const user = store.getState().user; // Assuming user info is in the store
    const userName = user?.fullName || 'Guest'; // Use fullName from your User model
    
    let greeting = '';
    if (hour < 12) {
        greeting = `Good morning, ${userName}!`;
    } else if (hour < 18) {
        greeting = `Good afternoon, ${userName}!`;
    } else {
        greeting = `Good evening, ${userName}!`;
    }
    
    greetingWidget.textContent = greeting;
}

/**
 * Loads and displays dashboard statistics and upcoming tasks.
 * NOTE: This is a placeholder. You should replace this with actual API calls.
 */
async function loadDashboardData() {
    const upcomingTasksContainer = document.getElementById('upcoming-tasks');
    // Hiển thị trạng thái chờ (loading spinner)
    upcomingTasksContainer.innerHTML = '<div class="loading-spinner"></div>';
    try {
        const [stats, tasks] = await Promise.all([
            apiService.dashboard.getStatistics(),
            apiService.tasks.getUpcoming()
        ]);
        
        // Update UI with statistics
        document.getElementById('total-projects').textContent = stats.totalProjects;
        document.getElementById('total-tasks-inprogress').textContent = stats.tasksInProgress;
        document.getElementById('total-tasks-overdue').textContent = stats.tasksOverdue;
        
        // Render upcoming tasks
        renderUpcomingTasks(tasks);

    } catch (error) {
        console.error('Error loading dashboard data:', error);
        // Hiển thị thông báo lỗi thân thiện với người dùng
        upcomingTasksContainer.innerHTML = `<div class="empty-state">Could not load dashboard data. Please try again later.</div>`;
    }
}

/**
 * Renders the list of upcoming tasks into the DOM.
 * @param {Array} tasks - An array of task objects.
 */
function renderUpcomingTasks(tasks) {
    const tasksContainer = document.getElementById('upcoming-tasks');
    if (!tasksContainer) return;
    
    tasksContainer.innerHTML = ''; // Clear existing content
    
    if (tasks.length === 0) {
        tasksContainer.innerHTML = '<div class="empty-state">No upcoming tasks. Great job!</div>';
        return;
    }
    
    tasks.forEach(task => {
        const taskCard = createTaskCardElement(task);
        tasksContainer.appendChild(taskCard);
    });

    // Re-initialize icons for the newly added elements
    if (window.lucide) {
        lucide.createIcons();
    }
}

/**
 * Creates a single task card HTML element from a task object.
 * @param {object} task - The task data object.
 * @returns {HTMLElement} - The created div element for the task card.
 */
function createTaskCardElement(task) {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.dataset.taskId = task.id;
    
    const statusBgMap = {
        'not-started': 'var(--color-background-notstarted)',
        'in-progress': 'var(--color-background-inprogress)',
        'in-review': 'var(--color-background-inreview)',
        'done': 'var(--color-background-done)'
    };
    taskCard.style.background = statusBgMap[task.status] || 'var(--color-background-notstarted)';
    
    taskCard.innerHTML = `
        <label class="custom-checkbox">
            <input type="checkbox" ${task.status === 'done' ? 'checked' : ''}>
            <span class="custom-checkbox__checkmark"></span>
        </label>
        <div class="task-card__content">
            <span class="task__name">${task.name}</span>
            <div class="task-card__detail">
                <div class="task__address">
                    <span id="taskAddress__prjId">${task.projectName}</span>
                    <span> / </span>
                    <span id="taskAddress__tasklistId">${task.taskListName}</span>
                </div>
                <div class="task__deadline">
                    <i data-lucide="calendar-fold" class="icon--minium"></i>
                    <span>${task.deadline ? new Date(task.deadline).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Not set'}</span>
                </div>
            </div>
        </div>
        <button class="btn priority-${task.priority.toLowerCase()}">
            <i data-lucide="star"></i>
        </button>
    `;
    
    return taskCard;
}

export default DashboardPage;