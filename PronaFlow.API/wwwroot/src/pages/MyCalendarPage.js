import AuthPage from './AuthPage.js'; // include extension if needed
import { loadSidebarAndSetActiveLink } from '../components/Sidebar.js';
import { isAuthenticated } from '../auth/authService.js';

const MyCalendarPage = {
    render: async () => {
        // Check Authorizator
        if (!isAuthenticated()) {
        window.location.hash = '#/login'; 
        return ''; 
    }

        return `<div id="sidebar-container"></div>

    <main id="main" class="main my-calendar">
        <div class="my-calendar-layout">
            <!-- main-calendar -->
            <div id="calendar-main-wrap" class="calendar-main-wrap">
                <div id="calendar" class="calendar">
                    <!-- JS'll fill -->
                </div>
            </div>
            <!-- Sidebar bên phải chứa lịch nhỏ và bộ lọc -->
            <aside id="calendar-sidebar" class="calendar-sidebar">
                <div class="right-sidebar-content">
                    <!-- mini-calendar -->
                    <div id="mini-calendar" class="mini-calendar">
                        <!-- js will load data here -->
                    </div>
                    <div class="divider"></div>
                    <!-- filter -->
                    <div class="filter-section">
                        <!-- NEW: Search bar -->
                        <div class="search-bar filter-search-bar">
                             <i class="search-bar__icon" data-lucide="search"></i>
                             <input type="text" class="search-bar__input" placeholder="Search projects...">
                        </div>

                        <div class="filter-card">
                            <!-- Workspace-1 -->
                            <div class="card-header" id="filler__wsp_1">
                                <button type="button" class="toggle-workspace-list-btn" data-target="prjs-wsp-1"
                                    aria-controls="prjs-wsp-1" aria-expanded="false">
                                    <i class="icon-toggle btn-hover" data-open="false" data-lucide="app-window"></i>
                                    <span class="item-filter-name">Workspace 1</span>
                                </button>
                                <input type="checkbox" class="" id="show-all-projects-btn"
                                    aria-label="Show all projects" checked>
                            </div>
                            <ul id="prjs-wsp-1" class="card-body" aria-labelledby="filler__wsp_1" >
                                <li class="project-filter-options">
                                    <input type="checkbox" name="" id="prj-1" class="project-displayed" checked>
                                    <span class="project-color-dot" style="background-color: #2D5B9A;"></span>
                                    <label for="prj-1" class="item-filter-name">Project-1</label>
                                </li>
                                <li class="project-filter-options">
                                    <input type="checkbox" name="" id="prj-2" class="project-displayed" checked>
                                    <span class="project-color-dot" style="background-color: #1fcf34;"></span>
                                    <label for="prj-2" class="item-filter-name">Project-2</label>
                                </li>
                                <li class="project-filter-options">
                                    <input type="checkbox" name="" id="prj-3" class="project-displayed">
                                    <span class="project-color-dot" style="background-color: #ffca37;"></span>
                                    <label for="prj-3" class="item-filter-name">Project-3</label>
                                </li>
                            </ul>

                            <!-- Workspace-2-->
                            <div class="card-header" id="filler__wsp_2">
                                <button type="button" class="toggle-workspace-list-btn" data-target="prjs-wsp-2"
                                    aria-controls="prjs-wsp-2" aria-expanded="false">
                                    <i class="icon-toggle btn-hover" data-open="false" data-lucide="app-window"></i>
                                    <span class="item-filter-name">Workspace 2</span>
                                </button>
                                <input type="checkbox" class="" id="show-all-projects-btn-2"
                                    aria-label="Show all projects" checked>
                            </div>
                            <ul id="prjs-wsp-2" class="card-body" aria-labelledby="filler__wsp_2">
                                <li class="project-filter-options">
                                     <input type="checkbox" name="" id="prj-4" class="project-displayed" checked>
                                     <span class="project-color-dot" style="background-color: #a145ec;"></span>
                                     <label for="prj-4" class="item-filter-name">Project-4</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    </main>

    <button id="sidebar-toggle-button" class="sidebar-toggle">
        <i class="icon-open" data-lucide="chevrons-left"></i>
        <i class="icon-closed" data-lucide="chevrons-right"></i>
    </button>
    
    <!-- =============================================================== -->
    <!--                  NEW: POPOVER COMPONENTS                        -->
    <!-- =============================================================== -->

    <!-- Popover for Event Details -->
    <div id="eventDetailPopover" class="popover" popover>
        <div class="popover__header">
            <h3 class="popover__title">Event Details</h3>
            <button class="btn-exit" popovertarget="eventDetailPopover" popovertargetaction="hide"><i data-lucide="x"></i></button>
        </div>
        <div class="popover__body event-popover__body">
            <p class="event-popover__title"><strong>Finalize Q3 Report</strong></p>
            <div class="event-popover__meta">
                <i data-lucide="clock"></i>
                <span>September 5, 2025, 10:00 AM - 11:00 AM</span>
            </div>
            <div class="event-popover__meta">
                <span class="project-color-dot" style="background-color: #1fcf34;"></span>
                <span>Project-2</span>
            </div>
        </div>
        <div class="popover__footer">
            <button class="btn btn--secondary btn--small">Edit</button>
        </div>
    </div>
    
    <!-- Popover for Creating a New Event -->
    <div id="createEventPopover" class="popover" popover>
         <div class="popover__header">
            <h3 class="popover__title">Create New Event</h3>
            <button class="btn-exit" popovertarget="createEventPopover" popovertargetaction="hide"><i data-lucide="x"></i></button>
        </div>
        <form class="popover__body">
            <div class="form-box">
                <label for="newEventTitle" class="form-label">Title</label>
                <input type="text" id="newEventTitle" class="form-input" placeholder="e.g., Marketing sync-up">
            </div>
             <div class="form-box">
                <label for="newEventProject" class="form-label">Project</label>
                <select id="newEventProject" class="form-input">
                    <option value="prj1">Project-1</option>
                    <option value="prj2">Project-2</option>
                    <option value="prj3">Project-3</option>
                    <option value="prj4">Project-4</option>
                </select>
            </div>
        </form>
         <div class="popover__footer">
            <button class="btn btn--tertiary" popovertarget="createEventPopover" popovertargetaction="hide">Cancel</button>
            <button class="btn btn--primary">Save</button>
        </div>
    </div>


    <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://unpkg.com/lucide@latest/dist/lucide.min.js"></script>
`;
    },
    
    after_render: async () => {
        if (!isAuthenticated()) return;

        await loadSidebarAndSetActiveLink();

        initializeCalendarPage();
    }
};

