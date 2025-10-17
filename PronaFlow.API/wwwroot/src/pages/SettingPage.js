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
                            <li><a href="#appearance-settings" class="settings-nav__link"><i data-lucide="palette"></i> <span>Appearance</span></a></li>
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
                                <div class="form-box form-box--avatar">
                                    <label class="form-label">Your Avatar</label>
                                    <div class="avatar-preview">
                                        <img src="../assets/images/avt-notion_1.png" class="user__avt" alt="Current Avatar">
                                        <div class="avatar-actions">
                                            <label for="new-avt-user" class="btn btn--secondary btn--small">
                                                <i data-lucide="upload" class="icon-sm"></i> <span>Upload</span>
                                            </label>
                                            <button class="btn btn--tertiary btn--small">Remove</button>
                                            <input type="file" id="new-avt-user" class="visually-hidden">
                                        </div>
                                    </div>
                                </div>
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

                        <!-- Account Section -->
                <section class="settings-section" id="account-settings">
                     <div class="card-style-box">
                        <div class="card-header">
                            <h2 class="section__title">Account</h2>
                            <span class="description">Manage your login information and security settings.</span>
                        </div>
                        <div class="card-body">
                            <form class="account-setting-form">
                                <div class="form-box">
                                    <label for="change-email" class="form-label">Username</label>
                                    <input type="email" id="change-email" class="form-input" value="minhtruc@pronaflow.com">
                                </div>
                                <hr class="card-divider">
                                <div class="form-box password-box">
                                    <label for="current-password" class="form-label">Current Password</label>
                                    <div class="input-with-icon">
                                        <input type="password" id="current-password" class="form-input" placeholder="Enter your current password">
                                        <i data-lucide="eye" class="input-icon"></i>
                                    </div>
                                </div>
                                <div class="form-box password-box">
                                    <label for="user-password" class="form-label">New Password</label>
                                    <div class="input-with-icon">
                                        <input type="password" id="user-password" class="form-input" placeholder="Enter your new password">
                                        <i data-lucide="eye-off" class="input-icon"></i>
                                    </div>
                                    <p class="helper-text">Must be at least 8 characters long.</p>
                                </div>
                                <div class="form-box password-box">
                                    <label for="confirm-password" class="form-label">Confirm New Password</label>
                                    <div class="input-with-icon">
                                        <input type="password" id="confirm-password" class="form-input" placeholder="Confirm your new password">
                                        <i data-lucide="eye" class="input-icon"></i>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="card-footer">
                             <button class="btn btn--secondary" disabled>Cancel</button>
                             <button class="btn btn--primary">Update Password</button>
                        </div>
                    </div>
                </section>

                        <!-- Appearance Section -->
                        <section class="settings-section" id="appearance-settings">
                            <div class="card-style-box">
                                <div class="card-header">
                                    <h2 class="section__title">Appearance</h2>
                                    <span class="description">Customize the look and feel of your workspace.</span>
                                </div>
                                <div class="card-body">
                                    <div class="appearance-box">
                                        <div class="settings-col--align-center">
                                            <svg class="toggle-scene" xmlns="http://www.w3.org/2000/svg" preserveaspectratio="xMinYMin" viewBox="0 0 197.451 481.081">
                                                <defs>
                                                    <marker id="e" orient="auto" overflow="visible" refx="0" refy="0">
                                                        <path class="toggle-scene__cord-end" fill-rule="evenodd" stroke-width=".2666"
                                                            d="M.98 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                                                    </marker>
                                                    <marker id="d" orient="auto" overflow="visible" refx="0" refy="0">
                                                        <path class="toggle-scene__cord-end" fill-rule="evenodd" stroke-width=".2666"
                                                            d="M.98 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                                                    </marker>
                                                    <marker id="c" orient="auto" overflow="visible" refx="0" refy="0">
                                                        <path class="toggle-scene__cord-end" fill-rule="evenodd" stroke-width=".2666"
                                                            d="M.98 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                                                    </marker>
                                                    <marker id="b" orient="auto" overflow="visible" refx="0" refy="0">
                                                        <path class="toggle-scene__cord-end" fill-rule="evenodd" stroke-width=".2666"
                                                            d="M.98 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                                                    </marker>
                                                    <marker id="a" orient="auto" overflow="visible" refx="0" refy="0">
                                                        <path class="toggle-scene__cord-end" fill-rule="evenodd" stroke-width=".2666"
                                                            d="M.98 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                                                    </marker>
                                                </defs>
                                                <g class="toggle-scene__cords">
                                                    <path class="toggle-scene__cord" marker-end="url(#a)" fill="none" stroke-linecap="square" stroke-width="6" d="M123.228-28.56v150.493" transform="translate(-24.503 256.106)"></path>
                                                    <path class="toggle-scene__cord" marker-end="url(#a)" fill="none" stroke-linecap="square" stroke-width="6" d="M123.228-28.59s28 8.131 28 19.506-18.667 13.005-28 19.507c-9.333 6.502-28 8.131-28 19.506s28 19.507 28 19.507" transform="translate(-24.503 256.106)"></path>
                                                    <path class="toggle-scene__cord" marker-end="url(#a)" fill="none" stroke-linecap="square" stroke-width="6" d="M123.228-28.575s-20 16.871-20 28.468c0 11.597 13.333 18.978 20 28.468 6.667 9.489 20 16.87 20 28.467 0 11.597-20 28.468-20 28.468" transform="translate(-24.503 256.106)"></path>
                                                    <path class="toggle-scene__cord" marker-end="url(#a)" fill="none" stroke-linecap="square" stroke-width="6" d="M123.228-28.569s16 20.623 16 32.782c0 12.16-10.667 21.855-16 32.782-5.333 10.928-16 20.623-16 32.782 0 12.16 16 32.782 16 32.782" transform="translate(-24.503 256.106)"></path>
                                                    <path class="toggle-scene__cord" marker-end="url(#a)" fill="none" stroke-linecap="square" stroke-width="6" d="M123.228-28.563s-10 24.647-10 37.623c0 12.977 6.667 25.082 10 37.623 3.333 12.541 10 24.647 10 37.623 0 12.977-10 37.623-10 37.623" transform="translate(-24.503 256.106)"></path>
                                                    <g class="line toggle-scene__dummy-cord">
                                                        <line marker-end="url(#a)" x1="98.7255" x2="98.7255" y1="240.5405" y2="380.5405"></line>
                                                    </g>
                                                    <circle class="toggle-scene__hit-spot" cx="98.7255" cy="380.5405" r="60" fill="transparent"></circle>
                                                </g>
                                                <g class="toggle-scene__bulb bulb" transform="translate(844.069 -645.213)">
                                                    <path class="bulb__cap" stroke-linecap="round" stroke-linejoin="round" stroke-width="4.677" d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"></path>
                                                    <path class="bulb__cap-shine" d="M-778.379 802.873h25.512v118.409h-25.512z" transform="matrix(.52452 0 0 .90177 -368.282 82.976)"></path>
                                                    <path class="bulb__cap" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v0s-8.439 10.115-28.817 10.115c-21.673 0-29.59-10.115-29.59-10.115z"></path>
                                                    <path class="bulb__cap-outline" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4.677" d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"></path>
                                                    <g class="bulb__filament" fill="none" stroke-linecap="round" stroke-width="5">
                                                        <path d="M-752.914 823.875l-8.858-33.06"></path>
                                                        <path d="M-737.772 823.875l8.858-33.06"></path>
                                                    </g>
                                                    <path class="bulb__bulb" stroke-linecap="round" stroke-width="5" d="M-783.192 803.855c5.251 8.815 5.295 21.32 13.272 27.774 12.299 8.045 36.46 8.115 49.127 0 7.976-6.454 8.022-18.96 13.273-27.774 3.992-6.7 14.408-19.811 14.408-19.811 8.276-11.539 12.769-24.594 12.769-38.699 0-35.898-29.102-65-65-65-35.899 0-65 29.102-65 65 0 13.667 4.217 26.348 12.405 38.2 0 0 10.754 13.61 14.746 20.31z"></path>
                                                    <circle class="bulb__flash" cx="-745.343" cy="743.939" r="83.725" fill="none" stroke-dasharray="10,30" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"></circle>
                                                    <path class="bulb__shine" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" d="M-789.19 757.501a45.897 45.897 0 013.915-36.189 45.897 45.897 0 0129.031-21.957"></path>
                                                </g>
                                            </svg>
                                        </div>
                                        <div class="theme-description">
                                            <h4>Theme Mode</h4>
                                            <span class="description">Switch between light and dark themes. Easy on the eyes and great for nighttime focus.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <!-- Tags Management -->
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

                        <!-- Danger Zone -->
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
            <!-- Style svg-light | inner settings.html-->
    <style>
        :root {
            --on: 0;
            --bg: hsl(calc(200 - (var(--on) * 160)), calc((20 + (var(--on) * 50)) * 1%), calc((20 + (var(--on) * 60)) * 1%));
            --cord: hsl(0, 0%, calc((60 - (var(--on) * 50)) * 1%));
            --stroke: hsl(0, 0%, calc((60 - (var(--on) * 50)) * 1%));
            --shine: hsla(0, 0%, 100%, calc(0.75 - (var(--on) * 0.5)));
            --cap: hsl(0, 0%, calc((40 + (var(--on) * 30)) * 1%));
            --filament: hsl(45, calc(var(--on) * 80%), calc((25 + (var(--on) * 75)) * 1%));
        }

        .toggle-scene {
            overflow: visible !important;
            /* position: absolute; */
            height: 200px;
        }

        .toggle-scene__cord {
            stroke: var(--cord);
            cursor: move;
        }

        .toggle-scene__cord:nth-of-type(1) {
            display: none;
        }

        .toggle-scene__cord:nth-of-type(2),
        .toggle-scene__cord:nth-of-type(3),
        .toggle-scene__cord:nth-of-type(4),
        .toggle-scene__cord:nth-of-type(5) {
            display: none;
        }

        .toggle-scene__cord-end {
            stroke: var(--cord);
            fill: var(--cord);
        }

        .toggle-scene__dummy-cord {
            stroke-width: 6;
            stroke: var(--cord);
        }

        .bulb__filament {
            stroke: var(--filament);
        }

        .bulb__shine {
            stroke: var(--shine);
        }

        .bulb__flash {
            stroke: #f5e0a3;
            display: none;
        }

        .bulb__bulb {
            stroke: var(--stroke);
            fill: hsla(calc(180 - (95 * var(--on))), 80%, 80%, calc(0.1 + (0.4 * var(--on))));
        }

        .bulb__cap {
            fill: var(--cap);
        }

        .bulb__cap-shine {
            fill: var(--shine);
        }

        .bulb__cap-outline {
            stroke: var(--stroke);
        }
    </style>
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
    
    const emailInput = document.getElementById('change-email');
    const currentPassword = document.getElementById('current-password');
    const userPassword = document.getElementById('user-password');
    const comfirmPassword = document.getElementById('comfirm-password');
    
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
    // initializePlugin();
}

