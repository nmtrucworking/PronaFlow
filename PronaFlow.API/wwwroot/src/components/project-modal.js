// File: PronaFlow.API/wwwroot/src/components/project-modal.js

import apiService from '../api/apiService.js';
import { showToast } from '../utils/ui.js';

// Biến cục bộ để lưu trữ project ID hiện tại đang được hiển thị
let currentProjectId = null;

/**
 * Nạp HTML cho Project Detail Modal và thiết lập các sự kiện.
 * Hàm này chỉ nên được gọi một lần.
 */
export function initializeProjectDetailModal() {
    if (document.getElementById('projectDetailModal')) return;

    fetch('./src/components/project-detail-modal.html')
        .then(response => response.ok ? response.text() : Promise.reject('File not found'))
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            setupProjectModalInteractions();
            if (window.lucide) {
                lucide.createIcons();
            }
        })
        .catch(error => console.warn('Could not load project detail modal template.', error));
}

/**
 * Gán các sự kiện tương tác cho Project Detail Modal.
 */
function setupProjectModalInteractions() {
    const modal = document.getElementById('projectDetailModal');
    const closeButton = document.getElementById('closeProjectDetailModal');

    if (closeButton) {
        closeButton.addEventListener('click', () => hideProjectDetailModal());
    }

    // Thêm logic cho việc thêm task mới ngay trong modal
    modal.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter' && e.target.classList.contains('add-new-task')) {
            const taskInput = e.target;
            const taskListName = taskInput.value.trim();
            const taskListElement = taskInput.closest('.project-modal-section');
            const taskListId = taskListElement.dataset.taskListId;

            if (taskListName && taskListId && currentProjectId) {
                try {
                    await apiService.tasks.create(taskListId, { name: taskListName });
                    showToast('Task created!', 'success');
                    // Tải lại chỉ nội dung của modal để cập nhật danh sách task
                    await populateModalWithData(currentProjectId);
                } catch (error) {
                    console.error('Failed to create task:', error);
                    showToast('Failed to create task.', 'error');
                }
            }
        }
    });
}

/**
 * Hiển thị Project Detail Modal.
 */
export function showProjectDetailModal() {
    const modal = document.getElementById('projectDetailModal');
    const backdrop = document.getElementById('sharedBackdrop'); // Giả sử bạn có backdrop này
    if (modal) {
        modal.classList.add('is-visible');
        if(backdrop) backdrop.classList.add('is-visible');
    }
}

/**
 * Ẩn Project Detail Modal.
 */
export function hideProjectDetailModal() {
    const modal = document.getElementById('projectDetailModal');
    const backdrop = document.getElementById('sharedBackdrop');
    if (modal) {
        modal.classList.remove('is-visible');
         if(backdrop) backdrop.classList.remove('is-visible');
        // Reset trạng thái loading
        modal.classList.remove('is-loading');
    }
}

/**
 * Lấy dữ liệu chi tiết của một dự án và đổ vào modal.
 * @param {string} projectId - ID của dự án cần hiển thị.
 */
export async function populateModalWithData(projectId) {
    const modal = document.getElementById('projectDetailModal');
    if (!modal) return;

    currentProjectId = projectId;
    modal.classList.add('is-loading'); // Hiển thị skeleton loader

    try {
        const workspaceId = document.getElementById('workspace-selector').value;

        // Gọi đồng thời nhiều API để tăng tốc độ tải
        const [project, taskLists] = await Promise.all([
            apiService.projects.getById(workspaceId, projectId),
            apiService.utils.get(`/projects/${projectId}/tasklists`) // API mới cần tạo
        ]);

        // Đổ dữ liệu project
        modal.querySelector('.project-detail__title .inline-editable__display').textContent = project.name;
        modal.querySelector('#project_description').textContent = project.description || '';
        
        // Render các giai đoạn (Task Lists) và các công việc (Tasks)
        const mainContent = modal.querySelector('.modal__main');
        // Xóa các task list cũ
        mainContent.querySelectorAll('.project-modal-section[data-task-list-id]').forEach(el => el.remove());
        
        for (const taskList of taskLists) {
            // Lấy tasks cho từng task list
            const tasks = await apiService.utils.get(`/projects/${projectId}/tasks?taskListId=${taskList.id}`); // API mới cần tạo
            
            const taskListHtml = createTaskListhtml(taskList, tasks);
            mainContent.insertAdjacentHTML('beforeend', taskListHtml);
        }

        if (window.lucide) {
            lucide.createIcons();
        }

    } catch (error) {
        console.error("Failed to populate project modal:", error);
        showToast("Could not load project details.", "error");
        hideProjectDetailModal();
    } finally {
        modal.classList.remove('is-loading'); // Ẩn skeleton loader
    }
}

/**
 * Tạo HTML cho một giai đoạn (task list) và các công việc bên trong nó.
 * @param {object} taskList - Dữ liệu của Task List.
 * @param {Array} tasks - Mảng các công việc thuộc Task List đó.
 * @returns {string} - Chuỗi HTML.
 */
function createTaskListhtml(taskList, tasks) {
    const tasksHtml = tasks.length > 0
        ? tasks.map(task => `
            <div class="task-item ${task.status === 'done' ? 'is-completed' : ''}" data-task-id="${task.id}">
                <label class="custom-checkbox">
                    <input type="checkbox" ${task.status === 'done' ? 'checked' : ''}>
                    <span class="custom-checkbox__checkmark"></span>
                </label>
                <div class="project__task-card">
                    <input type="text" class="task__name" value="${task.name}">
                    <div class="task-card__action-btns">
                        <button class="task-card__opt-icon btn-hover"><i data-lucide="external-link"></i></button>
                    </div>
                </div>
            </div>
        `).join('')
        : `<div class="task-list--empty">
               <div class="empty-state-compact">
                   <i data-lucide="check-square"></i>
                   <span>No tasks yet.</span>
               </div>
           </div>`;

    return `
        <div class="project-modal-section" data-task-list-id="${taskList.id}">
            <div class="project-modal-section__title task-list-title">
                <div class="left-col"><i data-lucide="square-check-big"></i></div>
                <div class="inline-editable">
                    <div class="inline-editable__display">${taskList.name}</div>
                </div>
            </div>
            <div class="task-list">${tasksHtml}</div>
            <div class="add-new-task-input">
                <input type="text" class="add-new-task" placeholder="+ Add new task">
            </div>
        </div>
    `;
}