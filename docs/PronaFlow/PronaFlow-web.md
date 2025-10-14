# **Page 1**: My-Task Page
1. Task Management:

- Tasks can be viewed, created, updated and deleted
- Tasks have properties like:
    - Name
    - Status (Not Started, In Progress, In Review, Done)
    - Priority (High, Normal, Low)
    - Start date and due date
    - Assignees
    - Description
    - Subtasks
- Implementation in [my-task.js](vscode-file://vscode-app/c:/Users/win11/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-browser/workbench/workbench.html)

2. Task List Features:

- Search tasks
- Filter tasks by:
    - Project
    - Assignee
- Sort tasks by:
    - Due date
    - Priority
    - Creation date
    - Alphabetical
- Group tasks
- Task states shown by different background colors

3. Task Detail Panel:

- Shows detailed task info in sidebar
- Allows editing task properties
- Can manage subtasks
- Delete task option

4. API Integration:  
    From [call-api-my-task.txt](vscode-file://vscode-app/c:/Users/win11/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-browser/workbench/workbench.html):
```js
// Create task
POST /api/tasks

// Update task
PUT /api/tasks/{taskId} 

// Filter tasks
GET /api/tasks/filter

// Sort tasks
GET /api/tasks?sort={sortBy}

// Get all tasks
GET /api/tasks
```
5. User Interface:

- Modal dialogs for project and task details
- Context menus for task actions
- Empty state displays when no tasks
- Responsive layout with collapsible sidebar

The code follows a modular architecture with separation between:

- Core functionality (assets/js/core)
- Modal dialogs (assets/js/modals)
- Page-specific logic (assets/js/pages)