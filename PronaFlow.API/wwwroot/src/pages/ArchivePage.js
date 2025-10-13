import AuthPage from './AuthPage.js'; // include extension if needed
import { loadSidebarAndSetActiveLink } from '../components/Sidebar.js';
import { isAuthenticated } from '../auth/authService.js';

const ArchivePage = {
    render: async () => {
        // Check Authorizator
        if (!isAuthenticated()) {
            window.location.hash = '#/login';
            return '';
        }

        return `<div id="sidebar-container"></div>

    <main id="main" class="main ">
        <header>
            <h3 class="page__title">
                <i data-lucide="archive"></i>
                <span>Archive</span>
            </h3>
            <div class="description--second description--archive" role="alert">
                <p>This is where archived projects are stored. Items here will not appear in your workspace but can be
                    restored at any time.</p>
            </div>
        </header>
        <div class="page__content">
            <div class="section-container">
                <div class="section__inner-content">
                    <div class="group-folder list-row">
                        <!-- Project p005 from projects.json -->
                        <div class="folder-item">
                            <div class="folder folder__icon--open"></div>
                            <div class="folder__pjt-title">Dự án Freelance cho 'The Coffee House'</div>
                        </div>
                        <div class="folder-item">
                            <div class="folder folder__icon--closed"></div>
                            <div class="folder__pjt-title">Báo cáo tài chính quý 2</div>
                        </div>
                        <div class="folder-item">
                            <div class="folder folder__icon--closed"></div>
                            <div class="folder__pjt-title">Tài liệu Onboarding cho nhân viên mới</div>
                        </div>
                        <div class="folder-item">
                            <div class="folder folder__icon--closed"></div>
                            <div class="folder__pjt-title">Kế hoạch Marketing 2023</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Modal for Archived Project (Hidden by default) -->
    <div class="simple-modal">
        <div class="modal-header">
            <h4 class="modal-title">Archived Project</h4>
            <button class="btn-exit"><i data-lucide="x"></i></button>
        </div>
        <div class="modal-body">
            <p class="modal-project-name">Dự án Freelance cho 'The Coffee House'</p>
            <p class="modal-description">The contents of this project, including tasks and files, are securely archived.
                Do you want to restore this project?</p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-delete">
                <i data-lucide="trash-2" class="icon-sm"></i>
                <span>Permanently Delete</span>
            </button>
            <button class="btn btn--primary">
                <i data-lucide="archive-restore" class="icon-sm"></i>
                <span>Restore</span>
            </button>
        </div>
    </div>

    <button id="sidebar-toggle-button" class="sidebar-toggle">
        <i class="icon-open" data-lucide="chevrons-left"></i>
        <i class="icon-closed" data-lucide="chevrons-right"></i>
    </button>`;
    },

    after_render: async () => {
        if (!isAuthenticated()) return;

        await loadSidebarAndSetActiveLink();

        if (window.lucide) {
            lucide.createIcons();
        }
    }
};

export default ArchivePage;