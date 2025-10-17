import { adminApi } from '../services/adminApiService.js';

async function loadStats() {
    try {
        const stats = await adminApi.get('/dashboard/stats');
        document.getElementById('stats-total-users').textContent = stats.totalUsers;
        document.getElementById('stats-active-projects').textContent = stats.activeProjects;
        document.getElementById('stats-total-workspaces').textContent = stats.totalWorkspaces;
        document.getElementById('stats-total-tasks').textContent = stats.totalTasks;

        // Giả sử API trả về dữ liệu cho biểu đồ
        // Trong thực tế, bạn cần tạo một endpoint API riêng cho việc này
        const userGrowthData = stats.userGrowth; // Ví dụ: [{date: "2023-10-26", count: 5}, ...]
        renderNewUsersChart(userGrowthData);

    } catch (error) {
        console.error("Failed to load dashboard stats:", error);
    }
}

function renderNewUsersChart(data = []) {
    const ctx = document.getElementById('new-users-chart');
    if (!ctx) return;

    // Mẫu dữ liệu giả định nếu API chưa có
    if (!data || data.length === 0) {
        data = [
            { date: 'Oct 1', count: 5 }, { date: 'Oct 2', count: 8 },
            { date: 'Oct 3', count: 6 }, { date: 'Oct 4', count: 12 },
            { date: 'Oct 5', count: 10 }, { date: 'Oct 6', count: 15 },
        ];
    }
    
    const labels = data.map(d => d.date);
    const chartData = data.map(d => d.count);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'New Users',
                data: chartData,
                borderColor: '#42a5f5',
                backgroundColor: 'rgba(66, 165, 245, 0.2)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

export function initDashboardPage() {
    loadStats();
}

initDashboardPage();