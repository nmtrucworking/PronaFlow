﻿-- ================================================
--	PronaFlow Database Schema for Microsoft SQL Server
--  DATABASE: PronaFlow
--  PURPOSE : Hệ thống quản lý học tập, dự án và công việc sinh viên
--  AUTHOR  : Nguyễn Minh Trúc
--  VERSION : SQL Server 2022 (Production Ready)
--  PronaFlow-Version 1.0
--  T-SQL Script
-- =================================================================================

CREATE DATABASE db_PronaFlow
ON
(
    NAME = N'db_PronaFlow_Data',
    FILENAME = N'D:\DATABASE_SQLSV\PronaFlow\db_PronaFlow.mdf',
    SIZE = 2048MB,
    MAXSIZE = UNLIMITED,
    FILEGROWTH = 256MB
)
LOG ON
(
    NAME = N'db_PronaFlow_Log',
    FILENAME = N'D:\DATABASE_SQLSV\PronaFlow\db_PronaFlow.ldf',
    SIZE = 512MB,
	MAXSIZE = 10GB,
    FILEGROWTH = 128MB
);
GO

USE db_PronaFlow;
GO

-- ================================================
--  CẤU HÌNH CƠ BẢN SAU KHI TẠO DATABASE
-- ================================================

-- Bật tính năng nén dữ liệu (giúp giảm kích thước lưu trữ)
ALTER DATABASE db_PronaFlow
SET AUTO_SHRINK OFF,
    AUTO_CLOSE OFF,
    RECOVERY SIMPLE,
    COMPATIBILITY_LEVEL = 160;  -- SQL Server 2022
GO

-- Đặt collation UTF-8 hỗ trợ tiếng Việt và đa ngôn ngữ
ALTER DATABASE db_PronaFlow
COLLATE Latin1_General_100_CI_AS_SC_UTF8;
GO

-- Tạo thư mục lưu trữ riêng (nếu cần cho FILESTREAM / attachments)
-- EXEC sp_configure filestream_access_level, 2; RECONFIGURE;
-- ALTER DATABASE db_PronaFlow ADD FILEGROUP PronaFlow_Files CONTAINS FILESTREAM;
-- ALTER DATABASE db_PronaFlow ADD FILE (
--     NAME = N'PronaFlow_Files',
--     FILENAME = N'D:\DATABASE_SQLSV\PronaFlow\Files'
-- ) TO FILEGROUP PronaFlow_Files;
-- GO

-- ================================================
--  KIỂM TRA THÔNG TIN DATABASE
-- ================================================
SELECT
    name AS [LogicalName],
    physical_name AS [FilePath],
    size / 128.0 AS [SizeMB],
    max_size / 128.0 AS [MaxSizeMB],
    growth / 128.0 AS [GrowthMB]
FROM sys.database_files;
GO

--=======================================================--
--============CREATE TABLE===============================--
--=======================================================--
USE db_PronaFlow;
GO
-- ---------------------------------------------------------------------------------
-- I. XÓA CÁC ĐỐI TƯỢNG HIỆN CÓ (ĐỂ CHẠY LẠI SCRIPT)
-- Xóa theo thứ tự ngược lại của sự phụ thuộc để tránh lỗi khóa ngoại
-- ---------------------------------------------------------------------------------
IF OBJECT_ID('[dbo].[sp_SoftDeleteUser]', 'P') IS NOT NULL DROP PROCEDURE [dbo].[sp_SoftDeleteUser];
IF OBJECT_ID('[dbo].[sp_DuplicateProject]', 'P') IS NOT NULL DROP PROCEDURE [dbo].[sp_DuplicateProject];

IF OBJECT_ID('[dbo].[task_dependencies]', 'U') IS NOT NULL DROP TABLE [dbo].[task_dependencies];
IF OBJECT_ID('[dbo].[notification_recipients]', 'U') IS NOT NULL DROP TABLE [dbo].[notification_recipients];
IF OBJECT_ID('[dbo].[project_tags]', 'U') IS NOT NULL DROP TABLE [dbo].[project_tags];
IF OBJECT_ID('[dbo].[task_assignees]', 'U') IS NOT NULL DROP TABLE [dbo].[task_assignees];
IF OBJECT_ID('[dbo].[project_members]', 'U') IS NOT NULL DROP TABLE [dbo].[project_members];
IF OBJECT_ID('[dbo].[password_resets]', 'U') IS NOT NULL DROP TABLE [dbo].[password_resets];
IF OBJECT_ID('[dbo].[user_preferences]', 'U') IS NOT NULL DROP TABLE [dbo].[user_preferences];
IF OBJECT_ID('[dbo].[comments]', 'U') IS NOT NULL DROP TABLE [dbo].[comments];
IF OBJECT_ID('[dbo].[invitations]', 'U') IS NOT NULL DROP TABLE [dbo].[invitations];
IF OBJECT_ID('[dbo].attachments', 'U') IS NOT NULL DROP TABLE [dbo].attachments;
IF OBJECT_ID('[dbo].[activities]', 'U') IS NOT NULL DROP TABLE [dbo].[activities];
IF OBJECT_ID('[dbo].[tags]', 'U') IS NOT NULL DROP TABLE [dbo].[tags];
IF OBJECT_ID('[dbo].[subtasks]', 'U') IS NOT NULL DROP TABLE [dbo].[subtasks];
IF OBJECT_ID('[dbo].[tasks]', 'U') IS NOT NULL DROP TABLE [dbo].[tasks];
IF OBJECT_ID('[dbo].[task_lists]', 'U') IS NOT NULL DROP TABLE [dbo].[task_lists];
IF OBJECT_ID('[dbo].[projects]', 'U') IS NOT NULL DROP TABLE [dbo].[projects];
IF OBJECT_ID('[dbo].[workspaces]', 'U') IS NOT NULL DROP TABLE [dbo].[workspaces];
IF OBJECT_ID('[dbo].[users]', 'U') IS NOT NULL DROP TABLE [dbo].[users];
GO

