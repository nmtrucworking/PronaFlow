import { handleLoginSubmit, handleRegisterSubmit } from './handlers.js';
import { toggleForms } from './ui.js';

export function initializeAuth() {
    lucide.createIcons();

    const container = document.querySelector('.login-card');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    registerBtn?.addEventListener('click', () => toggleForms(container, 'register'));
    loginBtn?.addEventListener('click', () => toggleForms(container, 'login'));

    loginForm?.addEventListener('submit', (e) => handleLoginSubmit(e, loginForm));
    registerForm?.addEventListener('submit', (e) => handleRegisterSubmit(e, registerForm, container));
}
