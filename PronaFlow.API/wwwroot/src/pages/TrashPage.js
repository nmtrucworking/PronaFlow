import { isAuthenticated } from '../auth/authService.js';
import { loadSidebarAndSetActiveLink } from '../components/Sidebar.js';
import { updateBackdropVisibility, closeAllModalsAndPopovers } from '../components/modals.js'; 
import apiService from '../api/apiService.js';
import { showToast } from '../utils/ui.js';

const TrashPage = {
    /**
     * Render a view of the page.
     */
    render: async () => {
        if (!isAuthenticated()) {
            window.location.hash = '#/trash';
            return '';
        }

        return `
            <div id="sidebar-container"></div>
            <main id="main" class="main">
                <header>
                    <h3 class="page__title"><i data-lucide="trash-2"></i><span>Trash</span></h3>
                    <div class="description--second description--trash" role="alert">
                        Items in the trash will be <strong>permanently deleted</strong> after 30 days.
                    </div>
                </header>
                <div class="page__content">
                    <section class="section-container">
                        <div class="section-title">Deleted Projects</div>
                        <div class="section__inner-content">
                            <div class="list-row group-folder" id="deleted-projects-container">
                                </div>
                        </div>
                    </section>
                    <section class="section-container">
                        <div class="section-title">Deleted Tasks</div>
                        <div class="section__inner-content">
                            <div class="list-col" id="deleted-tasks-container">
                                </div>
                        </div>
                    </section>
                    <div id="empty-trash-message" class="empty-state-container" style="display: none; border: none; margin-top: 20px;">
                        <i data-lucide="trash" class="empty-state__icon"></i>
                        <h3 class="empty-state__text">Trash is empty</h3>
                        <p class="empty-state__subtext">Deleted items will appear here.</p>
                    </div>
                </div>
            </main>

            <div class="simple-modal" id="trash-item-modal">
                <div class="modal-header">
                    <h4 class="modal-title" id="modal-item-type"></h4>
                    <button class="btn-exit"><i data-lucide="x"></i></button>
                </div>
                <div class="modal-body">
                    <p class="modal-project-name" id="modal-item-name"></p>
                    <p class="modal-description">This item can be restored or permanently deleted. Permanent deletion cannot be undone.</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-delete" id="modal-delete-btn">
                        <i data-lucide="trash-2" class="icon-sm"></i>
                        <span>Permanently Delete</span>
                    </button>
                    <button class="btn btn--primary" id="modal-restore-btn">
                        <i data-lucide="undo-2" class="icon-sm"></i>
                        <span>Restore</span>
                    </button>
                </div>
            </div>
            
            <div id="sharedBackdrop" class="shared-backdrop"></div>
            <button id="sidebar-toggle-button" class="sidebar-toggle">
                <i class="icon-open" data-lucide="chevrons-left"></i>
                <i class="icon-closed" data-lucide="chevrons-right"></i>
            </button>
        `;
    },

    /**
     * Execute script after rendering.
     */
    after_render: async () => {
        if (!isAuthenticated()) return;

        await loadSidebarAndSetActiveLink();
        if (window.lucide) {
            lucide.createIcons();
        }
        
        // Initialize all logic for the trash page.
        await initializeTrashPage();
    }
};

/**
 * Main function to load data and set up event listeners for the Trash Page.
 */
