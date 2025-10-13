/**
 * Nạp HTML cho Project Detail Modal và thiết lập các sự kiện tương tác cho nó.
 */
export function initializeProjectDetailModal() {
    // Nếu modal đã tồn tại, không nạp lại
    if (document.getElementById('projectDetailModal')) return;

    fetch('project-detail-modal.html')
        .then(response => response.ok ? response.text() : Promise.reject('File not found'))
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            setupProjectModalInteractions(); // GỌI HÀM GÁN SỰ KIỆN SAU KHI NẠP XONG
            lucide.createIcons();
        })
        .catch(error => console.warn('Could not load project detail modal template.', error));
}

function setupConfirmDeleteInteraction(popoverElement) {
    if (!popoverElement) {
        console.error("Confirm delete popover element not found.");
        return;
    }
    const cancelButton = popoverElement.querySelector('#cancelDeleteBtn');
    const confirmInput = popoverElement.querySelector('#deleteConfirmationInput');
    const confirmButton = popoverElement.querySelector('#confirmDeleteBtn');
    const projectNameElement = popoverElement.querySelector('#projectNameToDelete');

    if (!cancelButton || !confirmInput || !confirmButton || !projectNameElement) {
        console.error("Confirmation modal is missing required child elements (buttons, input, etc.).");
        return;
    }

    const projectNameToDelete = projectNameElement.textContent.trim();

    cancelButton.addEventListener('click', () => {
        confirmInput.value = '';
        confirmButton.disabled = true;
    });

    confirmInput.addEventListener('input', () => {
        const isMatch = confirmInput.value.trim() === projectNameToDelete;
        confirmButton.disabled = !isMatch;
    });

    confirmButton.addEventListener('click', () => {
        if (confirmButton.disabled) return;
        console.log(`(Giả lập) Đã gửi yêu cầu xóa dự án: ${projectNameToDelete}`);
        alert(`Đã xóa dự án: ${projectNameToDelete}`);

        closeAllModalsAndPopovers();
    });
}