export function autoResizeTextarea(selector) {
    document.querySelectorAll(selector).forEach(textarea => {
        const resize = () => {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        };
        textarea.addEventListener('input', resize);
        resize();
    });
}

/**
 * Kích hoạt chức năng chỉnh sửa nội tuyến cho một phần tử.
 * @param {HTMLElement} container - Phần tử container bao quanh.
 */
export function enableInlineEditing(container) {
    if (!container) return;

    const displayElement = container.querySelector('.inline-editable__display');
    const editContainer = container.querySelector('.inline-editable__edit');
    const inputElement = editContainer.querySelector('.inline-edit-input');

    if (!displayElement || !editContainer || !inputElement) return;

    container.addEventListener('click', () => {
        if (container.classList.contains('is-editing')) return; // Tránh gọi lại khi đang sửa
        container.classList.add('is-editing');
        inputElement.value = displayElement.textContent.trim();
        inputElement.focus();
        inputElement.select();
    });

    const finishEditing = () => {
        const newValue = inputElement.value.trim();
        if (newValue) {
            displayElement.textContent = newValue;
        } else {
            displayElement.textContent = container.dataset.placeholder || 'Untitled';
        }
        container.classList.remove('is-editing');
    };

    inputElement.addEventListener('blur', finishEditing);
    inputElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            finishEditing();
        } else if (e.key === 'Escape') {
            inputElement.value = displayElement.textContent.trim(); // Hoàn lại giá trị cũ
            container.classList.remove('is-editing');
        }
    });
}

export function renderGreetingWidget() {
    const widget = document.getElementById('greeting-widget');
    if (!widget) return;
    const hour = new Date().getHours();
    let greetingText = (hour < 12) ? "Good morning" : (hour < 18) ? "Good afternoon" : "Good night";
    widget.innerHTML = `<span>${greetingText}, Guest!</span>`;
}