-- ---------------------------------------------------------------------------------
-- II. TẠO CÁC BẢNG (TABLE CREATION)
-- ---------------------------------------------------------------------------------

-- Bảng 1: users
CREATE TABLE [dbo].[users] (
    [id]		BIGINT IDENTITY(1,1) NOT NULL,
    [username]	NVARCHAR(50) NOT NULL,
    [email]		NVARCHAR(255) NOT NULL,
    [password_hash] NVARCHAR(255) NOT NULL,
    [full_name] NVARCHAR(100) NOT NULL,
    [avatar_url] NVARCHAR(255) NULL,
    [bio]		NVARCHAR(MAX) NULL,
    [theme_preference] NVARCHAR(10) NOT NULL CONSTRAINT [df_users_theme] DEFAULT 'light',
    [role] NVARCHAR(10) NOT NULL CONSTRAINT [df_users_role] DEFAULT 'user',
    [is_deleted] BIT NOT NULL CONSTRAINT [df_users_is_deleted] DEFAULT 0,
    [deleted_at] DATETIME2 NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [df_users_created_at] DEFAULT GETDATE(),
    [updated_at] DATETIME2 NOT NULL CONSTRAINT [df_users_updated_at] DEFAULT GETDATE(),
    CONSTRAINT [pk_users] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [uq_users_email] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [uq_users_username] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [chk_users_theme] CHECK ([theme_preference] IN ('light', 'dark')),
    CONSTRAINT [chk_users_role] CHECK ([role] IN ('user', 'admin'))
);
GO

