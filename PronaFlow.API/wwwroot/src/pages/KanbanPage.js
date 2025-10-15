import { isAuthenticated } from '../auth/authService.js';
import { loadSidebarAndSetActiveLink } from '../components/Sidebar.js';
import { initializeProjectDetailModal, showProjectDetailModal, populateModalWithData } from '../components/project-modal.js';
import { autoResizeTextarea } from '../utils/utils.js';
import store from '../store/store.js';
import apiService from '../api/apiService.js';

const KanbanPage = {
    /**
     * Render a view of the page.
     */
    render: async () => {
        if (!isAuthenticated()) {
            window.location.hash = '#/login';
            return '';
        }

        // HTML content from kanban-board.html
        return `<div id="sidebar-container"></div>
    
    <main id="main" class="main kanban-board">
        <div class="kanban-board__header">
            <div class="workspace__title">
                <span id="workspaceName">Loading...</span>
            </div>
            <span class="workspace__description"></span>
        </div>

        <div class="divider"></div>

        <div class="frames frames--grid-2col">
            <!--  CALENDAR FRAME (PRONAFLOW AGENDA) - START  -->
            <div class="frame frame--kanban">
                <h3 class="frame__title">My Agenda</h3>
                <div class="frame__content hide-scrollbar">
                    <div class="agenda">
                        <!-- ========== Agenda Group: August 30 ========== -->
                        <div class="agenda__group">
                            <div class="agenda__date agenda__date--today">
                                Today
                                <span>August 30</span>
                            </div>
                            <div class="agenda__events">
                                <!-- EVENT: PROJECT -->
                                <div class="event-item event-item--project">
                                    <div class="event-item__icon-wrapper">
                                        <i data-lucide="briefcase" class="event-item__icon"></i>
                                    </div>
                                    <div class="event-item__content">
                                        <div class="event-item__header">
                                            <span class="event-item__title">Website Redesign</span>
                                        </div>
                                        <div class="event-item__meta">
                                            <div class="event-item__meta-group">
                                                <i data-lucide="check-circle-2"></i>
                                                <span>5/12 Tasks</span>
                                            </div>
                                            <div class="event-item__meta-group">
                                                <i data-lucide="flag"></i>
                                                <span>Deadline: Sep 15</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- EVENT: TASK (HIGH PRIORITY) -->
                                <div class="event-item event-item--task">adad
                                    <div class="event-item__icon-wrapper">
                                        <label class="custom-checkbox">
                                            <input type="checkbox">
                                            <span class="custom-checkbox__checkmark"></span>
                                        </label>
                                    </div>
                                    <div class="event-item__content">
                                        <div class="event-item__header">
                                            <span class="event-item__title">Finalize Homepage Mockup</span>
                                        </div>
                                        <div class="event-item__meta">
                                            <div class="event-item__meta-group">
                                                <i data-lucide="folder-open"></i>
                                                <span>In: Website Redesign</span>
                                            </div>
                                            <div class="event-item__meta-group event-item__meta-group--priority-high">
                                                <i data-lucide="star"></i>
                                                <span>High Priority</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- ========== Agenda Group: August 31 ========== -->
                        <div class="agenda__group">
                            <div class="agenda__date">
                                Sunday
                                <span>August 31</span>
                            </div>
                            <div class="agenda__events">
                                <!-- EVENT: TASK (COMPLETED) -->
                                <div class="event-item event-item--task event-item--completed">
                                    <div class="event-item__icon-wrapper">
                                        <label class="custom-checkbox">
                                            <input type="checkbox" checked>
                                            <span class="custom-checkbox__checkmark"></span>
                                        </label>
                                    </div>
                                    <div class="event-item__content">
                                        <div class="event-item__header">
                                            <span class="event-item__title">Review competitor analysis</span>
                                        </div>
                                        <div class="event-item__meta">
                                            <div class="event-item__meta-group">
                                                <i data-lucide="folder-open"></i>
                                                <span>In: Marketing Q4</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- EVENT: TASK (MEDIUM PRIORITY) -->
                                <div class="event-item event-item--task">
                                    <div class="event-item__icon-wrapper">
                                        <label class="custom-checkbox">
                                            <input type="checkbox">
                                            <span class="custom-checkbox__checkmark"></span>
                                        </label>
                                    </div>
                                    <div class="event-item__content">
                                        <div class="event-item__header">
                                            <span class="event-item__title">Prepare slides for client meeting</span>
                                        </div>
                                        <div class="event-item__meta">
                                            <div class="event-item__meta-group">
                                                <i data-lucide="folder-open"></i>
                                                <span>In: Project Alpha</span>
                                            </div>
                                            <div class="event-item__meta-group event-item__meta-group--priority-medium">
                                                <i data-lucide="star"></i>
                                                <span>Medium Priority</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- ========== Agenda Group: September 01 ========== -->
                        <div class="agenda__group">
                            <div class="agenda__date">
                                Monday
                                <span>September 01</span>
                            </div>
                            <div class="agenda__events">
                                <!-- EVENT: PROJECT -->
                                <div class="event-item event-item--project">
                                    <div class="event-item__icon-wrapper">
                                        <i data-lucide="briefcase" class="event-item__icon"></i>
                                    </div>
                                    <div class="event-item__content">
                                        <div class="event-item__header">
                                            <span class="event-item__title">API Integration Testing</span>
                                        </div>
                                        <div class="event-item__meta">
                                            <div class="event-item__meta-group">
                                                <i data-lucide="check-circle-2"></i>
                                                <span>0/8 Tasks</span>
                                            </div>
                                            <div class="event-item__meta-group">
                                                <i data-lucide="flag"></i>
                                                <span>Deadline: Sep 20</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="frame frame--kanban">
                <h3 class="frame__title">My Tasks</h3>
                <div class="frame__content hide-scrollbar">
                    <div class="task-list">
                        <!-- sample task-card -->
                        <div class="task-card" data-task-id="t001"
                            style="background: var(--color-background-inprogress);">
                            <!-- checkbox: to done status -->
                            <label class="custom-checkbox">
                                <input type="checkbox" id="task-status">
                                <span class="custom-checkbox__checkmark round"></span>
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
                                <input type="checkbox" id="task-status">
                                <span class="custom-checkbox__checkmark round"></span>
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
                                <input type="checkbox" id="task-status">
                                <span class="custom-checkbox__checkmark round"></span>
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
                                <input type="checkbox" id="task-status">
                                <span class="custom-checkbox__checkmark round"></span>
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
                                <input type="checkbox" id="task-status">
                                <span class="custom-checkbox__checkmark round"></span>
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
        </div>.

        <div class="divider"></div>

        <div id="kanban-view" class="kanban-view hide-scrollbar">
            <!--------------------------------------- Col: Temp  --------------------------------------->
            <div class="kanban__col" data-status="temp">
                <div class="kanban-column__header">
                    <button class="btn icon-btn">
                        <i data-lucide="plus" class="btn-icon"></i>
                    </button>
                    <h3 class="kanban-column__title">Temp</h3>
                    <button class="btn icon-btn btn-kanban-col-options-temp" popovertarget="kanban-col-options-temp">
                        <i data-lucide="ellipsis-vertical" class="btn-icon"></i>
                    </button>
                </div>
                <div class="divider"></div>
                <div class="list-card hide-scrollbar">
                    <!-- project-card -->
                    
                </div>

                <!-- Popover for Kanban Column Options -->
                <div popover class="popover kanban-col-options-temp" id="kanban-col-options-temp">
                    <div class="popover__header">
                        <span class="popover__title">Column Options</span>
                        <button type="button">
                            <i data-lucide="x" class="icon-sm"></i>
                        </button>
                    </div>
                    <div class="popover__body">
                        <button type="button" class="popover-item">Add card</button>
                        <button type="button" class="popover-item">Move all cards in this state</button>
                        <button type="button" class="popover-item">
                            <span>Set all cards of State to </span>
                            <select name="" id="">
                                <option value="temp">Temp</option>
                                <option value="notstarted">Not Started</option>
                                <option value="inprogress">In Progress</option>
                                <option value="inreview">In Review</option>
                                <option value="done">Done</option>
                            </select>
                        </button>
                        <button type="button" class="popover-item btn-danger">Remove all cards of this
                            [state]</button>
                        <button type="button" class="popover-item">Archive all cards of this [state]</button>
                    </div>
                </div>
            </div>
            <!----- Col: Not Started ------->
            <div class="kanban__col" data-status="not-started">
                <div class="kanban-column__header">
                    <button class="btn icon-btn add-project-btn">
                        <i data-lucide="plus" class="btn-icon"></i>
                    </button>
                    <h3>Not Started</h3>
                    <button class="btn icon-btn btn-kanban-col-options-not-started"
                        popovertarget="kanban-col-options-not-started">
                        <i data-lucide="ellipsis-vertical" class="btn-icon"></i>
                    </button>
                </div>
                <div class="divider"></div>
                <div class="list-card hide-scrollbar">
                    <!--Project card-->
                </div>

                <!-- Popover for Kanban Column Options -->
                <div popover class="popover kanban-col-options-not-started" id="kanban-col-options-not-started">
                    <div class="popover__header">
                        <span class="popover__title">Column Options</span>
                        <button type="button">
                            <i data-lucide="x" class="icon-sm"></i>
                        </button>
                    </div>
                    <div class="popover__body">
                        <button type="button" class="popover-item">Add card</button>
                        <button type="button" class="popover-item">Move all cards in this state</button>
                        <button type="button" class="popover-item">
                            <span>Set all cards of State to </span>
                            <select name="" id="">
                                <option value="temp">Temp</option>
                                <option value="notstarted">Not Started</option>
                                <option value="inprogress">In Progress</option>
                                <option value="inreview">In Review</option>
                                <option value="done">Done</option>
                            </select>
                        </button>
                        <button type="button" class="popover-item btn-danger">Remove all cards of this
                            [state]</button>
                        <button type="button" class="popover-item">Archive all cards of this [state]</button>
                    </div>
                </div>
            </div>
            <!------- Col: In Progress --------->
            <div class="kanban__col hide-scrollbar" data-status="in-progress">
                <div class="kanban-column__header">
                    <button class="btn icon-btn add-project-btn">
                        <i data-lucide="plus" class="btn-icon"></i>
                    </button>
                    <h3>In Progress</h3>
                    <button class="btn icon-btn btn-kanban-col-options-in-progress"
                        popovertarget="kanban-col-options-in-progress">
                        <i data-lucide="ellipsis-vertical" class="btn-icon"></i>
                    </button>
                </div>
                <div class="divider"></div>
                <div class="list-card hide-scrollbar">
                    <!--  -->
                </div>

                <!-- Popover for Kanban Column Options -->
                <div popover class="popover kanban-col-options-in-progress" id="kanban-col-options-in-progress">
                    <div class="popover__header">
                        <span class="popover__title">Column Options</span>
                        <button type="button">
                            <i data-lucide="x" class="icon-sm"></i>
                        </button>
                    </div>
                    <div class="popover__body">
                        <button type="button" class="popover-item">Add card</button>
                        <button type="button" class="popover-item">Move all cards in this state</button>
                        <button type="button" class="popover-item">
                            <span>Set all cards of State to </span>
                            <select name="" id="">
                                <option value="temp">Temp</option>
                                <option value="notstarted">Not Started</option>
                                <option value="inprogress">In Progress</option>
                                <option value="inreview">In Review</option>
                                <option value="done">Done</option>
                            </select>
                        </button>
                        <button type="button" class="popover-item btn-danger">Remove all cards of this
                            [state]</button>
                        <button type="button" class="popover-item">Archive all cards of this [state]</button>
                    </div>
                </div>
            </div>
            <!--------------------------------------- Col: In Review --------------------------------------->
            <div class="kanban__col hide-scrollbar" data-status="in-review">
                <div class="kanban-column__header">
                    <button class="btn icon-btn add-project-btn">
                        <i data-lucide="plus" class="btn-icon"></i>
                    </button>
                    <h3>In Review</h3>
                    <button class="btn icon-btn btn-kanban-col-options-in-review"
                        popovertarget="kanban-col-options-in-review">
                        <i data-lucide="ellipsis-vertical" class="btn-icon"></i>
                    </button>
                </div>
                <div class="divider"></div>
                <div class="list-card hide-scrollbar">
                    <!-- Project card -->
                </div>

                <!-- Popover for Kanban Column Options -->
                <div popover class="popover kanban-col-options-in-review" id="kanban-col-options-in-review">
                    <div class="popover__header">
                        <span class="popover__title">Column Options</span>
                        <button type="button">
                            <i data-lucide="x" class="icon-sm"></i>
                        </button>
                    </div>
                    <div class="popover__body">
                        <button type="button" class="popover-item">Add card</button>
                        <button type="button" class="popover-item">Move all cards in this state</button>
                        <button type="button" class="popover-item">
                            <span>Set all cards of State to </span>
                            <select name="" id="">
                                <option value="temp">Temp</option>
                                <option value="notstarted">Not Started</option>
                                <option value="inprogress">In Progress</option>
                                <option value="inreview">In Review</option>
                                <option value="done">Done</option>
                            </select>
                        </button>
                        <button type="button" class="popover-item btn-danger">Remove all cards of this
                            [state]</button>
                        <button type="button" class="popover-item">Archive all cards of this [state]</button>
                    </div>
                </div>
            </div>
            <!--------------------------------------- Col: Done --------------------------------------->
            <div class="kanban__col hide-scrollbar" data-status="done">
                <div class="kanban-column__header">
                    <button class="btn icon-btn add-project-btn">
                        <i data-lucide="plus" class="btn-icon"></i>
                    </button>
                    <h3>Done</h3>
                    <button class="btn icon-btn btn-kanban-col-options-done" popovertarget="kanban-col-options-done">
                        <i data-lucide="ellipsis-vertical" class="btn-icon"></i>
                    </button>
                </div>
                <div class="divider"></div>
                <div class="list-card hide-scrollbar">
                    <!-- Project card -->
                </div>

                <!-- Popover for Kanban Column Options -->
                <div popover class="popover kanban-col-options-done" id="kanban-col-options-done">
                    <div class="popover__header">
                        <span class="popover__title">Column Options</span>
                        <button type="button">
                            <i data-lucide="x" class="icon-sm"></i>
                        </button>
                    </div>
                    <div class="popover__body">
                        <button type="button" class="popover-item">Add card</button>
                        <button type="button" class="popover-item">Move all cards in this state</button>
                        <button type="button" class="popover-item">
                            <span>Set all cards of State to </span>
                            <select name="" id="">
                                <option value="temp">Temp</option>
                                <option value="notstarted">Not Started</option>
                                <option value="inprogress">In Progress</option>
                                <option value="inreview">In Review</option>
                                <option value="done">Done</option>
                            </select>
                        </button>
                        <button type="button" class="popover-item btn-danger">Remove all cards of this
                            [state]</button>
                        <button type="button" class="popover-item">Archive all cards of this [state]</button>
                    </div>
                </div>
            </div>
        </div>


    </main>

    <button id="sidebar-toggle-button" class="sidebar-toggle" type="button">
        <i class="icon-open" data-lucide="chevrons-left"></i>
        <i class="icon-closed" data-lucide="chevrons-right"></i>
    </button>`;
    },

    /**
     * Execute script after rendering
     */
    after_render: async () => {
        if (!isAuthenticated()) return;

        await loadSidebarAndSetActiveLink();
        if (window.lucide) {
            lucide.createIcons();
        }

        initializeProjectDetailModal();

        // Change workspace
        const workspaceSelector = document.getElementById('workspace-selector');
        if (workspaceSelector) {
            workspaceSelector.addEventListener('change', () => {
                loadKanbanData();
            });
        }
        await loadKanbanData();
        initializeAddProjectButtons();
        initializeProjectCardClicks();
    }
};

