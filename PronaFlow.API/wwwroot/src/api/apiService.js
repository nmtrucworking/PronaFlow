// Địa chỉ gốc của API. Sử dụng đường dẫn tương đối là tốt nhất
// khi frontend và backend được phục vụ từ cùng một domain.
const API_BASE_URL = '/api';

/**
 * Hàm tiện ích để lấy token xác thực từ localStorage.
 * @returns {string|null} - Trả về token hoặc null nếu không tìm thấy.
 */
function getAuthToken() {
    return localStorage.getItem('authToken');
}

/**
 * Hàm request cốt lõi, xử lý tất cả các lệnh gọi API.
 * @param {string} endpoint - Endpoint của API (ví dụ: '/auth/login').
 * @param {string} method - Phương thức HTTP ('GET', 'POST', 'PUT', 'DELETE').
 * @param {object|null} body - Dữ liệu body cho các request POST/PUT.
 * @returns {Promise<any>} - Promise sẽ resolve với dữ liệu JSON từ response.
 * @throws {Error} - Ném ra lỗi với thông báo từ API nếu request thất bại.
 */
async function request(endpoint, method, body = null) {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    const token = getAuthToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method: method,
        headers: headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(API_BASE_URL + endpoint, config);

        // Xử lý trường hợp response 204 No Content (thường gặp ở DELETE hoặc PUT)
        // Response này không có body để parse.
        if (response.status === 204) {
            return null;
        }
        
        // Cố gắng parse body của response dưới dạng JSON
        const data = await response.json();

        if (!response.ok) {
            // Nếu server trả về lỗi (status code không phải 2xx)
            // Lỗi từ API của chúng ta có thể là một chuỗi đơn giản hoặc một object validation.
            const errorMessage = data.title || data.message || (typeof data === 'string' ? data : 'An unknown API error occurred.');
            throw new Error(errorMessage);
        }

        // Nếu thành công, trả về dữ liệu đã được parse
        return data;

    } catch (error) {
        // Bắt các lỗi mạng hoặc lỗi được ném ra từ !response.ok
        console.error(`API Service Error calling ${method} ${endpoint}:`, error);
        // Ném lại lỗi để các hàm gọi nó (ví dụ trong authService) có thể xử lý trong khối catch của riêng chúng
        throw error;
    }
}

/**
 * Xuất ra một đối tượng 'api' đơn giản để các module khác sử dụng.
 * Cung cấp các phương thức tiện ích cho từng loại request.
 */
export const api = {
    get: (endpoint) => request(endpoint, 'GET'),
    post: (endpoint, body) => request(endpoint, 'POST', body),
    put: (endpoint, body) => request(endpoint, 'PUT', body),
    del: (endpoint) => request(endpoint, 'DELETE'),
};