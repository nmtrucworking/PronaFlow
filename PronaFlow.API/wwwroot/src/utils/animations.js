/**
 * Utility cho các hiệu ứng chuyển trang và animation
 */

/**
 * Thêm hiệu ứng fade-in cho một phần tử
 * @param {HTMLElement} element - Phần tử cần thêm hiệu ứng
 * @param {number} duration - Thời gian hiệu ứng (ms)
 */
export function fadeIn(element, duration = 300) {
    if (!element) return;
    
    element.style.opacity = 0;
    element.style.transition = `opacity ${duration}ms ease-in-out`;
    element.style.display = '';
    
    // Trigger reflow
    void element.offsetWidth;
    
    element.style.opacity = 1;
}

/**
 * Thêm hiệu ứng fade-out cho một phần tử
 * @param {HTMLElement} element - Phần tử cần thêm hiệu ứng
 * @param {number} duration - Thời gian hiệu ứng (ms)
 * @returns {Promise} - Promise hoàn thành khi hiệu ứng kết thúc
 */
export function fadeOut(element, duration = 300) {
    return new Promise(resolve => {
        if (!element) {
            resolve();
            return;
        }
        
        element.style.opacity = 1;
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        
        // Trigger reflow
        void element.offsetWidth;
        
        element.style.opacity = 0;
        
        setTimeout(() => {
            element.style.display = 'none';
            resolve();
        }, duration);
    });
}

/**
 * Thêm hiệu ứng slide-in từ phải sang trái
 * @param {HTMLElement} element - Phần tử cần thêm hiệu ứng
 * @param {number} duration - Thời gian hiệu ứng (ms)
 */
export function slideInRight(element, duration = 300) {
    if (!element) return;
    
    element.style.transform = 'translateX(100%)';
    element.style.opacity = 0;
    element.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-in-out`;
    element.style.display = '';
    
    // Trigger reflow
    void element.offsetWidth;
    
    element.style.transform = 'translateX(0)';
    element.style.opacity = 1;
}

/**
 * Thêm hiệu ứng slide-in từ trái sang phải
 * @param {HTMLElement} element - Phần tử cần thêm hiệu ứng
 * @param {number} duration - Thời gian hiệu ứng (ms)
 */
export function slideInLeft(element, duration = 300) {
    if (!element) return;
    
    element.style.transform = 'translateX(-100%)';
    element.style.opacity = 0;
    element.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-in-out`;
    element.style.display = '';
    
    // Trigger reflow
    void element.offsetWidth;
    
    element.style.transform = 'translateX(0)';
    element.style.opacity = 1;
}

/**
 * Thêm hiệu ứng slide-out sang phải
 * @param {HTMLElement} element - Phần tử cần thêm hiệu ứng
 * @param {number} duration - Thời gian hiệu ứng (ms)
 * @returns {Promise} - Promise hoàn thành khi hiệu ứng kết thúc
 */
export function slideOutRight(element, duration = 300) {
    return new Promise(resolve => {
        if (!element) {
            resolve();
            return;
        }
        
        element.style.transform = 'translateX(0)';
        element.style.opacity = 1;
        element.style.transition = `transform ${duration}ms ease-in, opacity ${duration}ms ease-in-out`;
        
        // Trigger reflow
        void element.offsetWidth;
        
        element.style.transform = 'translateX(100%)';
        element.style.opacity = 0;
        
        setTimeout(() => {
            element.style.display = 'none';
            resolve();
        }, duration);
    });
}

/**
 * Thêm hiệu ứng slide-out sang trái
 * @param {HTMLElement} element - Phần tử cần thêm hiệu ứng
 * @param {number} duration - Thời gian hiệu ứng (ms)
 * @returns {Promise} - Promise hoàn thành khi hiệu ứng kết thúc
 */
export function slideOutLeft(element, duration = 300) {
    return new Promise(resolve => {
        if (!element) {
            resolve();
            return;
        }
        
        element.style.transform = 'translateX(0)';
        element.style.opacity = 1;
        element.style.transition = `transform ${duration}ms ease-in, opacity ${duration}ms ease-in-out`;
        
        // Trigger reflow
        void element.offsetWidth;
        
        element.style.transform = 'translateX(-100%)';
        element.style.opacity = 0;
        
        setTimeout(() => {
            element.style.display = 'none';
            resolve();
        }, duration);
    });
}

/**
 * Thêm hiệu ứng pulse cho một phần tử
 * @param {HTMLElement} element - Phần tử cần thêm hiệu ứng
 */
export function pulse(element) {
    if (!element) return;
    
    element.classList.add('pulse-animation');
    
    // Xóa class sau khi animation hoàn thành
    setTimeout(() => {
        element.classList.remove('pulse-animation');
    }, 1000);
}

/**
 * Thêm hiệu ứng bounce cho một phần tử
 * @param {HTMLElement} element - Phần tử cần thêm hiệu ứng
 */
export function bounce(element) {
    if (!element) return;
    
    element.classList.add('bounce-animation');
    
    // Xóa class sau khi animation hoàn thành
    setTimeout(() => {
        element.classList.remove('bounce-animation');
    }, 1000);
}

/**
 * Thêm hiệu ứng chuyển trang
 * @param {HTMLElement} oldContent - Nội dung cũ cần ẩn
 * @param {HTMLElement} newContent - Nội dung mới cần hiển thị
 * @param {string} direction - Hướng chuyển trang ('left', 'right')
 * @param {number} duration - Thời gian hiệu ứng (ms)
 * @returns {Promise} - Promise hoàn thành khi hiệu ứng kết thúc
 */
export async function pageTransition(oldContent, newContent, direction = 'right', duration = 300) {
    if (!oldContent || !newContent) return;
    
    // Ẩn nội dung cũ
    if (direction === 'right') {
        await slideOutLeft(oldContent, duration);
    } else {
        await slideOutRight(oldContent, duration);
    }
    
    // Hiển thị nội dung mới
    if (direction === 'right') {
        slideInRight(newContent, duration);
    } else {
        slideInLeft(newContent, duration);
    }
}

// Thêm CSS cần thiết cho các animation
const style = document.createElement('style');
style.textContent = `
    .pulse-animation {
        animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1);
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .bounce-animation {
        animation: bounce 1s cubic-bezier(0.28, 0.84, 0.42, 1);
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-20px);
        }
        60% {
            transform: translateY(-10px);
        }
    }
    
    .fade-in {
        animation: fadeIn 0.3s ease-in-out forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    .fade-out {
        animation: fadeOut 0.3s ease-in-out forwards;
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;

document.head.appendChild(style);

export default {
    fadeIn,
    fadeOut,
    slideInRight,
    slideInLeft,
    slideOutRight,
    slideOutLeft,
    pulse,
    bounce,
    pageTransition
};