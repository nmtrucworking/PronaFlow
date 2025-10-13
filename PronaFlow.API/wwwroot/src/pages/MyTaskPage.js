import { loadSidebarAndSetActiveLink } from '../components/Sidebar.js';
import { store } from '../store/store.js';
import { apiService } from '../api/apiService.js';
import { throttle, renderLongList } from '../utils/performance.js';

const MyTasksPage = {
    /**
     * Render a view of the page.
     * HTML is merged from my-task.html.
     */
    render: async () => {
        const state = store.getState();
        if (!state.auth.isAuthenticated) {
            window.location.hash = '#/login';
            return '';
        }

        return `<div id="sidebar-container"></div>

    <main id="main" class="main my-tasks-page">
        <div class="task-list-panel">
            <div class="page-header">
                <div class="page__title">
                    My Task
                </div>
            </div>
            <div class="task-list__toolbar">
                <!-- 1. Thanh tìm kiếm -->
                <div class="search-bar">
                    <i data-lucide="search" class="search-bar__icon"></i>
                    <!-- BACKEND: Lắng nghe sự kiện 'input' để lọc danh sách công việc theo thời gian thực -->
                    <input type="text" class="search-bar__input" placeholder="Search tasks...">
                </div>

                <!-- 2. Các nút chức năng -->
                <div class="toolbar-actions">
                    <!-- Nút Filter với anchor -->
                    <button id="filter-btn" 
                        class="btn btn--tertiary btn--sm" 
                        popovertarget="filter-popover"
                        popovertargetaction="toggle"
                    >
                        <i data-lucide="filter"></i>
                        <span>Filter</span>
                    </button>
                    <!-- Features: Sorting -->
                    <button class="btn btn--tertiary btn--sm" 
                        popovertarget="sort-popover"
                    >
                        <i data-lucide="arrow-up-down"></i>
                        <span>Sort</span>
                    </button>
                    <!-- Features: Group by -->
                    <button class="btn btn--tertiary btn--sm" popovertarget="groupby-popover">
                        <i data-lucide="layout-grid"></i>
                        <span>Group by</span>
                    </button>
                </div>
            </div>
            <div id="task-list-container" 
                class="list-cards task-list-panel__content glass-card no-scrollbar">
                <!-- sample task-card -->
                <!-- JS will render data -->
                
                <!-- =============================================================== -->
                <!-- (EMPTY STATE)                      -->
                <!-- =============================================================== -->
                <!-- JS LOGIC: Hiển thị div này khi #task-list-container không có child element nào là .task-card -->
                <div id="empty-state-tasks" class="empty-state-container" style="display: none;">
                    <i data-lucide="check-square" class="empty-state__icon"></i>
                    <h3 class="empty-state__text">All tasks completed!</h3>
                    <p class="empty-state__subtext">Add a new task below to get started.</p>
                </div>
            </div>


            <div class="add-task-bar">
                <form class="add-task-card" id="add-task-form"> <!--data-api-endpoint="/api/tasks"-->
                    <input type="text" 
                        id="new-task-input" 
                        name="taskName"
                        pattern="^[a-zA-Z0-9\s]{3,200}$"
                        class="add-task-card__name glass-card"
                        title="Task name must be between 3 and 200 characters."
                        placeholder="Enter a new task" 
                        required
                        minlength="3"
                        maxlength="200">

                    <!-- Các nút thiết lập nhanh -->
                    <div class="add-task__attributes">
                        <!-- BACKEND: Nạp danh sách dự án vào popover này -->
                        <button id="btn-set-project" type="button" class="btn btn--third btn-hover"
                            popovertarget="project-popover" title="Set Project">
                            <i data-lucide="folder-kanban"></i>
                        </button>
                        <!-- Popover cho deadline đã có, giữ nguyên -->
                        <button id="btn-set-deadline" type="button" class="btn btn--third btn-hover"
                            popovertarget="deadline-popover" title="Set Deadline">
                            <i data-lucide="calendar-clock"></i>
                        </button>
                        <!-- BACKEND: Popover để chọn độ ưu tiên -->
                        <button id="btn-set-priority" type="button" class="btn btn--third btn-hover"
                            popovertarget="priority-popover" title="Set Priority">
                            <i data-lucide="star"></i>
                        </button>
                        <!-- BACKEND: Nạp danh sách thành viên vào popover này -->
                        <button id="btn-set-assignee" type="button" class="btn btn--third btn-hover"
                            popovertarget="assignee-popover" title="Assign to">
                            <i data-lucide="user"></i>
                        </button>
                    </div>

                    <button type="submit" class="btn btn--primary btn--sm">Add</button>
                </form>
            </div>
        </div>

        <!-- =================================== -->
        <!-- === TASK DETAIL PANEL (SIDEBAR) === -->
        <!-- =================================== -->
        <div id="task-detail-panel" class="task-detail-panel">
            <button type="button" id="close-task-detail-btn" class="btn-close-panel">
                <i data-lucide="x"></i>
            </button>
            <header class="page-header">
                <h2 class="page__title">
                    Task Details
                </h2>
            </header>
            <!-- divider -->
            <div class="divider"></div>
            <!-- Body - Hiển thị khi có task được chọn -->
            <div id="task-detail-content" class="task-detail-content">
                <div class="task-detail-body">
                    <form>
                        <!-- task.id -->
                        <input type="hidden" name="task.id" id="task-id-input">

                        <div class="task__address">
                            <span id="detail-taskAddress__prjId">Project</span>
                            <span> / </span>
                            <span id="detail-taskAddress__tasklistId">Task-list</span>
                        </div>
                        <!-- Task Name -->
                        <header class="task-details__top">
                            <!-- Checkbox for task status(done) -->
                            <label class="custom-checkbox">
                                <input type="checkbox" 
                                        name="taskStatus" 
                                        id="detail-taskStatusCheckbox">
                                <span class="custom-checkbox__checkmark round"></span>
                            </label>
                            <!-- Task Name Input -->
                            <input type="text" id="detail-taskName" class="task__name" placeholder="Enter task name">
                        </header>
                        <!-- subtask -->
                        <div class="subtasks-section">
                            <ul class="subtask-list list-col" id="subtask-list-container">
                                <!-- Subtask items will be added here by JavaScript -->
                                <!-- ...  -->
                            </ul>
                            <!-- Add subtask bar -->
                            <div class="add-subtask-form">
                                <i data-lucide="plus"></i>
                                <input type="text" id="add-subtask-input" class="subtask__name"
                                    placeholder="Add a step">
                            </div>
                        </div>

                        <!-- Task Attributes -->
                        <div class="task-attributes">
                            <!-- Cải tiến: Start date & End date với Popover -->
                            <div class="form-group">
                                <label class="task-attribute-name">Dates</label>
                                <div class="task-attribute" id="detail-task-dates-container">
                                    <button type="button" class="date-range-display"
                                        popovertarget="dateRangePopover_sidebar" popovertargetaction="toggle">
                                        <span id="detail-task-start-date-display">No start date</span>
                                        <span>→</span>
                                        <span id="detail-task-end-date-display">No end date</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Popover for Date Range Picker (Sidebar version) -->
                            <div popover id="dateRangePopover_sidebar" class="popover">
                                <div class="popover__body" style="padding: 15px;">
                                    <div class="form-group-popover">
                                        <label for="detail-task-start-date">Start date</label>
                                        <input type="date" class="form-input" id="detail-task-start-date">
                                    </div>
                                    <div class="form-group-popover" style="margin-top: 10px;">
                                        <label for="detail-task-end-date">End date</label>
                                        <input type="date" class="form-input" id="detail-task-end-date">
                                    </div>
                                </div>
                            </div>

                            <!-- Priority -->
                            <div class="form-group">
                                <label for="detail-task-priority" class="task-attribute-name">Priority</label>
                                <select id="detail-task-priority" class="task-attribute">
                                    <option value="high">High</option>
                                    <option value="normal" selected>Normal</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>

                            <!-- Status -->
                            <div class="form-group">
                                <label for="detail-task-status" class="task-attribute-name">Status</label>
                                <select id="detail-task-status" class="task-attribute">
                                    <option value="not-started" selected>Not Started</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="in-review">In Review</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>

                            <!-- Assignee -->
                            <div class="form-group">
                                <label class="task-attribute-name">Assignee</label>
                                <div id="detail-task-assignees-container" class="attr-content list-row">
                                    <!-- Existing assignees' avatars will be added here -->
                                    <button class="add-member btn-hover" type="button"
                                        popovertarget="addMemberPopover_sidebar" popovertargetaction="toggle">
                                        <i data-lucide="user-plus"></i>
                                    </button>
                                </div>
                            </div>

                            <!-- Add Member Popover (Sidebar version) -->
                            <div popover id="addMemberPopover_sidebar" class="popover">
                                <div class="popover__header">
                                    <span class="popover__title">Manage Members</span>
                                </div>
                                <div class="popover__body" style="padding: 10px;">
                                    <input type="text" class="form-input" placeholder="Search by name or email...">
                                    <ul class="user-list no-scrollbar"
                                        style="margin-top: 10px; max-height: 150px; overflow-y: auto; display: flex; flex-direction: column; gap: 5px;">
                                        <!-- User list items -->
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </form>
                    <div class="divider"></div>
                    <textarea name="" id="detail-task-description" class="task-description"
                        placeholder="Enter the description for this task..."></textarea>
                </div>

                <div class="task-detail-footer">
                    <button type="button" class="btn-delete glass-card" id="delete-task-btn">Delete</button>
                </div>
            </div>

            <!-- Trạng thái trống - Hiển thị khi không có task nào được chọn -->
            <div id="empty-state-message" class="empty-state">
                <i data-lucide="mouse-pointer-square"></i>
                <p>Select a task to see its details</p>
            </div>
        </div>

        <!-- Cấu trúc Menu ngữ cảnh (Context Menu) -->
        <!-- JS LOGIC: Menu này sẽ được định vị và hiển thị tại vị trí con trỏ chuột khi người dùng chuột phải vào .task-card -->
        <div id="task-context-menu" class="context-menu" style="display: none;">
            <ul class="popover-action-list">
                <li><button id="ctx-complete"><i data-lucide="check-circle-2"></i> Mark as complete</button></li>
                <li class="divider"></li>
                <li><button id="ctx-priority"><i data-lucide="star"></i> Set priority...</button></li>
                <li><button id="ctx-due-date"><i data-lucide="calendar"></i> Change due date...</button></li>
                <li class="divider"></li>
                <li><button id="ctx-duplicate"><i data-lucide="copy"></i> Duplicate task</button></li>
                <li><button id="ctx-delete" class="text-danger"><i data-lucide="trash-2"></i> Delete task</button></li>
            </ul>
        </div>

        <!-- =================================== -->
        <!-- ===        POPOVER              === -->
        <!-- =================================== -->
        <!-- Popover cho Sắp xếp (Sort) -->
        <div popover id="sort-popover" class="popover ">
            <div class="popover__header">
                <h4 class="popover__title">Sort by</h4>
            </div>
            <ul class="popover-action-list">
                <!-- JS LOGIC: Gắn sự kiện click để gọi hàm sắp xếp tương ứng -->
                <li><button data-sort="due-date"><i data-lucide="calendar"></i> Due Date</button></li>
                <li><button data-sort="priority"><i data-lucide="star"></i> Priority</button></li>
                <li><button data-sort="creation-date"><i data-lucide="plus-circle"></i> Creation Date</button></li>
                <li><button data-sort="alphabetical"><i data-lucide="arrow-down-a-z"></i> Alphabetical</button></li>
            </ul>
        </div>

        <!-- Popover cho Lọc (Filter) -->
        <!-- BACKEND: Cần nạp dữ liệu (dự án, người dùng) vào các danh sách này -->
        <div popover id="filter-popover" class="popover" style="width: 300px;"> <!--data-api-endpoint="/api/tasks/filter"-->
            <div class="popover__header">
                <h4 class="popover__title">Filter tasks</h4>
            </div>
            <div class="popover__body">
                <!-- Lọc theo dự án -->
                <div class="filter-group">
                    <h5 class="filter-group__title">By Project</h5>
                    <div class="filter-group__list">
                        <label class="custom-checkbox"><input type="checkbox" value="p001"> Project A</label>
                        <label class="custom-checkbox"><input type="checkbox" value="p006"> Project B</label>
                    </div>
                </div>
                <!-- Lọc theo người được giao -->
                <div class="filter-group">
                    <h5 class="filter-group__title">By Assignee</h5>
                    <div class="filter-group__list">
                        <label class="custom-checkbox"><input type="checkbox" value="user1"> User 1</label>
                        <label class="custom-checkbox"><input type="checkbox" value="user2"> User 2</label>
                    </div>
                </div>
            </div>
            <div class="popover__footer">
                <button class="btn btn--sm btn--tertiary">Clear</button>
                <button class="btn btn--sm btn--primary">Apply</button>
            </div>
        </div>
        <!-- Set deadline Popover -->
        <div id="deadline-popover" popover class="popover attribute-popover">
            <!-- Header của popover -->
            <div class="popover__header">
                <h4 class="popover__title">Dates</h4>
                <!-- Nút X để đóng popover -->
                <button class="btn-exit" popovertarget="deadline-popover" popovertargetaction="hide">
                    <i data-lucide="x"></i>
                </button>
            </div>
            <div class="popover__body">
                <div class="form-box">
                    <label for="start-date-input" class="form-label">Start date</label>
                    <input type="date" id="start-date-input" class="form-input">
                </div>
                <div class="form-box" style="margin-top: 15px;">
                    <label for="due-date-input" class="form-label">Due date</label>
                    <input type="date" id="due-date-input" class="form-input">
                </div>
            </div>
            <div class="popover__footer">
                <button class="btn btn--sm btn--tertiary">Remove</button>
                <button class="btn btn--sm btn--primary">Save</button>
            </div>
        </div>

    </main>

    <button id="sidebar-toggle-button" class="sidebar-toggle">
        <i class="icon-open" data-lucide="chevrons-left"></i>
        <i class="icon-closed" data-lucide="chevrons-right"></i>
    </button>`;
    },
    
    /**
     * Execute script after rendering.
     * All logic from my-task.js is moved and adapted here.
     */
    after_render: async () => {
        if (!isAuthenticated()) return;

        await loadSidebarAndSetActiveLink();
        if (window.lucide) {
            lucide.createIcons();
        }
        
        // Initialize all event listeners and logic for the page
        initializeMyTasksPage();
    }
};

