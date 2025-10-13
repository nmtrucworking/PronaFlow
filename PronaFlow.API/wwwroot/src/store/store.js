// Simple state management system for PronaFlow SPA
const store = {
    state: {
        user: null,
        currentWorkspace: null,
        currentProject: null,
        tasks: [],
        notifications: [],
        theme: localStorage.getItem('theme') || 'light',
        sidebar: {
            isOpen: true
        }
    },
    
    listeners: [],
    
    // Subscribe to state changes
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    },
    
    // Notify all listeners of state changes
    notify() {
        this.listeners.forEach(listener => listener(this.state));
    },
    
    // Update state
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
        
        // Save persistent data to localStorage
        if (newState.user) localStorage.setItem('user', JSON.stringify(newState.user));
        if (newState.theme) localStorage.setItem('theme', newState.theme);
    },
    
    // Get current state
    getState() {
        return this.state;
    },
    
    // Auth actions
    setUser(user) {
        this.setState({ user });
    },
    
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({ user: null });
    },
    
    // Workspace & Project actions
    setCurrentWorkspace(workspace) {
        this.setState({ currentWorkspace: workspace });
    },
    
    setCurrentProject(project) {
        this.setState({ currentProject: project });
    },
    
    // Task actions
    setTasks(tasks) {
        this.setState({ tasks });
    },
    
    addTask(task) {
        this.setState({ tasks: [...this.state.tasks, task] });
    },
    
    updateTask(updatedTask) {
        const updatedTasks = this.state.tasks.map(task => 
            task.id === updatedTask.id ? updatedTask : task
        );
        this.setState({ tasks: updatedTasks });
    },
    
    deleteTask(taskId) {
        this.setState({ tasks: this.state.tasks.filter(task => task.id !== taskId) });
    },
    
    // UI state actions
    toggleSidebar() {
        this.setState({ 
            sidebar: { 
                ...this.state.sidebar, 
                isOpen: !this.state.sidebar.isOpen 
            } 
        });
    },
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.setState({ theme });
    }
};

// Initialize store with data from localStorage
export function initializeStore() {
    // Load user from localStorage if available
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        try {
            store.state.user = JSON.parse(savedUser);
        } catch (e) {
            console.error('Failed to parse user from localStorage', e);
            localStorage.removeItem('user');
        }
    }
    
    // Set theme
    document.documentElement.setAttribute('data-theme', store.state.theme);
    
    return store;
}

export default store;