/**
 * Tải dữ liệu projects cho workspace hiện tại và render ra Kanban board.
 */
async function loadKanbanData() {
    const workspaceSelector = document.getElementById('workspace-selector');
    const workspaceNameEl = document.getElementById('workspaceName');
    const kanbanView = document.getElementById('kanban-view');

    if (!workspaceSelector) return;

    const workspaceId = workspaceSelector.value;
    if (!workspaceId) {
        kanbanView.querySelectorAll('.list-card').forEach(col => col.innerHTML = '');
        workspaceNameEl.textContent = "Please select a workspace";
        return;
    }

    // Cập nhật tên workspace
    workspaceNameEl.textContent = workspaceSelector.options[workspaceSelector.selectedIndex].text;

    try {
        const projects = await apiService.projects.getAll(workspaceId);
        renderProjects(projects);
    } catch (error) {
        console.error("Failed to load projects:", error);
    }
}

/**
 * Render danh sách các project vào các cột Kanban tương ứng.
 * @param {Array} projects - Mảng các đối tượng project từ API.
 */
function renderProjects(projects) {
    const kanbanView = document.getElementById('kanban-view');
    // Xóa tất cả các card cũ trước khi render
    kanbanView.querySelectorAll('.list-card').forEach(column => {
        column.innerHTML = '';
    });

    if (!projects || projects.length === 0) {
        // Có thể hiển thị thông báo "No projects found" ở đây
        return;
    }

    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        const column = kanbanView.querySelector(`.kanban__col[data-status="${project.status}"] .list-card`);
        if (column) {
            column.insertAdjacentHTML('beforeend', projectCard);
        }
    });

    // Khởi tạo lại chức năng kéo thả sau khi đã render xong
    initKanbanDragDrop();
    lucide.createIcons();
}

