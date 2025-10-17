USE db_PronaFlow;
GO
SELECT * FROM users
DELETE FROM users
DELETE FROM workspaces
GO
INSERT INTO [dbo].[users] ([username], [email], [password_hash], [full_name], [bio], [role]) VALUES
('creative_director', 'director@pronaflow.io', '$2a$12$newplaceholderhash', 'Alex Tran', N'Leading creative campaigns and inspiring teams to push the boundaries of design.', 'admin'),
('frontend_guru', 'guru@pronaflow.dev', '$2a$12$newplaceholderhash', N'Brenda Chen', N'Specializing in building intuitive and beautiful user interfaces with modern frameworks.', 'user'),
('backend_architect', 'architect@pronaflow.dev', '$2a$12$newplaceholderhash', N'Carlos Diaz', N'Architecting scalable and robust backend systems. Passionate about clean code and microservices.', 'user'),
('project_master', 'master@pronaflow.dev', '$2a$12$newplaceholderhash', N'Diana Prince', N'Agile project manager with a knack for keeping projects on time and under budget.', 'user'),
('qa_specialist', 'qa@pronaflow.dev', '$2a$12$newplaceholderhash', N'Evan Wright', N'Dedicated to ensuring the highest quality standards for all our software releases.', 'user');
GO
INSERT INTO [dbo].[workspaces] ([owner_id], [name], [description]) VALUES
(1, N'Marketing Campaigns HQ', N'Central hub for all marketing initiatives and creative projects for the fiscal year.'),
(1, N'Product Development Lab', N'Workspace for brainstorming, prototyping, and developing new product features.'),
(2, N'UI/UX Design Studio', N'A creative space for the design team to collaborate on user interface and experience designs.'),
(3, N'Backend Engineering Core', N'Focused on the development and maintenance of our core backend services and APIs.'),
(4, N'Agile Project Management', N'Workspace for tracking all ongoing projects using agile methodologies.');
GO
INSERT INTO [dbo].[projects] ([workspace_id], [name], [description], [status], [project_type], [start_date], [end_date], [is_archived]) VALUES
(1, N'Q4 Holiday Campaign', N'Launch a multi-platform marketing campaign for the holiday season to boost sales by 20%.', 'in-progress', 'team', '2025-10-01', '2025-12-25', 0),
(2, N'Mobile App Redesign', N'Complete overhaul of the mobile application to improve user engagement and modern-day aesthetics.', 'in-review', 'team', '2025-09-15', '2025-11-30', 0),
(3, N'Design System Implementation', N'Create and implement a new, unified design system across all company products.', 'done', 'team', '2025-08-01', '2025-10-15', 0),
(4, N'API Gateway Migration', N'Migrate the existing API gateway to a new, more scalable cloud-native solution.', 'not-started', 'team', '2025-11-01', '2026-01-15', 0),
(5, N'Scrum Process Optimization', N'A project to review and optimize our current Scrum processes for better efficiency.', 'in-progress', 'personal', '2025-10-10', '2025-11-20', 1);
GO
INSERT INTO [dbo].[task_lists] ([project_id], [name], [position]) VALUES
(1, N'Phase 1: Creative Concepts', 1),
(1, N'Phase 2: Content Creation', 2),
(2, N'Discovery & Wireframing', 1),
(2, N'High-Fidelity Mockups', 2),
(3, N'Component Library Setup', 1);
GO
INSERT INTO [dbo].[tasks] ([project_id], [task_list_id], [creator_id], [name], [description], [priority], [status], [end_date]) VALUES
(1, 1, 1, N'Brainstorm Campaign Themes', N'Hold a brainstorming session with the marketing and design teams to generate creative themes.', 'high', 'in-progress', '2025-10-20'),
(1, 2, 1, N'Draft Social Media Copy', N'Write compelling copy for all social media channels (Twitter, Instagram, Facebook).', 'normal', 'not-started', '2025-11-05'),
(2, 3, 2, N'User Persona Research', N'Conduct research and create detailed user personas to guide the redesign process.', 'high', 'done', '2025-09-30'),
(2, 4, 2, N'Create Login Screen Mockup', N'Design a modern and user-friendly login screen for the new mobile app.', 'high', 'in-review', '2025-10-25'),
(3, 5, 2, N'Set up Storybook for React Components', N'Initialize and configure Storybook to document and test our new React component library.', 'normal', 'done', '2025-08-20');
GO
INSERT INTO [dbo].[subtasks] ([task_id], [name], [is_completed], [position]) VALUES
(1, N'Schedule brainstorming meeting', 1, 1),
(1, N'Prepare presentation with market research', 1, 2),
(2, N'Write copy for 5 Instagram posts', 0, 1),
(4, N'Design 3 variations of the login button', 1, 1),
(4, N'Get feedback from the product manager', 0, 2);
GO
INSERT INTO [dbo].[tags] ([workspace_id], [name], [color_hex]) VALUES
(1, N'Social Media', '#3498db'),
(1, N'Ad Campaign', '#e74c3c'),
(2, N'Mobile', '#9b59b6'),
(2, N'UI Redesign', '#f1c40f'),
(3, N'Design System', '#2ecc71');
GO
INSERT INTO [dbo].[project_tags] ([project_id], [tag_id]) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5);
GO
INSERT INTO [dbo].[task_assignees] ([task_id], [user_id]) VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 2),
(4, 2);
GO
INSERT INTO [dbo].[task_dependencies] ([task_id], blocking_task_id) VALUES
(2, 1),
(4, 3);
GO
INSERT INTO [dbo].[comments] ([user_id], [content], [commentable_id], [commentable_type]) VALUES
(2, N'Great start on the personas! Could we add more details about their tech-savviness?', 3, 'task'),
(1, N'Love the direction of this login screen. Let''s try a version with a darker background.', 4, 'task'),
(4, N'The component library is looking solid. This will save us so much time in the long run.', 3, 'project');
GO
INSERT INTO [dbo].[attachments] ([uploaded_by_user_id], [attachable_id], [attachable_type], [original_filename], [storage_path], [file_type], [file_size]) VALUES
(2, 3, 'task', N'User_Personas_Research.pdf', N'/uploads/files/new-uuid-1/User_Personas_Research.pdf', 'application/pdf', 1234567),
(2, 4, 'task', N'Login_Mockup_v2.png', N'/uploads/files/new-uuid-2/Login_Mockup_v2.png', 'image/png', 543210);
GO
INSERT INTO [dbo].[activities] ([id], [user_id], [project_id], [content], [entity_id], [entity_type]) VALUES
(1, 1, 1, N'created a new task: Brainstorm Campaign Themes', 1, 'task'),
(2, 2, 2, N'completed the task: User Persona Research', 3, 'task'),
(3, 1, 1, N'assigned Brenda Chen to the task: Brainstorm Campaign Themes', 1, 'task');
GO
SELECT * FROM activities
INSERT INTO [dbo].[project_members] ([project_id], [user_id], [role]) VALUES
(1, 1, 'admin'),
(1, 2, 'member'),
(2, 2, 'admin'),
(2, 1, 'member'),
(3, 2, 'admin');
GO
INSERT INTO [dbo].[invitations] ([workspace_id], [inviter_id], [email], [token], [status]) VALUES
(1, 1, 'new.designer@example.com', 'new-invite-token-12345', 'pending');
GO
INSERT INTO [dbo].[notification_recipients] ([notification_id], [user_id], [is_read]) VALUES
(1, 2, 0),
(2, 1, 0),
(3, 2, 1);
GO
INSERT INTO [dbo].[password_resets] ([user_id], [token]) VALUES
(5, 'reset-token-for-evan-67890');
GO
INSERT INTO [dbo].[user_preferences] ([user_id], [theme], [language], [receive_notifications]) VALUES
(1, 'dark', 'en', 1),
(2, 'light', 'en', 1);
GO
SELECT * FROM user_preferences