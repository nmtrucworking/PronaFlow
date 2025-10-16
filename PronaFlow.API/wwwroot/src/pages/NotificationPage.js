import AuthPage from './AuthPage.js'; // include extension if needed
import { loadSidebarAndSetActiveLink } from '../components/Sidebar.js';
import { isAuthenticated } from '../auth/authService.js';

const NotificationPage = {
    /**
     * Render a view of the page.
     * HTML is merged from my-task.html.
     */
    render: async () => {
        if (!isAuthenticated()) {
        window.location.hash = '#/login'; 
        return ''; 
    }

        return `
            <div id="sidebar-container"></div>
            <main id="main" class="main">
                <header class="page-header--sticky">
                    <div class="page-header__left">
                        <h3 class="page__title"><i data-lucide="bell"></i><span>Notifications</span></h3>
                    </div>
                    <div class="page-header__right">
                        <div class="search-bar">
                            <i data-lucide="search" class="search-bar__icon"></i>
                            <input type="text" placeholder="Search notifications..." class="search-bar__input">
                        </div>
                        <button id="filter-btn" class="btn btn--tertiary" popovertarget="filter-popover">
                            <i data-lucide="filter"></i><span>Filter</span>
                        </button>
                        <button class="mark-all-read btn btn-hover" id="mark-all-read-btn">
                            <i data-lucide="check-check"></i><span>Mark All as Read</span>
                        </button>
                    </div>
                </header>

                <div class="page__content page__content--notifications">            
                    <section class="notification-timeline-group">
                        <div class="timeline-group__header"><h4 class="timeline-group__title">Today</h4></div>
                        <div class="list-col notification-group">
                            </div>
                    </section>
                    <section class="empty-state-container" id="no-notifications-message" style="display: none;">
                        <div class="empty-state">
                            <i data-lucide="bell-off" class="empty-state__icon"></i>
                            <h4 class="empty-state__text">All caught up!</h4>
                            <p class="empty-state__subtext">You have no new notifications.</p>
                        </div>
                    </section>
                </div>
            </main>
            
            <div class="contextual-action-bar">
                <div class="action-bar__left"><span class="action-bar__selection-count"></span></div>
                <div class="action-bar__right">
                    <button class="btn btn--tertiary"><i data-lucide="check-check"></i> Mark as read</button>
                    <button class="btn btn--tertiary"><i data-lucide="archive"></i> Archive</button>
                    <div class="action-bar__divider"></div>
                    <button class="btn btn--tertiary btn--danger"><i data-lucide="trash-2"></i> Delete</button>
                </div>
            </div>

            <div id="filter-popover" class="popover filter-popover" popover>
                </div>
            <div class="shared-backdrop" id="sharedBackdrop"></div>
            <div class="simple-modal" id="confirmation-modal">
                <div class="modal-header">
                    <h5 class="modal-title">Mark all as read?</h5>
                    <button class="btn-exit" title="Close"><i data-lucide="x"></i></button>
                </div>
                <div class="modal-body"><p>Are you sure you want to mark all notifications as read?</p></div>
                <div class="modal-footer">
                    <button class="btn btn--tertiary">Cancel</button>
                    <button class="btn btn--primary">Confirm</button>
                </div>
            </div>`;
    },
    
    /**
     * Execute script after rendering.
     * All logic from my-task.js is moved and adapted here.
     */
    after_render: async () => {
        if (!isAuthenticated()) return;

        await loadSidebarAndSetActiveLink();
        if (window.lucide) {
            lucide.createIcons();
        }
        // Initialize all event listeners and logic for the page
        initializeNotificationsPage();
    }
};

/**
 * Main function to initialize interactions on the Notifications page.
 * Logic is moved from the old notification.js.
 */
function initializeNotificationsPage() {
    const pageContent = document.querySelector('.page__content--notifications');
    if (!pageContent) return;

    const contextualActionBar = document.querySelector('.contextual-action-bar');
    const selectionCountSpan = contextualActionBar?.querySelector('.action-bar__selection-count');
    const markAllReadBtn = document.getElementById('mark-all-read-btn');
    const confirmationModal = document.getElementById('confirmation-modal');

    const updateContextualActionBar = () => {
        if (!contextualActionBar || !selectionCountSpan) return;
        const selectedCheckboxes = pageContent.querySelectorAll('.notification-card__checkbox input:checked');
        const selectedCount = selectedCheckboxes.length;

        if (selectedCount > 0) {
            selectionCountSpan.textContent = `${selectedCount} item${selectedCount > 1 ? 's' : ''} selected`;
            contextualActionBar.classList.add('is-visible');
        } else {
            contextualActionBar.classList.remove('is-visible');
        }

        pageContent.querySelectorAll('.notification-card').forEach(card => {
            const checkbox = card.querySelector('.notification-card__checkbox input');
            if (checkbox) {
                card.classList.toggle('selected', checkbox.checked);
            }
        });
    };

    pageContent.addEventListener('change', (event) => {
        if (event.target.matches('.notification-card__checkbox input')) {
            updateContextualActionBar();
        }
    });

    if (markAllReadBtn && confirmationModal) {
        const confirmBtn = confirmationModal.querySelector('.btn--primary');
        const cancelBtn = confirmationModal.querySelector('.btn--tertiary');
        const closeBtn = confirmationModal.querySelector('.btn-exit');

        const openConfirmationModal = () => {
            confirmationModal.classList.add('is-visible');
            updateBackdropVisibility();
        };

        const closeConfirmationModal = () => {
            confirmationModal.classList.remove('is-visible');
            updateBackdropVisibility();
        };

        markAllReadBtn.addEventListener('click', openConfirmationModal);

        confirmBtn?.addEventListener('click', () => {
            console.log("Confirmed: Mark all as read.");
            closeConfirmationModal();
        });
        cancelBtn?.addEventListener('click', closeConfirmationModal);
        closeBtn?.addEventListener('click', closeConfirmationModal);
    }

    // Xử lý các popover khác (nếu cần) theo logic mới (không dùng JS)
    updateContextualActionBar();
}

export default NotificationPage;