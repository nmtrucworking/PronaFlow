export function showToast(message, type = 'success') {
    const toast = document.getElementById("toast-notification");
    const toastMessage = document.getElementById("toast-message");

    toastMessage.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

export function setLoadingState(button, isLoading, text) {
    button.disabled = isLoading;
    button.textContent = isLoading ? 'Loading...' : text;
}

export function toggleForms(container, show) {
    if (show === 'register') {
        container.classList.add('active');
    } else {
        container.classList.remove('active');
    }
}