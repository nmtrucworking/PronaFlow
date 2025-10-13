export function initializeMyTasksPage() {
    const taskListContainer = document.getElementById('task-list-container');
    const detailPanel = document.getElementById('task-detail-panel');
    const closeTaskDetailBtn = document.getElementById('close-task-detail-btn');
    const addTaskForm = document.getElementById('add-task-form');
    const newTaskInput = document.getElementById('new-task-input');
    const deleteTaskBtn = document.getElementById('delete-task-btn');

    if (!taskListContainer || !detailPanel) return;

    const resetToEmptyState = () => {
        detailPanel.classList.remove('is-displaying-task');
        const activeCard = taskListContainer.querySelector('.active-task');
        if (activeCard) activeCard.classList.remove('active-task');
        currentSelectedTaskId = null;
        detailPanel.querySelector('form').reset();
    };

    const displayTaskDetails = (taskCard) => {
        const name = taskCard.querySelector('.task__name').textContent;
        const project = taskCard.querySelector('#taskAddress__prjId').textContent;
        const tasklist = taskCard.querySelector('#taskAddress__tasklistId').textContent;

        detailPanel.querySelector('#detail-taskName').value = name;
        detailPanel.querySelector('#detail-taskAddress__prjId').textContent = project;
        detailPanel.querySelector('#detail-taskAddress__tasklistId').textContent = tasklist;

        detailPanel.classList.add('is-displaying-task');
    };

    closeTaskDetailBtn.addEventListener('click', resetToEmptyState);

    taskListContainer.addEventListener('click', (event) => {
        const clickedCard = event.target.closest('.task-card');
        if (clickedCard) {
            currentSelectedTaskId = clickedCard.dataset.taskId;
            taskListContainer.querySelectorAll('.task-card').forEach(card => card.classList.remove('active-task'));
            clickedCard.classList.add('active-task');
            displayTaskDetails(clickedCard);
        }
    });

    addTaskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskName = newTaskInput.value.trim();
        if (taskName === '') return;
        const newTaskId = 't' + Date.now();
        const newTaskCardHTML = `
            <div class="task-card" data-task-id="${newTaskId}" style="background: var(--color-background-notstarted);">
                <label class="custom-checkbox"><input type="checkbox"><span class="custom-checkbox__checkmark round"></span></label>
                <div class="task-card__content">
                    <span class="task__name">${taskName}</span>
                    <div class="task-card__detail">
                        <div class="task__address"><span id="taskAddress__prjId">Uncategorized</span><span> / </span><span id="taskAddress__tasklistId">-</span></div>
                        <div class="task__deadline"><i data-lucide="calendar-fold" class="icon--minium"></i><span>Not set</span></div>
                    </div>
                </div>
                <button class="btn priority-low"><i data-lucide="star"></i></button>
            </div>`;
        taskListContainer.insertAdjacentHTML('beforeend', newTaskCardHTML);
        lucide.createIcons();
        newTaskInput.value = '';
        const newTaskCardElement = taskListContainer.querySelector(`[data-task-id="${newTaskId}"]`);
        if (newTaskCardElement) newTaskCardElement.click();
    });

    detailPanel.addEventListener('input', (event) => {
        if (!currentSelectedTaskId) return;
        const activeCard = taskListContainer.querySelector('.active-task');
        if (!activeCard) return;

        const target = event.target;
        if (target.id === 'detail-taskName') {
            activeCard.querySelector('.task__name').textContent = target.value;
        }
        if (target.id === 'detail-task-status') {
            const statusToBgVar = {
                'temp': 'var(--color-background-temp)',
                'not-started': 'var(--color-background-notstarted)',
                'in-progress': 'var(--color-background-inprogress)',
                'in-review': 'var(--color-background-inreview)',
                'done': 'var(--color-background-done)'
            };
            activeCard.style.background = statusToBgVar[target.value] || 'var(--color-background-notstarted)';
        }
    });

    deleteTaskBtn.addEventListener('click', () => {
        if (!currentSelectedTaskId || !confirm("Are you sure you want to delete this task?")) return;
        const taskCardToDelete = taskListContainer.querySelector('.active-task');
        if (taskCardToDelete) taskCardToDelete.remove();
        resetToEmptyState();
    });

    const subtaskListContainer = document.getElementById('subtask-list-container');
    const addSubtaskInput = document.getElementById('add-subtask-input');

    addSubtaskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const subtaskName = addSubtaskInput.value.trim();
            if (subtaskName === '' || !currentSelectedTaskId) return;

            const newSubtaskHTML = `
                <div class="subtask-item">
                    <label class="custom-checkbox"><input type="checkbox"><span class="custom-checkbox__checkmark round"></span></label>
                    <input type="text" class="subtask__name" value="${subtaskName}">
                    <button class="btn-delete"><i data-lucide="x"></i></button>
                </div>`;
            subtaskListContainer.insertAdjacentHTML('beforeend', newSubtaskHTML);
            lucide.createIcons();
            addSubtaskInput.value = '';
        }
    });

    subtaskListContainer.addEventListener('click', (event) => {
        if (event.target.closest('.btn-delete')) {
            event.target.closest('.subtask-item').remove();
        }
    });
    subtaskListContainer.addEventListener('change', (event) => {
        if (event.target.type === 'checkbox') {
            event.target.closest('.subtask-item').classList.toggle('completed');
        }
    });

    resetToEmptyState();
}
