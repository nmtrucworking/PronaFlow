import { adminApi } from '../services/adminApiService.js';

let allProjects = [];

function renderProjectRow(project) {
    // Giả định API trả về một cấu trúc DTO phẳng
    return `
        <tr>
            <td>${project.projectName}</td>
            <td>${project.workspaceName}</td>
            <td>${project.workspaceOwner}</td>
            <td class="text-center">${project.memberCount}</td>
            <td><span class="status-badge status-${project.status.toLowerCase()}">${project.status}</span></td>
            <td>${new Date(project.createdAt).toLocaleDateString()}</td>
            <td class="actions">
                <button class="btn-action btn-view" data-projectid="${project.id}">View</button>
                <button class="btn-action ${project.isArchived ? 'btn-restore' : 'btn-archive'}" data-projectid="${project.id}" data-action="${project.isArchived ? 'unarchive' : 'archive'}">
                    ${project.isArchived ? 'Unarchive' : 'Archive'}
                </button>
            </td>
        </tr>
    `;
}

function renderTable(projects) {
    const tableBody = document.querySelector("#projects-table tbody");
    if (!tableBody) return;
    tableBody.innerHTML = projects.map(renderProjectRow).join('');
}

async function handleArchiveAction(projectId, action) {
    // Logic tương tự cho việc lưu trữ/hủy lưu trữ
    if (confirm(`Are you sure you want to ${action} this project?`)) {
        try {
            await adminApi.put(`/projects/${projectId}/${action}`);
            await loadProjects();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }
}

function applyFilters() {
    const searchTerm = document.getElementById('project-search-input').value.toLowerCase();
    const filteredProjects = allProjects.filter(p => 
        p.projectName.toLowerCase().includes(searchTerm) || 
        p.workspaceName.toLowerCase().includes(searchTerm)
    );
    renderTable(filteredProjects);
}

async function loadProjects() {
    try {
        allProjects = await adminApi.get('/projects');
        renderTable(allProjects);
    } catch (error) {
        console.error("Failed to load projects:", error);
    }
}

export function initProjectsPage() {
    loadProjects();

    document.getElementById('project-search-input').addEventListener('keyup', applyFilters);

    document.getElementById('projects-table').addEventListener('click', (event) => {
        const target = event.target.closest('button.btn-action');
        if (!target) return;

        const projectId = target.dataset.projectid;
        if (target.classList.contains('btn-archive') || target.classList.contains('btn-restore')) {
            handleArchiveAction(projectId, target.dataset.action);
        }
        // Thêm logic cho nút "View" (có thể mở một modal read-only)
    });
}
