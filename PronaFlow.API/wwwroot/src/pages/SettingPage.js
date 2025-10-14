import { isAuthenticated, logout } from '../auth/authService.js';
import { loadSidebarAndSetActiveLink } from '../components/Sidebar.js';
import apiService from '../api/apiService.js';
import store from '../store/store.js';
import { showToast } from '../utils/ui.js';

const SettingPage = {
    render: async () => {
        if (!isAuthenticated()) {
            window.location.hash = '#/setting'; 
            return ''; 
        }

        return `
            <div id="sidebar-container"></div>
            <main id="main" class="main settings-page">
                <div class="page__title">Settings</div>
                <div class="settings-page__main-wrap">
                    <nav class="settings-nav">
                        <ul class="settings-nav__list">
                            <li><a href="#profile-settings" class="settings-nav__link active"><i data-lucide="user-circle"></i> <span>Profile</span></a></li>
                            <li><a href="#account-settings" class="settings-nav__link"><i data-lucide="key-round"></i> <span>Account</span></a></li>
                            <li><a href="#tags-management-settings" class="settings-nav__link"><i data-lucide="tags"></i> <span>Tags</span></a></li>
                            <li><a href="#danger-zone" class="settings-nav__link settings-nav__link--danger"><i data-lucide="alert-triangle"></i> <span>Danger Zone</span></a></li>
                        </ul>
                    </nav>

                    <div class="settings-content">
                        <section class="settings-section" id="profile-settings">
                            <div class="card-style-box">
                                <div class="card-header">
                                    <h2 class="section__title">Profile</h2>
                                    <span class="description">Update your personal details and avatar.</span>
                                </div>
                                <div class="card-body">
                                    <div class="form-box">
                                        <label for="display-name" class="form-label">Full Name</label>
                                        <input type="text" class="form-input" id="display-name">
                                    </div>
                                    <div class="form-box" style="margin-top: 15px;">
                                        <label for="bio" class="form-label">Short Bio</label>
                                        <textarea class="form-input user__bio" id="bio" placeholder="Ex: Full-stack Developer, UI/UX Enthusiast"></textarea>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <button id="save-profile-btn" class="btn btn--primary">Save Profile</button>
                                </div>
                            </div>
                        </section>

                        <section class="settings-section" id="tags-management-settings">
                             <div class="card-style-box">
                                <div class="card-header">
                                    <h2 class="section__title">Tags Management</h2>
                                     <span class="description">Add, edit, or delete tags for the selected workspace.</span>
                                </div>
                                <div class="card-body">
                                     <div class="workspace-selector-group">
                                        <label for="current-workspace" class="form-label">Select Workspace</label>
                                        <select id="current-workspace" class="current-workspace"></select>
                                    </div>
                                    <div class="tags-management">
                                        <div class="list-col tags-list" id="tags-list-container"></div>
                                        <div class="tags-list--empty" id="tags-list-empty">
                                            <i data-lucide="tag" class="empty-state__icon"></i>
                                            <p class="empty-state__text">No tags yet.</p>
                                        </div>
                                        <div class="add-tag-form">
                                            <input type="text" id="new-tag-name" class="form-input new-tag__name" placeholder="New tag name">
                                            <label class="color-picker-wrapper">
                                                <input type="color" class="color-input" id="new-tag-color" value="#80c8ff">
                                                <div class="color-picker-circle" style="background-color: #80c8ff;"></div>
                                            </label>
                                            <button id="add-new-tag-btn" class="btn btn--primary">Add Tag</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section class="settings-section" id="danger-zone">
                             <div class="card-style-box card-style-box--danger">
                                <div class="card-header">
                                    <h2 class="section__title section__title--danger">Danger Zone</h2>
                                    <span class="description">These actions are irreversible. Please be certain.</span>
                                </div>
                                <div class="card-body">
                                     <div class="danger-zone__actions">
                                        <div class="action-item">
                                            <div class="action-item__description">
                                                <strong>Log Out</strong>
                                                <p>End your current session on this device.</p>
                                            </div>
                                            <button id="logout-btn" class="btn btn-delete">Log Out</button>
                                        </div>
                                        <div class="action-item">
                                            <div class="action-item__description">
                                                <strong>Delete Account</strong>
                                                <p>This will permanently delete your account and all associated data.</p>
                                            </div>
                                            <div class="action-item__confirmation">
                                                <label for="delete-confirm" class="form-label">To confirm, please type <strong>DELETE</strong> below:</label>
                                                <input type="text" id="delete-confirm" class="form-input" placeholder="DELETE">
                                                <button id="delete-account-btn" class="btn btn-delete" disabled>Delete My Account</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <button id="sidebar-toggle-button" class="sidebar-toggle">
                <i class="icon-open" data-lucide="chevrons-left"></i>
                <i class="icon-closed" data-lucide="chevrons-right"></i>
            </button>
        `;
    },
    
    after_render: async () => {
        if (!isAuthenticated()) return;
        await loadSidebarAndSetActiveLink();
        if (window.lucide) {
            lucide.createIcons();
        }
        initializeSettingsPage();
    }
};

/**
 * Main function to initialize interactions on the Settings page.
 */
