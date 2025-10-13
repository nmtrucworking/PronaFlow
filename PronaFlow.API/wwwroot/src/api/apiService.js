// Địa chỉ gốc của API. Sử dụng đường dẫn tương đối là tốt nhất
// khi frontend và backend được phục vụ từ cùng một domain.
const API_BASE_URL = '/api';

// Import store để cập nhật trạng thái ứng dụng
import store from '../store/store.js';

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

        // Nếu response không thành công, ném ra lỗi với thông báo từ API
        if (!response.ok) {
            throw new Error(data.message || 'Có lỗi xảy ra khi gọi API');
        }

        return data;
    } catch (error) {
        console.error('API request failed:', error);
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
                // Cập nhật store với thông tin người dùng
                store.setUser(response.user);
            }
            return response;
        },
        register: (userData) => request('/auth/register', 'POST', userData),
        getCurrentUser: async () => {
            const user = await request('/auth/me', 'GET');
            if (user) {
                store.setUser(user);
            }
            return user;
        },
        logout: () => {
            localStorage.removeItem('authToken');
            store.logout();
        }
    },
    
    // Workspace API
    workspaces: {
        getAll: async () => {
            const workspaces = await request('/workspaces', 'GET');
            return workspaces;
        },
        getById: (id) => request(`/workspaces/${id}`, 'GET'),
        create: (workspace) => request('/workspaces', 'POST', workspace),
        update: (id, workspace) => request(`/workspaces/${id}`, 'PUT', workspace),
        delete: (id) => request(`/workspaces/${id}`, 'DELETE'),
        setCurrentWorkspace: (workspace) => {
            store.setCurrentWorkspace(workspace);
        }
    },
    
    // Project API
    projects: {
        getAll: async () => {
            const projects = await request('/projects', 'GET');
            return projects;
        },
        getById: async (id) => {
            const project = await request(`/projects/${id}`, 'GET');
            if (project) {
                store.setCurrentProject(project);
            }
            return project;
        },
        create: (project) => request('/projects', 'POST', project),
        update: (id, project) => request(`/projects/${id}`, 'PUT', project),
        delete: (id) => request(`/projects/${id}`, 'DELETE'),
    },
    
    // Task API
    tasks: {
        getAll: async () => {
            const tasks = await request('/tasks', 'GET');
            store.setTasks(tasks);
            return tasks;
        },
        getById: (id) => request(`/tasks/${id}`, 'GET'),
        create: async (task) => {
            const newTask = await request('/tasks', 'POST', task);
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
    
    // Utility methods
    utils: {
        get: (endpoint) => request(endpoint, 'GET'),
        post: (endpoint, body) => request(endpoint, 'POST', body),
        put: (endpoint, body) => request(endpoint, 'PUT', body),
        delete: (endpoint) => request(endpoint, 'DELETE')
    }
};

export default apiService;
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

// API service object với các phương thức tiện ích
export const apiService = {
    // Auth API
    auth: {
        login: async (credentials) => {
            const response = await request('/auth/login', 'POST', credentials);
            if (response && response.token) {
                localStorage.setItem('authToken', response.token);
                // Cập nhật store với thông tin người dùng
                store.setUser(response.user);
            }
            return response;
        },
        register: (userData) => request('/auth/register', 'POST', userData),
        getCurrentUser: async () => {
            const user = await request('/auth/me', 'GET');
            if (user) {
                store.setUser(user);
            }
            return user;
        },
        logout: () => {
            localStorage.removeItem('authToken');
            store.logout();
        }
    },
};