/**
 * Tạo chuỗi HTML cho một project card.
 * @param {object} project - Đối tượng project.
 * @returns {string} - Chuỗi HTML.
 */
function createProjectCard(project) {
    // 1. Render Tags
    const tagsHtml = project.tags && project.tags.length > 0
        ? `<div class="prj-card-tags-group">
               ${project.tags.map(tag => `<div class="prj-card-tag" style="background-color: ${tag.colorHex};"></div>`).join('')}
           </div>`
        : '';
    
    // 2. Render TaskStatics
    const taskProgressHtml = (project.totalTasks > 0)
        ? `<div class="prj-card-total-task prj-attribute">
               <i data-lucide="circle-check-big" class="prj-card-icon"></i>
               <span>${project.completedTasks || 0}</span>
               <span>/</span>
               <span>${project.totalTasks}</span>
           </div>`
        : '';
    
    // Logic tính toán countdown (ví dụ)
    const endDate = project.endDate ? new Date(project.endDate) : null;
    let countdownHtml = '';
    if (endDate) {
        const diffDays = Math.ceil((endDate - new Date()) / (1000 * 60 * 60 * 24));
        if (diffDays >= 0) {
            countdownHtml = `
            <div class="prj-card-coutdown prj-attribute">
                <i data-lucide="hourglass" class="prj-card-icon"></i>
                <span>${diffDays}d</span>
            </div>`;
        }
    }

    const membersHtml = project.members && project.members.length > 0
        ? `<div class="prj-card-members">
               ${project.members.map(member => `<img src="${member.avatarUrl || '../assets/images/avt-notion_1.png'}" alt="Member Avatar" class="prj-member">`).join('')}
           </div>`
        : '';

    return `
    <div class="project-card" draggable="true" data-project-id="${project.id}">
        <div class="prj-card-attributes">
            <!-- tags -->
            ${tagsHtml}
            <!-- project name -->
            <div class="prj-card-project-name prj-attribute">
                <label class="custom-checkbox">
                    <input type="checkbox" name="project-status" ${project.status === 'done' ? 'checked' : ''}>
                    <span class="custom-checkbox__checkmark round"></span>
                </label>
                <span>${project.name}</span>
            </div>
            <div class="prj-card-deadline prj-attribute">
                 <i data-lucide="clock" class="prj-card-icon"></i>
                 <span>${project.startDate || '...'}</span>
                 <span>-</span>
                 <span>${project.endDate || '...'}</span>
            </div>
            ${countdownHtml}
            ${taskProgressHtml}    
        </div>
        ${membersHtml}
    </div>`;
}