async function initializeTrashPage() {
    const projectsContainer = document.getElementById('deleted-projects-container');
    const tasksContainer = document.getElementById('deleted-tasks-container');
    const emptyMessage = document.getElementById('empty-trash-message');
    const modal = document.getElementById('trash-item-modal');
    
    let currentItem = null; // Store data of the clicked item { id, name, itemType }

    /**
     * Fetches trashed items from the API and renders them.
     */
    async function loadTrashedItems() {
        try {
            const items = await apiService.trash.getTrashedItems();
            
            projectsContainer.innerHTML = '';
            tasksContainer.innerHTML = '';

            if (items.length === 0) {
                emptyMessage.style.display = 'flex';
                return;
            }
            emptyMessage.style.display = 'none';

            items.forEach(item => {
                if (item.itemType.toLowerCase() === 'project') {
                    projectsContainer.innerHTML += `
                        <div class="folder-item" data-id="${item.id}" data-name="${item.name}" data-type="Project">
                            <div class="folder folder__icon--closed"></div>
                            <span class="folder__pjt-title">${item.name}</span>
                        </div>`;
                } else if (item.itemType.toLowerCase() === 'task') {
                    tasksContainer.innerHTML += `
                        <div class="task-card" data-id="${item.id}" data-name="${item.name}" data-type="Task">
                            <div class="task__name" style="text-decoration: line-through;">${item.name}</div>
                            <div class="task-actions">
                                <button class="btn-hover btn-restore" title="Restore"><i data-lucide="rotate-ccw"></i></button>
                                <button class="btn-hover btn-danger btn-delete-perm" title="Delete Permanently"><i data-lucide="trash-2"></i></button>
                            </div>
                        </div>`;
                }
            });
            lucide.createIcons();
        } catch (error) {
            console.error("Failed to load trashed items:", error);
            showToast("Could not load items from trash.", "error");
        }
    }

    /**
     * Opens and populates the confirmation modal.
     */
    function openModal(item) {
        currentItem = item;
        modal.querySelector('#modal-item-type').textContent = `Deleted ${item.itemType}`;
        modal.querySelector('#modal-item-name').textContent = item.name;
        modal.classList.add('is-visible');
        updateBackdropVisibility();
    }

    /**
     * Closes the confirmation modal.
     */
    function closeModal() {
        modal.classList.remove('is-visible');
        updateBackdropVisibility();
        currentItem = null;
    }

    // Event Delegation for the entire page content
    document.querySelector('.page__content').addEventListener('click', (e) => {
        const projectItem = e.target.closest('.folder-item');
        const taskCard = e.target.closest('.task-card');
        const restoreBtn = e.target.closest('.btn-restore');
        const deleteBtn = e.target.closest('.btn-delete-perm');

        if (restoreBtn) {
            const itemElement = restoreBtn.closest('[data-id]');
            handleRestore(itemElement.dataset.type, itemElement.dataset.id);
        } else if (deleteBtn) {
            const itemElement = deleteBtn.closest('[data-id]');
            openModal({ id: itemElement.dataset.id, name: itemElement.dataset.name, itemType: itemElement.dataset.type });
        } else if (projectItem) {
            openModal({ id: projectItem.dataset.id, name: projectItem.dataset.name, itemType: projectItem.dataset.type });
        } else if (taskCard) {
            // Clicking on a task card can also open the modal
            openModal({ id: taskCard.dataset.id, name: taskCard.dataset.name, itemType: taskCard.dataset.type });
        }
    });
    
    // Modal action listeners
    modal.querySelector('.btn-exit').addEventListener('click', closeModal);
    document.getElementById('modal-restore-btn').addEventListener('click', () => {
        if (currentItem) handleRestore(currentItem.itemType, currentItem.id);
    });
    document.getElementById('modal-delete-btn').addEventListener('click', () => {
        if (currentItem) handleDelete(currentItem.itemType, currentItem.id);
    });

    /**
     * Handles the restore action.
     */
    async function handleRestore(itemType, itemId) {
        try {
            await apiService.trash.restoreItem(itemType, itemId);
            showToast(`${itemType} restored successfully!`, 'success');
            closeModal();
            await loadTrashedItems();
        } catch (error) {
            console.error(`Failed to restore ${itemType}:`, error);
            showToast(`Could not restore ${itemType}.`, 'error');
        }
    }

    /**
     * Handles the permanent delete action.
     */
    async function handleDelete(itemType, itemId) {
        try {
            await apiService.trash.deletePermanently(itemType, itemId);
            showToast(`${itemType} permanently deleted.`, 'success');
            closeModal();
            await loadTrashedItems();
        } catch (error) {
            console.error(`Failed to delete ${itemType}:`, error);
            showToast(`Could not delete ${itemType}.`, 'error');
        }
    }

    // Initial load
    await loadTrashedItems();
}

export default TrashPage;