function initializeSettingsPage() {
    
    // --- STATE ---
    let workspaces = [];
    let currentTags = [];
    let selectedWorkspaceId = null;

    // --- DOM ELEMENTS ---
    const displayNameInput = document.getElementById('display-name');
    const bioInput = document.getElementById('bio');
    const saveProfileBtn = document.getElementById('save-profile-btn');
    const workspaceSelector = document.getElementById('current-workspace');
    const tagsContainer = document.getElementById('tags-list-container');
    const emptyTagsMessage = document.getElementById('tags-list-empty');
    const newTagNameInput = document.getElementById('new-tag-name');
    const newTagColorInput = document.getElementById('new-tag-color');
    const addNewTagBtn = document.getElementById('add-new-tag-btn');
    const colorPickerCircle = document.querySelector('.color-picker-circle');
    const logoutBtn = document.getElementById('logout-btn');
    const deleteConfirmInput = document.getElementById('delete-confirm');
    const deleteAccountBtn = document.getElementById('delete-account-btn');

    // --- FUNCTIONS ---

    // Load user data into profile form
    function loadProfileData() {
        const user = store.getState().user;
        if (user) {
            displayNameInput.value = user.fullName || '';
            bioInput.value = user.bio || '';
        }
    }

    // Load workspaces into selector
    async function loadWorkspaces() {
        try {
            workspaces = await apiService.workspaces.getAll();
            workspaceSelector.innerHTML = workspaces
                .map(ws => `<option value="${ws.id}">${ws.name}</option>`)
                .join('');
            if (workspaces.length > 0) {
                selectedWorkspaceId = workspaces[0].id;
                await loadTagsForWorkspace(selectedWorkspaceId);
            }
        } catch (error) {
            showToast("Failed to load workspaces.", "error");
        }
    }

    // Load tags for the selected workspace
    async function loadTagsForWorkspace(workspaceId) {
        if (!workspaceId) return;
        selectedWorkspaceId = workspaceId;
        try {
            currentTags = await apiService.tags.getForWorkspace(workspaceId);
            renderTags();
        } catch (error) {
            showToast("Failed to load tags for this workspace.", "error");
        }
    }

    // Render the list of tags
    function renderTags() {
        tagsContainer.innerHTML = '';
        if (currentTags.length === 0) {
            emptyTagsMessage.style.display = 'block';
            return;
        }
        emptyTagsMessage.style.display = 'none';
        currentTags.forEach(tag => {
            const tagEl = document.createElement('div');
            tagEl.className = 'tag-list-item'; // You need to style this class
            tagEl.innerHTML = `
                <span class="tag-card" style="background-color: ${tag.colorHex};">${tag.name}</span>
                <button class="btn-delete-tag" data-tag-id="${tag.id}"><i data-lucide="x"></i></button>
            `;
            tagsContainer.appendChild(tagEl);
        });
        lucide.createIcons();
    }

    // --- EVENT LISTENERS ---

    // Save Profile
    saveProfileBtn.addEventListener('click', async () => {
        const fullName = displayNameInput.value.trim();
        const bio = bioInput.value.trim();
        try {
            await apiService.users.updateCurrentUser({ fullName, bio });
            // Refresh user data in store
            await authService.checkAuthStatus(); 
            showToast("Profile updated successfully!", "success");
        } catch (error) {
            showToast("Failed to update profile.", "error");
        }
    });

    // Workspace Selector
    workspaceSelector.addEventListener('change', () => {
        loadTagsForWorkspace(workspaceSelector.value);
    });

    // Add New Tag
    addNewTagBtn.addEventListener('click', async () => {
        const name = newTagNameInput.value.trim();
        const colorHex = newTagColorInput.value;
        if (!name) {
            showToast("Tag name cannot be empty.", "error");
            return;
        }
        try {
            await apiService.tags.create(selectedWorkspaceId, { name, colorHex });
            newTagNameInput.value = '';
            await loadTagsForWorkspace(selectedWorkspaceId);
            showToast("Tag created successfully!", "success");
        } catch (error) {
            showToast("Failed to create tag.", "error");
        }
    });

    // Delete Tag (using event delegation)
    tagsContainer.addEventListener('click', async (e) => {
        const deleteBtn = e.target.closest('.btn-delete-tag');
        if (deleteBtn) {
            const tagId = deleteBtn.dataset.tagId;
            if (confirm("Are you sure you want to delete this tag?")) {
                try {
                    await apiService.tags.delete(tagId);
                    await loadTagsForWorkspace(selectedWorkspaceId);
                    showToast("Tag deleted.", "success");
                } catch (error) {
                    showToast("Failed to delete tag.", "error");
                }
            }
        }
    });
    
    // Color Picker UI
    newTagColorInput.addEventListener('input', () => {
        colorPickerCircle.style.backgroundColor = newTagColorInput.value;
    });

    // Logout Button
    logoutBtn.addEventListener('click', () => {
        logout();
        window.location.hash = '#/login';
    });
    
    // Delete Account confirmation
    deleteConfirmInput.addEventListener('input', () => {
        deleteAccountBtn.disabled = deleteConfirmInput.value !== 'DELETE';
    });
    
    deleteAccountBtn.addEventListener('click', async () => {
        if (deleteConfirmInput.value === 'DELETE') {
            if (confirm("This action is IRREVERSIBLE. Are you absolutely sure you want to delete your account?")) {
                try {
                    await apiService.users.deleteCurrentUser();
                    logout(); // Log out on client side
                    alert("Your account has been permanently deleted.");
                    window.location.hash = '#/login';
                } catch (error) {
                    showToast("Failed to delete account.", "error");
                }
            }
        }
    });

    // --- INITIALIZATION ---
    loadProfileData();
    loadWorkspaces();
}

export default SettingPage;