-- Bảng 2: workspaces
CREATE TABLE [dbo].[workspaces] (
    [id] BIGINT IDENTITY(1,1) NOT NULL,
    [owner_id] BIGINT NOT NULL,
    [name] NVARCHAR(100) NOT NULL,
    [description] NVARCHAR(MAX) NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [df_workspaces_created_at] DEFAULT GETDATE(),
    [updated_at] DATETIME2 NOT NULL CONSTRAINT [df_workspaces_updated_at] DEFAULT GETDATE(),
    CONSTRAINT [pk_workspaces] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [fk_workspaces_users] FOREIGN KEY ([owner_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE
);
GO

-- Bảng 3: projects
CREATE TABLE [dbo].[projects] (
    [id]			BIGINT IDENTITY(1,1) NOT NULL,
    [workspace_id]	BIGINT NOT NULL,
    [name]			NVARCHAR(255) NOT NULL,
    [description]	NVARCHAR(MAX) NULL,
    [cover_image_url] NVARCHAR(255) NULL,
    [status]		NVARCHAR(20) NOT NULL CONSTRAINT [df_projects_status] DEFAULT 'temp',
    [project_type]	NVARCHAR(10) NOT NULL CONSTRAINT [df_projects_project_type] DEFAULT 'personal',
    [start_date]	DATE NULL,
    [end_date]		DATE NULL,
    [is_archived]	BIT NOT NULL CONSTRAINT [df_projects_is_archived] DEFAULT 0,
    [is_deleted]	BIT NOT NULL CONSTRAINT [df_projects_is_deleted] DEFAULT 0,
    [deleted_at]	DATETIME2 NULL,
    [created_at]	DATETIME2 NOT NULL CONSTRAINT [df_projects_created_at] DEFAULT GETDATE(),
    [updated_at]	DATETIME2 NOT NULL CONSTRAINT [df_projects_updated_at] DEFAULT GETDATE(),
    CONSTRAINT [pk_projects] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [fk_projects_workspaces] FOREIGN KEY ([workspace_id]) REFERENCES [dbo].[workspaces]([id]) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT [chk_projects_status] CHECK ([status] IN ('temp', 'not-started', 'in-progress', 'in-review', 'done')),
    CONSTRAINT [chk_projects_project_type] CHECK ([project_type] IN ('personal', 'team'))
);
GO

-- Bảng 4: task_lists
CREATE TABLE [dbo].[task_lists] (
    [id]			BIGINT IDENTITY(1,1) NOT NULL,
    [project_id]	BIGINT NOT NULL,
    [name]			NVARCHAR(100) NOT NULL,
    [position]		INT NOT NULL,
    CONSTRAINT [pk_task_lists] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [fk_task_lists_projects] FOREIGN KEY ([project_id]) REFERENCES [dbo].[projects]([id]) ON DELETE NO ACTION ON UPDATE CASCADE,
    --CONSTRAINT [uq_task_lists_project_id_name] UNIQUE NONCLUSTERED ([project_id], [name])
);
GO
ALTER TABLE [dbo].[task_lists]
DROP CONSTRAINT [uq_task_lists_project_id_name];
GO
-- Bảng 5: tasks
CREATE TABLE [dbo].[tasks] (
    [id] BIGINT IDENTITY(1,1) NOT NULL,
    [project_id] BIGINT NOT NULL,
    [task_list_id] BIGINT NOT NULL,
    [creator_id] BIGINT NOT NULL,
    [name] NVARCHAR(255) NOT NULL,
    [description] NVARCHAR(MAX) NULL,
    [priority] NVARCHAR(10) NOT NULL CONSTRAINT [df_tasks_priority] DEFAULT 'normal',
    [status] NVARCHAR(20) NOT NULL CONSTRAINT [df_tasks_status] DEFAULT 'not-started',
    [start_date] DATE NULL,
    [end_date] DATETIME2 NULL,
    [is_recurring] BIT NOT NULL CONSTRAINT [df_tasks_is_recurring] DEFAULT 0,
    [recurrence_rule] NVARCHAR(255) NULL,
    [next_recurrence_date] DATE NULL,
    [is_deleted] BIT NOT NULL CONSTRAINT [df_tasks_is_deleted] DEFAULT 0,
    [deleted_at] DATETIME2 NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [df_tasks_created_at] DEFAULT GETDATE(),
    [updated_at] DATETIME2 NOT NULL CONSTRAINT [df_tasks_updated_at] DEFAULT GETDATE(),
    CONSTRAINT [pk_tasks] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [fk_tasks_projects] FOREIGN KEY ([project_id]) REFERENCES [dbo].[projects]([id]) ON DELETE NO ACTION, -- No Cascade on purpose
    CONSTRAINT [fk_tasks_task_lists] FOREIGN KEY ([task_list_id]) REFERENCES [dbo].[task_lists]([id]) ON DELETE NO ACTION,
    CONSTRAINT [fk_tasks_users_creator] FOREIGN KEY ([creator_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT [chk_tasks_priority] CHECK ([priority] IN ('low', 'normal', 'high')),
    CONSTRAINT [chk_tasks_status] CHECK ([status] IN ('not-started', 'in-progress', 'in-review', 'done'))
);
GO

-- Bảng 6: subtasks
CREATE TABLE [dbo].[subtasks] (
    [id] BIGINT IDENTITY(1,1) NOT NULL,
    [task_id] BIGINT NOT NULL,
    [name] NVARCHAR(255) NOT NULL,
    [is_completed] BIT NOT NULL CONSTRAINT [df_subtasks_is_completed] DEFAULT 0,
    [position] INT NOT NULL,
    CONSTRAINT [pk_subtasks] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [fk_subtasks_tasks] FOREIGN KEY ([task_id]) REFERENCES [dbo].[tasks]([id]) ON DELETE CASCADE ON UPDATE CASCADE
);
GO

-- Bảng 7: tags
CREATE TABLE [dbo].[tags] (
    [id] BIGINT IDENTITY(1,1) NOT NULL,
    [workspace_id] BIGINT NOT NULL,
    [name] NVARCHAR(50) NOT NULL,
    [color_hex] NVARCHAR(7) NOT NULL,
    CONSTRAINT [pk_tags] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [fk_tags_workspaces] FOREIGN KEY ([workspace_id]) REFERENCES [dbo].[workspaces]([id]) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT [uq_tags_workspace_id_name] UNIQUE NONCLUSTERED ([workspace_id], [name])
);
GO

ALTER TABLE [dbo].[tags]
DROP CONSTRAINT [uq_tags_workspace_id_name];
GO

-- Bảng 8: activities
CREATE TABLE [dbo].[activities] (
    [id] BIGINT IDENTITY(1,1) NOT NULL,
    [user_id] BIGINT NOT NULL,
    [action_type] NVARCHAR(50) NOT NULL,
    [target_id] BIGINT NOT NULL,
    [target_type] NVARCHAR(10) NOT NULL,
    [content] NVARCHAR(MAX) NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [df_activities_created_at] DEFAULT GETDATE(),
    CONSTRAINT [pk_activities] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [fk_activities_users] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT [chk_activities_action_type] CHECK ([action_type] IN (
        'project_create', 'project_update_status', 'project_update_details', 'project_add_member', 'project_remove_member', 'project_archive', 
        'project_restore', 'project_delete', 'project_move_workspace', 'project_duplicate',
        'tasklist_create', 'tasklist_rename', 'tasklist_reorder', 'tasklist_delete',
        'task_create', 'task_update_status', 'task_assign', 'task_change_priority', 'task_set_deadline', 'task_delete', 'task_restore', 
        'task_move_tasklist',
        'subtask_create', 'subtask_update', 'subtask_complete', 'subtask_delete',
        'user_mention', 'comment_add', 'attachment_add', 'attachment_remove',
        'system_deadline_reminder', 'system_task_overdue'
    )),
    CONSTRAINT [chk_activities_target_type] CHECK ([target_type] IN ('project', 'task')),
    CONSTRAINT [chk_activities_content_is_json] CHECK (ISJSON([content]) > 0)
);
GO

-- Bảng 9: attachments
CREATE TABLE [dbo].[attachments] (
    [id] BIGINT IDENTITY(1,1) NOT NULL,
    [uploaded_by_user_id] BIGINT NOT NULL,
    [attachable_id] BIGINT NOT NULL,
    [attachable_type] NVARCHAR(10) NOT NULL,
    [original_filename] NVARCHAR(255) NOT NULL,
    [storage_path] NVARCHAR(512) NOT NULL,
    [file_type] NVARCHAR(100) NULL,
    [file_size] BIGINT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [df_attachments_created_at] DEFAULT GETDATE(),
    CONSTRAINT [pk_attachments] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [fk_attachments_users] FOREIGN KEY ([uploaded_by_user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT [chk_attachments_attachable_type] CHECK ([attachable_type] IN ('project', 'task'))
);
GO
CREATE NONCLUSTERED INDEX [idx_attachable] ON [dbo].[attachments] ([attachable_id], [attachable_type]);
GO

-- Bảng 10: invitations
CREATE TABLE [dbo].[invitations] (
    [id] BIGINT IDENTITY(1,1) NOT NULL,
    [project_id] BIGINT NOT NULL,
    [inviter_id] BIGINT NOT NULL,
    [invitee_email] NVARCHAR(255) NOT NULL,
    [token] NVARCHAR(255) NOT NULL,
    [status] NVARCHAR(10) NOT NULL CONSTRAINT [df_invitations_status] DEFAULT 'pending',
    [expires_at] DATETIME2 NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [df_invitations_created_at] DEFAULT GETDATE(),
    CONSTRAINT [pk_invitations] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [uq_invitations_token] UNIQUE NONCLUSTERED ([token]),
    CONSTRAINT [fk_invitations_projects] FOREIGN KEY ([project_id]) REFERENCES [dbo].[projects]([id]) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT [fk_invitations_users_inviter] FOREIGN KEY ([inviter_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION, -- No Cascade
    CONSTRAINT [chk_invitations_status] CHECK ([status] IN ('pending', 'accepted', 'declined', 'expired'))
);
GO

-- Bảng 11: comments
CREATE TABLE [dbo].[comments] (
    [id] BIGINT IDENTITY(1,1) NOT NULL,
    [user_id] BIGINT NOT NULL,
    [content] NVARCHAR(MAX) NOT NULL,
    [commentable_id] BIGINT NOT NULL,
    [commentable_type] NVARCHAR(10) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [df_comments_created_at] DEFAULT GETDATE(),
    CONSTRAINT [pk_comments] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [fk_comments_users] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT [chk_comments_commentable_type] CHECK ([commentable_type] IN ('project', 'task'))
);
GO
CREATE NONCLUSTERED INDEX [idx_commentable] ON [dbo].[comments] ([commentable_id], [commentable_type]);
GO

-- Bảng 12: user_preferences
CREATE TABLE [dbo].[user_preferences] (
    [user_id] BIGINT NOT NULL,
    [setting_key] NVARCHAR(100) NOT NULL,
    [setting_value] NVARCHAR(255) NOT NULL,
    CONSTRAINT [pk_user_preferences] PRIMARY KEY CLUSTERED ([user_id], [setting_key]),
    CONSTRAINT [fk_user_preferences_users] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE CASCADE ON UPDATE CASCADE
);
GO

-- Bảng 13: password_resets
CREATE TABLE [dbo].[password_resets] (
    [email] NVARCHAR(255) NOT NULL,
    [token] NVARCHAR(255) NOT NULL,
    [expires_at] DATETIME2 NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [df_password_resets_created_at] DEFAULT GETDATE(),
    CONSTRAINT [pk_password_resets] PRIMARY KEY CLUSTERED ([token])
);
GO
CREATE NONCLUSTERED INDEX [idx_password_resets_email] ON [dbo].[password_resets] ([email]);
GO

-- Bảng 14: project_members (Bảng nối)
CREATE TABLE [dbo].[project_members] (
    [project_id] BIGINT NOT NULL,
    [user_id] BIGINT NOT NULL,
    [role] NVARCHAR(10) NOT NULL CONSTRAINT [df_project_members_role] DEFAULT 'member',
    CONSTRAINT [pk_project_members] PRIMARY KEY CLUSTERED ([project_id], [user_id]),
    CONSTRAINT [fk_project_members_projects] FOREIGN KEY ([project_id]) REFERENCES [dbo].[projects]([id]) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT [fk_project_members_users] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE CASCADE,
    CONSTRAINT [chk_project_members_role] CHECK ([role] IN ('admin', 'member'))
);
GO

-- Bảng 15: task_assignees (Bảng nối)
CREATE TABLE [dbo].[task_assignees] (
    [task_id] BIGINT NOT NULL,
    [user_id] BIGINT NOT NULL,
    CONSTRAINT [pk_task_assignees] PRIMARY KEY CLUSTERED ([task_id], [user_id]),
    CONSTRAINT [fk_task_assignees_tasks] FOREIGN KEY ([task_id]) REFERENCES [dbo].[tasks]([id]) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT [fk_task_assignees_users] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE CASCADE
);
GO

-- Bảng 16: project_tags (Bảng nối)
CREATE TABLE [dbo].[project_tags] (
    [project_id] BIGINT NOT NULL,
    [tag_id] BIGINT NOT NULL,
    CONSTRAINT [pk_project_tags] PRIMARY KEY CLUSTERED ([project_id], [tag_id]),
    CONSTRAINT [fk_project_tags_projects] FOREIGN KEY ([project_id]) REFERENCES [dbo].[projects]([id]) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT [fk_project_tags_tags] FOREIGN KEY ([tag_id]) REFERENCES [dbo].[tags]([id]) ON DELETE CASCADE
);
GO


-- Bảng 17: notification_recipients (Bảng nối)
CREATE TABLE [dbo].[notification_recipients] (
    [activity_id] BIGINT NOT NULL,
    [user_id] BIGINT NOT NULL,
    [is_read] BIT NOT NULL CONSTRAINT [df_notification_recipients_is_read] DEFAULT 0,
    CONSTRAINT [pk_notification_recipients] PRIMARY KEY CLUSTERED ([activity_id], [user_id]),
    CONSTRAINT [fk_notification_recipients_activities] FOREIGN KEY ([activity_id]) REFERENCES [dbo].[activities]([id]) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT [fk_notification_recipients_users] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE CASCADE
);
GO

-- Bảng 18: task_dependencies (Bảng nối)
CREATE TABLE [dbo].[task_dependencies] (
    [task_id] BIGINT NOT NULL,
    [blocking_task_id] BIGINT NOT NULL,
    CONSTRAINT [pk_task_dependencies] PRIMARY KEY CLUSTERED ([task_id], [blocking_task_id]),
    CONSTRAINT [fk_task_dependencies_tasks] FOREIGN KEY ([task_id]) REFERENCES [dbo].[tasks]([id]) ON DELETE CASCADE,
    CONSTRAINT [fk_task_dependencies_tasks_blocking] FOREIGN KEY ([blocking_task_id]) REFERENCES [dbo].[tasks]([id]) ON DELETE NO ACTION -- No Cascade
);
GO

-- ---------------------------------------------------------------------------------
-- III. TRIGGERS - TỰ ĐỘNG HÓA NGHIỆP VỤ
-- ---------------------------------------------------------------------------------

-- Trigger để tự động cập nhật cột [updated_at]
CREATE TRIGGER [trg_users_UpdateTimestamp] ON [dbo].[users]
AFTER UPDATE AS
BEGIN
    UPDATE [dbo].[users]
    SET [updated_at] = GETDATE()
    FROM [inserted]
    WHERE [dbo].[users].[id] = [inserted].[id];
END;
GO

CREATE TRIGGER [trg_workspaces_UpdateTimestamp] ON [dbo].[workspaces]
AFTER UPDATE AS
BEGIN
    UPDATE [dbo].[workspaces]
    SET [updated_at] = GETDATE()
    FROM [inserted]
    WHERE [dbo].[workspaces].[id] = [inserted].[id];
END;
GO

CREATE TRIGGER [trg_projects_UpdateTimestamp] ON [dbo].[projects]
AFTER UPDATE AS
BEGIN
    UPDATE [dbo].[projects]
    SET [updated_at] = GETDATE()
    FROM [inserted]
    WHERE [dbo].[projects].[id] = [inserted].[id];
END;
GO

CREATE TRIGGER [trg_tasks_UpdateTimestamp] ON [dbo].[tasks]
AFTER UPDATE AS
BEGIN
    UPDATE [dbo].[tasks]
    SET [updated_at] = GETDATE()
    FROM [inserted]
    WHERE [dbo].[tasks].[id] = [inserted].[id];
END;
GO


-- Trigger 1: Tự động tạo workspace mặc định cho người dùng mới
CREATE TRIGGER [trg_after_user_insert]
ON [dbo].[users]
AFTER INSERT
AS
BEGIN
    INSERT INTO [dbo].[workspaces] ([owner_id], [name], [description])
    SELECT 
        i.id, 
        i.full_name + N'''s Workspace', 
        N'Your first workspace'
    FROM [inserted] i;
END;
GO

-- Trigger 2: Tự động chuyển project_type từ 'personal' sang 'team'
CREATE TRIGGER [trg_after_project_member_insert]
ON [dbo].[project_members]
AFTER INSERT
AS
BEGIN
    DECLARE @project_id BIGINT;
    SELECT @project_id = [project_id] FROM [inserted];

    DECLARE @member_count INT;
    SELECT @member_count = COUNT(*) FROM [dbo].[project_members] WHERE [project_id] = @project_id;

    IF @member_count > 1
    BEGIN
        UPDATE [dbo].[projects] 
        SET [project_type] = 'team' 
        WHERE [id] = @project_id AND [project_type] = 'personal';
    END;
END;
GO

-- Trigger 3: Tự động gán `position` cho task_list mới
CREATE TRIGGER [trg_insteadof_tasklist_insert]
ON [dbo].[task_lists]
INSTEAD OF INSERT
AS
BEGIN
    -- Sử dụng cursor để xử lý trường hợp chèn nhiều dòng cùng lúc
    DECLARE @project_id BIGINT, @name NVARCHAR(100);
    DECLARE insert_cursor CURSOR FOR
    SELECT [project_id], [name] FROM [inserted];

    OPEN insert_cursor;
    FETCH NEXT FROM insert_cursor INTO @project_id, @name;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        DECLARE @max_pos INT;
        SELECT @max_pos = ISNULL(MAX([position]), 0) FROM [dbo].[task_lists] WHERE [project_id] = @project_id;

        INSERT INTO [dbo].[task_lists] ([project_id], [name], [position])
        VALUES (@project_id, @name, @max_pos + 1);

        FETCH NEXT FROM insert_cursor INTO @project_id, @name;
    END;

    CLOSE insert_cursor;
    DEALLOCATE insert_cursor;
END;
GO

-- Trigger 4: Ngăn chặn việc bắt đầu một task phụ thuộc khi task chặn chưa hoàn thành
CREATE TRIGGER [trg_before_task_update_check_deps]
ON [dbo].[tasks]
AFTER UPDATE
AS
BEGIN
    IF UPDATE([status])
    BEGIN
        IF EXISTS (
            SELECT 1
            FROM [inserted] i
            JOIN [dbo].[task_dependencies] td ON i.id = td.task_id
            JOIN [dbo].[tasks] blocking_task ON td.blocking_task_id = blocking_task.id
            WHERE i.[status] IN ('in-progress', 'done') AND blocking_task.[status] != 'done'
        )
        BEGIN
			ROLLBACK TRANSACTION;
			THROW 51000, 'Cannot start or complete this task. It depends on other tasks that are not yet done.', 1;
		END
    END
END;
GO

-- ---------------------------------------------------------------------------------
-- IV. STORED PROCEDURES - ĐÓNG GÓI CÁC NGHIỆP VỤ PHỨC TẠP
-- ---------------------------------------------------------------------------------
-- =================================================================================
-- I. VIEWS (For Query Simplification & Read Performance)
-- Các View giúp đơn giản hóa việc truy vấn dữ liệu thường xuyên.
-- =================================================================================

-- View 1: Cung cấp thông tin chi tiết về Tasks
-- Mục đích: Gom sẵn thông tin của task, project, task list và người tạo để dễ dàng truy vấn.
CREATE OR ALTER VIEW [dbo].[vw_TaskDetails]
AS
SELECT 
    t.id AS task_id,
    t.name AS task_name,
    t.description AS task_description,
    t.priority AS task_priority,
    t.status AS task_status,
    t.start_date AS task_start_date,
    t.end_date AS task_end_date,
    t.created_at AS task_created_at,
    p.id AS project_id,
    p.name AS project_name,
    tl.id AS task_list_id,
    tl.name AS task_list_name,
    u.id AS creator_id,
    u.full_name AS creator_full_name,
    w.id AS workspace_id
FROM 
    [dbo].[tasks] t
JOIN 
    [dbo].[projects] p ON t.project_id = p.id
JOIN 
    [dbo].[task_lists] tl ON t.task_list_id = tl.id
JOIN 
    [dbo].[users] u ON t.creator_id = u.id
JOIN
    [dbo].[workspaces] w ON p.workspace_id = w.id
WHERE 
    t.is_deleted = 0 AND p.is_deleted = 0;
GO

-- View 2: Cung cấp thông tin tổng quan về Projects
-- Mục đích: Thống kê nhanh số lượng task, task hoàn thành và số thành viên của mỗi dự án.
CREATE OR ALTER VIEW [dbo].[vw_ProjectDetails]
AS
SELECT
    p.id AS project_id,
    p.name AS project_name,
    p.status AS project_status,
    p.workspace_id,
    (SELECT COUNT(*) FROM [dbo].[tasks] t WHERE t.project_id = p.id AND t.is_deleted = 0) AS total_tasks,
    (SELECT COUNT(*) FROM [dbo].[tasks] t WHERE t.project_id = p.id AND t.status = 'done' AND t.is_deleted = 0) AS completed_tasks,
    (SELECT COUNT(*) FROM [dbo].[project_members] pm WHERE pm.project_id = p.id) AS member_count
FROM
    [dbo].[projects] p
WHERE
    p.is_deleted = 0;
GO

-- =================================================================================
--  PronaFlow - Auxiliary SQL Server Objects
--  PURPOSE: Stored Procedures and Views to support application logic. (For Business Logic & Data Retrieval)
-- Các Stored Procedure đóng gói logic nghiệp vụ, giúp frontend gọi dữ liệu hiệu quả.
--  AUTHOR:  Nguyễn Minh Trúc (Generated by Assistant)
--  VERSION: 1.0
-- =================================================================================

USE db_PronaFlow;
GO

-- Procedure 1: Nhân bản một dự án
CREATE PROCEDURE [dbo].[sp_DuplicateProject]
    @SourceProjectID BIGINT,
    @UserID BIGINT -- ID của người thực hiện nhân bản
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

    BEGIN TRY
        DECLARE @NewProjectID BIGINT;
        DECLARE @NewProjectName NVARCHAR(255);
        -- Bảng tạm để lưu ánh xạ giữa ID cũ và ID mới của task_lists
        DECLARE @TaskListMap TABLE (OldTaskListID BIGINT, NewTaskListID BIGINT);

        -- Bước 1: Tạo dự án mới (Không thay đổi)
        SELECT @NewProjectName = [name] + N' (Copy)' FROM [dbo].[projects] WHERE [id] = @SourceProjectID;

        INSERT INTO [dbo].[projects] ([workspace_id], [name], [description], [cover_image_url], [status], [project_type])
        SELECT 
            [workspace_id], 
            @NewProjectName, 
            [description], 
            [cover_image_url], 
            'not-started', -- Reset status
            'personal'     -- Reset type
        FROM [dbo].[projects]
        WHERE [id] = @SourceProjectID;

        SET @NewProjectID = SCOPE_IDENTITY();

        -- Thêm người nhân bản làm admin cho dự án mới
        INSERT INTO [dbo].[project_members] ([project_id], [user_id], [role]) VALUES (@NewProjectID, @UserID, 'admin');

        -- ==============================================================================
        -- BƯỚC 2: SAO CHÉP GIAI ĐOẠN (TASK_LISTS) - PHẦN ĐÃ SỬA LỖI
        -- Sử dụng MERGE để chèn và lấy ra cả ID cũ và ID mới một cách chính xác
        -- ==============================================================================
        MERGE INTO [dbo].[task_lists] AS Target
        USING (
            SELECT [id], [name], [position] 
            FROM [dbo].[task_lists] 
            WHERE project_id = @SourceProjectID
        ) AS Source
        ON (1 = 0) -- Luôn luôn không khớp để kích hoạt mệnh đề INSERT
        WHEN NOT MATCHED THEN
            INSERT ([project_id], [name], [position])
            VALUES (@NewProjectID, Source.[name], Source.[position])
        OUTPUT Source.[id], inserted.[id] -- Lấy ID cũ từ Source và ID mới từ inserted
        INTO @TaskListMap (OldTaskListID, NewTaskListID);


        -- Bước 3: Sao chép Công việc (tasks) (Không thay đổi, logic này đã đúng)
        INSERT INTO [dbo].[tasks] ([project_id], [task_list_id], [creator_id], [name], [description], [priority], [status])
        SELECT 
            @NewProjectID,
            map.NewTaskListID, -- Sử dụng ID mới từ bảng ánh xạ
            @UserID, -- Người tạo là người nhân bản
            t.[name],
            t.[description],
            t.[priority],
            'not-started' -- Reset status
        FROM [dbo].[tasks] t
        JOIN @TaskListMap map ON t.task_list_id = map.OldTaskListID
        WHERE t.project_id = @SourceProjectID;

        -- Ghi lại hoạt động
        INSERT INTO [dbo].[activities] ([user_id], [action_type], [target_id], [target_type], [content])
        VALUES (@UserID, 'project_duplicate', @NewProjectID, 'project', CONCAT(N'{"source_project_id":', @SourceProjectID, '}'));
        
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        THROW; -- Ném lại lỗi để ứng dụng có thể bắt được
    END CATCH;
END;
GO

-- Procedure 2: Xóa mềm một người dùng và các tài nguyên liên quan
CREATE PROCEDURE [dbo].[sp_SoftDeleteUser]
    @UserID BIGINT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

    BEGIN TRY
        DECLARE @Now DATETIME2 = GETDATE();

        -- Bước 1: Cập nhật bảng users
        UPDATE [dbo].[users]
        SET [is_deleted] = 1, [deleted_at] = @Now
        WHERE [id] = @UserID AND [is_deleted] = 0;

        -- Nếu không có dòng nào được cập nhật, có thể người dùng không tồn tại hoặc đã bị xóa
        IF @@ROWCOUNT = 0
        BEGIN
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Bước 2: Xóa mềm các project thuộc workspace mà người này sở hữu
        UPDATE p
        SET p.[is_deleted] = 1, p.[deleted_at] = @Now
        FROM [dbo].[projects] p
        JOIN [dbo].[workspaces] w ON p.workspace_id = w.id
        WHERE w.owner_id = @UserID;

        -- Bước 3: Xóa mềm các tasks do người này tạo
        UPDATE [dbo].[tasks]
        SET [is_deleted] = 1, [deleted_at] = @Now
        WHERE [creator_id] = @UserID;
        
        -- Bước 4: Hủy các lời mời mà người này đã gửi
        UPDATE [dbo].[invitations]
        SET [status] = 'expired'
        WHERE [inviter_id] = @UserID AND [status] = 'pending';

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

-- SP 1: Lấy các số liệu cho Dashboard
-- Hỗ trợ JS function: loadDashboardMetrics()
CREATE OR ALTER PROCEDURE [dbo].[sp_GetUserDashboardMetrics]
    @UserID BIGINT
AS
BEGIN
    SET NOCOUNT ON;

    -- Đếm tổng số dự án mà user là thành viên
    DECLARE @TotalProjects INT;
    SELECT @TotalProjects = COUNT(DISTINCT project_id) 
    FROM [dbo].[project_members] 
    WHERE user_id = @UserID;

    -- Đếm tổng số task đang làm (in-progress, in-review) được giao cho user
    DECLARE @InProgressTasks INT;
    SELECT @InProgressTasks = COUNT(t.id)
    FROM [dbo].[tasks] t
    JOIN [dbo].[task_assignees] ta ON t.id = ta.task_id
    WHERE ta.user_id = @UserID AND t.status IN ('in-progress', 'in-review') AND t.is_deleted = 0;

    -- Đếm tổng số task đã quá hạn được giao cho user
    DECLARE @OverdueTasks INT;
    SELECT @OverdueTasks = COUNT(t.id)
    FROM [dbo].[tasks] t
    JOIN [dbo].[task_assignees] ta ON t.id = ta.task_id
    WHERE ta.user_id = @UserID AND t.status != 'done' AND t.end_date < GETDATE() AND t.is_deleted = 0;

    -- Trả về kết quả
    SELECT @TotalProjects AS TotalProjects, @InProgressTasks AS InProgressTasks, @OverdueTasks AS OverdueTasks;
END;
GO


-- SP 2: Lấy danh sách dự án cho Kanban Board
-- Hỗ trợ JS function: loadKanbanBoard()
CREATE OR ALTER PROCEDURE [dbo].[sp_GetProjectsForKanban]
    @WorkspaceID BIGINT,
    @UserID BIGINT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        p.id,
        p.name,
        p.status,
        p.start_date,
        p.end_date,
        ISNULL(pd.total_tasks, 0) AS total_tasks,
        ISNULL(pd.completed_tasks, 0) AS completed_tasks,
        -- Lấy danh sách avatar của 3 thành viên đầu tiên
        (
            SELECT STRING_AGG(u.avatar_url, ',') 
            FROM (
                SELECT TOP 3 user_id FROM [dbo].[project_members] pm_inner WHERE pm_inner.project_id = p.id
            ) pm
            JOIN [dbo].[users] u ON pm.user_id = u.id
        ) AS member_avatars,
        ISNULL(pd.member_count, 0) AS member_count,
        -- Lấy danh sách màu của các tag
        (
            SELECT STRING_AGG(t.color_hex, ',')
            FROM [dbo].[project_tags] pt
            JOIN [dbo].[tags] t ON pt.tag_id = t.id
            WHERE pt.project_id = p.id
        ) AS tag_colors
    FROM 
        [dbo].[projects] p
    JOIN 
        [dbo].[project_members] pm ON p.id = pm.project_id
    LEFT JOIN
        [dbo].[vw_ProjectDetails] pd ON p.id = pd.project_id
    WHERE 
        p.workspace_id = @WorkspaceID
        AND pm.user_id = @UserID
        AND p.is_deleted = 0
        AND p.is_archived = 0;
END;
GO


-- SP 3: Lấy danh sách công việc của người dùng với bộ lọc và sắp xếp
-- Hỗ trợ JS function: loadUserTasks()
CREATE OR ALTER PROCEDURE [dbo].[sp_GetUserTasks]
    @UserID BIGINT,
    @WorkspaceID BIGINT,
    @SearchTerm NVARCHAR(255) = NULL,
    @FilterByProjectIDs NVARCHAR(MAX) = NULL, -- vd: '1,5,10'
    @FilterByStatus NVARCHAR(100) = NULL,     -- vd: 'in-progress,in-review'
    @SortBy NVARCHAR(50) = 'due_date_asc'      -- vd: 'due_date_asc', 'priority_desc', 'creation_date_desc'
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        vwt.task_id,
        vwt.task_name,
        vwt.task_status,
        vwt.task_priority,
        vwt.task_end_date AS due_date,
        vwt.project_id,
        vwt.project_name,
        vwt.task_list_id,
        vwt.task_list_name
    FROM
        [dbo].[vw_TaskDetails] vwt
    JOIN
        [dbo].[task_assignees] ta ON vwt.task_id = ta.task_id
    WHERE
        ta.user_id = @UserID
        AND vwt.workspace_id = @WorkspaceID
        -- Lọc theo từ khóa tìm kiếm
        AND (@SearchTerm IS NULL OR vwt.task_name LIKE '%' + @SearchTerm + '%')
        -- Lọc theo danh sách project ID
        AND (@FilterByProjectIDs IS NULL OR vwt.project_id IN (SELECT value FROM STRING_SPLIT(@FilterByProjectIDs, ',')))
        -- Lọc theo danh sách status
        AND (@FilterByStatus IS NULL OR vwt.task_status IN (SELECT value FROM STRING_SPLIT(@FilterByStatus, ',')))
    ORDER BY
        -- Sắp xếp động
        CASE WHEN @SortBy = 'due_date_asc' THEN vwt.task_end_date END ASC,
        CASE WHEN @SortBy = 'due_date_desc' THEN vwt.task_end_date END DESC,
        CASE WHEN @SortBy = 'priority_desc' THEN 
            CASE vwt.task_priority
                WHEN 'high' THEN 1
                WHEN 'normal' THEN 2
                WHEN 'low' THEN 3
            END
        END ASC,
        CASE WHEN @SortBy = 'creation_date_desc' THEN vwt.task_created_at END DESC,
        CASE WHEN @SortBy = 'alphabetical_asc' THEN vwt.task_name END ASC
END;
GO

-- SP 4: Lấy toàn bộ chi tiết của một dự án
-- Hỗ trợ JS function: loadProjectDetails()
CREATE OR ALTER PROCEDURE [dbo].[sp_GetProjectDetails]
    @ProjectID BIGINT,
    @UserID BIGINT
AS
BEGIN
    SET NOCOUNT ON;

    -- Kiểm tra quyền truy cập
    IF NOT EXISTS (SELECT 1 FROM [dbo].[project_members] WHERE project_id = @ProjectID AND user_id = @UserID)
    BEGIN
		ROLLBACK TRANSACTION;
        THROW 50001, 'Access Denied: You are not a member of this project.', 1;
        RETURN;
    END

    -- 1. Thông tin cơ bản của dự án
    SELECT * FROM [dbo].[projects] WHERE id = @ProjectID;

    -- 2. Danh sách các task list và task con bên trong
    SELECT 
        tl.id AS task_list_id, tl.name AS task_list_name, tl.position,
        t.id AS task_id, t.name as task_name, t.status AS task_status
    FROM [dbo].[task_lists] tl
    LEFT JOIN [dbo].[tasks] t ON tl.id = t.task_list_id AND t.is_deleted = 0
    WHERE tl.project_id = @ProjectID
    ORDER BY tl.position, t.created_at;

    -- 3. Danh sách thành viên
    SELECT u.id, u.full_name, u.avatar_url, pm.role
    FROM [dbo].[project_members] pm
    JOIN [dbo].[users] u ON pm.user_id = u.id
    WHERE pm.project_id = @ProjectID;

    -- 4. Danh sách 20 hoạt động gần nhất
    SELECT TOP 20
        a.id, a.action_type, a.content, a.created_at,
        u.full_name AS user_full_name, u.avatar_url AS user_avatar_url
    FROM [dbo].[activities] a
    JOIN [dbo].[users] u ON a.user_id = u.id
    WHERE a.target_id = @ProjectID AND a.target_type = 'project'
    ORDER BY a.created_at DESC;

    -- 5. Danh sách các tags đã gán
    SELECT t.id, t.name, t.color_hex
    FROM [dbo].[project_tags] pt
    JOIN [dbo].[tags] t ON pt.tag_id = t.id
    WHERE pt.project_id = @ProjectID;

END;
GO


-- SP 5: Tìm kiếm người dùng để mời vào dự án
-- Hỗ trợ JS function: manageProjectMembers()
CREATE OR ALTER PROCEDURE [dbo].[sp_SearchUsersForProject]
    @WorkspaceID BIGINT,
    @ProjectID BIGINT,
    @SearchTerm NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT u.id, u.full_name, u.email, u.avatar_url
    FROM [dbo].[users] u
    -- Đảm bảo người dùng thuộc cùng workspace (tùy chọn, có thể bỏ nếu muốn mời người ngoài)
    JOIN [dbo].[workspaces] w ON u.id = w.owner_id AND w.id = @WorkspaceID
    WHERE 
        (u.full_name LIKE '%' + @SearchTerm + '%' OR u.email LIKE '%' + @SearchTerm + '%')
        AND u.is_deleted = 0
        -- Loại trừ những người đã là thành viên của dự án
        AND NOT EXISTS (
            SELECT 1 FROM [dbo].[project_members] pm 
            WHERE pm.project_id = @ProjectID AND pm.user_id = u.id
        );
END;
GO

-- SP 6: Ghi log hoạt động một cách tập trung
-- Hỗ trợ nhiều JS functions (vd: updateProjectStatus, manageProjectMembers...)
CREATE OR ALTER PROCEDURE [dbo].[sp_LogActivity]
    @UserID BIGINT,
    @ActionType NVARCHAR(50),
    @TargetID BIGINT,
    @TargetType NVARCHAR(10),
    @Content NVARCHAR(MAX) -- Dữ liệu dạng JSON
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Kiểm tra xem content có phải là JSON hợp lệ không
    IF (ISJSON(@Content) > 0)
    BEGIN
        INSERT INTO [dbo].[activities] ([user_id], [action_type], [target_id], [target_type], [content])
        VALUES (@UserID, @ActionType, @TargetID, @TargetType, @Content);
    END
    ELSE
    BEGIN
        -- Ghi log lỗi hoặc bỏ qua tùy theo yêu cầu nghiệp vụ
        -- Ở đây, chúng ta sẽ bỏ qua để không làm dừng các tiến trình khác
        RETURN;
    END
END;
GO

-- SP 7: Di chuyển một Task sang một Task List khác
-- Hỗ trợ kéo thả task trong modal chi tiết dự án
CREATE OR ALTER PROCEDURE [dbo].[sp_MoveTask]
    @TaskID BIGINT,
    @NewTaskListID BIGINT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Kiểm tra xem task và task list mới có tồn tại và thuộc cùng một dự án không
        DECLARE @OldProjectID BIGINT, @NewProjectID BIGINT;

        SELECT @OldProjectID = project_id FROM [dbo].[tasks] WHERE id = @TaskID;
        SELECT @NewProjectID = project_id FROM [dbo].[task_lists] WHERE id = @NewTaskListID;

        IF @OldProjectID = @NewProjectID
        BEGIN
            UPDATE [dbo].[tasks]
            SET task_list_id = @NewTaskListID
            WHERE id = @TaskID;
            
            -- Ghi log hoạt động (ví dụ)
            -- EXEC [dbo].[sp_LogActivity] @UserID = ..., @ActionType = 'task_move_tasklist', ...
        END
        ELSE
        BEGIN
			ROLLBACK TRANSACTION;
            THROW 50002, 'Task and new Task List do not belong to the same project.', 1;
        END
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH;
END;
GO