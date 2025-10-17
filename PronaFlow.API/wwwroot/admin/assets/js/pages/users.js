import { adminApi } from '../services/adminApiService.js';

let allUsers = [];

function renderUserRow(users) {
    const tableBody = document.querySelector('#users-table tbody');
    if (!tableBody) return;

    tableBody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td><span class="role-badge role-${user.role}">${user.role}</span></td>
            <td>${new Date(user.createdAt).toLocaleDateString()}</td>
            <td>
                <span class="status-badge ${user.isDeleted ? 'status-inactive' : 'status-active'}">
                    ${user.isDeleted ? 'Inactive' : 'Active'}
                </span>
            </td>
            <td class="actions">
                <button class="btn-action" data-userid="${user.id}" data-action="edit">Edit Role</button>
                <button class="btn-action btn-danger" data-userid="${user.id}" data-action="delete">
                    ${user.isDeleted ? 'Restore' : 'Deactivate'}
                </button>
            </td>
        </tr>`).join('');
}

// Hàm xử lý khi nhấn nút thay đổi vai trò
async function handleEditRole(userId, currentRole) {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (confirm(`Are you sure you want to change this user's role to '${newRole}'?`)) {
        try {
            await adminApi.put(`/users/${userId}/role`, { role: newRole });
            // Tải lại dữ liệu để cập nhật bảng
            await loadUsers(); 
        } catch (error) {
            console.error(`Failed to update role for user ${userId}:`, error);
            alert('Error updating role. Please check the console.');
        }
    }
}

// Hàm xử lý khi nhấn nút vô hiệu hóa/khôi phục
async function handleDeactivateRestore(userId, action) {
    const confirmationText = action === 'deactivate' 
        ? 'Are you sure you want to deactivate this user?' 
        : 'Are you sure you want to restore this user?';

    if (confirm(confirmationText)) {
        try {
            if (action === 'deactivate') {
                await adminApi.delete(`/users/${userId}`);
            } else {
                await adminApi.put(`/users/${userId}/restore`);
            }
            await loadUsers();
        } catch (error) {
            console.error(`Failed to ${action} user ${userId}:`, error);
            alert(`Error performing action. Please check the console.`);
        }
    }
}

// Hàm lọc và tìm kiếm
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

// Hàm chính để tải và khởi tạo trang
async function loadUsers() {
    try {
        allUsers = await adminApi.get('/users');
        renderTable(allUsers);
    } catch (error) {
        console.error("Failed to load users:", error);
        document.querySelector("#users-table tbody").innerHTML = '<tr><td colspan="7">Error loading data.</td></tr>';
    }
}

export function initUsersPage() {
    // Tải dữ liệu ban đầu
    loadUsers();

    // Gắn sự kiện cho bộ lọc và tìm kiếm
    document.getElementById('user-search-input').addEventListener('keyup', applyFilters);
    document.getElementById('role-filter').addEventListener('change', applyFilters);

    // Sử dụng event delegation cho các nút trong bảng
    document.getElementById('users-table').addEventListener('click', (event) => {
        const target = event.target.closest('button.btn-action');
        if (!target) return;

        const userId = target.dataset.userid;
        if (target.classList.contains('btn-edit-role')) {
            handleEditRole(userId, target.dataset.currentRole);
        } else {
            handleDeactivateRestore(userId, target.dataset.action);
        }
    });
}

initUsersPage();