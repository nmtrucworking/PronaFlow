export function initializeCalendarPage() {
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
