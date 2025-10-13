// src/pages/KanbanPage.js

import { isAuthenticated } from '../auth/authService.js';
import { loadSidebarAndSetActiveLink } from '../components/Sidebar.js';
import { autoResizeTextarea } from '../utils/utils.js'; // Giả sử bạn có hàm này

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
                <span id="workspaceName">Study English</span>
            </div>
            <span class="workspace__description">The description for workspace</span>
        </div>

        <div class="divider"></div>

        <div class="frames frames--grid-2col">
            <!-- ==================== CALENDAR FRAME (PRONAFLOW AGENDA) - START ==================== -->
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

        <div class="kanban-view hide-scrollbar">
            <!--------------------------------------- Col: Temp  --------------------------------------->
            <div class="kanban__col">
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
                    <div class="project-card" draggable="true" data-project-id="proj_react_native">
                        <div class="prj-card-attributes">
                            <div class="prj-card-tags-group">
                                <div class="prj-card-tag" style="background-color: var(--cl-tag-default);"></div>
                                <div class="prj-card-tag" style="background-color: var(--cl-tag-blue);"></div>
                                <div class="prj-card-tag" style="background-color: var(--cl-tag-green);"></div>
                                <div class="prj-card-tag" style="background-color: var(--cl-tag-red);"></div>
                                <div class="prj-card-tag" style="background-color: var(--cl-tag-brown);"></div>
                            </div>
                            <div class="prj-card-project-name prj-attribute">
                                <label class="custom-checkbox">
                                    <input type="checkbox" name="" id="project-status">
                                    <span class="custom-checkbox__checkmark round"></span>
                                </label>
                                <span>project-name</span>
                            </div>
                            <div class="prj-card-deadline prj-attribute">
                                <i data-lucide="clock" class="prj-card-icon"></i>
                                <span>Jun 23, 2025</span>
                                <span>-</span>
                                <span>July 30, 2025</span>
                            </div>
                            <div class="prj-card-desct prj-attribute">
                                <i data-lucide="text" class="prj-card-icon"></i>
                            </div>
                            <div class="prj-card-total-task prj-attribute">
                                <i data-lucide="circle-check-big" class="prj-card-icon"></i>
                                <span>5</span>
                                <span>/</span>
                                <span>10</span>
                            </div>
                            <div class="prj-card-coutdown prj-attribute">
                                <i data-lucide="hourglass" class="prj-card-icon"></i>
                                <span>2d</span>
                            </div>
                        </div>
                        <div class="prj-card-members">
                            <img src="../assets/images/avt-notion_1.png" alt="" class="prj-member">
                            <img src="../assets/images/avt-notion_2.png" alt="" class="prj-member">
                            <img src="../assets/images/avt-notion_3.png" alt="" class="prj-member">
                        </div>
                    </div>

                    <div class="project-card" draggable="true" data-project-id="proj_react_native">
                        <div class="prj-card-attributes">
                            <div class="prj-card-tags-group">
                                <div class="prj-card-tag" style="background-color: var(--cl-tag-default);"></div>
                                <div class="prj-card-tag" style="background-color: var(--cl-tag-blue);"></div>
                                <div class="prj-card-tag" style="background-color: var(--cl-tag-green);"></div>
                                <div class="prj-card-tag" style="background-color: var(--cl-tag-red);"></div>
                                <div class="prj-card-tag" style="background-color: var(--cl-tag-brown);"></div>
                            </div>
                            <div class="prj-card-project-name prj-attribute">
                                <label class="custom-checkbox">
                                    <input type="checkbox" name="" id="project-status">
                                    <span class="custom-checkbox__checkmark round"></span>
                                </label>
                                <span>project-name</span>
                            </div>
                            <div class="prj-card-deadline prj-attribute">
                                <i data-lucide="clock" class="prj-card-icon"></i>
                                <span>Jun 23, 2025</span>
                                <span>-</span>
                                <span>July 30, 2025</span>
                            </div>
                            <div class="prj-card-desct prj-attribute">
                                <i data-lucide="text" class="prj-card-icon"></i>
                            </div>
                            <div class="prj-card-total-task prj-attribute">
                                <i data-lucide="circle-check-big" class="prj-card-icon"></i>
                                <span>5</span>
                                <span>/</span>
                                <span>10</span>
                            </div>
                            <div class="prj-card-coutdown prj-attribute">
                                <i data-lucide="hourglass" class="prj-card-icon"></i>
                                <span>2d</span>
                            </div>
                        </div>
                        <div class="prj-card-members">
                            <img src="../assets/images/avt-notion_1.png" alt="" class="prj-member">
                            <img src="../assets/images/avt-notion_2.png" alt="" class="prj-member">
                            <img src="../assets/images/avt-notion_3.png" alt="" class="prj-member">
                        </div>
                    </div>

                    <div class="project-card" draggable="true" data-project-id="proj_react_native">
                        <div class="prj-card-attributes">
                            <div class="prj-card-tags-group">
                                <div class="prj-card-tag" style="background-color: var(--cl-tag-default);"></div>
                                <div class="prj-card-tag" style="background-color: var(--cl-tag-blue);"></div>
                                <div class="prj-card-tag" style="background-color: var(--cl-tag-green);"></div>
                                <div class="prj-card-tag" style="background-color: var(--cl-tag-red);"></div>
                                <div class="prj-card-tag" style="background-color: var(--cl-tag-brown);"></div>
                            </div>
                            <div class="prj-card-project-name prj-attribute">
                                <label class="custom-checkbox">
                                    <input type="checkbox" name="" id="project-status">
                                    <span class="custom-checkbox__checkmark round"></span>
                                </label>
                                <span>project-name</span>
                            </div>
                            <div class="prj-card-deadline prj-attribute">
                                <i data-lucide="clock" class="prj-card-icon"></i>
                                <span>Jun 23, 2025</span>
                                <span>-</span>
                                <span>July 30, 2025</span>
                            </div>
                            <div class="prj-card-desct prj-attribute">
                                <i data-lucide="text" class="prj-card-icon"></i>
                            </div>
                            <div class="prj-card-total-task prj-attribute">
                                <i data-lucide="circle-check-big" class="prj-card-icon"></i>
                                <span>5</span>
                                <span>/</span>
                                <span>10</span>
                            </div>
                            <div class="prj-card-coutdown prj-attribute">
                                <i data-lucide="hourglass" class="prj-card-icon"></i>
                                <span>2d</span>
                            </div>
                        </div>
                        <div class="prj-card-members">
                            <img src="../assets/images/avt-notion_1.png" alt="" class="prj-member">
                            <img src="../assets/images/avt-notion_2.png" alt="" class="prj-member">
                            <img src="../assets/images/avt-notion_3.png" alt="" class="prj-member">
                        </div>
                    </div>
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
            <!--------------------------------------- Col: Not Started --------------------------------------->
            <div class="kanban__col">
                <div class="kanban-column__header">
                    <button class="btn icon-btn">
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
                    <div class="project-card" draggable="true" data-project-id="proj_react_native">
                        <div class="prj-card-attributes">
                            <div class="prj-card-tags-group">
                                <div class="prj-card-tag" style="background-color: #16a085;"></div>
                            </div>
                            <div class="prj-card-project-name prj-attribute">
                                <label class="custom-checkbox">
                                    <input type="checkbox" id="project-status">
                                    <span class="custom-checkbox__checkmark round"></span>
                                </label>
                                <span>Học React Native</span>
                            </div>
                            <div class="prj-card-deadline prj-attribute">
                                <i data-lucide="clock" class="prj-card-icon"></i>
                                <span>Aug 1, 2025</span>
                                <span>-</span>
                                <span>—</span>
                            </div>
                            <div class="prj-card-desct prj-attribute">
                                <i data-lucide="text" class="prj-card-icon"></i>
                            </div>
                            <div class="prj-card-total-task prj-attribute">
                                <i data-lucide="circle-check-big" class="prj-card-icon"></i>
                                <span>3</span>
                                <span>/</span>
                                <span>10</span>
                            </div>
                            <div class="prj-card-coutdown prj-attribute">
                                <i data-lucide="hourglass" class="prj-card-icon"></i>
                                <span></span>
                            </div>
                        </div>
                        <div class="prj-card-members">
                            <img src="../assets/images/avt-notion_1.png" alt="" class="prj-member">
                        </div>
                    </div>

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
            <!--------------------------------------- Col: In Progress --------------------------------------->
            <div class="kanban__col hide-scrollbar">
                <div class="kanban-column__header">
                    <button class="btn icon-btn">
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
            <div class="kanban__col hide-scrollbar">
                <div class="kanban-column__header">
                    <button class="btn icon-btn">
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
                    <div class="project-card" draggable="true">
                        <div class="prj-card-attributes">
                            <div class="prj-card-tags-group">
                                <div class="prj-card-tag" style="background-color: #27ae60;"></div>
                                <div class="prj-card-tag" style="background-color: #c0392b;"></div>
                            </div>
                            <div class="prj-card-project-name prj-attribute">
                                <label class="custom-checkbox">
                                    <input type="checkbox" id="project-status">
                                    <span class="custom-checkbox__checkmark round"></span>
                                </label>
                                <span>API Payment Gateway</span>
                            </div>
                            <div class="prj-card-deadline prj-attribute">
                                <i data-lucide="clock" class="prj-card-icon"></i>
                                <span>Jul 15, 2025</span>
                                <span>-</span>
                                <span>Aug 10, 2025</span>
                            </div>
                            <div class="prj-card-desct prj-attribute">
                                <i data-lucide="text" class="prj-card-icon"></i>
                            </div>
                            <div class="prj-card-total-task prj-attribute">
                                <i data-lucide="circle-check-big" class="prj-card-icon"></i>
                                <span>6</span>
                                <span>/</span>
                                <span>10</span>
                            </div>
                            <div class="prj-card-coutdown prj-attribute">
                                <i data-lucide="hourglass" class="prj-card-icon"></i>
                                <span>7d</span>
                            </div>
                        </div>
                        <div class="prj-card-members">
                            <img src="../assets/images/avt-notion_1.png" alt="" class="prj-member">
                            <img src="../assets/images/avt-notion_3.png" alt="" class="prj-member">
                        </div>
                    </div>

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
            <div class="kanban__col hide-scrollbar">
                <div class="kanban-column__header">
                    <button class="btn icon-btn">
                        <i data-lucide="plus" class="btn-icon"></i>
                    </button>
                    <h3>Done</h3>
                    <button class="btn icon-btn btn-kanban-col-options-done" popovertarget="kanban-col-options-done">
                        <i data-lucide="ellipsis-vertical" class="btn-icon"></i>
                    </button>
                </div>
                <div class="divider"></div>
                <div class="list-card hide-scrollbar">
                    <div class="project-card" draggable="true">
                        <div class="prj-card-attributes">
                            <div class="prj-card-tags-group">
                                <div class="prj-card-tag" style="background-color: #f39c12;"></div>
                            </div>
                            <div class="prj-card-project-name prj-attribute">
                                <label class="custom-checkbox">
                                    <input type="checkbox" id="project-status">
                                    <span class="custom-checkbox__checkmark round"></span>
                                </label>
                                <span>Dự án Freelance cho 'The Coffee House'</span>
                            </div>
                            <div class="prj-card-deadline prj-attribute">
                                <i data-lucide="clock" class="prj-card-icon"></i>
                                <span>May 1, 2025</span>
                                <span>-</span>
                                <span>Jun 30, 2025</span>
                            </div>
                            <div class="prj-card-desct prj-attribute">
                                <i data-lucide="text" class="prj-card-icon"></i>
                            </div>
                            <div class="prj-card-total-task prj-attribute">
                                <i data-lucide="circle-check-big" class="prj-card-icon"></i>
                                <span>10</span>
                                <span>/</span>
                                <span>10</span>
                            </div>
                            <div class="prj-card-coutdown prj-attribute">
                                <i data-lucide="hourglass" class="prj-card-icon"></i>
                                <span>0d</span>
                            </div>
                        </div>
                        <div class="prj-card-members">
                            <img src="../assets/images/avt-notion_1.png" alt="" class="prj-member">
                        </div>
                    </div>

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

        // All logic from workspace.js is moved here
        initializeKanbanPageFunctions();
        
        // Initialize drag and drop for Kanban cards
        initKanbanDragDrop();

        if (window.lucide) {
            lucide.createIcons();
        }
    }
};

