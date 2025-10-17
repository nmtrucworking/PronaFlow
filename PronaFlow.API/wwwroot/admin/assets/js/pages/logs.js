import { adminApi } from '../services/adminApiService.js';

function renderLogEntry(log) {
    // Hiển thị log một cách tường minh
    return `
        <div class="log-entry">
            <div class="log-timestamp">${new Date(log.createdAt).toLocaleString()}</div>
            <div class="log-description">
                User <strong>${log.userFullName}</strong> (ID: ${log.userId})
                performed action <strong>'${log.actionType}'</strong>
                on <em>${log.targetType}</em> (ID: ${log.targetId}).
            </div>
            <div class="log-details">${log.description}</div>
        </div>
    `;
}

async function loadLogs() {
    // Xây dựng query string từ các bộ lọc
    const params = new URLSearchParams();
    const user = document.getElementById('log-user-filter').value;
    const action = document.getElementById('log-action-filter').value;
    // ... thêm logic cho ngày tháng

    if (user) params.append('user', user);
    if (action) params.append('action', action);
    
    try {
        const logs = await adminApi.get(`/logs?${params.toString()}`);
        const container = document.getElementById('logs-container');
        if (logs.length > 0) {
            container.innerHTML = logs.map(renderLogEntry).join('');
        } else {
            container.innerHTML = '<p>No activity logs found matching the criteria.</p>';
        }
    } catch (error) {
        console.error("Failed to load activity logs:", error);
    }
}

export function initLogsPage() {
    loadLogs(); // Tải log ban đầu
    document.getElementById('log-filter-btn').addEventListener('click', loadLogs);
}

initLogsPage();