/**
 * Khởi tạo sự kiện cho các nút "Add Project".
 */
function initializeAddProjectButtons() {
    document.querySelectorAll('.add-project-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const column = e.target.closest('.kanban__col');
            const status = column.dataset.status;

            const projectName = prompt(`Enter new project name for "${status}" status:`);

            if (projectName && projectName.trim() !== '') {
                const workspaceId = document.getElementById('workspace-selector').value;
                try {
                    await apiService.projects.create(workspaceId, {
                        name: projectName.trim(),
                        status: status
                    });
                    // Tải lại toàn bộ board để cập nhật
                    await loadKanbanData();
                } catch (error) {
                    console.error("Failed to create project:", error);
                    alert("Error: Could not create the project.");
                }
            }
        });
    });
}

/**
 * Gán sự kiện click cho các project card để mở modal.
 * Sử dụng event delegation.
 */
function initializeProjectCardClicks() {
    const kanbanView = document.getElementById('kanban-view');
    kanbanView.addEventListener('click', (e) => {
        const projectCard = e.target.closest('.project-card');
        if (projectCard) {
            const projectId = projectCard.dataset.projectId;
            showProjectDetailModal();
            populateModalWithData(projectId);
        }
    });
}

/**
 * Khởi tạo chức năng kéo và thả cho các thẻ project.
 */
