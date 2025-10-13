export function refreshKanbanFunctions() {
    lucide.createIcons();
    initWorkspaceToggle('.toggle-workspace-list-btn');
    autoResizeTextarea('textarea.auto-resize');
    // initKanbanDragDrop(); // Cần định nghĩa hàm này
}

function initWorkspaceToggle(selector) {
    document.querySelectorAll(selector).forEach(btn => {
        btn.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const content = document.getElementById(targetId);
            if (!content) return;

            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Thay vì gán trực tiếp content.hidden, chúng ta sẽ toggle sau một khoảng delay nhỏ
            // để animation có thể diễn ra.
            if (isExpanded) {
                // Đang mở -> Đóng nó lại
                content.setAttribute('hidden', '');
            } else {
                // Đang đóng -> Mở nó ra
                content.removeAttribute('hidden');
            }

            this.setAttribute('aria-expanded', String(!isExpanded));

            // Cập nhật icon (nếu có)
            const icon = this.querySelector('.icon-toggle');
            if (icon) {
                icon.classList.toggle('rotated-icon', !isExpanded); // Cần thêm class CSS
            }
        });
    });
}