/**
 * Main function to initialize all interactions on the My Tasks page.
 */
function initializeMyTasksPage() {
    const taskListContainer = document.getElementById('task-list-container');
    const detailPanel = document.getElementById('task-detail-panel');
    const detailContent = document.getElementById('task-detail-content');
    const emptyStateMessage = document.getElementById('empty-state-message');
    const closeTaskDetailBtn = document.getElementById('close-task-detail-btn');
    const addTaskForm = document.getElementById('add-task-form');
    const newTaskInput = document.getElementById('new-task-input');
    const deleteTaskBtn = document.getElementById('delete-task-btn');

    let currentSelectedTaskId = null;

    const resetToEmptyState = () => {
        detailContent.style.display = 'none';
        emptyStateMessage.style.display = 'flex';
        const activeCard = taskListContainer.querySelector('.active-task');
        if (activeCard) activeCard.classList.remove('active-task');
        currentSelectedTaskId = null;
        detailPanel.querySelector('form').reset();
    };

    const displayTaskDetails = (taskCard) => {
        // Here you would fetch full task details from an API
        // For now, we'll use the data from the card
        const taskId = taskCard.dataset.taskId;
        const name = taskCard.querySelector('.task__name').textContent;
        const project = taskCard.querySelector('#taskAddress__prjId')?.textContent || 'N/A';
        const tasklist = taskCard.querySelector('#taskAddress__tasklistId')?.textContent || 'N/A';

        currentSelectedTaskId = taskId;
        document.getElementById('task-id-input').value = taskId;
        document.getElementById('detail-taskName').value = name;
        document.getElementById('detail-taskAddress__prjId').textContent = project;
        document.getElementById('detail-taskAddress__tasklistId').textContent = tasklist;
        
        emptyStateMessage.style.display = 'none';
        detailContent.style.display = 'block';
    };

    // Event Listeners
    closeTaskDetailBtn.addEventListener('click', resetToEmptyState);

    taskListContainer.addEventListener('click', (event) => {
        const clickedCard = event.target.closest('.task-card');
        if (clickedCard) {
            taskListContainer.querySelectorAll('.task-card').forEach(card => card.classList.remove('active-task'));
            clickedCard.classList.add('active-task');
            displayTaskDetails(clickedCard);
        }
    });

    addTaskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskName = newTaskInput.value.trim();
        if (taskName === '') return;
        
        // In a real app, you would call apiService.tasks.create(taskName)
        // For now, we simulate adding it to the UI
        const newTaskId = 't' + Date.now();
        const newTaskCardHTML = `
            <div class="task-card" data-task-id="${newTaskId}" style="background: var(--color-background-notstarted);">
                <label class="custom-checkbox"><input type="checkbox"><span class="custom-checkbox__checkmark round"></span></label>
                <div class="task-card__content">
                    <span class="task__name">${taskName}</span>
                    <div class="task-card__detail">
                        <div class="task__address"><span id="taskAddress__prjId">Uncategorized</span><span> / </span><span id="taskAddress__tasklistId">-</span></div>
                        <div class="task__deadline"><i data-lucide="calendar-fold" class="icon--minium"></i><span>Not set</span></div>
                    </div>
                </div>
                <button class="btn priority-low"><i data-lucide="star"></i></button>
            </div>`;
        taskListContainer.insertAdjacentHTML('beforeend', newTaskCardHTML);
        lucide.createIcons();
        newTaskInput.value = '';
        document.getElementById('empty-state-tasks').style.display = 'none';
    });

    deleteTaskBtn.addEventListener('click', () => {
        if (!currentSelectedTaskId || !confirm("Are you sure you want to delete this task?")) return;
        
        // Real app: await apiService.tasks.delete(currentSelectedTaskId);
        const taskCardToDelete = taskListContainer.querySelector(`[data-task-id="${currentSelectedTaskId}"]`);
        if (taskCardToDelete) taskCardToDelete.remove();
        
        resetToEmptyState();
        if (taskListContainer.children.length <= 1) { // Check if only empty state is left
            document.getElementById('empty-state-tasks').style.display = 'flex';
        }
    });

    // Initial state setup
    resetToEmptyState();
    if (taskListContainer.children.length <= 1) {
        document.getElementById('empty-state-tasks').style.display = 'flex';
    }
}

export default MyTaskPage;