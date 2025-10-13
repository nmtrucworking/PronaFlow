

document.addEventListener('DOMContentLoaded', () => {
    const addTaskForm = document.getElementById('add-task-form');
    const taskDetailForm = document.querySelector('.task-detail-content form');

    // Add Task Form Handler
    addTaskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            name: document.getElementById('new-task-input').value,
            projectId: localStorage.getItem('selectedProjectId'),
            deadline: localStorage.getItem('selectedDeadline'),
            priority: localStorage.getItem('selectedPriority') || 'normal',
            assigneeId: localStorage.getItem('selectedAssigneeId')
        };

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                addTaskForm.reset();
                refreshTaskList();
            }
        } catch (error) {
            console.error('Error creating task:', error);
        }
    });

    // Task Detail Update Handler
    taskDetailForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taskId = taskDetailForm.querySelector('[name="task-id"]').value;
        const formData = {
            name: document.getElementById('detail-taskName').value,
            status: document.getElementById('detail-task-status').value,
            priority: document.getElementById('detail-task-priority').value,
            startDate: document.getElementById('detail-task-start-date').value,
            endDate: document.getElementById('detail-task-end-date').value,
            description: document.getElementById('detail-task-description').value,
            assignees: getSelectedAssignees()
        };

        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                refreshTaskList();
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    });
});

// Filter Handler
const filterForm = document.querySelector('#filter-popover');
filterForm.addEventListener('change', async () => {
    const filters = {
        projects: Array.from(filterForm.querySelectorAll('[value^="p"]:checked')).map(cb => cb.value),
        assignees: Array.from(filterForm.querySelectorAll('[value^="user"]:checked')).map(cb => cb.value)
    };

    try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`/api/tasks/filter?${queryParams}`);
        if (response.ok) {
            const tasks = await response.json();
            updateTaskList(tasks);
        }
    } catch (error) {
        console.error('Error filtering tasks:', error);
    }
});

// Sort Handler
document.querySelector('#sort-popover').addEventListener('click', async (e) => {
    if (e.target.matches('[data-sort]')) {
        const sortBy = e.target.dataset.sort;
        try {
            const response = await fetch(`/api/tasks?sort=${sortBy}`);
            if (response.ok) {
                const tasks = await response.json();
                updateTaskList(tasks);
            }
        } catch (error) {
            console.error('Error sorting tasks:', error);
        }
    }
});

// Helper Functions
function getSelectedAssignees() {
    return Array.from(document.querySelectorAll('#detail-task-assignees-container .member'))
        .map(member => member.dataset.userId);
}

function updateTaskList(tasks) {
    const container = document.getElementById('task-list-container');
    // Implementation of task list update
}

function refreshTaskList() {
    fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => updateTaskList(tasks))
        .catch(error => console.error('Error refreshing tasks:', error));
}