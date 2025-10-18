import { adminApi } from '../services/adminApiService.js';

let allUsers = [];

function renderTable(users) {
    const tableBody = document.querySelector('#users-table tbody');
    if (!tableBody) return;

    tableBody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td><span class="role-badge role-${user.role.toLowerCase()}">${user.role}</span></td>
            <td>${new Date(user.createdAt).toLocaleDateString()}</td>
            <td>
                <span class="status-badge ${user.isDeleted ? 'status-inactive' : 'status-active'}">
                    ${user.isDeleted ? 'Inactive' : 'Active'}
                </span>
            </td>
            <td class="actions">
                <button class="btn-action" data-userid="${user.id}" data-action="edit" data-current-role="${user.role}">Edit Role</button>
                <button class="btn-action btn-danger" data-userid="${user.id}" data-action="${user.isDeleted ? 'restore' : 'deactivate'}">
                    ${user.isDeleted ? 'Restore' : 'Deactivate'}
                </button>
            </td>
        </tr>`).join('');
}

async function handleEditRole(userId, currentRole) {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (confirm(`Are you sure you want to change this user's role to '${newRole}'?`)) {
        try {
            await adminApi.put(`/users/${userId}/role`, { role: newRole });
            await loadUsers();
        } catch (error) {
            console.error(`Failed to update role for user ${userId}:`, error);
            alert('Error updating role. Please check the console.');
        }
    }
}

async function handleDeactivateRestore(userId, action) {
    const confirmationText = action === 'deactivate'
        ? 'Are you sure you want to deactivate this user?'
        : 'Are you sure you want to restore this user?';

    if (confirm(confirmationText)) {
        try {
            if (action === 'deactivate') {
                await adminApi.delete(`/users/${userId}`);
            } else {
                await adminApi.put(`/users/${userId}/restore`, {});
            }
            await loadUsers();
        } catch (error) {
            console.error(`Failed to ${action} user ${userId}:`, error);
            alert(`Error performing action. Please check the console.`);
        }
    }
}

function applyFilters() {
    const searchTerm = document.getElementById('user-search-input').value.toLowerCase();
    const roleFilter = document.getElementById('role-filter').value;

    const filteredUsers = allUsers.filter(user => {
        const matchesSearch = user.fullName.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm);
        const matchesRole = roleFilter ? user.role.toLowerCase() === roleFilter : true;
        return matchesSearch && matchesRole;
    });

    renderTable(filteredUsers);
}

async function loadUsers() {
    try {
        allUsers = await adminApi.get('/users');
        renderTable(allUsers);
    } catch (error) {
        console.error("Failed to load users:", error);
        const tableBody = document.querySelector("#users-table tbody");
        if(tableBody) tableBody.innerHTML = '<tr><td colspan="7">Error loading data. Please check the API connection and console.</td></tr>';
    }
}

export function initUsersPage() {
    loadUsers();

    document.getElementById('user-search-input').addEventListener('input', applyFilters);
    document.getElementById('role-filter').addEventListener('change', applyFilters);

    document.getElementById('users-table').addEventListener('click', (event) => {
        const target = event.target.closest('button.btn-action');
        if (!target) return;

        const userId = target.dataset.userid;
        const action = target.dataset.action;

        // Sửa lỗi logic xử lý sự kiện dựa trên data-action
        if (action === 'edit') {
            const currentRole = target.dataset.currentRole;
            handleEditRole(userId, currentRole);
        } else if (action === 'deactivate' || action === 'restore') {
            handleDeactivateRestore(userId, action);
        }
    });
}