function initializePlugin() {
    const {
            gsap: { registerPlugin, set, to, timeline },
            MorphSVGPlugin,
            Draggable
        } = window;
        registerPlugin(MorphSVGPlugin);

        let startX, startY;

        const AUDIO = {
            CLICK: new Audio('https://assets.codepen.io/605876/click.mp3')
        };

        const CORD_DURATION = 0.1;
        const CORDS = document.querySelectorAll('.toggle-scene__cord');
        const HIT = document.querySelector('.toggle-scene__hit-spot');
        const DUMMY_CORD = document.querySelector('.toggle-scene__dummy-cord line');
        const PROXY = document.createElement('div');

        const ENDX = DUMMY_CORD.getAttribute('x2');
        const ENDY = DUMMY_CORD.getAttribute('y2');
        const RESET = () => set(PROXY, { x: ENDX, y: ENDY });

        RESET();

        // Timeline này giờ chỉ tập trung vào animation kéo dây
        const CORD_TL = timeline({
            paused: true,
            onStart: () => {
                // KHI ANIMATION BẮT ĐẦU, GỌI HÀM TOGGLE THEME TOÀN CỤC
                if (typeof toggleTheme === 'function') {
                    toggleTheme();
                }

                // Phát âm thanh và quản lý các thành phần của animation
                AUDIO.CLICK.play();
                set([HIT], { display: 'none' });
                set(CORDS[0], { display: 'block' });
            },
            onComplete: () => {
                // Reset lại các thành phần của animation
                set([HIT], { display: 'block' });
                set(CORDS[0], { display: 'none' });
                RESET();
            }
        });

        // Xây dựng chuỗi animation
        for (let i = 1; i < CORDS.length; i++) {
            CORD_TL.add(
                to(CORDS[0], {
                    morphSVG: CORDS[i],
                    duration: CORD_DURATION,
                    repeat: 1,
                    yoyo: true
                })
            );
        }

        // Thiết lập sự kiện kéo
        Draggable.create(PROXY, {
            trigger: HIT,
            type: 'x,y',
            onPress: e => {
                startX = e.x;
                startY = e.y;
            },
            onDrag: function () {
                set(DUMMY_CORD, { attr: { x2: this.x, y2: this.y } });
            },
            onRelease: function (e) {
                const DISTX = Math.abs(e.x - startX);
                const DISTY = Math.abs(e.y - startY);
                const TRAVELLED = Math.sqrt(DISTX * DISTX + DISTY * DISTY);

                to(DUMMY_CORD, {
                    attr: { x2: ENDX, y2: ENDY },
                    duration: CORD_DURATION,
                    onComplete: () => {
                        // Nếu kéo đủ xa, chạy animation
                        if (TRAVELLED > 50) {
                            CORD_TL.restart();
                        } else {
                            RESET();
                        }
                    }
                });
            }
        });
}
export default SettingPage;