function initializeCalendarPage() {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;

    // Lấy các element của popover để tái sử dụng
    const eventDetailPopover = document.getElementById('eventDetailPopover');
    const createEventPopover = document.getElementById('createEventPopover');

    const mainCalendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today addEventButton', // Thêm nút "Add Event" tùy chỉnh
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        editable: true,
        selectable: true,
        events: [
            // Dữ liệu sự kiện mẫu của bạn
            {
                id: 'evt1',
                title: 'Team Meeting',
                start: new Date().toISOString().substr(0, 10) + 'T10:30:00',
                end: new Date().toISOString().substr(0, 10) + 'T12:30:00',
                extendedProps: {
                    project: 'Project-1',
                    color: '#2D5B9A'
                }
            },
            {
                id: 'evt2',
                title: 'Lunch with Client',
                start: '2025-08-15',
                end: '2025-08-20',
                color: '#F79009',
                extendedProps: {
                    project: 'Project-2',
                    color: '#1fcf34'
                }
            },
            {
                id: 'evt3',
                title: 'Project Deadline',
                start: '2025-08-20',
                allDay: true,
                color: '#ff4d40',
                display: 'background'
            }
        ],

        /**
         * Callback này được gọi khi người dùng nhấp vào một sự kiện.
         * @param {object} info - Thông tin về sự kiện được nhấp.
         */
        eventClick: function (info) {
            info.jsEvent.preventDefault(); // Ngăn chặn hành vi mặc định

            if (!eventDetailPopover) return;

            // 1. Đổ dữ liệu của sự kiện vào popover
            const titleEl = eventDetailPopover.querySelector('.event-popover__title strong');
            const timeEl = eventDetailPopover.querySelector('.event-popover__meta span');
            const projectEl = eventDetailPopover.querySelector('.event-popover__meta:last-child span:last-child');
            const projectDotEl = eventDetailPopover.querySelector('.event-popover__meta .project-color-dot');

            titleEl.textContent = info.event.title;
            timeEl.textContent = info.event.start.toLocaleString(); // Định dạng thời gian cho dễ đọc

            if (info.event.extendedProps.project) {
                projectEl.textContent = info.event.extendedProps.project;
                projectDotEl.style.backgroundColor = info.event.extendedProps.color || '#80c8ff';
                projectEl.parentElement.hidden = false;
            } else {
                projectEl.parentElement.hidden = true;
            }


            // 2. Định vị và hiển thị popover ngay bên cạnh sự kiện
            eventDetailPopover.style.top = `${info.jsEvent.clientY}px`;
            eventDetailPopover.style.left = `${info.jsEvent.clientX}px`;
            eventDetailPopover.showPopover();
        },

        /**
         * Callback này được gọi khi người dùng chọn một hoặc nhiều ngày.
         * @param {object} info - Thông tin về khoảng thời gian được chọn.
         */
        select: function (info) {
            if (!createEventPopover) return;

            // Tùy chọn: Điền sẵn ngày bắt đầu vào form
            // const startDateInput = createEventPopover.querySelector('#newEventStartDate');
            // if(startDateInput) startDateInput.value = info.startStr;

            // Hiển thị popover tạo sự kiện ở trung tâm màn hình
            createEventPopover.style.top = '50%';
            createEventPopover.style.left = '50%';
            createEventPopover.style.transform = 'translate(-50%, -50%)';
            createEventPopover.showPopover();
        },

        // Thêm nút "Add Event" vào toolbar
        customButtons: {
            addEventButton: {
                text: '+ New Event',
                click: function () {
                    if (!createEventPopover) return;
                    // Hiển thị popover ở trung tâm
                    createEventPopover.style.top = '50%';
                    createEventPopover.style.left = '50%';
                    createEventPopover.style.transform = 'translate(-50%, -50%)';
                    createEventPopover.showPopover();
                }
            }
        }
    });
    mainCalendar.render();

    const miniCalendarEl = document.getElementById('mini-calendar');
    const miniCalendar = new FullCalendar.Calendar(miniCalendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev',
            center: 'title',
            right: 'next'
        },
        dateClick: function (info) {
            mainCalendar.gotoDate(info.date);
        }
    });
    miniCalendar.render();
}

export default MyCalendarPage;