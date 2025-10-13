// =====================================================================================
// QUẢN LÝ MODAL, POPOVER VÀ BACKDROP TOÀN CỤC
// =====================================================================================

/**
 * Đóng tất cả các modal và popover đang mở.
 * Thường được gọi bởi backdrop hoặc khi cần reset giao diện.
 */
export function closeAllModalsAndPopovers() {
    // Đóng modal chi tiết công việc
    const taskModal = document.getElementById('taskDetailModal');
    if (taskModal) taskModal.classList.remove('is-visible');

    // Đóng modal chi tiết dự án và modal xác nhận của nó
    const projectModal = document.getElementById('projectDetailModal');
    if (projectModal) {
        projectModal.classList.remove('is-visible', 'is-shifted');
        const confirmDeleteModal = projectModal.querySelector('#confirmDeleteProjectModal');
        if (confirmDeleteModal) confirmDeleteModal.style.display = 'none';
    }

    // Đóng các modal đơn giản khác (ví dụ: trên trang Thùng rác)
    document.querySelectorAll('.simple-modal.is-visible').forEach(modal => {
        modal.classList.remove('is-visible');
    });

    // === THAY ĐỔI: Đóng tất cả các popover đang mở bằng Popover API ===
    document.querySelectorAll('[popover]:popover-open').forEach(popover => {
        popover.hidePopover();
    });

    // Cập nhật lại trạng thái của backdrop
    updateBackdropVisibility();
}

/**
 * Kiểm tra xem có modal nào đang hiển thị hay không và cập nhật lớp 'is-visible' cho backdrop.
 */
export function updateBackdropVisibility() {
    const backdrop = document.getElementById('sharedBackdrop');
    if (!backdrop) return;

    // Chỉ cần tìm bất kỳ component modal nào đang được hiển thị
    const isAnyModalVisible = document.querySelector('.modal-component.is-visible, .simple-modal.is-visible');

    // Bật/tắt backdrop
    backdrop.classList.toggle('is-visible', !!isAnyModalVisible);
}

export function initializeStaticModalInteractions() {
    const folders = document.querySelectorAll('.folder');
    const modal = document.querySelector('.simple-modal');
    const closeButton = modal ? modal.querySelector('.btn-exit') : null;

    if (folders.length === 0 || !modal || !closeButton) return;

    const openModal = () => {
        modal.classList.add('is-visible');
        updateBackdropVisibility();
    };
    const closeModal = () => {
        modal.classList.remove('is-visible');
        updateBackdropVisibility();
    };

    folders.forEach(folder => folder.addEventListener('click', openModal));
    closeButton.addEventListener('click', closeModal);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('is-visible')) {
            closeModal();
        }
    });
}
