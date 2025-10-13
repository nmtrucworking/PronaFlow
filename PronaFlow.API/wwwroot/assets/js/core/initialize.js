/**
 * Hàm điều hướng, gọi các hàm khởi tạo tương ứng với trang hiện tại.
 */
// Core Imports
import { applyTheme } from "./theme.js";
import { renderGreetingWidget } from "./utils.js";
// Modal imports
import { initializeProjectDetailModal } from "../modals/project-modal.js";
import { initializeTaskDetailModal } from "../modals/task-modal.js";
import { initializeStaticModalInteractions } from "../modals/modals.js";
// Page imports
import { initializeHomePage } from "../pages/home.js";
import { initializeMyTasksPage } from "../pages/my-task.js";
import { initializeCalendarPage } from "../pages/calendar.js";
import { initializeNotificationsPage } from "../pages/notification.js";
import { refreshKanbanFunctions } from "../pages/workspace.js";

// Constrants
const pagesWithProjectAndTaskModals = [
  '.dashboard',
  '.kanban-board',
  '.my-tasks-page',
  '.my-calendar'
];

// Initialize page specific functions
  const pageInitializers = {
    ".home-page": () => {
      initializeHomePage();
    },
    ".dashboard": () => {
      renderGreetingWidget();
    },
    ".kanban-board": refreshKanbanFunctions,
    ".my-tasks-page": initializeMyTasksPage,
    ".my-calendar": initializeCalendarPage,
    ".description--archive, .description--trash":
      initializeStaticModalInteractions,
    ".page__content--notifications": initializeNotificationsPage,
  };

// Initialize core features that should run on every page
function initializeCoreFeatures() {
  applyTheme();
  lucide.createIcons();
}

// Iniialize modals if current page needs them
function initializeModals() {
  const currentPage = document.querySelector(pagesWithProjectAndTaskModals.join(', '));
  if (currentPage) {
    initializeProjectDetailModal();
    initializeTaskDetailModal();
  }
}

/*
/* Main Initialization
 */
export function initializePageFunctions() {
  initializeCoreFeatures();

  initializeModals();

  // Execute initializers based on page content
  Object.entries(pageInitializers).forEach(([selector, initializer]) => {
    if (document.querySelector(selector)) {
      initializer();
    }
  });
}
