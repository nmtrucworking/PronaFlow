/**
 * Các tiện ích để tối ưu hóa hiệu suất và tải trang
 */

/**
 * Lazy load các hình ảnh khi chúng xuất hiện trong viewport
 */
export function setupLazyLoading() {
    // Kiểm tra nếu trình duyệt hỗ trợ Intersection Observer API
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback cho các trình duyệt không hỗ trợ Intersection Observer
        const lazyLoad = () => {
            const lazyImages = document.querySelectorAll('img[data-src]');
            
            lazyImages.forEach(img => {
                if (isInViewport(img)) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            });
        };
        
        // Gọi lazyLoad khi cuộn trang
        window.addEventListener('scroll', throttle(lazyLoad, 200));
        window.addEventListener('resize', throttle(lazyLoad, 200));
        
        // Gọi lần đầu để xử lý các hình ảnh đã hiển thị
        lazyLoad();
    }
}

/**
 * Kiểm tra xem một phần tử có nằm trong viewport không
 * @param {HTMLElement} element - Phần tử cần kiểm tra
 * @returns {boolean} - true nếu phần tử nằm trong viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Throttle một hàm để giới hạn tần suất gọi
 * @param {Function} func - Hàm cần throttle
 * @param {number} limit - Thời gian giới hạn (ms)
 * @returns {Function} - Hàm đã được throttle
 */
export function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Debounce một hàm để trì hoãn việc thực thi
 * @param {Function} func - Hàm cần debounce
 * @param {number} delay - Thời gian trì hoãn (ms)
 * @returns {Function} - Hàm đã được debounce
 */
export function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}

/**
 * Tối ưu hóa các sự kiện scroll
 */
export function optimizeScrollEvents() {
    // Lưu trữ các hàm xử lý sự kiện scroll
    const scrollHandlers = [];
    
    // Thêm một hàm xử lý sự kiện scroll
    window.addScrollHandler = (handler) => {
        scrollHandlers.push(handler);
    };
    
    // Xử lý tất cả các sự kiện scroll trong một requestAnimationFrame
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                scrollHandlers.forEach(handler => handler());
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * Tối ưu hóa việc render danh sách dài
 * @param {HTMLElement} container - Container chứa danh sách
 * @param {Array} items - Mảng các item cần render
 * @param {Function} renderItem - Hàm render một item
 * @param {number} batchSize - Số lượng item render mỗi lần
 */
export function renderLongList(container, items, renderItem, batchSize = 20) {
    if (!container || !items || !renderItem) return;
    
    // Xóa nội dung hiện tại
    container.innerHTML = '';
    
    // Tạo fragment để giảm thiểu reflow
    const fragment = document.createDocumentFragment();
    
    // Render theo batch
    let index = 0;
    
    function renderBatch() {
        const limit = Math.min(index + batchSize, items.length);
        
        for (let i = index; i < limit; i++) {
            const itemElement = renderItem(items[i]);
            fragment.appendChild(itemElement);
        }
        
        container.appendChild(fragment);
        index = limit;
        
        if (index < items.length) {
            // Tiếp tục render batch tiếp theo
            setTimeout(renderBatch, 0);
        } else {
            // Đã render xong tất cả các item
            if (window.lucide) {
                lucide.createIcons();
            }
        }
    }
    
    // Bắt đầu render
    renderBatch();
}

/**
 * Tối ưu hóa việc tải các script không cần thiết ngay lập tức
 * @param {string} src - Đường dẫn đến file script
 * @param {boolean} async - Có tải script bất đồng bộ không
 * @param {boolean} defer - Có trì hoãn việc thực thi script không
 */
export function loadScriptDynamically(src, async = true, defer = true) {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = defer;
    document.body.appendChild(script);
}

/**
 * Tối ưu hóa việc tải các stylesheet không cần thiết ngay lập tức
 * @param {string} href - Đường dẫn đến file stylesheet
 */
export function loadStylesheetDynamically(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}

/**
 * Tối ưu hóa việc tải các tài nguyên không cần thiết ngay lập tức
 */
export function setupResourceHints() {
    // Preconnect to important domains
    const domains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://cdn.jsdelivr.net'
    ];
    
    domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
}

/**
 * Khởi tạo các tối ưu hóa hiệu suất
 */
export function initPerformanceOptimizations() {
    // Thiết lập lazy loading cho hình ảnh
    setupLazyLoading();
    
    // Tối ưu hóa các sự kiện scroll
    optimizeScrollEvents();
    
    // Thiết lập resource hints
    setupResourceHints();
}

export default {
    setupLazyLoading,
    throttle,
    debounce,
    optimizeScrollEvents,
    renderLongList,
    loadScriptDynamically,
    loadStylesheetDynamically,
    setupResourceHints,
    initPerformanceOptimizations
};