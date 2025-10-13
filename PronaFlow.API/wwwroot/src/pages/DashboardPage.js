import AuthPage from './AuthPage.js'; // include extension if needed
import { loadSidebarAndSetActiveLink } from '../components/Sidebar.js';
import store from '../store/store.js';
import apiService from '../api/apiService.js';
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
                    <div class="task-list" id="upcoming-tasks">
                        <!-- Tasks will be loaded dynamically -->
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
        // Load sidebar and set active link
        await loadSidebarAndSetActiveLink('dashboard');
        
        // Initialize Lucide icons
        if (window.lucide) {
            lucide.createIcons();
        }
        
        // Render greeting widget
        renderGreetingWidget();
        
        // Load dashboard data
        await loadDashboardData();
    }
};

/**
 * Renders the greeting widget based on time of day
 */
function renderGreetingWidget() {
    const greetingWidget = document.getElementById('greeting-widget');
    if (!greetingWidget) return;
    
    const hour = new Date().getHours();
    const user = store.getState().user;
    const userName = user?.name || 'there';
    
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
 * Loads dashboard data from API
 */
async function loadDashboardData() {
    try {
        // Get statistics from API
        const stats = await apiService.dashboard.getStatistics();
        
        // Update UI with statistics
        document.getElementById('total-projects').textContent = stats.totalProjects || 0;
        document.getElementById('total-tasks-inprogress').textContent = stats.tasksInProgress || 0;
        document.getElementById('total-tasks-overdue').textContent = stats.tasksOverdue || 0;
        
        // Load upcoming tasks
        await loadUpcomingTasks();
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

/**
 * Loads upcoming tasks for the dashboard
 */
async function loadUpcomingTasks() {
    const tasksContainer = document.getElementById('upcoming-tasks');
    if (!tasksContainer) return;
    
    try {
        // Get upcoming tasks from API
        const tasks = await apiService.tasks.getUpcoming();
        
        // Clear container
        tasksContainer.innerHTML = '';
        
        if (tasks.length === 0) {
            tasksContainer.innerHTML = '<div class="empty-state">No upcoming tasks</div>';
            return;
        }
        
        // Render tasks
        tasks.forEach(task => {
            const taskCard = createTaskCard(task);
            tasksContainer.appendChild(taskCard);
        });
        
        // Initialize Lucide icons in the new content
        if (window.lucide) {
            lucide.createIcons();
        }
    } catch (error) {
        console.error('Error loading upcoming tasks:', error);
        tasksContainer.innerHTML = '<div class="error-state">Failed to load tasks</div>';
    }
}

/**
 * Creates a task card element
 */
function createTaskCard(task) {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.dataset.taskId = task.id;
    
    // Set background color based on status
    let bgColor = 'var(--color-background-notstarted)';
    if (task.status === 'in_progress') {
        bgColor = 'var(--color-background-inprogress)';
    } else if (task.status === 'completed') {
        bgColor = 'var(--color-background-completed)';
    }
    taskCard.style.background = bgColor;
    
    taskCard.innerHTML = `
        <label class="custom-checkbox">
            <input type="checkbox" name="" id="task-status" ${task.status === 'completed' ? 'checked' : ''}>
            <span class="custom-checkbox__checkmark"></span>
        </label>
        <div class="task-card__content">
            <span class="task__name">${task.name}</span>
            <div class="task-card__detail">
                <div class="task__address">
                    <span>${task.projectName || 'Project'}</span>
                    <span> / </span>
                    <span>${task.taskListName || ''}</span>
                </div>
                <div class="task__deadline">
                    <i data-lucide="calendar-fold" class="icon--minium"></i>
                    <span>${formatDate(task.deadline)}</span>
                </div>
            </div>
        </div>
        <button class="btn priority-${task.priority || 'medium'}">
            <i data-lucide="star"></i>
        </button>
    `;
    
    return taskCard;
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    if (!dateString) return 'No deadline';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
}

export default DashboardPage;