function initKanbanDragDrop() {
    const draggables = document.querySelectorAll('.project-card');
    const columns = document.querySelectorAll('.kanban__col .list-card');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', async () => {
            draggable.classList.remove('dragging');

            // Logic cập nhật trạng thái
            const projectId = draggable.dataset.projectId;
            const newColumn = draggable.closest('.kanban__col');
            const newStatus = newColumn.dataset.status;
            const workspaceId = document.getElementById('workspace-selector').value;

            try {
                // Gọi API để cập nhật trạng thái
                await apiService.projects.update(workspaceId, projectId, { status: newStatus });
                console.log(`Project ${projectId} moved to ${newStatus}`);
            } catch (error) {
                console.error('Failed to update project status:', error);
                // Nếu lỗi, nên tải lại board để đảm bảo tính nhất quán
                await loadKanbanData();
            }
        });
    });

    columns.forEach(column => {
        column.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(column, e.clientY);
            const dragging = document.querySelector('.dragging');
            if (dragging) { // Kiểm tra xem có phần tử đang kéo không
                if (afterElement == null) {
                    column.appendChild(dragging);
                } else {
                    column.insertBefore(dragging, afterElement);
                }
            }
        });
    });
}

/**
 * Helper function to determine where to place the dragged element within a column.
 * @param {HTMLElement} column - The column being dragged over.
 * @param {number} y - The clientY position of the mouse.
 * @returns {HTMLElement|null} - The element to insert before, or null to append at the end.
 */
function getDragAfterElement(column, y) {
    const draggableElements = [...column.querySelectorAll('.project-card:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

export default KanbanPage;