import { isAuthenticated } from '../auth/authService.js';
import { loadSidebarAndSetActiveLink } from '../components/Sidebar.js';
// Hàm updateBackdropVisibility rất quan trọng để quản lý lớp phủ nền
import { updateBackdropVisibility } from '../components/modals.js'; 

const TrashPage = {
    /**
     * Render a view of the page.
     */
    render: async () => {
        if (!isAuthenticated()) {
            window.location.hash = '#/trash';
            return '';
        }

        // HTML content from trash.html
        return `
            <div id="sidebar-container"></div>

            <main id="main" class="main">
                <header>
                    <h3 class="page__title">
                        <i data-lucide="trash-2"></i>
                        <span>Trash</span>
                    </h3>
                    <div class="description--second description--trash" role="alert">
                        Items in the trash will be <strong>permanently deleted</strong> after 30 days.
                    </div>
                </header>
                <div class="page__content">
                    <section class="section-container">
                        <div class="section-title">Deleted Projects</div>
                        <div class="section__inner-content">
                            <div class="list-row group-folder" id="deleted-projects-container">
                                <div class="folder-item" data-id="p006" data-name="Chiến dịch quảng cáo hè 2024 (Cancelled)">
                                    <div class="folder folder__icon--closed"></div>
                                    <span class="folder__pjt-title">Chiến dịch quảng cáo hè 2024 (Cancelled)</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="section-container">
                        <div class="section-title">Deleted Tasks</div>
                        <div class="section__inner-content">
                            <div class="list-col" id="deleted-tasks-container">
                                <div class="task-card">
                                    <div class="task__name" style="text-decoration: line-through;">Chuẩn bị slide thuyết trình</div>
                                    <div class="task-actions">
                                        <button class="btn-hover" title="Restore"><i data-lucide="rotate-ccw"></i></button>
                                        <button class="btn-hover btn-danger" title="Delete Permanently"><i data-lucide="trash-2"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <div class="simple-modal" id="trash-item-modal">
                <div class="modal-header">
                    <h4 class="modal-title">Deleted Project</h4>
                    <button class="btn-exit"><i data-lucide="x"></i></button>
                </div>
                <div class="modal-body">
                    <p class="modal-project-name" id="modal-project-name"></p>
                    <p class="modal-description">This project and all its contents will be permanently deleted after 30 days. Do you want to restore it?</p>
                    <div class="modal-item-list" id="modal-task-list-container" style="display: none;">
                        <strong>Tasks inside:</strong>
                        <ul id="modal-task-list"></ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-delete">
                        <i data-lucide="trash-2" class="icon-sm"></i>
                        <span>Permanently Delete</span>
                    </button>
                    <button class="btn btn--primary">
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

        // In a real app, you would fetch and render trashed items here
        // loadTrashedItems();
    }
};

export default TrashPage;