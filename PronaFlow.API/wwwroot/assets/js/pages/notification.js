/* =====================================================================================
 * ====================           NOTIFICATIONS PAGE FUNCTIONS        ====================
 * ===================================================================================== */
export function initializeNotificationsPage() {
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