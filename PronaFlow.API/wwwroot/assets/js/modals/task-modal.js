/**
 * Nạp HTML cho Task Detail Modal và thiết lập các sự kiện.
 */
export function initializeTaskDetailModal() {
    if (document.getElementById('taskDetailModal')) return;

    fetch('task-detail.html')
        .then(response => response.ok ? response.text() : Promise.reject('File not found'))
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            setupTaskDetailModalInteractions();
            lucide.createIcons();
        })
        .catch(error => console.warn('Could not load task detail modal template.', error));
}

/**
 * Gán các sự kiện tương tác cho Task Detail Modal.
 */
export function setupTaskDetailModalInteractions() {
    const taskModal = document.getElementById('taskDetailModal');
    if (!taskModal) return;

    const closeButton = taskModal.querySelector('#closeTaskDetailModal');

    const hideModal = () => {
        taskModal.classList.remove('is-visible');
        document.getElementById('projectDetailModal')?.classList.remove('is-shifted');
        updateBackdropVisibility();
    };

    closeButton?.addEventListener('click', hideModal);
    document.addEventListener('keydown', e => e.key === 'Escape' && taskModal.classList.contains('is-visible') && hideModal());
}