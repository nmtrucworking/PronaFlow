/**
 * =====================================================================================
 * ====================             PRONAFLOW MAIN SCRIPT             ====================
 * =====================================================================================
 * Tệp này điều khiển tất cả các tương tác chính của ứng dụng, bao gồm:
 * - Khởi tạo trang và các thành phần chung (sidebar, theme).
 * - Quản lý việc hiển thị/ẩn các modal.
 * - Xử lý các luồng tương tác phức tạp như modal lồng nhau (Project -> Task).
 * - Khởi tạo các chức năng riêng cho từng trang cụ thể (Kanban, My Tasks, Calendar...).
 * =====================================================================================
 */

import { initializePageFunctions } from "./core/initialize.js";
import { loadSidebarAndSetActiveLink, handleSidebarState } from "./core/sidebar.js";
import { closeAllModalsAndPopovers } from "../assets/js/modals/modals.js"

// Biến toàn cục để theo dõi ID của task đang được chọn trên trang "My Tasks"
let currentSelectedTaskId = null;

// =====================================================================================
// KHỞI TẠO CHÍNH KHI DOM ĐÃ TẢI XONG
// =====================================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Create shared backdrop
    const sharedBackdrop = document.createElement('div');
    sharedBackdrop.id = 'sharedBackdrop';
    sharedBackdrop.className = 'shared-backdrop';
    document.body.appendChild(sharedBackdrop);
    
    // Tải sidebar và khởi tạo các chức năng của nó
    // loadSidebarAndSetActiveLink();
    // handleSidebarState();
    
    // Khởi tạo các hàm tương tác cho trang hiện tại
    initializePageFunctions();
    
    // Gán sự kiện click cho backdrop để đóng tất cả các modal/popover
    sharedBackdrop.addEventListener('click', closeAllModalsAndPopovers);
});

// =====================================================================================
// LOGIC CHÍNH CHO TASK DETAIL MODAL (SIDEBAR)
// =====================================================================================

/**
 * Hàm hiển thị Task Detail Modal.
 * @param {string} taskId - ID của task cần hiển thị.
 */
function showTaskDetailModal(taskId) {
    const taskModal = document.getElementById('taskDetailModal');
    const projectModal = document.getElementById('projectDetailModal');

    if (!taskModal) {
        console.error("Task Detail Modal chưa được nạp vào DOM.");
        return;
    }

    console.log(`Hiển thị chi tiết cho Task ID: ${taskId}`);

    taskModal.classList.add('is-visible');
    if (projectModal) {
        projectModal.classList.add('is-shifted');
    }

    updateBackdropVisibility();
}

function setupProjectModalInteractions() {
    const projectModal = document.getElementById('projectDetailModal');
    if (!projectModal) return;

    const modalContent = projectModal.querySelector('.modal__content');
    const confirmDeleteModal = projectModal.querySelector('#confirmDeleteProjectModal');

    const showModal = (projectId) => {
        console.log("Opening project details for:", projectId);
        modalContent.classList.add('is-loading');
        projectModal.classList.add('is-visible');
        updateBackdropVisibility();

        setTimeout(() => {
            modalContent.classList.remove('is-loading');
        }, 500);
    };

    const hideModal = () => {
        projectModal.classList.remove('is-visible', 'is-shifted');
        closeAllModalsAndPopovers();
    };

    document.body.addEventListener('click', (event) => {
        const projectCard = event.target.closest('.project-card[data-project-id]');
        const projectLink = event.target.closest('.task__project-link[data-project-id]');
        const triggerElement = projectCard || projectLink;
        if (triggerElement) {
            event.preventDefault();
            event.stopPropagation();
            showModal(triggerElement.dataset.projectId);
        }
    });

    projectModal.querySelector('#closeProjectDetailModal').addEventListener('click', hideModal);
    document.addEventListener('keydown', e => e.key === 'Escape' && projectModal.classList.contains('is-visible') && hideModal());

    const openTaskDetailButton = document.getElementById('openTaskDetailBtn');

    if (openTaskDetailButton) {
        openTaskDetailButton.addEventListener('click', (event) => {
            const taskId = openTaskDetailButton.dataset.taskId || 'task_temp_id';
            if (typeof showTaskDetailModal === 'function') {
                showTaskDetailModal(taskId);
            }
        });
    }

    projectModal.querySelectorAll('.inline-editable').forEach(enableInlineEditing);

    // Xóa logic popover, vì HTML đã xử lý
    // setupConfirmDeleteInteraction(confirmDeleteModal); // Giữ lại nếu confirm delete là modal

    modalContent.addEventListener('keydown', (event) => {
        if (event.target.matches('.add-new-task') && event.key === 'Enter') {
            event.preventDefault();
            const input = event.target;
            const taskName = input.value.trim();
            if (taskName === '') return;

            const taskList = input.closest('.project-modal-section').querySelector('.task-list');
            if (!taskList) return;

            taskList.classList.remove('task-list--empty');
            const emptyState = taskList.querySelector('.empty-state-compact');
            if (emptyState) emptyState.parentElement.style.display = 'none';

            const newTaskId = `task_${Date.now()}`;
            const taskItemHTML = `
            <div class="task-item">
                <label class="custom-checkbox"><input type="checkbox"><span class="custom-checkbox__checkmark"></span></label>
                <div class="project__task-card" data-task-id="${newTaskId}">
                    <input type="text" class="task__name" value="${taskName}">
                    <div>
                        <button class="task-card__opt-icon btn-hover"><i data-lucide="external-link"></i></button>
                        <button class="task-card__opt-icon btn-hover" popovertarget="taskActionsPopover-${newTaskId}"><i data-lucide="ellipsis-vertical"></i></button>
                         <!-- Cần popover tương ứng trong HTML hoặc tạo bằng JS -->
                    </div>
                </div>
            </div>`;
            const addInputWrapper = input.parentElement;
            addInputWrapper.insertAdjacentHTML('beforebegin', taskItemHTML);
            lucide.createIcons({ nodes: [addInputWrapper.previousElementSibling] });
            input.value = '';
        }
    });
}