/**
 * Initializes all necessary functions for the Kanban page.
 * This function replaces the old 'refreshKanbanFunctions'.
 */
function initializeKanbanPageFunctions() {
    initWorkspaceToggle('.toggle-workspace-list-btn');
    autoResizeTextarea('textarea.auto-resize'); // Assuming you have this utility function
    // Any other initializations for the Kanban page can go here
}

/**
 * Toggles the visibility of workspace project lists.
 * @param {string} selector - The CSS selector for the toggle buttons.
 */
function initWorkspaceToggle(selector) {
    document.querySelectorAll(selector).forEach(btn => {
        btn.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const content = document.getElementById(targetId);
            if (!content) return;

            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            content.hidden = isExpanded;
            this.setAttribute('aria-expanded', String(!isExpanded));
            
            const icon = this.querySelector('.icon-toggle');
            if (icon) {
                icon.classList.toggle('rotated-icon', !isExpanded);
            }
        });
    });
}

/**
 * Initializes drag and drop functionality for the Kanban board.
 */
function initKanbanDragDrop() {
    const draggables = document.querySelectorAll('.project-card');
    const columns = document.querySelectorAll('.kanban__col .list-card');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    columns.forEach(column => {
        column.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(column, e.clientY);
            const dragging = document.querySelector('.dragging');
            if (afterElement == null) {
                column.appendChild(dragging);
            } else {
                column.insertBefore(dragging, afterElement);
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