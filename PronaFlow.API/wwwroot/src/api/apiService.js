// Địa chỉ gốc của API. Sử dụng đường dẫn tương đối là tốt nhất
// khi frontend và backend được phục vụ từ cùng một domain.
const API_BASE_URL = '/api';

// Import store để cập nhật trạng thái ứng dụng
import store from '../store/store.js';
import { decodeToken } from '../utils/index.js';

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

        if (response.status === 204) {
            return null;
        }

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.message || (typeof data === 'string' ? data : 'Có lỗi xảy ra khi gọi API');
            throw new Error(errorMessage);
        }

        return data;
    } catch (error) {
        console.error(`API request failed: ${method} ${endpoint}`, error);
        throw error;
    }
}

// API service object với các phương thức tiện ích
const apiService = {
    // Auth API
    auth: {
        login: async (credentials) => {
            const response = await request('/auth/login', 'POST', credentials);
            if (response && response.token) {
                localStorage.setItem('authToken', response.token);
                // **FIX:** Sau khi có token, gọi API để lấy thông tin người dùng
                await apiService.auth.getCurrentUser();
            }
            return response;
        },
        register: (userData) => request('/auth/register', 'POST', userData),
        getCurrentUser: async () => {
            try {
                const user = await request('/auth/me', 'GET');
                if (user) {
                    store.setUser(user);
                }
                return user;
            } catch (error) {
                // Nếu token hết hạn hoặc không hợp lệ, xóa nó đi
                apiService.auth.logout();
                throw new Error("Session expired. Please log in again.");
            }
        },
        logout: () => {
            localStorage.removeItem('authToken');
            store.logout();
        }
    },

    // Workspace API
    workspaces: {
        getAll: () => request('/workspaces', 'GET'),
        getById: (id) => request(`/workspaces/${id}`, 'GET'),
        create: (workspace) => request('/workspaces', 'POST', workspace),
        update: (id, workspace) => request(`/workspaces/${id}`, 'PUT', workspace),
        delete: (id) => request(`/workspaces/${id}`, 'DELETE'),
    },

    // Project API
    projects: {
        // **FIX:** Thêm workspaceId để khớp với backend
        getAll: (workspaceId) => request(`/workspaces/${workspaceId}/projects`, 'GET'),
        getById: (workspaceId, projectId) => request(`/workspaces/${workspaceId}/projects/${projectId}`, 'GET'),
        create: (workspaceId, project) => request(`/workspaces/${workspaceId}/projects`, 'POST', project),
        update: (workspaceId, projectId, project) => request(`/workspaces/${workspaceId}/projects/${projectId}`, 'PUT', project),
        delete: (workspaceId, projectId) => request(`/workspaces/${workspaceId}/projects/${projectId}`, 'DELETE'),
    },

    // Task API
    tasks: {
        // **FIX:** Thêm projectId và queryParams để khớp với backend
        getAll: (projectId, queryParams = {}) => {
            const queryString = new URLSearchParams(queryParams).toString();
            return request(`/projects/${projectId}/tasks?${queryString}`, 'GET');
        },
        getById: (id) => request(`/tasks/${id}`, 'GET'),
        // **FIX:** Thêm taskListId để khớp với backend
        create: (taskListId, task) => {
            const newTask = request(`/tasklists/${taskListId}/tasks`, 'POST', task);
            if (newTask) {
                store.addTask(newTask);
            }
            return newTask;
        },
        update: async (id, task) => {
            const updatedTask = await request(`/tasks/${id}`, 'PUT', task);
            if (updatedTask) {
                store.updateTask(updatedTask);
            }
            return updatedTask;
        },
        delete: async (id) => {
            await request(`/tasks/${id}`, 'DELETE');
            store.deleteTask(id);
        }
    },

    // Notifications API
    notifications: {
        getAll: async () => {
            const notifications = await request('/notifications', 'GET');
            store.setState({ notifications });
            return notifications;
        },
        markAsRead: (id) => request(`/notifications/${id}/read`, 'PUT')
    },

    // Trash API
    trash: {
        /**
         * Lấy tất cả các mục (dự án, công việc) đã bị xóa.
         * @returns {Promise<Array>} Danh sách các mục trong thùng rác.
         */
        getTrashedItems: () => request('/trash', 'GET'),

        /**
         * Khôi phục một mục đã xóa.
         * @param {string} itemType - Loại mục ('Project' hoặc 'Task').
         * @param {number} itemId - ID của mục cần khôi phục.
         * @returns {Promise<any>}
         */
        restoreItem: (itemType, itemId) => request(`/trash/restore/${itemType}/${itemId}`, 'POST'),

        /**
         * Xóa vĩnh viễn một mục.
         * @param {string} itemType - Loại mục ('Project' hoặc 'Task').
         * @param {number} itemId - ID của mục cần xóa.
         * @returns {Promise<any>}
         */
        deletePermanently: (itemType, itemId) => request(`/trash/permanent/${itemType}/${itemId}`, 'DELETE'),
    },

    // User API
    users: {
        /**
         * Cập nhật thông tin người dùng hiện tại.
         * @param {object} userData - Dữ liệu cần cập nhật (ví dụ: { fullName, bio }).
         * @returns {Promise<any>}
         */
        updateCurrentUser: (userData) => request('/users/me', 'PUT', userData),

        /**
         * Xóa tài khoản người dùng hiện tại.
         * @returns {Promise<any>}
         */
        deleteCurrentUser: () => request('/users/me', 'DELETE')
    },
    
    // Tags API
    tags: {
        /**
         * Lấy tất cả tags cho một workspace.
         * @param {number} workspaceId - ID của workspace.
         * @returns {Promise<Array>}
         */
        getForWorkspace: (workspaceId) => request(`/workspaces/${workspaceId}/tags`, 'GET'),

        /**
         * Tạo một tag mới trong workspace.
         * @param {number} workspaceId - ID của workspace.
         * @param {object} tagData - Dữ liệu của tag mới (ví dụ: { name, colorHex }).
         * @returns {Promise<any>}
         */
        create: (workspaceId, tagData) => request(`/workspaces/${workspaceId}/tags`, 'POST', tagData),

        /**
         * Xóa một tag.
         * @param {number} tagId - ID của tag cần xóa.
         * @returns {Promise<any>}
         */
        delete: (tagId) => request(`/tags/${tagId}`, 'DELETE')
    },


    // Utility methods
    utils: {
        get: (endpoint) => request(endpoint, 'GET'),
        post: (endpoint, body) => request(endpoint, 'POST', body),
        put: (endpoint, body) => request(endpoint, 'PUT', body),
        delete: (endpoint) => request(endpoint, 'DELETE')
    }
};

export default apiService;